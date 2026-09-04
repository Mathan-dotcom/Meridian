"use client";

import { Activity, Cpu, Search, Sparkles, Filter, Play, CheckCircle, Terminal, Layers } from "lucide-react";

const PIPELINE_STEPS = [
  {
    step: "01",
    name: "Detector",
    tech: "Statistical (Rolling Window & Z-Score)",
    job: "Monitors transaction telemetry in real time. Flags anomalies when success rates drop > X% over a Y-minute window.",
    badge: "Deterministic",
    icon: Activity
  },
  {
    step: "02",
    name: "Diagnostician",
    tech: "Rules + Correlation + LLM Reasoning",
    job: "Correlates failure clusters across bank BINs, gateways, error codes, and time bands. Generates human-readable natural language explanations.",
    badge: "LLM Reasoning",
    icon: Search
  },
  {
    step: "03",
    name: "Simulator",
    tech: "Counterfactual Lookup & What-If Engine",
    job: "Evaluates 2–4 candidate interventions. Estimates expected lift and quantifies non-causal counterfactual gap without altering live traffic.",
    badge: "What-If Modeling",
    icon: Sparkles
  },
  {
    step: "04",
    name: "ERR Engine",
    tech: "Mathematical Formula (§8)",
    job: "Ranks all currently open incidents by top candidate Expected Revenue Recovery (ERR), placing highest recoverable ₹ value at Rank #1.",
    badge: "Core Algorithm",
    icon: Layers
  },
  {
    step: "05",
    name: "Policy / Gate",
    tech: "Weighted Autonomy Score (§8.1)",
    job: "Evaluates Confidence × Reversibility × Historical Weight × (1 / Blast Radius). Scores ≥ 0.50 auto-execute; others escalate for human ops sign-off.",
    badge: "Safety Boundary",
    icon: Filter
  },
  {
    step: "06",
    name: "Executor",
    tech: "API Action Layer (Razorpay Test Mode)",
    job: "Executes bounded, safe interventions: switches to Axis fallback rail, dynamically throttles burst rates, or initiates batch token cryptogram refresh.",
    badge: "Bounded Action",
    icon: Play
  },
  {
    step: "07",
    name: "Verifier & Rollback",
    tech: "Closed-Loop Statistical Settlement Check",
    job: "Polls post-action settlement metrics. Confirms recovery success or triggers automatic rollback with ops escalation if recovery fails.",
    badge: "Graceful Rollback",
    icon: CheckCircle
  }
];

import { ScrollFade } from "@/app/components/scroll-fade";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-20 md:py-28 border-b border-white/10 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <ScrollFade direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-micro text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-white" />
              <span>System Architecture (§7)</span>
            </div>
            <h2 className="font-ui text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              The 7-Layer Agentic Decision Pipeline
            </h2>
            <p className="font-ui text-base sm:text-lg text-zinc-300 leading-relaxed">
              A strict separation of concerns: <strong>LLMs are used exclusively for reasoning, explanation, and synthesis</strong> — never for anomaly detection, policy enforcement, or financial calculations. Those remain 100% deterministic and auditable.
            </p>
          </div>
        </ScrollFade>

        {/* Pipeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PIPELINE_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <ScrollFade key={step.step} direction="up" delay={idx * 0.05} className="h-full">
                <div className="p-6 rounded-[var(--radius-pulse)] glass-panel hover:border-white/30 transition-all flex flex-col justify-between space-y-4 h-full">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/10">
                      STAGE {step.step}
                    </span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-white/15 bg-white/[0.04] text-white font-semibold">
                      {step.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-white/[0.06] border border-white/10 text-white">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-ui font-semibold text-lg text-white">{step.name}</h3>
                    </div>
                    <div className="font-mono text-[11px] text-zinc-400">
                      {step.tech}
                    </div>
                    <p className="font-ui text-xs text-zinc-300 leading-relaxed">
                      {step.job}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>Audited in Terminal Log</span>
                    <span className="text-white">Verified ✓</span>
                  </div>
                </div>
              </ScrollFade>
            );
          })}
        </div>

        {/* Audit Trail Note Banner */}
        <ScrollFade direction="up" delay={0.15}>
          <div className="p-6 rounded-[var(--radius-pulse)] glass-panel-raised flex flex-wrap md:flex-nowrap items-center justify-between gap-6 font-ui">
            <div className="space-y-1">
              <div className="font-mono text-micro text-white uppercase font-semibold flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white" /> Output: Immutable Audit Trail (§7 & §8.4)
              </div>
              <p className="text-sm text-zinc-300">
                Every pipeline pass logs evidence signals, counterfactual estimates, policy checks, autonomy factors, and settlement confirmations directly to the visible audit ledger.
              </p>
            </div>
            <a
              href="/dashboard"
              className="glass-button shrink-0 px-4 py-2.5 rounded-[var(--radius-pulse)] text-xs font-mono active:scale-95"
            >
              View Live Log in War Room →
            </a>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
