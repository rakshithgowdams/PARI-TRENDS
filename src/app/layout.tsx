import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";

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

export const metadata: Metadata = {
  title: "Pari Trends — Women's Fashion Boutique | Alur, Hassan",
  description:
    "Pari Trends is a premium women's fashion boutique in Alur, Hassan, Karnataka. Explore curated ethnic and contemporary collections, latest trends, and exclusive designer wear.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F2EA] text-[#1E1A17]">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
