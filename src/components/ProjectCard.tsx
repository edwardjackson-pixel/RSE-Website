"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import StructuralPattern from "@/components/svg/StructuralPattern";

interface ProjectCardProps {
  title: string;
  location: string;
  category: string;
  description: string;
  imageAlt: string;
  imageSrc?: string;
  href?: string;
}

function ProjectImage({
  imageSrc,
  imageAlt,
  category,
}: {
  imageSrc?: string;
  imageAlt: string;
  category: string;
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 project-image-wrap">
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="project-image-overlay absolute inset-0 bg-charcoal/40 flex items-center justify-center">
            <span className="text-white text-sm font-medium tracking-wide border border-white/60 px-4 py-2">
              View Project
            </span>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <StructuralPattern category={category} className="opacity-20" />
        </div>
      )}
      <span className="absolute bottom-4 left-4 z-10 text-xs font-medium uppercase tracking-[0.15em] text-stone-600 bg-white/90 backdrop-blur-sm px-3 py-1.5">
        {category}
      </span>
    </div>
  );
}

function ProjectDetails({
  title,
  location,
  description,
}: {
  title: string;
  location: string;
  description: string;
}) {
  return (
    <div className="mt-4">
      <h3 className="font-heading text-lg font-semibold text-charcoal group-hover:text-accent transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-stone-500 mt-1">{location}</p>
      <p className="text-sm text-stone-600 mt-2 leading-relaxed line-clamp-2">
        {description}
      </p>
    </div>
  );
}

export default function ProjectCard({
  title,
  location,
  category,
  description,
  imageAlt,
  imageSrc,
  href,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const usesLink = Boolean(href && href !== "#");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const cardContent = (
    <article className="relative">
      <ProjectImage imageSrc={imageSrc} imageAlt={imageAlt} category={category} />
      <ProjectDetails title={title} location={location} description={description} />
    </article>
  );

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            role="presentation"
            onClick={close}
          >
            <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" aria-hidden="true" />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center bg-white/90 text-charcoal hover:text-accent transition-colors duration-200 cursor-pointer"
                aria-label="Close project details"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {imageSrc && (
                <div className="relative aspect-[4/3] w-full bg-stone-100">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  {category}
                </p>
                <h2 id={titleId} className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
                  {title}
                </h2>
                <p className="mt-2 text-sm text-stone-500">{location}</p>
                <p className="mt-4 text-stone-600 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  if (usesLink) {
    return (
      <Link href={href!} className="group cursor-pointer block">
        {cardContent}
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group cursor-pointer block w-full text-left"
        aria-haspopup="dialog"
      >
        {cardContent}
      </button>
      {modal}
    </>
  );
}
