'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess: () => void;
}

// Replace with your actual Google Pay link
const GOOGLE_PAY_LINK = "https://pay.google.com/your-payment-link";

const GooglePayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="mr-2">
      <path d="M22.2,9.6c0-1.2-0.2-2.3-0.5-3.4c-0.2-0.7-0.5-1.4-0.9-2.1c-0.4-0.6-1-1.2-1.6-1.6C18.5,2,17.7,1.6,17,1.4 c-1.1-0.3-2.2-0.5-3.4-0.5h-3.2C9.2,0.9,8,1.1,6.9,1.4C6.2,1.6,5.5,2,4.8,2.5C4.2,3,3.7,3.5,3.2,4.1C2.8,4.8,2.5,5.5,2.2,6.2 C1.9,7.3,1.8,8.4,1.8,9.6v4.8c0,1.2,0.2,2.3,0.5,3.4c0.2,0.7,0.5,1.4,0.9,2.1c0.4,0.6,1,1.2,1.6,1.6c0.7,0.4,1.4,0.7,2.1,0.9 c1.1,0.3,2.2,0.5,3.4,0.5h3.2c1.2,0,2.3-0.2,3.4-0.5c0.7-0.2,1.4-0.5,2.1-0.9c0.6-0.4,1.2-1,1.6-1.6c0.4-0.7,0.7-1.4,0.9-2.1 c0.3-1.1,0.5-2.2,0.5-3.4V9.6z" fill="#5f6368"/><path d="M12,14.7c-2.6,0-4.7-2.1-4.7-4.7s2.1-4.7,4.7-4.7c1.3,0,2.5,0.5,3.4,1.4l-1.6,1.4c-0.5-0.5-1.2-0.8-1.8-0.8 c-1.5,0-2.8,1.2-2.8,2.8c0,1.5,1.2,2.8,2.8,2.8c1.7,0,2.4-1,2.5-1.9h-2.5V9.9h4.6c0.1,0.2,0.1,0.5,0.1,0.8 C16.7,12.6,14.8,14.7,12,14.7z" fill="#fff"/>
    </svg>
)

export default function PaymentDialog({ open, onOpenChange, onPaymentSuccess }: PaymentDialogProps) {
  const { toast } = useToast();

  const handlePaymentLinkClick = () => {
    toast({
      title: "Redirecting to Google Pay...",
      description: "After payment, please return and click download again.",
    });
    // This will now be handled by the Link component, but we keep this for toast feedback
  };

  const handlePostPayment = () => {
    onOpenChange(false);
    onPaymentSuccess();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center items-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-2">
                 <GooglePayIcon />
            </div>
          <DialogTitle className="text-2xl">Unlock PDF Download</DialogTitle>
          <DialogDescription>
            To download your resume, please complete the small one-time payment using Google Pay.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 my-4">
            <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p><strong>High-Quality PDF Export:</strong> Get a pixel-perfect document ready for job applications.</p>
            </div>
            <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p><strong>One-Time Payment:</strong> No subscriptions. A single payment unlocks this download.</p>
            </div>
             <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p><strong>Support Development:</strong> Your contribution helps keep ResumAI running and improving.</p>
            </div>
        </div>
        <div className='text-center my-4'>
            <span className="text-4xl font-bold">₹2</span>
            <span className="text-muted-foreground">/ per download</span>
        </div>

        <div className='flex flex-col gap-4'>
            <Button asChild size="lg" className="w-full bg-black hover:bg-gray-800 text-white" onClick={handlePaymentLinkClick}>
                <a href={GOOGLE_PAY_LINK} target="_blank" rel="noopener noreferrer">
                    <GooglePayIcon />
                    Pay with Google Pay
                    <ExternalLink className="ml-2 h-4 w-4" />
                </a>
            </Button>
            <Button onClick={handlePostPayment} size="lg" variant="outline" className="w-full">
                I have paid, start my download
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
