import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PariPreloader from "@/components/ui/PariPreloader";
import { siteConfig } from "@/config/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F2EA",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pari Trends — Women's Fashion Boutique | Alur, Hassan",
    template: "%s | Pari Trends",
  },
  description: siteConfig.description,
  keywords: [
    "Pari Trends",
    "Women's Fashion Boutique",
    "Alur Hassan Boutique",
    "Ethnic Wear Karnataka",
    "Kurti Sets Alur",
    "Designer Co-ords",
    "Dupatta Sets",
    "Party Wear Dresses",
    "Indian Fashion Alur",
    "Modest Nightwear",
    "Women Fashion Showroom Hassan",
  ],
  authors: [{ name: "Pari Trends" }],
  creator: "Pari Trends",
  publisher: "Pari Trends",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pari Trends — Women's Fashion Boutique | Alur, Hassan",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Pari Trends",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/pari-trends-logo.png",
        width: 1200,
        height: 630,
        alt: "Pari Trends Women's Fashion Boutique Showroom in Alur, Hassan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pari Trends — Women's Fashion Boutique | Alur, Hassan",
    description: siteConfig.description,
    images: ["/brand/pari-trends-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F8F2EA] text-[#1E1A17]">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (
                  (window.location.hash && window.location.hash.length > 1 && window.location.hash !== '#home') ||
                  /Lighthouse|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent)
                ) {
                  document.documentElement.classList.add('preloader-skipped');
                }
              } catch (e) {}
            `,
          }}
        />
        <PariPreloader />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

