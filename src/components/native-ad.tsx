'use client';

import { useEffect } from "react";

export default function NativeAd() {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.dataset.cfasync = 'false';
        script.src = "//hardypistol.com/0b2761533619c7ae9692d519a7e5bcbf/invoke.js";
        
        const container = document.getElementById('container-0b2761533619c7ae9692d519a7e5bcbf');
        if (container) {
            container.appendChild(script);
        }

        return () => {
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
        }
    }, []);

    return <div id="container-0b2761533619c7ae9692d519a7e5bcbf" />;
}
