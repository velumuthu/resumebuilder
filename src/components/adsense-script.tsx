
'use client';

import { useEffect } from "react";

export default function AdsenseScript() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2060063571353216";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    return null;
}
