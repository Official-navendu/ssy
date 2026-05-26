import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { X, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CosmicBackground } from "@/components/common/CosmicBackground";
import { Reveal } from "@/components/common/Reveal";
import { products } from "@/data/data";
import { SITE } from "@/utils/site";

import productAmethyst from "@/assets/images/product_amethyst.webp";
import productRose from "@/assets/images/product_rose.webp";
import productProtection from "@/assets/images/product_protection.webp";
import productTarot from "@/assets/images/product_tarot.webp";


const productImages = {
  "amethyst-bracelet": productAmethyst,
  "rose-quartz-stone": productRose,
  "protection-kit": productProtection,
  "tarot-deck": productTarot,
};

const productAuras = {
  "amethyst-bracelet": "from-purple/25 via-purple-deep/10 to-gold/5",
  "rose-quartz-stone": "from-rose-500/15 via-gold/10 to-transparent",
  "protection-kit": "from-gold/15 via-purple/10 to-transparent",
  "tarot-deck": "from-gold/20 via-purple-deep/15 to-purple/5",
};

export default function ProductsPage() {
  const [openProduct, setOpenProduct] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const productVal = watch("product");

  const openInquiry = (productName) => {
    setValue("product", productName);
    setOpenProduct(productName);
  };

  const onSubmit = async (data) => {
    try {
      if (SITE.emailjs.publicKey !== "your_public_key") {
        await emailjs.send(SITE.emailjs.serviceId, SITE.emailjs.templateId, data, { publicKey: SITE.emailjs.publicKey });
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (e) { console.error(e); }
    const text = `Namaste! I would like to inquire about:\n\n*Product:* ${data.product}\n*Name:* ${data.name}\n*Phone:* ${data.phone}\n*Address:* ${data.address}\n*Notes:* ${data.notes || "—"}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    setSuccess(true);
    reset();
    setOpenProduct(null);
  };

  return (
    <>
      {/* Products Premium Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28 border-b border-gold/10 bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <CosmicBackground density={50} />
        </div>
        
        {/* Dynamic spinning coordinate overlays */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 z-[5]">
          <div className="h-[550px] w-[550px] rounded-full border border-gold/5 animate-spin-slow" />
          <div className="absolute inset-16 rounded-full border border-purple/8 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "50s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Spotlight Backlights */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-purple/10 blur-[110px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-gold/5 blur-[90px] rounded-full -z-10 animate-pulse" style={{ animationDuration: "14s" }} />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
          >
            <Sparkles className="h-3 w-3" /> Sacred Tools
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl tracking-wider font-medium"
          >
            Spiritual <span className="text-gradient-gold">Healing Products</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-muted-foreground/90 leading-relaxed tracking-wide"
          >
            Carefully selected spiritual tools and healing products designed to elevate your energy, balance your soul, and enhance your spiritual journey.
          </motion.p>
        </div>
      </section>

      {/* Products Showcase 2x2 Premium Grid */}
      <section className="py-20 relative overflow-hidden bg-background/30">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {products.map((p, i) => {
              const imgPath = productImages[p.slug];
              const auraColor = productAuras[p.slug] || "from-purple/20 to-gold/10";
              
              return (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <div className="group relative overflow-hidden rounded-3xl glass p-7 md:p-9 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_15px_45px_rgba(212,175,55,0.08)] bg-card/10 flex flex-col justify-between h-full">
                    {/* Subtle inner-card background glow */}
                    <div className={`absolute -top-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-br ${auraColor} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
                    
                    <div className="flex flex-col h-full justify-between relative z-10">
                      <div>
                        {/* Visual Image container with 16:10 aspect ratio */}
                        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gold/20 shadow-[0_10px_25px_rgba(0,0,0,0.45)] bg-background/20 backdrop-blur-sm transition-all duration-700 group-hover:border-gold/45 group-hover:shadow-gold/15 mb-6">
                          {/* Ambient Shadow & Aura Backlight */}
                          <div className={`absolute -inset-2 bg-gradient-to-tr ${auraColor} rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none`} />
                          
                          <img
                            src={imgPath}
                            alt={p.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          
                          {/* Dark Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-purple-deep/10 pointer-events-none" />
                          
                          {/* Gold Corner Highlights */}
                          <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t border-l border-gold/45 pointer-events-none" />
                          <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t border-r border-gold/45 pointer-events-none" />
                          <div className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b border-l border-gold/45 pointer-events-none" />
                          <div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b border-r border-gold/45 pointer-events-none" />
                        </div>

                        {/* CAD Pricing Badge & Title row */}
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3 py-1">
                            <span className="font-display text-xl text-gold font-medium">${p.price}</span>
                            <span className="text-[9px] tracking-widest text-muted-foreground uppercase mt-0.5">CAD</span>
                          </div>
                        </div>

                        <h3 className="mt-4 font-display text-2xl lg:text-3xl text-foreground/95 group-hover:text-gold transition-colors duration-300">
                          {p.name}
                        </h3>

                        {/* Spiritual Tagline */}
                        <p className="mt-1.5 text-xs italic font-medium text-gold/80 tracking-wide">
                          {p.tagline}
                        </p>

                        {/* Description */}
                        <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground/80">
                          {p.description}
                        </p>

                        {/* Gold Divider */}
                        <div className="my-5 border-t border-gold/10" />

                        {/* Benefits grid layout inside product cards */}
                        <div className="grid gap-2.5 text-xs md:text-sm">
                          {p.benefits.map((b) => (
                            <div key={b} className="flex items-start gap-2.5 text-foreground/90">
                              <div className="grid h-4 w-4 place-items-center rounded bg-gold/10 border border-gold/25 text-gold shrink-0 mt-0.5 animate-pulse">
                                <Sparkles className="h-2.5 w-2.5" />
                              </div>
                              <span className="leading-snug">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA action buttons */}
                      <div className="mt-6 pt-2 flex flex-wrap gap-3">
                        <button
                          onClick={() => openInquiry(p.name)}
                          className="group inline-flex items-center gap-2 rounded-full btn-gold px-5 py-2.5 text-xs font-semibold"
                        >
                          Order Now
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button
                          onClick={() => openInquiry(p.name)}
                          className="inline-flex items-center gap-2 rounded-full btn-outline-gold px-5 py-2.5 text-xs font-semibold"
                        >
                          Explore Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form Modal */}
      <AnimatePresence>
        {openProduct && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-md p-4"
            onClick={() => setOpenProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl glass-strong p-8 max-h-[90vh] overflow-y-auto border border-gold/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <button onClick={() => setOpenProduct(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"><X className="h-5 w-5" /></button>
              <h3 className="font-display text-2.5xl text-gradient-gold">Inquire: {openProduct}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Send your inquiry via WhatsApp — Shivani will coordinate with you personally.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <input type="hidden" {...register("product")} value={productVal} />
                
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Your Name</label>
                  <input className="input" placeholder="Enter your full name" {...register("name", { required: true, maxLength: 80 })} />
                  {errors.name && <p className="text-xs text-destructive mt-1">Name is required</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Phone Number</label>
                  <input className="input" placeholder="Enter your active contact number" {...register("phone", { required: true, minLength: 7 })} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">Valid phone is required</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Delivery Address</label>
                  <input className="input" placeholder="Enter full mailing address for shipping" {...register("address", { required: true, maxLength: 200 })} />
                  {errors.address && <p className="text-xs text-destructive mt-1">Address is required</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Special Customizations / Notes</label>
                  <textarea className="input resize-none" rows={3} placeholder="Any specific intentions or sizing configurations?" {...register("notes", { maxLength: 400 })} />
                </div>

                <button className="w-full rounded-full btn-gold px-5 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 mt-2">
                  <MessageCircle className="h-4 w-4" /> Send Inquiry via WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-24 left-1/2 z-[110] -translate-x-1/2 glass-strong rounded-full px-5 py-3 text-sm shadow-gold flex items-center gap-2 border border-gold/30"
          >
            <Sparkles className="h-4 w-4 text-gold animate-pulse" /> Inquiry sent — opening WhatsApp…
            <button onClick={() => setSuccess(false)} className="ml-2 text-muted-foreground"><X className="h-4 w-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.input{width:100%;border:1px solid rgba(212,175,55,0.18);background:rgba(255,255,255,0.04);border-radius:12px;padding:11px 14px;font-size:14px;color:inherit;outline:none;transition:all .25s ease-in-out}.input:focus{border-color:#D4AF37;background:rgba(212,175,55,0.04);box-shadow:0 0 10px rgba(212,175,55,0.15)}`}</style>
    </>
  );
}
