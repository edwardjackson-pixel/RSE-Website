interface SectionDividerProps {
  variant?: "truss" | "beam" | "grid";
  className?: string;
}

export default function SectionDivider({ variant = "beam", className = "" }: SectionDividerProps) {
  const height = variant === "truss" ? 24 : variant === "grid" ? 16 : 8;

  return (
    <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${className}`} aria-hidden="true">
      <svg
        viewBox={`0 0 1200 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full text-stone-300"
        preserveAspectRatio="none"
      >
        {variant === "beam" && (
          <>
            <line x1="0" y1="4" x2="1200" y2="4" stroke="currentColor" strokeWidth="0.5" />
            {/* Flange ticks at intervals */}
            {Array.from({ length: 25 }, (_, i) => i * 50).map((x) => (
              <line key={x} x1={x} y1="2" x2={x} y2="6" stroke="currentColor" strokeWidth="0.5" />
            ))}
          </>
        )}

        {variant === "truss" && (
          <>
            {/* Top and bottom chords */}
            <line x1="0" y1="2" x2="1200" y2="2" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="22" x2="1200" y2="22" stroke="currentColor" strokeWidth="0.5" />
            {/* Diagonal web members */}
            {Array.from({ length: 24 }, (_, i) => {
              const x = i * 50;
              return i % 2 === 0 ? (
                <line key={i} x1={x} y1={2} x2={x + 50} y2={22} stroke="currentColor" strokeWidth="0.5" />
              ) : (
                <line key={i} x1={x} y1={22} x2={x + 50} y2={2} stroke="currentColor" strokeWidth="0.5" />
              );
            })}
            {/* Vertical members */}
            {Array.from({ length: 25 }, (_, i) => i * 50).map((x) => (
              <line key={`v-${x}`} x1={x} y1={2} x2={x} y2={22} stroke="currentColor" strokeWidth="0.3" />
            ))}
          </>
        )}

        {variant === "grid" && (
          <>
            {/* Double line with cross-hatching */}
            <line x1="0" y1="4" x2="1200" y2="4" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="12" x2="1200" y2="12" stroke="currentColor" strokeWidth="0.5" />
            {Array.from({ length: 60 }, (_, i) => {
              const x = i * 20;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={4}
                  x2={x + 10}
                  y2={12}
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}
