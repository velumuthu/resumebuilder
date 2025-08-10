'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';
import { Button } from './ui/button';

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
          className="p-2 md:p-4 bg-card shadow-lg rounded-lg transform origin-top lg:scale-90 xl:scale-100"
        >
          <div id="resume-preview-content">
            <ProfessionalTemplate resumeData={resumeData} />
          </div>

          {/* Payment Section */}
          <div className="payment-info mt-8 pt-8 border-t-2 border-dashed text-center">
            <h3 className="text-lg font-bold">
              To support my work, please consider a small payment.
            </h3>
            <p className="mt-2">Click below to proceed to payment.</p>

            <div className="flex justify-center items-center mt-4">
               <Link href="/payment" passHref>
                  <Button>Pay Now</Button>
                </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
