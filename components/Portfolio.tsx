"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Project = {
  client: string;
  category: string;
  title: string;
  year: string;
  metric: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    client: "Maison Lirio",
    category: "Branding · Editorial",
    title: "O retorno do romântico",
    year: "2025",
    metric: "+312% sell-through",
    gradient: "from-[#7B1D26] via-[#893A49] to-[#CA99AB]",
  },
  {
    client: "Folha & Pétala",
    category: "E-commerce · Performance",
    title: "Drop de inverno em 72h",
    year: "2025",
    metric: "ROAS 8.4x",
    gradient: "from-[#0A3323] via-[#105666] to-[#839958]",
  },
  {
    client: "Studio Bisou",
    category: "Direção Criativa",
    title: "Campanha SS25 — A Cor da Manhã",
    year: "2025",
    metric: "1.2M impressões",
    gradient: "from-[#D3968C] via-[#CA99AB] to-[#E4CDDD]",
  },
  {
    client: "Casa Augusta",
    category: "Lançamento",
    title: "De atelier para o e-commerce",
    year: "2024",
    metric: "R$ 480k em 30 dias",
    gradient: "from-[#4C1208] via-[#7B1D26] to-[#D3968C]",
  },
  {
    client: "Linha Verde",
    category: "Marketing · CRM",
    title: "Programa de fidelidade",
    year: "2024",
    metric: "AOV +47%",
    gradient: "from-[#105666] via-[#839958] to-[#F7F4D5]",
  },
  {
    client: "Niki Atelier",
    category: "Editorial",
    title: "Lookbook 'Florescer'",
    year: "2024",
    metric: "Capa Vogue Brasil",
    gradient: "from-[#893A49] via-[#D3968C] to-[#E4CDDD]",
  },
];

export default function Portfolio() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="relative w-full px-4 py-32 sm:px-6 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mb-16 md:mb-24"
        >
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-accent" />
            <span>Cases</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-fg">
            Trabalhos selecionados, <br />
            <em className="italic text-accent">resultados que vestem.</em>
          </h2>
        </motion.div>

        <ul className="divide-y divide-fg/10 border-y border-fg/10">
          {PROJECTS.map((p, i) => (
            <li key={p.title}>
              <motion.a
                href="#"
                data-cursor="hover"
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="group relative flex items-center gap-3 px-3 py-7 transition-colors sm:gap-4 sm:px-5 md:gap-6 md:py-9"
              >
                {/* Sliding background */}
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{
                    scaleY: hoverIdx === i ? 1 : 0,
                    opacity: hoverIdx === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 1 }}
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${p.gradient}`}
                />
                {/* Scrim for contrast over light gradients */}
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: hoverIdx === i ? 0.5 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-[#1a0a08]"
                />

                {/* Number */}
                <span className="relative hidden w-10 shrink-0 font-mono text-xs text-fg/40 transition-colors group-hover:text-beige/70 md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title + category (flex-1, can shrink) */}
                <span className="relative flex min-w-0 flex-1 flex-col">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-fg/50 transition-colors group-hover:text-beige/80 sm:text-xs">
                    {p.category}
                  </span>
                  <span className="font-display mt-1.5 text-2xl font-light leading-tight text-fg transition-colors group-hover:text-beige sm:text-3xl md:mt-2 md:text-4xl lg:text-5xl">
                    {p.title}
                  </span>
                </span>

                {/* Client + year (fixed width) */}
                <span className="relative hidden w-32 shrink-0 text-xs leading-tight text-fg/70 transition-colors group-hover:text-beige/90 lg:block">
                  <span className="block font-medium">{p.client}</span>
                  <span className="block text-fg/40 transition-colors group-hover:text-beige/60">
                    {p.year}
                  </span>
                </span>

                {/* Metric (fixed width, right-aligned) */}
                <span className="relative hidden w-44 shrink-0 text-right md:block xl:w-52">
                  <span className="font-display text-lg italic text-accent transition-colors group-hover:text-beige md:text-xl xl:text-2xl">
                    {p.metric}
                  </span>
                </span>

                {/* Arrow (dedicated column, doesn't overlap anything) */}
                <span className="relative flex w-8 shrink-0 items-center justify-end text-xl text-fg/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-beige md:w-10 md:text-2xl">
                  →
                </span>
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Mobile fallback strip — shown under each item on small screens */}
        <p className="mt-6 text-xs text-fg/50 md:hidden">
          Toque para abrir cada case. Métricas detalhadas e cliente disponíveis na visualização completa.
        </p>
      </div>
    </section>
  );
}
