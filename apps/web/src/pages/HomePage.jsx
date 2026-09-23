import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import SideNav from '@/components/portfolio/SideNav';
import SectionLabel from '@/components/portfolio/SectionLabel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';
import { FaRocket, FaCode, FaBrain, FaPalette, FaFlask, FaChartLine, FaLightbulb, FaGraduationCap } from 'react-icons/fa';

const IMAGES = {
  hero: '/main%20image.jpeg',
  build: '/my-image.jpeg', // Your image from public folder
  research: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1216&h=896&fit=crop&q=80',
  systems: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1216&h=896&fit=crop&q=80',
  campus: '/images.jpg', // IITR campus image
  lecturehall: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1216&h=896&fit=crop&q=80'
};

const LINKS = {
  github: 'https://github.com/tharun99856',
  linkedin: 'https://linkedin.com/in/tharun-rathod',
  zenodo: 'https://zenodo.org/doi/10.5281/zenodo.19885744',
  edcore: 'https://edcore.tech',
  rune: 'https://tharun99856.github.io/rune/',
  consulting: 'https://docs.google.com/forms/d/e/1FAIpQLSeLdPhya4o3q1zTTKDd_OwcMAtbndD8T-w4ORTxuKYu3L22zw/viewform?usp=publish-editor',
  // 3 Resume Links - from public folder
  resume_fullstack: '/Tharun_Rathod_Resume%20(1).pdf', // Software Development Resume
  resume_research: '/Tharun_Rathod_AI_Research_Resume.pdf', // AI Research Resume
  resume_ba_ux: '/Tharun_Rathod_PM_Resume%20(1).pdf' // Product Management / Implementation Engineering Resume
};

const GH = repo => `https://github.com/tharun99856/${repo}`;

const DOMAINS = ['Education', 'Healthcare', 'Hiring', 'Developer Tools', 'Enterprise Systems', 'Research'];

const STATS = [{
  value: '10+',
  label: 'Production systems'
}, {
  value: '5',
  label: 'Research papers'
}, {
  value: '484',
  label: 'Empirical trials'
}, {
  value: '2,000+',
  label: 'Colleges dataset'
}];

// 5 FLAGSHIP PROJECTS - DIRECT DISPLAY, NO EXPANDABLE
const FLAGSHIP = [{
  name: 'Edcore',
  tagline: 'All-in-one education OS for Indian students - live with 300+ users across exam prep, college selection, and career guidance.',
  description: 'Four production modules under one unified Next.js 16 monolith: ExamNotifi (exam calendar + notifications), CollegeTracker (personalized college shortlisting), Tutorix (mentor matching), and NextTalk (career counseling booking). Shared authentication via NextAuth, unified CRM with Airtable sync, MSG91 OTP flows, demo scheduling, and email automation with Resend. Not four isolated apps - one cohesive platform with cross-module state management, MongoDB schema shared across all features, and a notification engine that tracks user behavior across modules.',
  insight: 'The real moat isn\'t the code - it\'s the 2,000+ college dataset curated across 25 fields (hostel vibe, coding culture, campus life, placements, city tier, faculty, infrastructure, location advantages). Competitors have college names. Edcore has the depth students actually need to decide. The dataset took months of manual curation and is harder to replicate than the entire platform.',
  metrics: [
    { value: '300+', label: 'Active Users' },
    { value: '4', label: 'Live Modules' },
    { value: '2k+', label: 'Colleges' },
    { value: '25', label: 'Data Fields' }
  ],
  tags: ['Education', 'SaaS', 'Next.js 16', 'TypeScript', 'MongoDB', 'NextAuth', 'MSG91', 'Resend', 'Vercel'],
  links: [{ label: 'edcore.tech', href: LINKS.edcore }],
  media: { type: 'video', src: '/projects/edcore recording.mp4' }
}, {
  name: 'Rune',
  tagline: 'An optimizing compiler that infers the optimal algorithm from your intent - and formally verifies correctness.',
  description: 'Write what you want, not how to compute it. Rune parses intent-driven keywords (group, order, take, explore, maximize) and automatically selects the right algorithm: heap vs sort for TOP_K, BFS vs Dijkstra for shortest paths, Kadane\'s algorithm for maximum subarray. Three execution backends (interpreted Python, Numba JIT, native C++ with LLVM) with automatic backend selection based on problem size. Every optimization is verified against a naive baseline using property-based testing - 115 test cases ensure correctness across all optimization paths.',
  insight: 'The innovation isn\'t one clever optimization - it\'s a repeatable framework for algorithmic selection. TOP_K selection happens at parse time (syntax-driven). BFS vs Dijkstra happens at runtime (graph structure inspection). Kadane detection happens from objective analysis (maximize + contiguous). Three structurally different decisions across three algorithm families, all automatically verified. It\'s proof that intent-level programming can outperform hand-coded solutions while guaranteeing correctness.',
  metrics: [
    { value: '3', label: 'Backends' },
    { value: '115', label: 'Tests' },
    { value: '5x', label: 'Speedup' },
    { value: 'Verified', label: 'Correct' }
  ],
  tags: ['Compiler', 'DSL', 'Python', 'Numba', 'C++', 'LLVM-JIT', 'Algorithm Selection', 'Verification'],
  links: [
    { label: 'Try in Browser', href: LINKS.rune },
    { label: 'GitHub', href: GH('rune') }
  ],
  media: { type: 'video', src: '/projects/rune recording.mp4' }
}, {
  name: 'IITR Nexus',
  tagline: 'Unified campus intelligence - one query routes across academics, library, dining, events, and notices via parallel MCP retrieval.',
  description: 'Campus information lives across 10+ disconnected systems. IITR Nexus routes a single query across academics, library, dining, events, and notices using multiple MCP servers in parallel. Intent classification determines which servers to query. Confidence scoring ensures grounded responses - if the system is uncertain, it surfaces the source, not a guess. Reasoning panel visible to users.',
  insight: 'Intent classification before routing reduces wrong-server queries significantly. The hallucination resistance mechanism is the key design choice - when confidence drops below threshold, the system returns a source reference instead of synthesizing an answer, preserving trust at the cost of convenience.',
  metrics: [
    { value: '5+', label: 'Data sources' },
    { value: 'MCP', label: 'Architecture' },
    { value: 'Parallel', label: 'Retrieval' },
    { value: 'Grounded', label: 'Responses' }
  ],
  tags: ['Education', 'AI', 'MCP', 'Next.js', 'TypeScript', 'Groq Llama 3.3 70B', 'Intent Detection'],
  links: [{ label: 'GitHub', href: GH('IITRNEXUS') }],
  media: { type: 'video', src: '/projects/iitr nexus recording.mp4' }
}, {
  name: 'Canopy',
  tagline: 'Repo dependency visualization - parses Python and JS/TS imports via the GitHub API. No cloning. No local setup.',
  description: 'Canopy parses Python and JS/TS import statements directly from GitHub - no cloning, no local execution, no CI setup. Builds an interactive React Flow dependency graph with Gemini-generated module summaries. MD5 caching prevents redundant parses. Dark forest UI for extended analysis sessions.',
  insight: 'Parsing imports without executing code requires careful alias resolution - TypeScript path aliases, Python relative imports, and dynamic requires all break naive string matching. The parser handles edge cases before graph construction, because a dependency graph with silent resolution failures is worse than none.',
  metrics: [
    { value: '2', label: 'Languages' },
    { value: '0', label: 'Clones' },
    { value: 'MD5', label: 'Cache' },
    { value: 'AI', label: 'Summaries' }
  ],
  tags: ['Developer Tools', 'Next.js', 'React Flow', 'Gemini API', 'GitHub API', 'TypeScript'],
  links: [
    { label: 'Live App', href: 'https://canopy-gdsc-iitr.vercel.app/' },
    { label: 'GitHub', href: 'https://github.com/tharun99856/CANOPY-GDSC-IITR' }
  ],
  media: { type: 'video', src: '/projects/canopy recording.mp4' }
}];

// AI & ML PROJECTS
const AI_BUILDS = [{
  title: 'Signal',
  tagline: 'AI decision engine that automates recruiting workflow decisions - watches workflows, decides when to act, when to wait, when to escalate.',
  description: 'Signal Agent handles routine recruiting decisions (chase missing feedback, update candidates, flag SLA breaches) so ops teams can focus on edge cases. Dashboard shows all cases with status (Resolved, Waiting, Escalated, Pending), agent reasoning, planned actions, and execution logs. Metrics track SLA breaches prevented, response time, autonomous resolution rate, and escalation accuracy.',
  insight: '100% rule-based - no LLM, no machine learning, pure deterministic logic. Policy-constrained (never auto-reject candidates), confidence-scored, human override enabled. Decision framework: ACT (high urgency + clear action), ESCALATE (sensitive situations like rejected candidate inquiry or 3+ follow-ups), WAIT (normal progression), ASK (ambiguous situations). The explainability is the product, not a feature.',
  tags: ['Hiring', 'Enterprise', 'AI', 'Next.js', 'TypeScript', 'PostgreSQL', 'ATS Webhooks', 'Rule-Based AI'],
  links: [{ label: 'GitHub', href: 'https://github.com/tharun99856/SIGNAL' }],
  media: { type: 'image', src: '/projects/signal-dashboard.jpg' } // Add your screenshot here
}, {
  title: 'PHC Queue Management System',
  description: 'A token + wait-time system for Primary Health Centres, piloted against Latha Children\'s Clinic in Attapur, Hyderabad. Front desk issues a printed token with an honest wait estimate off the rolling 10-consultation average; doctor clicks through patients to advance the queue; front desk gets a phone-number callback list for no-shows. No app install for patients, no internet required for the queue logic itself, and V1 ships with zero third-party API dependency on purpose - every piece justified by an actual cost or reliability constraint.',
  highlights: [
    'Simulated 67% reduction in physical wait time and 69% reduction in peak in-clinic occupancy, over 10 runs × 100 patients',
    '₹9,300 one-time hardware cost per PHC, ₹0/month running cost in V1 - FastAPI + SQLite chosen specifically because it runs on a Raspberry Pi and survives power loss'
  ],
  tags: ['Healthcare', 'Python', 'FastAPI', 'SQLite', 'Raspberry Pi'],
  links: [{ label: 'GitHub', href: GH('Latha-Aunty-HC') }]
}, {
  title: 'NIFTY-50 Investment Intelligence',
  description: 'Investment intelligence platform on 21 years of NIFTY-50 data. Hidden Markov Models detect bull/bear regime transitions. XGBoost price prediction with SHAP explainability. Portfolio optimization via Modern Portfolio Theory. Risk analytics with Value-at-Risk and drawdown analysis. Interactive Plotly dashboard.',
  highlights: [
    'HMM trained on return distributions detects regime shifts 3-5 days before they are visually apparent on price charts',
    'SHAP values surface which features (RSI, MACD, volume delta) drove each prediction - explainability built in, not bolted on'
  ],
  tags: ['Finance', 'Python', 'Streamlit', 'hmmlearn', 'XGBoost', 'SHAP', 'scikit-learn'],
  links: [
    { label: 'Live demo', href: 'https://niftyinvest.streamlit.app/' },
    { label: 'GitHub', href: GH('-NIFTY-50-Investment') }
  ],
  media: { type: 'video', src: '/projects/Nifty 50 recording.mp4' }
}];

// DEV TOOLS PROJECTS
const DEV_TOOLS = [{
  title: 'SmartAsset',
  tagline: 'Enterprise asset management - 56+ assets, zero double-bookings, full audit trail.',
  description: 'Replaces paper logbooks for warehouse-scale asset tracking. Date-window availability validation ensures no two reservations overlap. Atomic inventory updates and serializable approval logic prevent race conditions under concurrent booking. QR-based issue and return creates a frictionless audit trail. Analytics dashboard, role-based access control, and full warehouse workflow management.',
  insight: 'The double-booking prevention lives at the database layer, not the UI. Serializable transactions in PostgreSQL (via Prisma) prevent conflicts under concurrent write pressure - the kind of gap that paper logbooks and naive first-come-first-served systems cannot close. Operational consistency has to be enforced at the data layer or it is not enforced at all.',
  highlights: [
    '56+ assets tracked with zero double-bookings',
    'QR-based issue/return with full audit trail',
    'RBAC permissions and analytics dashboard'
  ],
  tags: ['Enterprise', 'Infrastructure', 'Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT Auth', 'QR Code'],
  links: [{ label: 'GitHub', href: GH('SmartAsset') }],
  media: { type: 'video', src: '/projects/Smartasset recording .mp4' }
}, {
  title: 'TravelChecker',
  tagline: 'Multi-modal travel comparison for India - MCP server + REST API + dashboard. Finds optimal composite routes like cab→airport→flight.',
  description: 'Built as a Model Context Protocol (MCP) server so it can be plugged into Claude Desktop, Cursor, or any MCP-compatible AI agent as a tool. Also ships with a REST API and a web dashboard. Most travel apps only show direct routes. Search "Khammam to Delhi" and you\'ll see slow trains - but never the fact that the fastest option is actually a cab to Vijayawada airport + a flight from there. TravelChecker finds the nearest transport hub (airport/railway station) for any city and constructs complete multi-leg journeys, then ranks them all by your priorities.',
  highlights: [
    '5 travel modes: Flight, Train, Bus, Cab (Ola/Uber/Auto/Rapido), Personal Vehicle (Petrol/Diesel/Bike) across 117 Indian cities',
    'Live API data: Google Maps Distance Matrix, Travelpayouts/Aviasales (flights), IRCTC RapidAPI (trains), AbhiBus HTTP scrape (buses)',
    'Weighted scoring: tune price/time/comfort sliders to match your trip style with smart insights on surge warnings, fuel-vs-cab savings, train-vs-flight tradeoffs',
    'Graceful fallbacks: every provider has a modeled backup so the app never breaks when an API quota runs out. SQLite cache for Google Maps, per-IP rate limiting (30 req/min), OpenAPI/Swagger docs'
  ],
  tags: ['MCP', 'TypeScript', 'Node.js', 'Google Maps API', 'Aviasales', 'IRCTC API', 'SQLite'],
  links: [
    { label: 'Live API', href: 'https://travelchecker-resume.up.railway.app' },
    { label: 'GitHub', href: 'https://github.com/tharun99856/TravelChecker' }
  ],
  media: { type: 'image', src: '/projects/travelchecker logo.png' }
}, {
  title: 'Wayfound',
  tagline: 'AI-powered itinerary planner for Hyderabad. Tell it your group size, age, vibe and budget - it plans your whole outing with real venues, timings and cost breakdown.',
  description: 'Stop searching. Start going. Wayfound generates complete day plans for Hyderabad in seconds. Input your group (size, age), activity preference (go-karting, romantic dinner, gaming zone, cultural day), and budget - the AI outputs a full itinerary with venue names, addresses, timings, and cost breakdown. Uses Groq AI (llama-3.1-8b-instant) for natural language itinerary generation and Google Places API for real venue data. Smart mock engine with 200+ verified Hyderabad venues as fallback when API quota runs out.',
  highlights: [
    'Prompts: "4 friends, age 19, go-karting and food under ₹2500" → Full plan with venue names, addresses, timings, itemized costs',
    '"2 people, age 40, romantic dinner and evening ₹3000" → Curated fine-dining + evening activity with travel time',
    '"6 guys, age 25, gaming zone and biryani ₹3600" → Gaming venue + biryani spot + buffer for transport',
    '"Family of 4, age 35, cultural day and lunch ₹2000" → Museums, heritage sites, family restaurant with kid-friendly options',
    'Defaults to ₹2000 budget and 7 PM start time if not specified. Graceful degradation: Google Places live data preferred, mock engine (200+ venues) kicks in on quota limit'
  ],
  tags: ['AI', 'React', 'TypeScript', 'Groq AI', 'llama-3.1-8b-instant', 'Google Places API', 'Vite'],
  links: [{ label: 'Live App', href: 'https://wayfound-five.vercel.app/' }],
  media: { type: 'image', src: '/projects/wayfound.jpg' }
}, {
  title: 'SurgeScope',
  tagline: 'Surge pricing analytics using arc elasticity on 50,000 Mumbai/Bangalore/Delhi trip records. Found the 2.0x wall where completion falls off a cliff.',
  description: 'We had 50,000 Uber/Ola-style trip records from Mumbai, Bangalore, and Delhi over a year and wanted to know: does surge pricing actually work, or does it just chase riders away past a certain point? We used arc elasticity, comparing completion rate (did the ride happen or get cancelled) at each surge step, from 1.0x up to 2.5x. That gave us a demand curve instead of a guess.',
  highlights: [
    'The curve split into three zones: Up to 1.5x riders grumble but mostly stay. Between 1.5x and 2.0x completion falls off a cliff (the 2.0x wall). Above 2.0x completion flattens because only desperate or captive riders are left',
    'Commercial areas (offices, malls) are most price-sensitive since people have metro/buses. Transit hubs (airports, stations) are almost inelastic since people are stuck with luggage. Residential sits in between',
    'Weekday peak hour is the riskiest window to surge hard because commuters form habits and might switch to metro permanently. Rain barely moved cancellation rates at the same surge level - it\'s the price, not the weather',
    'Built recommendation: cap surge by zone and time instead of one blanket multiplier, and protect loyal (Gold-tier) users with a lower cap since they\'re the only segment where unit economics work'
  ],
  tags: ['Analytics', 'Python', 'Pandas', 'Plotly', 'Excel', 'Arc Elasticity', 'Demand Curves'],
  links: [{ label: 'View Analysis', href: 'https://drive.google.com/drive/folders/1YzhIeFH4Wl6WVl11KiILsn7486ERqi3D' }]
}];

// PRODUCT STUDIES - Case studies and comparative battles
const UX_WORK = [{
  title: 'Edit Journey - Product Proposal, Hyderabad Metro',
  type: 'case',
  description: 'Found a usability gap in Hyderabad Metro\'s QR ticketing: selecting the wrong destination forces riders into a multi-day cancel-and-refund cycle, with no way to just fix the fare. Designed and prototyped "Edit Journey" in Figma - an instant, cancellation-free fare-adjustment flow - then pitched it directly to Hyderabad Metro with a written product brief and outreach email. No one asked for this one; I noticed the gap and went to the source.',
  highlights: [
    'Reframed a refund problem as a fare-correction problem - the fix isn\'t faster refunds, it\'s not needing one',
    'Shipped the pitch end to end: gap identification, Figma prototype, written brief, and direct outreach to the transit authority'
  ],
  tags: ['UX', 'Figma', 'Product Strategy', 'Stakeholder Comms'],
  links: [{ label: 'View Figma Prototype', href: 'https://figma.com/design/53qChfGkHWb8FIoneDhr4o/Edit-Journey---Hyderabad-Metro-Prototype?node-id=0-1' }]
}, {
  title: 'Food Delivery Battle - Swiggy vs Zomato vs EatSure vs Domino\'s vs KFC',
  type: 'battle',
  apps: 'Swiggy · Zomato · EatSure · Domino\'s · KFC',
  intro: 'Found the framing effect, emotional onboarding, progressive disclosure, the say-do gap - and a deliberate anchoring exploit in Zomato\'s Food Rescue screen that inflated perceived savings by ₹70.',
  rows: [
    ['Swiggy UI feels congested - too much competing for attention', 'Information hierarchy failure'],
    ['Zomato opens with a quote, not a menu', 'Emotional onboarding'],
    ['"₹120 off above ₹199" outperforms "60% off up to ₹120" - same money, better conversion', 'Framing effect - Kahneman'],
    ['I\'d still pick Zomato over EatSure despite knowing better', 'Say-do gap'],
    ['₹36 gap between Domino\'s direct app and Zomato - never communicated', 'Missed competitive advantage'],
    ['KFC app feels exactly like the store', 'Brand cohesion - done right'],
    ['Domino\'s app has zero personality', 'Brand inconsistency - product suicide']
  ],
  closing: 'Both Domino\'s and KFC built their own apps to escape Zomato\'s 25–30% commission. KFC won because their app feels like KFC. Domino\'s forgot to make theirs feel like anything.',
  tags: ['UX Battle', 'Competitive Analysis', 'Behavioral Economics'],
  links: [{ label: 'View Study', href: 'https://drive.google.com/drive/folders/1da3VLKzLaIEUpDAqjzQhPDWsBowdPhYN' }]
}];

// RESEARCH PAPERS - NO DUPLICATES!
const RESEARCH = [{
  title: 'The Capitulation Problem: A Conditional Optimization Framework',
  meta: '2026 · Independent research · IIT Roorkee · 484 trials · Sole author',
  description: 'Behavioral experiment using Gemma 4B (Ollama) as a controlled proxy - 5 domains × 5 pressure variants. LLM-as-Judge methodology with automated capitulation classification. Validated against blind human coding on a stratified sample. Proposed 3-question diagnostic framework.',
  finding: '42.8% combined capitulation - within the 39-52% human-predicted range. P4 anomaly: direct challenge produced 64.6% hard reversals vs expert authority 0% - the Compliance Paradox.',
  tags: ['AI Research', 'LLM-as-Judge', 'Behavioral AI'],
  links: [{ label: 'Read on Zenodo', href: 'https://doi.org/10.5281/zenodo.20179220' }]
}, {
  title: 'Specialist, Generalist, and Hybrid LLM Architectures for Algorithmic Code Generation',
  meta: '2026 · Independent research · IIT Roorkee · 75 problems · Sole author',
  description: 'Triaxial evaluation framework (Pass@1, CxSelf, CxJudge) across four architecture conditions. Automated pipeline with model-specific routing for specialist, generalist, decomposer, and judge roles.',
  finding: 'Generalist leads execution (Pass@1: 0.911 vs 0.862); Specialist leads complexity awareness. Naive Hybrid regresses 0.133; guarded variant recovers 87%. A trade-off invisible to single-axis evaluation.',
  tags: ['AI Research', 'LLM Evaluation', 'Code Generation'],
  links: [{ label: 'Read on Zenodo', href: 'https://doi.org/10.5281/zenodo.22904509' }]
}, {
  title: 'Dual-Transformer Cross-Attention Multimodal Emotion Recognition',
  meta: '2026 · IIT Roorkee · Electrical Engineering Department · Co-author',
  description: 'HuBERT + ViViT dual encoders with bidirectional cross-modal attention on RAVDESS corpus. Walrus Optimizer for post-training feature selection on 1,536-dimensional joint embedding. Evaluated across 4-SNR robustness levels (15, 10, 5, 0 dB) with MUSAN noise corpus. Led architectural decisions and authored the complete paper.',
  tags: ['Multimodal AI', 'Transformers', 'Emotion Recognition'],
  links: [{ label: 'Read Paper (PDF)', href: '/IOP paper.pdf' }]
}, {
  title: 'Phonological Fidelity and Convergent Preservation in Indo-European Languages',
  meta: '2026 · Published open access · Zenodo · Sole author',
  description: 'Developed the Phonological Fidelity Index (PFI) - a quantitative measure of consonant retention from Proto-Indo-European roots across French, Hindi/Sanskrit, and English under Grimm\'s Law. Built and analysed a curated Swadesh-based dataset; proposed Convergent Preservation and Phonetic Triangulation as cross-branch comparison methods.',
  tags: ['Linguistics', 'Indo-European Studies', 'Statistical Analysis'],
  links: [{ label: 'Read on Zenodo', href: LINKS.zenodo }]
}];

// WORK EXPERIENCE
const EXPERIENCE = [{
  role: 'Solo Founder & Full-Stack Engineer',
  company: 'Edcore',
  period: '2025 - Present',
  description: 'Building a unified education operating system for Indian students - four modules (ExamNotifi, CollegeTracker, Tutorix, NextTalk) on one Next.js monolith with shared auth, CRM, OTP flows and a notification engine. The moat is a hand-curated dataset of 2,000+ colleges across 25 fields. Separately mentored 10 JEE Advanced aspirants one-on-one (2024–2025) - one moved from the 70th to the 95th percentile.',
  tags: ['Next.js 16', 'MongoDB', 'NextAuth', 'Product Ownership', 'Mentoring']
}, {
  role: 'Independent Researcher',
  company: 'IIT Roorkee',
  period: '2025 - Present',
  description: 'Five papers across AI evaluation, behavioral AI, electrical engineering and linguistics - two sole-authored, two co-authored, one published open-access on Zenodo. Current focus: whether a model can be trusted about its own output.',
  tags: ['LLM-as-Judge', 'Experimental Design', 'Academic Writing']
}, {
  role: 'ML Trainee',
  company: 'R.K. IntelliServe',
  period: 'Dec 2025 - Feb 2026',
  description: 'Engineered and automated DAG-orchestrated ML preprocessing and evaluation pipelines for production data-processing workflows. Worked directly with the founder on building scalable ML infrastructure. Designed multi-stage data transformation pipelines with Airflow DAG orchestration, implemented automated model evaluation frameworks, and optimized data preprocessing workflows that reduced processing time by 40%. Gained hands-on experience in production ML systems, pipeline monitoring, and deployment best practices.',
  tags: ['Python', 'ML Pipelines', 'DAG Orchestration', 'Airflow', 'Data Engineering', 'Model Evaluation']
}, {
  role: 'Web Developer Intern',
  company: 'Hiring Bazaar',
  period: 'Oct 2025 - Jan 2026',
  description: 'Built the careers page, dynamic role listings and the candidate application workflow across frontend and backend; owned UI feedback and testing through rollout. Worked directly with both founders at IIT Roorkee on product development. Designed and implemented the complete hiring funnel - from role discovery to application submission. Created responsive UI components, integrated REST APIs for job data, built form validation logic, and set up the candidate tracking system. Collaborated closely on feature prioritization and iterated based on real user feedback during beta testing.',
  tags: ['React', 'Full-Stack', 'API Design', 'UI/UX', 'TypeScript', 'Node.js']
}];

const SKILLS = [
  'Full-Stack Development', 'System Architecture', 'API Design & Integration',
  'Database Design & Optimization', 'AI & LLM Systems', 'MCP Server Development',
  'Compiler Design', 'Algorithm Optimization', 'DevOps & Cloud Deployment',
  'Product Management', 'Business Analysis', 'UX Research & Testing',
  'Technical Writing', 'Agile & Scrum', 'Research & Experimentation'
];

const SKILL_GROUPS = [{
  label: 'Frontend & UI',
  items: ['Next.js 16', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'React Flow', 'Vite', 'Responsive Design']
}, {
  label: 'Backend & Database',
  items: ['Node.js', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Prisma ORM', 'SQLite', 'Redis', 'REST APIs', 'GraphQL', 'Webhooks', 'Database Indexing', 'Query Optimization']
}, {
  label: 'Authentication & Security',
  items: ['NextAuth.js', 'JWT', 'OAuth 2.0', 'Session Management', 'RBAC', 'API Rate Limiting', 'CORS', 'Input Validation', 'Encryption']
}, {
  label: 'AI & LLMs',
  items: ['Prompt Engineering', 'LLM Evaluation', 'LLM-as-Judge', 'MCP Development', 'Groq AI', 'OpenAI API', 'Gemini API', 'Intent Classification', 'RAG Systems', 'Fine-tuning']
}, {
  label: 'Machine Learning',
  items: ['Python', 'scikit-learn', 'XGBoost', 'Hidden Markov Models', 'SHAP', 'Pandas', 'NumPy', 'Plotly', 'Streamlit', 'Model Evaluation', 'Feature Engineering']
}, {
  label: 'Compilers & Systems',
  items: ['C++', 'LLVM', 'Numba JIT', 'DSL Design', 'Parser Development', 'AST Manipulation', 'Algorithm Selection', 'Code Optimization', 'Property-based Testing']
}, {
  label: 'Cloud & DevOps',
  items: ['Vercel', 'Railway', 'Docker', 'CI/CD Pipelines', 'Git', 'GitHub Actions', 'Environment Management', 'Monitoring & Logging', 'Performance Optimization']
}, {
  label: 'Third-Party Integrations',
  items: ['Google Maps API', 'Airtable API', 'MSG91 SMS/OTP', 'Resend Email', 'GitHub API', 'OpenAPI/Swagger', 'Payment Gateways', 'Social Auth', 'Analytics SDKs']
}, {
  label: 'Product & Management',
  items: ['Agile/Scrum', 'Product Strategy', 'Market Research', 'User Interviews', 'Wireframing', 'Figma', 'A/B Testing', 'Behavioral Economics', 'Competitive Analysis', 'Stakeholder Communication']
}, {
  label: 'Technical Writing & Research',
  items: ['LaTeX', 'Academic Writing', 'API Documentation', 'Technical Reports', 'Experimental Design', 'Statistical Analysis', 'Data Visualization', 'Peer Review']
}];

const EDUCATION = [{
  image: IMAGES.campus,
  title: 'B.Tech, Electrical Engineering',
  school: 'Indian Institute of Technology Roorkee',
  description: 'All India Rank 23,496 in JEE Advanced 2023 and Telangana EAPCET Rank 2,614. The degree is in electrical engineering; most of the building happens outside the syllabus - ten production systems, five papers, and two products shipped solo alongside coursework.',
  period: '2023 - 2027'
}, {
  image: '/DSE Image.jpg',
  title: 'Class XII & Class X',
  school: 'Telangana State Board · CBSE',
  description: 'Class XII - 94.20% (Telangana State Board). Class X - 95.60% (CBSE). Also served as an NCC Cadet with the National Cadet Corps at IIT Roorkee between October 2023 and April 2024.',
  period: '2021 - 2023'
}];

const CHANNELS = [
  { region: 'GITHUB - CODE & PROJECTS', href: LINKS.github },
  { region: 'LINKEDIN - PROFESSIONAL', href: LINKS.linkedin },
  { region: 'ZENODO - PUBLISHED PAPER', href: LINKS.zenodo }
];

// RESUME LINKS - 3 different versions
const RESUMES = [
  { type: 'Software Development', description: 'Full-Stack Engineering & Product', href: LINKS.resume_fullstack },
  { type: 'AI Research', description: 'Papers & LLM Systems', href: LINKS.resume_research },
  { type: 'Product Management', description: 'Implementation Engineering & Strategy', href: LINKS.resume_ba_ux }
];

/* ------------------------------------------------------------------ */
/* COMPONENTS                                                          */
/* ------------------------------------------------------------------ */

const Tag = ({ children }) => (
  <HoverCard openDelay={200}>
    <HoverCardTrigger asChild>
      <Badge variant="outline" className="px-3 py-1 text-xs text-faint border-line rounded-full hover:bg-white/5 hover:text-foreground cursor-default transition-colors">
        {children}
      </Badge>
    </HoverCardTrigger>
    <HoverCardContent className="w-auto max-w-xs text-xs text-faint bg-background border-line">
      Technology: {children}
    </HoverCardContent>
  </HoverCard>
);

const TagList = ({ items }) => <div className="flex flex-wrap gap-2">{items.map(t => <Tag key={t}>{t}</Tag>)}</div>;

const isExternal = href => /^https?:\/\//.test(href || '');
const TextLink = ({ href, children }) => {
  const external = isExternal(href);
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="label-caps text-xs text-faint hover:text-foreground transition-colors underline underline-offset-4">{children}{external ? ' ↗' : ''}</a>;
};

const LinkRow = ({ links = [] }) => {
  if (!links.length) return null;
  return <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">{links.map(l => <TextLink key={l.label} href={l.href}>{l.label}</TextLink>)}</div>;
};

const StatGrid = ({ items }) => (
  <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-y border-line py-10">
    {items.map(s => (
      <div key={s.label} className="flex flex-col-reverse gap-2">
        <dt className="label-caps text-xs text-faint">{s.label}</dt>
        <dd className="font-display font-medium tracking-tight text-foreground text-4xl lg:text-6xl">{s.value}</dd>
      </div>
    ))}
  </dl>
);

const Section = ({ id, label, title, intro, icon, panel = false, children }) => (
  <section id={id} className={`section-padding${panel ? ' bg-panel' : ''}`}>
    <div className="max-w-7xl mx-auto">
      <SectionLabel>{label}</SectionLabel>
      <Reveal y={40}>
        <div className="flex items-center gap-6 mb-8 lg:mb-10">
          <h2 className={`font-display font-medium uppercase text-[10vw] lg:text-section leading-none tracking-tight`}>{title}</h2>
        </div>
      </Reveal>
      {intro && <Reveal y={20} className="max-w-2xl mb-16 lg:mb-24"><p className="text-base lg:text-lg text-soft leading-relaxed">{intro}</p></Reveal>}
      {children}
    </div>
  </section>
);

const FramedImage = ({ src, alt }) => (
  <div className="overflow-hidden">
    <img src={src} alt={alt} loading="lazy" className="w-full h-auto grayscale hover:grayscale-0 hover:scale-[1.02] transition-all duration-700" />
  </div>
);

// FLAGSHIP CARD - SINGLE COLUMN with EXPANDABLE INSIGHT
const FlagshipCard = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Reveal y={40} delay={index * 0.1}>
      <motion.article 
        className="border-t border-line py-8 md:py-12 group relative"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="border-foreground/20 text-faint">
                  Flagship
                </Badge>
              </div>
              <h3 className="font-display font-medium uppercase text-2xl md:text-3xl lg:text-4xl leading-none tracking-tight text-foreground mb-4 group-hover:text-white transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-sm lg:text-base text-soft leading-relaxed mb-4">
                {item.tagline}
              </p>
              
              {/* Media preview for flagship projects */}
              {item.media && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="overflow-hidden rounded-sm border border-line/50 mb-4"
                >
                  {item.media.type === 'video' ? (
                    <video
                      src={item.media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto"
                    />
                  ) : item.media.type === 'image' ? (
                    <img
                      src={item.media.src}
                      alt={item.name}
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  ) : item.media.type === 'gif' ? (
                    <img
                      src={item.media.src}
                      alt={item.name}
                      className="w-full h-auto"
                    />
                  ) : null}
                </motion.div>
              )}
              
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {item.links.map(link => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={isExternal(link.href) ? '_blank' : undefined}
                      rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
                      className="relative group/link px-4 py-2 border border-line text-xs text-faint hover:text-white transition-all duration-300 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 group-hover/link:text-white transition-colors">
                        {link.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm lg:text-base text-soft leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Metrics grid */}
            <dl className="grid grid-cols-2 gap-3 mb-6">
              {item.metrics.map((m, idx) => (
                <motion.div 
                  key={m.label}
                  className="relative p-3 border border-line group-hover:border-foreground/30 transition-colors duration-300 bg-background/50"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                >
                  <dd className="font-display text-2xl lg:text-3xl font-medium text-foreground mb-1">{m.value}</dd>
                  <dt className="text-xs text-faint uppercase tracking-wider">{m.label}</dt>
                </motion.div>
              ))}
            </dl>

            {/* Tags */}
            <div className="mb-4">
              <TagList items={item.tags.slice(0, 7)} />
            </div>

            {/* Expandable Engineering Insight */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-line mt-4">
                <p className="text-xs uppercase tracking-wider text-faint mb-2">Engineering Insight</p>
                <p className="text-sm text-soft leading-relaxed italic">
                  {item.insight}
                </p>
              </div>
            </motion.div>

            {/* Expand/Collapse button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-xs uppercase tracking-wider text-faint hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              {isExpanded ? '− Hide' : '+ View'} Engineering Insight
            </button>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
};

// UX CARD - Expandable for both case studies and battles
const UXCard = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isBattle = item.type === 'battle';
  
  return (
    <Reveal y={40} delay={index * 0.1}>
      <motion.article 
        className="border-t border-line group relative overflow-hidden cursor-pointer"
        whileHover={{ 
          scale: isBattle ? 1.005 : 1.002,
          transition: { duration: 0.3 }
        }}
      >
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: isBattle 
              ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03) 0%, transparent 50%)'
              : 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)'
          }}
        />
        
        {/* Clickable header */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10 py-8 md:py-12"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ x: isBattle ? 8 : 4 }}
              transition={{ duration: 0.3 }}
            >
              {isBattle && (
                <Badge variant="outline" className="mb-3 border-amber-500/30 text-amber-400/80 hover:border-amber-400 transition-colors">
                  ⚔️ UX Battle
                </Badge>
              )}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-3 group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                {item.title}
                <motion.span 
                  className="text-sm text-faint"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ↓
                </motion.span>
              </h3>
              {item.apps && (
                <p className="label-caps text-xs text-faint mb-4 group-hover:text-soft transition-colors">
                  {item.apps}
                </p>
              )}
            </motion.div>
          </div>
          
          <div className="lg:col-span-7">
            {item.intro && (
              <p className={`text-base lg:text-lg text-soft group-hover:text-foreground transition-colors duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                {item.intro}
              </p>
            )}
            {!isBattle && item.description && (
              <p className={`text-faint leading-relaxed text-sm lg:text-base group-hover:text-soft transition-colors duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                {item.description}
              </p>
            )}
            {!isExpanded && (
              <p className="text-xs text-dim mt-2 group-hover:text-faint transition-colors">
                Click to expand →
              </p>
            )}
          </div>
        </motion.div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden relative z-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-t border-line/30 pt-6">
                <div className="lg:col-span-5" />
                <div className="lg:col-span-7">
                  {item.highlights && (
                    <ul className="space-y-3 mb-6">
                      {item.highlights.map((h, i) => (
                        <motion.li 
                          key={h}
                          className="text-sm lg:text-base text-soft leading-relaxed pl-4 border-l border-line hover:border-foreground/30 transition-colors duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          whileHover={{ x: 4, borderLeftColor: 'rgba(255,255,255,0.5)' }}
                        >
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Battle rows with unique hover effects */}
                  {isBattle && item.rows && item.rows.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {item.rows.map((row, i) => (
                        <motion.div 
                          key={i}
                          className="border-b border-line/50 pb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <div className="space-y-2">
                            <motion.p 
                              className="text-sm lg:text-base text-soft hover:text-foreground transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              {row[0]}
                            </motion.p>
                            <motion.p 
                              className="text-sm text-faint italic hover:text-amber-400/70 transition-colors pl-4"
                              whileHover={{ x: 4 }}
                            >
                              → {row[1]}
                            </motion.p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {item.closing && (
                    <motion.div 
                      className="pl-4 border-l border-line hover:border-amber-500/50 mb-6 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      whileHover={{ paddingLeft: '20px', transition: { duration: 0.3 } }}
                    >
                      <span className="label-caps text-xs text-faint block mb-2 hover:text-amber-400/70 transition-colors">
                        Conclusion
                      </span>
                      <p className="text-sm lg:text-base text-soft leading-relaxed hover:text-foreground transition-colors duration-300">
                        {item.closing}
                      </p>
                    </motion.div>
                  )}
                  
                  {item.tags && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                    >
                      <TagList items={item.tags} />
                    </motion.div>
                  )}
                  {item.links && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <LinkRow links={item.links} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </Reveal>
  );
};

// EXPANDABLE PROJECT ROW - For AI, DevTools with click-to-expand
const ProjectRow = ({ item, sectionType = 'default', index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Different animation styles per section
  const getHoverAnimation = () => {
    switch(sectionType) {
      case 'ai':
        return { 
          scale: 1.01,
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)',
          borderColor: 'rgba(139, 92, 246, 0.3)'
        };
      case 'devtools':
        return { 
          scale: 1.005,
          x: 5,
          boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)',
          borderColor: 'rgba(34, 197, 94, 0.3)'
        };
      case 'research':
        return { 
          backgroundColor: 'rgba(255,255,255,0.01)',
          borderColor: 'rgba(59, 130, 246, 0.3)'
        };
      default:
        return { scale: 1.002 };
    }
  };

  const getTitleColorClass = () => {
    switch(sectionType) {
      case 'ai': return 'group-hover:text-purple-300';
      case 'devtools': return 'group-hover:text-green-300';
      case 'research': return 'group-hover:text-blue-300';
      default: return 'group-hover:text-white';
    }
  };

  const getAccentColor = () => {
    switch(sectionType) {
      case 'ai': return 'rgba(139, 92, 246, 0.5)';
      case 'devtools': return 'rgba(34, 197, 94, 0.5)';
      default: return 'rgba(6, 182, 212, 0.5)';
    }
  };

  return (
    <Reveal y={40} delay={index * 0.08}>
      <motion.article 
        className="border-t border-line group relative cursor-pointer"
        whileHover={getHoverAnimation()}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Clickable header area */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-8 md:py-12"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ x: sectionType === 'devtools' ? 8 : 4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className={`text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-3 ${getTitleColorClass()} transition-colors duration-300 flex items-center gap-3`}>
                {item.title}
                <motion.span 
                  className="text-sm text-faint"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ↓
                </motion.span>
              </h3>
              {item.meta && <p className="text-sm text-dim italic group-hover:text-faint transition-colors">{item.meta}</p>}
              {item.tagline && <p className="text-base lg:text-lg text-soft mt-3 group-hover:text-foreground transition-colors">{item.tagline}</p>}
            </motion.div>
          </div>
          <div className="lg:col-span-7">
            <p className={`text-faint leading-relaxed text-sm lg:text-base group-hover:text-soft transition-colors duration-300 ${!isExpanded ? 'line-clamp-2' : ''}`}>
              {item.description}
            </p>
            {!isExpanded && (
              <p className="text-xs text-dim mt-2 group-hover:text-faint transition-colors">
                Click to expand →
              </p>
            )}
          </div>
        </motion.div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-t border-line/30 pt-6">
                {/* Left column - Show media when expanded */}
                <div className="lg:col-span-5">
                  {item.media && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="overflow-hidden rounded-sm border border-line/50"
                    >
                      {item.media.type === 'video' ? (
                        <video
                          src={item.media.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto"
                        />
                      ) : item.media.type === 'image' ? (
                        <img
                          src={item.media.src}
                          alt={item.title}
                          className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      ) : item.media.type === 'gif' ? (
                        <img
                          src={item.media.src}
                          alt={item.title}
                          className="w-full h-auto"
                        />
                      ) : null}
                    </motion.div>
                  )}
                </div>
                <div className="lg:col-span-7">
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {item.highlights.map((h, i) => (
                        <motion.li 
                          key={h}
                          className="text-sm lg:text-base text-soft leading-relaxed pl-4 border-l border-line hover:border-foreground/40 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          whileHover={{ 
                            x: 6, 
                            borderLeftWidth: '3px',
                            borderLeftColor: getAccentColor(),
                            transition: { duration: 0.2 }
                          }}
                        >
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                  {item.finding && (
                    <motion.div 
                      className="pl-4 border-l border-line mb-6 hover:border-blue-500/50 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      whileHover={{ paddingLeft: '24px', transition: { duration: 0.3 } }}
                    >
                      <span className="label-caps text-xs text-faint block mb-2 hover:text-blue-400/80 transition-colors">
                        Key finding
                      </span>
                      <p className="text-sm lg:text-base text-soft leading-relaxed">
                        {item.finding}
                      </p>
                    </motion.div>
                  )}
                  {item.insight && (
                    <motion.div 
                      className="pl-4 border-l border-line mb-6 hover:border-purple-500/50 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      whileHover={{ paddingLeft: '24px', transition: { duration: 0.3 } }}
                    >
                      <span className="label-caps text-xs text-faint block mb-2 hover:text-purple-400/80 transition-colors">
                        Engineering insight
                      </span>
                      <p className="text-sm lg:text-base text-soft leading-relaxed">
                        {item.insight}
                      </p>
                    </motion.div>
                  )}
                  {item.tags && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="mb-4"
                    >
                      <TagList items={item.tags} />
                    </motion.div>
                  )}
                  {item.links && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                    >
                      <LinkRow links={item.links} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </Reveal>
  );
};

/* ------------------------------------------------------------------ */
/* MAIN PAGE                                                           */
/* ------------------------------------------------------------------ */

const HomePage = () => {
  return (
    <div className="portfolio-shell min-h-screen text-foreground">
      <Helmet>
        <title>Tharun Rathod - Engineer, Founder, Researcher</title>
      </Helmet>
      <Seo title="Tharun Rathod - Engineer, Founder, Researcher" description="Solo founder and independent researcher building production-grade software systems, AI products and developer tools." image={IMAGES.hero} siteName="Tharun Rathod" />

      <div className="grain-overlay" aria-hidden="true" />
      <SideNav />

      <main>
        {/* HERO - CLEAN */}
        <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
          <img 
            src={IMAGES.hero} 
            alt="Tharun Rathod" 
            className="absolute inset-0 w-full h-full object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="w-full max-w-5xl">
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-display font-medium uppercase leading-none tracking-tighter text-[15vw] sm:text-[12vw] md:text-hero">
                  <span className="block text-white">Tharun</span>
                  <span className="block text-white">Rathod</span>
                </h1>
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <p className="mt-6 md:mt-8 label-caps text-xs sm:text-sm text-white/70">Engineer. Founder. Researcher.</p>
                  <p className="mt-3 text-sm sm:text-base text-white/80 max-w-sm md:max-w-md leading-relaxed">
                    Ten-plus production systems built solo and five research papers, alongside a B.Tech in Electrical Engineering at IIT Roorkee.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                    <a 
                      href="#projects" 
                      className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4"
                    >
                      View flagship work
                    </a>
                    <a 
                      href="#research" 
                      className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4"
                    >
                      Research
                    </a>
                    {LINKS.resume && (
                      <a 
                        href={LINKS.resume} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4"
                      >
                        Resume ↗
                      </a>
                    )}
                    <a 
                      href={LINKS.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4"
                    >
                      GitHub ↗
                    </a>
                    <a 
                      href="#contact" 
                      className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4"
                    >
                      Contact
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>About Tharun</SectionLabel>
            <Reveal y={40} className="mb-16 lg:mb-24">
              <p className="text-xl lg:text-3xl font-light text-soft leading-snug max-w-4xl">
                Solo founder building products from 0→1. Ships production systems end-to-end - product vision, technical architecture, user acquisition, revenue. Edcore (300+ users, 4 live modules), Rune (optimizing compiler), SmartAsset (enterprise infrastructure), and 7+ shipped projects. Founder-engineer who writes code, talks to users, and owns P&L.
              </p>
              <p className="mt-6 label-caps text-xs text-faint">{DOMAINS.join(' · ')}</p>
            </Reveal>
            <Reveal y={40} className="mb-24 lg:mb-32">
              <StatGrid items={STATS} />
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
              <Reveal y={40}><FramedImage src={IMAGES.build} alt="Code on screen" /></Reveal>
              <Reveal className="flex items-center" y={40} delay={0.1}>
                <p className="text-base lg:text-lg text-soft leading-relaxed">
                  My B.Tech is in Electrical Engineering, but the real work is building companies. I'm a solo founder who ships production systems - from zero to live users - across education (Edcore, 300+ students), healthcare (PHC queue systems), developer tools (MCP servers, repo visualization), and enterprise infrastructure. Product strategy, full-stack execution, and go-to-market - all solo. The degree taught me circuits. The startups taught me everything else: customer discovery, unit economics, retention loops, and shipping fast under constraints.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FLAGSHIP PROJECTS - SINGLE COLUMN */}
        <Section id="projects" label="Flagship" title={<>Flagship<br />Projects</>} intro="Four production-grade systems built solo - from education OS to optimizing compilers." panel>
          {FLAGSHIP.map((item, idx) => <FlagshipCard key={item.name} item={item} index={idx} />)}
          <div className="border-t border-line" />
        </Section>

        {/* AI & ML */}
        <Section id="ai" label="AI & Machine Learning" title="AI & ML" intro="AI/ML projects under real constraints - genuine AI where it earns its place." icon={<FaBrain />}>
          {AI_BUILDS.map((item, idx) => <ProjectRow key={item.title} item={item} sectionType="ai" index={idx} />)}
          <div className="border-t border-line" />
        </Section>

        {/* DEV TOOLS */}
        <Section id="tools" label="Developer Tools" title={<>Dev<br />Tools</>} intro="Tools built for developers." icon={<FaCode />} panel>
          {DEV_TOOLS.map((item, idx) => <ProjectRow key={item.title} item={item} sectionType="devtools" index={idx} />)}
          <div className="border-t border-line" />
        </Section>

        {/* PRODUCT STUDIES - CASES AND BATTLES */}
        <Section id="ux" label="Product Studies" title={<>Product<br />Studies</>} intro="Real apps analyzed - case studies, competitive battles, and product proposals. Every UX and business decision broken down.">
          {UX_WORK.map((item, idx) => <UXCard key={item.title} item={item} index={idx} />)}
          <div className="border-t border-line" />
        </Section>

        {/* SKILLS */}
        <Section id="skills" label="Expertise" title="Skills" panel>
          {/* Icon-based Tech Stack */}
          <Reveal y={40} className="mb-16 lg:mb-20">
            <h3 className="text-xl md:text-2xl font-light text-foreground mb-8">Tech Stack</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 lg:gap-8">
              {[
                { name: 'Python', icon: '🐍', color: '#3776AB' },
                { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
                { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
                { name: 'React', icon: '⚛️', color: '#61DAFB' },
                { name: 'Next.js', icon: '▲', color: '#FFFFFF' },
                { name: 'Node.js', icon: '🟢', color: '#339933' },
                { name: 'MongoDB', icon: '🍃', color: '#47A248' },
                { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' },
                { name: 'C++', icon: 'C++', color: '#00599C' },
                { name: 'Python ML', icon: '🤖', color: '#FF6F00' },
                { name: 'Git', icon: '📦', color: '#F05032' },
                { name: 'Docker', icon: '🐳', color: '#2496ED' }
              ].map((tech, i) => (
                <Reveal key={tech.name} y={20} delay={i * 0.05}>
                  <motion.div
                    className="group relative flex flex-col items-center justify-center p-6 bg-background/50 border border-line rounded-lg hover:border-foreground/30 transition-all duration-300 cursor-pointer"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 8px 30px ${tech.color}20`,
                      borderColor: `${tech.color}50`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    <span className="text-xs text-faint group-hover:text-soft transition-colors">
                      {tech.name}
                    </span>
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{ backgroundColor: tech.color }}
                    />
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Original Skills List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 lg:gap-y-6 mb-20 lg:mb-28">
            {SKILLS.map((skill, i) => (
              <Reveal key={skill} y={24} delay={i * 0.04}>
                <div className="border-b border-line pb-4 group">
                  <span className="text-lg md:text-xl lg:text-2xl text-soft font-light group-hover:text-foreground transition-colors duration-300">{skill}</span>
                </div>
              </Reveal>
            ))}
          </div>
          
          <Reveal y={40}>
            <Tabs defaultValue={SKILL_GROUPS[0].label} className="w-full">
              <TabsList className="w-full justify-start border-b border-line rounded-none bg-transparent h-auto p-0 mb-8">
                {SKILL_GROUPS.map(group => (
                  <TabsTrigger 
                    key={group.label}
                    value={group.label}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-sm font-normal text-faint data-[state=active]:text-foreground"
                  >
                    {group.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {SKILL_GROUPS.map((group) => (
                <TabsContent key={group.label} value={group.label} className="mt-0">
                  <div className="py-6">
                    <TagList items={group.items} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Reveal>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" label="Career" title={<>Work<br />Experience</>}>
          {EXPERIENCE.map(job => (
            <Reveal key={job.company} y={40}>
              <article className="border-t border-line py-8 md:py-12 lg:py-16 group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="lg:col-span-5">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-2">{job.role}</h3>
                    <p className="text-base lg:text-lg text-faint">{job.company}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="label-caps text-sm text-faint">{job.period}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-faint leading-relaxed mb-6 text-sm lg:text-base">{job.description}</p>
                    <div className="flex flex-wrap gap-2">{job.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </Section>

        {/* RESEARCH - NO DUPLICATES */}
        <Section id="research" label="Papers & Publications" title="Research" intro="Five papers spanning AI evaluation, behavioral AI, electrical engineering, and linguistics. Two sole-authored, two co-authored, one published open-access." panel>
          <Reveal y={40}>
            <Accordion type="single" collapsible className="w-full">
              {RESEARCH.map((item, idx) => (
                <AccordionItem key={item.title} value={`research-${idx}`} className="border-line">
                  <AccordionTrigger className="hover:no-underline py-8 md:py-12 group/trigger">
                    <motion.div 
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 text-left w-full pr-4"
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    >
                      <div className="lg:col-span-5">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-3 group-hover/trigger:text-blue-300 transition-colors duration-300">
                          {item.title}
                        </h3>
                        {item.meta && <p className="text-sm text-dim italic group-hover/trigger:text-faint transition-colors">{item.meta}</p>}
                      </div>
                      <div className="lg:col-span-7">
                        <p className="text-faint leading-relaxed text-sm lg:text-base line-clamp-2 group-hover/trigger:text-soft transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <motion.div 
                      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="lg:col-span-5" />
                      <div className="lg:col-span-7">
                        <p className="text-faint leading-relaxed mb-6 text-sm lg:text-base">{item.description}</p>
                        {item.finding && (
                          <motion.div 
                            className="pl-4 border-l border-line mb-6 hover:border-blue-500/50 transition-colors duration-300"
                            whileHover={{ paddingLeft: '24px', transition: { duration: 0.3 } }}
                          >
                            <span className="label-caps text-xs text-faint block mb-2 hover:text-blue-400/80 transition-colors">
                              Key finding
                            </span>
                            <p className="text-sm lg:text-base text-soft leading-relaxed">
                              {item.finding}
                            </p>
                          </motion.div>
                        )}
                        {item.tags && <TagList items={item.tags} />}
                        <LinkRow links={item.links} />
                      </div>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Section>

        {/* EDUCATION */}
        <Section id="education" label="Background" title="Education">
          <div className="space-y-16 lg:space-y-24">
            {EDUCATION.map(entry => (
              <div key={entry.school} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
                <Reveal y={40}><FramedImage src={entry.image} alt={entry.school} /></Reveal>
                <Reveal y={40} delay={0.1} className="flex items-center">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-light text-foreground mb-1">{entry.title}</h3>
                    <p className="text-base text-faint italic mb-4">{entry.school}</p>
                    <p className="text-faint leading-relaxed mb-4 text-sm lg:text-base">{entry.description}</p>
                    <p className="label-caps text-sm text-faint">{entry.period}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <section id="contact" className="section-padding bg-panel">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>Get in Touch</SectionLabel>
            <Reveal y={60}>
              <h2 className="font-display font-medium text-[12vw] lg:text-hero leading-none tracking-tight mb-8">Let's talk</h2>
            </Reveal>
            <Reveal y={40}><div className="w-full h-px bg-line mb-12 lg:mb-16" /></Reveal>
            <Reveal y={40} className="mb-12 lg:mb-16 max-w-3xl">
              <p className="text-lg lg:text-xl text-soft leading-relaxed mb-6">
                Always open to opportunities - full-time roles, internships, freelance gigs, or just interesting conversations about tech, products, and building things that matter.
              </p>
              <p className="text-base lg:text-lg text-faint leading-relaxed">
                Whether you're hiring, have a technical challenge to discuss, want to collaborate on a project, or just want to connect - I'd love to hear from you. Drop me an email or find me on the platforms below.
              </p>
            </Reveal>

            {/* RESUME SECTION - WITH CONFETTI */}
            <Reveal y={40} className="mb-16 lg:mb-24">
              <h3 className="font-display font-medium uppercase text-2xl md:text-3xl lg:text-4xl text-foreground mb-8">Resumes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RESUMES.map((resume, i) => {
                  const handleResumeClick = (e) => {
                    // Confetti burst!
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { 
                        x: (e.clientX / window.innerWidth),
                        y: (e.clientY / window.innerHeight)
                      },
                      colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b']
                    });
                  };

                  const gradients = [
                    'from-cyan-500 via-blue-500 to-purple-500',
                    'from-purple-500 via-pink-500 to-rose-500',
                    'from-green-500 via-emerald-500 to-teal-500',
                  ];

                  return (
                    <motion.a
                      key={resume.type}
                      href={resume.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleResumeClick}
                      className="group relative border-2 border-line hover:border-transparent p-6 transition-all duration-300 overflow-hidden bg-background"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -12,
                        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                        transition: { duration: 0.3 }
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                    >
                      {/* Animated gradient border */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                      />

                      {/* Neon glow effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          boxShadow: `inset 0 0 40px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)`
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="outline" className="border-foreground/20 text-faint group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all">
                            <FaCode className="mr-1" />
                            Resume {i + 1}
                          </Badge>
                          <motion.span 
                            className="text-faint group-hover:text-foreground transition-colors"
                            whileHover={{ 
                              x: 4,
                              transition: { duration: 0.2 }
                            }}
                          >
                            ↗
                          </motion.span>
                        </div>
                        
                        <h4 className="font-display font-medium text-xl lg:text-2xl text-foreground mb-2 group-hover:text-white transition-colors neon-glow-hover">
                          {resume.type}
                        </h4>
                        
                        <p className="text-sm text-faint group-hover:text-soft transition-colors mb-6">
                          {resume.description}
                        </p>
                        
                        {/* Gradient button */}
                        <div className="relative">
                          <motion.div 
                            className={`absolute inset-0 bg-gradient-to-r ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}
                          />
                          <div className={`relative px-4 py-2 border border-foreground/20 group-hover:border-transparent bg-gradient-to-r group-hover:${gradients[i]} transition-all duration-300`}>
                            <span className="label-caps text-xs text-foreground group-hover:text-white transition-colors flex items-center justify-between">
                              <span className="flex items-center gap-2">
                                <span>Download PDF</span>
                                <motion.span
                                  animate={{ x: [0, 4, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                  →
                                </motion.span>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </Reveal>

            {/* SOCIAL LINKS */}
            <div className="space-y-0 max-w-2xl">
              {CHANNELS.map((channel, i) => (
                <Reveal key={channel.region} y={20} delay={i * 0.05}>
                  <a href={channel.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-t border-line py-5 md:py-6 group hover:bg-white/[0.03] transition-colors px-4 -mx-4">
                    <span className="label-caps text-sm text-faint group-hover:text-soft transition-colors">{channel.region}</span>
                    <span className="text-faint group-hover:text-foreground transition-colors">↗</span>
                  </a>
                </Reveal>
              ))}
              <div className="border-t border-line" />
            </div>

            {/* DIRECT CONTACT */}
            <Reveal y={40} className="mt-16 lg:mt-24 pt-12 lg:pt-16 border-t border-line">
              <p className="label-caps text-sm text-faint mb-6 lg:mb-8">Or reach me directly</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16">
                <a href="mailto:tharunrathod2005@gmail.com" className="text-lg lg:text-xl text-soft hover:text-foreground transition-colors underline underline-offset-4">tharunrathod2005@gmail.com</a>
                <a href={LINKS.edcore} target="_blank" rel="noopener noreferrer" className="text-lg lg:text-xl text-soft hover:text-foreground transition-colors underline underline-offset-4">edcore.tech</a>
              </div>
            </Reveal>

            {/* FOOTER */}
            <Reveal y={20} className="mt-24 lg:mt-32 pt-8 border-t border-line">
              {/* Footer Image */}
              <motion.div 
                className="mb-12 overflow-hidden rounded-sm max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.img
                  src="/footer-image.jpg"
                  alt=""
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02] opacity-80 hover:opacity-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.7 }}
                />
              </motion.div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-2 pt-8 border-t border-line">
                <p className="label-caps text-xs text-dim">© 2026 Tharun Rathod - Engineering, Products & Research</p>
                <p className="label-caps text-xs text-dim">Roorkee / Hyderabad / Remote</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
