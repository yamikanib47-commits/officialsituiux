import React, { useRef } from 'react';
import { TRENDING_CARS } from '../data/mockData';
import { Sparkles, ChevronRight, ChevronLeft, ArrowRight, Zap } from 'lucide-react';

interface ElectricTrendingProps {
  onNavigateToShowroom?: () => void;
  onNavigateToDeal?: (carId: string) => void;
}

export const ElectricTrending: React.FC<ElectricTrendingProps> = ({
  onNavigateToShowroom,
  onNavigateToDeal,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="just-listed" className="max-w-[1280px] mx-auto px-4 sm:px-6 my-10 sm:my-14 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f0edff] flex items-center justify-center text-[#6852f5] border border-[#8574ff]/20">
            <Sparkles className="w-5 h-5 text-[#6852f5]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
              <span>Just Listed</span>
              <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8574ff] text-neutral-950">
                New
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium">
              Freshly inspected arrivals and verified dealer deals in Zambia
            </p>
          </div>
        </div>

        {/* See More that directs to /showroom */}
        <button
          type="button"
          onClick={onNavigateToShowroom}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#553ee6] hover:text-[#3f2cb8] group cursor-pointer self-start sm:self-auto"
        >
          <span>See more in showroom</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Cards Container with Nav Arrow */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        >
          {TRENDING_CARS.map((car) => (
            <div
              key={car.id}
              className="min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] flex-1 bg-[#ece8e2] rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 border border-neutral-200/60"
            >
              <div>
                {/* Header row of card */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight">
                      {car.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                      {car.subtitle}
                    </p>
                  </div>

                  {car.badge && (
                    <span className="inline-flex items-center gap-1 bg-[#ede9fe] text-[#4f39f6] text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      <Zap className="w-3 h-3 fill-[#4f39f6]" />
                      {car.badge}
                    </span>
                  )}
                </div>

                {/* Average Saving Tag */}
                <div className="mt-2 mb-4">
                  <span className="inline-block bg-[#111111] text-[#8574ff] text-[11px] font-extrabold px-2.5 py-1 rounded-sm">
                    {car.avgSaving}
                  </span>
                </div>

                {/* Car Studio Photography */}
                <div className="w-full aspect-[16/10] bg-white/60 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-2 shadow-inner">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover object-center rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Bottom Price Strip */}
              <div className="pt-3 border-t border-neutral-300/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-neutral-600">
                    Cash from <span className="font-extrabold text-neutral-900 text-sm">{car.cashPrice}</span>
                  </p>
                  <p className="text-xs font-semibold text-neutral-600">
                    Lease from <span className="font-extrabold text-neutral-900 text-sm">{car.leasePrice}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToDeal) {
                      onNavigateToDeal('audi-a3-sportback');
                    } else if (onNavigateToShowroom) {
                      onNavigateToShowroom();
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-black text-white hover:bg-neutral-800 flex items-center justify-center transition-colors shadow cursor-pointer"
                  aria-label={`View deal for ${car.name}`}
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Scroll Buttons */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-neutral-300 items-center justify-center text-neutral-800 hover:bg-neutral-100 z-10"
          aria-label="Previous cars"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-neutral-300 items-center justify-center text-neutral-800 hover:bg-neutral-100 z-10"
          aria-label="Next cars"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
