import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

// Import local premium crystal assets
import amethystImg from "@/assets/images/amethyst.webp";
import roseQuartzImg from "@/assets/images/rose_quartz.webp";
import citrineImg from "@/assets/images/citrine.webp";
import blackTourmalineImg from "@/assets/images/black_tourmaline.webp";


const stones = [
  {
    id: "amethyst",
    name: "Amethyst Crystal",
    tagline: "Spiritual Clarity & Intuitive Growth",
    description: "Unveil the ancient path of deep serenity and spiritual vision. Amethyst works as a natural tranquilizer, soothing stress, expanding intuitive insight, and encouraging profound spiritual wisdom.",
    benefits: [
      "Spiritual clarity & intuitive vision",
      "Deep calmness & stress dissolution",
      "Third Eye & Crown Chakra alignment"
    ],
    image: amethystImg,
    color: "139, 92, 246", // Violet
    slug: "/stones/amethyst"
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    tagline: "Infinite Love & Heart Alignment",
    description: "Open your heart to universal compassion. Rose Quartz is the ultimate stone of unconditional love, dissolving emotional blockages, healing relationships, and nurturing self-love.",
    benefits: [
      "Unconditional love & heart energy",
      "Deep emotional healing & balance",
      "Compassionate relationship harmony"
    ],
    image: roseQuartzImg,
    color: "244, 114, 182", // Pink
    slug: "/stones/rose-quartz"
  },
  {
    id: "citrine",
    name: "Citrine Stone",
    tagline: "Success, Wealth & Golden Power",
    description: "Manifest limitless abundance. Revered as the Merchant's Stone, Citrine channels solar energy to foster wealth, ignite supreme confidence, and clear negative paths for professional triumphs.",
    benefits: [
      "Success & financial abundance magnetism",
      "Positive golden energy & optimism",
      "Solar Plexus & creativity expansion"
    ],
    image: citrineImg,
    color: "234, 179, 8", // Gold
    slug: "/stones/citrine"
  },
  {
    id: "black-tourmaline",
    name: "Black Tourmaline",
    tagline: "Shielding Protection & Root Grounding",
    description: "Erect a spiritual shield around your aura. Black Tourmaline absorbs, purifies, and repels lower energetic vibrations, grounding your life force safely into Mother Earth's ancient crust.",
    benefits: [
      "Ultimate auric protection & shielding",
      "Purification of stagnant negative waves",
      "Root Chakra & absolute physical grounding"
    ],
    image: blackTourmalineImg,
    color: "107, 114, 128", // Platinum grey-silver
    slug: "/stones/black-tourmaline"
  }
];

export function StonesShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4800);
    return () => clearInterval(timer);
  }, [index, isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? stones.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === stones.length - 1 ? 0 : prev + 1));
  };

  const activeStone = stones[index];

  // Animation variants for slider slide/fades
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 24 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 24 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section className="relative py-24 overflow-hidden border-t border-gold/10">
      {/* Dynamic Aura Backlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl opacity-20 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(${activeStone.color}, 0.8) 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Sacred Elements"
          title={<>Healing Crystals & <span className="text-gradient-gold">Spiritual Stones</span></>}
          subtitle="Explore the profound cosmic frequencies stored within natural crystal matrices — handpicked to balance your energetic field."
        />

        {/* Master Slider Container */}
        <Reveal>
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group/slider relative mt-12 overflow-hidden rounded-3xl glass-strong border border-gold/25 p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(8,8,8,0.6)]"
          >
            {/* Split Grid */}
            <div className="grid gap-12 md:grid-cols-12 items-center min-h-[460px]">
              
              {/* LEFT SIDE: Content Details */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeStone.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-5 text-left"
                  >
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-medium">
                      <Sparkles className="h-3.5 w-3.5" />
                      {activeStone.tagline}
                    </div>

                    <h3 className="font-display text-4xl md:text-5xl tracking-wide text-gradient-gold font-semibold">
                      {activeStone.name}
                    </h3>

                    <p className="text-base text-muted-foreground/90 leading-relaxed max-w-xl">
                      {activeStone.description}
                    </p>

                    {/* Benefit Points */}
                    <div className="flex flex-col gap-3 my-2">
                      {activeStone.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span 
                            className="flex-shrink-0 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(212,175,55,1)]"
                            style={{ backgroundColor: `rgba(${activeStone.color}, 1)` }}
                          />
                          <span className="text-sm font-medium text-foreground/80 tracking-wide">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-4">
                      <Link 
                        to={activeStone.slug} 
                        className="group/btn inline-flex items-center gap-2.5 rounded-full btn-gold px-8 py-3.5 text-sm font-semibold tracking-wide"
                      >
                        Explore Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT SIDE: Product Image */}
              <div className="md:col-span-5 flex justify-center items-center">
                <div className="relative w-full max-w-[340px] md:max-w-none flex justify-center items-center">
                  
                  {/* Internal Crystal Backdrop Glow */}
                  <div 
                    className="absolute w-[200px] h-[200px] rounded-full blur-3xl opacity-35 animate-pulse"
                    style={{
                      backgroundColor: `rgba(${activeStone.color}, 0.7)`
                    }}
                  />

                  {/* Image Holder with smooth continuous float */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10"
                  >
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.img
                        key={activeStone.id}
                        src={activeStone.image}
                        alt={activeStone.name}
                        custom={direction}
                        initial={{ opacity: 0, scale: 0.85, rotate: direction > 0 ? 5 : -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.85, rotate: direction > 0 ? -5 : 5 }}
                        transition={{ duration: 0.5 }}
                        className="w-[240px] md:w-[320px] lg:w-[360px] h-auto object-contain drop-shadow-[0_12px_45px_rgba(0,0,0,0.6)]"
                      />
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

            </div>

            {/* Custom Interactive Chevron Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full border border-gold/20 bg-background/30 text-gold/80 backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 hover:border-gold/60 hover:text-gold hover:scale-105 active:scale-95 shadow-md shadow-black"
              aria-label="Previous crystal"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full border border-gold/20 bg-background/30 text-gold/80 backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 hover:border-gold/60 hover:text-gold hover:scale-105 active:scale-95 shadow-md shadow-black"
              aria-label="Next crystal"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
              {stones.map((stone, idx) => (
                <button
                  key={stone.id}
                  onClick={() => {
                    setDirection(idx > index ? 1 : -1);
                    setIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === index 
                      ? "w-8" 
                      : "w-2.5 bg-gold/30 hover:bg-gold/60"
                  }`}
                  style={{
                    backgroundColor: idx === index ? `rgba(${activeStone.color}, 1)` : undefined,
                    boxShadow: idx === index ? `0 0 10px rgba(${activeStone.color}, 0.8)` : undefined
                  }}
                  aria-label={`Go to crystal ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
