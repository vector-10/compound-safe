"use client"
import React from 'react';
import Link from 'next/link';
import { FaShieldAlt } from "react-icons/fa";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full relative pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-00/90 to-black z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-around ">
          <div className="mb-10 md:mb-0 md:w-1/2 lg:w-2/5 pr-8">
            
          <div className="flex items-center space-x-1 lg:space-x-2">
                        <span className="text-lg lg:text-2xl font-semibold text-white">
                            CompoundSafe
                        </span>
                        <FaShieldAlt className="w-5 h-5 lg:w-8 lg:h-8 text-blue-600" />
                    </div>
            
            <p className="text-sm lg:text-md leading-relaxed mb-8 text-gray-400">
              We're dedicated to reshaping the landscape of liquidity management, maximize yield opportunities, and participate in the thriving DeFi ecosystem.
            </p>
            
            <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <FaDiscord size={20} />
              </a>
             
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:w-1/2 lg:w-3/5">
            <div>
              <h3 className="text-white text-sm font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Web App
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
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
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Brand Assets
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800/30">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} CompoundSafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;