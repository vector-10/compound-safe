'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useCompoundPosition } from '@/lib/compound';
import { usePathname } from 'next/navigation';
import { FaHome, FaBell, FaShieldAlt } from "react-icons/fa";
import { IoPieChart, IoSettings, IoAlertCircle } from "react-icons/io5";


export default function DashboardSidebar() {
  const { address, isConnected } = useAccount();
  const position = useCompoundPosition(address);
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: FaHome,
    },
    {
      name: 'Positions',
      href: '/dashboard/positions',
      icon: IoPieChart,
    },
    {
      name: 'Risk Monitor',
      href: '/dashboard/risk-monitor',
      icon: IoAlertCircle,
    },
    {
      name: 'Alerts',
      href: '/dashboard/alerts',
      icon: FaBell,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: IoSettings,
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full">
      <div className="p-6">
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>


        <div className="mt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Quick Stats
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Total Supplied</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  ${position.loading ? '...' : position.suppliedUSDCFormatted}
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Total Borrowed</span>
                <span className="text-red-600 dark:text-red-400 font-medium">
                  ${position.loading ? '...' : position.borrowedUSDCFormatted}
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Collateral</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  ${position.loading ? '...' : position.collateralValueUSD.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Risk Level</span>
                <span className={`font-medium capitalize ${
                  !isConnected || position.loading ? 'text-gray-500 dark:text-gray-400' :
                  position.riskLevel === 'safe' ? 'text-green-600 dark:text-green-400' :
                  position.riskLevel === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {!isConnected ? 'No Position' : 
                   position.loading ? '...' : 
                   position.riskLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FaShieldAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Protection Status
              </h3>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
              Your positions are being monitored 24/7
            </p>
            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
              <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full w-4/5"></div>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Active Protection
            </p>
          </div>
        </div>

        
      </div>
    </aside>
  );
}