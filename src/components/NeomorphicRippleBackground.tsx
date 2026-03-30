"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const RIPPLES: { size: string; mobileSize: string }[] = [
  { size: "min(130vw, 1240px)", mobileSize: "130vw" },
  { size: "min(102vw, 980px)", mobileSize: "100vw" },
  { size: "min(78vw, 720px)", mobileSize: "75vw" },
  { size: "min(52vw, 460px)", mobileSize: "50vw" },
] as const;

const NEOMORPHIC_SHADOW =
  "10px 14px 56px rgba(219, 219, 219, 0.96), 4px 8px 32px rgba(228, 228, 228, 0.87)";

export type NeomorphicRippleBackgroundProps = {
  surfaceColor?: string;
  className?: string;
};

export function NeomorphicRippleBackground({
  surfaceColor = "#F5F3F0",
  className,
}: NeomorphicRippleBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative size-0", className)}>
      {RIPPLES.map(({ size }, index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
          initial={{ scale: 1, opacity: 1 }}
          animate={
            reduceMotion
              ? { scale: 1, opacity: 1 }
              : {
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.62, 1],
                }
          }
          transition={{
            duration: 1.72 - index * 0.22,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.24, 1],
            ease: ["circIn", [0.15, 0.55, 0.2, 1]],
            delay: index * 0.12,
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: surfaceColor,
            boxShadow: NEOMORPHIC_SHADOW,
          }}
        />
      ))}
    </div>
  );
}
