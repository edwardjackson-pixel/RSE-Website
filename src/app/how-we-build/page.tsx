import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import ExplodedBuildingExperience from "@/components/howwebuild/ExplodedBuildingExperience";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How We Build",
  description:
    "An interactive look at how RSE Associates engineers a building system by system — foundation, columns, beams, roof, envelope, and MEP coordination — from feasibility through construction administration.",
};

export default function HowWeBuildPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-white pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionLabel>How We Build</SectionLabel>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
              The building, layer by layer
            </h1>
            <p className="mt-6 text-stone-600 leading-relaxed text-lg">
              Structural engineering is rarely visible in the finished building —
              but every layer depends on it. Scroll to take a sample structure
              apart, from the foundation to the final render, and see where{" "}
              {SITE_NAME.replace(", Inc.", "")} adds value at each stage.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll-driven 3D experience */}
      <section className="bg-white">
        <ExplodedBuildingExperience />
      </section>

      <CTASection
        heading="Bring us in early"
        description="The best structures come from collaboration that starts in schematic design and stays through construction. Let's talk about your project."
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
