
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Wallet, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentDialog = ({ open, onOpenChange }: PaymentDialogProps) => {
  const walletAddress = "HBBb9K5i4xbizCMouyhLtMNuu5qfUQC3nUfNrY4gkYoA";
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  
  const form = useForm({
    defaultValues: {
      senderWallet: "",
    }
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet address copied to clipboard!");
  };

  const onSubmit = (data: { senderWallet: string }) => {
    setVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      toast.success("Payment verified successfully! You can now use all platform features.");
    }, 2000);
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
        
        <div className="py-4 space-y-6">
          <div>
            <p className="text-sm text-gray-300 mb-2">Payment Address:</p>
            <div className="flex items-center gap-2 bg-black/40 p-3 rounded-md border border-purple-500/20">
              <code className="text-xs text-purple-200 flex-1 break-all">{walletAddress}</code>
              <Button size="icon" variant="ghost" onClick={copyToClipboard} className="h-8 w-8">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>• Payment required: <span className="text-purple-300 font-semibold">3 SOL</span></p>
              <p>• Access duration: <span className="text-purple-300 font-semibold">24 hours</span></p>
              <p>• Unlocks all platform features and tools</p>
            </div>
          </div>
          
          {!verified ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="senderWallet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Your Wallet Address (for verification)</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Wallet className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                            <Input 
                              placeholder="Enter the wallet address you sent from" 
                              className="pl-8 bg-black/30 border-purple-500/30 text-white" 
                              {...field}
                            />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit"
                    disabled={verifying || !form.watch("senderWallet")}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    {verifying ? "Verifying..." : "Verify Payment"}
                    {verifying ? <svg className="ml-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : null}
                  </Button>
                </div>
                
                <p className="text-xs text-center text-purple-300/80">Verification code: MEME-SOL-SCAN-2025</p>
              </form>
            </Form>
          ) : (
            <div className="bg-green-900/30 border border-green-500/30 rounded-md p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 mb-2">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-green-300">Payment Verified!</h3>
              <p className="text-sm text-gray-300 mt-1">Your subscription is now active for 24 hours</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          {!verified ? (
            <>
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
            </>
          ) : (
            <Button 
              onClick={() => onOpenChange(false)} 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Start Using Platform
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
