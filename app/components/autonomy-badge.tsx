"use client";

import { AutonomyLevel } from "@/app/lib/store";

export function AutonomyBadge({ autonomy }: { autonomy: AutonomyLevel }) {
  if (autonomy === "AUTO") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-2.5 py-1 font-mono text-micro text-white shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
        AUTO-EXECUTED
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-2.5 py-1 font-mono text-micro text-zinc-300 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
      NEEDS APPROVAL
    </span>
  );
}
