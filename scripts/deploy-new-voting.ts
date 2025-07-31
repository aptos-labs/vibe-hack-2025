import { Account, Aptos, AptosConfig, Network, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

// The same address we've been using
const CONTRACT_ADDRESS = "0x5bd3338c9f09619c16a5207af405b84e98d041c8194ea90c2243be7dba513423";

async function deployNewVotingContract() {
  console.log("🚀 Deploying new project_voting contract...");

  // Initialize Aptos client for testnet
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  // Get private key from environment
  const privateKeyHex = process.env.APTOS_PRIVATE_KEY;
  if (!privateKeyHex) {
    console.error("❌ Please set APTOS_PRIVATE_KEY environment variable");
    process.exit(1);
  }

  // Create account using Ed25519PrivateKey
  const cleanPrivateKey = privateKeyHex.replace(/^(ed25519-priv-)?0x/, '');
  const privateKey = new Ed25519PrivateKey(cleanPrivateKey);
  const account = Account.fromPrivateKey({ privateKey });

  console.log(`🔑 Using account: ${account.accountAddress.toString()}`);
  console.log(`📍 Deploying to address: ${CONTRACT_ADDRESS}`);

  try {
    // Compile and deploy the new voting contract
    console.log("📦 Compiling move package...");
    
    // Build transaction to publish the new module
    const transaction = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: "0x1::code::publish_package_txn",
        functionArguments: [
          // This will be the compiled bytecode - for now we'll use aptos CLI
        ]
      }
    });

    console.log("⚠️  To complete deployment, run this command:");
    console.log(`aptos move publish --profile default --package-dir . --named-addresses aptos_vibes=${CONTRACT_ADDRESS}`);
    console.log("");
    console.log("Then run the initialization:");
    console.log(`aptos move run --profile default --function-id ${CONTRACT_ADDRESS}::project_voting::initialize`);

  } catch (error) {
    console.error("❌ Deployment preparation failed:", error);
    throw error;
  }
}

// Run deployment if this script is executed directly
if (require.main === module) {
  deployNewVotingContract()
    .then(() => {
      console.log("\n✅ Deployment instructions provided!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Deployment failed:", error);
      process.exit(1);
    });
}

export { deployNewVotingContract };