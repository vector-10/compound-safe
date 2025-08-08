"use client"
import DashboardLayout from './components/DashboardLayout';
import { FaShieldAlt } from "react-icons/fa";
import { useAccount } from 'wagmi';
import { useCompoundPosition } from '@/lib/compound';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useToast } from '@/lib/use-toast';
import { useEffect } from 'react';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const position = useCompoundPosition(address);
  const { showSuccess, showWarning } = useToast();

  useEffect(() => {
    if (isConnected && address) {
      showSuccess('Wallet connected successfully!');
    }
  }, [isConnected, address, showSuccess]);

  useEffect(() => {
    if (isConnected && !position.loading && position.riskLevel === 'warning') {
      showWarning('Your health factor is in the warning zone!');
    }
  }, [isConnected, position.loading, position.riskLevel, showWarning]);

  return (
    <DashboardLayout>
      <div className="relative">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard Overview
        </h1>
        
        {/* Connection Modal Overlay */}
        {!isConnected && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="w-10 h-12 lg:w-12 lg:h-12 text-blue-600" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-400">
                    Connect your wallet to monitor your Compound positions and manage liquidation risks
                  </p>
                </div>
                
                <div className="mb-6 flex justify-center">
                  <ConnectButton />
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>Supported wallets: MetaMask, WalletConnect, Coinbase Wallet...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Supplied
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${position.loading ? '...' : position.suppliedUSDCFormatted}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Borrowed
            </h3>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${position.loading ? '...' : position.borrowedUSDCFormatted}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Collateral Deposit
            </h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${position.collateralValueUSD.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Health Factor
            </h3>
            <p className={`text-2xl font-bold ${
              position.riskLevel === 'safe' ? 'text-green-600 dark:text-green-400' :
              position.riskLevel === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {position.loading ? '--' : position.healthFactor.toFixed(2)}
            </p>
          </div>
        </div>

        {isConnected && !position.loading ? (
          <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Position Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm  md:text-lg">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Risk Level:</span>
                <span className={`ml-2 font-medium capitalize ${
                  position.riskLevel === 'safe' ? 'text-green-600' :
                  position.riskLevel === 'warning' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {position.riskLevel}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Collateral Value:</span>
                <span className="ml-2 font-medium">
                  ${position.collateralValueUSD.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">WETH Collateral:</span>
                <span className="ml-2 font-medium">
                  {position.collateralWETHFormatted} WETH
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Utilization Rate:</span>
                <span className="ml-2 font-medium">
                  {position.utilizationRate.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}