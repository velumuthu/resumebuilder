'use server';

import { suggestResumeContent, type SuggestResumeContentInput } from '@/ai/flows/suggest-resume-content';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

export async function createCheckoutSession() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ResumAI Pro - PDF Download',
              description: 'One-time payment to download your resume as a professional PDF.',
            },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/build?payment_success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/build?payment_canceled=true`,
    });
    
    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { error: `Failed to create checkout session: ${errorMessage}` };
  }
}
