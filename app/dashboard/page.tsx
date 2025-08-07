"use client"
import DashboardLayout from './components/DashboardLayout';
import { useAccount } from 'wagmi';
import { useCompoundPosition } from '@/lib/compound';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const position = useCompoundPosition(address);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard Overview
        </h1>
        
        {!isConnected ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Connect your wallet to view your Compound position
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Risk Status Card */}
        {isConnected && !position.loading ? (
          <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Position Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
            
            {position.error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-400 text-sm">
                Error: {position.error}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}