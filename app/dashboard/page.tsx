"use client";

import { Navbar } from "@/app/components/navbar";
import { HeaderHero } from "@/app/components/header-hero";
import { IncidentCard } from "@/app/components/incident-card";
import { AuditTrail } from "@/app/components/audit-trail";
import { DemoControls } from "@/app/components/demo-controls";
import { IncidentDetailModal } from "@/app/components/incident-detail-modal";
import { usePulseStore } from "@/app/lib/use-pulse-store";
import { AnimatePresence } from "framer-motion";
import { Layers, Activity } from "lucide-react";

import { ScrollFade } from "@/app/components/scroll-fade";
import { Footer } from "@/app/components/footer";

export default function DashboardPage() {
  const { incidents } = usePulseStore();

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black flex flex-col relative">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Signature Moment Header with Pulse Field Canvas */}
      <HeaderHero />

      {/* Main Mission Control Dashboard Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-8 py-8 space-y-8">
        {/* Manual Simulation Controls */}
        <ScrollFade direction="up">
          <DemoControls />
        </ScrollFade>

        {/* ERR (Expected Recoverable Revenue) Ranked Grid Section (§8.1 & §10) */}
        <section className="space-y-4">
          <ScrollFade direction="up">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[var(--radius-pulse)] bg-white/10 border border-white/20 text-white shadow-sm">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-ui text-heading text-white flex items-center gap-2">
                    Expected Recoverable Revenue (ERR) Engine Stream (§8)
                  </h2>
                  <p className="font-mono text-micro text-zinc-400">
                    Dynamically ranked across gateway degradation, subscription failures & checkout events
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-micro text-zinc-400">
                <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>{incidents.filter((i) => i.state !== "recovered").length} Active Incidents Queued</span>
              </div>
            </div>
          </ScrollFade>

          {/* Incident Cards Responsive Grid (§10) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <AnimatePresence mode="popLayout">
              {incidents.map((incident, index) => (
                <ScrollFade key={incident.id} direction="up" delay={index * 0.08} className={index === 0 && incident.state !== "recovered" ? "col-span-1 lg:col-span-2" : "col-span-1"}>
                  <IncidentCard
                    incident={incident}
                    rank={index + 1}
                  />
                </ScrollFade>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Immutable Audit Trail Section (§8.4) */}
        <ScrollFade direction="up" delay={0.1}>
          <AuditTrail />
        </ScrollFade>
      </main>

      {/* Incident Details Counterfactual & ERR Inspection Modal */}
      <IncidentDetailModal />

      {/* War Room Footer */}
      <Footer />
    </div>
  );
}
