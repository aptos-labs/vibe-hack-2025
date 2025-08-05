"use client";

import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";


export function WalletButton() {
  const { connect, disconnect, account, connected, wallets } = useWallet();

  const handleConnect = async () => {
    try {
      if (wallets && wallets.length > 0) {
        await connect(wallets[0].name);
      } else {
        alert(
          "No Aptos wallet found. Please install Petra or another Aptos wallet."
        );
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  if (connected && account) {
    const address = account.address.toString();
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13z" />
        <path d="M21 9H3" />
        <path d="M7 3v6" />
        <path d="M17 3v6" />
      </svg>
      Connect Wallet
    </button>
  );
}
