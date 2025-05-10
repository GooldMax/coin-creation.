
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentDialog = ({ open, onOpenChange }: PaymentDialogProps) => {
  const walletAddress = "HBBb9K5i4xbizCMouyhLtMNuu5qfUQC3nUfNrY4gkYoA";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border border-purple-500/30 text-white backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gradient">Daily Subscription Payment</DialogTitle>
          <DialogDescription className="text-gray-300">
            Send 3 SOL to the address below to activate your daily subscription
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-300 mb-2">Payment Address:</p>
          <div className="flex items-center gap-2 bg-black/40 p-3 rounded-md border border-purple-500/20">
            <code className="text-xs text-purple-200 flex-1 break-all">{walletAddress}</code>
            <Button size="icon" variant="ghost" onClick={copyToClipboard} className="h-8 w-8">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-6 space-y-2 text-sm text-gray-300">
            <p>• Payment required: <span className="text-purple-300 font-semibold">3 SOL</span></p>
            <p>• Access duration: <span className="text-purple-300 font-semibold">24 hours</span></p>
            <p>• Unlocks all platform features and tools</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={copyToClipboard} 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Copy Address
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
          >
            I'll Pay Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
