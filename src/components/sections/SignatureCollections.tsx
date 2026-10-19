"use client";

import { useEffect, useRef, useState } from "react";
import CollectionCard from "@/components/collections/CollectionCard";
import { COLLECTIONS_DATA } from "@/data/collections";

/**
 * SignatureCollections — Phase 04: Curated Fashion Lookbook
 *
 * Section ID: `collections`
 *
 * Architectural Features:
 *  • 12-Column Responsive Editorial Grid:
 *      - Row 1: 3 larger statement cards (4 cols each)
 *          [01 Kurti / Kurta Sets, 02 Co-ord Sets, 04 Party Wear & Dress Sets]
 *      - Row 2: 4 smaller cards (3 cols each)
 *          [03 Western Tops, 05 Nightwear, 06 Leggings / Straight Pants, 07 Dupatta Sets]
 *  • 4:5 Aspect ratio full-bleed imagery with consistent art-direction & South Indian model identity
 *  • Editorial header composition with Playfair Display italic headline and gold accent rule
 *  • Performant IntersectionObserver scroll reveal sequence with staggered card entries
 *  • Complete touch & keyboard accessibility
 */
export default function SignatureCollections() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [row1Visible, setRow1Visible] = useState(false);
  const [row2Visible, setRow2Visible] = useState(false);
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
      setHeaderVisible(true);
      setRow1Visible(true);
      setRow2Visible(true);
      return;
    }

    const headerEl = sectionRef.current;
    const row1El = row1Ref.current;
    const row2El = row2Ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerEl) {
              setHeaderVisible(true);
            } else if (entry.target === row1El) {
              setRow1Visible(true);
            } else if (entry.target === row2El) {
              setRow2Visible(true);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (headerEl) observer.observe(headerEl);
    if (row1El) observer.observe(row1El);
    if (row2El) observer.observe(row2El);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative w-full bg-[#FAF5EE] text-[#1E1A17] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#EFE4D6]"
      aria-label="Signature Collections — Pari Trends"
    >
      {/* ─── Ambient Studio Light Warm Glow ─── */}
      <div
        className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#EFE4D6]/40 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-40 w-[500px] h-[500px] rounded-full bg-[#EFE4D6]/35 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* ─── Section Header: Editorial Headline & Copy ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-12 sm:pb-16 border-b border-[#EFE4D6]">
          <div className="max-w-2xl">
            {/* Eyebrow with delicate gold rule */}
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 ease-out ${
                headerVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "100ms" }}
            >
              <div className="h-[1px] w-8 sm:w-12 bg-[#C89A2D]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] font-semibold text-[#C89A2D] uppercase">
                02 / THE COLLECTIONS
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1E1A17] leading-[1.15] transition-all duration-700 ease-out ${
                headerVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "200ms" }}
            >
              Find Your Kind of{" "}
              <span className="italic font-serif text-[#D81B77] font-normal">
                Beautiful.
              </span>
            </h2>
          </div>

          {/* Supporting Copy & Editorial Caption */}
          <div
            className={`max-w-md transition-all duration-700 ease-out ${
              headerVisible || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "300ms" }}
          >
            <p className="font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed font-normal">
              Explore styles curated for every moment, from everyday essentials to occasion-ready looks.
            </p>
            <span className="block mt-2 font-sans text-[10px] tracking-[0.2em] uppercase text-[#1E1A17]/40 font-medium">
              CURATED FOR EVERY MOMENT • ALUR BOUTIQUE
            </span>
          </div>
        </div>

        {/* ─── Editorial Grid: 12-Column Responsive Layout with Row-by-Row Gallery Reveal ─── */}
        <div className="mt-12 sm:mt-16 space-y-6">
          {/* Row 1: Statement Sets (3 Cards, 4 cols each) */}
          <div
            ref={row1Ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6"
          >
            {COLLECTIONS_DATA.slice(0, 3).map((collection, index) => {
              const delay = prefersReducedMotion ? 0 : index * 120;
              const cardVisible = row1Visible || prefersReducedMotion;
              return (
                <div
                  key={collection.id}
                  className={`col-span-1 sm:col-span-1 lg:col-span-4 transition-all duration-700 ease-out will-change-transform ${
                    cardVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-[1.03]"
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <CollectionCard collection={collection} priority={index < 2} />
                </div>
              );
            })}
          </div>

          {/* Row 2: Versatile Wardrobe (4 Cards, 3 cols each) */}
          <div
            ref={row2Ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6"
          >
            {COLLECTIONS_DATA.slice(3, 7).map((collection, index) => {
              const delay = prefersReducedMotion ? 0 : index * 100;
              const cardVisible = row2Visible || prefersReducedMotion;
              const isLastCard = index === 3; // 7th category (Dupatta Sets)
              return (
                <div
                  key={collection.id}
                  className={`col-span-1 sm:col-span-1 lg:col-span-3 ${
                    isLastCard
                      ? "sm:col-span-2 sm:max-w-md sm:mx-auto lg:max-w-none lg:col-span-3"
                      : ""
                  } transition-all duration-700 ease-out will-change-transform ${
                    cardVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-6 scale-[1.03]"
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <CollectionCard collection={collection} priority={false} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Bottom Subtle Editorial Note ─── */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#EFE4D6]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B5B52]">
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5B52]/80">
            Handpicked fabrics • Made for modern Indian women
          </p>
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5B52]/60">
            7 Signature Categories • In-Store at Alur, Hassan
          </p>
        </div>

      </div>
    </section>
  );
}
