'use client';

import { useEffect, useRef, useState } from 'react';

// A project recording shown on a small CRT. Plays muted while on screen,
// pauses when scrolled away, and shows "NO SIGNAL" static until it starts.
export default function TubeVideo({ src, title }) {
  const ref = useRef(null);
  const [live, setLive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(rm);
    if (rm) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    }, { threshold: 0.45 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`tube ${live ? 'is-live' : ''}`}>
      <video
        ref={ref}
        src={encodeURI(src)}
        muted loop playsInline preload="none"
        controls={reduced}
        onPlaying={() => setLive(true)}
        aria-label={`Screen recording of ${title}`}
      />
      <div className="tube-static" aria-hidden="true"><span>NO SIGNAL</span></div>
      <div className="tube-glass" aria-hidden="true" />
    </div>
  );
}
