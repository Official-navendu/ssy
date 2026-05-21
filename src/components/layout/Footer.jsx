import { Link } from "react-router-dom";
import { Sparkles, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/utils/site";
import { useState } from "react";
import { Logo } from "@/components/common/Logo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="relative mt-24 border-t border-gold/15 bg-background/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Link to="/" className="group inline-block">
            <Logo variant="footer" />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Guiding your life journey through ancient spiritual wisdom, cosmic energy, and authentic Vedic insight.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for cosmic updates"
              className="flex-1 rounded-full border border-gold/20 bg-white/5 px-4 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
            />
            <button className="btn-gold rounded-full px-4 py-2.5 text-sm font-semibold">
              {submitted ? "✓" : "Join"}
            </button>
          </form>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</h4>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {["Home", "About", "Services", "Products", "Booking", "Contact"].map((l) => (
              <li key={l}>
                <Link to={`/${l === "Home" ? "" : l.toLowerCase()}`} className="hover:text-gold">
                  {l === "Booking" ? "Book" : l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-gold" /> {SITE.phone}</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-gold" /> {SITE.email}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> {SITE.address}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 p-2 text-gold hover:bg-gold/10"><Instagram className="h-4 w-4" /></a>
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 p-2 text-gold hover:bg-gold/10"><Facebook className="h-4 w-4" /></a>
            <a href={SITE.social.youtube} target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 p-2 text-gold hover:bg-gold/10"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shivani Spiritual Yatri · Crafted with Navendu
      </div>
    </footer>
  );
}
