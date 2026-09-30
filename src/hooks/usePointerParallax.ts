"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function usePointerParallax() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafId = useRef<number | null>(null);
  const target = useRef({ px: 0, py: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = (px: number, py: number) => {
      el.style.setProperty("--px", String(px));
      el.style.setProperty("--py", String(py));
    };

    if (prefersReducedMotion) {
      apply(0, 0);
      return;
    }

    const scheduleUpdate = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        apply(target.current.px, target.current.py);
        rafId.current = null;
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      target.current = {
        px: (e.clientX - rect.left) / rect.width - 0.5,
        py: (e.clientY - rect.top) / rect.height - 0.5,
      };
      scheduleUpdate();
    };

    const onPointerLeave = () => {
      target.current = { px: 0, py: 0 };
      scheduleUpdate();
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [prefersReducedMotion]);

  return ref;
}
