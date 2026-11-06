'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

// Inertial smooth scrolling (Lenis) plus slow reveals: anything marked
// [data-reveal] fades and rises into view the first time it enters the screen.
export default function SmoothScroll() {
  const lenis = useRef(null);
  const path = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = new Lenis({ duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.85, touchMultiplier: 1.2 });
    lenis.current = l;
    let raf = 0;
    const loop = (t) => { l.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const pause = () => l.stop(), resume = () => l.start();
    window.addEventListener('archivist:lock', pause);
    window.addEventListener('archivist:unlock', resume);
    return () => { cancelAnimationFrame(raf); l.destroy(); window.removeEventListener('archivist:lock', pause); window.removeEventListener('archivist:unlock', resume); };
  }, []);

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
    const els = [...document.querySelectorAll('[data-reveal]:not(.is-in)')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return null;
}
