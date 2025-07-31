"use client"
import React, { useState, useEffect, useRef, CSSProperties   } from 'react';
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
    'COMPOUND': '/compound-logo.svg',
    'CHAINLINK': '/chainlink-logo.svg',

  };

  const hasLogo = logoMap[name];
  

  const positionStyle: CSSProperties = {
    position: 'absolute',
    left: position.left,
    top: position.top,
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: isHovered ? 'scale(1.3)' : 'scale(1)',
    zIndex: isHovered ? 10 : 1,
  };

  return (
    <div
      className={`flex items-center justify-center ${hoverable ? 'cursor-pointer' : ''}`}
      style={positionStyle}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
    >
      {hasLogo ? (
        <div className="relative" style={{ width: size, height: size }}>
          <Image
            src={logoMap[name]}
            alt={`${name} logo`}
            width={size}
            height={size}
            className={`${isHovered ? 'filter-none' : 'opacity-70'} transition-opacity`}
          />
        </div>
      ) : (
        <span 
          className={`text-sm font-semibold ${
            isHovered 
              ? 'text-blue-500 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400'
          } transition-colors whitespace-nowrap`}
        >
          {name}
        </span>
      )}
    </div>
  );
};

const Partners = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [orbSize, setOrbSize] = useState(650); 
  const { theme } = useTheme();
  const isDark = theme === 'dark';


  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newSize = Math.min(containerWidth * 0.6, 350); 
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

    const radius = orbSize * 0.8;
    const partners = ['COMPOUND', 'ETHEREUM', 'CHAINLINK', 'CONVICTION', 'HYDRA'];
    
    return partners.map((name, index) => {
      const angle = (index / partners.length) * Math.PI * 2;

      const x = Math.cos(angle) * radius * 1.1;
      const y = Math.sin(angle) * radius;
      
      return {
        name,
        position: {
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
        } as PositionProps
      };
    });
  };

  const positionedPartners = getPartnerPositions();

  return (
    <section 
      className="py-24 w-full relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative h-[400px] flex items-center justify-center">
          <div 
            ref={orbRef}
            className="relative transition-all duration-700"
            style={{ width: orbSize, height: orbSize }}
          >
            <div
              className="absolute rounded-full bg-gradient-to-br from-gray-700 via-gray-900 to-black dark:from-gray-600 dark:to-black"
              style={{
                width: '100%',
                height: '100%',
                filter: 'blur(2px)',
                opacity: isDark ? 0.7 : 0.2,
                boxShadow: isDark 
                  ? '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.1)'
                  : '0 0 40px rgba(59, 130, 246, 0.1), inset 0 0 40px rgba(59, 130, 246, 0.05)'
              }}
            />
            
            <div 
              className="absolute rounded-full bg-blue-500 dark:bg-blue-600 mix-blend-overlay"
              style={{
                width: '80%',
                height: '80%',
                top: '10%',
                left: '10%',
                filter: 'blur(30px)',
                opacity: 0.1,
              }}
            />
            
            <div 
              className="absolute rounded-full bg-white"
              style={{
                width: '30%',
                height: '30%',
                top: '15%',
                left: '25%',
                filter: 'blur(25px)',
                opacity: 0.08,
              }}
            />
          </div>

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

      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${isDark ? 'rgba(30, 64, 175, 0.05)' : 'rgba(59, 130, 246, 0.03)'} 0%, transparent 70%)`,
        }}
      />
    </section>
  );
};

export default Partners;