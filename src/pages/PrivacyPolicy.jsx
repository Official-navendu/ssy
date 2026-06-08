import { motion } from "framer-motion";
import { Shield, Lock, Eye, Cookie, HelpCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/utils/site";

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        eyebrow="Legal Sanctuary"
        title={<>Privacy <span className="text-gradient-gold">Policy</span></>}
        subtitle="Last Updated: May 2026 — Trust, discretion, and spiritual alignment govern our digital relationship."
      />

      <section className="pb-24 relative overflow-hidden">
        {/* Ambient backlight */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-sapphire/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "12s" }} />

        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <Reveal>
            <div className="rounded-3xl border border-gold/15 bg-black/40 backdrop-blur-md p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-10">
              
              {/* Introduction */}
              <div className="prose prose-invert max-w-none">
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/95 tracking-wide font-light">
                  At <strong className="text-gold font-medium">Shivani Spiritual Yatri</strong>, we cherish the trust you place in us for spiritual guidance, cosmic counseling, and transformational alignment. Discretion, honor, and deep energetic privacy are foundational pillars of our practice. This Privacy Policy details how we handle information collected on our website, ensuring your absolute comfort, privacy, and visual sanctuary while exploring ancient lineages.
                </p>
              </div>

              {/* Gold Divider */}
              <div className="border-t border-gold/10" />

              {/* Section 1: Information Collection */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <Eye className="h-5 w-5 text-gold/80" /> 1. Information We Collect
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  To tailor your consultations and offer an immersive educational ecosystem, we collect two primary forms of information:
                </p>
                <ul className="mt-2 space-y-2.5 text-xs md:text-sm text-muted-foreground/85 font-light tracking-wide pl-5 list-disc">
                  <li>
                    <strong className="text-foreground/90 font-medium">Personal Identifiers:</strong> Your full name, email address, phone number, and optional WhatsApp contact parameters are provided voluntarily when request forms are submitted or when registering in the Shivani Spiritual Yatri Academy environment.
                  </li>
                  <li>
                    <strong className="text-foreground/90 font-medium">Esoteric Mapping Details:</strong> Accurate birth coordinates (date of birth, specific hour of birth, and birth city) are essential for charting personal Vedic astrolabes, kundlis, and planetary transits during bookings.
                  </li>
                </ul>
              </div>

              {/* Section 2: Contact Information Usage */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <Mail className="h-5 w-5 text-gold/80" /> 2. How We Use Contact Information
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  Your contact details are treated with the highest degree of respect and sanctity. They are utilized solely to:
                </p>
                <ul className="mt-2 space-y-2.5 text-xs md:text-sm text-muted-foreground/85 font-light tracking-wide pl-5 list-disc">
                  <li>Confirm, reschedule, or deliver personal astrology, tarot, and energy healing sessions.</li>
                  <li>Send secure direct digital download keys for certification credentials attained inside the Academy.</li>
                  <li>Communicate scheduling adjustments, payment confirmations, and relevant WhatsApp coordinate pre-fills that you explicitly activate.</li>
                </ul>
                <p className="text-xs md:text-sm italic leading-relaxed text-gold/85 font-light tracking-wide">
                  * We absolutely never trade, lease, sell, or disclose your contact information to advertising networks, third-party sponsors, or data brokers.
                </p>
              </div>

              {/* Section 3: Booking Data & Esoteric Handling */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <Lock className="h-5 w-5 text-gold/80" /> 3. Booking & Esoteric Data Handling
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  The energetic mapping details (birth date, time, location) shared during scheduling are exclusively loaded onto isolated charting software for personal consulting synthesis. Summaries of tarot readings, crystal selections, or energetic reiki attunements remain entirely strictly confidential between Shivani and yourself.
                </p>
              </div>

              {/* Section 4: Cookies Usage */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <Cookie className="h-5 w-5 text-gold/80" /> 4. Cookies & Visual Preferences
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  We utilize lightweight cookie fragments to preserve your dark-mode mystical canvas configurations, remember selected scheduling tab views, and manage smooth animation state transitions. Cookies also assist us in measuring general web analytics to optimize server rendering response times and maintain particle performance speeds without identifying individual visitors.
                </p>
              </div>

              {/* Section 5: Security & Technical Safeguards */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <Shield className="h-5 w-5 text-gold/80" /> 5. Technical Safeguards & Data Retention
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  We run the platform under active SSL/TLS socket layers, keeping all inputs encrypted in transit. Esoteric records and consultation maps are routinely archived after 12 months unless you request pre-emptive deletion. All digital certification records inside the Shivani Spiritual Yatri Academy are stored securely under individual database registers.
                </p>
              </div>

              {/* Section 6: Spiritual Service Disclaimer */}
              <div className="rounded-2xl border border-dashed border-gold/30 bg-gold/5 p-6 space-y-3">
                <h4 className="flex items-center gap-2 font-display text-xs md:text-sm uppercase tracking-widest text-gold font-bold">
                  <AlertCircle className="h-4.5 w-4.5 text-gold animate-pulse" /> Sacred Spiritual Service Disclaimer
                </h4>
                <p className="text-[11px] md:text-xs leading-relaxed text-muted-foreground/85 font-light tracking-wide">
                  All insights, planetary transits, tarot divination spreads, and chakra energetic feedback are provided strictly for spiritual illumination, personal introspection, and educational transformational learning inside the Shivani Spiritual Yatri Academy. Our guidance represents an intuitive, historical lineage and must never substitute for professional psychiatric, legal, clinical medical diagnosis, or critical financial advice.
                </p>
              </div>

              {/* Contact sanctuary details */}
              <div className="border-t border-gold/10 pt-8 space-y-4">
                <h3 className="font-display text-lg uppercase tracking-wider text-gold">Contact Sanctuary</h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  If you have queries regarding data handling, wish to request full deletion of booking histories, or seek clarification on Academy student credentials, please connect with us directly:
                </p>
                <div className="grid gap-4 sm:grid-cols-3 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gold/10 bg-black/30">
                    <Mail className="h-4 w-4 text-gold shrink-0" />
                    <span className="text-xs text-foreground/90 font-light truncate">{SITE.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gold/10 bg-black/30">
                    <Phone className="h-4 w-4 text-gold shrink-0" />
                    <span className="text-xs text-foreground/90 font-light">{SITE.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gold/10 bg-black/30">
                    <MapPin className="h-4 w-4 text-gold shrink-0" />
                    <span className="text-xs text-foreground/90 font-light truncate">{SITE.address.split(",")[0]}</span>
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
