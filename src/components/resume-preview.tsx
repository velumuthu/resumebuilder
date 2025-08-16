
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
            <AdSpace adKey="preview-ad" />
        </div>
        <ScrollArea className="h-full w-full rounded-lg bg-card print:h-full print:overflow-visible print:border-none print:bg-transparent print:shadow-none">
          <div
            id="resume-preview-container"
            ref={ref}
            className="w-full h-full bg-card shadow-lg print:shadow-none"
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
