import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js Dynamic Robots.txt Generator for Pari Trends
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
