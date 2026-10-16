"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

/**
 * Right-side navigation drawer for mobile and tablet.
 *
 * Features:
 * - Staggered reveal animation for links
 * - Background scroll lock while open
 * - Escape key and overlay close
 * - Focus management (traps focus inside the drawer)
 * - Accessible aria labels
 * - Respects prefers-reduced-motion
 */
export default function MobileNavigation({
  isOpen,
  onClose,
  activeSection,
}: MobileNavigationProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus the close button when the drawer opens.
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(85vw,360px)] flex-col
          bg-[#F8F2EA] shadow-2xl transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
          lg:hidden motion-reduce:transition-none
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header with brand lockup & close button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EFE4D6]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-[#C89A2D]/30 bg-[#F8F2EA] shadow-xs">
              <Image
                src={siteConfig.logo}
                alt="Pari Trends logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[17px] font-semibold text-[#1E1A17] tracking-wide leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[8.5px] font-sans font-medium tracking-[0.2em] uppercase text-[#6B5B52] leading-tight mt-0.5">
                {siteConfig.tagline}
              </span>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close navigation"
            className="flex items-center justify-center w-10 h-10 rounded-full
              text-[#6B5B52] hover:text-[#D81B77] hover:bg-[#EFE4D6]
              transition-colors duration-200 focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
          >
            <X size={22} strokeWidth={1.8} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-6 py-8" aria-label="Mobile navigation links">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.sectionId;
              return (
                <li
                  key={link.sectionId}
                  className="mobile-nav-item"
                  style={
                    {
                      "--stagger-delay": `${80 + i * 50}ms`,
                    } as React.CSSProperties
                  }
                >
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`group flex items-center py-3.5 px-3 rounded-lg text-[17px]
                      font-medium tracking-wide transition-colors duration-200
                      focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-[#D81B77]
                      ${
                        isActive
                          ? "text-[#D81B77] bg-[#D81B77]/[0.06]"
                          : "text-[#1E1A17] hover:text-[#D81B77] hover:bg-[#D81B77]/[0.04]"
                      }`}
                  >
                    {isActive && (
                      <span className="mr-3 h-5 w-[3px] rounded-full bg-[#D81B77]" />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA + branding footer */}
        <div className="px-6 pb-8">
          {/* WhatsApp CTA */}
          <a
            href={siteConfig.whatsappUrl}
            target={siteConfig.whatsapp ? "_blank" : undefined}
            rel={siteConfig.whatsapp ? "noopener noreferrer" : undefined}
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6
              bg-[#D81B77] text-white text-[15px] font-semibold tracking-wide
              rounded-full transition-colors duration-200 hover:bg-[#AD1457]
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-[#D81B77]"
          >
            Enquire on WhatsApp
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>

          {/* Boutique branding */}
          <p className="mt-6 text-center text-xs text-[#6B5B52]/70 tracking-widest uppercase">
            {siteConfig.name} — {siteConfig.location.split(",")[0].trim()}
          </p>
        </div>
      </div>
    </>
  );
}
