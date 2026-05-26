import { Link } from "react-router-dom";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { services } from "@/data/data";
import { motion } from "framer-motion";

import serviceTarot from "@/assets/images/service_tarot.webp";
import serviceAstrology from "@/assets/images/service_astrology.webp";
import serviceLove from "@/assets/images/service_love.webp";
import serviceCareer from "@/assets/images/service_career.webp";
import serviceHealing from "@/assets/images/service_healing.webp";
import serviceNumerology from "@/assets/images/service_numerology.webp";


const serviceImages = {
  "tarot-reading": serviceTarot,
  "kundli-analysis": serviceAstrology,
  "love-relationship": serviceLove,
  "career-guidance": serviceCareer,
  "spiritual-healing": serviceHealing,
  "numerology": serviceNumerology,
};

// Atmospheric aura colors corresponding to the spiritual nature of each service
const serviceAuras = {
  "tarot-reading": "from-purple/25 to-purple-deep/10",
  "kundli-analysis": "from-gold/20 via-purple/15 to-background",
  "love-relationship": "from-rose-500/15 via-gold/10 to-background",
  "career-guidance": "from-blue-600/15 via-gold/10 to-background",
  "spiritual-healing": "from-purple/20 via-purple-deep/15 to-gold/10",
  "numerology": "from-gold/15 via-purple/15 to-purple-deep/10",
};

export default function Services() {
  return (
    <>
      {/* Services Premium Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 border-b border-gold/10 bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={50} />
        </div>
        
        {/* Dynamic spinning coordinate overlays */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 z-[5]">
          <div className="h-[550px] w-[550px] rounded-full border border-gold/5 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-purple/8 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "50s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Spotlight Backlights */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-purple/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-gold/5 blur-[90px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "14s" }} />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
          >
            <Sparkles className="h-3 w-3" /> Sacred Offerings
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium"
          >
            Spiritual Services & <span className="text-gradient-cosmic">Cosmic Guidance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide"
          >
            Discover personalized astrology, tarot, and spiritual healing experiences designed to bring clarity, balance, and transformation.
          </motion.p>
        </div>
      </section>

      {/* Services Redesigned Showcase Grid */}
      <section className="py-20 relative overflow-hidden bg-background/30">
        <div className="mx-auto max-w-6xl space-y-20 px-6 md:px-8">
          {services.map((s, i) => {
            const isImageLeft = i % 2 !== 0;
            const imgPath = serviceImages[s.slug];
            const auraColor = serviceAuras[s.slug] || "from-purple/20 to-gold/10";
            
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <div className="group relative overflow-hidden rounded-3xl glass p-8 md:p-12 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_15px_45px_rgba(212,175,55,0.08)] bg-card/10">
                  {/* Subtle inner-card background glow */}
                  <div className={`absolute -top-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-br ${auraColor} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
                  
                  <div className="grid gap-10 md:grid-cols-12 items-center">
                    
                    {/* Visual Gem Column */}
                    <div className={`md:col-span-5 relative w-full aspect-square ${isImageLeft ? "md:order-1" : "md:order-2"}`}>
                      {/* Ambient Shadow & Aura Backlight */}
                      <div className={`absolute -inset-2 bg-gradient-to-tr ${auraColor} rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none`} />
                      
                      {/* Glass Frame Container */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/20 shadow-[0_15px_30px_rgba(0,0,0,0.5)] bg-background/20 backdrop-blur-sm transition-all duration-700 group-hover:border-gold/45 group-hover:shadow-gold/15">
                        <img
                          src={imgPath}
                          alt={s.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        
                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-purple-deep/10 pointer-events-none" />
                        
                        {/* Gold Corner Highlights */}
                        <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold/45 pointer-events-none" />
                        <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold/45 pointer-events-none" />
                        <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold/45 pointer-events-none" />
                        <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold/45 pointer-events-none" />
                      </div>
                    </div>

                    {/* Content Editorial Column */}
                    <div className={`md:col-span-7 flex flex-col justify-between h-full ${isImageLeft ? "md:order-2" : "md:order-1"}`}>
                      <div>
                        {/* Time Duration Badge */}
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs text-gold font-medium uppercase tracking-wider">
                          <Clock className="h-3.5 w-3.5" /> {s.duration}
                        </div>

                        {/* Title */}
                        <h3 className="mt-5 font-display text-3xl md:text-4xl text-foreground/95 group-hover:text-gold transition-colors duration-300">
                          {s.title}
                        </h3>

                        {/* Spiritual Tagline */}
                        <p className="mt-2 text-sm italic font-medium text-gold/80 tracking-wide">
                          {s.short}
                        </p>

                        {/* Description */}
                        <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground/90">
                          {s.description}
                        </p>

                        {/* Gold Divider */}
                        <div className="my-6 border-t border-gold/10" />

                        {/* Benefits Grid */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          {s.benefits.map((b) => (
                            <div key={b} className="flex items-start gap-2.5 text-sm text-foreground/90">
                              <div className="grid h-4.5 w-4.5 place-items-center rounded bg-gold/10 border border-gold/25 text-gold shrink-0 mt-0.5 animate-pulse">
                                <Sparkles className="h-3 w-3" />
                              </div>
                              <span className="leading-snug">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA button rows */}
                      <div className="mt-8 flex flex-wrap gap-4">
                        <Link to="/booking" className="group inline-flex items-center gap-2.5 rounded-full btn-gold px-7 py-3 text-sm font-semibold">
                          Book Consultation
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link to="/contact" className="inline-flex items-center gap-2.5 rounded-full btn-outline-gold px-7 py-3 text-sm font-semibold">
                          Ask a Question
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
