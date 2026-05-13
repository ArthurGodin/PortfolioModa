"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type TrailItem = {
  id: string;
  src?: string;
  gradient: string;
};

const ITEMS: TrailItem[] = [
  { id: "t1", gradient: "from-[#7B1D26] via-[#893A49] to-[#CA99AB]" },
  { id: "t2", gradient: "from-[#4C1208] via-[#7B1D26] to-[#D3968C]" },
  { id: "t3", gradient: "from-[#D3968C] via-[#CA99AB] to-[#E4CDDD]" },
  { id: "t4", gradient: "from-[#893A49] via-[#D3968C] to-[#F7F4D5]" },
  { id: "t5", gradient: "from-[#0A3323] via-[#105666] to-[#839958]" },
  { id: "t6", gradient: "from-[#105666] via-[#839958] to-[#F7F4D5]" },
  { id: "t7", gradient: "from-[#4C1208] via-[#893A49] to-[#CA99AB]" },
  { id: "t8", gradient: "from-[#CA99AB] via-[#E4CDDD] to-[#F7F4D5]" },
];

const MAX_VISIBLE = 6;
const MIN_DISTANCE = 110; /* px between trail spawns */

type Spawn = {
  key: number;
  x: number;
  y: number;
  item: TrailItem;
};

export default function MouseImageTrail({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const cycleRef = useRef(0);
  const keyRef = useRef(0);
  const [spawns, setSpawns] = useState<Spawn[]>([]);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const el = containerRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const last = lastPosRef.current;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (Math.hypot(dx, dy) < MIN_DISTANCE) return;
      }
      lastPosRef.current = { x, y };

      const item = ITEMS[cycleRef.current % ITEMS.length];
      cycleRef.current += 1;
      const k = keyRef.current++;

      setSpawns((prev) => {
        const next = [...prev, { key: k, x, y, item }];
        return next.slice(-MAX_VISIBLE);
      });

      window.setTimeout(() => {
        setSpawns((prev) => prev.filter((s) => s.key !== k));
      }, 1200);
    }

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {/* Trail layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {spawns.map((s, idx) => (
          <TrailCard key={s.key} spawn={s} stackIdx={idx} />
        ))}
      </div>
      {children}
    </div>
  );
}

function TrailCard({ spawn, stackIdx }: { spawn: Spawn; stackIdx: number }) {
  const rotate = ((spawn.key * 37) % 12) - 6; /* deterministic tilt -6° to +6° */
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: spawn.x, top: spawn.y, zIndex: stackIdx }}
    >
      <div
        className="trail-card"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="h-[150px] w-[110px] overflow-hidden rounded-xl shadow-2xl md:h-[200px] md:w-[150px]">
          {spawn.item.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={spawn.item.src}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${spawn.item.gradient}`} />
          )}
        </div>
      </div>
    </div>
  );
}
