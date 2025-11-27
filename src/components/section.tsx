'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Section = ({ children, className, ...props }: SectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default Section;
