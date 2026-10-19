"use client";

import { useEffect, useRef, useState } from "react";
import StoryStage from "@/components/stories/StoryStage";
import MobileCinematicStories from "@/components/stories/MobileCinematicStories";
import { STYLE_STORIES } from "@/data/style-stories";

/**
 * StyleStories — Cinematic Sticky Scrollytelling Sequence
 *
 * Section ID: `stories`
 *
 * Architecture:
 *  • Desktop & Tablet (>= 768px):
 *      - Full-bleed immersive 16:9 story stage pinned to top with chapter crossfading
 *      - Scroll-linked chapter transitions & thumbnail rail
 *  • Mobile (< 768px):
 *      - Dedicated "CINEMATIC PORTRAIT STORIES" 4-zone mobile editorial layout
 *      - Calibrated 3:4 portrait crops of the approved model photography
 *      - Fully synchronized scroll-driven chapter progression, thumbnail rail & safe nav controls
 */
export default function StyleStories() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mqMotion.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mqMotion.addEventListener("change", onMotionChange);

    return () => {
      mqMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  const enableStickyScroll = !prefersReducedMotion;
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (!enableStickyScroll) return;

    let rafId: number | null = null;
    let cachedNavbarHeight = 80;
    let cachedStageHeight = 600;
    let cachedTotalScrollable = 1;
    let cachedContainerTop = 0;

    const measureLayout = () => {
      const container = containerRef.current;
      if (!container) return;

      const header = document.querySelector("header");
      cachedNavbarHeight = header?.offsetHeight ?? (window.innerWidth >= 1024 ? 80 : 76);
      cachedStageHeight = window.innerHeight - cachedNavbarHeight;
      cachedTotalScrollable = Math.max(1, container.offsetHeight - cachedStageHeight);
      cachedContainerTop = window.scrollY + container.getBoundingClientRect().top;
    };

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        // Position relative to sticky boundary using scrollY (0 DOM queries)
        const scrolled = window.scrollY - (cachedContainerTop - cachedNavbarHeight);

        // Early return if offscreen
        if (scrolled < -cachedStageHeight - 80 || scrolled > cachedTotalScrollable + cachedStageHeight + 80) {
          return;
        }

        const progress = Math.min(Math.max(scrolled / cachedTotalScrollable, 0), 1);

        // Map progress [0, 1] across the 6 chapters
        const chapterCount = STYLE_STORIES.length;
        const index = Math.min(
          chapterCount - 1,
          Math.floor(progress * chapterCount)
        );

        if (index !== activeIndexRef.current) {
          activeIndexRef.current = index;
          setActiveIndex(index);
        }
      });
    };

    measureLayout();
    handleScroll();

    const t1 = setTimeout(measureLayout, 500);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measureLayout, { passive: true });

    return () => {
      clearTimeout(t1);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureLayout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableStickyScroll]);

  const scrollToChapter = (index: number) => {
    setActiveIndex(index);
    const container = containerRef.current;
    if (enableStickyScroll && container) {
      const vh = window.innerHeight;
      const header = document.querySelector("header");
      const navbarHeight = header?.offsetHeight ?? (window.innerWidth >= 1024 ? 80 : 76);
      const stageHeight = vh - navbarHeight;
      const totalScrollable = container.offsetHeight - stageHeight;
      const chapterCount = STYLE_STORIES.length;
      // Scroll to the midpoint of the chapter segment
      const targetRatio = (index + 0.5) / chapterCount;
      const containerTop = window.scrollY + container.getBoundingClientRect().top;
      const stickStartScrollY = containerTop - navbarHeight;
      const targetScrollY = stickStartScrollY + targetRatio * totalScrollable;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : STYLE_STORIES.length - 1;
    scrollToChapter(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex < STYLE_STORIES.length - 1 ? activeIndex + 1 : 0;
    scrollToChapter(nextIdx);
  };

  return (
    <section
      id="stories"
      ref={containerRef}
      className={`relative w-full bg-[#12100E] text-white overflow-visible border-t border-[#26201B] ${
        enableStickyScroll ? "h-[320svh]" : "h-auto"
      }`}
      aria-label="Style Stories — Pari Trends Editorial Lookbook"
    >
      <div
        className={
          enableStickyScroll
            ? "style-stories-stage w-full overflow-hidden"
            : "relative w-full h-[calc(100dvh-var(--navbar-height))] min-h-[560px] overflow-hidden"
        }
      >
        {/* Desktop & Tablet: Approved & Locked StoryStage (>= 768px) */}
        <div className="hidden md:block w-full h-full">
          <StoryStage
            activeIndex={activeIndex}
            onSelectChapter={scrollToChapter}
            onPrev={handlePrev}
            onNext={handleNext}
            isStickyScroll={enableStickyScroll}
          />
        </div>

        {/* Mobile: Dedicated Cinematic Portrait Stories (< 768px) */}
        <div className="block md:hidden w-full h-full">
          <MobileCinematicStories
            activeIndex={activeIndex}
            onSelectChapter={scrollToChapter}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>
    </section>
  );
}
