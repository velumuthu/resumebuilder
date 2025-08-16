'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Loader2, Star } from 'lucide-react';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createCheckoutSession } from '@/app/actions';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentDialog({ open, onOpenChange }: PaymentDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCheckout = () => {
    startTransition(async () => {
      // In a real app, you'd create a checkout session on the server
      // and redirect to Stripe. For this prototype, we'll simulate success.
      
      toast({
        title: "Redirecting to payment...",
        description: "You will now be redirected to our secure payment provider.",
      });

      // Simulate a small delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set the paid status in local storage and close the dialog
      // This is a simulation. In a real app, this would be handled
      // by the success_url redirect from Stripe.
      localStorage.setItem('resumai-paid', 'true');
      window.location.href = '/build?payment_success=true';

      /*
      // REAL STRIPE IMPLEMENTATION:
      const { sessionId, error } = await createCheckoutSession();

      if (error || !sessionId) {
        toast({
          title: 'Error',
          description: error || 'Could not create a checkout session.',
          variant: 'destructive',
        });
        return;
      }
      
      const stripe = await stripePromise;
      if (!stripe) {
         toast({ title: 'Error', description: 'Stripe.js has not loaded yet.', variant: 'destructive' });
         return;
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        toast({
            title: 'Redirect Error',
            description: stripeError.message || 'Failed to redirect to Stripe.',
            variant: 'destructive',
        })
      }
      */
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center items-center">
            <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full mb-2">
                 <Crown className="h-8 w-8 text-amber-500" />
            </div>
          <DialogTitle className="text-2xl">Unlock Pro Features</DialogTitle>
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
                <p><strong>One-Time Payment:</strong> No subscriptions, no hidden fees. Pay once, use forever.</p>
            </div>
             <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <p><strong>Support Development:</strong> Your contribution helps keep ResumAI running and improving.</p>
            </div>
        </div>
        <div className='text-center my-4'>
            <span className="text-4xl font-bold">$5</span>
            <span className="text-muted-foreground">/ one-time</span>
        </div>
        <Button onClick={handleCheckout} disabled={isPending} size="lg" className="w-full bg-green-600 hover:bg-green-700">
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
