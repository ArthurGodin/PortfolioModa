"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Slot = {
  id: string;
  /* path under /public when ready */
  src?: string;
  alt: string;
  ratio: "3/4" | "1/1" | "4/5" | "9/16" | "4/3";
  /* fallback while empty */
  gradient: string;
  caption?: string;
};

const SLOTS: Slot[] = [
  {
    id: "L01",
    alt: "Editorial — Maison Lirio",
    ratio: "3/4",
    gradient: "from-[#7B1D26] via-[#893A49] to-[#CA99AB]",
    caption: "Maison Lirio · SS25",
  },
  {
    id: "L02",
    alt: "Lookbook — Studio Bisou",
    ratio: "1/1",
    gradient: "from-[#D3968C] via-[#CA99AB] to-[#E4CDDD]",
    caption: "Studio Bisou",
  },
  {
    id: "L03",
    alt: "BTS — Folha & Pétala",
    ratio: "4/5",
    gradient: "from-[#0A3323] via-[#105666] to-[#839958]",
    caption: "Folha & Pétala",
  },
  {
    id: "L04",
    alt: "Casa Augusta — Atelier",
    ratio: "3/4",
    gradient: "from-[#4C1208] via-[#7B1D26] to-[#D3968C]",
    caption: "Casa Augusta",
  },
  {
    id: "L05",
    alt: "Linha Verde — Programa",
    ratio: "4/3",
    gradient: "from-[#105666] via-[#839958] to-[#F7F4D5]",
    caption: "Linha Verde",
  },
  {
    id: "L06",
    alt: "Niki Atelier — Florescer",
    ratio: "9/16",
    gradient: "from-[#893A49] via-[#D3968C] to-[#F7F4D5]",
    caption: "Niki Atelier",
  },
  {
    id: "L07",
    alt: "Capa Vogue Brasil",
    ratio: "3/4",
    gradient: "from-[#4C1208] via-[#893A49] to-[#CA99AB]",
    caption: "Vogue Brasil",
  },
  {
    id: "L08",
    alt: "Drop romântico — Maison",
    ratio: "1/1",
    gradient: "from-[#CA99AB] via-[#E4CDDD] to-[#F7F4D5]",
    caption: "Maison Lirio",
  },
];

const ratioClass: Record<Slot["ratio"], string> = {
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "9/16": "aspect-[9/16]",
  "4/3": "aspect-[4/3]",
};

export default function Lookbook() {
  return (
    <section
      id="lookbook"
      className="relative w-full px-4 py-32 sm:px-6 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
              <span className="h-px w-8 bg-accent" />
              <span>Lookbook</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-fg">
              Imagens que <em className="italic text-accent">vestem</em> uma narrativa.
            </h2>
          </div>
          <p className="max-w-sm text-fg/70">
            Uma curadoria viva — atualizada a cada campanha, drop ou editorial.
          </p>
        </motion.div>

        {/* CSS-columns masonry: keeps natural ratios + reflows responsively */}
        <div className="columns-2 gap-4 sm:gap-5 md:columns-3 md:gap-6 lg:columns-4">
          {SLOTS.map((s, i) => (
            <LookbookCard key={s.id} slot={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LookbookCard({ slot, index }: { slot: Slot; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-5deg", "5deg"]);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["5deg", "-5deg"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08 }}
      className="mb-4 inline-block w-full break-inside-avoid sm:mb-5 md:mb-6"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        data-cursor="hover"
        className="group relative overflow-hidden rounded-2xl border border-fg/10"
      >
        <div className={`relative w-full ${ratioClass[slot.ratio]}`}>
          {slot.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slot.src}
              alt={slot.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${slot.gradient}`} />
          )}

          {/* Grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* ID corner */}
          <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-beige/80 mix-blend-difference">
            {slot.id}
          </div>

          {/* Caption on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 transition-transform duration-500 group-hover:translate-y-0">
            <div className="font-display text-base italic text-beige">
              {slot.caption}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-beige/70">
              ver detalhes →
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
