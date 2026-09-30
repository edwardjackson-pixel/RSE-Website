import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/svg/SectionDivider";
import NoiseOverlay from "@/components/NoiseOverlay";
import { FEATURED_PROJECTS, SERVICES, AWARDS, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Structural Engineering for Architecture`,
  description:
    "RSE Associates provides structural engineering services for architects, institutions, and developers. Specializing in complex buildings, adaptive reuse, and civic projects across Boston, New York, and Los Angeles.",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ──────────────────── Featured Projects ──────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel>Selected Work</SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                  Featured projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-stone-500 hover:text-charcoal transition-colors duration-200 cursor-pointer"
              >
                View all projects
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((project, i) => (
              <FadeIn key={project.title} delay={i * 100}>
                <ProjectCard {...project} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 sm:hidden text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-charcoal transition-colors duration-200 cursor-pointer"
            >
              View all projects
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider variant="truss" />

      {/* ──────────────────── Services Overview ──────────────────── */}
      <section className="relative bg-stone-50 py-20 lg:py-28">
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl mb-12">
              <SectionLabel>Services</SectionLabel>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                What we do
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Full-service structural engineering from feasibility through construction administration. Every project gets principal-level attention.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 80}>
                <div className="bg-white border border-stone-200 p-8 hover:border-stone-400 transition-colors duration-200 h-full">
                  <h3 className="font-heading text-lg font-semibold text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="btn-arrow inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                Learn more about our services
                <svg className="btn-arrow-icon h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider variant="beam" />

      {/* ──────────────── Built for Architects ──────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <SectionLabel>Our Approach</SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                  Built for architects
                </h2>
                <p className="mt-6 text-stone-600 leading-relaxed text-lg">
                  We understand that structural engineering is not a separate discipline — it is part of the architecture. Our work begins in schematic design and stays involved through construction, because the best structures come from early and ongoing collaboration.
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  heading: "Design Sensitivity",
                  text: "We read drawings carefully and understand architectural intent. Structure serves the design, not the other way around.",
                },
                {
                  heading: "Constructability",
                  text: "Practical engineering that contractors can build efficiently. We consider means and methods from day one.",
                },
                {
                  heading: "Responsiveness",
                  text: "Principals are involved in every project. When you call, you reach someone who knows your building.",
                },
                {
                  heading: "Collaboration",
                  text: "We work as part of the design team — not as outside consultants handing off a set of calcs.",
                },
              ].map((item, i) => (
                <FadeIn key={item.heading} delay={i * 120} direction="right">
                  <div className="border-t border-stone-200 pt-5">
                    <h3 className="font-heading text-base font-semibold text-charcoal">
                      {item.heading}
                    </h3>
                    <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="grid" />

      {/* ──────────────── Award Highlights ──────────────── */}
      <section className="relative bg-stone-50 py-20 lg:py-28">
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel>Recognition</SectionLabel>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                  Award-winning work
                </h2>
              </div>
              <Link
                href="/awards"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-stone-500 hover:text-charcoal transition-colors duration-200 cursor-pointer"
              >
                View all awards
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {AWARDS.slice(0, 6).map((award, i) => (
              <FadeIn key={`${award.year}-${award.title}`} delay={i * 80}>
                <article className="border-t border-stone-200 py-5 flex gap-5 items-start award-card-hover">
                  <span className="font-heading text-xl font-bold text-stone-300 shrink-0 w-12">
                    {award.year}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal leading-snug">{award.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">{award.organization}</p>
                    <p className="text-xs text-accent mt-0.5">{award.project}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="beam" />

      {/* ──────────────── MBE / Diversity ──────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <FadeIn>
              <div className="lg:col-span-1">
                <SectionLabel>Diversity</SectionLabel>
                <h2 className="font-heading text-3xl font-bold text-charcoal tracking-tight">
                  An MBE-certified firm
                </h2>
              </div>
            </FadeIn>
            <div className="lg:col-span-2">
              <FadeIn delay={100}>
                <p className="text-stone-600 leading-relaxed text-lg">
                  RSE Associates is a certified Minority Business Enterprise. We deliberately build diverse engineering teams because different perspectives lead to stronger collaboration and better buildings.
                </p>
              </FadeIn>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { end: 0, label: "Certified", prefix: "MBE", isMbe: true },
                  { end: 40, label: "Women engineers", suffix: "%", isMbe: false },
                  { end: 50, label: "Minority engineers", suffix: "%", isMbe: false },
                  { end: 2001, label: "Founded", isMbe: false },
                ].map((item, i) => (
                  <FadeIn key={item.label} delay={200 + i * 100}>
                    <div className="border-t border-stone-200 pt-4">
                      {item.isMbe ? (
                        <span className="font-heading text-2xl font-bold text-charcoal">MBE</span>
                      ) : (
                        <CountUp
                          end={item.end}
                          suffix={item.suffix}
                          className="font-heading text-2xl font-bold text-charcoal"
                        />
                      )}
                      <p className="text-xs text-stone-500 mt-1 uppercase tracking-wide">{item.label}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Contact CTA ──────────────── */}
      <CTASection />
    </>
  );
}
