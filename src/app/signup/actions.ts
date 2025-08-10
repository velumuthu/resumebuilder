'use server';

import { z } from 'zod';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const orderSchema = z.object({
    amount: z.number().positive(),
    currency: z.string(),
});

const verifySchema = z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


export async function createOrder(data: z.infer<typeof orderSchema>) {
    try {
        const { amount, currency } = orderSchema.parse(data);
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency,
            receipt: `receipt_order_${new Date().getTime()}`
        };
        const order = await razorpay.orders.create(options);
        return { order, error: null };
    } catch (error: any) {
        console.error('Razorpay order creation error:', error);
        return { order: null, error: error.message || 'Failed to create order.' };
    }
}

export async function verifyPaymentAndCreateUser(data: z.infer<typeof verifySchema>) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, password } = verifySchema.parse(data);
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
             // Payment is verified, create user
             await createUserWithEmailAndPassword(auth, email, password);
             // Sign in the user automatically
             await signInWithEmailAndPassword(auth, email, password);
             return { success: true, error: null };
        } else {
            return { success: false, error: 'Payment verification failed. Signature mismatch.' };
        }

    } catch (error: any) {
        console.error('Verification/Signup error:', error);
         if (error instanceof z.ZodError) {
          return { success: false, error: 'Invalid input.' };
        }
        return { success: false, error: error.message || 'An unknown error occurred.' };
    }
}
