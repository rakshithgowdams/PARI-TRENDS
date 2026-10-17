import { MapPin, Clock, Phone, Sparkles, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * VisitBoutique — Refined production section for #visit
 */
export default function VisitBoutique() {
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Pari Trends Alur Hassan Karnataka"
  )}`;

  return (
    <section
      id="visit"
      className="relative w-full bg-[#F8F2EA] text-[#1E1A17] py-24 sm:py-32 lg:py-36 overflow-hidden border-t border-[#EFE4D6]"
      aria-label="Visit Pari Trends Boutique"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 sm:w-12 bg-[#C89A2D]" aria-hidden="true" />
            <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] font-semibold text-[#C89A2D] uppercase">
              06 / VISIT US
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1A17] leading-[1.15] mb-4 tracking-tight">
            Experience Pari Trends in{" "}
            <span className="italic font-serif text-[#D81B77] font-normal">
              Person.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed max-w-xl">
            Step inside our Alur boutique to touch the textiles, try on the latest cuts, and enjoy dedicated personal styling tailored to your tastes.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          
          {/* Card 1: Location */}
          <div className="rounded-[4px] border border-[#EFE4D6] bg-[#FAF5EE] p-8 flex flex-col justify-between hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1E1A17]/5 flex items-center justify-center text-[#C89A2D] mb-6">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#1E1A17] mb-2 font-medium">
                Showroom Location
              </h3>
              <p className="font-sans text-sm text-[#6B5B52] leading-relaxed mb-4">
                {siteConfig.address}
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider text-[#D81B77] uppercase hover:underline underline-offset-4"
            >
              <span>View on Google Maps</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Hours */}
          <div className="rounded-[4px] border border-[#EFE4D6] bg-[#FAF5EE] p-8 flex flex-col justify-between hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1E1A17]/5 flex items-center justify-center text-[#C89A2D] mb-6">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#1E1A17] mb-2 font-medium">
                Store Timings
              </h3>
              <p className="font-sans text-sm text-[#6B5B52] leading-relaxed mb-4">
                {siteConfig.timings}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C89A2D]">
              <span className="w-2 h-2 rounded-full bg-[#C89A2D]" />
              <span>Open 7 Days a Week</span>
            </div>
          </div>

          {/* Card 3: Assistance & Enquiries */}
          <div className="rounded-[4px] border border-[#EFE4D6] bg-[#FAF5EE] p-8 flex flex-col justify-between hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#1E1A17]/5 flex items-center justify-center text-[#C89A2D] mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#1E1A17] mb-2 font-medium">
                Personalized Styling
              </h3>
              <p className="font-sans text-sm text-[#6B5B52] leading-relaxed mb-4">
                Have a specific occasion or fit in mind? Contact us ahead of time or drop in for dedicated consultation.
              </p>
            </div>

            <a
              href={siteConfig.whatsappUrl}
              target={isExternalWhatsApp ? "_blank" : undefined}
              rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider text-[#D81B77] uppercase hover:underline underline-offset-4"
            >
              <span>Contact Showroom</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
