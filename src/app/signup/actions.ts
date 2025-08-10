'use server';

import { z } from 'zod';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignupInput = z.infer<typeof signupSchema>;


export async function signUpUser(data: SignupInput) {
    try {
        const { email, password } = signupSchema.parse(data);
        
        // Create user
        await createUserWithEmailAndPassword(auth, email, password);
        
        // Sign in the user automatically
        await signInWithEmailAndPassword(auth, email, password);
        
        return { success: true, error: null };

    } catch (error: any) {
        console.error('Signup error:', error);
         if (error instanceof z.ZodError) {
          return { success: false, error: 'Invalid input.' };
        }
        // Firebase specific error handling
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, error: 'This email is already in use.' };
        }
        return { success: false, error: error.message || 'An unknown error occurred.' };
    }
}
