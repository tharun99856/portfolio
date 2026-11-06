// Text that renders as a wireframe under the cursor.
// The solid (embossed) layer gets a hole cut where the cursor is; the wire layer
// (stroke outline + mesh fill + offset back face) shows only inside that hole.
// The cursor position is written by <WireLens/>, a single global listener.

export default function Wire({ as: Tag = 'span', children, className = '', id }) {
  const text = typeof children === 'string' ? children : '';
  return (
    <Tag className={`wt ${className}`} id={id}>
      <span className="wt-solid">{children}</span>
      <span className="wt-wire" aria-hidden="true" data-text={text}>{children}</span>
    </Tag>
  );
}
