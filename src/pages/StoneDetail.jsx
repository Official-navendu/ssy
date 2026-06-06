import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, ArrowRight, ShieldCheck, Heart, Zap, Gem } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";

import amethystImg from "@/assets/images/amethyst.webp";
import roseQuartzImg from "@/assets/images/rose_quartz.webp";
import citrineImg from "@/assets/images/citrine.webp";
import blackTourmalineImg from "@/assets/images/black_tourmaline.webp";


const stonesData = {
  amethyst: {
    name: "Amethyst Crystal",
    tagline: "Spiritual Clarity & Intuitive Growth",
    description: "Unveil the ancient path of deep serenity and spiritual vision. Amethyst works as a natural tranquilizer, soothing stress, expanding intuitive insight, and encouraging profound spiritual wisdom. For centuries, spiritual seekers and mystics have utilized amethyst to clear the chatter of the conscious mind and connect directly with cosmic awareness.",
    chakra: "Third Eye & Crown Chakras",
    element: "Wind / Spirit",
    zodiac: "Pisces, Aquarius, Sagittarius",
    origin: "Brazil, Uruguay, Madagascar",
    color: "139, 92, 246", // Purple
    image: amethystImg,
    healing: {
      physical: "Soothes nervous system imbalances, alleviates tension headaches, and promotes deep, restful sleep states free from night terrors.",
      emotional: "Dissolves intense grief, anxiety, and anger, replacing emotional instability with a calm, grounded tranquility.",
      spiritual: "Cleanses the auric field, protects against negative psychic attacks, and accelerates third eye awakening and divine channeling."
    }
  },
  "rose-quartz": {
    name: "Rose Quartz",
    tagline: "Infinite Love & Heart Alignment",
    description: "Open your heart to universal compassion. Rose Quartz is the ultimate stone of unconditional love, dissolving emotional blockages, healing relationships, and nurturing self-love. It gently teaches that love begins within, filling your auric field with soft pink rays of comfort, warmth, and peace.",
    chakra: "Heart Chakra",
    element: "Water",
    zodiac: "Taurus, Libra, Scorpio",
    origin: "South Africa, Brazil, Madagascar",
    color: "244, 114, 182", // Pink
    image: roseQuartzImg,
    healing: {
      physical: "Supports heart health, stimulates cellular rejuvenation, and cleanses the circulatory system of heavy physical stresses.",
      emotional: "Heals inner childhood trauma, dispels accumulated emotional wounds, and reinstates absolute trust, empathy, and forgiveness.",
      spiritual: "Connects your spiritual presence to the frequencies of cosmic divine love, facilitating sacred union and soulmate attraction."
    }
  },
  citrine: {
    name: "Citrine Stone",
    tagline: "Success, Wealth & Golden Power",
    description: "Manifest limitless abundance. Revered as the Merchant's Stone, Citrine channels solar energy to foster wealth, ignite supreme confidence, and clear negative paths for professional triumphs. Unlike other stones, Citrine does not absorb negative energy — it transmutes, dissipates, and grounds lower vibrations instantly.",
    chakra: "Solar Plexus & Crown Chakras",
    element: "Fire",
    zodiac: "Aries, Leo, Gemini, Virgo",
    origin: "Brazil, Madagascar, Congo",
    color: "234, 179, 8", // Gold
    image: citrineImg,
    healing: {
      physical: "Boosts metabolic functionality, aids digestive pathways, and combats chronic lethargy by delivering raw physical vitality.",
      emotional: "Banishes dark depressive states, boosts internal self-esteem, and cultivates an enthusiastic, positive outlook on life.",
      spiritual: "Amplifies manifestation intent, strengthens personal willpower, and aligns your personal power center with universal abundance cycles."
    }
  },
  "black-tourmaline": {
    name: "Black Tourmaline",
    tagline: "Shielding Protection & Root Grounding",
    description: "Erect a spiritual shield around your aura. Black Tourmaline absorbs, purifies, and repels lower energetic vibrations, grounding your life force safely into Mother Earth's ancient crust. It acts as an absolute psychic vacuum cleaner, clearing emotional toxicity and electromagnetic pollutants.",
    chakra: "Root Chakra",
    element: "Earth",
    zodiac: "Capricorn, Scorpio, Libra",
    origin: "Brazil, Africa, United States",
    color: "107, 114, 128", // Silver/Grey
    image: blackTourmalineImg,
    healing: {
      physical: "Neutralizes electromagnetic frequencies (EMFs) from devices, strengthens adrenal glands, and relieves spinal tension.",
      emotional: "Replaces toxic paranoia, heavy anxiety, and fear-based reactions with cool, calm, and grounded logical clear-headedness.",
      spiritual: "Secures your spiritual essence during deep astral travels, anchors your grounding cord, and purifies surrounding dark fields."
    }
  }
};

export default function StoneDetail() {
  const { stoneId } = useParams();
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stoneId]);

  const stone = stonesData[stoneId];

  if (!stone) {
    return (
      <div className="relative min-h-screen grid place-items-center bg-background px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={50} />
        </div>
        <div className="text-center z-10 glass rounded-2xl p-10 max-w-md border border-gold/20 relative">
          <h2 className="font-display text-3xl text-gradient-gold mb-4">Crystal Not Found</h2>
          <p className="text-sm text-muted-foreground/80 mb-6">
            The crystal details you are seeking have drifted back into the cosmos.
          </p>
          <Link to="/" className="btn-gold rounded-full px-6 py-2.5 text-sm font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Immersive Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CosmicBackground density={80} />
      </div>

      {/* Dynamic Backlight Aura matching the crystal */}
      <div 
        className="absolute top-[30%] left-[20%] w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, rgba(${stone.color}, 0.7) 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gold/80 hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Elements
        </Link>

        {/* Dynamic Split Section */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Column: Product Shot */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[340px] lg:max-w-none flex justify-center items-center">
              
              {/* Backlight Core */}
              <div 
                className="absolute w-[220px] h-[220px] rounded-full blur-3xl opacity-40 animate-pulse"
                style={{ backgroundColor: `rgba(${stone.color}, 0.8)` }}
              />

              {/* Floating Container */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <img 
                  src={stone.image} 
                  alt={stone.name} 
                  className="w-[280px] md:w-[380px] lg:w-[420px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Crystal Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex flex-col gap-6 text-left">
              
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                Celestial Gemstone
              </div>

              <h1 className="font-display text-5xl md:text-6xl tracking-wide text-gradient-gold font-semibold leading-tight">
                {stone.name}
              </h1>

              <div className="font-medium text-lg text-gold/90 italic tracking-wide">
                "{stone.tagline}"
              </div>

              <p className="text-base text-muted-foreground/90 leading-relaxed">
                {stone.description}
              </p>

              {/* Crystal Attributes Table */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-gold/10 py-6 my-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Primary Chakra</div>
                  <div className="text-sm font-semibold text-foreground/90 mt-1">{stone.chakra}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Healing Element</div>
                  <div className="text-sm font-semibold text-foreground/90 mt-1">{stone.element}</div>
                </div>
                <div className="mt-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Resonating Zodiac</div>
                  <div className="text-sm font-semibold text-foreground/90 mt-1">{stone.zodiac}</div>
                </div>
                <div className="mt-2">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Geological Origin</div>
                  <div className="text-sm font-semibold text-foreground/90 mt-1">{stone.origin}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Healing Grid */}
        <div className="grid gap-6 md:grid-cols-3 mt-16">
          
          <div className="card-plum rounded-2xl p-7 hover:border-gold/35 transition-all">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-5 shadow-[0_0_15px_rgba(216,182,122,0.2)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl text-gradient-gold mb-3">Physical Rejuvenation</h3>
            <p className="text-sm leading-relaxed text-muted-foreground/80">{stone.healing.physical}</p>
          </div>

          <div className="card-violet rounded-2xl p-7 hover:border-gold/35 transition-all">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-5 shadow-[0_0_15px_rgba(216,182,122,0.2)]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl text-gradient-gold mb-3">Emotional Calming</h3>
            <p className="text-sm leading-relaxed text-muted-foreground/80">{stone.healing.emotional}</p>
          </div>

          <div className="card-glass rounded-2xl p-7 hover:border-gold/35 transition-all">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-5 shadow-[0_0_15px_rgba(216,182,122,0.2)]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl text-gradient-gold mb-3">Spiritual Activation</h3>
            <p className="text-sm leading-relaxed text-muted-foreground/80">{stone.healing.spiritual}</p>
          </div>

        </div>

        {/* Healing Session Call to Action (Dynamic pre-filled booking links) */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl glass-strong border border-gold/35 p-8 md:p-12 text-center">
            
            <div 
              className="absolute -top-32 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: `rgba(${stone.color}, 0.5)` }}
            />
            <div 
              className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full blur-3xl opacity-25"
              style={{ backgroundColor: `rgba(${stone.color}, 0.5)` }}
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
              <Gem className="w-10 h-10 text-gold mb-2 shadow-[0_0_20px_rgba(216,182,122,0.4)] animate-bounce" />
              <h2 className="font-display text-3xl md:text-4xl text-gradient-gold leading-tight">
                Align Your Aura With {stone.name}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed max-w-lg">
                Book a dedicated Crystal Healing & Chakra Alignment consultation. Harness the tailored frequencies of {stone.name} to dissolve blocks and invite radiant light.
              </p>
              
              <Link 
                to={`/booking?crystal=${stoneId}`} 
                className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide inline-flex items-center gap-2 mt-4 hover:scale-105 transition-transform"
              >
                Schedule Alignment Session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
