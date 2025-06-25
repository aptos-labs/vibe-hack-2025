// Smart contract configuration
export const CONTRACT_CONFIG = {
  // This will be the deployed contract address
  // For now using a placeholder - you'll need to deploy and update this
  MODULE_ADDRESS: "0x42", // Replace with actual deployed address
  MODULE_NAME: "aptos_vibes::voting",
  
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
  NETWORK: "testnet",
  NODE_URL: "https://fullnode.testnet.aptoslabs.com/v1",
  FAUCET_URL: "https://faucet.testnet.aptoslabs.com",
} as const; 