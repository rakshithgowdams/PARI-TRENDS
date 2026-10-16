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
 * StoryThumbnailRail — Phase 06: Cinematic Style Stories
 *
 * Characteristics:
 *  • Floating horizontal strip of all six story thumbnails
 *  • Active thumbnail: elevated upward ~20px (-translate-y-5), full-colour, gold ring highlight
 *  • Inactive thumbnails: narrow portrait composition, subdued brightness and desaturation
 *  • Click and keyboard selection (Tab, Enter, Space)
 *  • Auto-scrolls into view on mobile viewports so active card is always centered
 */
export default function StoryThumbnailRail({
  stories,
  activeIndex,
  onSelect,
}: StoryThumbnailRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  // Keep active thumbnail centered in view on smaller screens
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
      aria-label="Story chapter navigation"
      className="flex items-end gap-2.5 sm:gap-3.5 md:gap-4 overflow-x-auto no-scrollbar py-6 px-1"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {stories.map((story, idx) => {
        const isActive = idx === activeIndex;

        return (
          <button
            key={story.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`Chapter ${story.number}: ${story.title} (${story.category})`}
            tabIndex={0}
            onClick={() => onSelect(idx)}
            className={`group relative flex-shrink-0 rounded-[3px] overflow-hidden cursor-pointer text-left transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] ${
              isActive
                ? "w-24 sm:w-28 md:w-32 aspect-[3/4] -translate-y-4 sm:-translate-y-5 ring-2 ring-[#C89A2D] shadow-2xl shadow-black/80 z-20"
                : "w-16 sm:w-20 md:w-24 aspect-[3/4] translate-y-0 opacity-70 hover:opacity-95 hover:-translate-y-1 z-10"
            }`}
          >
            {/* Thumbnail Image cropped directly from master landscape image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={story.image}
                alt={story.alt}
                fill
                sizes="(max-width: 640px) 100px, 150px"
                className={`object-cover object-[center_20%] transition-all duration-700 ease-out ${
                  isActive
                    ? "grayscale-0 brightness-100 scale-105"
                    : "grayscale brightness-[0.6] group-hover:brightness-[0.78] scale-100"
                }`}
              />
            </div>

            {/* Gradient Scrim */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 ${
                isActive ? "opacity-75" : "opacity-90"
              }`}
              aria-hidden="true"
            />

            {/* Inactive border tint */}
            {!isActive && (
              <div
                className="absolute inset-0 border border-white/10 rounded-[3px] pointer-events-none"
                aria-hidden="true"
              />
            )}

            {/* Chapter Number Badge */}
            <div className="absolute top-2 left-2 z-10">
              <span
                className={`font-mono text-[9.5px] sm:text-[10px] tracking-[0.16em] font-medium px-1.5 py-0.5 rounded-xs ${
                  isActive
                    ? "bg-[#C89A2D] text-black font-semibold"
                    : "bg-black/50 text-[#F8F2EA]/80 backdrop-blur-xs"
                }`}
              >
                {story.number}
              </span>
            </div>

            {/* Title on Active Thumbnail */}
            <div
              className={`absolute inset-x-0 bottom-0 z-10 p-2 sm:p-2.5 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <p className="font-serif text-[11px] sm:text-xs text-white leading-tight truncate">
                {story.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
