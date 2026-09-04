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
  amount = 0.12,
}: ScrollFadeProps) {
  const initialY = direction === "up" ? 28 : direction === "down" ? -28 : 0;
  const initialX = direction === "left" ? 28 : direction === "right" ? -28 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: false, amount, margin: "0px 0px -30px 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier for snappy 60fps feel
      }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
