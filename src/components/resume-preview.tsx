'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData }, ref) => {
    const handlePayNow = () => {
      // UPI link for Google Pay
      const upiLink = 'upi://pay?pa=velumbalaji-1@oksbi&pn=ResumAI&am=5.00&cu=INR&tn=Resume-Download';
      window.open(upiLink, '_blank');
    };

    return (
      <ScrollArea className="h-[calc(100%-4rem)] rounded-lg border-2 border-dashed border-muted print:h-full print:overflow-visible print:border-none">
        <div
          id="resume-preview"
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
              Ready to Proceed?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">A small payment helps support this tool. Click the button or use the UPI details below.</p>
            <Button onClick={handlePayNow} className="mt-4">
              Pay with Google Pay
            </Button>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Or pay directly using:</p>
              <p className="font-semibold text-foreground mt-1">
                UPI ID: <span className="font-mono bg-muted p-1 rounded-md">velumbalaji-1@oksbi</span>
              </p>
              <p className="font-semibold text-foreground mt-1">
                Amount: <span className="font-mono bg-muted p-1 rounded-md">₹5.00</span>
              </p>
            </div>
          </div>
      </ScrollArea>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;