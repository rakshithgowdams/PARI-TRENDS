import { siteConfig } from "@/config/site";

export interface CollectionItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  row: 1 | 2;
  colSpanDesktop: string; // Tailwind grid column span on desktop
}

export const COLLECTIONS_DATA: CollectionItem[] = [
  // ─── Row 1: Featured Statement Sets (3 Cards, 4 cols each) ───
  {
    id: "kurti-kurta-sets",
    number: "01",
    title: "Kurti / Kurta Sets",
    subtitle: "Everyday to Occasion",
    description: "Refined Indian kurta sets with coordinated trousers and tasteful embroidery.",
    image: "/images/collections/01-kurti-kurta-sets.jpg",
    alt: "Pari Trends contemporary Indian Kurti and Kurta set with tasteful embroidery and coordinating trousers",
    row: 1,
    colSpanDesktop: "lg:col-span-4",
  },
  {
    id: "co-ord-sets",
    number: "02",
    title: "Co-ord Sets",
    subtitle: "Modern Matching Silhouettes",
    description: "Contemporary two-piece coordinated sets designed for effortless modern elegance.",
    image: "/images/collections/02-co-ord-sets.jpg",
    alt: "Pari Trends modern matching two-piece co-ord set with tailored trousers and contemporary silhouette",
    row: 1,
    colSpanDesktop: "lg:col-span-4",
  },
  {
    id: "party-wear",
    number: "04",
    title: "Party Wear & Dress Sets",
    subtitle: "Celebration & Evening Ensemble",
    description: "Gracefully embellished ethnic party dresses and three-piece celebration ensembles.",
    image: "/images/collections/04-party-wear.jpg",
    alt: "Pari Trends embellished occasion-ready party wear ensemble with rich fabric detailing",
    row: 1,
    colSpanDesktop: "lg:col-span-4",
  },

  // ─── Row 2: Versatile Wardrobe Curation (4 Cards, 3 cols each) ───
  {
    id: "western-tops",
    number: "03",
    title: "Western Tops",
    subtitle: "Chic Everyday Blouses",
    description: "Sophisticated western blouses and fashion tops crafted with premium fabrics.",
    image: "/images/collections/03-western-tops.jpg",
    alt: "Pari Trends chic contemporary western blouse top paired with neutral trousers",
    row: 2,
    colSpanDesktop: "lg:col-span-3",
  },
  {
    id: "nightwear",
    number: "05",
    title: "Nightwear",
    subtitle: "Soft Cotton Home Comfort",
    description: "Gentle, modest coordinated loungewear and night sets crafted from breathable cotton.",
    image: "/images/collections/05-nightwear.jpg",
    alt: "Pari Trends comfortable soft cotton coordinated lounge and nightwear set",
    row: 2,
    colSpanDesktop: "lg:col-span-3",
  },
  {
    id: "leggings-pants",
    number: "06",
    title: "Leggings / Straight Pants",
    subtitle: "Tailored Lower Silhouettes",
    description: "Perfect-fit straight trousers and soft leggings styled for comfort and poise.",
    image: "/images/collections/06-leggings-pants.jpg",
    alt: "Pari Trends tailored straight-cut trousers and comfortable leggings silhouette",
    row: 2,
    colSpanDesktop: "lg:col-span-3",
  },
  {
    id: "dupatta-sets",
    number: "07",
    title: "Dupatta Sets",
    subtitle: "Intricate Drapery & Sheers",
    description: "Exquisite coordinated ethnic sets highlighting gracefully draped artisanal dupattas.",
    image: "/images/collections/07-dupatta-sets.jpg",
    alt: "Pari Trends elegant ethnic ensemble featuring a beautifully draped embroidered dupatta",
    row: 2,
    colSpanDesktop: "lg:col-span-3",
  },
];

/**
 * Returns the direct WhatsApp enquiry link for a given category.
 * If WhatsApp number is not configured in siteConfig, falls back to `#visit`.
 */
export function getCollectionEnquiryUrl(categoryTitle: string): string {
  if (siteConfig.whatsapp) {
    const message = `Hello Pari Trends, I would like to know more about your ${categoryTitle} collection.`;
    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  }
  return "#visit";
}
