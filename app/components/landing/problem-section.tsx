"use client";

import { AlertTriangle } from "lucide-react";
import { ScrollFade } from "@/app/components/scroll-fade";

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 md:py-28 border-b border-white/10 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section Header */}
        <ScrollFade direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-micro text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>The Problem & Market Reality (§2)</span>
            </div>
            <h2 className="font-ui text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Revenue leaks are disconnected today.
            </h2>
            <p className="font-ui text-base sm:text-lg text-zinc-300 leading-relaxed">
              Merchants lose revenue across multiple, fragmented failure modes simultaneously — degrading banking gateways, expired recurring card tokens, abandoned checkouts, and overdue receivables. Today, each requires separate manual triage.
            </p>
          </div>
        </ScrollFade>

        {/* The Missing Layer Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: What Exists Today */}
          <ScrollFade direction="up" delay={0.1} className="h-full">
            <div className="p-8 rounded-[var(--radius-pulse)] glass-panel space-y-6 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="font-mono text-micro uppercase text-zinc-400 tracking-wider font-semibold">
                  Current Landscape
                </span>
                <span className="px-2.5 py-1 rounded bg-white/[0.06] text-zinc-300 font-mono text-[10px] font-bold border border-white/10">
                  FRAGMENTED POINT AGENTS
                </span>
              </div>

              <h3 className="font-ui text-2xl font-semibold text-white">
                Siloed Point Agents Without Priority
              </h3>

              <ul className="space-y-4 text-sm font-ui text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                  <span><strong>No unified prioritization:</strong> When an ICICI UPI pool drops and an HDFC subscription rail times out at the same time, which problem gets fixed first?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                  <span><strong>Blind execution:</strong> Point agents execute retries without calculating blast radius, intervention costs, or counterfactual probability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 mt-2 shrink-0" />
                  <span><strong>Zero outcome verification:</strong> No layer verifies whether the recovery intervention actually restored money or worsened bank rate-limit penalties.</span>
                </li>
              </ul>

              <div className="p-4 rounded bg-white/[0.04] backdrop-blur-md border border-white/10 font-mono text-xs text-zinc-400">
                Result: Ops teams drown in alert fatigue while high-value leaks bleed quietly in the background.
              </div>
            </div>
          </ScrollFade>

          {/* Right: The Pulse Solution */}
          <ScrollFade direction="up" delay={0.2} className="h-full">
            <div className="p-8 rounded-[var(--radius-pulse)] glass-panel-raised space-y-6 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="font-mono text-micro uppercase text-white tracking-wider font-semibold">
                  The Pulse Architecture
                </span>
                <span className="px-2.5 py-1 rounded bg-white text-black font-mono text-[10px] font-bold shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                  ORCHESTRATION LAYER
                </span>
              </div>

              <h3 className="font-ui text-2xl font-semibold text-white">
                An Orchestrator that Ranks, Acts & Verifies
              </h3>

              <ul className="space-y-4 text-sm font-ui text-zinc-200">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] mt-2 shrink-0" />
                  <span><strong>Mathematical ERR Ranking:</strong> Calculates Expected Revenue Recovery in real-time (ERR = Loss × P(rec) × E(succ) − Cost − Risk) to prioritize highest recoverable value.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] mt-2 shrink-0" />
                  <span><strong>Policy-Gated Autonomy Score:</strong> Safe, reversible actions auto-execute; risky or high blast-radius actions pause for human ops sign-off.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] mt-2 shrink-0" />
                  <span><strong>Closed-Loop Verification & Rollback:</strong> Confirms settlement on banking rails. If an intervention fails, it instantly flinches, rolls back, and escalates.</span>
                </li>
              </ul>

              <div className="p-4 rounded bg-white/[0.04] border border-white/15 font-mono text-xs text-white">
                "Razorpay has specialized point agents. Pulse is the layer that decides which one gets called, and proves it worked."
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>
    </section>
  );
}
