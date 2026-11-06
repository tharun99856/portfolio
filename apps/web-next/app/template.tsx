// Re-mounts on every navigation, so each page arrives like a channel change.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="chan">
      <div className="chan-static" aria-hidden="true" />
      {children}
    </div>
  )
}
