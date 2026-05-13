"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const phrase = "Vamos criar algo lindo.".split(" ");

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden px-6 py-32 md:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="animate-blob absolute left-1/4 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl" />
        <div
          className="animate-blob absolute right-1/4 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-parrot-pink/40 blur-3xl dark:bg-midnight-green/40"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
          >
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
              <span className="h-px w-8 bg-accent" />
              <span>Contato</span>
            </div>
            <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-light leading-[0.95] text-fg">
              {phrase.map((w, i) => (
                <motion.span
                  key={`${w}-${i}`}
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.08,
                  }}
                  className="mr-3 inline-block italic"
                >
                  {w === "lindo." ? (
                    <em className="text-accent">{w}</em>
                  ) : (
                    w
                  )}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <div className="mt-10 space-y-4 text-fg/80">
            <a
              href="mailto:contato@angelicadantas.com"
              data-cursor="hover"
              className="group flex items-center gap-3 text-lg transition-colors hover:text-accent"
            >
              <span className="h-px w-8 bg-accent transition-all group-hover:w-14" />
              contato@angelicadantas.com
            </a>
            <a
              href="https://instagram.com/angelicadantas"
              data-cursor="hover"
              className="group flex items-center gap-3 text-lg transition-colors hover:text-accent"
            >
              <span className="h-px w-8 bg-accent transition-all group-hover:w-14" />
              @angelicadantas
            </a>
            <a
              href="https://linkedin.com"
              data-cursor="hover"
              className="group flex items-center gap-3 text-lg transition-colors hover:text-accent"
            >
              <span className="h-px w-8 bg-accent transition-all group-hover:w-14" />
              LinkedIn
            </a>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="space-y-6 rounded-3xl border border-fg/10 bg-card/60 p-8 backdrop-blur-md md:p-10"
        >
          <Field label="Seu nome" name="name" type="text" />
          <Field label="E-mail" name="email" type="email" />
          <Field label="Marca / projeto" name="brand" type="text" />
          <div>
            <label
              htmlFor="message"
              className="text-xs uppercase tracking-[0.2em] text-fg/60"
            >
              Conta um pouco
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-2 w-full resize-none border-0 border-b border-fg/20 bg-transparent py-2 text-fg outline-none transition-colors focus:border-accent"
            />
          </div>
          <button
            type="submit"
            data-cursor="hover"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accent px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-card transition-transform hover:scale-[1.01]"
          >
            <span className="relative z-10">
              {sent ? "✓ Recebido, falo já já" : "Enviar mensagem"}
            </span>
            <span
              className={`relative z-10 transition-transform group-hover:translate-x-1 ${
                sent ? "scale-0" : "scale-100"
              }`}
            >
              →
            </span>
            <span className="absolute inset-0 translate-y-full bg-fg transition-transform duration-500 ease-out group-hover:translate-y-0" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.2em] text-fg/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border-0 border-b border-fg/20 bg-transparent py-2 text-fg outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
