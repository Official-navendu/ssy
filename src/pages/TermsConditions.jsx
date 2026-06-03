import { motion } from "framer-motion";
import { Scale, FileText, CheckSquare, RefreshCw, ShieldAlert, Award, Mail, Phone, Globe } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/utils/site";

export default function TermsConditions() {
  return (
    <>
      <PageHero
        eyebrow="Sacred Alliance"
        title={<>Terms & <span className="text-gradient-gold">Conditions</span></>}
        subtitle="Last Updated: May 2026 — These provisions govern your educational and consultative spiritual alignment."
      />

      <section className="pb-24 relative overflow-hidden">
        {/* Ambient backlight */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-purple/5 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "12s" }} />

        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <Reveal>
            <div className="rounded-3xl border border-gold/15 bg-black/40 backdrop-blur-md p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-10">
              
              {/* Introduction */}
              <div className="prose prose-invert max-w-none">
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/95 tracking-wide font-light">
                  Welcome to the online sanctuary of <strong className="text-gold font-medium">Shivani Spiritual Yatri</strong>. By accessing this platform, reserving cosmic consultations, or enrolling in our spiritual certified curriculum programs inside the <strong className="text-gold font-medium">Shivani Spiritual Yatri Academy</strong>, you enter into a sacred alliance and explicitly consent to the following terms, conditions, and lineage disclaimers. Please review these provisions carefully before reserving times.
                </p>
              </div>

              {/* Gold Divider */}
              <div className="border-t border-gold/10" />

              {/* Section 1: Esoteric Consultation Disclaimer */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <Scale className="h-5 w-5 text-gold/80" /> 1. Esoteric & Spiritual Guidance Disclaimer
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  By engaging in a consultation, tarot spread, birth chart reading, or energetic clearing, you explicitly acknowledge and agree that:
                </p>
                <ul className="mt-2 space-y-2.5 text-xs md:text-sm text-muted-foreground/85 font-light tracking-wide pl-5 list-disc">
                  <li>
                    Spiritual, intuitive, and planetary transits represent highly subjective, energetic interpretations that align with historical lineages and philosophies.
                  </li>
                  <li>
                    No outcomes, absolute life predictions, clinical health improvements, or financial gains are guaranteed. The choices you make following a consultation are entirely yours.
                  </li>
                  <li>
                    Vedic astrology, tarot, and energy readings do not constitute, and should never replace, legal advice, professional financial auditing, mental health counseling, or standard clinical medical diagnosis.
                  </li>
                </ul>
              </div>

              {/* Section 2: Booking, Scheduling & Payments */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <CheckSquare className="h-5 w-5 text-gold/80" /> 2. Booking, Scheduling & Payments
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  When reserving a session through our Instant Scheduler (Calendly) or by requesting an custom booking form:
                </p>
                <ul className="mt-2 space-y-2.5 text-xs md:text-sm text-muted-foreground/85 font-light tracking-wide pl-5 list-disc">
                  <li>
                    All fee parameters are clearly specified prior to booking. Payments must be processed successfully to confirm reservations and schedule spiritual channels.
                  </li>
                  <li>
                    <strong className="text-foreground/90 font-medium">Cancellation & Rescheduling:</strong> We require at least 24 hours of notice for session changes. Notice under 24 hours will forfeit the session fee to honor the preparation time, planetary calculations, and energetic space prepared by Shivani.
                  </li>
                  <li>
                    Failure to attend a scheduled session without notification (no-shows) will not qualify for refunds.
                  </li>
                </ul>
              </div>

              {/* Section 3: Academy Course & Certification Terms */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <Award className="h-5 w-5 text-gold/80" /> 3. Academy Certified Training & Attunements
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  Enrolling in classes under the <strong className="text-gold font-medium">Shivani Spiritual Yatri Academy</strong> binds you to these learning terms:
                </p>
                <ul className="mt-2 space-y-2.5 text-xs md:text-sm text-muted-foreground/85 font-light tracking-wide pl-5 list-disc">
                  <li>
                    Academy course content, hebdomadal modules, weekly handouts, and proprietary practitioner attunements are solely for personal and educational transformation.
                  </li>
                  <li>
                    Official "Certificates of Attainment" are awarded only upon the full and verified completion of all curriculum syllabus modules, practitioner attunement assessments, and mentoring sessions.
                  </li>
                  <li>
                    A certificate preview generated on the page represents a visual preview and holds no legal, lineage, or therapeutic credit until formally conferred upon qualification.
                  </li>
                </ul>
              </div>

              {/* Section 4: Refund and Support Policy */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <RefreshCw className="h-5 w-5 text-gold/80" /> 4. Refund & Session Support Policy
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  Due to the highly personalized nature of esoteric mapping, astral preparation, energy master attunements, and hours dedicated to custom readings, all completed consultations, delivered tarot summaries, and finalized Academy course materials are <strong className="text-gold font-medium">strictly non-refundable</strong>.
                </p>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  If you experience connection problems, technical platform issues, or require assistance with scheduling, our support team can be reached directly via our standard contact parameters.
                </p>
              </div>

              {/* Section 5: Limitation of Liability */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <ShieldAlert className="h-5 w-5 text-gold/80" /> 5. Limitation of Liability
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  To the absolute maximum extent permitted under applicable law, Shivani Spiritual Yatri, the Academy, and its guides shall not be held liable for any direct, indirect, incidental, collateral, or consequential damages resulting from your reliance upon advice, planetary forecasts, tarot readings, crystal recommendations, or educational modules acquired through our web channels.
                </p>
              </div>

              {/* Section 6: Intellectual Property */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2.5 font-display text-lg md:text-xl uppercase tracking-wider text-gold">
                  <FileText className="h-5 w-5 text-gold/80" /> 6. Intellectual Property
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  All digital assets, logos, design code, animated astrolabe vectors, sacred geometry layers, curriculum outlines, and visual elements on this website are the exclusive property of Shivani Spiritual Yatri and are protected under copyright laws. Re-distributing, republishing, copy-pasting descriptions, or using materials without prior written authorization is strictly prohibited.
                </p>
              </div>

              {/* Contact sanctuary details */}
              <div className="border-t border-gold/10 pt-8 space-y-4">
                <h3 className="font-display text-lg uppercase tracking-wider text-gold">Sanctuary Queries</h3>
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                  Should you have any questions or seek physical support regarding our terms, cancellations, or Academy rules, please communicate directly:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gold/10 bg-black/30">
                    <Mail className="h-4 w-4 text-gold shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Email Channels</span>
                      <span className="text-xs text-foreground/90 font-light truncate">{SITE.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gold/10 bg-black/30">
                    <Phone className="h-4 w-4 text-gold shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-widest">WhatsApp Support</span>
                      <span className="text-xs text-foreground/90 font-light">{SITE.phone}</span>
                    </div>
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
