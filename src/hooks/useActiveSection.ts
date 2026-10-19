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

    const checkActiveSection = () => {
      // If user is at the very top of the page
      if (window.scrollY < 120) {
        setActive("home");
        return;
      }

      const header = document.querySelector("header");
      const navbarHeight = header?.offsetHeight ?? 80;
      // Focal point for reader attention: ~120px below navbar
      const focalY = navbarHeight + 120;

      const elements = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el));

      // Check which section bounding rect encompasses focalY
      for (const { id, el } of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalY && rect.bottom > focalY) {
          setActive(id);
          return;
        }
      }

      // If past all sections (e.g. at the bottom footer), default to last section
      const last = elements[elements.length - 1];
      if (last) {
        const rect = last.el.getBoundingClientRect();
        if (rect.bottom <= focalY) {
          setActive(last.id);
        }
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        checkActiveSection();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    checkActiveSection();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return active;
}
