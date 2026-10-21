'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { heroSignature, reducedMotion, ease } from '@/lib/motion-config';
import { MagneticButton } from './MagneticButton';

/**
 * Award-caliber hero section
 * This is THE signature moment - one dramatic entrance, then everything else stays quiet
 */

interface EnhancedHeroProps {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
  imageSrc?: string;
}

export function EnhancedHero({ 
  name, 
  title, 
  subtitle, 
  description,
  cta,
  imageSrc = '/my-image.jpeg'
}: EnhancedHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotion : heroSignature;
  
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
      {/* Animated gradient orbs - signature depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, hsl(275 60% 50% / 0.15) 0%, transparent 70%)',
            top: '10%',
            left: '15%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: ease.smooth,
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, hsl(250 50% 45% / 0.12) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: ease.smooth,
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="space-y-8"
          >
            {/* Name badge */}
            <motion.div variants={variants}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-line/50 bg-panel/50 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-violet-glow animate-pulse" style={{ backgroundColor: 'hsl(var(--violet-glow))' }} />
                <span className="label-caps text-xs text-faint">{name}</span>
              </div>
            </motion.div>

            {/* Main title - staggered word reveal */}
            <motion.div variants={variants} className="space-y-4">
              <h1 className="font-display font-medium uppercase text-hero leading-none tracking-tight">
                {title.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 100, rotateX: -90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: ease.signature,
                        }
                      }
                    }}
                  >
                    {word}
                    {i < title.split(' ').length - 1 && '\u00A0'}
                  </motion.span>
                ))}
              </h1>
              <motion.p 
                variants={variants}
                className="text-2xl lg:text-3xl text-soft font-light"
              >
                {subtitle}
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={variants}
              className="text-base lg:text-lg text-faint leading-relaxed max-w-xl"
            >
              {description}
            </motion.p>

            {/* CTA with magnetic interaction */}
            {cta && (
              <motion.div variants={variants}>
                <MagneticButton
                  href={cta.href}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-sm bg-foreground text-background font-display uppercase text-sm tracking-wider hover:bg-violet-glow transition-colors relative overflow-hidden"
                  strength={0.4}
                  radius={120}
                >
                  {/* Shine effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10">{cta.label}</span>
                  <motion.span 
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: ease.smooth }}
                  >
                    →
                  </motion.span>
                </MagneticButton>
              </motion.div>
            )}
          </motion.div>

          {/* Image with sophisticated reveal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="relative"
          >
            <motion.div
              variants={{
                hidden: { scale: 0.8, opacity: 0, rotateZ: -5 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  rotateZ: 0,
                  transition: {
                    duration: 1.2,
                    ease: ease.signature,
                  }
                }
              }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 mix-blend-multiply" />
              
              {/* Image */}
              <img
                src={imageSrc}
                alt={name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-sm border border-violet-glow/20" style={{ borderColor: 'hsl(var(--violet-glow) / 0.2)' }} />
            </motion.div>

            {/* Floating accent elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl"
              style={{ background: 'hsl(var(--violet-glow) / 0.15)' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: ease.smooth,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
