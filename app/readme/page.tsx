import Link from "next/link";
import { WalletButton } from "../components/WalletButton";

export default function ReadmePage() {
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
              href="/" 
              className="retro-button px-4 py-2 no-underline"
            >
              [HOME]
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
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4 retro-typewriter">
            &gt; README.TXT
          </h1>
          <div className="border-2 border-black dark:border-white p-6 bg-white dark:bg-black max-w-4xl mx-auto">
            <p className="text-lg font-mono">
              APTOS VIBE HACK 2025 DOCUMENTATION
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mt-2">
              INTERNAL COMPANY HACKATHON GUIDE AND RULES
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hackathon Overview */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\HACKATHON&gt; TYPE OVERVIEW.TXT
              </h2>
            </div>
            <div className="retro-card p-8">
              <div className="border-4 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black p-8 mb-6">
                <p className="text-2xl font-mono font-bold mb-4">
                  🎉 BRAGGING RIGHTS! FAME! GLORY! FUN! 🎉
                </p>
                <p className="text-lg font-mono mb-4">
                  💡 7/28-3/31 VIBE DAYS | 08/01 10AM PT - HIGHEST VOTES WIN
                </p>
              </div>
              
              <p className="font-mono text-sm leading-relaxed mb-6">
                Hey everyone! We&apos;re thrilled to launch our company-wide Vibe Coding Hackathon 🎉<br/>
                after our exciting progress with MCP and Vibe Coding on Aptos.<br/><br/>
                **Join #vibe-hack-2025 on Slack to chat (and solicit votes!)**
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="retro-card p-6">
                  <h3 className="text-xl font-bold font-mono mb-4">[HACKATHON_RULES]</h3>
                  <ul className="font-mono text-sm space-y-2">
                    <li>✅ Use only Vibe Coding</li>
                    <li>✅ Deploy DApp to testnet</li>
                    <li>✅ Submit via this portal</li>
                    <li>🗳️ All employees can vote</li>
                    <li>🏁 Deadline: Aug 01, 10AM PT</li>
                    <li>🏆 Prize: Bragging Rights</li>
                  </ul>
                </div>

                <div className="retro-card p-6">
                  <h3 className="text-xl font-bold font-mono mb-4">[TIMELINE]</h3>
                  <div className="font-mono text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Vibe Days:</span>
                      <span>7/28 - 3/31</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Voting Ends:</span>
                      <span>08/01 09:59 AM PT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Winner Announced:</span>
                      <span>08/01 10:00 AM PT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is Vibe Coding */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\HACKATHON&gt; TYPE VIBECODING.TXT
              </h2>
            </div>
            <div className="retro-card p-8">
              <pre className="font-mono text-sm mb-6">
{`┌─────────────────────────────────────────────────────────────────────┐
│                           VIBECODING.TXT                            │
├─────────────────────────────────────────────────────────────────────┤
│  A PHILOSOPHY OF BLOCKCHAIN DEVELOPMENT                             │
│  EMPHASIZING CREATIVITY, PASSION, AND UNIQUE APPROACHES            │
└─────────────────────────────────────────────────────────────────────┘`}
              </pre>
              <p className="font-mono text-sm leading-relaxed mb-6">
                Vibe Coding is our philosophy of blockchain development that emphasizes<br/>
                creativity, passion, and unique approaches to building applications.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h3 className="text-lg font-bold font-mono mb-3">[CREATIVE_EXPRESSION]</h3>
                  <p className="font-mono text-sm">
                    Express creativity through unique UI/UX design, innovative smart contract patterns, and novel blockchain interactions.
                  </p>
                </div>
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h3 className="text-lg font-bold font-mono mb-3">[TECHNICAL_EXCELLENCE]</h3>
                  <p className="font-mono text-sm">
                    Maintain high technical standards while leveraging Aptos&apos; Move language and advanced blockchain features.
                  </p>
                </div>
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h3 className="text-lg font-bold font-mono mb-3">[COMMUNITY_IMPACT]</h3>
                  <p className="font-mono text-sm">
                    Build something that inspires, provides educational value, and drives innovation forward.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\HACKATHON&gt; DIR RESOURCES
              </h2>
            </div>
            <div className="retro-card p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold font-mono mb-4">[MCP_SETUP_GUIDE]</h3>
                <p className="font-mono text-sm mb-4 leading-relaxed">
                  The Aptos NPM Model Context Protocol (MCP) provides essential<br/>
                  tools and resources for Aptos development.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="https://github.com/aptos-labs/aptos-npm-mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-button px-6 py-3 no-underline"
                  >
                    [APTOS_NPM_MCP_GUIDE]
                  </Link>
                  <Link 
                    href="https://www.notion.so/MCP-Feedback-22b8b846eb7280debf3ad4ab2046674f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-button px-6 py-3 no-underline"
                  >
                    [MCP_FEEDBACK_FORM]
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h4 className="font-bold font-mono mb-2">[OFFICIAL_DOCS]</h4>
                  <p className="text-xs font-mono mb-3">
                    Comprehensive guides and API references
                  </p>
                  <Link 
                    href="https://aptos.dev" 
                    target="_blank"
                    className="font-mono text-xs hover:underline"
                  >
                    &gt; VISIT_APTOS_DOCS
                  </Link>
                </div>
                <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h4 className="font-bold font-mono mb-2">[COMMUNITY]</h4>
                  <p className="text-xs font-mono mb-3">
                    Join the developer community
                  </p>
                  <Link 
                    href="https://discord.gg/aptoslabs" 
                    target="_blank"
                    className="font-mono text-xs hover:underline"
                  >
                    &gt; JOIN_DISCORD
                  </Link>
                </div>
                <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h4 className="font-bold font-mono mb-2">[GITHUB]</h4>
                  <p className="text-xs font-mono mb-3">
                    Core Aptos blockchain source code
                  </p>
                  <Link 
                    href="https://github.com/aptos-labs" 
                    target="_blank"
                    className="font-mono text-xs hover:underline"
                  >
                    &gt; BROWSE_CODE
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Support & Contact */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\HACKATHON&gt; TYPE SUPPORT.TXT
              </h2>
            </div>
            <div className="retro-card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="retro-card p-6">
                  <h3 className="text-xl font-bold font-mono mb-4">[SUPPORT_CHANNELS]</h3>
                  <div className="font-mono text-sm space-y-2">
                    <div>💬 Slack: #vibe-hack-2025</div>
                    <div>🛠️ MCP Support: Feedback Form</div>
                    <div>🆘 Technical Issues: Dev Team</div>
                    <div>📝 Submissions: Organizers</div>
                  </div>
                </div>

                <div className="retro-card p-6">
                  <h3 className="text-xl font-bold font-mono mb-4">[COMPANY_TOOLS]</h3>
                  <p className="font-mono text-sm mb-4">
                    Don&apos;t have access to enterprise Vibe accounts?
                  </p>
                  <p className="font-mono text-sm">
                    You&apos;re welcome to **expense** the tool (e.g., a $25 Pro account on Loveable). 
                    Just let us know if that&apos;s a concern.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section>
            <div className="text-center">
              <div className="border-4 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black p-8 max-w-4xl mx-auto">
                <p className="text-2xl font-mono font-bold mb-4">
                  🎉 LET&apos;S BUILD SOMETHING AMAZING! 🎉
                </p>
                <p className="font-mono text-sm mb-6">
                  This is your chance to showcase creativity, learn new tech, and compete for awesome prizes!<br/>
                  Whether you&apos;re building your first DApp or you&apos;re a blockchain veteran,<br/>
                  we can&apos;t wait to see what you create with Vibe Coding on Aptos!
                </p>
                <p className="font-mono text-lg font-bold mb-6">
                  GOOD LUCK, AND MAY THE BEST VIBES WIN! 🚀
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/submit"
                    className="retro-button px-6 py-3 no-underline"
                  >
                    [SUBMIT_PROJECT]
                  </Link>
                  <Link
                    href="/"
                    className="retro-button px-6 py-3 no-underline"
                  >
                    [VIEW_SUBMISSIONS]
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
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