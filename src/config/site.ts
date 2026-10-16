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
    "Premium women's fashion boutique in Alur, Hassan, Karnataka. Curated ethnic and contemporary collections.",
  location: "Alur, Hassan, Karnataka",

  /** Logo asset path – must point to the original client-supplied logo. */
  logo: "/brand/pari-trends-logo.png",

  /**
   * WhatsApp number in international format (e.g. "919876543210").
   * Set to `null` until the real number is provided by the client.
   * When null, the CTA button links to the #visit section instead.
   */
  whatsapp: null as string | null,

  /** Pre-filled WhatsApp greeting. */
  whatsappMessage:
    "Hi Pari Trends! I'd love to know more about your latest collections.",

  /** Build the WhatsApp deep-link or fall back to #visit. */
  get whatsappUrl(): string {
    if (this.whatsapp) {
      const encoded = encodeURIComponent(this.whatsappMessage);
      return `https://wa.me/${this.whatsapp}?text=${encoded}`;
    }
    return "#visit";
  },
} as const;
