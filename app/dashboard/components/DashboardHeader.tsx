'use client';

import { FaShieldAlt } from "react-icons/fa";
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface DashboardHeaderProps {
  onMobileMenuToggle: () => void;
}

export default function DashboardHeader({ onMobileMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-900 relative z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          
          <Link href="/" className="flex items-center space-x-1 lg:space-x-2">
            <span className="text-lg lg:text-xl font-semibold text-white">
              CompoundSafe
            </span>
            <FaShieldAlt className="w-5 h-5 lg:w-8 lg:h-8 text-blue-600" />
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ConnectButton />
            </div>

            <button 
              onClick={onMobileMenuToggle}
              className="lg:hidden text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}