
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-hero-pattern relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-indigo-700/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Create Your Own Meme Coin in Minutes
          </h1>
          <p className="text-xl mb-4 text-gray-300">
            Launch your crypto project with professional-grade tools. 
            High accuracy, advanced tokenomics, and all services included.
          </p>
          <p className="text-lg mb-8 text-purple-300">
            Available on all major trading platforms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              onClick={() => alert("Please verify sending fees before continuing")}
            >
              Verify Sending Fees to Start
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-500 hover:text-purple-400 hover:border-purple-400">
              Explore Features
            </Button>
          </div>
          <div className="mt-12 flex gap-4 justify-center">
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-gray-400">Coins Created</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
              <p className="text-3xl font-bold text-white">99.8%</p>
              <p className="text-gray-400">Success Rate</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
