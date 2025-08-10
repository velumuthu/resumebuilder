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
    <ScrollArea className="h-[calc(100%-4rem)] rounded-lg border-2 border-dashed border-muted print:h-full print:overflow-visible print:border-none">
       <div id="resume-preview" ref={ref} className="p-2 md:p-4 bg-card shadow-lg rounded-lg transform origin-top lg:scale-90 xl:scale-100">
        <div id="resume-preview-content">
         <ProfessionalTemplate resumeData={resumeData} />
        </div>
        <div className="payment-info mt-8 pt-8 border-t-2 border-dashed text-center">
            <h3 className="text-lg font-bold">To support my work, please consider a small payment.</h3>
            <p className="mt-2">Scan to pay with any UPI app</p>
            <div className="flex justify-center items-center mt-4 gap-8">
              <div>
                <img 
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACYCAMAAAAvHNATAAAAA1BMVEX///+nxBvIAAAAIElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAIC3AYbQAAF8i21dAAAAAElFTkSuQmCC" 
                  alt="UPI QR Code" 
                  width={150} 
                  height={150} 
                  data-ai-hint="QR code" 
                />
              </div>
              <div className="text-left">
                <p className="font-semibold">UPI ID:</p>
                <p>velumbalaji-1@oksbi</p>
                <p className="font-semibold mt-2">Amount:</p>
                <p>₹5.00</p>
              </div>
            </div>
         </div>
       </div>
    </ScrollArea>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
