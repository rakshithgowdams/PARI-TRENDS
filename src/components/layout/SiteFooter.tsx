"use client";

import { ArrowUp, MessageCircle } from "lucide-react";
import FooterNavigation from "@/components/footer/FooterNavigation";
import FooterFashionArtwork from "@/components/footer/FooterFashionArtwork";
import { siteConfig } from "@/config/site";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
 * SiteFooter — Phase 08: Cinematic Editorial Fashion Footer
 *
 * Visual Reference: DRIFT luxury fashion footer concept.
 *
 * Design Characteristics:
 *  • Continuous #F8F2EA warm ivory canvas with zero visible seams.
 *  • Upper Content Area (~60%): 5-column refined editorial navigation,
 *    brand identity, collections, section anchors, and verified social actions.
 *  • Lower Visual Area (~40%): Seamlessly integrated 4-model cinematic
 *    Indian fashion campaign photograph with flowing silk & saffron fabric.
 *  • Strict text-safe zone ensures navigation text is placed high above figures.
 *  • Bottom signature bar with dynamic copyright, quick social links, and
 *    smooth back-to-top button.
 */
export default function SiteFooter() {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative w-full bg-[#F8F2EA] text-[#1E1A17] border-t border-[#EFE4D6] overflow-hidden min-h-[720px] lg:min-h-[820px] flex flex-col justify-between"
      aria-label="Pari Trends Site Footer"
    >
      {/* ─── 1. Upper Content Zone: 5-Column Editorial Navigation ─── */}
      <FooterNavigation />

      {/* ─── 2. Lower Visual Zone: Seamless Campaign Artwork ─── */}
      <FooterFashionArtwork />

      {/* ─── 3. Final Footer Bottom Signature Line ─── */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-8 sm:pb-10 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 rounded-full bg-[#F8F2EA]/85 backdrop-blur-md border border-[#EFE4D6]/90 shadow-sm text-xs text-[#6B5B52]">
          
          {/* Dynamic Copyright */}
          <p className="font-sans text-[11.5px] tracking-wide text-[#6B5B52]/90">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          {/* Social Icons & Signature */}
          <div className="flex items-center gap-4">
            <span className="font-sans text-[11px] tracking-widest uppercase text-[#C89A2D] font-semibold hidden md:inline">
              Alur • Hassan • Karnataka
            </span>

            <div className="h-3 w-[1px] bg-[#EFE4D6] hidden md:block" aria-hidden="true" />

            <div className="flex items-center gap-2">
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
                target={siteConfig.whatsapp ? "_blank" : undefined}
                rel={siteConfig.whatsapp ? "noopener noreferrer" : undefined}
                aria-label="Pari Trends WhatsApp Enquiry"
                className="w-7 h-7 rounded-full bg-[#1E1A17]/5 hover:bg-[#D81B77] hover:text-white flex items-center justify-center transition-colors text-[#1E1A17]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="group flex items-center gap-2 text-[11.5px] uppercase tracking-wider font-semibold text-[#1E1A17] hover:text-[#D81B77] transition-colors"
          >
            <span>Back to top</span>
            <span className="w-6 h-6 rounded-full bg-[#1E1A17]/5 group-hover:bg-[#D81B77] group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
