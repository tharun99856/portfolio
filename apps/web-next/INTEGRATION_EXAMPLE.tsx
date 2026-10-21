/**
 * INTEGRATION EXAMPLE - DO NOT DEPLOY THIS FILE
 * 
 * This shows how to integrate the award-winning enhancements
 * into your existing page.tsx. Copy the parts you want.
 */

'use client';

import { EnhancedHero } from '@/components/EnhancedHero';
import { CursorGlow } from '@/components/CursorGlow';
import { MagneticButton } from '@/components/MagneticButton';
import { EnhancedReveal } from '@/components/EnhancedReveal';
import { motion } from 'framer-motion';
import { quietReveal, magnetic, cardHover } from '@/lib/motion-config';

// Your existing data imports
import { FLAGSHIP, LINKS, STATS } from '@/lib/portfolio-data';

export default function IntegrationExample() {
  return (
    <>
      {/* 1. ADD CURSOR GLOW - Place at top level */}
      <CursorGlow />

      {/* 2. REPLACE HERO SECTION with EnhancedHero */}
      <EnhancedHero
        name="Tharun Rathod"
        title="Product Engineer"
        subtitle="Building AI-first products at IIT Roorkee"
        description="Product Manager and AI Engineer. Built Edcore (300+ users), published 5 research papers, and shipped 10+ production systems. I solve real problems with code, design, and data."
        cta={{
          label: "View Work",
          href: "#flagship"
        }}
        imageSrc="/my-image.jpeg"
      />

      {/* 3. USE EnhancedReveal for sections */}
      <section id="flagship" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <EnhancedReveal delay={0}>
            <h2 className="font-display font-medium uppercase text-section leading-none tracking-tight mb-16">
              Flagship Projects
            </h2>
          </EnhancedReveal>

          {/* 4. APPLY cardHover to project cards */}
          {FLAGSHIP.map((project, i) => (
            <EnhancedReveal key={project.name} delay={i * 0.1}>
              <motion.article
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="border-t border-line py-12"
              >
                <h3 className="font-display text-3xl mb-4">{project.name}</h3>
                <p className="text-soft mb-6">{project.tagline}</p>
                
                {/* 5. USE MagneticButton for CTAs */}
                {project.links.map(link => (
                  <MagneticButton
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 px-6 py-3 mr-4 rounded-sm border border-line hover:border-violet-glow transition-colors text-sm uppercase tracking-wider"
                    strength={0.3}
                    radius={80}
                  >
                    {link.label} →
                  </MagneticButton>
                ))}
              </motion.article>
            </EnhancedReveal>
          ))}
        </div>
      </section>

      {/* 6. APPLY motion variants to interactive elements */}
      <section className="section-padding bg-panel">
        <div className="max-w-7xl mx-auto">
          <EnhancedReveal>
            <h2 className="font-display text-section mb-12">Get in Touch</h2>
          </EnhancedReveal>

          <EnhancedReveal delay={0.2}>
            <div className="flex flex-wrap gap-4">
              {/* Magnetic effect on social links */}
              <MagneticButton
                href={LINKS.github}
                className="px-8 py-4 bg-foreground text-background font-display uppercase text-sm tracking-wider rounded-sm"
                strength={0.4}
                radius={120}
              >
                GitHub →
              </MagneticButton>

              <MagneticButton
                href={LINKS.linkedin}
                className="px-8 py-4 border border-line hover:bg-panel font-display uppercase text-sm tracking-wider rounded-sm"
                strength={0.4}
                radius={120}
              >
                LinkedIn →
              </MagneticButton>
            </div>
          </EnhancedReveal>
        </div>
      </section>

      {/* 7. EXAMPLE: Apply variants directly to existing motion.div elements */}
      <section className="section-padding">
        <motion.div
          variants={quietReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-lg text-soft">
            This section fades in quietly when scrolled into view.
          </p>
        </motion.div>
      </section>
    </>
  );
}

/**
 * QUICK WINS - Copy-paste ready enhancements
 */

// Enhanced button with magnetic effect
const EnhancedCTA = () => (
  <MagneticButton
    href="#contact"
    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-sm bg-foreground text-background font-display uppercase text-sm tracking-wider overflow-hidden"
    strength={0.4}
    radius={120}
  >
    {/* Shine effect on hover */}
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    <span className="relative z-10">Get in Touch</span>
    <span className="relative z-10">→</span>
  </MagneticButton>
);

// Section header with staggered reveal
const EnhancedSectionHeader = ({ label, title }: { label: string; title: string }) => (
  <div className="mb-16">
    <EnhancedReveal delay={0}>
      <p className="label-caps text-xs text-faint mb-4">{label}</p>
    </EnhancedReveal>
    
    <EnhancedReveal delay={0.1} y={40}>
      <h2 className="font-display font-medium uppercase text-section leading-none tracking-tight">
        {title}
      </h2>
    </EnhancedReveal>
  </div>
);

// Project card with hover effect
const EnhancedProjectCard = ({ project }: { project: any }) => (
  <EnhancedReveal>
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="border border-line rounded-sm p-8 bg-panel/50 backdrop-blur-sm"
    >
      <h3 className="font-display text-2xl mb-3">{project.name}</h3>
      <p className="text-faint mb-6">{project.tagline}</p>
      
      <div className="flex gap-2">
        {project.links.map((link: any) => (
          <MagneticButton
            key={link.label}
            href={link.href}
            className="px-4 py-2 text-sm border border-line hover:border-violet-glow transition-colors rounded-sm"
          >
            {link.label}
          </MagneticButton>
        ))}
      </div>
    </motion.article>
  </EnhancedReveal>
);

// Stat grid with sequential reveals
const EnhancedStatGrid = ({ stats }: { stats: Array<{ value: string; label: string }> }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-line">
    {stats.map((stat, i) => (
      <EnhancedReveal key={stat.label} delay={i * 0.1}>
        <div className="flex flex-col-reverse gap-2">
          <dt className="label-caps text-xs text-faint">{stat.label}</dt>
          <dd className="font-display font-medium text-6xl">{stat.value}</dd>
        </div>
      </EnhancedReveal>
    ))}
  </div>
);

/**
 * MIGRATION CHECKLIST
 * 
 * [ ] Add CursorGlow at top level
 * [ ] Replace hero with EnhancedHero (or just add magnetic buttons to existing hero)
 * [ ] Replace Reveal with EnhancedReveal throughout
 * [ ] Add MagneticButton to CTAs and important links
 * [ ] Apply cardHover to project cards
 * [ ] Test with reduced motion enabled
 * [ ] Verify keyboard navigation (tab through page)
 * [ ] Check mobile responsiveness
 * [ ] Run Lighthouse audit
 */
