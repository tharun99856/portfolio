import type { Metadata } from 'next'
import { ABOUT, EDUCATION, SKILL_GROUPS } from '@/lib/content'
import { DOMAINS } from '@/lib/portfolio-data'
import DitherImage from '@/components/crt/DitherImage'
import { Bezel, Crumbs, StepNav, Tags, href } from '@/components/crt/Parts'

export const metadata: Metadata = {
  title: 'About | Tharun Rathod',
  description: ABOUT.lead,
  alternates: { canonical: '/about' }
}

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export default function About() {
  return (
    <main id="main" className="page">
      <header className="wrap page-head">
        <Crumbs trail={[{ label: 'Map', href: '/' }, { label: 'About' }]} />
        <h1 className="emboss page-title" data-reveal>About</h1>
      </header>

      <section className="wrap about">
        <div data-reveal>
          <Bezel>
            <DitherImage src="/tharun-rathod-portrait.jpeg" alt="Tharun Rathod, product engineer and AI researcher at IIT Roorkee" sample={300} palette={['#02080a', '#0d3f4a', '#2fa7bb', '#c6f6ff']} />
          </Bezel>
        </div>
        <div>
          <p className="about-lead" data-reveal>{ABOUT.lead}</p>
          <p className="about-body" data-reveal style={delay(120)}>{ABOUT.body}</p>
          <div data-reveal style={delay(180)}><Tags items={DOMAINS} label="Domains" /></div>
        </div>
      </section>

      <section className="wrap sub-sec" aria-labelledby="edu-h">
        <h2 id="edu-h" className="emboss-sm" data-reveal>Education</h2>
        <div className="edu">
          {EDUCATION.map((e, i) => (
            <article key={e.title} className="glass" data-reveal style={delay(i * 120)}>
              <img src={href(e.image)} alt="" loading="lazy" decoding="async" />
              <div>
                <p className="label-vt">{e.period}</p>
                <h3 className="emboss-sm">{e.title}</h3>
                <p className="school">{e.school}</p>
                <p>{e.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sub-sec" aria-labelledby="skills-h">
        <h2 id="skills-h" className="emboss-sm" data-reveal>Skills</h2>
        <dl className="skills">
          {SKILL_GROUPS.map((g) => <div key={g.label} data-reveal><dt>{g.label}</dt><dd>{g.items.join(' · ')}</dd></div>)}
        </dl>
      </section>

      <div className="wrap">
        <StepNav prev={{ href: '/experience', title: 'Experience' }} next={{ href: '/contact', title: 'Contact' }} />
      </div>
    </main>
  )
}
