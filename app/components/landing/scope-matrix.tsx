"use client";

import { CheckCircle2, Layers, Compass } from "lucide-react";
import { ScrollFade } from "@/app/components/scroll-fade";

export function ScopeMatrix() {
  return (
    <section id="scope" className="py-20 md:py-28 border-b border-white/10 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <ScrollFade direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-micro text-white/70 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-white" />
              <span>Scope & Engineering Honesty (§6 & §11)</span>
            </div>
            <h2 className="font-ui text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Buildathon Scope Split & Roadmap
            </h2>
            <p className="font-ui text-base sm:text-lg text-zinc-400 leading-relaxed text-justify">
              To deliver an authentic, production-grade product during the buildathon, we adopted a <strong className="text-white">Deep / Shallow / Architecture-Only</strong> scope division. The ERR ranking engine operates uniformly across all incident categories.
            </p>
          </div>
        </ScrollFade>

        {/* Scope Matrix Table */}
        <ScrollFade direction="up" delay={0.1}>
          <div className="overflow-x-auto rounded-[var(--radius-pulse)] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <table className="w-full text-left font-ui text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] font-mono text-xs uppercase text-zinc-400">
                  <th className="p-4 sm:p-5">Incident Category</th>
                  <th className="p-4 sm:p-5">Depth Level</th>
                  <th className="p-4 sm:p-5">Implementation Details</th>
                  <th className="p-4 sm:p-5">Live Demo Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-ui">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-white">
                    Payment / Gateway Degradation
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-white text-black font-semibold shadow-sm">
                      DEEP
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-300 text-xs text-justify">
                    Full 7-layer pipeline implementation: real correlation, counterfactual gap analysis, fallback rerouting, verifier confirmation & failure rollback.
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-white font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-white" /> Ready & Interactive
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-white">
                    Subscription Payment Failure
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                      SHALLOW
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-300 text-xs text-justify">
                    Simplified detection, Visa VTS cryptogram token cache refresh, and auto-retry intervention orchestration.
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400" /> Demoable
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-white">
                    Checkout Abandonment
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] text-zinc-400 border border-white/10">
                      ARCHITECTURE ONLY
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400 text-xs text-justify">
                    Ingested into normalized event stream to prove ERR engine can rank cart drop-offs alongside gateway leaks.
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-zinc-400">
                    Ranked in Stream
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-white">
                    Overdue Receivables
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] text-zinc-400 border border-white/10">
                      ARCHITECTURE ONLY
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400 text-xs text-justify">
                    Demonstrates extensibility to merchant invoice cashflow reconciliation and early-warning alerts.
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-zinc-500">
                    Modeled on Roadmap
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollFade>

        {/* Roadmap Items (§11) */}
        <ScrollFade direction="up" delay={0.15}>
          <div className="p-6 rounded-[var(--radius-pulse)] glass-panel card-hover space-y-4 font-ui">
            <div className="flex items-center gap-2 font-mono text-micro text-white/70 uppercase font-semibold">
              <Compass className="w-4 h-4 text-white" /> Explicit Post-Buildathon Roadmap (§11)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-ui">
              <div className="p-4 rounded-[var(--radius-pulse)] bg-white/[0.03] border border-white/10 space-y-1.5 backdrop-blur-md card-hover-subtle cursor-pointer">
                <strong className="text-white font-semibold">1. Incident-Memory / RAG:</strong>
                <p className="text-zinc-400 text-justify">Semantic vector retrieval over historical incident resolutions and gateway SLA performance patterns.</p>
              </div>
              <div className="p-4 rounded-[var(--radius-pulse)] bg-white/[0.03] border border-white/10 space-y-1.5 backdrop-blur-md card-hover-subtle cursor-pointer">
                <strong className="text-white font-semibold">2. Learned Autonomy Weights:</strong>
                <p className="text-zinc-400 text-justify">Transitioning the synthetic Historical_Success_Weight into an empirically trained probability distribution.</p>
              </div>
              <div className="p-4 rounded-[var(--radius-pulse)] bg-white/[0.03] border border-white/10 space-y-1.5 backdrop-blur-md card-hover-subtle cursor-pointer">
                <strong className="text-white font-semibold">3. Multi-Agent Protocol:</strong>
                <p className="text-zinc-400 text-justify">Direct bilateral agent-to-agent handshake with Razorpay Agent Studio point agents.</p>
              </div>
            </div>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
