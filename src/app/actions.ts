'use server';

import { suggestResumeContent, type SuggestResumeContentInput } from '@/ai/flows/suggest-resume-content';
import { suggestFromJobDescription, type SuggestFromJobDescriptionInput } from '@/ai/flows/suggest-from-job-description';

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

export async function getAiSuggestionsFromJobDescription(input: SuggestFromJobDescriptionInput) {
  console.log('getAiSuggestionsFromJobDescription called with input:', JSON.stringify(input, null, 2));

  if (!input.jobDescription) {
    console.error('Validation failed: Job description is required.');
    return { suggestedSkills: [], suggestedSummary: '', error: 'Job description is required.' };
  }
  
  try {
    const result = await suggestFromJobDescription(input);
    console.log('suggestFromJobDescription returned:', JSON.stringify(result, null, 2));
    return { ...result, error: null };
  } catch (e) {
    console.error('Error in getAiSuggestionsFromJobDescription:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { suggestedSkills: [], suggestedSummary: '', error: `Failed to get suggestions: ${errorMessage}` };
  }
}
