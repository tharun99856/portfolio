// Lets any component open the Archivist (optionally with a question).
export const ARCHIVIST_EVENT = 'archivist:open';

export function openArchivist(question) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ARCHIVIST_EVENT, { detail: { question } }));
}
