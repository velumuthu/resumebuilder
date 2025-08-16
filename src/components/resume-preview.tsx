
'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';
import AdSpace from './ad-space';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData }, ref) => {
    return (
      <>
        <div className="ad-space-container print:hidden">
            <AdSpace />
        </div>
        <ScrollArea className="h-[calc(100vh-14rem-4rem)] lg:h-[calc(100%-4rem-4rem)] rounded-lg border-2 border-dashed border-muted print:h-full print:overflow-visible print:border-none">
          <div
            id="resume-preview-container"
            ref={ref}
            className="p-2 md:p-4 bg-card shadow-lg print:p-0 print:shadow-none"
          >
              <ProfessionalTemplate resumeData={resumeData} />
          </div>
        </ScrollArea>
      </>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
