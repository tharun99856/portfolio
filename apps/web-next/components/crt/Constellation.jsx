'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Wire from './Wire';

// Boxes laid out by CSS grid; links drawn as curves between their centres in an
// SVG underneath. Hovering or focusing a box switches it — and every box it is
// linked to — into wireframe, and lights the links with what they share.

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Constellation({ nodes, edges, center = null, centerLabel, variant = 'grid', spokes = false }) {
  const wrap = useRef(null);
  const refs = useRef({});
  const [pos, setPos] = useState({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(null);

  const measure = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    const base = el.getBoundingClientRect();
    const next = {};
    Object.entries(refs.current).forEach(([id, node]) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      next[id] = { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2, w: r.width, h: r.height };
    });
    setPos(next);
    setSize({ w: base.width, h: base.height });
  }, []);

  useIso(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const allEdges = [
    ...(spokes && center ? nodes.map((n) => ({ a: '__center', b: n.id, label: '', spoke: true })) : []),
    ...edges
  ];
  const linked = new Set();
  if (active) allEdges.forEach((e) => { if (e.a === active) linked.add(e.b); if (e.b === active) linked.add(e.a); });

  const curve = (a, b, i) => {
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const bend = (i % 2 ? 1 : -1) * Math.min(60, len * 0.12);
    const cx = mx - (dy / len) * bend, cy = my + (dx / len) * bend;
    return { d: `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`, lx: 0.25 * a.x + 0.5 * cx + 0.25 * b.x, ly: 0.25 * a.y + 0.5 * cy + 0.25 * b.y };
  };

  const on = (id) => ({ onMouseEnter: () => setActive(id), onMouseLeave: () => setActive(null), onFocus: () => setActive(id), onBlur: () => setActive(null) });

  return (
    <div className={`cst cst-${variant}${active ? ' has-active' : ''}`} ref={wrap}>
      <svg className="cst-svg" width={size.w} height={size.h} aria-hidden="true">
        {allEdges.map((e, i) => {
          const a = pos[e.a], b = pos[e.b];
          if (!a || !b) return null;
          const c = curve(a, b, i);
          const hot = active && (e.a === active || e.b === active);
          return (
            <g key={`${e.a}-${e.b}`} className={`cst-edge${hot ? ' is-hot' : ''}${e.spoke ? ' is-spoke' : ''}`}>
              <path d={c.d} />
              {hot && <circle cx={a.x} cy={a.y} r="4" />}
              {hot && <circle cx={b.x} cy={b.y} r="4" />}
            </g>
          );
        })}
      </svg>

      <div className="cst-labels" aria-hidden="true">
        {allEdges.map((e, i) => {
          const a = pos[e.a], b = pos[e.b];
          if (!a || !b || !e.label || !active || (e.a !== active && e.b !== active)) return null;
          const c = curve(a, b, i);
          return <span key={`l-${e.a}-${e.b}`} className="cst-label" style={{ left: c.lx, top: c.ly }}>{e.label}</span>;
        })}
      </div>

      <div className="cst-grid">
        {center && (
          <div className={`cst-core${active ? ' is-dim' : ''}`} ref={(el) => { refs.current.__center = el; }} aria-label={centerLabel}>
            {center}
          </div>
        )}
        {nodes.map((n, i) => {
          const state = active === n.id ? ' is-active' : linked.has(n.id) ? ' is-linked' : active ? ' is-dim' : '';
          return (
            <Link
              key={n.id} href={n.href} ref={(el) => { refs.current[n.id] = el; }}
              className={`node${state}`} style={{ gridArea: n.area, '--i': i }}
              {...on(n.id)}
            >
              {n.kicker && <span className="node-kicker">{n.kicker}</span>}
              <span className="node-title"><Wire>{n.title}</Wire></span>
              {n.sub && <span className="node-sub">{n.sub}</span>}
              {n.foot && <span className="node-foot">{n.foot}</span>}
              <span className="node-go" aria-hidden="true">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
