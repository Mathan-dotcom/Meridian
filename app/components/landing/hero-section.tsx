"use client";

import Link from "next/link";
import { PulseField } from "@/app/components/pulse-field";
import { TickingNumber, FormatInLakhs } from "@/app/components/ticking-number";
import { usePulseStore } from "@/app/lib/use-pulse-store";
import { ArrowRight, Activity, ShieldCheck, Zap, Layers, Sparkles, Terminal } from "lucide-react";
import { ScrollFade } from "@/app/components/scroll-fade";

export function HeroSection() {
  const { totalRecoverableToday, totalRecoveredToday, incidents } = usePulseStore();
  const activeCount = incidents.filter((i) => i.state !== "recovered").length;

  return (
    <section className="relative overflow-hidden bg-black/40 backdrop-blur-md border-b border-white/10 pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background Monochrome Pulse Field Canvas */}
      <PulseField className="opacity-80" nodeDensity={74} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-10">
        {/* Track Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 font-mono text-micro text-white backdrop-blur-xl shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Razorpay AI Buildathon — Track 03: AI Revenue Recovery</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 font-mono text-micro text-zinc-300 backdrop-blur-xl">
            <Activity className="w-3.5 h-3.5 animate-pulse text-white" />
            <span>Live Stream · {activeCount} Revenue Leaks Detected</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="max-w-4xl space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.08]">
            A Heartbeat, <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Not a Homepage.
            </span>
          </h1>

          <p className="font-ui text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-3xl text-justify">
            An agentic decision engine that continuously monitors live payment rails, diagnoses root causes with honest counterfactual estimation, ranks leaks by <strong>Expected Revenue Recovery (ERR)</strong>, executes the safest bounded intervention, and verifies whether the money actually came back.
          </p>
        </div>

        {/* Live System Teaser Cards — Frosted Glass Elevation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Card 1 */}
          <ScrollFade direction="up" delay={0.05}>
            <div className="p-5 rounded-[var(--radius-pulse)] glass-panel card-hover cursor-pointer space-y-2 h-full">
              <div className="flex items-center justify-between text-micro font-mono text-zinc-400 uppercase tracking-wider">
                <span>Recoverable Today</span>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="font-display text-3xl text-white">
                <TickingNumber value={totalRecoverableToday} />
              </div>
              <div className="text-micro font-mono text-zinc-400">
                <FormatInLakhs amountInRupees={totalRecoverableToday} /> active in pipeline
              </div>
            </div>
          </ScrollFade>

          {/* Card 2 */}
          <ScrollFade direction="up" delay={0.1}>
            <div className="p-5 rounded-[var(--radius-pulse)] glass-panel card-hover cursor-pointer space-y-2 h-full">
              <div className="flex items-center justify-between text-micro font-mono text-zinc-400 uppercase tracking-wider">
                <span>Verified Recovered</span>
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div className="font-display text-3xl text-white">
                <TickingNumber value={totalRecoveredToday} />
              </div>
              <div className="text-micro font-mono text-zinc-400">
                96.4% success rate verified
              </div>
            </div>
          </ScrollFade>

          {/* Card 3 */}
          <ScrollFade direction="up" delay={0.15}>
            <div className="p-5 rounded-[var(--radius-pulse)] glass-panel card-hover cursor-pointer space-y-2 h-full">
              <div className="flex items-center justify-between text-micro font-mono text-zinc-400 uppercase tracking-wider">
                <span>ERR Ranking Engine</span>
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div className="font-mono text-2xl font-bold text-white">
                Formula-Driven
              </div>
              <div className="text-micro font-mono text-zinc-400">
                Loss × P(rec) × E(succ) - Cost - Risk
              </div>
            </div>
          </ScrollFade>

          {/* Card 4 */}
          <ScrollFade direction="up" delay={0.2}>
            <div className="p-5 rounded-[var(--radius-pulse)] glass-panel card-hover cursor-pointer space-y-2 h-full">
              <div className="flex items-center justify-between text-micro font-mono text-zinc-400 uppercase tracking-wider">
                <span>Autonomy Gate</span>
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div className="font-mono text-2xl font-bold text-white">
                Policy-Gated
              </div>
              <div className="text-micro font-mono text-zinc-400">
                Auto-Execute vs Human Escalation
              </div>
            </div>
          </ScrollFade>
        </div>

        {/* Action Buttons */}
        <ScrollFade direction="up" delay={0.25}>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="glass-button-primary flex items-center gap-2.5 px-6 py-3.5 rounded-[var(--radius-pulse)] font-ui text-sm active:scale-95"
            >
              <Activity className="w-4 h-4" />
              <span>Enter Live War Room</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#architecture"
              className="glass-button flex items-center gap-2 px-5 py-3.5 rounded-[var(--radius-pulse)] font-ui text-sm active:scale-95"
            >
              <span>Explore 7-Layer Architecture</span>
            </a>

            <a
              href="#math"
              className="glass-button flex items-center gap-2 px-5 py-3.5 rounded-[var(--radius-pulse)] text-zinc-300 hover:text-white font-mono text-xs active:scale-95"
            >
              <span>The Mathematics (§8 & §9) →</span>
            </a>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
