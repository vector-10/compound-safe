"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DashboardCTA: React.FC = () => {
  return (
    <div className="w-full py-16  relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl bg-blue-950 rounded-bl-3xl transform scale-110"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 px-6 md:px-8 lg:px-12 py-8 lg:py-16">            
            
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-mono font-bold text-white leading-tight mb-6">
              JOIN COMPOUNDSAFE NOW<br />
              AND REVOLUTIONIZE YOUR<br />
              LIQUIDITY MANAGEMENT<br />
              STRATEGY.
            </h2>
            
            <div className="mt-8">
              <Link href="/dashboard">
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-100 py-3 px-8 rounded-xs font-medium transition-colors">
                  LAUNCH APP
                </button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-3/5 px-4 mt-10 lg:mt-0 mx-auto">
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-2xl">
                <div className="relative w-full aspect-[16/10] bg-gray-900 border border-gray-800">
                  <Image 
                    src="/dashimage.png"
                    alt="CompoundSafe Dashboard"
                    fill
                    className="object-contain"
                    priority
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-start justify-start p-6">
                    <div className="flex items-center w-full justify-between mb-6">
                      <div className="w-6 h-6 bg-white rounded-sm"></div>
                      <div className="text-xs text-gray-400 font-mono">OVERVIEW</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-gray-800 p-4 rounded-sm">
                        <div className="text-xs text-gray-400 mb-2">Total Value Locked</div>
                        <div className="text-xl text-white font-mono">$82.4M</div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-sm">
                        <div className="text-xs text-gray-400 mb-2">Total Fees</div>
                        <div className="text-xl text-white font-mono">$40.2K</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute -top-10 -left-10 w-60 h-60 bg-fuchsia-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCTA;