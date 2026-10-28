import React, { useRef } from 'react';
import { POPULAR_REVIEWS, LATEST_NEWS, LATEST_VIDEOS } from '../data/mockData';
import { Play, ChevronRight, ChevronLeft } from 'lucide-react';

export const EditorialDarkSection: React.FC = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#111111] text-white py-12 sm:py-16 border-t border-b border-neutral-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Mat Watson Intro Lockup */}
        <div className="flex items-start gap-4 mb-12 max-w-3xl">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#8574ff] shrink-0 bg-neutral-800">
            <img
              src="/src/assets/images/car_review_mat_suv_1793016494055.jpg"
              alt="Mat Watson"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans">
              WE MAKE CAR CHANGING EASY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal mt-1 leading-relaxed">
              I'm Mat Watson and I'm here with my team of expert writers to make car-changing easy. Our detailed car reviews and helpful news and advice articles have got you covered.
            </p>
          </div>
        </div>

        {/* 1. Most popular car reviews */}
        <div className="mb-14">
          <h3 className="text-lg sm:text-xl font-extrabold text-white mb-4">
            Most popular car reviews
          </h3>

          <div className="relative group">
            <div
              ref={reviewsRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
            >
              {POPULAR_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] flex-1 group/card cursor-pointer"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-neutral-900 border border-neutral-800 relative">
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-white underline underline-offset-2 hover:text-[#8574ff] transition-colors mb-1.5">
                    {review.title}
                  </h4>

                  <span className="inline-block bg-[#8574ff] text-neutral-950 font-black text-xs px-2 py-0.5 rounded-sm">
                    {review.score}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollContainer(reviewsRef, 'right')}
              className="hidden lg:flex absolute -right-3 top-[35%] w-9 h-9 rounded-full bg-white text-black shadow-xl items-center justify-center hover:bg-neutral-200 z-10"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          <div className="mt-6">
            <a
              href="#reviews"
              className="inline-block bg-white hover:bg-neutral-200 text-black font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-md transition-colors"
            >
              Read more reviews
            </a>
          </div>
        </div>

        {/* 2. Helpful advice and latest car news */}
        <div className="mb-14">
          <h3 className="text-lg sm:text-xl font-extrabold text-white mb-4">
            Helpful advice and latest car news
          </h3>

          <div className="relative group">
            <div
              ref={newsRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
            >
              {LATEST_NEWS.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] flex-1 group/card cursor-pointer"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-neutral-900 border border-neutral-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug hover:text-[#8574ff] transition-colors underline underline-offset-2">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollContainer(newsRef, 'right')}
              className="hidden lg:flex absolute -right-3 top-[35%] w-9 h-9 rounded-full bg-white text-black shadow-xl items-center justify-center hover:bg-neutral-200 z-10"
              aria-label="Next news"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          <div className="mt-6">
            <a
              href="#news"
              className="inline-block bg-white hover:bg-neutral-200 text-black font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-md transition-colors"
            >
              View more car news
            </a>
          </div>
        </div>

        {/* 3. Latest videos */}
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white mb-4">
            Latest videos
          </h3>

          <div className="relative group">
            <div
              ref={videosRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
            >
              {LATEST_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="min-w-[280px] sm:min-w-[340px] lg:min-w-[380px] flex-1 group/card cursor-pointer"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-neutral-900 border border-neutral-800 relative">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                    {/* Purple Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-black/30 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-neutral-950 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug hover:text-[#8574ff] transition-colors underline underline-offset-2">
                    {video.title}
                  </h4>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollContainer(videosRef, 'right')}
              className="hidden lg:flex absolute -right-3 top-[35%] w-9 h-9 rounded-full bg-white text-black shadow-xl items-center justify-center hover:bg-neutral-200 z-10"
              aria-label="Next videos"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          <div className="mt-6">
            <a
              href="#videos"
              className="inline-block bg-white hover:bg-neutral-200 text-black font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-md transition-colors"
            >
              View more videos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
