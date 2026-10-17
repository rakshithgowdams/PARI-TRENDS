import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js Web App Manifest (PWA) Generator for Pari Trends
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Women's Fashion Boutique`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1E1A17",
    theme_color: "#F8F2EA",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
