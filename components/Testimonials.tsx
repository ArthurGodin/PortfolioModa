"use client";

import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  gradient: string;
};

const ITEMS: Testimonial[] = [
  {
    quote:
      "Saímos de um Instagram bonito para um negócio que vende sozinho.",
    name: "Luiza Mendes",
    role: "Founder · Maison Lirio",
    gradient: "from-[#7B1D26] via-[#893A49] to-[#CA99AB]",
  },
  {
    quote:
      "Estratégia, estética e resultado no mesmo pacote. Raro encontrar.",
    name: "Camila Rocha",
    role: "Diretora · Casa Augusta",
    gradient: "from-[#0A3323] via-[#105666] to-[#839958]",
  },
  {
    quote:
      "O drop que fizemos com ela bateu meta em 4 horas. Quatro.",
    name: "Beatriz Lacerda",
    role: "CEO · Folha & Pétala",
    gradient: "from-[#4C1208] via-[#D3968C] to-[#E4CDDD]",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
              <span className="h-px w-8 bg-accent" />
              <span>Depoimentos</span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.05] text-fg">
              O que dizem <em className="italic text-accent">de mim.</em>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-fg/10 bg-card/60 backdrop-blur transition-colors hover:border-accent/40"
            >
              {/* Top accent strip */}
              <div
                className={`relative h-2 bg-gradient-to-r ${t.gradient}`}
                aria-hidden
              />

              <div className="flex flex-1 flex-col gap-6 p-7 md:p-8">
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-accent/50"
                >
                  "
                </span>
                <blockquote className="font-display flex-1 text-xl font-light italic leading-snug text-fg md:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="border-t border-fg/10 pt-4">
                  <div className="text-sm font-medium text-fg">{t.name}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-fg/55">
                    {t.role}
                  </div>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
