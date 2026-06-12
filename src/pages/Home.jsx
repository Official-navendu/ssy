import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { ArrowRight, Sparkles, Quote, PlayCircle, Compass, Award, Heart, ShieldCheck, Clock, ChevronRight, X, Play, Pause, Volume2, VolumeX, Moon, Gem } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { services, testimonials, trust } from "@/data/data";
import { BentoCard } from "@/components/common/BentoCard";
import { StonesShowcase } from "@/components/home/StonesShowcase";
import aboutPreviewImg from "@/assets/images/about_preview.png";
import testimonialClientImg from "@/assets/images/testimonial_client.webp";
import whyChooseUsPremiumImg from "@/assets/images/why_choose_us_premium.png";
import galleryTarot1 from "@/assets/images/gallery_tarot_1.png";
import galleryTarot2 from "@/assets/images/gallery_tarot_2.png";
import galleryTarot3 from "@/assets/images/gallery_tarot_3.png";
import galleryTarot4 from "@/assets/images/gallery_tarot_4.png";

// Import premium spiritual image showcase assets
import heroAstrologyImg from "@/assets/images/hero_astrology.png";
import heroTarotImg from "@/assets/images/hero_tarot.png";
import heroHealingImg from "@/assets/images/hero_healing.png";
import heroPortalImg from "@/assets/images/hero_portal.png";

import serviceTarot from "@/assets/images/service_tarot.png";
import serviceHealing from "@/assets/images/service_healing.png";
import serviceChakra from "@/assets/images/service_chakra.png";

const serviceImages = {
  "1on1-power-tarot": serviceTarot,
  "advanced-aura-healing": serviceHealing,
  "tarot-healing-chakra": serviceChakra,
};

const serviceAuras = {
  "1on1-power-tarot": "from-[#D8B67A]/25 to-[#242032]/10",
  "advanced-aura-healing": "from-[#332845]/20 via-[#242032]/15 to-[#D8B67A]/10",
  "tarot-healing-chakra": "from-[#D8B67A]/20 via-[#332845]/15 to-[#1A1722]",
};

const HERO_SLIDES = [
  {
    id: 0,
    img: heroAstrologyImg,
    label: "Overview",
    heading: "Find Clarity, Healing & Direction For Your Life",
    subtitle: "Personalized one-on-one guidance designed to help you gain clarity, overcome emotional and energetic blockages, understand your current situation, and move forward with confidence through intuitive tarot insights, healing practices, and transformational support.",
    ctaText: "Book Consultation",
    ctaLink: "/booking",
    secCtaText: "Explore Services",
    secCtaLink: "/services"
  },
  {
    id: 1,
    img: heroTarotImg,
    label: "Tarot Reading",
    heading: "1-On-1 Power Tarot Reading Session",
    subtitle: "Deep clarity, timing guidance, relationship insights, remedies, and practical direction for your most important life questions.",
    ctaText: "Book Consultation",
    ctaLink: "/booking",
    secCtaText: "Explore Services",
    secCtaLink: "/services"
  },
  {
    id: 2,
    img: heroHealingImg,
    label: "Energy Healing",
    heading: "Advanced Aura Healing & Energy Protection",
    subtitle: "Restore energetic balance, release emotional heaviness, strengthen your aura, and reconnect with inner peace.",
    ctaText: "Book Consultation",
    ctaLink: "/booking",
    secCtaText: "Explore Services",
    secCtaLink: "/services"
  },
  {
    id: 3,
    img: heroPortalImg,
    label: "Chakra Healing",
    heading: "Chakra Diagnosis & Alignment",
    subtitle: "Identify energetic imbalances, understand blocked chakras, and receive guidance for restoring harmony and flow.",
    ctaText: "Book Consultation",
    ctaLink: "/booking",
    secCtaText: "Explore Services",
    secCtaLink: "/services"
  },
  {
    id: 4,
    img: heroAstrologyImg,
    label: "Premium Session",
    heading: "Premium Transformation Experience",
    subtitle: "A complete private experience combining tarot reading, healing, chakra diagnosis, and personalized guidance.",
    ctaText: "Book Consultation",
    ctaLink: "/booking",
    secCtaText: "Explore Services",
    secCtaLink: "/services"
  }
];

function renderHeading(heading) {
  if (heading.includes("Clarity, Healing")) {
    return (
      <>
        Find <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(216,182,122,0.25)]">Clarity, Healing</span>
        <br /> & Direction For Your Life
      </>
    );
  }
  if (heading.includes("Power Tarot")) {
    return (
      <>
        1-On-1 <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(216,182,122,0.25)]">Power Tarot Reading</span>
        <br /> Session
      </>
    );
  }
  if (heading.includes("Aura Healing")) {
    return (
      <>
        Advanced <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(216,182,122,0.25)]">Aura Healing</span>
        <br /> & Energy Protection
      </>
    );
  }
  if (heading.includes("Chakra Diagnosis")) {
    return (
      <>
        <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(216,182,122,0.25)]">Chakra Diagnosis</span>
        <br /> & Alignment
      </>
    );
  }
  if (heading.includes("Transformation Experience")) {
    return (
      <>
        Premium <span className="text-gradient-cosmic text-shadow-[0_0_35px_rgba(216,182,122,0.25)]">Transformation</span>
        <br /> Experience
      </>
    );
  }
  return heading;
}

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const galleryVideos = [
  {
    id: 1,
    title: "Timeline & Remedies Guide",
    desc: "Decrypting active cosmic timelines and spiritual remedies.",
    url: "/videos/video1.mp4",
    thumbnail: galleryTarot1,
    instagramUrl: "https://www.instagram.com/reel/DYsPv_Mx_ew/?igsh=OG4xbnpyNXR5dng1"
  },
  {
    id: 2,
    title: "Chakra Scan & Aura Cleansing",
    desc: "Purifying stagnant energies and restoring vital force.",
    url: "/videos/video2.mp4",
    thumbnail: galleryTarot2,
    instagramUrl: "https://www.instagram.com/reel/DYpu3TfxKLH/?igsh=cnYzcTFud3FlaWpr"
  },
  {
    id: 3,
    title: "Spiritual Alignment Rituals",
    desc: "Vedic lineage meets modern intuitive tarot guidance.",
    url: "/videos/video3.mp4",
    thumbnail: galleryTarot3,
    instagramUrl: "https://www.instagram.com/reel/DYQCN8jRsxo/?igsh=NXQ0a282aDRpcmx6"
  },
  {
    id: 4,
    title: "Universal Peace & Guidance",
    desc: "Sacred spaces for personal clarity and self-realization.",
    url: "/videos/video4.mp4",
    thumbnail: galleryTarot4,
    instagramUrl: "https://www.instagram.com/reel/DXrwuKGkWK9/?igsh=MTYyamNkdWJlMjR6Zw=="
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const chooseUsFeatures = useMemo(() => [
    { title: "Personalized Guidance", desc: "Consultations aligned to your unique birth charts & flow.", icon: Sparkles, emoji: "✨" },
    { title: "Premium Tarot Reading", desc: "Identify active timelines and precise remedies.", icon: Compass, emoji: "🔮" },
    { title: "Healing & Energy Work", icon: Heart, desc: "Chakra scan, Reiki clearance, and cord cutting.", emoji: "💎" },
    { title: "Worldwide Online Sessions", icon: Compass, desc: "Connect securely from any location globally.", emoji: "🌎" },
    { title: "Confidential Support", icon: ShieldCheck, desc: "Consultations held in absolute sacred trust & privacy.", emoji: "🕊" },
    { title: "Premium Experience", icon: Award, desc: "High-end luxury spiritual sanctuary environment.", emoji: "🌟" }
  ], []);

  // States for Video Gallery Section
  const [activeGalleryVideo, setActiveGalleryVideo] = useState(null);
  const [galleryVideoPlaying, setGalleryVideoPlaying] = useState(true);
  const [galleryVideoMuted, setGalleryVideoMuted] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState(0);
  const galleryModalVideoRef = useRef(null);
  const videoRefs = useRef([]);

  // States for Path of Intuition Tarot Section
  const [intuitionPhase, setIntuitionPhase] = useState("spread");
  const [intuitionRevealStep, setIntuitionRevealStep] = useState(-1);
  const [isIntuitionHovered, setIsIntuitionHovered] = useState(false);
  const [intuitionMousePos, setIntuitionMousePos] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const intuitionTimeoutRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(1024);
  const useRefInstance = useRef(null);

  const quotes = [
    "Trust Yourself",
    "Your Journey Matters",
    "Healing Begins Within",
    "Follow Your Intuition"
  ];

  const handleIntuitionMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setIntuitionMousePos({ x, y, rawX: e.clientX - rect.left, rawY: e.clientY - rect.top });
  };

  const toggleGalleryPlay = () => {
    const video = galleryModalVideoRef.current;
    if (!video) return;
    if (galleryVideoPlaying) {
      video.pause();
      setGalleryVideoPlaying(false);
    } else {
      video.play();
      setGalleryVideoPlaying(true);
    }
  };

  const toggleGalleryMute = () => {
    const video = galleryModalVideoRef.current;
    if (!video) return;
    video.muted = !galleryVideoMuted;
    setGalleryVideoMuted(!galleryVideoMuted);
  };

  const handleGalleryTimeUpdate = () => {
    const video = galleryModalVideoRef.current;
    if (!video) return;
    const current = (video.currentTime / video.duration) * 100;
    setGalleryProgress(current || 0);
  };

  const handleGalleryProgressBarClick = (e) => {
    const video = galleryModalVideoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration;
    setGalleryProgress(percentage * 100);
  };

  const getIntuitionCardStyles = (index, phase, width, mousePos, revealStep) => {
    const isSmall = width < 640;
    const isMedium = width < 768;

    let baseX = (index - 1) * 120;
    let baseY = 0;
    let baseRotate = 0;

    if (isSmall) {
      baseX = (index - 1) * 34;
      baseY = Math.abs(index - 1) * 8;
      baseRotate = (index - 1) * 3.5;
    } else if (isMedium) {
      baseX = (index - 1) * 75;
      baseY = Math.abs(index - 1) * 5;
      baseRotate = (index - 1) * 4.5;
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
        rotate: (index - 1) * 1,
        rotateX: mousePos.y * -8,
        rotateY: mousePos.x * 8,
        scale: 1.02,
        zIndex: 10 + index,
        opacity: 1
      };
    }

    if (phase === "shuffle") {
      const direction = index === 0 ? -1 : index === 2 ? 1 : 0;
      const shuffleAmt = isSmall ? 65 : 120;
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

    if (phase === "reveal") {
      const isFlipped = revealStep >= index;
      return {
        x: baseX + mousePos.x * 20,
        y: baseY - (isFlipped ? 12 : 0) + mousePos.y * 20,
        rotate: baseRotate + mousePos.x * 4,
        rotateX: mousePos.y * -10,
        rotateY: isFlipped ? 180 : 0,
        scale: isFlipped ? 1.06 : 1,
        zIndex: isFlipped ? 60 + index : 10 + index,
        opacity: 1
      };
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

  // Auto-scroll loop every 7 seconds for a calmer cinematic pacing
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Synchronize modal state when opened
  useEffect(() => {
    if (activeGalleryVideo) {
      setGalleryVideoPlaying(true);
      setGalleryVideoMuted(false);
      setTimeout(() => {
        if (galleryModalVideoRef.current) {
          galleryModalVideoRef.current.muted = false;
          galleryModalVideoRef.current.play().catch(err => console.log(err));
        }
      }, 150);
    }
  }, [activeGalleryVideo]);

  // ESC key listener to close video modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveGalleryVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Intersection Observer to pause/play videos when they enter/leave viewport
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    const currentRefs = videoRefs.current;
    currentRefs.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      currentRefs.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [galleryVideos]);

  // Window size listener
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

  // Quotes cycle on Right side of Path of Intuition
  useEffect(() => {
    const qInterval = setInterval(() => {
      setActiveQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(qInterval);
  }, []);

  // Tarot deal loop sequence for Path of Intuition
  useEffect(() => {
    const runSequence = () => {
      setIntuitionPhase("spread");
      setIntuitionRevealStep(-1);

      intuitionTimeoutRef.current = setTimeout(() => {
        setIntuitionPhase("stack");

        intuitionTimeoutRef.current = setTimeout(() => {
          setIntuitionPhase("shuffle");

          intuitionTimeoutRef.current = setTimeout(() => {
            setIntuitionPhase("rotate");

            intuitionTimeoutRef.current = setTimeout(() => {
              setIntuitionPhase("reveal");
              setIntuitionRevealStep(0);

              intuitionTimeoutRef.current = setTimeout(() => {
                setIntuitionRevealStep(1);

                intuitionTimeoutRef.current = setTimeout(() => {
                  setIntuitionRevealStep(2);

                  intuitionTimeoutRef.current = setTimeout(() => {
                    setIntuitionPhase("return");
                    
                    intuitionTimeoutRef.current = setTimeout(() => {
                      runSequence();
                    }, 1500);
                  }, 3000); // Hold all face-up
                }, 1800); // Deal 3rd
              }, 1800); // Deal 2nd
            }, 2000); // rotate duration
          }, 3500); // shuffle duration
        }, 1500); // stack duration
      }, 4500); // spread duration
    };

    runSequence();

    return () => {
      if (intuitionTimeoutRef.current) clearTimeout(intuitionTimeoutRef.current);
    };
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
          <div className="absolute h-[380px] w-[380px] sm:h-[680px] sm:w-[680px] rounded-full border border-gold/15 animate-spin-slow" style={{ animationDuration: "50s" }} />
          {/* Dashed Gold Orbit Ring */}
          <div className="absolute h-[320px] w-[320px] sm:h-[620px] sm:w-[620px] rounded-full border border-dashed border-gold/15 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "35s" }} />
          {/* Sapphire Energy Ring */}
          <div className="absolute h-[280px] w-[280px] sm:h-[520px] sm:w-[520px] rounded-full border border-sapphire/10 animate-spin-slow" style={{ animationDuration: "25s" }} />
          {/* Fine Outer Gold Ring */}
          <div className="absolute h-[240px] w-[240px] sm:h-[420px] sm:w-[420px] rounded-full border border-gold/5 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "60s" }} />
        </div>

        {/* Cinematic Dark Overlay Layer (z-10) */}
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

        {/* Hero Content Layer (z-20) */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Hero content */}
            <div className="col-span-1 lg:col-span-6 min-h-[340px] lg:min-h-[380px] flex flex-col justify-center relative">
              {/* Cinematic Divine Text Spotlights */}
              <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sapphire/12 blur-[100px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "8s" }} />
              <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-gold/6 blur-[80px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "12s" }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="flex flex-col items-start text-left"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-gold text-glow-subtle text-center whitespace-normal">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse text-gold" />
                    Private Spiritual Guidance • Tarot • Healing • Transformation
                  </span>


                  <h1 className="mt-4 font-display text-2xl leading-[1.35] md:text-3xl lg:text-[2.2rem] tracking-[0.08em] font-medium text-glow-portal text-foreground uppercase">
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

              {/* Trust Statement */}
              <div className="mt-6 text-[10px] sm:text-xs tracking-wider text-muted-foreground/60 uppercase font-light font-sans text-glow-subtle">
                Private Sessions Available Worldwide • Personalized Guidance • Confidential Consultations
              </div>
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
                <div className="absolute -inset-4 bg-gradient-to-tr from-sapphire/15 via-[#151B26]/25 to-gold/8 rounded-2xl blur-3xl opacity-60 pointer-events-none" />

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full h-[320px] sm:h-[380px] lg:h-[410px]">
                  
                  {/* Large Main Image with Auto Carousel */}
                  <div className="relative w-full sm:flex-1 h-[260px] sm:h-full rounded-2xl overflow-hidden border border-gold/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-[#0D1117]/40 backdrop-blur-sm group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/85 via-[#0D1117]/20 to-transparent z-10 pointer-events-none" />
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeSlide}
                        src={HERO_SLIDES[activeSlide].img}
                        alt={HERO_SLIDES[activeSlide].label}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1.02 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Minimal Corner badge */}
                    <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold/90 text-glow-subtle bg-[#151B26]/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/15">
                        {HERO_SLIDES[activeSlide].label}
                      </span>
                    </div>

                    {/* Corner highlights */}
                    <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/45 pointer-events-none z-20" />
                    <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/45 pointer-events-none z-20" />
                    <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/45 pointer-events-none z-20" />
                    <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/45 pointer-events-none z-20" />
                  </div>

                  {/* 5 Smaller Side Images */}
                  <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-[90px] md:w-[100px] shrink-0 justify-between h-[70px] sm:h-full">
                    {HERO_SLIDES.map((slide, idx) => {
                      const isActive = idx === activeSlide;
                      return (
                        <button
                          key={slide.id}
                          onClick={() => setActiveSlide(idx)}
                          className={`relative flex-1 sm:flex-initial sm:w-full sm:h-[18%] h-full rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer group ${
                            isActive
                              ? "border-gold bg-gold/15 shadow-[0_0_20px_rgba(216,182,122,0.4)] scale-105 z-20"
                              : "border-gold/15 hover:border-gold/45 bg-[#0D1117]/45 hover:scale-102"
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
                          <div className="absolute inset-0 bg-[#0D1117]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-1 text-[8px] font-bold text-gold text-center leading-tight uppercase tracking-widest z-20">
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
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold/30 to-sapphire/35 text-gold">
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
        <div className="mx-auto mt-14 grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
          {services.map((s, i) => {
            const imgPath = serviceImages[s.slug];
            const auraColor = serviceAuras[s.slug] || "from-sapphire/20 to-gold/10";

            return (
              <Reveal key={s.slug} delay={i * 0.06}>
                <motion.div
                  whileHover={{ 
                    y: -10,
                    rotateY: i % 2 === 0 ? 2 : -2,
                    rotateX: 1,
                    scale: 1.01
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`relative group rounded-[28px] overflow-hidden transition-all duration-500 hover:shadow-gold hover:border-gold flex flex-col h-full ${
                    i % 3 === 0 ? "card-gold/5" : (i % 3 === 1 ? "card-sapphire/5" : "card-glass")
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
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-black/20 pointer-events-none" />
                    
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
                    <div className="space-y-3 text-left">
                      {/* Meta duration info */}
                      <div className="flex items-center gap-1.5 text-[10px] text-gold font-semibold uppercase tracking-widest">
                        <Clock className="h-3.5 w-3.5" /> {s.duration}
                      </div>

                      {/* Card Title */}
                      <h3 className="font-display text-lg md:text-xl text-foreground/95 group-hover:text-gold transition-colors duration-300 uppercase tracking-wide leading-snug">
                        {s.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs italic font-medium text-gold/85 tracking-wide">
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
                         onClick={() => navigate("/services", { state: { openService: s.slug } })}
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
      </section>

      {/* STONES SHOWCASE */}
      <StonesShowcase />

      {/* PATH OF INTUITION TAROT SPREAD */}
      <section 
        ref={useRefInstance}
        onMouseMove={handleIntuitionMouseMove}
        onMouseEnter={() => setIsIntuitionHovered(true)}
        onMouseLeave={() => {
          setIsIntuitionHovered(false);
          setIntuitionMousePos({ x: 0, y: 0, rawX: 0, rawY: 0 });
        }}
        className="relative py-24 overflow-hidden border-t border-gold/10 bg-background/20"
      >
        {/* Mystic Table Background Elements - Galaxy cosmic layer */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <CosmicBackground density={35} />
        </div>
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-25 z-0" />
        <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sapphire/10 blur-[100px] rounded-full -z-10 animate-pulse" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/3 blur-[90px] rounded-full -z-10 animate-pulse" />

        <div className="relative mx-auto max-w-6xl px-6 md:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT SIDE: Interactive Tarot Card Spread */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[420px] relative">
              {/* Table Cloth Rim Glow */}
              <div className="pointer-events-none absolute h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] rounded-full border border-gold/10 bg-black/10 backdrop-blur-[2px] shadow-[inset_0_0_30px_rgba(216,182,122,0.05)] flex items-center justify-center -z-10 animate-spin-slow" style={{ animationDuration: '60s' }} />

              <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center">
                {[
                  { name: "Past", quote: "Trust Yourself", desc: "Foundational Wisdom" },
                  { name: "Present", quote: "Your Journey Matters", desc: "Active Alignment" },
                  { name: "Future", quote: "Follow Your Intuition", desc: "Unfolding Pathway" }
                ].map((card, idx) => {
                  const cardStyles = getIntuitionCardStyles(idx, intuitionPhase, windowWidth, intuitionMousePos, intuitionRevealStep);
                  return (
                    <motion.div
                      key={idx}
                      style={{ transformStyle: "preserve-3d" }}
                      animate={cardStyles}
                      transition={{
                        type: "spring",
                        damping: 22,
                        stiffness: 100,
                        mass: 1.2,
                        ...(intuitionPhase === "shuffle" ? { duration: 3.5, ease: "easeInOut" } : {})
                      }}
                      className="absolute w-[130px] h-[200px] sm:w-[160px] sm:h-[250px] cursor-pointer"
                    >
                      {/* Back Face of Card */}
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] border border-gold/30 bg-gradient-to-b from-[#151B26] to-[#0D1117] p-3 shadow-[0_12px_28px_rgba(0,0,0,0.8)] hover:border-gold/60 transition-colors duration-300 select-none"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        {/* Corner Accents */}
                        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/30" />
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/30" />
                        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/30" />
                        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/30" />
                        <div className="absolute inset-1 rounded-xl border border-gold/5" />

                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 bg-black/20">
                          <Moon className="h-4.5 w-4.5 text-gold" />
                        </div>
                        <div className="mt-3 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
                        <span className="mt-3 text-[8px] uppercase tracking-[0.2em] text-gold/50 font-medium">
                          Spiritual Yatri
                        </span>
                      </div>

                      {/* Front Face of Card */}
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] border border-gold/50 bg-gradient-to-b from-[#0D1117] via-[#151B26] to-[#0D1117]/40 p-4 shadow-[0_15px_35px_rgba(216,182,122,0.15)] text-center select-none"
                        style={{
                          transform: "rotateY(180deg)",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        {/* Corner Accents */}
                        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold/45" />
                        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold/45" />
                        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold/45" />
                        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold/45" />
                        <div className="absolute inset-1 rounded-xl border border-gold/5" />

                        <Sparkles className="h-4.5 w-4.5 text-gold animate-pulse" />
                        <h4 className="mt-2.5 font-display text-[10px] sm:text-xs text-gold uppercase tracking-[0.2em]">
                          {card.name}
                        </h4>
                        <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                        
                        <p className="mt-3 text-[10px] sm:text-xs text-foreground font-serif leading-relaxed italic max-w-[110px] sm:max-w-[130px] px-1">
                          "{card.quote}"
                        </p>
                        
                        <span className="absolute bottom-3 text-[7px] sm:text-[8px] uppercase tracking-wider text-muted-foreground/60 font-sans">
                          {card.desc}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: Content & Cyclical Quotes */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 lg:pl-8">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold text-glow-subtle">
                <Sparkles className="h-3.5 w-3.5 text-gold animate-spin-slow" /> The Path of Intuition
              </span>
              
              <h2 className="font-display text-3xl md:text-5xl text-foreground uppercase tracking-wider font-medium leading-tight">
                Align Your Inner <span className="text-gradient-gold">Timeline Coordinates</span>
              </h2>
              
              <p className="text-xs md:text-sm text-muted-foreground/80 italic font-serif leading-relaxed tracking-wider">
                "The cards reveal what words cannot."
              </p>

              <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/75 font-light tracking-wide font-sans">
                Intuition is the whispering guide of the cosmos, connecting our history, presence, and upcoming pathways. Observe the rhythmic shuffling of the temporal keys on the left, alignment maps that anchor your core awareness. Let Shivani decode the timeline signals for you.
              </p>

              {/* Cycling Quote Display Box */}
              <div className="h-16 flex items-center rounded-xl border border-gold/15 bg-[#0D1117]/60 px-5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3 w-full">
                  <Gem className="h-4.5 w-4.5 text-gold shrink-0 animate-pulse" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeQuoteIdx}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="text-xs sm:text-sm text-foreground/95 font-serif font-medium tracking-wide uppercase"
                    >
                      ✨ {quotes[activeQuoteIdx]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Mini CTA Button */}
              <div className="pt-2">
                <Link 
                  to="/booking" 
                  className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-widest btn-premium-glow shadow-[0_0_15px_rgba(216,182,122,0.12)] hover:shadow-[0_0_25px_rgba(216,182,122,0.25)] transition-all cursor-pointer overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  Discover Your Spread
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

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
              <div className="absolute -inset-4 bg-gradient-to-tr from-sapphire/25 via-[#0D1117]/20 to-gold/20 rounded-[2.5rem] blur-3xl opacity-60 group-hover/about:opacity-85 transition-opacity duration-700 pointer-events-none" />

              {/* Slow Spinning Gold-Sapphire Halo */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-gold via-sapphire/25 to-gold/20 opacity-40 blur-md animate-spin-slow group-hover/about:opacity-60 transition-all duration-700 -z-10" />

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
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-sapphire/8 pointer-events-none" />
                
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
      <section className="relative py-24 overflow-hidden border-t border-gold/10 bg-background/30">
        {/* Subtle decorative orbits/lights in bg */}
        <div className="pointer-events-none absolute left-10 top-1/2 w-80 h-80 rounded-full border border-gold/5 blur-[2px] -z-10" />
        <div className="pointer-events-none absolute right-10 bottom-10 w-96 h-96 rounded-full border border-sapphire/5 blur-[2px] -z-10" />

        <div className="relative mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT SIDE: Premium Realistic Image Section */}
            <div className="flex justify-center w-full">
              <Reveal>
                <div 
                  className="relative w-full max-w-sm aspect-[4/5] group/why-img animate-float-slow"
                  style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                >
                  {/* Subtle Glow Aura */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-sapphire/25 via-transparent to-gold/15 rounded-[2.5rem] blur-3xl opacity-60 group-hover/why-img:opacity-85 transition-opacity duration-700 pointer-events-none" />

                  {/* Glassmorphic Frame with Luxury Corners, Border, Glow, Reflection */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-gold/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(216,182,122,0.25)] bg-[#0D1117]/30 backdrop-blur-sm transition-all duration-700 group-hover/why-img:border-gold/60">
                    <img
                      src={whyChooseUsPremiumImg}
                      alt="Sacred Tarot Table Setting"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/why-img:scale-105"
                    />
                    
                    {/* Glass Reflection sweep effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover/why-img:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />

                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/45 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/45 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/45 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/45 pointer-events-none" />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT SIDE: Heading, Description, Feature Cards, CTA */}
            <div className="flex flex-col text-left space-y-6 w-full">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Sacred Pillars
              </span>
              
              <h2 className="font-display text-3xl md:text-5xl text-foreground uppercase tracking-wider font-medium leading-tight">
                Why Choose <span className="text-gradient-gold">Shivani Spiritual Yatri</span>
              </h2>
              
              <p className="text-xs md:text-sm text-muted-foreground/80 italic font-serif leading-relaxed tracking-wider">
                Guiding souls with authentic spiritual wisdom, energy healing, and cosmic clarity.
              </p>

              <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/75 font-light tracking-wide font-sans">
                Shivani Spiritual Yatri is a sanctuary built on authentic Vedic wisdom, master-certified energy healing lineages, and zero-fluff intuitive tarot guidance. We create a compassionate space to decrypt your path, clear heavy blockages, and elevate your life path coordinates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {chooseUsFeatures.map((f, idx) => (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <motion.div
                      whileHover={{ y: -3, scale: 1.01 }}
                      className={`group relative rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] flex gap-4 h-full ${
                        idx % 3 === 0 ? "card-gold/5" : (idx % 3 === 1 ? "card-sapphire/5" : "card-glass")
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0D1117]/90 border border-gold/15 text-gold/80 group-hover:text-gold group-hover:border-gold/45 group-hover:scale-105 transition-all duration-500">
                        <f.icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground/90 group-hover:text-gold transition-colors uppercase tracking-wider">
                          {f.emoji} {f.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground/80 font-light leading-relaxed mt-1 font-sans">
                          {f.desc}
                        </span>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VIDEO GALLERY SECTION */}
      <section className="relative py-20 bg-background/50 border-t border-gold/10">
        <div className="relative mx-auto max-w-6xl px-6 md:px-8">
          
          <SectionHeading
            eyebrow="Sacred Moments"
            title={<>Spiritual Insights & <span className="text-gradient-gold">Moments</span></>}
            subtitle="Watch guidance, healing moments, and spiritual inspiration."
          />

          <div className="mx-auto mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {galleryVideos.map((vid, idx) => (
              <Reveal key={vid.id} delay={idx * 0.06}>
                <div 
                  onClick={() => {
                    setActiveGalleryVideo(vid);
                  }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 flex flex-col h-full animate-float-slow ${
                    idx % 3 === 0 ? "card-gold/5" : (idx % 3 === 1 ? "card-sapphire/5" : "card-glass")
                  }`}
                  style={{ animationDelay: `${idx * 1.5}s` }}
                >
                  {/* Decorative corner highlights */}
                  <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-gold/20 group-hover:border-gold/50 transition-colors pointer-events-none z-20" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-gold/20 group-hover:border-gold/50 transition-colors pointer-events-none z-20" />
                  
                  {/* Video Preview Aspect Box - Vertical 9:16 layout */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden border-b border-gold/15 bg-black/60">
                    <video
                      ref={(el) => (videoRefs.current[idx] = el)}
                      src={vid.url}
                      poster={vid.thumbnail}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      style={{ willChange: "transform", transform: "translateZ(0)" }}
                    />
                    
                    {/* Glowing Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none z-10" />

                    {/* Instagram badge overlay */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/15 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3 text-gold">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </div>

                    {/* Duration badge overlay */}
                    <div className="absolute top-4 right-4 z-20 rounded-full bg-black/60 border border-white/15 px-2 py-1 text-[9px] font-mono font-semibold text-white/90 backdrop-blur-sm">
                      0:15
                    </div>

                    {/* Central Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-black/25">
                      <div className="h-12 w-12 rounded-full border border-gold/40 bg-black/55 text-gold flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-gold transition-all duration-300 shadow-lg">
                        <PlayCircle className="h-6 w-6 fill-gold/10 text-gold" />
                      </div>
                    </div>

                    {/* Text Description inside card, sliding up or pinned at bottom */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-20 bg-gradient-to-t from-black via-black/95 to-transparent flex flex-col justify-end text-left min-h-[120px]">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gold/90">
                        Reel • Insight {vid.id}
                      </span>
                      <h4 className="font-display text-base text-foreground/95 group-hover:text-gold transition-colors font-medium mt-1 leading-snug">
                        {vid.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-light mt-1.5 font-sans line-clamp-2">
                        {vid.desc}
                      </p>
                    </div>

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
              {/* Glowing Sapphire Aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sapphire/20 to-gold/20 rounded-3xl blur-2xl opacity-60 group-hover/testimonial-img:opacity-85 transition-opacity duration-700 pointer-events-none" />

              {/* Luxury Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/35 shadow-[0_15px_40px_rgba(0,0,0,0.6)] bg-[#0D1117]/35 backdrop-blur-md transition-all duration-700 group-hover/testimonial-img:border-gold/60 group-hover/testimonial-img:shadow-gold/25">
                <img
                  src={testimonialClientImg}
                  alt="Spiritual Yatri Testimonial Serenity"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/testimonial-img:scale-[1.04]"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-[#0D1117]/15 to-transparent pointer-events-none" />

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
                    <BentoCard className="card-sapphire/5 rounded-2xl p-7 pb-12">
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
      <section className="relative w-full border-t border-b border-gold/15 bg-gradient-to-r from-[#0D1117]/90 via-[#151B26]/95 to-[#0D1117]/90 py-16 md:py-20 overflow-hidden">
        {/* Background ambient spotlight glows */}
        <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sapphire/8 blur-[110px] rounded-full -z-10 animate-pulse" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/3 blur-[90px] rounded-full -z-10 animate-pulse" />

        {/* Rotating orbit rings layer (z-0) */}
        <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.04] flex items-center justify-center z-0 select-none scale-125">
          <div 
            className="h-[400px] w-[400px] rounded-full border border-dashed border-gold animate-spin-slow" 
            style={{ animationDuration: "40s", willChange: "transform", transform: "translateZ(0)" }} 
          />
          <div 
            className="absolute h-[320px] w-[320px] rounded-full border border-gold animate-spin-slow" 
            style={{ animationDirection: "reverse", animationDuration: "25s", willChange: "transform", transform: "translateZ(0)" }} 
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
          <BentoCard className="w-full card-gold/5 p-8 md:p-12 bg-gradient-to-b from-[#151B26] to-[#0D1117]" glowColor="rgba(216, 182, 122, 0.15)">
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
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest btn-premium-glow shadow-[0_0_20px_rgba(216,182,122,0.15)] hover:shadow-[0_0_30px_rgba(216,182,122,0.35)] transition-all cursor-pointer text-center"
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

      {/* PREMIUM VIDEO GALLERY POPUP MODAL */}
      <AnimatePresence>
        {activeGalleryVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActiveGalleryVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold/30 bg-[#0D1117]/98 p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Border corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/40 pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold/40 pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold/40 pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/40 pointer-events-none z-10" />

              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10 bg-[#0D1117]/90">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                  <h3 className="font-display text-xs md:text-sm font-semibold tracking-wider text-foreground uppercase">
                    {activeGalleryVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveGalleryVideo(null)}
                  className="rounded-full bg-black/40 border border-gold/20 p-2 text-muted-foreground hover:text-gold hover:border-gold/60 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Video Area */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-black flex items-center justify-center max-h-[65vh]">
                <video
                  ref={galleryModalVideoRef}
                  src={activeGalleryVideo.url}
                  loop
                  playsInline
                  autoPlay
                  muted={galleryVideoMuted}
                  onTimeUpdate={handleGalleryTimeUpdate}
                  onClick={toggleGalleryPlay}
                  className="h-full w-full object-contain cursor-pointer"
                />
              </div>

              {/* Control bar */}
              <div className="flex flex-col gap-3 px-6 py-4 bg-[#0D1117]/95 border-t border-gold/10">
                {/* Progress bar */}
                <div 
                  onClick={handleGalleryProgressBarClick}
                  className="group relative h-1.5 w-full cursor-pointer rounded-full bg-white/10 transition-all hover:h-2"
                >
                  <div 
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#D8B67A] to-[#E8DCC8]"
                    style={{ width: `${galleryProgress}%` }}
                  />
                  {/* Scrubber knob */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gold border border-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${galleryProgress}% - 7px)` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  {/* Left controls: Play/Pause */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleGalleryPlay}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B2230] border border-gold/25 hover:border-gold/65 text-gold transition-all duration-300 cursor-pointer"
                    >
                      {galleryVideoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 pl-0.5" />}
                    </button>
                    
                    <div className="text-[10px] font-mono tracking-wider text-muted-foreground/80">
                      {galleryModalVideoRef.current ? (
                        <>
                          {formatTime(galleryModalVideoRef.current.currentTime)} / {formatTime(galleryModalVideoRef.current.duration || 0)}
                        </>
                      ) : (
                        "0:00 / 0:00"
                      )}
                    </div>
                  </div>

                  {/* Right controls: Mute/Unmute */}
                  <button
                    onClick={toggleGalleryMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B2230] border border-gold/25 hover:border-gold/65 text-gold transition-all duration-300 cursor-pointer"
                  >
                    {galleryVideoMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
