interface BlueprintGridProps {
  opacity?: number;
  fadeDirection?: "top-right" | "center" | "none";
  className?: string;
}

export default function BlueprintGrid({
  opacity = 0.04,
  fadeDirection = "top-right",
  className = "",
}: BlueprintGridProps) {
  const maskMap = {
    "top-right":
      "radial-gradient(ellipse 90% 90% at 80% 15%, rgba(0,0,0,1) 0%, transparent 65%)",
    center:
      "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.8) 0%, transparent 70%)",
    none: "none",
  };

  const mask = fadeDirection !== "none" ? maskMap[fadeDirection] : undefined;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        ...(mask && {
          maskImage: mask,
          WebkitMaskImage: mask,
        }),
      }}
    />
  );
}
