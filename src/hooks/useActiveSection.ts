"use client";

import { useEffect, useState } from "react";
import { sectionIds } from "@/config/navigation";

/**
 * Uses IntersectionObserver to track which homepage section is
 * currently most visible in the viewport.
 *
 * Returns the active section ID string (e.g. "collections").
 */
export function useActiveSection(): string {
  const [active, setActive] = useState("home");

  useEffect(() => {
    // Only observe sections that actually exist in the DOM.
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most-visible entry.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        // rootMargin accounts for the fixed navbar height.
        rootMargin: "-100px 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
