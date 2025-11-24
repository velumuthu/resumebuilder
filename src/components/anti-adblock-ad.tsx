'use client';

import { useEffect } from "react";

export default function AntiAdblockAd() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//hardypistol.com/c1/07/c6/c107c6279db4c9be955b16a5f0a9b2b7.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return null;
}
