
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Clock } from 'lucide-react';

const PricingSection = () => {
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);

  const subscriptionFeatures = [
    "Create unlimited meme coins",
    "Advanced tokenomics customization",
    "Professional contract deployment",
    "24/7 technical support",
    "Real-time analytics dashboard",
    "Marketing toolkit access",
    "Automatic contract verification",
    "Liquidity pool creation assistance"
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-black to-purple-950/20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our daily subscription gives you access to all premium features
          </p>
        </div>
        
        <div className="max-w-md mx-auto bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20">
          <div className="p-8 text-center">
            <div className="inline-block rounded-full bg-purple-500/20 px-4 py-1 text-sm text-purple-300 mb-4">
              Daily Subscription
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">1.50 SOL</span>
              <span className="text-gray-400 ml-2">/ day</span>
            </div>
            <div className="inline-flex items-center gap-1 mb-4 bg-amber-500/20 px-3 py-1 rounded-full">
              <Clock className="h-3 w-3 text-amber-300" />
              <span className="text-xs text-amber-300">Limited time offer! Returns to 3 SOL tomorrow</span>
            </div>
            <p className="text-gray-400 mb-6">
              Full access to all platform features and services
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              onClick={() => setShowSubscriptionDetails(!showSubscriptionDetails)}
            >
              {showSubscriptionDetails ? "Hide Details" : "Get Started"}
            </Button>
          </div>
          
          {showSubscriptionDetails && (
            <div className="p-8 border-t border-purple-500/20">
              <div className="mb-6">
                <h4 className="font-medium text-white mb-2">Subscription Details:</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Payment of 1.50 SOL is required daily to maintain access to all services.
                </p>
                <div className="bg-purple-900/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-300 mb-2">Send daily payments to:</p>
                  <p className="text-xs bg-black/30 p-2 rounded font-mono break-all">
                    HBBb9K5i4xbizCMouyhLtMNuu5qfUQC3nUfNrY4gkYoA
                  </p>
                </div>
                <p className="text-gray-400 text-sm">
                  After payment confirmation, your subscription will be activated for 24 hours.
                </p>
              </div>
              
              <ul className="space-y-2">
                {subscriptionFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
