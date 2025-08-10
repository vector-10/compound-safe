import React from 'react';

const Benefits = () => {
    return (
        <div className="w-full py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="bg-white/5 rounded-sm border border-gray-800 p-6 w-full md:w-1/2">
                        <h3 className="text-xl md:text-2xl font-mono font-bold text-white mb-3">
                            MULTI-AMM<br />COMPATIBILITY
                        </h3>
                        <p className="text-sm md:text-lg text-gray-400 mb-6 max-w-md">
                            We offers access to a comprehensive selection of 20 different AMMs, enabling users to tap into various liquidity pools across decentralized exchanges (DEXs) and DeFi platforms.
                        </p>
                        
                        <div className="relative h-48 w-full flex items-center justify-center">
                            <div className="absolute w-14 h-14 rounded-full bg-blue-500/30 flex items-center justify-center z-10">
                                <div className="w-10 h-10 rounded-full bg-blue-500/50 flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/80"></div>
                                </div>
                            </div>
                            
                            {[...Array(6)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="absolute w-3 h-3 rounded-full bg-blue-400/80"
                                    style={{
                                        top: `${50 + Math.sin(i * Math.PI / 3) * 30}%`,
                                        left: `${50 + Math.cos(i * Math.PI / 3) * 30}%`,
                                        animation: `wave${i % 3 + 1} ${3 + i * 0.5}s infinite ease-in-out`,
                                    }}
                                ></div>
                            ))}

                            {[...Array(8)].map((_, i) => (
                                <div 
                                    key={`particle-${i}`} 
                                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-300/40"
                                    style={{
                                        top: `${20 + Math.random() * 60}%`,
                                        left: `${20 + Math.random() * 60}%`,
                                        animation: `float ${5 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s`,
                                    }}
                                ></div>
                            ))}
                            
                            <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 animate-pulse"></div>
                        </div>

                        <style jsx>{`
                            @keyframes wave1 {
                                0%, 100% { transform: translateY(-3px) translateX(2px); }
                                50% { transform: translateY(3px) translateX(-2px); }
                            }
                            @keyframes wave2 {
                                0%, 100% { transform: translateY(4px) translateX(-3px); }
                                50% { transform: translateY(-4px) translateX(3px); }
                            }
                            @keyframes wave3 {
                                0%, 100% { transform: translateY(-5px) translateX(-2px); }
                                50% { transform: translateY(5px) translateX(2px); }
                            }
                            @keyframes float {
                                0%, 100% { transform: translateY(-8px) translateX(5px); opacity: 0.4; }
                                50% { transform: translateY(8px) translateX(-5px); opacity: 0.8; }
                            }
                        `}</style>
                    </div>
                    
                    <div className="bg-white/5 rounded-sm border border-gray-800 p-6 w-full md:w-1/2">
                        <h3 className="text-xl md:text-2xl font-mono font-bold text-white mb-3">
                            DYNAMIC LIQUIDITY<br />PROVISIONING
                        </h3>
                        <p className="text-sm md:text-lg text-gray-400 mb-6 max-w-md">
                            We offers access to a comprehensive selection of 20 different AMMs, enabling users to tap into various liquidity pools across decentralized exchanges (DEXs) and DeFi platforms.
                        </p>
                        
                        <div className="relative h-48 w-full flex items-center justify-center">
                            <div className="relative w-[90%] h-[85%]">
                                <div className="absolute inset-0">
                                    {[...Array(5)].map((_, i) => (
                                        <div 
                                            key={`h-line-${i}`} 
                                            className="absolute w-full h-px bg-gray-700/30"
                                            style={{ top: `${20 + i * 15}%` }}
                                        ></div>
                                    ))}
                                    
                                    {[...Array(7)].map((_, i) => (
                                        <div 
                                            key={`v-line-${i}`} 
                                            className="absolute h-full w-px bg-gray-700/30"
                                            style={{ left: `${15 + i * 12}%` }}
                                        ></div>
                                    ))}
                                </div>
                                
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <path 
                                        d="M0,80 L20,75 L40,85 L60,65 L80,70 L100,40 L120,45 L140,30 L160,55 L180,25 L200,35 L220,15 L240,30 L260,10 L280,25 L300,15 L300,100 L0,100 Z" 
                                        fill="rgba(59, 130, 246, 0.05)"
                                        className="transition-all duration-1000"
                                    ></path>
                                    
                                    <path 
                                        d="M0,80 L20,75 L40,85 L60,65 L80,70 L100,40 L120,45 L140,30 L160,55 L180,25 L200,35 L220,15 L240,30 L260,10 L280,25 L300,15" 
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        className="transition-all duration-1000"
                                    ></path>
                                    
                                    <path 
                                        d="M0,90 L20,95 L40,75 L60,85 L80,80 L100,85 L120,70 L140,75 L160,65 L180,70 L200,55 L220,65 L240,50 L260,60 L280,45 L300,50" 
                                        fill="none"
                                        stroke="rgba(59, 130, 246, 0.6)"
                                        strokeWidth="1.5"
                                        strokeDasharray="2,2"
                                        className="transition-all duration-1000"
                                    ></path>
                                </svg>
                                
                                <div className="absolute text-xs text-gray-400 font-mono" style={{ left: '30%', bottom: '35%' }}>
                                    Ethereum
                                </div>
                                <div className="absolute text-xs text-gray-400 font-mono" style={{ left: '65%', bottom: '25%' }}>
                                    Optimism
                                </div>
                                
                                <div className="absolute w-2 h-2 bg-white rounded-full" style={{ left: '30%', top: '55%' }}>
                                    <div className="absolute w-4 h-4 bg-white/20 rounded-full -left-1 -top-1 animate-ping"></div>
                                </div>
                                <div className="absolute w-2 h-2 bg-white rounded-full" style={{ left: '65%', top: '40%' }}>
                                    <div className="absolute w-4 h-4 bg-white/20 rounded-full -left-1 -top-1 animate-ping"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white/5 rounded-md border border-gray-800 p-6 md:p-8 w-full">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                            <h3 className="text-xl md:text-3xl font-mono font-bold text-white mb-3">
                                TOP TIER RISK<br />MITIGATION MECHANISMS
                            </h3>
                            <p className="text-sm md:text-xl text-gray-400 mb-6 max-w-lg ">
                                CompoundSafe employs advanced risk mitigation measures to protect user funds and ensure market stability. Through automated portfolio rebalancing, it adjusts liquidity provision dynamically to minimize losses from impermanent loss and market volatility.
                            </p>
                        </div>
                        
                        <div className="md:w-1/2 flex items-center justify-center">
                            <div className="relative h-48 w-full max-w-xs flex items-center justify-center">
                                <div className="absolute w-40 h-40 rounded-full bg-gray-700/20 animate-pulse-slow"></div>
                                <div className="absolute w-32 h-32 rounded-full bg-gray-700/30"></div>
                                <div className="absolute w-24 h-24 rounded-full bg-gray-700/40"></div>
                                
                                <div className="relative z-10 bg-gray-800/80 rounded-full p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                                
                                {[...Array(3)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="absolute rounded-full border border-gray-500/20"
                                        style={{
                                            width: `${150 + i * 30}px`,
                                            height: `${150 + i * 30}px`,
                                            animationDelay: `${i * 0.5}s`,
                                            animation: 'ripple 2.5s infinite ease-out'
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <style >{`
                    @keyframes ripple {
                        0% { transform: scale(0.8); opacity: 1; }
                        100% { transform: scale(1.1); opacity: 0; }
                    }
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Benefits;