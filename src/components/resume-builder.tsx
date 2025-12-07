
'use client';

import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Loader2, Sparkles, Trash2, Home, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import TemplateSelector from './template-selector';
import JobDescriptionAnalyzer from './job-description-analyzer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const initialData: ResumeData = {
  personalInfo: {
    name: 'velumuthu',
    email: 'velumuthu.cse@gmail.com',
    phone: '(123) 456-7890',
    address: 'City, State',
    website: 'velumuthu.netlify.app',
    summary: 'Enthusiastic and motivated recent Computer Science graduate with a strong foundation in software development and web technologies. Eager to leverage academic knowledge and hands-on project experience to contribute to a dynamic engineering team.',
    profilePicture: '',
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Software Development Intern',
      company: 'Innovatech Solutions',
      location: 'Remote',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      description: '- Assisted in the development of a new feature for the company\'s flagship product using React and TypeScript.\n- Participated in daily stand-ups and sprint planning meetings, contributing to an agile development environment.',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      location: 'Anytown, USA',
      startDate: '2020-09-01',
      endDate: '2024-05-01',
    },
  ],
  skills: [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'React' },
    { id: '3', name: 'Node.js' },
    { id: '4', name: 'Python' },
    { id: '5', name: 'SQL' },
    { id: '6', name: 'Git' },
  ],
  certifications: [
  ],
  projects: [
    { id: '1', name: 'E-commerce Website', description: 'Developed a full-stack e-commerce platform for a university project, featuring product listings, a shopping cart, and a checkout system using the MERN stack.', url: 'github.com/alexdoe/e-commerce' },
  ],
  achievements: [
    { id: '1', description: 'Dean\'s List - 4 Semesters' },
    { id: '2', description: 'Winner, University Hackathon 2023' },
  ],
  areasOfInterest: [
    { id: '1', name: 'Machine Learning' },
    { id: '2', name: 'Open Source Contribution' },
  ],
  template: 'classic',
};

const STORAGE_KEY = 'resumai-data';
const COOKIE_CONSENT_KEY = 'resumai_cookie_consent';

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    let savedData;
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent !== 'granted') {
          setData(initialData);
          return;
      };

      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        savedData = JSON.parse(item);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not load saved data.',
        variant: 'destructive',
      });
    }

    if (savedData) {
      setData({
        ...initialData,
        ...savedData,
        personalInfo: { ...initialData.personalInfo, ...savedData.personalInfo },
        experience: savedData.experience && savedData.experience.length > 0 ? savedData.experience : initialData.experience,
        education: savedData.education && savedData.education.length > 0 ? savedData.education : initialData.education,
        skills: savedData.skills && savedData.skills.length > 0 ? savedData.skills : initialData.skills,
        certifications: savedData.certifications || initialData.certifications,
        projects: savedData.projects && savedData.projects.length > 0 ? savedData.projects : initialData.projects,
        achievements: savedData.achievements || initialData.achievements,
        areasOfInterest: savedData.areasOfInterest || initialData.areasOfInterest,
        template: savedData.template || initialData.template,
      });
    } else {
        setData(initialData);
    }
  }, [toast]);

  useEffect(() => {
    if (data && isClient) {
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

  const handleAnalysisComplete = (suggestedSkills: string[], suggestedSummary: string) => {
    setData(prev => {
      if (!prev) return null;

      const newSkills = suggestedSkills.map((skill, i) => ({
        id: `skill-${Date.now()}-${i}`,
        name: skill,
      }));

      return {
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          summary: suggestedSummary,
        },
        skills: [...prev.skills, ...newSkills],
      };
    });
  };

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
  
const handleDirectDownload = async () => {
    const element = document.getElementById('resume-preview-content');
    if (!element || !data) {
        toast({ title: 'Error', description: 'Could not find resume content to download.', variant: 'destructive' });
        return;
    }

    try {
        const canvas = await html2canvas(element, { scale: 3, useCORS: true });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'in',
            format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${data.personalInfo.name.replace(' ', '-')}-Resume.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
        toast({ title: 'Download Failed', description: 'An error occurred while generating the PDF.', variant: 'destructive' });
    }
};

 const handleDownloadOrPrint = () => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
        handleDirectDownload();
    } else {
        window.print();
    }
 }

  if (!isClient || !data) {
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
    <div className="flex flex-col min-h-screen bg-secondary/40 print:hidden">
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-sm print:hidden">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <Home className="h-5 w-5" />
              <span className='hidden sm:inline'>ResumAI Home</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
             <Button onClick={handleDownloadOrPrint}>
                <Printer className="mr-2 h-4 w-4" />
                Download / Print
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
      
      <main className="flex-1 w-full print:p-0">
        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-2 h-[calc(100vh-4rem)] print:hidden">
           <div className="overflow-y-auto">
             <div className="p-8">
              <TemplateSelector
                  selectedTemplate={data.template}
                  onSelectTemplate={(template) => setData(prev => ({ ...prev!, template }))}
              />
              <JobDescriptionAnalyzer onAnalysisComplete={handleAnalysisComplete} />
              <ResumeForm resumeData={data} setResumeData={setData} />
            </div>
          </div>
          <div className="bg-zinc-800/90 h-full overflow-y-auto p-8">
              <div className="flex flex-col gap-4 h-full">
                <div className='text-primary-foreground'>
                  <h2 className="text-2xl font-bold">Preview</h2>
                  <p className="text-sm text-muted-foreground">Your generated resume will appear here.</p>
                </div>
                <div id="resume-preview-container-desktop" className='flex-grow flex items-start justify-center pt-4'>
                  <div className="w-full max-w-[8.5in] bg-background shadow-2xl rounded-sm overflow-hidden">
                     <ResumePreview resumeData={data} setResumeData={setData} />
                  </div>
                </div>
            </div>
          </div>
        </div>
        
        {/* Mobile View */}
        <div className="lg:hidden print:hidden">
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sticky top-16 z-20 rounded-none">
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <div className="p-4">
                 <TemplateSelector
                    selectedTemplate={data.template}
                    onSelectTemplate={(template) => setData(prev => ({ ...prev!, template }))}
                  />
                <JobDescriptionAnalyzer onAnalysisComplete={handleAnalysisComplete} />
                <ResumeForm resumeData={data} setResumeData={setData} />
              </div>
            </TabsContent>
            <TabsContent value="preview">
               <div id="resume-preview-container-mobile" className="p-4 bg-secondary">
                 <div className="shadow-lg">
                  <ResumePreview resumeData={data} setResumeData={setData} />
                 </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
    {/* Print View */}
    <div className="hidden print:block print-container">
        <ResumePreview resumeData={data} setResumeData={setData} />
    </div>
    </>
  );
}
