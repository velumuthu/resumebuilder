
'use client';

import type { ResumeData } from '@/lib/types';
import CreativeTemplate from './templates/creative-template';
import ClassicTemplate from './templates/classic-template';
import ProfessionalTemplate from './templates/professional-template';
import TechnicalTemplate from './templates/technical-template';
import MinimalistTemplate from './templates/minimalist-template';
import AcademicTemplate from './templates/academic-template';
import CorporateTemplate from './templates/corporate-template';
import ElegantTemplate from './templates/elegant-template';
import BoldTemplate from './templates/bold-template';
import { ScrollArea } from './ui/scroll-area';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
    const renderTemplate = () => {
        switch (resumeData.template) {
            case 'creative':
                return <CreativeTemplate resumeData={resumeData} />;
            case 'classic':
                return <ClassicTemplate resumeData={resumeData} />;
            case 'professional':
                return <ProfessionalTemplate resumeData={resumeData} />;
            case 'technical':
                return <TechnicalTemplate resumeData={resumeData} />;
            case 'minimalist':
                return <MinimalistTemplate resumeData={resumeData} />;
            case 'academic':
                return <AcademicTemplate resumeData={resumeData} />;
            case 'corporate':
                return <CorporateTemplate resumeData={resumeData} />;
            case 'elegant':
                return <ElegantTemplate resumeData={resumeData} />;
            case 'bold':
                return <BoldTemplate resumeData={resumeData} />;
            default:
                return <CreativeTemplate resumeData={resumeData} />;
        }
    };

    return (
      <ScrollArea className="h-full w-full print:h-full print:overflow-visible bg-card shadow-lg print:shadow-none rounded-lg">
        <div
          id="resume-preview-content"
          className="w-full h-full print:p-0"
        >
            {renderTemplate()}
        </div>
      </ScrollArea>
    );
};

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
