"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Menu, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import MobileNavigation from "./MobileNavigation";

/**
 * SiteHeader — Pari Trends Fixed Responsive Navigation
 *
 * Strict Scroll State Specifications:
 *  • STATE 1 (Hero Section, 0%–100% video progress):
 *    - Completely transparent background (no blur, no gradient overlay, no shadow, no border)
 *    - Pure white typography & white indicator underlines
 *    - Subtle transparent WhatsApp button (white text + delicate white border)
 *  • STATE 2 (About Section & Following):
 *    - Solid ivory background (#F8F2EA) with subtle bottom border (#EFE4D6)
 *    - Charcoal typography (#1E1A17) & Pari Pink active item (#D81B77)
 *    - Solid Pari Pink WhatsApp CTA button (#D81B77)
 *  • STATE 3 (Scroll back into Hero):
 *    - Immediately returns to completely transparent state
 *  • Smooth ~300ms transition between states
 */
export default function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const isPastHero = useScrolled();
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ease-out
          motion-reduce:transition-none
          ${
            isPastHero
              ? "bg-[#F8F2EA] border-b border-[#EFE4D6] shadow-[0_1px_3px_rgba(30,26,23,0.04)]"
              : "bg-transparent border-b border-transparent shadow-none"
          }`}
      >
        {/* Inner container */}
        <div className="relative mx-auto flex items-center justify-between max-w-[1440px]
          h-[76px] px-5 sm:px-8 lg:h-[80px] lg:px-12">

          {/* ─── Brand Lockup ─── */}
          <a
            href="#home"
            className="group relative flex items-center gap-3 z-10 shrink-0
              focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-[#D81B77] rounded"
            aria-label="Pari Trends — Return to top"
          >
            {/* Logo image — preserved 1:1 aspect ratio with soft rounded border */}
            <div
              className={`relative w-[48px] h-[48px] lg:w-[56px] lg:h-[56px]
                rounded-xl overflow-hidden flex-shrink-0
                ring-1 shadow-sm bg-[#F8F2EA]
                transition-all duration-300
                ${
                  isPastHero
                    ? "ring-[#C89A2D]/30 group-hover:ring-[#D81B77]/50"
                    : "ring-white/30 group-hover:ring-[#C89A2D]/60"
                }`}
            >
              <Image
                src={siteConfig.logo}
                alt="Pari Trends logo"
                fill
                sizes="(max-width: 1024px) 48px, 56px"
                className="object-contain"
                priority
              />
            </div>

            {/* Brand text */}
            <div className="flex flex-col">
              <span
                className={`font-serif text-[17px] lg:text-[19px] font-semibold leading-tight
                  tracking-wide transition-colors duration-300
                  ${isPastHero ? "text-[#1E1A17]" : "text-white"}`}
              >
                {siteConfig.name}
              </span>
              <span
                className={`text-[9px] lg:text-[10px] font-sans font-medium tracking-[0.2em]
                  uppercase leading-tight mt-0.5 transition-colors duration-300
                  ${isPastHero ? "text-[#6B5B52]" : "text-white/80"}`}
              >
                {siteConfig.tagline}
              </span>
            </div>
          </a>

          {/* ─── Desktop Navigation ─── */}
          <nav
            className="hidden lg:flex items-center gap-1 z-10"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.sectionId}
                  href={link.href}
                  data-active={isActive ? "true" : undefined}
                  className={`nav-link relative px-3.5 xl:px-4 py-2 text-[13px] xl:text-[13.5px]
                    font-sans font-medium tracking-[0.03em] transition-colors duration-300
                    focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-[#D81B77] rounded
                    ${
                      isPastHero
                        ? isActive
                          ? "text-[#D81B77]"
                          : "text-[#1E1A17] hover:text-[#D81B77]"
                        : isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                    }`}
                >
                  {link.label}

                  {/* Active Section Underline */}
                  <span
                    className={`absolute left-3.5 right-3.5 xl:left-4 xl:right-4 bottom-0.5
                      h-[1.5px] rounded-full transition-all duration-300 origin-left
                      ${
                        isActive
                          ? isPastHero
                            ? "bg-[#D81B77] scale-x-100"
                            : "bg-white scale-x-100"
                          : "bg-[#D81B77] scale-x-0 group-hover:scale-x-100"
                      }`}
                  />

                  {/* Hover Underline (when not active) */}
                  {!isActive && (
                    <span
                      className={`absolute left-3.5 right-3.5 xl:left-4 xl:right-4 bottom-0.5
                        h-[1.5px] rounded-full scale-x-0 origin-left
                        transition-transform duration-220 ease-out
                        ${isPastHero ? "bg-[#D81B77]" : "bg-white"}`}
                      aria-hidden="true"
                      style={{ transitionProperty: "transform" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ─── Desktop WhatsApp CTA Button ─── */}
          <a
            href={siteConfig.whatsappUrl}
            target={siteConfig.whatsapp ? "_blank" : undefined}
            rel={siteConfig.whatsapp ? "noopener noreferrer" : undefined}
            className={`hidden lg:inline-flex items-center gap-2 z-10 px-5 xl:px-6 py-2.5
              text-[13px] font-sans font-semibold tracking-wide rounded-full
              transition-all duration-300 ease-out
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-[#D81B77]
              ${
                isPastHero
                  ? "bg-[#D81B77] text-white hover:bg-[#AD1457] shadow-sm"
                  : "bg-white/10 text-white border border-white/25 hover:bg-white/20"
              }`}
          >
            Enquire on WhatsApp
            <ArrowUpRight
              size={14}
              strokeWidth={2.4}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* ─── Mobile Hamburger ─── */}
          <button
            onClick={openMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label="Open navigation menu"
            className={`lg:hidden flex items-center justify-center w-11 h-11 z-10
              rounded-lg transition-colors duration-300
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-[#D81B77]
              ${
                isPastHero
                  ? "text-[#1E1A17] hover:bg-[#EFE4D6]"
                  : "text-white hover:bg-white/15"
              }`}
          >
            <Menu size={24} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Mobile drawer (retains opaque ivory panel for accessibility) */}
      <MobileNavigation
        isOpen={mobileOpen}
        onClose={closeMobile}
        activeSection={activeSection}
      />
    </>
  );
}
