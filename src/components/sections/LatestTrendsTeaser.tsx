import { Sparkles, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * LatestTrendsTeaser — Refined production teaser for #trends
 */
export default function LatestTrendsTeaser() {
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);

  return (
    <section
      id="trends"
      className="relative w-full bg-[#FAF5EE] text-[#1E1A17] py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-[#EFE4D6]"
      aria-label="Latest Trends — Pari Trends"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* Editorial Frame */}
        <div className="relative rounded-[6px] border border-[#EFE4D6] bg-gradient-to-br from-[#F8F2EA] via-[#FAF5EE] to-[#EFE4D6]/50 p-8 sm:p-12 lg:p-16 overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C89A2D]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 sm:w-12 bg-[#C89A2D]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] font-semibold text-[#C89A2D] uppercase">
                05 / LATEST TRENDS
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1A17] leading-[1.15] mb-5 tracking-tight">
              Curated Weekly at the{" "}
              <span className="italic font-serif text-[#D81B77] font-normal">
                Showroom.
              </span>
            </h2>

            {/* Copy */}
            <p className="font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed mb-8 max-w-xl">
              Our in-store edit evolves with every season. Visit our Alur boutique to explore fresh arrivals, limited festive drops, and handpicked designer fabrics before they sell out.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1A17]/5 text-xs font-sans text-[#1E1A17] border border-[#1E1A17]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#C89A2D]" />
                Fresh Drops Every Week
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1A17]/5 text-xs font-sans text-[#1E1A17] border border-[#1E1A17]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D81B77]" />
                Exclusive Showroom Silhouettes
              </span>
            </div>

            {/* Action */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.whatsappUrl}
                target={isExternalWhatsApp ? "_blank" : undefined}
                rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1E1A17] hover:bg-[#D81B77] text-white text-sm font-sans font-semibold tracking-wide transition-all duration-300 shadow-md active:scale-95"
              >
                <span>Enquire on Fresh Arrivals</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#visit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#1E1A17]/20 hover:border-[#1E1A17] text-[#1E1A17] text-sm font-sans font-medium transition-colors"
              >
                Plan Your Visit
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
