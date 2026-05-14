"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 8, suffix: "+", label: "Anos de experiência" },
  { value: 40, suffix: "+", label: "Marcas atendidas" },
  { value: 120, suffix: "%", label: "Crescimento médio" },
  { value: 3, suffix: "M+", label: "Alcance gerado" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full px-6 py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
        {/* Image side */}
        <motion.div
          style={{ y: yImg }}
          className="md:col-span-5 md:sticky md:top-32 md:self-start"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-accent/15">
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-parrot-pink/40 dark:from-rosy-brown/30 dark:to-midnight-green/40"
              aria-hidden
            />
            <div
              className="absolute inset-0 flex items-center justify-center font-display text-[10rem] italic text-fg/15"
              aria-hidden
            >
              AD
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="rounded-full bg-bg/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-fg backdrop-blur">
                Angélica Dantas
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-fg/70">
                SP · BR
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-6 hidden md:block"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
              <span className="h-px w-8 bg-accent" />
              <span>Sobre</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          style={{ y: yText }}
          className="md:col-span-7"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-fg"
          >
            Construo <em className="font-normal italic text-accent">marcas</em>{" "}
            que vestem pessoas — e movem mercados.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 space-y-5 text-lg leading-relaxed text-fg/80"
          >
            <p>
              Por quase uma década venho unindo moda e marketing — guiando
              marcas do briefing à venda, do moodboard ao ROAS. Trabalho com
              fundadoras, e-commerces emergentes e maisons que entenderam uma
              coisa: estética sem estratégia é decoração.
            </p>
          </motion.div>

          {/* Inline manifesto / mantra — replaces the standalone Manifesto section */}
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display mt-10 border-l-2 border-accent pl-6 text-2xl font-light italic leading-snug text-fg/90 md:text-3xl"
          >
            "Não vendo coleções. Vendo desejo."
            <footer className="mt-3 not-italic text-xs uppercase tracking-[0.25em] text-muted">
              — A.D.
            </footer>
          </motion.blockquote>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-fg/15 pt-4"
              >
                <div className="font-display text-4xl font-semibold text-accent md:text-5xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-fg/60">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
