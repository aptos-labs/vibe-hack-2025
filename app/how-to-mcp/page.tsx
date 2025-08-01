import Link from "next/link";
import { WalletButton } from "../components/WalletButton";

export default function HowToMCPPage() {
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
              href="/readme"
              className="retro-button px-4 py-2 no-underline"
            >
              [README]
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
            &gt; HOW_TO_MCP.EXE
          </h1>
          <div className="border-2 border-black dark:border-white p-6 bg-white dark:bg-black text-black dark:text-stone-100 max-w-4xl mx-auto">
            <p className="text-lg font-mono">
              MODEL CONTEXT PROTOCOL SETUP GUIDE
            </p>
            <p className="text-sm font-mono text-gray-600 dark:text-stone-300 mt-2">
              STEP-BY-STEP INSTRUCTIONS FOR APTOS VIBE CODING
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* What is MCP */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\MCP&gt; TYPE WHAT_IS_MCP.TXT
              </h2>
            </div>
            <div className="retro-card p-8">
              <pre className="font-mono text-sm mb-6">
{`┌─────────────────────────────────────────────────────────────────────┐
│                    MODEL CONTEXT PROTOCOL (MCP)                     │
├─────────────────────────────────────────────────────────────────────┤
│  BRIDGE BETWEEN AI ASSISTANTS AND DEVELOPMENT TOOLS                │
│  ENABLES SEAMLESS APTOS BLOCKCHAIN DEVELOPMENT                     │
└─────────────────────────────────────────────────────────────────────┘`}
              </pre>
              
              <p className="font-mono text-sm leading-relaxed mb-6">
                MCP (Model Context Protocol) connects AI coding assistants like Claude or Cursor<br/>
                with specialized development tools and resources. For this hackathon, the Aptos<br/>
                NPM MCP provides essential blockchain development capabilities.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h3 className="text-lg font-bold font-mono mb-3">[AI_INTEGRATION]</h3>
                  <p className="font-mono text-sm">
                    Connect your AI assistant to Aptos development tools, documentation, and smart contract templates.
                  </p>
                </div>
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h3 className="text-lg font-bold font-mono mb-3">[RAPID_DEVELOPMENT]</h3>
                  <p className="font-mono text-sm">
                    Generate boilerplate code, deploy contracts, and build DApps faster with AI assistance.
                  </p>
                </div>
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h3 className="text-lg font-bold font-mono mb-3">[BEST_PRACTICES]</h3>
                  <p className="font-mono text-sm">
                    Follow Aptos development patterns and security guidelines automatically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Prerequisites */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\MCP&gt; TYPE PREREQUISITES.TXT
              </h2>
            </div>
            <div className="retro-card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold font-mono mb-4">[REQUIRED_SOFTWARE]</h3>
                  <div className="space-y-3">
                    <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-3">
                      <h4 className="font-bold font-mono text-sm mb-1">Node.js 18+</h4>
                      <p className="font-mono text-xs">JavaScript runtime for development tools</p>
                      <Link href="https://nodejs.org" target="_blank" className="font-mono text-xs hover:underline">
                        &gt; Download Node.js
                      </Link>
                    </div>
                    <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-3">
                      <h4 className="font-bold font-mono text-sm mb-1">Git</h4>
                      <p className="font-mono text-xs">Version control for cloning MCP repository</p>
                      <Link href="https://git-scm.com" target="_blank" className="font-mono text-xs hover:underline">
                        &gt; Download Git
                      </Link>
                    </div>
                    <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-3">
                      <h4 className="font-bold font-mono text-sm mb-1">Aptos CLI</h4>
                      <p className="font-mono text-xs">Command-line tool for Aptos development</p>
                      <Link href="https://aptos.dev/tools/install-cli" target="_blank" className="font-mono text-xs hover:underline">
                        &gt; Install Aptos CLI
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono mb-4">[AI_ASSISTANT]</h3>
                  <div className="space-y-3">
                    <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-3">
                      <h4 className="font-bold font-mono text-sm mb-1">Cursor IDE (Recommended)</h4>
                      <p className="font-mono text-xs">Official AI-powered code editor with MCP support</p>
                      <Link href="https://cursor.sh" target="_blank" className="font-mono text-xs hover:underline">
                        &gt; Download Cursor
                      </Link>
                    </div>
                    <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-3">
                      <h4 className="font-bold font-mono text-sm mb-1">Claude Desktop (Alternative)</h4>
                      <p className="font-mono text-xs">Anthropic&apos;s AI assistant with MCP support</p>
                      <Link href="https://claude.ai/download" target="_blank" className="font-mono text-xs hover:underline">
                        &gt; Download Claude
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Setup Instructions */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\MCP&gt; RUN SETUP_INSTRUCTIONS.BAT
              </h2>
            </div>
            <div className="retro-card p-8">
              
              {/* Cursor IDE Setup (Official) */}
              <div className="mb-12">
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
                  <h3 className="text-xl font-bold font-mono mb-2">🎯 OFFICIAL CURSOR IDE SETUP</h3>
                  <p className="font-mono text-sm">
                    Recommended method from the official Aptos NPM MCP repository
                  </p>
                </div>

                <h3 className="text-xl font-bold font-mono mb-4">[STEP 1: CLONE THE MCP REPOSITORY]</h3>
                <div className="bg-black text-white p-4 font-mono text-sm mb-4 overflow-x-auto">
                  <div className="mb-2 text-gray-400"># Clone the official Aptos NPM MCP repository</div>
                  <div className="text-white">git clone git@github.com:aptos-labs/aptos-npm-mcp.git</div>
                  <div className="text-white">cd aptos-npm-mcp</div>
                  <div className="text-white">npm install</div>
                </div>

                <h3 className="text-xl font-bold font-mono mb-4 mt-8">[STEP 2: CONFIGURE CURSOR IDE]</h3>
                <p className="font-mono text-sm mb-4">
                  Create MCP configuration in your project directory:
                </p>
                <div className="bg-black text-white p-4 font-mono text-xs mb-4 overflow-x-auto">
                  <div className="mb-1 text-gray-400"># In your project root folder, create .cursor directory</div>
                  <div className="text-white">mkdir .cursor</div>
                  <div className="mb-3 text-gray-400"># Create mcp.json configuration file</div>
                  
                  <div className="text-white">&#123;</div>
                  <div className="text-white">&nbsp;&nbsp;&quot;mcpServers&quot;: &#123;</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&quot;aptos-build-mcp&quot;: &#123;</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;command&quot;: &quot;npx&quot;,</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;args&quot;: [&quot;tsx&quot;, &quot;&lt;path-to-mcp-server&gt;/src/server.ts&quot;],</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;type&quot;: &quot;stdio&quot;</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                  <div className="text-white">&nbsp;&nbsp;&#125;</div>
                  <div className="text-white">&#125;</div>
                </div>
                <div className="border-l-4 border-black dark:border-white pl-4 mb-6">
                  <p className="font-mono text-xs text-black dark:text-stone-100">
                    ⚠️ Replace &lt;path-to-mcp-server&gt; with the actual path to your cloned MCP repository
                  </p>
                </div>

                <h3 className="text-xl font-bold font-mono mb-4 mt-8">[STEP 3: VERIFY CURSOR MCP CONNECTION]</h3>
                <div className="space-y-4">
                  <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                    <h4 className="font-bold font-mono text-sm mb-2">1. Check Cursor Settings</h4>
                    <p className="font-mono text-xs mb-2">Navigate to: Cursor → Settings → Cursor Settings</p>
                    <p className="font-mono text-xs">Look for &quot;MCP&quot; or &quot;Tools &amp; Integrations&quot; section</p>
                  </div>
                  <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                    <h4 className="font-bold font-mono text-sm mb-2">2. Enable MCP</h4>
                    <p className="font-mono text-xs mb-2">Ensure MCP is enabled with green indicator</p>
                    <p className="font-mono text-xs">Click refresh icon to update MCP servers</p>
                  </div>
                  <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                    <h4 className="font-bold font-mono text-sm mb-2">3. Test Connection</h4>
                    <p className="font-mono text-xs mb-2">Set AI dropdown to &quot;Agent&quot; and &quot;claude-4-sonnet&quot;</p>
                    <p className="font-mono text-xs">Ask: &quot;are you using mcp?&quot; to verify connection</p>
                  </div>
                </div>
              </div>

              {/* Claude Desktop Setup (Alternative) */}
              <div className="mb-8">
                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
                  <h3 className="text-xl font-bold font-mono mb-2">🔧 CLAUDE DESKTOP SETUP (ALTERNATIVE)</h3>
                  <p className="font-mono text-sm">
                    Alternative method using NPM package installation
                  </p>
                </div>

                <h3 className="text-xl font-bold font-mono mb-4">[STEP A: INSTALL APTOS NPM MCP]</h3>
                <div className="bg-black text-white p-4 font-mono text-sm mb-4 overflow-x-auto">
                  <div className="mb-2 text-gray-400"># Install globally via npm</div>
                  <div className="text-white">npm install -g @aptos-labs/aptos-npm-mcp</div>
                </div>

                <h3 className="text-xl font-bold font-mono mb-4 mt-6">[STEP B: CONFIGURE CLAUDE DESKTOP]</h3>
                <p className="font-mono text-sm mb-4">
                  Add configuration to Claude Desktop config file:
                </p>
                <div className="bg-black text-white p-4 font-mono text-xs mb-4 overflow-x-auto">
                  <div className="mb-1 text-gray-400"># Config file locations:</div>
                  <div className="mb-1 text-gray-400"># macOS: ~/Library/Application Support/Claude/claude_desktop_config.json</div>
                  <div className="mb-1 text-gray-400"># Windows: %APPDATA%\Claude\claude_desktop_config.json</div>
                  <div className="mb-3 text-gray-400"># Linux: ~/.config/Claude/claude_desktop_config.json</div>
                  
                  <div className="text-white">&#123;</div>
                  <div className="text-white">&nbsp;&nbsp;&quot;mcpServers&quot;: &#123;</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&quot;aptos-npm-mcp&quot;: &#123;</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;command&quot;: &quot;npx&quot;,</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;args&quot;: [&quot;@aptos-labs/aptos-npm-mcp&quot;]</div>
                  <div className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
                  <div className="text-white">&nbsp;&nbsp;&#125;</div>
                  <div className="text-white">&#125;</div>
                </div>

                <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mt-6">
                  <h4 className="font-bold font-mono text-sm mb-2">✅ SUCCESS INDICATORS:</h4>
                  <ul className="font-mono text-xs space-y-1">
                    <li>• MCP tool icon appears in interface</li>
                    <li>• AI can access Aptos documentation</li>
                    <li>• Smart contract templates available</li>
                    <li>• Deployment commands work</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* Usage Examples */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\MCP&gt; TYPE USAGE_EXAMPLES.TXT
              </h2>
            </div>
            <div className="retro-card p-8">
              
              <div className="mb-8">
                <h3 className="text-xl font-bold font-mono mb-4">[OFFICIAL EXAMPLE PROMPTS]</h3>
                <p className="font-mono text-sm mb-6">
                  From the official Aptos NPM MCP repository. Use these exact prompts for best results:
                </p>
                
                <div className="space-y-6">
                  <div className="border border-black dark:border-white p-4">
                    <h4 className="font-bold font-mono text-sm mb-2">[FULL END-TO-END DAPP]</h4>
                    <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-stone-100 p-3 font-mono text-xs mb-2">
                      &quot;Help me build a todo list dapp on Aptos. Build the smart contract to handle the dapp logic and help me with deploying the contract, the frontend for the UI and wallet connection for users to be able to connect with their wallet.&quot;
                    </div>
                    <p className="font-mono text-xs">
                      Generates complete dApp: smart contract + deployment + frontend + wallet integration
                    </p>
                  </div>

                  <div className="border border-black dark:border-white p-4">
                    <h4 className="font-bold font-mono text-sm mb-2">[FRONTEND ONLY]</h4>
                    <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-stone-100 p-3 font-mono text-xs mb-2">
                      &quot;Help me build a frontend for a todo list dapp on Aptos. Build the UI and wallet connection for users to be able to connect with their wallet.&quot;
                    </div>
                    <p className="font-mono text-xs">
                      Creates React frontend with wallet integration and TypeScript SDK usage
                    </p>
                  </div>

                  <div className="border border-black dark:border-white p-4">
                    <h4 className="font-bold font-mono text-sm mb-2">[SMART CONTRACT ONLY]</h4>
                    <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-stone-100 p-3 font-mono text-xs mb-2">
                      &quot;Help me build a todo list smart contract on Aptos using Move language.&quot;
                    </div>
                    <p className="font-mono text-xs">
                      Generates Move smart contract with proper structure and deployment scripts
                    </p>
                  </div>

                  <div className="border border-black dark:border-white p-4">
                    <h4 className="font-bold font-mono text-sm mb-2">[DEPLOYMENT HELP]</h4>
                    <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-stone-100 p-3 font-mono text-xs mb-2">
                      &quot;Help me deploy my Move smart contract to Aptos testnet.&quot;
                    </div>
                    <p className="font-mono text-xs">
                      Provides deployment commands and configuration for testnet publishing
                    </p>
                  </div>
                </div>

                <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6 mt-8">
                  <h4 className="text-xl font-bold font-mono mb-4">[BEST PRACTICES FOR PROMPTING]</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                      <h4 className="font-bold font-mono text-sm mb-3">✅ DO THIS</h4>
                      <ul className="font-mono text-xs space-y-1">
                        <li>• Be specific about your dApp functionality</li>
                        <li>• Mention both frontend and smart contract needs</li>
                        <li>• Ask for deployment help explicitly</li>
                        <li>• Request wallet connection setup</li>
                        <li>• Specify if you need testnet deployment</li>
                      </ul>
                    </div>
                    <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                      <h4 className="font-bold font-mono text-sm mb-3">❌ AVOID THIS</h4>
                      <ul className="font-mono text-xs space-y-1">
                        <li>• Generic &quot;build me a dApp&quot; requests</li>
                        <li>• Asking for mainnet deployment</li>
                        <li>• Requesting non-Aptos blockchain features</li>
                        <li>• Vague functional requirements</li>
                        <li>• Forgetting about wallet integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Troubleshooting */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\MCP&gt; TYPE TROUBLESHOOTING.TXT
              </h2>
            </div>
            <div className="retro-card p-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold font-mono mb-4">[COMMON_ISSUES]</h3>
                  <div className="space-y-4">
                    <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                      <h4 className="font-bold font-mono text-sm mb-2">❌ MCP NOT CONNECTING</h4>
                      <ul className="font-mono text-xs space-y-1">
                        <li>• Check Node.js version (18+ required)</li>
                        <li>• Verify config file path and syntax</li>
                        <li>• Restart Claude completely</li>
                        <li>• Check npm global installation</li>
                      </ul>
                    </div>

                    <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                      <h4 className="font-bold font-mono text-sm mb-2">⚠️ PERMISSION ERRORS</h4>
                      <ul className="font-mono text-xs space-y-1">
                        <li>• Run npm with sudo on macOS/Linux</li>
                        <li>• Use admin prompt on Windows</li>
                        <li>• Configure npm global prefix</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-mono mb-4">[QUICK_FIXES]</h3>
                  <div className="space-y-4">
                    <div className="bg-black text-white p-4 font-mono text-xs">
                      <div className="mb-2 text-gray-400"># Reinstall if having issues</div>
                      <div className="text-white">npm uninstall -g @aptos-labs/aptos-npm-mcp</div>
                      <div className="text-white">npm install -g @aptos-labs/aptos-npm-mcp</div>
                    </div>

                    <div className="bg-black text-white p-4 font-mono text-xs">
                      <div className="mb-2 text-gray-400"># Check if MCP is installed</div>
                      <div className="text-white">npx @aptos-labs/aptos-npm-mcp --version</div>
                    </div>

                    <div className="bg-black text-white p-4 font-mono text-xs">
                      <div className="mb-2 text-gray-400"># Find config file location</div>
                      <div className="text-white">echo $HOME/Library/Application\\ Support/Claude/</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Support Resources */}
          <section>
            <div className="border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4 mb-6">
              <h2 className="text-2xl font-bold font-mono">
                C:\MCP&gt; DIR SUPPORT_RESOURCES
              </h2>
            </div>
            <div className="retro-card p-8">
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h4 className="font-bold font-mono mb-2">[OFFICIAL_DOCS]</h4>
                  <div className="space-y-2">
                    <Link 
                      href="https://github.com/aptos-labs/aptos-npm-mcp"
                      target="_blank"
                      className="block font-mono text-xs hover:underline"
                    >
                      &gt; Aptos NPM MCP Repository
                    </Link>
                    <Link 
                      href="https://aptos.dev"
                      target="_blank"
                      className="block font-mono text-xs hover:underline"
                    >
                      &gt; Aptos Documentation
                    </Link>
                  </div>
                </div>

                <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h4 className="font-bold font-mono mb-2">[HACKATHON_SUPPORT]</h4>
                  <div className="space-y-2">
                    <div className="font-mono text-xs">💬 Slack: #vibe-hack-2025</div>
                    <Link 
                      href="https://www.notion.so/MCP-Feedback-22b8b846eb7280debf3ad4ab2046674f"
                      target="_blank"
                      className="block font-mono text-xs hover:underline"
                    >
                      &gt; MCP Feedback Form
                    </Link>
                  </div>
                </div>

                <div className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-stone-100 p-4">
                  <h4 className="font-bold font-mono mb-2">[COMMUNITY]</h4>
                  <div className="space-y-2">
                    <Link 
                      href="https://discord.gg/aptoslabs"
                      target="_blank"
                      className="block font-mono text-xs hover:underline"
                    >
                      &gt; Aptos Discord
                    </Link>
                    <Link 
                      href="https://github.com/aptos-labs"
                      target="_blank"
                      className="block font-mono text-xs hover:underline"
                    >
                      &gt; Aptos GitHub
                    </Link>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <div className="border-4 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black p-6 max-w-4xl mx-auto">
                  <p className="text-xl font-mono font-bold mb-4">
                    🚀 READY TO BUILD WITH MCP! 🚀
                  </p>
                  <p className="font-mono text-sm mb-6">
                    MCP supercharges your Vibe Coding experience!<br/>
                    Create amazing Aptos DApps faster than ever before.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/submit"
                      className="retro-button px-6 py-3 no-underline"
                    >
                      [START_BUILDING]
                    </Link>
                    <Link
                      href="/readme"
                      className="retro-button px-6 py-3 no-underline"
                    >
                      [HACKATHON_RULES]
                    </Link>
                  </div>
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