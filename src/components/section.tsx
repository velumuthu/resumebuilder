'use client';

import { motion, useInView, HTMLMotionProps } from 'framer-motion';
import React, { useRef } from 'react';

// Base the component's props on HTMLMotionProps to ensure type safety
// with framer-motion, while allowing for standard HTML attributes.
interface SectionProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode;
}

const Section = ({ children, ...rest }: SectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      ref={ref}
      // Set the initial and animate props for the reveal animation.
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // Spread the rest of the props, which are now guaranteed to be compatible.
      {...rest}
    >
      {children}
    </motion.section>
  );
};

export default Section;
