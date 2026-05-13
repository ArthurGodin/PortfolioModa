"use client";

const ITEMS = [
  "Branding",
  "Direção Criativa",
  "Editorial",
  "Marketing Digital",
  "E-commerce de Moda",
  "Influência",
  "Lookbooks",
  "Conteúdo",
  "Identidade Visual",
  "Estratégia",
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-hidden
      className="relative isolate overflow-hidden border-y border-fg/10 bg-card py-6"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {loop.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="font-display text-[2.5rem] font-light italic text-fg/80 md:text-[3.5rem]"
          >
            {label}
            <span className="mx-12 inline-block translate-y-[-0.4em] align-middle text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
