import dynamic from "next/dynamic";
import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import AboutPariTrends from "@/components/sections/AboutPariTrends";

const SignatureCollections = dynamic(
  () => import("@/components/sections/SignatureCollections")
);
const FeaturedEditorial = dynamic(
  () => import("@/components/sections/FeaturedEditorial")
);
const StyleStories = dynamic(
  () => import("@/components/sections/StyleStories")
);
const LatestTrendsTeaser = dynamic(
  () => import("@/components/sections/LatestTrendsTeaser")
);
const VisitOurStore = dynamic(
  () => import("@/components/sections/VisitOurStore")
);

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
    <main className="flex-1 flex flex-col w-full">
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

