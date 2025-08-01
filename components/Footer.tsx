"use client"
import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full relative pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-00/90 to-black z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-10 md:mb-0 md:w-1/2 lg:w-2/5 pr-8">
            <div className="flex items-center mb-6">
              <div className="mr-2 text-indigo-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-white text-lg font-semibold">CompoundSafe</span>
            </div>
            
            <p className="text-sm leading-relaxed mb-8 text-gray-400">
              We're dedicated to reshaping the landscape of liquidity management, maximize yield opportunities, and participate in the thriving DeFi ecosystem.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                  <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" fill="currentColor" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:w-1/2 lg:w-3/5">
            <div>
              <h3 className="text-white text-sm font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/web-app" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Web App
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-sm font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/brand" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Brand Assets
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800/30">
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} CompoundSafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;