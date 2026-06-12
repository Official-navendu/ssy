import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/Logo";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/products", label: "Products" },
  { to: "/remedies", label: "Remedies" },
  { to: "/contact", label: "Contact" },
];

const mobileLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/products", label: "Products" },
  { to: "/remedies", label: "Remedies" },
  { to: "/contact", label: "Contact" },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
      mass: 0.8,
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -15,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 22 
    } 
  }
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled
          ? "border-gold/12 bg-background/40 backdrop-blur-md shadow-[0_8px_32px_0_rgba(8,8,8,0.37)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group cursor-pointer">
          <Logo variant="header" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold [&.active]:text-gold"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/booking"
          className="hidden rounded-full btn-gold px-5 py-2.5 text-sm font-semibold md:inline-flex cursor-pointer"
        >
          Book Consultation
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-gold/20 bg-white/5 hover:bg-white/10 p-2 text-foreground md:hidden transition-all duration-300 hover:border-gold/50 cursor-pointer"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5 text-gold" /> : <Menu className="h-5 w-5 text-gold" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Click-away backdrop overlay */}
            <div 
              className="fixed inset-0 z-30 bg-black/45 backdrop-blur-sm md:hidden h-screen w-screen"
              onClick={() => setOpen(false)}
            />

            {/* Premium mobile astrolabe/tarot floating drawer card */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-20 left-4 right-4 z-40 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-[#151B26]/98 to-[#0D1117]/98 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(216,182,122,0.15)] md:hidden"
            >
              {/* Premium Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-50 rounded-full border border-gold/20 bg-white/5 hover:bg-gold/15 p-2 text-gold transition-all duration-300 hover:scale-110 hover:rotate-90 cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Decorative magic particles */}
              <div className="absolute top-3 left-8 w-1 h-1 bg-gold rounded-full animate-ping pointer-events-none" />
              <div className="absolute bottom-6 right-8 w-1.5 h-1.5 bg-gold/40 rounded-full animate-pulse pointer-events-none" />

              <div className="flex flex-col gap-1.5 px-5 pt-14 pb-6 relative z-10">
                {mobileLinks.map((l) => (
                  <motion.div key={l.to} variants={itemVariants}>
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `py-3 px-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-xl flex items-center justify-between group ${
                          isActive
                            ? "text-gold bg-gold/10 border-l-2 border-gold shadow-[0_0_15px_rgba(212,175,55,0.15),inset_0_0_10px_rgba(212,175,55,0.05)]"
                            : "text-foreground/85 hover:text-gold hover:bg-white/3"
                        }`
                      }
                    >
                      <span>{l.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-gold/80" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
