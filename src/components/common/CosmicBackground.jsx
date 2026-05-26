import { useEffect, useRef } from "react";

export function CosmicBackground({ density = 95 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Smooth mouse coordinates tracking for premium parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.22;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.22;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    
    // Detect mobile device to apply adaptive performance targets
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Crisp display scaling parameters (cap DPR at 1.5 on mobile, 2.0 on desktop to prevent rendering lag)
    let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const getParentWidth = () => canvas.parentElement && canvas.parentElement.clientWidth > 100 ? canvas.parentElement.clientWidth : window.innerWidth;
    const getParentHeight = () => canvas.parentElement && canvas.parentElement.clientHeight > 100 ? canvas.parentElement.clientHeight : window.innerHeight;

    let width = getParentWidth();
    let height = getParentHeight();

    // Apply high-DPI scaling
    const adjustScale = () => {
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      width = getParentWidth();
      height = getParentHeight();
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    adjustScale();

    // Cosmic Pools
    const bgStars = [];      // Dense deep starfield (Layer 1)
    const heroStars = [];    // Foreground shimmering/pulsing flare stars (Layer 2)
    const midParticles = []; // Spiritual energy dust (Layer 3)
    const fgBokeh = [];      // Translucent atmospheric bokeh (Layer 4)
    const shootingStars = [];// Rare meteor events

    // Always use stable screen coordinates for particle/star initialization to prevent early mount collapse trap
    const initWidth = window.innerWidth > 0 ? window.innerWidth : 1920;
    const initHeight = window.innerHeight > 0 ? window.innerHeight : 1080;

    // 1. GALAXY CLUSTERS INITIALIZATION (Realistic galaxy density)
    const clusterCenters = [
      { x: initWidth * 0.25, y: initHeight * 0.3, radius: Math.max(initWidth * 0.18, 160) },
      { x: initWidth * 0.72, y: initHeight * 0.25, radius: Math.max(initWidth * 0.22, 200) },
      { x: initWidth * 0.5, y: initHeight * 0.65, radius: Math.max(initWidth * 0.2, 180) }
    ];

    // Generate dense tiny background stars (dynamically scaled for mobile)
    const starCount = isMobile ? 220 : Math.max(density * 10, 950);
    for (let i = 0; i < starCount; i++) {
      let sx, sy;
      // Spawn near cluster centers for a textured galaxy cluster feel
      if (Math.random() < 0.45) {
        const cluster = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * cluster.radius;
        sx = (cluster.x + Math.cos(angle) * dist + initWidth) % initWidth;
        sy = (cluster.y + Math.sin(angle) * dist + initHeight) % initHeight;
      } else {
        sx = Math.random() * initWidth;
        sy = Math.random() * initHeight;
      }

      bgStars.push({
        x: sx,
        y: sy,
        size: Math.random() * 1.5 + 0.5,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.6 + 0.4,
        colorType: Math.random() > 0.88 ? "gold" : (Math.random() > 0.88 ? "blue" : "white")
      });
    }

    // 2. FOREGROUND "HERO STARS" (Pulsing and Lens Flares)
    const heroStarCount = isMobile ? 12 : 38;
    for (let i = 0; i < heroStarCount; i++) {
      heroStars.push({
        x: Math.random() * initWidth,
        y: Math.random() * initHeight,
        size: Math.random() * 1.2 + 1.6, // 1.6px to 2.8px
        pulseSpeed: Math.random() * 0.01 + 0.004,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.4 + 0.6,
        colorType: Math.random() > 0.65 ? "gold" : "white",
        hasFlare: Math.random() > 0.45
      });
    }

    // 3. SPIRITUAL ENERGY DUST (Drifting glowing particles)
    const particleCount = isMobile ? 32 : Math.max(density * 1.3, 120);
    for (let i = 0; i < particleCount; i++) {
      midParticles.push({
        x: Math.random() * initWidth,
        y: Math.random() * initHeight,
        vx: (Math.random() - 0.5) * 0.08 + (Math.random() > 0.5 ? 0.03 : -0.03), // diagonal drift bias
        vy: -Math.random() * 0.09 - 0.02, // upward drift
        size: Math.random() * 2.5 + 1.0,
        pulseSpeed: Math.random() * 0.007 + 0.002,
        phase: Math.random() * Math.PI * 2,
        wiggleFreq: Math.random() * 0.02 + 0.005,
        wiggleAmp: Math.random() * 0.35 + 0.1,
        alpha: Math.random() * 0.4 + 0.6,
        color: Math.random() > 0.4 ? "212, 175, 55" : "147, 51, 234" // Gold or Violet
      });
    }

    // 4. FOREGROUND CINEMATIC BOKEH (Translucent depth blobs)
    const bokehCount = isMobile ? 5 : 15;
    for (let i = 0; i < bokehCount; i++) {
      fgBokeh.push({
        x: Math.random() * initWidth,
        y: Math.random() * initHeight,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        size: Math.random() * (isMobile ? 45 : 85) + 30,
        pulseSpeed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.05 + 0.02,
        color: Math.random() > 0.6 ? "109, 40, 217" : (Math.random() > 0.5 ? "212, 175, 55" : "29, 78, 216")
      });
    }

    // 5. ZODIAC CONSTELLATIONS LAYOUT
    const constellations = [
      // Ursa Major (North Sky Plough)
      {
        stars: [
          { x: 0.13, y: 0.18 }, { x: 0.16, y: 0.16 }, { x: 0.19, y: 0.15 },
          { x: 0.22, y: 0.17 }, { x: 0.23, y: 0.21 }, { x: 0.28, y: 0.22 },
          { x: 0.29, y: 0.17 }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,3]]
      },
      // Cassiopeia (Celestial Queen W)
      {
        stars: [
          { x: 0.76, y: 0.12 }, { x: 0.79, y: 0.14 }, { x: 0.82, y: 0.11 },
          { x: 0.85, y: 0.15 }, { x: 0.88, y: 0.13 }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4]]
      },
      // Orion (Mystical Hunter Belt - Only on desktop to keep mobile GPU free)
      ...(!isMobile ? [{
        stars: [
          { x: 0.82, y: 0.65 }, { x: 0.86, y: 0.63 }, // Shoulders
          { x: 0.835, y: 0.69 }, { x: 0.84, y: 0.69 }, { x: 0.845, y: 0.69 }, // Belt
          { x: 0.825, y: 0.75 }, { x: 0.865, y: 0.77 } // Feet
        ],
        lines: [[0,2], [1,4], [2,3], [3,4], [2,5], [4,6], [0,1], [5,6]]
      }] : [])
    ];

    // Unicode symbols assets
    const zodiacGlyphs = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
    const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

    const handleResize = () => {
      adjustScale();
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      adjustScale();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Premium radial glow drawing helper for Nebulae and Bokeh
    const drawRadialGlow = (ctx, x, y, size, rgb, alpha) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
      grad.addColorStop(0, `rgba(${rgb}, ${alpha})`);
      grad.addColorStop(0.25, `rgba(${rgb}, ${alpha * 0.45})`);
      grad.addColorStop(0.65, `rgba(${rgb}, ${alpha * 0.12})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    // Rendering Engine Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const time = Date.now() * 0.00022;

      // Parallax easing math
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Center reference focal point for astrology layout (corresponds to text heading background)
      const cx = width / 2;
      const cy = height / 2.7;

      // ==========================================
      // 1. DEEP SPACE BASE GRADIENT
      // ==========================================
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#010103");
      bgGrad.addColorStop(0.25, "#040209");
      bgGrad.addColorStop(0.5, "#0a0414");
      bgGrad.addColorStop(0.75, "#0d051c");
      bgGrad.addColorStop(1, "#020104");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ==========================================
      // 2. LAYERED ARTISTIC NEBULA SYSTEM
      // ==========================================
      ctx.globalCompositeOperation = "screen";

      // A. Deep Royal Indigo Cloud (Left-Center)
      const nXa = width * 0.28 + Math.sin(time * 0.2) * 90;
      const nYa = height * 0.32 + Math.cos(time * 0.16) * 70;
      const rA = Math.max(width * (isMobile ? 0.45 : 0.58), isMobile ? 320 : 480);
      drawRadialGlow(ctx, nXa, nYa, rA, "99, 10, 180", 0.45 + Math.sin(time * 0.3) * 0.07);

      // B. Dreamy Golden Haze (Skipped on Mobile for rendering performance)
      if (!isMobile) {
        const nXb = width * 0.68 + Math.cos(time * 0.15) * 100;
        const nYb = height * 0.38 + Math.sin(time * 0.22) * 80;
        const rB = Math.max(width * 0.52, 430);
        drawRadialGlow(ctx, nXb, nYb, rB, "212, 175, 55", 0.20 + Math.sin(time * 0.4) * 0.04);
      }

      // C. Cosmic Midnight Blue Fog (Bottom-Right)
      const nXc = width * 0.78 + Math.sin(time * 0.12) * 110;
      const nYc = height * 0.68 + Math.cos(time * 0.24) * 80;
      const rC = Math.max(width * (isMobile ? 0.45 : 0.52), isMobile ? 320 : 440);
      drawRadialGlow(ctx, nXc, nYc, rC, "18, 62, 195", 0.32 + Math.cos(time * 0.2) * 0.05);

      // D. Amethyst Fog Aura (Top-Center behind heading - Skipped on Mobile)
      if (!isMobile) {
        const nXd = width * 0.5 + Math.cos(time * 0.18) * 50;
        const nYd = height * 0.16 + Math.sin(time * 0.11) * 35;
        const rD = Math.max(width * 0.48, 400);
        drawRadialGlow(ctx, nXd, nYd, rD, "147, 51, 234", 0.30 + Math.sin(time * 0.3) * 0.05);
      }

      // E. Center Portal Gold Bloom Glow (Directly behind astrolabe/heading)
      const rE = Math.max(width * (isMobile ? 0.35 : 0.45), isMobile ? 220 : 380);
      drawRadialGlow(ctx, cx + mouse.x * 0.08, cy + mouse.y * 0.08, rE, "212, 175, 55", 0.14 + Math.sin(time * 0.5) * 0.03);

      // F. Center Portal Purple/Indigo Glow
      const rF = Math.max(width * (isMobile ? 0.38 : 0.48), isMobile ? 240 : 410);
      drawRadialGlow(ctx, cx + mouse.x * 0.08, cy + mouse.y * 0.08, rF, "109, 40, 217", 0.20 + Math.cos(time * 0.4) * 0.04);

      // ==========================================
      // 3. ANEMIC CELESTIAL LIGHT RAYS
      // ==========================================
      // Volumetric rays emitting from center (Only rendered on desktop to optimize battery/GPU)
      if (!isMobile) {
        const rayCount = 3;
        ctx.save();
        ctx.translate(cx + mouse.x * 0.05, cy + mouse.y * 0.05);
        ctx.rotate(time * 0.05);
        for (let r = 0; r < rayCount; r++) {
          const rayAngle = (r * Math.PI) / 1.5;
          const rayGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(width * 0.4, 300));
          rayGrad.addColorStop(0, "rgba(212, 175, 55, 0.04)");
          rayGrad.addColorStop(0.4, "rgba(109, 40, 217, 0.012)");
          rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          
          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, Math.max(width * 0.4, 300), rayAngle - 0.22, rayAngle + 0.22);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // ==========================================
      // 4. SUBTLE ASTROLOGY WHEEL & SACRED GEOMETRY
      // ==========================================
      ctx.save();
      ctx.translate(cx + mouse.x * 0.08, cy + mouse.y * 0.08);

      const R1 = isMobile ? 110 : 150; // Inner boundary radius
      const R2 = isMobile ? 140 : 190; // Zodiac boundary radius
      const R3 = isMobile ? 170 : 230; // Outer circle radius
      const R4 = isMobile ? 174 : 235; // Outer dotted ring

      const ringPulse = 0.02 + Math.abs(Math.sin(time * 0.5)) * 0.035;
      const wheelRotation = time * 0.018; // Very slow majestic rotate
      ctx.strokeStyle = `rgba(212, 175, 55, ${ringPulse})`;
      ctx.lineWidth = 0.65;

      // Draw Concentric Rings
      ctx.beginPath();
      ctx.arc(0, 0, R1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, R2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, R3, 0, Math.PI * 2);
      ctx.stroke();

      // Small astrolabe tick-marks inside outer ring R3 for premium instrument detail
      ctx.save();
      ctx.strokeStyle = `rgba(212, 175, 55, ${ringPulse * 0.8})`;
      ctx.rotate(wheelRotation * 0.4);
      for (let t = 0; t < 60; t++) {
        const tickAngle = (t * Math.PI) / 30;
        ctx.beginPath();
        ctx.moveTo(Math.cos(tickAngle) * (R3 - 4), Math.sin(tickAngle) * (R3 - 4));
        ctx.lineTo(Math.cos(tickAngle) * R3, Math.sin(tickAngle) * R3);
        ctx.stroke();
      }
      ctx.restore();

      // Draw outer dotted ring (rotating slowly in reverse)
      ctx.save();
      ctx.strokeStyle = `rgba(212, 175, 55, ${ringPulse + 0.025})`;
      ctx.setLineDash([2, 5]);
      ctx.rotate(-wheelRotation * 1.5);
      ctx.beginPath();
      ctx.arc(0, 0, R4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw 12 Zodiac Houses Radial Dividers
      for (let h = 0; h < 12; h++) {
        const radAngle = (h * Math.PI) / 6 + wheelRotation;
        ctx.beginPath();
        ctx.moveTo(Math.cos(radAngle) * R1, Math.sin(radAngle) * R1);
        ctx.lineTo(Math.cos(radAngle) * R3, Math.sin(radAngle) * R3);
        ctx.stroke();
      }

      // Draw seed of life sacred geometry pattern inside central R1 ring
      const seedR = R1 * 0.35; // Radius of circles
      ctx.strokeStyle = "rgba(212, 175, 55, 0.03)";
      ctx.lineWidth = 0.55;
      
      // Central circle
      ctx.beginPath();
      ctx.arc(0, 0, seedR, 0, Math.PI * 2);
      ctx.stroke();

      // 6 Outer interlocking circles
      for (let j = 0; j < 6; j++) {
        const seedAngle = (j * Math.PI) / 3;
        const sx = Math.cos(seedAngle) * seedR;
        const sy = Math.sin(seedAngle) * seedR;
        ctx.beginPath();
        ctx.arc(sx, sy, seedR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw 12 Radially Oriented Zodiac Glyphs inside houses
      zodiacGlyphs.forEach((glyph, index) => {
        const glyphAngle = (index * Math.PI) / 6 + (Math.PI / 12) + wheelRotation;
        const gx = Math.cos(glyphAngle) * ((R1 + R2) / 2);
        const gy = Math.sin(glyphAngle) * ((R1 + R2) / 2);

        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(glyphAngle + Math.PI / 2); // Align symbol perpendicular to center
        ctx.font = isMobile ? "9px sans-serif" : "12px 'Cormorant Garamond', serif";
        ctx.fillStyle = "rgba(212, 175, 55, 0.16)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(glyph, 0, 0);
        ctx.restore();
      });

      // Draw Outer orbiting Moon Phases (Skipped on mobile to preserve CPU performance)
      if (!isMobile) {
        const R5 = 280; // Moon orbit radius
        ctx.strokeStyle = "rgba(244, 239, 230, 0.015)";
        ctx.beginPath();
        ctx.arc(0, 0, R5, 0, Math.PI * 2);
        ctx.stroke();

        const moonOrbitRotation = -time * 0.012; // Orbit slowly in reverse direction
        moonPhases.forEach((phase, k) => {
          const phaseAngle = (k * Math.PI) / 4 + moonOrbitRotation;
          const mx = Math.cos(phaseAngle) * R5;
          const my = Math.sin(phaseAngle) * R5;

          ctx.font = "13px 'Cormorant Garamond', serif";
          ctx.fillStyle = "rgba(244, 239, 230, 0.13)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(phase, mx, my);
        });
      }

      ctx.restore();

      // ==========================================
      // 5. ZODIAC CONSTELLATIONS LAYOUT DRAWING
      // ==========================================
      ctx.save();
      ctx.strokeStyle = "rgba(212, 175, 55, 0.045)";
      ctx.lineWidth = 0.55;

      constellations.forEach((constel) => {
        // Calculate screen positions
        const screenStars = constel.stars.map((s) => ({
          x: (s.x * width + mouse.x * 0.06 + width) % width,
          y: (s.y * height + mouse.y * 0.06 + height) % height
        }));

        // Draw constellation lines
        constel.lines.forEach((line) => {
          const p1 = screenStars[line[0]];
          const p2 = screenStars[line[1]];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw nodes
        screenStars.forEach((star, index) => {
          const pulse = 0.35 + Math.abs(Math.sin(time * 1.5 + index)) * 0.65;
          ctx.fillStyle = `rgba(244, 239, 230, ${pulse * 0.55})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, 1.4, 0, Math.PI * 2);
          ctx.fill();

          // Lens flare aura (Only on desktop)
          if (!isMobile) {
            const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 5);
            grad.addColorStop(0, `rgba(212, 175, 55, ${pulse * 0.25})`);
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(star.x, star.y, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      ctx.restore();

      // ==========================================
      // 6. LAYER 1: GALAXY BG STARS (fillRect optimization!)
      // ==========================================
      // Renders tiny stars as fast pixel rectangles rather than trigonometrically-complex circles
      bgStars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentAlpha = star.alpha * (0.12 + Math.abs(Math.sin(star.phase)) * 0.88);
        
        // Deep parallax shifts
        const px = (star.x + mouse.x * 0.04 + width) % width;
        const py = (star.y + mouse.y * 0.04 + height) % height;

        if (star.colorType === "gold") {
          ctx.fillStyle = `rgba(240, 215, 122, ${currentAlpha * 0.85})`;
        } else if (star.colorType === "blue") {
          ctx.fillStyle = `rgba(147, 197, 253, ${currentAlpha * 0.75})`;
        } else {
          ctx.fillStyle = `rgba(244, 239, 230, ${currentAlpha * 0.8})`;
        }

        // Draw fast rectangle to prevent GPU overhead of standard trigonometry
        ctx.fillRect(px - star.size / 2, py - star.size / 2, star.size, star.size);
      });

      // ==========================================
      // 7. LAYER 2: SHIMMERING "HERO STARS" WITH FLARES
      // ==========================================
      heroStars.forEach((star) => {
        star.phase += star.pulseSpeed;
        const currentAlpha = star.alpha * (0.35 + Math.abs(Math.sin(star.phase)) * 0.65);
        
        const px = (star.x + mouse.x * 0.09 + width) % width;
        const py = (star.y + mouse.y * 0.09 + height) % height;

        ctx.fillStyle = star.colorType === "gold" ? `rgba(240, 215, 122, ${currentAlpha})` : `rgba(255, 255, 255, ${currentAlpha})`;

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point cross hair lens flare drawing (Only on desktop)
        if (!isMobile && star.hasFlare && currentAlpha > 0.45) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(time * 0.15 + star.phase);
          ctx.strokeStyle = star.colorType === "gold" ? `rgba(240, 215, 122, ${currentAlpha * 0.35})` : `rgba(255, 255, 255, ${currentAlpha * 0.32})`;
          ctx.lineWidth = 0.65;

          ctx.beginPath();
          // Adjust length dynamically in a breathing scale
          const flareLen = star.size * (3.8 + Math.sin(time * 2 + star.phase) * 0.9);
          ctx.moveTo(-flareLen, 0);
          ctx.lineTo(flareLen, 0);
          ctx.moveTo(0, -flareLen);
          ctx.lineTo(0, flareLen);
          ctx.stroke();
          ctx.restore();

          // Soft circular halo
          const flareGlow = ctx.createRadialGradient(px, py, 0, px, py, star.size * 5.5);
          flareGlow.addColorStop(0, star.colorType === "gold" ? `rgba(212, 175, 55, ${currentAlpha * 0.22})` : `rgba(255, 255, 255, ${currentAlpha * 0.18})`);
          flareGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = flareGlow;
          ctx.beginPath();
          ctx.arc(px, py, star.size * 5.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ==========================================
      // 8. METEORS / SHOOTING STARS
      // ==========================================
      const maxMeteors = isMobile ? 1 : 2;
      const meteorRate = isMobile ? 0.0015 : 0.0035;

      if (Math.random() < meteorRate && shootingStars.length < maxMeteors) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.35),
          len: Math.random() * (isMobile ? 60 : 110) + 40,
          speed: Math.random() * (isMobile ? 5 : 8) + 4,
          angle: Math.PI / 6.5 + (Math.random() - 0.5) * 0.06,
          opacity: 1.0,
          fadeSpeed: Math.random() * 0.015 + 0.009
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= ss.fadeSpeed;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        const gradient = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len
        );
        gradient.addColorStop(0, `rgba(240, 215, 122, ${ss.opacity * 0.85})`);
        gradient.addColorStop(0.3, `rgba(212, 175, 55, ${ss.opacity * 0.35})`);
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isMobile ? 0.95 : 1.35;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.len,
          ss.y - Math.sin(ss.angle) * ss.len
        );
        ctx.stroke();
      }

      // ==========================================
      // 9. LAYER 3: FLOATING SPIRITUAL DUST
      // ==========================================
      midParticles.forEach((p, idx) => {
        // Slow organic motion drift
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed;

        // Apply a subtle wave wiggle
        p.x += Math.sin(p.phase * p.wiggleFreq) * p.wiggleAmp;

        // Reset boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        // Parallax depth coordinates
        const px = (p.x + mouse.x * 0.14 + width) % width;
        const py = (p.y + mouse.y * 0.14 + height) % height;

        const pulseAlpha = p.alpha * (0.35 + Math.abs(Math.sin(p.phase)) * 0.65);

        // Particle Core
        ctx.fillStyle = `rgba(${p.color}, ${pulseAlpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Shimmer aura (Only on desktop)
        if (!isMobile && p.size > 1.1) {
          const aura = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3.8);
          aura.addColorStop(0, `rgba(${p.color}, ${pulseAlpha * 0.22})`);
          aura.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.arc(px, py, p.size * 3.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw soft connectives (Bypassed entirely on mobile to eliminate N^2 distance loops)
        if (!isMobile) {
          const maxDist = 72;
          const maxDistSq = maxDist * maxDist; // 5184 (distance squared optimization)

          for (let j = idx + 1; j < midParticles.length; j++) {
            const p2 = midParticles[j];
            const p2x = (p2.x + mouse.x * 0.14 + width) % width;
            const p2y = (p2.y + mouse.y * 0.14 + height) % height;

            const dx = px - p2x;
            const dy = py - p2y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const dist = Math.sqrt(distSq); // Only invoke math.sqrt for very close elements
              const lineAlpha = (1 - dist / maxDist) * 0.045 * Math.min(pulseAlpha, p2.alpha);
              ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2x, p2y);
              ctx.stroke();
            }
          }
        }
      });

      // ==========================================
      // 10. LAYER 4: BOKEH LIGHT BLUR ELEMENTS
      // ==========================================
      fgBokeh.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed;

        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = height + p.size;
        if (p.y > height + p.size) p.y = -p.size;

        const px = (p.x + mouse.x * 0.3 + width) % width;
        const py = (p.y + mouse.y * 0.3 + height) % height;

        const pulseAlpha = p.alpha * (0.45 + Math.abs(Math.sin(p.phase)) * 0.55);

        drawRadialGlow(ctx, px, py, p.size, p.color, pulseAlpha);
      });

      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [density]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-transparent">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-98 transition-opacity duration-1000"
        style={{ willChange: "transform" }}
      />
      
      {/* High-end micro dotted alignment grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(212,175,55,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
