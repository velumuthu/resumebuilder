'use server';

import { suggestResumeContent, type SuggestResumeContentInput } from '@/ai/flows/suggest-resume-content';

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
