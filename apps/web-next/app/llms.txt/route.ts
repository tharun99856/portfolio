import { COLLECTIONS, ITEMS } from '@/lib/records'
import { RESUMES } from '@/lib/portfolio-data'
import { ENTITY_SUMMARY } from '@/lib/content'
import { SITE_ORIGIN, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site'

export const dynamic = 'force-static'

const label = (it: (typeof ITEMS)[number]) =>
  it.kind === 'role' ? `${it.title} at ${it.company} (${it.period})` : it.title.split(' - ')[0]

const lines = (kind: string) =>
  ITEMS.filter((it) => it.division === kind).map((it) => `- [${label(it)}](${SITE_ORIGIN}${it.href}): ${it.sub}`)

export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    ENTITY_SUMMARY,
    '',
    '## Sections',
    ...COLLECTIONS.map((d) => `- [${d.name}](${SITE_ORIGIN}/${d.slug}): ${d.intro}`),
    `- [About](${SITE_ORIGIN}/about)`,
    `- [Contact](${SITE_ORIGIN}/contact)`,
    '',
    '## Flagship builds',
    ...lines('flagship'),
    '',
    '## AI & ML projects',
    ...lines('ai-ml'),
    '',
    '## Systems & tools',
    ...lines('systems'),
    '',
    '## Product studies',
    ...lines('product-studies'),
    '',
    '## Research papers',
    ...lines('research'),
    '',
    '## Experience',
    ...lines('experience'),
    '',
    '## Resumes',
    ...RESUMES.map((r) => `- [${r.type}](${SITE_ORIGIN}${r.href}): ${r.description}`),
    ''
  ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
