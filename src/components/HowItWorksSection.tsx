
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Subscribe to the Service",
    description: "Send your daily payment of 3 SOL to our address to activate your subscription."
  },
  {
    number: "02",
    title: "Design Your Meme Coin",
    description: "Use our intuitive tools to customize your coin's name, supply, logo, and tokenomics."
  },
  {
    number: "03",
    title: "Deploy to Blockchain",
    description: "With one click, deploy your meme coin to the Solana blockchain securely."
  },
  {
    number: "04",
    title: "Manage & Monitor",
    description: "Track performance, manage liquidity, and utilize marketing tools to grow your community."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Creating your meme coin is simple with our streamlined process
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative mb-12 sm:mb-20">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-2xl font-bold">
                  {step.number}
                </div>
                
                <div className="sm:pt-3">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-px bg-gradient-to-b from-purple-500 to-transparent h-12 sm:h-20 hidden sm:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
