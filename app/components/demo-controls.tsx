"use client";

import { useEffect } from "react";
import { usePulseStore } from "@/app/lib/use-pulse-store";
import { PlusCircle, Play, Pause, RefreshCw, Sparkles, RotateCcw } from "lucide-react";

export function DemoControls() {
  const { autoPilot, toggleAutoPilot, injectNewIncident, resetDemoState, incidents, executeRecovery } = usePulseStore();

  useEffect(() => {
    if (!autoPilot) return;

    const interval = setInterval(() => {
      const pendingAutoIncidents = incidents.filter((i) => i.state === "at-risk" && i.autonomy === "AUTO");
      if (pendingAutoIncidents.length > 0) {
        executeRecovery(pendingAutoIncidents[0].id);
      } else {
        injectNewIncident();
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [autoPilot, incidents, executeRecovery, injectNewIncident]);

  return (
    <div className="glass-panel p-4 rounded-[var(--radius-pulse)] flex flex-wrap items-center justify-between gap-4">
      {/* Left Title & Status */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded bg-white/[0.06] border border-white/10 text-white backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="font-ui font-semibold text-sm text-white">
            Demo Orchestrator Simulation Panel
          </div>
          <div className="font-mono text-micro text-zinc-400">
            Simulate live payment leaks, re-rankings & state changes
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Toggle Auto-Pilot */}
        <button
          onClick={toggleAutoPilot}
          className={`cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-pulse)] font-mono text-micro transition-all active:scale-95 ${
            autoPilot
              ? "glass-button-primary border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.35)]"
              : "glass-button text-zinc-300 hover:text-white"
          }`}
        >
          {autoPilot ? (
            <>
              <Pause className="w-3.5 h-3.5" /> AUTO-PILOT ON
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> PAUSED (MANUAL)
            </>
          )}
        </button>

        {/* Inject Leak */}
        <button
          onClick={injectNewIncident}
          className="glass-button cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-pulse)] font-mono text-micro text-zinc-200 hover:text-white active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          INJECT NEW LEAK
        </button>

        {/* Batch Recover All */}
        <button
          onClick={() => {
            const active = incidents.filter((i) => i.state === "at-risk");
            active.forEach((inc, idx) => {
              setTimeout(() => executeRecovery(inc.id), idx * 400);
            });
          }}
          className="glass-button-primary cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-pulse)] font-ui font-semibold text-micro active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          RECOVER ALL
        </button>

        {/* Reset Demo */}
        <button
          onClick={resetDemoState}
          className="glass-button cursor-pointer p-2 rounded-[var(--radius-pulse)] text-zinc-400 hover:text-white"
          title="Reset initial demo state"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
