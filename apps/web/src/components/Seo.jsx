export default function Seo({ title = 'Portfolio' }) {
  if (typeof document !== 'undefined') document.title = title;
  return null;
}
