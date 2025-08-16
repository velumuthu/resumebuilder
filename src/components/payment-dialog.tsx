'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Loader2, Star } from 'lucide-react';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createRazorpayOrder } from '@/app/actions';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentDialog({ open, onOpenChange, onPaymentSuccess }: PaymentDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = () => {
    startTransition(async () => {
      toast({
        title: "Initializing payment...",
        description: "Please wait while we create a secure payment order.",
      });

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast({ title: 'Error', description: 'Could not load payment gateway. Please check your internet connection.', variant: 'destructive' });
        return;
      }
      
      const { orderId, error } = await createRazorpayOrder();

      if (error || !orderId) {
        toast({ title: 'Error', description: error || 'Could not create a payment order.', variant: 'destructive' });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: "500", // Amount in paise
        currency: "INR",
        name: "ResumAI Pro",
        description: "PDF Resume Download",
        order_id: orderId,
        handler: function (response: any) {
          toast({
            title: 'Payment Successful!',
            description: 'Your download will begin shortly.',
          });
          onPaymentSuccess();
          onOpenChange(false);
        },
        prefill: {
            name: "ResumAI User",
            email: "user@example.com",
            contact: "9999999999"
        },
        notes: {
            address: "ResumAI Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
      };
      
      const rzp = new window.Razorpay(options);
       rzp.on('payment.failed', function (response: any){
            toast({
                title: 'Payment Failed',
                description: response.error.description,
                variant: 'destructive',
            });
       });
      
      rzp.open();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center items-center">
            <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full mb-2">
                 <Crown className="h-8 w-8 text-amber-500" />
            </div>
          <DialogTitle className="text-2xl">Unlock PDF Download</DialogTitle>
          <DialogDescription>
            For a small one-time payment, you can download your professional resume as a high-quality PDF.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 my-4">
            <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p><strong>High-Quality PDF Export:</strong> Get a pixel-perfect document ready for job applications.</p>
            </div>
            <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p><strong>One-Time Payment per Download:</strong> No subscriptions. Pay only when you need to download.</p>
            </div>
             <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p><strong>Support Development:</strong> Your contribution helps keep ResumAI running and improving.</p>
            </div>
        </div>
        <div className='text-center my-4'>
            <span className="text-4xl font-bold">₹5</span>
            <span className="text-muted-foreground">/ per download</span>
        </div>
        <Button onClick={handlePayment} disabled={isPending} size="lg" className="w-full bg-green-600 hover:bg-green-700">
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Star className="mr-2 h-5 w-5" />
          )}
          Proceed to Payment
        </Button>
      </DialogContent>
    </Dialog>
  );
}
