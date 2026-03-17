"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "#1a0a0b",
  gradientOpacity = 0.9,
  gradientFrom = "#e63946",
  gradientTo = "#6b0a10",
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = mouseX.get();
    const y = mouseY.get();
    const distances = { left: x, right: rect.width - x, top: y, bottom: rect.height - y };
    const closest = Object.entries(distances).reduce(
      (c, [edge, dist]) => (dist < c.distance ? { edge, distance: dist } : c),
      { edge: "left", distance: distances.left }
    ).edge;
    if (closest === "left") animate(mouseX, -gradientSize);
    else if (closest === "right") animate(mouseX, rect.width + gradientSize);
    else if (closest === "top") animate(mouseY, -gradientSize);
    else animate(mouseY, rect.height + gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset();
    window.addEventListener("pointerout", (e: PointerEvent) => { if (!e.relatedTarget) reset(); });
    window.addEventListener("blur", reset);
    return () => { window.removeEventListener("blur", reset); };
  }, [reset]);

  return (
    <motion.div
      ref={ref}
      className={cn("group relative overflow-hidden rounded-[inherit] border border-transparent", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{
        background: useMotionTemplate`
          linear-gradient(#0f0f0f 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            rgba(40,40,40,0.8) 100%
          ) border-box
        `,
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
