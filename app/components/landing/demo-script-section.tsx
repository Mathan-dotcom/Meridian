"use client";

import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { ScrollFade } from "@/app/components/scroll-fade";

const SCRIPT_STEPS = [
  {
    time: "0:00–0:30",
    title: "1. One-Line Pitch & Problem",
    talkingPoint: "Open with the core thesis: revenue leaks are disconnected across modern payment rails. Point agents exist, but nobody is deciding which problem gets attention first.",
    badge: "The Hook"
  },
  {
    time: "0:30–1:30",
    title: "2. The Revenue Protection Center",
    talkingPoint: "Show the live dashboard with 3 open incidents. Explain the ERR sorting: position #1 is determined mathematically by expected recoverable revenue, not arbitrary time of arrival.",
    badge: "ERR Stream"
  },
  {
    time: "1:30–2:30",
    title: "3. Counterfactual Inspection & Math",
    talkingPoint: "Drill into the top incident modal: highlight the honest +17pp counterfactual gap, candidate interventions table with calculated ERR, and the autonomy safety factors.",
    badge: "Credibility"
  },
  {
    time: "2:30–3:15",
    title: "4. Live Execution & Exhale Pulse",
    talkingPoint: "Click EXECUTE RECOVERY. Point to the luminous white exhale bloom, live ERR re-sorting, and the rupee ledger ticking up as banking confirmation settles.",
    badge: "Live Action"
  },
  {
    time: "3:15–4:00",
    title: "5. Graceful Failure & Rollback (Standout Moment)",
    talkingPoint: "Trigger the failure scenario live! Say explicitly: 'This is graceful failure, not a fake demo where everything works.' Show the flinch shake, automatic rollback, and escalation to human ops.",
    badge: "Winning Moment"
  },
  {
    time: "4:00–5:00",
    title: "6. Audit Trail & Strategic Positioning",
    talkingPoint: "Review the terminal audit log. Close with the definitive positioning line: 'Razorpay has specialized agents. Pulse is the layer that decides which one gets called, and proves it worked.'",
    badge: "Close"
  }
];

export function DemoScriptSection() {
  return (
    <section id="demo-script" className="py-20 md:py-28 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <ScrollFade direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-micro text-white/70 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-white" />
              <span>Judge Presentation Guide (§14)</span>
            </div>
            <h2 className="font-ui text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              The 5-Minute Live Demo Flow
            </h2>
            <p className="font-ui text-base sm:text-lg text-zinc-400 leading-relaxed">
              The exact script and timing designed to win the judges' trust in under five minutes on a projector. Built directly into the interactive War Room stepper.
            </p>
          </div>
        </ScrollFade>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCRIPT_STEPS.map((step, idx) => (
            <ScrollFade key={idx} direction="up" delay={idx * 0.05} className="h-full">
              <div className="p-6 rounded-[var(--radius-pulse)] glass-panel hover:border-white/30 transition-all flex flex-col justify-between space-y-4 h-full">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">
                      {step.time}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="font-ui text-base font-semibold text-white">{step.title}</h3>
                  <p className="font-ui text-xs text-zinc-300 leading-relaxed">
                    {step.talkingPoint}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Phase {idx + 1} of 6</span>
                  <span className="text-white/80">Guided in War Room</span>
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>

        {/* Final CTA Bar */}
        <ScrollFade direction="up" delay={0.15}>
          <div className="p-8 rounded-[var(--radius-pulse)] glass-panel-raised border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display text-2xl md:text-3xl text-white font-normal">
                Experience the Live War Room Console
              </h3>
              <p className="font-ui text-sm text-zinc-300">
                Test the real-time ERR re-ranking, node shifts on the Pulse Field canvas, counterfactual inspection modal, and the graceful failure rollback flow.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="glass-button-primary flex items-center gap-2.5 px-6 py-3.5 rounded-[var(--radius-pulse)] text-sm font-semibold shadow-xl transition-all active:scale-95 shrink-0"
            >
              <span>Launch Live War Room</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
