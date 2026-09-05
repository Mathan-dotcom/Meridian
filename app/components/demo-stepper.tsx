"use client";

import { usePulseStore } from "@/app/lib/use-pulse-store";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

const DEMO_STEPS = [
  {
    step: 1,
    time: "0:00–0:30",
    title: "1. Pitch & Problem",
    summary: "Revenue leaks are disconnected today. Meridian is the orchestrator layer that decides which incident deserves attention first and why.",
    actionText: "Next: Review ERR Stream"
  },
  {
    step: 2,
    time: "0:30–1:30",
    title: "2. ERR Ranked Stream",
    summary: "Open incidents are continuously ranked by Expected Revenue Recovery (ERR), placing the highest recoverable value at position #1.",
    actionText: "Next: Inspect Counterfactual & Math"
  },
  {
    step: 3,
    time: "1:30–2:30",
    title: "3. Counterfactual & ERR Math",
    summary: "Drill into the top incident: honest non-causal counterfactual gap (+17pp), candidate interventions math, and autonomy score breakdown.",
    actionText: "Next: Live Verified Recovery"
  },
  {
    step: 4,
    time: "2:30–3:15",
    title: "4. Live Recovery",
    summary: "Hit Execute Recovery. Watch the monochrome bloom exhale, live ERR ranking re-sort, and total recovered counter tick up in real time.",
    actionText: "Next: Graceful Failure & Rollback Demo"
  },
  {
    step: 5,
    time: "3:15–4:00",
    title: "5. Rollback & Credibility",
    summary: "Demonstrate graceful failure! Secondary route fails -> verifier catches it, flinches, executes rollback, and escalates to human approval.",
    actionText: "Next: Complete Audit Trail & Roadmap"
  },
  {
    step: 6,
    time: "4:00–5:00",
    title: "6. Audit Trail & Positioning",
    summary: "Immutable execution log records every telemetry signal, policy check, and outcome. Positioning: Razorpay has point agents; Meridian decides which gets called.",
    actionText: "Restart Demo Flow"
  }
];

export function DemoStepper() {
  const { demoStep, setDemoStep, incidents, selectIncident, executeRecovery, triggerFailure, resetDemoState } = usePulseStore();

  const current = DEMO_STEPS[demoStep - 1];

  const handleNext = () => {
    if (demoStep === 2) {
      if (incidents.length > 0) selectIncident(incidents[0].id);
    } else if (demoStep === 3) {
      selectIncident(null);
      const active = incidents.find((i) => i.state === "at-risk");
      if (active) executeRecovery(active.id);
    } else if (demoStep === 4) {
      const target = incidents.find((i) => i.state === "at-risk") || incidents[0];
      if (target) triggerFailure(target.id);
    }

    if (demoStep < 6) {
      setDemoStep(demoStep + 1);
    } else {
      resetDemoState();
      setDemoStep(1);
    }
  };

  const handlePrev = () => {
    if (demoStep > 1) setDemoStep(demoStep - 1);
  };

  return (
    <div className="glass-panel-raised card-hover p-5 rounded-[var(--radius-pulse)] space-y-4 font-ui text-white">
      {/* Header Stepper Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-white/10 border border-white/20 text-white backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-micro font-mono uppercase text-white tracking-widest font-semibold flex items-center gap-2">
              <span>Razorpay AI Buildathon — 5-Minute Demo Script Guide (§14)</span>
              <span className="text-zinc-400 font-normal">• Step {demoStep} of 6 ({current.time})</span>
            </div>
            <h3 className="font-semibold text-sm text-white">{current.title}</h3>
          </div>
        </div>

        {/* Step Indicator Bullets */}
        <div className="flex items-center gap-1.5">
          {DEMO_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => setDemoStep(s.step)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                s.step === demoStep
                  ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] border border-white/80"
                  : s.step < demoStep
                  ? "w-2.5 bg-white/40 backdrop-blur-sm border border-white/30"
                  : "w-2.5 bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20"
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-3.5 rounded bg-white/[0.03] backdrop-blur-md border border-white/10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 text-xs font-ui">
        <p className="text-zinc-200 text-sm flex-1 text-justify">{current.summary}</p>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 font-mono">
          <button
            onClick={handlePrev}
            disabled={demoStep === 1}
            className="glass-button cursor-pointer p-2 rounded-[var(--radius-pulse)] text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="glass-button-primary cursor-pointer flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pulse)] text-xs active:scale-95"
          >
            <span>{current.actionText}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
