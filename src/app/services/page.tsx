import type { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/svg/SectionDivider";
import NoiseOverlay from "@/components/NoiseOverlay";
import { SERVICES, PROJECT_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Structural engineering services including new construction, adaptive reuse, historic renovation, structural investigation, peer reviews, feasibility studies, and design competition support.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ──── Services List ──── */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <FadeIn direction="left">
                <SectionLabel>Services</SectionLabel>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
                  What we do
                </h1>
                <p className="mt-4 text-stone-600 leading-relaxed">
                  We provide the full range of structural engineering services — from early feasibility assessments through construction administration. Every project receives principal-level involvement and direct communication.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-2">
              {SERVICES.map((service, i) => (
                <FadeIn key={service.slug} delay={i * 80}>
                  <ServiceCard title={service.title} description={service.description} index={i} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="truss" />

      {/* ──── Building Types ──── */}
      <section className="relative bg-stone-50 py-20 lg:py-28">
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl mb-12">
              <SectionLabel>Expertise</SectionLabel>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                Building types
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Our engineers have hands-on experience across a wide range of project types — from small historic restorations to large institutional complexes.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PROJECT_CATEGORIES.map((category, i) => (
              <FadeIn key={category} delay={i * 50}>
                <div className="bg-white border border-stone-200 px-5 py-4 text-sm font-medium text-charcoal hover:border-stone-400 transition-colors duration-200">
                  {category}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="beam" />

      {/* ──── Approach ──── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <SectionLabel>Our Process</SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                  How we work
                </h2>
                <p className="mt-4 text-stone-600 leading-relaxed text-lg">
                  We join the design team early and stay involved through construction. This is not a hand-off model — we maintain continuity from concept through completion.
                </p>
                <Link
                  href="/how-we-build"
                  className="btn-arrow group mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-accent hover:text-accent-light transition-colors duration-200"
                >
                  See how we build, layer by layer
                  <svg className="btn-arrow-icon h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
            <div className="space-y-0">
              {[
                {
                  phase: "Schematic Design",
                  text: "We work with the architect to develop the structural concept, evaluate systems, and establish the basic geometry of the structure. Early involvement avoids costly changes later.",
                },
                {
                  phase: "Design Development",
                  text: "We refine the structural system, size members, coordinate with MEP, and resolve constructability questions. Detailed coordination happens here.",
                },
                {
                  phase: "Construction Documents",
                  text: "Complete structural drawings and specifications for permitting and construction. Clear, well-coordinated documents that contractors can build from.",
                },
                {
                  phase: "Construction Administration",
                  text: "Shop drawing review, site visits, and field observation. We stay with the project to ensure the structure is built as designed.",
                },
              ].map((item, i) => (
                <FadeIn key={item.phase} delay={i * 100}>
                  <div className="border-t border-stone-200 py-6 flex gap-6 items-start">
                    <span className="text-xs font-mono text-stone-400 mt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-charcoal">{item.phase}</h3>
                      <p className="mt-2 text-sm text-stone-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Discuss your next project"
        description="We bring the technical ability of a large international firm with the personal service and responsiveness of a small one."
        secondaryLabel="View Projects"
        secondaryHref="/projects"
      />
    </>
  );
}
