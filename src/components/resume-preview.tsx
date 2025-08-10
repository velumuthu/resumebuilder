'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ resumeData }, ref) => {
  return (
    <ScrollArea className="h-[calc(100%-4rem)] rounded-lg border-2 border-dashed border-muted">
       <div id="resume-preview" ref={ref} className="p-2 md:p-4 bg-card shadow-lg rounded-lg transform origin-top scale-95">
        <div id="resume-preview-content">
         <ProfessionalTemplate resumeData={resumeData} />
         <div className="payment-info-print-only mt-8 pt-8 border-t-2 border-dashed text-center">
            <h3 className="text-lg font-bold">To support my work, please consider a small payment.</h3>
            <p className="mt-2">Scan the QR code or use the UPI ID below to pay ₹5.</p>
            <div className="flex justify-center items-center mt-4 gap-8">
              <div>
                <Image 
                  src="https://storage.googleapis.com/stedi-assets/resumai/sample-qr-code.png" 
                  alt="UPI QR Code" 
                  width={150} 
                  height={150} 
                  data-ai-hint="QR code" 
                />
              </div>
              <div className="text-left">
                <p className="font-semibold">UPI ID:</p>
                <p>your-upi-id@okhdfcbank</p>
                <p className="font-semibold mt-2">Amount:</p>
                <p>₹5</p>
              </div>
            </div>
         </div>
        </div>
       </div>
    </ScrollArea>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
