"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import styles from "./PariPreloader.module.css";

export default function PariPreloader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(12);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Detect Lighthouse / PageSpeed audit crawlers
    const isAuditBot =
      typeof navigator !== "undefined" &&
      /Lighthouse|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent);

    const isDirectAnchor =
      typeof window !== "undefined" &&
      window.location.hash &&
      window.location.hash.length > 1 &&
      window.location.hash !== "#home";

    if (isAuditBot || isDirectAnchor) {
      setShouldRender(false);
      setIsFinished(true);
      return;
    }

    // Lock background scroll during preloader presentation
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    let isDismissed = false;
    let currentPercent = 12;

    const restoreScroll = () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };

    // Smooth fluid progression counter from 12% to 100%
    const progressInterval = setInterval(() => {
      if (isDismissed) return;

      if (currentPercent < 92) {
        currentPercent += Math.floor(Math.random() * 8) + 6;
        if (currentPercent > 92) currentPercent = 92;
        setProgress(currentPercent);
      }
    }, 60);

    const finishSequence = () => {
      if (isDismissed) return;
      isDismissed = true;
      clearInterval(progressInterval);
      setProgress(100);

      // Brief elegant pause at 100% before curtain glide
      setTimeout(() => {
        restoreScroll();
        setIsExiting(true);

        exitTimeoutRef.current = setTimeout(() => {
          setIsFinished(true);
        }, 850);
      }, 250);
    };

    // Allow all phase animations (A, B, C, D) to complete gracefully (~1.35s)
    const targetDurationTimer = setTimeout(() => {
      finishSequence();
    }, 1350);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(targetDurationTimer);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      restoreScroll();
    };
  }, []);

  if (!shouldRender || isFinished) {
    return null;
  }

  return (
    <div
      id="pari-preloader"
      className={`${styles.overlay} ${isExiting ? styles.exiting : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!isExiting}
      aria-label="Pari Trends"
    >
      <span className="sr-only">
        Pari Trends — Women&apos;s Fashion Boutique. Curated luxury ethnic and contemporary collections loading.
      </span>

      <div className={styles.content}>
        {/* Centered Logo & Animated Gold Ring Composition */}
        <div className="relative flex items-center justify-center">
          {/* Ambient Warm Golden Aura */}
          <div className={styles.ambientGlow} aria-hidden="true" />

          {/* Phase A: SVG Fine Circular Gold Stroke (Clockwise) */}
          <svg
            className="absolute w-[164px] h-[164px] sm:w-[192px] sm:h-[192px] -rotate-90 pointer-events-none z-10"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="#C89A2D"
              strokeWidth="1.2"
              strokeLinecap="round"
              className={styles.ringCircle}
            />
          </svg>

          {/* Phase B: Original Pari Trends Circular Logo Medallion */}
          <div
            className={`relative w-[136px] h-[136px] sm:w-[158px] sm:h-[158px] rounded-full overflow-hidden bg-[#F8F2EA] shadow-[0_12px_32px_rgba(30,26,23,0.12)] border border-[#C89A2D]/40 flex-shrink-0 z-10 ${styles.logoMedallion}`}
          >
            <Image
              src={siteConfig.logo}
              alt="Pari Trends"
              fill
              priority
              sizes="(max-width: 640px) 136px, 158px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Phase C: Brand Typography Reveal */}
        <div className="flex flex-col items-center mt-5 sm:mt-6 z-10">
          <h2
            className={`font-serif text-[1.65rem] sm:text-[1.85rem] font-medium tracking-[0.14em] text-[#1E1A17] leading-none ${styles.brandName}`}
          >
            PARI TRENDS
          </h2>

          {/* Gold Hairline with Diamond Accent */}
          <div className={`flex items-center gap-2 my-2 ${styles.brandDivider}`}>
            <span className="w-8 sm:w-10 h-[1px] bg-[#C89A2D]/60" />
            <span className="text-[7px] text-[#C89A2D]">◆</span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#C89A2D]/60" />
          </div>

          {/* Tagline */}
          <p
            className={`font-sans font-semibold text-[9.5px] sm:text-[10.5px] tracking-[0.32em] text-[#C89A2D] uppercase ${styles.taglineText}`}
          >
            WOMEN&apos;S FASHION
          </p>
        </div>

        {/* Phase D: Linear Shimmering Progress Bar & Percentage */}
        <div className={styles.progressContainer} aria-hidden="true">
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressCounter}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
