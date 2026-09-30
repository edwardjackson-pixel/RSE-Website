"use client";

import { BUILDING_LAYERS } from "@/lib/buildingLayers";

type LayerStepsProps = {
  activeStep: number;
  /** When true, render every panel at full emphasis (reduced-motion / no-scroll). */
  showAll?: boolean;
};

export default function LayerSteps({ activeStep, showAll = false }: LayerStepsProps) {
  return (
    <div className="relative">
      {BUILDING_LAYERS.map((layer, i) => {
        const isActive = showAll || i === activeStep;
        return (
          <div
            key={layer.id}
            className={
              showAll
                ? "border-t border-stone-200 py-8"
                : "min-h-screen flex flex-col justify-center py-16"
            }
          >
            <div
              className={`transition-all duration-500 ${
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-40 translate-y-1"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`font-heading text-sm font-bold tracking-widest transition-colors duration-500 ${
                    isActive ? "text-accent" : "text-stone-300"
                  }`}
                >
                  {layer.index}
                </span>
                <span className="h-px flex-1 bg-stone-200" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                  {layer.service}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                {layer.name}
              </h3>
              <p className="mt-4 max-w-md text-stone-600 leading-relaxed">
                {layer.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
