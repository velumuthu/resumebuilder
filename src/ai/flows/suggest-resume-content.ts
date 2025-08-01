'use server';

/**
 * @fileOverview AI-powered content suggestions for resume bullet points.
 *
 * - suggestResumeContent - A function that provides content suggestions for a resume.
 * - SuggestResumeContentInput - The input type for the suggestResumeContent function.
 * - SuggestResumeContentOutput - The return type for the suggestResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResumeContentInputSchema = z.object({
  jobHistory: z
    .string()
    .describe('A detailed description of the user job history.'),
  jobDescription: z
    .string()
    .describe('The description of the target job the user is applying for.'),
});
export type SuggestResumeContentInput = z.infer<typeof SuggestResumeContentInputSchema>;

const SuggestResumeContentOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested resume bullet points.'),
});
export type SuggestResumeContentOutput = z.infer<typeof SuggestResumeContentOutputSchema>;

export async function suggestResumeContent(
  input: SuggestResumeContentInput
): Promise<SuggestResumeContentOutput> {
  return suggestResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResumeContentPrompt',
  input: {schema: SuggestResumeContentInputSchema},
  output: {schema: SuggestResumeContentOutputSchema},
  prompt: `You are an AI resume expert. Given the user's job history and the target job description, suggest resume bullet points that highlight the user's relevant skills and experience.

Job History:
{{{jobHistory}}}

Target Job Description:
{{{jobDescription}}}

Suggestions:`,
});

const suggestResumeContentFlow = ai.defineFlow(
  {
    name: 'suggestResumeContentFlow',
    inputSchema: SuggestResumeContentInputSchema,
    outputSchema: SuggestResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
