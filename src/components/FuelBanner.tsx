import React from 'react';
import { Info, X } from 'lucide-react';

export const FuelBanner: React.FC = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 my-6 md:my-8">
      <div className="bg-[#121212] rounded-2xl overflow-hidden shadow-xl border border-neutral-800 grid grid-cols-1 md:grid-cols-12 relative">
        {/* Tiny Ad Info Tag */}
        <div className="absolute top-2.5 right-3 z-20 flex items-center gap-1.5 text-neutral-400 hover:text-white text-[11px] bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded">
          <Info className="w-3 h-3" />
          <X className="w-3 h-3 cursor-pointer" />
        </div>

        {/* Left Column: Text & CTA */}
        <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-white z-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[0.95] mb-4 font-sans">
              I PITY THE FUEL!
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-200 font-medium max-w-lg mb-6 leading-snug">
              Feeling the pinch at the pump? Explore fuel-efficient hybrid engines and clean energy options.*
            </p>

            <a
              href="#electric"
              className="inline-block bg-white hover:bg-neutral-100 text-black font-extrabold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Explore fuel savers
            </a>
          </div>

          <p className="text-[10px] text-neutral-400 mt-6 leading-relaxed max-w-md">
            *Based on hybrid fuel economy benchmarks versus conventional V6/V8 petrol consumption. Inquire with AutoAce sourcing coordinators for real-world consumption figures.
          </p>
        </div>

        {/* Right Column: Mint Green Container with Yellow EV Car */}
        <div className="md:col-span-5 bg-[#1cdbb4] relative flex items-center justify-center min-h-[220px] sm:min-h-[260px] md:min-h-[300px] overflow-hidden p-4">
          <img
            src="/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg"
            alt="Vibrant modern electric hatchback"
            className="w-full h-full object-cover md:object-contain transform scale-105 hover:scale-110 transition-transform duration-500 rounded-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};
