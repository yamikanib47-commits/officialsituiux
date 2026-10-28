import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export const BottomStickyBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#8574ff] text-neutral-950 py-2.5 px-4 shadow-lg border-t border-[#7360f2] transition-all duration-300">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between text-center relative">
        <a
          href="#electric"
          className="flex-1 text-center font-extrabold text-xs sm:text-sm tracking-tight hover:underline flex items-center justify-center gap-1.5 text-neutral-950"
        >
          <span>Diesel near K33 a litre? Compare hybrid & electric fuel savers</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </a>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="p-1 rounded-full hover:bg-black/10 transition-colors text-neutral-950 cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
