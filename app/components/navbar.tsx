"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ArrowRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/50 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden bg-white p-1 border border-white/20 group-hover:border-white/50 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            <img src="/meridian-logo.png" alt="Meridian" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-ui font-bold text-base tracking-tight text-white">MERIDIAN</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/90 border border-white/20 font-semibold backdrop-blur-sm">
                v1.0
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase -mt-0.5">
              Revenue Orchestrator
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 font-ui text-xs text-zinc-400 font-medium">
          <Link
            href="/#problem"
            className="hover:text-white transition-colors"
          >
            The Problem
          </Link>
          <Link
            href="/#architecture"
            className="hover:text-white transition-colors"
          >
            7-Layer Pipeline
          </Link>
          <Link
            href="/#math"
            className="hover:text-white transition-colors"
          >
            ERR & Autonomy Math
          </Link>
          <Link
            href="/#scope"
            className="hover:text-white transition-colors"
          >
            Scope & Roadmap
          </Link>
          <Link
            href="/#demo-script"
            className="hover:text-white transition-colors"
          >
            5-Min Pitch Script
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {isDashboard ? (
            <Link
              href="/"
              className="glass-button flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-pulse)] text-xs font-mono text-white active:scale-95"
            >
              <span>← Product Overview</span>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="glass-button-primary flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pulse)] text-xs active:scale-95"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Launch Live War Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
