"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FeaturedEdit, getFeaturedEnquiryUrl } from "@/data/featured-edits";
import { siteConfig } from "@/config/site";

interface EditorialPanelProps {
  edit: FeaturedEdit;
  isActive: boolean;
  onActivate: () => void;
  index: number;
}

/**
 * EditorialPanel — Desktop Interactive Accordion Panel
 *
 * States:
 *  • Inactive:
 *      - Narrow width (flex-1)
 *      - Desaturated image (grayscale 100%, brightness 0.65)
 *      - Top index badge (01, 02...)
 *      - Vertical rotated editorial label (magazine spine style)
 *  • Active:
 *      - Expanded width (flex-[5.5] ~52% of total accordion)
 *      - Full-colour imagery (grayscale 0%, brightness 1.0)
 *      - Top-left category eyebrow tag
 *      - Bottom-left title, caption and direct WhatsApp enquiry CTA
 */
export default function EditorialPanel({
  edit,
  isActive,
  onActivate,
  index,
}: EditorialPanelProps) {
  const enquiryUrl = getFeaturedEnquiryUrl(edit.theme, edit.category);
  const isExternalWhatsApp = Boolean(siteConfig.whatsapp);

  return (
    <div
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onClick={onActivate}
      onMouseEnter={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className={`group relative h-full overflow-hidden rounded-[4px] cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B77] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF5EE] ${
        isActive ? "flex-[5.5]" : "flex-1 hover:brightness-105"
      }`}
    >
      {/* ─── 1. Editorial Photograph ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={edit.image}
          alt={edit.alt}
          fill
          priority={index === 2} // Preload default active panel (Celebration Edit)
          sizes="(max-width: 1024px) 100vw, 800px"
          className={`object-cover ${edit.aspectFocus || "object-center"} transform transition-all duration-700 ease-out will-change-transform ${
            isActive
              ? "grayscale-0 brightness-100 scale-[1.02]"
              : "grayscale-[70%] brightness-[0.78] group-hover:brightness-[0.90] group-hover:grayscale-[25%] scale-100"
          }`}
        />
      </div>

      {/* ─── 2. Inactive State Vignette & Top Tint ─── */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/30 transition-opacity duration-700 pointer-events-none ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      {/* ─── 3. Active State Legibility Gradient Scrim ─── */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-700 pointer-events-none ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* ─── 4. INACTIVE PANEL CONTENT (Vertical Magazine Spine Style) ─── */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-between py-6 px-2 pointer-events-none transition-all ${
          isActive
            ? "opacity-0 scale-95 duration-150 delay-0 pointer-events-none"
            : "opacity-100 scale-100 duration-400 delay-200"
        }`}
        aria-hidden={isActive}
      >
        {/* Top Number */}
        <span className="font-mono text-xs sm:text-[13px] font-medium tracking-[0.2em] text-[#C89A2D]">
          {edit.number}
        </span>

        {/* Vertical Rotated Category / Theme Label */}
        <div className="flex-1 flex items-center justify-center overflow-hidden my-4">
          <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-xs tracking-[0.26em] uppercase font-semibold text-[#F8F2EA]/90 whitespace-nowrap">
            {edit.theme}
          </span>
        </div>

        {/* Bottom subtle accent line */}
        <span className="w-1.5 h-1.5 rounded-full bg-[#F8F2EA]/40" />
      </div>

      {/* ─── 5. ACTIVE PANEL CONTENT (Expanded Editorial View) ─── */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 lg:p-10 transition-all ${
          isActive
            ? "opacity-100 translate-y-0 duration-500 ease-out delay-200 pointer-events-auto"
            : "opacity-0 translate-y-3 duration-150 ease-in delay-0 pointer-events-none"
        }`}
        aria-hidden={!isActive}
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
            <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F8F2EA]">
              {edit.number} / THE PARI EDIT
            </span>
          </div>

          <span className="font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-[#C89A2D] hidden sm:inline-block">
            {edit.category}
          </span>
        </div>

        {/* Bottom Editorial Information & WhatsApp CTA */}
        <div className="w-full max-w-xl min-w-[280px] sm:min-w-[340px] xl:min-w-[400px]">
          {/* Subtitle / Category (Visible on mobile/tablet inside card) */}
          <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#C89A2D] mb-1.5 sm:hidden font-semibold">
            {edit.category}
          </p>

          {/* Main Theme Headline */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight leading-[1.1] mb-2 sm:mb-3">
            {edit.theme}
          </h3>

          {/* Caption */}
          <p className="font-sans text-sm sm:text-base text-white/85 font-normal leading-relaxed mb-5 sm:mb-6 max-w-md">
            {edit.caption}
          </p>

          {/* WhatsApp Enquiry Button */}
          <a
            href={enquiryUrl}
            target={isExternalWhatsApp ? "_blank" : undefined}
            rel={isExternalWhatsApp ? "noopener noreferrer" : undefined}
            tabIndex={isActive ? 0 : -1}
            onClick={(e) => e.stopPropagation()} // Prevent card toggle when clicking button
            className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#D81B77] hover:bg-[#b51461] border border-white/20 text-white text-[13px] sm:text-[14px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-xl shadow-black/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
          >
            <span>Enquire About This Style</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Subtle outer border highlight */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-[4px] border transition-colors duration-500 ${
          isActive ? "border-[#C89A2D]/40" : "border-white/10"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
