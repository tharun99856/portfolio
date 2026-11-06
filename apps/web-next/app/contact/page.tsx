import type { Metadata } from 'next'
import { CONTACT, NAV_CONTACT_LINKS } from '@/lib/content'
import { LINKS, RESUMES } from '@/lib/portfolio-data'
import AskKey from '@/components/crt/AskKey'
import { Crumbs, StepNav } from '@/components/crt/Parts'

export const metadata: Metadata = { title: 'Contact | Tharun Rathod', description: CONTACT.lead }

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default function Contact() {
  const social = NAV_CONTACT_LINKS.filter((l) => l.href.startsWith('http'))
  return (
    <main id="main" className="page">
      <header className="wrap page-head">
        <Crumbs trail={[{ label: 'Map', href: '/' }, { label: 'Contact' }]} />
        <h1 className="emboss page-title contact-big" data-reveal>{CONTACT.heading}</h1>
        <p className="page-intro" data-reveal style={delay(120)}>{CONTACT.lead}</p>
        <p className="page-intro dim" data-reveal style={delay(180)}>{CONTACT.body}</p>
      </header>

      <section className="wrap">
        <a className="email" href={`mailto:${CONTACT.email}`} data-reveal>{CONTACT.email}</a>

        <h2 className="emboss-sm sub-title" data-reveal>{CONTACT.resumeHeading}</h2>
        <div className="resumes">
          {RESUMES.map((r, i) => (
            <a key={r.href} className="key" href={r.href} target="_blank" rel="noopener noreferrer" data-reveal style={delay(i * 100)}>
              <b>{r.type}</b><span>{r.description}</span><small>PDF ↗</small>
            </a>
          ))}
        </div>

        <h2 className="emboss-sm sub-title" data-reveal>{CONTACT.directLabel}</h2>
        <div className="links" data-reveal>
          {social.map((s) => <a key={s.href} className="key" href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>)}
          <a className="key" href={LINKS.zenodo} target="_blank" rel="noopener noreferrer">Zenodo ↗</a>
          <AskKey className="key amber">Ask the Archivist</AskKey>
        </div>

        <figure className="strip" data-reveal>
          <div className="tube"><img src={CONTACT.footerImage} alt="A browser tab strip with dozens of open tabs" loading="lazy" decoding="async" /></div>
        </figure>
        <p className="sign-off"><span>{CONTACT.copyright}</span><span>{CONTACT.locations}</span></p>
      </section>

      <div className="wrap">
        <StepNav prev={{ href: '/about', title: 'About' }} next={{ href: '/', title: 'Back to the map' }} />
      </div>
    </main>
  )
}
