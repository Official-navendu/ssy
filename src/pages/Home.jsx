import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { ArrowRight, Sparkles, Quote, PlayCircle, Compass, Award, Heart, ShieldCheck } from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { services, testimonials, trust } from "@/data/data";
import { StonesShowcase } from "@/components/home/StonesShowcase";
import aboutPreviewImg from "@/assets/images/about_preview.webp";
import testimonialClientImg from "@/assets/images/testimonial_client.webp";


export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <CosmicBackground density={90} />
        {/* glowing rings */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
          <div className="h-[600px] w-[600px] rounded-full border border-gold/5 animate-spin-slow" />
          <div className="absolute inset-12 rounded-full border border-purple/8 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "40s" }} />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-8">
          <div className="mx-auto max-w-4xl text-center relative">
            {/* Cinematic Divine Text Spotlights */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "9s" }} />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-gold/5 blur-[95px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "13s" }} />

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
            >
              <Sparkles className="h-3 w-3" /> Spiritual Yatri · Est. 2020
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-8 font-display text-4xl leading-[1.18] md:text-5xl lg:text-6xl tracking-wider font-medium"
            >
              Unlock Your <span className="text-gradient-cosmic">Destiny</span>
              <br /> With Tarot & Astrology
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-8 max-w-2xl text-sm md:text-base text-muted-foreground/80 leading-relaxed tracking-wide"
            >
              Guiding your life journey through spiritual wisdom and cosmic energy — authentic Vedic insight, intuitive tarot, and energy healing rooted in ancient tradition.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-5"
            >
              <Link to="/booking" className="group inline-flex items-center gap-2.5 rounded-full btn-gold px-8 py-3.5 text-sm font-semibold">
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2.5 rounded-full btn-outline-gold px-8 py-3.5 text-sm font-semibold">
                Explore Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          {trust.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-gold">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold/30 to-purple/30 text-gold">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl text-gradient-gold">{t.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-20">
        <SectionHeading
          eyebrow="Sacred Offerings"
          title={<>Spiritual Services <span className="text-gradient-gold">Crafted For You</span></>}
          subtitle="Each session is a personal journey — designed to bring clarity, healing, and direction to your life."
        />
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-7 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-purple/20 blur-3xl transition-opacity group-hover:bg-gold/20" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-purple text-background">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <Link
                    to="/services"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:gap-2.5 transition-all"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STONES SHOWCASE */}
      <StonesShowcase />

      {/* ABOUT PREVIEW */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:px-8">
          <Reveal>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-md aspect-[4/5] group/about"
            >
              {/* Ambient Cosmic Aura Backlight */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple/40 via-purple-deep/30 to-gold/25 rounded-[2.5rem] blur-3xl opacity-60 group-hover/about:opacity-85 transition-opacity duration-700 pointer-events-none" />

              {/* Slow Spinning Gold-Purple Halo */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-gold via-purple/50 to-gold/30 opacity-40 blur-md animate-spin-slow group-hover/about:opacity-60 transition-all duration-700 -z-10" />

              {/* Glassmorphism Border Frame */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-background/20 backdrop-blur-sm transition-all duration-700 group-hover/about:border-gold/55 group-hover/about:shadow-gold/20">
                
                {/* Premium Image with Parallax Hover effect */}
                <motion.img
                  src={aboutPreviewImg}
                  alt="Shivani Spiritual Yatri"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/about:scale-105"
                />

                {/* Elegant Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-purple-deep/10 pointer-events-none" />
                
                {/* Subtle Sparkle Overlays */}
                <div className="absolute top-4 right-4 text-gold/30 animate-pulse">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
              About Shivani
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              A Spiritual Yatri <span className="text-gradient-gold">Walking With You</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              For over five years, Shivani has guided souls through the intersection of ancient Vedic wisdom and modern life — blending tarot, astrology, and energy healing into a single sacred practice.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Her work is rooted in compassion, honesty, and the belief that every life has a luminous, knowable design.
            </p>
            <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-full btn-outline-gold px-6 py-3 text-sm font-semibold">
              Discover Her Story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative py-20 overflow-hidden border-t border-gold/10">
        {/* Subtle decorative orbits in bg */}
        <div className="pointer-events-none absolute left-10 top-1/2 w-80 h-80 rounded-full border border-gold/5 blur-[2px] -z-10" />
        <div className="pointer-events-none absolute right-10 bottom-10 w-96 h-96 rounded-full border border-purple/5 blur-[2px] -z-10" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Sacred Pillars"
            title={<>Why Choose <span className="text-gradient-gold">Shivani Spiritual Yatri</span></>}
            subtitle="Guiding souls with authentic spiritual wisdom, energy healing, and cosmic clarity."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {[
              {
                icon: Compass,
                title: "Personalized Spiritual Guidance",
                desc: "Customized readings and consultations tailored precisely to your energetic blueprint and unique life path."
              },
              {
                icon: Award,
                title: "Trusted Astrology Expertise",
                desc: "Rooted in years of deep study and master-certified Vedic lineage to deliver profound cosmic clarity."
              },
              {
                icon: Heart,
                title: "Positive Energy Healing",
                desc: "Realign your subtle centers, clear heavy emotional blocks, and elevate your daily vibrations."
              },
              {
                icon: ShieldCheck,
                title: "Confidential & Secure Sessions",
                desc: "Every consultation is held in absolute sacred trust, ensuring a secure, compassionate space for growth."
              }
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl glass p-7 border border-gold/15 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold flex flex-col justify-between">
                  {/* Cosmic glow behind card */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  
                  <div>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold/25 to-purple/25 text-gold border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-transform duration-500 group-hover:scale-110">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl leading-snug text-foreground/95 group-hover:text-gold transition-colors duration-300">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                      {f.desc}
                    </p>
                  </div>

                  {/* Subtle lower-right sparkle decoration */}
                  <div className="absolute bottom-4 right-4 text-gold/10 opacity-0 group-hover:opacity-100 group-hover:text-gold/20 transition-all duration-500">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO + TESTIMONIALS */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-8 items-center">
          <Reveal>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl group/testimonial-img"
            >
              {/* Glowing Purple Aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple/30 to-gold/20 rounded-3xl blur-2xl opacity-60 group-hover/testimonial-img:opacity-85 transition-opacity duration-700 pointer-events-none" />

              {/* Luxury Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold/35 shadow-[0_15px_40px_rgba(0,0,0,0.6)] bg-background/35 backdrop-blur-md transition-all duration-700 group-hover/testimonial-img:border-gold/60 group-hover/testimonial-img:shadow-gold/25">
                <img
                  src={testimonialClientImg}
                  alt="Spiritual Yatri Testimonial Serenity"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover/testimonial-img:scale-[1.04]"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent pointer-events-none" />

                {/* Corner highlights */}
                <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/45 pointer-events-none" />
                <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/45 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/45 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/45 pointer-events-none" />

                {/* Subtle text card overlay */}
                <div className="absolute bottom-4 left-6 z-10 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                    <Sparkles className="h-3 w-3" /> Guided Soul
                  </div>
                  <div className="font-display text-base text-foreground/95">Universal Peace & Clarity</div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Souls We've Guided"
              title={<>Words From Those Who <span className="text-gradient-gold">Walked The Path</span></>}
            />
            <div className="mt-8">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                loop
                spaceBetween={20}
              >
                {testimonials.map((t) => (
                  <SwiperSlide key={t.name}>
                    <div className="glass rounded-2xl p-7 pb-12">
                      <Quote className="h-7 w-7 text-gold/60" />
                      <p className="mt-4 text-base leading-relaxed text-foreground/90">"{t.text}"</p>
                      <div className="mt-5 border-t border-gold/10 pt-4">
                        <div className="font-display text-lg text-gold">{t.name}</div>
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl glass-strong px-8 py-16 text-center md:px-16">
              <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-purple/40 blur-3xl" />
              <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />
              <div className="relative">
                <PlayCircle className="mx-auto h-12 w-12 text-gold" />
                <h2 className="mt-5 font-display text-4xl md:text-5xl">
                  Ready to <span className="text-gradient-cosmic">Begin Your Journey?</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                  Book your private consultation today and step into the path the universe has shaped for you.
                </p>
                <Link to="/booking" className="mt-8 inline-flex items-center gap-2 rounded-full btn-gold px-8 py-4 text-sm font-semibold">
                  Book Your Appointment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
