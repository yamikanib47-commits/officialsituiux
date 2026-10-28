import React, { useRef } from 'react';
import { Zap, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import { REVOLUTION_TOOLS } from '../data/mockData';

export const ElectricRevolution: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#f7f6f5] py-10 sm:py-14 border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#f0edff] flex items-center justify-center text-[#6852f5]">
            <Zap className="w-5 h-5 fill-[#8574ff] text-[#6852f5]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              Join the electric revolution!
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium">
              Check out our electric car tools and other helpful advice
            </p>
          </div>
        </div>

        {/* 3 Interactive Cards */}
        <div className="relative group mb-8">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
          >
            {REVOLUTION_TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={`#tool-${tool.id}`}
                className="min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] flex-1 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-neutral-200 transition-all group/card flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                  {tool.isMap ? (
                    /* Stylized Charging Point Map with pins */
                    <div className="w-full h-full bg-[#ede9fe]/40 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <div className="absolute top-4 left-6 bg-white/90 px-2 py-0.5 rounded text-[10px] font-semibold text-neutral-700 shadow">
                        Lusaka CBD
                      </div>
                      <div className="absolute bottom-6 right-8 bg-white/90 px-2 py-0.5 rounded text-[10px] font-semibold text-neutral-700 shadow">
                        Ndola / Kitwe
                      </div>
                      {/* Map Pins */}
                      <div className="absolute top-1/4 left-1/3 text-[#8574ff] animate-bounce">
                        <MapPin className="w-6 h-6 fill-[#8574ff] text-[#553ee6]" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 text-[#8574ff]">
                        <MapPin className="w-6 h-6 fill-[#8574ff] text-[#553ee6]" />
                      </div>
                      <div className="absolute bottom-1/3 right-1/4 text-[#8574ff]">
                        <MapPin className="w-6 h-6 fill-[#8574ff] text-[#553ee6]" />
                      </div>
                      <div className="absolute top-1/3 right-1/3 text-[#8574ff]">
                        <MapPin className="w-5 h-5 fill-[#8574ff] text-[#553ee6]" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={tool.image}
                      alt={tool.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                {/* Title */}
                <div className="p-4">
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 group-hover/card:text-[#553ee6] transition-colors leading-snug">
                    {tool.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute -right-3 top-[40%] w-9 h-9 rounded-full bg-white text-black shadow-lg border border-neutral-200 items-center justify-center hover:bg-neutral-50 z-10"
            aria-label="Next tools"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Full-width Compare Button */}
        <div className="text-center">
          <a
            href="#compare"
            className="block w-full py-3.5 px-6 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg text-sm sm:text-base font-extrabold text-neutral-900 transition-colors shadow-sm"
          >
            Compare the best electric cars
          </a>
        </div>
      </div>
    </section>
  );
};
