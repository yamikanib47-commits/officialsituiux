import React, { useState } from 'react';
import { Search, ArrowRight, Car, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onNavigateToBuy?: () => void;
  onNavigateToSell?: (carPhrase?: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigateToBuy, onNavigateToSell }) => {
  const [activeTab, setActiveTab] = useState<'sell' | 'find' | 'reviews'>('sell');
  const [carPhrase, setCarPhrase] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedPhrase, setSubmittedPhrase] = useState(false);

  const popularSuggestions = [
    '2009 Toyota Mark X',
    '2015 Toyota Hilux GD-6',
    '2010 Honda Fit',
    '2014 Nissan Dualis',
    '2012 Mercedes C-Class',
    '2016 Ford Ranger',
  ];

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigateToSell) {
      onNavigateToSell(carPhrase.trim());
    } else {
      setSubmittedPhrase(true);
      setTimeout(() => setSubmittedPhrase(false), 3000);
    }
  };

  const handleFindSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigateToBuy) {
      onNavigateToBuy();
    }
  };

  return (
    <section className="relative bg-[#111111] text-white pt-8 pb-14 overflow-hidden border-b border-neutral-800">
      {/* Sleek Automotive Full-Bleed Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
          alt="Automotive background"
          className="w-full h-full object-cover object-center brightness-[0.32] contrast-[1.1] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-[#111111]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Top EV Choice Banner Badge */}
        <a
          href="#just-listed"
          className="inline-flex items-center justify-center gap-3 group mb-8 hover:opacity-95 transition-all"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-white font-sans">
                MAKE THE SMART CHOICE
              </h1>
              <span className="w-8 h-8 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
              Save up to K90,000 on duty relief and fuel-saver incentives. Explore verified deals now!
            </p>
          </div>
        </a>

        {/* Central Search / Sell Widget Container */}
        <div className="max-w-[660px] mx-auto bg-[#222222] rounded-2xl p-4 sm:p-6 shadow-2xl border border-neutral-700/60 backdrop-blur-sm">
          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 pb-4 mb-4 border-b border-neutral-700/50">
            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`text-sm sm:text-[15px] font-bold pb-1 transition-colors relative cursor-pointer ${
                activeTab === 'sell'
                  ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8574ff]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sell my car
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('find')}
              className={`text-sm sm:text-[15px] font-bold pb-1 transition-colors relative cursor-pointer ${
                activeTab === 'find'
                  ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8574ff]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Find a car
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`text-sm sm:text-[15px] font-bold pb-1 transition-colors relative cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8574ff]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Read reviews
            </button>
          </div>

          {/* Tab 1: Sell my car (Phrase-based Zambian lookup) */}
          {activeTab === 'sell' && (
            <form onSubmit={handleSellSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-neutral-200 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-[#8574ff]" />
                    What are you selling?
                  </span>
                  <span className="text-[11px] text-neutral-400 font-normal">
                    Zambia Marketplace (K)
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="relative flex-1 bg-white rounded-lg flex items-center shadow-inner overflow-hidden focus-within:ring-2 focus-within:ring-[#8574ff]">
                    <input
                      type="text"
                      value={carPhrase}
                      onChange={(e) => setCarPhrase(e.target.value)}
                      placeholder="e.g. 2009 Toyota Mark X"
                      className="w-full font-bold text-base sm:text-lg text-slate-900 px-3.5 py-3 outline-none bg-white placeholder:text-neutral-400 placeholder:font-normal"
                    />
                  </div>

                  {/* Sell CTA button */}
                  <button
                    type="submit"
                    className="bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base px-6 py-3 rounded-lg transition-colors whitespace-nowrap shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    Value my car
                  </button>
                </div>
              </div>

              {/* Quick suggestion pills */}
              <div className="pt-1">
                <p className="text-[11px] text-neutral-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#8574ff]" />
                  Popular models in Zambia:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {popularSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setCarPhrase(suggestion)}
                      className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        carPhrase.toLowerCase() === suggestion.toLowerCase()
                          ? 'bg-[#8574ff] text-neutral-950 font-bold shadow-xs'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {submittedPhrase ? (
                <p className="text-xs text-[#8574ff] font-semibold animate-in fade-in">
                  Calculating instant valuation in Zambian Kwacha (K) for {carPhrase}...
                </p>
              ) : (
                <p className="text-xs text-neutral-400 text-center sm:text-left">
                  Instant Kwacha valuation from verified buyers & dealers in Lusaka, Copperbelt & nationwide.
                </p>
              )}

              <p className="text-xs sm:text-sm text-neutral-300 font-medium pt-1 text-center sm:text-left">
                <span className="text-white font-semibold">Sell your car</span> fast, fair, and without fees
              </p>
            </form>
          )}

          {/* Tab 2: Find a car */}
          {activeTab === 'find' && (
            <form onSubmit={handleFindSubmit} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by make, model (e.g. Hilux, Mark X, Fit)..."
                  className="w-full bg-white text-neutral-900 pl-4 pr-12 py-3.5 rounded-lg text-sm sm:text-base font-medium outline-none focus:ring-2 focus:ring-[#8574ff]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 bg-[#8574ff] text-neutral-950 rounded-md hover:bg-[#7360f2] transition-colors cursor-pointer"
                  title="Search"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-300">
                <span>or explore our catalog</span>
                <button
                  type="button"
                  onClick={onNavigateToBuy}
                  className="font-bold text-white underline underline-offset-4 hover:text-[#8574ff] transition-colors cursor-pointer"
                >
                  Browse cars in Zambia
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: Read reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search car reviews e.g. Toyota Prado, Mark X, Hilux..."
                  className="w-full bg-white text-neutral-900 pl-4 pr-12 py-3.5 rounded-lg text-sm sm:text-base font-medium outline-none focus:ring-2 focus:ring-[#8574ff]"
                />
                <button
                  type="button"
                  className="absolute right-1.5 p-2 bg-[#8574ff] text-neutral-950 rounded-md hover:bg-[#7360f2] transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
              <p className="text-xs text-neutral-400">
                Over 450+ detailed motoring reviews tested for Zambian road conditions & fuel efficiency
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
