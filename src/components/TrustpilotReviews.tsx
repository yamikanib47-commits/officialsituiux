import React, { useRef } from 'react';
import { TRUSTPILOT_REVIEWS } from '../data/mockData';
import { TrustpilotStars } from './CarIcons';
import { Star, CheckCircle, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

export const TrustpilotReviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 my-10 sm:my-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#f0edff] flex items-center justify-center text-[#6852f5]">
          <Star className="w-5 h-5 fill-[#8574ff] text-[#6852f5]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            This is how it should feel
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium">
            Our customers rate us as <span className="font-bold text-neutral-800">'Excellent'</span> on Trustpilot
          </p>
        </div>
      </div>

      {/* Trustpilot Grid / Carousel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#faf9f8] p-4 sm:p-6 rounded-2xl border border-neutral-200/70">
        {/* Score Column */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-4 lg:pb-0">
          <span className="text-xl font-extrabold text-neutral-900 mb-1">Excellent</span>
          <TrustpilotStars count={5} className="w-5 h-5" />
          <p className="text-xs text-neutral-500 mt-2">
            Based on <span className="underline font-semibold cursor-pointer">85,840 reviews</span>
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs text-[#00b67a] font-black">★ Trustpilot</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">Showing our 5 star reviews</p>
        </div>

        {/* Reviews Cards */}
        <div className="lg:col-span-9 relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {TRUSTPILOT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="min-w-[240px] sm:min-w-[280px] bg-white p-4 rounded-xl border border-neutral-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <TrustpilotStars count={review.stars} className="w-3.5 h-3.5" />
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00b67a]">
                        <CheckCircle className="w-3 h-3 fill-[#00b67a] text-white" />
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-neutral-400 mb-1">
                    <span className="font-bold text-neutral-800">{review.name}</span>, {review.timeAgo}
                  </p>

                  <h4 className="text-xs font-bold text-neutral-900 mb-1 line-clamp-1">
                    {review.title}
                  </h4>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {review.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-neutral-200 items-center justify-center text-neutral-700 hover:bg-neutral-50"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-neutral-200 items-center justify-center text-neutral-700 hover:bg-neutral-50"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* With partners we trust banner */}
      <div className="flex items-center gap-3 mt-8 pt-4">
        <div className="w-8 h-8 rounded-full bg-[#f0edff] flex items-center justify-center text-[#6852f5] shrink-0">
          <Heart className="w-5 h-5 fill-[#8574ff] text-[#6852f5]" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
            With partners we trust
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            We connect you with all the major manufacturers and thousands of hand-picked dealers.
          </p>
        </div>
      </div>
    </section>
  );
};
