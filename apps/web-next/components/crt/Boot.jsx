'use client';

import { useEffect } from 'react';

// CRT power-on: a bright line opens into the picture, once per session.
// Built imperatively so returning visitors never get a flash of the overlay.
export default function Boot() {
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('crt-booted') === '1'; sessionStorage.setItem('crt-booted', '1'); } catch { /* storage blocked */ }
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = document.createElement('div');
    el.className = 'boot';
    el.setAttribute('aria-hidden', 'true');
    el.appendChild(document.createElement('i'));
    document.body.appendChild(el);
    const t1 = setTimeout(() => window.dispatchEvent(new Event('crt:degauss')), 650);
    const t2 = setTimeout(() => el.remove(), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); el.remove(); };
  }, []);
  return null;
}
