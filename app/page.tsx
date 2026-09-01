'use client';

import { useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 16;

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sage-green-light/20">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-dark-green text-warm-gold flex items-center justify-center font-serif text-lg font-bold">
              WS
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-dark-green">
              W.S. Fong Family Fund
            </span>
          </div>
          <a
            href="mailto:contact@wsfongfamilyfund.com"
            className="bg-dark-green text-cream px-4 py-2 rounded-full hover:bg-dark-green-hover transition-colors text-xs font-semibold uppercase"
          >
            Contact Us
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6 max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-green leading-tight mb-8">
            W.S. Fong Family Fund
          </h1>
          <p className="text-lg text-dark-green/85 leading-relaxed mb-10 max-w-3xl mx-auto">
            The W.S. Fong Family Fund is a way for our family to come together and make a meaningful impact by donating to causes we care about. Each year, a small group of family members will research and select charities to receive a donation from our family fund.
          </p>
        </section>

        {/* Interactive 2025 Flipbook Section */}
        <section id="report" className="py-16 px-6 bg-white border-t border-sage-green-light/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-green">Publication</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark-green mt-1">
                2025 Annual Report
              </h2>
            </div>

            {/* Flipbook Viewer Container */}
            <div className="relative bg-cream-dark rounded-2xl shadow-xl border border-sage-green-light/30 overflow-hidden flex flex-col min-h-[460px]">
              {/* Top toolbar */}
              <div className="bg-dark-green text-cream px-6 py-3 flex items-center justify-between text-xs tracking-wide">
                <span className="font-serif font-semibold text-warm-gold">2025 Annual Report</span>
                <span className="font-mono bg-dark-green/50 px-2.5 py-1 rounded-md text-cream">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              {/* Page Visual Canvas */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                <span className="inline-block bg-warm-gold/20 text-warm-gold border border-warm-gold px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold mb-6">
                  {currentPage === 1 ? 'Cover' : 'Report Details'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-dark-green mb-4">
                  {currentPage === 1 ? 'W.S. Fong Family Fund Report' : `Section ${currentPage}`}
                </h3>
                <p className="text-dark-green/80 max-w-md mx-auto">
                  {currentPage === 1 
                    ? 'Welcome to our 2025 annual review. Use the buttons below to flip through our philanthropy updates.'
                    : 'Detailed documentation of our 2025 charitable allocations, grantee updates, and committee notes.'}
                </p>
              </div>

              {/* Viewer Controls */}
              <div className="bg-cream border-t border-sage-green-light/30 px-6 py-4 flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-sage-green text-dark-green text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sage-green/10 transition"
                >
                  Previous
                </button>
                <div className="text-xs text-dark-green font-medium">
                  {currentPage === 1 ? 'Cover page' : `Page ${currentPage}`}
                </div>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-dark-green text-cream text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-green-hover transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-dark-green text-cream-dark py-8 px-6 text-center text-sm">
        <p>© 2025 W.S. Fong Family Fund. All rights reserved.</p>
      </footer>
    </div>
  );
}