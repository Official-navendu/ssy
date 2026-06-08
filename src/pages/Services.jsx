import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, ArrowRight, Sparkles, X, CheckCircle2, MessageSquare, Compass, Shield, ChevronRight, Gem, Moon, Heart, HelpCircle, Calendar, Sparkle, Award, BookOpen } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { services } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/utils/site";
import { BentoCard } from "@/components/common/BentoCard";

import serviceTarot from "@/assets/images/service_tarot.png";
import serviceHealing from "@/assets/images/service_healing.png";
import serviceChakra from "@/assets/images/service_chakra.png";

// Import Gallery Images
import galleryTarot1 from "@/assets/images/gallery_tarot_1.png";
import galleryTarot2 from "@/assets/images/gallery_tarot_2.png";
import galleryTarot3 from "@/assets/images/gallery_tarot_3.png";
import galleryTarot4 from "@/assets/images/gallery_tarot_4.png";

import galleryHealing1 from "@/assets/images/gallery_healing_1.png";
import galleryHealing2 from "@/assets/images/gallery_healing_2.png";
import galleryHealing3 from "@/assets/images/gallery_healing_3.png";
import galleryHealing4 from "@/assets/images/gallery_healing_4.png";

import galleryChakra1 from "@/assets/images/gallery_chakra_1.png";
import galleryChakra2 from "@/assets/images/gallery_chakra_2.png";
import galleryChakra3 from "@/assets/images/gallery_chakra_3.png";
import galleryChakra4 from "@/assets/images/gallery_chakra_4.png";

const serviceImages = {
  "1on1-power-tarot": serviceTarot,
  "advanced-aura-healing": serviceHealing,
  "tarot-healing-chakra": serviceChakra,
};

const serviceGalleries = {
  "1on1-power-tarot": [galleryTarot1, galleryTarot2, galleryTarot3, galleryTarot4],
  "advanced-aura-healing": [galleryHealing1, galleryHealing2, galleryHealing3, galleryHealing4],
  "tarot-healing-chakra": [galleryChakra1, galleryChakra2, galleryChakra3, galleryChakra4],
};

const serviceAuras = {
  "1on1-power-tarot": "from-sapphire/20 to-gold/5",
  "advanced-aura-healing": "from-sapphire/20 via-emerald/15 to-gold/10",
  "tarot-healing-chakra": "from-gold/20 via-sapphire/15 to-background",
};

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Custom states for interactive Hero & Destiny sections
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });
  const [destinyMousePos, setDestinyMousePos] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const [isDestinyHovered, setIsDestinyHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  // Tarot Table Sequence and Oracle States
  const sequenceTimeoutRef = useRef(null);
  const [dancePhase, setDancePhase] = useState("spread");
  const [activeCardIdx, setActiveCardIdx] = useState(null);
  const [mysticalMessage, setMysticalMessage] = useState("Trust Your Journey");
  const [isManual, setIsManual] = useState(false);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  const quotes = [
    "Trust Your Journey",
    "Healing Begins Within",
    "Clarity Awaits",
    "Your Answers Are Near"
  ];

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMousePos({ x, y });
  };

  const handleDestinyMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setDestinyMousePos({ x, y, rawX: e.clientX - rect.left, rawY: e.clientY - rect.top });
  };

  const handleScroll = (e) => {
    const target = e.target;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  // Reset scroll progress when modal opens or changes
  useEffect(() => {
    setScrollProgress(0);
  }, [selectedService]);

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

  // Responsive window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Parse deep link state parameter to open modal
  useEffect(() => {
    if (location.state?.openService) {
      const matched = services.find(s => s.slug === location.state.openService);
      if (matched) {
        setSelectedService(matched);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location.state]);

  // Cycle mystical quotes on the right side
  useEffect(() => {
    const qInterval = setInterval(() => {
      setActiveQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(qInterval);
  }, []);

  // Choreographed Tarot table auto-play timer sequence
  useEffect(() => {
    if (isManual) return;

    const runSequence = () => {
      if (isManual) return;

      // Phase: Spread out
      setDancePhase("spread");
      setActiveCardIdx(null);

      sequenceTimeoutRef.current = setTimeout(() => {
        if (isManual) return;
        // Phase: Stack
        setDancePhase("stack");

        sequenceTimeoutRef.current = setTimeout(() => {
          if (isManual) return;
          // Phase: Shuffle
          setDancePhase("shuffle");

          sequenceTimeoutRef.current = setTimeout(() => {
            if (isManual) return;
            // Phase: Rotate
            setDancePhase("rotate");

            sequenceTimeoutRef.current = setTimeout(() => {
              if (isManual) return;
              // Phase: Flip (Select random card)
              const randomCard = Math.floor(Math.random() * 5);
              const cardMessages = [
                "Trust Your Journey",
                "Healing Begins Within",
                "Clarity Awaits",
                "Your Answers Are Near",
                "The Universe Supports You"
              ];
              
              setActiveCardIdx(randomCard);
              setMysticalMessage(cardMessages[randomCard % cardMessages.length]);
              setDancePhase("flip");

              sequenceTimeoutRef.current = setTimeout(() => {
                if (isManual) return;
                // Phase: Return
                setDancePhase("return");

                sequenceTimeoutRef.current = setTimeout(() => {
                  runSequence();
                }, 2000);
              }, 5500); // flip duration
            }, 2500); // rotate duration
          }, 4000); // shuffle duration
        }, 2000); // stack duration
      }, 6000); // spread duration
    };

    runSequence();

    return () => {
      if (sequenceTimeoutRef.current) {
        clearTimeout(sequenceTimeoutRef.current);
      }
    };
  }, [isManual]);

  const handleCardClick = (cardIdx) => {
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
    }

    const cardMessages = [
      "Trust Your Journey",
      "Healing Begins Within",
      "Clarity Awaits",
      "Your Answers Are Near",
      "The Universe Supports You"
    ];

    if (dancePhase === "flip" && activeCardIdx === cardIdx) {
      setDancePhase("return");
      setIsManual(false);
    } else {
      setIsManual(true);
      setActiveCardIdx(cardIdx);
      setMysticalMessage(cardMessages[cardIdx % cardMessages.length]);
      setDancePhase("flip");

      sequenceTimeoutRef.current = setTimeout(() => {
        setDancePhase("return");
        sequenceTimeoutRef.current = setTimeout(() => {
          setIsManual(false);
        }, 2000);
      }, 8000);
    }
  };

  const getCardStyles = (index, phase, activeIdx, width, mousePos) => {
    const isSmall = width < 640;
    const isMedium = width < 768;

    let baseX = (index - 2) * 85;
    let baseY = Math.abs(index - 2) * 6;
    let baseRotate = (index - 2) * 6;

    if (isSmall) {
      baseX = (index - 2) * 28;
      baseY = Math.abs(index - 2) * 9;
      baseRotate = (index - 2) * 4.5;
    } else if (isMedium) {
      baseX = (index - 2) * 55;
      baseY = Math.abs(index - 2) * 8;
      baseRotate = (index - 2) * 5.5;
    }

    if (phase === "spread") {
      return {
        x: baseX + mousePos.x * 20,
        y: baseY + mousePos.y * 20,
        rotate: baseRotate + mousePos.x * 4,
        rotateX: mousePos.y * -10,
        rotateY: mousePos.x * 10,
        scale: 1,
        zIndex: 10 + index,
        opacity: 1
      };
    }

    if (phase === "stack") {
      return {
        x: mousePos.x * 12,
        y: index * -1.5 + mousePos.y * 12,
        rotate: (index - 2) * 1,
        rotateX: mousePos.y * -8,
        rotateY: mousePos.x * 8,
        scale: 1.02,
        zIndex: 10 + index,
        opacity: 1
      };
    }

    if (phase === "shuffle") {
      const direction = index % 2 === 0 ? -1 : 1;
      const shuffleAmt = isSmall ? 60 : 100;
      return {
        x: [0, direction * shuffleAmt, -direction * 15, direction * shuffleAmt, 0],
        y: [0, -4, 4, -4, 0],
        rotate: [0, direction * 6, -direction * 2, direction * 6, 0],
        rotateX: mousePos.y * -5,
        rotateY: mousePos.x * 5,
        scale: 1.02,
        zIndex: index % 2 === 0 
          ? [10 + index, 40, 10 + index, 40, 10 + index] 
          : [10 + index, 10 + index, 40, 10 + index, 40],
        opacity: 1
      };
    }

    if (phase === "rotate") {
      return {
        x: mousePos.x * 12,
        y: index * -1.5 + mousePos.y * 12,
        rotate: [0, 8, -8, 0],
        rotateX: [12, 28, 12],
        rotateY: [0, 12, -12, 0],
        scale: 1.02,
        zIndex: 10 + index,
        opacity: 1
      };
    }

    if (phase === "flip") {
      if (index === activeIdx) {
        return {
          x: 0,
          y: isSmall ? -20 : -35,
          rotate: 0,
          rotateX: 0,
          rotateY: 180,
          scale: 1.12,
          zIndex: 100,
          opacity: 1
        };
      } else {
        const sideOffset = index < activeIdx ? -1 : 1;
        const spacing = isSmall ? 22 : 45;
        return {
          x: (index - 2) * spacing + sideOffset * (isSmall ? 15 : 25),
          y: isSmall ? 35 : 50,
          rotate: (index - 2) * 3,
          rotateX: 8,
          rotateY: 0,
          scale: 0.82,
          zIndex: 5,
          opacity: 0.35
        };
      }
    }

    if (phase === "return") {
      return {
        x: 0,
        y: 0,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        zIndex: 10 + index,
        opacity: 1
      };
    }

    return { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 10 };
  };

  return (
    <>
      {/* Services Premium Hero Section */}
      <section 
        onMouseMove={handleHeroMouseMove}
        className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 border-b border-gold/10 bg-background"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={50} />
        </div>
        
        {/* Floating Tarot Cards, Candle Glow & Crystal Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          {/* Candle Glows */}
          <div className="absolute top-1/4 left-10 w-48 h-48 bg-amber-500/5 blur-[80px] rounded-full animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-amber-600/5 blur-[90px] rounded-full animate-pulse" style={{ animationDuration: "8s" }} />

          {/* Floating Tarot Card Outline 1 (Left) */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="hidden lg:block absolute left-[8%] top-1/3 z-[2]"
          >
            <motion.div
              animate={{
                x: heroMousePos.x * 35,
                y: heroMousePos.y * 35,
                rotateX: heroMousePos.y * -15,
                rotateY: heroMousePos.x * 15,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 75, 
                damping: 20 
              }}
              className="w-28 h-40 border border-gold/30 rounded-[22px] bg-gradient-to-b from-card/50 to-background/70 backdrop-blur-xl p-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),_0_0_20px_rgba(216,182,122,0.12)] hover:border-gold/60 transition-colors duration-300"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <div className="w-full h-full border border-gold/15 rounded-[16px] flex items-center justify-center bg-background/25">
                <Moon className="h-6 w-6 text-gold-soft/40" />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Tarot Card Outline 2 (Right) */}
          <motion.div
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
            className="hidden lg:block absolute right-[8%] top-1/4 z-[2]"
          >
            <motion.div
              animate={{
                x: heroMousePos.x * 35,
                y: heroMousePos.y * 35,
                rotateX: heroMousePos.y * -15,
                rotateY: heroMousePos.x * 15,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 75, 
                damping: 20 
              }}
              className="w-28 h-40 border border-gold/30 rounded-[22px] bg-gradient-to-b from-card/50 to-background/70 backdrop-blur-xl p-1.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),_0_0_20px_rgba(216,182,122,0.12)] hover:border-gold/60 transition-colors duration-300"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <div className="w-full h-full border border-gold/15 rounded-[16px] flex items-center justify-center bg-background/25">
                <Gem className="h-6 w-6 text-gold-soft/40" />
              </div>
            </motion.div>
          </motion.div>

          {/* Crystal / Sparkle Particles floating */}
          <div className="absolute top-1/3 left-[20%] w-1.5 h-1.5 bg-gold rounded-full opacity-35 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute bottom-1/3 right-[22%] w-2 h-2 bg-gold rounded-full opacity-25 animate-ping" style={{ animationDuration: "4s", animationDelay: "1s" }} />
          <div className="absolute top-1/4 right-[30%] w-1 h-1 bg-gold rounded-full opacity-40 animate-ping" style={{ animationDuration: "2.5s" }} />
        </div>

        {/* Dynamic spinning coordinate overlays */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 z-[5]">
          <div className="h-[550px] w-[550px] rounded-full border border-gold/5 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-sapphire/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "50s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Spotlight Backlights */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-sapphire/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "10s" }} />
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
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const imgPath = serviceImages[s.slug];
              const auraColor = serviceAuras[s.slug] || "from-sapphire/20 to-gold/10";
              
              return (
                <Reveal key={s.slug} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      rotateY: i % 2 === 0 ? 2.5 : -2.5,
                      rotateX: 1.5,
                      scale: 1.01
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`relative group rounded-[28px] overflow-hidden border transition-all duration-500 hover:border-gold/75 hover:shadow-[0_20px_45px_rgba(216,182,122,0.18)] flex flex-col h-full ${
                      i % 3 === 0 ? "card-plum" : i % 3 === 1 ? "card-violet" : "card-glass"
                    }`}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  >
                    {/* Subtle inner-card background glow (candle light effect) */}
                    <div className={`absolute -top-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-br ${auraColor} blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} />
                    <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-tr from-gold/5 to-transparent blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />

                    {/* Gold Corner Accents to simulate Tarot Card frames */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold/30 group-hover:border-gold/70 transition-colors duration-500 pointer-events-none z-20" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/30 group-hover:border-gold/70 transition-colors duration-500 pointer-events-none z-20" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold/30 group-hover:border-gold/70 transition-colors duration-500 pointer-events-none z-20" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold/30 group-hover:border-gold/70 transition-colors duration-500 pointer-events-none z-20" />

                    {/* Card Frame Inner Line */}
                    <div className="absolute inset-1.5 rounded-[24px] border border-gold/10 pointer-events-none z-10" />

                    {/* Image Header */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gold/15">
                      <img
                        src={imgPath}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                      
                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#242032] via-transparent to-black/20 pointer-events-none" />
                      
                      {/* Premium Badge */}
                      {s.badge && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="rounded-full bg-gold/15 border border-gold/45 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gold shadow-[0_0_10px_rgba(216,182,122,0.15)] animate-pulse">
                            {s.badge}
                          </span>
                        </div>
                      )}

                      {/* Price Tag Overlay */}
                      <div className="absolute bottom-3 right-3 z-20">
                        <span className="rounded-full bg-black/75 border border-gold/25 px-3 py-1 text-[10px] font-semibold tracking-wider text-foreground">
                          {s.price}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 md:p-7 flex flex-col justify-between flex-1 relative z-20">
                      <div className="space-y-3">
                        {/* Meta duration info */}
                        <div className="flex items-center gap-1.5 text-[10px] text-gold font-semibold uppercase tracking-widest">
                          <Clock className="h-3.5 w-3.5" /> {s.duration}
                        </div>

                        {/* Card Title */}
                        <h3 className="font-display text-lg md:text-xl text-foreground/95 group-hover:text-gold transition-colors duration-300 uppercase tracking-wide leading-snug">
                          {s.title}
                        </h3>

                        {/* Tagline */}
                        <p className="text-xs italic font-medium text-gold/80 tracking-wide">
                          {s.short}
                        </p>

                        {/* Description */}
                        <p className="text-xs leading-relaxed text-muted-foreground/80 font-light tracking-wide line-clamp-3">
                          {s.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="my-5 border-t border-gold/10" />

                      {/* Card Actions */}
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => setSelectedService(s)}
                          className="group w-full inline-flex items-center justify-center gap-2 rounded-full border border-gold/35 bg-gold/5 hover:bg-gold/15 hover:border-gold/75 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(216,182,122,0.05)]"
                        >
                          View Details
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                        <Link 
                          to="/booking" 
                          className="w-full inline-flex items-center justify-center gap-2 rounded-full btn-gold py-2.5 text-xs font-semibold uppercase tracking-widest text-center"
                        >
                          Book Session
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Magical Auto-Shuffling Tarot Animation Section (Mystical Tarot Table) */}
      <section 
        onMouseMove={handleDestinyMouseMove}
        onMouseEnter={() => setIsDestinyHovered(true)}
        onMouseLeave={() => setIsDestinyHovered(false)}
        className="relative py-24 overflow-hidden border-t border-b border-gold/15 bg-gradient-to-b from-[#1A1722] via-[#242032] to-[#1A1722] velvet-table"
      >
        {/* Gold trim outline border of the table */}
        <div className="absolute inset-x-8 inset-y-6 rounded-3xl border border-gold/10 pointer-events-none z-10 hidden md:block" />

        {/* Gold mystical sacred geometry patterns background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-repeat mix-blend-color-dodge z-[1]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath d='M60 0 L120 60 L60 120 L0 60 Z' stroke='%23D8B67A' fill='none' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='60' r='20' stroke='%23D8B67A' fill='none' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='60' r='40' stroke='%23D8B67A' fill='none' stroke-dasharray='3,3' stroke-width='0.5'/%3E%3Cpath d='M60 20 L60 100 M20 60 L100 60' stroke='%23D8B67A' stroke-width='0.3'/%3E%3Cpath d='M30 30 L90 90 M30 90 L90 30' stroke='%23D8B67A' stroke-width='0.3' stroke-dasharray='2,2'/%3E%3Cpolygon points='60,35 68,52 86,52 72,63 77,80 60,70 43,80 48,63 34,52 52,52' stroke='%23D8B67A' fill='none' stroke-width='0.3'/%3E%3C/svg%3E")`
        }} />

        {/* Layered depth overlays & ambient cloud smoke */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {/* Pulsing candlelight glows representing left/right candles */}
          <div className="absolute top-1/4 left-12 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full animate-candle-flicker pointer-events-none" style={{ animationDuration: "5s" }} />
          <div className="absolute bottom-1/4 right-12 w-56 h-56 bg-amber-600/10 blur-[70px] rounded-full animate-candle-flicker pointer-events-none" style={{ animationDuration: "6s", animationDelay: "1.5s" }} />
          
          {/* Drifting smoke haze */}
          <motion.div 
            animate={{ 
              x: [-40, 40, -40],
              y: [-25, 25, -25],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 left-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              x: [40, -40, 40],
              y: [25, -25, 25],
              opacity: [0.04, 0.09, 0.04]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute -bottom-16 right-1/4 w-[450px] h-[450px] bg-gold/4 rounded-full blur-[110px] pointer-events-none" 
          />

          {/* Floating premium particles (Golden dust, stars, embers) */}
          {(() => {
            const particles = [
              { type: "dust", size: 1.5, x: 12, y: 35, duration: 12, delay: 0 },
              { type: "dust", size: 2.0, x: 85, y: 20, duration: 15, delay: 1 },
              { type: "ember", size: 3.0, x: 45, y: 75, duration: 10, delay: 0.5 },
              { type: "star", size: 4.0, x: 25, y: 15, duration: 8, delay: 2 },
              { type: "sparkle", size: 3.5, x: 75, y: 65, duration: 9, delay: 1.5 },
              { type: "dust", size: 1.2, x: 60, y: 45, duration: 14, delay: 3 },
              { type: "ember", size: 2.5, x: 18, y: 80, duration: 11, delay: 2.5 },
              { type: "star", size: 4.5, x: 90, y: 40, duration: 7, delay: 0.8 },
              { type: "sparkle", size: 2.8, x: 5, y: 50, duration: 10, delay: 4 },
              { type: "dust", size: 1.8, x: 35, y: 60, duration: 13, delay: 1.2 },
              { type: "ember", size: 3.2, x: 80, y: 85, duration: 9, delay: 3.5 },
              { type: "star", size: 5.0, x: 50, y: 25, duration: 6, delay: 1.8 },
              { type: "sparkle", size: 3.0, x: 70, y: 10, duration: 11, delay: 0.2 },
              { type: "dust", size: 1.4, x: 95, y: 70, duration: 16, delay: 2.2 },
              { type: "ember", size: 2.8, x: 30, y: 90, duration: 12, delay: 4.5 },
              { type: "star", size: 4.0, x: 10, y: 10, duration: 8, delay: 3 },
              { type: "sparkle", size: 3.2, x: 40, y: 5, duration: 9, delay: 2.7 },
              { type: "dust", size: 1.6, x: 55, y: 80, duration: 15, delay: 0.4 },
              { type: "ember", size: 3.5, x: 65, y: 95, duration: 8, delay: 1.1 },
              { type: "star", size: 3.8, x: 82, y: 50, duration: 10, delay: 3.1 },
            ];
            const activeParticles = windowWidth < 640 ? particles.slice(0, 8) : particles;
            
            return activeParticles.map((p, idx) => {
              if (p.type === "ember") {
                return (
                  <motion.div
                    key={idx}
                    className="absolute rounded-full bg-gradient-to-tr from-accent to-gold z-[3] pointer-events-none"
                    style={{
                      width: p.size,
                      height: p.size,
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      boxShadow: "0 0 8px rgba(216,182,122,0.3)"
                    }}
                    animate={{
                      y: [0, -80, 0],
                      x: [0, Math.sin(idx) * 15, 0],
                      opacity: [0, 0.7, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "easeInOut"
                    }}
                  />
                );
              } else if (p.type === "dust") {
                return (
                  <motion.div
                    key={idx}
                    className="absolute rounded-full bg-gold-soft/30 z-[3] pointer-events-none"
                    style={{
                      width: p.size,
                      height: p.size,
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      x: [0, Math.cos(idx) * 10, 0],
                      opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "easeInOut"
                    }}
                  />
                );
              } else {
                return (
                  <motion.div
                    key={idx}
                    className="absolute text-gold/20 z-[3] pointer-events-none"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                    }}
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.15, 0.6, 0.15],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles style={{ width: p.size * 2, height: p.size * 2 }} />
                  </motion.div>
                );
              }
            });
          })()}
        </div>

        {/* Cursor light spotlight */}
        {isDestinyHovered && (
          <div 
            className="pointer-events-none absolute w-[350px] h-[350px] bg-gold/5 blur-[85px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 z-[3]"
            style={{
              left: destinyMousePos.rawX,
              top: destinyMousePos.rawY,
            }}
          />
        )}

        <div className="mx-auto max-w-6xl px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: Animated Tarot Cards Table */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] w-full overflow-visible">
              {/* Table glow effects inside left column */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] bg-amber-500/5 blur-[90px] rounded-full animate-pulse pointer-events-none" />
              
              {/* Cards Fan container */}
              <div className="relative w-full flex items-center justify-center select-none overflow-visible">
                {[1, 2, 3, 4, 5].map((cardNum) => {
                  const cardIdx = cardNum - 1;
                  const cardAnim = getCardStyles(cardIdx, dancePhase, activeCardIdx, windowWidth, destinyMousePos);

                  return (
                    <motion.div
                      key={cardNum}
                      animate={cardAnim}
                      transition={
                        dancePhase === "shuffle" || dancePhase === "rotate"
                          ? { duration: 3.5, ease: "easeInOut" }
                          : { type: "spring", stiffness: 70, damping: 16 }
                      }
                      onClick={() => handleCardClick(cardIdx)}
                      className="absolute w-32 h-48 sm:w-44 sm:h-64 cursor-pointer relative"
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: 1200,
                      }}
                    >
                      {/* Back Face of Card */}
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border border-gold/30 bg-gradient-to-b from-card to-background p-3 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:border-gold/60 transition-colors duration-300"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        {/* Corner Ornament Accents */}
                        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/35" />
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/35" />
                        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/35" />
                        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/35" />
                        <div className="absolute inset-1 rounded-xl border border-gold/5" />

                        <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-gold/25 flex items-center justify-center text-gold/60 bg-black/20">
                          <Moon className="h-5 w-5 animate-pulse text-gold" />
                        </div>
                        <div className="mt-3.5 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                        <span className="mt-3.5 text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-gold/60 font-medium font-sans">
                          Tarot Reading
                        </span>
                      </div>

                      {/* Front Face of Card (Shown when flipped) */}
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-[22px] border border-gold/50 bg-gradient-to-b from-card via-[#242032] to-[#332845]/45 p-4 shadow-[0_20px_45px_rgba(216,182,122,0.18)] text-center"
                        style={{
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        {/* Corner Ornaments */}
                        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/45" />
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/45" />
                        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/45" />
                        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/45" />
                        <div className="absolute inset-1 rounded-xl border border-gold/5" />

                        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-gold animate-pulse" />
                        <h4 className="mt-3 sm:mt-4 font-display text-[11px] sm:text-xs text-gold uppercase tracking-wider">
                          The Oracle
                        </h4>
                        <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                        <p className="mt-4 text-[10px] sm:text-xs text-foreground font-serif leading-relaxed italic max-w-[130px] sm:max-w-[160px] pl-1 pr-1">
                          "{mysticalMessage}"
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Premium Typography and Quote reveal */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 lg:pl-6 z-10">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold text-glow-subtle">
                <Sparkles className="h-3.5 w-3.5 text-gold animate-spin-slow" /> Cosmic Shuffle
              </span>
              
              <h2 className="font-display text-3xl md:text-5xl text-foreground uppercase tracking-wider font-medium leading-[1.1]">
                The Dance of <span className="text-gradient-gold">Destiny</span>
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground/80 italic font-serif leading-relaxed tracking-wider">
                "The cards reveal what words cannot."
              </p>
              
              <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/70 font-light tracking-wide font-sans">
                Step into our sacred space and let the cards illuminate the invisible threads of your path. Each card in this shifting tapestry represents a timeline, a threshold, or an internal query waiting to be decrypted. Watch the dance, select a card, and receive the oracle's guidance.
              </p>

              {/* Animated Changing Quote box */}
              <div className="h-14 flex items-center bg-[#242032]/40 border border-gold/15 rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-[0_5px_15px_rgba(0,0,0,0.3)] w-full max-w-sm select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQuoteIdx}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex items-center gap-2.5 text-[11px] sm:text-xs text-gold-soft font-serif italic"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse shrink-0" />
                    <span>"{quotes[activeQuoteIdx]}"</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* CTA Booking Button with Shimmer */}
              <Link 
                to="/booking" 
                className="inline-flex items-center justify-center gap-2 rounded-full btn-gold py-3 px-7 text-xs font-semibold uppercase tracking-widest text-center self-start hover:scale-103 transition-transform"
              >
                Begin Your Reading
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Shivani Spiritual Yatri Bento Section */}
      <section className="py-24 relative overflow-hidden bg-background/50 border-b border-gold/10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-sapphire/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-amber-900/5 rounded-full blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              <Sparkle className="h-3.5 w-3.5 text-gold" /> Sacred Pillars
            </span>
            <h2 className="mt-5 font-display text-3xl md:text-5xl text-foreground uppercase tracking-wider font-medium">
              Why Choose <span className="text-gradient-gold">Shivani Spiritual Yatri</span>
            </h2>
            <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide max-w-xl mx-auto">
              Experience intuitive guidance, transformational healing, and personalized spiritual support designed to help you find clarity, balance, and inner peace.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Personalized 1:1 Guidance", desc: "Consultations tailored to your energy flow and questions.", icon: Sparkles, gridClass: "lg:col-span-2 md:col-span-2" },
              { title: "Premium Tarot Expertise", desc: "Unlock deep timing predictions and third-party clarity.", icon: Moon, gridClass: "col-span-1" },
              { title: "Advanced Energy Healing", desc: "Reiki Master techniques to clear blocks and negative vibes.", icon: Sparkle, gridClass: "col-span-1" },
              { title: "Chakra & Aura Balance", desc: "Deep diagnostics to repair leaks and seal your auric field.", icon: Gem, gridClass: "col-span-1" },
              { title: "Confidential Sessions", desc: "A safe, private, non-judgmental space for your healing.", icon: Shield, gridClass: "col-span-1" },
              { title: "Online Worldwide", desc: "Connect via Zoom or call from anywhere on the globe.", icon: Compass, gridClass: "lg:col-span-2 md:col-span-2" },
              { title: "Personalized Remedies", desc: "Practical Vedic suggestions to harmonise difficult transits.", icon: Award, gridClass: "lg:col-span-2 col-span-1" },
              { title: "Luxury Spiritual Experience", desc: "Premium guidance designed to elevate your life path.", icon: Heart, gridClass: "lg:col-span-2 col-span-1" }
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className={`group relative h-full rounded-2xl p-6 border border-gold/15 transition-all duration-500 hover:-translate-y-2 hover:border-gold/45 hover:shadow-[0_15px_30px_rgba(216,182,122,0.08)] flex flex-col justify-between ${
                  i % 3 === 0 ? "card-plum" : i % 3 === 1 ? "card-violet" : "card-glass"
                } ${f.gridClass}`}>
                  {/* Glowing backdrop inside */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  
                  <div>
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold/15 to-sapphire/25 text-gold border border-gold/25 shadow-[0_0_15px_rgba(216,182,122,0.05)] transition-all duration-500 group-hover:scale-115 group-hover:-translate-y-1">
                      <f.icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mt-5 font-display text-base leading-snug text-foreground/95 group-hover:text-gold transition-colors duration-300 uppercase tracking-wide">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80 font-light tracking-wider">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Full-Width Strip */}
      <section className="relative w-full border-b border-gold/15 bg-gradient-to-r from-background/95 via-accent/90 to-background/95 py-16 md:py-20 overflow-hidden">
        {/* Background spotlights & glowing elements */}
        <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sapphire/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "10s" }} />
        <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/5 blur-[95px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "14s" }} />
        
        {/* Floating Tarot symbols & Crystal lighting indicators in background */}
        <div className="pointer-events-none absolute left-10 top-10 text-gold/10 opacity-30 select-none animate-bounce" style={{ animationDuration: "8s" }}>
          <Moon className="h-14 w-14" />
        </div>
        <div className="pointer-events-none absolute right-16 bottom-10 text-gold/10 opacity-30 select-none animate-bounce" style={{ animationDuration: "11s", animationDelay: "2s" }}>
          <Gem className="h-16 w-16" />
        </div>

        <div className="mx-auto max-w-6xl px-6 md:px-8 relative z-10">
          <BentoCard className="w-full glass-strong p-8 md:p-12 bg-[#242032]/40 backdrop-blur-md border border-gold/25" glowColor="rgba(216, 182, 122, 0.15)">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
              
              {/* LEFT SIDE: Heading & Subtitle */}
              <div className="flex-1 text-left space-y-4 max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold animate-pulse">
                  <Sparkles className="h-3 w-3 text-gold" />
                  Sacred Alignment
                </span>
                <h2 className="font-display text-3xl md:text-5xl leading-tight tracking-[0.08em] uppercase text-foreground">
                  Embrace Your <span className="text-gradient-gold">Tarot & Energy Journey</span>
                </h2>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wider max-w-xl">
                  Step into our luxury Tarot studio. Unveil timeline predictions, clear ancestral blocks, and ground your spirit in deep clarity.
                </p>
              </div>

              {/* RIGHT SIDE: Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shrink-0 w-full sm:w-auto">
                <Link 
                  to="/booking" 
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest btn-gold shadow-[0_0_20px_rgba(216, 182, 122, 0.15)]"
                >
                  Book A Consultation 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link 
                  to="/courses" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest btn-outline-premium hover:bg-white/5"
                >
                  Explore Courses
                </Link>
              </div>

            </div>
          </BentoCard>
        </div>
      </section>

      {/* Details Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Dark glassmorphic backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onScroll={handleScroll}
              className="relative w-full h-full md:h-[90vh] md:max-w-5xl md:rounded-3xl border border-gold/30 bg-[#1A1722]/98 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-gold/20 flex flex-col"
            >
              {/* Premium Scroll Progress Bar */}
              <div 
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-gold via-accent to-gold-soft transition-all duration-100" 
                style={{ width: `${scrollProgress}%`, zIndex: 60 }} 
              />

              {/* Corner highlights (Only on Desktop) */}
              <div className="hidden md:block absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/40 pointer-events-none z-30" />
              <div className="hidden md:block absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/40 pointer-events-none z-30" />
              <div className="hidden md:block absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/40 pointer-events-none z-30" />
              <div className="hidden md:block absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/45 pointer-events-none z-30" />

              {/* Sticky Close Header */}
              <div className="sticky top-0 z-40 w-full flex justify-end p-4 bg-gradient-to-b from-[#1A1722] to-transparent pointer-events-none">
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-3 rounded-full border border-gold/25 bg-[#242032]/80 hover:bg-gold/15 hover:border-gold/55 text-foreground transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.7)] pointer-events-auto cursor-pointer flex items-center justify-center gap-1.5"
                  aria-label="Close modal"
                >
                  <span className="text-[10px] uppercase tracking-widest font-semibold pl-1 text-gold">Close</span>
                  <X className="h-4 w-4 text-gold" />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-6 pb-16 md:px-12 -mt-12">
                {/* 1. Large Hero Image & Header */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-gold/20 h-64 md:h-80 shadow-2xl">
                  <img
                    src={serviceImages[selectedService.slug]}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1722] via-[#1A1722]/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedService.badge && (
                        <span className="rounded-full bg-gold/15 border border-gold/45 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gold animate-pulse">
                          {selectedService.badge}
                        </span>
                      )}
                      <span className="rounded-full bg-accent/25 border border-accent/40 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-foreground">
                        {selectedService.duration} Session
                      </span>
                      <span className="rounded-full bg-accent/20 border border-accent/35 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-foreground">
                        {selectedService.price}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl xs:text-2xl md:text-4.5xl text-gradient-gold uppercase tracking-wider leading-tight">
                      {selectedService.title}
                    </h2>
                  </div>
                </div>

                {/* 2. Image Gallery Showcase */}
                <div className="mt-8">
                  <h4 className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="h-3 w-3" /> Immersive Visual Gallery
                  </h4>
                  <div className="flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-none">
                    {serviceGalleries[selectedService.slug]?.map((imgUrl, idx) => (
                      <div key={idx} className="relative w-48 h-32 md:w-64 md:h-40 rounded-xl overflow-hidden border border-gold/15 shrink-0 snap-center shadow-lg group">
                        <img 
                          src={imgUrl} 
                          alt={`Gallery details ${idx+1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground/80 italic mt-1">Swipe left/right to view session details</p>
                </div>

                {/* 3. Detail Content Sections */}
                {selectedService.slug === "1on1-power-tarot" && (
                  <div className="mt-10 space-y-10">
                    
                    {/* Header Details */}
                    <div className="glass p-6 md:p-8 rounded-2xl relative border border-gold/15">
                      <div className="absolute -top-3 left-6 rounded-full bg-background border border-gold/20 px-3 py-0.5 text-[9px] uppercase tracking-wider text-gold font-bold">
                        1-On-1 Power Tarot Reading Session
                      </div>
                      <h4 className="text-sm md:text-base font-semibold text-gold tracking-wide uppercase mt-2">
                        1 Hour Deep Clarity, Timing and Remedies
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        By Shivani Spiritual Yatri
                      </p>
                      <div className="my-4 border-t border-gold/10" />
                      <h5 className="text-xs uppercase tracking-widest text-foreground font-semibold">
                        What you will receive in this 1-hour session
                      </h5>
                      <p className="mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                        In this 1-on-1 tarot reading session, you will get clear answers about your situation, timing predictions, third party clarity, and remedies to help you move forward.
                      </p>
                    </div>

                    {/* What we will do in this session */}
                    <div className="space-y-6">
                      <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/15 pb-2">
                        What we will do in this session
                      </h3>

                      <div className="space-y-6">
                        {/* Part 1 */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-4">
                            Part 1 — Main question and focus (10 minutes)
                          </h4>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">What we do:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>You share what you want clarity on (love, career, money, foreign settlement, etc.)</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>I help you clarify your question</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>We set the focus for the session</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">You get:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Clear direction for the reading</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Focused energy on your situation</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Part 2 */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-4">
                            Part 2 — Main life reading (20 minutes)
                          </h4>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">What we do:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Pull cards to understand your full situation</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Explore what is happening now</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Identify what is blocking you</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Reveal hidden influences</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>See what is supporting you</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Understand what needs to change</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Read what will happen next</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Check for third party situation in relationships</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">You get:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Complete picture of your situation</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Understanding of blocks</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Clarity on third party (if present)</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>What is coming next</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Part 3 */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-4">
                            Part 3 — Timing and prediction (15 minutes)
                          </h4>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">What we do:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Look at timing for movement</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Explore when communication may come</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Read timing for relationship, job, business, or foreign settlement</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Identify delays and obstacles</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Find best windows of movement</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">You get:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Timing guidance for your situation</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Understanding of delays</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Clearer picture of what to expect</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Part 4 */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-4">
                            Part 4 — Remedies section (10 minutes)
                          </h4>
                          
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">What we do:</h5>
                              <ul className="space-y-2 mb-4">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Check for blocks, evil eye, or negative energy</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Give you remedies based on your situation</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">You get:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Clear remedies for your blocks</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Non-paid options you can start now</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Paid remedy guidance if needed</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="my-6 border-t border-gold/10" />

                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">Non-paid remedies (you can start immediately):</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Simple spiritual practices</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Grounding techniques</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Meditation guidance</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Prayer or mantra</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Cleansing steps</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Letting go practices</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Mindset shifts</span>
                                </li>
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">Paid remedies (if your situation needs stronger spiritual work):</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Discuss deeper remedy options based on your case</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>You decide what fits your situation and budget</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Part 5 */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-4">
                            Part 5 — Energy cleansing and protection (3 minutes)
                          </h4>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">What we do:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Cleanse negative energy from the session</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Wrap you in protective energy</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Clear any heaviness picked up during reading</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">You get:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Leave feeling lighter and clearer</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Protected after the session</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>No heaviness carried forward</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Part 6 */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-4">
                            Part 6 — Final guidance (2 minutes)
                          </h4>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">What we do:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Bring everything together</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Share your most important next step</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Tell you what to focus on now</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>What to avoid</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Final message for peace and clarity</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-foreground font-semibold mb-2">You get:</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Clear action steps</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Confidence about what to do</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                                  <span className="text-gold">•</span>
                                  <span>Peace and direction</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* What areas we cover */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        What areas we cover
                      </h4>
                      <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                        {[
                          "Love and relationships",
                          "Marriage timing",
                          "Breakup and reconciliation",
                          "Third party situation (yes/no, who, impact)",
                          "Career and job",
                          "Money blocks",
                          "Business growth",
                          "Foreign settlement",
                          "Visa delays",
                          "Evil eye or negative energy",
                          "Repeated bad luck",
                          "Stress and anxiety",
                          "Life direction"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                            <span className="text-gold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What you receive from this session */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        What you receive from this session
                      </h4>
                      <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                        {[
                          "Clarity on your situation",
                          "Understanding of blocks",
                          "Third party clarity (if applicable)",
                          "Timing guidance",
                          "Remedies for your challenges",
                          "Energy cleansing after session",
                          "Protection after session",
                          "Clear next steps",
                          "Peace and direction"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                            <span className="text-gold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to expect after your session */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        What to expect after your session
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "You will feel clearer and lighter",
                          "You will know what to do next",
                          "You will have remedies to start",
                          "Energy will be cleansed and protected",
                          "You can reference the session insights anytime"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                            <span className="text-gold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* This session is perfect for you if */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        This session is perfect for you if
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "You are stuck in love or relationship confusion",
                          "You want to know if there is a third party",
                          "You are waiting for movement that is not happening",
                          "You face repeated delays or bad luck",
                          "You feel heavy energy around you",
                          "You want answers about timing",
                          "You want remedies for your blocks",
                          "You want spiritual guidance with honesty and clarity"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                            <span className="text-gold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Session format, Investment, How to book */}
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="glass p-5 rounded-xl border border-gold/5">
                        <h5 className="text-[10px] uppercase text-gold font-bold">Session format</h5>
                        <ul className="mt-2 space-y-1 text-[10px] text-muted-foreground font-light">
                          <li className="flex gap-1 items-start"><span className="text-gold">•</span> <span>1-on-1 private session</span></li>
                          <li className="flex gap-1 items-start"><span className="text-gold">•</span> <span>Duration: 1 hour</span></li>
                          <li className="flex gap-1 items-start"><span className="text-gold">•</span> <span>Live on Zoom or call</span></li>
                          <li className="flex gap-1 items-start"><span className="text-gold">•</span> <span>Deep tarot reading + third party clarity + timing + remedies + energy cleansing + protection</span></li>
                        </ul>
                      </div>

                      <div className="glass p-5 rounded-xl border border-gold/5">
                        <h5 className="text-[10px] uppercase text-gold font-bold">Investment</h5>
                        <p className="mt-2 text-[10px] text-muted-foreground font-light">
                          1 Hour Power Tarot Reading — $200 including tax
                        </p>
                      </div>

                      <div className="glass p-5 rounded-xl border border-gold/5">
                        <h5 className="text-[10px] uppercase text-gold font-bold">How to book</h5>
                        <p className="mt-2 text-[10px] text-muted-foreground font-light">
                          DM “TAROT” to book your session
                        </p>
                      </div>
                    </div>

                    {/* Important note */}
                    <div className="glass p-4.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                      <h5 className="text-[10px] uppercase text-rose-300 font-bold flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-rose-400" /> Important note
                      </h5>
                      <p className="mt-1.5 text-[10px] md:text-[11px] leading-relaxed text-rose-200/80 font-light">
                        This session is for spiritual guidance and clarity. Tarot can help you understand patterns and possibilities, but it should not replace professional legal, medical, financial, or mental health advice.
                      </p>
                    </div>

                  </div>
                )}

                {selectedService.slug === "advanced-aura-healing" && (
                  <div className="mt-10 space-y-10">
                    {/* Header Details */}
                    <div className="glass p-6 md:p-8 rounded-2xl relative border border-gold/15">
                      <div className="absolute -top-3 left-6 rounded-full bg-background border border-gold/20 px-3 py-0.5 text-[9px] uppercase tracking-wider text-gold font-bold">
                        Advanced Aura Healing, Protection & Deep Healing Experience
                      </div>
                      <h4 className="text-sm md:text-base font-semibold text-gold tracking-wide uppercase mt-2">
                        with Reiki Grandmaster Shivani Spiritual Yatri
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        1:1 Session | 60 Minutes | $100
                      </p>
                      <div className="my-4 border-t border-gold/10" />
                      <div className="space-y-3 mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                        <p>This is a powerful, personalized healing experience designed to cleanse your aura, remove energetic blockages, and restore deep inner balance.</p>
                        <p>If you’ve been feeling heavy, stuck, emotionally overwhelmed, or energetically drained, this session helps you reset at a deep level.</p>
                        <p>As a Reiki Grandmaster, I work with advanced energy healing techniques, intuitive guidance, and specific Reiki symbols chosen according to your situation to target the root cause of your imbalance.</p>
                        <p>This session is not just healing—it is a complete process of clearing, activation, and protection of your energy field.</p>
                      </div>
                    </div>

                    {/* What Makes This Session Powerful */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-gold tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        What Makes This Session Powerful
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "Advanced aura cleansing and energy field purification",
                          "Reiki symbol activation based on your specific condition",
                          "Cord cutting to release hidden energetic attachments",
                          "Emotional release using EFT tapping",
                          "Sound healing to elevate your vibration",
                          "Aura sealing and protection"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                            <span className="text-gold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Your 60-Minute Healing Experience */}
                    <div className="space-y-6">
                      <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/15 pb-2">
                        Your 60-Minute Healing Experience
                      </h3>

                      <div className="space-y-6">
                        {/* Grounding & Energy Scan */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            Grounding & Energy Scan (0–10 Minutes)
                          </h4>
                          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                            We begin by grounding your energy and intuitively identifying blockages related to stress, health, relationships, or emotional patterns.
                          </p>
                        </div>

                        {/* Emotional Release */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            Emotional Release (EFT & Inner Healing) (10–25 Minutes)
                          </h4>
                          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                            We use EFT tapping to release stored emotions such as anxiety, fear, stress, and even deep-rooted childhood trauma. This prepares your energy for deeper healing.
                          </p>
                        </div>

                        {/* Reiki Healing & Symbol Activation */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            Reiki Healing & Symbol Activation (25–45 Minutes)
                          </h4>
                          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                            Reiki energy is channeled through your chakras to restore balance. <br />
                            As a Reiki Grandmaster, I use specific symbols based on your situation. These symbols act as energetic codes that help clear blockages and activate healing on emotional, mental, physical, and spiritual levels.
                          </p>
                        </div>

                        {/* Cord Cutting, Aura Cleansing & Sound Healing */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            Cord Cutting, Aura Cleansing & Sound Healing (45–55 Minutes)
                          </h4>
                          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                            We identify and release energetic cords or attachments that may be draining your energy—often from past relationships or unconscious connections. <br />
                            Your aura is cleansed to remove heavy, stagnant, or negative energy, while sound healing frequencies help calm your nervous system and elevate your vibration.
                          </p>
                        </div>

                        {/* Aura Sealing, Protection & Guidance */}
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            Aura Sealing, Protection & Guidance (55–60 Minutes)
                          </h4>
                          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                            Your aura is sealed and strengthened to protect your energy from future drain or external negativity. <br />
                            You will also receive intuitive guidance and simple personalized rituals to maintain your healing.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* This Session Can Support You With */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        This Session Can Support You With
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "Stress, anxiety, and emotional heaviness",
                          "Health challenges (as energetic support alongside treatment)",
                          "Relationship blocks and emotional attachments",
                          "Childhood trauma and past emotional wounds",
                          "Feeling stuck or energetically drained",
                          "Money blocks and repeated life patterns",
                          "Lack of clarity, focus, or inner peace"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                            <span className="text-gold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Important Note */}
                    <div className="glass p-4.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                      <h5 className="text-[10px] uppercase text-rose-300 font-bold flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-rose-400" /> Important Note
                      </h5>
                      <div className="mt-1.5 text-[10px] md:text-[11px] leading-relaxed text-rose-200/80 font-light space-y-2">
                        <p>This is a complementary healing session that supports your overall well-being.</p>
                        <p>It does not replace medical advice or treatment. Please continue any prescribed medications or professional care.</p>
                        <p>Many clients use this session to support and enhance their healing process on emotional, mental, and energetic levels.</p>
                      </div>
                    </div>

                    {/* Bonus Support */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        Bonus Support
                      </h4>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase mb-1">
                            • Personalized Affirmation & Energy Practice
                          </h5>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed pl-3">
                            Custom affirmations and a simple daily ritual based on your situation
                          </p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase mb-1">
                            • Aura Protection Technique
                          </h5>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed pl-3">
                            A practical daily method to protect your energy from negativity and emotional drain
                          </p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase mb-1">
                            • Post-Session Integration Guide
                          </h5>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed pl-3">
                            Clear guidance on what to do after your session to stabilize and enhance your results
                          </p>
                        </div>
                        <div>
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase mb-1">
                            • Intuitive Insight Message
                          </h5>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed pl-3">
                            A short personalized message highlighting what was most important in your healing
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Frequently Asked Questions */}
                    <div className="space-y-4">
                      <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/15 pb-2">
                        Frequently Asked Questions
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            q: "1. How will I feel after the session?",
                            a: "Most clients feel lighter, calmer, and more emotionally balanced. Some may feel deep relaxation or need rest as the healing integrates."
                          },
                          {
                            q: "2. Is this session done online or in person?",
                            a: "This session can be done both remotely and in person. Energy healing works beyond physical distance."
                          },
                          {
                            q: "3. Can this help with health issues?",
                            a: "This session supports your body’s natural healing process on an energetic and emotional level. It is a complementary practice and should be taken alongside medical care."
                          },
                          {
                            q: "4. What is cord cutting and why is it important?",
                            a: "Cord cutting helps release energetic attachments that may be draining your energy. These can come from past relationships, emotional ties, or unconscious connections that block your growth."
                          },
                          {
                            q: "5. Do I need to prepare before the session?",
                            a: "Just be in a quiet, relaxed space with an open mind. This helps you receive the healing more effectively."
                          },
                          {
                            q: "6. How many sessions will I need?",
                            a: "Some clients feel shifts in one session, while deeper or long-term blockages may require multiple sessions."
                          }
                        ].map((faq, idx) => (
                          <div key={idx} className={`p-5 rounded-xl border border-gold/5 ${
                            idx % 3 === 0 ? "card-plum" : idx % 3 === 1 ? "card-violet" : "card-glass"
                          }`}>
                            <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
                              <HelpCircle className="h-3.5 w-3.5 text-gold" /> {faq.q}
                            </h4>
                            <p className="mt-2 text-[11px] md:text-xs leading-relaxed text-muted-foreground/80 font-light pl-5">
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booking */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        Booking
                      </h4>
                      <div className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light space-y-2">
                        <p>If you feel drawn to this session, it’s a sign your energy is ready for a shift.</p>
                        <p>Limited sessions available per week.</p>
                        <p className="font-semibold text-gold mt-4">To book your session:</p>
                        <p>DM “HEALING” or use the booking link below.</p>
                        <p className="italic text-foreground mt-2">Take the first step toward clearing your energy and restoring your balance.</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedService.slug === "tarot-healing-chakra" && (
                  <div className="mt-10 space-y-10">
                    {/* Header Details */}
                    <div className="glass p-6 md:p-8 rounded-2xl relative border border-gold/15">
                      <div className="absolute -top-3 left-6 rounded-full bg-background border border-gold/20 px-3 py-0.5 text-[9px] uppercase tracking-wider text-gold font-bold">
                        💎 THE MOST HIGHLY DEMANDED & RECOMMENDED PREMIUM SERVICE 💎✦
                      </div>
                      <h4 className="text-sm md:text-base font-semibold text-gold tracking-wide uppercase mt-2">
                        TAROT + HEALING + CHAKRA DIAGNOSIS
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        From Shivani Spiritual Yatri
                      </p>
                      <p className="text-xs text-gold font-medium mt-1">
                        🌟 PRIVATE 1:1 VIDEO SESSION | ⏱️ 90 MINUTES | 💰 $350
                      </p>
                      <div className="my-4 border-t border-gold/10" />
                      <div className="space-y-3 mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                        <p>✨ THIS IS MY MOST HIGHLY DEMANDED & RECOMMENDED PREMIUM SERVICE — The ultimate transformation experience for clients seeking deep clarity, powerful energetic healing, complete chakra diagnosis, and lasting subconscious reprogramming in one private, luxurious session.</p>
                        <p>If you’re stuck, blocked, or feeling heavy, this 90-minute premium session reveals the root cause of your struggles and fixes it completely.</p>
                      </div>
                    </div>

                    {/* What's Included */}
                    <div className="space-y-6">
                      <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/15 pb-2">
                        🎁 WHAT’S INCLUDED IN THIS PREMIUM SESSION
                      </h3>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            ⭐ 45 MINUTES — DEEP TAROT CARD READING
                          </h4>
                          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light">
                            Complete clarity on love, career, money, future, and emotional patterns
                          </p>
                        </div>

                        <div className="glass p-6 rounded-xl border border-gold/10">
                          <h4 className="text-sm font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            ⭐ 45 MINUTES — ADVANCED HEALING + COMPLETE CHAKRA DIAGNOSIS
                          </h4>
                          <ul className="space-y-2 mt-2 text-xs md:text-sm text-muted-foreground/90 font-light">
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Evil eye removal</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Aura cleansing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Cord cutting</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Reiki healing with symbols</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>EFT (Emotional Freedom Technique)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Sound healing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Chakra balancing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Subconscious mind reprogramming</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">✨</span>
                              <span>Advanced Chakra Diagnosis — which of your 7 chakras are blocked, overactive, or perfectly balanced (Root, Sacral, Solar Plexus, Heart, Throat, Third Eye, Crown)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Custom Music Created For You */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-gold tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        🎶 CUSTOM MUSIC CREATED FOR YOU
                      </h4>
                      <ul className="space-y-3 mt-2 text-xs md:text-sm text-muted-foreground/90 font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">🎵</span>
                          <span>Custom Manifestation Music — made specifically for your situation with specific frequencies & hertz to reprogram your subconscious mind (NOT generic music)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">🎵</span>
                          <span>Custom Meditation Music — made for your healing goals with specific healing frequencies</span>
                        </li>
                      </ul>
                    </div>

                    {/* Actual Crystals Shipped To You */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-gold tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        💎 ACTUAL CRYSTALS SHIPPED TO YOU
                      </h4>
                      <ul className="space-y-3 mt-2 text-xs md:text-sm text-muted-foreground/90 font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>Personalized crystals according to your Tarot + Chakra results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>You receive the REAL crystals — not just a guide — shipped after your session</span>
                        </li>
                      </ul>
                    </div>

                    {/* Personalized Premium PDF */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-gold tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        📄 PERSONALIZED PREMIUM PDF (Delivered Within 24 Hours)
                      </h4>
                      <ul className="space-y-3 mt-2 text-xs md:text-sm text-muted-foreground/90 font-light">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>Custom Affirmation — for your exact situation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>Chakra Mantras — specific mantras for EACH of your chakras</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>FULL-FLEDGED DIET PLAN — what to EAT ✅ & what to AVOID ❌ based on your blocked chakras</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>PERSONALIZED EXERCISES — what to DO ✅ & what to AVOID ❌ — specific movements to activate & balance each chakra</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>Energy-alignment suggestions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">✨</span>
                          <span>COMPLETE CHAKRA REPORT — which chakras are perfect, which need work, and step-by-step how to balance them</span>
                        </li>
                      </ul>
                    </div>

                    {/* Tarot Questions You Can Ask */}
                    <div className="space-y-6">
                      <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/15 pb-2">
                        🔮 TAROT QUESTIONS YOU CAN ASK
                      </h3>

                      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {/* Health, Wealth, Career, Relationship */}
                        <div className="glass p-5 rounded-xl border border-gold/10">
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            💪 Health, Wealth, Career, Relationship
                          </h5>
                          <ul className="space-y-2 text-xs text-muted-foreground/90 font-light">
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is blocking my health? 💔</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is blocking my wealth? 💸</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is blocking my career? 💼</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is blocking my relationship? ❤️</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is blocking my life? 🚫</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Why am I not moving forward in my career? 📉</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is causing my money blocks? 💰</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is blocking my relationship? 🔗</span></li>
                          </ul>
                        </div>

                        {/* Pregnancy & Conceiving */}
                        <div className="glass p-5 rounded-xl border border-gold/10">
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            🤰 Pregnancy & Conceiving
                          </h5>
                          <ul className="space-y-2 text-xs text-muted-foreground/90 font-light">
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Will I get pregnant? 🤰</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>When will I conceive? ⏰</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Is there something blocking my pregnancy? 🚫</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is the time prediction for conceiving? 📅</span></li>
                          </ul>
                        </div>

                        {/* Relationship & Feelings */}
                        <div className="glass p-5 rounded-xl border border-gold/10">
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            💕 Relationship & Feelings
                          </h5>
                          <ul className="space-y-2 text-xs text-muted-foreground/90 font-light">
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What does this person think about me? 🤔</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What are their feelings toward me right now? ❤️</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Is there a third party involved? 👥</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Is this relationship right for me? ✅</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Will I get back with my ex? 💔</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>When will I get married? 💍</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Who will be my partner? 👤</span></li>
                          </ul>
                        </div>

                        {/* Spiritual Insights */}
                        <div className="glass p-5 rounded-xl border border-gold/10">
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            🔮 Spiritual Insights
                          </h5>
                          <ul className="space-y-2 text-xs text-muted-foreground/90 font-light">
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Is there evil eye blocking my success? 🌑</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Is someone jealous of me or doing harm? 😤</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What is blocking my foreign settlement? 🛂</span></li>
                          </ul>
                        </div>

                        {/* Future & Timing */}
                        <div className="glass p-5 rounded-xl border border-gold/10">
                          <h5 className="text-[11px] font-semibold text-gold tracking-wide uppercase border-b border-gold/10 pb-2 mb-3">
                            🕰️ Future & Timing
                          </h5>
                          <ul className="space-y-2 text-xs text-muted-foreground/90 font-light">
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Will I get foreign settlement (visa, immigration, moving abroad)? 🌍</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>When will this happen? ⏰</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>What career path should I take? 💼</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Why do I feel stuck in life? 🚫</span></li>
                            <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Any other question about your life 🌟</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* How This Works For You */}
                    <div className="glass p-6 rounded-xl border border-gold/10 bg-gradient-to-br from-gold/5 via-transparent to-sapphire/5">
                      <h4 className="text-xs font-semibold text-gold tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        HOW THIS WORKS FOR YOU
                      </h4>
                      <p className="text-xs md:text-sm leading-relaxed text-foreground/90 font-light">
                        Tarot reveals your patterns → Chakra Diagnosis identifies which chakras are blocked → Full diet plan + exercises + mantras + affirmations give you complete action plan → Healing clears the energy → Evil eye removed → Custom music with specific frequencies reprograms your subconscious mind → Crystals hold the new energy → You get clarity, energy shift, chakra balance, and lasting transformation 🌈
                      </p>
                    </div>

                    {/* This Premium Service Is For You If */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        💎 THIS PREMIUM SERVICE IS FOR YOU IF
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "You feel stuck, blocked, drained, or emotionally heavy",
                          "You need clarity in love, career, finances, health, or life direction",
                          "You feel affected by negative energy, evil eye, or repeated patterns",
                          "You have relationship confusion, third-party situations, blocked love, or toxic connections",
                          "You have money blocks, career uncertainty, financial stress, or lack of growth",
                          "You have anxiety, stress, overthinking, fear, or mental chaos",
                          "You have past trauma, childhood wounds, or deep emotional pain",
                          "You have repeated patterns that won’t change despite your efforts",
                          "You need clarity on health, wealth, career, or relationship blocks",
                          "You need clarity on foreign settlement, visa, immigration, or moving abroad",
                          "You want time predictions for marriage, pregnancy, money, career, or relationships",
                          "You want to know when you will conceive or get pregnant",
                          "You want to know which chakras are blocking your life",
                          "You want a full-fledged diet plan, exercises, what to eat/avoid, mantras, affirmations for your chakras",
                          "You want a private, premium, confidential, and advanced healing service with Tarot + Healing + Chakra Diagnosis"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-snug">
                            <span className="text-gold">✅</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Frequently Asked Questions */}
                    <div className="space-y-4">
                      <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/15 pb-2">
                        ❓ FREQUENTLY ASKED QUESTIONS
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            q: "Q: How will I feel after this premium service?",
                            a: (
                              <div className="space-y-2">
                                <p>A: You will feel lighter, clear, emotionally released, protected, spiritually cleansed, and at peace. Your old patterns will shift, evil eye will be removed, your chakras will be balanced, and you’ll feel a deep change in your subconscious mind. You’ll have:</p>
                                <ul className="space-y-1.5 pl-3">
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Full answers from Tarot (time predictions, marriage timing, pregnancy timing, third party, foreign settlement, evil eye insights, health/wealth/career/relationship blocks, feelings of the other person)</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Complete chakra diagnosis (which chakras are blocked & what they’re causing)</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Full-fledged diet plan (what to eat ✅ & what to avoid ❌)</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Personalized exercises (what to do ✅ & what to avoid ❌)</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Chakra mantras + Personalized affirmations</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Deep energy shift from Healing</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Custom manifestation music + Custom meditation music</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Personalized crystals</span></li>
                                  <li className="flex items-start gap-1"><span className="text-gold">•</span> <span>Private PDF to maintain results forever 📄</span></li>
                                </ul>
                              </div>
                            )
                          },
                          {
                            q: "Q: Is this service online or in person?",
                            a: "A: This is done via private video call (Zoom, WhatsApp, or Google Meet). Energy healing, Tarot, chakra diagnosis, and subconscious reprogramming work beyond physical distance 🌍"
                          },
                          {
                            q: "Q: Do I need to prepare anything?",
                            a: "A: Just be in a quiet, calm space with an open mind. Bring any specific questions you want clarity on 🧘"
                          },
                          {
                            q: "Q: What if I’m new to Tarot or Healing?",
                            a: "A: No experience needed. I guide you through everything step-by-step 📚"
                          },
                          {
                            q: "Q: How is the manifestation music different from regular music?",
                            a: "A: The manifestation music is created specifically for your requirement based on your Tarot + Chakra results. It uses specific frequencies & hertz that directly access and rewrite your subconscious mind, replacing old patterns with new, empowering beliefs. This is NOT generic music — it’s made just for you 🎶"
                          },
                          {
                            q: "Q: Why do I receive actual crystals instead of a guide?",
                            a: "A: You receive the actual personalized crystals so you can use them directly for your healing. This is more powerful than just reading about them — you hold the energy yourself 💎"
                          },
                          {
                            q: "Q: Will I get the music, crystals, and PDF after the session?",
                            a: "A: Yes. The PDF (affirmation, mantras, full diet plan, exercises, chakra report) is delivered within 24 hours. The custom manifestation music, custom meditation music, and actual crystals are shipped to you after your session 📦"
                          }
                        ].map((faq, idx) => (
                          <div key={idx} className={`p-5 rounded-xl border border-gold/5 ${
                            idx % 3 === 0 ? "card-plum" : idx % 3 === 1 ? "card-violet" : "card-glass"
                          }`}>
                            <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
                              <HelpCircle className="h-3.5 w-3.5 text-gold" /> {faq.q}
                            </h4>
                            <div className="mt-2 text-[11px] md:text-xs leading-relaxed text-muted-foreground/80 font-light pl-5">
                              {faq.a}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Session Format */}
                    <div className="glass p-5 rounded-xl border border-gold/5">
                      <h5 className="text-[10px] uppercase text-gold font-bold">📹 Session Format</h5>
                      <ul className="mt-2 space-y-1.5 text-[10px] md:text-[11px] text-muted-foreground font-light">
                        <li className="flex gap-1 items-start"><span className="text-gold">📹</span> <span>Private 1:1 video call (Zoom, WhatsApp, or Google Meet)</span></li>
                        <li className="flex gap-1 items-start"><span className="text-gold">🧘</span> <span>Be in a calm, quiet, undisturbed space</span></li>
                        <li className="flex gap-1 items-start"><span className="text-gold">💧</span> <span>Keep water nearby</span></li>
                        <li className="flex gap-1 items-start"><span className="text-gold">🎧</span> <span>Use headphones if possible</span></li>
                        <li className="flex gap-1 items-start"><span className="text-gold">🔒</span> <span>Completely confidential one-to-one session</span></li>
                      </ul>
                    </div>

                    {/* Important Disclaimer */}
                    <div className="glass p-4.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                      <h5 className="text-[10px] uppercase text-rose-300 font-bold flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-rose-400" /> ⚠️ IMPORTANT
                      </h5>
                      <p className="mt-1.5 text-[10px] md:text-[11px] leading-relaxed text-rose-200/80 font-light">
                        This is a complementary spiritual wellness service and does not replace medical advice or treatment. Please continue any prescribed medicines or professional care 🏥
                      </p>
                    </div>

                    {/* Booking */}
                    <div className="glass p-6 rounded-xl border border-gold/10">
                      <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase border-b border-gold/10 pb-2 mb-3">
                        📩 BOOK YOUR PREMIUM SESSION
                      </h4>
                      <div className="text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light space-y-2">
                        <p className="font-semibold text-gold">⚡ Limited private sessions available each week ⚡</p>
                        <p>📱 DM: TRANSFORMATION</p>
                        <p>📲 WhatsApp: [Your Number]</p>
                        <p>📧 Email: [Your Email]</p>
                        <p>🔗 Booking Link: [Your Link]</p>
                        <div className="my-4 border-t border-gold/10" />
                        <p className="text-[10px] text-muted-foreground italic flex items-center gap-1.5">
                          <Shield className="h-3.5 w-3.5 text-gold" /> 🔒 All information is completely confidential. Everything shared in your session is private and protected.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Footer Actions inside modal */}
                <div className="mt-12 pt-6 border-t border-gold/10 flex flex-wrap gap-4 justify-end">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="rounded-full border border-gold/25 bg-transparent hover:bg-card hover:border-gold/50 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground cursor-pointer transition-colors"
                  >
                    Close Details
                  </button>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(selectedService.whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full btn-premium-glow px-6 py-3.5 text-xs font-semibold uppercase tracking-widest cursor-pointer"
                  >
                    <MessageSquare className="h-4.5 w-4.5" /> Book via WhatsApp
                  </a>
                  <Link
                    to="/booking"
                    onClick={() => setSelectedService(null)}
                    className="group inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest"
                  >
                    {selectedService.slug === "1on1-power-tarot" || selectedService.slug === "advanced-aura-healing" 
                      ? "Book This Session" 
                      : selectedService.slug === "tarot-healing-chakra" 
                        ? "Book Premium Session" 
                        : "Book Session Slot"} <ArrowRight className="h-4 w-4" />
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
