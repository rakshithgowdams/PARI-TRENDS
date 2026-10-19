"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export interface FashionIndexCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  aspectFocus?: string;
}

export const FASHION_INDEX_CATEGORIES: FashionIndexCategory[] = [
  {
    id: "kurti-kurta",
    number: "01",
    title: "Kurti / Kurta Sets",
    subtitle: "Pastel Sage & Pearl Embroidery",
    image: "/images/trends/trends-01-kurti-kurta.jpg",
    alt: "Pari Trends pastel sage silk kurti set with delicate pearl embroidery and straight trousers",
    aspectFocus: "object-[center_20%]",
  },
  {
    id: "co-ords",
    number: "02",
    title: "Co-ord Sets",
    subtitle: "Tailored Oat-Beige Wrap Set",
    image: "/images/trends/trends-02-co-ord-sets.jpg",
    alt: "Pari Trends modern tailored wrap-style tunic and wide-leg trousers co-ord set",
    aspectFocus: "object-[center_22%]",
  },
  {
    id: "party-wear",
    number: "03",
    title: "Party Wear & Dress Sets",
    subtitle: "Emerald Green & Gold Zari Gown",
    image: "/images/trends/trends-03-party-wear.jpg",
    alt: "Pari Trends festive deep emerald green Anarkali dress set with gold zari work and scalloped dupatta",
    aspectFocus: "object-[center_20%]",
  },
  {
    id: "western-tops",
    number: "04",
    title: "Western Tops",
    subtitle: "Terracotta Peplum & Bishop Sleeves",
    image: "/images/trends/trends-04-western-tops.jpg",
    alt: "Pari Trends terracotta peplum blouse with bishop sleeves and tailored trousers",
    aspectFocus: "object-[center_20%]",
  },
  {
    id: "nightwear",
    number: "05",
    title: "Nightwear",
    subtitle: "Mist-Blue Cotton Satin Set",
    image: "/images/trends/trends-05-nightwear.jpg",
    alt: "Pari Trends soft mist-blue cotton satin notch-collar loungewear sleep set",
    aspectFocus: "object-[center_25%]",
  },
  {
    id: "leggings-pants",
    number: "06",
    title: "Leggings / Straight Pants",
    subtitle: "Tailored Olive-Sage Cigarette Pants",
    image: "/images/trends/trends-06-leggings-pants.jpg",
    alt: "Pari Trends tailored olive-sage cigarette trousers with sharp pintuck creases",
    aspectFocus: "object-[center_20%]",
  },
  {
    id: "dupatta-sets",
    number: "07",
    title: "Dupatta Sets",
    subtitle: "Marigold Woven Banarasi Silk Hero",
    image: "/images/trends/trends-07-dupatta-sets.jpg",
    alt: "Pari Trends opulent marigold-gold Banarasi silk dupatta with golden zari floral jaal",
    aspectFocus: "object-[center_20%]",
  },
];

interface MobileFashionIndexProps {
  prefersReducedMotion?: boolean;
}

/**
 * MobileFashionIndex — The Pari Fashion Index
 *
 * Interactive Fashion-Magazine Cover Presentation for Mobile (< 768px):
 *  1. Compact editorial section heading ("LATEST" in Charcoal, "TRENDS." in Pari Pink)
 *  2. Large interactive portrait fashion photograph with subtle lower metadata overlay
 *  3. Prominent selected-style enquiry CTA placed directly beneath the photograph
 *  4. Compact two-column interactive fashion index with live style updates
 *  5. Magazine-page reveal transitions with accessible reduced-motion support
 */
export default function MobileFashionIndex({
  prefersReducedMotion = false,
}: MobileFashionIndexProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = FASHION_INDEX_CATEGORIES[activeIndex] ?? FASHION_INDEX_CATEGORIES[0];
  const previousCategory =
    previousIndex !== null ? FASHION_INDEX_CATEGORIES[previousIndex] ?? null : null;

  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);

  const getWhatsAppUrl = useCallback((categoryTitle: string) => {
    if (siteConfig.whatsapp) {
      const message = `Hello Pari Trends, I would like to enquire about your ${categoryTitle} collection.`;
      return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    }
    return "#visit";
  }, []);

  const selectCategory = (newIndex: number) => {
    if (newIndex === activeIndex || newIndex < 0 || newIndex >= FASHION_INDEX_CATEGORIES.length) {
      return;
    }

    setPreviousIndex(activeIndex);
    setActiveIndex(newIndex);
    setIsTransitioning(true);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setPreviousIndex(null);
    }, prefersReducedMotion ? 150 : 520);
  };

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Preload adjacent images for smooth response
  const prevImg = activeIndex > 0 ? FASHION_INDEX_CATEGORIES[activeIndex - 1].image : null;
  const nextImg =
    activeIndex < FASHION_INDEX_CATEGORIES.length - 1
      ? FASHION_INDEX_CATEGORIES[activeIndex + 1].image
      : null;

  return (
    <div className="w-full flex flex-col select-none">
      {/* ─── Hidden Preloaders ─── */}
      <div className="hidden" aria-hidden="true">
        {prevImg && <Image src={prevImg} alt="" width={420} height={525} priority />}
        {nextImg && <Image src={nextImg} alt="" width={420} height={525} priority />}
      </div>

      {/* ─── 1. Compact Editorial Section Heading ─── */}
      <div className="mb-4">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-[1px] w-7 bg-[#C89A2D]" aria-hidden="true" />
          <span className="font-sans text-[11px] tracking-[0.28em] font-semibold text-[#C89A2D] uppercase">
            05 / THE FASHION INDEX
          </span>
        </div>

        {/* Primary Headline: LATEST (Charcoal) TRENDS. (Pari Pink) */}
        <h2 className="font-sans font-extrabold uppercase tracking-tight leading-[0.88] mb-2.5 text-[clamp(2.75rem,11.5vw,3.75rem)]">
          <span className="block text-[#1E1A17]">LATEST</span>
          <span className="block text-[#D81B77]">TRENDS.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="font-sans text-xs sm:text-sm text-[#6B5B52] leading-relaxed max-w-sm font-normal">
          Explore seven signature styles for every kind of moment.
        </p>
      </div>

      {/* ─── 2. Large Interactive Fashion Photograph ─── */}
      <div className="relative w-full aspect-[4/5] max-w-[420px] mx-auto rounded-[6px] overflow-hidden bg-[#FAF5EE] border border-[#EFE4D6] shadow-[0_12px_32px_rgba(30,26,23,0.08)]">
        {/* Outgoing Image Crossfade */}
        {previousCategory && isTransitioning && !prefersReducedMotion && (
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <Image
              src={previousCategory.image}
              alt={previousCategory.alt}
              fill
              sizes="(max-width: 640px) 100vw, 420px"
              className={`object-cover ${previousCategory.aspectFocus || "object-center"} transition-opacity duration-400 ease-out opacity-0 scale-[0.985]`}
            />
          </div>
        )}

        {/* Incoming / Active Image */}
        <div
          key={activeCategory.id}
          className={`absolute inset-0 w-full h-full overflow-hidden z-10 ${
            !prefersReducedMotion && isTransitioning
              ? "animate-magazine-reveal"
              : "opacity-100 scale-100"
          }`}
        >
          <Image
            src={activeCategory.image}
            alt={activeCategory.alt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 420px"
            className={`object-cover ${activeCategory.aspectFocus || "object-center"} will-change-transform`}
          />
        </div>

        {/* Subtle Bottom Scrim for Metadata Legibility (Lower 28% only, leaving model unshaded) */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-15"
          aria-hidden="true"
        />

        {/* Top Look Indicator Pill */}
        <div className="absolute top-3.5 left-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" aria-hidden="true" />
          <span className="font-mono text-[10.5px] font-bold tracking-wider text-white">
            {activeCategory.number}
          </span>
          <span className="text-white/40 text-[10px]">/</span>
          <span className="font-mono text-[10px] text-white/70">07</span>
        </div>

        {/* Bottom Metadata Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 flex items-end justify-between">
          <div className="min-w-0 pr-2">
            <span className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-[#C89A2D] font-bold block mb-0.5">
              LOOK {activeCategory.number} / 07
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-tight truncate">
              {activeCategory.title}
            </h3>
            <p className="font-sans text-[11px] text-[#F8F2EA]/85 font-normal truncate mt-0.5">
              {activeCategory.subtitle}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full border border-white/25 bg-black/35 backdrop-blur-sm flex items-center justify-center text-[#F8F2EA] shrink-0">
            <ArrowUpRight className="w-4 h-4 text-[#C89A2D]" />
          </div>
        </div>
      </div>

      {/* ─── 3. Prominent Selected-Style Enquiry CTA (Immediately Below Photo) ─── */}
      <a
        href={getWhatsAppUrl(activeCategory.title)}
        target={isExternalWhatsApp ? "_blank" : undefined}
        rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
        className="w-full mt-3.5 mb-5 py-3.5 px-5 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white font-sans text-xs sm:text-[13px] font-semibold tracking-wider uppercase shadow-md shadow-[#D81B77]/25 flex items-center justify-center gap-2 active:scale-98 transition-all"
      >
        <span>Enquire About This Style</span>
        <ArrowUpRight className="w-4 h-4" />
      </a>

      {/* ─── 4. Compact Two-Column Fashion Index ─── */}
      <div className="w-full">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#EFE4D6]">
          <span className="font-sans text-[10.5px] tracking-[0.22em] uppercase font-bold text-[#1E1A17]/75">
            SELECT SILHOUETTE
          </span>
          <span className="font-mono text-[10px] tracking-wider text-[#C89A2D] font-bold">
            7 SIGNATURE CATEGORIES
          </span>
        </div>

        <div role="tablist" aria-label="Fashion Index Categories" className="grid grid-cols-2 gap-2">
          {FASHION_INDEX_CATEGORIES.map((item, index) => {
            const isActive = index === activeIndex;
            const isLast = index === 6; // Item 07 spans both columns for visual balance

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Select ${item.number}: ${item.title}`}
                onClick={() => selectCategory(index)}
                className={`group relative flex items-center justify-between px-3 py-2.5 rounded-[4px] text-left transition-all duration-200 min-h-[46px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] ${
                  isLast ? "col-span-2" : "col-span-1"
                } ${
                  isActive
                    ? "bg-[#D81B77]/10 border border-[#D81B77] shadow-sm text-[#1E1A17]"
                    : "bg-white/70 hover:bg-white border border-[#EFE4D6] text-[#1E1A17]/85 active:scale-98"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-1">
                  <span
                    className={`font-mono text-[10.5px] font-bold tracking-wider shrink-0 ${
                      isActive ? "text-[#D81B77]" : "text-[#C89A2D]"
                    }`}
                  >
                    {item.number}
                  </span>
                  <span
                    className={`font-sans text-xs leading-tight truncate ${
                      isActive ? "font-bold text-[#1E1A17]" : "font-medium text-[#1E1A17]/85"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                <div className="shrink-0 flex items-center justify-center">
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D81B77]" aria-hidden="true" />
                  ) : (
                    <span
                      className="w-1 h-1 rounded-full bg-[#1E1A17]/20 group-hover:bg-[#1E1A17]/40 transition-colors"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
