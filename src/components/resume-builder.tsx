
'use client';

import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Loader2, Sparkles, Trash2, Home, Download } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import ResumeForm from './resume-form';
import ResumePreview from './resume-preview';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
      description: '- Developed and maintained web applications using React and Node.js.\\n- Collaborated with cross-functional teams to deliver high-quality software.',
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
  certifications: [
    { id: '1', name: 'Certified Kubernetes Application Developer', issuer: 'Cloud Native Computing Foundation', date: '2022-08-15' },
  ],
  projects: [
    { id: '1', name: 'Personal Portfolio Website', description: 'A responsive website to showcase my projects and skills.', url: 'your-portfolio.com' },
  ],
  achievements: [
    { id: '1', description: 'Employee of the Month - Q3 2021' },
    { id: '2', description: 'Published a technical article on Medium' },
  ],
  areasOfInterest: [
    { id: '1', name: 'Open Source Contribution' },
    { id: '2', name: 'Competitive Programming' },
  ],
};

const STORAGE_KEY = 'resumai-data';
const COOKIE_CONSENT_KEY = 'resumai_cookie_consent';

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsClient(true);
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent !== 'granted') return;

      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        const savedData = JSON.parse(item);
        setData({
          ...initialData,
          ...savedData,
          personalInfo: { ...initialData.personalInfo, ...savedData.personalInfo },
          experience: savedData.experience || initialData.experience,
          education: savedData.education || initialData.education,
          skills: savedData.skills || initialData.skills,
          certifications: savedData.certifications || initialData.certifications,
          projects: savedData.projects || initialData.projects,
          achievements: savedData.achievements || initialData.achievements,
          areasOfInterest: savedData.areasOfInterest || initialData.areasOfInterest,
        });
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
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (consent !== 'granted') return;
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error)
{
        console.error('Failed to save data to localStorage', error);
        toast({
          title: 'Error',
          description: 'Could not save data.',
          variant: 'destructive',
        });
      }
    }
  }, [data, isClient, toast]);

  const handleReset = () => {
    setData(initialData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear localStorage', error);
    }
    toast({
      title: 'Resume Reset',
      description: 'Your resume has been reset to the default template.',
    });
  };
  
  const handleDownloadPdf = () => {
    startTransition(async () => {
      const resumeElement = document.getElementById('resume-preview-content');
      if (!resumeElement) {
        toast({ title: 'Error', description: 'Could not find resume content to download.', variant: 'destructive' });
        return;
      }

      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      if (!canvasWidth || !canvasHeight) {
          toast({ title: 'Error', description: 'Failed to capture resume dimensions. Please try again.', variant: 'destructive' });
          return;
      }

      const ratio = canvasWidth / canvasHeight;
      const widthInPdf = pdfWidth;
      const heightInPdf = widthInPdf / ratio;
      
      if (heightInPdf > pdfHeight) {
          console.warn("Resume is too long for a single PDF page. Cropping may occur.");
      }

      if (widthInPdf <= 0 || heightInPdf <= 0) {
        toast({ title: 'Error', description: 'Invalid resume dimensions for PDF generation.', variant: 'destructive' });
        return;
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, widthInPdf, heightInPdf);
      pdf.save(`${data.personalInfo.name.replace(' ', '-')}-Resume.pdf`);
    });
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
    <>
    <div className="flex flex-col min-h-screen bg-secondary/40">
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <Home className="h-5 w-5" />
              <span className='hidden sm:inline'>ResumAI Home</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
             <Button onClick={handleDownloadPdf} disabled={isPending}>
              {isPending ? (
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download PDF
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-1 h-4 w-4" />
                   <span className="hidden sm:inline">Reset</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your resume
                    data and reset all fields to the default template.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full">
        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-2 h-[calc(100vh-4rem)]">
           <div className="overflow-y-auto">
             <div className="p-8">
              <ResumeForm resumeData={data} setResumeData={setData} />
            </div>
          </div>
          <div className="bg-secondary h-[calc(100vh-4rem)] fixed right-0 top-16 w-1/2">
             <div className="p-4 md:p-8 h-full flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-primary sticky top-0 backdrop-blur-sm z-10 text-center">Resume Preview</h2>
                <div id="resume-preview-container" className='p-4 md:p-8 h-full'>
                  <ResumePreview resumeData={data} />
                </div>
            </div>
          </div>
        </div>
        
        {/* Mobile View */}
        <div className="lg:hidden">
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sticky top-16 z-20 rounded-none">
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <div className="p-4">
                <ResumeForm resumeData={data} setResumeData={setData} />
              </div>
            </TabsContent>
            <TabsContent value="preview">
               <div id="resume-preview-container-mobile" className="p-4 bg-secondary">
                <ResumePreview resumeData={data} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
    </>
  );
}
