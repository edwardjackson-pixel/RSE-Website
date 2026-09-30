"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayerSteps from "@/components/howwebuild/LayerSteps";
import { activeLayerIndex } from "@/lib/buildingLayers";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Keep Three.js out of SSR and the initial bundle.
const BuildingCanvas = dynamic(
  () => import("@/components/howwebuild/BuildingCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
          Loading model…
        </span>
      </div>
    ),
  }
);

export default function ExplodedBuildingExperience() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Static, fully-readable state: hold a mid explode and show all steps.
      progressRef.current = 0.45;
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const next = activeLayerIndex(self.progress);
        setActiveStep((prev) => (prev === next ? prev : next));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="h-[60vh] min-h-[420px] lg:sticky lg:top-24">
            <BuildingCanvas progressRef={progressRef} activeStep={0} showAllLabels />
          </div>
          <LayerSteps activeStep={0} showAll />
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Pinned 3D canvas (sticky) */}
          <div className="lg:sticky lg:top-0 h-screen flex items-center">
            <div className="relative h-[70vh] w-full">
              <BuildingCanvas progressRef={progressRef} activeStep={activeStep} />
              <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400">
                  Scroll to explore the system
                </span>
              </div>
            </div>
          </div>

          {/* Scrolling step panels */}
          <LayerSteps activeStep={activeStep} />
        </div>
      </div>
    </div>
  );
}
