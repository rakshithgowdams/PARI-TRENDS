import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js Dynamic Sitemap Generator for Pari Trends
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
