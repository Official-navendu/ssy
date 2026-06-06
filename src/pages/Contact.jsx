import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube,
  ChevronDown, Send, Check, Sparkles,
} from "lucide-react";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { SITE } from "@/utils/site";

import serviceAstrologyImg from "@/assets/images/service_astrology.webp";


const contactFaqs = [
  {
    q: "How do online tarot consultations work?",
    a: "Online tarot sessions are conducted via video call. Before the session, Shivani creates a sacred, calm space and energizes the cards. You will discuss your intentions, formulate questions together, and witness the live card pull, receiving immediate spiritual translation and guidance."
  },
  {
    q: "How can astrology help in life decisions?",
    a: "Vedic astrology acts as a life blueprint. By mapping planetary alignments at your exact moment of birth, it reveals karmic patterns, career opportunities, relationship dynamics, and auspicious timing (dashas) so you can make decisions in energetic alignment."
  },
  {
    q: "Are spiritual healing sessions confidential?",
    a: "Absolutely. Every reading, astrology mapping, and energy healing session is held in sacred confidentiality. We establish a secure, private environment where your personal details and spiritual journey remain strictly between you and Shivani."
  },
  {
    q: "How do I book a consultation?",
    a: "You can easily schedule a session through our online booking page. Simply choose your service, select a convenient slot, and submit the request. Shivani will coordinate with you via WhatsApp to finalize details and secure your sacred session."
  },
  {
    q: "What products do you recommend for beginners?",
    a: "For those beginning their spiritual path, we highly recommend the Amethyst Bracelet for aura cleansing and continuous calming energy, or our Spiritual Protection Kit, which includes clear Palo Santo, Sage, and detailed instructions for home purification rituals."
  }
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (SITE.emailjs.publicKey !== "your_public_key") {
        await emailjs.send(SITE.emailjs.serviceId, SITE.emailjs.templateId, data, { publicKey: SITE.emailjs.publicKey });
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 4500);
    } catch (e) { console.error(e); alert("Could not send. Try WhatsApp."); }
  };

  return (
    <>
      {/* Contact Premium Hero Banner */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 border-b border-gold/10 bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={50} />
        </div>
        
        {/* Dynamic spinning coordinate overlays */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 z-[5]">
          <div className="h-[550px] w-[550px] rounded-full border border-gold/5 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-lavender/8 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "50s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Spotlight Backlights */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-lavender/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-gold/5 blur-[90px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "14s" }} />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
          >
            <Sparkles className="h-3 w-3" /> Get In Touch
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium"
          >
            Let's Begin A <span className="text-gradient-gold">Cosmic Conversation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide"
          >
            Reach out by form, email, or WhatsApp — every message is read personally and held in absolute sacred confidence.
          </motion.p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 relative overflow-hidden bg-background/25">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3 md:px-8">
          {[
            { icon: Phone, label: "Call Directly", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
            { icon: MessageCircle, label: "WhatsApp Chat", value: "Coordinate via chat", href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Namaste! I would like to know more about your astrology and spiritual consultation services.")}` },
            { icon: Mail, label: "Email Sanctuary", value: SITE.email, href: `mailto:${SITE.email}` },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                 className="group block relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_12px_30px_rgba(212,175,55,0.08)] bg-card/10">
                {/* Micro-light element inside cards */}
                <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-lavender/10 blur-xl opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none" />
                
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold/25 to-lavender/25 text-gold border border-gold/20 shadow-[0_0_15px_rgba(216,182,122,0.1)] transition-transform duration-500 group-hover:scale-110">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-gold font-medium">{c.label}</div>
                    <div className="mt-1 text-base md:text-lg font-medium text-foreground/90 transition-colors group-hover:text-gold">{c.value}</div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Message Form & Dark Map Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:px-8 items-stretch">
          {/* Interactive Form Card */}
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl glass p-8 md:p-10 border border-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-card/10 flex flex-col justify-between h-full">
              {/* Soft purple-gold background highlights */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-lavender/5 via-transparent to-gold/5 opacity-40 -z-10" />
              
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-gradient-gold">Send a Message</h2>
                <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed">
                  Share what's on your heart or describe your intentions. Shivani answers personally within 24 hours.
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 relative">
                  <input className="input" placeholder="Your name" {...register("name", { required: true, maxLength: 80 })} />
                  {errors.name && <p className="text-xs text-destructive mt-1">Name required</p>}
                  
                  <input className="input" placeholder="Email address" type="email" {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
                  {errors.email && <p className="text-xs text-destructive mt-1">Valid email required</p>}
                  
                  <input className="input" placeholder="Phone number (optional)" {...register("phone", { maxLength: 20 })} />
                  
                  <textarea className="input resize-none" rows={4} placeholder="Your special intentions or questions..." {...register("message", { required: true, maxLength: 1000 })} />
                  {errors.message && <p className="text-xs text-destructive mt-1">Message required</p>}
                  
                  <button 
                    disabled={isSubmitting} 
                    className="group w-full rounded-full btn-gold px-7 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending Alignment…" : <>Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                  </button>
                </form>
              </div>

              {/* Social links row */}
              <div className="mt-8 border-t border-gold/10 pt-6">
                <div className="text-xs uppercase tracking-[0.25em] text-gold font-medium">Follow Sanctuary</div>
                <div className="mt-4 flex gap-3.5">
  <a
    href="https://www.instagram.com/shivani_spiritual_yatri?igsh=aHU1ZzczbHFyajhq&utm_source=qr"
    target="_blank"
    rel="noreferrer"
    className="rounded-full border border-gold/30 p-3 text-gold hover:bg-gold/10 hover:border-gold/60 transition-colors"
  >
    <Instagram className="h-4 w-4" />
  </a>

  <a
    href="https://www.youtube.com/@Shivani_Spirtual_Yatri"
    target="_blank"
    rel="noreferrer"
    className="rounded-full border border-gold/30 p-3 text-gold hover:bg-gold/10 hover:border-gold/60 transition-colors"
  >
    <Youtube className="h-4 w-4" />
  </a>
</div>
              </div>
            </div>
          </Reveal>

          {/* Premium Dark Location Map Card */}
          <Reveal delay={0.1}>
            <div className="group relative overflow-hidden rounded-3xl glass p-2 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_15px_45px_rgba(216,182,122,0.08)] bg-card/10 flex flex-col justify-between h-full">
              {/* Backlight Glow inside Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-lavender/10 to-gold/5 rounded-3xl blur-3xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Embedded Iframe Container */}
                <div className="relative aspect-[4/3] md:aspect-auto md:flex-1 w-full min-h-[300px] rounded-2xl overflow-hidden border border-gold/20 shadow-[0_10px_25px_rgba(0,0,0,0.45)] bg-background/20 backdrop-blur-sm transition-all duration-700 group-hover:border-gold/45 group-hover:shadow-gold/15 mb-4">
                  {/* Gold Corner Highlights */}
                  <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t border-l border-gold/45 pointer-events-none z-10" />
                  <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t border-r border-gold/45 pointer-events-none z-10" />
                  <div className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b border-l border-gold/45 pointer-events-none z-10" />
                  <div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b border-r border-gold/45 pointer-events-none z-10" />
                  
                  <iframe
                    title="Brampton Sanctuary Location Map"
                    className="h-full w-full opacity-70 group-hover:opacity-85 transition-opacity duration-700"
                    style={{
                      filter: "invert(90%) hue-rotate(180deg) grayscale(80%) contrast(120%) brightness(95%)",
                      border: 0
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=11+Lisa+Street,Brampton,ON,L6T4E8,Canada&output=embed"
                  />
                </div>
                
                {/* Visit info footer inside card */}
                <div className="p-4 pt-1">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold/25 to-lavender/25 text-gold border border-gold/20 shrink-0 shadow-[0_0_15px_rgba(216,182,122,0.15)] animate-pulse">
                      <MapPin className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      <div className="font-display text-lg text-foreground/90 group-hover:text-gold transition-colors duration-300">Visit Sanctuary</div>
                      <div className="text-xs text-muted-foreground/80 leading-relaxed mt-1 tracking-wide">{SITE.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Split Grid Section */}
      <section className="py-20 relative overflow-hidden bg-background/20 border-t border-gold/10">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* LEFT SIDE: Spiritual Image / Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <Reveal>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full max-w-[340px] lg:max-w-none group/faq-img"
                >
                  {/* Purple aura glow behind illustration */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-lavender/35 to-gold/20 rounded-[2rem] blur-3xl opacity-60 group-hover/faq-img:opacity-85 transition-opacity duration-700 pointer-events-none" />

                  {/* Gold-purple rotating orbit border frame */}
                  <div className="absolute -inset-2.5 rounded-[2rem] bg-gradient-to-br from-gold/30 via-lavender/20 to-gold/15 blur-sm opacity-40 animate-spin-slow group-hover/faq-img:opacity-60 transition-all duration-700 -z-10" />

                  {/* Elegant Glass Border Frame */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gold/20 shadow-[0_15px_35px_rgba(0,0,0,0.55)] bg-background/25 backdrop-blur-md transition-all duration-700 group-hover/faq-img:border-gold/45 group-hover/faq-img:shadow-gold/15">
                    <img
                      src={serviceAstrologyImg}
                      alt="Spiritual Guidance FAQ Star Map"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/faq-img:scale-105"
                      loading="lazy"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-[#242032]/10 pointer-events-none" />
                    
                    {/* Gold Corner Highlights */}
                    <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold/45 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold/45 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold/45 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold/45 pointer-events-none" />

                    {/* Glowing Stars floating inside */}
                    <div className="absolute top-6 right-6 text-gold/30 animate-pulse">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </div>

            {/* RIGHT SIDE: Premium Accordions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <Reveal delay={0.1}>
                <div className="text-left mb-8">
                  <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
                    Seek Answers
                  </span>
                  <h2 className="mt-4 font-display text-3xl md:text-4xl">
                    Questions, <span className="text-gradient-gold">Gently Answered</span>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed max-w-lg">
                    Discover how cosmic insight and energy healing are woven into a sacred container tailored just for you.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactFaqs.map((f, i) => {
                    const open = openFaq === i;
                    return (
                      <div 
                        key={i} 
                        className={`rounded-2xl border transition-all duration-300 ${
                          open 
                            ? "bg-card/25 border-gold/35 shadow-[0_5px_20px_rgba(212,175,55,0.06)]" 
                            : "bg-card/5 border-gold/10 hover:border-gold/25"
                        } overflow-hidden`}
                      >
                        <button 
                          onClick={() => setOpenFaq(open ? null : i)} 
                          className="flex w-full items-center justify-between p-5 text-left transition-colors duration-300"
                        >
                          <span className={`font-display text-base md:text-lg transition-colors duration-300 ${open ? "text-gold" : "text-foreground/90 hover:text-gold"}`}>{f.q}</span>
                          <div className={`grid h-7 w-7 place-items-center rounded-full border transition-all duration-300 ${
                            open 
                              ? "border-gold/40 bg-gold/10 text-gold rotate-180" 
                              : "border-gold/15 text-gold/60"
                          }`}>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground/80 border-t border-gold/5 pt-4">
                                {f.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Success Notification */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-24 left-1/2 z-[110] -translate-x-1/2 glass-strong rounded-full px-5 py-3 text-sm shadow-gold flex items-center gap-2 border border-gold/30"
          >
            <Check className="h-4 w-4 text-gold" /> Message sent — blessings on your day
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.input{width:100%;border:1px solid rgba(216,182,122,0.18);background:rgba(255,255,255,0.04);border-radius:12px;padding:11px 14px;font-size:14px;color:inherit;outline:none;transition:all .25s ease-in-out}.input:focus{border-color:#D8B67A;background:rgba(216,182,122,0.04);box-shadow:0 0 10px rgba(216,182,122,0.15)}`}</style>
    </>
  );
}
