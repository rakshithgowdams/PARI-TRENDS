"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, AlertCircle } from "lucide-react";

/**
 * Pari Trends — Global Error Boundary Section
 *
 * Catches runtime errors gracefully across the application,
 * logs them safely, and presents an editorial fallback experience.
 */
export default function ErrorSection({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error safely to the console for debugging
    console.error("Pari Trends runtime error:", error);
  }, [error]);

  return (
    <div
      role="alert"
      className="flex-1 w-full min-h-[70vh] flex items-center justify-center bg-[#F8F2EA] text-[#1E1A17] px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1A17]/5 border border-[#1E1A17]/10 mb-6">
          <AlertCircle className="w-3.5 h-3.5 text-[#D81B77]" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-[#6B5B52]">
            NOTICE
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E1A17] mb-4 leading-tight">
          An Unexpected Moment Has{" "}
          <span className="italic font-serif text-[#D81B77] font-normal">
            Occurred.
          </span>
        </h1>

        {/* Subtext */}
        <p className="font-sans text-sm sm:text-base text-[#6B5B52] leading-relaxed mb-8 max-w-md">
          We encountered a brief disruption while loading this section of the boutique.
          Please try refreshing, or return to our homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D81B77] hover:bg-[#AD1457] text-white text-sm font-sans font-semibold tracking-wide shadow-md transition-colors duration-200 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B77]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1A17] hover:bg-[#1E1A17]/85 text-white text-sm font-sans font-semibold tracking-wide transition-colors duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1A17]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Boutique</span>
          </Link>
        </div>

        {/* Error Digest (if present in production) */}
        {error.digest && (
          <p className="mt-8 font-mono text-[10px] text-[#6B5B52]/60 tracking-wider">
            Ref: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
