"use client";

import { useEffect, useRef, useState } from "react";
import StoryStage from "@/components/stories/StoryStage";
import { STYLE_STORIES } from "@/data/style-stories";

/**
 * StyleStories — Cinematic Sticky Scrollytelling Sequence
 *
 * Section ID: `stories`
 *
 * Architecture:
 *  • Desktop (>= 1024px & !prefersReducedMotion):
 *      - Outer section height: ~320svh
 *      - Sticky stage pinned at top-0, 92svh tall
 *      - Single normalized progress = clamp((scrollY - offsetTop) / (offsetHeight - vh), 0, 1)
 *      - Drives active chapter (0..5), background crossfade, headline reveal, and thumbnail selection
 *      - Clicking a thumbnail or prev/next smoothly scrolls to that chapter's position on the same timeline
 *  • Mobile (< 1024px) or Reduced Motion:
 *      - Lightweight non-pinned interactive lookbook gallery with thumbnail tabs and swipe/arrows
 */
export default function StyleStories() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mqMotion.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mqMotion.addEventListener("change", onMotionChange);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      mqMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  const enableStickyScroll = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    if (!enableStickyScroll) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        const totalScrollable = container.offsetHeight - vh;
        if (totalScrollable <= 0) return;

        // Progress based on container's top position relative to viewport
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

        // Map progress [0, 1] across the 6 chapters
        const chapterCount = STYLE_STORIES.length;
        const index = Math.min(
          chapterCount - 1,
          Math.floor(progress * chapterCount)
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

  const scrollToChapter = (index: number) => {
    const container = containerRef.current;
    if (enableStickyScroll && container) {
      const vh = window.innerHeight;
      const totalScrollable = container.offsetHeight - vh;
      const chapterCount = STYLE_STORIES.length;
      // Scroll to the midpoint of the chapter segment
      const targetRatio = (index + 0.5) / chapterCount;
      const containerTop = window.scrollY + container.getBoundingClientRect().top;
      const targetScrollY = containerTop + targetRatio * totalScrollable;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    } else {
      setActiveIndex(index);
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
      <div className={enableStickyScroll ? "sticky top-0 w-full h-[92svh] overflow-hidden" : "relative w-full"}>
        <StoryStage
          activeIndex={activeIndex}
          onSelectChapter={scrollToChapter}
          onPrev={handlePrev}
          onNext={handleNext}
          isStickyScroll={enableStickyScroll}
        />
      </div>
    </section>
  );
}
