"use client";

import { useState } from "react";
import SectionLabel from "@/components/SectionLabel";
import OfficeCard from "@/components/OfficeCard";
import FadeIn from "@/components/FadeIn";
import BlueprintGrid from "@/components/svg/BlueprintGrid";
import { OFFICES, PHONE, EMAIL } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="relative bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <BlueprintGrid opacity={0.02} fadeDirection="top-right" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — Info */}
            <div>
              <FadeIn direction="left">
                <SectionLabel>Contact</SectionLabel>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
                  Get in touch
                </h1>
                <p className="mt-4 text-lg text-stone-600 leading-relaxed">
                  Whether you are starting a new project, evaluating a renovation, or looking for a structural peer review — we are ready to talk.
                </p>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="mt-10 space-y-4">
                  <div className="flex items-center gap-3 text-stone-600">
                    <svg className="h-5 w-5 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="hover:text-charcoal transition-colors duration-200">
                      {PHONE}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <svg className="h-5 w-5 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${EMAIL}`} className="hover:text-charcoal transition-colors duration-200">
                      {EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-stone-600">
                    <svg className="h-5 w-5 text-stone-400 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <a
                      href="https://www.linkedin.com/company/rse-associates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-charcoal transition-colors duration-200"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Offices */}
              <FadeIn delay={200}>
                <div className="mt-12 space-y-4">
                  <h2 className="text-xs font-medium uppercase tracking-[0.15em] text-stone-400 mb-4">Offices</h2>
                  {OFFICES.map((office) => (
                    <OfficeCard key={office.label} {...office} />
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right — Form */}
            <FadeIn delay={150} direction="right">
              <div>
                {submitted ? (
                  <div className="bg-stone-50 border border-stone-200 p-12 text-center">
                    <h2 className="font-heading text-2xl font-bold text-charcoal">Thank you</h2>
                    <p className="mt-3 text-stone-600">
                      We have received your message and will respond within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
                          First Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full px-4 py-3 text-sm border border-stone-200 bg-white text-charcoal placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-2">
                          Last Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          className="w-full px-4 py-3 text-sm border border-stone-200 bg-white text-charcoal placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 text-sm border border-stone-200 bg-white text-charcoal placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className="w-full px-4 py-3 text-sm border border-stone-200 bg-white text-charcoal placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                        Subject <span className="text-accent">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 text-sm border border-stone-200 bg-white text-charcoal focus:outline-none focus:border-stone-400 transition-colors duration-200"
                        defaultValue=""
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="new-project">New Project Inquiry</option>
                        <option value="peer-review">Structural Peer Review</option>
                        <option value="investigation">Structural Investigation</option>
                        <option value="careers">Careers / Employment</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="w-full px-4 py-3 text-sm border border-stone-200 bg-white text-charcoal placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors duration-200 resize-vertical"
                        placeholder="Tell us about your project or question..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-arrow inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wide bg-charcoal text-white hover:bg-stone-800 transition-colors duration-200 cursor-pointer w-full sm:w-auto"
                    >
                      Send Message
                      <svg className="btn-arrow-icon h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
