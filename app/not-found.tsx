import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center space-y-5 font-ui relative overflow-hidden">
      <div className="p-8 rounded-[var(--radius-pulse)] glass-panel card-hover max-w-md w-full space-y-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="font-mono text-micro text-white/70 uppercase tracking-wider">
          404 — Not Found
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Payment Rail Route Unresolved
        </h1>
        <p className="text-zinc-400 text-sm">
          The requested telemetry endpoint or route could not be found in the current orchestrator session.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="glass-button inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-pulse)] text-xs font-mono text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
