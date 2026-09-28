import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum display time in ms (default: 1400ms)
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete,
  minDuration = 1400 
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Lock body scrolling while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / minDuration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Start smooth fade out
        setTimeout(() => {
          setIsFadingOut(true);
        }, 150);

        // Completely unmount after fade transition (700ms)
        setTimeout(() => {
          setIsMounted(false);
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 850);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, [minDuration, onComplete]);

  // Fast skip if tapped/clicked
  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 300);
  };

  if (!isMounted) return null;

  return (
    <div 
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] h-[100dvh] w-full flex flex-col items-center justify-center bg-[#030c1c] text-white select-none transition-all duration-700 ease-out cursor-pointer ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ touchAction: 'none' }}
      aria-label="Loading Jitto Cleaning Services"
      role="dialog"
      aria-modal="true"
    >
      {/* Ambient Pulsing Glow Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-jitto-cyan/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-jitto-navy-500/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Brand Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* Official Logo with Smooth Subtle Float */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-jitto-cyan/20 via-white/10 to-jitto-cyan/20 rounded-3xl blur-xl opacity-75 animate-pulse" />
          
          <img 
            src="/images/logo-splash.png" 
            alt="Jitto Cleaning Services" 
            className="relative w-52 sm:w-64 h-auto drop-shadow-2xl transition-transform duration-700 ease-out animate-in zoom-in-95 duration-500"
          />
        </div>

        {/* Brand Slogan */}
        <p className="text-xs sm:text-sm font-light text-slate-300 tracking-wide mb-6">
          A cleaner space. <span className="text-jitto-cyan font-normal">More time for what matters.</span>
        </p>

        {/* High-End Slim Progress Track */}
        <div className="w-48 sm:w-56 h-1 bg-white/10 rounded-full overflow-hidden p-0 relative mb-4">
          <div 
            className="h-full bg-gradient-to-r from-jitto-cyan-400 via-white to-jitto-cyan rounded-full transition-all duration-75 ease-out shadow-glow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text & Location Pill */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          <Sparkles className="w-3 h-3 text-jitto-cyan animate-spin" style={{ animationDuration: '4s' }} />
          <span>Barrie & Simcoe County • 24/7</span>
        </div>

      </div>

      {/* Skip Hint (Accessible at bottom) */}
      <div className="absolute bottom-6 text-[10px] text-slate-500 tracking-wider">
        Tap anywhere to enter
      </div>
    </div>
  );
};
