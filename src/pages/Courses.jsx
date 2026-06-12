import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Clock, X, Search, Award, CheckCircle2, MessageSquare, AlertCircle
} from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { PageHero } from "@/components/common/PageHero";
import { SITE } from "@/utils/site";

// Import existing visual assets
import courseTarot from "@/assets/images/course_tarot.webp";
import courseAstrology from "@/assets/images/course_astrology.webp";
import courseKundli from "@/assets/images/course_kundli.webp";
import courseLove from "@/assets/images/course_love.webp";
import courseNumerology from "@/assets/images/course_numerology.webp";
import courseChakra from "@/assets/images/course_chakra.webp";
import courseProtection from "@/assets/images/course_protection.webp";
import courseManifestation from "@/assets/images/course_manifestation.webp";
import clearQuartz from "@/assets/images/clear_quartz.png";

// Prefilled WhatsApp URLs
const getWhatsAppEnrollUrl = (courseName) => {
  const text = `Hello Shivani Spiritual Yatri,\n\nI would like to enroll in the ${courseName}.\n\nPlease share complete details.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
};

const getWhatsAppBookUrl = (consultationName) => {
  const text = `Hello Shivani Spiritual Yatri,\n\nI would like to book the ${consultationName}.\n\nPlease share details.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
};

// 14 Certification Courses Data
const COURSES = [
  {
    id: "numerology-mastery",
    title: "Numerology Mastery Course (Certified Program)",
    isCertification: true,
    category: "Numerology",
    shortDescription: "Decode the Vibrational Codes of Destiny and understand planetary number energies.",
    modules: [
      "Introduction to Numerology & Number Energy System",
      "Life Path, Destiny & Soul Numbers",
      "Master Numbers & Karmic Lessons",
      "Name Numerology & Correction System",
      "Mobile & Business Number Analysis",
      "Relationship Compatibility Mapping",
      "Career & Financial Numerology",
      "Signature Energy Reading",
      "Lucky Numbers, Cycles & Timing",
      "Remedies & Real-Life Application",
      "Client Case Study Practice"
    ]
  },
  {
    id: "nlp-transformation",
    title: "NLP Transformation Certification Course",
    isCertification: true,
    category: "NLP Mind Transformation",
    shortDescription: "Reprogram the subconscious mind and shift behavioral habits for success.",
    modules: [
      "Subconscious Mind Programming",
      "Belief System Rewriting",
      "Emotional Pattern Transformation",
      "Confidence & Identity Rebuilding",
      "Anchoring & Visualization Techniques",
      "Fear & Anxiety Reprogramming",
      "Communication Mastery",
      "Manifestation Psychology",
      "Relationship Behavior Repatterning",
      "Goal & Success Programming"
    ]
  },
  {
    id: "reiki-healing",
    title: "Reiki Healing Certification (Beginner to Grandmaster)",
    isCertification: true,
    category: "Energy Healing",
    shortDescription: "Channel life-force energy, clear blockages, and setup professional practice.",
    modules: [
      "Reiki Energy Foundations",
      "Chakra Healing System",
      "Aura Cleansing Techniques",
      "Self-Healing Practices",
      "Distance Healing Methods",
      "Emotional & Physical Healing Applications",
      "Reiki Symbols Activation",
      "Level 1, Level 2, Master & Grandmaster Training",
      "Energy Protection Methods",
      "Professional Healing Practice Setup"
    ]
  },
  {
    id: "pranic-healing",
    title: "Pranic Healing Certification Course",
    isCertification: true,
    category: "Energy Healing",
    shortDescription: "Non-contact energy medicine focusing on aura cleansing and etheric subtle body.",
    modules: [
      "Energy Body & Aura Structure",
      "Chakra Scanning & Diagnosis",
      "Energy Blockage Removal",
      "Emotional Detox Healing",
      "Stress & Anxiety Release Techniques",
      "Color Prana Healing",
      "Distance Energy Healing",
      "Protection from Negative Energy",
      "Wealth & Relationship Energy Activation",
      "Advanced Healing Applications"
    ]
  },
  {
    id: "akashic-records",
    title: "Akashic Records Reading Certification",
    isCertification: true,
    category: "Akashic Records",
    shortDescription: "Access the library of the soul's history to retrieve past life alignments and karma.",
    modules: [
      "Introduction to Akashic Field",
      "Safe Accessing Techniques",
      "Soul Contracts & Life Purpose",
      "Past Life Reading & Healing",
      "Karmic Pattern Analysis",
      "Relationship & Career Readings",
      "Spiritual Guidance Interpretation",
      "Energy Protection Practices",
      "Guided Practice Sessions"
    ]
  },
  {
    id: "twin-flame",
    title: "Twin Flame & Soul Healing Course",
    isCertification: false,
    category: "Soul Connection",
    shortDescription: "Understand soul connections, heal triggers, and navigate divine union energy.",
    modules: [
      "Twin Flame Energy System",
      "Soulmate vs Twin Flame Understanding",
      "Emotional Trigger Healing",
      "Runner-Chaser Dynamics",
      "Divine Feminine & Masculine Balance",
      "Separation Healing Process",
      "Union Energy Activation",
      "Heart Chakra Healing",
      "Self-Love Integration"
    ]
  },
  {
    id: "angel-healing",
    title: "Angel Healing & Divine Guidance Certification",
    isCertification: true,
    category: "Angel Healing",
    shortDescription: "Connect with the angelic realm, guardian angels, and learn archangel connection.",
    modules: [
      "Angelic Realm Introduction",
      "Guardian & Archangel Connection",
      "Angel Meditation Practices",
      "Angel Numbers Interpretation",
      "Healing with Angel Energy",
      "Protection Techniques",
      "Automatic Writing with Angels",
      "Angel Card Reading Basics",
      "Intuition Activation"
    ]
  },
  {
    id: "psychic-development",
    title: "Psychic Development & Mediumship Certification",
    isCertification: true,
    category: "Psychic Development",
    shortDescription: "Develop psychic senses, clairvoyance, automatic writing, and mediumship.",
    modules: [
      "Psychic Awareness Training",
      "Clairvoyance Development",
      "Clairaudience Activation",
      "Clairsentience Training",
      "Claircognizance Development",
      "Mediumship & Spirit Communication",
      "Energy Sensitivity Training",
      "Aura Reading Skills",
      "Automatic Writing Practice",
      "Psychic Protection Methods",
      "Advanced Channeling Techniques"
    ]
  },
  {
    id: "tarot-reading",
    title: "Tarot Card Reading Certification Course",
    isCertification: true,
    category: "Tarot Reading",
    shortDescription: "Master Major & Minor Arcana spreads, interpretations, and shadow work.",
    modules: [
      "Tarot System Foundations",
      "Major & Minor Arcana Deep Study",
      "Card Interpretation Techniques",
      "Spreads & Layouts",
      "Relationship & Career Readings",
      "Intuitive Reading Development",
      "Shadow Work through Tarot",
      "Client Practice Readings",
      "Automatic Writing Integration"
    ]
  },
  {
    id: "manifestation-mastery",
    title: "Manifestation Mastery Certification (Manifest Career & Life)",
    isCertification: true,
    category: "Manifestation",
    shortDescription: "Reprogram the subconscious and shift identity to manifest career and love abundance.",
    modules: [
      "Law of Attraction Fundamentals",
      "Subconscious Reprogramming",
      "Visualization & Scripting",
      "Money Manifestation System",
      "Career Success Activation",
      "Relationship Manifestation",
      "Emotional Alignment Techniques",
      "Identity Shift Work",
      "Daily Manifestation Rituals"
    ]
  },
  {
    id: "relationship-healing",
    title: "Relationship Healing Certification Course",
    isCertification: true,
    category: "Relationship Healing",
    shortDescription: "Heal inner child wounds, release attachment patterns, and align heart chakra energy.",
    modules: [
      "Relationship Energy Dynamics",
      "Emotional Healing & Release Work",
      "Inner Child Healing",
      "Self-Love Activation",
      "Attachment Pattern Transformation",
      "Toxic Relationship Healing",
      "Communication Energy Alignment",
      "Third-Party Emotional Healing Work",
      "Heart Chakra Healing"
    ]
  },
  {
    id: "hooponopono-healing",
    title: "Ho’oponopono Healing Certification Course",
    isCertification: true,
    category: "Forgiveness Healing",
    shortDescription: "Master the Hawaiian system of forgiveness to release trauma and manifest peace.",
    modules: [
      "Introduction to Ho’oponopono System",
      "Four Sacred Phrases Practice",
      "Forgiveness Energy Healing",
      "Emotional Release Techniques",
      "Inner Child Healing",
      "Trauma Release Work",
      "Relationship Healing Practices",
      "Daily Self-Healing Rituals",
      "Manifestation through Forgiveness"
    ]
  },
  {
    id: "switchwords-numbers",
    title: "Switchwords & Angel Numbers Certification Course",
    isCertification: true,
    category: "Word & Number Energy",
    shortDescription: "Use power phrases, angel numbers, and synchronicity mapping to program energy.",
    modules: [
      "Switchword Energy System",
      "Healing & Money Switchwords",
      "Career & Relationship Activation Words",
      "Angel Numbers Interpretation (111–999)",
      "Synchronicity Understanding",
      "Daily Energy Programming",
      "Manifestation Integration Techniques"
    ]
  },
  {
    id: "meditation-awareness",
    title: "Meditation & Energy Awareness Course",
    isCertification: false,
    category: "Meditation",
    shortDescription: "Breathwork, chakra meditation, third eye activation, and raising emotional frequency.",
    modules: [
      "Breathwork & Mind Control",
      "Chakra Meditation Practices",
      "Stress Relief Techniques",
      "Third Eye Activation",
      "Energy Awareness Training",
      "Sleep Healing Meditation",
      "Visualization Training",
      "Emotional Balance Practices",
      "Frequency Raising System"
    ]
  }
];

// Special Crystal Healing Data
const CRYSTAL_HEALING_COURSE = {
  id: "crystal-healing",
  title: "Crystal Healing Certification Course",
  isCertification: true,
  category: "Crystal Healing",
  shortDescription: "A complete training program in crystal energy work, healing vibrations, and gemstone-based spiritual practices for emotional, mental, and energetic balance.",
  modules: [
    "Introduction to Crystal Energy System",
    "Understanding Crystal Vibrations & Frequencies",
    "Types of Healing Crystals & Their Properties",
    "Chakra-Crystal Connection System",
    "Crystal Selection Techniques",
    "Crystal Cleansing & Charging Methods",
    "Crystal Programming for Intentions",
    "Crystal Grids for Manifestation",
    "Healing with Crystal Placement on Body",
    "Emotional Healing with Crystals",
    "Wealth & Abundance Crystal Work",
    "Relationship Healing Crystal Practices",
    "Protection & Grounding Crystals",
    "Meditation with Crystals",
    "Distance Crystal Healing Techniques",
    "Daily Crystal Healing Rituals",
    "Advanced Crystal Energy Work"
  ]
};

// Emergency Priority Consultation Data
const EMERGENCY_CONSULTATION = {
  title: "Emergency Priority Consultation",
  duration: "60 Minutes",
  fee: "500 CAD",
  shortDescription: "For urgent situations requiring immediate guidance and priority scheduling.",
  suitableFor: [
    "Relationship crisis",
    "Breakup and separation concerns",
    "Third-party involvement situations",
    "Marriage-related concerns",
    "Career and business decisions",
    "Financial stress and uncertainty",
    "Family conflicts",
    "Emotional distress and confusion",
    "Spiritual guidance during challenging situations",
    "Urgent life decisions requiring clarity"
  ],
  includes: [
    "Priority appointment scheduling",
    "One-on-one consultation",
    "Personalized guidance and intuitive insights",
    "Energy assessment",
    "Customized spiritual remedies",
    "Practical recommendations based on your situation",
    "Action plan for moving forward with clarity and confidence",
    "One complimentary personalized remedy"
  ],
  remedyNote: "A free personalized remedy will be provided based on your specific situation, energy, and guidance received during the session.",
  investment: "$500 CAD for a 60-Minute Emergency Priority Consultation."
};

// Course Image Getter
const getCourseImage = (courseId) => {
  switch (courseId) {
    case "numerology-mastery":
    case "switchwords-numbers":
      return courseNumerology;
    case "nlp-transformation":
    case "manifestation-mastery":
      return courseManifestation;
    case "reiki-healing":
    case "pranic-healing":
    case "meditation-awareness":
      return courseChakra;
    case "akashic-records":
      return courseAstrology;
    case "twin-flame":
    case "relationship-healing":
      return courseLove;
    case "tarot-reading":
      return courseTarot;
    default:
      return courseProtection;
  }
};

// Tarot-inspired separator component
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

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModules, setOpenModules] = useState({});

  const toggleModule = (index) => {
    setOpenModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Reset accordion on selected course change
  useEffect(() => {
    setOpenModules({});
  }, [selectedCourse]);

  // Live filtered courses
  const filteredCourses = COURSES.filter((c) => {
    if (searchQuery.trim() === "") return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = c.title.toLowerCase().includes(query);
    const categoryMatch = c.category.toLowerCase().includes(query);
    const descMatch = c.shortDescription.toLowerCase().includes(query);
    const modMatch = c.modules && c.modules.some(m => m.toLowerCase().includes(query));
    return titleMatch || categoryMatch || descMatch || modMatch;
  });

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden">
      
      {/* 10. COURSES PAGE HERO */}
      <PageHero
        eyebrow="Academy & Certifications"
        title={<>Shivani Spiritual Yatri <span className="text-gradient-gold">Academy</span></>}
        subtitle="Step into a sanctuary of professional spiritual training, energy healing certification, and sacred mentorship."
      />

      <TarotSeparator />

      {/* 12. COURSE SEARCH (STICKY FILTERS HEADER) */}
      <section id="courses-search" className="sticky top-[72px] z-30 bg-background/90 backdrop-blur-md border-y border-gold/15 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full">
            <div className="text-left w-full sm:w-auto">
              <span className="text-[9px] uppercase tracking-wider text-gold font-semibold">Attunement Academy</span>
              <h3 className="font-display text-base md:text-lg text-foreground font-medium uppercase tracking-wider">
                Certification Courses ({filteredCourses.length} Programs)
              </h3>
            </div>

            <div className="relative w-full sm:w-80 shrink-0">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gold/60">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course, keywords, modalities..."
                className="w-full pl-9 pr-9 py-2 bg-[#151B26]/90 border border-gold/20 hover:border-gold/35 focus:border-gold/55 rounded-full text-xs text-foreground placeholder-muted-foreground/70 focus:outline-none transition-all shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13. COURSE GRID */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch relative z-10">
              {filteredCourses.map((c, i) => {
                const badgeLabel = c.isCertification ? "Professional Certificate" : "Self Healing Program";
                return (
                  <Reveal key={c.id} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group relative flex flex-col justify-between h-full rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md p-5 transition-all duration-500 hover:border-gold/35 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.1)] overflow-hidden"
                    >
                      <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                          {/* Course Cover Image */}
                          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-gold/20 shadow-[0_8px_20px_rgba(0,0,0,0.45)] bg-[#0D1117]/20 backdrop-blur-sm mb-4 shrink-0">
                            <img
                              src={getCourseImage(c.id)}
                              alt={c.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-transparent to-transparent pointer-events-none" />
                          </div>

                          {/* Badge & Category */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="rounded-full border border-gold/30 bg-[#151B26]/85 px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-gold">
                              {c.category}
                            </span>
                            <span className="rounded-full border border-indigo-500/30 bg-[#0D1117]/80 px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-indigo-300">
                              {badgeLabel}
                            </span>
                          </div>

                          <h3 className="font-display text-base text-foreground/95 group-hover:text-gold transition-colors duration-300 font-medium leading-snug">
                            {c.title}
                          </h3>

                          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/80 font-light line-clamp-3">
                            {c.shortDescription}
                          </p>
                        </div>

                        {/* Course actions */}
                        <div className="mt-5 pt-3 border-t border-gold/5 flex gap-2 w-full">
                          <button
                            onClick={() => setSelectedCourse(c)}
                            className="flex-1 rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider transition-all text-gold cursor-pointer"
                          >
                            View Details
                          </button>
                          <a
                            href={getWhatsAppEnrollUrl(c.title)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 rounded-full btn-gold py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="h-3.5 w-3.5" /> Enroll Now
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-gold/10 rounded-3xl bg-card-glass backdrop-blur-md relative overflow-hidden">
                <h3 className="font-display text-lg text-foreground font-medium uppercase tracking-wider mb-2">No matching courses found</h3>
                <p className="text-xs text-muted-foreground/85 max-w-md mb-6">We couldn't find any courses matching your search. Clear the search bar to show all courses.</p>
                <button onClick={() => setSearchQuery("")} className="px-5 py-2 rounded-full btn-gold text-xs font-semibold uppercase tracking-wider">Reset Search</button>
              </div>
            </Reveal>
          )}

        </div>
      </section>

      <TarotSeparator />

      {/* 11. WHY CHOOSE ACADEMY */}
      <section className="py-16 relative overflow-hidden bg-[#0D1117]/25 border-y border-gold/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-gold font-medium bg-gold/5 border border-gold/30 rounded-full px-3 py-1 mb-3">
                <Sparkles className="h-3 w-3 text-gold" /> Academy Values
              </span>
              <h2 className="font-display text-3xl md:text-4.5xl tracking-widest font-medium uppercase text-gradient-gold">
                Why Choose Shivani Spiritual Yatri Academy
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {[
              { title: "Personalized Guidance", text: "Personalized and Professional Guidance customized to your unique spiritual signature." },
              { title: "Deep Healing", text: "Deep Healing & Transformational Approach connecting energy transits with mental blocks." },
              { title: "Structured Curriculum", text: "Beginner to Advanced Spiritual Training structured in step-by-step master levels." },
              { title: "Practical Methods", text: "Practical + Spiritual Learning Methods focusing on client case studies and exercises." },
              { title: "Confidential Sanctuary", text: "Safe, Supportive, and Confidential Environment respecting your energy profile." },
              { title: "Online Worldwide", text: "Online Sessions Available Worldwide with remote attunements and digital classrooms.", badge: "Worldwide Classrooms" },
              { title: "Attuned Credentials", text: "Certification Courses Available instantly on completion of practice readings.", badge: "Certified Programs" },
              { title: "Sacred Mentorship", text: "Lifetime Learning & Mentorship giving you ongoing guidance in your professional practice." },
              { title: "Eastern Science", text: "Energy-Based Healing Techniques based on traditional Sanskrit and Vedic scriptures." },
              { title: "Real Life Shifts", text: "Focused on Real Emotional & Spiritual Transformation to unlock immediate abundance and peace." }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.04}>
                <div className="group relative p-5.5 rounded-xl border border-gold/10 bg-card-glass backdrop-blur-md flex flex-col justify-between h-full transition-all duration-300 hover:border-gold/30 hover:bg-gold/5 shadow-md">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-5 h-5 rounded-full border border-gold/35 flex items-center justify-center shrink-0 text-gold text-[10px] font-bold bg-gold/5 shadow-[0_0_5px_rgba(212,175,55,0.15)]">
                        ✓
                      </div>
                      {item.badge && (
                        <span className="rounded-full border border-gold/20 bg-gold/5 px-2 py-0.5 text-[7px] uppercase tracking-widest text-gold font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-gold transition-colors uppercase tracking-wider mb-2 text-left">{item.title}</h4>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed font-light text-left">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TarotSeparator />

      {/* 15. CRYSTAL HEALING SPOTLIGHT */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Reveal>
            <div className="p-6 md:p-10 rounded-3xl border border-gold/25 bg-card-glass backdrop-blur-xl flex flex-col justify-between h-full shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.06)] relative overflow-hidden">
              {/* Backlight spots & Floating crystal image */}
              <div className="absolute right-4 top-4 pointer-events-none opacity-20 z-0">
                <img src={clearQuartz} alt="Crystal Glow" className="h-44 w-44 object-contain animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none z-0" />
              
              <div className="relative z-10 text-left">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gold flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5 animate-spin-slow" /> Featured Spotlight
                  </span>
                  <span className="rounded-full border border-indigo-500/30 bg-[#0D1117]/85 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-indigo-300">
                    Professional Certificate
                  </span>
                </div>
                
                <h3 className="font-display text-2.5xl md:text-3.5xl text-gradient-gold font-medium uppercase tracking-wider mb-4 leading-tight">
                  {CRYSTAL_HEALING_COURSE.title}
                </h3>
                
                <p className="text-xs md:text-sm text-muted-foreground/90 font-light leading-relaxed mb-6 text-justify max-w-4xl">
                  {CRYSTAL_HEALING_COURSE.shortDescription}
                </p>

                <div className="border-t border-gold/15 pt-5 mb-8 max-w-4xl">
                  <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block mb-3">Syllabus Highlights:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px] text-muted-foreground/85">
                    {CRYSTAL_HEALING_COURSE.modules.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5 animate-pulse" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 border-t border-gold/5 pt-5 relative z-10">
                <button
                  onClick={() => setSelectedCourse(CRYSTAL_HEALING_COURSE)}
                  className="rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold px-7 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all text-gold cursor-pointer"
                >
                  Syllabus Details
                </button>
                <a
                  href={getWhatsAppEnrollUrl(CRYSTAL_HEALING_COURSE.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full btn-gold px-7 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" /> Enroll Now
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TarotSeparator />

      {/* 16. EMERGENCY PRIORITY CONSULTATION */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Reveal>
            <div className="p-6 md:p-10 rounded-3xl border-2 border-red-500/35 bg-[#151B26]/40 backdrop-blur-xl flex flex-col justify-between h-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              {/* Luxury spotlight radial overlay */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-950/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
              
              <div className="relative z-10 text-left">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="rounded-full border border-red-500 bg-red-500/10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-red-400 animate-pulse">
                    Urgent / Priority Schedule
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {EMERGENCY_CONSULTATION.duration} Consultation
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4 flex-wrap mb-4 pb-3 border-b border-gold/10">
                  <h3 className="font-display text-2.5xl md:text-3.5xl text-foreground font-medium uppercase tracking-wider">
                    {EMERGENCY_CONSULTATION.title}
                  </h3>
                  <div className="text-red-400 font-display text-lg md:text-xl font-bold border border-red-500/30 rounded-xl px-3.5 py-1.5 bg-red-500/5 shrink-0 shadow-lg">
                    {EMERGENCY_CONSULTATION.fee}
                  </div>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground/90 font-light leading-relaxed mb-6 text-justify">
                  {EMERGENCY_CONSULTATION.shortDescription}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 mb-6">
                  <div>
                    <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block mb-3">Suitable For Crisis:</span>
                    <div className="max-h-48 overflow-y-auto pr-1 text-[11px] text-muted-foreground/85 space-y-2 text-left">
                      {EMERGENCY_CONSULTATION.suitableFor.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400/80 shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block mb-3">What is Included:</span>
                    <div className="max-h-48 overflow-y-auto pr-1 text-[11px] text-muted-foreground/85 space-y-2 text-left">
                      {EMERGENCY_CONSULTATION.includes.map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold/80 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground/60 italic mb-6 leading-relaxed bg-[#0D1117]/30 border border-gold/5 p-3 rounded-lg">
                  {EMERGENCY_CONSULTATION.remedyNote}
                </p>
              </div>

              <div className="pt-5 border-t border-gold/10 relative z-10 w-full">
                <a
                  href={getWhatsAppBookUrl(EMERGENCY_CONSULTATION.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-full btn-gold py-3 text-center text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.25)]"
                >
                  <MessageSquare className="h-4 w-4 shrink-0 animate-pulse" /> Book Emergency Session — {EMERGENCY_CONSULTATION.fee}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TarotSeparator />

      {/* 17. FOOTNOTE SECTIONS */}
      <section className="py-16 relative overflow-hidden bg-[#0D1117]/20 border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-10">
            {/* Final Outcome */}
            <Reveal delay={0.05}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Final Outcome
                  </h3>
                  <p className="text-xs text-muted-foreground/75 leading-relaxed font-light mb-4">
                    After completing these certification programs, students can:
                  </p>
                  <ul className="space-y-2.5 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Practice as certified spiritual healers (based on course level)",
                      "Offer client sessions professionally",
                      "Perform energy healing, readings, and guidance",
                      "Build a spiritual coaching/healing business",
                      "Develop strong intuitive and psychic abilities",
                      "Transform personal life emotionally, mentally, and energetically"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Admission & Enrollment Process */}
            <Reveal delay={0.1}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Admission & Enrollment
                  </h3>
                  <ul className="space-y-3.5 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Choose your course or consultation",
                      "Connect via website or WhatsApp booking",
                      "Receive onboarding details instantly",
                      "Get access to course or session",
                      "Start your learning or healing journey"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold text-[10px] font-bold">
                          {idx + 1}
                        </div>
                        <span className="mt-0.5">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[10px] text-muted-foreground/60 italic">
                    All services are available online and accessible worldwide.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Who These Courses Are For */}
            <Reveal delay={0.15}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Who These Courses Are For
                  </h3>
                  <ul className="space-y-2.5 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Beginners starting spiritual journey",
                      "Aspiring professional healers",
                      "Tarot, Reiki, and energy practitioners",
                      "People facing emotional or life challenges",
                      "Career changers into spiritual field",
                      "Coaches and consultants",
                      "Anyone seeking intuition, healing, or manifestation growth"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-10">
            {/* Learning Experience */}
            <Reveal delay={0.2}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Learning Experience
                  </h3>
                  <ul className="space-y-2.5 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Step-by-step structured modules",
                      "Practical demonstrations and explanations",
                      "Real-life examples and case understanding",
                      "Guided spiritual and mindset practices",
                      "Energy-based learning with practical application",
                      "Easy-to-follow training format"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/70 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Tools You Will Learn */}
            <Reveal delay={0.25}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Tools You Will Learn
                  </h3>
                  <ul className="space-y-2.5 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Chakra scanning methods",
                      "Aura reading and cleansing",
                      "Energy protection techniques",
                      "Intuition development practices",
                      "Manifestation scripting",
                      "Subconscious reprogramming tools",
                      "Emotional release techniques",
                      "Distance healing methods",
                      "Automatic writing practice",
                      "Grounding and energy balancing"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/70 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Course Outcomes */}
            <Reveal delay={0.3}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Course Outcomes
                  </h3>
                  <p className="text-[11px] text-muted-foreground/70 mb-3 font-light">After completion, you will be able to:</p>
                  <ul className="space-y-2 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Read and understand energy",
                      "Perform healing for self and others",
                      "Provide intuitive guidance",
                      "Work with clients professionally",
                      "Identify emotional and energetic blockages",
                      "Strengthen intuition and awareness",
                      "Apply manifestation techniques in daily life",
                      "Build a spiritual career or practice",
                      "Improve emotional balance and clarity"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/70 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Certification Benefits */}
            <Reveal delay={0.35}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Certification Benefits
                  </h3>
                  <ul className="space-y-2.5 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Official Certification from Shivani Spiritual Yatri Academy",
                      "Practitioner recognition (based on course level)",
                      "Eligibility to begin professional practice",
                      "Proof of structured training",
                      "Foundation for spiritual career building"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Award className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Student Support */}
            <Reveal delay={0.4}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between text-left shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:border-gold/25 transition-all">
                <div>
                  <h3 className="font-display text-base font-semibold text-gold uppercase tracking-wider mb-4 pb-2 border-b border-gold/10">
                    Student Support
                  </h3>
                  <ul className="space-y-2.5 text-xs text-muted-foreground/90 font-light">
                    {[
                      "Guidance during learning process",
                      "Clarification support",
                      "Practice assistance (where applicable)",
                      "Spiritual direction support",
                      "Career guidance in spiritual field"
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Disclaimer section */}
          <div className="mt-8">
            <Reveal delay={0.45}>
              <div className="p-5 rounded-xl border border-gold/10 bg-[#0D1117]/25 text-left text-xs text-muted-foreground/70 leading-relaxed max-w-7xl mx-auto flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-gold/60 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gold uppercase tracking-wider block mb-1">Disclaimer</span>
                  All services and courses are for spiritual, educational, and personal development purposes only. Results may vary depending on individual belief, practice, and energy alignment.
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 14. COURSE DETAILS MODAL (ACCORDION & FIXED ACTION BAR) */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl h-[85vh] md:h-[80vh] rounded-2xl border border-gold/20 bg-[#151B26] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(216,182,122,0.15)] flex flex-col cursor-default overflow-hidden"
            >
              {/* Sticky close button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 z-40 rounded-full border border-gold/15 bg-[#151B26]/90 p-2 text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch overflow-hidden h-full p-6 md:p-8 pb-24 md:pb-24">
                
                {/* Modal Left Image */}
                <div className="col-span-1 md:col-span-5 relative h-[180px] md:h-full rounded-xl overflow-hidden border border-gold/15 bg-[#0D1117]/30 shrink-0">
                  <img
                    src={selectedCourse.id === "crystal-healing" ? clearQuartz : getCourseImage(selectedCourse.id)}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151B26] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 z-10 rounded-full border border-gold/30 bg-[#151B26]/90 px-3 py-0.5 text-[8px] font-bold uppercase tracking-widest text-gold">
                    {selectedCourse.category}
                  </span>
                </div>

                {/* Modal Right Details (Scrollable content) */}
                <div className="col-span-1 md:col-span-7 flex flex-col justify-between overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/20 h-full space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <h3 className="font-display text-lg md:text-xl font-medium tracking-wide uppercase text-foreground text-left max-w-sm">
                        {selectedCourse.title}
                      </h3>
                      {selectedCourse.isCertification && (
                        <span className="rounded-full border border-indigo-500/30 bg-[#0D1117]/80 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-indigo-300">
                          Certification
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground/90 leading-relaxed font-light text-justify">
                      {selectedCourse.shortDescription}
                    </p>

                    {/* Modules Accordion */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-2">Syllabus Curriculum:</span>
                      <div className="space-y-2">
                        {selectedCourse.modules.map((m, idx) => {
                          const isOpen = !!openModules[idx];
                          return (
                            <div key={idx} className="border border-gold/15 rounded-xl bg-[#0D1117]/35 overflow-hidden transition-all duration-300">
                              <button
                                onClick={() => toggleModule(idx)}
                                className="w-full flex items-center justify-between p-3.5 text-left text-[11px] font-semibold text-gold uppercase tracking-wider cursor-pointer hover:bg-gold/5 focus:outline-none"
                              >
                                <span>Module {idx + 1}: {m}</span>
                                <span className="text-gold/60 font-bold ml-2">{isOpen ? "−" : "+"}</span>
                              </button>
                              
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-3.5 pb-3.5 text-[11px] text-muted-foreground/80 leading-relaxed font-light border-t border-gold/5 pt-2 text-justify"
                                  >
                                    In this module, you will receive in-depth attunements, practical exercises, and case-study reviews covering the core teachings of {m.toLowerCase()}.
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-[#151B26]/60 border border-gold/10 p-3.5 rounded-xl text-left">
                      <span className="text-[10px] font-semibold text-gold uppercase tracking-widest block mb-1">Certification attunement:</span>
                      <p className="text-[10px] leading-relaxed text-muted-foreground/80">
                        Receive official practitioner credentials from Shivani Spiritual Yatri Academy upon satisfactory modules completion and guided assessment review.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Enroll button FIXED/STICKY at bottom of modal */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#151B26]/95 border-t border-gold/15 p-4 flex gap-4 z-30">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all text-gold cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={getWhatsAppEnrollUrl(selectedCourse.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-full btn-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  Enroll Now
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
