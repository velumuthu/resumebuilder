'use server';

import { z } from 'zod';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
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
    return {
      success: false,
      error: error.message || 'An unknown error occurred.',
    };
  }
}

export async function signUp(data: AuthInput) {
  return handleAuth(
    (email, password) => createUserWithEmailAndPassword(auth, email, password),
    data
  );
}

export async function signIn(data: AuthInput) {
  return handleAuth(
    (email, password) => signInWithEmailAndPassword(auth, email, password),
    data
  );
}
