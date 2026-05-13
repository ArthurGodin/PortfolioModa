"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const MANIFESTO =
  "Não vendo coleções. Vendo desejo. A moda é um espelho — e cada marca que toco precisa devolver, pra quem se olha nela, uma versão mais nítida de si mesma. Eu trabalho na intersecção entre o moodboard e a planilha. Entre o que toca e o que converte.";

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });

  const words = MANIFESTO.split(" ");

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative w-full px-6 py-40 md:py-56"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted md:mb-16"
        >
          <span className="h-px w-8 bg-accent" />
          <span>Manifesto</span>
        </motion.div>

        <p className="font-display text-[clamp(1.75rem,4.2vw,3.75rem)] font-light leading-[1.25] text-fg/15">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1.6) / words.length;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex items-center gap-4 md:mt-20"
        >
          <span className="font-display text-2xl italic text-accent">— A.D.</span>
          <span className="h-px flex-1 bg-fg/10" />
        </motion.div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <span aria-hidden className="absolute opacity-15">
        {children}
      </span>
      <motion.span style={{ opacity }} className="relative text-fg">
        {children}
      </motion.span>
    </span>
  );
}
