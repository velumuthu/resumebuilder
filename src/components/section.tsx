'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

const Section = ({ children, className, ...rest }: SectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  );
};

export default Section;
