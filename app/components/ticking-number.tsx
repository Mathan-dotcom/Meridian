"use client";

import { useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

export function TickingNumber({
  value,
  prefix = "₹",
  suffix = "",
  className = ""
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 90, damping: 20 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(Math.round(v));
  });

  return (
    <span className={`font-mono tabular-nums text-ledger ${className}`}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// Helper formatting function for Lakhs (e.g. ₹9.2L)
export function FormatInLakhs({
  amountInRupees,
  className = ""
}: {
  amountInRupees: number;
  className?: string;
}) {
  const lakhs = amountInRupees / 100000;
  return (
    <span className={`font-mono tabular-nums ${className}`}>
      ₹{lakhs.toFixed(1)}L
    </span>
  );
}
