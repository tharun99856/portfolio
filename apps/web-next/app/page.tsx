import Link from 'next/link'
import { HERO } from '@/lib/content'
import { DIVISIONS, itemsIn, divisionEdges, READOUTS } from '@/lib/records'
import { CONTACT } from '@/lib/content'
import Constellation from '@/components/crt/Constellation'
import DitherImage from '@/components/crt/DitherImage'
import AskKey from '@/components/crt/AskKey'

const AREAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const clip = (s: string, n = 96) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s)

export default function Hub() {
  const nodes = DIVISIONS.map((d, i) => {
    const items = d.unit ? itemsIn(d.slug) : []
    return {
      id: `/${d.slug}`,
      href: `/${d.slug}`,
      area: AREAS[i],
      title: d.name,
      kicker: d.unit ? `${items.length} ${items.length === 1 ? d.unit : (d.units || `${d.unit}s`)}` : d.slug === 'about' ? 'Bio · education · skills' : CONTACT.email,
      sub: d.unit ? clip(items.map((it) => it.kind === 'role' ? it.company : it.title.split(':')[0].split(' - ')[0]).join(' · ')) : d.intro
    }
  })

  return (
    <main id="main" className="hub">
      <section className="wrap hub-intro">
        <h1 className="emboss hub-name" data-reveal>{HERO.name}</h1>
        <p className="hub-role" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
          {HERO.title} <span>/</span> {HERO.subtitle}
        </p>
        <p className="hub-desc" data-reveal style={{ '--d': '220ms' } as React.CSSProperties}>{HERO.description}</p>
      </section>

      <section className="wrap" aria-label="Map of the work">
        <p className="hint" data-reveal>Hover a box to see what links it to the rest. Click to open it.</p>
        <div data-reveal style={{ '--d': '160ms' } as React.CSSProperties}>
          <Constellation
            variant="hub"
            spokes
            nodes={nodes}
            edges={divisionEdges()}
            centerLabel="Portrait of Tharun Rathod"
            center={
              <div className="core core-rect">
                <DitherImage src="/main%20image.jpeg" alt="Portrait of Tharun Rathod, rendered as an amber dithered image" sample={440} ratio="16 / 9" />
              </div>
            }
          />
        </div>
      </section>

      <section className="wrap hub-foot">
        <dl className="readouts" data-reveal>
          {READOUTS.map((s) => <div key={s.label} className="lcd"><b>{s.value}</b><span>{s.label}</span></div>)}
        </dl>
        <div className="hero-keys" data-reveal>
          <AskKey className="key amber">Ask the Archivist <small>/</small></AskKey>
          <Link className="key" href="/contact">Get in touch</Link>
        </div>
      </section>
    </main>
  )
}
