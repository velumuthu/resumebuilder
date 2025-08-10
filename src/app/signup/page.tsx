'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Sparkles, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createOrder, verifyPaymentAndCreateUser } from './actions';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormData = z.infer<typeof signupSchema>;

declare global {
    interface Window {
      Razorpay: any;
    }
}

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
  }

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    const razorpayLoaded = await loadRazorpay();

    if (!razorpayLoaded) {
        toast({ title: 'Error', description: 'Failed to load Razorpay SDK. Please try again.', variant: 'destructive'});
        setIsLoading(false);
        return;
    }

    const orderResult = await createOrder({amount: 100, currency: 'INR' });

    if(orderResult.error || !orderResult.order) {
        toast({ title: 'Error', description: orderResult.error || 'Failed to create payment order.', variant: 'destructive'});
        setIsLoading(false);
        return;
    }

    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
        name: "ResumAI Signup",
        description: "One-time fee for account creation",
        order_id: orderResult.order.id,
        handler: async function (response: any) {
            const verificationResult = await verifyPaymentAndCreateUser({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                email: data.email,
                password: data.password
            });

            if(verificationResult.success) {
                toast({ title: 'Success!', description: 'Your account has been created.' });
                router.push('/');
            } else {
                toast({ title: 'Payment Verification Failed', description: verificationResult.error, variant: 'destructive'});
            }
        },
        prefill: {
            email: data.email,
        },
        theme: {
            color: "#3399cc"
        }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
    paymentObject.on('payment.failed', function (response: any) {
        toast({ title: 'Payment Failed', description: response.error.description, variant: 'destructive' });
        setIsLoading(false);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
           <div className="flex items-center justify-center gap-2 font-semibold text-2xl mb-2">
            <FileText />
            <Sparkles className="text-accent" />
            <h1 >ResumAI</h1>
          </div>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create your account with a one-time payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Pay to Sign Up'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-center text-sm text-muted-foreground">
            <p>Already have an account?&nbsp;<Link href="/login" className="text-primary hover:underline">Sign in</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
