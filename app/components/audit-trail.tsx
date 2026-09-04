"use client";

import { usePulseStore } from "@/app/lib/use-pulse-store";
import { Terminal, ShieldCheck, AlertOctagon, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AuditTrail() {
  const { auditLogs } = usePulseStore();

  return (
    <section className="glass-panel rounded-[var(--radius-pulse)] p-6 space-y-4">
      {/* Terminal Title Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-white/[0.06] border border-white/10 text-white backdrop-blur-md">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-ui text-heading text-white">System Audit Trail & Interventions</h2>
            <p className="font-mono text-micro text-zinc-400">
              Immutable decision log (§8.4) — telemetry, counterfactual gap, policy check & outcome
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-micro text-white bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          DECISION AUDIT ACTIVE
        </div>
      </div>

      {/* Terminal Log Stream Table */}
      <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1 font-mono text-data">
        <AnimatePresence initial={false}>
          {auditLogs.map((log) => {
            let statusBorderColor = "border-l-zinc-400 bg-white/[0.02]";
            let statusTextColor = "text-zinc-300";
            let IconComponent = Clock;

            if (log.outcome === "recovered") {
              statusBorderColor = "border-l-white bg-white/[0.04]";
              statusTextColor = "text-white font-bold";
              IconComponent = CheckCircle;
            } else if (log.outcome === "failed") {
              statusBorderColor = "border-l-zinc-500 bg-white/[0.01]";
              statusTextColor = "text-zinc-400";
              IconComponent = AlertOctagon;
            } else if (log.outcome === "executing") {
              statusBorderColor = "border-l-zinc-300 bg-white/[0.03]";
              statusTextColor = "text-white";
              IconComponent = ShieldCheck;
            }

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3.5 rounded-r border-l-4 border-y border-r border-white/10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-xs backdrop-blur-md card-hover-subtle cursor-pointer transition-colors ${statusBorderColor}`}
              >
                {/* Left Meta: Timestamp & Log ID */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-zinc-400">{log.timestamp}</span>
                  <span className="text-white font-semibold">{log.id}</span>
                  <span className="text-zinc-200 font-medium">{log.incidentId}</span>
                </div>

                {/* Telemetry Evidence & Counterfactual Gap */}
                <div className="flex-1 min-w-[280px]">
                  <div className="text-white truncate font-sans text-sm font-medium">
                    {log.incidentTitle}
                  </div>
                  <div className="text-zinc-400 text-[11px] truncate flex items-center gap-2">
                    <span>Telemetry: {log.evidence}</span>
                    {log.counterfactualGap && (
                      <span className="text-white font-mono font-medium">[{log.counterfactualGap}]</span>
                    )}
                  </div>
                </div>

                {/* ERR & Policy Check */}
                <div className="shrink-0 text-right">
                  <div className="text-[11px] text-zinc-400 truncate">
                    {log.policyCheck}
                  </div>
                  <div className="text-micro font-semibold text-white">
                    ERR: <span className="text-white font-bold">₹{log.errScore?.toLocaleString("en-IN") ?? log.amount.toLocaleString("en-IN")}</span> | Conf: <span className="text-zinc-300">{log.confidence}%</span>
                  </div>
                </div>

                {/* Outcome Badge */}
                <div className="shrink-0 flex items-center gap-1.5 font-bold uppercase tracking-wider text-micro">
                  <span className={`px-2.5 py-1 rounded-full border border-white/20 bg-white/[0.06] flex items-center gap-1.5 ${statusTextColor}`}>
                    <IconComponent className="w-3.5 h-3.5" />
                    {log.outcome}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
