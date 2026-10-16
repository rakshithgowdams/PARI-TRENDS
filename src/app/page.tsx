import HeroScrollytelling from "@/components/sections/HeroScrollytelling";
import AboutPariTrends from "@/components/sections/AboutPariTrends";

/**
 * Pari Trends — Homepage
 *
 * Phase 01: Complete responsive navigation bar.
 * Phase 02: Cinematic scroll-driven boutique walkthrough hero.
 * Phase 03: Editorial brand intro & About section.
 */
export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ─── Phase 02: Scrollytelling Hero ─── */}
      <HeroScrollytelling />

      {/* ─── Phase 03: About Pari Trends ─── */}
      <AboutPariTrends />

      {/* ─── Future section anchors & smooth release ─── */}
      {(
        [
          { id: "collections", label: "Collections" },
          { id: "featured", label: "Featured" },
          { id: "stories", label: "Style Stories" },
          { id: "trends", label: "Latest Trends" },
          { id: "visit", label: "Visit Us" },
        ] as const
      ).map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className="min-h-[70vh] flex items-center justify-center border-t border-[#EFE4D6]"
          style={{
            background:
              i % 2 === 0
                ? "#F8F2EA"
                : "linear-gradient(180deg, #F8F2EA 0%, #EFE4D6 100%)",
          }}
        >
          <div className="text-center px-6">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C89A2D] mb-2">
              Coming in Future Phases
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1A17]/80">
              {section.label}
            </h2>
            <p className="mt-2 text-sm text-[#6B5B52]/60">
              Section #{section.id}
            </p>
          </div>
        </section>
      ))}
    </main>
  );
}
