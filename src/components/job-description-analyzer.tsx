
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';

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
      // This is a placeholder for the actual analysis logic.
      // In a real application, this would involve an API call to a backend service
      // that uses a large language model to analyze the job description.
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      const suggestedSkills = [
        'React',
        'TypeScript',
        'Node.js',
        'Agile Methodologies',
        'Problem Solving',
      ];
      const suggestedSummary =
        'A results-oriented software developer with a proven track record of designing, developing, and deploying high-quality web applications. Proficient in React, TypeScript, and Node.js, with a strong understanding of agile methodologies. Seeking to leverage my skills and experience to contribute to a challenging and innovative development team.';

      onAnalysisComplete(suggestedSkills, suggestedSummary);

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
