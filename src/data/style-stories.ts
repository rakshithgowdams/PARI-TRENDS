import { siteConfig } from "@/config/site";

export interface StyleStory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  alt: string;
}

export const STYLE_STORIES: StyleStory[] = [
  {
    id: "first-light",
    number: "01",
    title: "First Light",
    subtitle: "Where effortless elegance begins.",
    category: "Kurti / Kurta Sets",
    image: "/images/stories/01-first-light.jpg",
    alt: "Pari Trends Style Story 01 First Light — Everyday ethnic kurti kurta sets in morning light",
  },
  {
    id: "city-bloom",
    number: "02",
    title: "City Bloom",
    subtitle: "Confidence, styled your way.",
    category: "Co-ord Sets / Western Tops",
    image: "/images/stories/02-city-bloom.jpg",
    alt: "Pari Trends Style Story 02 City Bloom — Contemporary tailored matching co-ord sets",
  },
  {
    id: "golden-hour",
    number: "03",
    title: "Golden Hour",
    subtitle: "Little details. Lasting impressions.",
    category: "Dupatta Sets",
    image: "/images/stories/03-golden-hour.jpg",
    alt: "Pari Trends Style Story 03 Golden Hour — Gracefully draped artisanal dupatta ensemble",
  },
  {
    id: "celebration-glow",
    number: "04",
    title: "Celebration Glow",
    subtitle: "Made for moments worth remembering.",
    category: "Party Wear & Dress Sets",
    image: "/images/stories/04-celebration-glow.jpg",
    alt: "Pari Trends Style Story 04 Celebration Glow — Richly embellished festive party wear dress set",
  },
  {
    id: "everyday-ease",
    number: "05",
    title: "Everyday Ease",
    subtitle: "Comfort that moves with you.",
    category: "Leggings / Straight Pants",
    image: "/images/stories/05-everyday-ease.jpg",
    alt: "Pari Trends Style Story 05 Everyday Ease — Tailored straight pants and versatile tunic outfit",
  },
  {
    id: "soft-hours",
    number: "06",
    title: "Soft Hours",
    subtitle: "Comfort in every little moment.",
    category: "Nightwear",
    image: "/images/stories/06-soft-hours.jpg",
    alt: "Pari Trends Style Story 06 Soft Hours — Breathable modest cotton loungewear and nightwear",
  },
];

/**
 * Returns the direct WhatsApp enquiry link for a given style story.
 * Falls back to `#visit` if WhatsApp number is unconfigured.
 */
export function getStoryEnquiryUrl(category: string): string {
  if (siteConfig.whatsapp) {
    const message = `Hello Pari Trends, I would like to know more about your ${category} collection.`;
    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return "#visit";
}
