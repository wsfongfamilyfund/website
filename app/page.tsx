"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const TOTAL_PAGES = 16;

export default function Home() {
  // Grandparents photo intro animation state
  const [heroVisible, setHeroVisible] = useState(true);
  const [heroRendered, setHeroRendered] = useState(true);

  // Book spread page state (0 = cover, 2 = pages 2 & 3, 4 = pages 4 & 5, etc.)
  const [currentSpread, setCurrentSpread] = useState(0);

  useEffect(() => {
    // Start fading out the grandparents photo after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setHeroVisible(false);
    }, 1600);

    // Completely remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setHeroRendered(false);
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Flip handlers (jumps 2 pages for realistic book spread)
  const prevSpread = useCallback(() => {
    setCurrentSpread((s) => Math.max(0, s - 2));
  }, []);

  const nextSpread = useCallback(() => {
    setCurrentSpread((s) => Math.min(TOTAL_PAGES, s + 2));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSpread();
      if (e.key === "ArrowRight") nextSpread();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSpread, nextSpread]);

  // Determine left and right page numbers
  const leftPageNum = currentSpread === 0 ? null : currentSpread;
  const rightPageNum = currentSpread === 0 ? 1 : currentSpread + 1 <= TOTAL_PAGES ? currentSpread + 1 : null;

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#2D3E2F] flex flex-col relative font-sans overflow-x-hidden">
      
      {/* 1. GRANDPARENTS HERO PHOTO OVERLAY (Fades away smoothly) */}
      {heroRendered && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F0] transition-opacity duration-1000 ease-out pointer-events-none ${
            heroVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative max-w-sm md:max-w-md w-11/12 max-h-[80vh] flex flex-col items-center">
            <img
              src="https://www.wsfongfamilyfund.com/hero.jpg"
              alt="W.S. Fong & Family"
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-[#2D3E2F] mb-8 font-normal tracking-wide">
            W.S. Fong Family Fund
          </h1>

          <div className="space-y-6 text-[#2D3E2F]/90 font-sans text-lg leading-relaxed text-left md:text-center font-normal">
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

          {/* CTA BUTTONS */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-7 py-3 min-h-12 font-sans text-base font-medium text-[#F5F5F0] bg-[#374738] rounded-lg shadow-md hover:bg-[#4A5D4B] transition duration-200"
            >
              Apply for 2026 Grant
            </Link>

            <a
              href="#report"
              className="inline-flex items-center justify-center px-7 py-3 min-h-12 font-sans text-base font-medium text-[#F5F5F0] bg-[#374738] rounded-lg shadow-md hover:bg-[#4A5D4B] transition duration-200"
            >
              2025 Annual Giving Report
            </a>

            <a
              href="mailto:hello@wsfongfamilyfund.com"
              className="inline-flex items-center justify-center px-7 py-3 min-h-12 font-sans text-base font-medium text-[#2D3E2F] bg-transparent border-2 border-[#2D3E2F] rounded-lg hover:bg-[#2D3E2F]/10 transition duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 2-PAGE BOOK SPREAD REPORT */}
      <section
        id="report"
        className="min-h-screen bg-[#F5F5F0] py-20 px-4 md:px-12 flex flex-col items-center justify-center border-t border-[#8FA89B]/20"
      >
        <div className="max-w-6xl w-full flex flex-col items-center">
          
          {/* Main Book Display Container */}
          <div className="relative w-full max-w-5xl flex items-center justify-center">
            
            {/* Left Prev Arrow Button */}
            <button
              onClick={prevSpread}
              disabled={currentSpread === 0}
              aria-label="Previous Page"
              className="absolute -left-2 md:-left-6 z-20 flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#526353] text-[#F5F5F0] hover:bg-[#3D4D3E] disabled:opacity-30 disabled:cursor-not-allowed transition shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* 2-Page Book Spread */}
            <div className="w-full bg-[#EAE8E1] rounded-lg shadow-2xl p-1 md:p-3 flex items-stretch border border-black/10 aspect-[3/2] max-h-[80vh] overflow-hidden">
              
              {/* Left Page */}
              <div className="flex-1 bg-[#F5F5F0] relative overflow-hidden flex items-center justify-center border-r border-black/10 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.06)]">
                {leftPageNum ? (
                  <img
                    src={`https://www.wsfongfamilyfund.com/report/${leftPageNum}.png`}
                    alt={`Page ${leftPageNum}`}
                    className="w-full h-full object-contain select-none"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F5F5F0]" />
                )}
              </div>

              {/* Right Page */}
              <div className="flex-1 bg-[#F5F5F0] relative overflow-hidden flex items-center justify-center shadow-[inset_10px_0_20px_rgba(0,0,0,0.06)]">
                {rightPageNum ? (
                  <img
                    src={`https://www.wsfongfamilyfund.com/report/${rightPageNum}.png`}
                    alt={`Page ${rightPageNum}`}
                    className="w-full h-full object-contain select-none"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F5F5F0]" />
                )}
              </div>
            </div>

            {/* Right Next Arrow Button */}
            <button
              onClick={nextSpread}
              disabled={currentSpread >= TOTAL_PAGES - 1}
              aria-label="Next Page"
              className="absolute -right-2 md:-right-6 z-20 flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#526353] text-[#F5F5F0] hover:bg-[#3D4D3E] disabled:opacity-30 disabled:cursor-not-allowed transition shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Page Counter Indicator */}
          <div className="mt-8 text-sm md:text-base text-[#2D3E2F]/80 font-medium tracking-wide">
            {currentSpread === 0 ? (
              "Cover Page"
            ) : (
              `Pages ${leftPageNum} – ${rightPageNum || leftPageNum} of ${TOTAL_PAGES}`
            )}
          </div>
        </div>
      </section>
    </main>
  );
}