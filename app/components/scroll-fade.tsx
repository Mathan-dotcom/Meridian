"use client";

import { motion } from "framer-motion";
import React from "react";

interface ScrollFadeProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  amount?: number;
}

export function ScrollFade({
  children,
  delay = 0,
  direction = "up",
  className = "",
  amount = 0.08,
}: ScrollFadeProps) {
  const initialY = direction === "up" ? 24 : direction === "down" ? -24 : 0;
  const initialX = direction === "left" ? 24 : direction === "right" ? -24 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.55,
        delay: Math.min(delay, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
