'use server';

import { z } from 'zod';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AuthInput = z.infer<typeof authSchema>;

async function handleAuth(
  action: (email: string, pass: string) => Promise<any>,
  data: AuthInput
) {
  try {
    const { email, password } = authSchema.parse(data);
    await action(email, password);
    return { success: true, error: null };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input.' };
    }
    // Firebase auth errors have a 'code' property.
    // We can provide more specific error messages.
    const errorMessage = error.code ? error.code.replace('auth/', '').replace(/-/g, ' ') : (error.message || 'An unknown error occurred.');
    return {
      success: false,
      error: errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1) + '.',
    };
  }
}

export async function signIn(data: AuthInput) {
  return handleAuth(
    (email, password) => signInWithEmailAndPassword(auth, email, password),
    data
  );
}
