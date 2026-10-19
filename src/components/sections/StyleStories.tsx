"use client";

import StoryStage from "@/components/stories/StoryStage";

/**
 * StyleStories — Phase 06: Cinematic Style Stories Full-Bleed Lookbook
 *
 * Section ID: `stories`
 *
 * Architecture:
 *  • Immersive full-browser-width editorial lookbook stage (92svh tall)
 *  • Standalone heading block removed in favor of integrated Zone A metadata
 *  • Outer bounding card, drop shadows, and unnecessary ivory padding eliminated
 *  • Fluid transition between The Pari Edit and Latest Trends
 */
export default function StyleStories() {
  return (
    <section
      id="stories"
      className="relative w-full bg-[#12100E] text-white overflow-hidden border-t border-[#26201B]"
      aria-label="Style Stories — Pari Trends Editorial Lookbook"
    >
      <StoryStage />
    </section>
  );
}
