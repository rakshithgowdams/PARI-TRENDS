"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import MobileFashionIndex from "@/components/trends/MobileFashionIndex";
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
    subtitle: "Pastel Sage & Pearl Embroidery",
    description: "Refined sage-mint silk kurta set with delicate pearl floral embroidery, paired with classic tailored cigarette trousers.",
    image: "/images/trends/trends-01-kurti-kurta.jpg",
    alt: "Pari Trends pastel sage silk kurti set with delicate pearl embroidery and straight trousers",
  },
  {
    id: "co-ords",
    number: "02",
    title: "Co-ord Sets",
    subtitle: "Tailored Oat-Beige Wrap Set",
    description: "Contemporary two-piece tailored wrap tunic with a fabric tie belt, clean lapels, and matching wide-leg trousers.",
    image: "/images/trends/trends-02-co-ord-sets.jpg",
    alt: "Pari Trends modern tailored wrap-style tunic and wide-leg trousers co-ord set",
  },
  {
    id: "party-wear",
    number: "03",
    title: "Party Wear & Dress Sets",
    subtitle: "Emerald Green & Gold Zari Gown",
    description: "Opulent deep emerald green Anarkali dress set with rich antique gold zari embroidery and scalloped organza dupatta.",
    image: "/images/trends/trends-03-party-wear.jpg",
    alt: "Pari Trends festive deep emerald green Anarkali dress set with gold zari work and scalloped dupatta",
  },
  {
    id: "western-tops",
    number: "04",
    title: "Western Tops",
    subtitle: "Terracotta Peplum & Bishop Sleeves",
    description: "Sophisticated terracotta-rust georgette peplum top with pintuck pleats and bishop sleeves, styled with high-waisted trousers.",
    image: "/images/trends/trends-04-western-tops.jpg",
    alt: "Pari Trends terracotta peplum blouse with bishop sleeves and tailored trousers",
  },
  {
    id: "nightwear",
    number: "05",
    title: "Nightwear",
    subtitle: "Mist-Blue Cotton Satin Set",
    description: "Pure cotton satin notch-collar loungewear sleep set with delicate white micro-piping and relaxed trousers for serene comfort.",
    image: "/images/trends/trends-05-nightwear.jpg",
    alt: "Pari Trends soft mist-blue cotton satin notch-collar loungewear sleep set",
  },
  {
    id: "leggings-pants",
    number: "06",
    title: "Leggings / Straight Pants",
    subtitle: "Tailored Olive-Sage Cigarette Pants",
    description: "Perfect-fit tailored olive-sage straight-cut cigarette trousers with sharp pintuck creases, paired with an elegant cream side-slit tunic.",
    image: "/images/trends/trends-06-leggings-pants.jpg",
    alt: "Pari Trends tailored olive-sage cigarette trousers with sharp pintuck creases",
  },
  {
    id: "dupatta-sets",
    number: "07",
    title: "Dupatta Sets",
    subtitle: "Marigold Woven Banarasi Silk Hero",
    description: "Exquisite marigold-gold Banarasi silk dupatta richly woven with floral zari jaal, draped over a minimalist raw-silk kurta set.",
    image: "/images/trends/trends-07-dupatta-sets.jpg",
    alt: "Pari Trends opulent marigold-gold Banarasi silk dupatta with golden zari floral jaal",
  },
];

/**
 * LatestTrendsTeaser — Scroll-Driven Editorial Directory & Lookbook
 *
 * Section ID: `trends`
 *
 * Desktop & Tablet (>= 768px):
 *  • Sticky scroll-linked runway (`350svh`) pinned below navbar
 *  • Synchronized vertical scroll scrubs through 7 approved categories
 *  • Silk-smooth crossfading card stack with active category highlight
 *  • Interactive directory linking scroll position to each silhouette
 *  • Dynamic WhatsApp inquiry CTA updating live with active selection
 *
 * Mobile (< 768px):
 *  • Dedicated interactive touch-editorial `MobileFashionIndex`
 */
export default function LatestTrendsTeaser() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const enableStickyScroll = isDesktop && !prefersReducedMotion;

  // Reveal animations
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
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Synchronize vertical scroll with active category on desktop
  useEffect(() => {
    if (!enableStickyScroll) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const header = document.querySelector("header");
        const navbarHeight = header?.offsetHeight ?? (window.innerWidth >= 1024 ? 80 : 76);
        const stageHeight = vh - navbarHeight;
        const totalScrollable = section.offsetHeight - stageHeight;
        if (totalScrollable <= 0) return;

        // Progress calculation based on section top relative to navbar boundary
        const scrolled = navbarHeight - rect.top;
        const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

        // Map progress across the 7 silhouettes
        const categoryCount = TREND_CATEGORIES.length;
        const index = Math.min(
          categoryCount - 1,
          Math.floor(progress * categoryCount)
        );

        setActiveIndex(index);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableStickyScroll]);

  // Smoothly scroll to a specific category segment on the scroll track
  const scrollToCategory = useCallback((index: number) => {
    setActiveIndex(index);
    const container = sectionRef.current;
    if (enableStickyScroll && container) {
      const vh = window.innerHeight;
      const header = document.querySelector("header");
      const navbarHeight = header?.offsetHeight ?? (window.innerWidth >= 1024 ? 80 : 76);
      const stageHeight = vh - navbarHeight;
      const totalScrollable = container.offsetHeight - stageHeight;
      if (totalScrollable <= 0) return;

      const categoryCount = TREND_CATEGORIES.length;
      // Scroll to the midpoint of the category's segment
      const targetRatio = (index + 0.5) / categoryCount;
      const containerTop = window.scrollY + container.getBoundingClientRect().top;
      const stickStartScrollY = containerTop - navbarHeight;
      const targetScrollY = stickStartScrollY + targetRatio * totalScrollable;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  }, [enableStickyScroll]);

  const activeCategory = TREND_CATEGORIES[activeIndex];
  const nextCategory1 = TREND_CATEGORIES[(activeIndex + 1) % TREND_CATEGORIES.length];
  const nextCategory2 = TREND_CATEGORIES[(activeIndex + 2) % TREND_CATEGORIES.length];

  const handleNextStack = () => {
    const nextIdx = (activeIndex + 1) % TREND_CATEGORIES.length;
    if (enableStickyScroll) {
      scrollToCategory(nextIdx);
    } else {
      setActiveIndex(nextIdx);
    }
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
      className={
        enableStickyScroll
          ? "relative w-full bg-[#FAF5EE] text-[#1E1A17] overflow-visible border-t border-[#EFE4D6] h-[350svh]"
          : "relative w-full bg-[#FAF5EE] text-[#1E1A17] py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden border-t border-[#EFE4D6]"
      }
      aria-label="Latest Trends — Pari Trends Editorial Directory"
    >
      <div className={enableStickyScroll ? "trends-sticky-stage w-full overflow-hidden" : "w-full"}>
        
        {/* ─── Ambient Studio Glow ─── */}
        <div
          className="absolute top-1/4 -right-36 w-[550px] h-[550px] rounded-full bg-[#EFE4D6]/50 blur-3xl pointer-events-none -z-0"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 -left-36 w-[500px] h-[500px] rounded-full bg-[#EFE4D6]/40 blur-3xl pointer-events-none -z-0"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          
          {/* ─── Mobile Fashion Index (< 768px) ─── */}
          <div className="block md:hidden w-full">
            <MobileFashionIndex prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/* ─── Desktop / Tablet 3-Zone Composition (>= 768px) ─── */}
          <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
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

              {/* Boutique Location Marker & Silhouette Counter */}
              <div className="pt-4 border-t border-[#EFE4D6] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
                  <span className="font-sans text-[10.5px] tracking-[0.22em] uppercase font-semibold text-[#1E1A17]/70">
                    ALUR SHOWROOM • 7 SILHOUETTES
                  </span>
                </div>
                {enableStickyScroll && (
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#C89A2D]">
                    <span className="font-semibold">{activeCategory.number}</span>
                    <span className="text-[#1E1A17]/30">/</span>
                    <span className="text-[#1E1A17]/50 font-sans text-[10px]">07</span>
                  </div>
                )}
              </div>

              {/* Subtle Scroll Progress Indicator */}
              {enableStickyScroll && (
                <div
                  className="w-full bg-[#EFE4D6] h-[2px] rounded-full mt-3 overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="bg-[#D81B77] h-full transition-all duration-300 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / TREND_CATEGORIES.length) * 100}%`,
                    }}
                  />
                </div>
              )}
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
                  aria-label={`Current trend: ${activeCategory.title}. Click to view next trend.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNextStack();
                    }
                  }}
                  className="group absolute inset-0 rounded-[4px] overflow-hidden border border-white/20 bg-[#1E1A17] shadow-xl shadow-black/10 cursor-pointer transform transition-all duration-700 ease-out z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77]"
                >
                  {/* Preloaded crossfading images for 60fps stutter-free scroll scrubbing */}
                  {TREND_CATEGORIES.map((cat, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <div
                        key={cat.id}
                        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                          isActive
                            ? "opacity-100 z-10 pointer-events-auto"
                            : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <Image
                          src={cat.image}
                          alt={cat.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 450px"
                          priority={idx <= 2}
                          className={`object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                            isActive ? "scale-100" : "scale-105"
                          }`}
                        />
                      </div>
                    );
                  })}

                  {/* Subtle scrim for legibility */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-15"
                    aria-hidden="true"
                  />

                  {/* Active Category Number Top Left */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/40 backdrop-blur-sm border border-white/20 text-[#F8F2EA]">
                    <span className="font-mono text-xs tracking-widest text-[#C89A2D] font-semibold">
                      {activeCategory.number}
                    </span>
                    <span className="text-white/40">/</span>
                    <span className="font-mono text-xs text-white/60">07</span>
                  </div>

                  {/* Interaction Mode Hint Top Right */}
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-[10px] tracking-wider uppercase text-white/80 group-hover:text-white group-hover:bg-[#D81B77] transition-colors duration-300">
                    {enableStickyScroll ? "Scroll to Explore" : "Tap to Cycle"}
                  </div>

                  {/* Bottom Details Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20 text-white">
                    <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#C89A2D] font-semibold block mb-1 transition-all duration-300">
                      {activeCategory.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-white mb-2 transition-all duration-300">
                      {activeCategory.title}
                    </h3>
                    <p className="font-sans text-xs text-[#EFE4D6]/80 line-clamp-2 leading-relaxed transition-all duration-300">
                      {activeCategory.description}
                    </p>
                  </div>

                  {/* Delicate Border */}
                  <div
                    className="absolute inset-0 rounded-[4px] border border-white/10 pointer-events-none z-20 group-hover:border-[#D81B77]/40 transition-colors duration-300"
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
              <div className="p-4 sm:p-5 rounded-[4px] bg-white/70 border border-[#EFE4D6] shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EFE4D6]">
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-[#1E1A17]/80">
                    CLOTHING DIRECTORY
                  </span>
                  <span className="font-mono text-[10.5px] text-[#C89A2D] font-semibold">
                    7 CATEGORIES
                  </span>
                </div>

                {/* 7 Interactive Category Rows with live sync */}
                <div role="tablist" aria-label="Approved Clothing Categories" className="space-y-1.5">
                  {TREND_CATEGORIES.map((cat, index) => {
                    const isSelected = index === activeIndex;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => scrollToCategory(index)}
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

                {/* Live Action Link to Inquire on WhatsApp */}
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
      </div>
    </section>
  );
}
