"use client";

import { useState } from "react";
import AwardCard from "@/components/AwardCard";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import FadeIn from "@/components/FadeIn";
import BlueprintGrid from "@/components/svg/BlueprintGrid";
import { AWARDS } from "@/lib/constants";

const ALL_YEARS = Array.from(new Set(AWARDS.map((a) => a.year))).sort((a, b) => b - a);

export default function AwardsPage() {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAwards = AWARDS.filter((award) => {
    const matchesYear = activeYear === null || award.year === activeYear;
    const matchesSearch =
      searchTerm === "" ||
      award.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      award.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <>
      <section className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <BlueprintGrid opacity={0.02} fadeDirection="center" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-12">
              <SectionLabel>Recognition</SectionLabel>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
                Awards
              </h1>
              <p className="mt-4 text-lg text-stone-600 leading-relaxed">
                Our work has been recognized by the Boston Society of Architects, the American Institute of Architects, Preservation Massachusetts, and other organizations committed to design excellence.
              </p>
            </div>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10 border-b border-stone-200 pb-6">
              <div className="relative flex-1 max-w-sm">
                <label htmlFor="award-search" className="sr-only">Search awards</label>
                <input
                  id="award-search"
                  type="text"
                  placeholder="Search awards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-stone-200 bg-white text-charcoal placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors duration-200"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter awards by year">
                <button
                  onClick={() => setActiveYear(null)}
                  role="tab"
                  aria-selected={activeYear === null}
                  className={`px-4 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                    activeYear === null
                      ? "bg-charcoal text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  All Years
                </button>
                {ALL_YEARS.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    role="tab"
                    aria-selected={activeYear === year}
                    className={`px-4 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                      activeYear === year
                        ? "bg-charcoal text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Awards list */}
          <div className="max-w-3xl">
            {filteredAwards.length > 0 ? (
              filteredAwards.map((award, i) => (
                <FadeIn key={`${award.year}-${award.title}`} delay={i * 60}>
                  <AwardCard {...award} />
                </FadeIn>
              ))
            ) : (
              <p className="text-center text-stone-500 py-12">
                No awards match your search.
              </p>
            )}
          </div>
        </div>
      </section>

      <CTASection
        heading="Award-winning collaboration"
        description="The best buildings come from great partnerships between architects and engineers. We're ready to be part of your next project."
        secondaryLabel="View Projects"
        secondaryHref="/projects"
      />
    </>
  );
}
