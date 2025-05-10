import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PaymentDialog from './PaymentDialog';
import Testimonials from './Testimonials';
const CTASection = () => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  return <section className="py-20 bg-gradient-to-b from-purple-950/20 to-black relative">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-900/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-purple-500/20 shadow-lg shadow-purple-500/5">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Ready to Create Your Meme Coin?
            </h2>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">Join hundreds of creators who've successfully launched their meme coins on the Solana blockchain and Solscan</p>
            <p className="text-lg text-purple-300 mb-3 max-w-2xl mx-auto">
              Your coin will be available on all trading platforms
            </p>
            <p className="text-lg text-purple-300 mb-8 max-w-2xl mx-auto">
          </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white" onClick={() => setPaymentDialogOpen(true)}>
              Verify Sending Fees to Start
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Testimonials */}
          <Testimonials />
        </div>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen} />
    </section>;
};
export default CTASection;