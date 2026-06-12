import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Heart, Compass, Award, BookOpen, Sun, 
  Shield, Zap, Layers, Users, CheckCircle2, ChevronRight,
  Clock, X, MessageSquare, ArrowRight, Activity, Eye, AlertCircle
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { BentoCard } from "@/components/common/BentoCard";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { SITE } from "@/utils/site";

// Import existing visual assets
import aboutFullImg from "@/assets/images/about_full.png";
import aboutPreview from "@/assets/images/about_preview.png";
import sacredRemediesImage from "@/assets/images/sacred_remedies.png";
import clearQuartz from "@/assets/images/clear_quartz.png";
import serviceLove from "@/assets/images/service_love.webp";
import serviceCareer from "@/assets/images/service_career.webp";
import serviceHealing from "@/assets/images/service_healing.webp";
import serviceTarot from "@/assets/images/service_tarot.webp";
import serviceNumerology from "@/assets/images/service_numerology.webp";

// Prefilled WhatsApp booking URL
const getWhatsAppBookUrl = (consultationName) => {
  const text = `Hello Shivani Spiritual Yatri,\n\nI would like to book the ${consultationName}.\n\nPlease share details.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
};

// 6 Consultation Services Data
const CONSULTATIONS = [
  {
    id: "personal-spiritual",
    title: "Personal Spiritual Consultation",
    price: "111",
    duration: "60 Mins",
    image: sacredRemediesImage,
    shortDescription: "A personalized one-on-one guidance session designed to help individuals gain clarity, emotional balance, energetic healing, and direction in life.",
    description: "A personalized one-on-one guidance session designed to help individuals gain clarity, emotional balance, energetic healing, and direction in life.",
    category: "Personal Guidance"
  },
  {
    id: "love-relationship",
    title: "Love & Relationship Guidance",
    price: "Custom",
    duration: "90 Mins",
    image: serviceLove,
    shortDescription: "Receive intuitive guidance, emotional healing, and clarity in matters related to love, relationships, and emotional wellbeing.",
    description: "Receive intuitive guidance, emotional healing, and clarity in matters related to love, relationships, and emotional wellbeing. This session helps individuals understand emotional patterns, relationship dynamics, communication issues, and energetic blockages affecting their personal connections.",
    category: "Relationship Healing",
    areasCovered: [
      "Relationship confusion",
      "Breakups and emotional pain",
      "Third-party involvement guidance",
      "Marriage concerns",
      "Twin flame and soulmate connections",
      "Communication and trust issues",
      "Emotional attachment healing",
      "Self-love and confidence healing",
      "Relationship energy analysis",
      "Karmic relationship understanding",
      "Emotional blockages in love life",
      "Healing from toxic relationships",
      "Love manifestation guidance",
      "Future relationship clarity",
      "Energy healing for relationships"
    ],
    closingText: "The guidance is focused on helping individuals gain emotional clarity, inner peace, confidence, and a healthier understanding of their relationships and emotional energy."
  },
  {
    id: "career-business",
    title: "Career, Business & Financial Guidance",
    price: "Custom",
    duration: "60 Mins",
    image: serviceCareer,
    shortDescription: "Guidance focused on success, growth, confidence, and abundance.",
    description: "Guidance focused on success, growth, confidence, and abundance. This session helps individuals identify blocks in career progression, align their mindset for success, and clear energetic blocks related to money.",
    category: "Abundance & Success",
    points: [
      "Career clarity",
      "Business growth guidance",
      "Financial blockages",
      "Motivation and confidence",
      "Success mindset coaching",
      "Life purpose understanding",
      "Decision-making support",
      "Manifestation for abundance"
    ]
  },
  {
    id: "emotional-energy-healing",
    title: "Emotional & Energy Healing",
    price: "Custom",
    duration: "60 Mins",
    image: serviceHealing,
    shortDescription: "Healing sessions designed to restore emotional balance and positive energy.",
    description: "Healing sessions designed to restore emotional balance and positive energy. Through active cleansing, Shivani helps clear stagnant blockages and reset the nervous system.",
    category: "Energy Healing",
    points: [
      "Stress and anxiety healing",
      "Emotional release work",
      "Negative energy cleansing",
      "Chakra balancing",
      "Aura cleansing",
      "Inner peace healing",
      "Emotional stability",
      "Energy alignment sessions"
    ]
  },
  {
    id: "spiritual-guidance-protection",
    title: "Spiritual Guidance & Protection",
    price: "Custom",
    duration: "60 Mins",
    image: serviceTarot,
    shortDescription: "Support for spiritual growth, awareness, and energetic protection.",
    description: "Support for spiritual growth, awareness, and energetic protection. Learn tools to protect your energy and expand your consciousness safely.",
    category: "Spiritual Growth",
    points: [
      "Spiritual awakening guidance",
      "Intuition development",
      "Evil eye protection guidance",
      "Energy protection techniques",
      "Spiritual cleansing guidance",
      "Meditation and grounding",
      "Positive energy activation"
    ]
  },
  {
    id: "foreign-settlement",
    title: "Foreign Settlement & Life Direction Guidance",
    price: "Custom",
    duration: "90 Mins",
    image: serviceNumerology,
    shortDescription: "Guidance related to migration, relocation energy, travel clarity, and life path.",
    description: "Guidance related to migration, relocation energy, travel clarity, and life path. Understand the alignment of your destiny with geographical changes.",
    category: "Life Direction",
    points: [
      "Foreign settlement energy guidance",
      "Travel and relocation clarity",
      "Life direction and purpose",
      "Personal transformation",
      "Confidence and future planning"
    ]
  }
];

const timeline = [
  { year: "2018", title: "The Awakening", text: "Initiated into the profound pathways of Vedic Astrology and traditional Tarot under revered masters in Rishikesh." },
  { year: "2020", title: "Sacred Practice Begins", text: "Established private consultations, bridging ancient chart calculations with intuitive energetic card pulls." },
  { year: "2022", title: "Holistic Energy Mastery", text: "Completed advanced certifications in energy restoration, aura cleansing, and chakra integration methods." },
  { year: "2024", title: "Global Guidance Milestone", text: "Successfully guided over a thousand clients across Canada, India, and internationally, providing clear celestial blueprints." },
  { year: "Today", title: "Shivani Spiritual Yatri", text: "Guiding modern seekers through a professional sanctuary of spiritual alignment, cosmic learning, and emotional growth." },
];

const counters = [
  { label: "Souls Guided", value: 1200, suffix: "+" },
  { label: "Years Devoted", value: 6, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Global Reach", value: 15, suffix: " Countries" },
];

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Premium Tarot-inspired Divider
function TarotSeparator() {
  return (
    <div className="flex items-center justify-center py-10 pointer-events-none">
      <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-4 flex items-center justify-center w-7 h-7 rounded-full border border-gold/25 bg-[#0D1117]/80 backdrop-blur-sm shadow-[0_0_12px_rgba(212,175,55,0.15)]">
        <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
      </div>
      <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}

export default function About() {
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  
  // Mouse tracking coordinates for visual spotlight overlays
  const [welcomeMousePos, setWelcomeMousePos] = useState({ x: 0, y: 0 });
  const [profileMousePos, setProfileMousePos] = useState({ x: 0, y: 0 });

  const handleWelcomeMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 30;
    const y = (e.clientY - top - height / 2) / 30;
    setWelcomeMousePos({ x, y });
  };

  const handleProfileMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setProfileMousePos({ x, y });
  };

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
      
      {/* 1. ABOUT PAGE HERO */}
      <PageHero
        eyebrow="The Sanctuary"
        title={<>Shivani Spiritual Yatri <span className="text-gradient-gold">Behind The Practice</span></>}
        subtitle="Vedic lineage meets modern energy alchemy — companioning your soul back to its luminous, pre-charted design."
      />

      <TarotSeparator />

      {/* 2. WELCOME TO SHIVANI SPIRITUAL YATRI ACADEMY */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Reveal>
            <div 
              onMouseMove={handleWelcomeMouseMove}
              onMouseLeave={() => setWelcomeMousePos({ x: 0, y: 0 })}
              className="relative overflow-hidden rounded-3xl border border-gold/20 bg-card-glass backdrop-blur-xl p-8 md:p-12 shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.05)] transition-all hover:border-gold/35 group"
            >
              {/* Soft moving spotlight radial gradient overlay */}
              <div 
                className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out z-0 opacity-40"
                style={{
                  background: `radial-gradient(circle at calc(50% + ${welcomeMousePos.x * 10}px) calc(50% + ${welcomeMousePos.y * 10}px), rgba(216,182,122,0.12) 0%, transparent 60%)`
                }}
              />

              {/* Shimmer line sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] pointer-events-none z-0" />

              {/* Floating Tarot Card 1 (top left) */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 z-20 hidden lg:flex items-center justify-center w-12 h-20 rounded border border-gold/45 bg-[#151B26]/95 shadow-[0_5px_15px_rgba(0,0,0,0.5)] p-0.5"
              >
                <div className="absolute inset-0.5 border border-gold/10 rounded flex items-center justify-center bg-[#0D1117]">
                  <Sparkles className="h-4 w-4 text-gold/70 animate-pulse" />
                </div>
              </motion.div>

              {/* Floating Tarot Card 2 (top right) */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-6 right-6 z-20 hidden lg:flex items-center justify-center w-12 h-20 rounded border border-gold/45 bg-[#151B26]/95 shadow-[0_5px_15px_rgba(0,0,0,0.5)] p-0.5"
              >
                <div className="absolute inset-0.5 border border-gold/10 rounded flex items-center justify-center bg-[#0D1117]">
                  <Sparkles className="h-4 w-4 text-indigo-400/80 animate-pulse" />
                </div>
              </motion.div>

              {/* Floating Crystal Element */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-12 bottom-12 z-0 hidden xl:block w-24 h-24 opacity-15 pointer-events-none"
              >
                <img src={clearQuartz} alt="Floating crystal" className="w-full h-full object-contain" />
              </motion.div>

              {/* Glowing particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gold rounded-full"
                    style={{ top: `${20 + i * 15}%`, left: `${15 + (i * 23) % 70}%` }}
                    animate={{ y: [0, -30, 0], opacity: [0.1, 0.8, 0.1] }}
                    transition={{ duration: 5 + i, repeat: Infinity }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Left side Image preview */}
                <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-gold/20 bg-[#0D1117]/35 h-[280px] md:h-[360px] shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sapphire/20 via-gold/5 to-purple-500/10 blur-xl opacity-60 pointer-events-none" />
                  <div 
                    className="w-full h-full transition-transform duration-300 ease-out"
                    style={{ transform: `translate3d(${welcomeMousePos.x}px, ${welcomeMousePos.y}px, 0) scale(1.05)` }}
                  >
                    <img
                      src={sacredRemediesImage}
                      alt="Academy Altar Setup"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t border-l border-gold/45" />
                  <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t border-r border-gold/45" />
                  <div className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b border-l border-gold/45" />
                  <div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b border-r border-gold/45" />
                </div>

                {/* Right side Text */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-gold font-medium bg-gold/5 border border-gold/30 rounded-full px-3 py-1">
                    <Sparkles className="h-3 w-3 text-gold" /> Welcome to Shivani Spiritual Yatri Academy
                  </span>
                  
                  <h2 className="font-display text-2.5xl md:text-3.5xl font-medium tracking-wider text-gradient-gold uppercase leading-[1.15]">
                    Heal Your Energy. Transform Your Life. Align With Your Highest Reality.
                  </h2>

                  <div className="space-y-4 text-xs md:text-sm text-muted-foreground/90 font-light leading-relaxed tracking-wide text-justify">
                    <p>
                      Welcome to Shivani Spiritual Yatri Academy — a transformational spiritual platform dedicated to healing, self-discovery, manifestation, and conscious living.
                    </p>
                    <p>
                      Founded by Shivani, an internationally guided Spiritual Mentor, Life Coach, Reiki Grandmaster, Energy Healer, Tarot Reader, Numerologist, Akashic Records Reader, NLP Coach, and Manifestation Expert, this academy is designed to help individuals reconnect with their inner power and create alignment in every area of life.
                    </p>
                    <p>
                      Through a combination of spiritual wisdom, energy healing, subconscious transformation, and intuitive guidance, Shivani helps individuals release emotional blockages, gain clarity, improve relationships, strengthen confidence, and attract abundance, peace, and purpose.
                    </p>
                    <p className="italic text-gold/80 font-medium border-l-2 border-gold/50 pl-4 bg-gold/5 py-1">
                      Every session and course is created with the intention of helping people experience deep emotional healing, energetic balance, spiritual awakening, and real-life transformation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TarotSeparator />

      {/* 3. ABOUT SHIVANI (PORTRAIT WITH FLOATING BADGES & EXPERTISE CARDS) */}
      <section className="py-16 relative overflow-hidden bg-[#0D1117]/25 border-y border-gold/10">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute left-10 top-1/4 w-72 h-72 bg-sapphire/10 blur-[120px] rounded-full" />
          <div className="absolute right-10 bottom-1/4 w-80 h-80 bg-gold/10 blur-[120px] rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4.5xl tracking-widest font-medium uppercase text-gradient-gold">
                About Shivani
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 text-xs md:text-sm text-muted-foreground/80 font-light tracking-wide leading-relaxed">
                Shivani is a dedicated Spiritual Mentor and Energy Healing Practitioner with expertise in multiple healing and transformational modalities.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left side: Premium portrait, floating badges, experience counters */}
            <div 
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={() => setProfileMousePos({ x: 0, y: 0 })}
              className="lg:col-span-5 flex flex-col justify-between gap-6 relative"
            >
              <Reveal>
                <div 
                  className="relative rounded-2xl border-2 border-double border-gold/25 bg-black/40 p-4 shadow-[0_15px_30px_rgba(0,0,0,0.5)] overflow-visible transition-transform duration-300 ease-out"
                  style={{ transform: `translate3d(${profileMousePos.x * 0.4}px, ${profileMousePos.y * 0.4}px, 0)` }}
                >
                  {/* Portrait image */}
                  <div className="aspect-[4/5] rounded-xl overflow-hidden border border-gold/15 relative">
                    <img
                      src={aboutPreview}
                      alt="Shivani Portrait"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating badges outside image borders for premium layered layout */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3 -left-3 rounded-full bg-[#151B26] border-2 border-gold/45 px-3 py-1.5 text-[8px] uppercase tracking-widest text-gold font-bold shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center gap-1"
                  >
                    <Award className="h-3 w-3 text-gold" /> Spiritual Healer
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-3 -right-3 rounded-full bg-[#151B26] border-2 border-gold/45 px-3 py-1.5 text-[8px] uppercase tracking-widest text-gold font-bold shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center gap-1"
                  >
                    <Sparkles className="h-3 w-3 text-gold" /> Life Coach
                  </motion.div>
                </div>
              </Reveal>

              {/* Experience counters */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "10+", label: "Years Experience" },
                  { value: "15k+", label: "Transformed" },
                  { value: "11+", label: "Modalities" }
                ].map((stat, idx) => (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div className="p-3.5 rounded-xl border border-gold/15 bg-card-glass backdrop-blur-md text-center shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:border-gold/30 transition-all">
                      <div className="font-display text-lg md:text-xl font-bold text-gradient-gold">{stat.value}</div>
                      <div className="text-[7px] md:text-[8px] uppercase tracking-widest text-muted-foreground/80 mt-0.5 leading-snug">{stat.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right side: narrative, expertise tags, animated reveal */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6 text-left">
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md space-y-4 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                <h3 className="font-display text-base md:text-lg font-medium tracking-wider text-gold uppercase pb-2 border-b border-gold/10">
                  Mindset & Spiritual Alignment
                </h3>
                <div className="space-y-4 text-xs md:text-sm text-muted-foreground/90 font-light leading-relaxed tracking-wide text-justify">
                  <p>
                    Her work focuses on helping individuals understand the connection between thoughts, emotions, energy, and life experiences.
                  </p>
                  <p>
                    By combining spiritual guidance with practical mindset transformation techniques, Shivani supports individuals in overcoming emotional struggles, relationship confusion, stress, fear, low confidence, energetic blockages, and life uncertainty.
                  </p>
                  <p className="font-medium text-gold/90 italic">
                    Her approach is intuitive, compassionate, transformational, and deeply focused on emotional and spiritual wellbeing.
                  </p>
                </div>
              </div>

              {/* Modalities list as beautiful mini-chips */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">Modality Portfolio</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Tarot Card Reading", "Reiki Healing", "Pranic Healing", "Numerology", 
                    "Akashic Records Reading", "NLP (Neuro-Linguistic Programming)", "Chakra Healing", 
                    "Meditation & Mindfulness", "Manifestation Coaching", "Angel Healing", "Switchword Healing"
                  ].map((mod, idx) => (
                    <Reveal key={idx} delay={idx * 0.03}>
                      <span className="px-3.5 py-1.5 rounded-full border border-gold/10 bg-[#151B26]/60 text-[10px] text-muted-foreground hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all cursor-pointer shadow-md">
                        {mod}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TarotSeparator />

      {/* 4. HOW SESSIONS WORK (JOURNEY TIMELINE) */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4.5xl tracking-widest font-medium uppercase text-gradient-gold">
                How The Sessions Work
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground/80 font-light leading-relaxed tracking-wide">
                Every individual carries unique emotional patterns, energetic imbalances, subconscious beliefs, and spiritual experiences. The purpose of the sessions is to identify these blockages and guide individuals toward clarity, healing, balance, and empowerment.
              </p>
            </Reveal>
          </div>

          {/* Timeline Linear Layout */}
          <div className="relative max-w-4xl mx-auto z-10 px-4 md:px-0">
            {/* Center Timeline Connector Bar */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/40 via-sapphire/30 to-gold/10 -translate-x-1/2 z-0" />

            <div className="space-y-12 relative z-10">
              {[
                {
                  step: "01",
                  title: "Intuitive Assessment",
                  desc: "Each consultation is personalized according to the client’s energy, situation, emotional state, and concerns.",
                  sub: "Shivani maps the energetic blocks to outline clear directional strategies."
                },
                {
                  step: "02",
                  title: "Multidimensional Guidance",
                  desc: "Utilizing Tarot reading for clarity, Numerology for destiny numbers, NLP for mindset, and Akashic access for soul-level understanding.",
                  sub: "We synthesize multiple spiritual tools depending on your unique layout."
                },
                {
                  step: "03",
                  title: "Active Energy Cleansing",
                  desc: "Applying Reiki and Pranic Healing transmission methods to clean the subtle aura body and balance the seven primary chakras.",
                  sub: "Dissolves emotional congestions from vital organs to refresh vitality."
                },
                {
                  step: "04",
                  title: "Remedies & Integration",
                  desc: "Formulating customized spiritual remedies, positive manifestation anchors, and practical action plans.",
                  sub: "Empowers clients to move forward with absolute clarity, confidence, and inner peace."
                }
              ].map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <Reveal key={idx} delay={idx * 0.08}>
                    <div className={`relative flex flex-col md:flex-row items-stretch gap-6 md:gap-12 ${isEven ? "md:flex-row-reverse" : ""}`}>
                      {/* Timeline Node Point */}
                      <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 w-8 h-8 rounded-full border-2 border-gold bg-[#151B26] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                        <span className="text-[10px] font-bold text-gold font-display">{item.step}</span>
                      </div>

                      {/* Content side card */}
                      <div className="w-full md:w-1/2 pl-12 md:pl-0">
                        <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md text-left transition-all duration-300 hover:border-gold/35 hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.08)]">
                          <h4 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-2">{item.title}</h4>
                          <p className="text-xs text-muted-foreground/90 font-light leading-relaxed mb-3 text-justify">{item.desc}</p>
                          <p className="text-[11px] text-muted-foreground/60 leading-normal italic">{item.sub}</p>
                        </div>
                      </div>
                      
                      {/* Empty side padding for desktop alignment */}
                      <div className="hidden md:block w-1/2" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <TarotSeparator />

      {/* 5. CONSULTATION SERVICES */}
      <section className="py-16 relative overflow-hidden bg-[#0D1117]/25 border-y border-gold/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4.5xl tracking-widest font-medium uppercase text-gradient-gold">
                Consultation Services
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground/80 font-light leading-relaxed tracking-wide">
                Select from our premium customized consultations designed to support your relationships, career, spiritual balance, and global aspirations.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch relative z-10">
            {CONSULTATIONS.map((c, i) => {
              const priceTag = c.price === "Custom" ? "Custom Consultation" : `$${c.price} CAD`;
              return (
                <Reveal key={c.id} delay={i * 0.05}>
                  <motion.div 
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col justify-between h-full rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md p-5 transition-all duration-500 hover:border-gold/35 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.1)] overflow-hidden"
                  >
                    <div className="flex flex-col h-full justify-between relative z-10">
                      <div>
                        {/* Image container */}
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-gold/20 shadow-[0_8px_20px_rgba(0,0,0,0.45)] bg-[#0D1117]/20 backdrop-blur-sm transition-all duration-700 group-hover:border-gold/45 mb-4 shrink-0">
                          <img
                            src={c.image}
                            alt={c.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Badges & Price & Duration tags */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex gap-1">
                            <span className="rounded-full border border-gold/30 bg-[#151B26]/85 px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-gold">
                              {c.category}
                            </span>
                            <span className="rounded-full border border-gold/10 bg-gold/5 px-2 py-0.5 text-[8px] uppercase tracking-wider text-gold/80 flex items-center gap-1">
                              <Clock className="h-2.5 w-2.5" /> {c.duration}
                            </span>
                          </div>
                          <div className="text-gold font-display text-[11px] font-semibold bg-gold/5 border border-gold/25 rounded px-2 py-0.5">
                            {priceTag}
                          </div>
                        </div>

                        <h3 className="font-display text-base text-foreground/95 group-hover:text-gold transition-colors duration-300 font-medium leading-snug">
                          {c.title}
                        </h3>

                        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/80 font-light line-clamp-3">
                          {c.shortDescription}
                        </p>
                      </div>

                      {/* Consultation Actions */}
                      <div className="mt-5 pt-3 border-t border-gold/5 flex gap-2 w-full">
                        <button
                          onClick={() => setSelectedConsultation(c)}
                          className="flex-1 rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider transition-all text-gold cursor-pointer"
                        >
                          View Details
                        </button>
                        <a
                          href={getWhatsAppBookUrl(c.title)}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded-full btn-gold py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" /> Book Session
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <TarotSeparator />

      {/* 6. HEALING MODALITIES AVAILABLE (BENTO GRID) */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4.5xl tracking-widest font-medium uppercase text-gradient-gold">
                Healing Modalities Available
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground/80 font-light leading-relaxed tracking-wide">
                Shivani coordinates energy transformation using a synthesis of eastern and western spiritual practices.
              </p>
            </Reveal>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 items-stretch">
            {[
              {
                title: "Reiki Healing",
                desc: "A Japanese energy healing technique that helps balance chakras, release emotional blockages, reduce stress, and restore energetic harmony.",
                span: "md:col-span-2",
                icon: Sparkles
              },
              {
                title: "Pranic Healing",
                desc: "An advanced energy healing system focused on aura cleansing, chakra healing, and emotional and energetic purification.",
                span: "md:col-span-1",
                icon: Activity
              },
              {
                title: "NLP (Neuro-Linguistic Programming)",
                desc: "Powerful subconscious mind techniques used to transform limiting beliefs, fears, emotional patterns, and self-sabotaging behaviors.",
                span: "md:col-span-1",
                icon: Compass
              },
              {
                title: "Tarot Card Reading",
                desc: "Intuitive spiritual guidance providing insight into relationships, career, emotions, finances, and future possibilities.",
                span: "md:col-span-2",
                icon: Eye
              },
              {
                title: "Numerology",
                desc: "The study of numbers and energetic patterns to understand personality, destiny, compatibility, strengths, and life purpose.",
                span: "md:col-span-1",
                icon: Layers
              },
              {
                title: "Akashic Records Reading",
                desc: "Soul-level spiritual guidance that helps individuals understand karmic patterns, past experiences, and deeper life lessons.",
                span: "md:col-span-1",
                icon: BookOpen
              },
              {
                title: "Manifestation Coaching",
                desc: "Mindset and energy alignment practices designed to help individuals attract abundance, love, opportunities, confidence, and success.",
                span: "md:col-span-2",
                icon: Sun
              }
            ].map((m, idx) => {
              const IconComp = m.icon;
              return (
                <Reveal key={idx} delay={idx * 0.05} className={m.span}>
                  <div className="group relative p-6 rounded-2xl border border-gold/10 bg-[#0D1117]/25 backdrop-blur-md flex flex-col justify-between h-full transition-all duration-300 hover:border-gold/30 hover:bg-gold/5 shadow-[0_8px_15px_rgba(0,0,0,0.3)]">
                    {/* Subtle spinning/glowing icon inside the card */}
                    <div className="absolute right-4 top-4 text-gold/30 group-hover:text-gold transition-colors">
                      <IconComp className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-display text-sm font-semibold uppercase text-gold tracking-wider">{m.title}</h4>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed font-light text-justify">{m.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <TarotSeparator />

      {/* 7. EXISTING ABOUT CONTENT (Vedic lineage story, core philosophy, areas of expertise, session methodology, counters, milestones) */}
      <section className="py-16 relative overflow-hidden bg-[#0D1117]/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          {/* Section 7.1: A Life Shaped By Cosmic Listening */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-20">
            <div className="md:col-span-5 relative">
              <Reveal>
                <div className="relative rounded-2xl border border-gold/25 bg-black/40 p-4 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden border border-gold/15">
                    <img
                      src={aboutFullImg}
                      alt="Shivani Spiritual Yatri Sanctuary Portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-2.5 rounded-[2.5rem] bg-gradient-to-br from-gold/20 via-sapphire/10 to-gold/10 blur-md opacity-30 -z-10" />
                </div>
              </Reveal>
            </div>
            
            <div className="md:col-span-7 text-left space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> The Sanctuary Story
              </span>
              <h2 className="font-display text-3xl md:text-4.5xl uppercase tracking-wide">
                A Life Shaped By <span className="text-gradient-gold">Cosmic Listening</span>
              </h2>
              <div className="space-y-4 text-xs md:text-sm text-muted-foreground/90 leading-relaxed font-light text-justify">
                <p>
                  My spiritual path was initiated in a household deeply aligned with Vedic currents, where planetary transits and spiritual laws were observed like the change of seasons. What began as an early childhood calling blossomed into a life devoted to spiritual cartography.
                </p>
                <p>
                  For over six years, my work has been defined by sincere companionship rather than mere fortune-telling. Every seeker who crosses my path carries a distinct energetic footprint that the cosmos is attempting to harmonize. My role is to act as a clear, focused translator.
                </p>
                <p>
                  Whether calculating planetary dashas, interpreting tarot layouts, or facilitating deep energy alignment, my purpose is simple: to help you shed emotional fatigue, locate your authentic path, and live in deep harmony with your celestial design.
                </p>
              </div>
            </div>
          </div>

          <TarotSeparator />

          {/* Section 7.2: Sacred Philosophy & Healing Approach */}
          <div className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                The Philosophy
              </span>
              <h2 className="mt-4 font-display text-2.5xl md:text-4.5xl uppercase tracking-wider">
                Sacred Philosophy & <span className="text-gradient-gold">Healing Approach</span>
              </h2>
              <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
                We do not treat symptoms in isolation. We look at the energetic blueprint, historical blockages, and astrological transits to catalyze pure emotional transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Sun,
                  title: "Spiritual Philosophy",
                  text: "Every human soul is a pre-charted star navigating physical form. We believe that your current challenges are not random interruptions, but highly structured cosmic prompts designed to awaken your ultimate potential and spiritual awareness."
                },
                {
                  icon: Heart,
                  title: "Healing Approach",
                  text: "We integrate traditional Vedic astrology and intuitive tarot with customized, non-invasive energy purification. By examining both celestial scripts and auric blockages, we balance the mind, clarify the heart, and nourish the spirit."
                },
                {
                  icon: Zap,
                  title: "Emotional Transformation",
                  text: "We focus on resolving the root causes of emotional fatigue, anxiety, and repetitive cycles. Our methods help you release old energetic patterns, clear heavy heart blockages, and claim immediate internal peace and emotional stability."
                }
              ].map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="group relative h-full rounded-2xl bg-card-glass backdrop-blur-md p-6 border border-gold/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 shadow-lg flex flex-col justify-between text-left">
                    <div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-sapphire/20 text-gold border border-gold/25 mb-5">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-gold transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80 font-light tracking-wide text-justify">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <TarotSeparator />

          {/* Section 7.3: Expertise Areas & Healing Modalities list */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Core Expertise
              </span>
              <h2 className="font-display text-2.5xl md:text-3.5xl uppercase tracking-wider leading-snug">
                Expertise Areas & <span className="text-gradient-gold">Healing Modalities</span>
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light tracking-wide text-justify">
                Shivani’s practice bridges centuries-old Eastern linage with modern energy alchemy, establishing a balanced environment where your spiritual expansion can blossom.
              </p>
              
              <div className="space-y-3.5">
                {[
                  "Traditional Vedic Astrology & Kundli Mapping",
                  "Intuitive Tarot Divination & Spiritual Translation",
                  "Reiki & Pranic Chakra Cleansing",
                  "Akashic Records Reading & Ancestral Healing",
                  "Energetic Space Purification & Boundary Cleansing",
                  "Spiritual Protection & Life Coaching Integration"
                ].map((item, idx) => (
                  <Reveal key={item} delay={idx * 0.05}>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                      <span className="text-xs text-foreground/90 font-light tracking-wider">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 grid-cols-1 sm:grid-cols-2 text-left">
              {[
                { title: "Vedic Astrology", icon: Compass, desc: "Detailed natal birth chart (Kundli) calculations analyzing planetary transits, lunar houses, and specific remedial timing (Dashas)." },
                { title: "Tarot Divination", icon: Sparkles, desc: "Channeled intuitive tarot spreads utilizing high-vibrational decks to decode immediate paths and locate clear daily guidance." },
                { title: "Chakra Balance", icon: Layers, desc: "Restoring emotional equilibrium and purifying blockages inside your subtle energy centers (Aura balance)." },
                { title: "Spiritual Coaching", icon: Users, desc: "Integrating clinical life coaching systems with esoteric knowledge to ensure your guidance manifests in practical life success." }
              ].map((m, idx) => (
                <Reveal key={m.title} delay={idx * 0.08}>
                  <div className="bg-card-glass backdrop-blur-md rounded-2xl p-6 border border-gold/10 hover:border-gold/30 transition-all duration-300 shadow-md">
                    <div className="h-10 w-10 rounded-lg bg-gold/10 text-gold grid place-items-center mb-4 border border-gold/15">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-display text-base text-gold/90 uppercase tracking-wider">{m.title}</h4>
                    <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed font-light tracking-wide">{m.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <TarotSeparator />

          {/* Section 7.4: Sacred Session Methodology */}
          <div className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Methodology
              </span>
              <h2 className="mt-4 font-display text-2.5xl md:text-4.5xl uppercase tracking-wider">
                Sacred Session <span className="text-gradient-gold">Methodology</span>
              </h2>
              <p className="mt-3 text-xs text-muted-foreground font-light tracking-widest leading-relaxed">
                Every consultation is carefully structured to transition your state from initial confusion into complete crystal clarity.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 relative">
              {[
                { step: "01", title: "Sacred Spacing", desc: "Before you connect, Shivani purifies the physical room and virtual dashboard using sacred sound baths and white sage, locking in a protected, confidential environment." },
                { step: "02", title: "Chart Dashboarding", desc: "We review your planetary layouts and current planetary transitions (Jyotish parameters) side-by-side with intuitive tarot inquiries to locate structural themes." },
                { step: "03", title: "Channeled Answers", desc: "We pull intuitive tarot layouts to secure immediate, direct answers to your vital life concerns, providing deep spiritual translation without fear-mongering." },
                { step: "04", title: "Remedial Integration", desc: "We synthesize the session with customized, practical remedies (gemstones, mantras, acts of charity) and emotional grounding to assure lasting internal peace." }
              ].map((s, idx) => (
                <Reveal key={s.title} delay={idx * 0.08}>
                  <div className="flex flex-col items-center text-center p-4 bg-card-glass backdrop-blur-md rounded-2xl border border-gold/10 hover:border-gold/25 transition-all shadow-md">
                    <div className="h-12 w-12 rounded-full border border-gold/25 bg-background flex items-center justify-center font-display text-base text-gold font-bold shadow-[0_0_12px_rgba(212,175,55,0.15)] mb-4">
                      {s.step}
                    </div>
                    <h3 className="font-display text-base text-foreground mb-2 font-medium tracking-wide">{s.title}</h3>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-light tracking-wide text-justify">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <TarotSeparator />

          {/* Section 7.5: Counters & Milestones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 py-8">
            {counters.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <div className="bg-card-glass backdrop-blur-md rounded-2xl p-6 text-center border border-gold/10 hover:border-gold/35 transition-all duration-300 shadow-md">
                  <div className="font-display text-3xl md:text-4.5xl text-gradient-gold font-bold">
                    <Counter to={c.value} suffix={c.suffix} />
                  </div>
                  <div className="mt-2 text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{c.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <TarotSeparator />

          {/* Section 7.6: Timeline Journey */}
          <div className="py-12 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                The Journey
              </span>
              <h2 className="mt-4 font-display text-2.5xl md:text-4xl uppercase tracking-wider">Milestones On The Path</h2>
            </div>
            
            <div className="relative pl-8 md:pl-0">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-sapphire to-transparent md:left-1/2" />
              {timeline.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative mb-10 md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
                >
                  <div className={`${i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"} text-left md:text-right`}>
                    <div className="bg-card-glass backdrop-blur-md rounded-2xl p-6 border border-gold/10 hover:border-gold/25 transition-all duration-300 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{m.year}</div>
                      <h3 className="mt-2 font-display text-lg text-foreground/95 tracking-wide">{m.title}</h3>
                      <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed font-light text-justify">{m.text}</p>
                    </div>
                  </div>
                  <span className="absolute left-3 top-6 grid h-2.5 w-2.5 -translate-x-1/2 place-items-center rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.7)] md:left-1/2" />
                  <div className="hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <TarotSeparator />

      {/* 8. WHY CHOOSE SHIVANI (AUTHENTIC PILLARS) */}
      <section className="py-20 relative border-t border-gold/10 bg-background/25">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Authentic Pillars
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl uppercase tracking-wider">
              Why Choose <span className="text-gradient-gold">Shivani Spiritual Yatri</span>
            </h2>
            <p className="mt-4 text-xs md:text-sm text-muted-foreground font-light tracking-widest leading-relaxed">
              We stand apart through our commitment to pure, certified Vedic practices and compassionate, heart-led companioning.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: Award, title: "Certified Practitioner", text: "Trained directly under traditional Vedic masters and certified spiritual guides in Varanasi and Rishikesh." },
              { icon: Heart, title: "Compassion & Respect", text: "Every session is conducted with absolute warmth, non-judgment, and total spiritual empathy." },
              { icon: Shield, title: "Sacred Privacy", text: "Your personal birth metrics, readings, and healing cards are kept in strict confidentiality." },
              { icon: BookOpen, title: "Ever-Expanding Mastery", text: "Continuously deepening studies in multiple esoteric systems to bring you the highest level of care." },
              { icon: CheckCircle2, title: "Ethical Remedial Care", text: "Only authentic, direct remedies are suggested — free from fear-mongering and commercial traps." },
              { icon: Users, title: "Compassionate Integration", text: "Sessions are tailored exactly to your unique vibrational blueprint and immediate life milestones." }
            ].map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <BentoCard className="bg-card-glass backdrop-blur-md rounded-2xl p-7 text-center border border-gold/10 hover:border-gold/35 shadow-md">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/10 text-gold mb-5 border border-gold/15">
                    <h.icon className="h-5.5 w-5.5" />
                  </div>
                  <h4 className="font-display text-base text-foreground mb-3 font-medium tracking-wide uppercase">{h.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-light tracking-wide">{h.text}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TarotSeparator />

      {/* 9. ABOUT PAGE CTA */}
      <section className="py-16 relative overflow-hidden bg-background border-t border-gold/10">
        <div className="absolute inset-0 bg-gradient-to-r from-sapphire/20 via-gold/5 to-purple-500/10 pointer-events-none blur-3xl opacity-40" />
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-card-glass backdrop-blur-xl p-8 md:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,182,122,0.08)_0%,transparent_60%)] pointer-events-none" />
            <Reveal>
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-gold font-semibold bg-gold/5 border border-gold/30 rounded-full px-4 py-1 mb-4">
                Begin Your Path
              </span>
              <h3 className="font-display text-2.5xl md:text-3.5xl text-gradient-gold font-medium uppercase tracking-wider mb-4">
                Ready to Align Your Energy?
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
                Whether you seek private energetic guidance, professional certification in healing arts, or urgent crisis scheduling, we are here to support your journey.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/courses"
                  className="rounded-full btn-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all hover:scale-105 shadow-[0_4px_15px_rgba(212,175,55,0.25)] cursor-pointer"
                >
                  Explore Academy
                </a>
                <a
                  href="/booking"
                  className="rounded-full border border-gold/20 bg-white/5 hover:bg-gold/10 hover:border-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gold transition-all hover:scale-105 cursor-pointer"
                >
                  Book Consultation
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-emerald-400 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dynamic Detail Modal for Consultations */}
      <AnimatePresence>
        {selectedConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedConsultation(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[80vh] md:h-[75vh] rounded-2xl border border-gold/20 bg-[#151B26] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(216,182,122,0.15)] flex flex-col cursor-default overflow-hidden"
            >
              {/* Sticky close button */}
              <button
                onClick={() => setSelectedConsultation(null)}
                className="absolute top-4 right-4 z-40 rounded-full border border-gold/15 bg-[#151B26]/90 p-2 text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch overflow-hidden h-full p-6 md:p-8 pb-24 md:pb-24">
                {/* Modal Left Image */}
                <div className="col-span-1 md:col-span-5 relative h-[180px] md:h-full rounded-xl overflow-hidden border border-gold/15 bg-[#0D1117]/30 shrink-0">
                  <img
                    src={selectedConsultation.image}
                    alt={selectedConsultation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151B26] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 z-10 rounded-full border border-gold/30 bg-[#151B26]/90 px-3 py-0.5 text-[8px] font-bold uppercase tracking-widest text-gold">
                    {selectedConsultation.category}
                  </span>
                </div>

                {/* Modal Right Content (Scrollable body) */}
                <div className="col-span-1 md:col-span-7 flex flex-col justify-between overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/20 h-full space-y-4">
                  <div>
                    <div className="flex justify-between items-start gap-4 flex-wrap mb-2">
                      <h3 className="font-display text-lg md:text-xl font-medium tracking-wide uppercase text-foreground text-left max-w-sm">
                        {selectedConsultation.title}
                      </h3>
                      <div className="text-gold font-display text-sm font-semibold bg-gold/5 border border-gold/25 rounded px-2 py-0.5">
                        {selectedConsultation.price === "Custom" ? "Custom Consultation" : `$${selectedConsultation.price} CAD`}
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed font-light tracking-wide text-justify">
                      <p className="text-muted-foreground/90">{selectedConsultation.description}</p>

                      {/* Areas Covered List for Love & Relationship */}
                      {selectedConsultation.areasCovered && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-2">Areas Covered:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#0D1117]/30 border border-gold/5 p-4 rounded-xl text-left">
                            {selectedConsultation.areasCovered.map((a, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-muted-foreground/85">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                                <span>{a}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Points list for general consultations */}
                      {selectedConsultation.points && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-2">Consultation Points:</span>
                          <div className="space-y-2 bg-[#0D1117]/30 border border-gold/5 p-4 rounded-xl text-left">
                            {selectedConsultation.points.map((pt, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-muted-foreground/85">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedConsultation.closingText && (
                        <p className="italic text-[11px] text-muted-foreground/75 mt-2">
                          {selectedConsultation.closingText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed/sticky booking CTA at bottom of modal */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#151B26]/95 border-t border-gold/15 p-4 flex gap-4 z-30">
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="flex-1 rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all text-gold cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={getWhatsAppBookUrl(selectedConsultation.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-full btn-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  Book Consultation
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
