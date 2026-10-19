"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { FEATURED_EDITS, FeaturedEdit, getFeaturedEnquiryUrl } from "@/data/featured-edits";
import { siteConfig } from "@/config/site";

interface MobileStyleAtelierProps {
  prefersReducedMotion?: boolean;
}

/**
 * MobileStyleAtelier — The Pari Style Atelier
 *
 * An interactive mobile fashion lookbook inspired by luxury product configurators:
 *  • Central large portrait fashion stage (58–68svh)
 *  • Floating vertical 6-look selector on the left (01–06) with Pari Pink & gold accents
 *  • Fabric-inspired directional image transitions with subtle settle
 *  • Expandable bottom fashion-detail drawer with collapsed micro-summary & full enquiry modal
 *  • Secondary Previous/Next navigation controls with synchronized look counter
 *  • Safe horizontal swipe gesture support without interfering with natural document scrolling
 *  • Full keyboard & screen-reader accessibility respecting prefers-reduced-motion
 */
export default function MobileStyleAtelier({
  prefersReducedMotion = false,
}: MobileStyleAtelierProps) {
  const [activeIndex, setActiveIndex] = useState(2); // Defaults to "03 — Celebration Edit"
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeEdit: FeaturedEdit = FEATURED_EDITS[activeIndex] ?? FEATURED_EDITS[0];
  const previousEdit: FeaturedEdit | null =
    previousIndex !== null ? FEATURED_EDITS[previousIndex] ?? null : null;

  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);
  const enquiryUrl = getFeaturedEnquiryUrl(activeEdit.theme, activeEdit.category);

  // Switch active look with fabric-like transition
  const selectLook = useCallback(
    (newIndex: number) => {
      if (newIndex === activeIndex || newIndex < 0 || newIndex >= FEATURED_EDITS.length) {
        return;
      }

      setPreviousIndex(activeIndex);
      setActiveIndex(newIndex);
      setIsTransitioning(true);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      // 600ms transition duration
      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousIndex(null);
      }, prefersReducedMotion ? 200 : 650);
    },
    [activeIndex, prefersReducedMotion]
  );

  const handlePrev = () => {
    if (activeIndex > 0) {
      selectLook(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < FEATURED_EDITS.length - 1) {
      selectLook(activeIndex + 1);
    }
  };

  // Safe horizontal touch swipe detection on stage
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Detect intentional horizontal swipe (must exceed 44px and be clearly horizontal)
    if (Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.6) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Preload adjacent images for instantaneous rendering
  const prevImg = activeIndex > 0 ? FEATURED_EDITS[activeIndex - 1].image : null;
  const nextImg =
    activeIndex < FEATURED_EDITS.length - 1 ? FEATURED_EDITS[activeIndex + 1].image : null;

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* ─── Hidden Preloaders for Instant Transitions ─── */}
      <div className="hidden" aria-hidden="true">
        {prevImg && <Image src={prevImg} alt="" width={400} height={500} priority />}
        {nextImg && <Image src={nextImg} alt="" width={400} height={500} priority />}
      </div>

      {/* ─── Main Fashion Stage ─── */}
      <div
        className="relative w-full h-[62svh] min-h-[460px] max-h-[580px] rounded-[8px] overflow-hidden bg-[#FAF5EE] shadow-[0_16px_40px_rgba(30,26,23,0.08)] border border-[#EFE4D6]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Outgoing Image (Crossfade & subtle shrink during transition) */}
        {previousEdit && isTransitioning && !prefersReducedMotion && (
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <Image
              src={previousEdit.image}
              alt={previousEdit.alt}
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className={`object-cover ${previousEdit.aspectFocus || "object-center"} transition-all duration-500 ease-out opacity-0 scale-[0.985]`}
            />
          </div>
        )}

        {/* Incoming / Active Image */}
        <div
          key={activeEdit.id}
          className={`absolute inset-0 w-full h-full overflow-hidden z-10 ${
            !prefersReducedMotion && isTransitioning
              ? "animate-look-reveal"
              : "opacity-100 scale-100"
          }`}
        >
          <Image
            src={activeEdit.image}
            alt={activeEdit.alt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 600px"
            className={`object-cover ${activeEdit.aspectFocus || "object-center"} will-change-transform`}
          />
        </div>

        {/* Delicate Corner Vignette (Ensures top badges remain legible without muddying the portrait) */}
        <div
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1E1A17]/45 via-[#1E1A17]/15 to-transparent pointer-events-none z-15"
          aria-hidden="true"
        />

        {/* Delicate Bottom Shadow Behind Collapsed Drawer */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1E1A17]/40 via-transparent to-transparent pointer-events-none z-15"
          aria-hidden="true"
        />

        {/* ─── Top Category Tag & Look Counter ─── */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3.5 sm:p-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1A17]/45 backdrop-blur-md border border-white/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" aria-hidden="true" />
            <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F8F2EA]">
              THE PARI EDIT
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-sm bg-[#1E1A17]/40 backdrop-blur-md border border-white/15">
            <span className="font-sans text-[10.5px] tracking-[0.16em] uppercase font-semibold text-[#C89A2D]">
              {activeEdit.category}
            </span>
          </div>
        </div>

        {/* ─── Floating Vertical 6-Look Selector (Left Rail) ─── */}
        <div
          role="tablist"
          aria-label="Select Featured Fashion Look"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-25 flex flex-col items-center gap-2 sm:gap-2.5 p-1 rounded-full bg-[#FAF5EE]/30 backdrop-blur-[6px] border border-white/30 shadow-lg shadow-black/10"
        >
          {/* Subtle Vertical Connecting Guide Line */}
          <div
            className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-[1px] bg-white/40 -z-10"
            aria-hidden="true"
          />

          {FEATURED_EDITS.map((edit, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={edit.id}
                role="tab"
                aria-selected={isActive}
                aria-label={`Look ${edit.number}: ${edit.theme} — ${edit.category}`}
                onClick={() => selectLook(index)}
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] focus-visible:ring-offset-1 ${
                  isActive
                    ? "bg-[#D81B77] text-white shadow-[0_4px_12px_rgba(216,27,119,0.45)] ring-2 ring-[#C89A2D]/70 scale-105"
                    : "bg-[#FAF5EE]/90 text-[#1E1A17]/75 hover:bg-white hover:text-[#1E1A17] border border-[#EFE4D6]/90 shadow-sm active:scale-95"
                }`}
              >
                <span>{edit.number}</span>
                {isActive && (
                  <span
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C89A2D]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ─── Expandable Fashion Detail Drawer ─── */}
        <div
          className={`absolute inset-x-0 bottom-0 z-30 bg-[#FAF5EE]/95 backdrop-blur-md border-t border-[#EFE4D6] shadow-[0_-8px_28px_rgba(30,26,23,0.12)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDrawerExpanded ? "max-h-[380px]" : "max-h-[76px]"
          }`}
        >
          {/* 1. Drawer Header / Collapsed Preview Bar */}
          <div
            onClick={() => setIsDrawerExpanded((prev) => !prev)}
            className="w-full px-4 sm:px-5 py-3 cursor-pointer flex items-center justify-between gap-3 text-left"
          >
            {/* Left: Look Number, Name & Caption */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-mono text-xs font-bold text-[#D81B77]">
                  {activeEdit.number}
                </span>
                <span className="text-[#1E1A17]/30 text-xs">/</span>
                <span className="font-serif text-[13.5px] sm:text-sm font-semibold text-[#1E1A17] tracking-wide truncate">
                  {activeEdit.theme.toUpperCase()}
                </span>
              </div>
              <p className="font-sans text-[11px] text-[#6B5B52] truncate leading-tight">
                {activeEdit.caption}
              </p>
            </div>

            {/* Right: Expand Toggle Button */}
            <button
              type="button"
              aria-expanded={isDrawerExpanded}
              aria-label={isDrawerExpanded ? "Collapse look details" : "Expand look details"}
              onClick={(e) => {
                e.stopPropagation();
                setIsDrawerExpanded((prev) => !prev);
              }}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#EFE4D6] text-[#1E1A17] text-[10.5px] font-sans font-semibold tracking-wider uppercase shadow-sm active:scale-95 transition-all"
            >
              <span>{isDrawerExpanded ? "CLOSE" : "VIEW LOOK"}</span>
              {isDrawerExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#D81B77]" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5 text-[#D81B77]" />
              )}
            </button>
          </div>

          {/* 2. Expanded Detail Panel */}
          <div
            className={`px-4 sm:px-5 pb-5 pt-1 space-y-3.5 border-t border-[#EFE4D6]/70 transition-opacity duration-300 ${
              isDrawerExpanded ? "opacity-100" : "opacity-0 pointer-events-none hidden"
            }`}
          >
            {/* Extended Editorial Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-[#C89A2D]">
                  CURATED STYLE EDIT • {activeEdit.number}
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#1E1A17] font-medium tracking-tight">
                {activeEdit.theme}
              </h4>
              <p className="font-sans text-xs sm:text-[13px] text-[#6B5B52] leading-relaxed mt-1">
                Handcrafted silhouettes from our Alur boutique showroom. Designed with breathable
                fabrics, delicate embroidery and modern tailoring for everyday grace and celebration.
              </p>
            </div>

            {/* Direct Enquiry CTA Button */}
            <a
              href={enquiryUrl}
              target={isExternalWhatsApp ? "_blank" : undefined}
              rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white text-[13px] font-sans font-semibold tracking-wide shadow-md shadow-[#D81B77]/25 active:scale-98 transition-all"
            >
              <span>Enquire About This Style</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── Secondary Bottom Navigation Controls ─── */}
      <div className="w-full flex items-center justify-between mt-4 px-2">
        {/* Active Look Indicator & Name */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-mono text-xs tracking-[0.18em] font-semibold text-[#1E1A17]">
            <span className="text-[#D81B77]">{activeEdit.number}</span>
            <span className="text-[#1E1A17]/30">/</span>
            <span className="text-[#1E1A17]/60">0{FEATURED_EDITS.length}</span>
          </div>
          <span className="h-3 w-[1px] bg-[#EFE4D6]" aria-hidden="true" />
          <span className="font-serif text-xs text-[#1E1A17] tracking-wide font-medium truncate max-w-[130px] sm:max-w-[180px]">
            {activeEdit.theme}
          </span>
        </div>

        {/* Step Indicator Pips */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {FEATURED_EDITS.map((_, i) => (
            <button
              key={i}
              onClick={() => selectLook(i)}
              aria-label={`Jump to look ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-5 bg-[#D81B77]" : "w-1.5 bg-[#1E1A17]/20 hover:bg-[#1E1A17]/40"
              }`}
            />
          ))}
        </div>

        {/* Previous / Next Arrow Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous look"
            className="w-8 h-8 rounded-full border border-[#EFE4D6] bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1E1A17] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#D81B77]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === FEATURED_EDITS.length - 1}
            aria-label="Next look"
            className="w-8 h-8 rounded-full border border-[#EFE4D6] bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1E1A17] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#D81B77]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
