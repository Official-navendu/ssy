import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { ArrowRight, Sparkles, Quote, PlayCircle, Compass, Award, Heart, ShieldCheck } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { services, testimonials, trust } from "@/data/data";
import { BentoCard } from "@/components/common/BentoCard";
import { StonesShowcase } from "@/components/home/StonesShowcase";
import aboutPreviewImg from "@/assets/images/about_preview.png";
import testimonialClientImg from "@/assets/images/testimonial_client.webp";

// Import premium spiritual image showcase assets
import heroAstrologyImg from "@/assets/images/hero_astrology.png";
import heroTarotImg from "@/assets/images/hero_tarot.png";
import heroHealingImg from "@/assets/images/hero_healing.png";
import heroPortalImg from "@/assets/images/hero_portal.png";

const HERO_SLIDES = [
  {
    id: 0,
    img: heroAstrologyImg,
    label: "Celestial Intelligence",
    heading: "Unlock Cosmic Clarity Through Ancient Wisdom",
    subtitle: "Map your custom birth blueprint, explore planetary transits, and align your life path with the choreography of the cosmos.",
    ctaText: "Explore Birth Chart",
    ctaLink: "/booking",
    secCtaText: "Explore Services",
    secCtaLink: "/services"
  },
  {
    id: 1,
    img: heroTarotImg,
    label: "Intuitive Divination",
    heading: "Align Your Energy With Divine Guidance",
    subtitle: "Gain immediate intuitive answers, decode hidden energetic path currents, and secure crystal clarity through premium tarot spreads.",
    ctaText: "Book Tarot Spread",
    ctaLink: "/booking",
    secCtaText: "See Offerings",
    secCtaLink: "/services"
  },
  {
    id: 2,
    img: heroHealingImg,
    label: "Energetic Restoration",
    heading: "Discover Your Spiritual Path & Inner Power",
    subtitle: "Purify your aura, dissolve heavy emotional blocks, and awaken your inner vital force through deep, custom chakra alignment.",
    ctaText: "Align Your Energy",
    ctaLink: "/booking",
    secCtaText: "Healing Guide",
    secCtaLink: "/services"
  },
  {
    id: 3,
    img: heroPortalImg,
    label: "Sacred Transformation",
    heading: "Transform Your Journey Through Astrology & Tarot",
    subtitle: "Step across the celestial threshold of self-realization, merging centuries-old Vedic lineage with modern spiritual alchemy.",
    ctaText: "Begin Alchemy",
    ctaLink: "/booking",
    secCtaText: "Explore Courses",
    secCtaLink: "/courses"
  }
];

function renderHeading(heading) {
  if (heading.includes("Cosmic Clarity")) {
    return (
      <>
        Unlock <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(212,175,55,0.25)]">Cosmic Clarity</span>
        <br /> Through Ancient Wisdom
      </>
    );
  }
  if (heading.includes("Divine Guidance")) {
    return (
      <>
        Align Your Energy
        <br /> With <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(212,175,55,0.25)]">Divine Guidance</span>
      </>
    );
  }
  if (heading.includes("Inner Power")) {
    return (
      <>
        Discover Your Path
        <br /> & <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(212,175,55,0.25)]">Inner Power</span>
      </>
    );
  }
  if (heading.includes("Astrology & Tarot")) {
    return (
      <>
        Transform Your Journey
        <br /> Through <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(212,175,55,0.25)]">Astrology & Tarot</span>
      </>
    );
  }
  return heading;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-scroll loop every 7 seconds for a calmer cinematic pacing
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[80vh] lg:h-[calc(100vh-80px)] lg:min-h-[580px] lg:max-h-[780px] items-center overflow-hidden pt-28 pb-10 md:pt-32 md:pb-12 lg:pt-20 lg:pb-10">
        {/* Galaxy Background Layer (z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={60} />
        </div>

        {/* Concentric Rotating Astrolabe & Celestial Rings Layer (z-[5]) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 sm:opacity-50 flex items-center justify-center z-[5] overflow-hidden">
          {/* Outer Gold Astrolabe Ring */}
          <div className="absolute h-[380px] w-[380px] sm:h-[680px] sm:w-[680px] rounded-full border border-gold/10 animate-spin-slow" style={{ animationDuration: "50s" }} />
          {/* Dashed Gold Orbit Ring */}
          <div className="absolute h-[320px] w-[320px] sm:h-[620px] sm:w-[620px] rounded-full border border-dashed border-gold/15 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "35s" }} />
          {/* Purple Energy Ring */}
          <div className="absolute h-[280px] w-[280px] sm:h-[520px] sm:w-[520px] rounded-full border border-purple/10 animate-spin-slow" style={{ animationDuration: "25s" }} />
          {/* Fine Outer Gold Ring */}
          <div className="absolute h-[240px] w-[240px] sm:h-[420px] sm:w-[420px] rounded-full border border-gold/5 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "60s" }} />
        </div>

        {/* Cinematic Dark Overlay Layer (z-10) */}
        <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

        {/* Hero Content Layer (z-20) */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Hero content */}
            <div className="col-span-1 lg:col-span-6 min-h-[340px] lg:min-h-[380px] flex flex-col justify-center relative">
              {/* Cinematic Divine Text Spotlights */}
              <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple/15 blur-[100px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "8s" }} />
              <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-gold/8 blur-[80px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "12s" }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="flex flex-col items-start text-left"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-glow-subtle">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-gold" />
                    {HERO_SLIDES[activeSlide].label}
                  </span>

                  <h1 className="mt-4 font-display text-2.5xl leading-[1.35] md:text-3.5xl lg:text-[2.45rem] tracking-[0.08em] font-medium text-glow-portal text-foreground uppercase">
                    {renderHeading(HERO_SLIDES[activeSlide].heading)}
                  </h1>

                  <p className="mt-4 max-w-lg text-[14px] md:text-[15px] text-muted-foreground leading-relaxed tracking-widest font-light text-glow-subtle">
                    {HERO_SLIDES[activeSlide].subtitle}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-6">
                    <Link to={HERO_SLIDES[activeSlide].ctaLink} className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-widest uppercase btn-premium-glow">
                      {HERO_SLIDES[activeSlide].ctaText}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link to={HERO_SLIDES[activeSlide].secCtaLink} className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-widest uppercase btn-outline-premium">
                      {HERO_SLIDES[activeSlide].secCtaText}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Premium Image Showcase */}
            <div className="col-span-1 lg:col-span-6 w-full">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.9 }}
                className="relative w-full"
              >
                {/* Glowing Aura behind the image showcase */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple/20 via-purple-deep/15 to-gold/10 rounded-2xl blur-3xl opacity-60 pointer-events-none" />

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full h-[320px] sm:h-[380px] lg:h-[410px]">
                  
                  {/* Large Main Image with Auto Carousel */}
                  <div className="relative w-full sm:flex-1 h-[260px] sm:h-full rounded-2xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-sm group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 pointer-events-none" />
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeSlide}
                        src={HERO_SLIDES[activeSlide].img}
                        alt={HERO_SLIDES[activeSlide].label}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1.02 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Minimal Corner badge */}
                    <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold/90 text-glow-subtle bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/15">
                        {HERO_SLIDES[activeSlide].label}
                      </span>
                    </div>

                    {/* Corner highlights */}
                    <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/45 pointer-events-none z-20" />
                    <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/45 pointer-events-none z-20" />
                    <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/45 pointer-events-none z-20" />
                    <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/45 pointer-events-none z-20" />
                  </div>

                  {/* 4 Smaller Side Images */}
                  <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-[90px] md:w-[100px] shrink-0 justify-between h-[70px] sm:h-full">
                    {HERO_SLIDES.map((slide, idx) => {
                      const isActive = idx === activeSlide;
                      return (
                        <button
                          key={slide.id}
                          onClick={() => setActiveSlide(idx)}
                          className={`relative flex-1 sm:flex-initial sm:w-full sm:h-[22%] h-full rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer group ${
                            isActive
                              ? "border-gold bg-gold/15 shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105 z-20"
                              : "border-gold/15 hover:border-gold/45 bg-black/45 hover:scale-102"
                          }`}
                        >
                          <img
                            src={slide.img}
                            alt={slide.label}
                            className={`w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.16,1,0.3,1] ${
                              isActive ? "scale-110 opacity-100" : "opacity-45 group-hover:opacity-85 group-hover:scale-105"
                            }`}
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-gold/5 backdrop-blur-[0.5px] mix-blend-overlay z-10" />
                          )}
                          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-1 text-[8px] font-bold text-gold text-center leading-tight uppercase tracking-widest z-20">
                            {slide.label.split(" ")[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {trust.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-gold">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold/30 to-purple/30 text-gold">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl text-gradient-gold">{t.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-20">
        <SectionHeading
          eyebrow="Sacred Offerings"
          title={<>Spiritual Services <span className="text-gradient-gold">Crafted For You</span></>}
          subtitle="Each session is a personal journey — designed to bring clarity, healing, and direction to your life."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-7 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-purple/20 blur-3xl transition-opacity group-hover:bg-gold/20" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-purple text-background">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <Link
                    to="/services"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:gap-2.5 transition-all"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STONES SHOWCASE */}
      <StonesShowcase />

      {/* ABOUT PREVIEW */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:px-8">
          <Reveal>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-md aspect-[4/5] group/about"
            >
              {/* Ambient Cosmic Aura Backlight */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple/40 via-purple-deep/30 to-gold/25 rounded-[2.5rem] blur-3xl opacity-60 group-hover/about:opacity-85 transition-opacity duration-700 pointer-events-none" />

              {/* Slow Spinning Gold-Purple Halo */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-gold via-purple/50 to-gold/30 opacity-40 blur-md animate-spin-slow group-hover/about:opacity-60 transition-all duration-700 -z-10" />

              {/* Glassmorphism Border Frame */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-background/20 backdrop-blur-sm transition-all duration-700 group-hover/about:border-gold/55 group-hover/about:shadow-gold/20">
                
                {/* Premium Image with Parallax Hover effect */}
                <motion.img
                  src={aboutPreviewImg}
                  alt="Shivani Spiritual Yatri"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/about:scale-105"
                />

                {/* Elegant Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-purple-deep/10 pointer-events-none" />
                
                {/* Subtle Sparkle Overlays */}
                <div className="absolute top-4 right-4 text-gold/30 animate-pulse">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
              About Shivani
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              A Spiritual Yatri <span className="text-gradient-gold">Walking With You</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              For over five years, Shivani has guided souls through the intersection of ancient Vedic wisdom and modern life — blending tarot, astrology, and energy healing into a single sacred practice.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Her work is rooted in compassion, honesty, and the belief that every life has a luminous, knowable design.
            </p>
            <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-full btn-outline-gold px-6 py-3 text-sm font-semibold">
              Discover Her Story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative py-20 overflow-hidden border-t border-gold/10">
        {/* Subtle decorative orbits in bg */}
        <div className="pointer-events-none absolute left-10 top-1/2 w-80 h-80 rounded-full border border-gold/5 blur-[2px] -z-10" />
        <div className="pointer-events-none absolute right-10 bottom-10 w-96 h-96 rounded-full border border-purple/5 blur-[2px] -z-10" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Sacred Pillars"
            title={<>Why Choose <span className="text-gradient-gold">Shivani Spiritual Yatri</span></>}
            subtitle="Guiding souls with authentic spiritual wisdom, energy healing, and cosmic clarity."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                icon: Compass,
                title: "Personalized Spiritual Guidance",
                desc: "Customized readings and consultations tailored precisely to your energetic blueprint and unique life path."
              },
              {
                icon: Award,
                title: "Trusted Astrology Expertise",
                desc: "Rooted in years of deep study and master-certified Vedic lineage to deliver profound cosmic clarity."
              },
              {
                icon: Heart,
                title: "Positive Energy Healing",
                desc: "Realign your subtle centers, clear heavy emotional blocks, and elevate your daily vibrations."
              },
              {
                icon: ShieldCheck,
                title: "Confidential & Secure Sessions",
                desc: "Every consultation is held in absolute sacred trust, ensuring a secure, compassionate space for growth."
              }
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl glass p-7 border border-gold/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold flex flex-col justify-between">
                  {/* Cosmic glow behind card */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  
                  <div>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold/25 to-purple/25 text-gold border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-transform duration-500 group-hover:scale-110">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl leading-snug text-foreground/95 group-hover:text-gold transition-colors duration-300">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                      {f.desc}
                    </p>
                  </div>

                  {/* Subtle lower-right sparkle decoration */}
                  <div className="absolute bottom-4 right-4 text-gold/10 opacity-0 group-hover:opacity-100 group-hover:text-gold/20 transition-all duration-500">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO + TESTIMONIALS */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-8 items-center">
          <Reveal>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl group/testimonial-img"
            >
              {/* Glowing Purple Aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple/30 to-gold/20 rounded-3xl blur-2xl opacity-60 group-hover/testimonial-img:opacity-85 transition-opacity duration-700 pointer-events-none" />

              {/* Luxury Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/35 shadow-[0_15px_40px_rgba(0,0,0,0.6)] bg-background/35 backdrop-blur-md transition-all duration-700 group-hover/testimonial-img:border-gold/60 group-hover/testimonial-img:shadow-gold/25">
                <img
                  src={testimonialClientImg}
                  alt="Spiritual Yatri Testimonial Serenity"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/testimonial-img:scale-[1.04]"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent pointer-events-none" />

                {/* Corner highlights */}
                <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/45 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/45 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/45 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/45 pointer-events-none" />

                {/* Subtle text card overlay */}
                <div className="absolute bottom-4 left-6 z-10 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                    <Sparkles className="h-3 w-3" /> Guided Soul
                  </div>
                  <div className="font-display text-base text-foreground/95">Universal Peace & Clarity</div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Souls We've Guided"
              title={<>Words From Those Who <span className="text-gradient-gold">Walked The Path</span></>}
            />
            <div className="mt-8">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                loop
                spaceBetween={20}
              >
                {testimonials.map((t) => (
                  <SwiperSlide key={t.name}>
                    <BentoCard className="glass rounded-2xl p-7 pb-12 bg-black/10">
                      <Quote className="h-7 w-7 text-gold/60" />
                      <p className="mt-4 text-base leading-relaxed text-foreground/90">"{t.text}"</p>
                      <div className="mt-5 border-t border-gold/10 pt-4">
                        <div className="font-display text-lg text-gold">{t.name}</div>
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.role}</div>
                      </div>
                    </BentoCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Full-Width Strip */}
      <section className="relative w-full border-t border-b border-gold/15 bg-gradient-to-r from-black/80 via-[#0a0612]/95 to-black/80 py-16 md:py-20 overflow-hidden">
        {/* Background ambient spotlight glows */}
        <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple/8 blur-[110px] rounded-full -z-10 animate-pulse" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/4 blur-[90px] rounded-full -z-10 animate-pulse" />

        {/* Rotating orbit rings layer (z-0) */}
        <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.04] flex items-center justify-center z-0 select-none scale-125">
          <div className="h-[400px] w-[400px] rounded-full border border-dashed border-gold animate-spin-slow" style={{ animationDuration: "40s" }} />
          <div className="absolute h-[320px] w-[320px] rounded-full border border-gold animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
          <BentoCard className="w-full glass-strong p-8 md:p-12 bg-black/40 backdrop-blur-md" glowColor="rgba(192, 132, 252, 0.15)">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
              
              {/* LEFT SIDE: Heading & Subtitle */}
              <div className="flex-1 text-left space-y-4 max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold text-glow-subtle animate-pulse w-fit">
                  <Sparkles className="h-3 w-3 text-gold" />
                  Divine Invitation
                </span>
                <h2 className="font-display text-3.5xl md:text-5xl leading-tight tracking-[0.08em] uppercase text-foreground">
                  Begin Your Spiritual <span className="text-gradient-cosmic">Transformation Journey</span>
                </h2>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light tracking-wider max-w-2xl">
                  Experience clarity, healing, guidance, and alignment through personalized spiritual consultations and transformational learning.
                </p>
              </div>

              {/* RIGHT SIDE: Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shrink-0 w-full sm:w-auto">
                <Link 
                  to="/booking" 
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest btn-premium-glow shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all cursor-pointer text-center"
                >
                  Book A Consultation 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link 
                  to="/courses" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest btn-outline-premium transition-all hover:bg-white/5 cursor-pointer text-center"
                >
                  Explore Courses
                </Link>
              </div>

            </div>
          </BentoCard>
        </div>
      </section>
    </>
  );
}
