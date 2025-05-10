
import React from 'react';
import { Rocket, ShieldCheck, Zap, BarChart3, Award, Coins } from 'lucide-react';

const features = [
  {
    icon: <Rocket className="h-10 w-10 text-purple-400" />,
    title: "Rapid Deployment",
    description: "Launch your meme coin on Solana blockchain in minutes with our streamlined process."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-purple-400" />,
    title: "Security Audited",
    description: "All contracts are thoroughly audited and secured against vulnerabilities."
  },
  {
    icon: <Zap className="h-10 w-10 text-purple-400" />,
    title: "High Performance",
    description: "Built on Solana for lightning-fast transactions and minimal fees."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-purple-400" />,
    title: "Advanced Analytics",
    description: "Track your coin's performance with real-time metrics and insights."
  },
  {
    icon: <Award className="h-10 w-10 text-purple-400" />,
    title: "Professional Grade",
    description: "Enterprise-level tools for creating and managing your cryptocurrency."
  },
  {
    icon: <Coins className="h-10 w-10 text-purple-400" />,
    title: "Customizable Tokenomics",
    description: "Fully customize your coin's supply, distribution, and economic model."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create and launch successful meme coins on the Solana blockchain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="coin-card p-6 rounded-xl transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900/40 to-indigo-900/40 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
