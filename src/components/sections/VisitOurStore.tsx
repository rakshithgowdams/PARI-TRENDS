"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";

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
 * VisitOurStore — Pari Trends: Visit Our Store Section
 *
 * Characteristics:
 *  • Boutique Invitation experience connecting digital stories to physical showroom
 *  • Left (~42%): Editorial typography, address, timings, and verified action links
 *  • Right (~58%): Panoramic photograph of the real Pari Trends showroom
 *  • Oversized low-opacity "ALUR" background lettering
 *  • Seamless warm ivory background transition into the editorial footer
 *  • Respects prefers-reduced-motion with gentle scroll entrance
 */
export default function VisitOurStore() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const callHref = siteConfig.phone ? `tel:${siteConfig.phone}` : siteConfig.whatsappUrl;
  const isExternalCall = !siteConfig.phone && Boolean(siteConfig.whatsapp);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative w-full bg-[#FAF5EE] text-[#1E1A17] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#EFE4D6]"
      aria-label="Visit Pari Trends Boutique in Alur"
    >
      {/* ─── Ambient Studio Glow ─── */}
      <div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#EFE4D6]/60 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-32 w-[550px] h-[550px] rounded-full bg-[#EFE4D6]/40 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* ─── Left Column: Editorial Invitation Content (~42%) ─── */}
          <div className="relative lg:col-span-5 flex flex-col justify-center">
            
            {/* Oversized background "ALUR" watermark */}
            <div
              className="absolute -top-12 -left-6 sm:-left-10 font-serif text-[clamp(6rem,14vw,13rem)] font-bold text-[#1E1A17]/[0.035] leading-none pointer-events-none select-none -z-10"
              aria-hidden="true"
            >
              ALUR
            </div>

            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 mb-4 sm:mb-5 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "100ms" }}
            >
              <div className="h-[1px] w-8 sm:w-12 bg-[#C89A2D]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] font-semibold text-[#C89A2D] uppercase">
                06 / FIND US IN ALUR
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1E1A17] leading-[1.12] mb-5 sm:mb-6 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "200ms" }}
            >
              Your Next Favourite Look{" "}
              <span className="italic font-serif text-[#D81B77] font-normal block sm:inline">
                Awaits.
              </span>
            </h2>

            {/* Supporting Paragraph */}
            <p
              className={`font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed mb-8 max-w-lg transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "300ms" }}
            >
              Step into Pari Trends and explore beautiful styles curated for everyday moments and special occasions.
            </p>

            {/* Location & Timings Block */}
            <div
              className={`pt-6 pb-6 border-y border-[#EFE4D6] space-y-4 mb-8 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "400ms" }}
            >
              {/* Boutique Tag */}
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
                <span className="font-sans text-[10.5px] tracking-[0.24em] uppercase font-semibold text-[#1E1A17]/70">
                  PARI TRENDS / ALUR SHOWROOM
                </span>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C89A2D] mt-1 shrink-0" />
                <p className="font-sans text-sm sm:text-[14.5px] text-[#1E1A17] font-medium leading-relaxed">
                  {siteConfig.address}
                </p>
              </div>

              {/* Opening Timings */}
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C89A2D] shrink-0" />
                <p className="font-sans text-xs sm:text-sm text-[#6B5B52]">
                  {siteConfig.timings}
                </p>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div
              className={`flex flex-wrap items-center gap-3 sm:gap-4 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "500ms" }}
            >
              {/* Primary: Get Directions */}
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#1E1A17] hover:bg-[#D81B77] text-white text-[13.5px] sm:text-[14px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
              >
                <span>Get Directions</span>
                <Navigation className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Secondary: Call Store / WhatsApp */}
              <a
                href={callHref}
                target={isExternalCall ? "_blank" : undefined}
                rel={isExternalCall ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-[#1E1A17]/25 hover:border-[#1E1A17] hover:bg-[#1E1A17]/5 text-[#1E1A17] text-[13.5px] sm:text-[14px] font-sans font-medium transition-all duration-300 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#C89A2D]" />
                <span>{siteConfig.phone ? "Call the Store" : "Contact Store"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Optional: Connect on Instagram */}
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on Instagram"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#1E1A17]/20 hover:border-[#D81B77] hover:text-[#D81B77] text-[#1E1A17] transition-all duration-300"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* ─── Right Column: Panoramic Showroom Photograph (~58%) ─── */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out ${
              isVisible || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "350ms" }}
          >
            <div className="relative group rounded-[6px] overflow-hidden border border-[#EFE4D6] shadow-xl shadow-black/5 bg-[#1E1A17]">
              
              {/* Showroom Image (16:9 Aspect Ratio) */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
                <Image
                  src="/images/visit/pari-trends-showroom.webp"
                  alt="Pari Trends Boutique Showroom Interior in Alur — White reception counters, wooden shelves, and curated fashion displays"
                  fill
                  sizes="(max-width: 1024px) 100vw, 850px"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* Subtle Ambient Studio Vignette */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Showroom Badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                <span className="w-2 h-2 rounded-full bg-[#C89A2D] animate-pulse" />
                <span className="font-sans text-[11px] sm:text-xs tracking-wider uppercase font-medium">
                  Alur Showroom Interior
                </span>
              </div>

              {/* Delicate Gold Outer Accent Border */}
              <div
                className="absolute inset-0 border border-white/10 rounded-[6px] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
