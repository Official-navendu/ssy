import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(false);
  
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const collapseTimerRef = useRef(null);

  const audioUrl = "/audio/spiritual_ambience.mp3";
  const TARGET_VOLUME = 0.12; // Luxury, subtle ambient level

  // Reset/Trigger Collapse Timer
  const resetCollapseTimer = (delay = 5000) => {
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    collapseTimerRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, delay);
  };

  // Smooth Volume Fade
  const fadeVolume = (target, duration = 800, callback) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const steps = 25;
    const intervalTime = duration / steps;
    const volumeDelta = (target - audio.volume) / steps;

    fadeIntervalRef.current = setInterval(() => {
      let nextVol = audio.volume + volumeDelta;
      if ((volumeDelta > 0 && nextVol >= target) || (volumeDelta < 0 && nextVol <= target)) {
        audio.volume = target;
        clearInterval(fadeIntervalRef.current);
        if (callback) callback();
      } else {
        audio.volume = Math.max(0, Math.min(1, nextVol));
      }
    }, intervalTime);
  };

  // Play Actions
  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsPlaying(true);
    localStorage.setItem("music_playing", "true");
    setShowAutoplayPrompt(false);

    const startPlay = () => {
      audio.play()
        .then(() => {
          // Fade to either target volume or 0 if muted
          fadeVolume(isMuted ? 0 : TARGET_VOLUME);
          resetCollapseTimer(5000);
        })
        .catch((err) => {
          console.log("Audio play blocked/deferred:", err);
          setIsPlaying(false);
        });
    };

    if (audio.paused) {
      startPlay();
    } else {
      fadeVolume(isMuted ? 0 : TARGET_VOLUME);
      resetCollapseTimer(5000);
    }
  };

  // Pause Actions
  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    localStorage.setItem("music_playing", "false");
    setShowAutoplayPrompt(false);
    fadeVolume(0, 500, () => {
      audio.pause();
      setIsPlaying(false);
    });
  };

  // Toggle Play State
  const handleTogglePlay = (e) => {
    if (e) e.stopPropagation();
    setShowAutoplayPrompt(false);
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Toggle Mute State
  const handleToggleMute = (e) => {
    if (e) e.stopPropagation();
    setShowAutoplayPrompt(false);
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("music_muted", newMuted ? "true" : "false");

    if (newMuted) {
      fadeVolume(0, 400);
    } else {
      // Unmuting: if not playing, we play as well
      if (!isPlaying) {
        playAudio();
      } else {
        fadeVolume(TARGET_VOLUME, 400);
      }
    }
    resetCollapseTimer(5000);
  };

  // Hover Interaction Handlers
  const handleMouseEnter = () => {
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    resetCollapseTimer(2500);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Load saved states
    const savedPlay = localStorage.getItem("music_playing");
    const savedMuted = localStorage.getItem("music_muted") === "true";
    setIsMuted(savedMuted);

    audio.volume = 0; // start silent
    audio.muted = false; // control purely with volume

    let interactionListenersActive = false;

    const handleFirstUserInteraction = () => {
      const freshMuted = localStorage.getItem("music_muted") === "true";
      setIsPlaying(true);
      localStorage.setItem("music_playing", "true");
      
      audio.play()
        .then(() => {
          fadeVolume(freshMuted ? 0 : TARGET_VOLUME);
          setShowAutoplayPrompt(false);
          resetCollapseTimer(5000);
        })
        .catch((err) => {
          console.log("Audio play blocked on interaction:", err);
          setIsPlaying(false);
        });

      cleanupListeners();
    };

    const addListeners = () => {
      if (interactionListenersActive) return;
      window.addEventListener("click", handleFirstUserInteraction, { capture: true });
      window.addEventListener("touchstart", handleFirstUserInteraction, { capture: true });
      window.addEventListener("mousedown", handleFirstUserInteraction, { capture: true });
      window.addEventListener("keydown", handleFirstUserInteraction, { capture: true });
      interactionListenersActive = true;
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleFirstUserInteraction, { capture: true });
      window.removeEventListener("touchstart", handleFirstUserInteraction, { capture: true });
      window.removeEventListener("mousedown", handleFirstUserInteraction, { capture: true });
      window.removeEventListener("keydown", handleFirstUserInteraction, { capture: true });
      interactionListenersActive = false;
    };

    // If play is not explicitly set to false, attempt autoplay
    if (savedPlay !== "false") {
      // Attempt autoplay in muted mode to satisfy browser policy
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (savedMuted) {
              fadeVolume(0);
            } else {
              fadeVolume(TARGET_VOLUME);
              // Prompt "Tap to Enable Sound" if not savedMuted since audio volume was set
              setShowAutoplayPrompt(true);
            }
            resetCollapseTimer(5000);
          })
          .catch(() => {
            // Muted autoplay was also blocked, register gesture listeners
            setShowAutoplayPrompt(true);
            addListeners();
          });
      } else {
        setShowAutoplayPrompt(true);
        addListeners();
      }
    }

    resetCollapseTimer(5000);

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
      cleanupListeners();
    };
  }, []);

  return (
    <div 
      className="fixed z-[95] transition-all duration-500 ease-out bottom-6 left-6 md:bottom-8 md:left-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        if (showAutoplayPrompt) {
          handleToggleMute();
        }
      }}
    >
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />

      <motion.div
        layout
        className="flex items-center gap-3 rounded-full glass border border-gold/30 bg-[#151B26]/85 backdrop-blur-md px-3.5 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.55)] hover:border-gold/60 transition-colors duration-300 cursor-pointer"
      >
        {/* Slowly Rotating Tarot/Chakra Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0D1117]/50 border border-gold/15 text-gold"
        >
          {/* Soft breathing pulse rings when playing */}
          {isPlaying && !isMuted && (
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-gold/25"
            />
          )}
          <Moon className="h-4 w-4" />
        </motion.div>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex items-center gap-3 overflow-hidden"
            >
              {/* Status Labels */}
              <div className="flex flex-col pr-1 select-none">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold whitespace-nowrap">
                  🎵 Music
                </span>
                <span className="text-[8px] font-medium tracking-wide text-muted-foreground/80 whitespace-nowrap">
                  {showAutoplayPrompt ? (
                    <span className="text-gold/90 animate-pulse font-semibold">🔊 Tap to Enable Sound</span>
                  ) : (
                    isPlaying ? "Playing..." : "Paused..."
                  )}
                </span>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={handleTogglePlay}
                className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#0D1117]/80 border border-gold/20 hover:border-gold/60 hover:bg-gold/10 text-gold transition-all duration-300 cursor-pointer"
                aria-label={isPlaying ? "Pause Ambience" : "Play Ambience"}
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 pl-0.5" />}
              </button>

              {/* Mute/Unmute Button */}
              <button
                onClick={handleToggleMute}
                className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#0D1117]/80 border border-gold/20 hover:border-gold/60 hover:bg-gold/10 text-gold transition-all duration-300 cursor-pointer"
                aria-label={isMuted ? "Unmute Ambience" : "Mute Ambience"}
              >
                {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed simple visualizer indicator (only visible when collapsed and playing) */}
        {isCollapsed && isPlaying && !isMuted && (
          <div className="flex items-end gap-[2px] h-[10px] w-[12px] px-1 select-none pointer-events-none">
            <div className="w-[2px] rounded-full bg-gold animate-soundwave-1" style={{ animationDuration: "1.2s" }} />
            <div className="w-[2px] rounded-full bg-gold animate-soundwave-2" style={{ animationDuration: "0.9s" }} />
            <div className="w-[2px] rounded-full bg-gold animate-soundwave-3" style={{ animationDuration: "1.4s" }} />
          </div>
        )}
      </motion.div>
    </div>
  );
}
