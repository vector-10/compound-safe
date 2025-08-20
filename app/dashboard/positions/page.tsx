"use client"
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaShieldAlt } from "react-icons/fa";
import { useAccount } from 'wagmi';
import { useCompoundPosition } from '@/lib/compound';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useToast } from '@/lib/use-toast';
import { CompoundPosition } from '@/lib/compound';


interface AIUIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  explanation: string;
  loading: boolean;
}

function AIUIModal({ isOpen, onClose, title, explanation, loading }: AIUIModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
             {title} Explained
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
        {loading ? (
            <div className="animate-pulse">
                <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-4/5 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            </div>
            ) : (
            <p className="text-gray-300 leading-relaxed">
                {explanation}
            </p>
            )}
        </div>
        
        <button
          onClick={onClose}
          className="w-full border text-white py-2 px-4 rounded-lg transition-colors"
        >
          Thank you!
        </button>
      </div>
    </div>
  );
}

interface ExplainButtonProps {
  metric: string;
  value: string | number;
  position: CompoundPosition;
}

function ExplainButton({ metric, value, position }: ExplainButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();

  const handleExplain = async () => {
    setIsModalOpen(true);
    setLoading(true);
    
    try {
      const serializedPosition = {
        healthPercentage: position.healthPercentage,
        healthFactor: position.healthFactor,
        riskLevel: position.riskLevel,
        collateralValueUSD: position.collateralValueUSD,
        borrowedUSDCFormatted: position.borrowedUSDCFormatted,
        liquidationPrice: position.liquidationPrice,
        safeBorrowAmount: position.safeBorrowAmount,
        wethPrice: position.wethPrice,
        maxBorrowableUSD: position.maxBorrowableUSD,
        currentBorrowCapacityUsed: position.currentBorrowCapacityUsed,
      };
      
      const response = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            metric,
            value,
            position: serializedPosition 
          })
      });
  
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
  
      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Frontend error:', error);
      showError('Failed to get AI explanation');
      setExplanation('Unable to generate explanation at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getMetricTitle = (metric: string) => {
    const titles: Record<string, string> = {
      'riskLevel': 'Risk Level',
      'currentBorrowCapacityUsed': 'Borrow Capacity Used',
      'liquidationPrice': 'Liquidation Price',
      'bufferAmount': 'Safety Buffer',
      'maxBorrowableUSD': 'Max Borrowable',
      'safeBorrowAmount': 'Available to Borrow',
      'collateralWETHFormatted': 'WETH Collateral'
    };
    return titles[metric] || metric;
  };

  return (
    <>
      <button
        onClick={handleExplain}
        className="text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline transition-colors"
        disabled={position.loading}
      >
        Explain
      </button>
      
      <AIUIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getMetricTitle(metric)}
        explanation={explanation}
        loading={loading}
      />
    </>
  );
}

export default function ExpandedMetrics() {
  const { address, isConnected } = useAccount();
  const position = useCompoundPosition(address);

  const bufferAmount = position.wethPrice && position.liquidationPrice 
    ? (position.wethPrice - position.liquidationPrice) * (position.collateralValueUSD / position.wethPrice)
    : 0;

  return (
    <DashboardLayout>
      <div className="relative">
        <h1 className="text-2xl font-bold text-white mb-6">
          Position Metrics
        </h1>

        {!isConnected && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="w-10 h-12 lg:w-12 lg:h-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Connect Wallet Required
                  </h3>
                  <p className="text-gray-400">
                    Connect your wallet to view your position metrics and analytics
                  </p>
                </div>
                <ConnectButton />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Risk Level
                </h3>
                <ExplainButton 
                  metric="riskLevel" 
                  value={position.riskLevel || 'safe'}
                  position={position}
                />
              </div>
              <div className="mb-2">
                <span className={`inline-block font-medium capitalize px-3 py-2 rounded-full text-lg ${
                  (position.riskLevel || 'safe') === 'safe' ? 'bg-green-900/20 text-green-400' :
                  (position.riskLevel || 'safe') === 'warning' ? 'bg-yellow-900/20 text-yellow-400' :
                  'bg-red-900/20 text-red-400'
                }`}>
                  {position.loading ? '...' : (position.riskLevel || 'safe')}
                </span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Borrow Capacity Used
                </h3>
                <ExplainButton 
                  metric="currentBorrowCapacityUsed" 
                  value={position.currentBorrowCapacityUsed || 0}
                  position={position}
                />
              </div>
              <p className="text-2xl font-bold text-blue-400">
                {position.loading ? '--' : `${(position.currentBorrowCapacityUsed || 0).toFixed(1)}%`}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    (position.currentBorrowCapacityUsed || 0) >= 80 ? 'bg-red-500' :
                    (position.currentBorrowCapacityUsed || 0) >= 60 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${position.loading ? 0 : Math.min(position.currentBorrowCapacityUsed || 0, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Liquidation Price
                </h3>
                <ExplainButton 
                  metric="liquidationPrice" 
                  value={position.liquidationPrice || 0}
                  position={position}
                />
              </div>
              <p className="text-2xl font-bold text-red-400">
                ${position.loading ? '...' : (position.liquidationPrice || 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Current: ${position.loading ? '...' : (position.wethPrice || 0).toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Safety Buffer
                </h3>
                <ExplainButton 
                  metric="bufferAmount" 
                  value={bufferAmount}
                  position={position}
                />
              </div>
              <p className="text-2xl font-bold text-green-400">
                ${position.loading ? '...' : bufferAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Protection margin
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-6">
              Borrowing Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium text-white">Max Borrowable</h4>
                  <ExplainButton 
                    metric="maxBorrowableUSD" 
                    value={position.maxBorrowableUSD || 0}
                    position={position}
                  />
                </div>
                <p className="text-2xl font-bold text-blue-400">
                  ${position.loading ? '...' : (position.maxBorrowableUSD || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">
                  Maximum theoretical borrow
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium text-white">Available to Borrow</h4>
                  <ExplainButton 
                    metric="safeBorrowAmount" 
                    value={position.safeBorrowAmount || 0}
                    position={position}
                  />
                </div>
                <p className="text-2xl font-bold text-green-400">
                  ${position.loading ? '...' : (position.safeBorrowAmount || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">
                  Safe borrowing limit
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium text-white">WETH Collateral</h4>
                  <ExplainButton 
                    metric="collateralWETHFormatted" 
                    value={position.collateralWETHFormatted || '0'}
                    position={position}
                  />
                </div>
                <p className="text-2xl font-bold text-blue-400">
                  {position.loading ? '...' : (position.collateralWETHFormatted || '0')} WETH
                </p>
                <p className="text-sm text-gray-400">
                  @ ${position.loading ? '...' : (position.wethPrice || 0).toLocaleString()} each
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}