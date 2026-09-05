"use client";

import { usePulseStore } from "@/app/lib/use-pulse-store";
import { PlusCircle, Play, Pause, RefreshCw, Sparkles, RotateCcw, AlertOctagon, Flame } from "lucide-react";

export function DemoControls() {
  const {
    autoPilot,
    toggleAutoPilot,
    injectFault,
    resetDemoState,
    incidents,
    executeRecovery
  } = usePulseStore();

  return (
    <div className="glass-panel card-hover p-4 rounded-[var(--radius-pulse)] flex flex-wrap items-center justify-between gap-4">
      {/* Left Title & Status */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded bg-white/[0.06] border border-white/10 text-white backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="font-ui font-semibold text-sm text-white flex items-center gap-2">
            Autonomous Agent Controls & Chaos Injector
            {autoPilot && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                AUTOPILOT LIVE
              </span>
            )}
          </div>
          <div className="font-mono text-micro text-zinc-400">
            Toggle hands-free autonomous agent loop or inject realistic telemetry faults
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Toggle Auto-Pilot */}
        <button
          onClick={toggleAutoPilot}
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pulse)] font-mono text-micro font-semibold transition-all active:scale-95 ${
            autoPilot
              ? "bg-white text-black border border-white shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              : "glass-button text-zinc-300 hover:text-white"
          }`}
        >
          {autoPilot ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>AUTOPILOT: ON</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>ENABLE AUTOPILOT</span>
            </>
          )}
        </button>

        {/* Chaos Injector Dropdown / Buttons */}
        <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-[var(--radius-pulse)] border border-white/10">
          <span className="text-[10px] font-mono text-zinc-400 uppercase px-2 font-bold flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" /> Inject:
          </span>

          <button
            onClick={() => injectFault("hdfc")}
            className="glass-button cursor-pointer px-2.5 py-1.5 rounded text-[11px] font-mono text-zinc-300 hover:text-white active:scale-95"
            title="Simulate HDFC NetBanking 504 Gateway Surge"
          >
            HDFC 504
          </button>

          <button
            onClick={() => injectFault("visa")}
            className="glass-button cursor-pointer px-2.5 py-1.5 rounded text-[11px] font-mono text-zinc-300 hover:text-white active:scale-95"
            title="Simulate Visa VTS Cryptogram Invalidation"
          >
            Visa VTS
          </button>

          <button
            onClick={() => injectFault("npci")}
            className="glass-button cursor-pointer px-2.5 py-1.5 rounded text-[11px] font-mono text-zinc-300 hover:text-white active:scale-95"
            title="Simulate NPCI Mandate Rate-Limit (Code 92)"
          >
            NPCI UPI
          </button>
        </div>

        {/* Batch Recover All */}
        <button
          onClick={() => {
            const active = incidents.filter((i) => i.state === "at-risk");
            active.forEach((inc, idx) => {
              setTimeout(() => executeRecovery(inc.id), idx * 300);
            });
          }}
          className="glass-button-primary cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-pulse)] font-ui font-semibold text-micro active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RECOVER ALL</span>
        </button>

        {/* Reset Demo */}
        <button
          onClick={resetDemoState}
          className="glass-button cursor-pointer p-2 rounded-[var(--radius-pulse)] text-zinc-400 hover:text-white active:scale-95"
          title="Reset initial demo baseline"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
