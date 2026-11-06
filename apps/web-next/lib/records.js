// Normalises the raw portfolio copy (content.js + portfolio-data.js) into
// divisions and items, and derives the connections drawn between them.
// Connections come only from the tags already on each item: two items are
// linked when their tags fall into the same skill area.

import { FLAGSHIP, STATS, LINKS, RESUMES } from './portfolio-data';
import { AI_BUILDS, DEV_TOOLS, UX_WORK, RESEARCH, EXPERIENCE, EDUCATION, SECTION_INTROS, CONTACT, HERO } from './content';

const slugify = (s) => {
  const full = s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (full.length <= 48) return full;
  const cut = full.slice(0, 48);
  return cut.slice(0, cut.lastIndexOf('-'));
};
const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);

/* ---------------------------------------------------------------- skill areas */
export const AREAS = {
  'AI & LLMs': ['ai', 'groq', 'gemini', 'llm', 'mcp', 'transformers', 'multimodal ai', 'emotion recognition', 'ai research', 'behavioral ai', 'code generation', 'llm-as-judge', 'llm evaluation'],
  'Data & ML': ['python', 'xgboost', 'shap', 'pandas', 'streamlit', 'statistical analysis', 'ml pipelines', 'numba jit', 'arc elasticity', 'excel', 'analytics', 'airflow', 'dag orchestration'],
  'Full-stack web': ['next.js', 'react', 'node.js', 'typescript', 'full-stack', 'mean stack', 'fastapi', 'api design', 'performance'],
  'Databases & auth': ['mongodb', 'postgresql', 'prisma', 'sqlite', 'nextauth'],
  'Systems & compilers': ['compiler', 'c++', 'llvm', 'developer tools', 'github api', 'raspberry pi', 'react flow'],
  'Product strategy': ['product strategy', 'consumer research', 'market analysis', 'business case', 'product teardown', 'retention strategy', 'metrics design', 'product ownership', 'user acquisition', 'startup', 'competitive analysis', 'stakeholder docs', 'stakeholder comms', 'client integration', 'fmcg'],
  'UX & behaviour': ['ux', 'figma', 'behavioral design', 'behavioral economics', 'consumer apps', 'ux battle'],
  'Research methods': ['experimental design', 'academic writing', 'llm-as-judge', 'statistical analysis', 'linguistics', 'indo-european studies', 'llm evaluation']
};
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const MATCHERS = Object.entries(AREAS).map(([area, keys]) => [area, keys.map((k) => new RegExp(`(^|[^a-z])${esc(k)}([^a-z+]|$)`))]);
export const areasOf = (tags) => {
  const out = new Set();
  tags.map((t) => t.toLowerCase()).forEach((t) => MATCHERS.forEach(([area, res]) => { if (res.some((re) => re.test(t))) out.add(area); }));
  return [...out];
};

/* ---------------------------------------------------------------- divisions */
export const DIVISIONS = [
  { slug: 'flagship', ch: '01', name: 'Flagship builds', short: 'Flagship', unit: 'build', intro: SECTION_INTROS.projects },
  { slug: 'ai-ml', ch: '02', name: 'AI & ML', short: 'AI & ML', unit: 'project', intro: SECTION_INTROS.ai },
  { slug: 'systems', ch: '03', name: 'Systems & tools', short: 'Systems', unit: 'tool', intro: 'Enterprise systems, travel and planning tools, and pricing analytics.' },
  { slug: 'product-studies', ch: '04', name: 'Product studies', short: 'Studies', unit: 'study', units: 'studies', intro: SECTION_INTROS.ux },
  { slug: 'research', ch: '05', name: 'Research papers', short: 'Research', unit: 'paper', intro: SECTION_INTROS.research },
  { slug: 'experience', ch: '06', name: 'Experience', short: 'Experience', unit: 'role', intro: 'Founder, researcher, forward deployed engineer and intern.' },
  { slug: 'about', ch: '07', name: 'About', short: 'About', unit: null, intro: HERO.subtitle },
  { slug: 'contact', ch: '08', name: 'Contact', short: 'Contact', unit: null, intro: `Email, résumés and profiles. ${CONTACT.locations}.` }
];
export const COLLECTIONS = DIVISIONS.filter((d) => d.unit);
export const division = (slug) => DIVISIONS.find((d) => d.slug === slug);

/* ---------------------------------------------------------------- items */
const work = (p, div) => {
  const title = p.name || p.title;
  const slug = slugify(title.split(' - ')[0]);
  return {
    kind: 'work', division: div, slug, href: `/${div}/${slug}`, title,
    sub: p.tagline || p.intro || arr(p.description)[0] || '',
    bullets: arr(p.description), insight: p.insight || null, highlights: arr(p.highlights),
    metrics: p.metrics || [], tags: p.tags || [], links: p.links || [], media: p.media || null,
    rows: p.rows || null, closing: p.closing || null, apps: p.apps || null
  };
};

const ITEMS_RAW = [
  ...FLAGSHIP.map((p) => work(p, 'flagship')),
  ...AI_BUILDS.map((p) => work(p, 'ai-ml')),
  ...DEV_TOOLS.map((p) => work(p, 'systems')),
  ...UX_WORK.map((p) => work(p, 'product-studies')),
  ...RESEARCH.map((r) => {
    const slug = slugify(r.title.split(':')[0]);
    return { kind: 'paper', division: 'research', slug, href: `/research/${slug}`, title: r.title, sub: r.meta, meta: r.meta, description: r.description, finding: r.finding || null, tags: r.tags, links: r.links };
  }),
  ...EXPERIENCE.map((e) => {
    const slug = slugify(`${e.company}`);
    return { kind: 'role', division: 'experience', slug, href: `/experience/${slug}`, title: e.role, sub: `${e.company} · ${e.period}`, company: e.company, period: e.period, description: e.description, tags: e.tags };
  })
];

let n = 0;
export const ITEMS = ITEMS_RAW.map((it) => ({ ...it, code: `REC-${String(++n).padStart(2, '0')}`, areas: areasOf(it.tags) }));
export const itemsIn = (div) => ITEMS.filter((i) => i.division === div);
export const item = (div, slug) => ITEMS.find((i) => i.division === div && i.slug === slug);

/* ---------------------------------------------------------------- connections */
// Rarer areas first, so a link reads "AI & LLMs" before the ubiquitous "Full-stack web".
const AREA_FREQ = {};
ITEMS.forEach((it) => it.areas.forEach((a) => { AREA_FREQ[a] = (AREA_FREQ[a] || 0) + 1; }));
const byRarity = (x, y) => (AREA_FREQ[x] || 0) - (AREA_FREQ[y] || 0);
const shared = (a, b) => a.areas.filter((x) => b.areas.includes(x)).sort(byRarity);
const sharedTags = (a, b) => {
  const bt = new Set(b.tags.map((t) => t.toLowerCase()));
  return a.tags.filter((t) => bt.has(t.toLowerCase()));
};

/** Edges among a set of items: any shared skill area. */
export function itemEdges(items) {
  const edges = [];
  items.forEach((a, i) => items.slice(i + 1).forEach((b) => {
    const s = shared(a, b);
    if (s.length) edges.push({ a: a.href, b: b.href, label: s.slice(0, 2).join(' · '), weight: s.length });
  }));
  return edges;
}

/** Items in the same division most related to `it` (no cross-division links). */
export function relatedTo(it, k = 6) {
  return ITEMS.filter((o) => o.href !== it.href && o.division === it.division)
    .map((o) => ({ o, s: shared(it, o), t: sharedTags(it, o) }))
    .filter((x) => x.s.length || x.t.length)
    .sort((x, y) => (y.s.length + y.t.length * 2) - (x.s.length + x.t.length * 2))
    .slice(0, k)
    .map(({ o, s, t }) => ({ item: o, label: (t.length ? t : s).slice(0, 2).join(' · ') }));
}

/** Skill areas per division (used for the division page's area tags). */
const divAreas = Object.fromEntries(COLLECTIONS.map((d) => {
  const counts = {};
  itemsIn(d.slug).forEach((it) => it.areas.forEach((a) => { counts[a] = (counts[a] || 0) + 1; }));
  return [d.slug, counts];
}));
export const topAreas = (div) => Object.entries(divAreas[div] || {}).sort((a, b) => b[1] - a[1]).map(([a]) => a);

export const READOUTS = STATS;
export const SCHOOLING = EDUCATION;
export { LINKS, RESUMES };
