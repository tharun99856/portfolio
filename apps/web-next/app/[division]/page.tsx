import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { COLLECTIONS, DIVISIONS, division, itemsIn, itemEdges, topAreas } from '@/lib/records'
import Constellation from '@/components/crt/Constellation'
import { Crumbs, StepNav } from '@/components/crt/Parts'

export function generateStaticParams() {
  return COLLECTIONS.map((d) => ({ division: d.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ division: string }> }): Promise<Metadata> {
  const { division: slug } = await params
  const d = division(slug)
  return d ? { title: `${d.name} | Tharun Rathod`, description: d.intro, alternates: { canonical: `/${slug}` } } : {}
}

const clip = (s: string, n = 120) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s)

export default async function DivisionPage({ params }: { params: Promise<{ division: string }> }) {
  const { division: slug } = await params
  const d = division(slug)
  if (!d || !d.unit) notFound()
  const items = itemsIn(d.slug)
  const idx = DIVISIONS.findIndex((x) => x.slug === d.slug)
  const prev = DIVISIONS[(idx - 1 + DIVISIONS.length) % DIVISIONS.length]
  const next = DIVISIONS[(idx + 1) % DIVISIONS.length]

  const nodes = items.map((it) => ({
    id: it.href,
    href: it.href,
    title: it.kind === 'paper' ? it.title.split(':')[0] : it.title.split(' - ')[0],
    kicker: it.kind === 'role' ? it.sub : it.areas.slice(0, 2).join(' · '),
    sub: it.kind === 'role' ? clip(it.description, 110) : it.kind === 'paper' ? clip(it.description, 110) : clip(it.sub, 120)
  }))

  return (
    <main id="main" className="page">
      <header className="wrap page-head">
        <Crumbs trail={[{ label: 'Map', href: '/' }, { label: d.name }]} />
        <h1 className="emboss page-title" data-reveal>{d.name}</h1>
        <p className="page-intro" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>{d.intro}</p>
        <ul className="tags" aria-label="Skill areas in this division" data-reveal style={{ '--d': '200ms' } as React.CSSProperties}>
          {topAreas(d.slug).map((a) => <li key={a}>{a}</li>)}
        </ul>
      </header>

      <section className="wrap" aria-label={`${d.name}: connected items`}>
        <p className="hint" data-reveal>Lines show shared skill areas. Hover to trace them, click to open.</p>
        <div data-reveal style={{ '--d': '160ms' } as React.CSSProperties}>
          <Constellation variant="list" nodes={nodes} edges={itemEdges(items)} />
        </div>
      </section>

      <div className="wrap">
        <StepNav prev={{ href: `/${prev.slug}`, title: prev.name }} next={{ href: `/${next.slug}`, title: next.name }} />
      </div>
    </main>
  )
}
