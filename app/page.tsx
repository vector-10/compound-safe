import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const Page = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            {/* Header Navigation */}
            <header className="border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 lg:space-x-3">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm lg:text-lg">CS</span>
                            </div>
                            <span className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                                CompoundSafe
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                                About
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                                Technology
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                                Docs
                            </a>
                            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                                Contact
                            </a>
                            
                            <ThemeToggle />
                            
                            <Link 
                                href="/dashboard" 
                                className="bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                                LAUNCH RIPPLE
                            </Link>
                        </div>

                        {/* Mobile menu + theme toggle */}
                        <div className="lg:hidden flex items-center space-x-3">
                            <ThemeToggle />
                            <button className="text-gray-600 dark:text-gray-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main Heading - Mobile First */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight tracking-tight">
                        NEVER GET
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        <span className="text-blue-600">LIQUIDATED</span>
                        <br />
                        AGAIN
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
                        Your personal DeFi safety assistant. Get clear warnings, plain-English explanations, 
                        and automatic alerts before your Compound positions become risky.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16">
                        <Link 
                            href="/dashboard"
                            className="w-full sm:w-auto bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors min-w-[200px] text-center"
                        >
                            LAUNCH COMPOUND SAFE
                        </Link>
                        <button className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors min-w-[200px]">
                            SEE HOW IT WORKS
                        </button>
                    </div>

                    {/* Trusted Partners - Simple Text Version */}
                    <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 uppercase tracking-wide">
                            BACKED BY TRUSTED PARTNERS
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-gray-400 dark:text-gray-500">
                            <span className="text-sm sm:text-base font-semibold">COMPOUND</span>
                            <span className="text-sm sm:text-base font-semibold">ETHEREUM</span>
                            <span className="text-sm sm:text-base font-semibold">CHAINLINK</span>
                            <span className="text-sm sm:text-base font-semibold">OPENSEA</span>
                            <span className="text-sm sm:text-base font-semibold">UNISWAP</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;