'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdSpace = ({ adKey }: { adKey: string }) => {
  const adRef = useRef<HTMLModElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentAdRef = adRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Disconnect the observer once the ad is visible to prevent re-triggering
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        // Check if the ad slot has already been filled
        if (currentAdRef && currentAdRef.getAttribute('data-ad-status') === 'filled') {
          return;
        }

        try {
          // Push the ad only when the container is visible
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          if (currentAdRef) {
            currentAdRef.setAttribute('data-ad-status', 'filled');
          }
        } catch (err) {
          console.error('AdSense error:', err);
        }
      }
    };
    
    // Only set up the observer if the ad container ref exists
    if (currentAdRef) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.1, // Trigger when 10% of the element is visible
      });
      observerRef.current.observe(currentAdRef);
    }

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [adKey]); // Re-run effect if the adKey changes, ensuring unique ad slots are handled

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
