  "use client"
  import DashboardLayout from './components/DashboardLayout';
  import { FaShieldAlt } from "react-icons/fa";
  import { useAccount } from 'wagmi';
  import { useCompoundPosition } from '@/lib/compound';
  import { ConnectButton } from '@rainbow-me/rainbowkit';
  import AIUIMetricCards from './components/AIUIMetricCards';
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
        showWarning(`Your position health is at ${position.healthPercentage.toFixed(0)}% - Consider reducing risk!`);
      }
    }, [isConnected, position.loading, position.riskLevel, position.healthPercentage, showWarning]);

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

              <AIUIMetricCards position={position} />

          {/* New Advanced Metrics Section */}
          {isConnected && !position.loading ? (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Position Risk Analysis */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Risk Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Risk Level:</span>
                    <span className={`font-medium capitalize px-2 py-1 rounded-full text-sm ${
                      position.riskLevel === 'safe' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                      position.riskLevel === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {position.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Borrow Capacity Used:</span>
                    <span className="font-medium">
                      {position.currentBorrowCapacityUsed.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Liquidation Price:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      ${position.liquidationPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Safety Buffer:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      ${position.bufferAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Borrowing Insights */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Borrowing Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Max Borrowable:</span>
                    <span className="font-medium">
                      ${position.maxBorrowableUSD.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Available to Borrow:</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      ${position.safeBorrowAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">WETH Collateral:</span>
                    <span className="font-medium">
                      {position.collateralWETHFormatted} WETH
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Market Utilization:</span>
                    <span className="font-medium">
                      {position.utilizationRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          
        </div>
      </DashboardLayout>
    );
  }