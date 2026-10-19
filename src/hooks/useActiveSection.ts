"use client";

import { useEffect, useState } from "react";
import { sectionIds } from "@/config/navigation";

/**
 * useActiveSection — Pari Trends Active Section Tracker
 *
 * Accurately tracks which homepage section is currently under the reading focal point
 * (~120px beneath the fixed navbar).
 *
 * Works reliably across both standard sections and tall scrollytelling sequences
 * (Hero 260svh, Style Stories 320svh), preventing jumpy or incorrect navigation highlighting.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let rafId: number | null = null;
    let cachedFocalY = 200;
    let cachedSections: { id: string; top: number; bottom: number }[] = [];
    let currentActive = "home";

    const measureSections = () => {
      const header = document.querySelector("header");
      const navbarHeight = header?.offsetHeight ?? 80;
      cachedFocalY = navbarHeight + 120;

      const scrollY = window.scrollY;
      const elements = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));

      cachedSections = elements.map(({ id, el }) => {
        const rect = el.getBoundingClientRect();
        const top = scrollY + rect.top;
        const bottom = top + rect.height;
        return { id, top, bottom };
      });
    };

    const checkActiveSection = () => {
      const scrollY = window.scrollY;

      // If user is at the very top of the page
      if (scrollY < 120) {
        if (currentActive !== "home") {
          currentActive = "home";
          setActive("home");
        }
        return;
      }

      const focalPoint = scrollY + cachedFocalY;

      // Fast numeric lookup with zero DOM calls
      for (const section of cachedSections) {
        if (section.top <= focalPoint && section.bottom > focalPoint) {
          if (currentActive !== section.id) {
            currentActive = section.id;
            setActive(section.id);
          }
          return;
        }
      }

      // If past all sections (e.g. at the bottom footer), default to last section
      const last = cachedSections[cachedSections.length - 1];
      if (last && last.bottom <= focalPoint) {
        if (currentActive !== last.id) {
          currentActive = last.id;
          setActive(last.id);
        }
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkActiveSection();
        rafId = null;
      });
    };

    const onResize = () => {
      measureSections();
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkActiveSection();
        rafId = null;
      });
    };

    measureSections();
    checkActiveSection();

    // Re-measure after initial layout settles
    const t1 = setTimeout(measureSections, 500);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      clearTimeout(t1);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return active;
}
