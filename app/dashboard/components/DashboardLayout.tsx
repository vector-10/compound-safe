'use client';

import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-900 transition-colors overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-30">
        <DashboardHeader onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      
      <div className="flex h-full pt-16">
        <div className="hidden lg:block fixed left-0 top-16 bottom-0 z-20">
          <DashboardSidebar />
        </div>
        
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black/60 bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className={`lg:hidden fixed top-0 right-0 h-full w-60 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex">
              <ConnectButton />
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            <DashboardSidebar />
          </div>
        </div>

        <main className="flex-1 lg:ml-64 overflow-y-auto h-full">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}