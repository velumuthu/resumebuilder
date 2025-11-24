
import React from 'react';

const AnimatedLogo = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="mx-auto mb-8"
    >
      <style>
        {`
          .line { stroke: #9ca3af; stroke-width: 4; stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw 2s ease-in-out forwards; }
          .line1 { animation-delay: 0.2s; }
          .line2 { animation-delay: 0.4s; }
          .line3 { animation-delay: 0.6s; }
          .line4 { animation-delay: 0.8s; }
          .doc-outline { stroke: #3b82f6; stroke-width: 3; fill: none; }
          .color-fill { animation: color-fill-anim 3s infinite alternate; }

          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes color-fill-anim {
            0% { fill: #3b82f6; } /* blue-500 */
            33% { fill: #22c55e; } /* green-500 */
            66% { fill: #f97316; } /* orange-500 */
            100% { fill: #8b5cf6; } /* violet-500 */
          }
        `}
      </style>
      <g>
        {/* Document Outline */}
        <path d="M20,10 L80,10 L80,90 L20,90 Z" className="doc-outline" />

        {/* Animated text lines */}
        <line className="line line1" x1="30" y1="30" x2="70" y2="30" />
        <line className="line line2" x1="30" y1="45" x2="70" y2="45" />
        <line className="line line3" x1="30" y1="60" x2="50" y2="60" />
        <line className="line line4" x1="30" y1="75" x2="60" y2="75" />

         {/* Color changing element */}
         <circle cx="70" cy="70" r="10" className="color-fill" />
      </g>
    </svg>
  );
};

export default AnimatedLogo;
