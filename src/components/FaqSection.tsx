import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 my-10 sm:my-14">
      <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-6">
        Frequently Asked Questions
      </h2>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-[#fcfbfa] border border-neutral-200 rounded-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-neutral-900 hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-extrabold">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'transform rotate-180 text-black' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sourcing Platform Disclosure Note */}
      <div className="mt-8 pt-4">
        <p className="text-[11px] sm:text-xs text-neutral-500 italic leading-relaxed text-center sm:text-left">
          * AutoAce Zed is an independent vehicle sourcing and procurement coordination platform operating in Zambia. We connect buyers and sellers with authorized vehicle agents, clearing brokers, and pre-vetted private sellers. AutoAce Zed does not hold physical dealership stock or guarantee automatic bids. All vehicle condition checks, documentation, and handover processes are coordinated transparently with participating partners.
        </p>
      </div>
    </section>
  );
};
