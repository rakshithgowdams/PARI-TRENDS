"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { STYLE_STORIES, getStoryEnquiryUrl } from "@/data/style-stories";
import { siteConfig } from "@/config/site";

interface MobileCinematicStoriesProps {
  activeIndex: number;
  onSelectChapter: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * MobileCinematicStories — CINEMATIC PORTRAIT STORIES
 *
 * Dedicated mobile editorial fashion lookbook designed specifically for phone viewports:
 *  • Zone A: Top compact editorial metadata (04 / STYLE STORIES) & chapter counter (01 / 06)
 *  • Zone B: Dominant 3:4 portrait fashion stage with calibrated model framing and smooth crossfade reveal
 *  • Zone C: Editorial story info (category with gold accent, Playfair title, subtitle & comfortable CTA button)
 *  • Zone D: Interactive horizontal thumbnail rail with model-focused portrait crops and safe navigation controls
 */
export default function MobileCinematicStories({
  activeIndex,
  onSelectChapter,
  onPrev,
  onNext,
}: MobileCinematicStoriesProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Auto-center active thumbnail in the horizontal rail
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const activeThumb = rail.children[activeIndex] as HTMLElement | undefined;
    if (activeThumb) {
      const targetLeft =
        activeThumb.offsetLeft - (rail.offsetWidth - activeThumb.offsetWidth) / 2;
      rail.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }, [activeIndex, prefersReducedMotion]);

  // Touch swipe support on main fashion stage
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect intentional horizontal flick
    if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const activeStory = STYLE_STORIES[activeIndex];
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);
  const enquiryUrl = getStoryEnquiryUrl(activeStory.category);

  return (
    <div
      className="relative w-full h-full min-h-[560px] max-h-[100dvh] bg-[#12100E] text-white flex flex-col justify-between overflow-hidden select-none px-4 pt-2 pb-3"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-label="Style Stories — Mobile Lookbook"
    >
      {/* ─── Dynamic Atmospheric Aura (Story-specific ambient glow) ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-colors duration-700 ease-out opacity-60"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${activeStory.moodColor} 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* ─── ZONE A: Editorial Metadata (Top compact header) ─── */}
      <header className="relative z-20 flex-shrink-0 w-full pt-1 pb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-4 bg-[#C89A2D]" aria-hidden="true" />
          <span className="font-sans text-[10px] tracking-[0.24em] font-semibold text-[#C89A2D] uppercase">
            04 / STYLE STORIES
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] font-medium text-white/80">
          <span className="text-[#C89A2D] font-semibold">0{activeIndex + 1}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/60">0{STYLE_STORIES.length}</span>
        </div>
      </header>

      {/* ─── ZONE B: Main Fashion Portrait Stage (Dominant 3:4 portrait card) ─── */}
      <div
        className="relative z-10 flex-1 min-h-0 flex items-center justify-center my-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full max-h-[46vh] sm:max-h-[50vh] aspect-[3/4] mx-auto rounded-xl overflow-hidden border border-[#2D251F] shadow-[0_16px_40px_rgba(0,0,0,0.7)] bg-[#1A1613]">
          {STYLE_STORIES.map((story, idx) => {
            const isCurrent = idx === activeIndex;

            return (
              <div
                key={story.id}
                className={`absolute inset-0 w-full h-full ${
                  prefersReducedMotion
                    ? isCurrent
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                    : `transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent
                          ? "opacity-100 z-10 scale-100 translate-y-0"
                          : "opacity-0 z-0 scale-[1.025] translate-y-2 pointer-events-none"
                      }`
                }`}
                aria-hidden={!isCurrent}
              >
                <Image
                  src={story.mobileImage}
                  alt={story.alt}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 85vw, 576px"
                  style={{ objectPosition: story.mobilePosition }}
                  className="object-cover"
                />
              </div>
            );
          })}

          {/* Subtle bottom vignette to frame image base without darkening model outfit */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-20"
            aria-hidden="true"
          />

          {/* Active Chapter Watermark Badge (Subtle top-left corner) */}
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
            <span className="font-mono text-[9px] tracking-[0.16em] font-medium px-2 py-0.5 rounded-[3px] bg-black/60 text-[#C89A2D] backdrop-blur-sm border border-white/10">
              {activeStory.number}
            </span>
          </div>
        </div>
      </div>

      {/* ─── ZONE C: Editorial Story Information (Compact & high-contrast) ─── */}
      <div className="relative z-20 flex-shrink-0 w-full px-1 py-1.5 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Category eyebrow with gold accent */}
          <div
            key={`m-cat-${activeStory.id}`}
            className="flex items-center gap-1.5 mb-0.5 animate-[fadeInUp_450ms_ease-out]"
          >
            <span className="w-3.5 h-[1.5px] bg-[#C89A2D]" />
            <span className="font-sans text-[10px] tracking-[0.22em] font-semibold uppercase text-[#C89A2D] truncate">
              {activeStory.category}
            </span>
          </div>

          {/* Headline Reveal */}
          <h2
            key={`m-title-${activeStory.id}`}
            className="font-serif text-[1.45rem] sm:text-[1.65rem] font-medium leading-none tracking-tight text-white animate-[slideUp_500ms_cubic-bezier(0.16,1,0.3,1)] truncate"
          >
            {activeStory.title}
          </h2>

          {/* Subtitle */}
          <p
            key={`m-sub-${activeStory.id}`}
            className="font-sans text-[11px] sm:text-[12px] text-[#F8F2EA]/80 font-normal mt-0.5 leading-snug line-clamp-1 animate-[fadeInUp_550ms_ease-out]"
          >
            {activeStory.subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={enquiryUrl}
          target={isExternalWhatsApp ? "_blank" : undefined}
          rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
          aria-label={`Explore ${activeStory.title} style collection`}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white text-[12px] font-sans font-semibold tracking-wide shadow-md shadow-[#D81B77]/30 active:scale-95 transition-transform"
        >
          <span>Explore</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ─── ZONE D: Story Selector & Safe Navigation Controls ─── */}
      <div className="relative z-20 flex-shrink-0 w-full pt-1">
        {/* Horizontal Model-Focused Thumbnail Navigation Rail */}
        <div
          ref={railRef}
          role="tablist"
          aria-label="Style Stories Chapter Selector"
          className="flex items-end gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-2 px-0.5 touch-pan-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {STYLE_STORIES.map((story, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={`thumb-${story.id}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Chapter ${story.number}: ${story.title} — ${story.category}`}
                tabIndex={0}
                onClick={() => onSelectChapter(idx)}
                className={`group relative flex-shrink-0 rounded-[6px] overflow-hidden cursor-pointer text-left transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] ${
                  isActive
                    ? "w-[74px] sm:w-[80px] h-[98px] sm:h-[106px] -translate-y-1 ring-[1.5px] ring-[#C89A2D] shadow-[0_10px_24px_rgba(0,0,0,0.8)] z-20"
                    : "w-[60px] sm:w-[66px] h-[80px] sm:h-[88px] translate-y-0 opacity-75 active:opacity-100 z-10"
                }`}
              >
                {/* Thumbnail Image — focused on model outfit & face */}
                <div className="absolute inset-0 w-full h-full bg-[#1A1613]">
                  <Image
                    src={story.mobileImage}
                    alt=""
                    fill
                    sizes="80px"
                    style={{ objectPosition: story.mobileThumbnailPosition }}
                    className={`object-cover transition-all duration-500 ease-out ${
                      isActive
                        ? "filter-none brightness-105 scale-105"
                        : "grayscale-[50%] brightness-[0.85] scale-100"
                    }`}
                  />
                </div>

                {/* Subtle scrim for contrast */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-50" : "opacity-70"
                  }`}
                  aria-hidden="true"
                />

                {/* Inactive border tint */}
                {!isActive && (
                  <div
                    className="absolute inset-0 border border-white/15 rounded-[6px] pointer-events-none"
                    aria-hidden="true"
                  />
                )}

                {/* Chapter Number Badge */}
                <div className="absolute top-1.5 left-1.5 z-10">
                  <span
                    className={`font-mono text-[8.5px] tracking-[0.14em] font-semibold px-1 py-0.5 rounded-[2px] transition-colors ${
                      isActive
                        ? "bg-[#C89A2D] text-black shadow-xs"
                        : "bg-black/65 text-[#F8F2EA]/85 backdrop-blur-xs"
                    }`}
                  >
                    {story.number}
                  </span>
                </div>

                {/* Active story title snippet */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 p-1.5 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="font-serif text-[9.5px] sm:text-[10px] text-white leading-tight font-medium truncate">
                    {story.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dedicated Navigation Control Bar (Safe area, zero thumbnail overlap) */}
        <div className="flex items-center justify-between pt-1 px-1">
          {/* Subtle Linear Story Progress Bar */}
          <div className="flex items-center gap-2">
            <div
              className="w-16 sm:w-20 h-[2px] bg-white/20 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={activeIndex + 1}
              aria-valuemin={1}
              aria-valuemax={STYLE_STORIES.length}
              aria-label="Story chapter progress"
            >
              <div
                className="h-full bg-[#C89A2D] transition-all duration-500 ease-out rounded-full"
                style={{
                  width: `${((activeIndex + 1) / STYLE_STORIES.length) * 100}%`,
                }}
              />
            </div>
            <span className="font-mono text-[9.5px] text-white/50 tracking-wider">
              0{activeIndex + 1} OF 0{STYLE_STORIES.length}
            </span>
          </div>

          {/* Compact Circular Previous / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              aria-label="Previous story chapter"
              className="w-8 h-8 rounded-full border border-white/20 bg-white/5 active:bg-[#D81B77] active:border-[#D81B77] active:scale-95 flex items-center justify-center text-white/85 transition-all focus-visible:ring-2 focus-visible:ring-[#D81B77]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next story chapter"
              className="w-8 h-8 rounded-full border border-white/20 bg-white/5 active:bg-[#D81B77] active:border-[#D81B77] active:scale-95 flex items-center justify-center text-white/85 transition-all focus-visible:ring-2 focus-visible:ring-[#D81B77]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
