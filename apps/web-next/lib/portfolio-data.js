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
  tagline: 'All-in-one education OS for Indian students - live with 220+ users across exam prep, college selection, and career guidance.',
  description: [
    'Four production modules in one Next.js 16 monolith: ExamNotifi, CollegeTracker, Tutorix, NextTalk',
    'Shared auth (NextAuth), MongoDB schema, MSG91 OTP, Resend email automation, Airtable CRM sync',
    'Cross-module state management and notification engine tracking user behavior across features',
    'Grew to 220+ users organically with 2.7K+ impressions through distribution experiments'
  ],
  insight: 'The real moat isn\'t the code - it\'s the 2,000+ college dataset curated across 25 fields (hostel vibe, coding culture, campus life, placements, city tier, faculty, infrastructure, location advantages). Competitors have college names. Edcore has the depth students actually need to decide. The dataset took months of manual curation and is harder to replicate than the entire platform.',
  metrics: [
    { value: '220+', label: 'Active Users' },
    { value: '4', label: 'Live Modules' },
    { value: '2k+', label: 'Colleges' },
    { value: '25', label: 'Data Fields' }
  ],
  tags: ['Education', 'Next.js 16', 'MongoDB', 'NextAuth', 'TypeScript'],
  links: [{ label: 'edcore.tech', href: LINKS.edcore }],
  media: { type: 'video', src: '/projects/edcore recording.mp4' }
}, {
  name: 'Rune',
  tagline: 'An optimizing compiler that infers the optimal algorithm from your intent - and formally verifies correctness.',
  description: [
    'Parses intent keywords (group, order, take) → selects optimal algorithm (heap vs sort, BFS vs Dijkstra, Kadane)',
    'Three execution backends: interpreted Python, Numba JIT, native C++ with LLVM',
    'Automatic backend selection based on problem size with property-based testing',
    '115 test cases verify every optimization against naive baseline for correctness guarantees'
  ],
  insight: 'The innovation isn\'t one clever optimization - it\'s a repeatable framework for algorithmic selection. TOP_K selection happens at parse time (syntax-driven). BFS vs Dijkstra happens at runtime (graph structure inspection). Kadane detection happens from objective analysis (maximize + contiguous). Three structurally different decisions across three algorithm families, all automatically verified. It\'s proof that intent-level programming can outperform hand-coded solutions while guaranteeing correctness.',
  metrics: [
    { value: '3', label: 'Backends' },
    { value: '115', label: 'Tests' },
    { value: '5x', label: 'Speedup' },
    { value: 'Verified', label: 'Correct' }
  ],
  tags: ['Compiler', 'Python', 'C++', 'LLVM', 'Numba JIT'],
  links: [
    { label: 'Try in Browser', href: LINKS.rune },
    { label: 'GitHub', href: GH('rune') }
  ],
  media: { type: 'video', src: '/projects/rune recording.mp4' }
}, {
  name: 'IITR Nexus',
  tagline: 'Unified campus intelligence - one query routes across academics, library, dining, events, and notices via parallel MCP retrieval.',
  description: [
    'Routes single query across 10+ campus systems using multiple MCP servers in parallel',
    'Intent classification determines which servers to query, confidence scoring ensures grounded responses',
    'Surfaces source when uncertain instead of guessing, reasoning panel visible to users',
    'Groq Llama 3.3 70B for intent detection with fallback handling when confidence drops'
  ],
  insight: 'Intent classification before routing reduces wrong-server queries significantly. The hallucination resistance mechanism is the key design choice - when confidence drops below threshold, the system returns a source reference instead of synthesizing an answer, preserving trust at the cost of convenience.',
  metrics: [
    { value: '5+', label: 'Data sources' },
    { value: 'MCP', label: 'Architecture' },
    { value: 'Parallel', label: 'Retrieval' },
    { value: 'Grounded', label: 'Responses' }
  ],
  tags: ['Education', 'MCP', 'Next.js', 'Groq Llama', 'TypeScript'],
  links: [{ label: 'GitHub', href: GH('IITRNEXUS') }],
  media: { type: 'video', src: '/projects/iitr nexus recording.mp4' }
}, {
  name: 'Canopy',
  tagline: 'Repo dependency visualization - parses Python and JS/TS imports via the GitHub API. No cloning. No local setup.',
  description: [
    'Parses Python and JS/TS imports directly from GitHub - no cloning, no local execution',
    'Builds interactive React Flow dependency graph with Gemini-generated module summaries',
    'MD5 caching prevents redundant parses, dark forest UI for extended analysis sessions',
    'Handles TypeScript path aliases, Python relative imports, dynamic requires'
  ],
  insight: 'Parsing imports without executing code requires careful alias resolution - TypeScript path aliases, Python relative imports, and dynamic requires all break naive string matching. The parser handles edge cases before graph construction, because a dependency graph with silent resolution failures is worse than none.',
  metrics: [
    { value: '2', label: 'Languages' },
    { value: '0', label: 'Clones' },
    { value: 'MD5', label: 'Cache' },
    { value: 'AI', label: 'Summaries' }
  ],
  tags: ['Developer Tools', 'React Flow', 'GitHub API', 'Gemini API', 'Next.js'],
  links: [
    { label: 'Live App', href: 'https://canopy-gdsc-iitr.vercel.app/' },
    { label: 'GitHub', href: 'https://github.com/tharun99856/CANOPY-GDSC-IITR' }
  ],
  media: { type: 'video', src: '/projects/canopy recording.mp4' }
}];

// Note: AI_BUILDS, DEV_TOOLS, UX_WORK, RESEARCH, EXPERIENCE, EDUCATION, SKILLS, SKILL_GROUPS
// are defined inline in page.tsx due to length - would need separate import for full extraction
