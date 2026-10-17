import Image from "next/image";

/**
 * FooterFashionArtwork — Phase 08: Cinematic Editorial Footer Artwork
 *
 * Characteristics:
 *  • Ultra-wide luxury Indian fashion campaign photography featuring four
 *    elegantly styled models and flowing silk/saffron fabric.
 *  • Anchored to the bottom with object-position: bottom center.
 *  • Strict seamless blending into #F8F2EA background via custom dual-layer
 *    alpha masking and top-edge ambient gradient.
 *  • Preserves a completely clean text-safe zone above the figures.
 *  • Pointer-events: none ensures zero interference with footer navigation.
 */
export default function FooterFashionArtwork() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] z-0"
      aria-hidden="true"
    >
      {/* ─── 1. Top Edge Seamless Gradient Fade into #F8F2EA ─── */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#F8F2EA] via-[#F8F2EA]/85 to-transparent z-10 pointer-events-none" />

      {/* ─── 2. Responsive Web-Optimized Campaign Artwork ─── */}
      <div
        className="relative w-full h-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 12%, rgba(0,0,0,0.9) 30%, black 50%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 12%, rgba(0,0,0,0.9) 30%, black 50%)",
        }}
      >
        <Image
          src="/images/footer/pari-trends-editorial-footer.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 1920px"
          className="object-cover object-bottom transition-opacity duration-700 ease-out"
          quality={90}
        />
      </div>

      {/* ─── 3. Subtle Warm Ambient Studio Vignette on Left & Right ─── */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8F2EA]/90 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8F2EA]/90 to-transparent pointer-events-none z-10" />
    </div>
  );
}
