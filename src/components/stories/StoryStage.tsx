"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { STYLE_STORIES, getStoryEnquiryUrl } from "@/data/style-stories";
import StoryThumbnailRail from "./StoryThumbnailRail";
import { siteConfig } from "@/config/site";

interface StoryStageProps {
  activeIndex?: number;
  onSelectChapter?: (idx: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  isStickyScroll?: boolean;
}

/**
 * StoryStage — Phase 06: Cinematic Style Stories Lookbook Stage
 *
 * Architecture & Zones:
 *  • Full-bleed 92svh immersive visual canvas with chapter-specific crossfading
 *  • Zone A: Top editorial metadata (04 / STYLE STORIES • EVERY LOOK HAS A STORY) & chapter counter
 *  • Zone B: Full-bleed 16:9 master fashion photography with story-specific framing and vibrant clothing lighting
 *  • Zone C: Left editorial story block (Playfair headline with masked reveal, category, subtitle & CTA)
 *  • Zone D: Floating chapter navigator rail & circular prev/next controls with zero CTA collision
 *  • Accessibility: Tab/Enter/Space navigation, ARIA roles, ArrowLeft/ArrowRight keyboard support
 */
export default function StoryStage({
  activeIndex: controlledIndex,
  onSelectChapter,
  onPrev: controlledPrev,
  onNext: controlledNext,
}: StoryStageProps = {}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = typeof controlledIndex === "number";
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const handleSelect = useCallback(
    (idx: number) => {
      if (onSelectChapter) {
        onSelectChapter(idx);
      } else {
        setInternalIndex(idx);
      }
    },
    [onSelectChapter]
  );

  const handlePrev = useCallback(() => {
    if (controlledPrev) {
      controlledPrev();
    } else {
      setInternalIndex((prev) => (prev > 0 ? prev - 1 : STYLE_STORIES.length - 1));
    }
  }, [controlledPrev]);

  const handleNext = useCallback(() => {
    if (controlledNext) {
      controlledNext();
    } else {
      setInternalIndex((prev) => (prev < STYLE_STORIES.length - 1 ? prev + 1 : 0));
    }
  }, [controlledNext]);

  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);
  const activeStory = STYLE_STORIES[activeIndex];
  const enquiryUrl = getStoryEnquiryUrl(activeStory.category);

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
    <div className="relative w-full h-full min-h-[580px] overflow-hidden select-none bg-[#12100E] text-white flex flex-col justify-between">
      {/* ─── ZONE B: Main Background Photographs with Smooth Crossfade ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {STYLE_STORIES.map((story, idx) => {
          const isCurrent = idx === activeIndex;

          return (
            <div
              key={story.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isCurrent ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
              }`}
              aria-hidden={!isCurrent}
            >
              <Image
                src={story.image}
                alt={story.alt}
                fill
                priority={idx === 0}
                sizes="(min-width: 768px) 100vw, 1px"
                className={`object-cover ${story.objectPosition} transform transition-transform duration-1000 ease-out ${
                  isCurrent ? "scale-100" : "scale-[1.02]"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* ─── Localized Atmospheric Lighting & Readability Gradients ─── */}
      {/* 1. Left-side gradient: guarantees high-contrast text readability without darkening model */}
      <div
        className="absolute inset-y-0 left-0 w-full sm:w-[58%] lg:w-[46%] bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* 2. Top vignette: ensures top metadata readability */}
      <div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/25 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* 3. Bottom vignette: frames floating thumbnail navigator and controls */}
      <div
        className="absolute inset-x-0 bottom-0 h-52 sm:h-60 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* 4. Subtle Chapter Tonal Atmosphere: dynamic aura matching the story mood */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-colors duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at 75% 40%, ${activeStory.moodColor} 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* ─── ZONE A: Top Editorial Metadata ─── */}
      <header className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pt-7 sm:pt-9 flex items-center justify-between">
        {/* Top-left: Section Label & Supporting Motto */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-6 sm:w-8 bg-[#C89A2D]" aria-hidden="true" />
          <span className="font-sans text-[11px] sm:text-xs tracking-[0.26em] font-semibold text-[#C89A2D] uppercase">
            04 / STYLE STORIES
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/30" />
          <span className="hidden sm:inline-block font-sans text-[10.5px] sm:text-[11px] tracking-[0.20em] text-[#F8F2EA]/75 uppercase font-medium">
            EVERY LOOK HAS A STORY
          </span>
        </div>

        {/* Top-right: Clean Chapter Counter */}
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] font-medium text-white/80">
          <span className="text-[#C89A2D] font-semibold">0{activeIndex + 1}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/60">0{STYLE_STORIES.length}</span>
        </div>
      </header>

      {/* ─── ZONE C: Left Editorial Story Content (Non-colliding middle zone) ─── */}
      <div className="relative z-20 px-6 sm:px-10 lg:px-16 my-auto max-w-xl lg:max-w-2xl pointer-events-none">
        <div className="pointer-events-auto">
          {/* Category Eyebrow with gold accent */}
          <div
            key={`cat-${activeStory.id}`}
            className="flex items-center gap-2.5 mb-2.5 sm:mb-3 animate-[fadeInUp_500ms_ease-out]"
          >
            <span className="w-5 h-[1.5px] bg-[#C89A2D]" />
            <span className="font-sans text-[11px] sm:text-xs tracking-[0.24em] font-semibold uppercase text-[#C89A2D]">
              {activeStory.category}
            </span>
          </div>

          {/* Masked Headline Reveal */}
          <div
            key={`title-${activeStory.id}`}
            className="overflow-hidden py-1 mb-2.5 sm:mb-3.5"
          >
            <h2 className="font-serif text-[clamp(2.75rem,5.5vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-white animate-[slideUp_600ms_cubic-bezier(0.16,1,0.3,1)]">
              {activeStory.title}
            </h2>
          </div>

          {/* Subtitle Copy */}
          <div
            key={`sub-${activeStory.id}`}
            className="mb-6 sm:mb-8 animate-[fadeInUp_650ms_ease-out]"
            style={{ animationDelay: "100ms" }}
          >
            <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F8F2EA]/90 font-normal leading-relaxed max-w-md">
              {activeStory.subtitle}
            </p>
          </div>

          {/* Call-to-Action: Direct Enquiry Button */}
          <div
            key={`cta-${activeStory.id}`}
            className="animate-[fadeInUp_700ms_ease-out]"
            style={{ animationDelay: "180ms" }}
          >
            <a
              href={enquiryUrl}
              target={isExternalWhatsApp ? "_blank" : undefined}
              rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white text-[13px] sm:text-[14px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-xl shadow-[#D81B77]/35 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
            >
              <span>Explore This Style</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── ZONE D: Floating Chapter Navigator & Prev/Next Controls ─── */}
      <footer className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-4 sm:pb-6 pt-2 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
        {/* Floating Chapter Rail */}
        <div className="pointer-events-auto max-w-full">
          <StoryThumbnailRail
            stories={STYLE_STORIES}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </div>

        {/* Chapter Progress & Navigation Controls */}
        <div className="pointer-events-auto flex items-center justify-between md:justify-end gap-4 pb-2 sm:pb-3">
          {/* Subtle Linear Progress Bar */}
          <div
            className="w-20 sm:w-28 h-[2px] bg-white/20 rounded-full overflow-hidden hidden sm:block"
            role="progressbar"
            aria-valuenow={activeIndex + 1}
            aria-valuemin={1}
            aria-valuemax={STYLE_STORIES.length}
            aria-label="Story progress"
          >
            <div
              className="h-full bg-[#C89A2D] transition-all duration-500 ease-out rounded-full"
              style={{
                width: `${((activeIndex + 1) / STYLE_STORIES.length) * 100}%`,
              }}
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous story chapter"
              className="group w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-[#D81B77] hover:border-[#D81B77] active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D81B77]"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story chapter"
              className="group w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-[#D81B77] hover:border-[#D81B77] active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D81B77]"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
