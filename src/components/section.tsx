'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

// Define only the props we need to avoid type conflicts.
interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const Section = ({ children, className, id }: SectionProps) => {
  const ref = useRef(null);
  // The 'once' option ensures the animation only runs once.
  // The 'amount' option means 10% of the element needs to be in view to trigger.
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      // Animate to the target state when in view. The initial state is used otherwise.
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
