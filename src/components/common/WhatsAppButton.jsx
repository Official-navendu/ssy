import { useState } from "react";
import { SITE } from "@/utils/site";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90]">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block whitespace-nowrap rounded-full bg-background/85 border border-emerald-500/25 px-4 py-2 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] tracking-wide"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Namaste! I would like to know more about your astrology and spiritual consultation services.")}`}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: [0, -6, 0]
        }}
        transition={{ 
          scale: { delay: 1.2, type: "spring", stiffness: 180, damping: 15 },
          opacity: { delay: 1.2, duration: 0.5 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group block h-14 w-14 rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-emerald-950/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] cursor-pointer outline-none select-none"
        aria-label="Chat on WhatsApp"
      >
        {/* Soft breathing pulse rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/10 scale-100 group-hover:scale-120 group-hover:bg-emerald-500/15 transition-all duration-700 pointer-events-none" />
        <span className="absolute -inset-1 rounded-full border border-emerald-500/10 scale-100 group-hover:scale-115 transition-all duration-700 pointer-events-none" />
        
        {/* Continuous soft glowing pulse ring */}
        <motion.span 
          animate={{ scale: [1, 1.16, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-emerald-400/20 pointer-events-none" 
        />

        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6.5 w-6.5 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-4.941 1.295 1.318-4.815-.236-.375a9.86 9.86 0 01-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </motion.a>
    </div>
  );
}
