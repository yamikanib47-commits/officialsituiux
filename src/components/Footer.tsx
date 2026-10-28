import React from 'react';
import { RatingStars } from './CarIcons';
import { AutoaceLogo } from './AutoaceLogo';

interface FooterProps {
  onNavigateToHome?: () => void;
  onOpenAgentModal?: () => void;
  onOpenCoordinatorPortal?: () => void;
  onNavigateToBuy?: () => void;
  onNavigateToSell?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToHome,
  onOpenAgentModal,
  onOpenCoordinatorPortal,
  onNavigateToBuy,
  onNavigateToSell,
}) => {
  return (
    <footer className="bg-[#111111] text-white pt-12 pb-20 border-t border-neutral-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Top Brand Banner with official Autoace Footer Logo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="hover:opacity-90 transition-opacity text-left cursor-pointer"
              title="Autoace Home"
            >
              <AutoaceLogo variant="dark-footer" className="w-[150px] h-[150px] object-contain" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
            </button>
            <span className="hidden sm:inline-block h-6 w-px bg-neutral-800"></span>
            <p className="text-xs font-semibold text-neutral-400">
              Zambia’s Premier Digital Automotive Sourcing & Deals Platform
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Zed Verified Dealer Network</span>
          </div>
        </div>

        {/* Top 4-Column Navigation Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-neutral-800">
          {/* Col 1: Help Centre & Hours */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-3">
              Coordination Desk
            </h4>
            <div className="space-y-1 text-xs text-neutral-300 font-medium">
              <p>Monday to Friday 08:30 - 17:30</p>
              <p>Saturday 09:00 - 14:00</p>
              <p className="text-neutral-400 font-semibold">Sundays: Emergency WhatsApp Sourcing only</p>
              <p className="text-[#8574ff] pt-1 font-semibold">Lusaka & Nationwide Network</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3.5 mt-5 text-neutral-300">
              <a href="#" className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-neutral-700 transition-colors" aria-label="Facebook">
                <span className="font-black text-xs">f</span>
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-neutral-700 transition-colors" aria-label="X (Twitter)">
                <span className="font-black text-xs">𝕏</span>
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-neutral-700 transition-colors" aria-label="Instagram">
                <span className="font-black text-xs">📸</span>
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center hover:text-white hover:bg-neutral-700 transition-colors" aria-label="YouTube">
                <span className="font-black text-xs">▶</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services & Workflow */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-3">
              Vehicle Services
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-300">
              <li>
                <button type="button" onClick={onNavigateToBuy} className="hover:text-white hover:underline text-left">
                  Vehicle Sourcing Request
                </button>
              </li>
              <li>
                <button type="button" onClick={onNavigateToSell} className="hover:text-white hover:underline text-left">
                  Submit Vehicle for Sale
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenAgentModal} className="hover:text-[#8574ff] hover:underline text-left text-[#8574ff]">
                  Join as an Authorized Agent
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenCoordinatorPortal} className="hover:text-white hover:underline text-left text-neutral-400">
                  Lead Management Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coverage Towns */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-3">
              Operating Hubs
            </h4>
            <ul className="space-y-1.5 text-xs font-medium text-neutral-300">
              <li>Lusaka (Central, Woodlands, Roma, Industrial)</li>
              <li>Ndola & Kitwe (Copperbelt Hub)</li>
              <li>Livingstone & Southern Province</li>
              <li>Nakonde & Chirundu Border Logistics</li>
              <li>Solwezi & Northwestern Region</li>
            </ul>
          </div>

          {/* Col 4: Customer Review Badge */}
          <div className="flex flex-col items-start lg:items-end justify-start">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white">Rated Excellent</span>
              <RatingStars count={5} className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              <span className="underline font-semibold cursor-pointer">4.8 / 5.0</span> on <span className="text-[#00b67a] font-bold">★ Customer Reviews</span>
            </p>
            <p className="text-[10px] text-neutral-500 mt-2 text-left lg:text-right">
              Trusted by private car buyers, sellers, and corporate fleets in Zambia.
            </p>
          </div>
        </div>

        {/* Middle Legal & Territory */}
        <div className="pt-6 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2.5">
            <AutoaceLogo variant="dark-mode" className="w-[150px] h-[150px] object-contain opacity-85" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
            <p>© 2026 Autoace. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <a href="#" className="hover:text-white hover:underline">Terms & conditions</a>
            <span>·</span>
            <a href="#" className="hover:text-white hover:underline">Privacy policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white hover:underline">Sourcing code of conduct</a>
            <span>·</span>
            <a href="#" className="hover:text-white hover:underline">Anti-fraud verification</a>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-bold bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800 text-xs">
              <span>🇿🇲</span> Zambia Network
            </span>
          </div>
        </div>

        {/* Detailed Honest Operational Disclaimers */}
        <div className="pt-6 space-y-3 text-[10px] text-neutral-400 leading-relaxed">
          <p>
            Autoace operates as an automotive sourcing and procurement coordination platform in Zambia. We are not a franchised motor dealership, finance lender, or physical car yard. We connect buyers and sellers directly with independent vehicle agents, clearing brokers, and pre-vetted private sellers.
          </p>
          <p>
            All prices and benchmarks shown in Zambian Kwacha (ZMW) reflect estimated market averages, recent agent transactions, or indicative import quotations. Actual final transaction prices, delivery timelines, duty assessments, and vehicle conditions are confirmed directly with the supplying agent or seller prior to contract agreement. Autoace does not guarantee speculative automated valuations.
          </p>
        </div>
      </div>
    </footer>
  );
};
