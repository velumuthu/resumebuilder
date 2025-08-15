
'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import Image from 'next/image';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData }, ref) => {
    const handlePayClick = () => {
      const upiLink = 'upi://pay?pa=velumbalaji-1@oksbi&pn=ResumAI&am=5.00&cu=INR&tn=Resume-Download';
      window.open(upiLink, '_blank');
    }; 

    return (
      <ScrollArea className="h-[calc(100vh-14rem)] lg:h-[calc(100%-4rem)] rounded-lg border-2 border-dashed border-muted print:h-full print:overflow-visible print:border-none">
        <div
          id="resume-preview-container"
          ref={ref}
          className="p-2 md:p-4 bg-card shadow-lg"
        >
          <div id="resume-preview-content" className="transform origin-top lg:scale-90 xl:scale-100">
            <ProfessionalTemplate resumeData={resumeData} />
          </div>
        </div>
        <div className="payment-info text-center py-4 px-4 hidden print:block">
            <h3 className="text-lg font-bold">
              Thank you for using ResumAI!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">Payment of ₹5 has been made.</p>
        </div>
        <div className="text-center py-4 px-4 print:hidden">
            <h3 className="text-lg font-bold">
              Support ResumAI's Development
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">Your contribution of ₹5 helps keep this tool running. Any amount is appreciated!</p>
            
            <div className="my-4">
              <Image src="https://i.ibb.co/7tYys1m/qr.jpg" alt="QR Code for UPI Payment" width={150} height={150} className="mx-auto rounded-md" />
            </div>

            <Button onClick={handlePayClick} className="mt-4">
              Contribute through Google Pay
            </Button>
            <div className="mt-4 text-sm text-muted-foreground">
                <p>Or contribute directly using:</p>
                <p className="font-semibold text-foreground mt-1">
                  UPI ID: <span className="font-mono bg-muted p-1 rounded-md">velumbalaji-1@oksbi</span>
                </p>
            </div>
          </div>
      </ScrollArea>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
