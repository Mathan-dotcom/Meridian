"use client";

import { PulseField } from "./pulse-field";
import { TickingNumber, FormatInLakhs } from "./ticking-number";
import { usePulseStore } from "@/app/lib/use-pulse-store";
import { Activity, ShieldCheck, Zap, Award } from "lucide-react";
import { ScrollFade } from "@/app/components/scroll-fade";

export function HeaderHero() {
  const { totalRecoverableToday, totalRecoveredToday, incidents } = usePulseStore();
  const activeAtRiskCount = incidents.filter((i) => i.state === "at-risk").length;

  return (
    <header className="relative overflow-hidden bg-black/40 backdrop-blur-md border-b border-white/10 rounded-b-2xl">
      {/* Background Signature Moment: Monochrome Pulse Field Canvas */}
      <PulseField className="opacity-80" nodeDensity={74} />

      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-6">
        {/* Track Title & Pitch Header */}
        <ScrollFade direction="up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/15 font-mono text-micro text-white backdrop-blur-xl shadow-lg">
                <Award className="w-3.5 h-3.5 text-white" />
                <span>Razorpay AI Buildathon — Track 03: AI Revenue Recovery</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/15 font-mono text-micro text-zinc-300 backdrop-blur-xl">
                <Activity className="w-3.5 h-3.5 animate-pulse text-white" />
                <span>{activeAtRiskCount} Active Leaks Monitored</span>
              </div>
            </div>

            <div className="font-mono text-micro text-zinc-400">
              A Heartbeat, Not a Homepage
            </div>
          </div>
        </ScrollFade>

        {/* Hero Financial Ticker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Hero Amount */}
          <div className="lg:col-span-8">
            <ScrollFade direction="up" delay={0.05} className="space-y-3">
              <div className="font-ui text-micro text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-white" /> Total Recoverable Revenue Today
              </div>
              <div className="font-display text-display-xl text-white flex flex-wrap items-baseline gap-4">
                <TickingNumber value={totalRecoverableToday} />
                <span className="font-mono text-xl text-zinc-400 font-medium">
                  (<FormatInLakhs amountInRupees={totalRecoverableToday} />)
                </span>
              </div>
              <p className="font-ui text-body text-zinc-300 max-w-2xl leading-relaxed text-justify">
                An agentic decision engine watching payment streams in real time, diagnosing root causes with counterfactual estimation, ranking interventions by Expected Revenue Recovery (ERR), and verifying recovery outcomes.
              </p>
            </ScrollFade>
          </div>

          {/* Secondary Stats Card — Frosted Glass Elevation */}
          <div className="lg:col-span-4">
            <ScrollFade direction="up" delay={0.15}>
              <div className="glass-panel-raised card-hover p-6 rounded-[var(--radius-pulse)] space-y-4 cursor-default">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-ui text-micro text-zinc-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-white" /> Recovered Revenue
                  </span>
                  <span className="font-mono text-[10px] text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20 font-bold backdrop-blur-sm">
                    VERIFIED
                  </span>
                </div>

                <div className="font-display text-3xl md:text-4xl text-white font-semibold flex items-baseline justify-between">
                  <TickingNumber value={totalRecoveredToday} />
                  <span className="font-mono text-sm text-zinc-400 font-normal">
                    <FormatInLakhs amountInRupees={totalRecoveredToday} />
                  </span>
                </div>

                <div className="text-micro font-mono text-zinc-400 pt-1 flex justify-between border-t border-white/5">
                  <span>Success Rate: <span className="text-white font-semibold">96.4%</span></span>
                  <span>Avg Latency: <span className="text-white font-semibold">420ms</span></span>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </div>
    </header>
  );
}
