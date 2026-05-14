"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function MagneticButton({
  children,
  className,
  href,
  strength = 0.35,
  dataCursor,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  /** Pass-through for the global Cursor component */
  dataCursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={className}
        data-cursor={dataCursor}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      data-cursor={dataCursor}
    >
      {children}
    </motion.div>
  );
}
