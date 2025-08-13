'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdSpace = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="my-6 min-h-[100px] w-full border border-dashed border-muted flex items-center justify-center text-muted-foreground">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-2060063571353216"
           data-ad-slot="YOUR_AD_SLOT_ID"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSpace;
