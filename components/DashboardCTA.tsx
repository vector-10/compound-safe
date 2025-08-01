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
            <div className="mb-6">
              <svg width="58" height="36" viewBox="0 0 58 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                <path d="M41.2 0C36.2 0 32.1 4.1 32.1 9.1C32.1 14.1 36.2 18.2 41.2 18.2C46.2 18.2 50.3 14.1 50.3 9.1C50.3 4.1 46.2 0 41.2 0Z" fill="white"/>
                <path d="M9.1 18.3C4.1 18.3 0 22.4 0 27.4C0 32.4 4.1 36.5 9.1 36.5C14.1 36.5 18.2 32.4 18.2 27.4C18.2 22.4 14.1 18.3 9.1 18.3Z" fill="white"/>
                <path d="M25.2 0C22.7 0 20.3 1 18.6 2.7C16.9 4.4 15.9 6.8 15.9 9.3C15.9 11.8 16.9 14.2 18.6 15.9C20.3 17.6 22.7 18.6 25.2 18.6C27.7 18.6 30.1 17.6 31.8 15.9C33.5 14.2 34.5 11.8 34.5 9.3C34.5 6.8 33.5 4.4 31.8 2.7C30.1 1 27.7 0 25.2 0Z" fill="white"/>
                <path d="M57.3 18.3C54.8 18.3 52.4 19.3 50.7 21C49 22.7 48 25.1 48 27.6C48 30.1 49 32.5 50.7 34.2C52.4 35.9 54.8 36.9 57.3 36.9C59.8 36.9 62.2 35.9 63.9 34.2C65.6 32.5 66.6 30.1 66.6 27.6C66.6 25.1 65.6 22.7 63.9 21C62.2 19.3 59.8 18.3 57.3 18.3Z" fill="white"/>
                <path d="M25.1 20.4C20.1 20.4 16 24.5 16 29.5C16 34.5 20.1 38.6 25.1 38.6C30.1 38.6 34.2 34.5 34.2 29.5C34.2 24.5 30.1 20.4 25.1 20.4Z" fill="white"/>
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-white leading-tight mb-6">
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