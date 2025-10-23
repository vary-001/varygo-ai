// src/components/Loader.jsx
import React, { useEffect, useState, useRef } from 'react';

function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('initial');
  const audioRef = useRef(null);

  useEffect(() => {
    // Play sound when loader starts
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setPhase('complete');
          // Fade out sound before completing
          if (audioRef.current) {
            const fadeOut = setInterval(() => {
              if (audioRef.current.volume > 0.05) {
                audioRef.current.volume -= 0.05;
              } else {
                clearInterval(fadeOut);
                audioRef.current.pause();
              }
            }, 100);
          }
          setTimeout(() => onLoadingComplete(), 1200);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Animate elements after small delay
    setTimeout(() => {
      setPhase('animating');
    }, 600);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-varygo-blue-dark via-varygo-purple to-varygo-blue-dark overflow-hidden"
      onClick={() => setProgress(prev => Math.min(prev + 10, 100))}
    >
      {/* Sound */}
      <audio ref={audioRef} src="/sounds/intro.mp3" preload="auto" />

      {/* Glowing Aura */}
      <div className="absolute inset-0 bg-gradient-to-t from-varygo-purple/40 to-transparent animate-pulse-slow"></div>

      {/* Animated Logo */}
      <div className={`relative w-64 h-64 mb-8 transition-transform duration-1000 ${phase === 'animating' ? 'scale-105' : 'scale-90'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-gradient-to-r from-varygo-gold to-varygo-orange-light rounded-full shadow-2xl animate-pulse ring-4 ring-varygo-gold/30"></div>
        </div>
        
        <svg className="absolute inset-0 w-full h-full loader-mountain" viewBox="0 0 200 200">
          <path d="M40 120 L100 40 L160 120 Z" fill="url(#mountainGradient)" stroke="#5F7C4B" strokeWidth="2" />
          <path d="M20 140 L60 80 L100 140 Z" fill="url(#mountainGradient2)" stroke="#5F7C4B" strokeWidth="2" />
          <path d="M120 140 L140 100 L160 140 Z" fill="url(#mountainGradient3)" stroke="#5F7C4B" strokeWidth="2" />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3D3452" />
              <stop offset="100%" stopColor="#6D4067" />
            </linearGradient>
            <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5F7C4B" />
              <stop offset="100%" stopColor="#3D3452" />
            </linearGradient>
            <linearGradient id="mountainGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C04225" />
              <stop offset="100%" stopColor="#6D4067" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-varygo-green-savanna to-varygo-gold rounded-t-xl opacity-80"></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-varygo-gold rounded-full animate-float opacity-70"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 4) * 15}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + (i % 2)}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Text */}
      <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-varygo-gold via-varygo-orange-light to-varygo-red animate-gradient mb-2">
        VARYGO AI
      </h1>
      <p className="text-varygo-text-light/80 text-lg mb-6 animate-pulse">
        {progress < 100 ? "Preparing your Rwandan adventure..." : "Welcome to VaryGo AI!"}
      </p>

      {/* Progress Bar */}
      <div className="w-64 bg-varygo-blue-dark/60 rounded-full h-2 mb-4 overflow-hidden shadow-md">
        <div 
          className="h-full bg-gradient-to-r from-varygo-gold to-varygo-orange-light rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Percentage */}
      <span className="text-varygo-text-light/70 text-sm">
        {progress < 100 ? `${progress}%` : 'Ready to Explore!'}
      </span>

      {/* Icons Row */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-varygo-text-light/70 text-sm">
        <div className="flex items-center gap-2"><i className="fas fa-mountain text-varygo-gold"></i> Volcanoes</div>
        <div className="flex items-center gap-2"><i className="fas fa-paw text-varygo-gold"></i> Wildlife</div>
        <div className="flex items-center gap-2"><i className="fas fa-landmark text-varygo-gold"></i> Culture</div>
      </div>
    </div>
  );
}

export default Loader;
