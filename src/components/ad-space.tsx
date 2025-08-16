'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdSpace = ({ adKey }: { adKey: string }) => {
  const adRef = useRef<HTMLModElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Disconnect after first intersection
          if(observerRef.current) {
             observerRef.current.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observerRef.current.observe(adRef.current);
    }

    return () => {
       if(observerRef.current) {
          observerRef.current.disconnect();
       }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
        if (adRef.current && adRef.current.getAttribute('data-ad-status') === 'filled') {
            return;
        }

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            if (adRef.current) {
                adRef.current.setAttribute('data-ad-status', 'filled');
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }
  }, [isIntersecting]);

  return (
    <div key={adKey} className="my-6 w-full flex items-center justify-center text-muted-foreground ad-space-container">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px', textAlign: 'center' }}
        data-ad-client="ca-pub-2060063571353216"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSpace;
