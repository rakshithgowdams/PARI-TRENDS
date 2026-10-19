"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Clock, Phone, Navigation, ChevronLeft, ChevronRight } from "lucide-react";
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

interface ShowroomScene {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const SHOWROOM_SCENES: ShowroomScene[] = [
  {
    id: "welcome",
    number: "01",
    title: "The Welcome",
    subtitle: "Reception & Logo Wall",
    image: "/images/visit/showroom-01-welcome.jpg",
    alt: "Pari Trends boutique reception counter with illuminated logo wall and warm architectural lighting",
  },
  {
    id: "collections",
    number: "02",
    title: "The Collections",
    subtitle: "Curated Shelving",
    image: "/images/visit/showroom-02-collections.jpg",
    alt: "Pari Trends boutique interior with dark wooden display shelves and folded women's garments",
  },
  {
    id: "looks",
    number: "03",
    title: "The Looks",
    subtitle: "Mannequin Display",
    image: "/images/visit/showroom-03-looks.jpg",
    alt: "Pari Trends boutique showroom mannequin display showcasing festive occasion ensembles",
  },
];

/**
 * VisitOurStore — Complete Redesign: "Step Inside Pari"
 *
 * Section ID: `visit`
 *
 * Key Design Features:
 *  • 12-Column Editorial composition (Left: 5 cols, Right: 7 cols)
 *  • Left: "A Little Closer to Pari." headline, store location, verified timings, primary & secondary CTAs
 *  • Right: Interactive 3-scene authentic showroom gallery with smooth 600ms crossfades
 *  • Compact editorial thumbnail selectors with active indicator pills
 *  • Subtle scroll-linked parallax (capped at 20px)
 *  • Removed repetitive "ALUR" watermark in favor of an elegant gold location rule
 */
export default function VisitOurStore() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryParallaxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
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

  // Subtle parallax inside the showroom gallery image via direct DOM transform (0 React re-renders)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number | null = null;
    const section = sectionRef.current;
    if (!section) return;

    let cachedSectionTop = 0;
    let cachedSectionHeight = 0;
    let cachedVh = window.innerHeight;

    const measureLayout = () => {
      cachedVh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      cachedSectionTop = window.scrollY + rect.top;
      cachedSectionHeight = rect.height;
    };
    measureLayout();

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const relativeTop = cachedSectionTop - scrollY;

        if (relativeTop < cachedVh && relativeTop + cachedSectionHeight > 0) {
          const progress = (cachedVh - relativeTop) / (cachedVh + cachedSectionHeight);
          const offset = (progress - 0.5) * 24; // Range ~ -12px to +12px
          if (galleryParallaxRef.current) {
            galleryParallaxRef.current.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measureLayout, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureLayout);
    };
  }, [prefersReducedMotion]);

  const activeScene = SHOWROOM_SCENES[activeSceneIndex];

  const handlePrevScene = () => {
    setActiveSceneIndex((prev) => (prev === 0 ? SHOWROOM_SCENES.length - 1 : prev - 1));
  };

  const handleNextScene = () => {
    setActiveSceneIndex((prev) => (prev === SHOWROOM_SCENES.length - 1 ? 0 : prev + 1));
  };

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
          
          {/* ─── Left Column: Boutique Invitation & Details (5 cols) ─── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
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
                06 / VISIT OUR BOUTIQUE
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1E1A17] leading-[1.14] mb-5 sm:mb-6 transition-all duration-700 ease-out ${
                isVisible || prefersReducedMotion
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "200ms" }}
            >
              A Little Closer to{" "}
              <span className="italic font-serif text-[#D81B77] font-normal block sm:inline">
                Pari.
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
              Your next favourite look is waiting in Alur. Step inside and explore Pari Trends in person.
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
              {/* Boutique Location Tag */}
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
                <span className="font-sans text-[10.5px] tracking-[0.24em] uppercase font-semibold text-[#1E1A17]/70">
                  PARI TRENDS • ALUR BOUTIQUE
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

            {/* Action Buttons Group (Primary: Get Directions) */}
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

              {/* Secondary: Contact / WhatsApp */}
              <a
                href={callHref}
                target={isExternalCall ? "_blank" : undefined}
                rel={isExternalCall ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-[#1E1A17]/25 hover:border-[#1E1A17] hover:bg-[#1E1A17]/5 text-[#1E1A17] text-[13.5px] sm:text-[14px] font-sans font-medium transition-all duration-300 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#C89A2D]" />
                <span>{siteConfig.phone ? "Call the Store" : "Enquire on WhatsApp"}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Secondary: Instagram */}
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Pari Trends on Instagram"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#1E1A17]/20 hover:border-[#D81B77] hover:text-[#D81B77] text-[#1E1A17] transition-all duration-300"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* ─── Right Column: Interactive Showroom Gallery (7 cols) ─── */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out ${
              isVisible || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "350ms" }}
          >
            <div className="relative flex flex-col gap-4">
              
              {/* Main Architectural Stage */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[4px] overflow-hidden border border-[#EFE4D6] bg-[#1E1A17] shadow-lg shadow-black/5">
                
                {/* Parallax Container */}
                <div ref={galleryParallaxRef} className="relative w-full h-full will-change-transform">
                  {/* Crossfading Scenes */}
                  {SHOWROOM_SCENES.map((scene, index) => {
                    const isActive = index === activeSceneIndex;
                    return (
                      <div
                        key={scene.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <div
                          className={`relative w-full h-full transform transition-transform duration-700 ease-out ${
                            isActive ? "scale-[1.02]" : "scale-100"
                          }`}
                        >
                          <Image
                            src={scene.image}
                            alt={scene.alt}
                            fill
                            sizes="(max-width: 1024px) 94vw, 750px"
                            priority={false}
                            className="object-cover object-center"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtle Ambient Vignette for text contrast */}
                <div
                  className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Floating Active Scene Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D] animate-pulse" />
                  <span className="font-sans text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium">
                    {activeScene.number} • {activeScene.title}
                  </span>
                </div>

                {/* Active Scene Subtitle in Bottom Left */}
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20 text-white">
                  <p className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                    {activeScene.title}
                  </p>
                  <p className="font-sans text-[11px] tracking-wider uppercase text-[#EFE4D6]/80 font-normal">
                    {activeScene.subtitle} • Alur Showroom
                  </p>
                </div>

                {/* Discreet Next / Prev Arrows */}
                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevScene}
                    aria-label="Previous showroom scene"
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#D81B77] border border-white/20 flex items-center justify-center text-white transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextScene}
                    aria-label="Next showroom scene"
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#D81B77] border border-white/20 flex items-center justify-center text-white transition-colors duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Delicate Outer Border */}
                <div
                  className="absolute inset-0 z-20 border border-white/10 rounded-[4px] pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Compact 3-Scene Selector Tabs Beneath Main Image */}
              <div className="grid grid-cols-3 gap-3">
                {SHOWROOM_SCENES.map((scene, index) => {
                  const isActive = index === activeSceneIndex;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => setActiveSceneIndex(index)}
                      className={`group relative text-left p-2.5 sm:p-3 rounded-[3px] border transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D81B77] ${
                        isActive
                          ? "bg-white border-[#C89A2D]/60 shadow-sm"
                          : "bg-white/50 border-[#EFE4D6] hover:bg-white hover:border-[#C89A2D]/30"
                      }`}
                    >
                      {/* Active Indicator Top Line */}
                      <div
                        className={`h-[2px] w-full mb-2 transition-all duration-300 ${
                          isActive ? "bg-[#D81B77]" : "bg-transparent group-hover:bg-[#C89A2D]/40"
                        }`}
                      />
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-widest text-[#C89A2D] font-medium">
                          {scene.number}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-opacity duration-300 ${
                            isActive ? "bg-[#D81B77] opacity-100" : "opacity-0"
                          }`}
                        />
                      </div>
                      <p
                        className={`font-serif text-xs sm:text-sm leading-snug mt-1 transition-colors duration-200 ${
                          isActive ? "text-[#1E1A17] font-semibold" : "text-[#6B5B52]"
                        }`}
                      >
                        {scene.title}
                      </p>
                      <p className="font-sans text-[10px] tracking-wider text-[#6B5B52]/70 uppercase hidden sm:block truncate mt-0.5">
                        {scene.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
