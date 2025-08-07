"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export type NetworkStatus = 'correct' | 'wrong' | 'unknown' | 'disconnected';

export interface NetworkInfo {
  status: NetworkStatus;
  currentNetwork: string | null;
  expectedNetwork: string;
  isTestnet: boolean;
}

export function useNetworkCheck(): NetworkInfo {
  const { connected, account } = useWallet();
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    status: 'disconnected',
    currentNetwork: null,
    expectedNetwork: 'Testnet',
    isTestnet: false,
  });

  useEffect(() => {
    if (!connected || !account) {
      setNetworkInfo({
        status: 'disconnected',
        currentNetwork: null,
        expectedNetwork: 'Testnet',
        isTestnet: false,
      });
      return;
    }

    const checkNetwork = async () => {
      try {
        // Create Aptos client to check network
        const config = new AptosConfig({ network: Network.TESTNET });
        const aptos = new Aptos(config);
        
        // Try to get account info - this will help us determine if we're on the right network
        try {
          await aptos.getAccountInfo({
            accountAddress: account.address.toString(),
          });
          
          // If we can get account info without error, we're likely on testnet
          setNetworkInfo({
            status: 'correct',
            currentNetwork: 'Testnet',
            expectedNetwork: 'Testnet',
            isTestnet: true,
          });
        } catch (error: unknown) {
          // Check if it's a network-related error
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (errorMessage.includes('404') || errorMessage.includes('not found')) {
            // Account not found on testnet, might be on mainnet or different network
            setNetworkInfo({
              status: 'wrong',
              currentNetwork: 'Unknown/Mainnet',
              expectedNetwork: 'Testnet',
              isTestnet: false,
            });
          } else {
            // Other error - network might be correct but other issue
            setNetworkInfo({
              status: 'unknown',
              currentNetwork: 'Unknown',
              expectedNetwork: 'Testnet',
              isTestnet: false,
            });
          }
        }
      } catch (error) {
        console.error('Network check failed:', error);
        setNetworkInfo({
          status: 'unknown',
          currentNetwork: 'Unknown',
          expectedNetwork: 'Testnet',
          isTestnet: false,
        });
      }
    };

    checkNetwork();
  }, [connected, account]);

  return networkInfo;
}