"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";

interface MeteorsProps {
  number?: number;
  angle?: number;
  className?: string;
}

export function Meteors({ number = 20, angle = 215, className }: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const styles = Array.from({ length: number }, () => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: (Math.random() * 1.2 + 0.2) + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    } as React.CSSProperties));
    setMeteorStyles(styles);
  }, [number, angle]);

  return (
    <>
      {meteorStyles.map((style, i) => (
        <span
          key={i}
          style={style}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-[var(--angle)] rounded-full bg-white/20 shadow-[0_0_0_1px_#ffffff08]",
            className
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-white/20 to-transparent" />
        </span>
      ))}
    </>
  );
}
