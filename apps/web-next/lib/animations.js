// Epic animation variants for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 }
};

export const parallaxVariants = (speed = 1) => ({
  initial: { y: 0 },
  animate: { 
    y: speed * 50,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
});

export const glowOnHover = {
  whileHover: {
    boxShadow: "0 0 40px rgba(255, 255, 255, 0.3)",
    transition: { duration: 0.3 }
  }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -10 },
  animate: { opacity: 1, rotate: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const heroTextReveal = {
  initial: { opacity: 0, y: 100, scale: 0.8 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const imageParallax = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const cardFloat = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// FLAGSHIP PROJECT CINEMATIC EFFECTS
export const flagshipCardReveal = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] // Custom easing for buttery smoothness
    }
  }
};

export const flagshipStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const flagshipHover = {
  rest: { 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  hover: { 
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const metricCountUp = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
    }
  }
};

export const insightExpand = {
  initial: { 
    opacity: 0,
    height: 0,
    marginTop: 0
  },
  animate: { 
    opacity: 1,
    height: "auto",
    marginTop: 24,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const tagsFadeIn = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const shimmerEffect = {
  initial: { x: "-100%" },
  animate: { 
    x: "100%",
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};
