/**
 * Award-caliber motion configuration
 * Based on /awwwards principles: intentional motion, one signature moment, everything else quiet
 */

import type { Variants, Transition } from 'framer-motion';

// Core timing - eases borrowed from award-winning sites
export const ease = {
  standard: [0.43, 0.13, 0.23, 0.96],
  signature: [0.76, 0, 0.24, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.25, 0.46, 0.45, 0.94],
} as const;

// Signature hero entrance - the ONE big moment
export const heroSignature: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(12px)',
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.4,
      ease: ease.signature,
      staggerChildren: 0.12,
    }
  }
};

// Quiet reveal - everything else should be subtle
export const quietReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 24,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: ease.standard,
    }
  }
};

// Magnetic hover effect for interactive elements
export const magnetic = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: ease.smooth,
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: ease.standard,
    }
  }
};

// Project card hover - intentional but not aggressive
export const cardHover: Variants = {
  rest: { 
    y: 0,
    boxShadow: '0 0 0 rgba(0,0,0,0)',
  },
  hover: { 
    y: -8,
    boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
    transition: {
      duration: 0.5,
      ease: ease.smooth,
    }
  }
};

// Link underline draw - award-winning detail
export const underlineDraw: Variants = {
  rest: { 
    scaleX: 0,
    originX: 0,
  },
  hover: { 
    scaleX: 1,
    transition: {
      duration: 0.4,
      ease: ease.standard,
    }
  }
};

// Reduced motion variants (accessibility-first)
export const reducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

// Spring configurations for natural movement
export const spring = {
  gentle: { type: 'spring', stiffness: 100, damping: 20 } as Transition,
  snappy: { type: 'spring', stiffness: 300, damping: 30 } as Transition,
  bouncy: { type: 'spring', stiffness: 400, damping: 25 } as Transition,
} as const;

// Stagger configuration for sequential reveals
export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;
