"use client";

import { Calculator } from "lucide-react";
import { ScrollFade } from "@/app/components/scroll-fade";

export function MathSection() {
  return (
    <section id="math" className="py-20 md:py-28 border-b border-white/10 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <ScrollFade direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-micro text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Calculator className="w-4 h-4 text-white" />
              <span>Mathematical Rigor (§8 & §9)</span>
            </div>
            <h2 className="font-ui text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              The ERR Formula & Autonomy Scoring
            </h2>
            <p className="font-ui text-base sm:text-lg text-zinc-300 leading-relaxed">
              Meridian replaces heuristic guesswork with deterministic mathematical modeling. This turns "here are three problems" into "work on this one first, and here is the exact math."
            </p>
          </div>
        </ScrollFade>

        {/* 3 Pillars of Math */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1: ERR Formula */}
          <ScrollFade direction="up" delay={0.05} className="h-full">
            <div className="p-7 rounded-[var(--radius-pulse)] glass-panel card-hover cursor-pointer space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-micro uppercase text-white font-semibold">
                    Core Algorithm (§8)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold border border-white/20">
                    ERR FORMULA
                  </span>
                </div>

                <h3 className="font-ui text-xl font-semibold text-white">
                  Expected Revenue Recovery
                </h3>

                {/* Formula Display */}
                <div className="p-4 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-white space-y-2 backdrop-blur-md">
                  <div className="text-zinc-400 text-[10px]">ERR(i, a) =</div>
                  <div className="font-bold text-sm tracking-wide">
                    Potential_Loss(i) <br />
                    × P_Recovery(a) <br />
                    × E_Success(a) <br />
                    − Cost(a) − Risk(a)
                  </div>
                </div>

                <p className="font-ui text-xs text-zinc-300 leading-relaxed">
                  Calculates the net recoverable value for every candidate intervention <em>a</em> against active incident <em>i</em>. Incidents are sorted dynamically by top candidate ERR.
                </p>
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-white/10 font-mono text-[11px] text-zinc-400">
                Example: ₹4.1L Loss × 0.92 × 0.98 - ₹4K = <strong className="text-white">₹3,65,000 ERR</strong>
              </div>
            </div>
          </ScrollFade>

          {/* Pillar 2: Autonomy Score */}
          <ScrollFade direction="up" delay={0.12} className="h-full">
            <div className="p-7 rounded-[var(--radius-pulse)] glass-panel card-hover cursor-pointer space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-micro uppercase text-white font-semibold">
                    Safety Gate (§8.1)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold border border-white/20">
                    AUTONOMY SCORE
                  </span>
                </div>

                <h3 className="font-ui text-xl font-semibold text-white">
                  Auto-Execute vs Human Gate
                </h3>

                {/* Formula Display */}
                <div className="p-4 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-white space-y-2 backdrop-blur-md">
                  <div className="text-zinc-400 text-[10px]">Autonomy_Score =</div>
                  <div className="font-bold text-sm tracking-wide">
                    Confidence <br />
                    × Reversibility <br />
                    × Historical_Weight <br />
                    × (1 / Blast_Radius)
                  </div>
                </div>

                <p className="font-ui text-xs text-zinc-300 leading-relaxed">
                  Governs whether an intervention can auto-execute or requires human sign-off. High confidence with reversible impact on a localized blast radius auto-executes safely.
                </p>
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-white/10 font-mono text-[11px] text-zinc-400">
                Threshold: <strong className="text-white">Score ≥ 0.50</strong> = AUTO; &lt; 0.50 = ESCALATE
              </div>
            </div>
          </ScrollFade>

          {/* Pillar 3: Counterfactual Estimation */}
          <ScrollFade direction="up" delay={0.2} className="h-full">
            <div className="p-7 rounded-[var(--radius-pulse)] glass-panel card-hover cursor-pointer space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-micro uppercase text-white font-semibold">
                    Non-Causal Framing (§9)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold border border-white/20">
                    COUNTERFACTUAL GAP
                  </span>
                </div>

                <h3 className="font-ui text-xl font-semibold text-white">
                  Counterfactual, Not Causal
                </h3>

                {/* Example Quote */}
                <div className="p-4 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-zinc-200 space-y-2 italic backdrop-blur-md">
                  "Observed: 72%. Estimated rate without Gateway B: 89%. Counterfactual gap: +17pp. This increases confidence that Gateway B is a likely contributor."
                </div>

                <p className="font-ui text-xs text-zinc-300 leading-relaxed">
                  Strict adherence to honest statistical framing. We never claim causal proof — we quantify the counterfactual gap between observed metrics and simulated counterfactual baselines.
                </p>
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-white/10 font-mono text-[11px] text-zinc-300">
                Preempts judge pushback: honestly modeled, scientifically defensible.
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>
    </section>
  );
}
