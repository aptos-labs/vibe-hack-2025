import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import fs from "fs";
import path from "path";

// Helper function to pad addresses to 64 characters
function padAddress(address: string): string {
  // Remove 0x prefix if present
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;
  // Pad to 64 characters and add 0x prefix
  return '0x' + cleanAddress.padStart(64, '0');
}

async function deployContract() {
  console.log("🚀 Starting contract deployment...");

  // Initialize Aptos client for testnet
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  // Generate a new account for the contract deployment
  // In production, you'd want to use a secure private key
  const account = Account.generate();
  
  // Get properly formatted address
  const contractAddress = padAddress(account.accountAddress.toString());
  
  console.log(`📍 Deploying from account: ${contractAddress}`);
  console.log(`🔑 Private key: ${account.privateKey}`);
  console.log("⚠️  IMPORTANT: Save this private key securely! You'll need it to manage the contract.");

  try {
    // Manual funding required - automatic faucet is no longer available
    console.log("💰 Please fund the account manually:");
    console.log(`   1. Go to: https://aptos.dev/network/faucet`);
    console.log(`   2. Enter address: ${contractAddress}`);
    console.log(`   3. Request testnet APT tokens`);
    console.log(`   4. Wait for confirmation, then press Enter to continue...`);
    
    // Wait for user input
    process.stdin.setRawMode?.(true);
    process.stdin.resume();
    await new Promise((resolve) => {
      process.stdin.once('data', () => {
        process.stdin.setRawMode?.(false);
        process.stdin.pause();
        resolve(true);
      });
    });

    console.log("✅ Continuing with deployment...");

    // Read the compiled Move bytecode
    const packageMetadata = fs.readFileSync(
      path.join(__dirname, "../move/build/aptos_vibes/package-metadata.bcs")
    );
    const byteCode = fs.readFileSync(
      path.join(__dirname, "../move/build/aptos_vibes/bytecode_modules/project_voting.mv")
    );

    console.log("📦 Publishing Move package...");

    // Deploy the contract
    const transaction = await aptos.publishPackageTransaction({
      account: account.accountAddress,
      metadataBytes: packageMetadata,
      moduleBytecode: [byteCode],
    });

    const response = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction,
    });

    await aptos.waitForTransaction({
      transactionHash: response.hash,
    });

    console.log("🎉 Contract deployed successfully!");
    console.log(`📄 Transaction hash: ${response.hash}`);
    console.log(`🏠 Contract address: ${contractAddress}`);

    // Initialize the voting system
    console.log("🔧 Initializing voting system...");
    
    const initTransaction = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${contractAddress}::project_voting::initialize`,
        functionArguments: [],
      },
    });

    const initResponse = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: initTransaction,
    });

    await aptos.waitForTransaction({
      transactionHash: initResponse.hash,
    });

    console.log("✅ Voting system initialized");
    console.log(`📄 Init transaction hash: ${initResponse.hash}`);

    // Note: Projects are auto-created when first vote is cast, no manual initialization needed
    console.log("📋 Projects will be auto-created when first votes are cast (no manual initialization needed)");

    console.log("\n🎯 DEPLOYMENT COMPLETE!");
    console.log("=".repeat(50));
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`Network: Testnet`);
    console.log("=".repeat(50));
    console.log("\n📝 Next steps:");
    console.log(`1. Update CONTRACT_CONFIG.MODULE_ADDRESS in app/config/contract.ts to: padAddress("${contractAddress}")`);
    console.log("2. Save the private key securely for future contract management");
    console.log("3. Test the voting functionality on the frontend");
    console.log("\n🔧 Copy this line to update your config:");
    console.log(`MODULE_ADDRESS: padAddress("${contractAddress}"),`);

    return {
      contractAddress,
      privateKey: account.privateKey.toString(),
      deploymentHash: response.hash,
    };

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

// Run deployment if this script is executed directly
deployContract()
  .then((result) => {
    console.log("\n✅ Deployment successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });

export { deployContract }; 