'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ARCHIVIST_EVENT } from './archivist-bus';

const SUGGESTIONS = [
  'What is the Compliance Paradox?',
  'What did Tharun build at Edcore?',
  'Which results were simulated?',
  'What was the role at R.K. IntelliServe?',
  'Where did Tharun study?'
];

/* "[WK-01]" → link to the section on this page. */
function Answer({ text, citations, onGo }) {
  const byId = Object.fromEntries((citations || []).map((c) => [c.id, c]));
  return text.split(/(\[[A-Z]{2,7}(?:-[A-Z0-9]{1,3})?\])/g).map((p, i) => {
    const m = p.match(/^\[(.+)\]$/);
    if (m && byId[m[1]]) return <Link key={i} className="cite" href={byId[m[1]].href} title={byId[m[1]].title} onClick={onGo}>{m[1]}</Link>;
    return <span key={i}>{p}</span>;
  });
}

export default function Archivist() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const returnFocus = useRef(null);

  const ask = useCallback(async (question) => {
    const q = (question || '').trim();
    if (!q || busy) return;
    setDraft('');
    setBusy(true);
    const history = log.flatMap((t) => [{ role: 'user', content: t.q }, ...(t.a ? [{ role: 'assistant', content: t.a.answer }] : [])]);
    setLog((l) => [...l, { q, a: null }]);
    let a;
    try {
      const res = await fetch('/api/archivist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q, history }) });
      a = await res.json();
      if (!a.answer) a = { answer: a.error || 'NO RESPONSE.', citations: [], mode: 'index' };
    } catch {
      a = { answer: 'CARRIER LOST. The Archivist is unreachable right now. Try again shortly.', citations: [], mode: 'index' };
    }
    setLog((l) => l.map((t, i) => (i === l.length - 1 ? { ...t, a } : t)));
    setBusy(false);
  }, [busy, log]);

  useEffect(() => {
    const onOpen = (e) => {
      returnFocus.current = document.activeElement;
      setOpen(true);
      const q = e.detail?.question;
      if (q) setTimeout(() => ask(q), 0);
    };
    const onKey = (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;
      if (e.key === '/' && !typing && !open) { e.preventDefault(); returnFocus.current = document.activeElement; setOpen(true); }
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener(ARCHIVIST_EVENT, onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener(ARCHIVIST_EVENT, onOpen); window.removeEventListener('keydown', onKey); };
  }, [open, ask]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else returnFocus.current?.focus?.();
  }, [open]);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' }); }, [log]);

  if (!open) return null;

  return (
    <>
      <div className="term-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className="term" role="dialog" aria-modal="true" aria-labelledby="term-title">
        <div className="term-bezel">
          <div className="term-head">
            <h2 id="term-title" className="deboss">THE ARCHIVIST</h2>
            <button type="button" className="knob knob-round" onClick={() => setOpen(false)} aria-label="Close the Archivist">×</button>
          </div>
          <div className="term-screen">
            <div className="term-log" ref={logRef} aria-live="polite" data-lenis-prevent>
              <p className="term-sys">ARCHIVIST v1.0 · READS ONLY THIS PORTFOLIO · CITES EVERY SOURCE · SAYS SO WHEN IT DOESN&rsquo;T KNOW</p>
              {log.length === 0 && (
                <ul className="term-sugg">
                  {SUGGESTIONS.map((s) => <li key={s}><button type="button" onClick={() => ask(s)}>&gt; {s}</button></li>)}
                </ul>
              )}
              {log.map((t, i) => (
                <div key={i} className="term-turn">
                  <p className="term-q"><span>YOU&gt;</span> {t.q}</p>
                  <div className="term-a">
                    {t.a ? <Answer text={t.a.answer} citations={t.a.citations} onGo={() => setOpen(false)} /> : <span className="cursor-blink">SEARCHING THE RECORD</span>}
                  </div>
                  {t.a?.citations?.length > 0 && (
                    <p className="term-cites">SOURCES: {t.a.citations.map((c) => <Link key={c.id} href={c.href} onClick={() => setOpen(false)}>{c.title}</Link>)}</p>
                  )}
                </div>
              ))}
            </div>
            <form className="term-form" onSubmit={(e) => { e.preventDefault(); ask(draft); }}>
              <label htmlFor="term-input">ASK&gt;</label>
              <input id="term-input" ref={inputRef} value={draft} maxLength={600} autoComplete="off"
                placeholder="a project, a paper, a role…" onChange={(e) => setDraft(e.target.value)} />
              <button type="submit" disabled={busy || !draft.trim()}>SEND</button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
