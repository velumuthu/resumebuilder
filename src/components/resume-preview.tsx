'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef, useState } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import Image from 'next/image';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData }, ref) => {
    const [showQr, setShowQr] = useState(false);

    const handlePayClick = () => {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      if (isMobile) {
        const upiLink = 'upi://pay?pa=velumbalaji-1@oksbi&pn=ResumAI&am=5.00&cu=INR&tn=Resume-Download';
        window.open(upiLink, '_blank');
      } else {
        setShowQr(true);
      }
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
              Support ResumAI's Development
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">Your contribution helps keep this tool running. Any amount is appreciated!</p>
            
            {showQr ? (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Scan the QR code with your payment app</p>
                <div className="flex justify-center">
                   <Image
                    src="https://placehold.co/150x150.png"
                    alt="Payment QR Code"
                    width={150}
                    height={150}
                    data-ai-hint="qr code"
                  />
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                    <p>Or contribute directly using:</p>
                    <p className="font-semibold text-foreground mt-1">
                      UPI ID: <span className="font-mono bg-muted p-1 rounded-md">velumbalaji-1@oksbi</span>
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowQr(false)} className="mt-4">
                  Close QR Code
                </Button>
              </div>
            ) : (
               <>
                <Button onClick={handlePayClick} className="mt-4">
                  Contribute with Google Pay
                </Button>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Or contribute directly using:</p>
                  <p className="font-semibold text-foreground mt-1">
                    UPI ID: <span className="font-mono bg-muted p-1 rounded-md">velumbalaji-1@oksbi</span>
                  </p>
                  <p className="font-semibold text-foreground mt-1">
                    Amount: <span className="font-mono bg-muted p-1 rounded-md">₹5.00 (or any amount)</span>
                  </p>
                </div>
              </>
            )}
          </div>
      </ScrollArea>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
