"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";

const reveal = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.04 * i + 0.2,
    },
  }),
};

const NAME_LINE_1 = "ANGÉLICA".split("");
const NAME_LINE_2 = "DANTAS".split("");

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Gentle exit — no scale, just a small lift + fade */
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  /* Scroll indicator fades aggressively as soon as user starts scrolling */
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      style={{ position: "relative" }}
      className="isolate flex min-h-[100svh] w-full items-center justify-center pt-20"
    >
      {/* Animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-20 h-[34rem] w-[34rem] rounded-full bg-accent/40 blur-3xl dark:bg-rosy-brown/30" />
        <div
          className="animate-blob absolute right-[-10rem] bottom-[-6rem] h-[36rem] w-[36rem] rounded-full bg-parrot-pink/60 blur-3xl dark:bg-midnight-green/50"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-blob absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-queen-pink/50 blur-3xl dark:bg-moss-green/20"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-accent" />
          <span className="text-xs uppercase tracking-[0.4em] text-muted">
            Portfolio · 2026
          </span>
          <span className="h-px w-12 bg-accent" />
        </motion.div>

        {/* Massive name — each letter is its own animated unit, no clipping anywhere */}
        <h1 className="font-display select-none text-fg">
          <span className="block leading-[1] pb-[0.05em]">
            {NAME_LINE_1.map((l, i) => (
              <motion.span
                key={`a-${i}`}
                custom={i}
                variants={reveal}
                initial="hidden"
                animate="visible"
                className="inline-block text-[clamp(3.5rem,14vw,12rem)] font-black tracking-tight"
              >
                {l}
              </motion.span>
            ))}
          </span>
          <span className="block -mt-[0.05em]">
            {NAME_LINE_2.map((l, i) => (
              <motion.span
                key={`d-${i}`}
                custom={i + NAME_LINE_1.length}
                variants={reveal}
                initial="hidden"
                animate="visible"
                className="accent-name inline-block italic text-[clamp(3.5rem,14vw,12rem)] font-light tracking-[0.04em]"
              >
                {l}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
          className="mt-10 max-w-2xl text-balance text-base font-light leading-relaxed text-fg/80 sm:text-lg md:text-xl"
        >
          Direção criativa, estratégia de marca e marketing para o universo da
          moda. Onde estética encontra performance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="#portfolio"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-beige no-underline"
          >
            <span className="relative z-10">Ver projetos</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">
              →
            </span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-fg transition-transform duration-500 ease-out group-hover:translate-y-0" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 rounded-full border border-fg/20 px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-fg no-underline transition-colors hover:border-fg/60"
          >
            <span>Vamos conversar</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — vertical, anchored to bottom-right.
          Won't ever overlap the centered CTAs. Fades away on first scroll. */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-6 hidden flex-col items-center gap-3 md:flex"
      >
        <span
          className="text-[10px] uppercase tracking-[0.4em] text-fg/50"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-fg/15">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
          />
        </span>
      </motion.div>
    </section>
  );
}
