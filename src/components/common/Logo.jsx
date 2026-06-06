import React from "react";

export function Logo({ variant = "header", className = "" }) {
  const isFooter = variant === "footer";
  const size = isFooter ? "h-11 w-11" : "h-10 w-10";
  
  return (
    <div className={`flex items-center gap-3 ${className} group`}>
      <div className={`relative ${size} shrink-0`}>
        {/* Breathing glowing aura behind logo */}
        <div className={`absolute inset-0 rounded-full blur-md opacity-40 transition-all duration-500 ${
          isFooter 
            ? "bg-gold/10 group-hover:bg-gold/25 group-hover:scale-110" 
            : "bg-gold/15 group-hover:bg-gold/30 group-hover:scale-110"
        } pointer-events-none`} />
        
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full transition-transform duration-1000 group-hover:rotate-[45deg]"
        >
          {/* Definitions for Gradients and Shadows */}
          <defs>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F1E8" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#C7A85A" />
            </linearGradient>
            <linearGradient id="logoSapphire" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#163B73" />
              <stop offset="100%" stopColor="#0D1117" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Astrology Coordinate Ring / Orbit */}
          <circle 
            cx="50" 
            cy="50" 
            r="46" 
            stroke="url(#logoGold)" 
            strokeWidth="0.8" 
            strokeDasharray="4 3" 
            className="opacity-45"
          />

          {/* Inner Sacred Geometry Circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="url(#logoGold)" 
            strokeWidth="1.2" 
            className="opacity-70"
          />

          {/* Four Cardinal Compass Points / Astrological Markers */}
          <line x1="50" y1="5" x2="50" y2="12" stroke="url(#logoGold)" strokeWidth="1.5" />
          <line x1="50" y1="88" x2="50" y2="95" stroke="url(#logoGold)" strokeWidth="1.5" />
          <line x1="5" y1="50" x2="12" y2="50" stroke="url(#logoGold)" strokeWidth="1.5" />
          <line x1="88" y1="50" x2="95" y2="50" stroke="url(#logoGold)" strokeWidth="1.5" />

          {/* Diagonal Astrological Markers */}
          <circle cx="25" cy="25" r="1.5" fill="url(#logoGold)" />
          <circle cx="75" cy="25" r="1.5" fill="url(#logoGold)" />
          <circle cx="25" cy="75" r="1.5" fill="url(#logoGold)" />
          <circle cx="75" cy="75" r="1.5" fill="url(#logoGold)" />

          {/* Subtly Floating Constellation Stars */}
          <circle cx="34" cy="36" r="0.8" fill="#FFF" className="opacity-70" />
          <circle cx="68" cy="64" r="0.8" fill="#FFF" className="opacity-70" />
          <circle cx="64" cy="30" r="1" fill="url(#logoGold)" className="opacity-90" />

          {/* Majestic Crescent Moon (Vedic / Lunar Symbol of intuition) */}
          <path 
            d="M62 50C62 59.9411 53.9411 68 44 68C39.0294 68 34.5294 65.9853 31.2941 62.7206C36.2353 63.8529 42.1471 62.1529 46.1471 58.1529C51.1471 53.1529 51.7206 45.7206 50.7206 39.7206C54.7206 41.7206 62 43.5 62 50Z" 
            fill="url(#logoGold)" 
            filter="url(#goldGlow)"
          />

          {/* Inner Mystical Star (Vedic Star of destiny/divine guidance) */}
          <path 
            d="M40 40L44 28L48 40L60 44L48 48L44 60L40 48L28 44L40 40Z" 
            fill="#FFFFFF" 
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]"
          />

          {/* Lotus Petal Base (Vedic / Spiritual Awakening) */}
          <path 
            d="M36 68C36 68 40 60 50 60C60 60 64 68 64 68C64 68 58 71 50 71C42 71 36 68 36 68Z" 
            fill="url(#logoSapphire)" 
            className="opacity-75"
          />
          <path 
            d="M44 66C44 66 47 62 50 62C53 62 56 66 56 66" 
            stroke="url(#logoGold)" 
            strokeWidth="0.8" 
          />
        </svg>
      </div>
      
      {/* Typography Column */}
      <div className="flex flex-col justify-center text-left">
        <span className={`font-display font-medium tracking-wide leading-tight ${
          isFooter 
            ? "text-xl text-gradient-gold" 
            : "text-lg md:text-xl text-gradient-gold group-hover:text-shadow-gold transition-all duration-300"
        }`}>
          Shivani
        </span>
        <span className={`tracking-[0.3em] text-muted-foreground uppercase leading-none font-semibold mt-0.5 ${
          isFooter 
            ? "text-[9px]" 
            : "text-[9px] md:text-[10px]"
        }`}>
          Spiritual Yatri
        </span>
      </div>
    </div>
  );
}
