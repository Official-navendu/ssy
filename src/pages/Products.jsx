import { useState, useEffect } from "react";
import { X, Sparkles, MessageSquare, ArrowRight, CheckCircle2, Search, SlidersHorizontal, ChevronLeft, ChevronRight, RotateCcw, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/utils/site";
import { BentoCard } from "@/components/common/BentoCard";

// Import existing visual assets
import productAmethyst from "@/assets/images/product_amethyst.webp";
import productRose from "@/assets/images/product_rose.webp";
import productProtection from "@/assets/images/product_protection.webp";
import blackTourmaline from "@/assets/images/black_tourmaline.webp";
import citrine from "@/assets/images/citrine.webp";
import sacredRemediesImage from "@/assets/images/sacred_remedies.png";

// Import new visual assets
import sevenChakraBracelet from "@/assets/images/seven_chakra_bracelet.png";
import hematite from "@/assets/images/hematite.png";
import evilEye from "@/assets/images/evil_eye.png";
import greenAventurine from "@/assets/images/green_aventurine.png";
import clearQuartz from "@/assets/images/clear_quartz.png";
import pyrite from "@/assets/images/pyrite.png";
import fluorite from "@/assets/images/fluorite.png";
import carnelian from "@/assets/images/carnelian.png";
import moonstone from "@/assets/images/moonstone.png";
import selenite from "@/assets/images/selenite.png";
import tigersEye from "@/assets/images/tigers_eye.png";
import redJasper from "@/assets/images/red_jasper.png";
import lapisLazuli from "@/assets/images/lapis_lazuli.png";
import sodalite from "@/assets/images/sodalite.png";
import smokyQuartz from "@/assets/images/smoky_quartz.png";
import howlite from "@/assets/images/howlite.png";
import malachite from "@/assets/images/malachite.png";
import obsidian from "@/assets/images/obsidian.png";
import blueLaceAgate from "@/assets/images/blue_lace_agate.png";
import amazonite from "@/assets/images/amazonite.png";

const PRODUCTS = [
  {
    slug: "seven-chakra-bracelet",
    name: "Seven Chakra Bracelet",
    category: "Chakra Balance",
    price: "49",
    image: sevenChakraBracelet,
    auraColor: "from-purple-500/20 via-blue-500/10 to-gold/5",
    tagline: "Complete chakra balance, energy alignment, & spiritual harmony",
    description: "This is for complete chakra balance, energy alignment, and spiritual harmony. The seven natural crystals in one bracelet work together to support all seven chakras from root to crown. It helps balance the full energy system, supports meditation, Reiki healing, and emotional harmony.",
    chakra: "All seven chakras",
    benefits: [
      "Balances the full chakra system.",
      "Supports meditation and Reiki.",
      "Encourages emotional harmony.",
      "Helps create spiritual alignment.",
      "Can be worn daily for steady energy support."
    ],
    howItWorks: "Each stone in the bracelet is connected with one chakra, and together they create a full energetic flow through the body.",
    hand: "Wear on the left hand to receive energy, or on the right hand to project healing energy outward.",
    zodiac: "All signs",
    forms: "Bracelet, tumble set, raw set"
  },
  {
    slug: "hematite",
    name: "Hematite",
    category: "Grounding",
    price: "35",
    image: hematite,
    auraColor: "from-slate-500/20 via-slate-600/10 to-transparent",
    tagline: "Grounding, protection, focus, stability, & energetic strength",
    description: "This is for grounding, protection, focus, stability, and energetic strength. Hematite is a strong root chakra stone that helps you feel centered, present, and secure.",
    chakra: "Root chakra",
    benefits: [
      "Supports grounding and stability.",
      "Helps reduce scattered energy.",
      "Strengthens focus and mental clarity.",
      "Encourages inner strength and balance.",
      "Traditionally associated with blood and vitality energy."
    ],
    howItWorks: "Hematite creates an anchoring energy that helps connect you to the earth and steady your mind.",
    hand: "Wear on the left hand for grounding and receiving calm energy.",
    zodiac: "Aries, Taurus, Capricorn",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "black-tourmaline",
    name: "Black Tourmaline",
    category: "Protection",
    price: "39",
    image: blackTourmaline,
    auraColor: "from-neutral-900/40 via-neutral-800/20 to-transparent",
    tagline: "Protection, cleansing negative energy, grounding, & root chakra strength",
    description: "This is for protection, cleansing negative energy, grounding, and root chakra strength. Black Tourmaline is one of the most loved protection stones.",
    chakra: "Root chakra",
    benefits: [
      "Helps protect your energy.",
      "Clears negativity from the aura.",
      "Supports grounding and stability.",
      "Creates a strong energetic shield.",
      "Useful for home and personal protection."
    ],
    howItWorks: "Black Tourmaline absorbs heavy energy and helps create a protective boundary around you.",
    hand: "Wear on the left hand for protection and energetic shielding.",
    zodiac: "Scorpio, Capricorn",
    forms: "Bracelet, tumble, raw stone, tower, pocket stone"
  },
  {
    slug: "evil-eye-protection",
    name: "Evil Eye Protection Stone",
    category: "Protection",
    price: "39",
    image: evilEye,
    auraColor: "from-blue-600/20 via-indigo-500/10 to-transparent",
    tagline: "Protection from negative energy, envy, & the evil eye",
    description: "This is for protection from negative energy, envy, and the evil eye. It is used as a spiritual shield to guard your energy field.",
    chakra: "Root chakra and protective energy field",
    benefits: [
      "Protects from the evil eye.",
      "Helps guard against jealousy and negativity.",
      "Supports energetic shielding.",
      "Brings a sense of safety and protection.",
      "Can be used daily for spiritual defense."
    ],
    howItWorks: "It helps block unwanted energy and creates a protective boundary around the wearer.",
    hand: "Wear on the left hand for receiving protection.",
    zodiac: "All signs",
    forms: "Bracelet, pendant, charm, tumble, pocket stone"
  },
  {
    slug: "rose-quartz",
    name: "Rose Quartz",
    category: "Love & Healing",
    price: "35",
    image: productRose,
    auraColor: "from-pink-400/20 via-rose-300/10 to-transparent",
    tagline: "Love, compassion, self-love, emotional healing, & heart chakra balance",
    description: "This is for love, compassion, self-love, emotional healing, and heart chakra balance. Rose Quartz is one of the most loved stones for emotional softness and healing.",
    chakra: "Heart chakra",
    benefits: [
      "Supports unconditional love.",
      "Encourages self-love and self-worth.",
      "Brings peace and compassion.",
      "Helps with emotional healing.",
      "Balances heart chakra energy."
    ],
    howItWorks: "Rose Quartz opens the heart energy and helps heal emotional wounds with gentle loving vibration.",
    hand: "Wear on the left hand to receive love energy.",
    zodiac: "Taurus, Libra",
    forms: "Bracelet, tumble, raw stone, palm stone, pendant"
  },
  {
    slug: "green-aventurine",
    name: "Green Aventurine",
    category: "Healing & Luck",
    price: "35",
    image: greenAventurine,
    auraColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
    tagline: "Heart chakra healing, luck, growth, & emotional balance",
    description: "This is for heart chakra healing, luck, growth, and emotional balance. Green Aventurine is known as a crystal of opportunity and fresh energy.",
    chakra: "Heart chakra",
    benefits: [
      "Encourages emotional renewal.",
      "Attracts luck and opportunity.",
      "Supports growth and optimism.",
      "Helps open the heart to new beginnings.",
      "Brings calming and balancing energy."
    ],
    howItWorks: "Green Aventurine supports the heart chakra and helps invite fresh energy, healing, and prosperity.",
    hand: "Wear on the left hand for attracting luck and abundance.",
    zodiac: "Cancer, Leo",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "clear-quartz",
    name: "Clear Quartz",
    category: "Clarity & Amplification",
    price: "39",
    image: clearQuartz,
    auraColor: "from-slate-100/20 via-zinc-200/10 to-transparent",
    tagline: "Clarity, cleansing, amplification, & crown chakra support",
    description: "This is for clarity, cleansing, amplification, and crown chakra support. Clear Quartz is a master crystal used to strengthen energy and intention.",
    chakra: "Crown chakra and all chakras",
    benefits: [
      "Amplifies intention and energy.",
      "Supports mental and spiritual clarity.",
      "Helps cleanse and refresh energy.",
      "Strengthens other crystals.",
      "Supports spiritual connection."
    ],
    howItWorks: "Clear Quartz amplifies the energy of surrounding crystals and helps clear stagnant or blocked energy.",
    hand: "Wear on the left hand to receive clarity, or on the right hand to project intention.",
    zodiac: "All signs",
    forms: "Bracelet, tumble, raw stone, point, cluster"
  },
  {
    slug: "citrine",
    name: "Citrine",
    category: "Abundance & Power",
    price: "45",
    image: citrine,
    auraColor: "from-yellow-500/20 via-amber-400/10 to-transparent",
    tagline: "Abundance, confidence, joy, & solar plexus chakra support",
    description: "This is for abundance, confidence, joy, and solar plexus chakra support. Citrine is connected with positive energy and personal power.",
    chakra: "Solar plexus chakra",
    benefits: [
      "Supports abundance and prosperity.",
      "Helps build confidence.",
      "Brings joy and positivity.",
      "Supports manifestation work.",
      "Activates personal power."
    ],
    howItWorks: "Citrine helps awaken confidence, motivation, and a bright mindset.",
    hand: "Wear on the right hand to project confidence and abundance energy, or on the left hand to receive prosperity energy.",
    zodiac: "Leo, Sagittarius",
    forms: "Bracelet, tumble, raw stone, point, pocket stone"
  },
  {
    slug: "pyrite",
    name: "Pyrite",
    category: "Abundance & Power",
    price: "49",
    image: pyrite,
    auraColor: "from-amber-600/25 via-yellow-600/10 to-transparent",
    tagline: "Protection, confidence, abundance, & solar plexus chakra support",
    description: "This is for protection, confidence, abundance, and solar plexus chakra support. Pyrite is a strong crystal of power and manifestation.",
    chakra: "Solar plexus chakra",
    benefits: [
      "Supports protection and grounding.",
      "Brings confidence and strength.",
      "Helps with abundance and manifestation.",
      "Encourages focus and willpower.",
      "Strengthens energetic boundaries."
    ],
    howItWorks: "Pyrite strengthens inner will, confidence, and protective energy.",
    hand: "Wear on the right hand for action, courage, and success energy.",
    zodiac: "Aries, Leo, Sagittarius",
    forms: "Bracelet, tumble, raw stone, cube, cluster"
  },
  {
    slug: "hematite-tourmaline-set",
    name: "Hematite and Black Tourmaline Set",
    category: "Protection & Grounding",
    price: "69",
    image: productProtection,
    auraColor: "from-neutral-900/30 via-slate-800/15 to-transparent",
    tagline: "Strong grounding, protection, & energetic stability",
    description: "This is for strong grounding, protection, and energetic stability. Together, these two stones create a powerful root chakra combination.",
    chakra: "Root chakra",
    benefits: [
      "Strong protective energy.",
      "Deep grounding and stability.",
      "Helps clear heavy energy.",
      "Supports focus and emotional balance.",
      "Good for daily spiritual protection."
    ],
    howItWorks: "Hematite anchors energy, while Black Tourmaline shields and clears negativity.",
    hand: "Wear on the left hand for receiving grounding and protection.",
    zodiac: "Aries, Taurus, Capricorn, Scorpio",
    forms: "Bracelet set, tumble set, raw set"
  },
  {
    slug: "amethyst",
    name: "Amethyst",
    category: "Intuition & Calm",
    price: "39",
    image: productAmethyst,
    auraColor: "from-purple-600/20 via-indigo-500/10 to-transparent",
    tagline: "Intuition, calmness, spiritual awareness, & third eye chakra support",
    description: "This is for intuition, calmness, spiritual awareness, and third eye chakra support. Amethyst is known for peaceful and protective energy.",
    chakra: "Third eye chakra and crown chakra",
    benefits: [
      "Supports intuition.",
      "Brings calmness and peace.",
      "Helps with meditation.",
      "Supports spiritual awareness.",
      "Helps quiet the mind."
    ],
    howItWorks: "Amethyst calms the mind and helps deepen meditation and spiritual connection.",
    hand: "Wear on the left hand to receive calm and intuitive energy.",
    zodiac: "Pisces, Aquarius",
    forms: "Bracelet, tumble, raw stone, cluster, pendant"
  },
  {
    slug: "fluorite",
    name: "Fluorite",
    category: "Clarity & Focus",
    price: "45",
    image: fluorite,
    auraColor: "from-teal-500/20 via-emerald-600/10 to-transparent",
    tagline: "Mental clarity, focus, learning, & third eye chakra support",
    description: "This is for mental clarity, focus, learning, and third eye chakra support. Fluorite is a helpful crystal for organization and clear thinking.",
    chakra: "Third eye chakra",
    benefits: [
      "Helps with focus and clarity.",
      "Supports learning and concentration.",
      "Clears mental fog.",
      "Helps organize thoughts.",
      "Supports mental balance."
    ],
    howItWorks: "Fluorite helps reduce mental fog and bring more structure to your thoughts and energy.",
    hand: "Wear on the left hand for receiving mental clarity.",
    zodiac: "Virgo, Capricorn",
    forms: "Bracelet, tumble, raw stone, point, palm stone"
  },
  {
    slug: "carnelian",
    name: "Carnelian",
    category: "Creativity & Vitality",
    price: "35",
    image: carnelian,
    auraColor: "from-orange-500/20 via-amber-500/10 to-transparent",
    tagline: "Creativity, confidence, passion, & sacral chakra support",
    description: "This is for creativity, confidence, passion, and sacral chakra support. Carnelian is a strong energy stone for motivation and expression.",
    chakra: "Sacral chakra",
    benefits: [
      "Supports creativity.",
      "Increases confidence and courage.",
      "Helps with motivation.",
      "Supports emotional vitality.",
      "Brings warmth and passion."
    ],
    howItWorks: "Carnelian awakens creative energy and supports action, courage, and expression.",
    hand: "Wear on the right hand for action, expression, and creativity.",
    zodiac: "Aries, Leo",
    forms: "Bracelet, tumble, raw stone, palm stone, bead bracelet"
  },
  {
    slug: "moonstone",
    name: "Moonstone",
    category: "Intuition & Cycles",
    price: "39",
    image: moonstone,
    auraColor: "from-slate-300/20 via-indigo-300/10 to-transparent",
    tagline: "Intuition, feminine energy, emotional flow, & sacral chakra support",
    description: "This is for intuition, feminine energy, emotional flow, and sacral chakra support. Moonstone is connected with softness, cycles, and inner guidance.",
    chakra: "Sacral chakra and third eye chakra",
    benefits: [
      "Supports intuition.",
      "Helps emotional flow.",
      "Connects with feminine energy.",
      "Supports new beginnings.",
      "Helps balance emotional cycles."
    ],
    howItWorks: "Moonstone helps keep emotional energy soft and balanced while supporting inner guidance.",
    hand: "Wear on the left hand for intuition and receiving energy.",
    zodiac: "Cancer, Pisces",
    forms: "Bracelet, tumble, raw stone, pendant, palm stone"
  },
  {
    slug: "selenite",
    name: "Selenite",
    category: "Purification & Peace",
    price: "49",
    image: selenite,
    auraColor: "from-zinc-100/25 via-neutral-100/10 to-transparent",
    tagline: "Purification, peace, clarity, & crown chakra support",
    description: "This is for purification, peace, clarity, and crown chakra support. Selenite is often used for cleansing energy and raising vibration.",
    chakra: "Crown chakra",
    benefits: [
      "Clears and purifies energy.",
      "Supports peace and calm.",
      "Helps charge other crystals.",
      "Supports meditation.",
      "Connects with higher spiritual energy."
    ],
    howItWorks: "Selenite clears the energy field and helps refresh other crystals.",
    hand: "Wear on the left hand for receiving peace and purification energy.",
    zodiac: "All signs",
    forms: "Wand, bracelet, tower, plate, raw stick"
  },
  {
    slug: "tigers-eye",
    name: "Tiger’s Eye",
    category: "Courage & Power",
    price: "39",
    image: tigersEye,
    auraColor: "from-amber-600/20 via-yellow-600/10 to-transparent",
    tagline: "Courage, balance, confidence, & grounding",
    description: "This is for courage, balance, confidence, and grounding. Tiger’s Eye is known for protective and empowering energy.",
    chakra: "Solar plexus chakra and root chakra",
    benefits: [
      "Supports courage and confidence.",
      "Helps with grounding and balance.",
      "Protects your energy.",
      "Strengthens personal power.",
      "Helps with decision-making."
    ],
    howItWorks: "Tiger’s Eye helps balance fear with strength and supports clear action.",
    hand: "Wear on the right hand for courage and action.",
    zodiac: "Aries, Leo, Sagittarius",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "red-jasper",
    name: "Red Jasper",
    category: "Grounding",
    price: "35",
    image: redJasper,
    auraColor: "from-red-600/20 via-rose-600/10 to-transparent",
    tagline: "Grounding, strength, stability, & root chakra support",
    description: "This is for grounding, strength, stability, and root chakra support. Red Jasper is a steady and protective stone.",
    chakra: "Root chakra",
    benefits: [
      "Deep grounding energy.",
      "Supports strength and stability.",
      "Helps with endurance.",
      "Supports root chakra balance.",
      "Brings calm and steadiness."
    ],
    howItWorks: "Red Jasper helps anchor energy and support endurance.",
    hand: "Wear on the left hand for receiving grounding energy.",
    zodiac: "Aries, Capricorn",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "lapis-lazuli",
    name: "Lapis Lazuli",
    category: "Wisdom & Truth",
    price: "45",
    image: lapisLazuli,
    auraColor: "from-blue-800/20 via-indigo-800/10 to-transparent",
    tagline: "Truth, wisdom, communication, & throat chakra support",
    description: "This is for truth, wisdom, communication, and throat chakra support. Lapis Lazuli is a powerful stone for expression and insight.",
    chakra: "Throat chakra and third eye chakra",
    benefits: [
      "Supports truth and wisdom.",
      "Helps communication.",
      "Encourages inner insight.",
      "Supports self-expression.",
      "Brings spiritual awareness."
    ],
    howItWorks: "Lapis Lazuli helps support honest communication and deeper awareness.",
    hand: "Wear on the left hand to receive wisdom and insight.",
    zodiac: "Gemini, Aquarius",
    forms: "Bracelet, tumble, raw stone, pendant"
  },
  {
    slug: "sodalite",
    name: "Sodalite",
    category: "Communication",
    price: "35",
    image: sodalite,
    auraColor: "from-indigo-600/20 via-blue-600/10 to-transparent",
    tagline: "Communication, clarity, calmness, & throat chakra support",
    description: "This is for communication, clarity, calmness, and throat chakra support. Sodalite is a helpful stone for peaceful expression.",
    chakra: "Throat chakra",
    benefits: [
      "Supports clear communication.",
      "Brings calm and mental balance.",
      "Helps with focus and logic.",
      "Supports honest expression.",
      "Balances throat chakra energy."
    ],
    howItWorks: "Sodalite calms the mind and supports logical, clear speech.",
    hand: "Wear on the left hand for calm and balanced communication.",
    zodiac: "Gemini, Aquarius",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "smoky-quartz",
    name: "Smoky Quartz",
    category: "Grounding & Release",
    price: "39",
    image: smokyQuartz,
    auraColor: "from-stone-600/25 via-stone-500/10 to-transparent",
    tagline: "Grounding, release, protection, & root chakra support",
    description: "This is for grounding, release, protection, and root chakra support. Smoky Quartz is a calming stone that helps release heavy energy.",
    chakra: "Root chakra",
    benefits: [
      "Supports grounding and stability.",
      "Helps release heavy energy.",
      "Brings calm and clarity.",
      "Protects your energy.",
      "Supports emotional balance."
    ],
    howItWorks: "Smoky Quartz helps clear emotional heaviness and brings stability.",
    hand: "Wear on the left hand for grounding and release.",
    zodiac: "Capricorn, Taurus",
    forms: "Bracelet, tumble, raw stone, point, palm stone"
  },
  {
    slug: "howlite",
    name: "Howlite",
    category: "Calm & Peace",
    price: "35",
    image: howlite,
    auraColor: "from-zinc-200/20 via-neutral-100/10 to-transparent",
    tagline: "Calmness, patience, emotional peace, & crown chakra support",
    description: "This is for calmness, patience, emotional peace, and crown chakra support. Howlite is a gentle stone for quieting the mind.",
    chakra: "Crown chakra and throat chakra",
    benefits: [
      "Supports calm and patience.",
      "Helps reduce stress.",
      "Soothes emotional energy.",
      "Quietens the mind.",
      "Supports peaceful meditation."
    ],
    howItWorks: "Howlite reduces stress and supports emotional stillness.",
    hand: "Wear on the left hand for calmness and peace.",
    zodiac: "All signs",
    forms: "Bracelet, tumble, raw stone, bead bracelet"
  },
  {
    slug: "malachite",
    name: "Malachite",
    category: "Transformation",
    price: "49",
    image: malachite,
    auraColor: "from-emerald-700/20 via-green-600/10 to-transparent",
    tagline: "Transformation, heart healing, protection, & emotional release",
    description: "This is for transformation, heart healing, protection, and emotional release. Malachite is a strong crystal for deep change.",
    chakra: "Heart chakra",
    benefits: [
      "Supports transformation.",
      "Helps release old energy.",
      "Supports heart healing.",
      "Protects energetic space.",
      "Encourages growth and renewal."
    ],
    howItWorks: "Malachite supports release of old patterns and opens the heart to growth.",
    hand: "Wear on the left hand for emotional healing and heart support.",
    zodiac: "Scorpio, Capricorn",
    forms: "Bracelet, tumble, raw stone, pendant"
  },
  {
    slug: "obsidian",
    name: "Obsidian",
    category: "Protection & Grounding",
    price: "39",
    image: obsidian,
    auraColor: "from-neutral-950/30 via-neutral-900/15 to-transparent",
    tagline: "Protection, grounding, truth, & clearing heavy energy",
    description: "This is for protection, grounding, truth, and clearing heavy energy. Obsidian is a strong stone for deep energetic cleansing.",
    chakra: "Root chakra",
    benefits: [
      "Strong protection energy.",
      "Helps clear negativity.",
      "Supports grounding.",
      "Encourages truth and awareness.",
      "Useful for spiritual cleansing."
    ],
    howItWorks: "Obsidian brings hidden energy to the surface and helps remove negativity.",
    hand: "Wear on the left hand for protection and grounding.",
    zodiac: "Scorpio, Capricorn",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "blue-lace-agate",
    name: "Blue Lace Agate",
    category: "Communication",
    price: "45",
    image: blueLaceAgate,
    auraColor: "from-sky-400/20 via-blue-300/10 to-transparent",
    tagline: "Calm communication, peace, & throat chakra support",
    description: "This is for calm communication, peace, and throat chakra support. Blue Lace Agate is a soft and soothing stone.",
    chakra: "Throat chakra",
    benefits: [
      "Supports peaceful communication.",
      "Brings calm and soothing energy.",
      "Helps throat chakra balance.",
      "Reduces stress.",
      "Encourages gentle self-expression."
    ],
    howItWorks: "Blue Lace Agate calms emotional tension and supports peaceful speech.",
    hand: "Wear on the left hand for calm, gentle communication.",
    zodiac: "Gemini, Pisces",
    forms: "Bracelet, tumble, raw stone, pendant"
  },
  {
    slug: "amazonite",
    name: "Amazonite",
    category: "Truth & Calm",
    price: "39",
    image: amazonite,
    auraColor: "from-teal-400/20 via-cyan-400/10 to-transparent",
    tagline: "Truth, calm communication, emotional balance, & throat chakra support",
    description: "This is for truth, calm communication, emotional balance, and throat chakra support. Amazonite is a soothing stone for honest expression.",
    chakra: "Throat chakra and heart chakra",
    benefits: [
      "Supports truth and clarity.",
      "Helps calm emotional energy.",
      "Encourages balanced communication.",
      "Brings peace and trust.",
      "Supports self-expression."
    ],
    howItWorks: "Amazonite calms the nervous system and helps you speak with clarity.",
    hand: "Wear on the left hand for receiving peace and balance.",
    zodiac: "Virgo, Aquarius",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "onyx",
    name: "Onyx",
    category: "Protection & Strength",
    price: "39",
    image: obsidian,
    auraColor: "from-neutral-900/30 via-slate-800/15 to-transparent",
    tagline: "Grounding, strength, protection, & root chakra support",
    description: "This is for grounding, strength, protection, and root chakra support. Onyx is a strong and steady stone.",
    chakra: "Root chakra",
    benefits: [
      "Supports protection and strength.",
      "Helps with grounding.",
      "Brings emotional stability.",
      "Supports discipline and focus.",
      "Helps with root chakra energy."
    ],
    howItWorks: "Onyx helps you stay focused, protected, and emotionally balanced.",
    hand: "Wear on the left hand for grounding and protection.",
    zodiac: "Leo, Capricorn",
    forms: "Bracelet, tumble, raw stone, bead bracelet"
  },
  {
    slug: "jade",
    name: "Jade",
    category: "Luck & Harmony",
    price: "49",
    image: greenAventurine,
    auraColor: "from-green-600/20 via-emerald-500/10 to-transparent",
    tagline: "Luck, harmony, prosperity, & heart chakra support",
    description: "This is for luck, harmony, prosperity, and heart chakra support. Jade is a peaceful and balanced stone.",
    chakra: "Heart chakra",
    benefits: [
      "Supports prosperity and luck.",
      "Brings harmony and peace.",
      "Helps emotional balance.",
      "Encourages growth and well-being.",
      "Supports heart chakra energy."
    ],
    howItWorks: "Jade supports calm energy and attracts abundance.",
    hand: "Wear on the left hand to receive luck and harmony.",
    zodiac: "Virgo, Libra",
    forms: "Bracelet, tumble, raw stone, pendant"
  },
  {
    slug: "unakite",
    name: "Unakite",
    category: "Healing & Balance",
    price: "35",
    image: fluorite,
    auraColor: "from-green-500/15 via-rose-400/10 to-transparent",
    tagline: "Emotional healing, balance, heart chakra support, & gentle growth",
    description: "This is for emotional healing, balance, heart chakra support, and gentle growth. Unakite is a soft stone for healing and renewal.",
    chakra: "Heart chakra and third eye chakra",
    benefits: [
      "Supports emotional healing.",
      "Helps balance the heart.",
      "Encourages gentle growth.",
      "Supports release of old energy.",
      "Brings calm and stability."
    ],
    howItWorks: "Unakite helps release emotional blocks and supports calm progress.",
    hand: "Wear on the left hand for emotional healing and balance.",
    zodiac: "Scorpio, Virgo",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "labradorite",
    name: "Labradorite",
    category: "Intuition & Protection",
    price: "45",
    image: moonstone,
    auraColor: "from-indigo-500/20 via-slate-600/10 to-transparent",
    tagline: "Intuition, transformation, spiritual protection, & third eye chakra support",
    description: "This is for intuition, transformation, spiritual protection, and third eye chakra support. Labradorite is known as a mystical and protective crystal.",
    chakra: "Third eye chakra and crown chakra",
    benefits: [
      "Supports spiritual protection.",
      "Enhances intuition.",
      "Helps with transformation.",
      "Strengthens the aura.",
      "Supports higher spiritual awareness."
    ],
    howItWorks: "Labradorite strengthens the aura and supports intuitive growth.",
    hand: "Wear on the left hand for intuition and inner guidance.",
    zodiac: "Pisces, Scorpio",
    forms: "Bracelet, tumble, raw stone, palm stone"
  },
  {
    slug: "moonstone-bracelet",
    name: "Moonstone Bracelet",
    category: "Intuition & Harmony",
    price: "49",
    image: moonstone,
    auraColor: "from-slate-300/25 via-indigo-300/10 to-transparent",
    tagline: "Intuition, feminine energy, & emotional harmony",
    description: "This is for intuition, feminine energy, and emotional harmony. Moonstone bracelets are often worn for daily intuitive support.",
    chakra: "Sacral chakra and third eye chakra",
    benefits: [
      "Supports intuition.",
      "Helps emotional balance.",
      "Connects to feminine energy.",
      "Supports new beginnings.",
      "Can be worn daily."
    ],
    howItWorks: "Moonstone helps keep emotional energy soft and balanced while supporting inner guidance.",
    hand: "Wear on the left hand for receiving intuition and emotional support.",
    zodiac: "Cancer, Pisces",
    forms: "Bracelet, tumble bracelet, bead bracelet"
  }
];


const matchesType = (productForms, type) => {
  const formsLower = productForms.toLowerCase();
  const typeLower = type.toLowerCase();
  if (typeLower === "point/cluster") {
    return formsLower.includes("point") || formsLower.includes("cluster") || formsLower.includes("wand");
  }
  if (typeLower === "raw stone") {
    return formsLower.includes("raw") || formsLower.includes("stone");
  }
  return formsLower.includes(typeLower);
};

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Mouse move state for hero card image parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setMousePos({ x, y });
  };
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Reset pagination automatically when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPriceRange, selectedCategories, selectedTypes, selectedAvailability, productsPerPage]);

  const getWhatsAppLink = (productName) => {
    const text = `Hello Shivani Spiritual Yatri,\n\nI would like to know more about ${productName}.\n\nPlease share complete details.`;
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // Filter products logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(query);
      const catMatch = product.category.toLowerCase().includes(query);
      const taglineMatch = product.tagline.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const formsMatch = product.forms.toLowerCase().includes(query);
      const benefitsMatch = product.benefits && product.benefits.some(b => b.toLowerCase().includes(query));
      if (!nameMatch && !catMatch && !taglineMatch && !descMatch && !formsMatch && !benefitsMatch) {
        return false;
      }
    }

    // Price Range
    const price = parseInt(product.price, 10);
    if (selectedPriceRange === "under-40" && price >= 40) return false;
    if (selectedPriceRange === "40-50" && (price < 40 || price > 50)) return false;
    if (selectedPriceRange === "over-50" && price <= 50) return false;

    // Categories
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Crystal Types
    if (selectedTypes.length > 0) {
      const matchesAnyType = selectedTypes.some(type => matchesType(product.forms, type));
      if (!matchesAnyType) return false;
    }

    return true;
  });

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category))).sort();
  const crystalTypes = ["Bracelet", "Tumble", "Raw Stone", "Palm Stone", "Tower", "Pendant", "Point/Cluster"];

  const handleCategoryChange = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedPriceRange("all");
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedAvailability("all");
  };

  const isFiltered = searchQuery !== "" || selectedPriceRange !== "all" || selectedCategories.length > 0 || selectedTypes.length > 0 || selectedAvailability !== "all";

  // Shared Sidebar Filters Component
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Header & Reset */}
      <div className="flex justify-between items-center pb-3 border-b border-gold/10">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5" /> Filter Crystals
        </span>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-gold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Price Range</span>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "all", label: "All Prices" },
            { id: "under-40", label: "Under $40" },
            { id: "40-50", label: "$40 - $50" },
            { id: "over-50", label: "Over $50" }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedPriceRange(range.id)}
              className={`px-3 py-1.5 text-[10px] font-medium rounded-full border text-center transition-all cursor-pointer ${
                selectedPriceRange === range.id
                  ? "bg-gold/15 border-gold text-gold shadow-[0_0_8px_rgba(212,175,55,0.2)]"
                  : "bg-white/5 border-gold/15 text-muted-foreground hover:border-gold/30"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Category</span>
        <div className="max-h-40 overflow-y-auto pr-1 border border-gold/10 p-2.5 rounded-xl bg-[#0D1117]/35 scrollbar-thin scrollbar-thumb-gold/20 space-y-1.5">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-[11px] text-muted-foreground/90 hover:text-gold transition-colors cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="accent-gold border-gold/35 focus:ring-0 rounded bg-transparent h-3 w-3"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Crystal Type Filter */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Crystal Type</span>
        <div className="space-y-1.5 border border-gold/10 p-2.5 rounded-xl bg-[#0D1117]/35">
          {crystalTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-[11px] text-muted-foreground/90 hover:text-gold transition-colors cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="accent-gold border-gold/35 focus:ring-0 rounded bg-transparent h-3 w-3"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Availability</span>
        <div className="flex gap-4 border border-gold/10 p-2.5 rounded-xl bg-[#0D1117]/35">
          <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground/90 hover:text-gold transition-colors cursor-pointer select-none">
            <input
              type="radio"
              name="availability"
              checked={selectedAvailability === "all"}
              onChange={() => setSelectedAvailability("all")}
              className="accent-gold h-3 w-3"
            />
            <span>All</span>
          </label>
          <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground/90 hover:text-gold transition-colors cursor-pointer select-none">
            <input
              type="radio"
              name="availability"
              checked={selectedAvailability === "in-stock"}
              onChange={() => setSelectedAvailability("in-stock")}
              className="accent-gold h-3 w-3"
            />
            <span>In Stock</span>
          </label>
        </div>
      </div>

      {/* Sidebar small crystal/tarot animation */}
      <div className="pt-4 border-t border-gold/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[110px] rounded-xl bg-[#0D1117]/15">
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 text-gold/90 flex flex-col items-center gap-1"
        >
          <Sparkles className="h-6 w-6 text-gold/80 animate-pulse" />
          <span className="text-[8px] uppercase tracking-[0.2em] text-gold/60">Energy Active</span>
        </motion.div>
        
        <motion.div
          animate={{
            y: [3, -3, 3],
            rotate: [12, 8, 12]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-4 w-5 h-8 border border-gold/25 bg-gold/5 rounded opacity-40"
        />

        <motion.div
          animate={{
            y: [-3, 3, -3],
            rotate: [-12, -8, -12]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-4 w-5 h-8 border border-gold/25 bg-gold/5 rounded opacity-40"
        />
        
        <div className="absolute w-20 h-20 rounded-full border border-gold/5 animate-ping opacity-35" style={{ animationDuration: "3s" }} />
      </div>
    </div>
  );

  return (
    <>
      {/* Products Premium Hero Section */}
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
            <Sparkles className="h-3 w-3" /> Sacred Tools
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium uppercase"
          >
            Spiritual <span className="text-gradient-gold">Healing Products</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide font-light"
          >
            Explore our curated selection of high-vibrational crystal tools designed to support your spiritual practice, energy alignment, and inner healing.
          </motion.p>
        </div>
      </section>

      {/* 1. CRYSTAL COLLECTION HERO CARD */}
      <section className="py-12 md:py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <CosmicBackground density={20} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <Reveal>
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden rounded-3xl border border-gold/20 bg-card-glass backdrop-blur-xl p-8 md:p-12 shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(216,182,122,0.08)] transition-all duration-500 hover:border-gold/30"
            >
              {/* Shimmering Gold Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-gold/10 to-transparent translate-x-[-100%] animate-shimmer pointer-events-none" />

              {/* Soft glowing energy rings */}
              <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full border border-gold/10 opacity-30 animate-spin-slow" />
              <div className="pointer-events-none absolute -right-12 -bottom-12 h-80 w-80 rounded-full border border-sapphire/15 opacity-40 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "40s" }} />

              {/* Floating crystal particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gold/60 rounded-full"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + (i * 17) % 80}%`,
                    }}
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Corner Floating Tarot Cards */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [-4, 4, -4],
                  scale: [0.98, 1.02, 0.98]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 left-4 z-20 hidden md:flex flex-col items-center justify-center w-12 h-20 rounded-md border border-gold/40 bg-[#151B26]/90 shadow-[0_5px_15px_rgba(0,0,0,0.4)] backdrop-blur-md cursor-pointer select-none"
              >
                <div className="absolute inset-0.5 border border-gold/20 rounded-sm flex flex-col items-center justify-between p-1 bg-gradient-to-b from-[#1a2333] to-[#0D1117]">
                  <span className="text-[5px] uppercase tracking-widest text-gold/60">The Sun</span>
                  <Sparkles className="h-4 w-4 text-gold/80 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [4, -4, 4],
                  scale: [1.02, 0.98, 1.02]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute top-4 right-4 z-20 hidden md:flex flex-col items-center justify-center w-12 h-20 rounded-md border border-gold/40 bg-[#151B26]/90 shadow-[0_5px_15px_rgba(0,0,0,0.4)] backdrop-blur-md cursor-pointer select-none"
              >
                <div className="absolute inset-0.5 border border-gold/20 rounded-sm flex flex-col items-center justify-between p-1 bg-gradient-to-b from-[#1a2333] to-[#0D1117]">
                  <span className="text-[5px] uppercase tracking-widest text-gold/60">The Moon</span>
                  <Sparkles className="h-4 w-4 text-gold/80 animate-pulse" style={{ animationDelay: "1s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Image left */}
                <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-gold/15 bg-[#0D1117]/35 h-[260px] md:h-[350px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sapphire/20 via-gold/5 to-purple-500/10 blur-xl opacity-60 pointer-events-none" />
                  <div 
                    className="w-full h-full transition-transform duration-300 ease-out"
                    style={{
                      transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) scale(1.05)`
                    }}
                  >
                    <img
                      src={sacredRemediesImage}
                      alt="Sacred Crystals Collection"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/40 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold/40 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold/40 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/40 pointer-events-none" />
                </div>

                {/* Content right */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-gold font-medium bg-gold/5 border border-gold/30 rounded-full px-3 py-1">
                    <Sparkles className="h-3 w-3 text-gold" /> Exclusive Spiritual Boutique
                  </span>
                  
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-wider text-gradient-gold uppercase leading-[1.15]">
                    Our Crystal Collection
                  </h1>

                  <div className="space-y-4 text-xs md:text-sm text-muted-foreground/90 font-light leading-relaxed tracking-wide text-justify">
                    <p>
                      We offer crystals as sacred tools for spiritual support, energy alignment, meditation, protection, and daily healing practice. Each crystal is chosen for its unique vibration and traditional spiritual meaning, helping you connect with grounding, love, clarity, confidence, abundance, protection, and inner peace.
                    </p>
                    <p>
                      Crystals have been used for generations as symbolic energy tools. In our collection, we offer them in forms that are easy to wear, carry, gift, or place in your sacred space, so you can work with their energy in a simple and meaningful way. We sell these crystals to support your spiritual journey, your healing rituals, and your personal connection with the energy you wish to invite into your life.
                    </p>
                    <p>
                      Our crystal collection includes 30 powerful crystals, each selected for a specific purpose such as chakra balancing, emotional healing, protection, attraction, intuition, clarity, and transformation. Some crystals support the root chakra for grounding, some support the heart chakra for love, some help with the solar plexus for confidence, and some are used for cleansing and spiritual expansion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. WHY WE OFFER CRYSTALS SECTION */}
      <section className="py-12 relative overflow-hidden bg-background/20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* LEFT: Why We Offer These Crystals */}
            <Reveal delay={0.1}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-medium tracking-wider text-gold uppercase mb-4 pb-2 border-b border-gold/10">
                    Why We Offer These Crystals
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-light mb-4 text-justify">
                    We offer these crystals because they are beautiful, meaningful, and deeply supportive in spiritual practice. Many people use them:
                  </p>
                  <ul className="space-y-3.5 text-xs md:text-sm text-muted-foreground/90 font-light">
                    {[
                      "For meditation and Reiki.",
                      "For chakra balancing and energy healing.",
                      "For protection and grounding.",
                      "For love, peace, and emotional healing.",
                      "For abundance, confidence, and manifestation.",
                      "For altar work, home energy, and daily spiritual wear."
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Sparkles className="h-4 w-4 shrink-0 text-gold/80 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* CENTER: Premium Animated Crystal Altar */}
            <Reveal delay={0.2}>
              <div className="relative flex flex-col items-center justify-center p-6 h-full min-h-[300px] rounded-2xl border border-gold/15 bg-[#0D1117]/25 backdrop-blur-md overflow-hidden shadow-[inset_0_0_20px_rgba(216,182,122,0.05)]">
                {/* Ambient glow backlight */}
                <div className="absolute w-40 h-40 rounded-full bg-gold/10 blur-[40px] pointer-events-none" />
                
                {/* Rotating Sacred Geometry (Lightweight vector mandala) */}
                <svg className="absolute w-48 h-48 text-gold/15 animate-spin-slow opacity-60" viewBox="0 0 100 100" style={{ animationDuration: "35s" }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * Math.PI) / 3;
                    const x = 50 + 30 * Math.cos(angle);
                    const y = 50 + 30 * Math.sin(angle);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" />
                      </g>
                    );
                  })}
                </svg>

                {/* Orbiting Tarot Card 1 */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="absolute w-44 h-44 pointer-events-none flex items-center justify-between"
                >
                  <div className="w-5 h-8 rounded border border-gold/45 bg-[#151B26]/95 shadow-[0_4px_10px_rgba(0,0,0,0.5)] p-0.5 flex flex-col items-center justify-between rotate-[15deg]">
                    <div className="absolute inset-0.5 border border-gold/15 rounded-sm flex items-center justify-center bg-[#0D1117]">
                      <Sparkles className="h-2 w-2 text-gold/80 animate-pulse" />
                    </div>
                  </div>
                  <div className="w-0 h-0" />
                </motion.div>

                {/* Orbiting Tarot Card 2 */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-56 h-56 pointer-events-none flex items-center justify-between"
                >
                  <div className="w-0 h-0" />
                  <div className="w-5 h-8 rounded border border-gold/45 bg-[#151B26]/95 shadow-[0_4px_10px_rgba(0,0,0,0.5)] p-0.5 flex flex-col items-center justify-between rotate-[-25deg]">
                    <div className="absolute inset-0.5 border border-gold/15 rounded-sm flex items-center justify-center bg-[#0D1117]">
                      <Sparkles className="h-2 w-2 text-indigo-400/80 animate-pulse" style={{ animationDelay: "1s" }} />
                    </div>
                  </div>
                </motion.div>

                {/* Soft particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gold/50 rounded-full"
                      style={{
                        top: `${40 + (i * 10)}%`,
                        left: `${45 + (i * 7) % 15}%`,
                      }}
                      animate={{
                        y: [0, -40, 0],
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                {/* Floating Crystal */}
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-24 h-24 drop-shadow-[0_0_15px_rgba(216,182,122,0.25)] flex items-center justify-center"
                >
                  <img src={clearQuartz} alt="Floating Altar Crystal" className="w-full h-full object-contain" />
                </motion.div>

                <div className="absolute bottom-6 text-[9px] uppercase tracking-[0.2em] text-gold font-semibold bg-gold/10 px-3 py-1 rounded-full border border-gold/30 flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  <Sparkles className="h-3 w-3" /> Sacred Crystal Altar
                </div>
              </div>
            </Reveal>

            {/* RIGHT: What You Will Find */}
            <Reveal delay={0.3}>
              <div className="p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg md:text-xl font-medium tracking-wider text-gold uppercase mb-4 pb-2 border-b border-gold/10">
                    What You Will Find
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed font-light text-justify">
                    Our collection includes bracelets, tumbles, raw stones, palm stones, pendants, towers, and other forms, so you can choose the crystal that matches your intention and your lifestyle. Each crystal has its own energy, purpose, and traditional meaning, and together they create a complete spiritual collection for everyday use and deeper healing work.
                  </p>
                </div>
                
                {/* Decorative crystals summary badge */}
                <div className="mt-6 border-t border-gold/10 pt-4 flex flex-wrap gap-2">
                  {[
                    "Bracelets", "Tumbles", "Raw Stones", "Palm Stones", "Towers", "Pendants", "Clusters"
                  ].map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold/10 bg-gold/5 text-gold/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* 3. KEEP CRYSTAL CARE SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <Reveal delay={0.1}>
              <div className="p-5 rounded-xl border border-gold/10 bg-[#0D1117]/25 text-xs text-muted-foreground/80 leading-relaxed">
                <span className="font-semibold text-gold uppercase tracking-wider block mb-1.5">Crystal Care</span>
                Crystals can be cleansed with moonlight, sound, intention, prayer, or Selenite. They can be charged by holding them with intention, placing them on an altar, or keeping them with Clear Quartz or Selenite.
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-5 rounded-xl border border-gold/10 bg-[#0D1117]/25 text-xs text-muted-foreground/80 leading-relaxed italic">
                <span className="font-semibold text-gold uppercase tracking-wider block mb-1.5 not-italic">Important Note</span>
                Crystal healing is a spiritual practice and not a replacement for medical diagnosis or treatment.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 my-10 z-10 relative">
        <div className="w-full border-t border-gold/15" />
      </div>

      {/* 4. PRODUCTS SHOWCASE AREA */}
      <section className="pb-24 relative overflow-hidden bg-background/30">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          {/* Section Header with Search & Selector controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 pb-6 border-b border-gold/10 relative z-10">
            <div className="text-left w-full md:w-auto">
              <h2 className="font-display text-2xl md:text-3xl tracking-wider uppercase text-gold">
                Sacred Crystal Collection
              </h2>
              <p className="text-xs text-muted-foreground/85 font-light mt-1">
                Showing {filteredProducts.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} Sacred Crystals
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
              {/* Premium Search Bar */}
              <div className="relative w-full sm:w-72">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gold/60">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your sacred crystal..."
                  className="w-full pl-9 pr-9 py-2 bg-card-glass border border-gold/20 hover:border-gold/30 focus:border-gold/50 rounded-full text-xs text-foreground placeholder-muted-foreground/70 focus:outline-none transition-all shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
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

              {/* Products per page selector */}
              <div className="flex items-center gap-2 bg-card-glass border border-gold/20 rounded-full px-3 py-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                <span className="text-[10px] uppercase tracking-wider text-gold/80">Show:</span>
                <select
                  value={productsPerPage}
                  onChange={(e) => setProductsPerPage(parseInt(e.target.value, 10))}
                  className="bg-transparent border-none text-xs text-gold font-medium focus:outline-none cursor-pointer pr-1"
                >
                  <option value={9} className="bg-[#151B26] text-foreground">9</option>
                  <option value={15} className="bg-[#151B26] text-foreground">15</option>
                  <option value={21} className="bg-[#151B26] text-foreground">21</option>
                  <option value={35} className="bg-[#151B26] text-foreground">35</option>
                </select>
              </div>

              {/* Mobile filter button */}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className="lg:hidden flex items-center gap-1.5 px-4.5 py-1.5 bg-card-glass border border-gold/30 hover:border-gold rounded-full text-xs text-gold uppercase tracking-wider cursor-pointer transition-all"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Collapsible Filters Panel */}
          <AnimatePresence>
            {isFilterDrawerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden w-full mb-8 relative z-20 overflow-hidden"
              >
                <div className="p-6 rounded-2xl border border-gold/20 bg-[#151B26]/95 backdrop-blur-xl space-y-6">
                  <FiltersContent />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Two-Column Sidebar & Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 self-start p-6 rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md space-y-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <FiltersContent />
              </div>
            </div>

            {/* Right side products showcase */}
            <div className="lg:col-span-3">
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-stretch">
                  {paginatedProducts.map((p, i) => {
                    const auraColor = p.auraColor || "from-sapphire/20 to-gold/10";
                    const crystalType = p.forms.split(",")[0].trim();
                    const mainChakra = p.chakra.includes("All") || p.chakra.includes("seven") ? "All Chakras" : p.chakra.split(" ")[0] + " Chakra";
                    
                    return (
                      <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="group relative flex flex-col justify-between h-full rounded-2xl border border-gold/15 bg-card-glass backdrop-blur-md p-5 transition-all duration-500 hover:border-gold/35 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.1)] overflow-hidden"
                        >
                          {/* Inner glow */}
                          <div className={`absolute -top-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-br ${auraColor} blur-3xl opacity-15 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none`} />

                          <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                              {/* Product Image Box */}
                              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-gold/20 shadow-[0_8px_20px_rgba(0,0,0,0.45)] bg-[#0D1117]/20 backdrop-blur-sm transition-all duration-700 group-hover:border-gold/45 group-hover:shadow-gold/15 mb-4 shrink-0">
                                <div className={`absolute -inset-2 bg-gradient-to-tr ${auraColor} rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none`} />
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold/45 pointer-events-none" />
                                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/45 pointer-events-none" />
                                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold/45 pointer-events-none" />
                                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold/45 pointer-events-none" />
                              </div>

                              {/* Badges & Luxury Price Tag */}
                              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                                <div className="flex flex-wrap gap-1">
                                  <span className="rounded-full border border-gold/30 bg-[#151B26]/85 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-gold">
                                    {p.category}
                                  </span>
                                  <span className="rounded-full border border-indigo-500/30 bg-[#0D1117]/80 px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-indigo-300">
                                    {mainChakra}
                                  </span>
                                  <span className="rounded-full border border-gold/20 bg-[#151B26]/70 px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-gold/80">
                                    {crystalType}
                                  </span>
                                </div>
                                <div className="text-gold font-display text-sm font-semibold bg-gold/5 border border-gold/25 rounded px-2 py-0.5 flex items-center gap-0.5 shrink-0">
                                  <span>${p.price}</span>
                                  <span className="text-[7px] text-muted-foreground font-light">CAD</span>
                                </div>
                              </div>

                              <h3 className="font-display text-base text-foreground/95 group-hover:text-gold transition-colors duration-300 font-medium leading-snug">
                                {p.name}
                              </h3>

                              {/* Tagline */}
                              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/80 font-light line-clamp-2">
                                {p.tagline}
                              </p>
                            </div>

                            {/* Actions buttons */}
                            <div className="mt-5 pt-3 border-t border-gold/5 flex gap-2 w-full">
                              <button
                                onClick={() => setSelectedProduct(p)}
                                className="flex-1 rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2 text-center text-[10px] font-semibold uppercase tracking-wider transition-all text-gold cursor-pointer"
                              >
                                Details
                              </button>
                              <a
                                href={getWhatsAppLink(p.name)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 rounded-full btn-gold py-2 text-center text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <MessageSquare className="h-3 w-3" /> Get Guidance
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      </Reveal>
                    );
                  })}
                </div>
              ) : (
                /* 11. EMPTY STATE */
                <Reveal>
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-gold/10 rounded-3xl bg-card-glass backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-sapphire/5 to-transparent pointer-events-none" />
                    
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-24 h-24 mb-6 text-gold/30 flex items-center justify-center"
                    >
                      <Sparkles className="h-16 w-16 text-gold/40 animate-pulse" />
                      <div className="absolute w-12 h-20 border border-gold/10 bg-gold/5 rounded rotate-12" />
                      <div className="absolute w-12 h-20 border border-gold/10 bg-gold/5 rounded -rotate-12" />
                    </motion.div>
                    
                    <h3 className="font-display text-xl text-foreground font-medium uppercase tracking-wider mb-2">
                      No matching crystals found
                    </h3>
                    <p className="text-xs text-muted-foreground/80 max-w-md leading-relaxed font-light mb-6">
                      We couldn't find any sacred crystals that match your selected search query or filters. Try adjusting your parameters or reset all filters below.
                    </p>
                    
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full btn-gold text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset Filters
                    </button>
                  </div>
                </Reveal>
              )}

              {/* 10. PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-gold/10 relative z-10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                      currentPage === 1
                        ? "border-gold/5 text-muted-foreground/45 cursor-not-allowed bg-transparent"
                        : "border-gold/20 bg-card-glass hover:bg-gold/15 text-gold hover:border-gold cursor-pointer"
                    }`}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Prev
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg border text-xs font-medium transition-all cursor-pointer flex items-center justify-center ${
                          currentPage === pageNum
                            ? "bg-gold/25 border-gold text-gold shadow-[0_0_10px_rgba(212,175,55,0.25)] font-semibold"
                            : "border-gold/15 bg-card-glass hover:bg-gold/10 text-muted-foreground hover:border-gold/30"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                      currentPage === totalPages
                        ? "border-gold/5 text-muted-foreground/45 cursor-not-allowed bg-transparent"
                        : "border-gold/20 bg-card-glass hover:bg-gold/15 text-gold hover:border-gold cursor-pointer"
                    }`}
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. VIEW DETAILS POPUP MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-gold/20 bg-[#151B26]/95 backdrop-blur-xl p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(216,182,122,0.15)] flex flex-col cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-30 rounded-full border border-gold/15 bg-white/5 hover:bg-white/10 p-2 text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start overflow-hidden h-full">
                {/* Modal image section */}
                <div className="col-span-1 md:col-span-5 relative h-[180px] md:h-[320px] rounded-xl overflow-hidden border border-gold/15 bg-[#0D1117]/30 shrink-0">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151B26] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 z-10 rounded-full border border-gold/30 bg-[#151B26]/90 px-3 py-0.5 text-[8px] font-bold uppercase tracking-widest text-gold">
                    {selectedProduct.category}
                  </span>
                </div>

                {/* Modal content section */}
                <div className="col-span-1 md:col-span-7 flex flex-col justify-between h-full overflow-hidden space-y-4">
                  <div>
                    <div className="flex justify-between items-start gap-4 flex-wrap mb-2">
                      <h3 className="font-display text-xl md:text-2xl font-medium tracking-wide uppercase text-foreground">
                        {selectedProduct.name}
                      </h3>
                      <span className="font-display text-lg text-gold font-medium">${selectedProduct.price} CAD</span>
                    </div>
                    
                    {/* Scrollable details wrapper */}
                    <div className="space-y-4 max-h-[35vh] md:max-h-[42vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/20 text-xs md:text-sm text-muted-foreground leading-relaxed font-light tracking-wide text-justify">
                      <p className="text-muted-foreground/90">{selectedProduct.description}</p>

                      {selectedProduct.chakra && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-1">Chakra:</span>
                          <p className="text-muted-foreground/90">{selectedProduct.chakra}</p>
                        </div>
                      )}

                      {selectedProduct.benefits && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-2">Benefits:</span>
                          <div className="space-y-2 bg-[#0D1117]/30 border border-gold/5 p-4 rounded-xl">
                            {selectedProduct.benefits.map((b, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-muted-foreground/85 text-left">
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold/80 mt-0.5" />
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProduct.howItWorks && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-1">How it works:</span>
                          <p className="text-muted-foreground/90">{selectedProduct.howItWorks}</p>
                        </div>
                      )}

                      {selectedProduct.hand && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-1">Which hand to wear:</span>
                          <p className="text-muted-foreground/90">{selectedProduct.hand}</p>
                        </div>
                      )}

                      {selectedProduct.zodiac && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-1">Zodiac sign:</span>
                          <p className="text-muted-foreground/90">{selectedProduct.zodiac}</p>
                        </div>
                      )}

                      {selectedProduct.forms && (
                        <div>
                          <span className="text-xs font-semibold text-gold/90 uppercase tracking-widest block mb-1">Available forms:</span>
                          <p className="text-muted-foreground/90">{selectedProduct.forms}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sticky popup actions bar */}
                  <div className="pt-3 border-t border-gold/10 flex gap-4 w-full">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="flex-1 rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 hover:border-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all text-gold cursor-pointer"
                    >
                      Close
                    </button>
                    <a
                      href={getWhatsAppLink(selectedProduct.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-full btn-gold py-2.5 text-center text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                    >
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
    </>
  );
}
