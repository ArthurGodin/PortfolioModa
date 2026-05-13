"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Reel = {
  id: string;
  tag: string;
  title: string;
  client: string;
  src?: string;
  poster?: string;
  gradient: string;
  rotate: number;
};

const REELS: Reel[] = [
  {
    id: "01",
    tag: "Story · BTS",
    title: "Bastidor da campanha SS25",
    client: "Studio Bisou",
    gradient: "from-[#7B1D26] via-[#D3968C] to-[#E4CDDD]",
    rotate: -2,
  },
  {
    id: "02",
    tag: "Reel · Editorial",
    title: "Lookbook 'Florescer'",
    client: "Niki Atelier",
    gradient: "from-[#4C1208] via-[#893A49] to-[#CA99AB]",
    rotate: 1.5,
  },
  {
    id: "03",
    tag: "Drop · Launch",
    title: "Inverno em 72h",
    client: "Folha & Pétala",
    gradient: "from-[#0A3323] via-[#105666] to-[#839958]",
    rotate: -1.2,
  },
  {
    id: "04",
    tag: "BTS · Direção",
    title: "Casting Maison Lirio",
    client: "Maison Lirio",
    gradient: "from-[#893A49] via-[#CA99AB] to-[#F7F4D5]",
    rotate: 2,
  },
  {
    id: "05",
    tag: "Reel · Story",
    title: "Live de venda · 4h",
    client: "Casa Augusta",
    gradient: "from-[#105666] via-[#839958] to-[#F7F4D5]",
    rotate: -2.4,
  },
  {
    id: "06",
    tag: "Editorial",
    title: "Capa Vogue Brasil",
    client: "Niki Atelier",
    gradient: "from-[#4C1208] via-[#7B1D26] to-[#D3968C]",
    rotate: 1.8,
  },
  {
    id: "07",
    tag: "Reel",
    title: "Romântico — drop 02",
    client: "Maison Lirio",
    gradient: "from-[#D3968C] via-[#E4CDDD] to-[#F7F4D5]",
    rotate: -1,
  },
];

export default function Reels() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* Horizontal travel */
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section ref={ref} id="reels" className="relative h-[380vh] w-full">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-card/70">
        {/* Top eyebrow */}
        <div className="px-6 pt-24 md:px-12 md:pt-28">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-xs uppercase tracking-[0.3em] text-muted">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span>Reels & Stories</span>
            </div>
            <span className="font-mono text-fg/40">→ role para o lado</span>
          </div>
        </div>

        {/* Two-column body: heading left, track right */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-12">
          {/* LEFT — heading */}
          <div className="col-span-1 flex flex-col justify-center px-6 pb-8 pt-6 md:col-span-4 md:pl-12 md:pr-6">
            <h2 className="font-display max-w-md text-[clamp(1.8rem,3.2vw,3rem)] font-light leading-[1.05] text-fg">
              Bastidores, lançamentos
              <br />
              e <em className="italic text-accent">o que rolou</em> nas marcas que toquei.
            </h2>
            <p className="mt-6 max-w-sm text-sm text-fg/70 hidden md:block">
              Cada card é um espaço pra um reel real — quando os arquivos chegarem, a gente substitui o fundo gradiente por vídeo vertical autoplay.
            </p>
          </div>

          {/* RIGHT — horizontal track */}
          <div className="col-span-1 relative flex flex-1 items-center overflow-hidden md:col-span-8">
            <motion.div
              style={{ x }}
              className="flex w-max items-center gap-6 pr-[6vw] md:gap-8"
            >
              {REELS.map((r, i) => (
                <ReelCard key={r.id} reel={r} index={i} />
              ))}

              {/* End card — CTA */}
              <a
                href="#contact"
                data-cursor="hover"
                className="group relative flex h-[58vh] min-h-[360px] w-[34vw] min-w-[240px] max-w-[360px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-fg/15 bg-card text-center transition-colors hover:border-accent"
              >
                <span className="font-display text-3xl italic text-accent transition-transform group-hover:scale-110">
                  quer o próximo?
                </span>
                <span className="mt-4 text-xs uppercase tracking-[0.3em] text-fg/60">
                  vamos conversar →
                </span>
              </a>
            </motion.div>

            {/* Soft fade edges so cards don't crash visually into bg */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-card/70 to-transparent md:w-12"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-card/70 to-transparent md:w-12"
            />
          </div>
        </div>

        {/* Bottom rail — progress + count */}
        <div className="px-6 pb-8 md:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-xs uppercase tracking-[0.3em] text-fg/50">
            <span>↓ scroll</span>
            <ScrollProgress progress={scrollYProgress} />
            <span className="font-mono">
              {REELS.length.toString().padStart(2, "0")} reels
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVideo = Boolean(reel.src);

  return (
    <motion.article
      ref={cardRef}
      data-cursor="hover"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
      style={{ rotate: reel.rotate }}
      className="group relative flex h-[58vh] min-h-[360px] w-[34vw] min-w-[240px] max-w-[360px] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-fg/10 shadow-2xl transition-transform"
    >
      <div className="relative h-full w-full">
        {isVideo ? (
          <video
            src={reel.src}
            poster={reel.poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${reel.gradient}`} />
        )}

        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Bottom legibility gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        />

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="rounded-full bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-beige backdrop-blur-md">
            {reel.tag}
          </span>
          <span className="font-mono text-[10px] text-beige/80">{reel.id}</span>
        </div>

        {/* Play affordance */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-beige/50 bg-black/20 text-beige backdrop-blur-md transition-colors group-hover:border-beige group-hover:bg-black/40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Bottom caption */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-beige/80">
            {reel.client}
          </div>
          <h3 className="font-display mt-1 text-lg font-light leading-tight text-beige">
            {reel.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}

function ScrollProgress({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="relative h-px w-40 bg-fg/15">
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="absolute inset-y-0 left-0 right-0 bg-accent"
      />
    </div>
  );
}
