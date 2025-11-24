'use client';

import { useEffect } from "react";

export default function NewAd() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//hardypistol.com/4d/09/50/4d0950eb16db62c65c79345b6c4312c6.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return null;
}
