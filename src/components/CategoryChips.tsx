import React, { useRef, useState } from 'react';
import { CATEGORY_CHIPS } from '../data/mockData';
import { Zap, Tag, Sparkles, Car, Truck, Shield, BatteryCharging, Briefcase, Coins, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryChipsProps {
  onNavigateToShowroom?: () => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ onNavigateToShowroom }) => {
  const [selectedChip, setSelectedChip] = useState('just-listed');
  const scrollRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-4 h-4 text-[#8574ff] fill-[#8574ff]" />;
      case 'tag':
        return <Tag className="w-4 h-4 text-neutral-600" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-neutral-600" />;
      case 'car':
        return <Car className="w-4 h-4 text-neutral-600" />;
      case 'truck':
        return <Truck className="w-4 h-4 text-neutral-600" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-neutral-600" />;
      case 'battery-charging':
        return <BatteryCharging className="w-4 h-4 text-neutral-600" />;
      case 'briefcase':
        return <Briefcase className="w-4 h-4 text-neutral-600" />;
      case 'coins':
        return <Coins className="w-4 h-4 text-neutral-600" />;
      default:
        return <Car className="w-4 h-4 text-neutral-600" />;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-b border-neutral-200 py-3 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative flex items-center">
        {/* Left Scroll Arrow */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-2 z-10 w-7 h-7 rounded-full bg-white shadow-md border border-neutral-200 items-center justify-center text-neutral-700 hover:bg-neutral-50"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Chips Container */}
        <div
          ref={scrollRef}
          className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1 w-full px-2"
        >
          {CATEGORY_CHIPS.map((chip) => {
            const isSelected = selectedChip === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setSelectedChip(chip.id);
                  if (onNavigateToShowroom) onNavigateToShowroom();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {getIcon(chip.icon)}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Arrow */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-2 z-10 w-7 h-7 rounded-full bg-white shadow-md border border-neutral-200 items-center justify-center text-neutral-700 hover:bg-neutral-50"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
