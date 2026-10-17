/**
 * Central site configuration for Pari Trends.
 *
 * All brand metadata, contact details and social links live here
 * so that components never hard-code business information.
 */

export const siteConfig = {
  name: "Pari Trends",
  tagline: "WOMEN'S FASHION",
  description:
    "Premium women's fashion boutique in Alur, Hassan, Karnataka. Curated ethnic and contemporary collections, signature kurtis, designer co-ords, and festive wear.",
  location: "Alur, Hassan, Karnataka",
  address: "BM Road, Opposite Taluk Panchayat, Alur, Karnataka 573213",
  timings: "Monday – Sunday • 10:00 AM – 9:00 PM",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://paritrends.com",

  /** Logo asset path – must point to the original client-supplied logo. */
  logo: "/brand/pari-trends-logo.png",

  /** Verified telephone number for store calls */
  phone: (process.env.NEXT_PUBLIC_STORE_PHONE || null) as string | null,

  /**
   * WhatsApp number in international format (e.g. "919876543210").
   * Can be configured via NEXT_PUBLIC_WHATSAPP_NUMBER environment variable.
   * When null, CTA buttons link to the #visit section instead.
   */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null) as string | null,

  /** Pre-filled WhatsApp greeting. */
  whatsappMessage:
    "Hi Pari Trends! I'd love to know more about your latest collections.",

  /** Verified Pari Trends Instagram profile */
  instagram: "https://www.instagram.com/alur_pari_trends/",

  /** Verified Google Maps location link for Pari Trends Alur */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pari+Trends+BM+Road+Opposite+Taluk+Panchayat+Alur+Karnataka+573213",

  /** Build the WhatsApp deep-link or fall back to #visit. */
  get whatsappUrl(): string {
    if (this.whatsapp) {
      const encoded = encodeURIComponent(this.whatsappMessage);
      return `https://wa.me/${this.whatsapp}?text=${encoded}`;
    }
    return "#visit";
  },
} as const;

