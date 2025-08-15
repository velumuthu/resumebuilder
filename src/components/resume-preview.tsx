
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
      <ScrollArea className="h-[calc(100vh-14rem)] lg:h-[calc(100%-4rem)] rounded-lg border-2 border-dashed border-muted print:h-full print:overflow-visible print:border-none">
        <div
          id="resume-preview-container"
          ref={ref}
          className="p-2 md:p-4 bg-card shadow-lg"
        >
          {/* The actual content for PDF generation */}
          <div id="resume-preview-content-wrapper" className="bg-white">
            <ProfessionalTemplate resumeData={resumeData} />
          </div>
        </div>
      </ScrollArea>
    );
  }
);

// This wrapper is needed for html2canvas to capture the content correctly without picking up the parent styling.
const ProfessionalTemplateWrapper = ({ resumeData }: { resumeData: ResumeData }) => {
  return (
    <div id="resume-preview-content">
      <ProfessionalTemplate resumeData={resumeData} />
    </div>
  )
}


ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
