import { useState, useRef, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VideoBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const bubbleVideoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const progressContainerRef = useRef(null);

  const videoUrl = "/videos/videobubble.mp4";

  // Bubble video auto-playback on hover/mount
  useEffect(() => {
    if (bubbleVideoRef.current) {
      bubbleVideoRef.current.play().catch((err) => {
        console.log("Autoplay preview deferred:", err);
      });
    }
  }, [isOpen]);

  // Synchronize modal state when opened
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setIsMuted(true);
      setTimeout(() => {
        if (modalVideoRef.current) {
          modalVideoRef.current.muted = true;
          modalVideoRef.current.play().catch(err => console.log(err));
        }
      }, 150);
    }
  }, [isOpen]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  const togglePlay = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    const current = (video.currentTime / video.duration) * 100;
    setProgress(current || 0);
  };

  const handleLoadedMetadata = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
  };

  const handleProgressBarClick = (e) => {
    const video = modalVideoRef.current;
    const container = progressContainerRef.current;
    if (!video || !container) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    video.currentTime = percentage * video.duration;
    setProgress(percentage * 100);
  };

  return (
    <>
      {/* Crystal Orb Trigger Bubble */}
      <div 
        className="fixed z-[90] transition-all duration-500 ease-out
                   bottom-[84px] right-6 md:bottom-28 md:right-8"
      >
        <motion.div
          onClick={handleOpen}
          whileHover={{ scale: 1.08 }}
          animate={{ y: [0, 4, 0] }}
          transition={{ 
            y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 300, damping: 15 }
          }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full cursor-pointer select-none bg-[#0D1117]/40 backdrop-blur-sm group"
        >
          {/* Slowly Rotating Outer Golden Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border border-gold/30 group-hover:border-gold/60 transition-colors pointer-events-none"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          />

          {/* Soft Candle Glow Backdrop */}
          <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-sm scale-110 group-hover:bg-gold/15 group-hover:blur-md transition-all duration-500 pointer-events-none" />

          {/* Inner Crystal Orb Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border border-gold/40 shadow-[0_0_15px_rgba(216,182,122,0.25)] group-hover:shadow-[0_0_25px_rgba(216,182,122,0.5)] transition-shadow duration-500">
            <video
              ref={bubbleVideoRef}
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-110 pointer-events-none group-hover:scale-100 transition-transform duration-700"
            />
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sapphire/15 via-transparent to-gold/10 mix-blend-overlay pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Expanded Modal Video Player */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/92 backdrop-blur-md"
            />

            {/* Video Player Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl glass border border-gold/35 bg-[#151B26]/95 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Title and Close Button */}
              <div className="flex justify-between items-center px-5 py-4 border-b border-gold/15 bg-[#0D1117]/40 select-none">
                <span className="font-display text-sm font-semibold tracking-wider text-gradient-gold uppercase">
                  Spiritual Sanctuary Ritual
                </span>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full border border-gold/15 bg-[#0D1117]/80 hover:bg-gold/15 text-gold/80 hover:text-gold transition-all duration-300 cursor-pointer flex items-center justify-center"
                  aria-label="Close video player"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Main Video Element */}
              <div className="relative aspect-[9/16] w-full bg-black/90 max-h-[65vh] overflow-hidden flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  src={videoUrl}
                  loop
                  playsInline
                  autoPlay
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                />
                
                {/* Visual watermark icon in corner */}
                <div className="absolute top-4 left-4 pointer-events-none opacity-45">
                  <span className="rounded-full bg-black/50 border border-gold/20 px-2.5 py-1 text-[8px] font-medium tracking-[0.2em] text-gold uppercase">
                    Shivani Spiritual Yatri
                  </span>
                </div>

                {/* Big Center Play Overlay when paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity duration-300"
                  >
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-16 w-16 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center backdrop-blur-md shadow-2xl"
                    >
                      <Play className="h-6 w-6 fill-gold/25 pl-1" />
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Custom Control Panel */}
              <div className="px-5 py-4 bg-[#0D1117] flex flex-col gap-3.5 select-none border-t border-gold/15">
                
                {/* Progress Bar slider */}
                <div className="flex items-center gap-3 w-full">
                  <span className="text-[9px] text-muted-foreground/80 font-mono tracking-wide w-8 text-right">
                    {modalVideoRef.current ? formatTime(modalVideoRef.current.currentTime) : "00:00"}
                  </span>
                  
                  <div 
                    ref={progressContainerRef}
                    onClick={handleProgressBarClick}
                    className="h-1.5 flex-1 rounded-full bg-[#1A1722] border border-gold/10 relative cursor-pointer group"
                  >
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft relative transition-all duration-100" 
                      style={{ width: `${progress}%` }}
                    >
                      {/* Interactive Drag Handle Dot */}
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white border border-gold shadow-md scale-0 group-hover:scale-100 transition-transform duration-200" />
                    </div>
                  </div>

                  <span className="text-[9px] text-muted-foreground/80 font-mono tracking-wide w-8 text-left">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Actions: Play/Pause, Volume */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play Button */}
                    <button
                      onClick={togglePlay}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B2230] border border-gold/25 hover:border-gold/60 text-gold hover:bg-gold/5 transition-all cursor-pointer"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 pl-0.5" />}
                    </button>

                    {/* Mute Button */}
                    <button
                      onClick={toggleMute}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B2230] border border-gold/25 hover:border-gold/60 text-gold hover:bg-gold/5 transition-all cursor-pointer"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
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

// Helper time formatter
function formatTime(secs) {
  if (isNaN(secs)) return "00:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
