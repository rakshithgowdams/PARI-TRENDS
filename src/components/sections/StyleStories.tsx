"use client";

import { useEffect, useRef, useState } from "react";
import StoryStage from "@/components/stories/StoryStage";

/**
 * StyleStories — Phase 06: Cinematic Style Stories
 *
 * Section ID: `stories`
 *
 * Architectural Features:
 *  • Immersive full-width cinematic fashion storytelling experience
 *  • Section header with Playfair Display editorial headline & gold accent rule
 *  • Interactive StoryStage featuring 16:9 master photography, crossfading chapters,
 *    and a floating horizontal thumbnail rail
 *  • Direct WhatsApp enquiry action per story theme
 *  • Lightweight entry reveal sequence respecting prefers-reduced-motion
 */
export default function StyleStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once on entry
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative w-full bg-[#FAF5EE] text-[#1E1A17] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#EFE4D6]"
      aria-label="Style Stories — Pari Trends"
    >
      {/* ─── Ambient Studio Glow ─── */}
      <div
        className="absolute top-1/4 -right-36 w-[550px] h-[550px] rounded-full bg-[#EFE4D6]/50 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-36 w-[500px] h-[500px] rounded-full bg-[#EFE4D6]/40 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* ─── Section Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-12 sm:pb-16 border-b border-[#EFE4D6]">
          <div className="max-w-2xl">
            {/* Eyebrow with gold accent rule */}
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "100ms" }}
            >
              <div className="h-[1px] w-8 sm:w-12 bg-[#C89A2D]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] font-semibold text-[#C89A2D] uppercase">
                04 / STYLE STORIES
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1E1A17] leading-[1.15] transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "200ms" }}
            >
              Every Look Has a{" "}
              <span className="italic font-serif text-[#D81B77] font-normal">
                Story.
              </span>
            </h2>
          </div>

          {/* Supporting Copy */}
          <div
            className={`max-w-md transition-all duration-700 ease-out ${
              isVisible || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "300ms" }}
          >
            <p className="font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed font-normal">
              Fashion for the moments that make you, you.
            </p>
            <span className="block mt-2 font-sans text-[10px] tracking-[0.2em] uppercase text-[#1E1A17]/40 font-medium">
              SIX CHAPTERS • CINEMATIC STORYTELLING
            </span>
          </div>
        </div>

        {/* ─── Interactive Story Stage ─── */}
        <div
          className={`mt-10 sm:mt-14 transition-all duration-1000 ease-out ${
            isVisible || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "400ms" }}
        >
          <StoryStage />
        </div>

        {/* ─── Bottom Subtle Editorial Caption ─── */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-[#EFE4D6]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B5B52]">
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5B52]/80">
            Click thumbnails or use arrow keys to navigate story chapters
          </p>
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5B52]/60">
            Pari Trends Editorial Campaign • Alur, Hassan
          </p>
        </div>

      </div>
    </section>
  );
}
