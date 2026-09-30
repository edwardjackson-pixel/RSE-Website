interface StructuralPatternProps {
  category: string;
  className?: string;
}

function steelMomentFrame() {
  return (
    <>
      {/* Vertical columns */}
      {[15, 45, 75].map((x) => (
        <line key={`c-${x}`} x1={x} y1={5} x2={x} y2={95} stroke="currentColor" strokeWidth="0.8" />
      ))}
      {/* Horizontal beams */}
      {[25, 50, 75].map((y) => (
        <line key={`b-${y}`} x1={10} y1={y} x2={80} y2={y} stroke="currentColor" strokeWidth="0.8" />
      ))}
      {/* Moment connection brackets */}
      {[15, 45, 75].flatMap((x) =>
        [25, 50, 75].map((y) => (
          <rect key={`m-${x}-${y}`} x={x - 2} y={y - 2} width={4} height={4} fill="currentColor" opacity={0.3} />
        ))
      )}
    </>
  );
}

function concreteColumnBeam() {
  return (
    <>
      {/* Thick concrete columns */}
      {[20, 50, 80].map((x) => (
        <rect key={`cc-${x}`} x={x - 3} y={10} width={6} height={80} fill="currentColor" opacity={0.12} />
      ))}
      {/* Beams with depth */}
      {[30, 55, 80].map((y) => (
        <rect key={`cb-${y}`} x={15} y={y - 2} width={70} height={4} fill="currentColor" opacity={0.08} />
      ))}
      {/* Column grid lines */}
      {[20, 50, 80].map((x) => (
        <line key={`cgl-${x}`} x1={x} y1={5} x2={x} y2={95} stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
      ))}
    </>
  );
}

function masonryHatch() {
  return (
    <>
      {/* Horizontal courses */}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`mh-${i}`} x1={5} y1={6 + i * 5.5} x2={85} y2={6 + i * 5.5} stroke="currentColor" strokeWidth="0.4" />
      ))}
      {/* Staggered vertical joints */}
      {Array.from({ length: 16 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => {
          const offset = row % 2 === 0 ? 0 : 8;
          const x = 10 + offset + col * 16;
          return (
            <line
              key={`mv-${row}-${col}`}
              x1={x} y1={6 + row * 5.5}
              x2={x} y2={6 + (row + 1) * 5.5}
              stroke="currentColor" strokeWidth="0.3"
            />
          );
        })
      )}
    </>
  );
}

function timberLayup() {
  return (
    <>
      {/* CLT layers — alternating grain direction */}
      {Array.from({ length: 8 }, (_, i) => {
        const y = 8 + i * 10;
        if (i % 2 === 0) {
          return Array.from({ length: 12 }, (_, j) => (
            <line
              key={`tl-${i}-${j}`}
              x1={8 + j * 7} y1={y}
              x2={8 + j * 7 + 5} y2={y + 8}
              stroke="currentColor" strokeWidth="0.3" opacity={0.6}
            />
          ));
        }
        return Array.from({ length: 12 }, (_, j) => (
          <line
            key={`tl-${i}-${j}`}
            x1={8 + j * 7 + 5} y1={y}
            x2={8 + j * 7} y2={y + 8}
            stroke="currentColor" strokeWidth="0.3" opacity={0.6}
          />
        ));
      })}
      {/* Layer separation lines */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`ts-${i}`} x1={5} y1={8 + i * 10} x2={90} y2={8 + i * 10} stroke="currentColor" strokeWidth="0.5" />
      ))}
    </>
  );
}

function curtainWall() {
  return (
    <>
      {/* Mullion grid — vertical */}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`cwv-${i}`} x1={10 + i * 12} y1={5} x2={10 + i * 12} y2={95} stroke="currentColor" strokeWidth="0.6" />
      ))}
      {/* Mullion grid — horizontal */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`cwh-${i}`} x1={8} y1={8 + i * 10} x2={84} y2={8 + i * 10} stroke="currentColor" strokeWidth="0.4" />
      ))}
      {/* Glass panel fill */}
      {Array.from({ length: 6 }, (_, col) =>
        Array.from({ length: 8 }, (_, row) => (
          <rect
            key={`cwp-${col}-${row}`}
            x={11 + col * 12} y={9 + row * 10}
            width={10} height={8}
            fill="currentColor" opacity={0.03}
          />
        ))
      )}
    </>
  );
}

function longSpanTruss() {
  return (
    <>
      {/* Top chord — arched */}
      <path d="M 10 50 Q 45 15 90 50" stroke="currentColor" strokeWidth="0.7" fill="none" />
      {/* Bottom chord */}
      <line x1={10} y1={70} x2={90} y2={70} stroke="currentColor" strokeWidth="0.7" />
      {/* Vertical hangers */}
      {[25, 40, 50, 60, 75].map((x, i) => {
        const topY = 50 - Math.sin(((x - 10) / 80) * Math.PI) * 25;
        return (
          <line key={`th-${i}`} x1={x} y1={topY} x2={x} y2={70} stroke="currentColor" strokeWidth="0.4" />
        );
      })}
      {/* Diagonal web */}
      {[18, 33, 50, 67, 82].map((x, i) => {
        const topY = 50 - Math.sin(((x - 10) / 80) * Math.PI) * 25;
        const nextX = x + 12;
        return (
          <line key={`td-${i}`} x1={x} y1={topY + 5} x2={nextX} y2={70} stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
        );
      })}
      {/* Supports */}
      <polygon points="10,70 6,80 14,80" fill="currentColor" opacity={0.15} />
      <polygon points="90,70 86,80 94,80" fill="currentColor" opacity={0.15} />
    </>
  );
}

function cableStayed() {
  return (
    <>
      {/* Tower */}
      <line x1={45} y1={10} x2={45} y2={80} stroke="currentColor" strokeWidth="1" />
      {/* Deck */}
      <line x1={5} y1={65} x2={90} y2={65} stroke="currentColor" strokeWidth="0.7" />
      {/* Cables — left */}
      {[15, 25, 35].map((x, i) => (
        <line key={`cl-${i}`} x1={45} y1={15 + i * 8} x2={x} y2={65} stroke="currentColor" strokeWidth="0.3" />
      ))}
      {/* Cables — right */}
      {[55, 65, 75].map((x, i) => (
        <line key={`cr-${i}`} x1={45} y1={15 + i * 8} x2={x} y2={65} stroke="currentColor" strokeWidth="0.3" />
      ))}
      {/* Ground line */}
      <line x1={0} y1={80} x2={95} y2={80} stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 2" />
    </>
  );
}

function diagrid() {
  return (
    <>
      {/* Diamond pattern — lateral bracing */}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => {
          const x = 10 + col * 16;
          const y = 5 + row * 15;
          return (
            <g key={`dg-${row}-${col}`}>
              <line x1={x} y1={y + 7.5} x2={x + 8} y2={y} stroke="currentColor" strokeWidth="0.4" />
              <line x1={x + 8} y1={y} x2={x + 16} y2={y + 7.5} stroke="currentColor" strokeWidth="0.4" />
              <line x1={x} y1={y + 7.5} x2={x + 8} y2={y + 15} stroke="currentColor" strokeWidth="0.4" />
              <line x1={x + 8} y1={y + 15} x2={x + 16} y2={y + 7.5} stroke="currentColor" strokeWidth="0.4" />
            </g>
          );
        })
      )}
    </>
  );
}

const CATEGORY_PATTERNS: Record<string, () => React.ReactNode> = {
  "Higher Education": steelMomentFrame,
  "Libraries": steelMomentFrame,
  "K-12 Schools": steelMomentFrame,
  "Public & Civic": concreteColumnBeam,
  "Restoration & Renovation": masonryHatch,
  "Mass Timber": timberLayup,
  "Residential": curtainWall,
  "Student Residence Halls": curtainWall,
  "Museum & Performing Arts": longSpanTruss,
  "Athletic Facilities": longSpanTruss,
  "Landscapes & Parks": cableStayed,
  "Commercial & Mixed Use": diagrid,
};

export default function StructuralPattern({ category, className = "" }: StructuralPatternProps) {
  const patternFn = CATEGORY_PATTERNS[category] || steelMomentFrame;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full text-stone-500 ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {patternFn()}
    </svg>
  );
}
