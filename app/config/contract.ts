// Smart contract configuration

// Helper function to pad addresses to 64 characters
export function padAddress(address: string): string {
  // Remove 0x prefix if present
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;
  // Pad to 64 characters and add 0x prefix
  return '0x' + cleanAddress.padStart(64, '0');
}

export const CONTRACT_CONFIG = {
  // Deployed contract address on testnet
  MODULE_ADDRESS: padAddress("0x5bd3338c9f09619c16a5207af405b84e98d041c8194ea90c2243be7dba513423"),
  MODULE_NAME: "aptos_vibes::vibe_voting",
  
  // Function names
  FUNCTIONS: {
    INITIALIZE: "initialize",
    INITIALIZE_PROJECT: "initialize_project", 
    UPVOTE: "upvote",
    DOWNVOTE: "downvote",
    REMOVE_VOTE: "remove_vote",
    GET_PROJECT_VOTES: "get_project_votes",
    GET_USER_VOTE: "get_user_vote",
    GET_VIBE_SCORE: "get_vibe_score",
  },
  
  // Vote types (matching the Move contract)
  VOTE_TYPES: {
    NONE: 0,
    UP: 1,
    DOWN: 2,
  },
} as const;

// Network configuration
export const NETWORK_CONFIG = {
  NETWORK: "testnet" as const,
  NODE_URL: "https://fullnode.testnet.aptoslabs.com/v1",
  FAUCET_URL: "https://faucet.testnet.aptoslabs.com"
} as const; 