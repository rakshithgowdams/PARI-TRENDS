"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

interface TrendCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

const TREND_CATEGORIES: TrendCategory[] = [
  {
    id: "kurti-kurta",
    number: "01",
    title: "Kurti / Kurta Sets",
    subtitle: "Everyday to Occasion",
    description: "Refined Indian kurta sets with coordinated trousers and tasteful embroidery.",
    image: "/images/collections/01-kurti-kurta-sets.jpg",
    alt: "Pari Trends contemporary Indian Kurti and Kurta set with tasteful embroidery",
  },
  {
    id: "co-ords",
    number: "02",
    title: "Co-ord Sets",
    subtitle: "Modern Matching Silhouettes",
    description: "Contemporary two-piece coordinated sets designed for effortless elegance.",
    image: "/images/collections/02-co-ord-sets.jpg",
    alt: "Pari Trends modern matching two-piece co-ord set with tailored trousers",
  },
  {
    id: "party-wear",
    number: "03",
    title: "Party Wear & Dress Sets",
    subtitle: "Celebration Ensembles",
    description: "Gracefully embellished ethnic party dresses and three-piece celebration ensembles.",
    image: "/images/collections/04-party-wear.jpg",
    alt: "Pari Trends embellished occasion-ready party wear ensemble with rich fabric detailing",
  },
  {
    id: "western-tops",
    number: "04",
    title: "Western Tops",
    subtitle: "Chic Everyday Blouses",
    description: "Sophisticated western blouses and fashion tops crafted with premium fabrics.",
    image: "/images/collections/03-western-tops.jpg",
    alt: "Pari Trends chic contemporary western blouse top paired with neutral trousers",
  },
  {
    id: "nightwear",
    number: "05",
    title: "Nightwear",
    subtitle: "Soft Cotton Home Comfort",
    description: "Gentle, modest coordinated loungewear and night sets crafted from breathable cotton.",
    image: "/images/collections/05-nightwear.jpg",
    alt: "Pari Trends comfortable soft cotton coordinated lounge and nightwear set",
  },
  {
    id: "leggings-pants",
    number: "06",
    title: "Leggings / Straight Pants",
    subtitle: "Tailored Lower Silhouettes",
    description: "Perfect-fit straight trousers and soft leggings styled for comfort and poise.",
    image: "/images/collections/06-leggings-pants.jpg",
    alt: "Pari Trends tailored straight-cut trousers and comfortable leggings silhouette",
  },
  {
    id: "dupatta-sets",
    number: "07",
    title: "Dupatta Sets",
    subtitle: "Artisanal Drapery & Sheers",
    description: "Exquisite coordinated ethnic sets highlighting gracefully draped artisanal dupattas.",
    image: "/images/collections/07-dupatta-sets.jpg",
    alt: "Pari Trends elegant ethnic ensemble featuring a beautifully draped embroidered dupatta",
  },
];

/**
 * LatestTrendsTeaser — Restored Fashion-Magazine Composition
 *
 * Section ID: `trends`
 *
 * 3 Connected Visual Zones:
 *  1. Left: Oversized stacked typography ("LATEST" "TRENDS" in Manrope ExtraBold) + fashion-story copy
 *  2. Centre: Interactive layered fashion-image slider with 3 depth layers and smooth transitions
 *  3. Right: Compact interactive directory of all seven approved categories with live image updates
 */
export default function LatestTrendsTeaser() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const activeCategory = TREND_CATEGORIES[activeIndex];
  const nextCategory1 = TREND_CATEGORIES[(activeIndex + 1) % TREND_CATEGORIES.length];
  const nextCategory2 = TREND_CATEGORIES[(activeIndex + 2) % TREND_CATEGORIES.length];

  const handleNextStack = () => {
    setActiveIndex((prev) => (prev + 1) % TREND_CATEGORIES.length);
  };

  const getWhatsAppUrl = (cat: TrendCategory) => {
    if (siteConfig.whatsapp) {
      const msg = `Hello Pari Trends, I'm interested in learning more about your ${cat.title} collection at your Alur showroom.`;
      return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
    }
    return "#visit";
  };

  return (
    <section
      id="trends"
      ref={sectionRef}
      className="relative w-full bg-[#FAF5EE] text-[#1E1A17] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#EFE4D6]"
      aria-label="Latest Trends — Pari Trends Editorial Directory"
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
        
        {/* ─── 3-Zone Editorial Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* ═════════ ZONE 1: LEFT TYPOGRAPHY & FASHION STORY (3-4 cols) ═════════ */}
          <div
            className={`lg:col-span-3 xl:col-span-4 flex flex-col justify-center transition-all duration-700 ease-out ${
              isVisible || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "150ms" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="h-[1px] w-8 sm:w-12 bg-[#C89A2D]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] font-semibold text-[#C89A2D] uppercase">
                05 / THE DIRECTORY
              </span>
            </div>

            {/* Oversized Stacked Editorial Typography in Manrope ExtraBold */}
            <h2 className="font-sans font-extrabold uppercase text-5xl sm:text-6xl xl:text-7xl tracking-tighter text-[#1E1A17] leading-[0.9] mb-6">
              <span className="block">LATEST</span>
              <span className="block text-[#D81B77]">TRENDS</span>
            </h2>

            {/* Supporting Fashion Story Copy */}
            <p className="font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed mb-6 max-w-sm font-normal">
              From everyday grace to festive celebration edits, explore the silhouettes shaping modern elegance at our Alur showroom.
            </p>

            {/* Boutique Location Marker */}
            <div className="pt-4 border-t border-[#EFE4D6] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
              <span className="font-sans text-[10.5px] tracking-[0.22em] uppercase font-semibold text-[#1E1A17]/70">
                ALUR SHOWROOM • 7 SILHOUETTES
              </span>
            </div>
          </div>

          {/* ═════════ ZONE 2: CENTRE INTERACTIVE IMAGE STACK (5 cols) ═════════ */}
          <div
            className={`lg:col-span-5 xl:col-span-4 flex justify-center transition-all duration-700 ease-out ${
              isVisible || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "300ms" }}
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] mx-auto select-none">
              
              {/* Layer 3: Rearmost background layer */}
              <div
                className="absolute inset-0 rounded-[4px] overflow-hidden border border-[#EFE4D6] shadow-sm transform transition-all duration-500 ease-out pointer-events-none"
                style={{
                  transform: "translate(24px, 20px) scale(0.88)",
                  opacity: 0.35,
                  zIndex: 10,
                }}
              >
                <Image
                  src={nextCategory2.image}
                  alt={nextCategory2.alt}
                  fill
                  sizes="400px"
                  className="object-cover object-center filter grayscale-[30%]"
                />
              </div>

              {/* Layer 2: Middle layer */}
              <div
                className="absolute inset-0 rounded-[4px] overflow-hidden border border-[#EFE4D6] shadow-md transform transition-all duration-500 ease-out pointer-events-none"
                style={{
                  transform: "translate(12px, 10px) scale(0.94)",
                  opacity: 0.65,
                  zIndex: 20,
                }}
              >
                <Image
                  src={nextCategory1.image}
                  alt={nextCategory1.alt}
                  fill
                  sizes="400px"
                  className="object-cover object-center filter grayscale-[15%]"
                />
              </div>

              {/* Layer 1: Active Front Prominent Card */}
              <div
                onClick={handleNextStack}
                role="button"
                tabIndex={0}
                aria-label={`Next trend in stack, current: ${activeCategory.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNextStack();
                  }
                }}
                className="group absolute inset-0 rounded-[4px] overflow-hidden border border-white/20 bg-[#1E1A17] shadow-xl shadow-black/10 cursor-pointer transform transition-all duration-700 ease-out z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77]"
              >
                <Image
                  key={activeCategory.id}
                  src={activeCategory.image}
                  alt={activeCategory.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 450px"
                  priority
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle scrim for legibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Active Category Number Top Left */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-sm border border-white/20 text-[#F8F2EA]">
                  <span className="font-mono text-xs tracking-widest text-[#C89A2D] font-semibold">
                    {activeCategory.number}
                  </span>
                  <span className="text-white/40">/</span>
                  <span className="font-mono text-xs text-white/60">07</span>
                </div>

                {/* Tap Hint Top Right */}
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-[10px] tracking-wider uppercase text-white/80 group-hover:text-white group-hover:bg-[#D81B77] transition-colors duration-300">
                  Tap to Cycle
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 text-white">
                  <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#C89A2D] font-semibold block mb-1">
                    {activeCategory.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-white mb-2">
                    {activeCategory.title}
                  </h3>
                  <p className="font-sans text-xs text-[#EFE4D6]/80 line-clamp-2 leading-relaxed">
                    {activeCategory.description}
                  </p>
                </div>

                {/* Delicate Border */}
                <div
                  className="absolute inset-0 rounded-[4px] border border-white/10 pointer-events-none group-hover:border-[#D81B77]/40 transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>

            </div>
          </div>

          {/* ═════════ ZONE 3: RIGHT COMPACT 7-CATEGORY DIRECTORY (4 cols) ═════════ */}
          <div
            className={`lg:col-span-4 xl:col-span-4 flex flex-col justify-center transition-all duration-700 ease-out ${
              isVisible || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "450ms" }}
          >
            <div className="p-4 sm:p-5 rounded-[4px] bg-white/70 border border-[#EFE4D6] shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EFE4D6]">
                <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-[#1E1A17]/80">
                  CLOTHING DIRECTORY
                </span>
                <span className="font-mono text-[10.5px] text-[#C89A2D] font-semibold">
                  7 CATEGORIES
                </span>
              </div>

              {/* 7 Interactive Category Buttons */}
              <div role="tablist" aria-label="Approved Clothing Categories" className="space-y-1.5">
                {TREND_CATEGORIES.map((cat, index) => {
                  const isSelected = index === activeIndex;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveIndex(index)}
                      className={`group w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-[3px] text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D81B77] ${
                        isSelected
                          ? "bg-[#1E1A17] text-white shadow-sm"
                          : "hover:bg-[#EFE4D6]/50 text-[#1E1A17]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`font-mono text-[11px] tracking-wider transition-colors duration-200 ${
                            isSelected ? "text-[#C89A2D] font-semibold" : "text-[#6B5B52]"
                          }`}
                        >
                          {cat.number}
                        </span>
                        <span
                          className={`font-sans text-xs sm:text-[13px] truncate transition-colors duration-200 ${
                            isSelected ? "font-semibold text-white" : "font-medium text-[#1E1A17]"
                          }`}
                        >
                          {cat.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {isSelected ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B77]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#6B5B52]/50 group-hover:text-[#1E1A17] group-hover:translate-x-0.5 transition-all duration-200" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Link to Inquire on WhatsApp */}
              <div className="mt-4 pt-3 border-t border-[#EFE4D6]">
                <a
                  href={getWhatsAppUrl(activeCategory)}
                  target={siteConfig.whatsapp ? "_blank" : undefined}
                  rel={siteConfig.whatsapp ? "noopener noreferrer" : undefined}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#D81B77] hover:bg-[#b51461] text-white text-xs font-sans font-semibold tracking-wider uppercase transition-colors duration-300 shadow-sm"
                >
                  <span>Enquire {activeCategory.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
