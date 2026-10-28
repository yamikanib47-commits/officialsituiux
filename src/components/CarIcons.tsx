import React from 'react';

export const CarSilhouette: React.FC<{ type: string; className?: string }> = ({ type, className = 'w-16 h-8' }) => {
  switch (type) {
    case 'suvs':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* SUV Profile */}
          <path d="M5 36 h8 a7 7 0 0 0 14 0 h46 a7 7 0 0 0 14 0 h8 v-8 l-8-12 h-26 l-14-6 h-28 l-9 14 h-4 v12 z" />
          <circle cx="20" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="80" cy="36" r="6" strokeWidth="2.5" />
          <path d="M30 24 h22 v10 h-22 z" strokeWidth="1.5" />
          <path d="M56 24 h22 l5 10 h-27 z" strokeWidth="1.5" />
        </svg>
      );
    case 'hatchbacks':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Hatchback Profile */}
          <path d="M6 36 h8 a7 7 0 0 0 14 0 h46 a7 7 0 0 0 14 0 h6 v-6 l-10-18 h-30 l-18 10 h-10 v14 z" />
          <circle cx="20" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="80" cy="36" r="6" strokeWidth="2.5" />
          <path d="M30 22 h20 v12 h-20 z" strokeWidth="1.5" />
          <path d="M54 22 h18 l6 12 h-24 z" strokeWidth="1.5" />
        </svg>
      );
    case 'saloons':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Saloon / Sedan */}
          <path d="M4 36 h8 a7 7 0 0 0 14 0 h48 a7 7 0 0 0 14 0 h8 v-7 l-16-7 l-12-10 h-24 l-16 10 l-10 4 v10 z" />
          <circle cx="19" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="81" cy="36" r="6" strokeWidth="2.5" />
          <path d="M32 23 h18 v11 h-18 z" strokeWidth="1.5" />
          <path d="M54 23 h16 l8 11 h-24 z" strokeWidth="1.5" />
        </svg>
      );
    case 'coupes':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Coupe */}
          <path d="M4 36 h8 a7 7 0 0 0 14 0 h48 a7 7 0 0 0 14 0 h8 v-6 l-18-6 l-20-12 h-16 l-18 11 l-6 4 v9 z" />
          <circle cx="19" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="81" cy="36" r="6" strokeWidth="2.5" />
          <path d="M34 23 h24 l12 11 h-36 z" strokeWidth="1.5" />
        </svg>
      );
    case 'estate-cars':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Estate / Wagon */}
          <path d="M4 36 h8 a7 7 0 0 0 14 0 h48 a7 7 0 0 0 14 0 h8 v-10 l-4-10 h-44 l-18 8 h-8 v12 z" />
          <circle cx="19" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="81" cy="36" r="6" strokeWidth="2.5" />
          <path d="M28 20 h22 v12 h-22 z" strokeWidth="1.5" />
          <path d="M54 20 h22 v12 h-22 z" strokeWidth="1.5" />
        </svg>
      );
    case 'people-carriers':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* MPV / People Carrier */}
          <path d="M4 36 h8 a7 7 0 0 0 14 0 h48 a7 7 0 0 0 14 0 h8 v-12 l-4-12 h-40 l-22 14 h-4 v10 z" />
          <circle cx="19" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="81" cy="36" r="6" strokeWidth="2.5" />
          <path d="M28 18 h18 v14 h-18 z" strokeWidth="1.5" />
          <path d="M50 18 h16 v14 h-16 z" strokeWidth="1.5" />
          <path d="M70 18 h10 v14 h-10 z" strokeWidth="1.5" />
        </svg>
      );
    case 'sports-cars':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Sports Car low stance */}
          <path d="M3 36 h8 a7 7 0 0 0 14 0 h50 a7 7 0 0 0 14 0 h7 v-4 l-14-8 l-24-10 h-16 l-19 9 l-9 5 v8 z" />
          <circle cx="18" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="82" cy="36" r="6" strokeWidth="2.5" />
          <path d="M34 23 h24 l12 9 h-36 z" strokeWidth="1.5" />
        </svg>
      );
    case 'convertibles':
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Convertible open top */}
          <path d="M4 36 h8 a7 7 0 0 0 14 0 h48 a7 7 0 0 0 14 0 h8 v-6 l-14-6 h-18 l-10-8 h-4 l-10 8 h-8 v12 z" />
          <circle cx="19" cy="36" r="6" strokeWidth="2.5" />
          <circle cx="81" cy="36" r="6" strokeWidth="2.5" />
          <path d="M42 22 l-6 10" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="20" cy="35" r="6" />
          <circle cx="80" cy="35" r="6" />
          <path d="M5 35 h9 a6 6 0 0 0 12 0 h48 a6 6 0 0 0 12 0 h9 v-8 l-12-12 h-34 l-14 8 h-10 v12 z" />
        </svg>
      );
  }
};



export const TrustpilotStars: React.FC<{ count?: number; className?: string }> = ({ count = 5, className = 'w-4 h-4' }) => (
  <div className="flex items-center gap-1">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="bg-[#00b67a] p-1 flex items-center justify-center">
        <svg className={`${className} text-white fill-white`} viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    ))}
  </div>
);
