'use client';

import { useEffect, useRef, useState } from 'react';

// Ordered (Bayer 8×8) dithering into a small phosphor palette, drawn on a
// low-resolution canvas and scaled up with crisp pixels. The cursor acts as a
// light: move it across the photo and the dither pattern re-resolves around it.

const BAYER = [
  0, 48, 12, 60, 3, 51, 15, 63, 32, 16, 44, 28, 35, 19, 47, 31,
  8, 56, 4, 52, 11, 59, 7, 55, 40, 24, 36, 20, 43, 27, 39, 23,
  2, 50, 14, 62, 1, 49, 13, 61, 34, 18, 46, 30, 33, 17, 45, 29,
  10, 58, 6, 54, 9, 57, 5, 53, 42, 26, 38, 22, 41, 25, 37, 21
].map((v) => (v + 0.5) / 64);

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

export default function DitherImage({ src, alt, sample = 300, palette = ['#0a0704', '#4a2f0c', '#b8791f', '#ffd38a'], ratio, className = '' }) {
  const canvasRef = useRef(null);
  const state = useRef({ lum: null, w: 0, h: 0, lx: 0.3, ly: 0.25, tl: 0, cur: 0, raf: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    let cancelled = false;
    img.onload = () => {
      if (cancelled) return;
      const w = sample;
      const h = Math.round((img.naturalHeight / img.naturalWidth) * w);
      const off = document.createElement('canvas');
      off.width = w; off.height = h;
      const ctx = off.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);
      const lum = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
      // auto-levels: stretch the 2nd–98th percentile to full range
      const sorted = Array.from(lum).sort((a, b) => a - b);
      const lo = sorted[Math.floor(sorted.length * 0.02)], hi = sorted[Math.floor(sorted.length * 0.98)];
      for (let i = 0; i < lum.length; i++) lum[i] = Math.min(1, Math.max(0, (lum[i] - lo) / Math.max(0.01, hi - lo)));
      const c = canvasRef.current;
      c.width = w; c.height = h;
      Object.assign(state.current, { lum, w, h });
      render();
      setReady(true);
    };
    const s = state.current;
    return () => { cancelled = true; cancelAnimationFrame(s.raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, sample]);

  function render() {
    const s = state.current;
    const c = canvasRef.current;
    if (!s.lum || !c) return;
    const ctx = c.getContext('2d');
    const out = ctx.createImageData(s.w, s.h);
    const pal = palette.map(hex);
    const steps = pal.length - 1;
    const aspect = s.w / s.h;
    for (let y = 0; y < s.h; y++) {
      for (let x = 0; x < s.w; x++) {
        const i = y * s.w + x;
        const dx = (x / s.w - s.lx) * aspect, dy = y / s.h - s.ly;
        const light = s.cur * 0.42 * Math.exp(-(dx * dx + dy * dy) * 9);
        let l = Math.min(1, Math.max(0, s.lum[i] * (0.92 + s.cur * 0.08) + light - 0.03));
        const v = l * steps;
        const base = Math.floor(v);
        const idx = Math.min(steps, base + ((v - base) > BAYER[(y & 7) * 8 + (x & 7)] ? 1 : 0));
        const col = pal[idx];
        out.data[i * 4] = col[0]; out.data[i * 4 + 1] = col[1]; out.data[i * 4 + 2] = col[2]; out.data[i * 4 + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  const animate = () => {
    const s = state.current;
    cancelAnimationFrame(s.raf);
    const step = () => {
      s.cur += (s.tl - s.cur) * 0.18;
      render();
      if (Math.abs(s.tl - s.cur) > 0.01) s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  };

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const s = state.current;
    s.lx = (e.clientX - r.left) / r.width;
    s.ly = (e.clientY - r.top) / r.height;
    s.tl = 1;
    if (Math.abs(s.tl - s.cur) <= 0.01) { cancelAnimationFrame(s.raf); s.raf = requestAnimationFrame(render); } else animate();
  };
  const onLeave = () => { state.current.tl = 0; animate(); };

  return (
    <figure className={`dither ${className}`} style={ratio ? { aspectRatio: ratio } : undefined} onPointerMove={onMove} onPointerLeave={onLeave}>
      <canvas ref={canvasRef} role="img" aria-label={alt} className={ready ? 'is-ready' : ''} />
    </figure>
  );
}
