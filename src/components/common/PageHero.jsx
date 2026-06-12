import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { CosmicBackground } from "./CosmicBackground";

export function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 border-b border-gold/10 bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CosmicBackground density={50} />
      </div>
      
      {/* Dynamic spinning coordinate overlays (Matching Services/Products exactly) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 z-[5]">
        <div className="h-[550px] w-[550px] rounded-full border border-gold/5 animate-spin-slow" />
        <div className="absolute inset-16 rounded-full border border-sapphire/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "50s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Spotlight Backlights */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-sapphire/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "10s" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-gold/5 blur-[90px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "14s" }} />

        {/* Premium Breadcrumb navigation */}
        <div className="flex items-center justify-center gap-2.5 mb-5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">
          <Link to="/" className="hover:text-gold transition-colors font-medium">Home</Link>
          <span className="text-gold/40">/</span>
          <span className="text-gold/90 font-light">{eyebrow || "Page"}</span>
        </div>

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
          >
            <Sparkles className="h-3 w-3" /> {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium uppercase"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide font-light"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
