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

    const checkBoundary = () => {
      const about = document.getElementById("about");
      if (about) {
        // Measure the live fixed header height (defaulting to 80px)
        const header = document.querySelector("header");
        const navbarHeight = header?.offsetHeight ?? 80;

        // Bounding client rect top is the exact pixel distance from the
        // viewport top to the top of the About section.
        const aboutRect = about.getBoundingClientRect();

        // The navbar switches to solid ivory the exact moment the About section reaches it
        setIsPastHero(aboutRect.top <= navbarHeight);
      } else {
        // Fallback if #about is not found: observe #home outer container bottom
        const hero = document.getElementById("home");
        if (hero) {
          const heroRect = hero.getBoundingClientRect();
          const header = document.querySelector("header");
          const navbarHeight = header?.offsetHeight ?? 80;
          setIsPastHero(heroRect.bottom <= navbarHeight);
        } else {
          setIsPastHero(window.scrollY > 80);
        }
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkBoundary();
        rafId = null;
      });
    };

    // Evaluate immediately on mount & after render
    checkBoundary();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return isPastHero;
}
