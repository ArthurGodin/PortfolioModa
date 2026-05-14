"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const SERVICES: { num: string; title: string; desc: string; bullets: string[] }[] = [
  {
    num: "01",
    title: "Direção Criativa",
    desc: "Da concept board ao photoshoot. Estética com propósito.",
    bullets: ["Moodboards", "Casting & Styling", "Art direction"],
  },
  {
    num: "02",
    title: "Branding de Moda",
    desc: "Identidade visual, tom de voz e arquitetura de marca completa.",
    bullets: ["Naming", "Logo & sistema visual", "Brand book"],
  },
  {
    num: "03",
    title: "Marketing Digital",
    desc: "Performance, CRM e funil para marcas de moda e beleza.",
    bullets: ["Meta & Google Ads", "E-mail & SMS", "Analytics"],
  },
  {
    num: "04",
    title: "Conteúdo & Editorial",
    desc: "Campanhas, lookbooks e séries para redes e e-commerce.",
    bullets: ["Roteiros", "Produção", "Edição"],
  },
  {
    num: "05",
    title: "Estratégia Comercial",
    desc: "Lançamentos, drops e calendarização que vendem.",
    bullets: ["Pricing", "Drop calendar", "Forecast"],
  },
  {
    num: "06",
    title: "Influência & PR",
    desc: "Curadoria de creators, gifting estratégico e media kit.",
    bullets: ["Casting digital", "Briefings", "Relatórios"],
  },
];

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 18, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-7deg", "7deg"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full px-6 py-32 md:py-48"
      style={{ perspective: 1400 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-24 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
              <span className="h-px w-8 bg-accent" />
              <span>Serviços</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-fg">
              O que entrego, <br />
              <em className="italic text-accent">do briefing ao boom.</em>
            </h2>
          </div>
          <p className="max-w-md text-fg/70">
            Cada projeto é desenhado a partir do DNA da marca. Sem template, sem
            atalho — mas com método.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
            >
              <TiltCard>
                <article
                  data-cursor="hover"
                  className="group relative h-full overflow-hidden rounded-3xl border border-fg/10 bg-card/60 p-8 backdrop-blur transition-colors hover:border-accent/40"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/0 blur-3xl transition-all duration-700 group-hover:bg-accent/30"
                    aria-hidden
                  />
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl font-light italic text-accent/60">
                      {s.num}
                    </span>
                    <span className="mt-3 inline-block h-3 w-3 rounded-full bg-accent transition-transform group-hover:scale-150" />
                  </div>
                  <h3 className="font-display mt-8 text-3xl font-medium leading-tight text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-fg/70">{s.desc}</p>
                  <ul className="mt-6 space-y-1.5 text-sm text-fg/60">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="inline-block h-px w-4 bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Method strip — folds the old Process section in as a compact bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-20 border-t border-fg/10 pt-12 md:mt-28 md:pt-16"
        >
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
                <span className="h-px w-8 bg-accent" />
                <span>Método</span>
              </div>
              <h3 className="font-display text-2xl font-light leading-tight text-fg md:text-3xl">
                Quatro etapas. <em className="italic text-accent">Zero atalho.</em>
              </h3>
            </div>
          </div>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m, i) => (
              <motion.li
                key={m.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-l border-fg/15 pl-5 transition-colors hover:border-accent"
              >
                <div className="font-display text-2xl italic text-accent/70">
                  {m.num}
                </div>
                <h4 className="font-display mt-1 text-xl font-medium text-fg">
                  {m.title}
                </h4>
                <p className="mt-2 text-sm text-fg/65">{m.body}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

const METHOD = [
  {
    num: "01",
    title: "Imersão",
    body: "Briefing, escuta ativa, mapeamento de marca e desejo.",
  },
  {
    num: "02",
    title: "Estratégia",
    body: "Posicionamento, narrativa e KPIs antes do pixel.",
  },
  {
    num: "03",
    title: "Direção",
    body: "Moodboard, casting, styling, produção. A imagem é construída.",
  },
  {
    num: "04",
    title: "Execução",
    body: "Performance, mídia, conteúdo, CRM e relatórios.",
  },
];
