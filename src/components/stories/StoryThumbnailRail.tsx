"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { StyleStory } from "@/data/style-stories";

interface StoryThumbnailRailProps {
  stories: StyleStory[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

/**
 * StoryThumbnailRail — Phase 06: Cinematic Style Stories Floating Chapter Navigator
 *
 * Characteristics:
 *  • Floating horizontal strip of all six chapter thumbnails
 *  • Inactive: ~76–88px wide, ~104–116px tall, desaturated with subtle dark overlay
 *  • Active: ~100–112px wide, ~140–152px tall, elevated upward ~20px (-translate-y-5),
 *    vibrant full-colour photograph with refined warm-gold (#C89A2D) ring
 *  • Smooth 600ms cubic-bezier animation with zero layout jumps
 *  • Integrated into the scene without heavy opaque bounding boxes
 *  • Click & keyboard accessibility (Tab, Enter, Space)
 *  • Auto-centers the selected chapter on mobile viewports
 */
export default function StoryThumbnailRail({
  stories,
  activeIndex,
  onSelect,
}: StoryThumbnailRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  // Keep active thumbnail smoothly centered in view on smaller screens
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const activeEl = rail.children[activeIndex] as HTMLElement | undefined;
    if (activeEl) {
      const targetLeft =
        activeEl.offsetLeft - (rail.offsetWidth - activeEl.offsetWidth) / 2;
      rail.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div
      ref={railRef}
      role="tablist"
      aria-label="Style Stories Chapter Navigation"
      className="flex items-end gap-2.5 sm:gap-3.5 md:gap-4 overflow-x-auto no-scrollbar py-6 px-1 pointer-events-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {stories.map((story, idx) => {
        const isActive = idx === activeIndex;

        return (
          <button
            key={story.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`Chapter ${story.number}: ${story.title} — ${story.category}`}
            tabIndex={0}
            onClick={() => onSelect(idx)}
            className={`group relative flex-shrink-0 rounded-[4px] overflow-hidden cursor-pointer text-left transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] ${
              isActive
                ? "w-[92px] sm:w-[104px] md:w-[112px] h-[128px] sm:h-[142px] md:h-[152px] -translate-y-4 sm:-translate-y-5 ring-[1.5px] ring-[#C89A2D] shadow-[0_16px_36px_rgba(0,0,0,0.85)] z-20"
                : "w-[68px] sm:w-[78px] md:w-[84px] h-[96px] sm:h-[108px] md:h-[116px] translate-y-0 opacity-75 hover:opacity-100 hover:-translate-y-1.5 z-10"
            }`}
          >
            {/* Thumbnail Image — model-focused portrait crop */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={story.image}
                alt={story.alt}
                fill
                sizes="(max-width: 640px) 92px, 120px"
                style={{ objectPosition: story.thumbnailPosition }}
                className={`object-cover transition-all duration-700 ease-out ${
                  isActive
                    ? "filter-none brightness-105 scale-105"
                    : "grayscale-[65%] brightness-[0.78] group-hover:grayscale-[20%] group-hover:brightness-95 scale-100"
                }`}
              />
            </div>

            {/* Subtle Gradient Scrim for contrast */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-opacity duration-500 ${
                isActive ? "opacity-60" : "opacity-75"
              }`}
              aria-hidden="true"
            />

            {/* Inactive hairline border tint */}
            {!isActive && (
              <div
                className="absolute inset-0 border border-white/15 rounded-[4px] pointer-events-none group-hover:border-white/35 transition-colors"
                aria-hidden="true"
              />
            )}

            {/* Chapter Number Badge */}
            <div className="absolute top-2 left-2 z-10">
              <span
                className={`font-mono text-[9px] sm:text-[9.5px] tracking-[0.16em] font-medium px-1.5 py-0.5 rounded-[2px] transition-colors ${
                  isActive
                    ? "bg-[#C89A2D] text-black font-semibold shadow-sm"
                    : "bg-black/60 text-[#F8F2EA]/85 backdrop-blur-xs"
                }`}
              >
                {story.number}
              </span>
            </div>

            {/* Title display on active thumbnail or hover */}
            <div
              className={`absolute inset-x-0 bottom-0 z-10 p-2 sm:p-2.5 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <p className="font-serif text-[11px] sm:text-xs text-white leading-tight font-medium truncate">
                {story.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
