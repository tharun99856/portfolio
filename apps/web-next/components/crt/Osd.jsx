'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DIVISIONS } from '@/lib/records';
import { openArchivist } from './archivist-bus';

// On-screen display: each division is a channel; ▲/▼ flips through them.
export default function Osd() {
  const path = usePathname() || '/';
  const router = useRouter();
  const seg = path.split('/')[1] || '';
  const idx = DIVISIONS.findIndex((d) => d.slug === seg);
  const cur = idx >= 0 ? DIVISIONS[idx] : null;
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFlash(true), 0);
    const t2 = setTimeout(() => setFlash(false), 420);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [seg]);

  const step = (dir) => {
    const n = DIVISIONS.length;
    const next = idx < 0 ? (dir > 0 ? 0 : n - 1) : (idx + dir + n) % n;
    router.push(`/${DIVISIONS[next].slug}`);
  };

  return (
    <header className="osd">
      <Link href="/" className="osd-plate deboss" aria-label="Tharun Rathod, back to the map">THARUN RATHOD</Link>
      <div className="osd-tuner">
        <button type="button" className="knob knob-round sm" onClick={() => step(-1)} aria-label="Previous channel">▲</button>
        <p className={`osd-ch ${flash ? 'is-flash' : ''}`} aria-live="polite">
          {cur ? <><span>CH {cur.ch}</span> {cur.short.toUpperCase()}</> : <><span>CH 00</span> MAP</>}
        </p>
        <button type="button" className="knob knob-round sm" onClick={() => step(1)} aria-label="Next channel">▼</button>
      </div>
      <nav className="osd-nav" aria-label="Divisions">
        {DIVISIONS.map((d) => (
          <Link key={d.slug} href={`/${d.slug}`} aria-current={seg === d.slug ? 'page' : undefined}>{d.short}</Link>
        ))}
      </nav>
      <div className="osd-knobs">
        <button type="button" className="knob" onClick={() => openArchivist()} aria-haspopup="dialog">
          Ask the Archivist <kbd aria-hidden="true">/</kbd>
        </button>
        <button type="button" className="knob knob-round" onClick={() => window.dispatchEvent(new Event('crt:degauss'))} title="Degauss the screen" aria-label="Degauss the screen">⦿</button>
      </div>
    </header>
  );
}
