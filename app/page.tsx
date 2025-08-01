"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { WalletButton } from "./components/WalletButton";
import { VotingSystemWrapper } from "./components/VotingSystemWrapper";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  repoUrl: string;
  status: 'live' | 'development' | 'concept';
  creator: string;
  creatorUrl?: string;
  dateAdded: string;
}

const getStatusSymbol = (status: Project['status']) => {
  switch (status) {
    case 'live':
      return '[ONLINE]';
    case 'development':
      return '[DEV]';
    case 'concept':
      return '[IDEA]';
    default:
      return '[UNKNOWN]';
  }
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'latest' | 'vibe'>('latest');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [projectVibeScores, setProjectVibeScores] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'development' | 'concept'>('all');
  const projectsPerPage = 6;
  
  // IMPORTANT: useCallback must be called early to maintain hook order
  const updateVibeScore = useCallback((projectId: string, vibeScore: number) => {
    setProjectVibeScores(prev => ({
      ...prev,
      [projectId]: vibeScore
    }));
  }, []);
  
  // Load projects data on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Use dynamic import to avoid webpack issues
        const projectsData = await import('../data/projects.json');
        setProjects(projectsData.default as Project[]);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white retro-crt retro-scanlines flex items-center justify-center">
        <div className="border-4 border-black dark:border-white bg-white dark:bg-black p-8">
          <p className="text-xl font-mono">LOADING PROJECTS.JSON...</p>
        </div>
      </div>
    );
  }

  // Filter and sort projects based on selected criteria
  const filteredAndSortedProjects = [...projects]
    .filter(project => {
      // Status filter
      if (statusFilter !== 'all' && project.status !== statusFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'latest') {
        comparison = new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      } else if (sortBy === 'vibe') {
        const scoreA = projectVibeScores[a.id] || 0;
        const scoreB = projectVibeScores[b.id] || 0;
        if (scoreB !== scoreA) {
          comparison = scoreB - scoreA; // Higher vibe scores first for desc
        } else {
          // If vibe scores are equal, sort by latest as secondary
          comparison = new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }
      }
      
      // Apply sort direction
      return sortDirection === 'desc' ? comparison : -comparison;
    });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredAndSortedProjects.slice(startIndex, endIndex);
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  



  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white retro-crt retro-scanlines">
      {/* ASCII Art Header */}
      <div className="border-b-4 border-black dark:border-white">
        <pre className="text-xs md:text-sm text-center py-4 font-mono overflow-x-auto">
{`
 █████╗ ██████╗ ████████╗ ██████╗ ███████╗    ██╗   ██╗██╗██████╗ ███████╗    ██╗  ██╗ █████╗  ██████╗██╗  ██╗
██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔════╝    ██║   ██║██║██╔══██╗██╔════╝    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝
███████║██████╔╝   ██║   ██║   ██║███████╗    ██║   ██║██║██████╔╝█████╗      ███████║███████║██║     █████╔╝ 
██╔══██║██╔═══╝    ██║   ██║   ██║╚════██║    ╚██╗ ██╔╝██║██╔══██╗██╔══╝      ██╔══██║██╔══██║██║     ██╔═██╗ 
██║  ██║██║        ██║   ╚██████╔╝███████║     ╚████╔╝ ██║██████╔╝███████╗    ██║  ██║██║  ██║╚██████╗██║  ██╗
╚═╝  ╚═╝╚═╝        ╚═╝    ╚═════╝ ╚══════╝      ╚═══╝  ╚═╝╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`}
        </pre>
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4">
            <Link 
              href="/readme"
              className="retro-button px-4 py-2 no-underline"
            >
              [README]
            </Link>
            <Link 
              href="/how-to-mcp"
              className="retro-button px-4 py-2 no-underline"
            >
              [HOW TO MCP]
            </Link>
            <Link 
              href="/submit"
              className="retro-button px-4 py-2 no-underline"
            >
              [SUBMIT]
            </Link>
          </div>
          <WalletButton />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4 retro-typewriter">
            &gt; HACKATHON_SUBMISSIONS.EXE
          </h1>
          <div className="border-2 border-black dark:border-white p-6 mb-6 bg-white dark:bg-black text-black dark:text-stone-100">
            <p className="text-xl font-mono mb-2">
              APTOS INTERNAL VIBE CODING HACKATHON 2025
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-stone-300">
              🏆 100 APT PRIZE | 7/24-3/31 VIBE DAYS | VOTING DEADLINE: 08/01 10AM PT
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-stone-300 mt-2">
              STATUS: [OPEN] | SUBMISSIONS: {projects.length} | NETWORK: APTOS_TESTNET
            </p>
          </div>
          <div className="border-4 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black p-6 mb-6">
            <p className="text-2xl font-mono font-bold">
              🎉 HIGHEST VOTES WIN! BRAGGING RIGHTS! FAME! GLORY! FUN! 🎉
            </p>
          </div>
          <p className="text-lg font-mono max-w-4xl mx-auto leading-relaxed">
            {/* Company-wide Vibe Coding Hackathon for all Aptos employees */}<br/>
            {/* Labs + Foundation welcome! Ship something fun, useful, weird, or lovable */}<br/>
            {/* Join #vibe-hack-2025 on Slack to chat and solicit votes! */}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        {/* Terminal-style Section Header */}
        <div className="mb-12">
          <div className="font-mono text-sm flex justify-between items-center">
            {/* Left side - Section Header */}
            <div className="flex items-center">
              <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 px-2 py-1">
                <h2 className="text-sm font-bold font-mono">
                  C:\HACKATHON_SUBMISSIONS&gt; DIR /W
                </h2>
              </div>
            </div>
            
            {/* Right side - Sort and Filter Controls */}
            <div className="flex items-center gap-2">
              {/* Sort Control */}
              <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs">SORT:</span>
                  <select
                    value={`${sortBy}_${sortDirection}`}
                    onChange={(e) => {
                      const [newSortBy, newDirection] = e.target.value.split('_') as ['latest' | 'vibe', 'asc' | 'desc'];
                      setSortBy(newSortBy);
                      setSortDirection(newDirection);
                      setCurrentPage(1);
                    }}
                    className="font-mono text-xs bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white px-1 py-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  >
                    <option value="latest_desc">📅 DATE: NEWEST→OLDEST</option>
                    <option value="latest_asc">📅 DATE: OLDEST→NEWEST</option>
                    <option value="vibe_desc">⚡ VIBE: HIGH→LOW</option>
                    <option value="vibe_asc">⚡ VIBE: LOW→HIGH</option>
                  </select>
                </div>
              </div>
              {/* Status Filter */}
              <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs">STATUS:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as 'all' | 'live' | 'development' | 'concept');
                      setCurrentPage(1);
                    }}
                    className="font-mono text-xs bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white px-1 py-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  >
                    <option value="all">🌐 ALL</option>
                    <option value="live">✅ LIVE</option>
                    <option value="development">🔧 DEV</option>
                    <option value="concept">💡 IDEA</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              className="border-2 border-black dark:border-white bg-white dark:bg-black p-0 overflow-hidden hover:bg-black hover:text-white transition-all duration-300 group shadow-lg"
            >
              {/* ASCII Art Project Header */}
              <div className="bg-black text-white p-4 font-mono text-xs">
                <div className="flex justify-between items-center mb-2">
                  <span>FILE_{String(startIndex + index + 1).padStart(2, '0')}.EXE</span>
                  <span className="retro-blink">{getStatusSymbol(project.status)}</span>
                </div>
                <div className="border border-white p-2">
                  <div className="text-center text-lg font-bold">
                    {project.title.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Project Thumbnail */}
              <Link
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative bg-gray-200 dark:bg-gray-800 h-48 border-b-2 border-black dark:border-white hover:opacity-90 transition-opacity cursor-pointer overflow-hidden"
              >
                {project.imageUrl && !project.imageUrl.includes('placeholder') ? (
                  <div className="absolute inset-0">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    project.id === '1' 
                      ? 'bg-gradient-to-br from-green-400 to-teal-600 dark:from-green-600 dark:to-teal-800' 
                      : 'bg-gradient-to-br from-blue-400 to-purple-600 dark:from-blue-600 dark:to-purple-800'
                  }`}>
                    <div className="text-center text-white">
                      {project.id === '1' ? (
                        <div className="flex flex-col items-center">
                          <div className="text-4xl mb-2">
                            📝
                          </div>
                          <div className="text-2xl font-bold">
                            TODO
                          </div>
                        </div>
                      ) : (
                        <div className="text-6xl mb-2 font-bold">
                          {project.title.split(' ').map(word => word[0]).join('')}
                        </div>
                      )}
                      <div className="text-xs font-mono px-4 py-1 bg-black bg-opacity-50 rounded mt-2">
                        {project.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs font-mono">
                  #{String(startIndex + index + 1).padStart(2, '0')}
                </div>
                {/* Hover indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20">
                  <div className="text-white font-mono text-sm bg-black bg-opacity-75 px-3 py-1 rounded">
                    CLICK TO VISIT
                  </div>
                </div>
              </Link>

              {/* Project Content */}
              <div className="p-6 bg-white dark:bg-black group-hover:bg-black group-hover:text-white">
                <h3 className="text-xl font-bold font-mono mb-2 uppercase">
                  {project.title}
                </h3>
                <div className="border-l-4 border-black dark:border-white pl-4 mb-4">
                  <p className="font-mono text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>



                {/* Creator Field */}
                <div className="mb-4">
                  <div className="font-mono text-xs flex items-center">
                    <span className="mr-2">CREATOR:</span>
                    <span className="text-sm">
                      {project.creatorUrl ? (
                        <Link
                          href={project.creatorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.creator}
                        </Link>
                      ) : project.creator === "@wintertoro" ? (
                        <Link
                          href="https://github.com/wintertoro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.creator}
                        </Link>
                      ) : (
                        <span>{project.creator}</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Project Link */}
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-sm mb-4 hover:underline"
                >
                  &gt; GITHUB_REPO
                </Link>

                {/* Voting System */}
                <div className="border-t-2 border-black dark:border-white pt-4">
                  <VotingSystemWrapper 
                    projectId={project.id} 
                    onVibeScoreUpdate={updateVibeScore}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center gap-1 mb-2">
              {/* Previous Button */}
              <button
                type="button"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`px-2 py-1 font-mono text-xs border transition-all ${
                  currentPage === 1 
                    ? 'border-gray-400 text-gray-400 cursor-not-allowed' 
                    : 'border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer'
                }`}
              >
                &lt; PREV
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-2 py-1 font-mono text-xs border transition-all ${
                    page === currentPage
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                      : 'border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer'
                  }`}
                >
                  {String(page).padStart(2, '0')}
                </button>
              ))}

              {/* Next Button */}
              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 font-mono text-xs border transition-all ${
                  currentPage === totalPages 
                    ? 'border-gray-400 text-gray-400 cursor-not-allowed' 
                    : 'border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer'
                }`}
              >
                NEXT &gt;
              </button>
            </div>

            <div className="font-mono text-xs text-gray-600 dark:text-gray-400">
              [{currentProjects.length} FILES] [{filteredAndSortedProjects.length - endIndex} REMAINING]
            </div>
          </div>
        )}


      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black dark:border-white bg-white dark:bg-black">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
                        <div className="flex flex-col md:flex-row justify-center items-center font-mono text-sm">
              <div>
                Aptos Vibe Hack 2025 - Internal Company Hackathon
              </div>
            </div>
            <div className="mt-4 text-xs font-mono text-gray-600 dark:text-gray-400">
              Powered by Aptos blockchain and Move smart contracts | Built with serious vibes and hella style
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
