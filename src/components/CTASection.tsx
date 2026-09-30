import Link from "next/link";

interface CTASectionProps {
  heading?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  heading = "Start a conversation",
  description = "Whether you are an architect beginning schematic design, an institution planning a renovation, or a developer evaluating feasibility — we are ready to talk structure.",
  primaryLabel = "Get in Touch",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="bg-charcoal text-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
          {heading}
        </h2>
        <p className="mt-4 text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="btn-arrow inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wide bg-accent text-white hover:bg-accent-light transition-colors duration-200 cursor-pointer"
          >
            {primaryLabel}
            <svg className="btn-arrow-icon h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide border border-stone-600 text-stone-300 hover:border-white hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
