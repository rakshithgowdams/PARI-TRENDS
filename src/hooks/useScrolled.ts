"use client";

import { useEffect, useState } from "react";

/**
 * useScrolled — Pari Trends Navbar Scroll Boundary Tracker
 *
 * Implements the exact boundary detection between the pinned Hero
 * walkthrough section and the following About section:
 *
 *  • STATE 1 (Hero Section, 0%–100% video progress):
 *    About section has not yet reached the fixed navbar boundary.
 *    Returns `false` → navbar is completely transparent with white text.
 *
 *  • STATE 2 (About Section & all subsequent sections):
 *    About section top edge reaches or passes the navbar height.
 *    Returns `true` → navbar transitions to solid ivory #F8F2EA with dark text.
 *
 *  • STATE 3 (Scroll back into Hero):
 *    About section boundary drops back below the navbar.
 *    Returns `false` → navbar immediately returns to completely transparent.
 *
 * Uses requestAnimationFrame for throttled, butter-smooth 60fps checks in both directions.
 */
export function useScrolled(): boolean {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let cachedTriggerY = 80;
    let isPastCurrent = false;

    const measureBoundary = () => {
      const header = document.querySelector("header");
      const navbarHeight = header?.offsetHeight ?? 80;

      const about = document.getElementById("about");
      if (about) {
        const aboutTop = window.scrollY + about.getBoundingClientRect().top;
        cachedTriggerY = Math.max(0, aboutTop - navbarHeight);
      } else {
        const hero = document.getElementById("home");
        if (hero) {
          const heroBottom = window.scrollY + hero.getBoundingClientRect().bottom;
          cachedTriggerY = Math.max(0, heroBottom - navbarHeight);
        } else {
          cachedTriggerY = 80;
        }
      }
    };

    const checkBoundary = () => {
      const isPast = window.scrollY >= cachedTriggerY;
      if (isPast !== isPastCurrent) {
        isPastCurrent = isPast;
        setIsPastHero(isPast);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkBoundary();
        rafId = null;
      });
    };

    const onResize = () => {
      measureBoundary();
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkBoundary();
        rafId = null;
      });
    };

    measureBoundary();
    checkBoundary();

    const t1 = setTimeout(measureBoundary, 500);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(t1);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isPastHero;
}
