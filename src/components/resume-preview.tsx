'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ resumeData }, ref) => {
  return (
    <ScrollArea className="h-[calc(100%-4rem)] rounded-lg border-2 border-dashed border-muted">
       <div id="resume-preview" ref={ref} className="p-2 md:p-4 bg-card shadow-lg rounded-lg transform origin-top scale-95">
         <ProfessionalTemplate resumeData={resumeData} />
       </div>
    </ScrollArea>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
