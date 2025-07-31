import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { CONTRACT_CONFIG, NETWORK_CONFIG } from "../app/config/contract";

async function checkProjectStatus() {
  console.log("🔍 Checking project initialization status...");
  
  const config = new AptosConfig({ 
    network: Network.TESTNET,
    fullnode: NETWORK_CONFIG.NODE_URL,
  });
  const aptos = new Aptos(config);

  const projectIds = ["1", "2", "mdoy56jg-ej1gw", "mdrmvoex-hx59o"];
  
  for (const projectId of projectIds) {
    try {
      const result = await aptos.view({
        payload: {
          function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::voting::get_project_votes` as `${string}::${string}::${string}`,
          functionArguments: [CONTRACT_CONFIG.MODULE_ADDRESS, projectId],
        },
      });
      
      const [upvotes, downvotes] = result as [number, number];
      console.log(`✅ Project "${projectId}": INITIALIZED (upvotes: ${upvotes}, downvotes: ${downvotes})`);
    } catch (error) {
      console.log(`❌ Project "${projectId}": NOT INITIALIZED`);
      console.log(`   Error: ${error}`);
    }
  }
  
  // Also test the contract address format
  console.log(`\n📍 Contract address: ${CONTRACT_CONFIG.MODULE_ADDRESS}`);
  console.log(`📍 Network URL: ${NETWORK_CONFIG.NODE_URL}`);
}

checkProjectStatus().catch(console.error);