import { motion } from "framer-motion";
import { CosmicBackground } from "./CosmicBackground";

export function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CosmicBackground density={40} />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full border border-gold/30 bg-gold/5 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-gold"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 font-display text-5xl leading-[1.05] md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
