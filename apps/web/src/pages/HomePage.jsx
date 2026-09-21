import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
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
  lecturehall: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1216&h=896&fit=crop&q=80'
};

const LINKS = {
  github: 'https://github.com/tharun99856',
  linkedin: 'https://linkedin.com/in/tharun-rathod',
  zenodo: 'https://zenodo.org/doi/10.5281/zenodo.19885744',
  edcore: 'https://edcore.tech',
  consulting: 'https://docs.google.com/forms/d/e/1FAIpQLSeLdPhya4o3q1zTTKDd_OwcMAtbndD8T-w4ORTxuKYu3L22zw/viewform?usp=publish-editor',
  // TODO: paste your resume URL (Drive link, or a PDF in /public). The Resume
  // link in the hero stays hidden while this is empty.
  resume: ''
};

const GH = repo => `https://github.com/tharun99856/${repo}`;

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

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
  label: 'Colleges, original dataset'
}];

const FLAGSHIP = [{
  name: 'Edcore',
  kicker: 'Education OS · Solo founder',
  status: 'Live · In development',
  tagline: 'A unified education operating system for Indian students — four integrated modules, one shared platform.',
  metrics: [{
    value: '4',
    label: 'Modules'
  }, {
    value: '2k+',
    label: 'Colleges'
  }, {
    value: '25',
    label: 'Fields per college'
  }, {
    value: 'Solo',
    label: 'Built'
  }],
  description: 'ExamNotifi, CollegeTracker, Tutorix, NextTalk — four modules sharing unified authentication, CRM, OTP flows, demo booking, and a notification engine. Not four websites. One cohesive platform with state-aware workflows and a shared MongoDB schema designed for Indian students navigating college choice and career guidance.',
  insight: 'The 2,000+ college dataset across 25 fields (hostel vibe, coding culture, campus life, placements, city tier) is the platform’s moat. Hand-curated at a depth no competitor offers in one place. The dataset is harder to replicate than the product itself.',
  tags: ['Education', 'SaaS', 'Next.js 16', 'TypeScript', 'MongoDB', 'NextAuth', 'MSG91', 'Resend', 'Vercel'],
  // TODO: add the ExamNotifi module URL here if it has its own page.
  links: [{
    label: 'edcore.tech',
    href: LINKS.edcore
  }],
  note: 'Core platform — private'
}, {
  name: 'SmartAsset',
  kicker: 'Enterprise infrastructure',
  status: 'Production',
  tagline: 'Enterprise asset management — 56+ assets, zero double-bookings, full audit trail. Replaces paper logbooks entirely.',
  metrics: [{
    value: '56+',
    label: 'Assets tracked'
  }, {
    value: '0',
    label: 'Double-bookings'
  }, {
    value: 'QR',
    label: 'Issue / return'
  }, {
    value: 'RBAC',
    label: 'Permissions'
  }],
  description: 'Replaces paper logbooks for warehouse-scale asset tracking. Date-window availability validation ensures no two reservations overlap. Atomic inventory updates and serializable approval logic prevent race conditions under concurrent booking. QR-based issue and return creates a frictionless audit trail. Analytics dashboard, role-based access control, and full warehouse workflow management.',
  insight: 'The double-booking prevention lives at the database layer, not the UI. Serializable transactions in PostgreSQL (via Prisma) prevent conflicts under concurrent write pressure — the kind of gap that paper logbooks and naive first-come-first-served systems cannot close. Operational consistency has to be enforced at the data layer or it is not enforced at all.',
  tags: ['Enterprise', 'Infrastructure', 'Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT Auth', 'QR Code'],
  links: [{
    label: 'GitHub',
    href: GH('SmartAsset')
  }]
}, {
  name: 'IITR Nexus',
  kicker: 'Campus AI · MCP architecture',
  status: 'Production',
  tagline: 'Unified campus intelligence — one query routes across academics, library, dining, events, and notices via parallel MCP retrieval.',
  metrics: [{
    value: '5+',
    label: 'Data sources'
  }, {
    value: 'MCP',
    label: 'Architecture'
  }, {
    value: 'Parallel',
    label: 'Retrieval'
  }, {
    value: 'Grounded',
    label: 'Responses'
  }],
  description: 'Campus information lives across 10+ disconnected systems. IITR Nexus routes a single query across academics, library, dining, events, and notices using multiple MCP servers in parallel. Intent classification determines which servers to query. Confidence scoring ensures grounded responses — if the system is uncertain, it surfaces the source, not a guess. Reasoning panel visible to users.',
  insight: 'Intent classification before routing reduces wrong-server queries significantly. The hallucination resistance mechanism is the key design choice — when confidence drops below threshold, the system returns a source reference instead of synthesizing an answer, preserving trust at the cost of convenience.',
  tags: ['Education', 'AI', 'MCP', 'Next.js', 'TypeScript', 'Groq Llama 3.3 70B', 'Intent Detection'],
  links: [{
    label: 'GitHub',
    href: GH('IITRNEXUS')
  }]
}, {
  name: 'Canopy',
  kicker: 'Developer tool',
  status: 'Live',
  tagline: 'Repo dependency visualization — parses Python and JS/TS imports via the GitHub API. No cloning. No local setup.',
  metrics: [{
    value: '2',
    label: 'Languages parsed'
  }, {
    value: '0',
    label: 'Clones required'
  }, {
    value: 'MD5',
    label: 'Cache layer'
  }, {
    value: 'Gemini',
    label: 'Summaries'
  }],
  description: 'Canopy parses Python and JS/TS import statements directly from GitHub — no cloning, no local execution, no CI setup. Builds an interactive React Flow dependency graph with Gemini-generated module summaries. MD5 caching prevents redundant parses. Dark forest UI for extended analysis sessions.',
  insight: 'Parsing imports without executing code requires careful alias resolution — TypeScript path aliases, Python relative imports, and dynamic requires all break naive string matching. The parser handles edge cases before graph construction, because a dependency graph with silent resolution failures is worse than none.',
  tags: ['Developer Tools', 'Next.js', 'React Flow', 'Gemini API', 'GitHub API', 'TypeScript'],
  links: [],
  note: 'Private repository'
}, {
  name: 'Signal',
  kicker: 'AI · Hiring OS',
  status: 'Production',
  tagline: 'AI-powered hiring communication OS — sits on top of any ATS, sends personalized candidate updates, eliminates ghosting.',
  metrics: [{
    value: '0',
    label: 'Candidate ghosting'
  }, {
    value: 'SLA',
    label: 'Tracking'
  }, {
    value: '3',
    label: 'ATS integrations'
  }, {
    value: 'AI',
    label: 'Personalisation'
  }],
  description: '75% of candidates are ghosted during hiring. Signal sits on top of existing ATS systems (Ashby, Greenhouse, Lever) and automatically generates personalized candidate updates at every stage transition. Recruiter dashboard tracks SLA breaches in real time. Candidate timeline view is public-facing. Zero change to recruiter workflow.',
  insight: 'Built on top of existing ATS via webhooks rather than replacing them. Adoption friction kills B2B tools — Signal asks for zero process change. Plugging into Greenhouse/Ashby/Lever via webhook means deployment is a one-time setup, not an ongoing commitment.',
  tags: ['Hiring', 'Enterprise', 'AI', 'Next.js', 'TypeScript', 'PostgreSQL', 'ATS Webhooks', 'AI Personalization'],
  links: [],
  note: 'Private repository'
}];

const TIMELINE = [{
  year: '2025',
  items: [{
    name: 'Chai Lovers',
    note: 'First real client delivery. HTML/CSS/JS cafe site.',
    tag: 'First client'
  }, {
    name: 'Physics Preprint',
    note: 'Geometric Decoherence Theorem published on Zenodo.',
    tag: 'Research'
  }, {
    name: 'Edcore',
    note: 'Solo founder begins building the education OS.',
    tag: 'Flagship'
  }]
}, {
  year: '2026',
  items: [{
    name: 'TravelChecker',
    note: 'Multi-modal travel comparison MCP server.',
    tag: 'Dev tool'
  }, {
    name: 'Rune',
    note: 'Intent-driven algorithm selection compiler, 3 backends.',
    tag: 'Dev tool'
  }, {
    name: 'Wayfound',
    note: 'AI trip planner, IIT Roorkee hackathon entry.',
    tag: 'Experiment'
  }, {
    name: 'Canopy',
    note: 'Repo dependency visualization, no clone required.',
    tag: 'Flagship'
  }, {
    name: 'IITR Nexus',
    note: 'Campus intelligence platform with MCP architecture.',
    tag: 'Flagship'
  }, {
    name: 'Signal',
    note: 'AI hiring OS, ATS webhook integration.',
    tag: 'Flagship'
  }, {
    name: 'PHC Queue',
    note: 'Rural clinic queue system, hackathon submission, live pilot demo.',
    tag: 'AI & ML'
  }, {
    name: 'Momentra',
    note: 'Photo/video tool for college clubs, competition submission.',
    tag: 'Full-stack'
  }, {
    name: 'SmartAsset',
    note: 'Enterprise asset management, serializable booking engine.',
    tag: 'Flagship'
  }, {
    name: 'NIFTY-50 Intelligence',
    note: '21 years of market data, HMM + XGBoost + SHAP.',
    tag: 'AI & ML'
  }, {
    name: 'SurgeScope',
    note: 'Dynamic pricing analytics and simulation platform.',
    tag: 'Analytics'
  }, {
    name: 'LLM Benchmark',
    note: 'Triaxial evaluation of Specialist vs Generalist architectures.',
    tag: 'Research'
  }, {
    name: 'Capitulation Study',
    note: '484-trial behavioral AI study, 42.8% capitulation rate.',
    tag: 'Research'
  }]
}];

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

const AI_BUILDS = [{
  title: 'PHC Queue Management System',
  status: 'Hackathon submission · Live demo',
  meta: '2026 · Solo build · Challenge 1.3, Track B — Intelligent Systems for Public Service Access',
  description: 'A token + wait-time system for Primary Health Centres, piloted against Latha Children’s Clinic in Attapur, Hyderabad. Front desk issues a printed token with an honest wait estimate off the rolling 10-consultation average; doctor clicks through patients to advance the queue; front desk gets a phone-number callback list for no-shows. No app install for patients, no internet required for the queue logic itself, and V1 ships with zero third-party API dependency on purpose — every piece justified by an actual cost or reliability constraint.',
  highlights: ['Simulated 67% reduction in physical wait time and 69% reduction in peak in-clinic occupancy, over 10 runs × 100 patients', '₹9,300 one-time hardware cost per PHC, ₹0/month running cost in V1 — FastAPI + SQLite chosen specifically because it runs on a Raspberry Pi and survives power loss'],
  stack: ['Python', 'FastAPI', 'SQLite', 'Raspberry Pi', 'Plain JS'],
  facts: [['Built', 'Solo'], ['Pilot', 'Latha Children’s Clinic, Attapur'], ['Domain', 'Healthcare · Infrastructure']],
  // TODO: add the live demo URL as { label: 'Live demo', href: '...' }
  links: [{
    label: 'GitHub',
    href: GH('Latha-Aunty-HC')
  }]
}, {
  title: 'Momentra — Photo & Video Tool for College Clubs',
  status: 'Competition submission',
  meta: '2026 · Solo build · React 18, Vite, TypeScript, Express, PostgreSQL, Prisma',
  description: 'Clubs create events; members upload photos and video, browse a masonry gallery, and find the shots they’re tagged in. Uploads compress client-side before sending; Sharp generates thumbnail variants and applies a per-viewer watermark only at download time, so nothing pre-rendered leaks. Search runs on Postgres full-text (tsvector, GIN-indexed) rather than Elasticsearch — one less moving piece at this scale. RS256 JWT with an httpOnly refresh cookie; the access token never touches localStorage.',
  highlights: ['Face-recognition matching was scoped and the schema is ready (face_descriptor, face_ids) — the ML worker wasn’t stable in time, so it was cut before submission rather than shipped half-working', 'Four-function storage abstraction (uploadFile / getFileBuffer / deleteFiles / getMediaUrl) writes to local disk today; pointing it at S3 is a one-file change'],
  stack: ['React 18', 'Vite', 'Express', 'PostgreSQL', 'Prisma', 'Sharp'],
  facts: [['Built', 'Solo'], ['Domain', 'Full-stack · SaaS']],
  links: [{
    label: 'GitHub',
    href: GH('Momentra')
  }]
}, {
  title: 'NIFTY-50 Investment Intelligence',
  status: 'Research',
  meta: '2026 · Solo build · Python, scikit-learn, XGBoost, hmmlearn, Plotly',
  description: 'Investment intelligence platform on 21 years of NIFTY-50 data. Hidden Markov Models detect bull/bear regime transitions. XGBoost price prediction with SHAP explainability. Portfolio optimization via Modern Portfolio Theory. Risk analytics with Value-at-Risk and drawdown analysis. Interactive Plotly dashboard.',
  highlights: ['HMM trained on return distributions detects regime shifts 3-5 days before they are visually apparent on price charts', 'SHAP values surface which features (RSI, MACD, volume delta) drove each prediction — explainability built in, not bolted on'],
  stack: ['Python', 'Streamlit', 'hmmlearn', 'XGBoost', 'SHAP', 'scikit-learn'],
  facts: [['Built', 'Solo'], ['Data', '21 years'], ['Domain', 'AI · Finance · ML']],
  links: [{
    label: 'Live demo',
    href: 'https://niftyinvest.streamlit.app/'
  }, {
    label: 'GitHub',
    href: GH('-NIFTY-50-Investment')
  }]
}, {
  title: 'LLM Benchmark Pipeline — Specialist vs Generalist Architectures',
  status: 'Research · Published paper',
  meta: '2026 · Independent research · Python, Groq API',
  description: 'Automated pipeline comparing four conditions (Generalist, Specialist, Hybrid-naive, Hybrid-guarded) across 75 algorithmic problems plus 4 adversarial probes. Triaxial framework: Pass@1 for execution accuracy, CxSelf for self-assessed complexity, CxJudge for independent complexity rating.',
  highlights: ['Generalist leads execution (Pass@1 0.911 vs 0.862); Specialist leads complexity awareness — a trade-off invisible to single-axis evaluation', 'Naive Hybrid regresses 0.133 from baseline; guarded variant recovers 87% — routing heuristics are load-bearing'],
  stack: ['Python', 'Groq API', 'LLM-as-Judge', 'Automated Eval'],
  facts: [['Problems', '75 + 4 adversarial'], ['Domain', 'AI · Research']],
  links: [{
    label: 'See research section',
    href: '#research'
  }],
  note: 'Private repository'
}, {
  title: 'The Capitulation Experiment',
  status: 'Research',
  meta: '2026 · Independent research · 484 trials · Gemma 4B via Ollama',
  description: 'Behavioral study investigating whether LLMs capitulate under social pressure — 5 domains × 5 pressure variants, 484 total trials. Gemma 4B as controlled proxy. LLM-as-Judge methodology validated against blind human coding on a stratified sample. Proposed 3-question diagnostic framework for measuring model robustness.',
  highlights: ['42.8% combined capitulation rate — within the 39-52% human-predicted range, validating the experimental design', 'P4 anomaly (Compliance Paradox): direct challenge triggered 64.6% hard reversals; expert authority pressure triggered 0% — opposite of what authority-compliance theory predicts'],
  stack: ['Python', 'Ollama', 'Gemma 4B', 'LLM-as-Judge', 'Statistical Analysis'],
  facts: [['Trials', '484'], ['Domain', 'AI · Behavioral research']],
  links: [{
    label: 'See research section',
    href: '#research'
  }],
  note: 'Private repository'
}];

const DEV_TOOLS = [{
  title: 'Rune — Intent-Driven Algorithm Selection Compiler',
  status: 'Open source',
  meta: '2026 · Solo build · Python · Compiler design, parsing, optimization',
  description: 'A DSL and optimizing compiler that reads a description of what you want done and picks the algorithm for you — BFS, Dijkstra, Kadane’s, heaps, sorting — then compiles it down to native C++. Not a library you call the right function from; a compiler that decides which function is right.',
  highlights: ['Validated by 115 automated tests across 100+ problems, checking output-identical results across every backend', 'Three interchangeable backends — Python interpreter, Numba LLVM-JIT, and native C++ with -O2 — with native C++ running ~5× faster at 5M+ elements'],
  stack: ['Python', 'Compiler Design', 'Parsing', 'Numba', 'C++'],
  facts: [['Built', 'Solo'], ['Tests', '115 · 100+ problems'], ['Domain', 'Developer tools']],
  links: [{
    label: 'GitHub',
    href: GH('rune')
  }]
}, {
  title: 'TravelChecker — Multi-Modal Travel Comparison Engine',
  status: 'MCP server',
  meta: '2026 · TypeScript · MCP server · Google Maps, Aviasales, IRCTC APIs',
  description: 'Compares flights, trains, buses, cabs, and self-drive across live API data. “Khammam to Delhi” returns the optimal composite route (cab to Vijayawada airport → flight to IGI) with total cost, travel time, and comfort trade-offs. Built as a Model Context Protocol server — runs natively inside Claude and Cursor as a callable tool.',
  highlights: ['Rate-limit handling across three free-tier API providers with exponential backoff and local result caching', 'Composite route detection assembles multi-leg journeys no single API returns — cab+flight is one query, one response'],
  stack: ['TypeScript', 'MCP', 'Google Maps API', 'Aviasales', 'IRCTC API'],
  facts: [['Built', 'Solo'], ['Domain', 'Developer tools · MCP']],
  links: [],
  note: 'Private repository'
}, {
  title: 'SurgeScope — Dynamic Pricing Analytics Platform',
  status: 'Live',
  meta: '2026 · Python, Pandas, Plotly, Excel · Analytics',
  description: 'Dynamic pricing analytics and simulation for ride-hailing surge strategy. Demand forecasting by zone and time-of-day. Pricing simulation models projecting revenue and driver supply under different multiplier policies. Interactive Plotly visualizations for demand heatmaps and sensitivity curves. Built as an analytics case competition submission.',
  highlights: ['Python analysis scripts built to human-engineer standards — documented, modular, reproducible', 'Excel unit economics workbook with scenario modelling for pricing policy comparison'],
  stack: ['Python', 'Pandas', 'Plotly', 'Excel', 'Forecasting'],
  facts: [['Built', 'Solo'], ['Domain', 'Analytics · Pricing']],
  links: [],
  note: 'Private repository'
}];

const UX_CASES = [{
  title: 'Edit Journey — Product Proposal, Hyderabad Metro',
  status: 'Self-initiated pitch',
  meta: '2026 · Independent · Figma, product strategy, stakeholder communication',
  description: 'Found a usability gap in Hyderabad Metro’s QR ticketing: selecting the wrong destination forces riders into a multi-day cancel-and-refund cycle, with no way to just fix the fare. Designed and prototyped “Edit Journey” in Figma — an instant, cancellation-free fare-adjustment flow — then pitched it directly to Hyderabad Metro with a written product brief and outreach email. No one asked for this one; I noticed the gap and went to the source.',
  highlights: ['Reframed a refund problem as a fare-correction problem — the fix isn’t faster refunds, it’s not needing one', 'Shipped the pitch end to end: gap identification, Figma prototype, written brief, and direct outreach to the transit authority'],
  stack: ['Figma', 'Product Strategy', 'Stakeholder Comms', 'Prototyping'],
  facts: [['Type', 'Self-initiated pitch'], ['Domain', 'UX · Product strategy']]
}, {
  title: 'MakeMyTrip — Dark Patterns in Cancellation Flows',
  status: 'UX audit',
  meta: 'May 2026 · Self-initiated · Heuristic evaluation, dark pattern analysis',
  description: 'Three compounding dark patterns in MakeMyTrip’s cancellation and refund flow — each individually defensible, collectively predatory. Unverifiable refund (₹1,600 displayed, ₹600 processed — ₹1,000 gap, no breakdown), a 4-step IVR optimised for drop-off rather than resolution, and an undisclosed AI agent deployed where a human was implied. Documented with CCPA escalation paths.',
  highlights: ['The refund discrepancy is only discoverable after completing cancellation — the point of no return is crossed before the true number appears', 'IVR friction is architectural, not accidental — each step is calibrated to increase abandonment'],
  stack: ['Heuristic Evaluation', 'Dark Patterns', 'Consumer Rights', 'UX Audit'],
  facts: [['Type', 'Self-initiated research'], ['Domain', 'UX · Product']]
}, {
  title: 'Ola Mini — 6-Layer Supply & Experience Failure',
  status: 'BA / Platform',
  meta: 'Jun 2026 · Self-initiated · Root cause analysis, platform economics',
  description: 'Mapped a 6-layer booking cascade across supply operations, data integrity, pricing policy, and trust & safety — with competitive impact vs Rapido and Uber. Thin supply → wrong vehicle dispatched → driver condition-cancels → ₹75 penalty → 50% surge on rebooking → user churns to Rapido. A systemic misalignment across four business domains, not a single bug.',
  highlights: ['Root cause: the penalty policy punishes the user for a supply failure they did not cause', 'Rapido wins this moment not because it is cheaper, but because it does not penalise the user for Ola’s supply problem'],
  stack: ['Root Cause Analysis', 'Platform Economics', 'Competitive Analysis', 'Supply Ops'],
  facts: [['Type', 'Self-initiated research'], ['Domain', 'BA · Platform · UX']]
}];

const UX_BATTLES = [{
  title: 'UX Battle 01 — Food Delivery',
  apps: 'Swiggy · Zomato · EatSure · Domino’s · KFC',
  intro: 'Found the framing effect, emotional onboarding, progressive disclosure, the say-do gap — and a deliberate anchoring exploit in Zomato’s Food Rescue screen that inflated perceived savings by ₹70.',
  rows: [['Swiggy UI feels congested — too much competing for attention', 'Information hierarchy failure'], ['Zomato opens with a quote, not a menu', 'Emotional onboarding'], ['“₹120 off above ₹199” outperforms “60% off up to ₹120” — same money, better conversion', 'Framing effect — Kahneman'], ['I’d still pick Zomato over EatSure despite knowing better', 'Say-do gap'], ['₹36 gap between Domino’s direct app and Zomato — never communicated', 'Missed competitive advantage'], ['KFC app feels exactly like the store', 'Brand cohesion — done right'], ['Domino’s app has zero personality', 'Brand inconsistency — product suicide']],
  closing: 'Both Domino’s and KFC built their own apps to escape Zomato’s 25–30% commission. KFC won because their app feels like KFC. Domino’s forgot to make theirs feel like anything.'
}, {
  title: 'UX Battle 02 — Payments',
  apps: 'Google Pay · PhonePe · Paytm',
  intro: 'Paytm showed me a name for an unsaved contact. I paid the wrong Rajkumar. Classic false confidence. The refund process was deliberately painful — not an accident.',
  rows: [['Google Pay is the cleanest but I always close it immediately', 'Stickiness gap'], ['PhonePe has stocks, gold, insurance — a reason to stay open', 'Retention by design'], ['Paytm showed a name for an unsaved contact — I paid the wrong person', 'Usability failure — false confidence'], ['Paytm refund took 7 screens and a waiting period', 'Deliberate friction — business over user']]
}, {
  title: 'UX Battle 03 — Dating Apps',
  apps: 'Bumble · Tinder · Hinge · Boo',
  soon: true
}];

const DARK_PATTERNS = [{
  name: 'Roach Motel',
  line: 'Easy in. Impossible out.',
  body: 'Signup takes 30 seconds. Cancelling takes 7 screens, a call, and a waiting period. The friction is intentionally asymmetric — exactly what I experienced with Paytm’s refund flow.',
  seen: 'Paytm refunds · Indian telecom portals · OTT cancellations'
}, {
  name: 'Unverifiable Refund',
  line: '₹1,600 displayed. ₹600 processed.',
  body: 'MakeMyTrip showed a refund amount at the start of the cancellation flow. The actual amount processed was ₹1,000 less with no itemised breakdown. You only discover the gap after completing cancellation — too late to back out.',
  seen: 'MakeMyTrip cancellation · 4-step IVR designed for drop-off · AI agent deployed as human'
}, {
  name: 'Hidden Costs',
  line: 'The price that only appears at the last step.',
  body: 'Four screens of checkout. Everything looks fine. Final screen: platform fee ₹5, convenience charge ₹12, GST ₹18. By step 4 you are already committed — and they know it.',
  seen: 'BookMyShow · MakeMyTrip · every Indian ticketing platform'
}, {
  name: 'Fake Scarcity',
  line: 'Countdown timers that reset. “Only 2 left” that never runs out.',
  body: 'Refresh after 10 minutes — still 3 rooms, timer reset. Manufactured scarcity to trigger loss aversion. You are not going to miss out. They just need you to feel like you might.',
  seen: 'MakeMyTrip · Goibibo · Flipkart sale pages'
}, {
  name: 'Confirmshaming',
  line: 'Making the “no” feel like shame.',
  body: 'One button: “Yes, continue.” The other: “No thanks, I don’t want to save money.” The choice is real. The framing is manipulation.',
  seen: 'Subscription apps · food delivery premium plans · e-commerce flash sales'
}];

const RESEARCH = [{
  title: 'The Capitulation Problem: A Conditional Optimization Framework',
  status: 'Sole author',
  meta: '2026 · Independent research · IIT Roorkee · 484 trials',
  description: 'Behavioral experiment using Gemma 4B (Ollama) as a controlled proxy — 5 domains × 5 pressure variants. LLM-as-Judge methodology with automated capitulation classification. Validated against blind human coding on a stratified sample. Proposed 3-question diagnostic framework.',
  finding: '42.8% combined capitulation — within the 39-52% human-predicted range. P4 anomaly: direct challenge produced 64.6% hard reversals vs expert authority 0% — the Compliance Paradox.'
}, {
  title: 'Specialist, Generalist, and Hybrid LLM Architectures for Algorithmic Code Generation',
  status: 'Sole author',
  meta: '2026 · Independent research · IIT Roorkee · 75 problems + 4 adversarial probes',
  description: 'Triaxial evaluation framework (Pass@1, CxSelf, CxJudge) across four architecture conditions. Automated pipeline with model-specific routing for specialist, generalist, decomposer, and judge roles.',
  finding: 'Generalist leads execution (Pass@1: 0.911 vs 0.862); Specialist leads complexity awareness. Naive Hybrid regresses 0.133; guarded variant recovers 87%. A trade-off invisible to single-axis evaluation.'
}, {
  title: 'Dual-Transformer Cross-Attention Multimodal Emotion Recognition',
  status: 'Co-author',
  meta: '2026 · IIT Roorkee · Electrical Engineering Department',
  description: 'HuBERT + ViViT dual encoders with bidirectional cross-modal attention on RAVDESS corpus. Walrus Optimizer for post-training feature selection on 1,536-dimensional joint embedding. Evaluated across 4-SNR robustness levels (15, 10, 5, 0 dB) with MUSAN noise corpus. Led architectural decisions and authored the complete paper.'
}, {
  title: 'Physics-Guided Diffusion Models for Synthetic Power Flow Data Generation',
  status: 'Co-author',
  meta: '2025 · IIT Roorkee · Electrical Engineering Department',
  description: 'Physics-guided DDPM framework enforcing AC power flow feasibility via manifold-constrained gradient guidance. Achieved 91.4% feasible fraction vs 41.2% unconstrained baseline. Dynamic normalisation and variable decoupling (p/theta, q/v) — two independent denoisers. Wasserstein-1 distance reduced from 0.71 to 0.48 on PJM 5-bus and IEEE bus systems.'
}, {
  title: 'Phonological Fidelity and Convergent Preservation in Indo-European Languages',
  status: 'Sole author · Open access',
  meta: '2026 · Published open access · Zenodo DOI: 10.5281/zenodo.19885744',
  description: 'Developed the Phonological Fidelity Index (PFI) — a quantitative measure of consonant retention from Proto-Indo-European roots across French, Hindi/Sanskrit, and English under Grimm’s Law. Built and analysed a curated Swadesh-based dataset; proposed Convergent Preservation and Phonetic Triangulation as cross-branch comparison methods.',
  links: [{
    label: 'Read on Zenodo',
    href: LINKS.zenodo
  }]
}];

const EXPERIMENTS = [{
  title: 'verified-intent-ir',
  status: 'In-progress research',
  meta: '2026 · Solo · Python · Open source',
  description: 'A small, closed IR that forces a model to express intent — filter, sort, reduce, groupby, take — instead of arbitrary Python, so its claims about the result (complexity, whether a sort is stable) can be checked against a hand-proven contract table instead of taken on faith. Same underlying question as the Capitulation and codegen papers: can you trust what a model says about its own output. The artifact (IR, compiler, verifier, logger) is built; the model-generation seam is still stubbed to fixtures rather than wired to a live LLM, so it’s an early research prototype, not a finished tool yet.',
  stack: ['Python', 'Compiler/IR Design', 'LLM Reliability'],
  links: [{
    label: 'GitHub',
    href: GH('Verified-ir')
  }]
}, {
  title: 'Wayfound — AI Trip Planner for Hyderabad',
  status: 'Experiment',
  meta: '2026 · IIT Roorkee open competition · Groq API, Google Places API',
  description: 'Group size, budget, vibe in → AI generates a full curated outing plan with real venues, timings, and routing. Built and shipped as a live public entry for IIT Roorkee’s open hackathon. Integrated Groq for natural-language trip planning with Google Places for real-time venue discovery.',
  stack: ['Groq API', 'Google Places', 'Prompt Engineering', 'Hackathon']
}, {
  title: 'Chai Lovers — Dynamic Business Website',
  status: 'First client · 2025',
  meta: '2025 · HTML, CSS, JavaScript · First client project',
  description: 'Built and delivered a dynamic website for a local cafe — menu, location, contact, and interactive elements. From brief to live site, solo. First real client delivery. The start of everything.',
  stack: ['HTML/CSS', 'JavaScript', 'Client Work']
}, {
  title: 'Smart Waste Management System',
  status: 'Academic collaboration · 2026',
  meta: '2026 · Python, spaCy, Deep Learning',
  description: 'Contributed NLP module to a DL-based waste classification system. Built a natural language querying interface using spaCy so non-technical users could query classification results in plain language. Optimised multi-label architecture for mixed waste streams.',
  stack: ['spaCy', 'Deep Learning', 'NLP', 'Multi-label']
}];

// Headline skills (kept from the original page)
const SKILLS = ['Full-Stack Engineering', 'AI & LLM Systems', 'MCP Server Development', 'Backend & Database Design', 'LLM Evaluation & Benchmarking', 'Business & Requirements Analysis', 'UX Research & Dark Pattern Audits', 'Data Pipelines & Analytics'];

const SKILL_GROUPS = [{
  label: 'Frontend',
  items: ['Next.js 16', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS']
}, {
  label: 'Backend / DB',
  items: ['MongoDB', 'PostgreSQL', 'Authentication systems', 'OTP flows', 'Session management', 'REST API design']
}, {
  label: 'Integrations & Deploy',
  items: ['Groq API', 'Google Places', 'MSG91', 'Resend', 'Aviasales', 'IRCTC', 'Cloudinary', 'Vercel']
}, {
  label: 'AI & LLMs',
  items: ['Prompt engineering', 'LLM evaluation pipelines', 'LLM-as-Judge methodology', 'MCP server development', 'Model benchmarking']
}, {
  label: 'Research & UX',
  items: ['Heuristic evaluation', 'Competitive analysis', 'Behavioral economics', 'Dark pattern analysis', 'UX research', 'Academic writing']
}, {
  label: 'Data & BA',
  items: ['Excel Power Query', 'Python scripting & data pipelines', 'Business analytics', 'Root cause analysis', 'Statistical modelling']
}, {
  label: 'Other',
  items: ['LaTeX', 'C++ (Arduino)', 'Figma (basics)', 'spaCy', 'scikit-learn', 'XGBoost', 'hmmlearn', 'Plotly']
}];

const CONSULTING = {
  stages: 'Discovery · Analysis · BRD',
  pitch: 'You are building. I translate what you need to build into structured outputs your team can act on.',
  deliverables: ['Process flows — as-is vs to-be', 'Business Requirements Documents (BRD)', 'Customer journey maps with emotional overlay', 'User stories — developer-ready', 'UX audit reports — structured, actionable', 'Stakeholder maps & gap analysis']
};

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
}];

const CERTIFICATIONS = [{
  title: 'MongoDB Overview: Core Concepts and Architecture',
  meta: 'MongoDB, Inc.',
  year: 'Jun 2026'
}, {
  title: 'AI Product Management Course',
  meta: 'Simplilearn SkillUP',
  year: 'Jun 2026'
}, {
  title: 'Business Analytics with Excel',
  meta: 'Simplilearn SkillUP',
  year: 'Jun 2026'
}, {
  title: 'Business Analysis Basics',
  meta: 'Simplilearn SkillUP',
  year: 'Jun 2026'
}, {
  title: 'Google Ads for Beginners',
  meta: 'Coursera',
  year: 'Mar 2026'
}, {
  title: 'Web Developer Program',
  meta: 'Hiring Bazaar',
  year: '2025'
}, {
  title: 'Google UX Design Professional Certificate',
  meta: 'Google · Coursera',
  year: 'In progress'
}, {
  title: 'Google Data Analytics Professional Certificate',
  meta: 'Google · Coursera',
  year: 'In progress'
}, {
  title: 'IBM Business Analyst Professional Certificate',
  meta: 'IBM · Coursera',
  year: 'In progress'
}];

const ACHIEVEMENTS = [{
  title: 'All India Rank 23,496 — JEE Advanced 2023',
  detail: 'Top ~1% of all engineering aspirants'
}, {
  title: 'Telangana EAPCET Rank 2,614 — 2023',
  detail: ''
}, {
  title: 'Team Lead — MARS / GDSC / CIG, IIT Roorkee',
  detail: '6th semester: led three-person teams across three campus initiatives, wrote a PRD, and shipped SmartAsset and NIFTY-50.'
}, {
  title: 'JEE Advanced Mentor (2024–2025)',
  detail: 'Personally mentored 10 students one-on-one, including one whose percentile rose from the 70th to the 95th.'
}, {
  title: 'NCC Cadet — National Cadet Corps, IIT Roorkee',
  detail: 'Oct 2023 – Apr 2024'
}, {
  title: 'Class XII — 94.20% · Class X — 95.60%',
  detail: 'Telangana State Board · CBSE'
}];

const CHANNELS = [{
  region: 'GITHUB — TEN+ PRODUCTION SYSTEMS',
  href: LINKS.github
}, {
  region: 'LINKEDIN — PROFESSIONAL',
  href: LINKS.linkedin
}, {
  region: 'ZENODO — PUBLISHED PAPER',
  href: LINKS.zenodo
}, {
  region: 'CONSULTING — BA + UX DISCOVERY CALL',
  href: LINKS.consulting
}];

/* ------------------------------------------------------------------ */
/* SMALL PIECES                                                        */
/* ------------------------------------------------------------------ */

const isExternal = href => /^https?:\/\//.test(href || '');

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
  index = 0
}) => {
  const external = isExternal(href);
  const cls = 'block border-t border-line py-6 md:py-8 group hover:bg-white/[0.03] transition-colors px-4 -mx-4';
  const inner = <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
            <div>
                <h3 className="text-lg md:text-xl lg:text-2xl text-foreground font-light group-hover:text-soft transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-faint mt-1 md:mt-2 italic">{meta}</p>
            </div>
            <span className="text-sm text-dim font-display tracking-widest">{year}</span>
        </div>;
  return <Reveal y={30} delay={Math.min(index, 8) * 0.05}>
            {external ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                </a> : <div className={cls}>{inner}</div>}
        </Reveal>;
};

const Rows = ({
  children
}) => <div>
        {children}
        <div className="border-t border-line" />
    </div>;

const Tag = ({
  children
}) => <span className="px-3 py-1 text-xs text-faint border border-line rounded-full">{children}</span>;

const TagList = ({
  items
}) => <div className="flex flex-wrap gap-2">
        {items.map(t => <Tag key={t}>{t}</Tag>)}
    </div>;

const TextLink = ({
  href,
  children
}) => {
  const external = isExternal(href);
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="label-caps text-xs text-faint hover:text-foreground transition-colors underline underline-offset-4">
            {children}{external ? ' ↗' : ''}
        </a>;
};

const LinkRow = ({
  links = [],
  note
}) => {
  if (!links.length && !note) return null;
  return <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
            {links.map(l => <TextLink key={l.label} href={l.href}>{l.label}</TextLink>)}
            {note && <span className="label-caps text-xs text-dim">{note}</span>}
        </div>;
};

const StatGrid = ({
  items,
  compact = false
}) => <dl className={`grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-y border-line ${compact ? 'py-6 my-8' : 'py-10'}`}>
        {items.map(s => <div key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="label-caps text-xs text-faint">{s.label}</dt>
                <dd className={`font-display font-medium tracking-tight text-foreground ${compact ? 'text-2xl lg:text-3xl' : 'text-4xl lg:text-6xl'}`}>
                    {s.value}
                </dd>
            </div>)}
    </dl>;

const Section = ({
  id,
  label,
  title,
  intro,
  panel = false,
  children
}) => <section id={id} className={`section-padding${panel ? ' bg-panel' : ''}`}>
        <div className="max-w-7xl mx-auto">
            <SectionLabel>{label}</SectionLabel>
            <Reveal y={40}>
                <h2 className={`font-display font-medium uppercase text-[10vw] lg:text-section leading-none tracking-tight ${intro ? 'mb-8 lg:mb-10' : 'mb-16 lg:mb-24'}`}>
                    {title}
                </h2>
            </Reveal>
            {intro && <Reveal y={20} className="max-w-2xl mb-16 lg:mb-24">
                    <p className="text-base lg:text-lg text-soft leading-relaxed">{intro}</p>
                </Reveal>}
            {children}
        </div>
    </section>;

const SubHeading = ({
  children,
  note
}) => <Reveal y={30} className="mt-20 lg:mt-28 mb-8 lg:mb-10">
        <h3 className="font-display font-medium uppercase text-2xl lg:text-4xl tracking-tight text-soft">
            {children}
        </h3>
        {note && <p className="mt-4 text-sm lg:text-base text-faint max-w-2xl leading-relaxed">{note}</p>}
    </Reveal>;

// Generic detailed row — used for AI builds, dev tools, UX cases, research, experiments
const ProjectRow = ({
  item
}) => <Reveal y={40}>
        <article className="border-t border-line py-8 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-5">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-3">
                        {item.title}
                    </h3>
                    {item.status && <p className="label-caps text-xs text-faint">{item.status}</p>}
                    {item.meta && <p className="text-sm text-dim mt-2 italic">{item.meta}</p>}
                </div>
                <div className="lg:col-span-7">
                    <p className="text-faint leading-relaxed mb-6 text-sm lg:text-base">{item.description}</p>
                    {item.highlights && <ul className="space-y-3 mb-6">
                            {item.highlights.map(h => <li key={h} className="text-sm lg:text-base text-soft leading-relaxed pl-4 border-l border-line">
                                    {h}
                                </li>)}
                        </ul>}
                    {item.finding && <div className="pl-4 border-l border-line mb-6">
                            <span className="label-caps text-xs text-faint block mb-2">Key finding</span>
                            <p className="text-sm lg:text-base text-soft leading-relaxed">{item.finding}</p>
                        </div>}
                    {item.facts && <dl className="flex flex-wrap gap-x-8 gap-y-2 mb-6">
                            {item.facts.map(([k, v]) => <div key={k} className="flex gap-2 text-xs">
                                    <dt className="label-caps text-dim">{k}</dt>
                                    <dd className="text-faint">{v}</dd>
                                </div>)}
                        </dl>}
                    {item.stack && <TagList items={item.stack} />}
                    <LinkRow links={item.links} note={item.note} />
                </div>
            </div>
        </article>
    </Reveal>;

// Flagship card — headline metrics up front, full case study expands on click
const FlagshipCard = ({
  item
}) => {
  const [open, setOpen] = useState(false);
  return <Reveal y={40}>
            <article className="border-t border-line py-10 md:py-14 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    <div className="lg:col-span-5">
                        <p className="label-caps text-xs text-faint mb-3">{item.kicker}</p>
                        <h3 className="font-display font-medium uppercase text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight text-foreground">
                            {item.name}
                        </h3>
                        <p className="label-caps text-xs text-dim mt-4">{item.status}</p>
                    </div>
                    <div className="lg:col-span-7">
                        <p className="text-base lg:text-lg text-soft leading-relaxed">{item.tagline}</p>
                        <StatGrid items={item.metrics} compact />
                        <TagList items={item.tags} />
                        <LinkRow links={item.links} note={item.note} />

                        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} className="mt-8 label-caps text-xs text-soft hover:text-foreground transition-colors underline underline-offset-4">
                            {open ? '− Close case study' : '+ Case study'}
                        </button>

                        <AnimatePresence initial={false}>
                            {open && <motion.div key="detail" initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: 'auto'
            }} exit={{
              opacity: 0,
              height: 0
            }} transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }} className="overflow-hidden">
                                    <div className="pt-8">
                                        <p className="text-faint leading-relaxed text-sm lg:text-base mb-8">
                                            {item.description}
                                        </p>
                                        <div className="pl-4 border-l border-line">
                                            <span className="label-caps text-xs text-faint block mb-2">
                                                Engineering insight
                                            </span>
                                            <p className="text-sm lg:text-base text-soft leading-relaxed">{item.insight}</p>
                                        </div>
                                    </div>
                                </motion.div>}
                        </AnimatePresence>
                    </div>
                </div>
            </article>
        </Reveal>;
};

const Battle = ({
  battle
}) => <Reveal y={40}>
        <article className="border-t border-line py-8 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-5">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground mb-3">
                        {battle.title}
                    </h3>
                    <p className="text-sm text-dim italic">{battle.apps}</p>
                </div>
                <div className="lg:col-span-7">
                    {battle.soon ? <p className="label-caps text-xs text-faint">Coming soon</p> : <>
                            <p className="text-faint leading-relaxed mb-8 text-sm lg:text-base">{battle.intro}</p>
                            <div className="mb-8">
                                {battle.rows.map(([observation, concept]) => <div key={observation} className="grid grid-cols-1 md:grid-cols-5 gap-1 md:gap-6 border-t border-line py-3">
                                        <p className="md:col-span-3 text-sm lg:text-base text-soft leading-relaxed">
                                            {observation}
                                        </p>
                                        <p className="md:col-span-2 label-caps text-xs text-faint md:text-right">
                                            {concept}
                                        </p>
                                    </div>)}
                            </div>
                            {battle.closing && <p className="text-sm lg:text-base text-faint leading-relaxed pl-4 border-l border-line">
                                    {battle.closing}
                                </p>}
                        </>}
                </div>
            </div>
        </article>
    </Reveal>;

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

const HomePage = () => {
  return <div className="portfolio-shell min-h-screen text-foreground">
            <Helmet>
                <title>Tharun Rathod — Engineer, Founder, Researcher</title>
                <meta name="description" content="Tharun Rathod is a solo founder, software engineer and independent researcher at IIT Roorkee, building production systems across education, healthcare, hiring and developer tooling. Open to full-stack, BA / UX and AI research internships." />
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
                                <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.8,
                delay: 0.7
              }}>
                                    <p className="mt-6 md:mt-8 label-caps text-xs sm:text-sm text-white/70">
                                        Engineer. Founder. Researcher.
                                    </p>
                                    <p className="mt-3 text-sm sm:text-base text-white/80 max-w-sm md:max-w-md leading-relaxed">
                                        Ten-plus production systems built solo and five research papers, alongside
                                        a B.Tech in Electrical Engineering at IIT Roorkee.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                                        <a href="#projects" className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4">
                                            View flagship work
                                        </a>
                                        <a href="#research" className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4">
                                            Research
                                        </a>
                                        {LINKS.resume && <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4">
                                                Resume ↗
                                            </a>}
                                        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4">
                                            GitHub ↗
                                        </a>
                                        <a href="#contact" className="label-caps text-xs text-white/80 hover:text-white transition-colors underline underline-offset-4">
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
                                Solo founder, software engineer, and independent researcher — building scalable
                                backend systems, AI products, developer tooling, and workflow automation
                                platforms across education, healthcare, hiring, and enterprise domains.
                            </p>
                            <p className="mt-6 label-caps text-xs text-faint">{DOMAINS.join(' · ')}</p>
                        </Reveal>

                        <Reveal y={40} className="mb-24 lg:mb-32">
                            <StatGrid items={STATS} />
                        </Reveal>

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
                            <p className="mt-8 max-w-2xl text-base lg:text-lg text-soft leading-relaxed">
                                Most of the work sits at the intersection of AI, infrastructure, and product
                                design, with an emphasis on solving real workflow problems instead of
                                showcasing technology for its own sake.
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

                {/* FLAGSHIP SYSTEMS (id kept as "projects" so existing nav links still land here) */}
                <Section id="projects" label="Flagship" title={<>Flagship<br />Systems</>} intro="Five production-grade systems built solo, from schema design to deployment. Each one eliminates a real operational problem." panel>
                    <Rows>
                        {FLAGSHIP.map(item => <FlagshipCard key={item.name} item={item} />)}
                    </Rows>
                </Section>

                {/* TIMELINE */}
                <Section id="timeline" label="Timeline" title="Timeline" intro="From a cafe website to a 10+ system portfolio in under two years. The archived experiments matter — they prove continuous momentum, not failed starts.">
                    <div className="space-y-16 lg:space-y-24">
                        {TIMELINE.map(group => <div key={group.year} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                                <Reveal y={30} className="lg:col-span-3">
                                    <p className="font-display font-medium text-5xl lg:text-7xl tracking-tight text-foreground">
                                        {group.year}
                                    </p>
                                </Reveal>
                                <div className="lg:col-span-9">
                                    {group.items.map((entry, i) => <Reveal key={entry.name} y={20} delay={Math.min(i, 6) * 0.03}>
                                            <div className="border-t border-line py-4 md:py-5 flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-light text-foreground">{entry.name}</h3>
                                                    <p className="text-sm text-faint mt-1">{entry.note}</p>
                                                </div>
                                                <span className="label-caps text-xs text-dim shrink-0">{entry.tag}</span>
                                            </div>
                                        </Reveal>)}
                                    <div className="border-t border-line" />
                                </div>
                            </div>)}
                    </div>
                </Section>

                {/* WORK EXPERIENCE */}
                <Section id="work" label="Career" title={<>Work<br />Experience</>} panel>
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
                </Section>

                {/* AI & ML */}
                <Section id="ai" label="AI & Machine Learning" title="AI & ML" intro="Five builds under real constraints — genuine AI/ML where it earns its place (regime detection, LLM evaluation), and disciplined plain engineering where it doesn’t (a queue system that deliberately ships with no ML at all).">
                    <Rows>
                        {AI_BUILDS.map(item => <ProjectRow key={item.title} item={item} />)}
                    </Rows>
                </Section>

                {/* DEV TOOLS */}
                <Section id="tools" label="Developer Tools & Infrastructure" title={<>Dev<br />Tools</>} intro="Tools built for developers — one runs natively inside Claude and Cursor, one compiles intent into algorithms, one analyzes pricing at the system level." panel>
                    <Rows>
                        {DEV_TOOLS.map(item => <ProjectRow key={item.title} item={item} />)}
                    </Rows>
                </Section>

                {/* PRODUCT & UX */}
                <Section id="ux" label="Product & UX" title={<>UX Case<br />Studies</>} intro="I pick real apps, break down every UX and business decision, and name what I’d fix. These are discipline exercises — not complaints.">
                    <Rows>
                        {UX_CASES.map(item => <ProjectRow key={item.title} item={item} />)}
                    </Rows>

                    <SubHeading note="Side-by-side teardowns of apps that compete for the same user. Observation on the left, the design or behavioral concept behind it on the right.">
                        UX Battles
                    </SubHeading>
                    <Rows>
                        {UX_BATTLES.map(b => <Battle key={b.title} battle={b} />)}
                    </Rows>

                    <SubHeading note="Deliberate design decisions made against users to protect business metrics. All from personal experience with Indian apps.">
                        Dark Patterns Spotted
                    </SubHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {DARK_PATTERNS.map((p, i) => <Reveal key={p.name} y={30} delay={i * 0.05}>
                                <div className="border-t border-line pt-6">
                                    <p className="label-caps text-xs text-dim mb-2">{p.name}</p>
                                    <h4 className="text-xl lg:text-2xl font-light text-foreground mb-3">{p.line}</h4>
                                    <p className="text-sm lg:text-base text-faint leading-relaxed mb-4">{p.body}</p>
                                    <p className="label-caps text-xs text-dim">Spotted in — {p.seen}</p>
                                </div>
                            </Reveal>)}
                        <Reveal y={30} delay={DARK_PATTERNS.length * 0.05}>
                            <div className="border-t border-line pt-6">
                                <p className="label-caps text-xs text-dim mb-2">Not all friction is a dark pattern</p>
                                <p className="text-sm lg:text-base text-faint leading-relaxed">
                                    Paytm’s cancellation flow is one — designed to make you give up. Zomato’s
                                    cancellation warning is borderline — it informs you of a real consequence.
                                    The difference is intent: does the friction protect the user or exploit them?
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* RESEARCH */}
                <Section id="research" label="Papers & Publications" title="Research" intro="Five papers spanning AI evaluation, behavioral AI, electrical engineering, and linguistics. Two sole-authored, two co-authored, one published open-access." panel>
                    <Rows>
                        {RESEARCH.map(item => <ProjectRow key={item.title} item={item} />)}
                    </Rows>
                </Section>

                {/* EXPERIMENTS */}
                <Section id="experiments" label="Archive" title="Experiments" intro="Earlier prototypes and experiments. Not hidden — they are proof that this portfolio was built, not conjured. The Chai Lovers → Edcore arc tells a more honest story than any polished flagship card alone.">
                    <Rows>
                        {EXPERIMENTS.map(item => <ProjectRow key={item.title} item={item} />)}
                    </Rows>
                </Section>

                {/* SKILLS */}
                <Section id="skills" label="Expertise" title="Skills" panel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 lg:gap-y-6">
                        {SKILLS.map((skill, i) => <Reveal key={skill} y={24} delay={i * 0.04}>
                                <div className="border-b border-line pb-4 group">
                                    <span className="text-lg md:text-xl lg:text-2xl text-soft font-light group-hover:text-foreground transition-colors duration-300">
                                        {skill}
                                    </span>
                                </div>
                            </Reveal>)}
                    </div>

                    <div className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
                        {SKILL_GROUPS.map((group, i) => <Reveal key={group.label} y={24} delay={Math.min(i, 6) * 0.04}>
                                <div className="border-t border-line pt-6">
                                    <p className="label-caps text-xs text-faint mb-4">{group.label}</p>
                                    <TagList items={group.items} />
                                </div>
                            </Reveal>)}
                    </div>
                </Section>

                {/* CONSULTING */}
                <Section id="consulting" label="BA + UX Consulting" title="Brief">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <Reveal y={40} className="lg:col-span-5">
                            <p className="label-caps text-xs text-faint mb-4">
                                Requirements & research for founders — {CONSULTING.stages}
                            </p>
                            <h3 className="text-2xl lg:text-4xl font-light text-foreground leading-snug">
                                {CONSULTING.pitch}
                            </h3>
                            <a href={LINKS.consulting} target="_blank" rel="noopener noreferrer" className="inline-block mt-8 label-caps text-sm text-soft hover:text-foreground transition-colors underline underline-offset-4">
                                Start with a discovery call ↗
                            </a>
                        </Reveal>
                        <div className="lg:col-span-7">
                            {CONSULTING.deliverables.map((d, i) => <Reveal key={d} y={20} delay={i * 0.05}>
                                    <div className="border-t border-line py-5">
                                        <span className="text-lg lg:text-xl font-light text-soft">{d}</span>
                                    </div>
                                </Reveal>)}
                            <div className="border-t border-line" />
                        </div>
                    </div>
                </Section>

                {/* EDUCATION */}
                <Section id="education" label="Background" title="Education" panel>
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
                </Section>

                {/* CERTIFICATIONS */}
                <Section id="certifications" label="Learning" title="Certifications">
                    <Rows>
                        {CERTIFICATIONS.map((c, i) => <ListRow key={c.title} {...c} index={i} />)}
                    </Rows>
                </Section>

                {/* ACHIEVEMENTS */}
                <Section id="achievements" label="Recognition" title="Achievements" panel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                        {ACHIEVEMENTS.map((a, i) => <Reveal key={a.title} y={24} delay={Math.min(i, 6) * 0.04}>
                                <div className="border-t border-line pt-6">
                                    <h3 className="text-lg lg:text-xl font-light text-foreground">{a.title}</h3>
                                    {a.detail && <p className="text-sm lg:text-base text-faint leading-relaxed mt-2">{a.detail}</p>}
                                </div>
                            </Reveal>)}
                    </div>
                </Section>

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
                                <a href={LINKS.edcore} target="_blank" rel="noopener noreferrer" className="text-lg lg:text-xl text-soft hover:text-foreground transition-colors underline underline-offset-4">
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
