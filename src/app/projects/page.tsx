"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import BlueprintGrid from "@/components/svg/BlueprintGrid";
import { ALL_PROJECTS, PROJECT_CATEGORIES } from "@/lib/constants";

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsPageContent />
    </Suspense>
  );
}

function ProjectsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");

  const categoriesWithProjects = PROJECT_CATEGORIES.filter((cat) =>
    ALL_PROJECTS.some((p) => p.category === cat)
  );
  const requestedIsKnown =
    requestedCategory != null &&
    (PROJECT_CATEGORIES as readonly string[]).includes(requestedCategory);
  const availableCategories = [
    "All",
    ...categoriesWithProjects,
    ...(requestedIsKnown &&
    !categoriesWithProjects.includes(requestedCategory as (typeof PROJECT_CATEGORIES)[number])
      ? [requestedCategory]
      : []),
  ];
  const activeCategory = requestedIsKnown ? requestedCategory : "All";

  const filteredProjects =
    activeCategory === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeCategory);

  function selectCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") params.delete("category");
    else params.set("category", category);
    const query = params.toString();
    router.push(query ? `/projects?${query}` : "/projects", { scroll: false });
  }

  return (
    <>
      <section id="selected-work" className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <BlueprintGrid opacity={0.02} fadeDirection="center" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-12">
              <SectionLabel>Projects</SectionLabel>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
                Selected work
              </h1>
              <p className="mt-4 text-lg text-stone-600 leading-relaxed">
                Complex structures for architecture that demands precision. From civic landmarks and higher education to adaptive reuse and mass timber — a cross-section of our portfolio.
              </p>
            </div>
          </FadeIn>

          {/* Category filters */}
          <FadeIn delay={100}>
            <div className="flex flex-wrap gap-2 mb-12 border-b border-stone-200 pb-6" role="tablist" aria-label="Filter projects by category">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`px-4 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-charcoal text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 80}>
                <ProjectCard {...project} />
              </FadeIn>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-stone-500 py-12">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      <CTASection
        heading="Have a project in mind?"
        description="We work with architects from schematic design through construction administration. Let's discuss your next building."
      />
    </>
  );
}
