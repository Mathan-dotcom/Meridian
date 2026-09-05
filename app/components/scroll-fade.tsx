"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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
}: ScrollFadeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial HTML paint, render content fully visible.
  // This eliminates the 10-15s blank invisibility wait on Vercel and slow networks!
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  const initialY = direction === "up" ? 16 : direction === "down" ? -16 : 0;
  const initialX = direction === "left" ? 16 : direction === "right" ? -16 : 0;

  return (
    <motion.div
      initial={{ opacity: 0.7, y: initialY, x: initialX }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(delay, 0.15),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
