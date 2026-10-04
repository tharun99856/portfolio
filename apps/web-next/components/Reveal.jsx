import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Reveal = ({
  children,
  delay = 0,
  y = 24,
  x = 0,
  scale = 1,
  rotate = 0,
  className = '',
  as = 'div',
  once = false, // Changed default to false - animates every time!
  duration = 0.6,
  margin = '-60px',
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const delaySeconds = delay > 10 ? delay / 1000 : delay;

  return (
    <MotionTag
      className={className}
      initial={{ 
        opacity: 0, 
        y: reduceMotion ? 0 : y,
        x: reduceMotion ? 0 : x,
        scale: reduceMotion ? 1 : scale,
        rotate: reduceMotion ? 0 : rotate
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0
      }}
      viewport={{ once, margin }}
      transition={{
        duration,
        delay: delaySeconds,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;

export { Reveal };

// SCROLL REVEAL VARIANTS - Use these for different effects!

// Slide from left (every scroll)
export const RevealLeft = ({ children, delay = 0, className = '', ...rest }) => (
  <Reveal x={-80} y={0} delay={delay} className={className} {...rest}>
    {children}
  </Reveal>
);

// Slide from right (every scroll)
export const RevealRight = ({ children, delay = 0, className = '', ...rest }) => (
  <Reveal x={80} y={0} delay={delay} className={className} {...rest}>
    {children}
  </Reveal>
);

// Scale + fade (every scroll)
export const RevealScale = ({ children, delay = 0, className = '', ...rest }) => (
  <Reveal y={0} scale={0.85} delay={delay} duration={0.8} className={className} {...rest}>
    {children}
  </Reveal>
);

// Rotate + fade (every scroll)
export const RevealRotate = ({ children, delay = 0, className = '', ...rest }) => (
  <Reveal y={40} rotate={-8} delay={delay} duration={0.8} className={className} {...rest}>
    {children}
  </Reveal>
);

// Slow cinematic reveal (every scroll)
export const RevealCinematic = ({ children, delay = 0, className = '', ...rest }) => (
  <Reveal y={60} scale={0.95} delay={delay} duration={1.2} margin='-100px' className={className} {...rest}>
    {children}
  </Reveal>
);

// Fast pop-in (every scroll)
export const RevealPop = ({ children, delay = 0, className = '', ...rest }) => (
  <Reveal y={20} scale={0.9} delay={delay} duration={0.4} className={className} {...rest}>
    {children}
  </Reveal>
);

// Blur reveal (needs custom animation)
export const RevealBlur = ({ children, delay = 0, className = '', ...rest }) => {
  const reduceMotion = useReducedMotion();
  const delaySeconds = delay > 10 ? delay / 1000 : delay;

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: reduceMotion ? 0 : 40,
        filter: reduceMotion ? 'blur(0px)' : 'blur(10px)'
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: delaySeconds,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
