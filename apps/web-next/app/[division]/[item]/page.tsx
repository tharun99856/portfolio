import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ITEMS, division, item as getItem, itemsIn, relatedTo } from '@/lib/records'
import Constellation from '@/components/crt/Constellation'
import { Crumbs, Keys, Media, StepNav, Tags } from '@/components/crt/Parts'

export function generateStaticParams() {
  return ITEMS.map((it) => ({ division: it.division, item: it.slug }))
}
export const dynamicParams = false

type Params = { params: Promise<{ division: string; item: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { division: d, item: s } = await params
  const it = getItem(d, s)
  return it ? { title: `${it.title} | Tharun Rathod`, description: it.sub } : {}
}

const sentences = (t: string) => t.split(/(?<=[.!?])\s+(?=[A-Z])/).filter(Boolean)
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default async function ItemPage({ params }: Params) {
  const { division: dSlug, item: iSlug } = await params
  const it = getItem(dSlug, iSlug)
  const d = division(dSlug)
  if (!it || !d) notFound()

  const siblings = itemsIn(d.slug)
  const i = siblings.findIndex((x) => x.href === it.href)
  const prev = siblings[i - 1]
  const next = siblings[i + 1]
  const related = relatedTo(it)

  return (
    <main id="main" className="page">
      <header className="wrap page-head">
        <Crumbs trail={[{ label: 'Map', href: '/' }, { label: d.name, href: `/${d.slug}` }, { label: it.kind === 'role' ? it.company : it.title.split(':')[0].split(' - ')[0] }]} />
        {it.kind === 'role' && <p className="label-vt" data-reveal>{it.period}</p>}
        <h1 className="emboss page-title is-item" data-reveal>{it.title}</h1>
        <p className="page-intro" data-reveal style={delay(120)}>{it.kind === 'role' ? it.company : it.kind === 'paper' ? it.meta : it.sub}</p>
      </header>

      <article className="wrap detail">
        {it.kind === 'work' && (
          <div className={`detail-grid${it.media ? '' : ' no-media'}`}>
            {it.media && <div className="detail-media" data-reveal><Media media={it.media} title={it.title} /></div>}
            <div className="detail-body">
              {it.apps && <p className="label-vt" data-reveal>{it.apps}</p>}
              {it.bullets.filter((b) => b !== it.sub).length > 0 && (
                <ul className="bullets" data-reveal>{it.bullets.filter((b) => b !== it.sub).map((b) => <li key={b}>{b}</li>)}</ul>
              )}
              {it.metrics.length > 0 && (
                <dl className="metrics" data-reveal>{it.metrics.map((m) => <div key={m.label} className="lcd"><b>{m.value}</b><span>{m.label}</span></div>)}</dl>
              )}
              {it.insight && (
                <section className="panel-note glass" data-reveal>
                  <h2 className="emboss-sm">Engineering note</h2>
                  <p>{it.insight}</p>
                </section>
              )}
              {it.highlights.length > 0 && (
                <section className="panel-note glass" data-reveal>
                  <h2 className="emboss-sm">Details</h2>
                  <ul className="bullets">{it.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                </section>
              )}
              {it.rows && (
                <section className="panel-note glass" data-reveal>
                  <h2 className="emboss-sm">The teardown</h2>
                  <table className="battle"><tbody>{it.rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody></table>
                  {it.closing && <p style={{ marginTop: 14 }}>{it.closing}</p>}
                </section>
              )}
              <div data-reveal><Tags items={it.tags} /><Keys links={it.links} /></div>
            </div>
          </div>
        )}

        {it.kind === 'paper' && (
          <div className="detail-text">
            <p className="lede" data-reveal>{it.description}</p>
            {it.finding && <p className="finding" data-reveal><b>Finding</b>{it.finding}</p>}
            <div data-reveal><Tags items={it.tags} label="Topics" /><Keys links={it.links} /></div>
          </div>
        )}

        {it.kind === 'role' && (
          <div className="detail-text">
            <ul className="bullets big" data-reveal>{sentences(it.description).map((s) => <li key={s}>{s}</li>)}</ul>
            <div data-reveal><Tags items={it.tags} label="Skills" /></div>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="wrap related" aria-labelledby="rel-h">
          <h2 id="rel-h" className="emboss-sm" data-reveal>Connected work</h2>
          <p className="hint" data-reveal>Linked by shared tools and skill areas. Hover a box to see the link.</p>
          <div data-reveal style={delay(140)}>
            <Constellation
              variant="orbit"
              nodes={related.map((r, k) => ({
                id: r.item.href, href: r.item.href, area: ['a', 'b', 'c', 'd', 'e', 'f'][k],
                title: r.item.kind === 'role' ? r.item.company : r.item.title.split(':')[0].split(' - ')[0],
                kicker: division(r.item.division)!.name
              }))}
              edges={related.map((r) => ({ a: '__center', b: r.item.href, label: r.label }))}
              centerLabel={it.title}
              center={<div className="core core-text"><span className="emboss-sm">{it.kind === 'role' ? it.company : it.title.split(':')[0].split(' - ')[0]}</span></div>}
            />
          </div>
        </section>
      )}

      <div className="wrap">
        <StepNav
          prev={prev ? { href: prev.href, title: prev.kind === 'role' ? prev.company : prev.title.split(':')[0].split(' - ')[0] } : { href: `/${d.slug}`, title: `All ${d.name}` }}
          next={next ? { href: next.href, title: next.kind === 'role' ? next.company : next.title.split(':')[0].split(' - ')[0] } : { href: `/${d.slug}`, title: `All ${d.name}` }}
        />
      </div>
    </main>
  )
}
