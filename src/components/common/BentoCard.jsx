import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function BentoCard({ children, className = "", glowColor = "rgba(212, 175, 55, 0.12)", maxTilt = 4 }) {
  const cardRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Automatically detect mobile / touch-capable displays to bypass heavy transforms
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Motion values for radial torchlight cursor tracing
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Spring values for premium, fluid 3D tilting
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Direct cursor coordinates inside card bounds
    glowX.set(x);
    glowY.set(y);

    // Compute normalized coordinates (-0.5 to 0.5) for tilt ratios
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt; 
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    tiltX.set(rotateX);
    tiltY.set(rotateY);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        rotateX: isMobile ? 0 : tiltX,
        rotateY: isMobile ? 0 : tiltY,
        perspective: 1000,
      }}
      className={`relative overflow-hidden transition-all duration-300 ${
        hovering ? "shadow-[0_20px_40px_rgba(212,175,55,0.08)] border-gold/30 -translate-y-1" : "border-gold/15"
      } ${className}`}
    >
      {/* Cursor Radial Follow Spot Glow (z-0) */}
      {!isMobile && hovering && (
        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] z-0"
          style={{
            left: glowX,
            top: glowY,
            width: "180px",
            height: "180px",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Glass Sheen sweep highlight overlay on hover */}
      {!isMobile && (
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full transition-transform duration-[800ms] ease-out z-0 ${
            hovering ? "translate-x-full" : ""
          }`}
        />
      )}

      {/* Embedded context wrapper */}
      <div 
        className="relative z-10 w-full h-full" 
        style={{ transform: isMobile ? "none" : "translateZ(8px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
