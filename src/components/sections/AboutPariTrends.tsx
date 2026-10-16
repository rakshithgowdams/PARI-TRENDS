"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/**
 * AboutPariTrends — Phase 03: The Pari Editorial
 *
 * Concept: "The Pari Editorial — A Fashion Magazine Spread"
 *
 * Features:
 *  • Asymmetric magazine composition with intentional negative space
 *  • Expressive typography: High-contrast Playfair Display with hand-set italic overlap in Pari Pink
 *  • Layered editorial photography:
 *      1. Full-height vertical portrait (approved master model)
 *      2. Architectural warm-beige (#EFE4D6) offset backing frame
 *      3. Overlapping square detail crop of the garment's floral embroidery
 *      4. Vertical running typography ("THE PARI STORY")
 *  • Subtle background typographic watermark ("PARI") in ultra-low opacity serif
 *  • Understated text-link CTA with animated underline and directional arrow
 *  • Lightweight IntersectionObserver entry reveals with strict prefers-reduced-motion support
 */
export default function AboutPariTrends() {
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
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#F8F2EA] text-[#1E1A17] py-24 sm:py-32 lg:py-44 overflow-hidden"
      aria-label="About Pari Trends — The Boutique"
    >
      {/* Ambient warm gradient glow */}
      <div
        className="absolute -top-32 left-1/3 w-[550px] h-[550px] rounded-full bg-[#EFE4D6]/50 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 sm:gap-16 lg:gap-12 xl:gap-20 items-center">

          {/* ─── 2. Left Column: Editorial Storytelling (~55% width) ─── */}
          <div className="relative lg:col-span-6 xl:col-span-6 flex flex-col justify-center">

            {/* ─── Subtle Editorial Background Typography: "PARI" Watermark (Left Column Exclusive) ─── */}
            <div
              className="absolute left-0 bottom-4 sm:bottom-8 lg:bottom-12 pointer-events-none select-none overflow-hidden z-0 opacity-[0.035] sm:opacity-[0.045] max-w-full"
              aria-hidden="true"
            >
              <span className="font-serif font-bold text-[clamp(6rem,15vw,13.5rem)] leading-none text-[#1E1A17] tracking-[0.06em] select-none block -translate-x-2 sm:-translate-x-4">
                PARI
              </span>
            </div>

            <div className="relative z-10 flex flex-col justify-center">
              {/* Small Eyebrow Label */}
              <div
                className={`flex items-center gap-3 mb-6 sm:mb-8 transition-all duration-700 ease-out ${
                  isVisible || prefersReducedMotion
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: prefersReducedMotion ? "0ms" : "100ms" }}
              >
                <span className="w-8 h-[1.5px] bg-[#C89A2D]" aria-hidden="true" />
                <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.3em] uppercase text-[#C89A2D]">
                  01 / THE BOUTIQUE
                </span>
              </div>

            {/* Expressive Editorial Headline with Hand-Set Typographic Overlap */}
            <div className="mb-6 sm:mb-8">
              {/* Primary Line */}
              <h2
                className={`font-serif text-[clamp(2.75rem,5.4vw,5.2rem)] font-medium leading-[0.98] tracking-tight text-[#1E1A17] transition-all duration-700 ease-out ${
                  isVisible || prefersReducedMotion
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: prefersReducedMotion ? "0ms" : "220ms" }}
              >
                Everyday Style.
              </h2>

              {/* Expressive Secondary Line — Playfair Display Italic in Pari Pink with overlapping negative margin */}
              <span
                className={`block font-serif italic font-normal text-[clamp(3.1rem,6.4vw,5.9rem)] text-[#D81B77] -mt-1.5 sm:-mt-3 lg:-mt-4 leading-[1.05] tracking-tight transition-all duration-750 ease-out ${
                  isVisible || prefersReducedMotion
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: prefersReducedMotion ? "0ms" : "380ms" }}
              >
                Beautifully Yours.
              </span>
            </div>

            {/* Elegant Short Gold Rule */}
            <div
              className={`w-12 h-[1.5px] bg-[#C89A2D] mb-6 sm:mb-7 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0 origin-left"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "480ms" }}
              aria-hidden="true"
            />

            {/* Supporting Paragraph — ~45-55 characters per line */}
            <p
              className={`font-sans text-[16.5px] sm:text-[18px] lg:text-[19px] font-normal text-[#6B5B52] leading-[1.8] max-w-[48ch] mb-8 sm:mb-10 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "540ms" }}
            >
              From comfortable everyday looks to occasion-ready outfits, discover women&apos;s
              fashion curated for every kind of moment.
            </p>

            {/* Understated Text-Link CTA & Location Signature */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 pt-1 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "640ms" }}
            >
              {/* Understated Editorial Text-Link with Animated Underline */}
              <a
                href="#collections"
                className="group inline-flex items-center gap-2.5 text-[15px] sm:text-[16px] font-sans font-semibold tracking-wide text-[#1E1A17] hover:text-[#D81B77] transition-colors duration-250 py-1"
                aria-label="Explore our curated fashion collections"
              >
                <span className="relative">
                  Explore Our Collections
                  {/* Left-to-right animated underline */}
                  <span
                    className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-[#D81B77] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={2.4}
                  className="text-[#D81B77] transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              {/* Location Signature */}
              <div className="flex items-center gap-2.5 text-[#6B5B52]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" aria-hidden="true" />
                <span className="font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.25em] uppercase">
                  Pari Trends — Alur, Hassan
                </span>
              </div>
            </div>

          </div>
        </div>

          {/* ─── 3. Right Column: Layered Fashion Editorial (~45% width) ─── */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end pt-4 sm:pt-6 lg:pt-0">

            {/* Vertical Running Editorial Text ("THE PARI STORY") */}
            <div
              className="hidden xl:flex absolute -right-9 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 items-center gap-3 select-none pointer-events-none"
              aria-hidden="true"
            >
              <span className="font-sans text-[9.5px] tracking-[0.4em] font-medium uppercase text-[#6B5B52]/55">
                THE PARI STORY
              </span>
              <span className="w-8 h-[1px] bg-[#C89A2D]/40" />
            </div>

            {/* Composition Wrapper */}
            <div className="relative w-full max-w-[450px] lg:max-w-[480px]">

              {/* Architectural Offset Backing Shape (#EFE4D6) */}
              <div
                className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 right-4 sm:right-6 bottom-4 sm:bottom-6 rounded-2xl bg-[#EFE4D6] -z-10"
                aria-hidden="true"
              />

              {/* Main Fashion Model Portrait (4:5 vertical aspect ratio) */}
              <div
                className={`relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#EFE4D6] shadow-[0_20px_50px_rgba(30,26,23,0.09)] ring-1 ring-[#1E1A17]/10 transition-all duration-1000 ease-out ${
                  isVisible || prefersReducedMotion
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.03]"
                }`}
                style={{ transitionDelay: prefersReducedMotion ? "0ms" : "280ms" }}
              >
                <Image
                  src="/images/pari-trends-about-editorial.jpg"
                  alt="Pari Trends curated contemporary ethnic fashion collection"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 480px"
                  className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.02]"
                />

                {/* Subtle Editorial Collection Chip */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F8F2EA]/90 backdrop-blur-sm border border-[#EFE4D6] text-[9.5px] font-sans font-medium tracking-[0.2em] uppercase text-[#1E1A17]/80">
                  Lookbook 2026
                </div>
              </div>

              {/* Overlapping Garment Embroidery Detail Crop (Bottom-Left) */}
              <div
                className={`absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-8 lg:-left-10
                  w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44
                  rounded-xl overflow-hidden bg-[#F8F2EA] p-1.5 sm:p-2
                  shadow-[0_16px_36px_rgba(30,26,23,0.13)]
                  ring-1 ring-[#C89A2D]/35 z-20 group
                  transition-all duration-800 ease-out ${
                    isVisible || prefersReducedMotion
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: prefersReducedMotion ? "0ms" : "580ms" }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#EFE4D6]">
                  <Image
                    src="/images/pari-trends-embroidery-detail.jpg"
                    alt="Authentic handcrafted yoke embroidery detail"
                    fill
                    sizes="176px"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Editorial caption bar */}
                  <div className="absolute inset-x-0 bottom-0 py-1 px-2 bg-[#1E1A17]/85 backdrop-blur-xs text-center">
                    <span className="block text-[8px] sm:text-[8.5px] font-sans font-semibold tracking-[0.22em] uppercase text-[#F8F2EA]">
                      Handcrafted Detail
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Caption beneath portrait */}
              <div className="mt-4 sm:mt-5 flex items-center justify-between pl-32 sm:pl-36 lg:pl-40 pr-2">
                <span className="font-sans text-[10px] sm:text-[10.5px] font-medium tracking-[0.25em] uppercase text-[#6B5B52]/75">
                  Style for Every Moment
                </span>
                <span className="font-sans text-[10px] sm:text-[10.5px] font-medium tracking-[0.2em] text-[#C89A2D]/85">
                  Edition 01
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
