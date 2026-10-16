/**
 * Centralised navigation link data.
 *
 * Every component that renders nav items imports this array
 * so labels, hrefs and section IDs stay in sync.
 */

export interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

export const navLinks: NavLink[] = [
  { label: "Collections", href: "#collections", sectionId: "collections" },
  { label: "Featured", href: "#featured", sectionId: "featured" },
  { label: "Style Stories", href: "#stories", sectionId: "stories" },
  { label: "Latest Trends", href: "#trends", sectionId: "trends" },
  { label: "Visit Us", href: "#visit", sectionId: "visit" },
];

/** All homepage section IDs (used for IntersectionObserver). */
export const sectionIds = [
  "home",
  "about",
  ...navLinks.map((l) => l.sectionId),
];
