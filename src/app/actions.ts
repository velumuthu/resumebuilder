'use server';

import { suggestResumeContent, type SuggestResumeContentInput } from '@/ai/flows/suggest-resume-content';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});


export async function getAiSuggestions(input: SuggestResumeContentInput) {
  if (!input.jobHistory || !input.jobDescription) {
    return { suggestions: [], error: 'Job history and description are required.' };
  }
  
  try {
    const result = await suggestResumeContent(input);
    return { suggestions: result.suggestions, error: null };
  } catch (e) {
    console.error(e);
    // Return a user-friendly error message
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { suggestions: [], error: `Failed to get suggestions: ${errorMessage}` };
  }
}

export async function createRazorpayOrder() {
  const options = {
    amount: 200, // Amount in paise (e.g., 200 paise = ₹2.00)
    currency: 'INR',
    receipt: `receipt_order_${new Date().getTime()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return { orderId: order.id, error: null };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { orderId: null, error: `Failed to create payment order: ${errorMessage}` };
  }
}
