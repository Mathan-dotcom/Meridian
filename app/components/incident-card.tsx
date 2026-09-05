"use client";

import { motion } from "framer-motion";
import { Incident } from "@/app/lib/store";
import { ConfidenceGauge } from "./confidence-gauge";
import { AutonomyBadge } from "./autonomy-badge";
import { TickingNumber, FormatInLakhs } from "./ticking-number";
import { usePulseStore } from "@/app/lib/use-pulse-store";
import { CheckCircle2, AlertTriangle, RefreshCw, Zap, ShieldAlert, Eye, Sparkles, Bot } from "lucide-react";

interface IncidentCardProps {
  incident: Incident;
  rank: number;
}

export function IncidentCard({ incident, rank }: IncidentCardProps) {
  const { executeRecovery, triggerFailure, selectIncident, runLiveGeminiDiagnosis, liveAiDiagnosis, diagnosingIncidentId } = usePulseStore();
  const aiResult = liveAiDiagnosis[incident.id];
  const isDiagnosing = diagnosingIncidentId === incident.id;
  const isTopRank = rank === 1 && incident.state !== "recovered";

  // Dynamic glassmorphic state styling
  let glassStateClasses = "glass-panel";
  
  if (isTopRank) {
    glassStateClasses = "glass-panel-raised";
  }

  if (incident.state === "recovering") {
    glassStateClasses = "glass-panel-raised border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.25)] animate-pulse";
  } else if (incident.state === "recovered") {
    glassStateClasses = "glass-panel border-white/30 shadow-[0_0_24px_rgba(255,255,255,0.2)] animate-recovery-exhale";
  } else if (incident.state === "failed") {
    glassStateClasses = "glass-panel border-white/35 shadow-[0_0_24px_rgba(255,255,255,0.2)] animate-rollback-flinch";
  }

  return (
    <motion.div
      layoutId={incident.id}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`rounded-[var(--radius-pulse)] card-hover transition-all duration-300 font-ui relative overflow-hidden ${
        isTopRank ? "col-span-1 lg:col-span-2 p-7 md:p-8" : "col-span-1 p-6"
      } ${glassStateClasses}`}
    >
      {/* Rank Indicator Pill */}
      <div className="absolute top-4 right-4 flex flex-wrap items-center justify-end gap-2">
        <span className="font-mono text-[10px] text-zinc-300 bg-white/[0.06] backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
          ERR RANK #{rank}
        </span>
        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border bg-white/[0.04] text-zinc-300 border-white/10 backdrop-blur-md">
          {incident.depth.replace("_", " ")}
        </span>
        {incident.state === "recovered" && (
          <span className="flex items-center gap-1 font-mono text-micro text-black bg-white px-2.5 py-0.5 rounded-full font-bold shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            <CheckCircle2 className="w-3.5 h-3.5" /> RECOVERED
          </span>
        )}
        {incident.state === "failed" && (
          <span className="flex items-center gap-1 font-mono text-micro text-white bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30 backdrop-blur-md">
            <ShieldAlert className="w-3.5 h-3.5" /> ROLLED BACK
          </span>
        )}
      </div>

      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-mono text-micro text-zinc-400 uppercase tracking-wider">
          {incident.id}
        </span>
        <span className="text-zinc-600 font-mono text-micro">•</span>
        <span className="font-mono text-micro text-white font-medium">
          {incident.service}
        </span>
        <span className="text-zinc-600 font-mono text-micro">•</span>
        <span className="font-mono text-micro text-zinc-400">
          {incident.timestamp}
        </span>
      </div>

      {/* Title */}
      <h3 className={`font-ui font-semibold text-white mb-4 ${isTopRank ? "text-xl md:text-2xl" : "text-lg"}`}>
        {incident.title}
      </h3>

      {/* Financial Amounts Grid (Frosted Sub-panel) */}
      <div className="grid grid-cols-2 gap-4 mb-5 bg-white/[0.03] backdrop-blur-md p-4 rounded-lg border border-white/10">
        <div>
          <div className="text-micro text-zinc-400 uppercase font-mono tracking-wider mb-1">
            Potential Loss
          </div>
          <div className={`${isTopRank ? "text-3xl md:text-display-md" : "text-2xl md:text-3xl"} font-display text-white`}>
            <TickingNumber value={incident.potentialLoss} />
          </div>
        </div>

        <div>
          <div className="text-micro text-zinc-400 uppercase font-mono tracking-wider mb-1 flex items-center justify-between">
            <span>Expected Recoverable (ERR)</span>
            <span className="text-white text-[11px] font-mono">+{incident.counterfactual.counterfactualGap}pp gap</span>
          </div>
          <div className="text-xl md:text-2xl font-mono text-white font-semibold flex items-center gap-1.5">
            <TickingNumber value={incident.err} />
            <span className="text-micro font-normal text-zinc-400">
              (<FormatInLakhs amountInRupees={incident.err} />)
            </span>
          </div>
        </div>
      </div>

      {/* Evidence Bullets */}
      <div className="mb-5 space-y-2">
        <div className="text-micro font-mono uppercase text-zinc-400 tracking-wider flex items-center justify-between">
          <span>Observed Telemetry & Evidence</span>
          <button
            onClick={() => selectIncident(incident.id)}
            className="glass-button cursor-pointer px-2.5 py-1 rounded-[var(--radius-pulse)] text-zinc-200 hover:text-white flex items-center gap-1.5 text-[11px] font-mono transition-all active:scale-95"
          >
            <Eye className="w-3 h-3 text-white" /> Inspect Math Breakdown
          </button>
        </div>
        <ul className="space-y-1.5">
          {incident.evidence.map((ev, i) => (
            <li key={i} className="flex items-start gap-2.5 text-body text-zinc-200 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] mt-2 shrink-0" />
              <span className="text-justify">{ev}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Intervention Strategy */}
      <div className="mb-5 p-3.5 rounded bg-white/[0.04] backdrop-blur-md border border-white/10">
        <div className="text-micro font-mono uppercase text-white mb-1 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-white" /> Chosen Intervention Orchestration
        </div>
        <p className="text-sm font-ui text-zinc-300 text-justify">
          {incident.intervention}
        </p>
      </div>

      {/* Live Gemini AI Diagnosis Panel (When active) */}
      {aiResult && (
        <div className="mb-5 p-3.5 rounded bg-white/[0.07] backdrop-blur-xl border border-white/25 shadow-[0_0_20px_rgba(255,255,255,0.06)] space-y-2">
          <div className="flex items-center justify-between text-micro font-mono text-white">
            <span className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              LIVE GEMINI DIAGNOSIS
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-zinc-300 border border-white/20">
              Confidence: {Math.round((aiResult.confidenceScore || 0.94) * 100)}% • Lift: +{aiResult.estimatedLiftPercentage || 17}%
            </span>
          </div>
          <p className="text-xs font-ui text-zinc-200 leading-relaxed text-justify">
            {aiResult.rootCause}
          </p>
          <div className="text-[11px] font-mono text-zinc-400 pt-1 border-t border-white/10 flex items-center justify-between">
            <span>Action: <strong className="text-white">{aiResult.recommendedActionName}</strong></span>
            <span className="text-white font-semibold px-2 py-0.5 rounded bg-white/10">{aiResult.autonomyRecommendation}</span>
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-4">
          <ConfidenceGauge confidence={incident.confidence} state={incident.state} />
          <AutonomyBadge autonomy={incident.autonomy} />
        </div>

        {/* Interactive Action Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => runLiveGeminiDiagnosis(incident.id)}
            disabled={isDiagnosing}
            className="glass-button cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-pulse)] font-mono text-micro text-white hover:border-white/40 active:scale-95 shadow-sm"
            title="Trigger Google Gemini to diagnose this incident live"
          >
            <Sparkles className={`w-3.5 h-3.5 text-white ${isDiagnosing ? "animate-spin" : ""}`} />
            <span>{isDiagnosing ? "DIAGNOSING..." : "LIVE GEMINI"}</span>
          </button>

          <button
            onClick={() => selectIncident(incident.id)}
            className="glass-button cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-pulse)] font-mono text-micro"
            title="Inspect counterfactual estimation & ERR formula"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
            INSPECT MATH
          </button>

          {incident.state === "at-risk" && (
            <>
              <button
                onClick={() => executeRecovery(incident.id)}
                className="glass-button-primary cursor-pointer flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pulse)] font-ui text-sm active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                EXECUTE RECOVERY
              </button>

              <button
                onClick={() => triggerFailure(incident.id)}
                className="glass-button cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-pulse)] text-zinc-300 font-mono text-micro active:scale-95"
                title="Simulate failure state & rollback"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                SIMULATE FAIL
              </button>
            </>
          )}

          {incident.state === "recovering" && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs backdrop-blur-md">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Executing Orchestration...
            </div>
          )}

          {incident.state === "recovered" && (
            <div className="flex items-center gap-1.5 text-white font-mono text-xs">
              <CheckCircle2 className="w-4 h-4" /> ₹{incident.potentialLoss.toLocaleString("en-IN")} Recovered & Settled
            </div>
          )}

          {incident.state === "failed" && (
            <div className="flex items-center gap-1.5 text-zinc-300 font-mono text-xs">
              <AlertTriangle className="w-4 h-4" /> Rolled Back — Escalated
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
