import { motion } from "framer-motion";

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mx-auto max-w-2xl ${align === "center" ? "text-center" : "text-left mx-0"}`}
    >
      {eyebrow && (
        <span className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
