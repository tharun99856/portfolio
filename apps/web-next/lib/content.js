// Single source of truth for every piece of portfolio copy.
// Design/layout code imports from here so a redesign can never drop content.

export const HERO = {
  name: 'Tharun Rathod',
  title: 'Product Engineer',
  subtitle: 'Building AI-first products at IIT Roorkee',
  description: 'Product Manager and AI Engineer. Built Edcore (220+ users), published 5 research papers, and shipped 10+ production systems. I solve real problems with code, design, and data.',
  cta: { label: 'View Flagship Work', href: '#flagship' }
};

export const ABOUT = {
  lead: 'Solo founder building products from 0→1. Ships production systems end-to-end - product vision, technical architecture, user acquisition, revenue. Edcore (220+ users, 4 live modules), Rune (optimizing compiler), SmartAsset (enterprise infrastructure), and 7+ shipped projects. Founder-engineer who writes code, talks to users, and owns P&L.',
  body: 'My B.Tech is in Electrical Engineering, but the real work is building companies. I\'m a solo founder who ships production systems - from zero to live users - across education (Edcore, 220+ students), healthcare (PHC queue systems), developer tools (MCP servers, repo visualization), and enterprise infrastructure. Product strategy, full-stack execution, and go-to-market - all solo. The degree taught me circuits. The startups taught me everything else: customer discovery, unit economics, retention loops, and shipping fast under constraints.'
};

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI/ML', indent: true },
  { id: 'tools', label: 'Dev Tools', indent: true },
  { id: 'ux', label: 'Product Studies', indent: true },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export const NAV_CONTACT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/tharun99856' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tharun-rathod' },
  { label: 'LinkedIn (Work)', href: 'https://www.linkedin.com/in/tharun-rathod-0a1aa7412/' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=lZyc30EAAAAJ' },
  { label: 'Instagram', href: 'https://www.instagram.com/tharunr05/' },
  { label: 'Resume', href: '#contact' }
];

export const SECTION_INTROS = {
  projects: 'Four production-grade systems built solo - from education OS to optimizing compilers.',
  ai: 'AI/ML projects under real constraints - genuine AI where it earns its place.',
  tools: 'Tools built for developers.',
  ux: 'Real apps analyzed - case studies, competitive battles, and product proposals. Every UX and business decision broken down.',
  research: 'Five papers spanning AI evaluation, behavioral AI, electrical engineering, and linguistics. Two sole-authored, two co-authored, one published open-access.'
};

// AI & ML PROJECTS
export const AI_BUILDS = [{
  title: 'IHateApplying',
  tagline: 'Bulk outreach automation for job applications - upload CSV, AI generates personalized emails/DMs, push to Gmail. Apply till you get a reply.',
  description: [
    'Upload CSV with contacts → AI generates personalized cold emails and LinkedIn/X DMs at scale',
    'Gmail integration pushes drafts to inbox, auto-detects email columns from any CSV format',
    'Batch processing (50 free, 100 with own key), optional resume parsing for detailed pitches',
    'Built for the numbers game of job hunting - apply till you get a reply'
  ],
  insight: 'The product positioning is deliberate: "Apply till you get a reply" acknowledges the numbers game reality of job hunting. Email column auto-detection handles messy CSVs without forcing users to reformat. Batch limits (50 free, 100 with own Groq key) prevent API abuse while keeping it accessible. Resume parsing is optional - short mode for 3-sentence pitches, detailed mode for project-heavy 4-5 sentence emails. The Gmail push feature is the conversion point - draft generation alone isn\'t enough, people want it in their inbox ready to send.',
  tags: ['AI', 'Next.js', 'Groq API', 'Gmail API', 'TypeScript'],
  links: [
    { label: 'Live App', href: 'https://ihateapplying.vercel.app/' },
    { label: 'GitHub', href: 'https://github.com/tharun99856/ihateapplying' }
  ],
  media: { type: 'image', src: '/projects/ihateapplying.jpg' }
}, {
  title: 'PHC Queue Management System',
  description: [
    'Token + wait-time system for Primary Health Centres, piloted at Latha Children\'s Clinic, Hyderabad',
    'Printed tokens with honest wait estimates from rolling 10-consultation average',
    'No app install for patients, runs on Raspberry Pi with zero third-party API dependencies',
    '67% reduction in physical wait time, ₹9,300 one-time cost, ₹0/month running cost'
  ],
  highlights: [
    'Simulated 67% reduction in physical wait time and 69% reduction in peak in-clinic occupancy, over 10 runs × 100 patients',
    '₹9,300 one-time hardware cost per PHC, ₹0/month running cost in V1 - FastAPI + SQLite chosen specifically because it runs on a Raspberry Pi and survives power loss'
  ],
  tags: ['Healthcare', 'Python', 'FastAPI', 'SQLite', 'Raspberry Pi'],
  links: [{ label: 'GitHub', href: 'https://github.com/tharun99856/Latha-Aunty-HC' }]
}, {
  title: 'NIFTY-50 Investment Intelligence',
  description: [
    '21 years of NIFTY-50 data with Hidden Markov Models detecting bull/bear regime transitions',
    'XGBoost price prediction with SHAP explainability showing which features drove each prediction',
    'Portfolio optimization via Modern Portfolio Theory, Value-at-Risk analysis',
    'HMM detects regime shifts 3-5 days before they appear visually on price charts'
  ],
  highlights: [
    'HMM trained on return distributions detects regime shifts 3-5 days before they are visually apparent on price charts',
    'SHAP values surface which features (RSI, MACD, volume delta) drove each prediction - explainability built in, not bolted on'
  ],
  tags: ['Finance', 'Python', 'XGBoost', 'SHAP', 'Streamlit'],
  links: [
    { label: 'Live demo', href: 'https://niftyinvest.streamlit.app/' },
    { label: 'GitHub', href: 'https://github.com/tharun99856/-NIFTY-50-Investment' }
  ],
  media: { type: 'video', src: '/projects/Nifty 50 recording.mp4' }
}];

// DEV TOOLS PROJECTS
export const DEV_TOOLS = [{
  title: 'SmartAsset',
  tagline: 'Enterprise asset management - 56+ assets, zero double-bookings, full audit trail.',
  description: [
    'Replaces paper logbooks for warehouse-scale asset tracking with 56+ assets managed',
    'Double-booking prevention at database layer via PostgreSQL serializable transactions',
    'QR-based issue/return creates frictionless audit trail with full RBAC permissions',
    'Analytics dashboard tracks utilization, approval workflows prevent race conditions'
  ],
  insight: 'The double-booking prevention lives at the database layer, not the UI. Serializable transactions in PostgreSQL (via Prisma) prevent conflicts under concurrent write pressure - the kind of gap that paper logbooks and naive first-come-first-served systems cannot close. Operational consistency has to be enforced at the data layer or it is not enforced at all.',
  highlights: [
    '56+ assets tracked with zero double-bookings',
    'QR-based issue/return with full audit trail',
    'RBAC permissions and analytics dashboard'
  ],
  tags: ['Enterprise', 'Next.js 16', 'Prisma', 'PostgreSQL', 'TypeScript'],
  links: [{ label: 'GitHub', href: 'https://github.com/tharun99856/SmartAsset' }],
  media: { type: 'video', src: '/projects/Smartasset recording .mp4' }
}, {
  title: 'TravelChecker',
  tagline: 'Multi-modal travel comparison for India - MCP server + REST API + dashboard. Finds optimal composite routes like cab→airport→flight.',
  description: [
    'Model Context Protocol (MCP) server for Claude Desktop, Cursor, or any MCP-compatible AI agent',
    'Finds multi-leg journeys most travel apps miss (e.g., cab to airport + flight beats direct train)',
    '5 travel modes across 117 Indian cities with live API data (Google Maps, flights, trains, buses)',
    'Weighted scoring, graceful API fallbacks, SQLite cache, per-IP rate limiting'
  ],
  highlights: [
    '5 travel modes: Flight, Train, Bus, Cab (Ola/Uber/Auto/Rapido), Personal Vehicle (Petrol/Diesel/Bike) across 117 Indian cities',
    'Live API data: Google Maps Distance Matrix, Travelpayouts/Aviasales (flights), IRCTC RapidAPI (trains), AbhiBus HTTP scrape (buses)',
    'Weighted scoring: tune price/time/comfort sliders to match your trip style with smart insights on surge warnings, fuel-vs-cab savings, train-vs-flight tradeoffs',
    'Graceful fallbacks: every provider has a modeled backup so the app never breaks when an API quota runs out. SQLite cache for Google Maps, per-IP rate limiting (30 req/min), OpenAPI/Swagger docs'
  ],
  tags: ['MCP', 'TypeScript', 'Google Maps API', 'Node.js', 'SQLite'],
  links: [
    { label: 'Live API', href: 'https://travelchecker-resume.up.railway.app' },
    { label: 'GitHub', href: 'https://github.com/tharun99856/TravelChecker' }
  ],
  media: { type: 'image', src: '/projects/travelchecker logo.png' }
}, {
  title: 'Wayfound',
  tagline: 'AI-powered itinerary planner for Hyderabad. Tell it your group size, age, vibe and budget - it plans your whole outing with real venues, timings and cost breakdown.',
  description: [
    'Generates complete day plans for Hyderabad in seconds with real venue names, addresses, timings, costs',
    'Groq AI (llama-3.1-8b-instant) for natural language generation + Google Places API for real data',
    'Smart mock engine with 200+ verified Hyderabad venues as fallback when API quota runs out',
    'Example: "4 friends, age 19, go-karting and food under ₹2500" → Full itemized plan'
  ],
  highlights: [
    'Prompts: "4 friends, age 19, go-karting and food under ₹2500" → Full plan with venue names, addresses, timings, itemized costs',
    '"2 people, age 40, romantic dinner and evening ₹3000" → Curated fine-dining + evening activity with travel time',
    '"6 guys, age 25, gaming zone and biryani ₹3600" → Gaming venue + biryani spot + buffer for transport',
    '"Family of 4, age 35, cultural day and lunch ₹2000" → Museums, heritage sites, family restaurant with kid-friendly options',
    'Defaults to ₹2000 budget and 7 PM start time if not specified. Graceful degradation: Google Places live data preferred, mock engine (200+ venues) kicks in on quota limit'
  ],
  tags: ['AI', 'React', 'Groq AI', 'Google Places API', 'TypeScript'],
  links: [{ label: 'Live App', href: 'https://wayfound-five.vercel.app/' }],
  media: { type: 'image', src: '/projects/wayfound.jpg' }
}, {
  title: 'SurgeScope',
  tagline: 'Surge pricing analytics using arc elasticity on 50,000 Mumbai/Bangalore/Delhi trip records. Found the 2.0x wall where completion falls off a cliff.',
  description: [
    '50,000 Uber/Ola-style trip records analyzed using arc elasticity to find demand curves',
    'Found the 2.0x wall: up to 1.5x riders stay, 1.5-2.0x completion drops sharply, above 2.0x only desperate riders left',
    'Commercial areas most price-sensitive, transit hubs almost inelastic, residential in between',
    'Recommended zone-based surge caps and loyalty protection for Gold-tier users'
  ],
  highlights: [
    'The curve split into three zones: Up to 1.5x riders grumble but mostly stay. Between 1.5x and 2.0x completion falls off a cliff (the 2.0x wall). Above 2.0x completion flattens because only desperate or captive riders are left',
    'Commercial areas (offices, malls) are most price-sensitive since people have metro/buses. Transit hubs (airports, stations) are almost inelastic since people are stuck with luggage. Residential sits in between',
    'Weekday peak hour is the riskiest window to surge hard because commuters form habits and might switch to metro permanently. Rain barely moved cancellation rates at the same surge level - it\'s the price, not the weather',
    'Built recommendation: cap surge by zone and time instead of one blanket multiplier, and protect loyal (Gold-tier) users with a lower cap since they\'re the only segment where unit economics work'
  ],
  tags: ['Analytics', 'Python', 'Pandas', 'Arc Elasticity', 'Excel'],
  links: [{ label: 'View Analysis', href: 'https://drive.google.com/drive/folders/1YzhIeFH4Wl6WVl11KiILsn7486ERqi3D' }]
}];

// PRODUCT STUDIES - CASES AND BATTLES
export const UX_WORK = [{
  title: 'MAGGI CUSTOMS - Product Proposal for Nestlé India',
  type: 'case',
  description: 'A complete product hypothesis for Nestlé India proposing a modular instant-noodle ecosystem (MAGGI CUSTOMS) targeting Gen Z college students. 40-page document covering market opportunity, product architecture (MAGGI DUO, Flavor Sachets, Bowl format, Campus Bowl Lab), validation plan, retailer economics, and commercial case. Includes consumer hypotheses, campus pilot methodology, metrics framework, and illustrative scenario modeling.',
  highlights: [
    'Core thesis: Move from "Which MAGGI should I buy?" to "How do I want my MAGGI today?" - modular customization without sacrificing affordability',
    'Proposed 4-phase validation: consumer research (100-200 students) → prototype testing → campus lab pilot → scale only if metrics validate',
    'Retailer economics analysis: ₹10 pack gives ~₹0.90 margin vs ₹15 pack ~₹1.35 - a 50% rupee increase for only 3% price-per-100g premium',
    'Revenue-per-consumption-occasion framework: tracking basket value (₹20 today → ₹20-25 with customization → ₹30-50 premium bowl)',
    'Campus experimentation model: MAGGI Bowl Lab as a consumer co-creation platform, not just a product launch',
    'Written as a formal product brief with hypothesis tags (VERIFIED, REPORTED, TO CONFIRM, ILLUSTRATIVE) and evidence register'
  ],
  tags: ['Product Strategy', 'Consumer Research', 'Market Analysis', 'FMCG', 'Business Case', 'Stakeholder Docs'],
  links: [{ label: 'View Full Proposal (PDF)', href: 'https://drive.google.com/file/d/1RAWSlQ484d5PxolH5_sB3ATIoY3f0QR5/view' }]
}, {
  title: 'Tata Neu Product Teardown: Gen Z Engagement & Retention',
  type: 'case',
  description: 'Product Teardown 2026 case study diagnosing Tata Neu\'s "Buy and Bye" problem - students use the app for big purchases, then it goes dormant for months. Proposed solution: shift from transaction-led to relationship-led engagement through two integrated product cases that give students a reason to open the app without buying.',
  highlights: [
    'Core diagnosis: Ecosystem breadth ≠ visit frequency. Tata Neu is a catalogue useful once you know what to buy, but has no daily hook',
    'Case 1 (Trust wedge): Neu Circles + Essentials - private social discovery where friend recommendations become reusable shopping lists across brands',
    'Case 2 (Habit engine): Campus Drops + Weekly Challenges - relevant time-bound offers with light daily steps (never requiring purchase)',
    'Primary metric: WESU (Weekly Engaged Student Users) - filtering WAU for meaningful actions, not passive notification clicks',
    'Target: +15% student WAU by week 8 vs matched control, with engaged students averaging 2-3 meaningful visits/week',
    'Why Tata Neu wins: Shared rewards currency (NeuCoins) and connected brand portfolio enable cross-category lists/circles/drops that single-brand apps cannot match'
  ],
  tags: ['Product Teardown', 'Retention Strategy', 'Behavioral Design', 'Metrics Design', 'Consumer Apps'],
  links: [{ label: 'View Full Teardown (PDF)', href: '/Tata Neu Product Teardown 2026.pdf' }]
}, {
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

// RESEARCH PAPERS
export const RESEARCH = [{
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
  links: [{ label: 'Read on Zenodo', href: 'https://zenodo.org/doi/10.5281/zenodo.19885744' }]
}];

// WORK EXPERIENCE
export const EXPERIENCE = [{
  role: 'Founder and Product Engineer',
  company: 'Edcore',
  period: 'Jan 2025 - Present',
  description: 'Built and launched an education platform helping Indian students discover colleges, exams, mentors, and career pathways. Grew the platform to 220+ users and generated 2.7K+ impressions through organic distribution and experimentation. Took Edcore from problem discovery → UX → full-stack development → deployment → user acquisition.',
  tags: ['Next.js', 'PostgreSQL', 'NextAuth', 'Product Ownership', 'User Acquisition']
}, {
  role: 'Independent Researcher',
  company: 'IIT Roorkee',
  period: '2025 - Present',
  description: 'Five papers across AI evaluation, behavioral AI, electrical engineering and linguistics - two sole-authored, two co-authored, one published open-access on Zenodo. Current focus: whether a model can be trusted about its own output.',
  tags: ['LLM-as-Judge', 'Experimental Design', 'Academic Writing']
}, {
  role: 'Forward Deployed Engineer',
  company: 'R.K. IntelliServe (Startup)',
  period: 'Mar 2025 - Mar 2026',
  description: 'Pipeline Orchestration: Architected and automated DAG-based ML preprocessing and model evaluation pipelines for high-throughput production data workflows. Client and Systems Integration: Translated client requirements into scalable AI/ML solutions, integrating data systems, APIs, and existing enterprise workflows. Full-Stack Engineering: Built low-latency microservices, third-party API integrations, and automation scripts to streamline operational workflows for SME clients. Production Engineering: Collaborated across engineering pods to troubleshoot integration failures, ship emergency hotfixes, and stabilize production systems under tight delivery timelines.',
  tags: ['Python', 'ML Pipelines', 'DAG Orchestration', 'Airflow', 'Startup', 'Client Integration']
}, {
  role: 'Web Development Intern',
  company: 'Hiring Bazaar AI',
  period: 'Oct 2025 - Jan 2026',
  description: 'Product Delivery: Shipped the careers page, role listings and candidate application workflow end to end (frontend and backend); owned UI feedback and rollout testing. Performance Optimization: Cut average API response time 30% (400 ms to 280 ms) and initial page load 25% (2.4 s to 1.8 s).',
  tags: ['React', 'Full-Stack', 'API Design', 'Performance', 'TypeScript', 'Mean Stack']
}];

export const SKILLS = [
  'Full-Stack Development', 'System Architecture', 'API Design & Integration',
  'Database Design & Optimization', 'AI & LLM Systems', 'MCP Server Development',
  'Compiler Design', 'Algorithm Optimization', 'DevOps & Cloud Deployment',
  'Product Management', 'Business Analysis', 'UX Research & Testing',
  'Technical Writing', 'Agile & Scrum', 'Research & Experimentation'
];

export const SKILL_GROUPS = [{
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

export const TECH_STACK = [
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
];

export const EDUCATION = [{
  title: 'B.Tech, Electrical Engineering',
  school: 'Indian Institute of Technology Roorkee',
  description: 'All India Rank 23,496 in JEE Advanced 2023 and Telangana EAPCET Rank 2,614. The degree is in electrical engineering; most of the building happens outside the syllabus - ten production systems, five papers, and two products shipped solo alongside coursework.',
  period: '2023 - 2027',
  image: '/images.jpg'
}, {
  title: 'Class XII & Class X',
  school: 'Telangana State Board · CBSE',
  description: 'Class XII - 94.20% (Telangana State Board). Class X - 95.60% (CBSE). Also served as an NCC Cadet with the National Cadet Corps at IIT Roorkee between October 2023 and April 2024.',
  period: '2021 - 2023',
  image: '/DSE Image.jpg'
}];

export const CONTACT = {
  heading: 'Let\'s talk',
  lead: 'Always open to opportunities - full-time roles, internships, freelance gigs, or just interesting conversations about tech, products, and building things that matter.',
  body: 'Whether you\'re hiring, have a technical challenge to discuss, want to collaborate on a project, or just want to connect - I\'d love to hear from you. Drop me an email or find me on the platforms below.',
  resumeHeading: 'Resumes',
  directLabel: 'Or reach me directly',
  email: 'tharunrathod2005@gmail.com',
  footerImage: '/footer-image.jpg',
  copyright: '© 2026 Tharun Rathod - Engineering, Products & Research',
  locations: 'Roorkee / Hyderabad / Remote'
};
