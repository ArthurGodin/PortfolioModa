"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-fg/10 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3 font-display italic">
          <span className="text-2xl text-accent">A.D.</span>
          <span className="text-sm text-fg/60">
            Angélica Dantas · Moda & Marketing
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-fg/50">
          <span>© {year}</span>
          <span>São Paulo, Brasil</span>
          <a href="#home" className="transition-colors hover:text-accent">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
