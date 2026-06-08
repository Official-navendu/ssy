import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, BookOpen, ArrowRight, X, GraduationCap, CheckCircle2, Shield, Compass, Search, Award, BookOpenCheck, ZoomIn, Eye } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/utils/site";
import { BentoCard } from "@/components/common/BentoCard";

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
  const text = `Hello Shivani Spiritual Yatri Academy, I am interested in enrolling in the "${courseName}" certification course. Please share complete admission and schedule details.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
};

const CATEGORIES = [
  { id: "all", label: "All Curriculum" },
  { id: "certifications", label: "Certifications" },
  { id: "divination", label: "Divination & Esoteric" },
  { id: "healing", label: "Energy Healing" },
  { id: "manifestation", label: "Mind & Manifestation" }
];

const coursesData = [
  {
    id: 1,
    slug: "numerology-mastery",
    category: "divination",
    isCertification: true,
    title: "Numerology Mastery Certification",
    tagline: "Decode the Vibrational Codes of Destiny",
    shortDescription: "Master Chaldean and Pythagorean numerology to analyze name vibrations, birth dates, and coordinate lucky timelines.",
    price: 99,
    duration: "4 Weeks",
    image: courseNumerology,
    auraColor: "from-gold/15 via-sapphire/15 to-background",
    fullDescription: "Delve into the mathematical choreography of the universe. The Numerology Mastery course is a premium, beautifully structured guide that teaches you to calculate and translate life paths, destiny numbers, and energetic dates. By understanding Chaldean and Pythagorean layouts, you will align birth signatures and suggest precise name corrections to harmonize clients' professional and domestic vibrations.",
    benefits: [
      "Chaldean & Pythagorean grid systems mastery",
      "Calculate Life Path, Destiny, Soul Urge & Karmic numbers",
      "Suggest precise professional and personal name corrections",
      "Coordinate auspicious dates for business and travel launches"
    ],
    whatYouLearn: [
      "Unlock the cosmic vibration associated with numbers 1 to 9 & master numbers",
      "Trace personal year transits to time major career shifts",
      "Read and harmonize structural compatibility matrices"
    ],
    highlights: [
      "Lifetime curriculum material access",
      "Step-by-step Chaldean computation worksheets",
      "Official Academy Practitioner Certification"
    ],
    whoItIsFor: "Aspiring numerologists, tarot readers, spiritual counselors, and anyone seeking to utilize numbers for strategic timing.",
    modules: [
      { num: "01", name: "Cosmic Fundamentals of Chaldean Esoterics" },
      { num: "02", name: "Calculating Destiny Maps & Core Pillars" },
      { num: "03", name: "Pythagorean Grids, Karmic Debts & Master Numbers" },
      { num: "04", name: "Practical Name Corrections & Professional Consultations" }
    ],
    toolsLearned: "Chaldean Grids, Planetary Number Charts, Destiny Worksheets, Name Alignment Calculators",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 2,
    slug: "nlp-transformation",
    category: "manifestation",
    isCertification: true,
    title: "NLP Practitioner Transformation",
    tagline: "Reprogram the Subconscious Mind for Success",
    shortDescription: "Integrate Neuro-Linguistic Programming techniques with spiritual coaching to dissolve scarcity habits and align goals.",
    price: 149,
    duration: "6 Weeks",
    image: courseManifestation,
    auraColor: "from-accent/20 via-gold/10 to-background",
    fullDescription: "Bridge behavioral science and high-frequency manifestation. This Neuro-Linguistic Programming (NLP) certification course empowers you to identify and rewrite subconscious scripts, dissolve deep scarcity patterns, and establish positive neurological anchors. By integrating classic clinical NLP systems with spiritual coaching, you will master the art of emotional resilience and goal alignment.",
    benefits: [
      "Reprogram persistent scarcity blocks & limiting loops",
      "Establish active positive neurological anchors",
      "Master high-end sensory acuity and pacing methods",
      "Official NLP Spiritual Practitioner Certification"
    ],
    whatYouLearn: [
      "Map and overwrite negative subconscious representations",
      "Utilize Milton and Meta-model linguistics to shift Client mindsets",
      "Construct robust goals aligned with true high-frequency transits"
    ],
    highlights: [
      "Interactive neuro-conditioning worksheets",
      "Live NLP consultation practice cycles",
      "Premium graduation ceremony and certificate"
    ],
    whoItIsFor: "Life coaches, therapists, healers, spiritual mentors, and individuals seeking ultimate control over their neurological habits.",
    modules: [
      { num: "01", name: "Neurology & Subconscious Scripts Demystified" },
      { num: "02", name: "Linguistic Anchors & Scarcity Loop Overwriting" },
      { num: "03", name: "Advanced Sensory Acuity & Reframing Formulations" },
      { num: "04", name: "Clinical spiritual coaching Integration & Assessment" }
    ],
    toolsLearned: "Subconscious Anchors, Linguistic Maps, Goal Alignment Dashboards, Sensory Worksheets",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 3,
    slug: "reiki-healing-certification",
    category: "healing",
    isCertification: true,
    title: "Usui Reiki Grand Master Certification",
    tagline: "Channel the Universal Life Force Energy",
    shortDescription: "Complete Usui Reiki levels (1, 2 & Master) to clear blockages, balance chakras, and practice professionally.",
    price: 199,
    duration: "8 Weeks",
    image: courseChakra,
    auraColor: "from-sapphire/20 via-emerald/10 to-gold/5",
    fullDescription: "Master Usui Reiki, a traditional Japanese method of channeling universal life-force energy. This detailed Grand Master certification path covers Level 1 (self-healing), Level 2 (distance healing & symbols), and the Master Level. Led by Shivani, you will learn to dissolve auric toxins, balance the seven primary chakras, and set up a professional spiritual healing clinic.",
    benefits: [
      "Full Usui Reiki Master attunement",
      "Master the three primary sacred symbols",
      "Learn distant energy transmission methods",
      "Official Reiki Grand Master Certification"
    ],
    whatYouLearn: [
      "Feel and scan the human auric field for leaks",
      "Apply specific symbols to clear blockages",
      "Construct protective shields and clean client cords"
    ],
    highlights: [
      "Guided video energy attunement circles",
      "Digital Usui symbols manuals",
      "Access to global Reiki healer forums"
    ],
    whoItIsFor: "Energy healers, massage therapists, yoga teachers, and anyone committed to personal and professional energy restoration.",
    modules: [
      { num: "01", name: "Vibrations & Self-Healing: Reiki Level 1" },
      { num: "02", name: "Sacred Symbols & Distance Healing: Level 2" },
      { num: "03", name: "Chakra Balance & Auric Clearing Protocols" },
      { num: "04", name: "Master Attunement, Attuning Others & Professionalism" }
    ],
    toolsLearned: "Usui Reiki Symbols, Auric Scanning Protocols, Cord-Cutting Tools, Chakra Balance Manuals",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 4,
    slug: "pranic-healing-certification",
    category: "healing",
    isCertification: true,
    title: "Pranic Energy Healing Certification",
    tagline: "Purify the Subtle Etheric Body",
    shortDescription: "Learn to clean, energize, and manage the subtle body without physical contact using raw pranic methods.",
    price: 149,
    duration: "6 Weeks",
    image: courseChakra,
    auraColor: "from-emerald/20 via-sapphire/15 to-gold/10",
    fullDescription: "Master non-contact energy medicine. Pranic Healing is an ancient, highly systematic science that utilizes life force (Prana) to accelerate the body's natural capacity to heal. Through this certification, you will learn to scan the energy field, cleanse diseased or congested etheric energy, and project fresh Prana to restore overall vitality.",
    benefits: [
      "Non-contact energetic scanning and cleaning systems",
      "Clean emotional congestions from the vital organs",
      "Project specific color Pranas for rapid healing",
      "Official Pranic Healing Practitioner Certification"
    ],
    whatYouLearn: [
      "Decongest diseased auric fields safely",
      "Balance major and minor energy vortexes",
      "Perform secure personal energy decontamination rituals"
    ],
    highlights: [
      "Printable chakra projection charts",
      "Step-by-step scanning training files",
      "Interactive distant scanning laboratories"
    ],
    whoItIsFor: "Healers, doctors, wellness coaches, and spiritual seekers looking to learn a practical, structured energy cleansing protocol.",
    modules: [
      { num: "01", name: "Subtle Anatomy & Pranic Scanning Fundamentals" },
      { num: "02", name: "Cleansing (Sweeping) & Projecting Prana" },
      { num: "03", name: "Chakra Decongestion & Vitality Projection" },
      { num: "04", name: "Energetic Protection & Self-Decontamination" }
    ],
    toolsLearned: "Chakra Scanning Boards, Sweeping Guides, Color Prana Projectors, Auric Shield Manuals",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 5,
    slug: "akashic-records-reading",
    category: "divination",
    isCertification: true,
    title: "Akashic Records Reading Certification",
    tagline: "Access the Library of Your Soul's History",
    shortDescription: "Learn to access the Akasha to retrieve past life alignments, ancestral agreements, and future timelines.",
    price: 199,
    duration: "6 Weeks",
    image: courseAstrology,
    auraColor: "from-sapphire/20 via-emerald/15 to-gold/10",
    fullDescription: "Cross the celestial threshold to the Akashic Field — the cosmic library holding the vibration of every soul's history, choices, and agreements. Under Shivani's expert guidance, you will master the sacred prayers and invocation protocols to access the Akasha safely, retrieve past life alignments, and rewrite old energetic contracts.",
    benefits: [
      "Attain sacred invocation prayers to enter the Akasha",
      "Retrieve detailed past life maps and soul patterns",
      "Dissolve ancestral contracts and energetic chains",
      "Official Akashic Records Reader Certification"
    ],
    whatYouLearn: [
      "Formulate high-frequency inquiries to receive clear records answers",
      "Navigate spiritual guides, masters, and ancestors councils safely",
      "Conduct professional soul path readings for active clients"
    ],
    highlights: [
      "Sacred invocation prayer scripts",
      "Interactive past-life recall audio sessions",
      "Official Practitioner Certification"
    ],
    whoItIsFor: "Esoteric researchers, advanced tarot readers, counselors, and spiritual seekers looking to resolve chronic karmic loops.",
    modules: [
      { num: "01", name: "Understanding the Akasha & Invocation Rituals" },
      { num: "02", name: "Accessing Personal Records & Past Life Mapping" },
      { num: "03", name: "Clearing Ancestral Contracts & Karmic Vows" },
      { num: "04", name: "Consulting Akashic Records for Clients Safely" }
    ],
    toolsLearned: "Invocation Prayers, Sacred Questions Guide, Karmic Release Contracts, Ancestral Maps",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 6,
    slug: "twin-flame-soul-healing",
    category: "healing",
    isCertification: false,
    title: "Twin Flame & Soul Healing Alchemy",
    tagline: "Harmonize Sacred Union Dynamics",
    shortDescription: "Navigate the complex energies of Twin Flames and Soulmates, clear relationship blocks, and align unions.",
    price: 149,
    duration: "4 Weeks",
    image: courseLove,
    auraColor: "from-rose-500/15 via-gold/10 to-background",
    fullDescription: "Navigate the profound and often turbulent path of high-frequency spiritual relationships. This course clarifies the distinction between Twin Flames, Soulmates, and Karmic relationships. You will learn to identify core union obstacles, clear repetitive energetic triggers, and align your energy fields to manifest a balanced, peaceful sacred union.",
    benefits: [
      "Differentiate Twin Flames, Soulmates & Karmic attachments",
      "Clear relationship trigger loops & codependency energy",
      "Construct a balanced union alignment roadmap",
      "Release old cords and blockages from ancestral lines"
    ],
    whatYouLearn: [
      "Understand the runner-chaser energetic polarity",
      "Construct emotional boundaries without blocking love",
      "Perform sacred chakra union alignments"
    ],
    highlights: [
      "Guided twin flame union meditations",
      "Codependency release audio tracks",
      "Private seeker circle support"
    ],
    whoItIsFor: "Individuals navigating high-intensity relationship paths, healers assisting clients in crisis, and seekers looking to attract their true match.",
    modules: [
      { num: "01", name: "Twin Flame, Soulmate & Karmic Classifications" },
      { num: "02", name: "runner-Chaser Energies & Subconscious Triggers" },
      { num: "03", name: "Clearing Relationship Cords & Ancestral Contracts" },
      { num: "04", name: "Chakra Balance for Divine Partnership & Union" }
    ],
    toolsLearned: "Polarity Maps, Cord-Cutting Tools, Union Chakra Guides, Subconscious Release Meditations",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 7,
    slug: "angel-healing-certification",
    category: "healing",
    isCertification: true,
    title: "Angel Healing Certification",
    tagline: "Channel the High-Vibrational Angelic Rays",
    shortDescription: "Connect with Archangels, decode angelic numbers, and channel healing light to clear client spaces.",
    price: 99,
    duration: "4 Weeks",
    image: courseProtection,
    auraColor: "from-gold/15 via-sapphire/15 to-background",
    fullDescription: "Connect with the high-vibrational, compassionate frequencies of the Angelic Realms. This premium certification course provides detailed initiations to communicate with Archangels (Michael, Raphael, Gabriel, and Uriel), decode angel numbers, perform deep angelic cord-cutting, and channel angelic rays for comprehensive space clearing.",
    benefits: [
      "Full angelic frequency attunement",
      "Connect deeply with 4 primary Archangels",
      "Perform angelic card spreads and space cleanings",
      "Official Angel Healing Practitioner Certification"
    ],
    whatYouLearn: [
      "Sense angelic presence and interpret messages accurately",
      "Construct angelic protection shields around clients",
      "Clear atmospheric entities using angelic rays"
    ],
    highlights: [
      "Archangel invocation ritual guides",
      "Distant space clearing worksheet bundles",
      "Angelic protection meditation audio files"
    ],
    whoItIsFor: "Aura healers, highly sensitive children/adults, lightworkers, and seekers wanting deep spiritual protection and celestial guides.",
    modules: [
      { num: "01", name: "Hierarchy of Angels & Archangel Invocations" },
      { num: "02", name: "Angelic Cord Cutting & Healing Protocols" },
      { num: "03", name: "Decoding Angelic Symbols & Oracle Reading" },
      { num: "04", name: "Constructing Planetary Protective Shields & Attunement" }
    ],
    toolsLearned: "Angelic Invocations, Oracle Spread Charts, Cord-Cutting Prayers, Protective Shield Worksheets",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 8,
    slug: "psychic-development-mediumship",
    category: "divination",
    isCertification: true,
    title: "Psychic Development & Mediumship",
    tagline: "Awaken the Inner Spiritual Eye",
    shortDescription: "Awaken your clairs (clairvoyance, clairaudience, etc.), communicate with spirit guides, and read professional energy.",
    price: 199,
    duration: "6 Weeks",
    image: courseTarot,
    auraColor: "from-sapphire/20 to-[#151B26]",
    fullDescription: "Everyone possesses latent psychic abilities. This professional-grade course is designed to awaken your inner spiritual eye, training you in the four primary clairs (Clairvoyance, Clairaudience, Clairsentience, and Claircognizance). Learn to establish safe contact with your personal Spirit Guides, read energetic fields, and practice mediumship safely.",
    benefits: [
      "Awaken and strengthen the 4 primary psychic senses",
      "Safe spirit guide contact protocols",
      "Psychometry (reading object energy) training",
      "Official Psychic Practitioner Certification"
    ],
    whatYouLearn: [
      "Distinguish your imagination from true psychic reception",
      "Construct robust energetic shields before readings",
      "Connect clients safely with departed loved ones"
    ],
    highlights: [
      "Third-eye awakening exercises",
      "Psychometry worksheets and journals",
      "Live mediumship validation circles"
    ],
    whoItIsFor: "Advanced tarot readers, energy practitioners, highly intuitive seekers, and anyone looking to trust their internal eye.",
    modules: [
      { num: "01", name: "The 4 Clairs & Third-Eye Activation Methods" },
      { num: "02", name: "Spirit Guides: Invocations & Safe Communications" },
      { num: "03", name: "Reading Auras, Photos & Objects (Psychometry)" },
      { num: "04", name: "Mediumship: Connecting and Closing Ports Safely" }
    ],
    toolsLearned: "Third-Eye Activators, Guide Journals, Psychometry Templates, Closing Portal Rituals",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 9,
    slug: "tarot-card-reading-certification",
    category: "divination",
    isCertification: true,
    title: "Tarot Card Reading Certification",
    tagline: "Step-by-Step Rider-Waite Mastery",
    shortDescription: "Decode Rider-Waite cards, master 10 advanced layouts, and set up a successful tarot consultation business.",
    price: 149,
    duration: "6 Weeks",
    image: courseTarot,
    auraColor: "from-sapphire/20 via-emerald/10 to-gold/5",
    fullDescription: "Become a professional, certified Tarot Reader. Under the expert guidance of Shivani, this curriculum takes you on a comprehensive journey through all 78 Major and Minor Arcana cards of the Rider-Waite deck. Learn to read through direct cosmic channeling, construct intuitive spreads, and establish a high-end consultation practice.",
    benefits: [
      "In-depth guide to all 78 Major & Minor cards",
      "Master 10 advanced layouts including Celtic Cross",
      "Set up a successful tarot practice and acquire clients",
      "Official Academy Tarot Practitioner Certificate"
    ],
    whatYouLearn: [
      "Interpret symbols, numbers, and color patterns on cards",
      "Formulate clear, precise layout answers",
      "Cleanse, charge, and store tarot decks safely"
    ],
    highlights: [
      "Lifetime video curriculum access",
      "Tarot layouts worksheets and printable files",
      "Interactive practice reading modules"
    ],
    whoItIsFor: "Beginners looking to learn from scratch, or intermediate readers wanting to master client consultation systems.",
    modules: [
      { num: "01", name: "Major Arcana: The Soul's Journey & Archetypes" },
      { num: "02", name: "Minor Arcana: Suit Vibrations & Number Meanings" },
      { num: "03", name: "Advanced Spreads & Intuitive Mapping Systems" },
      { num: "04", name: "Ethical Client Consultations & Business Systems" }
    ],
    toolsLearned: "78 Cards Interpretations, Celtic Cross Spreads, Deck Cleansing Protocols, Client Templates",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 10,
    slug: "manifestation-mastery",
    category: "manifestation",
    isCertification: true,
    title: "Manifestation Mastery Certification",
    tagline: "Command Your Reality with Intentional Alchemy",
    shortDescription: "Master the Laws of Vibration, Attraction, and Action, utilize scriptwriting, and clear ancestral blocks.",
    price: 99,
    duration: "4 Weeks",
    image: courseManifestation,
    auraColor: "from-gold/20 via-sapphire/15 to-background",
    fullDescription: "Manifestation is an exact energetic science. This course demystifies the Laws of Attraction, Vibration, and Assumption. You will master specific techniques such as scripting, creative visualization, and energetic cord-clearing to align your everyday vibrations with your highest goals, dissolving repetitive blocks forever.",
    benefits: [
      "Master the Laws of Attraction, Vibration & Assumption",
      "Advanced scripting and journaling frameworks",
      "Clear ancestral blockages to financial abundance",
      "Official Manifestation Master Certification"
    ],
    whatYouLearn: [
      "Shift your baseline vibration from scarcity to abundance",
      "Establish deep subconscious anchors to attract success",
      "Dissolve toxic visual programming and mental blocks"
    ],
    highlights: [
      "High-frequency scripting worksheets",
      "Subconscious realignment audio sessions",
      "Abundance check alignment guides"
    ],
    whoItIsFor: "Seekers, coaches, entrepreneurs, and anyone looking to attract abundance and unlock their highest potential.",
    modules: [
      { num: "01", name: "The Law of Vibration & Baseline Shifts" },
      { num: "02", name: "Subconscious realignments & Limiting Loops Clearings" },
      { num: "03", name: "Scripting, Visualizations & High-Frequency Habits" },
      { num: "04", name: "Ancestral Blockages & Abundance Portals Mapping" }
    ],
    toolsLearned: "Scripting Templates, Subconscious realigners, Abundance Journals, Baselines Alignment Tools",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 11,
    slug: "relationship-healing-certification",
    category: "certifications",
    isCertification: true,
    title: "Relationship Healing Certification",
    tagline: "Harmonize Family and Partner Dynamics",
    shortDescription: "Become a certified relationship counselor. Learn synastry metrics, cord-cutting, and dispute resolution.",
    price: 149,
    duration: "6 Weeks",
    image: courseLove,
    auraColor: "from-rose-500/15 via-gold/10 to-background",
    fullDescription: "Train as a certified Relationship Counselor. Learn to analyze synastry compatibility metrics, Vedic planetary indicators of marriage, dispute patterns, and release ancestral relationship blockages. Secure professional systems to guide clients out of toxic loops and into compassionate connections.",
    benefits: [
      "Master relationship synastry compatibility metrics",
      "Distant cord-cutting and auric purification techniques",
      "Counseling methodologies for partners and families",
      "Official Relationship Healer Certification"
    ],
    whatYouLearn: [
      "Map partner compatibility indicators accurately",
      "Apply specific counseling protocols to defuse disputes",
      "Resolve ancestral relationship patterns and energy loops"
    ],
    highlights: [
      "Synastry calculation manual sheets",
      "Practical counseling case study guides",
      "Graduation certification badge"
    ],
    whoItIsFor: "Aspiring counselors, active energy healers, spiritual mentors, and individuals committed to ancestral family reconciliation.",
    modules: [
      { num: "01", name: "Relationship Esoterics & Astro Synastry Mapping" },
      { num: "02", name: "Dispute Defusing Protocols & Cord Cuttings" },
      { num: "03", name: "Family and Ancestral Wounds Healing Systems" },
      { num: "04", name: "Client Counseling Integration & Certification" }
    ],
    toolsLearned: "Synastry Manuals, Cord-Cutting Prayers, Dispute Guidelines, Counseling Frameworks",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 12,
    slug: "hooponopono-healing",
    category: "healing",
    isCertification: false,
    title: "Ho'oponopono Healing Mastery",
    tagline: "The Ancient Hawaiian Science of Reconciliation",
    shortDescription: "Master Ho'oponopono to cleanse memories, dissolve karmic blocks, and restore pure inner alignment.",
    price: 99,
    duration: "4 Weeks",
    image: courseProtection,
    auraColor: "from-sapphire/20 via-emerald/15 to-gold/10",
    fullDescription: "Discover the deep alchemical power of Ho’oponopono — the traditional Hawaiian art of reconciliation and forgiveness. Under the guidance of Shivani, this course teaches you to take absolute responsibility for your energy space, cleansing the subconscious of ancient, painful memories and blocks to achieve alignment.",
    benefits: [
      "Dissolve persistent guilt, stress, and anxiety",
      "Cleanse ancient subconscious blocks and patterns",
      "Restore total inner harmony and emotional balance",
      "Learn the esoteric meaning of the 4 core mantras"
    ],
    whatYouLearn: [
      "Apply Ho’oponopono to clear career and relationship blocks",
      "Clear toxic environmental residue from your aura",
      "Establish deep, unconditional self-compassion"
    ],
    highlights: [
      "Guided Ho’oponopono meditation files",
      "Subconscious cleaning practice worksheets",
      "Weekly community healing circles"
    ],
    whoItIsFor: "Seekers, healers, therapists, and anyone suffering from deep-seated guilt, chronic stress, or repetitive emotional blockages.",
    modules: [
      { num: "01", name: "History, Philosophy & 100% Responsibility Laws" },
      { num: "02", name: "The 4 Pillars Mantra & Subconscious Realignment" },
      { num: "03", name: "Clearing Relationship & Financial Karmic Blocks" },
      { num: "04", name: "Integrating Ho'oponopono in Healer Consultations" }
    ],
    toolsLearned: "Forgiveness Mantras, Subconscious Journals, Energetic Cleaning Charts, Integration Systems",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 13,
    slug: "switchwords-angel-numbers",
    category: "manifestation",
    isCertification: false,
    title: "Switchwords & Angel Numbers Mastery",
    tagline: "Vocal and Numeric Reality Alterations",
    shortDescription: "Learn to utilize vocal switchwords, sacred codes (Grabovoi), and angel numbers to shift circumstances.",
    price: 99,
    duration: "4 Weeks",
    image: courseNumerology,
    auraColor: "from-gold/15 via-sapphire/15 to-background",
    fullDescription: "Unlock the instant verbal and numeric keys to reality adjustments. This unique curriculum demystifies Switchwords (direct verbal prompts that trigger the subconscious) and Angel Numbers (numeric indicators of guidance). Master the art of scripting custom switch-phrases and activating Grabovoi numbers to balance finances, health, and partnerships.",
    benefits: [
      "Master the science of verbal Switchwords",
      "Activate sacred Grabovoi numbers and codes safely",
      "Design customized switch-phrases for relationships",
      "Construct protective numeric grids for home space"
    ],
    whatYouLearn: [
      "Understand how specific frequencies trigger subconscious shifts",
      "Apply Switchwords to clear financial and health blocks",
      "Program water and crystals with numeric codes"
    ],
    highlights: [
      "Comprehensive Switchwords dictionary manuals",
      "Printable sacred codes reference templates",
      "Active group vibration sharing boards"
    ],
    whoItIsFor: "Busy professionals, energy healers, beginners, and seekers looking for rapid, everyday manifestation indicators.",
    modules: [
      { num: "01", name: "subconscious triggers & Switchwords Basics" },
      { num: "02", name: "Mastering Grabovoi Codes & Numeric Frequencies" },
      { num: "03", name: "Designing Custom Switch-Phrases for Clients" },
      { num: "04", name: "Grids Activation & Crystal Coding Worksheets" }
    ],
    toolsLearned: "Switchword Dictionaries, Grabovoi Lists, Water Programming Kits, Numeric Grids",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 14,
    slug: "meditation-energy-awareness",
    category: "healing",
    isCertification: false,
    title: "Meditation & Energy Awareness",
    tagline: "Anchor in Pure Divine Consciousness",
    shortDescription: "Master 12 ancient Vedic and Zen meditation methods, trace subtle energy, and protect your aura.",
    price: 99,
    duration: "4 Weeks",
    image: courseChakra,
    auraColor: "from-sapphire/20 via-emerald/15 to-gold/10",
    fullDescription: "Find your quiet center. This course is an experiential guide to mastering 12 classical Vedic and Zen meditation techniques. Under the guidance of Shivani, you will learn to trace energy pathways (Prana), practice breathing controls (Pranayama), protect your auric field, and anchor in pure, quiet divine consciousness.",
    benefits: [
      "Master 12 authentic meditation methods",
      "Advanced breathing controls (Pranayama) training",
      "Safely trace Prana pathways inside the body",
      "Shield your aura from emotional environment drains"
    ],
    whatYouLearn: [
      "Settle cognitive chatter and quiet the mind",
      "Identify active energy leaks inside your subtle layers",
      "Conduct guided meditation classes for seekers"
    ],
    highlights: [
      "12 Guided meditation audio templates",
      "Daily breathing controls journals",
      "Interactive energetic scanning grids"
    ],
    whoItIsFor: "Stressed professionals, yoga students, healers, and seekers looking to build a stable, lifelong quiet meditation practice.",
    modules: [
      { num: "01", name: "Vedic Pranayama: Breathing Controls & Energy Paths" },
      { num: "02", name: "Zen Mindfulness & Subconscious Chatter Stillness" },
      { num: "03", name: "Third-Eye & Crown Chakra Expansion Methods" },
      { num: "04", name: "Aura Shielding & Cosmic Grounding Meditations" }
    ],
    toolsLearned: "Meditation Audio files, Breathing Journals, Energy Scanners, Grounding Guides",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 15,
    slug: "life-coaching-certification",
    category: "certifications",
    isCertification: true,
    title: "Life Coaching & Mentorship Certification",
    tagline: "Integrate Science with Esoteric Wisdom",
    shortDescription: "Train as a professional mentor. Master assessment systems, consultation frameworks, and client acquisition.",
    price: 199,
    duration: "8 Weeks",
    image: courseKundli,
    auraColor: "from-gold/15 via-sapphire/15 to-background",
    fullDescription: "Become an accredited Life Coach equipped with spiritual insights. This intensive certification combines classic psychological assessment models, active listening methods, and goal-setting systems with Vedic esoteric wisdom. Master client consultation frameworks, discover how to guide seekers out of crisis, and build a successful coaching business.",
    benefits: [
      "Master professional coaching and assessment frameworks",
      "Acquire active client consultation systems",
      "Integrate Vedic chart indicators with clinical goals",
      "Official Life Coach & Mentor Academy Certification"
    ],
    whatYouLearn: [
      "Conduct professional intake and consultation sessions",
      "Design actionable growth blueprints for clients",
      "Market and build a profitable mentoring practice"
    ],
    highlights: [
      "Client intake assessment worksheets",
      "Live coaching practice reviews",
      "Graduation coaching certificate"
    ],
    whoItIsFor: "Aspiring counselors, leaders, healers, business mentors, and individuals committed to global transformational support.",
    modules: [
      { num: "01", name: "Coaching Fundamentals & Active Listening Models" },
      { num: "02", name: "Client intake, Assessments & esoterics Alignment" },
      { num: "03", name: "Actionable Blueprints, Habits & Goals Setting" },
      { num: "04", name: "Marketing, Business Systems & Attesting Graduation" }
    ],
    toolsLearned: "Intake Forms, Assessment Sheets, Blueprint Dashboards, Business Guidelines",
    mentor: "Shivani Spiritual Yatri Academy"
  },
  {
    id: 16,
    slug: "crystal-healing-certification",
    category: "healing",
    isCertification: true,
    title: "Crystal Healing & Grid Certification",
    tagline: "Harness the Mineral Kingdom's Frequencies",
    shortDescription: "Learn to clean, program, and arrange crystals. Design highly specialized layout grids for homes and offices.",
    price: 149,
    duration: "6 Weeks",
    image: courseAstrology,
    auraColor: "from-sapphire/20 via-emerald/15 to-gold/10",
    fullDescription: "Unlock the vibrational frequencies of the mineral kingdom. In this hands-on certification course, you will learn to select, clean, charge, and program crystals (such as quartz, amethyst, and tourmaline). Master the art of designing sacred crystal layout grids to balance health, attract wealth, and shield spaces.",
    benefits: [
      "Learn to scan and feel crystal energetic pulses",
      "Cleanse, program, and charge crystals safely",
      "Design specialized layout grids for homes & offices",
      "Official Crystal Healer Academy Certification"
    ],
    whatYouLearn: [
      "Differentiate crystal chemical structures & metaphysical vibrations",
      "Apply crystals to align clients' primary chakras",
      "Construct robust protective shields using tourmaline grids"
    ],
    highlights: [
      "Crystal properties dictionary templates",
      "Printable grid layout blueprints",
      "Attunement and charging manuals"
    ],
    whoItIsFor: "Massage therapists, home designers, energy practitioners, and crystal collectors looking to use minerals systematically.",
    modules: [
      { num: "01", name: "Introduction to Mineral vibrations & Cleanings" },
      { num: "02", name: "Programming and Charging Crystal Systems" },
      { num: "03", name: "Chakra Crystal Layouts & Client Clearings" },
      { num: "04", name: "Sacred Grid Designs for Spaces & Attunement" }
    ],
    toolsLearned: "Crystal Dictionaries, Grid Templates, Charging Manuals, Shielding Grids",
    mentor: "Shivani Spiritual Yatri Academy"
  }
];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCourse, setActiveCourse] = useState(null);
  const [certName, setCertName] = useState("Jane Doe");
  const [zoomCert, setZoomCert] = useState(false);

  // Esc key closure for detailed modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveCourse(null);
        setZoomCert(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when modal is active
  useEffect(() => {
    if (activeCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCourse]);

  // Filter courses based on search query and category
  const filteredCourses = coursesData.filter((c) => {
    const matchesCategory = selectedCategory === "all" || c.category === selectedCategory || (selectedCategory === "certifications" && c.isCertification);
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Academy Premium Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 border-b border-gold/10 bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={50} />
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
            <GraduationCap className="h-3.5 w-3.5 animate-pulse text-gold" /> Shivani Spiritual Yatri Academy
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium uppercase"
          >
            Sacred Certifications & <span className="text-gradient-cosmic">Cosmic Learning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide font-light"
          >
            Unlock ancient Vedic lineage, Reiki channel alignments, and professional life coaching skills under Usui Grand Master initiations. Claim certified mastery inside our world-class spiritual institute.
          </motion.p>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="py-8 relative bg-background/40 border-b border-gold/10">
        <div className="mx-auto max-w-6xl px-6 md:px-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-gold text-background shadow-[0_0_15px_rgba(216,182,122,0.4)]"
                    : "border border-gold/20 hover:border-gold/55 text-foreground hover:bg-gold/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search curriculum..."
              className="w-full rounded-full border border-gold/20 bg-white/5 pl-10 pr-4 py-2 text-xs placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none tracking-wide"
            />
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-gold/60" />
          </div>
        </div>
      </section>

      {/* Courses 4x4 Luxury Grid */}
      <section className="py-20 relative bg-background/25">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            >
              {filteredCourses.map((course, idx) => (
                <Reveal key={course.id} delay={0.05}>
                  <motion.div
                    layout
                    className="h-full"
                  >
                    <BentoCard className={`course-card-premium group relative h-full rounded-2xl p-5 flex flex-col justify-between ${
                      idx % 3 === 0 ? 'card-plum' : idx % 3 === 1 ? 'card-violet' : 'card-glass'
                    }`}>
                      {/* Inner glowing aura */}
                      <div className={`absolute -inset-2 bg-gradient-to-tr ${course.auraColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10`} />

                      <div>
                        {/* Image container with custom scale */}
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-gold/20 shadow-[0_10px_20px_rgba(0,0,0,0.5)] bg-background/30 mb-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-108"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          
                          {/* Certification Label */}
                          {course.isCertification && (
                            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 rounded-full border border-gold/40 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-gold shadow-[0_0_10px_rgba(216,182,122,0.25)] animate-pulse">
                              <Award className="h-3 w-3 text-gold" /> Certified
                            </div>
                          )}
                        </div>

                        {/* Header row */}
                        <div className="flex items-center gap-3 text-[10px] text-gold uppercase tracking-widest font-semibold">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3 animate-pulse" /> {course.duration}</span>
                          <span>•</span>
                          <span>CAD ${course.price}</span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-3 font-display text-lg md:text-xl text-foreground group-hover:text-gold transition-colors duration-300 uppercase tracking-wide leading-snug">
                          {course.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="mt-1 text-xs italic text-gold/75 font-medium tracking-wide">
                          {course.tagline}
                        </p>

                        {/* Description */}
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80 font-light tracking-wide line-clamp-3">
                          {course.shortDescription}
                        </p>
                      </div>

                      {/* Footer Buttons */}
                      <div className="mt-6 pt-4 border-t border-gold/10 flex flex-wrap gap-2 justify-between">
                        <button
                          onClick={() => setActiveCourse(course)}
                          className="rounded-full border border-gold/25 bg-transparent hover:bg-gold/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground transition-all cursor-pointer"
                        >
                          View Details
                        </button>
                        <a
                          href={getWhatsAppUrl(course.title)}
                          target="_blank"
                          rel="noreferrer"
                          className="group rounded-full btn-gold px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(216,182,122,0.1)] hover:shadow-[0_0_20px_rgba(216,182,122,0.3)] transition-all"
                        >
                          Enroll Now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </BentoCard>
                  </motion.div>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <Compass className="mx-auto h-12 w-12 text-gold/30 animate-spin-slow" />
              <h3 className="mt-4 font-display text-xl text-gold/80 uppercase tracking-wider">No curriculum matches your query</h3>
              <p className="mt-2 text-xs text-muted-foreground/75 font-light">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </div>
      </section>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {activeCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCourse(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Box */}
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

              {/* Close button */}
              <button
                onClick={() => setActiveCourse(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full border border-gold/25 bg-background/50 hover:bg-gold/15 hover:border-gold/50 text-foreground transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="relative">
                {/* Header row */}
                <div className="flex flex-wrap gap-2.5 items-center pr-12 md:pr-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold w-fit">
                    <Clock className="h-3.5 w-3.5 text-gold" /> {activeCourse.duration} Program
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold w-fit">
                    CAD ${activeCourse.price} Tuition
                  </div>
                  {activeCourse.isCertification && (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold w-fit shadow-[0_0_10px_rgba(216,182,122,0.15)] animate-pulse">
                      <GraduationCap className="h-3.5 w-3.5 text-gold" /> Certified Curriculum
                    </div>
                  )}
                </div>

                <h2 className="mt-4 font-display text-2xl md:text-3.5xl text-gradient-gold uppercase tracking-wide leading-snug">
                  {activeCourse.title}
                </h2>

                <p className="mt-2 text-xs md:text-sm italic font-medium text-gold/80 tracking-wide">
                  {activeCourse.tagline}
                </p>

                {/* Course Overview */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Course Overview</h3>
                  <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground/90 font-light tracking-wide">
                    {activeCourse.fullDescription}
                  </p>
                </div>

                {/* Additional Images Gallery Grid */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Academy Learning Environment</h3>
                  <div className="mt-3 grid gap-3 grid-cols-3">
                    {[courseChakra, courseManifestation, courseTarot, courseAstrology, courseLove, courseNumerology, courseProtection, courseKundli]
                      .filter(img => img !== activeCourse.image)
                      .slice(0, 3)
                      .map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gold/10 group/gal shadow-md">
                          <img src={img} alt="Spiritual class environment preview" className="w-full h-full object-cover transition-transform duration-500 group-hover/gal:scale-105" />
                          <div className="absolute inset-0 bg-black/25 group-hover/gal:bg-transparent transition-colors duration-300" />
                        </div>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Curriculum Syllabus Modules</h3>
                  <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
                    {activeCourse.modules.map((m, idx) => (
                      <div key={idx} className="flex gap-3 items-center p-3 rounded-xl border border-gold/10 bg-black/30 hover:border-gold/25 transition-all duration-300">
                        <div className="h-8 w-8 rounded-full border border-gold/30 flex items-center justify-center font-display text-xs text-gold font-bold shadow-[0_0_8px_rgba(216,182,122,0.15)] shrink-0">
                          {m.num}
                        </div>
                        <span className="text-[11px] md:text-xs text-foreground/90 font-light tracking-wide leading-tight">{m.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What you learn list */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Key Competencies & Outcomes</h3>
                  <div className="mt-3 space-y-2.5">
                    {activeCourse.whatYouLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 font-light tracking-wide">
                        <CheckCircle2 className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5 animate-pulse" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits / Experience */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Attainment & Certification Benefits</h3>
                  <div className="mt-3 space-y-2.5">
                    {activeCourse.benefits.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 font-light tracking-wide">
                        <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Certificate Section with interactive name editor */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-semibold border-b border-gold/10 pb-2">Sample Certification Preview</h3>
                  
                  {/* Student Name Editor */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
                    <label className="text-xs text-muted-foreground/80 shrink-0 font-medium">Type your name to preview custom certificate:</label>
                    <input
                      type="text"
                      value={certName}
                      onChange={(e) => setCertName(e.target.value)}
                      placeholder="Enter student name..."
                      className="w-full sm:w-56 rounded-lg border border-gold/25 bg-white/5 px-3 py-1.5 text-xs text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 tracking-wider"
                    />
                  </div>

                  {/* Certificate Main Preview Block */}
                  <div 
                    onClick={() => setZoomCert(true)}
                    className="mt-4 relative overflow-hidden rounded-2xl border-2 border-double border-gold/35 bg-black/60 p-6 md:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.55)] cursor-zoom-in group/cert transition-all hover:border-gold/60"
                  >
                    {/* Glowing golden watermark background seal */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none scale-125 select-none">
                      <Compass className="w-80 h-80 text-gold" />
                    </div>

                    <div className="relative z-10 border border-gold/15 p-4 rounded-xl flex flex-col items-center text-center">
                      {/* Double corners */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold/45" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold/45" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold/45" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold/45" />

                      <div className="text-[9px] uppercase tracking-[0.35em] text-gold font-bold">Shivani Spiritual Yatri Academy</div>
                      <h4 className="mt-3 font-display text-lg md:text-xl text-gradient-gold uppercase tracking-[0.15em] font-semibold border-b border-gold/15 pb-1 px-8">Certificate of Attainment</h4>
                      <p className="mt-3 text-[8px] uppercase tracking-widest text-muted-foreground/80 font-light">This certified credential is proudly conferred to</p>
                      
                      {/* Custom Cursive Name Display */}
                      <div className="mt-3 font-display italic text-gradient-gold text-xl md:text-2xl tracking-wider font-semibold capitalize max-w-xs truncate px-4">
                        {certName || "Jane Doe"}
                      </div>
                      
                      <p className="mt-3 text-[7px] md:text-[8px] uppercase tracking-widest text-muted-foreground/80 font-light max-w-sm">
                        having successfully finalized and satisfied all rigorous academic modules, attunements, and practitioner assessments in the specialized study of
                      </p>
                      
                      {/* Course Title */}
                      <div className="mt-2 text-xs md:text-sm font-bold uppercase text-foreground tracking-widest max-w-md">
                        {activeCourse.title}
                      </div>

                      {/* Footer signatures & Seal */}
                      <div className="mt-6 w-full flex justify-between items-end px-4">
                        <div className="flex flex-col items-start text-left">
                          <span className="font-display italic text-[11px] md:text-xs text-gold/90 font-medium">Shivani Spiritual Yatri</span>
                          <span className="mt-0.5 border-t border-gold/15 pt-1 text-[7px] uppercase tracking-wider text-muted-foreground/60">Grand Master & Guide</span>
                        </div>

                        {/* Seal element */}
                        <div className="relative h-10 w-10 flex items-center justify-center shrink-0">
                          <div className="absolute inset-0 rounded-full border border-dashed border-gold/30 animate-spin-slow" style={{ animationDuration: "20s" }} />
                          <Award className="h-6 w-6 text-gold opacity-80" />
                        </div>

                        <div className="flex flex-col items-end text-right">
                          <span className="text-[8px] text-foreground/90 font-medium">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                          <span className="mt-0.5 border-t border-gold/15 pt-1 text-[7px] uppercase tracking-wider text-muted-foreground/60">Date of Attainment</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover zoom overlays */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-bold text-gold uppercase tracking-widest">
                      <ZoomIn className="h-4 w-4" /> Click to Zoom Preview
                    </div>
                  </div>
                </div>

                {/* Technical stats grid */}
                <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 p-4 rounded-2xl border border-gold/10 bg-black/40">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Who It Is For</h4>
                    <p className="mt-1.5 text-[11px] text-muted-foreground/80 leading-relaxed font-light tracking-wide">{activeCourse.whoItIsFor}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-wider text-gold font-semibold flex items-center gap-1.5"><BookOpenCheck className="h-3.5 w-3.5" /> Key Tools Mastered</h4>
                    <p className="mt-1.5 text-[11px] text-muted-foreground/80 leading-relaxed font-light tracking-wide">{activeCourse.toolsLearned}</p>
                  </div>
                </div>

                {/* Footer Buttons inside modal */}
                <div className="mt-8 pt-6 border-t border-gold/10 flex flex-wrap gap-4 justify-end">
                  <button
                    onClick={() => setActiveCourse(null)}
                    className="rounded-full border border-gold/25 bg-transparent hover:bg-gold/10 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground cursor-pointer transition-colors"
                  >
                    Close Modal
                  </button>
                  <a
                    href={getWhatsAppUrl(activeCourse.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full btn-premium-glow px-6 py-3 text-xs font-semibold uppercase tracking-widest cursor-pointer"
                  >
                    Enroll & Attain Certification <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Zoom Certificate Overlay */}
      <AnimatePresence>
        {zoomCert && activeCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomCert(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Certificate Large Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border-4 border-double border-gold p-4 md:p-12 shadow-[0_0_80px_rgba(216,182,122,0.25)] bg-black"
            >
              {/* Double corners */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-gold" />

              {/* Close button */}
              <button
                onClick={() => setZoomCert(false)}
                className="absolute top-6 right-6 p-2.5 rounded-full border border-gold/30 bg-background/50 hover:bg-gold/20 text-foreground transition-all cursor-pointer"
                aria-label="Close zoom preview"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 border-2 border-gold/20 p-4 md:p-8 rounded-2xl flex flex-col items-center text-center">
                {/* Internal Double corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/45" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold/45" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold/45" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/45" />

                {/* Ethereal Watermark background seal */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none scale-150 select-none">
                  <Compass className="w-96 h-96 text-gold" />
                </div>

                <div className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold">Shivani Spiritual Yatri Academy</div>
                <h3 className="mt-4 font-display text-xl xs:text-2xl md:text-5xl text-gradient-gold uppercase tracking-[0.2em] font-semibold border-b-2 border-gold/25 pb-2 px-2 md:px-12">
                  Certificate of Attainment
                </h3>
                <p className="mt-5 text-[9px] xs:text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground/80 font-light">This certified credential is proudly conferred to</p>
                
                {/* Custom Cursive Name Display */}
                <div className="mt-4 font-display italic text-gradient-gold text-2xl xs:text-3xl md:text-5xl tracking-wider font-semibold capitalize max-w-lg truncate px-4 pb-2">
                  {certName || "Jane Doe"}
                </div>
                
                <p className="mt-4 text-[8px] xs:text-[9px] md:text-xs uppercase tracking-widest text-muted-foreground/80 leading-relaxed font-light max-w-lg">
                  having successfully finalized and satisfied all rigorous academic modules, attunements, and practitioner assessments in the specialized study of
                </p>
                
                {/* Course Title */}
                <div className="mt-3 text-base md:text-xl font-bold uppercase text-foreground tracking-[0.1em] max-w-xl">
                  {activeCourse.title}
                </div>

                {/* Footer signatures & Seal */}
                <div className="mt-10 w-full flex justify-between items-end px-8">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-display italic text-[14px] md:text-base text-gold/90 font-medium">Shivani Spiritual Yatri</span>
                    <span className="mt-1 border-t border-gold/25 pt-1.5 text-[8px] md:text-[9px] uppercase tracking-wider text-muted-foreground/60">Grand Master & Guide</span>
                  </div>

                  {/* Seal element */}
                  <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-spin-slow" style={{ animationDuration: "25s" }} />
                    <Award className="h-9 w-9 text-gold opacity-90" />
                  </div>

                  <div className="flex flex-col items-end text-right">
                    <span className="text-[10px] text-foreground/90 font-medium">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                    <span className="mt-1 border-t border-gold/25 pt-1.5 text-[8px] md:text-[9px] uppercase tracking-wider text-muted-foreground/60">Date of Attainment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
