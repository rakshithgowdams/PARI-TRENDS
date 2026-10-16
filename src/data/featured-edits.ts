import { siteConfig } from "@/config/site";

export interface FeaturedEdit {
  id: string;
  number: string;
  theme: string;
  category: string;
  caption: string;
  image: string;
  alt: string;
  aspectFocus?: string; // Optional focal point alignment
}

export const FEATURED_EDITS: FeaturedEdit[] = [
  {
    id: "everyday-grace",
    number: "01",
    theme: "Everyday Grace",
    category: "Kurti / Kurta Sets",
    caption: "Comfort meets effortless elegance.",
    image: "/images/collections/01-kurti-kurta-sets.jpg",
    alt: "Pari Trends Everyday Grace — Kurti and Kurta Sets with delicate hand embroidery",
    aspectFocus: "object-[center_20%]",
  },
  {
    id: "modern-muse",
    number: "02",
    theme: "Modern Muse",
    category: "Co-ord Sets",
    caption: "Matching looks, modern confidence.",
    image: "/images/collections/02-co-ord-sets.jpg",
    alt: "Pari Trends Modern Muse — Contemporary matching co-ord set in architectural studio",
    aspectFocus: "object-[center_25%]",
  },
  {
    id: "celebration-edit",
    number: "03",
    theme: "Celebration Edit",
    category: "Party Wear & Dress Sets",
    caption: "Made for memorable moments.",
    image: "/images/collections/04-party-wear.jpg",
    alt: "Pari Trends Celebration Edit — Embellished party wear ensemble with rich fabric detailing",
    aspectFocus: "object-[center_20%]",
  },
  {
    id: "effortless-layers",
    number: "04",
    theme: "Effortless Layers",
    category: "Dupatta Sets",
    caption: "The art of the perfect finishing touch.",
    image: "/images/collections/07-dupatta-sets.jpg",
    alt: "Pari Trends Effortless Layers — Graceful ethnic ensemble with an artisanal embroidered dupatta",
    aspectFocus: "object-[center_20%]",
  },
  {
    id: "soft-hours",
    number: "05",
    theme: "Soft Hours",
    category: "Nightwear",
    caption: "Everyday comfort, beautifully considered.",
    image: "/images/collections/05-nightwear.jpg",
    alt: "Pari Trends Soft Hours — Breathable cotton lounge and coordinated nightwear",
    aspectFocus: "object-[center_25%]",
  },
  {
    id: "city-essentials",
    number: "06",
    theme: "City Essentials",
    category: "Western Tops / Straight Pants",
    caption: "Easy style for days on the move.",
    image: "/images/collections/03-western-tops.jpg",
    alt: "Pari Trends City Essentials — Chic western blouse and tailored straight pants",
    aspectFocus: "object-[center_20%]",
  },
];

/**
 * Returns the direct WhatsApp enquiry link for a given featured theme.
 * If WhatsApp number is not configured in siteConfig, falls back to `#visit`.
 */
export function getFeaturedEnquiryUrl(theme: string, category: string): string {
  if (siteConfig.whatsapp) {
    const message = `Hello Pari Trends, I would like to know more about your ${theme} (${category}) collection.`;
    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return "#visit";
}
