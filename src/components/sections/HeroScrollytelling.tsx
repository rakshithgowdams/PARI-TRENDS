"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, ChevronDown } from "lucide-react";

/**
 * Mathematical clamp utility
 */
function clamp(val: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Standard cubic Hermite smoothstep interpolation
 */
function smoothstep(min: number, max: number, val: number): number {
  const t = clamp((val - min) / (max - min));
  return t * t * (3 - 2 * t);
}

/**
 * HeroScrollytelling — Pari Trends
 *
 * Cinematic Editorial Typography & Video Synchronization:
 *  • Pinned 260svh scroll distance with 100svh sticky viewport
 *  • Native requestAnimationFrame synchronization with video.currentTime
 *  • Alternating Desktop Alignment:
 *      - Scene 01: Left (lower-middle viewport)
 *      - Scene 02: Right (right side of viewport, text-align right)
 *      - Scene 03: Left (refined finale, narrower text block)
 *  • Masked line reveals through vertical overflow wrappers
 *  • Dynamic localized gradient synchronization (crossfading left / right overlays)
 *  • Zero React re-renders during continuous scrolling for 60fps performance
 *  • Fully reversible on backward scroll
 *  • Interactive CTA buttons on Scene 03 with accessibility inert/tabindex toggling
 */
export default function HeroScrollytelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  // Gradient refs for dynamic position-following overlays
  const grad1Ref = useRef<HTMLDivElement>(null);
  const grad2Ref = useRef<HTMLDivElement>(null);
  const grad3Ref = useRef<HTMLDivElement>(null);

  // Scene 01 DOM refs
  const s1GroupRef = useRef<HTMLDivElement>(null);
  const s1EyebrowRef = useRef<HTMLDivElement>(null);
  const s1Line1Ref = useRef<HTMLSpanElement>(null);
  const s1Line2Ref = useRef<HTMLSpanElement>(null);
  const s1SubRef = useRef<HTMLParagraphElement>(null);

  // Scene 02 DOM refs
  const s2GroupRef = useRef<HTMLDivElement>(null);
  const s2EyebrowRef = useRef<HTMLDivElement>(null);
  const s2Line1Ref = useRef<HTMLSpanElement>(null);
  const s2Line2Ref = useRef<HTMLSpanElement>(null);
  const s2SubRef = useRef<HTMLParagraphElement>(null);

  // Scene 03 DOM refs
  const s3GroupRef = useRef<HTMLDivElement>(null);
  const s3EyebrowRef = useRef<HTMLDivElement>(null);
  const s3Line1Ref = useRef<HTMLSpanElement>(null);
  const s3Line2Ref = useRef<HTMLSpanElement>(null);
  const s3Btn1Ref = useRef<HTMLAnchorElement>(null);
  const s3Btn2Ref = useRef<HTMLAnchorElement>(null);

  // Scroll prompt indicator ref
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced-motion preference and cached video readiness on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);

    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      setVideoLoaded(true);
    }

    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Main scroll-driven video & typography synchronization loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let rafId: number | null = null;
    let isSeeking = false;
    let seekSafetyTimer: number | null = null;
    let targetTime = 0;

    const handleSeeked = () => {
      isSeeking = false;
      if (seekSafetyTimer !== null) {
        window.clearTimeout(seekSafetyTimer);
        seekSafetyTimer = null;
      }
    };
    video.addEventListener("seeked", handleSeeked);

    /**
     * Choreographed typography scenes & gradient updates derived strictly
     * from the single normalized scroll progress [0, 1].
     */
    const updateTypographyAndGradients = (progress: number) => {
      // ─────────────────────────────────────────────────────────────
      // 1. DYNAMIC GRADIENT OVERLAYS
      // ─────────────────────────────────────────────────────────────
      // Gradient 1: Left contrast (active 0.00 – 0.34)
      if (grad1Ref.current) {
        let g1 = 1;
        if (progress > 0.25 && progress <= 0.34) {
          const t = (progress - 0.25) / 0.09;
          const eased = t * t * (3 - 2 * t);
          g1 = 1 - eased;
        } else if (progress > 0.34) {
          g1 = 0;
        }
        grad1Ref.current.style.opacity = g1.toFixed(3);
      }

      // Gradient 2: Right contrast (enter 0.28 – 0.36, exit 0.62 – 0.70)
      if (grad2Ref.current) {
        const g2In = smoothstep(0.28, 0.36, progress);
        const g2Out = smoothstep(0.70, 0.62, progress);
        const g2 = g2In * g2Out;
        grad2Ref.current.style.opacity = g2.toFixed(3);
      }

      // Gradient 3: Localized left contrast (enter 0.65 – 0.76, holds to 1.00)
      if (grad3Ref.current) {
        const g3 = smoothstep(0.65, 0.76, progress);
        grad3Ref.current.style.opacity = g3.toFixed(3);
      }

      // ─────────────────────────────────────────────────────────────
      // 2. SCENE 01: WELCOME (0.00 – 0.34)
      // Fully visible immediately on initial load at progress 0.00–0.25.
      // Exits between 0.25 and 0.34 with smooth upward translate (-20px) and fade.
      // ─────────────────────────────────────────────────────────────
      if (s1GroupRef.current) {
        if (progress > 0.34) {
          s1GroupRef.current.style.opacity = "0";
          s1GroupRef.current.style.pointerEvents = "none";
          s1GroupRef.current.setAttribute("aria-hidden", "true");
        } else if (progress <= 0.25) {
          // Progress 0.00 – 0.25: All text 100% visible at original position
          s1GroupRef.current.style.opacity = "1";
          s1GroupRef.current.style.transform = "translate3d(0, 0, 0)";
          s1GroupRef.current.style.pointerEvents = "auto";
          s1GroupRef.current.setAttribute("aria-hidden", "false");
        } else {
          // Progress 0.25 – 0.34: Smoothly fade and translate upward 20px
          const t = (progress - 0.25) / 0.09;
          const eased = t * t * (3 - 2 * t);
          const groupOpacity = 1 - eased;
          const groupY = -eased * 20;

          s1GroupRef.current.style.opacity = groupOpacity.toFixed(3);
          s1GroupRef.current.style.transform = `translate3d(0, ${groupY.toFixed(1)}px, 0)`;
          s1GroupRef.current.style.pointerEvents = groupOpacity > 0.1 ? "auto" : "none";
          s1GroupRef.current.setAttribute("aria-hidden", groupOpacity > 0.1 ? "false" : "true");
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 3. SCENE 02: COLLECTION DISCOVERY (0.28 – 0.72)
      // ─────────────────────────────────────────────────────────────
      if (s2GroupRef.current) {
        if (progress < 0.28 || progress > 0.72) {
          s2GroupRef.current.style.opacity = "0";
          s2GroupRef.current.style.pointerEvents = "none";
          s2GroupRef.current.setAttribute("aria-hidden", "true");
        } else {
          // Enter (0.29 – 0.38) & Exit (0.62 – 0.70)
          const enterT = smoothstep(0.29, 0.38, progress);
          const exitT = smoothstep(0.62, 0.70, progress);
          const groupOpacity = enterT * (1 - exitT);

          // Subtle right-to-left entry movement (+24px -> 0px) and slight exit shift
          const groupX = (1 - enterT) * 24 - exitT * 12;
          const groupY = -exitT * 16;

          s2GroupRef.current.style.opacity = groupOpacity.toFixed(3);
          s2GroupRef.current.style.transform = `translate3d(${groupX.toFixed(1)}px, ${groupY.toFixed(1)}px, 0)`;
          s2GroupRef.current.style.pointerEvents = groupOpacity > 0.1 ? "auto" : "none";
          s2GroupRef.current.setAttribute("aria-hidden", groupOpacity > 0.1 ? "false" : "true");

          // Staggered reveals on entry (0.30 – 0.39)
          if (s2EyebrowRef.current) {
            const tEye = smoothstep(0.30, 0.34, progress);
            s2EyebrowRef.current.style.opacity = tEye.toFixed(3);
            s2EyebrowRef.current.style.transform = `translate3d(${((1 - tEye) * 16).toFixed(1)}px, 0, 0)`;
          }

          if (s2Line1Ref.current) {
            const tL1 = smoothstep(0.31, 0.36, progress);
            s2Line1Ref.current.style.opacity = tL1.toFixed(3);
            s2Line1Ref.current.style.transform = `translate3d(0, ${((1 - tL1) * 105).toFixed(1)}%, 0)`;
          }

          if (s2Line2Ref.current) {
            const tL2 = smoothstep(0.33, 0.385, progress);
            s2Line2Ref.current.style.opacity = tL2.toFixed(3);
            s2Line2Ref.current.style.transform = `translate3d(0, ${((1 - tL2) * 105).toFixed(1)}%, 0)`;
          }

          if (s2SubRef.current) {
            const tSub = smoothstep(0.34, 0.39, progress);
            s2SubRef.current.style.opacity = tSub.toFixed(3);
            s2SubRef.current.style.transform = `translate3d(0, ${((1 - tSub) * 10).toFixed(1)}px, 0)`;
          }
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 4. SCENE 03: DISCOVER YOUR STYLE (0.66 – 1.00)
      // ─────────────────────────────────────────────────────────────
      if (s3GroupRef.current) {
        if (progress < 0.66) {
          s3GroupRef.current.style.opacity = "0";
          s3GroupRef.current.style.pointerEvents = "none";
          s3GroupRef.current.setAttribute("aria-hidden", "true");
          s3Btn1Ref.current?.setAttribute("tabindex", "-1");
          s3Btn2Ref.current?.setAttribute("tabindex", "-1");
        } else {
          // Entry (0.66 – 0.76) and holds indefinitely to 1.00
          const enterT = smoothstep(0.66, 0.76, progress);
          const groupY = (1 - enterT) * 16;
          const isActive = enterT > 0.65;

          s3GroupRef.current.style.opacity = enterT.toFixed(3);
          s3GroupRef.current.style.transform = `translate3d(0, ${groupY.toFixed(1)}px, 0)`;
          s3GroupRef.current.style.pointerEvents = isActive ? "auto" : "none";
          s3GroupRef.current.setAttribute("aria-hidden", isActive ? "false" : "true");

          // Toggle tabIndex so hidden buttons cannot be focused during earlier scenes
          s3Btn1Ref.current?.setAttribute("tabindex", isActive ? "0" : "-1");
          s3Btn2Ref.current?.setAttribute("tabindex", isActive ? "0" : "-1");

          // Staggered reveals on entry (0.67 – 0.80)
          if (s3EyebrowRef.current) {
            const tEye = smoothstep(0.67, 0.72, progress);
            s3EyebrowRef.current.style.opacity = tEye.toFixed(3);
            s3EyebrowRef.current.style.transform = `translate3d(0, ${((1 - tEye) * 12).toFixed(1)}px, 0)`;
          }

          if (s3Line1Ref.current) {
            const tL1 = smoothstep(0.69, 0.74, progress);
            s3Line1Ref.current.style.opacity = tL1.toFixed(3);
            s3Line1Ref.current.style.transform = `translate3d(0, ${((1 - tL1) * 105).toFixed(1)}%, 0)`;
          }

          if (s3Line2Ref.current) {
            const tL2 = smoothstep(0.71, 0.76, progress);
            s3Line2Ref.current.style.opacity = tL2.toFixed(3);
            s3Line2Ref.current.style.transform = `translate3d(0, ${((1 - tL2) * 105).toFixed(1)}%, 0)`;
          }

          if (s3Btn1Ref.current) {
            const tB1 = smoothstep(0.73, 0.78, progress);
            s3Btn1Ref.current.style.opacity = tB1.toFixed(3);
            s3Btn1Ref.current.style.transform = `translate3d(0, ${((1 - tB1) * 14).toFixed(1)}px, 0)`;
          }

          if (s3Btn2Ref.current) {
            const tB2 = smoothstep(0.75, 0.80, progress);
            s3Btn2Ref.current.style.opacity = tB2.toFixed(3);
            s3Btn2Ref.current.style.transform = `translate3d(0, ${((1 - tB2) * 14).toFixed(1)}px, 0)`;
          }
        }
      }

      // ─────────────────────────────────────────────────────────────
      // 5. SCROLL INDICATOR (Fades out early: 0.00 – 0.10)
      // ─────────────────────────────────────────────────────────────
      if (scrollIndicatorRef.current) {
        const indOpacity = clamp(1 - progress / 0.10);
        scrollIndicatorRef.current.style.opacity = indOpacity.toFixed(3);
      }
    };

    const applyScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      if (scrollable <= 0) return;

      const scrolledDistance = -rect.top;
      const progress = clamp(scrolledDistance / scrollable, 0, 1);

      updateTypographyAndGradients(progress);

      // ─────────────────────────────────────────────────────────────
      // Responsive Mobile Video & Poster Focal Point Interpolation
      // Focuses on the showroom illuminated wall logo at progress 0.00–0.10,
      // smoothly interpolates from 85% to 50% between 0.10 and 0.25,
      // and holds at standard 50% center crop for 0.25–1.00.
      // Desktop / tablet (> 768px) is strictly preserved with center crop.
      // ─────────────────────────────────────────────────────────────
      if (window.innerWidth <= 768) {
        let focalX = 85;
        if (progress > 0.10 && progress < 0.25) {
          const u = (progress - 0.10) / 0.15;
          const t = u * u * (3 - 2 * u); // cubic Hermite smoothstep
          focalX = 85 + (50 - 85) * t;
        } else if (progress >= 0.25) {
          focalX = 50;
        }

        const focalPos = `${focalX.toFixed(2)}% center`;
        if (videoRef.current) {
          videoRef.current.style.objectPosition = focalPos;
        }
        if (posterRef.current) {
          posterRef.current.style.backgroundPosition = focalPos;
        }
      } else {
        // Desktop / tablet (> 768px): clear inline overrides to preserve approved styles
        if (videoRef.current && videoRef.current.style.objectPosition) {
          videoRef.current.style.objectPosition = "";
        }
        if (posterRef.current && posterRef.current.style.backgroundPosition) {
          posterRef.current.style.backgroundPosition = "";
        }
      }

      // Seek video if metadata is ready and duration is valid
      if (
        video.readyState >= 1 &&
        video.duration &&
        !isNaN(video.duration) &&
        video.duration > 0
      ) {
        // Clamp to safe duration before the exact end to prevent browser freeze/black frame
        const safeDuration = Math.max(0, video.duration - 0.15);
        targetTime = Math.min(progress * safeDuration, safeDuration);

        // Seek only if difference is visible (> 30ms) and not currently blocked
        if (Math.abs(video.currentTime - targetTime) > 0.03 && !isSeeking) {
          isSeeking = true;
          if (seekSafetyTimer !== null) {
            window.clearTimeout(seekSafetyTimer);
          }
          // Safety timeout (120ms) so isSeeking is never permanently locked
          seekSafetyTimer = window.setTimeout(() => {
            isSeeking = false;
          }, 120);

          try {
            video.currentTime = targetTime;
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
      if (seekSafetyTimer !== null) window.clearTimeout(seekSafetyTimer);
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
          className="absolute inset-0 bg-cover bg-center hero-media-cover opacity-40"
          style={{ backgroundImage: `url('/images/pari-trends-hero-poster.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17] via-black/50 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-sans font-medium tracking-[0.3em] uppercase text-[#C89A2D] mb-4">
              BOUTIQUE SHOWROOM · ALUR
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium leading-[1.05] mb-6">
              Welcome to <span className="text-[#F8F2EA]">Pari Trends</span>
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
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
          className={`absolute inset-0 h-full w-full object-cover object-center hero-media-cover transition-opacity duration-700 ${
            videoError ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src="/videos/pari-trends-hero-scroll-1080p.mp4"
            type="video/mp4"
          />
          <source
            src="/videos/pari-trends-hero-scroll-720p.mp4"
            type="video/mp4"
          />
        </video>

        {/* High-fidelity background poster — displayed until video frame renders, or as permanent fallback on error */}
        <div
          ref={posterRef}
          className={`absolute inset-0 bg-cover bg-center hero-media-cover transition-opacity duration-700 ${
            videoLoaded && !videoError ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ backgroundImage: `url('/images/pari-trends-hero-poster.jpg')` }}
          aria-hidden="true"
        />

        {/* ─── Static Vignettes for Fixed Navbar & Upcoming Section Transitions ─── */}
        <div
          className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-64 sm:h-72 lg:h-28 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* ─── Synchronized Dynamic Contrast Gradients ─── */}
        {/* Gradient 01: Left-weighted contrast for Scene 01 */}
        <div
          ref={grad1Ref}
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none z-10 transition-opacity duration-150 will-change-opacity"
          style={{ opacity: 1 }}
          aria-hidden="true"
        />

        {/* Gradient 02: Right-weighted contrast for Scene 02 (leaves central racks illuminated) */}
        <div
          ref={grad2Ref}
          className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent pointer-events-none z-10 transition-opacity duration-150 will-change-opacity"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* Gradient 03: Localized left contrast for Scene 03 (preserves right mannequin visibility) */}
        <div
          ref={grad3Ref}
          className="absolute inset-y-0 left-0 w-full sm:w-[60%] lg:w-[48%] bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none z-10 transition-opacity duration-150 will-change-opacity"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* ─── SCENE 01: WELCOME (Left-aligned, lower-middle viewport) ─── */}
        <div
          ref={s1GroupRef}
          className="absolute inset-0 z-20 flex items-end justify-start px-6 sm:px-10 lg:px-[7vw] pb-20 sm:pb-24 lg:pb-[13vh] pointer-events-auto"
          style={{ opacity: 1 }}
        >
          <div className="max-w-2xl w-full flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div
              ref={s1EyebrowRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 mb-4 sm:mb-5 will-change-transform"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
              <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#F8F2EA]">
                BOUTIQUE SHOWROOM · ALUR
              </span>
            </div>

            {/* Headline with masked line reveals */}
            <h1 className="font-serif text-[clamp(2.4rem,5.5vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-white mb-3 sm:mb-4">
              <span className="block overflow-hidden py-1">
                <span ref={s1Line1Ref} className="block will-change-transform">
                  Welcome to
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span ref={s1Line2Ref} className="block will-change-transform text-[#F8F2EA]">
                  Pari Trends
                </span>
              </span>
            </h1>

            {/* Supporting copy */}
            <p
              ref={s1SubRef}
              className="font-sans text-[clamp(1rem,1.8vw,1.35rem)] text-white/85 font-normal tracking-wide leading-relaxed max-w-lg will-change-transform"
            >
              Fashion for every moment.
            </p>
          </div>
        </div>

        {/* ─── SCENE 02: COLLECTION DISCOVERY (Right-aligned, right side of viewport) ─── */}
        <div
          ref={s2GroupRef}
          className="absolute inset-0 z-20 flex items-end sm:items-center justify-start sm:justify-end px-6 sm:px-10 lg:px-[7vw] pb-24 sm:pb-0 pointer-events-none"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="max-w-xl w-full flex flex-col items-start sm:items-end text-left sm:text-right">
            {/* Eyebrow */}
            <div
              ref={s2EyebrowRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 mb-4 sm:mb-5 will-change-transform"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D81B77]" />
              <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#F8F2EA]">
                THE PARI COLLECTION
              </span>
            </div>

            {/* Headline with masked line reveals */}
            <h2 className="font-serif text-[clamp(2.4rem,5.5vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-white mb-3 sm:mb-4">
              <span className="block overflow-hidden py-1">
                <span ref={s2Line1Ref} className="block will-change-transform">
                  A Style for
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span ref={s2Line2Ref} className="block will-change-transform text-[#F8F2EA]">
                  Every Occasion
                </span>
              </span>
            </h2>

            {/* Supporting copy */}
            <p
              ref={s2SubRef}
              className="font-sans text-[clamp(1rem,1.8vw,1.35rem)] text-white/85 font-normal tracking-wide leading-relaxed max-w-lg will-change-transform"
            >
              Explore our curated women&apos;s wear collections.
            </p>
          </div>
        </div>

        {/* ─── SCENE 03: DISCOVER YOUR STYLE (Left-aligned finale, narrower width) ─── */}
        <div
          ref={s3GroupRef}
          className="absolute inset-0 z-20 flex items-center lg:items-end justify-start px-6 sm:px-10 lg:px-[7vw] pb-16 sm:pb-20 lg:pb-[14vh] pointer-events-none"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="max-w-lg w-full flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div
              ref={s3EyebrowRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 mb-4 sm:mb-5 will-change-transform"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89A2D]" />
              <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#F8F2EA]">
                THE PARI EDIT
              </span>
            </div>

            {/* Headline with masked line reveals */}
            <h2 className="font-serif text-[clamp(2.4rem,5.5vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-white mb-5 sm:mb-6">
              <span className="block overflow-hidden py-1">
                <span ref={s3Line1Ref} className="block will-change-transform">
                  Discover
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span ref={s3Line2Ref} className="block will-change-transform text-[#F8F2EA]">
                  Your Style
                </span>
              </span>
            </h2>

            {/* Action Buttons with Staggered Entrance */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                ref={s3Btn1Ref}
                href="#collections"
                tabIndex={-1}
                className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5
                  bg-[#D81B77] hover:bg-[#AD1457] text-white text-[13.5px] sm:text-[14px]
                  font-sans font-semibold tracking-wide rounded-full shadow-lg shadow-[#D81B77]/25
                  transition-colors duration-200 active:scale-95 will-change-transform
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
                ref={s3Btn2Ref}
                href="#visit"
                tabIndex={-1}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5
                  bg-white/10 hover:bg-white/20 text-white border border-white/25
                  backdrop-blur-md text-[13.5px] sm:text-[14px]
                  font-sans font-semibold tracking-wide rounded-full
                  transition-colors duration-200 active:scale-95 will-change-transform
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Visit Our Store
                <MapPin size={15} strokeWidth={2.2} />
              </a>
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
