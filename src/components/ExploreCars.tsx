import React from 'react';
import { CAR_TYPES, CAR_MANUFACTURERS, POPULAR_USED_MODELS } from '../data/mockData';
import { CarSilhouette } from './CarIcons';

// Manufacturer logo helper
const ManufacturerBadge: React.FC<{ name: string }> = ({ name }) => {
  // Simple distinctive vector glyphs matching automotive badges
  return (
    <div className="w-6 h-6 rounded flex items-center justify-center text-neutral-800 shrink-0">
      {name === 'Audi' ? (
        <span className="text-[10px] font-black tracking-[-2px] border border-neutral-700 rounded-full px-1 py-0.5">
          ○○○○
        </span>
      ) : name === 'BMW' ? (
        <span className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center font-bold text-[8px]">
          BMW
        </span>
      ) : name === 'Mercedes-Benz' ? (
        <span className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center font-bold text-[10px]">
          ★
        </span>
      ) : name === 'Tesla' ? (
        <span className="font-extrabold text-xs">T</span>
      ) : name === 'Volkswagen' ? (
        <span className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center font-bold text-[8px]">
          VW
        </span>
      ) : name === 'Porsche' ? (
        <span className="font-serif font-black text-[9px] border border-neutral-800 px-1">
          P
        </span>
      ) : name === 'Volvo' ? (
        <span className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center font-bold text-[9px]">
          ♂
        </span>
      ) : name === 'Renault' ? (
        <span className="font-black text-xs transform rotate-45 border border-neutral-800 w-3.5 h-3.5 block"></span>
      ) : name === 'Toyota' ? (
        <span className="font-black text-[9px] border border-neutral-800 rounded-full px-1">
          Ө
        </span>
      ) : name === 'Ferrari' ? (
        <span className="font-black text-[10px] italic">SF</span>
      ) : name === 'Ford' ? (
        <span className="italic font-serif font-bold text-[9px] border border-neutral-700 rounded-full px-1">
          Ford
        </span>
      ) : (
        <span className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center text-[9px] font-bold text-neutral-700">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
};

export const ExploreCars: React.FC = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 my-10 sm:my-14">
      <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2">
        Explore cars
      </h2>

      {/* 1. Browse by car type */}
      <div className="mb-12">
        <h3 className="text-base sm:text-lg font-bold text-neutral-800 mb-4">
          Browse by car type
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CAR_TYPES.map((type) => (
            <a
              key={type.id}
              href={`#type-${type.id}`}
              className="bg-white hover:bg-neutral-50 rounded-xl p-3 sm:p-4 border border-neutral-200/80 shadow-sm hover:shadow transition-all flex flex-col items-center justify-between text-center group"
            >
              <div className="w-full flex items-center justify-center text-neutral-700 group-hover:text-black transition-colors mb-2">
                <CarSilhouette type={type.id} className="w-16 h-9" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-black">
                {type.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 2. Browse by car manufacturer */}
      <div className="mb-14">
        <h3 className="text-base sm:text-lg font-bold text-neutral-800 mb-6">
          Browse by car manufacturer
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-3.5">
          {CAR_MANUFACTURERS.map((maker) => (
            <a
              key={maker}
              href={`#make-${maker.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-2.5 text-neutral-800 hover:text-black hover:translate-x-0.5 transition-all group py-1"
            >
              <ManufacturerBadge name={maker} />
              <span className="text-xs sm:text-sm font-semibold tracking-tight group-hover:underline">
                {maker}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 3. Popular used car models */}
      <div className="pt-8 border-t border-neutral-200">
        <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mb-6">
          Popular used car models
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3">
          {POPULAR_USED_MODELS.map((model) => (
            <a
              key={model}
              href={`#used-${model.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#553ee6] hover:underline transition-colors py-0.5"
            >
              {model}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
