"use client"
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { FaBell, FaTelegram, FaCheckCircle, FaExclamationTriangle, FaQrcode } from "react-icons/fa";
import { useAccount } from 'wagmi';
import { useCompoundPosition } from '@/lib/compound';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { QRCodeSVG } from 'qrcode.react';

export default function RiskMonitor() {
  const { address, isConnected } = useAccount();
  const position = useCompoundPosition(address);
  const [telegramLinked, setTelegramLinked] = useState(false);
  const [botUsername] = useState('compound_safe_bot'); 
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (address) {
      fetch('/api/check-telegram-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address })
      })
      .then(res => res.json())
      .then(data => setTelegramLinked(data.linked))
      .catch(() => setTelegramLinked(false))
    }
  }, [address]);

  const telegramBotUrl = `https://t.me/${botUsername}?start=${address}`;

  const alertThresholds = [
    { level: '50%', description: 'Early warning - Position becoming risky', color: 'text-yellow-600 dark:text-yellow-400' },
    { level: '20%', description: 'Critical alert - High liquidation risk', color: 'text-orange-600 dark:text-orange-400' },
    { level: '5%', description: 'Emergency alert - Liquidation imminent', color: 'text-red-600 dark:text-red-400' }
  ];

  const getCurrentAlertStatus = () => {
    if (!isConnected || position.loading) return null;
    
    if (position.healthPercentage <= 5) return { level: 'Emergency', color: 'bg-red-500', textColor: 'text-red-600' };
    if (position.healthPercentage <= 20) return { level: 'Critical', color: 'bg-orange-500', textColor: 'text-orange-600' };
    if (position.healthPercentage <= 50) return { level: 'Warning', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { level: 'Safe', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const currentStatus = getCurrentAlertStatus();

  return (
    <DashboardLayout>
      <div className="relative">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Risk Monitor & Alerts
        </h1>

        {/* Connection Requirement */}
        {!isConnected && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBell className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Connect Wallet Required
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Connect your wallet to set up liquidation alerts and monitor your positions
                  </p>
                </div>
                <ConnectButton />
              </div>
            </div>
          </div>
        )}

        {/* Current Position Status */}
        {isConnected && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Current Position Status
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${currentStatus?.color || 'bg-gray-400'}`}></div>
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {currentStatus?.level || 'Unknown'} Status
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {position.loading ? '--' : `${position.healthPercentage.toFixed(1)}%`}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Health</div>
              </div>
            </div>
            {currentStatus && position.healthPercentage <= 50 && (
              <div className={`mt-3 p-3 rounded-lg bg-opacity-10 ${currentStatus.color.replace('bg-', 'bg-')}`}>
                <div className="flex items-center space-x-2">
                  <FaExclamationTriangle className={currentStatus.textColor} />
                  <span className={`font-medium ${currentStatus.textColor}`}>
                    Action Required: Your position is at risk
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Telegram Integration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Setup Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <FaTelegram className="text-2xl text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Telegram Alerts
              </h2>
            </div>

            {telegramLinked ? (
              <div className="text-center py-4">
                <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Alerts Active
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You'll receive notifications when your position health drops below alert thresholds
                </p>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Disconnect Alerts
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get instant notifications when your position approaches liquidation risk
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => window.open(telegramBotUrl, '_blank')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaTelegram />
                    <span>Open in Telegram</span>
                  </button>
                  
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaQrcode />
                    <span>Show QR Code</span>
                  </button>
                </div>

                {showQR && (
                  <div className="mt-4 text-center">
                    <div className="inline-block p-3 bg-white rounded-lg border border-gray-200 dark:border-gray-600">
                    <QRCodeSVG 
                        value={telegramBotUrl} 
                        size={200}
                        level="M"
                        includeMargin={true}
                        />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Scan with your phone to open Telegram
                    </p>
                  </div>
                )}

                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Setup Steps:</strong><br />
                    1. Click "Open in Telegram" or scan QR code<br />
                    2. Start a conversation with the bot<br />
                    3. Alerts will be automatically linked to your wallet
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Alert Thresholds */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Alert Thresholds
            </h2>
            <div className="space-y-4">
              {alertThresholds.map((threshold, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    threshold.level === '50%' ? 'bg-yellow-500' :
                    threshold.level === '20%' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className={`font-medium ${threshold.color}`}>
                      {threshold.level} Health Remaining
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {threshold.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Smart Alerts Include:
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Current collateral value & borrowed amount</li>
                <li>• Exact liquidation price for your WETH</li>
                <li>• Specific actions to avoid liquidation</li>
                <li>• Buffer amount remaining before danger</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alert History */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Alert Activity
          </h2>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {telegramLinked ? (
              "No recent alerts - your position is healthy!"
            ) : (
              "Connect Telegram to see alert history"
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}