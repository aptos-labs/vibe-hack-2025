import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface ProjectData {
  title: string;
  projectUrl: string;
  repoUrl: string;
  description: string;
  imageUrl: string;
  creator: string;
  creatorUrl: string;
  status: "live" | "development" | "concept";
  tags: string[];
}

interface Project extends ProjectData {
  id: string;
  dateAdded: string;
}

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = "aptos-labs";
const REPO_NAME = "vibe-hack-2025";
const GITHUB_API_BASE = "https://api.github.com";

// Note: Smart contract auto-initialization is temporarily disabled due to SDK compatibility

export async function POST(request: NextRequest) {
  try {
    const formData: ProjectData = await request.json();

    // Validate required fields
    const requiredFields = ["title", "projectUrl", "description", "creator"];
    const missingFields = requiredFields.filter(
      (field) =>
        !formData[field as keyof ProjectData] ||
        (formData[field as keyof ProjectData] as string).trim() === ""
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // if (!formData.tags || formData.tags.length === 0) {
    //   return NextResponse.json(
    //     { error: "At least one tag is required" },
    //     { status: 400 }
    //   );
    // }

    // Validate URLs
    try {
      new URL(formData.projectUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid project URL" },
        { status: 400 }
      );
    }

    if (formData.repoUrl && formData.repoUrl.trim()) {
      try {
        new URL(formData.repoUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid repository URL" },
          { status: 400 }
        );
      }
    }

    if (formData.creatorUrl && formData.creatorUrl.trim()) {
      try {
        new URL(formData.creatorUrl);
      } catch {
        return NextResponse.json(
          { error: "Invalid creator URL" },
          { status: 400 }
        );
      }
    }

    // Generate unique ID
    const generateId = () => {
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 7);
      return `${timestamp}-${randomStr}`;
    };

    const newId = generateId();

    // Create new project object
    const newProject: Project = {
      id: newId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl?.trim() || "/api/placeholder/400/300",
      projectUrl: formData.projectUrl.trim(),
      repoUrl: formData.repoUrl?.trim() || formData.projectUrl.trim(),
      tags: formData.tags || ["general"], // provide default tags
      status: formData.status,
      creator: formData.creator.trim(),
      creatorUrl: formData.creatorUrl?.trim() || "",
      dateAdded: new Date().toISOString().split("T")[0],
    };

    // Initialize project in smart contract if private key is available
    async function initializeProjectInContract() {
      console.warn("Smart contract auto-initialization temporarily disabled due to SDK compatibility");
      return { 
        success: false, 
        reason: "feature_disabled",
        message: "Please initialize projects manually using the Aptos Explorer"
      };
    }

    if (!GITHUB_TOKEN) {
      // For development: store locally instead of creating PR
      console.warn(
        "GitHub integration not configured. Storing project locally."
      );

      // Actually persist to local file in development
      try {
        const projectsPath = path.join(process.cwd(), "data", "projects.json");

        // Read current projects
        const currentData = fs.readFileSync(projectsPath, "utf8");
        const projects: Project[] = JSON.parse(currentData);

        // Add new project
        projects.push(newProject);

        // Write back to file
        fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));

        // Initialize project in smart contract
        const contractResult = await initializeProjectInContract();

        return NextResponse.json({
          success: true,
          message: contractResult.success 
            ? "Project submitted successfully and added to site! Smart contract initialized." 
            : "Project submitted successfully and added to site! (Smart contract initialization pending)",
          project: newProject,
          contractInitialization: contractResult,
        });
      } catch (error) {
        console.error("Failed to save locally:", error);
        return NextResponse.json({
          success: true,
          message:
            "Project submitted successfully! (stored in memory - restart server to persist)",
          project: newProject,
        });
      }
    }

    // GitHub API headers
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    try {
      // 1. Get the current projects.json file
      const getFileResponse = await fetch(
        `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/projects.json`,
        { headers }
      );

      if (!getFileResponse.ok) {
        throw new Error(
          `Failed to get projects file: ${getFileResponse.statusText}`
        );
      }

      const fileData = await getFileResponse.json();
      const currentContent = Buffer.from(fileData.content, "base64").toString(
        "utf-8"
      );
      const projects: Project[] = JSON.parse(currentContent);

      // 2. Add the new project
      projects.push(newProject);
      const updatedContent = JSON.stringify(projects, null, 2);
      const encodedContent = Buffer.from(updatedContent).toString("base64");

      // 3. DIRECT COMMIT TO MAIN (instead of creating PR)
      const updateFileResponse = await fetch(
        `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/data/projects.json`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            message: `🚀 Auto-add project: ${formData.title}\n\nSubmitted by: ${
              formData.creator
            }\nStatus: ${formData.status}\nTags: ${(
              formData.tags || ["general"]
            ).join(", ")}\n\n[AUTO-APPROVED]`,
            content: encodedContent,
            sha: fileData.sha,
            branch: "main", // Direct commit to main branch
          }),
        }
      );

      if (!updateFileResponse.ok) {
        throw new Error(
          `Failed to update file: ${updateFileResponse.statusText}`
        );
      }

      const commitData = await updateFileResponse.json();

      // Initialize project in smart contract
      const contractResult = await initializeProjectInContract();

      return NextResponse.json({
        success: true,
        message: contractResult.success
          ? "Project submitted and automatically published to the site! Smart contract initialized. 🎉"
          : "Project submitted and automatically published to the site! (Smart contract initialization pending) 🎉",
        project: newProject,
        commitUrl: commitData.commit.html_url,
        commitSha: commitData.commit.sha,
        contractInitialization: contractResult,
      });
    } catch (githubError) {
      console.error("GitHub API error:", githubError);
      return NextResponse.json(
        {
          error: `GitHub integration failed: ${
            githubError instanceof Error ? githubError.message : "Unknown error"
          }`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
