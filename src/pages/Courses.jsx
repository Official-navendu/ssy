import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, BookOpen, ArrowRight, X, GraduationCap, CheckCircle2, Compass, Shield } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/utils/site";

// Import course premium assets generated previously
import courseTarot from "@/assets/images/course_tarot.webp";
import courseAstrology from "@/assets/images/course_astrology.webp";
import courseKundli from "@/assets/images/course_kundli.webp";
import courseLove from "@/assets/images/course_love.webp";
import courseNumerology from "@/assets/images/course_numerology.webp";
import courseChakra from "@/assets/images/course_chakra.webp";
import courseProtection from "@/assets/images/course_protection.webp";
import courseManifestation from "@/assets/images/course_manifestation.webp";

// WhatsApp purchase link helper
const getWhatsAppUrl = (courseName) => {
  const text = `Hello Shivani Spiritual Yatri, I am interested in purchasing the ${courseName} course. Please share complete details.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
};

const coursesData = [
  {
    id: 1,
    slug: "tarot-mastery",
    title: "Tarot Reading Mastery",
    tagline: "Master the Art of Intuitive Reading",
    shortDescription: "Learn the secrets of Rider-Waite tarot cards, master intuitive spreads, and begin reading professionally.",
    price: 99,
    duration: "4 Weeks",
    image: courseTarot,
    auraColor: "from-purple/20 via-purple-deep/10 to-gold/5",
    fullDescription: "Unlock your intuitive potential with our comprehensive Tarot Reading Mastery course. Whether you are a complete beginner or looking to deepen your intuitive understanding, this course takes you on a profound spiritual journey through the 78 keys of the Tarot. Guided directly by Shivani, you will learn to read the cards not just by memory, but through direct cosmic channel alignment and intuitive resonance.",
    benefits: [
      "Step-by-step guidance on all 78 Major & Minor Arcana cards",
      "Learn 5 premium layout spreads including the Celtic Cross",
      "How to read confidently for clients and set up your practice",
      "Secrets to cleansing and charging your tarot decks"
    ],
    whatYouLearn: [
      "Develop deep psychic intuition & trust your inner voice",
      "Interpret symbols, numbers, and color meanings on Rider-Waite cards",
      "Perform clean energetic readings without taking on negative energy"
    ],
    highlights: [
      "Lifetime access to video lectures",
      "Interactive practice circles",
      "Official certification upon completion"
    ],
    mentor: "Shivani Spiritual Yatri"
  },
  {
    id: 2,
    slug: "astrology-fundamentals",
    title: "Astrology Fundamentals",
    tagline: "Decode the Language of the Stars",
    shortDescription: "Explore zodiac signs, houses, planets, and how to read basic natal birth charts.",
    price: 149,
    duration: "6 Weeks",
    image: courseAstrology,
    auraColor: "from-gold/15 via-purple/15 to-purple-deep/10",
    fullDescription: "Discover how the cosmos shapes human destiny. The Astrology Fundamentals course is a premium, beautifully structured guide to understanding planetary movements, the twelve houses of the zodiac, and their deep spiritual influence on our everyday lives. Learn to decode your own cosmic blueprint and gain a profound understanding of those around you.",
    benefits: [
      "Understand the spiritual meaning of 10 primary planetary alignments",
      "Comprehensive guide to the 12 zodiac houses & their life domains",
      "Personalized birth chart reading worksheets",
      "Vedic & Western astrology comparison basics"
    ],
    whatYouLearn: [
      "How to cast and read a basic birth chart (Janma Kundli)",
      "Differentiate planetary elements, qualities, and energetic states",
      "Trace and interpret current planetary transits and cycles"
    ],
    highlights: [
      "Printable cosmic planetary guides",
      "Weekly live Q&A sessions",
      "Peer reflection study group"
    ],
    mentor: "Shivani Spiritual Yatri"
  },
  {
    id: 3,
    slug: "advanced-kundli",
    title: "Advanced Kundli Analysis",
    tagline: "Vedic Astrological Mastery",
    shortDescription: "Deep dive into planetary transitions, Nakshatras, Dashas, and Vedic remedy calculations.",
    price: 199,
    duration: "8 Weeks",
    image: courseKundli,
    auraColor: "from-purple-deep/20 via-purple/15 to-gold/10",
    fullDescription: "Take your astrological knowledge to a professional level with our Advanced Kundli Analysis course. Vedic astrology (Jyotish) is an ancient, mathematical science of light. In this course, we will deep dive into the complex layers of Kundli analysis, exploring Nakshatras (lunar mansions), Vimshottari Dashas (planetary periods), divisional charts (Vargas), and traditional Vedic remedies (Upayas) to neutralize negative planetary effects.",
    benefits: [
      "Master-level instruction on Nakshatra characteristics & padas",
      "In-depth analysis of planetary retrogrades, retrogressions, and combustions",
      "Vedic calculation of gemstone, mantra, and charity remedies",
      "Real-life case study analyses with Shivani"
    ],
    whatYouLearn: [
      "Calculate and interpret major and minor Dasha periods with extreme precision",
      "Analyze career, marriage, health, and spiritual growth potential in a Kundli",
      "Predict life transitions and identify cosmic remedies for spiritual alignment"
    ],
    highlights: [
      "Advanced birth chart calculation templates",
      "1-on-1 chart review feedback",
      "Vedic Astrology Master certificate"
    ],
    mentor: "Shivani Spiritual Yatri"
  },
  {
    id: 4,
    slug: "love-relationship",
    title: "Love & Relationship Guidance",
    tagline: "Harmonize Soul Connections",
    shortDescription: "Understand relationship karma, soulmate dynamics, and spiritual boundaries through planetary synastry.",
    price: 99,
    duration: "3 Weeks",
    image: courseLove,
    auraColor: "from-pink-900/20 via-purple/15 to-gold/5",
    fullDescription: "Relationships are a sacred mirror for our personal growth. In this cosmic course, you will learn to navigate the complexities of love, soulmate bonds, and karmic relationships using spiritual alignment and relationship synastry. Understand the planetary signatures of attraction, conflict resolution, and the cultivation of unconditional divine love.",
    benefits: [
      "Learn relationship synastry (overlaying birth charts) basics",
      "Clear identification of twin flame, soulmate, and karmic connections",
      "Meditation practices to attract aligned partnerships",
      "Boundaries and energy clearance templates"
    ],
    whatYouLearn: [
      "Identify karmic relationship patterns and break negative cycles",
      "Use your Venus and Mars placements to understand your love language",
      "Maintain healthy spiritual boundaries while keeping your heart open"
    ],
    highlights: [
      "Soul connection compatibility worksheets",
      "Guided relationship meditations",
      "Private support forum"
    ],
    mentor: "Shivani Spiritual Yatri"
  },
  {
    id: 5,
    slug: "numerology-secrets",
    title: "Numerology Secrets",
    tagline: "Unlock the Vibration of Numbers",
    shortDescription: "Calculate Life Path numbers, destiny numbers, and explore the vibration of angel numbers.",
    price: 99,
    duration: "4 Weeks",
    image: courseNumerology,
    auraColor: "from-gold/15 via-purple-deep/15 to-purple/10",
    fullDescription: "Numbers are the mathematical blueprint of the universe. Every number carries a specific vibrational frequency that directly influences your personality, challenges, and destiny. The Numerology Secrets course teaches you how to calculate and interpret your Life Path, Destiny, Soul Urge, and Personality numbers, and decode the mysterious synchronicities of angel numbers.",
    benefits: [
      "Step-by-step calculators for core spiritual numbers",
      "Profiles for Life Path numbers 1-9 and Master Numbers 11, 22, 33",
      "Angel numbers decoding directory (111 to 999)",
      "How to align your home address and business names vibrationally"
    ],
    whatYouLearn: [
      "Discover your true life purpose and hidden natural talents",
      "Navigate personal year cycles to time major life decisions",
      "Decode recurring number sequences and messages from the divine universe"
    ],
    highlights: [
      "Interactive Numerology Workbook",
      "Weekly vibrational alignment check-ins",
      "Spiritual Numerology Certificate"
    ],
    mentor: "Shivani Spiritual Yatri"
  },
  {
    id: 6,
    slug: "chakra-healing",
    title: "Chakra Healing & Meditation",
    tagline: "Realign Your Energy System",
    shortDescription: "Deep focus on activating, balancing, and healing all seven primary chakra energy centers.",
    price: 149,
    duration: "5 Weeks",
    image: courseChakra,
    auraColor: "from-purple/20 via-purple-deep/15 to-gold/10",
    fullDescription: "Restore absolute harmony to your body, mind, and spirit. The Chakra Healing & Meditation course is a profound, experiential journey through your seven primary energy centers (Chakras). You will learn how physical, emotional, and spiritual blockages manifest in your energy field, and master the exact techniques required to clear, activate, and balance each chakra for optimal health and vitality.",
    benefits: [
      "5 complete guided chakra activation meditations",
      "Sound healing, color therapy, and essential oil guides for each chakra",
      "Yoga poses and breathwork (Pranayama) for energy flow",
      "Chakra self-assessment diagnostic tools"
    ],
    whatYouLearn: [
      "Identify emotional and physical signs of chakra underactivity or overactivity",
      "Use seed mantras, mudras, and healing crystals to clear energy blocks",
      "Establish a powerful, daily meditation practice that keeps you centered and radiant"
    ],
    highlights: [
      "High-quality audio chakra meditations",
      "Crystal pairing handbook",
      "Chakra Practitioner Certificate"
    ],
    mentor: "Shivani Spiritual Yatri"
  },
  {
    id: 7,
    slug: "energy-protection",
    title: "Spiritual Energy Protection",
    tagline: "Shield Your Sacred Field",
    shortDescription: "Learn auric shielding, space clearing, and protecting your energy as an intuitive empath.",
    price: 99,
    duration: "3 Weeks",
    image: courseProtection,
    auraColor: "from-purple-deep/20 via-gold/10 to-purple/10",
    fullDescription: "Protect your peace in a chaotic world. For empaths, healers, and highly sensitive souls, learning to manage and protect your energy is a critical survival skill. This premium course teaches you how to establish strong auric boundaries, clear negative or stagnant spaces, shield yourself from psychic draining, and maintain a high vibration in any environment.",
    benefits: [
      "Daily energetic hygiene ritual workbook",
      "Auric shielding visualization audios",
      "Step-by-step guide to smudging, salt clearing, and sound cleansing",
      "Protection mantras and sacred symbols directory"
    ],
    whatYouLearn: [
      "Differentiate between your own emotions and absorbed external energies",
      "Build a powerful, impermeable golden light shield around your aura",
      "Safely clear negative entities or heavy energy from your home and workplace"
    ],
    highlights: [
      "Empath survival guide workbook",
      "Protection sound baths",
      "Aura Hygiene Certificate"
    ],
    mentor: "Shivani Spiritual Yatri"
  },
  {
    id: 8,
    slug: "manifestation-alignment",
    title: "Manifestation & Cosmic Alignment",
    tagline: "Co-Create with the Universe",
    shortDescription: "Master the Law of Attraction, script your reality, and align your energy with infinite abundance.",
    price: 149,
    duration: "4 Weeks",
    image: courseManifestation,
    auraColor: "from-gold/15 via-purple/15 to-purple-deep/10",
    fullDescription: "Manifestation is not just wishing; it is an energetic match. The Manifestation & Cosmic Alignment course merges ancient spiritual laws with modern quantum principles to help you consciously co-create your reality. Learn to dissolve limiting beliefs, elevate your vibrational state, script your future, and align yourself with the flow of infinite universal abundance.",
    benefits: [
      "Premium scripting templates & manifestation journal prompts",
      "Guided subconscious clearing meditation",
      "How to create and charge a cosmic vision board",
      "Universal Laws masterclass (beyond just Law of Attraction)"
    ],
    whatYouLearn: [
      "Dissolve deep ancestral money blocks and negative limiting beliefs",
      "Use scripting and visualization techniques to attract wealth and health",
      "Surrender control and enter the state of active universal flow and alignment"
    ],
    highlights: [
      "Manifestation Journal PDF",
      "Interactive abundance meditation audios",
      "Cosmic Alignment Certificate"
    ],
    mentor: "Shivani Spiritual Yatri"
  }
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCourse(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCourse]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-20">
      {/* 10. GALAXY BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CosmicBackground density={65} />
      </div>

      {/* spinning sacred geometry decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 z-[5]">
        <div className="h-[600px] w-[600px] rounded-full border border-gold/5 animate-spin-slow" style={{ animationDuration: "60s" }} />
        <div className="absolute inset-20 rounded-full border border-purple/5 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "40s" }} />
      </div>

      <div className="relative z-10">
        {/* ========================================
            2. COURSES PAGE HERO SECTION
           ======================================== */}
        <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16 text-center">
          <div className="mx-auto max-w-4xl px-6 relative">
            {/* Ambient Nebula Fog */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "9s" }} />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gold/5 blur-[90px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "13s" }} />

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
            >
              <Sparkles className="h-3 w-3" /> Cosmic Academy
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6.5xl tracking-widest font-semibold text-glow-portal"
            >
              Spiritual Courses & <span className="text-gradient-cosmic">Cosmic Learning</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/95 leading-relaxed tracking-wider font-light"
            >
              Unlock ancient wisdom, tarot mastery, astrology knowledge, and spiritual transformation through guided premium courses.
            </motion.p>
          </div>
        </section>

        {/* ========================================
            3. COURSES GRID LAYOUT
           ======================================== */}
        <section className="py-12 pb-24 relative bg-background/10">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
              {coursesData.map((course, i) => (
                <Reveal key={course.slug} delay={i * 0.05}>
                  {/* ========================================
                      4. COURSE CARDS DESIGN
                     ======================================== */}
                  <div className="group relative overflow-hidden rounded-2xl glass p-5 course-card-premium bg-card/5 flex flex-col justify-between h-full">
                    {/* Inner glowing aura */}
                    <div className={`absolute -top-20 -left-20 h-44 w-44 rounded-full bg-gradient-to-br ${course.auraColor} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />

                    <div className="flex flex-col h-full justify-between relative z-10">
                      <div>
                        {/* Course Image */}
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-gold/20 shadow-[0_8px_20px_rgba(0,0,0,0.5)] bg-background/20 backdrop-blur-sm transition-all duration-700 group-hover:border-gold/45 group-hover:shadow-gold/15 mb-4">
                          <div className={`absolute -inset-2 bg-gradient-to-tr ${course.auraColor} rounded-2xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none`} />
                          <img
                            src={course.image}
                            alt={course.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-108"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-purple-deep/10 pointer-events-none" />

                          {/* Subtle Gold Corner Highlights */}
                          <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-gold/40 pointer-events-none" />
                          <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-gold/40 pointer-events-none" />
                          <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-gold/40 pointer-events-none" />
                          <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-gold/40 pointer-events-none" />
                        </div>

                        {/* Title, Badges & Tagline */}
                        <div className="flex items-center justify-between gap-2.5 mb-2.5 flex-wrap">
                          <div className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/5 px-2.5 py-0.5">
                            <span className="font-display text-sm text-gold font-medium">${course.price}</span>
                            <span className="text-[8px] tracking-wider text-muted-foreground uppercase mt-0.5">CAD</span>
                          </div>
                          <div className="inline-flex items-center gap-1 text-[10px] text-purple tracking-widest font-semibold uppercase">
                            <Clock className="h-3 w-3 text-purple" /> {course.duration}
                          </div>
                        </div>

                        <h3 className="font-display text-xl text-foreground/95 group-hover:text-gold transition-colors duration-300">
                          {course.title}
                        </h3>

                        <p className="mt-1 text-[11px] italic font-medium text-gold/70 tracking-wide">
                          {course.tagline}
                        </p>

                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80 font-light">
                          {course.shortDescription}
                        </p>
                      </div>

                      {/* CTAs */}
                      <div className="mt-6 flex flex-col gap-2.5">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="w-full text-center py-2.5 rounded-full text-xs font-semibold tracking-wider btn-outline-gold transition-all duration-300"
                        >
                          View Course Details
                        </button>
                        <a
                          href={getWhatsAppUrl(course.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center py-2.5 rounded-full text-xs font-semibold tracking-wider btn-gold transition-all duration-300 inline-block hover:scale-[1.02]"
                        >
                          Purchase Course
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ========================================
          5. COURSE DETAIL POPUP MODAL
         ======================================== */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-30"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl rounded-2xl glass-strong border border-gold/35 bg-[#09090b]/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(212,175,55,0.12)] p-6 md:p-8 overflow-hidden z-40 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full border border-gold/25 bg-background/50 hover:bg-gold/15 hover:border-gold/50 text-foreground transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start relative">
                {/* Aura decoration */}
                <div className={`absolute -top-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-br ${selectedCourse.auraColor} blur-3xl opacity-20 pointer-events-none`} />

                {/* Left Side Column: Large Image & Badges */}
                <div className="md:col-span-2 space-y-5">
                  <div className="relative aspect-[4/3] md:aspect-square w-full rounded-xl overflow-hidden border border-gold/25 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <img
                      src={selectedCourse.image}
                      alt={selectedCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent pointer-events-none" />

                    {/* Image corner lines */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/45" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold/45" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold/45" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/45" />
                  </div>

                  <div className="p-4 rounded-xl glass-strong border border-gold/15 bg-card/5">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/80 font-semibold mb-2">Mentor & Guide</div>
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold to-purple text-background flex items-center justify-center font-display font-semibold text-sm">
                        SY
                      </div>
                      <div className="text-sm font-semibold text-gold tracking-wide">
                        {selectedCourse.mentor}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gold/10 pb-2">
                      <span className="text-xs text-muted-foreground tracking-wide">Course Duration</span>
                      <span className="text-sm text-foreground font-semibold flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-purple" /> {selectedCourse.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gold/10 pb-2">
                      <span className="text-xs text-muted-foreground tracking-wide">Pricing Option</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3 py-1">
                        <span className="font-display text-lg text-gold font-semibold">${selectedCourse.price}</span>
                        <span className="text-[9px] tracking-widest text-muted-foreground uppercase">CAD</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Column: Detailed Curriculum Text */}
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold mb-3">
                      <GraduationCap className="h-3 w-3 text-gold" /> Spiritual Syllabus
                    </span>
                    <h2 className="font-display text-2.5xl md:text-3xl text-foreground font-medium">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-xs md:text-sm italic font-medium text-gold/80 mt-1">
                      {selectedCourse.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground/90 mt-4 leading-relaxed font-light">
                      {selectedCourse.fullDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {selectedCourse.highlights.map((highlight, index) => (
                      <div key={index} className="p-2.5 rounded-lg border border-purple/15 bg-purple/5 text-center">
                        <div className="text-[10px] text-purple font-medium tracking-wide leading-snug">{highlight}</div>
                      </div>
                    ))}
                  </div>

                  {/* What you will learn */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gold tracking-widest uppercase flex items-center gap-2">
                      <Compass className="h-3.5 w-3.5 text-gold" /> Key Course Takeaways
                    </h4>
                    <div className="space-y-2">
                      {selectedCourse.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed font-light">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Benefits details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gold tracking-widest uppercase flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-gold" /> Features & Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCourse.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed font-light">
                          <div className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-2" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal CTA */}
                  <div className="pt-4 border-t border-gold/15 flex items-center gap-4 flex-wrap sm:flex-nowrap">
                    <a
                      href={getWhatsAppUrl(selectedCourse.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-3.5 rounded-full text-sm font-semibold tracking-wider btn-gold transition-all duration-300 inline-block hover:scale-[1.01]"
                    >
                      Purchase Course
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
