import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import AboutPariTrends from "@/components/sections/AboutPariTrends";
import SignatureCollections from "@/components/sections/SignatureCollections";
import FeaturedEditorial from "@/components/sections/FeaturedEditorial";
import StyleStories from "@/components/sections/StyleStories";
import LatestTrendsTeaser from "@/components/sections/LatestTrendsTeaser";
import VisitOurStore from "@/components/sections/VisitOurStore";

/**
 * Pari Trends — Homepage
 *
 * Phase 01: Complete responsive navigation bar.
 * Phase 02: Cinematic scroll-driven boutique walkthrough hero.
 * Phase 03: Editorial brand intro & About section.
 * Phase 04: Signature Collections lookbook showcase.
 * Phase 05: Worth Your Attention horizontal accordion showcase.
 * Phase 06: Cinematic Style Stories interactive lookbook stage.
 * Phase 07: Latest Trends teaser showcase.
 * Phase 08: Visit Our Store boutique invitation experience.
 */
export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ─── Phase 02: Scrollytelling Hero ─── */}
      <HeroScrollytelling />

      {/* ─── Phase 03: About Pari Trends ─── */}
      <AboutPariTrends />

      {/* ─── Phase 04: Signature Collections ─── */}
      <SignatureCollections />

      {/* ─── Phase 05: Worth Your Attention ─── */}
      <FeaturedEditorial />

      {/* ─── Phase 06: Cinematic Style Stories ─── */}
      <StyleStories />

      {/* ─── Latest Trends ─── */}
      <LatestTrendsTeaser />

      {/* ─── Visit Our Store ─── */}
      <VisitOurStore />
    </main>
  );
}

