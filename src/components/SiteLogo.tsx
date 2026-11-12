import Image from "next/image";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function SiteLogo({ className = "", priority = false }: SiteLogoProps) {
  return (
    <Image
      src="/images/logo-rse-original.png"
      alt="RSE Associates, Inc."
      width={2700}
      height={406}
      priority={priority}
      className={`h-8 w-auto shrink-0 sm:h-10 ${className}`}
    />
  );
}
