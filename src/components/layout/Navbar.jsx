import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

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
        <Link to="/" className="group">
          <Logo variant="header" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold [&.active]:text-gold"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/booking"
          className="hidden rounded-full btn-gold px-5 py-2.5 text-sm font-semibold md:inline-flex"
        >
          Book Consultation
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-foreground/85 hover:text-gold [&.active]:text-gold"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full btn-gold px-5 py-3 text-center text-sm font-semibold"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
