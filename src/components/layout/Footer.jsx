import { Link } from "react-router-dom";
import { Sparkles, Instagram, Youtube, Mail, Phone, MapPin, Compass } from "lucide-react";
import { SITE } from "@/utils/site";
import { Logo } from "@/components/common/Logo";

// Custom premium SVG for TikTok to ensure flawless vector rendering
function TikTokIcon({ className = "h-4.5 w-4.5" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.97 1.2 2.37 2.01 3.89 2.27v3.86c-1.39-.08-2.77-.55-3.95-1.32-.48-.31-.9-.69-1.27-1.12v7.71c.02 1.63-.44 3.24-1.35 4.59-.92 1.37-2.27 2.39-3.83 2.91-1.57.53-3.27.53-4.84 0-1.56-.52-2.91-1.54-3.83-2.91C1.94 18.06 1.48 16.45 1.5 14.82c-.02-1.63.44-3.24 1.35-4.59.92-1.37 2.27-2.39 3.83-2.91 1.05-.35 2.16-.47 3.24-.34V10.9c-.61-.15-1.25-.13-1.85.05-.88.26-1.65.84-2.17 1.61-.51.77-.77 1.68-.76 2.6.01.93.28 1.84.8 2.61.51.77 1.28 1.35 2.17 1.61a5.07 5.07 0 0 0 2.94 0c.88-.26 1.65-.84 2.17-1.61.51-.77.77-1.68.76-2.6V0h.85z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold/15 bg-[#0D1117]/95 py-16 overflow-hidden">
      {/* Decorative background aura spotlights */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#163B73]/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gold/3 blur-[90px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "15s" }} />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Premium 4-Column Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
          
          {/* COLUMN 1: BRAND SECTION */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-5">
            <Link to="/" className="group inline-block w-fit">
              <Logo variant="footer" className="justify-center md:justify-start" />
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground/90 font-light tracking-wide max-w-sm">
              Shivani Spiritual Yatri offers spiritual guidance, energy healing, tarot consultation, manifestation coaching, and transformational learning experiences designed to bring clarity, balance, and alignment into life.
            </p>
            
            {/* Glowing Social Media Links */}
            <div className="flex gap-3.5 pt-2 justify-center md:justify-start">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/shivani_spiritual_yatri?igsh=aHU1ZzczbHFyajhq&utm_source=qr",
                  label: "Instagram",
                  glow: "hover:shadow-[0_0_15px_rgba(216,182,122,0.45)] hover:border-gold"
                },
                {
                  icon: TikTokIcon,
                  href: "https://www.tiktok.com/@rose_spiritual_yatri",
                  label: "TikTok",
                  glow: "hover:shadow-[0_0_15px_rgba(22,59,115,0.45)] hover:border-[#163B73]"
                },
                {
                  icon: Youtube,
                  href: "https://www.youtube.com/@Shivani_Spirtual_Yatri",
                  label: "YouTube",
                  glow: "hover:shadow-[0_0_15px_rgba(216,182,122,0.45)] hover:border-gold"
                },
                {
                  icon: Mail,
                  href: "mailto:Shivanispiritualyatri666@gmail.com",
                  label: "Gmail",
                  glow: "hover:shadow-[0_0_15px_rgba(22,59,115,0.45)] hover:border-[#163B73]"
                }
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={soc.label}
                  className={`group flex h-10 w-10 place-items-center justify-center rounded-full border border-gold/20 bg-white/5 text-gold/90 transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 ${soc.glow}`}
                >
                  <soc.icon className="h-4.5 w-4.5 transition-transform duration-500 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold font-medium border-b border-gold/10 pb-2 mb-4 w-full md:w-auto text-center md:text-left">Quick Links</h4>
            <nav className="flex flex-col items-center md:items-start gap-3 text-xs tracking-wider font-light w-full">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/contact", label: "Contact Us" }
              ].map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="text-muted-foreground hover:text-gold hover:translate-x-1 transition-all duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* COLUMN 3: RESOURCES */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold font-medium border-b border-gold/10 pb-2 mb-4 w-full md:w-auto text-center md:text-left">Resources</h4>
            <nav className="flex flex-col items-center md:items-start gap-3 text-xs tracking-wider font-light w-full">
              {[
                { to: "/courses", label: "Courses" },
                { to: "/products", label: "Products" },
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms-and-conditions", label: "Terms & Conditions" }
              ].map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="text-muted-foreground hover:text-gold hover:translate-x-1 transition-all duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* COLUMN 4: CONTACT INFO */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-4 w-full">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold font-medium border-b border-gold/10 pb-2 mb-4 w-full md:w-auto text-center md:text-left">Contact Us</h4>
            
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {/* Phone card */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl border border-gold/10 bg-white/3 backdrop-blur-sm transition-all hover:border-gold/25">
                <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5 animate-pulse" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60">Phone Support</span>
                  <a href={`tel:${SITE.phone}`} className="text-xs text-foreground/80 hover:text-gold transition-colors">{SITE.phone}</a>
                </div>
              </div>
              
              {/* Email card */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl border border-gold/10 bg-white/3 backdrop-blur-sm transition-all hover:border-gold/25">
  <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" />
  
  <div className="flex flex-col text-left min-w-0">
    <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60">
      Email Address
    </span>

    <a
      href="mailto:Shivanispiritualyatri666@gmail.com"
      className="text-xs text-foreground/80 hover:text-gold transition-colors truncate max-w-[170px]"
    >
      Shivanispiritualyatri666@gmail.com
    </a>
  </div>
</div>

              {/* Location card */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl border border-gold/10 bg-white/3 backdrop-blur-sm transition-all hover:border-gold/25">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground/60">Sanctuary Location</span>
                  <span className="text-xs text-foreground/75 leading-relaxed font-light">
                    11 Lisa Street, ON L6T4E8<br />Brampton, Ontario, Canada
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-16 border-t border-gold/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.25em] font-semibold text-muted-foreground/60">
          <div>
            © 2026 Shivani Spiritual Yatri · All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors duration-300">Privacy Policy</Link>
            <span className="text-gold/20 select-none">•</span>
            <Link to="/terms-and-conditions" className="hover:text-gold transition-colors duration-300">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
