"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, [data-cursor="hover"]'
      );
      setHover(Boolean(interactive));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            scale: hover ? 2.4 : 1,
            opacity: hover ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-beige"
          style={{ width: 14, height: 14 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x, y }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
          style={{ width: 40, height: 40 }}
        />
      </motion.div>
    </>
  );
}
