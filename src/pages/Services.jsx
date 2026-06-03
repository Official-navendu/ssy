import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Sparkles, X, CheckCircle2, MessageSquare, Compass, Shield, ChevronRight } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { services } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/utils/site";
import { BentoCard } from "@/components/common/BentoCard";

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
  const [selectedService, setSelectedService] = useState(null);

  // Esc key closure for detailed modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when modal is active
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService]);

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
            className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium uppercase"
          >
            Spiritual Services & <span className="text-gradient-cosmic">Cosmic Guidance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide font-light"
          >
            Discover personalized Vedic astrology, intuitive tarot divination, and customized energy healing experiences structured to bring clarity, alignment, and emotional stability.
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
                <BentoCard className="group glass p-8 md:p-12 bg-card/10">
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
                          <Clock className="h-3.5 w-3.5 animate-pulse text-gold" /> {s.duration}
                        </div>

                        {/* Title */}
                        <h3 className="mt-5 font-display text-3xl md:text-4xl text-foreground/95 group-hover:text-gold transition-colors duration-300 uppercase tracking-wide">
                          {s.title}
                        </h3>

                        {/* Spiritual Tagline */}
                        <p className="mt-2 text-sm italic font-medium text-gold/80 tracking-wide">
                          {s.short}
                        </p>

                        {/* Description */}
                        <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light tracking-wide">
                          {s.description}
                        </p>

                        {/* Gold Divider */}
                        <div className="my-6 border-t border-gold/10" />

                        {/* Benefits Grid */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          {s.benefits.slice(0, 4).map((b) => (
                            <div key={b} className="flex items-start gap-2.5 text-xs text-foreground/90 font-light tracking-wide">
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
                        <button 
                          onClick={() => setSelectedService(s)}
                          className="group inline-flex items-center gap-2 rounded-full btn-premium-glow px-6 py-3 text-xs font-semibold uppercase tracking-widest cursor-pointer"
                        >
                          View Modality Details
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <Link to="/booking" className="group inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest">
                          Book Consultation
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </BentoCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Details Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glassmorphic backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/30 bg-background/95 p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-h-[85vh] overflow-y-auto"
            >
              {/* Corner highlights */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/40 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/45 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full border border-gold/25 bg-background/50 hover:bg-gold/15 hover:border-gold/50 text-foreground transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold w-fit">
                  <Clock className="h-3.5 w-3.5" /> {selectedService.duration} Consultation
                </div>

                <h2 className="mt-4 font-display text-2xl md:text-3.5xl text-gradient-gold uppercase tracking-wide">
                  {selectedService.title}
                </h2>

                <p className="mt-2 text-xs md:text-sm italic font-medium text-gold/80 tracking-wide">
                  {selectedService.short}
                </p>

                {/* Main Overview */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Service Overview</h3>
                  <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light tracking-wide">
                    {selectedService.fullOverview}
                  </p>
                </div>

                {/* Areas Covered */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Areas & Metrics Covered</h3>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {selectedService.areasCovered.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-foreground/90 font-light tracking-wide">
                        <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5 animate-pulse" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key takeaways / benefits */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Client Benefits</h3>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {selectedService.benefits.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 font-light tracking-wide">
                        <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer buttons inside modal */}
                <div className="mt-8 pt-6 border-t border-gold/10 flex flex-wrap gap-4 justify-end">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="rounded-full border border-gold/25 bg-transparent hover:bg-gold/10 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground cursor-pointer transition-colors"
                  >
                    Close Modal
                  </button>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hello Shivani Spiritual Yatri, I would like to book the "${selectedService.title}" consultation. Please share details.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full btn-premium-glow px-6 py-3 text-xs font-semibold uppercase tracking-widest cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" /> WhatsApp Book
                  </a>
                  <Link
                    to="/booking"
                    onClick={() => setSelectedService(null)}
                    className="group inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest"
                  >
                    Book Appointment <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
