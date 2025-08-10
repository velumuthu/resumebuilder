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

          {/* Payment Section */}
          <div className="payment-info mt-8 pt-8 border-t-2 border-dashed text-center" style={{ display: 'none' }}>
             <h3 className="text-lg font-bold">
              To support my work, please consider a small payment.
            </h3>
            <p className="mt-2">Scan the QR code using any UPI app.</p>
            <div className="flex justify-center items-center mt-4">
              <Image
                src="https://storage.googleapis.com/stedi-assets/resumai/sample-qr-code.png"
                alt="UPI QR Code"
                width={150}
                height={150}
                className="rounded-lg border"
              />
            </div>
             <div className="text-center mt-4">
                <p className="font-semibold">UPI ID: <span className="font-normal">velumbalaji-1@oksbi</span></p>
                <p className="font-semibold">Amount: <span className="font-normal">₹5.00</span></p>
            </div>
          </div>
        </div>
      </ScrollArea>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
