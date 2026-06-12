import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Shield, 
  Heart, 
  Compass, 
  Globe, 
  Award, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare
} from "lucide-react";

import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/utils/site";

// Remedy Card Images
import sacredRemedies from "@/assets/images/sacred_remedies.png";
import spellWork from "@/assets/images/spell_work.png";

const REMEDIES = [
  {
    id: 1,
    title: "Sacred Remedies and Pujas",
    category: "Sacred Support",
    image: sacredRemedies,
    shortDesc: "Spiritual support and sacred pujas designed to help remove blockages, restore peace, and support your life path.",
    detailedDesc: "Our sacred remedies and pujas are offered as spiritual support for people who are seeking peace, protection, healing, clarity, harmony, and positive movement in life. Each remedy is created with prayer, devotion, sacred intention, and spiritual discipline, so the work feels meaningful, personalized, and deeply supportive.\n\nThese remedies are not ordinary rituals. They are performed with focus and care for the purpose of helping remove energetic blockages, calm difficult situations, strengthen spiritual protection, and support the path that is meant for the person. Many people come for remedies when they feel stuck, emotionally burdened, spiritually disturbed, or simply ready to invite more balance and blessing into their lives.",
    whatTheySupportTitle: "What sacred remedies can support",
    whatTheySupportDesc: "Our sacred remedies may be offered for:",
    whatTheySupportPoints: [
      "Protection and cleansing.",
      "Black magic removal.",
      "Third-party removal.",
      "Relationship harmony.",
      "Marriage support.",
      "Foreign settlement.",
      "Career growth and business progress.",
      "Abundance and financial flow.",
      "Confidence and inner strength.",
      "Peace, healing, and emotional balance.",
      "Conception blessings and fertility support."
    ],
    whyChooseTitle: "Why people choose sacred remedies",
    whyChooseDesc: "People choose sacred remedies when they want a stronger, more focused spiritual process for a specific life situation. A remedy can support energetic clearing, emotional ease, and spiritual alignment in a way that feels personal and intentional. It is often chosen when someone wants guidance, protection, and a sense of sacred support while moving through an important matter in life.",
    howTheyWorkTitle: "How sacred remedies work",
    howTheyWorkDesc: "Sacred remedies are prepared through prayer, spiritual intention, chanting, energy cleansing, candle work, crystals, and devotional focus. The purpose is to create a spiritually aligned working that supports the client’s highest good. Each remedy is handled with care so the energy is directed toward peace, progress, and positive transformation.",
    pujasTitle: "Pujas",
    pujasDesc: "Pujas are sacred spiritual rituals performed with devotion and reverence. They are used to invite divine blessing, remove obstacles, strengthen protection, and support desired outcomes in life. A puja may be done for marriage, family harmony, foreign settlement, career growth, protection, conception, or relief from negative energy.\n\nA puja creates a sacred atmosphere where prayer, offerings, mantra, and intention come together. Many people choose pujas when they want a traditional and powerful spiritual practice that feels ceremonial, blessed, and deeply respectful.",
    differentNeedsTitle: "Remedies for different needs",
    differentNeeds: [
      {
        label: "For relationship and marriage matters",
        desc: "These remedies are chosen when there is delay, misunderstanding, emotional distance, family concern, or third-party interference. The intention is to support harmony, stability, and smoother movement in the relationship."
      },
      {
        label: "For foreign settlement",
        desc: "These remedies are used when someone wants support with relocation, immigration, travel, or opportunities abroad. They are performed to help clear obstacles and open the path for progress and favorable movement."
      },
      {
        label: "For career and business",
        desc: "These remedies are for growth, success, visibility, and forward movement in work or business. They are often chosen when someone feels blocked or wants stronger support for expansion."
      },
      {
        label: "For conception",
        desc: "These pujas and remedies are offered for conception blessings, fertility support, and family expansion. They are performed with devotion, softness, and sacred intention for those seeking to welcome a child into their lives."
      },
      {
        label: "For black magic removal",
        desc: "This remedy is offered for cleansing heavy energy, removing negative spiritual influence, and restoring protection and peace. It is intended to help the person feel lighter, safer, and more spiritually supported."
      }
    ],
    closingTitle: "Premium closing line",
    closingDesc: "Our sacred remedies and pujas are created to support the highest good of the person and the situation, with care, sincerity, and spiritual dedication. They are designed to bring comfort, protection, and positive energetic movement, while honoring the sacred nature of the work.",
    disclaimer: "Spiritual remedies and pujas are meant for holistic energy support and inner alignment; they do not substitute for professional medical, legal, or financial services."
  },
  {
    id: 2,
    title: "Spell Work",
    category: "Spell Work",
    image: spellWork,
    shortDesc: "Focused energetic support and clear intention designed to help clear resistance, strengthen intention, and invite positive shifts.",
    detailedDesc: "Our spell work is a refined spiritual service created for people who want focused energetic support, clear intention, and meaningful movement in life. Each working is prepared with care, devotion, and sacred discipline so the experience feels personal, powerful, and spiritually aligned.\n\nSpell work is often chosen when someone wants support for a very specific situation and wants the energy to be directed with precision. It is a deeper, more concentrated form of spiritual support, designed to help clear resistance, strengthen intention, and invite the right kind of shift.",
    whatTheySupportTitle: "What it can support",
    whatTheySupportDesc: "Spell work may be offered for:",
    whatTheySupportPoints: [
      "Protection from negativity.",
      "Cleansing of heavy or stagnant energy.",
      "Love and relationship harmony.",
      "Marriage support and commitment.",
      "Third-party removal.",
      "Foreign settlement and relocation support.",
      "Career growth and business progress.",
      "Money flow and abundance.",
      "Confidence, courage, and self-worth.",
      "Peace, healing, and emotional balance."
    ],
    whyChooseTitle: "Why people choose it",
    whyChooseDesc: "People often choose spell work when they feel ready for focused spiritual intervention around a specific concern. It can be especially meaningful when there is emotional heaviness, energetic blockage, delay, confusion, or a desire to strengthen a certain area of life with clarity and intention.\n\nSpell work is also chosen because it feels intimate and personalized. Rather than being general, it is created around the person’s exact need and the energy they want to transform.",
    howTheyWorkTitle: "How it is done",
    howTheyWorkDesc: "Our spell work may include:",
    howTheyWorkPoints: [
      "Prayer.",
      "Candles.",
      "Crystals.",
      "Mantra.",
      "Meditation.",
      "Sacred words.",
      "Energy cleansing.",
      "Focused intention."
    ],
    differentNeedsTitle: "Remedies for different needs",
    differentNeeds: [
      {
        label: "For relationship matters",
        desc: "Spell work can support love, marriage, harmony, emotional understanding, and clearing outside interference. It is often chosen when a connection feels delayed, strained, or affected by confusion or third-party energy. The intention is to support peace, clarity, and smoother movement in the relationship. This kind of work is especially helpful when someone wants to invite softer communication and deeper emotional alignment."
      },
      {
        label: "For foreign settlement",
        desc: "Spell work can also be used for foreign settlement, travel, immigration support, and opportunities abroad. It is chosen when a person wants to open pathways, reduce resistance, and support a smoother transition into a new place or life chapter. The focus is on movement, progress, and favorable flow. Many clients appreciate this kind of work when they are ready for a new beginning and want spiritual support for the journey ahead."
      }
    ],
    closingTitle: "Premium closing line",
    closingDesc: "Our spell work is offered as a luxurious spiritual service for those seeking focused support, sacred transformation, and meaningful movement in life. It is created to help align intention with energy so the path can open with greater clarity, confidence, and divine support.",
    disclaimer: "Spell work is meant for holistic energy support and inner alignment; it does not substitute for professional medical, legal, or financial services."
  }
];

const WHY_CHOOSE_POINTS = [
  {
    id: 1,
    title: "Personalized Guidance",
    description: "Every remedy and tarot card reading is designed specifically around your unique birth parameters and current life circumstances.",
    icon: Compass,
    badge: "01"
  },
  {
    id: 2,
    title: "Private One-to-One Support",
    description: "Experience 100% focused, intimate support, giving you a safe and nurturing space to share your deepest life concerns.",
    icon: Heart,
    badge: "02"
  },
  {
    id: 3,
    title: "Worldwide Online Sessions",
    description: "Access premium spiritual guidance and remedies from anywhere in the world via secure, high-definition online consultations.",
    icon: Globe,
    badge: "03"
  },
  {
    id: 4,
    title: "Professional Spiritual Approach",
    description: "Combining intuitive guidance with highly practical, grounded remedies to help you take action in your physical world.",
    icon: Award,
    badge: "04"
  },
  {
    id: 5,
    title: "Confidential Consultations",
    description: "Your trust is sacred. All readings, personal stories, document details, and prescribed remedies are strictly confidential.",
    icon: Shield,
    badge: "05"
  },
  {
    id: 6,
    title: "Practical & Spiritual Balance",
    description: "We focus on actionable, realistic changes rather than overwhelming mystical rituals, creating sustainable life harmony.",
    icon: Sparkles,
    badge: "06"
  }
];

export default function Remedies() {
  const [selectedRemedy, setSelectedRemedy] = useState(null);

  // Prevent scroll when modal is active
  useEffect(() => {
    if (selectedRemedy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedRemedy]);

  // Esc key closure for detailed modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedRemedy(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getWhatsAppLink = () => {
    const text = `Hello Shivani Spiritual Yatri,\n\nI would like to know more about this remedy.\n\nPlease share complete details.`;
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <CosmicBackground />

      {/* 1. PREMIUM HERO SECTION (Centred to match inner pages, text-focused) */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 border-b border-gold/10 bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={50} />
        </div>
        
        {/* Magic particles / sparkles */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-gold rounded-full opacity-35 animate-twinkle pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-gold rounded-full opacity-45 animate-twinkle pointer-events-none" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-gold rounded-full opacity-25 animate-twinkle pointer-events-none" style={{ animationDelay: "0.8s" }} />

        {/* Dynamic spinning coordinate overlays */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 z-[5]">
          <div className="h-[550px] w-[550px] rounded-full border border-gold/5 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-sapphire/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "50s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
          {/* Spotlight Backlights */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-sapphire/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-gold/5 blur-[90px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "14s" }} />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-gold" /> Sacred Remedies
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium uppercase text-glow-portal"
          >
            Spiritual Remedies For <span className="text-gradient-cosmic">Transformation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide font-light"
          >
            Personalized spiritual remedies designed to support emotional healing, energy balance, protection, abundance, confidence, relationships, career growth, and inner peace.
          </motion.p>

          {/* Centered Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <Link to="/booking" className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-widest uppercase btn-premium-glow">
              Book A Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#remedies-grid" className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-widest uppercase btn-outline-premium">
              Explore Remedies
            </a>
          </motion.div>

          {/* Trust Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-[10px] sm:text-xs tracking-wider text-muted-foreground/60 uppercase font-light font-sans text-glow-subtle"
          >
            Private Sessions Available Worldwide • Personalized Guidance • Confidential Consultations
          </motion.div>
        </div>
      </section>


      {/* 2. REMEDIES GRID (Desktop: 2, Tablet: 2, Mobile: 1) */}
      <section id="remedies-grid" className="relative py-24 border-b border-gold/15 bg-background/30">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="font-display text-2.5xl md:text-3.5xl tracking-[0.08em] font-medium text-foreground uppercase">
                Personalized <span className="text-gradient-gold">Spiritual Remedies</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground font-light tracking-wide leading-relaxed">
                Discover specific alignments and support designed to bring balance, success, and energetic protection to your life journey.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {REMEDIES.map((remedy, i) => (
              <Reveal key={remedy.id} delay={i * 0.1}>
                <div
                  className="group relative rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-gold/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.65),0_0_25px_rgba(210,175,55,0.2),inset_0_0_15px_rgba(210,175,55,0.02)] flex flex-col h-full"
                >
                  {/* Sweep light reflection */}
                  <div className="card-shine-sweep" />

                  {/* Card Image section */}
                  <div className="relative h-[220px] w-full overflow-hidden border-b border-gold/15 shrink-0 bg-[#0D1117]/25">
                    <img
                      src={remedy.image}
                      alt={remedy.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-4 left-4 z-10 rounded-full border border-gold/30 bg-[#151B26]/85 backdrop-blur-sm px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest text-gold">
                      {remedy.category}
                    </span>
                  </div>

                  {/* Card Content section */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="font-display text-lg md:text-xl font-medium tracking-wide uppercase text-foreground group-hover:text-gold transition-colors">
                      {remedy.title}
                    </h3>
                    <p className="mt-3 text-xs md:text-sm text-muted-foreground/90 font-light leading-relaxed tracking-wide flex-grow">
                      {remedy.shortDesc}
                    </p>

                    {/* Benefit bullet list */}
                    <div className="mt-5 space-y-2.5">
                      {(remedy.benefits || remedy.whatTheySupportPoints.slice(0, 3)).map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground/80">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold/80 mt-0.5" />
                          <span className="leading-normal">{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedRemedy(remedy)}
                        className="rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all text-gold cursor-pointer"
                      >
                        View Details
                      </button>
                      <a
                        href={getWhatsAppLink(remedy.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="relative rounded-full btn-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all overflow-hidden flex items-center justify-center gap-1.5 group/btn"
                      >
                        {/* Shimmer sweep effect */}
                        <div className="btn-shine" />
                        <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                        Get Guidance
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE SHIVANI SPIRITUAL YATRI */}
      <section className="relative py-24 border-b border-gold/15">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="font-display text-2.5xl md:text-3.5xl tracking-[0.08em] font-medium text-foreground uppercase">
                Why Choose <span className="text-gradient-gold">Shivani Spiritual Yatri</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground font-light tracking-wide leading-relaxed">
                We combine ancient spiritual wisdom with a highly personalized, practical approach to bring real, sustainable change into your life.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_POINTS.map((pt, idx) => {
              const IconComp = pt.icon;
              // Alternating card gradients for premium layout
              const cardBgClass = idx % 2 === 0
                ? "bg-gradient-to-br from-[#151B26]/50 to-[#0D1117]/85 border-gold/15"
                : "bg-gradient-to-br from-[#1E2638]/40 to-[#0D1117]/85 border-gold/25 shadow-[0_10px_30px_rgba(216,182,122,0.03)]";
              
              return (
                <Reveal key={pt.id} delay={idx * 0.1}>
                  <div className={`group relative rounded-2xl border ${cardBgClass} p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-gold/40 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(216,182,122,0.1)] h-full flex flex-col justify-between`}>
                    
                    {/* Small floating particles */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-35 transition-opacity duration-500 overflow-hidden">
                      <div className="absolute top-4 left-6 w-1 h-1 bg-gold rounded-full animate-ping" />
                      <div className="absolute top-1/4 right-8 w-1.5 h-1.5 bg-gold/70 rounded-full animate-float-slow" style={{ animationDelay: "1s", animationDuration: "5s" }} />
                      <div className="absolute bottom-1/4 left-10 w-1 h-1 bg-gold/50 rounded-full animate-float-slow" style={{ animationDelay: "2s", animationDuration: "7s" }} />
                      <div className="absolute bottom-6 right-12 w-2 h-2 bg-gold/60 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                    </div>

                    <div>
                      {/* Icon Base and animation */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 text-gold group-hover:bg-gold/15 group-hover:border-gold group-hover:scale-110 transition-all duration-500">
                          <IconComp className="h-5 w-5 transition-transform duration-700 group-hover:rotate-[360deg]" />
                        </div>
                        <span className="text-2xl font-display font-light text-gold/15 group-hover:text-gold/25 transition-colors duration-500">
                          {pt.badge}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-md md:text-lg font-medium tracking-wide uppercase text-foreground group-hover:text-gold transition-colors">
                        {pt.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground/85 font-light tracking-wide">
                        {pt.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE PREMIUM GLASS DETAIL POPUP MODAL */}
      <AnimatePresence>
        {selectedRemedy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRemedy(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/20 bg-[#151B26]/95 backdrop-blur-xl p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(216,182,122,0.15)] flex flex-col gap-6 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent cursor-default"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedRemedy(null)}
                className="absolute top-4 right-4 z-30 rounded-full border border-gold/15 bg-white/5 hover:bg-white/10 p-2 text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Modal image section */}
                <div className="col-span-1 md:col-span-5 relative h-[200px] md:h-[300px] rounded-xl overflow-hidden border border-gold/15 bg-[#0D1117]/30">
                  <img
                    src={selectedRemedy.image}
                    alt={selectedRemedy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151B26] via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute top-3 left-3 z-10 rounded-full border border-gold/30 bg-[#151B26]/90 px-3 py-0.5 text-[8px] font-bold uppercase tracking-widest text-gold">
                    {selectedRemedy.category}
                  </span>
                </div>

                {/* Modal content section */}
                <div className="col-span-1 md:col-span-7 space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium tracking-wide uppercase text-foreground">
                    {selectedRemedy.title}
                  </h3>
                  
                  <div className="space-y-5 max-h-[50vh] md:max-h-[55vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gold/20 text-xs md:text-sm text-muted-foreground leading-relaxed font-light tracking-wide">
                    {/* Detailed Description */}
                    <div className="whitespace-pre-line text-muted-foreground/90">
                      {selectedRemedy.detailedDesc}
                    </div>

                    {/* Old Card Properties (if present) */}
                    {selectedRemedy.whoFor && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">Who this is for:</h4>
                        <p className="text-muted-foreground/90">{selectedRemedy.whoFor}</p>
                      </div>
                    )}

                    {selectedRemedy.guidance && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">Suggested Guidance:</h4>
                        <p className="text-muted-foreground/90">{selectedRemedy.guidance}</p>
                      </div>
                    )}

                    {selectedRemedy.benefits && !selectedRemedy.whatTheySupportPoints && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-1.5">Benefits:</h4>
                        <div className="space-y-1.5">
                          {selectedRemedy.benefits.map((b, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-muted-foreground/80">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold/80 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* New Card Properties (for Sacred Remedies and Pujas) */}
                    {selectedRemedy.whatTheySupportTitle && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">{selectedRemedy.whatTheySupportTitle}</h4>
                        <p className="text-muted-foreground/90">{selectedRemedy.whatTheySupportDesc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-2 bg-[#0D1117]/30 border border-gold/5 p-4 rounded-xl">
                          {selectedRemedy.whatTheySupportPoints.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-muted-foreground/85">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold/80 mt-0.5" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedRemedy.whyChooseTitle && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">{selectedRemedy.whyChooseTitle}</h4>
                        <p className="text-muted-foreground/90">{selectedRemedy.whyChooseDesc}</p>
                      </div>
                    )}

                    {selectedRemedy.howTheyWorkTitle && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">{selectedRemedy.howTheyWorkTitle}</h4>
                        <p className="text-muted-foreground/90">{selectedRemedy.howTheyWorkDesc}</p>
                        {selectedRemedy.howTheyWorkPoints && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-2 bg-[#0D1117]/30 border border-gold/5 p-4 rounded-xl">
                            {selectedRemedy.howTheyWorkPoints.map((pt, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-muted-foreground/85">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold/80 mt-0.5" />
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {selectedRemedy.pujasTitle && (
                      <div className="border-t border-gold/10 pt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">{selectedRemedy.pujasTitle}</h4>
                        <p className="text-muted-foreground/90 whitespace-pre-line">{selectedRemedy.pujasDesc}</p>
                      </div>
                    )}

                    {selectedRemedy.differentNeedsTitle && (
                      <div className="space-y-3 border-t border-gold/10 pt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">{selectedRemedy.differentNeedsTitle}</h4>
                        <div className="space-y-3">
                          {selectedRemedy.differentNeeds.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <span className="text-xs font-semibold text-gold/90">{item.label}</span>
                              <p className="text-muted-foreground/85 pl-3 border-l border-gold/20 leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedRemedy.closingDesc && (
                      <div className="border-t border-gold/10 pt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">{selectedRemedy.closingTitle}</h4>
                        <p className="text-muted-foreground/90 italic">{selectedRemedy.closingDesc}</p>
                      </div>
                    )}
                  </div>

                  {/* Tiny disclaimer */}
                  <div className="border-t border-gold/10 pt-3 text-[9px] text-muted-foreground/50 leading-relaxed italic tracking-wider font-light">
                    Disclaimer: {selectedRemedy.disclaimer}
                  </div>

                  {/* Actions in footer of popup */}
                  <div className="pt-2 grid grid-cols-2 gap-4">
                    <Link
                      to="/booking"
                      onClick={() => setSelectedRemedy(null)}
                      className="rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all text-gold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Book Consultation
                    </Link>
                    <a
                      href={getWhatsAppLink(selectedRemedy.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="relative rounded-full btn-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all overflow-hidden flex items-center justify-center gap-1.5 group/modal-btn"
                    >
                      {/* Shimmer sweep effect */}
                      <div className="btn-shine" />
                      <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                      Get Guidance on WhatsApp
                    </a>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
