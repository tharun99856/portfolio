import Link from 'next/link';
import TubeVideo from './TubeVideo';

const isExt = (h) => /^(https?:|mailto:)/.test(h);
export const href = (h) => (isExt(h) || h.includes('%') ? h : encodeURI(h));

export function Keys({ links, first = 'amber' }) {
  if (!links?.length) return null;
  return (
    <div className="links">
      {links.map((l, i) => (
        <a key={l.href} className={`key${i === 0 && first ? ` ${first}` : ''}`} href={href(l.href)}
          target={isExt(l.href) || l.href.endsWith('.pdf') ? '_blank' : undefined} rel="noopener noreferrer">
          {l.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

export function Tags({ items, label = 'Technologies' }) {
  if (!items?.length) return null;
  return <ul className="tags" aria-label={label}>{items.map((t) => <li key={t}>{t}</li>)}</ul>;
}

export function Bezel({ children, className = '' }) {
  return (
    <div className={`monitor ${className}`}>
      {children}
      <div className="monitor-foot" aria-hidden="true">
        <span className="monitor-grille"><i /><i /><i /><i /></span>
        <span className="led" />
      </div>
    </div>
  );
}

export function Media({ media, title }) {
  if (!media) return null;
  return (
    <Bezel>
      {media.type === 'video'
        ? <TubeVideo src={media.src} title={title} />
        : <div className="tube"><img src={href(media.src)} alt={`${title} screenshot`} loading="lazy" decoding="async" /></div>}
    </Bezel>
  );
}

export function Crumbs({ trail }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb" data-reveal>
      {trail.map((t, i) => (
        <span key={t.label}>
          {i > 0 && <span aria-hidden="true" className="crumb-sep">/</span>}
          {t.href ? <Link href={t.href}>{t.label}</Link> : <span aria-current="page">{t.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function StepNav({ prev, next }) {
  return (
    <nav className="stepnav" aria-label="More">
      {prev ? <Link href={prev.href} className="glass"><small>← Previous</small><b>{prev.title}</b></Link> : <span />}
      {next ? <Link href={next.href} className="glass is-next"><small>Next →</small><b>{next.title}</b></Link> : <span />}
    </nav>
  );
}
