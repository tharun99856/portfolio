'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { quietReveal, reducedMotion } from '@/lib/motion-config';

/**
 * Enhanced reveal animation with reduced motion support
 * Respects user's accessibility preferences
 */

interface EnhancedRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export function EnhancedReveal({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.6,
  y = 24,
}: EnhancedRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  
  const variants = shouldReduceMotion ? reducedMotion : {
    hidden: { opacity: 0, y },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration, delay }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
