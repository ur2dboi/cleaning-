import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'transparent';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = false,
  size = 'md',
  onClick
}) => {
  const sizeClasses = {
    sm: 'h-8 md:h-9',
    md: 'h-11 md:h-12',
    lg: 'h-14 md:h-16',
    xl: 'h-20 md:h-24'
  };

  // Image source:
  // variant dark uses the dark background logo (white text + cyan chevron)
  // variant transparent uses the transparent cutout
  // variant light uses the uploaded official logo or transparent
  const imgSrc = variant === 'dark' 
    ? '/images/logo-dark.png' 
    : '/images/logo-transparent.png';

  return (
    <div 
      className={`inline-flex flex-col items-start cursor-pointer select-none transition-transform duration-200 hover:opacity-95 ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <img 
          src={imgSrc} 
          alt="Jitto Cleaning Services Logo" 
          className={`${sizeClasses[size]} w-auto object-contain drop-shadow-sm`}
          onError={(e) => {
            // Fallback if image path has issue
            (e.target as HTMLImageElement).src = '/images/logo.png';
          }}
        />
      </div>
      {showTagline && (
        <span className={`text-[10px] tracking-widest font-semibold uppercase mt-0.5 ${
          variant === 'dark' ? 'text-jitto-cyan' : 'text-jitto-navy-700'
        }`}>
          A Cleaner Space. More Time For What Matters.
        </span>
      )}
    </div>
  );
};
