"use client";

import { Navbar } from "@/app/components/navbar";
import { HeroSection } from "@/app/components/landing/hero-section";
import { ProblemSection } from "@/app/components/landing/problem-section";
import { ArchitectureSection } from "@/app/components/landing/architecture-section";
import { MathSection } from "@/app/components/landing/math-section";
import { ScopeMatrix } from "@/app/components/landing/scope-matrix";
import { DemoScriptSection } from "@/app/components/landing/demo-script-section";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black flex flex-col relative">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Landing Page Sections */}
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <ArchitectureSection />
        <MathSection />
        <ScopeMatrix />
        <DemoScriptSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 bg-black/50 backdrop-blur-2xl text-center font-mono text-micro text-zinc-400">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse" />
              <span className="font-ui font-semibold text-sm">MERIDIAN REVENUE RECOVERY ORCHESTRATOR</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <Link href="/dashboard" className="text-white hover:text-zinc-300 underline underline-offset-4 flex items-center gap-1.5 transition-colors">
                <Activity className="w-3.5 h-3.5" />
                <span>Live War Room Console</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-[11px] text-zinc-400">
            <div>
              Razorpay AI Buildathon — Track 03: AI Revenue Recovery • Version 1.0 (September 2026)
            </div>
            <div>
              Glassmorphic Monochrome Edition • Next.js 15 • Tailwind v4 • OKLCH
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
