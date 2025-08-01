'use client';

import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ResumeForm from './resume-form';
import ResumePreview from './resume-preview';

const initialData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    address: 'City, State',
    website: 'your-portfolio.com',
    summary: 'A brief professional summary about yourself. Highlight your key skills and career goals.',
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2020-01-01',
      endDate: 'Present',
      description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality software.',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      location: 'Anytown, USA',
      startDate: '2016-09-01',
      endDate: '2020-05-01',
    },
  ],
  skills: [
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Node.js' },
    { id: '4', name: 'Tailwind CSS' },
  ],
};

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    try {
      const item = localStorage.getItem('resumai-data');
      if (item) {
        setData(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not load saved data.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('resumai-data', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save data to localStorage', error);
        toast({
          title: 'Error',
          description: 'Could not save data.',
          variant: 'destructive',
        });
      }
    }
  }, [data, isClient, toast]);
  
  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setData(initialData);
      toast({
        title: 'Resume Reset',
        description: 'Your resume has been reset to the default template.',
      });
    }
  };
  
  if (!isClient) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-4">
        <div className="flex items-center gap-2 text-2xl font-semibold text-primary">
          <FileText className="h-8 w-8" />
          <Sparkles className="h-8 w-8 text-accent" />
          <span>ResumAI</span>
        </div>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading Builder...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <FileText />
            <Sparkles className="text-accent" />
            <h1>ResumAI</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button onClick={handleReset} variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <ResumeForm resumeData={data} setResumeData={setData} />
          </div>
          <div className="lg:col-span-3">
            <ResumePreview ref={previewRef} resumeData={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
