'use client';

import { useState } from 'react';
import { useToast } from '@/lib/use-toast';

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
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            🤖 {title} Explained
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-4">
        {loading ? (
            <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
            ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
  position: any;
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
      
      const requestBody = {
        metric,
        value,
        position
      };

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
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status}`);
      }
  
      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error('💥 Frontend error:', error);
      showError('Failed to get AI explanation');
      setExplanation('Unable to generate explanation at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getMetricTitle = (metric: string) => {
    const titles: Record<string, string> = {
      'suppliedUSDC': 'Total Supplied',
      'borrowedUSDC': 'Total Borrowed', 
      'collateralValueUSD': 'Collateral Value',
      'healthPercentage': 'Position Health'
    };
    return titles[metric] || metric;
  };

  return (
    <>
      <button
        onClick={handleExplain}
        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline transition-colors"
        disabled={position.loading}
      >
        Explain ℹ️
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

interface MetricCardProps {
  position: any;
}

export default function AIUIMetricCards({ position }: MetricCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Supplied Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Total Supplied
          </h3>
          <ExplainButton 
            metric="suppliedUSDC" 
            value={position.suppliedUSDCFormatted}
            position={position}
          />
        </div>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ${position.loading ? '...' : position.suppliedUSDCFormatted}
        </p>
      </div>
      
      {/* Total Borrowed Card */}
      <div className="bg-white/90 dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Total Borrowed
          </h3>
          <ExplainButton 
            metric="borrowedUSDC" 
            value={position.borrowedUSDCFormatted}
            position={position}
          />
        </div>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
          ${position.loading ? '...' : position.borrowedUSDCFormatted}
        </p>
      </div>

      {/* Collateral Value Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Collateral Value
          </h3>
          <ExplainButton 
            metric="collateralValueUSD" 
            value={position.collateralValueUSD}
            position={position}
          />
        </div>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ${position.loading ? '...' : position.collateralValueUSD.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          WETH @ ${position.loading ? '...' : position.wethPrice.toLocaleString()}
        </p>
      </div>
      
      {/* Position Health Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Position Health
          </h3>
          <ExplainButton 
            metric="healthPercentage" 
            value={position.healthPercentage}
            position={position}
          />
        </div>
        <p className={`text-2xl font-bold ${
          position.riskLevel === 'safe' ? 'text-green-600 dark:text-green-400' :
          position.riskLevel === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
          'text-red-600 dark:text-red-400'
        }`}>
          {position.loading ? '--' : `${position.healthPercentage.toFixed(0)}%`}
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              position.riskLevel === 'safe' ? 'bg-green-500' :
              position.riskLevel === 'warning' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${position.loading ? 0 : position.healthPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}