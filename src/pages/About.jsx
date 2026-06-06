import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  Sparkles, Heart, Compass, Award, BookOpen, Sun, 
  Shield, Zap, Layers, Users, CheckCircle2, ChevronRight 
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { BentoCard } from "@/components/common/BentoCard";
import aboutFullImg from "@/assets/images/about_full.png";

const timeline = [
  { year: "2018", title: "The Awakening", text: "Initiated into the profound pathways of Vedic Astrology and traditional Tarot under revered masters in Rishikesh." },
  { year: "2020", title: "Sacred Practice Begins", text: "Established private consultations, bridging ancient chart calculations with intuitive energetic card pulls." },
  { year: "2022", title: "Holistic Energy Mastery", text: "Completed advanced certifications in energy restoration, aura cleansing, and chakra integration methods." },
  { year: "2024", title: "Global Guidance Milestone", text: "Successfully guided over a thousand clients across Canada, India, and internationally, providing clear celestial blueprints." },
  { year: "Today", title: "Shivani Spiritual Yatri", text: "Guiding modern seekers through a professional sanctuary of spiritual alignment, cosmic learning, and emotional growth." },
];

const counters = [
  { label: "Souls Guided", value: 1200, suffix: "+" },
  { label: "Years Devoted", value: 6, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Global Reach", value: 15, suffix: " Countries" },
];

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="The Sanctuary"
        title={<>Shivani Spiritual Yatri <span className="text-gradient-gold">Behind The Practice</span></>}
        subtitle="Vedic lineage meets modern energy alchemy — companioning your soul back to its luminous, pre-charted design."
      />

      {/* About Shivani: Personal Storytelling */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:px-8">
          <Reveal>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-md aspect-[4/5] group/about-story"
            >
              {/* Concentric Celestial Orbit Line Behind */}
              <div className="absolute inset-[-30px] rounded-full border border-gold/10 animate-spin-slow pointer-events-none -z-20" style={{ animationDuration: "60s" }} />
              <div className="absolute inset-[-15px] rounded-full border border-sapphire/15 animate-spin-slow pointer-events-none -z-20" style={{ animationDirection: "reverse", animationDuration: "40s" }} />

              {/* Cinematic Nebula Glow Backdrop */}
              <div className="absolute -inset-6 bg-gradient-to-br from-sapphire/25 via-[#151B26]/30 to-gold/20 rounded-[3rem] blur-3xl opacity-70 group-hover/about-story:opacity-90 transition-opacity duration-1000 pointer-events-none" />

              {/* Halo Frame Outer Border */}
              <div className="absolute -inset-2.5 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-sapphire/20 to-gold/20 blur-md opacity-50 group-hover/about-story:opacity-75 transition-all duration-700 -z-10" />

              {/* Main Glassmorphism Editorial Frame */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-gold/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-background/30 backdrop-blur-md transition-all duration-700 group-hover/about-story:border-gold/50 group-hover/about-story:shadow-gold/30">
                
                {/* Portrait Image */}
                <motion.img
                  src={aboutFullImg}
                  alt="Shivani Spiritual Yatri Sanctuary Portrait"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/about-story:scale-[1.06]"
                />

                {/* Ambient Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80 group-hover/about-story:opacity-60 transition-opacity duration-700 pointer-events-none" />

                {/* Gold Corner Accents */}
                <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-gold/40 pointer-events-none" />
                <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-gold/40 pointer-events-none" />
                <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-gold/40 pointer-events-none" />
                <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-gold/40 pointer-events-none" />

                <div className="absolute top-8 right-8 text-gold/40 animate-pulse pointer-events-none">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.35em] text-gold/60 pointer-events-none font-medium text-center w-full">
                  Shivani · Spiritual Yatri Sanctuary
                </div>
              </div>
            </motion.div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-glow-subtle">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-gold" />
              About Shivani
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl uppercase tracking-wide">
              A Life Shaped By <span className="text-gradient-gold">Cosmic Listening</span>
            </h2>
            <div className="mt-6 space-y-5 text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide font-light">
              <p>
                My spiritual path was initiated in a household deeply aligned with Vedic currents, where planetary transits and spiritual laws were observed like the change of seasons. What began as an early childhood calling blossomed into a life devoted to spiritual cartography.
              </p>
              <p>
                For over six years, my work has been defined by sincere companionship rather than mere fortune-telling. Every seeker who crosses my path carries a distinct energetic footprint that the cosmos is attempting to harmonize. My role is to act as a clear, focused translator.
              </p>
              <p>
                Whether calculating planetary dashas, interpreting tarot layouts, or facilitating deep energy alignment, my purpose is simple: to help you shed emotional fatigue, locate your authentic path, and live in deep harmony with your celestial design.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Healing Philosophy & Emotional Transformation */}
      <section className="py-20 relative border-t border-gold/10 bg-background/30">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-glow-subtle">
              The Philosophy
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider">
              Sacred Philosophy & <span className="text-gradient-cosmic">Healing Approach</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              We do not treat symptoms in isolation. We look at the energetic blueprint, historical blockages, and astrological transits to catalyze pure emotional transformation.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                icon: Sun,
                title: "Spiritual Philosophy",
                text: "Every human soul is a pre-charted star navigating physical form. We believe that your current challenges are not random interruptions, but highly structured cosmic prompts designed to awaken your ultimate potential and spiritual awareness."
              },
              {
                icon: Heart,
                title: "Healing Approach",
                text: "We integrate traditional Vedic astrology and intuitive tarot with customized, non-invasive energy purification. By examining both celestial scripts and auric blockages, we balance the mind, clarify the heart, and nourish the spirit."
              },
              {
                icon: Zap,
                title: "Emotional Transformation",
                text: "We focus on resolving the root causes of emotional fatigue, anxiety, and repetitive cycles. Our methods help you release old energetic patterns, clear heavy heart blockages, and claim immediate internal peace and emotional stability."
              }
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl glass p-8 border border-gold/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold flex flex-col justify-between">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sapphire/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  <div>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold/25 to-sapphire/25 text-gold border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-transform duration-500 group-hover:scale-110">
                      <p.icon className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="mt-6 font-display text-xl tracking-wide text-foreground group-hover:text-gold transition-colors duration-300">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground/80 font-light tracking-wide">
                      {p.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Expertise & Healing Modalities */}
      <section className="py-20 relative overflow-hidden border-t border-gold/10">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-glow-subtle">
                Core Expertise
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl uppercase tracking-wider leading-snug">
                Expertise Areas & <span className="text-gradient-gold">Healing Modalities</span>
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light tracking-wide">
                Shivani’s practice bridges centuries-old Eastern linage with modern energy alchemy, establishing a balanced environment where your spiritual expansion can blossom.
              </p>
              
              <div className="mt-8 space-y-3.5">
                {[
                  "Traditional Vedic Astrology & Kundli Mapping",
                  "Intuitive Tarot Divination & Spiritual Translation",
                  "Reiki & Pranic Chakra Cleansing",
                  "Akashic Records Reading & Ancestral Healing",
                  "Energetic Space Purification & Boundary Cleansing",
                  "Spiritual Protection & Life Coaching Integration"
                ].map((item, idx) => (
                  <Reveal key={item} delay={idx * 0.05}>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-gold animate-pulse shrink-0" />
                      <span className="text-xs md:text-sm text-foreground/90 font-light tracking-wider">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 grid-cols-1 sm:grid-cols-2">
              {[
                { title: "Vedic Astrology", icon: Compass, desc: "Detailed natal birth chart (Kundli) calculations analyzing planetary transits, lunar houses, and specific remedial timing (Dashas)." },
                { title: "Tarot Divination", icon: Sparkles, desc: "Channeled intuitive tarot spreads utilizing high-vibrational decks to decode immediate paths and locate clear daily guidance." },
                { title: "Chakra Balance", icon: Layers, desc: "Restoring emotional equilibrium and purifying blockages inside your subtle energy centers (Aura balance)." },
                { title: "Spiritual Coaching", icon: Users, desc: "Integrating clinical life coaching systems with esoteric knowledge to ensure your guidance manifests in practical life success." }
              ].map((m, idx) => (
                <Reveal key={m.title} delay={idx * 0.08}>
                  <div className="glass rounded-2xl p-6 border border-gold/10 hover:border-gold/30 transition-all duration-300 bg-black/30">
                    <div className="h-10 w-10 rounded-lg bg-gold/10 text-gold grid place-items-center mb-4"><m.icon className="h-5 w-5" /></div>
                    <h4 className="font-display text-lg text-gold/90">{m.title}</h4>
                    <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed font-light tracking-wide">{m.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Methodology (Transformation Approach) */}
      <section className="py-20 relative border-t border-gold/10 bg-background/25">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-glow-subtle">
              Methodology
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl uppercase tracking-wider">
              Sacred Session <span className="text-gradient-cosmic">Methodology</span>
            </h2>
            <p className="mt-3 text-xs md:text-sm text-muted-foreground font-light tracking-widest leading-relaxed">
              Every consultation is carefully structured to transition your state from initial confusion into complete crystal clarity.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4 relative">
            <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-gold/10 via-sapphire/15 to-gold/10 -z-10" />
            
            {[
              { step: "01", title: "Sacred Spacing", desc: "Before you connect, Shivani purifies the physical room and virtual dashboard using sacred sound baths and white sage, locking in a protected, confidential environment." },
              { step: "02", title: "Chart Dashboarding", desc: "We review your planetary layouts and current planetary transitions (Jyotish parameters) side-by-side with intuitive tarot inquiries to locate structural themes." },
              { step: "03", title: "Channeled Answers", desc: "We pull intuitive tarot layouts to secure immediate, direct answers to your vital life concerns, providing deep spiritual translation without fear-mongering." },
              { step: "04", title: "Remedial Integration", desc: "We synthesize the session with customized, practical remedies (gemstones, mantras, acts of charity) and emotional grounding to assure lasting internal peace." }
            ].map((s, idx) => (
              <Reveal key={s.title} delay={idx * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full border border-gold/25 bg-background flex items-center justify-center font-display text-lg text-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)] mb-5">
                    {s.step}
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2 font-medium tracking-wide">{s.title}</h3>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed font-light tracking-wide px-2">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Counters & Milestones */}
      <section className="py-20 relative border-t border-gold/10 bg-black/40">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {counters.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-8 text-center border border-gold/10 hover:border-gold/35 transition-all duration-300">
                <div className="font-display text-4xl md:text-5xl text-gradient-gold font-bold">
                  <Counter to={c.value} suffix={c.suffix} />
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">{c.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative border-t border-gold/10 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-glow-subtle">
              The Journey
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl uppercase tracking-wider">Milestones On The Path</h2>
          </div>
          
          <div className="relative mt-14 pl-8 md:pl-0">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-sapphire to-transparent md:left-1/2" />
            {timeline.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative mb-10 md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
              >
                <div className={`${i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                  <div className="glass rounded-2xl p-6 border border-gold/10 hover:border-gold/25 transition-all duration-300 bg-black/25">
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{m.year}</div>
                    <h3 className="mt-2 font-display text-xl text-foreground/95 tracking-wide">{m.title}</h3>
                    <p className="mt-3 text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-light tracking-wide">{m.text}</p>
                  </div>
                </div>
                <span className="absolute left-3 top-6 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-gold shadow-gold md:left-1/2" />
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Shivani Spiritual Yatri */}
      <section className="py-20 relative border-t border-gold/10 bg-background/25">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold text-glow-subtle">
              Authentic Pillars
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl uppercase tracking-wider">
              Why Choose <span className="text-gradient-gold">Shivani Spiritual Yatri</span>
            </h2>
            <p className="mt-4 text-xs md:text-sm text-muted-foreground font-light tracking-widest leading-relaxed">
              We stand apart through our commitment to pure, certified Vedic practices and compassionate, heart-led companioning.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: Award, title: "Certified Practitioner", text: "Trained directly under traditional Vedic masters and certified spiritual guides in Varanasi and Rishikesh." },
              { icon: Heart, title: "Compassion & Respect", text: "Every session is conducted with absolute warmth, non-judgment, and total spiritual empathy." },
              { icon: Shield, title: "Sacred Privacy", text: "Your personal birth metrics, readings, and healing cards are kept in strict confidentiality." },
              { icon: BookOpen, title: "Ever-Expanding Mastery", text: "Continuously deepening studies in multiple esoteric systems to bring you the highest level of care." },
              { icon: CheckCircle2, title: "Ethical Remedial Care", text: "Only authentic, direct remedies are suggested — free from fear-mongering and commercial traps." },
              { icon: Users, title: "Compassionate Integration", text: "Sessions are tailored exactly to your unique vibrational blueprint and immediate life milestones." }
            ].map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <BentoCard className="glass rounded-2xl p-7 text-center bg-black/25">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/10 text-gold mb-5"><h.icon className="h-5 w-5" /></div>
                  <h4 className="font-display text-lg text-foreground mb-3 font-medium tracking-wide">{h.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-light tracking-wide">{h.text}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
