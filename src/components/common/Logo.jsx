import React from "react";
import logoHorizontal from "@/assets/images/logo_horizontal.png";

export function Logo({ variant = "header", className = "" }) {
  const isFooter = variant === "footer";
  
  // Responsive height classes:
  // Desktop: 60px (lg:h-[60px])
  // Tablet: 52px (md:h-[52px])
  // Mobile: 44px (h-[44px])
  const sizeClasses = isFooter 
    ? "h-[50px] md:h-[56px] lg:h-[64px]"
    : "h-[44px] md:h-[52px] lg:h-[60px]";

  return (
    <div className={`flex items-center gap-3 ${className} group`}>
      <div className={`relative ${sizeClasses} shrink-0`}>
        {/* Breathing glowing aura behind logo */}
        <div className={`absolute inset-0 rounded-full blur-md opacity-40 transition-all duration-500 ${
          isFooter 
            ? "bg-gold/10 group-hover:bg-gold/25 group-hover:scale-105" 
            : "bg-gold/15 group-hover:bg-gold/30 group-hover:scale-105"
        } pointer-events-none`} />
        
        <img 
          src={logoHorizontal} 
          alt="Shivani Spiritual Yatri" 
          className="h-full w-auto object-contain rounded-lg border border-gold/15 shadow-md transition-transform duration-500 group-hover:scale-103"
          style={{ contentVisibility: "auto" }}
          loading="eager"
        />
      </div>
    </div>
  );
}

