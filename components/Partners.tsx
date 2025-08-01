'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface PositionProps {
  left: string;
  top: string;
}

interface PartnerLogoProps {
  name: string;
  position: PositionProps;
  size?: number;
  hoverable?: boolean;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ name, position, size = 36, hoverable = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const logoMap: Record<string, string> = {
    'ETHEREUM': '/ethereum-eth-logo.svg',
    'COMPOUND': '/compound-comp-logo.svg',
    'CHAINLINK': '/chainlink-link-logo.svg',
    'UNISWAP': '/uniswap-uni-logo.svg',
    'POLYGON': '/polygon-matic-logo.svg',
    'AAVE': '/aave-aave-logo.svg',
    'BASE': '/base.svg',
    'ARBITRUM': '/arbitrum-arb-logo.svg',
  };

  const hasLogo = logoMap[name];
  
  const positionStyle: CSSProperties = {
    position: 'absolute',
    left: position.left,
    top: position.top,
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
    zIndex: isHovered ? 10 : 1,
  };

  return (
    <div
      className="partner-logo hidden lg:flex items-center justify-center cursor-pointer"
      style={positionStyle}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
    >
      <div className="flex items-center space-x-2 backdrop-blur-sm px-3 py-2 rounded-md">
        <span 
          className={`text-sm lg:text-xl font-bold ${
            isHovered 
              ? 'text-blue-400 dark:text-blue-300' 
              : 'text-gray-200 dark:text-gray-300'
          } transition-colors whitespace-nowrap`}
        >
          {name}
        </span>
        {hasLogo && (
          <div className="relative" style={{ width: size, height: size }}>
            <Image
              src={logoMap[name]}
              alt={`${name} logo`}
              width={size}
              height={size}
              className={`${isHovered ? 'filter-none' : 'opacity-80'} transition-opacity`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MobilePartnerLogo: React.FC<{name: string, size?: number}> = ({ name, size = 20 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const logoMap: Record<string, string> = {
    'ETHEREUM': '/ethereum-eth-logo.svg',
    'COMPOUND': '/compound-comp-logo.svg',
    'CHAINLINK': '/chainlink-link-logo.svg',
    'UNISWAP': '/uniswap-uni-logo.svg',
    'POLYGON': '/polygon-matic-logo.svg',
    'AAVE': '/aave-aave-logo.svg',
    'BASE': '/base.svg',
    'ARBITRUM': '/arbitrum-arb-logo.svg',
  };

  const hasLogo = logoMap[name];

  return (
    <div 
      className="flex items-center justify-center space-x-2 py-2 px-3 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span 
        className={`text-sm font-medium ${
          isHovered 
            ? 'text-blue-500 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-300'
        } transition-colors whitespace-nowrap`}
      >
        {name}
      </span>
      {hasLogo && (
        <div className="relative" style={{ width: size, height: size }}>
          <Image
            src={logoMap[name]}
            alt={`${name} logo`}
            width={size}
            height={size}
            className={`${isHovered ? 'filter-none' : 'opacity-70'} transition-opacity`}
          />
        </div>
      )}
    </div>
  );
};

const Partners = () => {
  const [isClient, setIsClient] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [orbSize, setOrbSize] = useState(400);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Bigger orb for desktop - increased from 0.4 to 0.5 and max from 400 to 500
        const newSize = Math.min(containerWidth * 0.5, 500);
        setOrbSize(newSize);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationId: number = 0;
    let rotation = 0;

    const animateOrb = () => {
      if (orbRef.current) {
        rotation += 0.03;
        const yOffset = Math.sin(rotation) * 5;
        orbRef.current.style.transform = `translateY(${yOffset}px)`;
      }
      animationId = requestAnimationFrame(animateOrb);
    };

    animateOrb();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getPartnerPositions = () => {
    const partners = [
      'ETHEREUM', 'COMPOUND', 'CHAINLINK', 'UNISWAP', 
      'POLYGON', 'AAVE', 'BASE', 'ARBITRUM'
    ];
    
    // Improved spacing to prevent overlap
    return partners.map((name, index) => {
      const row = Math.floor(index / 4); 
      const col = index % 4; 
      
      // Increased spacing: was 150px, now 180px between columns
      // Extended the overall width: was 300px, now 360px from center
      const left = `calc(50% - 360px + ${col * 180}px)`;
      const top = `calc(50% - 50px + ${row * 90}px)`; // Also increased row spacing from 80px to 90px
      
      return {
        name,
        position: {
          left,
          top,
        } as PositionProps
      };
    });
  };

  if (!isClient) {
    return (
      <section className="py-16 w-full relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-8">
              BACKED BY TRUSTED PARTNERS
            </p>
          </div>
        </div>
      </section>
    );
  }

  const positionedPartners = getPartnerPositions();

  return (
    <section 
      className="py-16 w-full relative overflow-hidden"
      ref={containerRef as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm md:text-xl text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium md:font-bold">
            BACKED BY TRUSTED PARTNERS
          </p>
        </div>
        
        {/* Mobile: Simple centered grid with optional small orb */}
        <div className="lg:hidden">
          <div className="relative max-w-md mx-auto">
            {/* Optional small decorative orb behind the content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-b from-blue-600/10 to-blue-800/5 rounded-full blur-xl pointer-events-none -z-10" />
            
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-2">
                {[
                  'ETHEREUM', 'COMPOUND', 
                  'CHAINLINK', 'UNISWAP',
                  'POLYGON', 'AAVE',
                  'BASE', 'ARBITRUM'
                ].map(name => (
                  <MobilePartnerLogo key={name} name={name} size={24} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop: Orb with positioned partners */}
        <div className="hidden lg:block">
          <div className="relative h-[500px] flex items-center justify-center"> {/* Increased height from 400px to 500px */}
            <div 
              ref={orbRef}
              className="relative transition-all duration-700"
              style={{ width: orbSize, height: orbSize }}
            >
              <div
                className="absolute rounded-full bg-gradient-to-b from-gray-950 via-gray-800 to-gray-700 dark:from-black dark:via-gray-800 dark:to-gray-600"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'blur(2px)',
                  opacity: isDark ? 0.85 : 0.3,
                  boxShadow: isDark 
                    ? '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.1)'
                    : '0 0 40px rgba(59, 130, 246, 0.1), inset 0 0 40px rgba(59, 130, 246, 0.05)'
                }}
              />
              
              <div 
                className="absolute rounded-full overflow-hidden"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <div 
                  className="absolute bg-gradient-to-t from-blue-500/50 via-blue-600/20 to-gray-700 dark:from-blue-500/40 dark:via-blue-600/30 dark:to-transparent"
                  style={{
                    width: '100%',
                    height: '120%',
                    top: '-10%',
                    filter: 'blur(10px)',
                    opacity: 0.6,
                  }}
                />
              </div>
              
              <div 
                className="absolute rounded-full bg-white"
                style={{
                  width: '40%',
                  height: '40%',
                  bottom: '15%',
                  left: '30%',
                  filter: 'blur(30px)',
                  opacity: 0.15,
                }}
              />
            </div>

            {/* Desktop partners with logos */}
            {positionedPartners.map((partner, index) => (
              <PartnerLogo
                key={index}
                name={partner.name}
                position={partner.position}
                size={40}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop background gradient */}
      <div 
        className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${isDark ? 'rgba(30, 64, 175, 0.05)' : 'rgba(59, 130, 246, 0.03)'} 0%, transparent 70%)`,
        }}
      />
    </section>
  );
};

export default Partners;