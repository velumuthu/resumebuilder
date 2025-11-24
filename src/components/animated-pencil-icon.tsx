'use client'

import React from 'react';

const AnimatedPencilIcon = () => {
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
          .pencil {
            animation: write 2s infinite alternate ease-in-out;
          }
          @keyframes write {
            0% { transform: rotate(-10deg) translateX(0); }
            100% { transform: rotate(0deg) translateX(5px); }
          }
        `}
      </style>
      <path className="pencil" d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
};

export default AnimatedPencilIcon;
