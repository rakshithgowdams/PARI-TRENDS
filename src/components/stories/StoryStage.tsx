"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { STYLE_STORIES, getStoryEnquiryUrl } from "@/data/style-stories";
import StoryThumbnailRail from "./StoryThumbnailRail";
import { siteConfig } from "@/config/site";

/**
 * StoryStage — Phase 06: Cinematic Style Stories Stage
 *
 * Characteristics:
 *  • Immersive full-width 86svh stage with atmospheric dark aesthetic
 *  • Smooth 750ms crossfade between 16:9 master editorial images
 *  • Staggered typography reveals through vertical clipping and fade
 *  • Floating horizontal thumbnail strip with elevated active card
 *  • Direct WhatsApp enquiry action per story
 *  • Previous / Next navigation controls and progress bar
 *  • Full keyboard accessibility (ArrowLeft, ArrowRight, Tab)
 */
export default function StoryStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);
  const activeStory = STYLE_STORIES[activeIndex];
  const enquiryUrl = getStoryEnquiryUrl(activeStory.category);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : STYLE_STORIES.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < STYLE_STORIES.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div className="relative w-full min-h-[640px] h-[86svh] max-h-[880px] rounded-[6px] overflow-hidden bg-[#14110F] text-white shadow-2xl shadow-black/60 select-none">
      {/* ─── 1. Background Layers: Crossfading 16:9 Story Photographs ─── */}
      {STYLE_STORIES.map((story, idx) => {
        const isCurrent = idx === activeIndex;

        return (
          <div
            key={story.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-800 ease-in-out ${
              isCurrent ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
            aria-hidden={!isCurrent}
          >
            <Image
              src={story.image}
              alt={story.alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1440px) 100vw, 1440px"
              className={`object-cover object-right md:object-center transform transition-transform duration-1000 ease-out ${
                isCurrent ? "scale-100" : "scale-[1.03]"
              }`}
            />
          </div>
        );
      })}

      {/* ─── 2. Atmospheric Dark Editorial Scrims ─── */}
      {/* Heavy left-side gradient to ensure left typography is crisp against any background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/25 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Top vignette for chapter tags */}
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/75 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Bottom vignette for thumbnail rail and controls */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* ─── 3. Upper Area: Boutique Brand Tag & Chapter Indicator ─── */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-6 sm:p-8 lg:p-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
          <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F8F2EA]">
            PARI TRENDS / STYLE STORIES
          </span>
        </div>

        {/* Counter indicator */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] font-medium text-white/80">
          <span className="text-[#C89A2D]">0{activeIndex + 1}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/60">0{STYLE_STORIES.length}</span>
        </div>
      </div>

      {/* ─── 4. Left Content: Large Editorial Headline, Subtitle & Enquiry CTA ─── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-16 pointer-events-none">
        <div className="max-w-xl lg:max-w-2xl pointer-events-auto">
          {/* Animated Category Eyebrow */}
          <div
            key={`cat-${activeStory.id}`}
            className="flex items-center gap-2.5 mb-2.5 sm:mb-3 animate-[fadeInUp_500ms_ease-out]"
          >
            <span className="w-6 h-[1px] bg-[#C89A2D]" />
            <span className="font-sans text-[11px] sm:text-xs tracking-[0.24em] font-semibold uppercase text-[#C89A2D]">
              {activeStory.category}
            </span>
          </div>

          {/* Animated Main Headline with Masked Reveal */}
          <div key={`title-${activeStory.id}`} className="overflow-hidden py-1 mb-2 sm:mb-3">
            <h3 className="font-serif text-[clamp(2.5rem,5.8vw,6.5rem)] font-medium leading-[0.98] tracking-tight text-white animate-[slideUp_600ms_ease-out]">
              {activeStory.title}
            </h3>
          </div>

          {/* Animated Subtitle Copy */}
          <div key={`sub-${activeStory.id}`} className="mb-6 sm:mb-8 animate-[fadeInUp_650ms_ease-out]">
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#F8F2EA]/90 font-normal leading-relaxed max-w-md">
              {activeStory.subtitle}
            </p>
          </div>

          {/* Action Button */}
          <div key={`cta-${activeStory.id}`} className="animate-[fadeInUp_750ms_ease-out]">
            <a
              href={enquiryUrl}
              target={isExternalWhatsApp ? "_blank" : undefined}
              rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white text-[13.5px] sm:text-[14px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-xl shadow-[#D81B77]/35 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
            >
              <span>Explore This Style</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── 5. Lower-Middle Area: Floating Story Thumbnail Rail ─── */}
      <div className="absolute inset-x-0 bottom-14 sm:bottom-16 lg:bottom-12 z-30 px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
        {/* Thumbnail Navigation Strip */}
        <div className="pointer-events-auto max-w-full">
          <StoryThumbnailRail
            stories={STYLE_STORIES}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>

        {/* ─── 6. Bottom Controls: Next/Prev Buttons & Linear Progress ─── */}
        <div className="pointer-events-auto flex items-center justify-between md:justify-end gap-4 pb-2">
          {/* Progress Bar */}
          <div className="w-24 sm:w-32 h-[2px] bg-white/20 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-[#C89A2D] transition-all duration-500 ease-out rounded-full"
              style={{
                width: `${((activeIndex + 1) / STYLE_STORIES.length) * 100}%`,
              }}
            />
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous story chapter"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-[#D81B77] hover:border-[#D81B77] active:scale-95 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story chapter"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-[#D81B77] hover:border-[#D81B77] active:scale-95 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
