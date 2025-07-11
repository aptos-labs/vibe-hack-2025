import Link from "next/link";
import { WalletButton } from "../components/WalletButton";
import { SubmissionForm } from "../components/SubmissionForm";

export default function Submit() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white retro-crt retro-scanlines">
      {/* ASCII Art Header */}
      <div className="border-b-4 border-black dark:border-white">
        <pre className="text-xs md:text-sm text-center py-4 font-mono overflow-x-auto">
{`
 █████╗ ██████╗ ████████╗ ██████╗ ███████╗    ██╗   ██╗██╗██████╗ ███████╗███████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔════╝    ██║   ██║██║██╔══██╗██╔════╝██╔════╝
███████║██████╔╝   ██║   ██║   ██║███████╗    ██║   ██║██║██████╔╝█████╗  ███████╗
██╔══██║██╔═══╝    ██║   ██║   ██║╚════██║    ╚██╗ ██╔╝██║██╔══██╗██╔══╝  ╚════██║
██║  ██║██║        ██║   ╚██████╔╝███████║     ╚████╔╝ ██║██████╔╝███████╗███████║
╚═╝  ╚═╝╚═╝        ╚═╝    ╚═════╝ ╚══════╝      ╚═══╝  ╚═╝╚═════╝ ╚══════╝╚══════╝
`}
        </pre>
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4">
            <Link 
              href="/" 
              className="retro-button px-4 py-2 no-underline"
            >
              [HOME]
            </Link>
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
          </div>
          <WalletButton />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4 retro-typewriter">
            &gt; SUBMIT_PROJECT.EXE
          </h1>
          <div className="border-2 border-black dark:border-white p-6 mb-6 bg-white dark:bg-black text-black dark:text-stone-100">
            <p className="text-xl font-mono mb-2">
              SYSTEM: PROJECT_SUBMISSION_PROTOCOL
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-stone-300">
              STATUS: [ACCEPTING_ENTRIES] | QUEUE: OPEN | TARGET: APTOS_ECOSYSTEM
            </p>
          </div>
          <p className="text-lg font-mono max-w-4xl mx-auto leading-relaxed">
            {/* Share your innovative Aptos blockchain projects */}<br/>
            {/* Join our curated database of vibecoded applications */}<br/>
            {/* Inspire the community with your creative vision */}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">

        {/* Submission Guidelines */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-8 mb-8">
            <div className="font-mono text-sm mb-6">
              <span className="text-green-600 dark:text-green-400">submit@aptos:~$</span> cat submission_guidelines.txt
            </div>
            
            <div className="space-y-6 font-mono text-sm">
              <div className="border-l-4 border-black dark:border-white pl-4 mb-6">
                <p className="leading-relaxed">
                  {/* Submit your vibecoded Aptos project using our automated form below */}<br/>
                  {/* Your submission will be automatically published instantly */}<br/>
                  {/* No manual review required - projects appear immediately on the main page */}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-4 uppercase">
                  ⚡ INSTANT AUTOMATED PUBLISHING
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                    <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">✅ WHAT WE ACCEPT</h3>
                    <ul className="text-xs space-y-1">
                      <li>• Aptos-based dApps and smart contracts</li>
                      <li>• Move language projects</li>
                      <li>• Developer tools for Aptos ecosystem</li>
                      <li>• Educational resources and tutorials</li>
                      <li>• Creative blockchain experiments</li>
                    </ul>
                  </div>

                  <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                    <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">🎯 SUBMISSION CRITERIA</h3>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <span>[✓]</span>
                        Built on or for the Aptos blockchain
                      </li>
                      <li className="flex items-start gap-2">
                        <span>[✓]</span>
                        Demonstrates creative or innovative approach
                      </li>
                      <li className="flex items-start gap-2">
                        <span>[✓]</span>
                        Open source or has public repository
                      </li>
                      <li className="flex items-start gap-2">
                        <span>[✓]</span>
                        Clear documentation and description
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                    <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2">📝 REQUIRED INFO</h3>
                    <ul className="text-xs space-y-1">
                      <li>• Project name and description</li>
                      <li>• Live demo URL (if applicable)</li>
                      <li>• GitHub repository link</li>
                      <li>• Creator/team information</li>
                      <li>• Project status (live/dev/concept)</li>
                    </ul>
                  </div>

                  <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                    <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">🚀 INSTANT PROCESS</h3>
                    <ul className="text-xs space-y-1">
                      <li>• Fill out the submission form below</li>
                      <li>• System validates your project data</li>
                      <li>• ⚡ INSTANTLY published to main page</li>
                      <li>• No manual review required</li>
                      <li>• Project appears live immediately</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Submit Guide */}
              <div className="border-4 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black p-6 mt-6">
                <h4 className="font-bold font-mono mb-2">[INSTANT_AUTOMATED_PUBLISHING]</h4>
                <p className="font-mono text-sm mb-4">
                  Submit your project and see it live instantly! Zero wait time, no manual approval needed.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="font-mono text-xs">
                    <span className="font-bold">STEP 1:</span> Fill out the form below with project details
                  </div>
                  <div className="font-mono text-xs">
                    <span className="font-bold">STEP 2:</span> Click submit - system validates everything
                  </div>
                  <div className="font-mono text-xs">
                    <span className="font-bold">STEP 3:</span> ⚡ INSTANTLY published to main page
                  </div>
                  <div className="font-mono text-xs">
                    <span className="font-bold">STEP 4:</span> Start getting votes immediately! 🎉
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link 
                    href="#submission-form"
                    className="retro-button px-4 py-2 no-underline"
                  >
                    [SCROLL_TO_FORM]
                  </Link>
                  <Link 
                    href="/"
                    className="retro-button px-4 py-2 no-underline"
                  >
                    [VIEW_LIVE_PROJECTS]
                  </Link>
                </div>
              </div>
            </div>
          </div>

        {/* Submit Form */}
        <div id="submission-form">
          <SubmissionForm />
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          {/* Quick Technical Guide */}
          <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-8 mb-8">
            <div className="font-mono text-sm mb-6">
              <span className="text-green-600 dark:text-green-400">submit@aptos:~$</span> cat quick_guide.md
            </div>

            <div className="space-y-6 font-mono text-sm">
              <h2 className="text-lg font-bold mb-4 uppercase">
                ⚡ QUICK TECHNICAL GUIDE
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-bold mb-2">PROJECT DATA FORMAT</h3>
                  <div className="bg-black text-green-400 p-3 text-xs overflow-x-auto">
                    <div>&#123;</div>
                    <div>&nbsp;&nbsp;&quot;id&quot;: &quot;unique-id&quot;,</div>
                    <div>&nbsp;&nbsp;&quot;title&quot;: &quot;Project Name&quot;,</div>
                    <div>&nbsp;&nbsp;&quot;description&quot;: &quot;Brief description&quot;,</div>
                    <div>&nbsp;&nbsp;&quot;imageUrl&quot;: &quot;/thumbnail.png&quot;,</div>
                    <div>&nbsp;&nbsp;&quot;projectUrl&quot;: &quot;https://demo.com&quot;,</div>
                    <div>&nbsp;&nbsp;&quot;repoUrl&quot;: &quot;https://github.com/user/repo&quot;,</div>

                    <div>&nbsp;&nbsp;&quot;status&quot;: &quot;live&quot;,</div>
                    <div>&nbsp;&nbsp;&quot;creator&quot;: &quot;@username&quot;</div>
                    <div>&#125;</div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold mb-2">REQUIREMENTS</h3>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Image:</strong> 400x300px, under 500KB</li>
                    <li>• <strong>Status:</strong> &quot;live&quot;, &quot;development&quot;, or &quot;concept&quot;</li>
  
                    <li>• <strong>Links:</strong> Working demo + GitHub repo</li>
                    <li>• <strong>Quality:</strong> Clean code, good documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-8 inline-block max-w-2xl">
              <h2 className="text-xl font-bold font-mono mb-4 uppercase">
                &gt; READY_TO_SUBMIT.EXE
              </h2>
              <p className="font-mono mb-6 text-sm leading-relaxed">
                Got an innovative Aptos project to showcase?<br/>
                Ready to inspire the community?<br/>
                Let&apos;s build the ecosystem together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/wintertoro/aptos-vibes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-button px-6 py-3 no-underline"
                >
                  [FORK_REPOSITORY]
                </Link>
                <Link
                  href="/docs"
                  className="retro-button px-6 py-3 no-underline"
                >
                  [VIEW_DOCS]
                </Link>
              </div>
              {/* Final action comment */}
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black dark:border-white bg-white dark:bg-black">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex flex-col md:flex-row justify-between items-center font-mono text-sm">
              <div className="mb-4 md:mb-0">
                vibecoded by{' '}
                <Link
                  href="https://github.com/wintertoro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-bold"
                >
                  @wintertoro
                </Link>
              </div>
              <div className="flex gap-6">
                <Link
                  href="https://github.com/aptos-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  [GITHUB]
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 