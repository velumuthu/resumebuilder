'use client'

import React from 'react';

const AnimatedEyeIcon = () => {
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
          .eye-lid {
            animation: blink 2s infinite ease-in-out;
            transform-origin: center;
          }
          @keyframes blink {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.1); }
          }
        `}
      </style>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle className="eye-lid" cx="12" cy="12" r="3" />
    </svg>
  );
};

export default AnimatedEyeIcon;
