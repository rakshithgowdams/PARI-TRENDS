"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_EDITS, getFeaturedEnquiryUrl } from "@/data/featured-edits";
import { siteConfig } from "@/config/site";

/**
 * MobileEditorialCarousel — Phase 05: Worth Your Attention (Mobile & Tablet)
 *
 * Characteristics:
 *  • Touch-friendly horizontal swipe carousel with CSS snap alignment
 *  • Partially visible adjacent cards for seamless discovery
 *  • Pagination counter (01 / 06) and responsive previous/next arrow buttons
 *  • Full-colour photography with subtle gradient overlay
 *  • Direct WhatsApp enquiry action per card
 */
export default function MobileEditorialCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);

  // Update current slide index based on scroll position
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.82;
    const index = Math.round(container.scrollLeft / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(FEATURED_EDITS.length - 1, index)));
  };

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    scrollToSlide(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    scrollToSlide(Math.min(FEATURED_EDITS.length - 1, currentIndex + 1));
  };

  // Scroll to Celebration Edit (index 2) on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSlide(2);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="block lg:hidden w-full">
      {/* ─── Horizontal Scroll Container with CSS Snap ─── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 px-6 sm:px-10 pb-4 pt-1 no-scrollbar -mx-6 sm:-mx-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {FEATURED_EDITS.map((edit, idx) => {
          const enquiryUrl = getFeaturedEnquiryUrl(edit.theme, edit.category);
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={edit.id}
              className={`relative flex-shrink-0 w-[84vw] sm:w-[58vw] aspect-[4/5] rounded-[4px] overflow-hidden snap-center transition-all duration-500 bg-[#EFE4D6] ${
                isCurrent ? "brightness-100 scale-100" : "brightness-[0.88] scale-[0.98]"
              }`}
            >
              {/* Full-Bleed Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={edit.image}
                  alt={edit.alt}
                  fill
                  sizes="(max-width: 640px) 85vw, 60vw"
                  className={`object-cover ${edit.aspectFocus || "object-center"}`}
                />
              </div>

              {/* Scrim Overlays */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Top Tag & Number */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
                  <span className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#F8F2EA]">
                    {edit.number} / THE PARI EDIT
                  </span>
                </div>

                <span className="font-sans text-[11px] tracking-[0.16em] uppercase font-semibold text-[#C89A2D]">
                  {edit.category}
                </span>
              </div>

              {/* Bottom Card Editorial Copy & CTA */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col justify-end">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-tight mb-1.5">
                  {edit.theme}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/85 font-normal leading-relaxed mb-4">
                  {edit.caption}
                </p>

                <a
                  href={enquiryUrl}
                  target={isExternalWhatsApp ? "_blank" : undefined}
                  rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#D81B77] text-white text-[13px] font-sans font-semibold tracking-wide shadow-md shadow-[#D81B77]/25 active:scale-95"
                >
                  <span>Enquire About This Style</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Carousel Navigation Controls & Indicator ─── */}
      <div className="flex items-center justify-between mt-6 px-2">
        {/* Progress Counter */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] font-semibold text-[#1E1A17]/70">
          <span className="text-[#D81B77]">0{currentIndex + 1}</span>
          <span className="text-[#1E1A17]/30">/</span>
          <span>0{FEATURED_EDITS.length}</span>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {FEATURED_EDITS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-6 bg-[#D81B77]"
                  : "w-1.5 bg-[#1E1A17]/25 hover:bg-[#1E1A17]/40"
              }`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full border border-[#1E1A17]/20 flex items-center justify-center text-[#1E1A17] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === FEATURED_EDITS.length - 1}
            aria-label="Next slide"
            className="w-8 h-8 rounded-full border border-[#1E1A17]/20 flex items-center justify-center text-[#1E1A17] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 active:scale-95 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
