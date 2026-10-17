"use client";

import Image from "next/image";
import { ArrowUp, MapPin, Clock, Phone, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/config/navigation";

/**
 * SiteFooter — Production-grade luxury boutique footer for Pari Trends
 */
export default function SiteFooter() {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#14110F] text-[#F8F2EA] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#C89A2D]/40">
                  <Image
                    src={siteConfig.logo}
                    alt={siteConfig.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl tracking-wider text-white font-medium">
                    PARI TRENDS
                  </h3>
                  <p className="font-sans text-[10px] tracking-[0.25em] text-[#C89A2D] uppercase font-semibold">
                    {siteConfig.tagline}
                  </p>
                </div>
              </div>

              <p className="font-sans text-sm text-[#F8F2EA]/70 max-w-sm leading-relaxed mb-6">
                A premium women&apos;s fashion destination in Alur, Hassan. Bringing timeless ethnic craftsmanship and modern silhouettes together.
              </p>
            </div>


            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#C89A2D]/90">
              <span className="w-2 h-2 rounded-full bg-[#C89A2D] animate-pulse" />
              <span>Boutique Showroom • Alur, Karnataka</span>
            </div>
          </div>

          {/* Quick Navigation Links (Col 6-8) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.22em] text-[#C89A2D] font-semibold mb-5">
              Explore Collections
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#F8F2EA]/70 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#D81B77] transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique Visit Info (Col 9-12) */}
          <div className="lg:col-span-4">
            <h4 className="font-sans text-xs uppercase tracking-[0.22em] text-[#C89A2D] font-semibold mb-5">
              Boutique Showroom
            </h4>
            <div className="space-y-4 text-sm text-[#F8F2EA]/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C89A2D] mt-0.5 shrink-0" />
                <p className="leading-snug">{siteConfig.address}</p>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C89A2D] mt-0.5 shrink-0" />
                <p className="leading-snug">{siteConfig.timings}</p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C89A2D] mt-0.5 shrink-0" />
                <a
                  href={siteConfig.whatsappUrl}
                  target={siteConfig.whatsapp ? "_blank" : undefined}
                  rel={siteConfig.whatsapp ? "noopener noreferrer" : undefined}
                  className="hover:text-white underline decoration-[#D81B77] underline-offset-4 transition-colors"
                >
                  Direct WhatsApp Enquiry ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F2EA]/60 font-sans">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-[11px] text-[#F8F2EA]/50">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#D81B77] fill-[#D81B77]" />
            <span>for authentic Indian fashion</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 text-xs uppercase tracking-wider text-[#C89A2D] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#D81B77] flex items-center justify-center transition-colors">
              <ArrowUp className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
