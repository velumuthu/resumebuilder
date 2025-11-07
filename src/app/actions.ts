'use server';

import { suggestResumeContent, type SuggestResumeContentInput } from '@/ai/flows/suggest-resume-content';

export async function getAiSuggestions(input: SuggestResumeContentInput) {
  console.log('getAiSuggestions called with input:', JSON.stringify(input, null, 2));

  if (!input.jobHistory || !input.jobDescription) {
    console.error('Validation failed: Job history and description are required.');
    return { suggestions: [], error: 'Job history and description are required.' };
  }
  
  try {
    const result = await suggestResumeContent(input);
    console.log('suggestResumeContent returned:', JSON.stringify(result, null, 2));
    return { suggestions: result.suggestions, error: null };
  } catch (e) {
    console.error('Error in getAiSuggestions:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { suggestions: [], error: `Failed to get suggestions: ${errorMessage}` };
  }
}
