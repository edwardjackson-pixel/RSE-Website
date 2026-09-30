"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import HeroWireframe from "@/components/svg/HeroWireframe";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const HEADLINE_LINES = [
  "Structural engineering for architecture",
  "that has to perform beautifully.",
];

const OFFICE_CITIES = ["Boston", "New York", "Los Angeles"];

export default function Hero() {
  const sceneRef = usePointerParallax();
  useScrollProgress(sceneRef);

  return (
    <section
      ref={sceneRef}
      className="hero-scene relative min-h-[90vh] flex items-end overflow-hidden bg-charcoal"
    >
      <div className="hero-parallax-stage absolute inset-0" aria-hidden="true">
        {/* Background photo + gradients */}
        <div
          className="hero-layer absolute inset-0"
          style={{ "--depth": 0.12 } as CSSProperties}
        >
          <Image
            src="/images/projects/bpl-roxbury.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.75) 40%, rgba(26,26,26,0.35) 70%, rgba(26,26,26,0.15) 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background:
                "linear-gradient(to top, rgb(255,255,255) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Blueprint grid */}
        <div
          className="hero-layer absolute inset-0 opacity-[0.06]"
          style={
            {
              "--depth": 0.3,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 70% 80% at 75% 30%, rgba(0,0,0,0.6) 0%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 80% at 75% 30%, rgba(0,0,0,0.6) 0%, transparent 70%)",
            } as CSSProperties
          }
        />

        {/* Wireframe overlay */}
        <div
          className="hero-layer absolute inset-0 opacity-30 mix-blend-screen"
          style={{ "--depth": 0.65 } as CSSProperties}
        >
          <HeroWireframe />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-28 pt-48 md:pt-56 lg:pt-64 w-full">
        <div className="max-w-3xl">
          <FadeIn delay={100}>
            <span className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-stone-400 border-b border-stone-600 pb-2 mb-8">
              Structural Engineering
            </span>
          </FadeIn>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white tracking-tight leading-[1.08]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="hero-line-mask block">
                <span
                  className="hero-line-reveal block"
                  style={{ animationDelay: `${250 + i * 140}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <FadeIn delay={500}>
            <p className="mt-6 text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl">
              We collaborate with architects on complex buildings — from new
              construction and adaptive reuse to civic landmarks and higher
              education. Based in Boston, with offices in New York and Los
              Angeles.
            </p>
          </FadeIn>

          <FadeIn delay={650}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                className="hero-cta-primary btn-arrow inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wide bg-white text-charcoal hover:bg-stone-100 transition-colors duration-200 cursor-pointer"
              >
                View Projects
                <svg
                  className="btn-arrow-icon h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="hero-cta-secondary inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide border border-stone-500 text-white hover:border-white transition-colors duration-200 cursor-pointer"
              >
                Start a Conversation
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={800}>
          <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-2">
            {OFFICE_CITIES.map((city) => (
              <span
                key={city}
                className="text-xs uppercase tracking-[0.2em] text-stone-500"
              >
                {city}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-scroll-cue absolute bottom-8 left-1/2 z-10 hidden md:flex flex-col items-center gap-2 -translate-x-1/2"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
          Scroll
        </span>
        <span className="hero-scroll-cue-line" />
      </div>
    </section>
  );
}
