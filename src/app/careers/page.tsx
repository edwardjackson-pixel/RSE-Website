import type { Metadata } from "next";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import SectionDivider from "@/components/svg/SectionDivider";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join RSE Associates — a diverse, MBE-certified structural engineering firm working on complex and award-winning buildings. Current openings and opportunities.",
};

const OPEN_POSITIONS = [
  {
    title: "Project Engineer",
    location: "Watertown, MA",
    type: "Full-time",
    description:
      "3–7 years of experience in structural engineering. Proficiency in structural analysis software and experience with steel, concrete, and/or wood design. PE license preferred.",
  },
  {
    title: "Senior Structural Engineer",
    location: "Watertown, MA",
    type: "Full-time",
    description:
      "7+ years of structural engineering experience with a PE license. Demonstrated ability to lead projects from schematic design through construction administration. Experience with complex institutional or civic projects preferred.",
  },
  {
    title: "Structural EIT",
    location: "Los Angeles, CA",
    type: "Full-time",
    description:
      "Entry-level engineer with an MS or BS in Civil/Structural Engineering and EIT certification. Strong analytical skills and interest in working closely with architects on design-focused projects.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ──── Intro ──── */}
      <section className="bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn direction="left">
              <div>
                <SectionLabel>Careers</SectionLabel>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
                  Build with us
                </h1>
                <p className="mt-6 text-stone-600 leading-relaxed text-lg">
                  RSE Associates is a place for engineers who care about buildings. We work on complex, visible projects with leading architects — and we give every engineer the opportunity to be involved in design decisions, not just production.
                </p>
              </div>
            </FadeIn>
            <div className="space-y-0">
              {[
                {
                  heading: "Meaningful work",
                  text: "Our projects include courthouses, libraries, museums, universities, and historic restorations. You will work on buildings that matter to communities.",
                },
                {
                  heading: "Direct involvement",
                  text: "We are a small firm on purpose. Engineers here attend design meetings, visit construction sites, and collaborate directly with architects.",
                },
                {
                  heading: "Supportive environment",
                  text: "40% of our engineers identify as women and 50% as minority. We invest in mentorship, licensure support, and professional development.",
                },
                {
                  heading: "Growth trajectory",
                  text: "We help engineers develop from EIT to PE and from project support to project leadership. Your career path is visible and supported.",
                },
              ].map((item, i) => (
                <FadeIn key={item.heading} delay={i * 100}>
                  <div className="border-t border-stone-200 py-6 flex gap-6 items-start">
                    <span className="text-xs font-mono text-stone-400 mt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-charcoal">{item.heading}</h3>
                      <p className="mt-2 text-sm text-stone-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="beam" />

      {/* ──── Open Positions ──── */}
      <section className="relative bg-stone-50 py-20 lg:py-28">
        <NoiseOverlay />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl mb-12">
              <SectionLabel>Open Positions</SectionLabel>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                Current openings
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                We are always interested in hearing from talented structural engineers. Even if you do not see a role that fits, feel free to reach out.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-0 max-w-3xl">
            {OPEN_POSITIONS.map((pos, i) => (
              <FadeIn key={pos.title} delay={i * 100}>
                <article className="border-t border-stone-200 py-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-charcoal">{pos.title}</h3>
                      <p className="text-sm text-stone-500 mt-1">
                        {pos.location} &middot; {pos.type}
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="btn-arrow inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium tracking-wide border border-stone-300 text-charcoal hover:border-charcoal transition-colors duration-200 shrink-0 cursor-pointer"
                    >
                      Apply
                      <svg className="btn-arrow-icon h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed max-w-2xl">
                    {pos.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Don't see your role?"
        description="We are always looking for talented engineers. Send us your resume and tell us about your interests."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
