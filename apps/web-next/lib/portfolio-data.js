// Portfolio data - extracted to module level to prevent re-creation on render

export const IMAGES = {
  hero: '/main%20image.jpeg',
  build: '/my-image.jpeg',
  research: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1216&h=896&fit=crop&q=80',
  systems: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1216&h=896&fit=crop&q=80',
  campus: '/images.jpg',
  lecturehall: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1216&h=896&fit=crop&q=80'
};

export const LINKS = {
  github: 'https://github.com/tharun99856',
  linkedin: 'https://linkedin.com/in/tharun-rathod',
  zenodo: 'https://zenodo.org/doi/10.5281/zenodo.19885744',
  edcore: 'https://edcore.tech',
  rune: 'https://tharun99856.github.io/rune/',
  consulting: 'https://docs.google.com/forms/d/e/1FAIpQLSeLdPhya4o3q1zTTKDd_OwcMAtbndD8T-w4ORTxuKYu3L22zw/viewform?usp=publish-editor',
  resume_fullstack: '/Tharun_Rathod_Resume%20(1).pdf',
  resume_research: '/Tharun_Rathod_AI_Research_Resume.pdf',
  resume_ba_ux: '/Tharun_Rathod_PM_Resume%20(1).pdf'
};

export const GH = (repo) => `https://github.com/tharun99856/${repo}`;

export const DOMAINS = ['Education', 'Healthcare', 'Hiring', 'Developer Tools', 'Enterprise Systems', 'Research'];

export const STATS = [{
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

export const CHANNELS = [
  { region: 'GITHUB - CODE & PROJECTS', href: LINKS.github },
  { region: 'LINKEDIN - PROFESSIONAL', href: LINKS.linkedin },
  { region: 'ZENODO - PUBLISHED PAPER', href: LINKS.zenodo }
];

export const RESUMES = [
  { type: 'Software Development', description: 'Full-Stack Engineering & Product', href: LINKS.resume_fullstack },
  { type: 'AI Research', description: 'Papers & LLM Systems', href: LINKS.resume_research },
  { type: 'Product Management', description: 'Implementation Engineering & Strategy', href: LINKS.resume_ba_ux }
];

export const FLAGSHIP = [{
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

// Note: AI_BUILDS, DEV_TOOLS, UX_WORK, RESEARCH, EXPERIENCE, EDUCATION, SKILLS, SKILL_GROUPS
// are defined inline in page.tsx due to length - would need separate import for full extraction
