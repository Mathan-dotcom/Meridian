"use client";

import { usePulseStore } from "@/app/lib/use-pulse-store";
import { formatCounterfactualText } from "@/app/lib/err-engine";
import { X, Zap, Calculator, Activity, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TickingNumber, FormatInLakhs } from "./ticking-number";
import { AutonomyBadge } from "./autonomy-badge";

export function IncidentDetailModal() {
  const { incidents, selectedIncidentId, selectIncident, executeRecovery, triggerFailure } = usePulseStore();

  if (!selectedIncidentId) return null;

  const incident = incidents.find((i) => i.id === selectedIncidentId);
  if (!incident) return null;

  const cf = incident.counterfactual;
  const cfText = formatCounterfactualText(cf, incident.service);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/65 backdrop-blur-3xl border border-white/25 rounded-[var(--radius-pulse)] p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)] space-y-6 text-white font-ui"
        >
          {/* Top Bar Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-micro">
                <span className="text-white font-bold">{incident.id}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">{incident.service}</span>
                <span className="text-zinc-600">•</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 uppercase text-[10px] text-zinc-300 backdrop-blur-md">
                  Depth: {incident.depth.replace("_", " ")}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white uppercase text-[10px] font-bold border border-white/20 backdrop-blur-md">
                  {incident.type.replace("_", " ")}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-white">{incident.title}</h2>
            </div>

            <button
              onClick={() => selectIncident(null)}
              className="glass-button cursor-pointer p-2 rounded-[var(--radius-pulse)] text-zinc-400 hover:text-white active:scale-95"
              title="Close Inspection Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Non-Causal Counterfactual Estimation (§9) */}
          <div className="p-5 rounded bg-white/[0.03] backdrop-blur-xl border border-white/15 space-y-3">
            <div className="flex items-center justify-between text-micro font-mono text-white uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" /> Statistical Counterfactual Estimation Model (§9)
              </span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded border border-white/20 text-white font-bold">
                Non-Causal Counterfactual Gap: +{cf.counterfactualGap}pp
              </span>
            </div>

            <p className="text-sm font-ui text-zinc-200 italic bg-black/60 p-3 rounded border border-white/10">
              "{cfText}"
            </p>

            {/* Visual Counterfactual Gap Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-micro font-mono text-zinc-400">
                <span>Observed Success: {cf.observedSuccessRate}%</span>
                <span>Counterfactual Estimate without Anomaly: {cf.estimatedRateWithoutAnomaly}%</span>
              </div>
              <div className="h-3 w-full bg-white/[0.08] rounded-full overflow-hidden flex p-0.5 border border-white/15">
                <div
                  className="h-full bg-zinc-400 rounded-full transition-all duration-500"
                  style={{ width: `${cf.observedSuccessRate}%` }}
                  title="Observed Rate"
                />
                <div
                  className="h-full bg-white rounded-r-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  style={{ width: `${cf.counterfactualGap}%` }}
                  title="Counterfactual Gap"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Expected Revenue Recovery (ERR) Math Breakdown (§8) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                <Calculator className="w-5 h-5 text-white" /> Expected Revenue Recovery (ERR) Math Engine (§8)
              </h3>
              <div className="font-mono text-micro text-zinc-400">
                Formula: ERR = (Loss × P_rec × E_succ) - Cost - Risk
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/[0.03] backdrop-blur-xl p-4 rounded border border-white/10 space-y-1">
                <div className="text-micro font-mono uppercase text-zinc-400">Potential Lost Revenue</div>
                <div className="text-2xl font-display text-white">
                  <TickingNumber value={incident.potentialLoss} />
                </div>
              </div>

              <div className="bg-white/[0.03] backdrop-blur-xl p-4 rounded border border-white/10 space-y-1">
                <div className="text-micro font-mono uppercase text-zinc-300">Top Candidate ERR</div>
                <div className="text-2xl font-mono text-white font-semibold">
                  <TickingNumber value={incident.err} />
                  <span className="text-xs font-normal text-zinc-400 ml-1">
                    (<FormatInLakhs amountInRupees={incident.err} />)
                  </span>
                </div>
              </div>

              <div className="bg-white/[0.03] backdrop-blur-xl p-4 rounded border border-white/10 space-y-1">
                <div className="text-micro font-mono uppercase text-zinc-400">Diagnostics Confidence</div>
                <div className="text-2xl font-mono text-white font-semibold">
                  {incident.confidence}%
                </div>
              </div>
            </div>

            {/* Candidate Interventions Ranking Table */}
            <div className="space-y-2">
              <div className="text-micro font-mono uppercase text-zinc-400 tracking-wider">
                Evaluated Candidate Interventions
              </div>
              <div className="space-y-2">
                {incident.candidateInterventions.map((cand) => (
                  <div
                    key={cand.id}
                    className={`p-4 rounded border flex flex-wrap md:flex-nowrap items-center justify-between gap-4 font-mono text-xs backdrop-blur-md ${
                      cand.isRecommended
                        ? "bg-white/[0.06] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "bg-white/[0.02] border-white/5 opacity-70"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-semibold text-white font-ui text-sm mb-1">
                        {cand.isRecommended && (
                          <span className="px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold font-mono">
                            RECOMMENDED
                          </span>
                        )}
                        <span>{cand.name}</span>
                      </div>
                      <div className="text-zinc-400 text-[11px] font-ui">{cand.description}</div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 font-mono">
                      <div>
                        <div className="text-[10px] text-zinc-400">P(Rec) × E(Succ)</div>
                        <div className="text-white">
                          {(cand.probabilityOfRecovery * 100).toFixed(0)}% × {(cand.expectedSuccessRate * 100).toFixed(0)}%
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-zinc-400">Cost + Risk</div>
                        <div className="text-zinc-300">
                          -₹{(cand.interventionCost + cand.riskPenalty).toLocaleString("en-IN")}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-zinc-400">ERR Score</div>
                        <div className="text-sm font-bold text-white">
                          ₹{cand.errScore.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Autonomy Score Factors (§8.1) */}
          <div className="p-5 rounded bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-micro font-mono uppercase text-zinc-400 tracking-wider">
              <span>Autonomy Gate Formula Breakdown (§8.1)</span>
              <AutonomyBadge autonomy={incident.autonomy} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
              <div className="p-2.5 rounded bg-black/60 border border-white/10">
                <div className="text-zinc-400 text-[10px]">Confidence</div>
                <div className="text-white font-semibold text-sm">{(incident.autonomyFactors.confidence * 100).toFixed(0)}%</div>
              </div>
              <div className="p-2.5 rounded bg-black/60 border border-white/10">
                <div className="text-zinc-400 text-[10px]">Reversibility</div>
                <div className="text-white font-semibold text-sm">{(incident.autonomyFactors.reversibility * 100).toFixed(0)}%</div>
              </div>
              <div className="p-2.5 rounded bg-black/60 border border-white/10">
                <div className="text-zinc-400 text-[10px]">Historical Weight</div>
                <div className="text-white font-semibold text-sm">{incident.autonomyFactors.historicalSuccessWeight}</div>
              </div>
              <div className="p-2.5 rounded bg-black/60 border border-white/10">
                <div className="text-zinc-400 text-[10px]">Blast Radius</div>
                <div className="text-white font-semibold text-sm">Level {incident.autonomyFactors.blastRadius}/10</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/5 text-zinc-400">
              <span>Calculated Autonomy Score: <strong className="text-white">{incident.autonomyFactors.calculatedScore}</strong></span>
              <span>Policy Threshold: <strong className="text-white">&ge; 0.50 (Auto-Execute)</strong></span>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => selectIncident(null)}
              className="glass-button cursor-pointer px-4 py-2 rounded-[var(--radius-pulse)] text-zinc-300 hover:text-white text-sm font-ui active:scale-95"
            >
              Close Inspection
            </button>

            {incident.state === "at-risk" && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    executeRecovery(incident.id);
                    selectIncident(null);
                  }}
                  className="glass-button-primary cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-pulse)] text-sm active:scale-95"
                >
                  <Zap className="w-4 h-4" /> EXECUTE RECOMMENDED INTERVENTION
                </button>

                <button
                  onClick={() => {
                    triggerFailure(incident.id);
                    selectIncident(null);
                  }}
                  className="glass-button cursor-pointer flex items-center gap-1.5 px-3.5 py-2.5 rounded-[var(--radius-pulse)] text-zinc-300 font-mono text-xs active:scale-95"
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> SIMULATE FAIL & ROLLBACK
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
