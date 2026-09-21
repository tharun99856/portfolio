import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import SideNav from '@/components/portfolio/SideNav';
import SectionLabel from '@/components/portfolio/SectionLabel';

// NOTE: `hero` expects "main image.jpeg" in /public. The %20 is the encoded
// space — rename the file to main-image.jpeg and simplify this to
// '/main-image.jpeg' if you can.
// The rest are neutral stock placeholders — replace with real screenshots of
// Edcore / SmartAsset / IITR Nexus when you have them. Stock images of places
// you've never been are the one thing on this page that isn't yours.
const IMAGES = {
  hero: '/main%20image.jpeg',
  build: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1216&h=896&fit=crop&q=80',
  research: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1216&h=896&fit=crop&q=80',
  systems: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1216&h=896&fit=crop&q=80',
  campus: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1216&h=896&fit=crop&q=80',
  desk: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1216&h=896&fit=crop&q=80',
  lecturehall: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1216&h=896&fit=crop&q=80'
};

const SKILLS = ['Full-Stack Engineering', 'AI & LLM Systems', 'MCP Server Development', 'Backend & Database Design', 'LLM Evaluation & Benchmarking', 'Business & Requirements Analysis', 'UX Research & Dark Pattern Audits', 'Data Pipelines & Analytics'];

const JOBS = [{
  role: 'Solo Founder & Full-Stack Engineer',
  company: 'Edcore',
  location: 'IIT Roorkee / Remote',
  period: '2025 — Present',
  description: 'Building a unified education operating system for Indian students — four modules (ExamNotifi, CollegeTracker, Tutorix, NextTalk) on one Next.js monolith with shared auth, CRM, OTP flows and a notification engine. The moat is a hand-curated dataset of 2,000+ colleges across 25 fields.',
  tags: ['Next.js 16', 'MongoDB', 'NextAuth', 'MSG91 / Resend', 'Product Ownership']
}, {
  role: 'Independent Researcher',
  company: 'Self-Directed — IIT Roorkee',
  location: 'Roorkee, IN',
  period: '2025 — Present',
  description: 'Five papers across AI evaluation, behavioral AI, electrical engineering and linguistics — two sole-authored, two co-authored, one published open-access on Zenodo. Current focus: whether a model can be trusted about its own output.',
  tags: ['LLM-as-Judge', 'Experimental Design', 'Statistical Analysis', 'Academic Writing', 'LaTeX']
}, {
  role: 'Machine Learning Trainee',
  company: 'R.K. IntelliServe',
  location: 'Gurugram, Haryana',
  period: 'Dec 2025 — Feb 2026',
  description: 'Engineered and automated DAG-orchestrated ML preprocessing and evaluation pipelines for production data-processing workflows.',
  tags: ['Python', 'ML Pipelines', 'DAG Orchestration', 'Automation']
}, {
  role: 'Web Developer Intern',
  company: 'Hiring Bazaar',
  location: 'IIT Roorkee Startup',
  period: 'Oct 2025 — Jan 2026',
  description: 'Built the careers page, dynamic role listings and the candidate application workflow across frontend and backend; owned UI feedback and testing through rollout.',
  tags: ['React', 'Full-Stack', 'API Design', 'QA & Testing']
}, {
  role: 'Team Lead — MARS / GDSC / CIG',
  company: 'IIT Roorkee',
  location: 'Roorkee, IN',
  period: '6th Semester',
  description: 'Led three-person teams across three campus initiatives, wrote a PRD, and shipped SmartAsset and the NIFTY-50 Investment Intelligence platform. Separately mentored 10 JEE Advanced aspirants one-on-one (2024–2025) — one moved from the 70th to the 95th percentile.',
  tags: ['Team Leadership', 'PRD Writing', 'Mentoring', 'Delivery']
}];

const EDUCATION = [{
  image: IMAGES.campus,
  alt: 'University campus building',
  caption: 'IIT ROORKEE - ROORKEE / IN',
  title: 'B.Tech, Electrical Engineering',
  school: 'Indian Institute of Technology Roorkee',
  description: 'All India Rank 23,496 in JEE Advanced 2023 and Telangana EAPCET Rank 2,614. The degree is in electrical engineering; most of the building happens outside the syllabus — ten production systems, five papers, and two products shipped solo alongside coursework.',
  period: '2023 — 2027',
  flip: false
}, {
  image: IMAGES.lecturehall,
  alt: 'Lecture hall',
  caption: 'TELANGANA STATE BOARD & CBSE - HYDERABAD / IN',
  title: 'Class XII & Class X',
  school: 'Telangana State Board · CBSE',
  description: 'Class XII — 94.20% (Telangana State Board). Class X — 95.60% (CBSE). Also served as an NCC Cadet with the National Cadet Corps at IIT Roorkee between October 2023 and April 2024.',
  period: '2021 — 2023',
  flip: true
}, {
  image: IMAGES.desk,
  alt: 'Study desk with notes',
  caption: 'CONTINUING - GOOGLE / IBM / MONGODB',
  title: 'Certifications',
  school: 'Google · IBM · MongoDB · Simplilearn',
  description: 'Completed: MongoDB Core Concepts and Architecture, AI Product Management, Business Analytics with Excel, Business Analysis Basics, Google Ads for Beginners, and the Hiring Bazaar Web Developer Program. In progress: Google UX Design, Google Data Analytics, and the IBM Business Analyst professional certificates.',
  period: '2025 — 2026',
  flip: false
}];

// Was "Writing" in the template. Replaced with real published and in-progress research.
const RESEARCH = [{
  title: 'The Capitulation Problem: A Conditional Optimization Framework',
  meta: 'Sole Author — 484 trials, Gemma 4B via Ollama',
  year: '2026',
  href: '#'
}, {
  title: 'Specialist, Generalist and Hybrid LLM Architectures for Algorithmic Code Generation',
  meta: 'Sole Author — 75 problems + 4 adversarial probes',
  year: '2026',
  href: '#'
}, {
  title: 'Dual-Transformer Cross-Attention Multimodal Emotion Recognition',
  meta: 'Co-Author — HuBERT + ViViT, RAVDESS corpus',
  year: '2026',
  href: '#'
}, {
  title: 'Physics-Guided Diffusion Models for Synthetic Power Flow Data Generation',
  meta: 'Co-Author — 91.4% feasible fraction vs 41.2% baseline',
  year: '2025',
  href: '#'
}, {
  title: 'Phonological Fidelity and Convergent Preservation in Indo-European Languages',
  meta: 'Sole Author — Open Access, Zenodo',
  year: '2026',
  href: 'https://zenodo.org/doi/10.5281/zenodo.19885744'
}];

// Was "Speaking" in the template. Replaced with shipped systems.
const WORK = [{
  title: 'Edcore — Education Operating System',
  meta: 'Live · 4 modules, 2,000+ college dataset',
  year: '2025',
  href: 'https://edcore.tech'
}, {
  title: 'SmartAsset — Enterprise Asset Management',
  meta: 'Production · 56+ assets, zero double-bookings',
  year: '2026',
  href: 'https://github.com/tharun99856/SmartAsset'
}, {
  title: 'IITR Nexus — Campus Intelligence',
  meta: 'Production · Parallel MCP retrieval, grounded responses',
  year: '2026',
  href: 'https://github.com/tharun99856/IITRNEXUS'
}, {
  title: 'Rune — Intent-Driven Algorithm Selection Compiler',
  meta: 'Open Source · 115 tests, 3 backends, native C++',
  year: '2026',
  href: 'https://github.com/tharun99856/rune'
}, {
  title: 'PHC Queue Management System',
  meta: 'Live Pilot · ₹9,300 per clinic, ₹0/month running cost',
  year: '2026',
  href: 'https://github.com/tharun99856/Latha-Aunty-HC'
}, {
  title: 'NIFTY-50 Investment Intelligence',
  meta: 'Live · 21 years of data, HMM + XGBoost + SHAP',
  year: '2026',
  href: 'https://niftyinvest.streamlit.app/'
}, {
  title: 'Momentra — Photo & Video Tool for College Clubs',
  meta: 'Competition Submission · Postgres full-text, Sharp watermarking',
  year: '2026',
  href: 'https://github.com/tharun99856/Momentra'
}];

const CHANNELS = [{
  region: 'GITHUB — TEN+ PRODUCTION SYSTEMS',
  href: 'https://github.com/tharun99856'
}, {
  region: 'LINKEDIN — PROFESSIONAL',
  href: 'https://linkedin.com/in/tharun-rathod'
}, {
  region: 'CONSULTING — BA + UX DISCOVERY CALL',
  href: 'https://docs.google.com/forms/d/e/1FAIpQLSeLdPhya4o3q1zTTKDd_OwcMAtbndD8T-w4ORTxuKYu3L22zw/viewform?usp=publish-editor'
}];

const FramedImage = ({
  src,
  alt,
  caption,
  hoverColor = false
}) => <div>
        <div className="overflow-hidden">
            <img src={src} alt={alt} loading="lazy" className={`w-full h-auto grayscale transition-all duration-700 ${hoverColor ? 'hover:grayscale-0 hover:scale-[1.02]' : ''}`} />
        </div>
        <p className="mt-4 caption-italic text-xs text-faint">{caption}</p>
    </div>;

const ListRow = ({
  title,
  meta,
  year,
  href,
  index
}) => {
  const isExternal = href && href !== '#';
  return <Reveal y={30} delay={index * 0.05}>
        <a href={href || '#'} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} onClick={e => {
      if (!isExternal) e.preventDefault();
    }} className="block border-t border-line py-6 md:py-8 group hover:bg-white/[0.03] transition-colors px-4 -mx-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl text-foreground font-light group-hover:text-soft transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-faint mt-1 md:mt-2 italic">{meta}</p>
                </div>
                <span className="text-sm text-dim font-display tracking-widest">{year}</span>
            </div>
        </a>
    </Reveal>;
};

const HomePage = () => {
  return <div className="portfolio-shell min-h-screen text-foreground">
            <Helmet>
                <title>Tharun Rathod — Engineer, Founder, Researcher</title>
                <meta name="description" content="Tharun Rathod is a solo founder, software engineer and independent researcher at IIT Roorkee, building production systems across education, healthcare, hiring and developer tooling." />
            </Helmet>
            <Seo title="Tharun Rathod — Engineer, Founder, Researcher" description="Solo founder and independent researcher building production-grade software systems, AI products and developer tools." image={IMAGES.hero} siteName="Tharun Rathod" />

            <div className="grain-overlay" aria-hidden="true" />
            <SideNav />

            <main>
                {/* HERO */}
                <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
                    <div className="absolute inset-0 w-full h-full">
                        <img src={IMAGES.hero} alt="Tharun Rathod" className="w-full h-full object-cover object-center grayscale" />
                        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
                    </div>
                    <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
                        <div className="w-full max-w-5xl">
                            <motion.div initial={{
              opacity: 0,
              y: 40
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}>
                                <h1 className="font-display font-medium uppercase leading-none tracking-tighter text-[15vw] sm:text-[12vw] md:text-hero"><span className="block text-white">Tharun</span><span className="block text-white">Rathod</span></h1>
                                <motion.p initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.8,
                delay: 0.7
              }} className="mt-6 md:mt-8 text-sm sm:text-base text-white/80 max-w-sm md:max-w-md leading-relaxed">
                                    Ten-plus production systems built solo and five research papers, alongside
                                    a B.Tech in Electrical Engineering at IIT Roorkee.
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section id="about" className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        <SectionLabel>About Tharun</SectionLabel>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
                            <Reveal className="order-2 lg:order-1" y={40}>
                                <FramedImage src={IMAGES.build} alt="Code on a screen during a late build session" caption="SHIPPING SOLO - ROORKEE / IN" />
                            </Reveal>
                            <Reveal className="order-1 lg:order-2 flex items-center" y={40} delay={0.1}>
                                <p className="text-base lg:text-lg text-soft leading-relaxed">
                                    The degree says Electrical Engineering. Most of the work says something
                                    else. Tharun builds production software as a solo founder — schema design
                                    through deployment — across education, healthcare, hiring, enterprise
                                    infrastructure and developer tooling.
                                </p>
                            </Reveal>
                        </div>

                        <Reveal className="mb-24 lg:mb-32" y={40}>
                            <h2 className="font-display font-medium uppercase text-[8vw] lg:text-section leading-none tracking-tight text-soft">
                                "Software that
                                <br />
                                <span className="text-foreground underline underline-offset-8">
                                    replaces friction
                                </span>
                                <br />
                                rather than adding
                                <br />
                                another dashboard."
                            </h2>
                            <p className="mt-6 label-caps text-sm text-faint">
                                On Building
                                <br />
                                — Tharun Rathod, 2026
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
                            <Reveal className="flex items-center lg:text-right" y={40}>
                                <p className="text-base lg:text-lg text-soft leading-relaxed">
                                    It started with a cafe website for a local client in 2025. Within eighteen
                                    months that became Edcore — four integrated modules, a hand-curated dataset
                                    of 2,000+ colleges across 25 fields, and a platform Indian students can
                                    actually navigate instead of five disconnected content sites.
                                </p>
                            </Reveal>
                            <Reveal y={40} delay={0.1}>
                                <FramedImage src={IMAGES.systems} alt="Server infrastructure" caption="SMARTASSET - 56+ ASSETS, ZERO DOUBLE-BOOKINGS" hoverColor />
                            </Reveal>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
                            <Reveal y={40}>
                                <FramedImage src={IMAGES.research} alt="Research notes and data analysis" caption="THE CAPITULATION EXPERIMENT - 484 TRIALS (2026)" />
                            </Reveal>
                            <Reveal className="flex items-center" y={40} delay={0.1}>
                                <p className="text-base lg:text-lg text-soft leading-relaxed">
                                    The research runs on one question: can you trust what a model says about its
                                    own output. The Capitulation Experiment found a 42.8% capitulation rate
                                    under social pressure — and a Compliance Paradox where direct challenge
                                    triggered 64.6% hard reversals while expert authority triggered none at all.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* SKILLS */}
                <section id="skills" className="section-padding bg-panel">
                    <div className="max-w-7xl mx-auto">
                        <SectionLabel>Expertise</SectionLabel>
                        <Reveal y={40}>
                            <h2 className="font-display font-medium uppercase text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20">
                                Skills
                            </h2>
                        </Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 lg:gap-y-6">
                            {SKILLS.map((skill, i) => <Reveal key={skill} y={24} delay={i * 0.04}>
                                    <div className="border-b border-line pb-4 group">
                                        <span className="text-lg md:text-xl lg:text-2xl text-soft font-light group-hover:text-foreground transition-colors duration-300">
                                            {skill}
                                        </span>
                                    </div>
                                </Reveal>)}
                        </div>
                    </div>
                </section>

                {/* WORK EXPERIENCE */}
                <section id="work" className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        <SectionLabel>Career</SectionLabel>
                        <Reveal y={40}>
                            <h2 className="font-display font-medium uppercase text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24">
                                Work
                                <br />
                                Experience
                            </h2>
                        </Reveal>
                        <div className="space-y-0">
                            {JOBS.map(job => <Reveal key={job.company} y={40}>
                                    <article className="border-t border-line py-8 md:py-12 lg:py-16 group">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                                            <div className="lg:col-span-5">
                                                <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-2">
                                                    {job.role}
                                                </h3>
                                                <p className="text-base lg:text-lg text-faint">{job.company}</p>
                                                <p className="text-sm text-dim mt-2 italic">{job.location}</p>
                                            </div>
                                            <div className="lg:col-span-2">
                                                <p className="label-caps text-sm text-faint">{job.period}</p>
                                            </div>
                                            <div className="lg:col-span-5">
                                                <p className="text-faint leading-relaxed mb-6 text-sm lg:text-base">
                                                    {job.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.tags.map(tag => <span key={tag} className="px-3 py-1 text-xs text-faint border border-line rounded-full group-hover:border-dim transition-colors duration-300">
                                                            {tag}
                                                        </span>)}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Reveal>)}
                            <div className="border-t border-line" />
                        </div>
                    </div>
                </section>

                {/* EDUCATION */}
                <section id="education" className="section-padding bg-panel">
                    <div className="max-w-7xl mx-auto">
                        <SectionLabel>Background</SectionLabel>
                        <Reveal y={40}>
                            <h2 className="font-display font-medium uppercase text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24">
                                Education
                            </h2>
                        </Reveal>
                        <div className="space-y-16 lg:space-y-24">
                            {EDUCATION.map(entry => <div key={entry.school} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
                                    <Reveal y={40} className={entry.flip ? 'lg:order-2' : ''}>
                                        <FramedImage src={entry.image} alt={entry.alt} caption={entry.caption} />
                                    </Reveal>
                                    <Reveal y={40} delay={0.1} className={`flex items-center ${entry.flip ? 'lg:order-1' : ''}`}>
                                        <div>
                                            <h3 className="text-xl lg:text-2xl font-light text-foreground mb-1">
                                                {entry.title}
                                            </h3>
                                            <p className="text-base text-faint italic mb-4">{entry.school}</p>
                                            <p className="text-faint leading-relaxed mb-4 text-sm lg:text-base">
                                                {entry.description}
                                            </p>
                                            <p className="label-caps text-sm text-faint">{entry.period}</p>
                                        </div>
                                    </Reveal>
                                </div>)}
                        </div>
                    </div>
                </section>

                {/* RESEARCH — was WRITING */}
                <section id="research" className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        <SectionLabel>Papers & Publications</SectionLabel>
                        <Reveal y={40}>
                            <h2 className="font-display font-medium uppercase text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24">
                                Research
                            </h2>
                        </Reveal>
                        <div className="space-y-0">
                            {RESEARCH.map((item, i) => <ListRow key={item.title} {...item} index={i} />)}
                            <div className="border-t border-line" />
                        </div>
                    </div>
                </section>

                {/* SELECTED WORK — was SPEAKING */}
                <section id="projects" className="section-padding bg-panel">
                    <div className="max-w-7xl mx-auto">
                        <SectionLabel>Systems & Products</SectionLabel>
                        <Reveal y={40}>
                            <h2 className="font-display font-medium uppercase text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24">
                                Selected
                                <br />
                                Work
                            </h2>
                        </Reveal>
                        <div className="space-y-0">
                            {WORK.map((item, i) => <ListRow key={item.title} {...item} index={i} />)}
                            <div className="border-t border-line" />
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        <SectionLabel>Contact</SectionLabel>
                        <Reveal y={60}>
                            <h2 className="font-display font-medium text-[12vw] lg:text-hero leading-none tracking-tight mb-8">
                                Get in touch
                            </h2>
                        </Reveal>
                        <Reveal y={40}>
                            <div className="w-full h-px bg-line mb-12 lg:mb-16" />
                        </Reveal>

                        <Reveal y={40} className="mb-12 lg:mb-16 max-w-2xl">
                            <h3 className="font-display font-medium uppercase text-xl md:text-2xl lg:text-3xl text-foreground leading-tight mb-4">
                                Open to internships
                                <br />
                                in full-stack, BA / UX
                                <br />
                                and AI research
                            </h3>
                            <p className="label-caps text-sm text-faint">
                                Also available for BA + UX consulting — discovery, analysis, BRDs
                            </p>
                        </Reveal>

                        <div className="space-y-0 max-w-2xl">
                            {CHANNELS.map((channel, i) => <Reveal key={channel.region} y={20} delay={i * 0.05}>
                                    <a href={channel.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-t border-line py-5 md:py-6 group hover:bg-white/[0.03] transition-colors px-4 -mx-4">
                                        <span className="label-caps text-sm text-faint group-hover:text-soft transition-colors">
                                            {channel.region}
                                        </span>
                                        <span className="text-faint group-hover:text-foreground transition-colors">
                                            ↗
                                        </span>
                                    </a>
                                </Reveal>)}
                            <div className="border-t border-line" />
                        </div>

                        <Reveal y={40} className="mt-16 lg:mt-24 pt-12 lg:pt-16 border-t border-line">
                            <p className="label-caps text-sm text-faint mb-6 lg:mb-8">Or reach me directly</p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16">
                                <a href="mailto:tharunrathod2005@gmail.com" className="text-lg lg:text-xl text-soft hover:text-foreground transition-colors underline underline-offset-4">
                                    tharunrathod2005@gmail.com
                                </a>
                                <a href="tel:+918074091839" className="text-lg lg:text-xl text-soft hover:text-foreground transition-colors underline underline-offset-4">
                                    +91 80740 91839
                                </a>
                                <a href="https://edcore.tech" target="_blank" rel="noopener noreferrer" className="text-lg lg:text-xl text-soft hover:text-foreground transition-colors underline underline-offset-4">
                                    edcore.tech
                                </a>
                            </div>
                        </Reveal>

                        <Reveal y={20} className="mt-24 lg:mt-32 pt-8 border-t border-line">
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                                <p className="label-caps text-xs text-dim">
                                    © 2026 Tharun Rathod — Engineering, Products & Research
                                </p>
                                <p className="label-caps text-xs text-dim">Roorkee / Hyderabad / Remote</p>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
        </div>;
};
export default HomePage;
