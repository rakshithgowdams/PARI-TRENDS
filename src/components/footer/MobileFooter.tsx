"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  ArrowUpRight,
  MessageCircle,
  Plus,
  Minus,
  ArrowUp,
} from "lucide-react";
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

const COLLECTIONS_LIST = [
  "Kurti / Kurta Sets",
  "Co-ord Sets",
  "Western Tops",
  "Party Wear & Dress Sets",
  "Nightwear",
  "Leggings / Straight Pants",
  "Dupatta Sets",
] as const;

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Featured Styles", href: "#featured" },
  { label: "Style Stories", href: "#stories" },
  { label: "Latest Trends", href: "#trends" },
] as const;

/**
 * MobileFooter — Dedicated mobile-first luxury fashion footer (< 768px)
 *
 * 5 Cohesive Zones:
 *  • Zone 01: Brand Identity (Original logo, name, tagline & motto)
 *  • Zone 02: Visit Our Boutique (Alur location, Get Directions & WhatsApp)
 *  • Zone 03: Compact Navigation (2 accessible accordions: Explore Collections & Quick Links)
 *  • Zone 04: Stay in Style (Instagram call to action in Pari Pink)
 *  • Zone 05: Dedicated 4:5 Mobile Fashion Artwork (2 prominent models seamlessly blended)
 *  • Lower Footer: Clean copyright & Back to Top strip
 */
export default function MobileFooter() {
  const [openAccordion, setOpenAccordion] = useState<"collections" | "quickLinks" | null>(null);
  const [isArtworkVisible, setIsArtworkVisible] = useState(false);
  const artworkRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (group: "collections" | "quickLinks") => {
    setOpenAccordion((prev) => (prev === group ? null : group));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const el = artworkRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsArtworkVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);
  const currentYear = 2026;

  return (
    <div className="w-full bg-[#F8F2EA] text-[#1E1A17] flex flex-col">
      {/* ─── ZONE 01: Brand Identity ─── */}
      <section className="px-6 pt-9 pb-6" aria-label="Brand Overview">
        <a
          href="#home"
          className="inline-flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] rounded-md"
          aria-label="Pari Trends — Return to top"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C89A2D]/50 shadow-xs flex-shrink-0 bg-white">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-serif text-[1.4rem] tracking-wider text-[#1E1A17] font-medium leading-none">
              PARI TRENDS
            </h3>
            <p className="font-sans text-[9.5px] tracking-[0.24em] text-[#C89A2D] uppercase font-semibold mt-1">
              WOMEN&apos;S FASHION
            </p>
          </div>
        </a>

        <p className="mt-3.5 font-sans text-[13px] text-[#6B5B52] leading-relaxed font-normal">
          Fashion for every moment.
        </p>
      </section>

      {/* ─── ZONE 02: Visit Our Boutique ─── */}
      <section className="px-6 py-6 border-t border-[#EFE4D6]" aria-label="Boutique Location & Actions">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-3.5 h-[1.5px] bg-[#C89A2D]" aria-hidden="true" />
          <span className="font-sans text-[10px] tracking-[0.24em] font-semibold text-[#C89A2D] uppercase">
            VISIT OUR BOUTIQUE
          </span>
        </div>

        <h4 className="font-serif text-2xl text-[#1E1A17] font-medium tracking-tight">
          Find us in Alur.
        </h4>

        <div className="flex items-center gap-1.5 mt-1 text-[#6B5B52]">
          <MapPin className="w-3.5 h-3.5 text-[#C89A2D] shrink-0" aria-hidden="true" />
          <span className="font-sans text-[11px] tracking-[0.18em] uppercase font-medium">
            Alur · Hassan · Karnataka
          </span>
        </div>

        {/* Action Buttons: Get Directions & WhatsApp */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5 mt-4">
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Directions to Pari Trends store in Google Maps"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#1E1A17] hover:bg-[#D81B77] text-white text-[12.5px] font-sans font-semibold tracking-wide transition-colors duration-200 shadow-xs active:scale-95"
          >
            <span>Get Directions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={siteConfig.whatsappUrl}
            target={isExternalWhatsApp ? "_blank" : undefined}
            rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
            aria-label="Chat with Pari Trends on WhatsApp"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#1E1A17]/25 hover:border-[#D81B77] hover:bg-[#D81B77]/5 text-[#1E1A17] hover:text-[#D81B77] text-[12.5px] font-sans font-medium transition-colors duration-200 active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#D81B77]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </section>

      {/* ─── ZONE 03: Compact Navigation (Accessible Accordions) ─── */}
      <section className="px-6 py-1 border-t border-[#EFE4D6]" aria-label="Footer Navigation">
        {/* Accordion 01: Explore Collections */}
        <div className="border-b border-[#EFE4D6]">
          <button
            onClick={() => toggleAccordion("collections")}
            aria-expanded={openAccordion === "collections"}
            aria-controls="accordion-collections"
            className="w-full min-h-[52px] py-3.5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] rounded-[2px]"
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#1E1A17] font-semibold flex items-center gap-2">
              <span className="w-3 h-[1px] bg-[#C89A2D]" aria-hidden="true" />
              Explore Collections
            </span>
            <span className="w-6 h-6 rounded-full bg-[#1E1A17]/5 flex items-center justify-center text-[#C89A2D] shrink-0">
              {openAccordion === "collections" ? (
                <Minus className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          <div
            id="accordion-collections"
            className={`transition-all duration-300 ease-out overflow-hidden ${
              openAccordion === "collections" ? "max-h-[360px] pb-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-1 pl-5 pt-1" role="list">
              {COLLECTIONS_LIST.map((category) => (
                <li key={category}>
                  <a
                    href={getStoryEnquiryUrl(category)}
                    target={isExternalWhatsApp ? "_blank" : undefined}
                    rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-between w-full py-1.5 text-[13px] font-sans text-[#6B5B52] hover:text-[#D81B77] transition-colors"
                  >
                    <span>{category}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D81B77] opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accordion 02: Quick Links */}
        <div>
          <button
            onClick={() => toggleAccordion("quickLinks")}
            aria-expanded={openAccordion === "quickLinks"}
            aria-controls="accordion-quicklinks"
            className="w-full min-h-[52px] py-3.5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] rounded-[2px]"
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#1E1A17] font-semibold flex items-center gap-2">
              <span className="w-3 h-[1px] bg-[#C89A2D]" aria-hidden="true" />
              Quick Links
            </span>
            <span className="w-6 h-6 rounded-full bg-[#1E1A17]/5 flex items-center justify-center text-[#C89A2D] shrink-0">
              {openAccordion === "quickLinks" ? (
                <Minus className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          <div
            id="accordion-quicklinks"
            className={`transition-all duration-300 ease-out overflow-hidden ${
              openAccordion === "quickLinks" ? "max-h-[300px] pb-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-1 pl-5 pt-1" role="list">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-1.5 text-[13px] font-sans text-[#6B5B52] hover:text-[#D81B77] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── ZONE 04: Stay in Style ─── */}
      <section className="px-6 py-6 border-t border-[#EFE4D6]" aria-label="Social Engagement">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-3.5 h-[1.5px] bg-[#C89A2D]" aria-hidden="true" />
          <span className="font-sans text-[10px] tracking-[0.22em] font-semibold uppercase text-[#C89A2D]">
            STAY IN STYLE
          </span>
        </div>

        <h4 className="font-serif text-2xl text-[#1E1A17] font-medium tracking-tight">
          Stay in Style.
        </h4>

        <p className="mt-1 font-sans text-[13px] text-[#6B5B52] leading-relaxed font-normal">
          Discover fresh looks and everyday inspiration.
        </p>

        {/* Primary Action Button: Follow on Instagram */}
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Pari Trends on Instagram"
          className="group mt-4 w-full inline-flex items-center justify-between px-5 py-3 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white text-[13px] font-sans font-semibold tracking-wide transition-all duration-200 shadow-md shadow-[#D81B77]/25 active:scale-95"
        >
          <div className="flex items-center gap-2.5">
            <InstagramIcon className="w-4 h-4 text-white" />
            <span>Follow on Instagram</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </section>

      {/* ─── ZONE 05: Dedicated Mobile Fashion Artwork & Footer Ending ─── */}
      <section className="relative w-full overflow-hidden pt-2 bg-[#F8F2EA]" aria-label="Fashion Artwork">
        <div
          ref={artworkRef}
          className={`relative w-full max-w-sm mx-auto aspect-[4/5] overflow-hidden transition-all duration-700 ease-out will-change-transform ${
            isArtworkVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Top seamless blend gradient into #F8F2EA warm ivory */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F8F2EA] via-[#F8F2EA]/65 to-transparent z-10 pointer-events-none" />

          {/* Left and right ambient edge gradients */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F8F2EA]/85 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#F8F2EA]/85 to-transparent z-10 pointer-events-none" />

          {/* High-resolution optimized mobile portrait artwork */}
          <Image
            src="/images/footer/pari-trends-mobile-footer.webp"
            alt="Pari Trends Indian couture models in coordinated festive ethnic wear"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-bottom"
            quality={92}
          />

          {/* Bottom gentle fade into copyright bar */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F8F2EA] to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* ─── COPYRIGHT & LOWER FOOTER ─── */}
      <footer className="border-t border-[#EFE4D6] py-5 px-6 bg-[#F8F2EA] flex flex-col items-center justify-center gap-3 text-center">
        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-[#1E1A17] hover:text-[#D81B77] transition-colors py-1"
        >
          <span>Back to Top</span>
          <span className="w-5 h-5 rounded-full bg-[#1E1A17]/5 group-hover:bg-[#D81B77] group-hover:text-white flex items-center justify-center transition-colors">
            <ArrowUp className="w-3 h-3" />
          </span>
        </button>

        {/* Copyright notice */}
        <p className="font-sans text-[11px] tracking-wide text-[#6B5B52]/90">
          © {currentYear} {siteConfig.name}. All rights reserved.
        </p>

        {/* Discreet social link bubbles */}
        <div className="flex items-center gap-2 pt-0.5">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pari Trends Instagram"
            className="w-7 h-7 rounded-full bg-[#1E1A17]/5 hover:bg-[#D81B77] hover:text-white flex items-center justify-center transition-colors text-[#1E1A17]"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href={siteConfig.whatsappUrl}
            target={isExternalWhatsApp ? "_blank" : undefined}
            rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
            aria-label="Pari Trends WhatsApp Enquiry"
            className="w-7 h-7 rounded-full bg-[#1E1A17]/5 hover:bg-[#D81B77] hover:text-white flex items-center justify-center transition-colors text-[#1E1A17]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
