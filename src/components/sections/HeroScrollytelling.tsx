"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, ChevronDown } from "lucide-react";

/**
 * HeroScrollytelling — Pari Trends Phase 02
 *
 * A full-viewport scroll-driven boutique walkthrough:
 *  • Outer section: 260svh pinned scroll travel
 *  • Sticky 100svh viewport containing the 16:9 walkthrough video
 *  • Native requestAnimationFrame synchronization with video.currentTime
 *  • Zero React re-renders during continuous scroll for 60fps performance
 *  • Three text moments (Reception → Collections → Mannequin display)
 *  • Interactive CTA buttons on the final moment
 *  • Graceful fallback for reduced motion & mobile
 *  • Smooth editorial transition into upcoming sections
 */
export default function HeroScrollytelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Moment DOM element refs for direct 60fps opacity updates without re-renders
  const moment1Ref = useRef<HTMLDivElement>(null);
  const moment2Ref = useRef<HTMLDivElement>(null);
  const moment3Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced-motion preference on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Main scroll-driven video synchronization loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let rafId: number | null = null;
    let isSeeking = false;
    let targetTime = 0;

    const handleSeeked = () => {
      isSeeking = false;
    };
    video.addEventListener("seeked", handleSeeked);

    // Smoothly calculate opacities for the 3 moments
    // Moment 1: 0.00 – 0.30 (fade out 0.22 → 0.32)
    // Moment 2: 0.30 – 0.70 (fade in 0.28 → 0.36, fade out 0.62 → 0.72)
    // Moment 3: 0.70 – 1.00 (fade in 0.66 → 0.76)
    const updateMoments = (progress: number) => {
      // Moment 1
      let m1Opacity = 0;
      if (progress < 0.22) {
        m1Opacity = 1;
      } else if (progress <= 0.32) {
        m1Opacity = Math.max(0, 1 - (progress - 0.22) / 0.1);
      }
      if (moment1Ref.current) {
        moment1Ref.current.style.opacity = m1Opacity.toFixed(3);
        moment1Ref.current.style.pointerEvents = m1Opacity > 0.1 ? "auto" : "none";
        moment1Ref.current.style.transform = `translateY(${((1 - m1Opacity) * -12).toFixed(1)}px)`;
      }

      // Moment 2
      let m2Opacity = 0;
      if (progress >= 0.28 && progress <= 0.36) {
        m2Opacity = (progress - 0.28) / 0.08;
      } else if (progress > 0.36 && progress < 0.62) {
        m2Opacity = 1;
      } else if (progress >= 0.62 && progress <= 0.72) {
        m2Opacity = Math.max(0, 1 - (progress - 0.62) / 0.1);
      }
      if (moment2Ref.current) {
        moment2Ref.current.style.opacity = m2Opacity.toFixed(3);
        moment2Ref.current.style.pointerEvents = m2Opacity > 0.1 ? "auto" : "none";
        moment2Ref.current.style.transform = `translateY(${((1 - m2Opacity) * 10).toFixed(1)}px)`;
      }

      // Moment 3
      let m3Opacity = 0;
      if (progress >= 0.66 && progress <= 0.76) {
        m3Opacity = (progress - 0.66) / 0.1;
      } else if (progress > 0.76) {
        m3Opacity = 1;
      }
      if (moment3Ref.current) {
        moment3Ref.current.style.opacity = m3Opacity.toFixed(3);
        moment3Ref.current.style.pointerEvents = m3Opacity > 0.2 ? "auto" : "none";
        moment3Ref.current.style.transform = `translateY(${((1 - m3Opacity) * 12).toFixed(1)}px)`;
      }

      // Scroll indicator (fades out early: 0 → 0.15)
      if (scrollIndicatorRef.current) {
        const indOpacity = Math.max(0, 1 - progress / 0.12);
        scrollIndicatorRef.current.style.opacity = indOpacity.toFixed(3);
      }
    };

    const applyScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      if (scrollable <= 0) return;

      const scrolledDistance = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledDistance / scrollable));

      updateMoments(progress);

      // Seek video if metadata is ready and duration is valid
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        // Clamp to last valid frame before the exact end to prevent browser freeze/black frame
        const safeDuration = Math.max(0, video.duration - 0.05);
        targetTime = Math.min(progress * safeDuration, safeDuration);

        // Seek only if difference is visible (> 30ms) and not currently blocked
        if (Math.abs(video.currentTime - targetTime) > 0.03 && !isSeeking) {
          isSeeking = true;
          try {
            if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
              (video as any).fastSeek(targetTime);
            } else {
              video.currentTime = targetTime;
            }
          } catch {
            isSeeking = false;
          }
        }
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        applyScroll();
        rafId = null;
      });
    };

    // Initial calculation on load
    applyScroll();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [prefersReducedMotion, videoLoaded]);

  // Reduced motion alternative layout
  if (prefersReducedMotion) {
    return (
      <section
        id="home"
        ref={sectionRef}
        className="relative min-h-[90svh] w-full flex items-center bg-[#1E1A17] text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/images/pari-trends-hero-poster.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17] via-black/50 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-sans font-medium tracking-[0.3em] uppercase text-[#C89A2D] mb-4">
              Pari Trends • Alur Boutique
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium leading-[1.1] mb-6">
              Welcome to Pari Trends
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/80 leading-relaxed mb-8">
              Fashion for every moment. Explore our curated women&apos;s wear collections.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D81B77] hover:bg-[#AD1457] text-white text-[14px] font-semibold tracking-wide rounded-full transition-colors"
              >
                Explore Collections
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#visit"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[14px] font-semibold tracking-wide rounded-full backdrop-blur-sm transition-colors"
              >
                Visit Our Store
                <MapPin size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-[260svh] bg-[#1E1A17]"
      aria-label="Pari Trends Showroom Walkthrough"
    >
      {/* Pinned 100svh viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#1E1A17]">
        {/* Walkthrough Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/images/pari-trends-hero-poster.jpg"
          onLoadedMetadata={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            videoError ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src="/videos/pari-trends-hero-scroll-1080p.mp4"
            type="video/mp4"
            media="(min-width: 769px)"
          />
          <source
            src="/videos/pari-trends-hero-scroll-720p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback poster image if video fails to load */}
        {videoError && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/pari-trends-hero-poster.jpg')` }}
          />
        )}

        {/* ─── Editorial Gradient Overlays for contrast & legibility ─── */}
        {/* Top vignette for navbar integration */}
        <div
          className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Main bottom-left editorial shadow (keeps showroom visible while grounding text) */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent/10 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Subtle bottom transition gradient into upcoming #collections section */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* ─── Content Container ─── */}
        <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-end pb-16 sm:pb-20 lg:pb-24">
          <div className="relative max-w-2xl w-full">

            {/* ─── MOMENT 1 (0% – 30%): Reception Reveal ─── */}
            <div
              ref={moment1Ref}
              className="transition-[transform,opacity] duration-300 ease-out"
              style={{ opacity: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
                <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#F8F2EA]">
                  Boutique Showroom • Alur
                </span>
              </div>

              <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-white drop-shadow-md mb-3 sm:mb-4">
                Welcome to <br className="hidden sm:inline" />
                <span className="text-[#F8F2EA]">Pari Trends</span>
              </h1>

              <p className="font-sans text-[clamp(1rem,2vw,1.35rem)] text-white/85 font-normal tracking-wide leading-relaxed max-w-lg drop-shadow-sm">
                Fashion for every moment.
              </p>
            </div>

            {/* ─── MOMENT 2 (30% – 70%): Shelves & Collections ─── */}
            <div
              ref={moment2Ref}
              className="absolute inset-x-0 bottom-0 transition-[transform,opacity] duration-300 ease-out"
              style={{ opacity: 0, pointerEvents: "none" }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D81B77]" />
                <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#F8F2EA]">
                  Curated Craftsmanship
                </span>
              </div>

              <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-white drop-shadow-md mb-3 sm:mb-4">
                A Style for <br className="hidden sm:inline" />
                <span className="text-[#F8F2EA]">Every Occasion</span>
              </h2>

              <p className="font-sans text-[clamp(1rem,2vw,1.35rem)] text-white/85 font-normal tracking-wide leading-relaxed max-w-lg drop-shadow-sm">
                Explore our curated women&apos;s wear collections.
              </p>
            </div>

            {/* ─── MOMENT 3 (70% – 100%): Mannequin Display & CTAs ─── */}
            <div
              ref={moment3Ref}
              className="absolute inset-x-0 bottom-0 transition-[transform,opacity] duration-300 ease-out"
              style={{ opacity: 0, pointerEvents: "none" }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
                <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#F8F2EA]">
                  New Season Arrived
                </span>
              </div>

              <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-white drop-shadow-md mb-4 sm:mb-5">
                Discover <br className="hidden sm:inline" />
                <span className="text-[#F8F2EA]">Your Style</span>
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#collections"
                  className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5
                    bg-[#D81B77] hover:bg-[#AD1457] text-white text-[13.5px] sm:text-[14px]
                    font-sans font-semibold tracking-wide rounded-full shadow-lg shadow-[#D81B77]/25
                    transition-all duration-200 active:scale-95
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
                >
                  Explore Collections
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2.4}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="#visit"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5
                    bg-white/15 hover:bg-white/25 text-white border border-white/30
                    backdrop-blur-md text-[13.5px] sm:text-[14px]
                    font-sans font-semibold tracking-wide rounded-full
                    transition-all duration-200 active:scale-95
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Visit Our Store
                  <MapPin size={15} strokeWidth={2.2} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ─── Scroll Indicator Prompt (Only visible at start) ─── */}
        <div
          ref={scrollIndicatorRef}
          className="absolute right-6 sm:right-10 lg:right-14 bottom-10 sm:bottom-12 z-20 hidden md:flex items-center gap-3 text-white/70 pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        >
          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-white/60">
            Scroll to explore showroom
          </span>
          <div className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center animate-bounce">
            <ChevronDown size={14} className="text-[#C89A2D]" />
          </div>
        </div>

      </div>
    </section>
  );
}
