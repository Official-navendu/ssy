import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Heart, Compass, Award, BookOpen, Sun } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import aboutFullImg from "@/assets/images/about_full.webp";


const timeline = [
  { year: "2018", title: "The Awakening", text: "Discovered the path of tarot and Vedic astrology under traditional guidance in Rishikesh." },
  { year: "2020", title: "Sacred Practice Begins", text: "Started offering private consultations, blending intuitive tarot with classical kundli analysis." },
  { year: "2022", title: "Energy Healing Mastery", text: "Trained in chakra healing and energy work, expanding offerings to holistic spiritual care." },
  { year: "2024", title: "1000+ Souls Guided", text: "Reached a milestone of one thousand consultations across India and abroad." },
  { year: "Today", title: "Shivani Spiritual Yatri", text: "A modern sanctuary for those seeking authentic, compassionate, cosmic guidance." },
];

const counters = [
  { label: "Consultations", value: 1000, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Satisfied Souls", value: 98, suffix: "%" },
  { label: "Countries Reached", value: 12, suffix: "" },
];

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
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
        eyebrow="About Shivani"
        title={<>The Spiritual Yatri <span className="text-gradient-gold">Behind The Practice</span></>}
        subtitle="A journey of devotion, study, and service — guiding souls back to their cosmic design."
      />

      {/* Personal branding */}
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:px-8">
          <Reveal>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-md aspect-[4/5] group/about-story"
            >
              {/* Concentric Cosmic Orbit Line Behind (Feminine Moon/Astrology theme) */}
              <div className="absolute inset-[-30px] rounded-full border border-gold/10 animate-spin-slow pointer-events-none -z-20" style={{ animationDuration: "60s" }} />
              <div className="absolute inset-[-15px] rounded-full border border-purple/15 animate-spin-slow pointer-events-none -z-20" style={{ animationDirection: "reverse", animationDuration: "40s" }} />

              {/* Cinematic Nebula Glow Backdrop */}
              <div className="absolute -inset-6 bg-gradient-to-br from-purple/50 via-purple-deep/40 to-gold/30 rounded-[3rem] blur-3xl opacity-70 group-hover/about-story:opacity-90 transition-opacity duration-1000 pointer-events-none" />

              {/* Halo Frame Outer Border */}
              <div className="absolute -inset-2.5 rounded-[2.5rem] bg-gradient-to-br from-gold/40 via-purple/30 to-gold/20 blur-md opacity-50 group-hover/about-story:opacity-75 transition-all duration-700 -z-10" />

              {/* Main Glassmorphism Editorial Frame */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-gold/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-background/30 backdrop-blur-md transition-all duration-700 group-hover/about-story:border-gold/50 group-hover/about-story:shadow-gold/30">
                
                {/* Cinematic Portrait Image */}
                <motion.img
                  src={aboutFullImg}
                  alt="Shivani Spiritual Yatri Sanctuary"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/about-story:scale-[1.06]"
                />

                {/* Storytelling Ambient Light Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-80 group-hover/about-story:opacity-60 transition-opacity duration-700 pointer-events-none" />

                {/* Gold Corner Accents (Luxury Framed feel) */}
                <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-gold/40 pointer-events-none" />
                <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-gold/40 pointer-events-none" />
                <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-gold/40 pointer-events-none" />
                <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-gold/40 pointer-events-none" />

                {/* Elegant Overlay Sparkles */}
                <div className="absolute top-8 right-8 text-gold/40 animate-pulse pointer-events-none">
                  <Sparkles className="h-5 w-5" />
                </div>

                {/* Tiny details text layered on top */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.35em] text-gold/60 pointer-events-none font-medium text-center w-full">
                  Shivani · Spiritual Yatri Sanctuary
                </div>
              </div>
            </motion.div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
              My Story
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">A life shaped by <span className="text-gradient-gold">cosmic listening</span></h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>I was born into a household where the planets were spoken of like family — their movements known, their guidance respected. What began as childhood curiosity grew into a lifelong devotion.</p>
              <p>For me, this work is not prediction — it is companionship. Every person who arrives carries a story the universe is trying to tell. My role is to listen, translate, and walk beside them.</p>
              <p>Whether through the cards, a kundli, or quiet energy work, my hope is the same: that you leave lighter, clearer, and more deeply at home in your own life.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Counters */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {counters.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-8 text-center">
                <div className="font-display text-5xl text-gradient-gold">
                  <Counter to={c.value} suffix={c.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
              Spiritual Journey
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Milestones on the path</h2>
          </div>
          <div className="relative mt-14 pl-8 md:pl-0">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-purple to-transparent md:left-1/2" />
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
                  <div className="glass rounded-2xl p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{m.year}</div>
                    <h3 className="mt-2 font-display text-2xl">{m.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                  </div>
                </div>
                <span className="absolute left-3 top-6 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-gold shadow-gold md:left-1/2" />
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 md:px-8">
          {[
            { icon: Compass, title: "Mission", text: "To bring authentic, compassionate spiritual guidance to every soul seeking clarity — without dogma, without fear, without commercialization." },
            { icon: Sun, title: "Vision", text: "A world where ancient wisdom and modern living coexist gracefully, and where every person feels companioned by something larger than themselves." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="glass-strong h-full rounded-3xl p-8">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-purple text-background">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-3xl text-gradient-gold">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-3 md:px-8">
          {[
            { icon: Award, title: "Certified Practitioner", text: "Trained under traditional Vedic masters in Rishikesh and Varanasi." },
            { icon: Heart, title: "Compassion First", text: "Sessions held in confidence, warmth, and absolute respect." },
            { icon: BookOpen, title: "Continuing Study", text: "An ever-deepening practice in tarot, jyotish, and energy work." },
          ].map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="glass rounded-2xl p-7 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/10 text-gold"><h.icon className="h-5 w-5" /></div>
                <h4 className="mt-4 font-display text-xl">{h.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
