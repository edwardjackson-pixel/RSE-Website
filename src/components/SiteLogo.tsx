import Image from "next/image";

const LOGO_MARKS = {
  light: "/images/logo-rse-light.png",
  dark: "/images/logo-rse-dark.png",
} as const;

const LOGO_WIDTH = 1019;
const LOGO_HEIGHT = 406;

export type SiteLogoTone = keyof typeof LOGO_MARKS;

type SiteLogoProps = {
  height?: number;
  tone?: SiteLogoTone;
  className?: string;
  priority?: boolean;
};

export default function SiteLogo({
  height = 44,
  tone = "dark",
  className = "",
  priority = false,
}: SiteLogoProps) {
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);
  const isLight = tone === "light";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={LOGO_MARKS[tone]}
        alt="RSE Associates"
        width={width}
        height={height}
        className="h-auto w-auto shrink-0"
        priority={priority}
      />
      <span className="hidden sm:flex flex-col leading-none">
        <span
          className={`font-heading text-[11px] font-semibold tracking-[0.22em] uppercase ${
            isLight ? "text-white" : "text-charcoal"
          }`}
        >
          Associates
        </span>
        <span
          className={`mt-1 font-body text-[10px] tracking-[0.14em] uppercase ${
            isLight ? "text-stone-400" : "text-stone-500"
          }`}
        >
          Structural Engineers
        </span>
      </span>
    </span>
  );
}
