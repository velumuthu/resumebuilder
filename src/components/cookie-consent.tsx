'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'resumai_cookie_consent';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent === null) {
        setShowConsent(true);
      }
    } catch (error) {
      console.error('Could not access localStorage for cookie consent', error);
      // Silently fail if localStorage is not available (e.g. in private browsing mode)
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'granted');
      setShowConsent(false);
    } catch (error) {
      console.error('Could not save cookie consent choice', error);
      setShowConsent(false);
    }
  };

  const handleDecline = () => {
     try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'denied');
      setShowConsent(false);
    } catch (error) {
      console.error('Could not save cookie consent choice', error);
      setShowConsent(false);
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-t print:hidden">
      <div className="container mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-2 text-sm text-foreground">
           <Cookie className="h-5 w-5 mt-0.5 shrink-0" />
           <p>
            We use essential cookies to save your resume data in your browser. This allows you to pick up where you left off. By continuing, you agree to our cookie use. See our{' '}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button onClick={handleAccept} size="sm">Accept</Button>
          <Button onClick={handleDecline} variant="outline" size="sm">Decline</Button>
        </div>
      </div>
    </div>
  );
}
