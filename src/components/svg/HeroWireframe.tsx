"use client";

import type { CSSProperties, ReactNode } from "react";

const MASK_STYLE = {
  maskImage:
    "radial-gradient(ellipse 80% 80% at 85% 20%, rgba(0,0,0,0.5) 0%, transparent 70%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 80% 80% at 85% 20%, rgba(0,0,0,0.5) 0%, transparent 70%)",
} as const;

const SVG_BASE = "absolute right-0 top-0 w-[90%] h-full";

function WireframeSvg({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMaxYMid slice"
    >
      <g stroke="currentColor" strokeWidth="1" className="text-stone-900">
        {children}
      </g>
    </svg>
  );
}

export default function HeroWireframe() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 1 — structural frame (columns + beams) */}
      <div
        className="hero-layer hero-wireframe-sublayer absolute inset-0"
        style={{ ...MASK_STYLE, "--depth": 0.25 } as CSSProperties}
      >
        <div className="hero-idle-float-slow absolute inset-0">
          <WireframeSvg className={`${SVG_BASE} opacity-[0.07]`}>
          {[120, 240, 360, 480, 600, 720].map((x, i) => (
            <line
              key={`col-${i}`}
              x1={x}
              y1={80}
              x2={x}
              y2={520}
              className="hero-wireframe-line"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
          {[
            [120, 160, 720, 160],
            [120, 280, 720, 280],
            [120, 400, 720, 400],
            [120, 520, 720, 520],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`beam-h-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="hero-wireframe-line"
              style={{ animationDelay: `${600 + i * 150}ms` }}
            />
          ))}
        </WireframeSvg>
        </div>
      </div>

      {/* Layer 2 — bracing + moment frame details */}
      <div
        className="hero-layer hero-wireframe-sublayer absolute inset-0"
        style={{ ...MASK_STYLE, "--depth": 0.55 } as CSSProperties}
      >
        <div className="hero-idle-float-medium absolute inset-0">
          <WireframeSvg className={`${SVG_BASE} opacity-[0.09]`}>
          {[
            [120, 160, 240, 280],
            [240, 280, 120, 400],
            [360, 160, 480, 280],
            [480, 280, 360, 400],
            [600, 160, 720, 280],
            [720, 280, 600, 400],
            [240, 400, 360, 520],
            [480, 400, 600, 520],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`brace-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeDasharray="4 6"
              className="hero-wireframe-line"
              style={{ animationDelay: `${1200 + i * 100}ms` }}
            />
          ))}
          {[
            [118, 158, 122, 158, 122, 162],
            [238, 158, 242, 158, 242, 162],
            [478, 278, 482, 278, 482, 282],
            [598, 398, 602, 398, 602, 402],
          ].map(([x1, y1, x2, y2, x3, y3], i) => (
            <polyline
              key={`moment-${i}`}
              points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
              strokeWidth="1.5"
              className="hero-wireframe-line"
              style={{ animationDelay: `${1800 + i * 100}ms` }}
            />
          ))}
        </WireframeSvg>
        </div>
      </div>

      {/* Layer 3 — nodes, foundation, load arrows */}
      <div
        className="hero-layer hero-wireframe-sublayer absolute inset-0"
        style={{ ...MASK_STYLE, "--depth": 1 } as CSSProperties}
      >
        <div className="hero-idle-float-fast absolute inset-0">
          <WireframeSvg className={`${SVG_BASE} opacity-[0.1]`}>
          {[120, 240, 360, 480, 600, 720]
            .flatMap((x) => [160, 280, 400, 520].map((y) => ({ x, y })))
            .map((pt, i) => (
              <circle
                key={`node-${i}`}
                cx={pt.x}
                cy={pt.y}
                r="2.5"
                fill="currentColor"
                className="hero-wireframe-node"
                style={{ animationDelay: `${800 + i * 40}ms` }}
              />
            ))}
          {[120, 240, 360, 480, 600, 720].map((x, i) => (
            <g
              key={`found-${i}`}
              className="hero-wireframe-line"
              style={{ animationDelay: `${2000 + i * 80}ms` }}
            >
              <line x1={x - 12} y1={525} x2={x + 12} y2={525} />
              <line x1={x - 10} y1={530} x2={x - 4} y2={525} />
              <line x1={x - 4} y1={530} x2={x + 2} y2={525} />
              <line x1={x + 2} y1={530} x2={x + 8} y2={525} />
            </g>
          ))}
          {[180, 300, 420, 540, 660].map((x, i) => (
            <g
              key={`load-${i}`}
              className="hero-wireframe-line"
              style={{ animationDelay: `${2200 + i * 80}ms` }}
            >
              <line x1={x} y1={60} x2={x} y2={80} />
              <line x1={x - 4} y1={72} x2={x} y2={80} />
              <line x1={x + 4} y1={72} x2={x} y2={80} />
            </g>
          ))}
        </WireframeSvg>
        </div>
      </div>
    </div>
  );
}
