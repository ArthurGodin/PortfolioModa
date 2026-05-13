"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  gradient: string;
};

const ITEMS: Testimonial[] = [
  {
    quote:
      "Angélica transformou a forma como vejo minha marca. Saímos de um Instagram bonito para um negócio que vende sozinho.",
    name: "Luiza Mendes",
    role: "Founder · Maison Lirio",
    gradient: "from-[#7B1D26] via-[#893A49] to-[#CA99AB]",
  },
  {
    quote:
      "Estratégia, estética e resultado no mesmo pacote. Raro encontrar alguém que entende dos três.",
    name: "Camila Rocha",
    role: "Diretora · Casa Augusta",
    gradient: "from-[#0A3323] via-[#105666] to-[#839958]",
  },
  {
    quote:
      "O drop que fizemos com ela bateu meta em 4 horas. Quatro. Horas.",
    name: "Beatriz Lacerda",
    role: "CEO · Folha & Pétala",
    gradient: "from-[#4C1208] via-[#D3968C] to-[#E4CDDD]",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full px-6 py-32 md:py-48"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="mb-16 text-center md:mb-24"
        >
          <div className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-px w-8 bg-accent" />
            <span>Depoimentos</span>
            <span className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-fg">
            O que dizem <em className="italic text-accent">de mim.</em>
          </h2>
        </motion.div>

        <div className="relative">
          {ITEMS.map((t, i) => (
            <StackedCard
              key={t.name}
              testimonial={t}
              index={i}
              total={ITEMS.length}
              isLast={i === ITEMS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackedCard({
  testimonial,
  index,
  total,
  isLast,
}: {
  testimonial: Testimonial;
  index: number;
  total: number;
  isLast: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.4", "end 0.2"],
  });

  /* Stagger sticky offset so each card stops a bit lower than the previous,
     creating the visible "stack" effect. The last card is the "winner" and
     sits highest so it reads cleanly. */
  const topOffset = 100 + index * 28;

  /* Make each card slot a bit shorter than viewport so the next one peeks. */
  return (
    <div
      ref={cardRef}
      className="sticky h-[78vh]"
      style={{
        top: `${topOffset}px`,
        zIndex: 10 + index,
        marginBottom: isLast ? "-22vh" : "-20vh" /* pull next card up to overlap */,
      }}
    >
      <StackedCardInner
        testimonial={testimonial}
        index={index}
        total={total}
        progress={scrollYProgress}
        isLast={isLast}
      />
    </div>
  );
}

function StackedCardInner({
  testimonial,
  index,
  total,
  progress,
  isLast,
}: {
  testimonial: Testimonial;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isLast: boolean;
}) {
  /* Cards exit-animate only if there's another card coming after them.
     The last card stays at its final state to avoid the "faded card +
     dead space" look at the section's tail. */
  const scaleRange = isLast ? [1, 1] : [1, 0.94];
  const opacityRange = isLast ? [1, 1] : [1, 0.55];
  const rotateRange = isLast ? [0, 0] : [0, -1.5];

  const scale = useTransform(progress, [0, 1], scaleRange);
  const opacity = useTransform(progress, [0, 0.85], opacityRange);
  const yRotate = useTransform(progress, [0, 1], rotateRange);

  return (
    <motion.figure
      style={{ scale, opacity, rotate: yRotate }}
      className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-[2.5rem] border border-fg/10 bg-card shadow-2xl md:grid-cols-[1fr_1.1fr]"
    >
      {/* Visual side */}
      <div className={`relative min-h-[260px] bg-gradient-to-br ${testimonial.gradient} md:min-h-[420px]`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-beige/80">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="absolute bottom-6 left-6 font-display text-7xl italic text-beige/40 md:text-9xl">
          “
        </div>
      </div>

      {/* Quote side */}
      <div className="flex flex-col justify-between gap-8 p-8 md:p-12 lg:p-16">
        <blockquote className="font-display text-2xl font-light leading-snug text-fg md:text-3xl lg:text-4xl">
          {testimonial.quote}
        </blockquote>
        <figcaption>
          <div className="text-base font-medium text-fg">{testimonial.name}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.25em] text-fg/50">
            {testimonial.role}
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
}
