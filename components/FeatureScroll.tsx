import React from 'react';
import Slider from 'react-slick';
import { BarChart, FileText, Globe, Shield, Zap } from 'lucide-react';

const FeatureScroll = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.5,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1.2,
                }
            }
        ]
    };

    const featureCards = [
        {
            icon: <BarChart className="h-6 w-6 text-blue-500" />,
            title: "Advanced Analytics Dashboard",
            description: "Offer a detailed analytics dashboard for users, providing insights on liquidity trends, impermanent loss, and projected yields."
        },
        {
            icon: <FileText className="h-6 w-6 text-blue-500" />,
            title: "Smart Contract Auditing Tools",
            description: "Integrate smart contract auditing tools to ensure the security of deployed protocols, reducing risk exposure for users."
        },
        {
            icon: <Globe className="h-6 w-6 text-blue-500" />,
            title: "Integration with DeFi Aggregators",
            description: "Partner with DeFi aggregators to increase visibility to our liquidity pools, allowing seamless access across multiple platforms."
        },
        {
            icon: <Shield className="h-6 w-6 text-blue-500" />,
            title: "Automated Risk Management",
            description: "Set up automated risk management protocols that adjust positions based on market volatility to prevent liquidations."
        },
        {
            icon: <Zap className="h-6 w-6 text-blue-500" />,
            title: "Real-Time Market Alerts",
            description: "Receive instant notifications about market changes, liquidity pool adjustments, and potential liquidation risks."
        }
    ];

    return (
        <div className="w-full py-24 overflow-hidden text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 ">
                    Key <span className="text-blue-500">Features</span>
                </h2>
                <p className="text-gray-400">
                    CompoundSafe gives you everything you need to maximize your DeFi yields while keeping your positions secure.
                </p>
            </div>
            
            {/* Horizontal scrolling container */}
            <div className="relative w-full px-4 sm:px-6 lg:px-8">
                <Slider {...settings}>
                    {featureCards.map((card, index) => (
                        <div key={index} className="px-2">
                            <div className="bg-gray-800/70 dark:bg-gray-800/50 border border-gray-700/30 rounded-md p-6 relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-900/10 to-purple-900/10 pointer-events-none"></div>
                                <div className="mb-4">
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-mono font-bold text-white mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Gradient fades at edges to indicate scrollable content */}
                <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
            </div>

            {/* Custom styling for slick slider */}
            <style jsx global>{`
                /* Override slick-slider default styles to better match our design */
                .slick-track {
                    display: flex !important;
                }
                .slick-slide {
                    height: inherit !important;
                    display: flex !important;
                }
                .slick-slide > div {
                    display: flex;
                    flex: 1;
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default FeatureScroll;