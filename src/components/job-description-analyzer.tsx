
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';
import { getAiSuggestionsFromJobDescription } from '@/app/actions';

interface JobDescriptionAnalyzerProps {
  onAnalysisComplete: (suggestedSkills: string[], suggestedSummary: string) => void;
}

export default function JobDescriptionAnalyzer({ onAnalysisComplete }: JobDescriptionAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Job Description is empty',
        description: 'Please paste a job description to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await getAiSuggestionsFromJobDescription({ jobDescription });

      if (result.error) {
        throw new Error(result.error);
      }

      onAnalysisComplete(result.suggestedSkills, result.suggestedSummary);

      toast({
        title: 'Analysis Complete',
        description: 'We have suggested some skills and a summary for you.',
      });
    } catch (error) {
      console.error('Failed to analyze job description', error);
      toast({
        title: 'Analysis Failed',
        description: 'Could not analyze the job description.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 my-6 border rounded-lg bg-background shadow-sm">
        <div className='flex justify-between items-center mb-4'>
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-accent" />
                AI-Powered Suggestions
            </h3>
        </div>
      <p className="text-sm text-muted-foreground mb-3">
        Paste a job description below and let our AI suggest relevant skills and a professional summary to tailor your resume.
      </p>
      <Textarea
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="mb-4 h-40"
      />
      <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
        {isLoading ? 'Analyzing...' : 'Generate Suggestions'}
      </Button>
    </div>
  );
}
