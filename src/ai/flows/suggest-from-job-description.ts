'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFromJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The description of the target job the user is applying for.'),
});
export type SuggestFromJobDescriptionInput = z.infer<typeof SuggestFromJobDescriptionInputSchema>;

const SuggestFromJobDescriptionOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('A list of suggested skills.'),
  suggestedSummary: z
    .string()
    .describe('A suggested professional summary.'),
});
export type SuggestFromJobDescriptionOutput = z.infer<typeof SuggestFromJobDescriptionOutputSchema>;

export async function suggestFromJobDescription(
  input: SuggestFromJobDescriptionInput
): Promise<SuggestFromJobDescriptionOutput> {
  return suggestFromJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFromJobDescriptionPrompt',
  input: {schema: SuggestFromJobDescriptionInputSchema},
  output: {schema: SuggestFromJobDescriptionOutputSchema},
  prompt: `You are an AI resume expert. Given the target job description, suggest a list of relevant skills and a professional summary for a resume.

Target Job Description:
{{{jobDescription}}}

Suggestions:`,
});

const suggestFromJobDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestFromJobDescriptionFlow',
    inputSchema: SuggestFromJobDescriptionInputSchema,
    outputSchema: SuggestFromJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
