import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, Clock, Sparkles, X } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { services } from "@/data/data";
import { SITE } from "@/utils/site";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("calendly");

  const {
    register, handleSubmit, reset, setValue,
    formState: { errors },
  } = useForm();

  const today = new Date();
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const onSubmit = async (data) => {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    const payload = { ...data, date: selectedDate, time: selectedTime };
    try {
      if (SITE.emailjs.publicKey !== "your_public_key") {
        await emailjs.send(
          SITE.emailjs.serviceId,
          SITE.emailjs.templateId,
          payload,
          { publicKey: SITE.emailjs.publicKey }
        );
      } else {
        // Demo mode — simulate send
        await new Promise((r) => setTimeout(r, 800));
        console.log("[Demo] Booking submitted:", payload);
      }
      setSuccess(true);
      reset();
      setSelectedDate("");
      setSelectedTime("");
    } catch (err) {
      console.error(err);
      alert("Could not send booking. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Book Your Session"
        title={<>Schedule Your <span className="text-gradient-gold">Private Consultation</span></>}
        subtitle="Choose a date, time, and service — Shivani will personally confirm your appointment."
      />

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {/* Booking Modality Switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-full border border-gold/20 bg-black/40 p-1.5 backdrop-blur-sm shadow-[0_8px_32px_0_rgba(8,8,8,0.2)]">
              <button
                type="button"
                onClick={() => setActiveTab("calendly")}
                className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeTab === "calendly"
                    ? "bg-gold text-background shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Instant Scheduler
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeTab === "form"
                    ? "bg-gold text-background shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Custom Request Form
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "calendly" ? (
              <motion.div
                key="calendly"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-gold/20 bg-[#242228]/85 backdrop-blur-md p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
                  {/* Corner highlights */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/40 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/40 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/40 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/45 pointer-events-none" />
                  
                  <iframe
                    src="https://calendly.com/shivanispiritualyatri666/30min"
                    className="w-full h-[650px] border-0 rounded-2.5xl"
                    title="Schedule Consultation"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-8 rounded-3xl glass-strong p-6 md:grid-cols-5 md:p-10"
                >
                  {/* Calendar + slots */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
                      <Calendar className="h-4 w-4" /> Select a date
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {dates.map((d) => {
                        const key = d.toISOString().split("T")[0];
                        const isSel = key === selectedDate;
                        return (
                          <button
                            type="button"
                            key={key}
                            onClick={() => { setSelectedDate(key); setValue("date", key); }}
                            className={`rounded-xl border p-2.5 text-center transition-all ${
                              isSel
                                ? "border-gold bg-gold text-background shadow-gold"
                                : "border-gold/15 bg-white/5 text-foreground/85 hover:border-gold/50"
                            }`}
                          >
                            <div className="text-[10px] uppercase tracking-wider opacity-80">
                              {d.toLocaleDateString("en", { weekday: "short" })}
                            </div>
                            <div className="font-display text-lg leading-none mt-1">{d.getDate()}</div>
                            <div className="text-[10px] opacity-70">{d.toLocaleDateString("en", { month: "short" })}</div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
                      <Clock className="h-4 w-4" /> Select a time
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {TIME_SLOTS.map((t) => {
                        const isSel = selectedTime === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => { setSelectedTime(t); setValue("time", t); }}
                            className={`rounded-xl border px-3 py-2.5 text-sm transition-all ${
                              isSel
                                ? "border-gold bg-gold text-background shadow-gold"
                                : "border-gold/15 bg-white/5 text-foreground/85 hover:border-gold/50"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>

                    {(!selectedDate || !selectedTime) && (
                      <p className="mt-4 text-xs text-muted-foreground">Pick both a date and time to continue.</p>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="md:col-span-2 space-y-4">
                    <Field label="Full name" error={errors.name?.message}>
                      <input
                        {...register("name", { required: "Please enter your name", maxLength: 80 })}
                        className="input"
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <input
                        type="email"
                        {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })}
                        className="input"
                      />
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <input
                        {...register("phone", { required: "Phone is required", minLength: { value: 7, message: "Too short" } })}
                        className="input"
                      />
                    </Field>
                    <Field label="Service" error={errors.service?.message}>
                      <select {...register("service", { required: "Please choose a service" })} className="input">
                        <option value="">Select a service…</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Message (optional)">
                      <textarea {...register("message", { maxLength: 500 })} rows={3} className="input resize-none" placeholder="Anything specific you'd like to share?" />
                    </Field>

                    <button
                      disabled={submitting || !selectedDate || !selectedTime}
                      className="w-full rounded-full btn-gold px-6 py-3.5 text-sm font-semibold disabled:opacity-50"
                    >
                      {submitting ? "Confirming…" : "Confirm Appointment"}
                    </button>
                    <p className="text-center text-[11px] text-muted-foreground">
                      By booking you agree to our gentle cancellation policy.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`.input{width:100%;border:1px solid rgba(212,175,55,0.18);background:rgba(255,255,255,0.04);border-radius:12px;padding:11px 14px;font-size:14px;color:inherit;outline:none;transition:all .2s}.input:focus{border-color:#D4AF37;background:rgba(212,175,55,0.04)}`}</style>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-background/80 backdrop-blur-md px-4"
            onClick={() => setSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl glass-strong p-8 text-center shadow-purple"
            >
              <button onClick={() => setSuccess(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-gold to-purple">
                <Check className="h-8 w-8 text-background" />
              </div>
              <h3 className="mt-5 font-display text-3xl text-gradient-gold">Appointment Confirmed</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Your sacred time has been reserved. Shivani will reach out personally within 24 hours with your session details.
              </p>
              <div className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
                <Sparkles className="h-3 w-3" /> Cosmic blessings on your journey
              </div>
              <button onClick={() => setSuccess(false)} className="mt-6 rounded-full btn-gold px-6 py-2.5 text-sm font-semibold">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
