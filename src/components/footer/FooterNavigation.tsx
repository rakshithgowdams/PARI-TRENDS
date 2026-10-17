import Image from "next/image";
import { ArrowUpRight, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getStoryEnquiryUrl } from "@/data/style-stories";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}


/**
 * Seven locked clothing categories for Pari Trends.
 */
const COLLECTIONS_LIST = [
  "Kurti / Kurta Sets",
  "Co-ord Sets",
  "Western Tops",
  "Party Wear",
  "Nightwear",
  "Leggings / Straight Pants",
  "Dupatta Sets",
] as const;

/**
 * Explore section anchors.
 */
const EXPLORE_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Featured Styles", href: "#featured" },
  { label: "Style Stories", href: "#stories" },
  { label: "Latest Trends", href: "#trends" },
] as const;

/**
 * FooterNavigation — Phase 08: 5-Column Editorial Navigation Structure
 */
export default function FooterNavigation() {
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);

  return (
    <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
      
      {/* ─── 5-Column Grid Layout ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 sm:gap-8 lg:gap-8 pb-14 border-b border-[#EFE4D6]">
        
        {/* ─── Column 01: Brand (Col 1-3) ─── */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <a
              href="#home"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77]"
              aria-label="Pari Trends — Back to top"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C89A2D]/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl tracking-wider text-[#1E1A17] font-medium leading-none">
                  PARI TRENDS
                </h3>
                <p className="font-sans text-[10px] tracking-[0.25em] text-[#C89A2D] uppercase font-semibold mt-1">
                  {siteConfig.tagline}
                </p>
              </div>
            </a>

            {/* Supporting Copy */}
            <p className="mt-4 font-sans text-sm text-[#6B5B52] leading-relaxed max-w-xs font-normal">
              Fashion for every moment.
            </p>
          </div>

          {/* Location Badge */}
          <div className="mt-6 pt-4 border-t border-[#EFE4D6]/70 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#C89A2D] shrink-0" />
            <span className="font-sans text-[10.5px] tracking-[0.22em] text-[#6B5B52] uppercase font-medium">
              ALUR · HASSAN · KARNATAKA
            </span>
          </div>
        </div>

        {/* ─── Column 02: Collections (Col 4-5) ─── */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-4 bg-[#C89A2D]" aria-hidden="true" />
            <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#C89A2D] font-semibold">
              Collections
            </h4>
          </div>
          <ul className="space-y-2.5 text-sm" role="list">
            {COLLECTIONS_LIST.map((category) => (
              <li key={category}>
                <a
                  href={getStoryEnquiryUrl(category)}
                  target={isExternalWhatsApp ? "_blank" : undefined}
                  rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center text-[#6B5B52] hover:text-[#1E1A17] font-sans text-[13.5px] transition-colors duration-200"
                >
                  <span className="group-hover:underline underline-offset-4 decoration-[#D81B77]">
                    {category}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-[#D81B77] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 ml-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Column 03: Explore (Col 6-7) ─── */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-4 bg-[#C89A2D]" aria-hidden="true" />
            <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#C89A2D] font-semibold">
              Explore
            </h4>
          </div>
          <ul className="space-y-2.5 text-sm" role="list">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center text-[#6B5B52] hover:text-[#1E1A17] font-sans text-[13.5px] transition-colors duration-200"
                >
                  <span className="group-hover:underline underline-offset-4 decoration-[#D81B77]">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Column 04: Visit & Contact (Col 8-9) ─── */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-4 bg-[#C89A2D]" aria-hidden="true" />
            <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#C89A2D] font-semibold">
              Visit & Contact
            </h4>
          </div>
          <ul className="space-y-2.5 text-sm" role="list">
            <li>
              <a
                href="#visit"
                className="group inline-flex items-center text-[#6B5B52] hover:text-[#1E1A17] font-sans text-[13.5px] transition-colors duration-200"
              >
                <span className="group-hover:underline underline-offset-4 decoration-[#D81B77]">
                  Visit Our Store
                </span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-[#6B5B52] hover:text-[#1E1A17] font-sans text-[13.5px] transition-colors duration-200"
              >
                <span className="group-hover:underline underline-offset-4 decoration-[#D81B77]">
                  Get Directions
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#D81B77] ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsappUrl}
                target={isExternalWhatsApp ? "_blank" : undefined}
                rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center text-[#6B5B52] hover:text-[#1E1A17] font-sans text-[13.5px] transition-colors duration-200"
              >
                <span className="group-hover:underline underline-offset-4 decoration-[#D81B77]">
                  WhatsApp
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#D81B77] ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-[#6B5B52] hover:text-[#1E1A17] font-sans text-[13.5px] transition-colors duration-200"
              >
                <span className="group-hover:underline underline-offset-4 decoration-[#D81B77]">
                  Instagram
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#D81B77] ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          </ul>
        </div>

        {/* ─── Column 05: Stay in Style (Col 10-12) ─── */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-4 bg-[#C89A2D]" aria-hidden="true" />
            <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#C89A2D] font-semibold">
              Stay in Style
            </h4>
          </div>

          <h5 className="font-serif text-2xl text-[#1E1A17] mb-2 font-medium">
            Stay in Style.
          </h5>

          <p className="font-sans text-sm text-[#6B5B52] leading-relaxed mb-6 font-normal">
            Discover fresh looks, new collections and a little everyday inspiration.
          </p>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            {/* Primary Action: Instagram */}
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between px-5 py-2.5 rounded-full bg-[#1E1A17] hover:bg-[#D81B77] text-white text-[13px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-sm active:scale-95"
            >
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Follow on Instagram</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Secondary Action: WhatsApp */}
            <a
              href={siteConfig.whatsappUrl}
              target={isExternalWhatsApp ? "_blank" : undefined}
              rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center justify-between px-5 py-2.5 rounded-full border border-[#1E1A17]/25 hover:border-[#D81B77] hover:bg-[#D81B77]/5 text-[#1E1A17] hover:text-[#D81B77] text-[13px] font-sans font-medium transition-all duration-300 active:scale-95"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#D81B77]" />
                <span>Enquire on WhatsApp</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
