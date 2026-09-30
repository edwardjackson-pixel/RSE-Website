"use client";

import { type RefObject, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.style.setProperty("--hero-scroll", "0");
      return;
    }

    let rafId: number | null = null;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / heroHeight));
      el.style.setProperty("--hero-scroll", String(progress));
      rafId = null;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [ref, prefersReducedMotion]);
}
