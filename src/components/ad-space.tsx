'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdSpace = () => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Check if an ad has already been loaded
    if (adRef.current && adRef.current.children.length > 0) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="my-6 w-full flex items-center justify-center text-muted-foreground">
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
