import { useEffect, useRef, useState } from "react";
import { VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const audioUrl = "/audio/spiritual_ambience.mp3";
  const TARGET_VOLUME = 0.12; // Luxury, subtle ambient level

  // Smooth Volume Fade In
  const fadeIn = (onSuccess) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    setIsPlaying(true);

    const startFade = () => {
      fadeIntervalRef.current = setInterval(() => {
        let currentVol = audio.volume;
        currentVol += 0.005;
        if (currentVol >= TARGET_VOLUME) {
          audio.volume = TARGET_VOLUME;
          clearInterval(fadeIntervalRef.current);
        } else {
          audio.volume = Math.min(TARGET_VOLUME, currentVol);
        }
      }, 30);
    };

    if (audio.paused) {
      audio.play()
        .then(() => {
          startFade();
          if (onSuccess) onSuccess();
        })
        .catch((err) => {
          console.log("Audio play deferred/prevented until direct interaction:", err);
          setIsPlaying(false);
        });
    } else {
      startFade();
      if (onSuccess) onSuccess();
    }
  };

  // Smooth Volume Fade Out
  const fadeOut = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeIntervalRef.current = setInterval(() => {
      let currentVol = audio.volume;
      currentVol -= 0.008;
      if (currentVol <= 0.002) {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume = Math.max(0, currentVol);
      }
    }, 30);
  };

  const handleToggle = (e) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0; // Start completely silent

    let listenersAdded = false;

    const handleFirstUserInteraction = () => {
      fadeIn(() => {
        cleanupListeners();
      });
    };

    const addListeners = () => {
      if (listenersAdded) return;
      window.addEventListener("click", handleFirstUserInteraction, { capture: true });
      window.addEventListener("touchstart", handleFirstUserInteraction, { capture: true });
      window.addEventListener("mousedown", handleFirstUserInteraction, { capture: true });
      window.addEventListener("keydown", handleFirstUserInteraction, { capture: true });
      listenersAdded = true;
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleFirstUserInteraction, { capture: true });
      window.removeEventListener("touchstart", handleFirstUserInteraction, { capture: true });
      window.removeEventListener("mousedown", handleFirstUserInteraction, { capture: true });
      window.removeEventListener("keydown", handleFirstUserInteraction, { capture: true });
      listenersAdded = false;
    };

    // Auto-play attempt (often fails due to strict browser policy, but try)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fadeIn();
        })
        .catch((err) => {
          console.log("Autoplay blocked by browser policy, queuing user gesture listeners.", err);
          addListeners();
        });
    } else {
      addListeners();
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      cleanupListeners();
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-0 left-16 mb-2 hidden sm:flex items-center gap-2 rounded-xl glass px-4 py-2 text-[11px] font-medium tracking-[0.15em] text-gold uppercase whitespace-nowrap shadow-lg border border-gold/25"
          >
            <Sparkles className="h-3 w-3 animate-pulse text-gold" />
            <span>{isPlaying ? "Calming Ambience Active" : "Play Spiritual Ambience"}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Toggle Spiritual Music"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-13 w-13 items-center justify-center rounded-full glass border border-gold/25 shadow-[0_0_20px_rgba(212,175,55,0.12)] transition-all duration-300 hover:scale-110 hover:border-gold/60 cursor-pointer group bg-black/40 backdrop-blur-md animate-glow"
      >
        {/* Pulsating Glowing Aura Ring */}
        <div className="absolute inset-0 rounded-full bg-purple/10 blur-md scale-110 group-hover:bg-gold/10 group-hover:blur-lg transition-all duration-500" />
        
        {/* Breathing Outer Pulse Rings when playing */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full border border-gold/30 animate-ping opacity-25" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-[-4px] rounded-full border border-purple/20 animate-ping opacity-15" style={{ animationDuration: "4.5s" }} />
          </>
        )}

        {/* Content Icon & Waves */}
        <div className="relative flex items-center justify-center w-full h-full text-gold">
          {isPlaying ? (
            // Premium soundwave visualizer bars
            <div className="flex items-end justify-center gap-[3px] h-[16px] w-[20px]">
              <div className="w-[3px] rounded-full bg-gold animate-soundwave-1" />
              <div className="w-[3px] rounded-full bg-gold animate-soundwave-2" />
              <div className="w-[3px] rounded-full bg-gold animate-soundwave-3" />
              <div className="w-[3px] rounded-full bg-gold animate-soundwave-4" />
            </div>
          ) : (
            // Beautiful standard mute/headphones symbol
            <VolumeX className="h-5 w-5 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
          )}
        </div>
      </motion.button>
    </div>
  );
}
