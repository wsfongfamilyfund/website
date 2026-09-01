"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const TOTAL_PAGES = 16;
const PAGE_TITLES: Record<number, string> = {
  1: "Cover page",
  2: "Inside cover",
  3: "Our Philosophy",
  4: "Message from the Board",
  5: "Year in Review",
  6: "Grant Recipients",
  7: "Education Initiatives",
  8: "Community Impact",
  9: "Financial Summary",
  10: "Donor Recognition",
  11: "Looking Ahead",
  12: "Board Members",
  13: "Our Mission",
  14: "How to Give",
  15: "Inside back cover",
  16: "Back cover",
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevPage();
      } else if (e.key === "ArrowRight") {
        nextPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevPage, nextPage]);

  return (
    <main className="min-h-screen bg-cream text-dark-green flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-dark-green mb-8 font-bold tracking-tight">
            W.S. Fong Family Fund
          </h1>

          <div className="space-y-4 font-sans text-lg leading-relaxed text-left md:text-center text-dark-green/90">
            <p>
              The W.S. Fong Family Fund is a way for our family to come together
              and make a meaningful impact by donating to causes we care about.
              Each year, a small group of family members will research and select
              charities to receive a donation from our family fund.
            </p>
            <p>
              This initiative allows us to give with purpose by thoughtfully
              directing our donations, share our values by supporting causes
              close to our hearts, and strengthen our family bond through
              collective philanthropy.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-6 py-3.5 font-sans text-base font-medium text-cream bg-dark-green rounded-lg shadow-md hover:bg-sage-green hover:text-dark-green transition duration-200"
            >
              Apply for 2026 Grant
            </Link>

            <a
              href="#report"
              className="inline-flex items-center justify-center px-6 py-3.5 font-sans text-base font-medium text-dark-green bg-transparent border-2 border-dark-green rounded-lg hover:bg-sage-green hover:border-sage-green transition duration-200"
            >
              2025 Annual Giving Report
            </a>

            <a
              href="mailto:hello@wsfongfamilyfund.com"
              className="inline-flex items-center justify-center px-6 py-3.5 font-sans text-base font-medium text-dark-green bg-transparent border-2 border-dark-green rounded-lg hover:bg-sage-green hover:border-sage-green transition duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE 2025 ANNUAL REPORT FLIPBOOK */}
      <section
        id="report"
        className="min-h-screen bg-cream py-16 px-6 flex flex-col items-center justify-center border-t border-sage-green/20"
      >
        <div className="mx-auto max-w-4xl w-full text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-dark-green font-bold mb-2">
            2025 Annual Giving Report
          </h2>
          <p className="text-dark-green/70 text-sm md:text-base mb-8 font-medium">
            {PAGE_TITLES[currentPage]} (Use on-screen buttons or arrow keys to flip pages)
          </p>

          {/* Flipbook Card with real images */}
          <div className="relative mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-sage-green/30 aspect-[3/4] max-w-md md:max-w-lg flex items-center justify-center">
            <img
              src={`https://www.wsfongfamilyfund.com/report/${currentPage}.png`}
              alt={`2025 Annual Report - Page ${currentPage}`}
              className="w-full h-full object-contain select-none"
            />

            {/* Prev Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-dark-green text-cream hover:bg-sage-green hover:text-dark-green disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === TOTAL_PAGES}
              aria-label="Next Page"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-dark-green text-cream hover:bg-sage-green hover:text-dark-green disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Page Counter */}
          <div className="mt-6 text-dark-green font-semibold text-sm">
            Page {currentPage} of {TOTAL_PAGES}
          </div>
        </div>
      </section>
    </main>
  );
}