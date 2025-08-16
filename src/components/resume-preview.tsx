
'use client';

import type { ResumeData } from '@/lib/types';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
    return (
      <ScrollArea className="h-full w-full print:h-full print:overflow-visible bg-card shadow-lg print:shadow-none rounded-lg">
        <div
          id="resume-preview-content"
          className="w-full h-full print:p-0"
        >
            <ProfessionalTemplate resumeData={resumeData} />
        </div>
      </ScrollArea>
    );
};

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
