"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network, MoveValue } from "@aptos-labs/ts-sdk";
import { CONTRACT_CONFIG, NETWORK_CONFIG } from "../config/contract";

interface VotingSystemWrapperProps {
  projectId: string;
  onVibeScoreUpdate: (projectId: string, vibeScore: number) => void;
}

interface VoteData {
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  userVote: 'up' | 'down' | null;
}

type TransactionState = 'idle' | 'pending' | 'success' | 'error';

export function VotingSystemWrapper({ projectId, onVibeScoreUpdate }: VotingSystemWrapperProps) {
  const { connected, account, signAndSubmitTransaction } = useWallet();
  const [voteData, setVoteData] = useState<VoteData>({
    upvotes: 0,
    downvotes: 0,
    totalVotes: 0,
    userVote: null,
  });
  const [transactionState, setTransactionState] = useState<TransactionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProjectInitialized, setIsProjectInitialized] = useState<boolean>(true);
  
  // Initialize Aptos client with useMemo to prevent recreation on every render
  const aptos = useMemo(() => {
    const aptosConfig = new AptosConfig({ 
      network: Network.TESTNET,
      fullnode: NETWORK_CONFIG.NODE_URL,
    });
    return new Aptos(aptosConfig);
  }, []); // Empty dependency array since config never changes

  // Check if project is initialized in smart contract
  const checkProjectInitialized = useCallback(async () => {
    try {
      await aptos.view({
        payload: {
          function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::project_voting::get_project_votes` as `${string}::${string}::${string}`,
          functionArguments: [CONTRACT_CONFIG.MODULE_ADDRESS, projectId],
        },
      });
      setIsProjectInitialized(true);
      return true; // If we get here, project exists
    } catch {
      console.log(`Project ${projectId} not initialized in smart contract`);
      setIsProjectInitialized(false);
      return false;
    }
  }, [projectId, aptos]);

  // Load vote data from smart contract
  const loadVoteData = useCallback(async () => {
    try {
      // First check if project is initialized
      const isInitialized = await checkProjectInitialized();
      
      if (!isInitialized) {
        console.warn(`Project ${projectId} is not initialized in smart contract. Displaying zero votes.`);
        setVoteData({
          upvotes: 0,
          downvotes: 0,
          totalVotes: 0,
          userVote: null,
        });
        onVibeScoreUpdate(projectId, 0);
        return;
      }

      if (!account) {
        // Load public vote counts without user vote
        const result = await aptos.view({
          payload: {
            function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::project_voting::get_project_votes` as `${string}::${string}::${string}`,
            functionArguments: [CONTRACT_CONFIG.MODULE_ADDRESS, projectId],
          },
        });

        const [upvotes, downvotes] = result as [number, number];
        const vibeScore = upvotes - downvotes;
        setVoteData({
          upvotes,
          downvotes,
          totalVotes: vibeScore,
          userVote: null,
        });
        onVibeScoreUpdate(projectId, vibeScore);
        return;
      }

      // Load vote counts and user vote
      const [voteCountsResult, userVoteResult] = await Promise.all([
        aptos.view({
          payload: {
            function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::project_voting::get_project_votes` as `${string}::${string}::${string}`,
            functionArguments: [CONTRACT_CONFIG.MODULE_ADDRESS, projectId],
          },
        }),
        aptos.view({
          payload: {
            function: `${CONTRACT_CONFIG.MODULE_ADDRESS}::project_voting::get_user_vote` as `${string}::${string}::${string}`,
            functionArguments: [CONTRACT_CONFIG.MODULE_ADDRESS, projectId, account.address.toString()],
          },
        })
      ]);

      const [upvotes, downvotes] = voteCountsResult as [number, number];
      const userVoteType = (userVoteResult as MoveValue[])[0] as number;

      let userVote: 'up' | 'down' | null = null;
      if (userVoteType === CONTRACT_CONFIG.VOTE_TYPES.UP) {
        userVote = 'up';
      } else if (userVoteType === CONTRACT_CONFIG.VOTE_TYPES.DOWN) {
        userVote = 'down';
      }

      const vibeScore = upvotes - downvotes;
      setVoteData({
        upvotes,
        downvotes,
        totalVotes: vibeScore,
        userVote,
      });
      onVibeScoreUpdate(projectId, vibeScore);
    } catch (error) {
      console.error("Error loading vote data:", error);
      // Fallback to zero values if contract not initialized
      setVoteData({
        upvotes: 0,
        downvotes: 0,
        totalVotes: 0,
        userVote: null,
      });
      onVibeScoreUpdate(projectId, 0);
    }
  }, [account, projectId, aptos, onVibeScoreUpdate, checkProjectInitialized]);

  // Handle voting transactions
  const handleVote = async (voteType: 'up' | 'down') => {
    if (!connected || !account || !signAndSubmitTransaction) {
      return;
    }

    // Check if project is initialized before attempting to vote
    if (!isProjectInitialized) {
      setErrorMessage('This project is not yet available for voting. Please try again later.');
      setTransactionState('error');
      setTimeout(() => {
        setTransactionState('idle');
        setErrorMessage('');
      }, 3000);
      return;
    }

    setTransactionState('pending');
    setErrorMessage('');

    try {
      // Double-check initialization status right before voting
      const initialized = await checkProjectInitialized();
      if (!initialized) {
        throw new Error('Project not initialized in smart contract');
      }

      // Determine if this is a toggle (remove vote) or switch vote
      const isSameVote = voteData.userVote === voteType;
      
      let functionName: `${string}::${string}::${string}`;

      if (isSameVote) {
        // Remove vote if clicking same vote type
        functionName = `${CONTRACT_CONFIG.MODULE_ADDRESS}::project_voting::remove_vote` as `${string}::${string}::${string}`;
      } else {
        // Cast new vote
        functionName = voteType === 'up' 
          ? `${CONTRACT_CONFIG.MODULE_ADDRESS}::project_voting::upvote` as `${string}::${string}::${string}`
          : `${CONTRACT_CONFIG.MODULE_ADDRESS}::project_voting::downvote` as `${string}::${string}::${string}`;
      }

      const response = await signAndSubmitTransaction({
        data: {
          function: functionName,
          functionArguments: [CONTRACT_CONFIG.MODULE_ADDRESS, projectId],
        },
      });

      // Wait for transaction to be confirmed
      await aptos.waitForTransaction({
        transactionHash: response.hash,
      });

      setTransactionState('success');
      
      // Reload vote data from contract
      await loadVoteData();
      
      // Reset transaction state after a delay
      setTimeout(() => setTransactionState('idle'), 2000);

    } catch (error: unknown) {
      console.error("Voting transaction failed:", error);
      let errorMsg = "Transaction failed";
      
      if (error instanceof Error) {
        errorMsg = error.message;
        // Provide more user-friendly error messages
        if (errorMsg.includes('E_NOT_INITIALIZED') || errorMsg.includes('not initialized')) {
          errorMsg = 'This project is not yet available for voting.';
        } else if (errorMsg.includes('INSUFFICIENT_BALANCE')) {
          errorMsg = 'Insufficient APT balance for transaction fees.';
        } else if (errorMsg.includes('EACCOUNT_NOT_FOUND')) {
          errorMsg = 'Please ensure your wallet is properly connected.';
        }
      }
      
      setErrorMessage(errorMsg);
      setTransactionState('error');
      
      // Reset error state after a delay
      setTimeout(() => {
        setTransactionState('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  // Load data on component mount and when wallet connection changes
  useEffect(() => {
    loadVoteData();
  }, [loadVoteData]);

  // Get button states
  const getButtonState = (voteType: 'up' | 'down') => {
    const isActive = voteData.userVote === voteType;
    const isDisabled = !connected || transactionState === 'pending' || !isProjectInitialized;
    
    return { isActive, isDisabled };
  };

  const upButtonState = getButtonState('up');
  const downButtonState = getButtonState('down');

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Upvote Button */}
          <button
            type="button"
            onClick={() => handleVote('up')}
            disabled={upButtonState.isDisabled}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all
              ${upButtonState.isActive
                ? 'bg-green-100 text-green-700 shadow-md dark:bg-green-900/30 dark:text-green-300'
                : 'bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400'
              }
              ${upButtonState.isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
            `}
            title={
              !connected 
                ? "Connect wallet to vote"
                : !isProjectInitialized
                  ? "Project not available for voting yet"
                : upButtonState.isActive 
                  ? "Click to remove your upvote" 
                  : "Click to upvote"
            }
          >
            <span className="text-lg">👍</span>
            <span className="text-sm">{voteData.upvotes}</span>
          </button>

          {/* Downvote Button */}
          <button
            type="button"
            onClick={() => handleVote('down')}
            disabled={downButtonState.isDisabled}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all
              ${downButtonState.isActive
                ? 'bg-red-100 text-red-700 shadow-md dark:bg-red-900/30 dark:text-red-300'
                : 'bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400'
              }
              ${downButtonState.isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
            `}
            title={
              !connected 
                ? "Connect wallet to vote"
                : !isProjectInitialized
                  ? "Project not available for voting yet"
                : downButtonState.isActive 
                  ? "Click to remove your downvote" 
                  : "Click to downvote"
            }
          >
            <span className="text-lg">👎</span>
            <span className="text-sm">{voteData.downvotes}</span>
          </button>
        </div>

        {/* Vibe Score */}
        <div className="text-right">
          <div className={`text-lg font-bold ${
            voteData.totalVotes > 0 ? 'text-green-600 dark:text-green-400' : 
            voteData.totalVotes < 0 ? 'text-red-600 dark:text-red-400' : 
            'text-gray-600 dark:text-gray-400'
          }`}>
            Vibe Score: {voteData.totalVotes > 0 ? '+' : ''}{voteData.totalVotes}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ↑{voteData.upvotes} • ↓{voteData.downvotes}
          </div>
        </div>
      </div>

      {/* Transaction Status */}
      {transactionState !== 'idle' && (
        <div className="mt-3 p-2 rounded-lg text-sm">
          {transactionState === 'pending' && (
            <div className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              Processing transaction...
            </div>
          )}
          {transactionState === 'success' && (
            <div className="text-green-600 dark:text-green-400">
              ✓ Vote recorded on-chain!
            </div>
          )}
          {transactionState === 'error' && (
            <div className="text-red-600 dark:text-red-400">
              ✗ {errorMessage || 'Transaction failed'}
            </div>
          )}
        </div>
      )}

      {/* User Vote Status */}
      {connected && voteData.userVote && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Your vote: {voteData.userVote === 'up' ? '👍' : '👎'} • Click same button to remove
        </div>
      )}

      {/* Connect Wallet Message */}
      {!connected && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Connect wallet to vote on-chain
        </div>
      )}

      {/* Project Not Initialized Message */}
      {connected && !isProjectInitialized && (
        <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
          ⚠️ Project not yet available for voting
        </div>
      )}
    </div>
  );
} 