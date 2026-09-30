import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import LeadershipFrame from "@/components/svg/LeadershipFrame";
import SectionDivider from "@/components/svg/SectionDivider";
import NoiseOverlay from "@/components/NoiseOverlay";
import { LEADERSHIP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "RSE Associates was established in 2001 by Richmond So. With offices across the United States, we deliver award-winning structural engineering with the technical ability of a large firm and the personal service of a small one.",
};

export default function AboutPage() {
  return (
    <>
      {/* ──── History ──── */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <SectionLabel>About</SectionLabel>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
                  Who we are
                </h1>
              </div>
            </FadeIn>
            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <FadeIn delay={100}>
                <p>
                  RSE Associates was established in 2001 by Richmond So with a straightforward premise: deliver the technical rigor of a large international firm through the direct, personal service of a small one.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <p>
                  Since then, the firm has grown into a multi-office practice with engineers working across the United States and on projects in Europe and Asia. We have completed award-winning buildings for universities, municipalities, libraries, museums, and private developers — but the founding principle has not changed.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <p>
                  Our principals and engineers bring extensive, diverse experience in complex and demanding projects. We specialize in the kinds of buildings that require close collaboration between architect and engineer — structures where the engineering is inseparable from the architecture.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="truss" />

      {/* ──── Leadership ──── */}
      <section className="relative bg-stone-50 py-20 lg:py-28">
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl mb-12">
              <SectionLabel>Leadership</SectionLabel>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                Our principals
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Every project at RSE receives principal-level involvement. You work directly with the people leading the firm.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEADERSHIP.map((person, i) => (
              <FadeIn key={person.name} delay={i * 100}>
                <article className="bg-white border border-stone-200 p-8 h-full">
                  <LeadershipFrame initials={person.name.split(" ").map((n) => n[0]).join("")} />
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    {person.name}
                  </h3>
                  <p className="text-sm text-accent mt-1">{person.title}</p>
                  <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                    {person.bio}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="beam" />

      {/* ──── Diversity ──── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <SectionLabel>Diversity</SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                  Different perspectives, stronger buildings
                </h2>
                <p className="mt-6 text-stone-600 leading-relaxed text-lg">
                  As a certified Minority Business Enterprise, we know firsthand that diverse teams produce better work. We deliberately seek out qualified, diverse candidates and focus on creating a work environment where people can do their best engineering.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 gap-8">
              {[
                { end: 0, label: "Certified Minority Business Enterprise", detail: "A firm that reflects the communities it serves", prefix: "MBE", isMbe: true },
                { end: 40, label: "Women Engineers", detail: "Representation across all project roles and levels", suffix: "%", isMbe: false },
                { end: 50, label: "Minority Engineers", detail: "Diverse backgrounds and perspectives in every team", suffix: "%", isMbe: false },
                { end: 20, label: "Years in Practice", detail: "Established in 2001, growing steadily since", suffix: "+", isMbe: false },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 120} direction="right">
                  <div className="border-t border-stone-200 pt-6">
                    {item.isMbe ? (
                      <span className="font-heading text-3xl font-bold text-charcoal">MBE</span>
                    ) : (
                      <CountUp
                        end={item.end}
                        suffix={item.suffix}
                        className="font-heading text-3xl font-bold text-charcoal"
                      />
                    )}
                    <p className="text-sm font-medium text-charcoal mt-2">{item.label}</p>
                    <p className="text-xs text-stone-500 mt-1">{item.detail}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Join the team"
        description="We are always looking for talented engineers who care about buildings. See our current openings or get in touch."
        primaryLabel="View Careers"
        primaryHref="/careers"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
