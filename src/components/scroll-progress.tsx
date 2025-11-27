'use client';

import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - clientHeight === 0) {
        setWidth(0);
        return;
    }
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-sky-500 z-50 transition-all duration-75"
      style={{ width: `${width}%` }}
    />
  );
};

export default ScrollProgress;
