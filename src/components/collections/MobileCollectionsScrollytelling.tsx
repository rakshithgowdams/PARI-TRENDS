"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CollectionCard from "@/components/collections/CollectionCard";
import { CollectionItem } from "@/data/collections";

interface MobileCollectionsScrollytellingProps {
  collections: CollectionItem[];
  prefersReducedMotion?: boolean;
}

/**
 * MobileCollectionsScrollytelling — Pari Trends
 *
 * Cinematic Scroll-Driven Horizontal Lookbook Gallery for Mobile (< 768px):
 *  • Section introduction scrolls into view naturally
 *  • Card stage becomes sticky beneath mobile navbar
 *  • Vertical page scroll progress maps directly to horizontal track translation
 *  • All 7 categories advance smoothly with subtle focus scaling
 *  • Releases cleanly into the following section once Card 07 is fully in view
 *  • Fully reversible on upward scroll
 *  • Native horizontal swipe with CSS snap for prefers-reduced-motion
 */
export default function MobileCollectionsScrollytelling({
  collections,
  prefersReducedMotion = false,
}: MobileCollectionsScrollytellingProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const activeTitleRef = useRef<HTMLSpanElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeIdxRef = useRef(0);

  // Measure horizontal travel distance and set runway height dynamically
  const updateRunwayDimensions = useCallback(() => {
    const track = trackRef.current;
    const runway = runwayRef.current;
    if (!track || !track.parentElement || !runway) return;

    const viewportWidth = track.parentElement.clientWidth;
    const trackWidth = track.scrollWidth;
    const maxTravel = Math.max(0, trackWidth - viewportWidth);

    const header = document.querySelector("header");
    const navbarHeight = header?.offsetHeight ?? 76;
    const stageHeight = stickyStageRef.current?.offsetHeight ?? (window.innerHeight - navbarHeight);

    // Set runway height: stage height + proportional vertical scroll runway
    // 1px vertical scroll ≈ 0.85px horizontal travel for smooth, luxury pacing
    const travelRunway = Math.round(maxTravel * 1.15);
    const totalRunway = stageHeight + travelRunway;

    runway.style.height = `${totalRunway}px`;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    updateRunwayDimensions();

    // Secondary passes to account for web font loading & layout settling
    const t1 = setTimeout(updateRunwayDimensions, 100);
    const t2 = setTimeout(updateRunwayDimensions, 500);

    // ResizeObserver tracks dynamic content resizing without polling
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateRunwayDimensions();
      });
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", updateRunwayDimensions, { passive: true });

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const runway = runwayRef.current;
        const track = trackRef.current;
        if (!runway || !track || !track.parentElement) return;

        const rect = runway.getBoundingClientRect();
        const header = document.querySelector("header");
        const navbarHeight = header?.offsetHeight ?? 76;
        const stageHeight = stickyStageRef.current?.offsetHeight ?? (window.innerHeight - navbarHeight);
        const totalScrollable = runway.offsetHeight - stageHeight;
        if (totalScrollable <= 0) return;

        // Progress based on container's top position relative to sticky navbar boundary
        const scrolled = navbarHeight - rect.top;
        const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

        // Compute horizontal travel
        const viewportWidth = track.parentElement.clientWidth;
        const maxTravel = Math.max(0, track.scrollWidth - viewportWidth);
        const translateX = -progress * maxTravel;

        // Direct 60fps transform
        track.style.transform = `translate3d(${translateX.toFixed(1)}px, 0, 0)`;

        // Update progress bar scale smoothly
        if (progressBarRef.current) {
          const barScale = Math.max(0.14, progress);
          progressBarRef.current.style.transform = `scaleX(${barScale.toFixed(3)})`;
        }

        // Geometric card distance calculation for focal prominence and active card detection
        const cards = track.children;
        const viewportCenter = viewportWidth / 2;
        let closestIdx = 0;
        let minDistance = Infinity;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2 + translateX;
          const distFromCenter = Math.abs(viewportCenter - cardCenter);

          if (distFromCenter < minDistance) {
            minDistance = distFromCenter;
            closestIdx = i;
          }

          // Subtle focal prominence enhancement on centered card
          const normalizedDist = Math.min(distFromCenter / (card.offsetWidth * 0.95), 1);
          const scale = 1 - normalizedDist * 0.025; // 1.0 down to 0.975 (minimal & premium)
          const opacity = 1 - normalizedDist * 0.12; // 1.0 down to 0.88
          card.style.transform = `scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(2);
        }

        // Update DOM labels directly for maximum responsiveness
        if (counterTextRef.current) {
          counterTextRef.current.textContent = `0${closestIdx + 1}`;
        }
        if (activeTitleRef.current) {
          activeTitleRef.current.textContent = collections[closestIdx]?.title || "";
        }

        // Only update React state when active card changes (for button disabled states)
        if (closestIdx !== activeIdxRef.current) {
          activeIdxRef.current = closestIdx;
          setActiveCardIndex(closestIdx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateRunwayDimensions);
    };
  }, [prefersReducedMotion, collections, updateRunwayDimensions]);

  // Navigate to previous/next card via vertical scroll timeline
  const scrollToCard = (targetIndex: number) => {
    const runway = runwayRef.current;
    if (!runway) return;

    const header = document.querySelector("header");
    const navbarHeight = header?.offsetHeight ?? 76;
    const stageHeight = stickyStageRef.current?.offsetHeight ?? (window.innerHeight - navbarHeight);
    const totalScrollable = runway.offsetHeight - stageHeight;
    if (totalScrollable <= 0) return;

    const runwayTop = window.scrollY + runway.getBoundingClientRect().top;
    const stickStartScrollY = runwayTop - navbarHeight;
    const cardRatio = targetIndex / (collections.length - 1);
    const targetScrollY = stickStartScrollY + cardRatio * totalScrollable;

    window.scrollTo({
      top: Math.round(targetScrollY),
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const prev = Math.max(0, activeCardIndex - 1);
    scrollToCard(prev);
  };

  const handleNext = () => {
    const next = Math.min(collections.length - 1, activeCardIndex + 1);
    scrollToCard(next);
  };

  // ─── Reduced Motion: Native Touch-Swipeable Gallery with CSS Snap ───
  if (prefersReducedMotion) {
    return (
      <div className="w-full pt-4 pb-8">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pl-6 pr-8 no-scrollbar py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="flex-shrink-0 w-[84vw] max-w-[360px] aspect-[4/5] max-h-[58svh] snap-start rounded-[4px] overflow-hidden shadow-[0_10px_28px_rgba(30,26,23,0.10)]"
            >
              <CollectionCard collection={collection} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={runwayRef}
      className="relative w-full overflow-visible"
      style={{ minHeight: "260svh" }} // Initial fallback before dynamic measurement
    >
      {/* ─── Sticky Gallery Stage pinned below mobile navbar ─── */}
      <div
        ref={stickyStageRef}
        className="collections-sticky-stage w-full overflow-hidden flex flex-col justify-between py-2.5 select-none"
      >
        {/* Subtle Top Indicator / Micro Header */}
        <div className="w-full px-6 flex items-center justify-between text-xs text-[#6B5B52] pb-1">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C89A2D] font-semibold">
            SWIPE / SCROLL TO EXPLORE
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.16em] text-[#1E1A17]/60">
            07 CATEGORIES
          </span>
        </div>

        {/* Horizontal Track Viewport */}
        <div className="w-full overflow-hidden my-auto py-1.5">
          <div
            ref={trackRef}
            className="flex items-center gap-3.5 pl-6 pr-8 will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="flex-shrink-0 w-[84vw] max-w-[360px] aspect-[4/5] max-h-[58svh] rounded-[4px] overflow-hidden shadow-[0_12px_32px_rgba(30,26,23,0.12)] will-change-transform"
              >
                <CollectionCard collection={collection} priority={index === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom Status Bar: Counter, Title & Progress ─── */}
        <div className="w-full px-6 pt-1.5 pb-1 flex items-center justify-between gap-3">
          {/* Active Chapter Counter & Title */}
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex items-center gap-1 font-mono text-xs tracking-[0.16em] font-semibold text-[#1E1A17]">
              <span ref={counterTextRef} className="text-[#D81B77]">01</span>
              <span className="text-[#1E1A17]/30">/</span>
              <span className="text-[#1E1A17]/60">07</span>
            </div>
            <span className="h-3 w-[1px] bg-[#EFE4D6]" aria-hidden="true" />
            <span
              ref={activeTitleRef}
              className="font-serif text-xs tracking-wide text-[#1E1A17] font-medium truncate max-w-[140px]"
            >
              {collections[0]?.title}
            </span>
          </div>

          {/* Progress Bar & Arrow Navigation */}
          <div className="flex items-center gap-3">
            {/* Linear Progress Track */}
            <div
              className="w-16 sm:w-20 h-[2px] bg-[#E2D5C5] rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(((activeCardIndex + 1) / collections.length) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Collections scroll progress"
            >
              <div
                ref={progressBarRef}
                className="h-full bg-[#D81B77] rounded-full will-change-transform"
                style={{
                  width: "100%",
                  transformOrigin: "left center",
                  transform: `scaleX(${1 / collections.length})`,
                }}
              />
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeCardIndex === 0}
                aria-label="Previous collection"
                className="w-7 h-7 rounded-full border border-[#EFE4D6] bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1E1A17] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#D81B77]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeCardIndex === collections.length - 1}
                aria-label="Next collection"
                className="w-7 h-7 rounded-full border border-[#EFE4D6] bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1E1A17] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#D81B77]"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
