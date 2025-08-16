
'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData }, ref) => {
    return (
      <ScrollArea className="h-full w-full print:h-full print:overflow-visible">
        <div
          id="resume-preview-container"
          ref={ref}
          className="w-full h-full bg-card shadow-lg print:shadow-none rounded-lg"
        >
            <ProfessionalTemplate resumeData={resumeData} />
        </div>
      </ScrollArea>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
