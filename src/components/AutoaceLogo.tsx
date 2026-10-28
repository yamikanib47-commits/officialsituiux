import React from 'react';

export type AutoaceLogoVariant = 'dark-mode' | 'light-mode' | 'dark-footer' | 'light-footer';

export interface AutoaceLogoProps {
  variant?: AutoaceLogoVariant;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export const AUTOACE_LOGO_PATHS: Record<AutoaceLogoVariant, string> = {
  'dark-mode': '/assets/aistudio/Dark_Mode_3e5061b4.svg',
  'light-mode': '/assets/aistudio/Light_Mode_f41ff2df.svg',
  'dark-footer': '/assets/aistudio/Dark_Mode_Footer_3dcbd997.svg',
  'light-footer': '/assets/aistudio/Light_Mode_Footer_9760bd02.svg',
};

export const AutoaceLogo: React.FC<AutoaceLogoProps> = ({
  variant = 'dark-mode',
  className = 'w-[150px] h-[150px] object-contain',
  alt = 'Autoace',
  style,
}) => {
  const src = AUTOACE_LOGO_PATHS[variant] || AUTOACE_LOGO_PATHS['dark-mode'];

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '150px', height: '150px', objectFit: 'contain', ...style }}
      className={`select-none shrink-0 w-[150px] h-[150px] object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};

export default AutoaceLogo;
