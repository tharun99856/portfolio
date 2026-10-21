'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

/**
 * Subtle cursor glow effect
 * Award-winning detail seen on premium portfolio sites
 * Follows cursor with gentle spring physics
 */

export function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);
  
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(140, 100, 255, 0.06), transparent 40%)`,
        '--mouse-x': `${cursorXSpring.get()}px`,
        '--mouse-y': `${cursorYSpring.get()}px`,
      } as any}
    />
  );
}
