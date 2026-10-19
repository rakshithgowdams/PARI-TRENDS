"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CollectionItem, getCollectionEnquiryUrl } from "@/data/collections";
import { siteConfig } from "@/config/site";

interface CollectionCardProps {
  collection: CollectionItem;
  priority?: boolean;
}

/**
 * CollectionCard — Phase 04: Signature Collections
 *
 * Art Direction: Curated Fashion Lookbook
 *  • 4:5 Aspect ratio full-bleed editorial imagery
 *  • Minimal corner radius (3px)
 *  • Gentle scale on hover (1.0 to 1.04) with smooth 500ms easing
 *  • Diagonal arrow micro-translation
 *  • Dynamic WhatsApp enquiry link per category with graceful fallback to #visit
 *  • Full touch-device compatibility & keyboard navigation compliance
 */
export default function CollectionCard({
  collection,
  priority = false,
}: CollectionCardProps) {
  const enquiryUrl = getCollectionEnquiryUrl(collection.title);
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);

  return (
    <a
      href={enquiryUrl}
      target={isExternalWhatsApp ? "_blank" : undefined}
      rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
      aria-label={`${collection.title} — Enquire about this collection`}
      className="group relative block w-full aspect-[4/5] overflow-hidden rounded-[3px] bg-[#EFE4D6] text-left select-none transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F2EA]"
    >
      {/* ─── 1. Full-Bleed Editorial Fashion Image ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-center transform scale-100 transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
        />
      </div>

      {/* ─── 2. Editorial Scrim / Gradient Overlay ─── */}
      {/* Base legibility scrim */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/85 via-[#1E1A17]/25 to-transparent opacity-85 transition-opacity duration-500 ease-out group-hover:opacity-95"
        aria-hidden="true"
      />

      {/* Subtle top vignette for upper corner numbering & arrow */}
      <div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1E1A17]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── 3. Top Header Bar: Category Number & Directional Arrow ─── */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
        {/* Editorial Index Number */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs tracking-[0.2em] font-medium text-[#F8F2EA]/85 backdrop-blur-[2px] px-2 py-0.5 rounded-sm bg-[#1E1A17]/25 border border-[#F8F2EA]/15">
          <span className="text-[#C89A2D]">{collection.number}</span>
          <span className="text-[#F8F2EA]/40">/</span>
          <span className="text-[#F8F2EA]/60">07</span>
        </div>

        {/* Minimal Directional Arrow Icon */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1E1A17]/30 backdrop-blur-sm border border-[#F8F2EA]/20 text-[#F8F2EA] transition-all duration-300 ease-out group-hover:bg-[#D81B77] group-hover:border-[#D81B77] group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* ─── 4. Bottom Editorial Typography & Category Content ─── */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col justify-end">
        {/* Subtle Category Subtitle / Tag */}
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#C89A2D] mb-1 font-semibold">
          {collection.subtitle}
        </p>

        {/* Category Main Title */}
        <h3 className="font-serif text-xl sm:text-2xl text-[#F8F2EA] tracking-wide leading-snug transition-colors duration-300 group-hover:text-white">
          {collection.title}
        </h3>

        {/* Interactive Enquiry Cue (Visible on touch, polished expand on desktop hover) */}
        <div className="mt-3 flex items-center gap-2 overflow-hidden">
          <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-[#F8F2EA]/80 group-hover:text-[#F8F2EA] transition-colors duration-300">
            {isExternalWhatsApp ? "Enquire Collection" : "Discover In-Store"}
          </span>
          <div className="h-[1px] w-6 bg-[#C89A2D]/70 transition-all duration-300 ease-out group-hover:w-10 group-hover:bg-[#D81B77]" />
        </div>
      </div>

      {/* Subtle refined outer border highlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[3px] border border-white/10 transition-colors duration-300 group-hover:border-[#D81B77]/40"
        aria-hidden="true"
      />
    </a>
  );
}
