\'use client\'

import React from \'react\';

const AnimatedCodeIcon = () => {
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
        {\`
          .bracket-left {
            animation: move-left 2s infinite alternate ease-in-out;
          }
          .bracket-right {
            animation: move-right 2s infinite alternate ease-in-out;
          }
          @keyframes move-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-2px); }
          }
          @keyframes move-right {
            0% { transform: translateX(0); }
            100% { transform: translateX(2px); }
          }
        \`}
      </style>
      <polyline className="bracket-left" points="8 6 2 12 8 18" />
      <polyline className="bracket-right" points="16 18 22 12 16 6" />
    </svg>
  );
};

export default AnimatedCodeIcon;
