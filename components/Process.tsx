"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    n: "01",
    title: "Imersão",
    body: "Briefing, escuta ativa, mapeamento de marca, mercado e desejo.",
  },
  {
    n: "02",
    title: "Estratégia",
    body: "Posicionamento, narrativa, calendário e KPIs antes de qualquer pixel.",
  },
  {
    n: "03",
    title: "Direção",
    body: "Moodboard, casting, styling, produção. A imagem é construída.",
  },
  {
    n: "04",
    title: "Execução",
    body: "Performance, mídia, conteúdo recorrente, CRM e relatórios.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      id="process"
      className="relative w-full px-6 py-32 md:py-48"
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
            <span>Método</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-fg">
            Quatro etapas. <em className="italic text-accent">Zero atalho.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          {/* Steps list */}
          <div className="md:col-span-7">
            <ol className="space-y-12">
              {STEPS.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="group flex items-start gap-6 border-l border-fg/15 pl-6 transition-colors hover:border-accent md:gap-10"
                >
                  <div className="font-display text-3xl font-light italic text-accent/70 md:text-4xl">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-fg md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-md text-fg/70">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* BTS video slots — vertical pair with offset parallax */}
          <div className="grid grid-cols-2 gap-4 md:col-span-5 md:gap-6">
            <motion.div
              style={{ y: yA }}
              className="self-start"
            >
              <BTSVideoSlot
                tag="BTS · 01"
                caption="Produção · Studio Bisou"
                gradient="from-[#7B1D26] via-[#D3968C] to-[#E4CDDD]"
              />
            </motion.div>
            <motion.div
              style={{ y: yB }}
              className="self-end"
            >
              <BTSVideoSlot
                tag="BTS · 02"
                caption="Live drop · Casa Augusta"
                gradient="from-[#0A3323] via-[#105666] to-[#839958]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BTSVideoSlot({
  tag,
  caption,
  gradient,
  src,
}: {
  tag: string;
  caption: string;
  gradient: string;
  src?: string;
}) {
  return (
    <div
      data-cursor="hover"
      className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-fg/10 shadow-xl"
    >
      {src ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />
      <div className="absolute left-3 top-3">
        <span className="rounded-full bg-black/30 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-beige backdrop-blur">
          {tag}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-beige/50 bg-black/30 text-beige backdrop-blur transition-transform group-hover:scale-110">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-3 px-3 font-display text-sm italic text-beige">
        {caption}
      </div>
    </div>
  );
}
