"use client"
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border border-gray-800/50 bg-gray-800/20 rounded-xs overflow-hidden mb-6">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="text-sm sm:text-base md:text-lg text-gray-300 font-medium pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus className="w-5 h-5 text-gray-400" />
          ) : (
            <Plus className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 text-sm md:text-md text-gray-400">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is CompoundSafe?",
      answer: "CompoundSafe is a cutting-edge liquidity management protocol designed for the DeFi ecosystem, empowering users to optimize their trading strategies and maximize liquidity provision."
    },
    {
      question: "How does CompoundSafe work?",
      answer: "CompoundSafe works by analyzing market conditions, monitoring your positions, and providing real-time alerts to help prevent liquidations. Our advanced algorithms detect potential risks and suggest optimal strategies to maintain profitable positions while minimizing impermanent loss."
    },
    {
      question: "Is CompoundSafe secure?",
      answer: "Yes, CompoundSafe prioritizes security above all. We employ industry-leading encryption standards, undergo regular security audits by reputable firms, and utilize multi-signature verification processes for all protocol changes. Our smart contracts have been thoroughly tested and verified."
    },
    {
      question: "Can I earn rewards with CompoundSafe?",
      answer: "Absolutely! CompoundSafe users can earn rewards through our liquidity optimization program. By allowing our protocol to manage your positions efficiently, you can maximize yield farming returns, reduce gas costs, and participate in our community governance token distribution."
    },
    {
      question: "How do I get started with CompoundSafe?",
      answer: "Getting started is simple. Connect your wallet, deposit your assets into our smart contracts, set your risk parameters, and our system will automatically optimize your positions. Our intuitive dashboard provides real-time analytics and customizable alerts to keep you informed."
    },
    {
      question: "Is CompoundSafe compatible with other DeFi platforms?",
      answer: "Yes, CompoundSafe is designed to be interoperable with major DeFi protocols. We currently support integration with Compound, Aave, Uniswap, SushiSwap, and multiple blockchain networks including Ethereum, Polygon, Arbitrum, and Optimism, with more integrations being added regularly."
    }
  ];

  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Large heading */}
          <div className="lg:w-1/3 px-4 sm:px-6 lg:px-8 mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              GOT QUESTIONS?<br />
              WE'VE GOT<br />
              ANSWERS!
            </h2>
          </div>
          
          {/* Right side - FAQ items */}
          <div className="lg:w-2/3 px-4 sm:px-6 lg:px-8">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;