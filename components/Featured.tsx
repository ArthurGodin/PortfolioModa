"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * "Editorial em destaque" — adapted from the 21st.dev ContainerScroll pattern.
 *
 * Mechanic: as the user scrolls, a tilted card straightens up (rotateX 14° → 0)
 * and scales subtly while a heading rises above it. Inside the card sits a 2x2
 * editorial grid of media slots that Angélica fills with real photos later.
 *
 * Styling intentionally diverges from the source: ditched the dark monitor
 * frame, uses the warm accent palette, and the rotation is half as aggressive.
 */
export default function Featured() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.85, 0.98] : [1.02, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <section
      ref={containerRef}
      id="featured"
      className="relative h-[160vh] w-full md:h-[200vh]"
    >
      <div className="sticky top-[68px] flex h-[calc(100vh-68px)] flex-col justify-start overflow-hidden px-4 pt-10 md:px-12 md:pt-16">
        <div
          className="relative mx-auto w-full max-w-6xl"
          style={{ perspective: "1400px" }}
        >
          <Header translate={translate} />
          <Card rotate={rotate} scale={scale} fade={fade} />
        </div>
      </div>
    </section>
  );
}

function Header({ translate }: { translate: MotionValue<number> }) {
  return (
    <motion.div
      style={{ y: translate }}
      className="mx-auto max-w-5xl px-2 text-center md:px-0"
    >
      <div className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
        <span className="h-px w-8 bg-accent" />
        <span>Editorial</span>
        <span className="h-px w-8 bg-accent" />
      </div>
      <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] text-fg">
        Um trabalho. <em className="italic text-accent">Aberto como revista.</em>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-fg/70">
        Maison Lirio · campanha de inverno, em quatro tempos.
      </p>
    </motion.div>
  );
}

type Slot = { gradient: string; tag: string; src?: string };
const SLOTS: Slot[] = [
  {
    tag: "01 · capa",
    gradient: "from-[#4C1208] via-[#7B1D26] to-[#D3968C]",
  },
  {
    tag: "02 · detalhe",
    gradient: "from-[#893A49] via-[#D3968C] to-[#E4CDDD]",
  },
  {
    tag: "03 · still",
    gradient: "from-[#CA99AB] via-[#E4CDDD] to-[#F7F4D5]",
  },
  {
    tag: "04 · close",
    gradient: "from-[#7B1D26] via-[#893A49] to-[#CA99AB]",
  },
];

function Card({
  rotate,
  scale,
  fade,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  fade: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        opacity: fade,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px rgba(76, 18, 8, 0.18), 0 37px 37px rgba(76, 18, 8, 0.14), 0 84px 50px rgba(76, 18, 8, 0.08), 0 149px 60px rgba(76, 18, 8, 0.03)",
      }}
      className="mx-auto mt-10 w-full max-w-5xl rounded-[28px] border border-accent/30 bg-accent/10 p-3 backdrop-blur md:mt-14 md:rounded-[36px] md:p-5"
    >
      {/* Inner editorial frame */}
      <div className="relative h-[22rem] w-full overflow-hidden rounded-[20px] bg-card md:h-[28rem] md:rounded-[24px]">
        {/* Magazine spine indicator */}
        <div className="absolute left-1/2 top-0 bottom-0 z-20 hidden w-px -translate-x-1/2 bg-fg/10 md:block" />

        {/* 2x2 editorial grid (real magazine spread feel) */}
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-0">
          {SLOTS.map((slot, i) => (
            <div
              key={slot.tag}
              className="relative overflow-hidden border border-fg/5"
            >
              {slot.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slot.src}
                  alt={slot.tag}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${slot.gradient}`}
                />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/25 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-beige backdrop-blur">
                {slot.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom caption strip */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-5 py-3 text-beige">
          <span className="font-display text-base italic md:text-lg">
            Maison Lirio — inverno 2025
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-80">
            issue 01
          </span>
        </div>
      </div>
    </motion.div>
  );
}
