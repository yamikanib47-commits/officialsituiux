import React from 'react';
import { BROWSE_DEALS, DealItem } from '../data/mockData';

interface BrowseDealsProps {
  onSelectDeal?: (deal: DealItem) => void;
}

export const BrowseDeals: React.FC<BrowseDealsProps> = ({ onSelectDeal }) => {
  return (
    <section id="browse" className="max-w-[1280px] mx-auto px-4 sm:px-6 my-8 sm:my-12">
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 uppercase text-center mb-6 font-sans">
        BROWSE SOURCING BENCHMARKS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {BROWSE_DEALS.map((deal) => (
          <button
            key={deal.id}
            type="button"
            onClick={() => onSelectDeal && onSelectDeal(deal)}
            className="group bg-[#ece8e2] hover:bg-[#e4dfd7] rounded-2xl overflow-hidden p-3 sm:p-4 flex flex-col justify-between items-center transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md cursor-pointer text-left w-full"
          >
            {/* Car Product Card Image */}
            <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl mb-3 bg-white/40">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title Label */}
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 text-center tracking-tight group-hover:text-black">
              {deal.title}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
};
