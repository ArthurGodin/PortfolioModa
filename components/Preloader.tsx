"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ad_intro_seen_v1";

export default function Preloader() {
  const [show, show_] = useState(false);

  /* Hydration-safe: only decide to show after mount */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (!seen) {
        show_(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      show_(true);
    }
  }, []);

  /* Auto-dismiss after the curtain animation */
  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      show_(false);
      document.documentElement.style.overflow = "";
    }, 2400);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.05, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-accent"
        >
          {/* Decorative grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* Top-left meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
            className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.4em] text-beige/70 md:left-10 md:top-10"
          >
            Portfolio · 2026
          </motion.div>

          {/* Bottom-right meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
            className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.4em] text-beige/70 md:bottom-10 md:right-10"
          >
            São Paulo · BR
          </motion.div>

          {/* Center: letter-by-letter name */}
          <div className="text-center">
            <div
              className="font-display flex justify-center gap-[0.03em] text-[clamp(2.5rem,10vw,8rem)] leading-none text-beige"
              aria-label="Angélica Dantas"
            >
              {"ANGÉLICA".split("").map((l, i) => (
                <motion.span
                  key={`a-${i}`}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.15 + i * 0.04,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="inline-block font-black"
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <div className="font-display mt-2 flex justify-center gap-[0.06em] text-[clamp(2rem,8vw,6rem)] italic leading-none text-beige/80">
              {"DANTAS".split("").map((l, i) => (
                <motion.span
                  key={`d-${i}`}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5 + i * 0.05,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="inline-block font-light"
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                transition: { delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              }}
              className="mx-auto mt-12 h-px w-40 origin-left bg-beige/70 md:w-56"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
