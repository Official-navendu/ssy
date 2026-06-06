import { useState } from "react";
import { SITE } from "@/utils/site";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Compass, Shield, Gem, BookOpen, HelpCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      label: "Tarot Reading",
      icon: Compass,
      desc: "Timeline & Remedies Clarity",
      emoji: "🔮",
      message: "Hello Shivani Spiritual Yatri,\n\nI am interested in Tarot Reading.\n\nPlease share details."
    },
    {
      label: "Healing Session",
      icon: Shield,
      desc: "Reiki, Aura & Chakra Restoration",
      emoji: "✨",
      message: "Hello Shivani Spiritual Yatri,\n\nI am interested in a Healing Session.\n\nPlease share details."
    },
    {
      label: "Premium Transformation",
      icon: Gem,
      desc: "Comprehensive Spiritual Shift",
      emoji: "💎",
      message: "Hello Shivani Spiritual Yatri,\n\nI am interested in the Premium Transformation program.\n\nPlease share details."
    },
    {
      label: "Courses",
      icon: BookOpen,
      desc: "Tarot & Healing Training",
      emoji: "📚",
      message: "Hello Shivani Spiritual Yatri,\n\nI am interested in your Spiritual Courses.\n\nPlease share details."
    },
    {
      label: "General Inquiry",
      icon: HelpCircle,
      desc: "Other Questions & Custom requests",
      emoji: "❓",
      message: "Hello Shivani Spiritual Yatri,\n\nI have a general inquiry about your services.\n\nPlease share details."
    }
  ];

  const handleOptionClick = (message) => {
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex flex-col items-end">
      {/* Mini Popup Dialog Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[290px] sm:w-[320px] rounded-2xl glass border border-gold/30 bg-[#151B26]/95 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.85)] flex flex-col z-[91]"
          >
            {/* Header with Title and Exit */}
            <div className="flex justify-between items-start border-b border-gold/15 pb-3">
              <div>
                <h4 className="font-display text-sm font-semibold tracking-wide text-gradient-gold uppercase">
                  Need Spiritual Guidance?
                </h4>
                <p className="text-[10px] text-muted-foreground/80 mt-0.5">
                  Choose how we can help you.
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-505 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Online
                  </span>
                  <span className="text-[9px] text-muted-foreground font-light">
                    • Usually replies in minutes
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full border border-gold/15 bg-[#0D1117]/80 hover:bg-gold/15 text-gold/80 hover:text-gold transition-all duration-300 cursor-pointer"
                aria-label="Close Whatsapp options"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* List of Premium Cards */}
            <div className="flex flex-col gap-2 mt-3 overflow-y-auto max-h-[280px] pr-1 scrollbar-thin scrollbar-thumb-gold/10">
              {options.map((opt, idx) => {
                const IconComp = opt.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt.message)}
                    className="flex items-center gap-3 rounded-xl border border-gold/15 bg-[#151B26]/50 px-3 py-2.5 text-left transition-all duration-300 hover:border-gold/45 hover:bg-gold/5 group hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1B2230] border border-gold/10 text-gold/80 group-hover:text-gold transition-colors">
                      <IconComp className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[11px] font-semibold text-foreground/90 group-hover:text-gold transition-colors">
                        {opt.emoji} {opt.label}
                      </span>
                      <span className="text-[9px] text-muted-foreground/80 font-light truncate mt-0.5">
                        {opt.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Box */}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-3 rounded-full glass border border-emerald-500/35 bg-gradient-to-br from-[#151B26]/95 to-[#0D1117]/98 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.65)] hover:border-emerald-500/75 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer select-none group"
      >
        {/* WhatsApp Icon with Status Dot */}
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform duration-300">
          <span className="absolute top-0 right-0 flex h-2.5 w-2.5 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 drop-shadow-[0_0_2px_rgba(16,185,129,0.4)]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-4.941 1.295 1.318-4.815-.236-.375a9.86 9.86 0 01-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>

        {/* Labels */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/90 group-hover:text-gold transition-colors">
            We Are Here To Help
          </span>
          <span className="text-[9px] text-muted-foreground/80 font-light font-sans mt-0.5">
            Usually replies within a few minutes
          </span>
        </div>
      </motion.div>
    </div>
  );
}
