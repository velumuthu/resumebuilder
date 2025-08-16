'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdSpace = ({ adKey }: { adKey: string }) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Check if an ad has already been loaded by looking for a specific attribute
    if (adRef.current && adRef.current.getAttribute('data-ad-status') === 'filled') {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      // Mark the ad slot as filled to prevent re-injection
      if (adRef.current) {
         adRef.current.setAttribute('data-ad-status', 'filled');
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adKey]);

  return (
    <div key={adKey} className="my-6 w-full flex items-center justify-center text-muted-foreground ad-space-container">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '100px' }}
        data-ad-client="ca-pub-2060063571353216"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSpace;
