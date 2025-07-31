import { Account, Aptos, AptosConfig, Network, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { CONTRACT_CONFIG } from "../app/config/contract";

// Helper function to pad addresses to 64 characters
function padAddress(address: string): string {
  // Remove 0x prefix if present
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;
  // Pad to 64 characters and add 0x prefix
  return '0x' + cleanAddress.padStart(64, '0');
}

async function initializeProjects() {
  console.log("🚀 Starting project initialization...");

  // Initialize Aptos client for testnet
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  // Use the deployed contract address
  const contractAddress = CONTRACT_CONFIG.MODULE_ADDRESS;
  console.log(`📍 Using contract: ${contractAddress}`);

  // You'll need to provide the private key of the contract deployer
  const privateKeyHex = process.env.APTOS_PRIVATE_KEY;
  if (!privateKeyHex) {
    console.error("❌ Please set APTOS_PRIVATE_KEY environment variable");
    console.log("   This should be the private key of the account that deployed the contract");
    process.exit(1);
  }

  // Create account using Ed25519PrivateKey
  const cleanPrivateKey = privateKeyHex.replace(/^(ed25519-priv-)?0x/, '');
  const privateKey = new Ed25519PrivateKey(cleanPrivateKey);
  const account = Account.fromPrivateKey({ privateKey });

  console.log(`🔑 Using account: ${padAddress(account.accountAddress.toString())}`);

  try {
    // Projects to initialize - all projects from projects.json
    const projectIds = ["1", "2", "mdoy56jg-ej1gw", "mdrmvoex-hx59o"];
    
    console.log("📋 Initializing new projects...");
    for (const projectId of projectIds) {
      console.log(`   Initializing project: ${projectId}...`);
      
      const projectTransaction = await aptos.transaction.build.simple({
        sender: account.accountAddress,
        data: {
          function: `${contractAddress}::voting::initialize_project`,
          functionArguments: [projectId],
        },
      });

      const projectResponse = await aptos.signAndSubmitTransaction({
        signer: account,
        transaction: projectTransaction,
      });

      await aptos.waitForTransaction({
        transactionHash: projectResponse.hash,
      });

      console.log(`   ✅ Project ${projectId} initialized`);
      console.log(`   📄 Transaction: https://explorer.aptoslabs.com/txn/${projectResponse.hash}?network=testnet`);
    }

    console.log("\n🎯 PROJECT INITIALIZATION COMPLETE!");
    console.log("=".repeat(50));
    console.log("✅ All new projects are now available for voting!");

    return {
      success: true,
      initializedProjects: projectIds,
    };

  } catch (error) {
    console.error("❌ Initialization failed:", error);
    throw error;
  }
}

// Run initialization if this script is executed directly
if (require.main === module) {
  initializeProjects()
    .then((result) => {
      console.log("\n✅ Initialization successful!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Initialization failed:", error);
      process.exit(1);
    });
}

export { initializeProjects };