import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

/**
 * Pari Trends — 404 Not Found Page
 */
export default function NotFound() {
  return (
    <div className="flex-1 w-full min-h-[70vh] flex items-center justify-center bg-[#F8F2EA] text-[#1E1A17] px-6 py-24 sm:px-10 lg:px-16">
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1A17]/5 border border-[#1E1A17]/10 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C89A2D]" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-[#6B5B52]">
            PAGE NOT FOUND
          </span>
        </div>

        {/* Big editorial title */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1E1A17] mb-4 leading-tight">
          Lost in the{" "}
          <span className="italic font-serif text-[#D81B77] font-normal">
            Collections.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed mb-8 max-w-md">
          The page or look you are searching for does not exist or has been relocated to another section of the boutique.
        </p>

        {/* Back to Home CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white text-sm font-sans font-semibold tracking-wide shadow-md transition-colors duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
