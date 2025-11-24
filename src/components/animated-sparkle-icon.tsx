\'use client\'

import React from \'react\';

const AnimatedSparkleIcon = () => {
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
          .sparkle {
            animation: sparkle-animation 1.5s infinite;
            transform-origin: center;
          }
          @keyframes sparkle-animation {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
          }
        \`}
      </style>
      <path
        className="sparkle"
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
      />
    </svg>
  );
};

export default AnimatedSparkleIcon;
