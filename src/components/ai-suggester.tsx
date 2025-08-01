'use client';

import { getAiSuggestions } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AiSuggesterProps {
  onSuggestionSelect: (suggestion: string) => void;
}

export default function AiSuggester({ onSuggestionSelect }: AiSuggesterProps) {
  const [jobHistory, setJobHistory] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    const result = await getAiSuggestions({ jobHistory, jobDescription });
    setIsLoading(false);

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      setSuggestions(result.suggestions);
    }
  };

  return (
    <Card className="bg-secondary border-primary/20">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <span>AI Content Suggester</span>
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions for your experience section. Briefly describe your past roles and the role you're applying for.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="job-history">Your Relevant Experience</Label>
          <Textarea
            id="job-history"
            placeholder="e.g., Managed a team of 5 engineers, built a customer-facing dashboard using React..."
            value={jobHistory}
            onChange={(e) => setJobHistory(e.target.value)}
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="job-description">Target Job Description</Label>
          <Textarea
            id="job-description"
            placeholder="e.g., Seeking a senior software engineer with 5+ years of experience in front-end development..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
          />
        </div>
        <Button onClick={handleGetSuggestions} disabled={isLoading || !jobHistory || !jobDescription} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get Suggestions
            </>
          )}
        </Button>
        {suggestions.length > 0 && (
          <div className="space-y-2 pt-4">
            <h4 className="font-semibold">Suggestions:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <Button key={i} variant="outline" size="sm" onClick={() => onSuggestionSelect(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
