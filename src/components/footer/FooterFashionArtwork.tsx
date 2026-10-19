"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * FooterFashionArtwork — Cinematic Editorial Footer Artwork
 *
 * Characteristics:
 *  • Ultra-wide luxury Indian fashion campaign photography featuring four
 *    elegantly styled models and flowing silk/saffron fabric.
 *  • Anchored to the bottom with object-position: bottom center.
 *  • Strict seamless blending into #F8F2EA background via custom dual-layer
 *    alpha masking and top-edge ambient gradient.
 *  • Gentle single entrance reveal on viewport entry (translates upward 8px smoothly).
 *  • Preserves a completely clean text-safe zone above the figures.
 *  • Pointer-events: none ensures zero interference with footer navigation.
 */
export default function FooterFashionArtwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-[340px] sm:h-[440px] md:h-[520px] lg:h-[600px] xl:h-[640px] z-0 transition-all duration-1000 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      aria-hidden="true"
    >
      {/* ─── 1. Top Edge Seamless Gradient Fade into #F8F2EA ─── */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-36 bg-gradient-to-b from-[#F8F2EA] via-[#F8F2EA]/75 to-transparent z-10 pointer-events-none" />

      {/* ─── 2. Responsive Web-Optimized Campaign Artwork ─── */}
      <div
        className="relative w-full h-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 8%, rgba(0,0,0,0.85) 20%, black 32%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 8%, rgba(0,0,0,0.85) 20%, black 32%)",
        }}
      >
        <Image
          src="/images/footer/pari-trends-editorial-footer.webp"
          alt="Pari Trends luxury Indian ethnic campaign featuring models in bespoke lehengas and sarees"
          fill
          sizes="(max-width: 1024px) 100vw, 1920px"
          className="object-cover object-bottom transition-opacity duration-700 ease-out"
          quality={95}
        />
      </div>

      {/* ─── 3. Subtle Warm Ambient Studio Vignette on Left & Right ─── */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#F8F2EA]/85 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#F8F2EA]/85 to-transparent pointer-events-none z-10" />
    </div>
  );
}
