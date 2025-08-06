'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletConnectProps {
  onAddressChange: (address: string) => void;
}

export default function WalletConnect({ onAddressChange }: WalletConnectProps) {
  const [connectedAddress, setConnectedAddress] = useState<string>('');
  const [watchAddress, setWatchAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setConnectedAddress(address);
        onAddressChange(address);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleWatchAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (ethers.isAddress(watchAddress)) {
      onAddressChange(watchAddress);
    } else {
      alert('Please enter a valid Ethereum address');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Connect Wallet or Watch Address</h2>
      
      {connectedAddress && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-700">
            Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
          </p>
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or watch any address</span>
        </div>
      </div>

      <form onSubmit={handleWatchAddress}>
        <div className="flex gap-2">
          <input
            type="text"
            value={watchAddress}
            onChange={(e) => setWatchAddress(e.target.value)}
            placeholder="0x1234...abcd (paste any wallet address)"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Watch
          </button>
        </div>
      </form>
    </div>
  );
}