"use client"
import React, { useState } from 'react';
import Partners from '@/components/Partners';
import Image from 'next/image'
import Link from 'next/link';
import { Shield } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle';

const Page = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none md:hidden" />
            
            <header className="border-b border-gray-200 dark:border-gray-800 relative z-10">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">

                    <div className="flex items-center space-x-1 lg:space-x-2">
                        <span className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                            CompoundSafe
                        </span>
                        <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                    </div>

                        <div className="hidden lg:flex items-center space-x-8">
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors text-sm">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors text-sm">
                                About
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors text-sm">
                                Technology
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors text-sm">
                                Docs
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-blue-400 transition-colors text-sm">
                                Contact
                            </a>
                        </div>

                        <div className="md:flex items-center space-x-4 hidden">
                            <ThemeToggle />
                            
                            <Link 
                                href="/dashboard" 
                                className="bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-xs text-sm font-medium transition-colors"
                            >
                                GET STARTED
                            </Link>
                        </div>

                        <div className="lg:hidden flex items-center space-x-3">
                            <ThemeToggle />
                            <button 
                                onClick={() => setMobileMenuOpen(true)}
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu - Slide from Right */}
            <div className={`fixed top-0 right-0 h-full w-70 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-1 lg:space-x-2">
                            <span className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                                CompoundSafe
                            </span>
                            <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                        </div>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <div className="p-6">
                    <nav className="space-y-4">
                        <a 
                            href="#" 
                            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </a>
                        <a 
                            href="#" 
                            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </a>
                        <a 
                            href="#" 
                            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Technology
                        </a>
                        <a 
                            href="#" 
                            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Docs
                        </a>
                        <a 
                            href="#" 
                            className="block text-lg text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-3"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Mobile CTA Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <Link 
                            href="/dashboard"
                            className="w-full bg-white hover:bg-blue-700 text-black px-6 py-4 rounded-xs font-semibold text-lg transition-colors text-center block"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            GET STARTED
                        </Link>
                    </div>
                </div>
            </div>

            <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-20 mt-[5vh] sm:mt-0">
                <div className="text-center max-w-3xl md:max-w-5xl mx-auto">
                  
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-10 sm:mb-8 leading-tight">
                        LEND WITH CONFIDENCE,
                        <br />
                        <span className="text-blue-600">BORROW WITH PROTECTION,</span>
                        <br />
                        STAY LIQUID
                    </h1>

                
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 sm:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
                        In DeFi, the smartest way to play is safe, CompoundSafe helps you monitor your positions, 
                        get instant alerts, and keep earning while staying safe from unexpected liquidation.
                    </p>

             
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 py-[3rem]">
                        <Link 
                            href="/dashboard"
                            className="w-full sm:w-auto bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xs font-semibold text-base sm:text-lg transition-colors min-w-[200px] text-center"
                        >
                            LAUNCH COMPOUND SAFE
                        </Link>
                        <button className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xs font-semibold text-base sm:text-lg transition-colors min-w-[200px]">
                            SEE HOW IT WORKS
                        </button>
                    </div>

                    <div className="relative mb-16 sm:mb-20">
                        <div className="relative max-w-5xl mx-auto px-4 sm:px-0">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                <Image 
                                    src="/dashimage.png"
                                    alt="CompoundSafe Dashboard Preview"
                                    width={1097} 
                                    height={699}  
                                    className="w-full h-auto"
                                    priority={true}  
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-blue-600/30 via-blue-600/15 to-transparent" />
                            </div>
                        </div>
                    </div>
               
                    <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 uppercase tracking-wide">
                            BACKED BY TRUSTED PARTNERS
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 lg:gap-16 text-gray-400 dark:text-gray-500 lg:text-">
                            <span className="text-sm sm:text-base font-semibold">COMPOUND</span>
                            <span className="text-sm sm:text-base font-semibold">ETHEREUM</span>
                            <span className="text-sm sm:text-base font-semibold">CHAINLINK</span>
                            <span className="text-sm sm:text-base font-semibold">CONVICTION</span>
                            <span className="text-sm sm:text-base font-semibold">HYDRA</span>
                        </div>
                    </div>
                    <Partners />
                </div>
            </main>
        </div>
    );
};

export default Page; 