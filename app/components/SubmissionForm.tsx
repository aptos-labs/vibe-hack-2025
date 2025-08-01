"use client";

import { useState } from "react";

interface FormData {
  title: string;
  projectUrl: string;
  repoUrl: string;
  description: string;
  imageUrl: string;
  creator: string;
  creatorUrl: string;
  status: "live" | "development" | "concept";
}

export function SubmissionForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    projectUrl: "",
    repoUrl: "",
    description: "",
    imageUrl: "",
    creator: "",
    creatorUrl: "",
    status: "live",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [commitUrl, setCommitUrl] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.title.trim()) errors.push("Project name is required");
    if (!formData.projectUrl.trim()) errors.push("Project link is required");
    if (!formData.description.trim())
      errors.push("Project description is required");
    if (!formData.creator.trim()) errors.push("Creator name is required");

    // URL validation
    try {
      new URL(formData.projectUrl);
    } catch {
      errors.push("Project link must be a valid URL");
    }

    if (formData.repoUrl && formData.repoUrl.trim()) {
      try {
        new URL(formData.repoUrl);
      } catch {
        errors.push("Repository link must be a valid URL");
      }
    }

    if (formData.creatorUrl && formData.creatorUrl.trim()) {
      try {
        new URL(formData.creatorUrl);
      } catch {
        errors.push("Creator GitHub link must be a valid URL");
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setErrorMessage(errors.join(", "));
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSubmitStatus("success");
        setCommitUrl(responseData.commitUrl || "");
        // Reset form
        setFormData({
          title: "",
          projectUrl: "",
          repoUrl: "",
          description: "",
          imageUrl: "",
          creator: "",
          creatorUrl: "",
          status: "live",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to submit project");
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-2 border-black dark:border-white bg-white dark:bg-black p-8">
        <div className="font-mono text-sm mb-6">
          <span className="text-green-600 dark:text-green-400">
            submit@aptos:~$
          </span>{" "}
          ./submit_project.exe
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              PROJECT_NAME* <span className="text-red-500">[REQUIRED]</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Enter your project name..."
              maxLength={100}
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              PROJECT_URL* <span className="text-red-500">[REQUIRED]</span>
            </label>
            <input
              type="url"
              name="projectUrl"
              value={formData.projectUrl}
              onChange={handleInputChange}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="https://your-project.com"
            />
          </div>

          {/* Repository Link */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              REPOSITORY_URL <span className="text-gray-500">[OPTIONAL]</span>
            </label>
            <input
              type="url"
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleInputChange}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              DESCRIPTION* <span className="text-red-500">[REQUIRED]</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
              placeholder="Describe your innovative Aptos project..."
              maxLength={500}
            />
            <div className="text-xs font-mono text-gray-500 mt-1">
              {formData.description.length}/500 characters
            </div>
          </div>

          {/* Project Thumbnail */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              THUMBNAIL_URL <span className="text-gray-500">[OPTIONAL]</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="https://your-image-url.com/image.png"
            />
            <div className="text-xs font-mono text-gray-500 mt-1">
              Recommended: 400x300px, under 500KB
            </div>
          </div>

          {/* Creator Name */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              CREATOR_NAME* <span className="text-red-500">[REQUIRED]</span>
            </label>
            <input
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleInputChange}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="@username or Your Name"
              maxLength={50}
            />
          </div>

          {/* Creator GitHub Link */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              CREATOR_GITHUB <span className="text-gray-500">[OPTIONAL]</span>
            </label>
            <input
              type="url"
              name="creatorUrl"
              value={formData.creatorUrl}
              onChange={handleInputChange}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="https://github.com/username"
            />
          </div>

          {/* Project Status */}
          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              PROJECT_STATUS* <span className="text-red-500">[REQUIRED]</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono text-sm p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer"
            >
              <option value="live">
                🟢 LIVE - Project is deployed and operational
              </option>
              <option value="development">
                🟡 DEVELOPMENT - Work in progress
              </option>
              <option value="concept">
                🔵 CONCEPT - Idea or prototype stage
              </option>
            </select>
          </div>

          {/* Submit Status */}
          {submitStatus === "success" && (
            <div className="border-2 border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 p-4">
              <div className="font-mono text-sm">
                ✅ PROJECT_SUBMITTED_SUCCESSFULLY!
                <br />
                Your project has been automatically published to the site! 🎉
                {commitUrl && (
                  <>
                    <br />
                    <br />
                    <a
                      href={commitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-green-700 dark:border-green-300 px-3 py-1 mt-2 hover:bg-green-700 hover:text-white dark:hover:bg-green-300 dark:hover:text-black transition-colors"
                    >
                      [VIEW_COMMIT]
                    </a>
                  </>
                )}
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="border-2 border-red-500 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 p-4">
              <div className="font-mono text-sm">
                ❌ SUBMISSION_ERROR:
                <br />
                {errorMessage}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 font-mono text-sm font-bold border-2 transition-colors ${
                isSubmitting
                  ? "border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
              }`}
            >
              {isSubmitting ? "[SUBMITTING...]" : "[SUBMIT_PROJECT]"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
