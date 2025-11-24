'use client'

import React from 'react';

const AnimatedDownloadIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary mb-4"
    >
      <style>
        {`
          .arrow-path {
            animation: download 2s infinite ease-out;
          }
          @keyframes download {
            0% { transform: translateY(-5px); opacity: 0; }
            50% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(5px); opacity: 0; }
          }
        `}
      </style>
      <g>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line className="arrow-path" x1="12" y1="15" x2="12" y2="3" />
      </g>
    </svg>
  );
};

export default AnimatedDownloadIcon;
