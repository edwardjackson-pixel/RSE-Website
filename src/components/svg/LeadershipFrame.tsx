interface LeadershipFrameProps {
  initials: string;
}

export default function LeadershipFrame({ initials }: LeadershipFrameProps) {
  return (
    <div className="w-20 h-20 relative mb-6">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full text-stone-300"
        aria-hidden="true"
      >
        {/* Outer structural frame */}
        <rect x="2" y="2" width="76" height="76" stroke="currentColor" strokeWidth="0.75" />

        {/* Corner brackets — moment connection detail */}
        {/* Top-left */}
        <line x1="2" y1="12" x2="12" y2="12" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1" />
        {/* Top-right */}
        <line x1="68" y1="12" x2="78" y2="12" stroke="currentColor" strokeWidth="1" />
        <line x1="68" y1="2" x2="68" y2="12" stroke="currentColor" strokeWidth="1" />
        {/* Bottom-left */}
        <line x1="2" y1="68" x2="12" y2="68" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="68" x2="12" y2="78" stroke="currentColor" strokeWidth="1" />
        {/* Bottom-right */}
        <line x1="68" y1="68" x2="78" y2="68" stroke="currentColor" strokeWidth="1" />
        <line x1="68" y1="68" x2="68" y2="78" stroke="currentColor" strokeWidth="1" />

        {/* Inner cross-hair reference lines */}
        <line x1="40" y1="16" x2="40" y2="24" stroke="currentColor" strokeWidth="0.3" />
        <line x1="40" y1="56" x2="40" y2="64" stroke="currentColor" strokeWidth="0.3" />
        <line x1="16" y1="40" x2="24" y2="40" stroke="currentColor" strokeWidth="0.3" />
        <line x1="56" y1="40" x2="64" y2="40" stroke="currentColor" strokeWidth="0.3" />

        {/* Diagonal detail lines in corners */}
        <line x1="4" y1="4" x2="10" y2="10" stroke="currentColor" strokeWidth="0.3" />
        <line x1="70" y1="4" x2="76" y2="10" stroke="currentColor" strokeWidth="0.3" />
        <line x1="4" y1="76" x2="10" y2="70" stroke="currentColor" strokeWidth="0.3" />
        <line x1="70" y1="76" x2="76" y2="70" stroke="currentColor" strokeWidth="0.3" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-heading text-xl font-bold text-stone-500">
        {initials}
      </span>
    </div>
  );
}
