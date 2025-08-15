
'use client';

import type { ResumeData } from '@/lib/types';
import { forwardRef } from 'react';
import ProfessionalTemplate from './templates/professional-template';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resumeData }, ref) => {
    const { toast } = useToast();

    const handlePayClick = () => {
      const upiLink = 'upi://pay?pa=velumbalaji-1@oksbi&pn=ResumAI&am=5.00&cu=INR&tn=Resume-Download';
      window.open(upiLink, '_blank');
      toast({
        title: 'Thank You for Your Support!',
        description: 'Your contribution helps keep ResumAI running.',
      });
    }; 

    return (
      <ScrollArea className="h-[calc(100vh-14rem)] lg:h-[calc(100%-4rem)] rounded-lg border-2 border-dashed border-muted print:h-full print:overflow-visible print:border-none">
        <div
          id="resume-preview-container"
          ref={ref}
          className="p-2 md:p-4 bg-card shadow-lg"
        >
          <div id="resume-preview-content">
            <ProfessionalTemplate resumeData={resumeData} />
          </div>
        </div>
        <div className="payment-info text-center py-4 px-4 hidden print:block">
            <h3 className="text-lg font-bold">
              Generated with ResumAI
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">Thank you for using our tool!</p>
        </div>
        <div className="text-center py-4 px-4 print:hidden">
            <h3 className="text-lg font-bold">
              Support ResumAI's Development
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">If you find this tool helpful, please consider a small contribution to keep it running.</p>
            
            <Button onClick={handlePayClick} className="mt-4">
              Contribute via UPI
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
