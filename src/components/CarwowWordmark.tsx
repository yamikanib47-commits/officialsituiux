import React from 'react';
import { AutoaceLogo, AutoaceLogoVariant } from './AutoaceLogo';

export const CarwowAsteriskLogo: React.FC<{
  className?: string;
  darkText?: boolean;
  variant?: AutoaceLogoVariant;
  style?: React.CSSProperties;
}> = ({
  className = 'w-[150px] h-[150px] object-contain',
  darkText = true,
  variant,
  style,
}) => {
  const chosenVariant: AutoaceLogoVariant =
    variant || (darkText ? 'light-mode' : 'dark-mode');

  return (
    <AutoaceLogo
      variant={chosenVariant}
      className={`w-[150px] h-[150px] object-contain ${className}`}
      style={{ width: '150px', height: '150px', objectFit: 'contain', ...style }}
    />
  );
};

export default CarwowAsteriskLogo;
