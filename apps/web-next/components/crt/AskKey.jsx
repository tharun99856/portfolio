'use client';

import { openArchivist } from './archivist-bus';

export default function AskKey({ question, children, className = 'key' }) {
  return <button type="button" className={className} onClick={() => openArchivist(question)}>{children}</button>;
}
