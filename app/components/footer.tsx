"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-2xl py-10 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand & Project Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-white">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white] animate-pulse" />
              <span className="font-ui font-bold text-sm tracking-wide">
                MERIDIAN REVENUE RECOVERY ORCHESTRATOR
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/90 border border-white/20">
                v1.0
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400 max-w-md">
              Autonomous AI-driven payment failure mitigation, dynamic ERR ranking, and counterfactual loss prevention.
            </p>
          </div>

          {/* Social, Code & Contact Links */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {/* GitHub Link */}
            <a
              href="https://github.com/Mathan-dotcom/Meridian"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-pulse)] text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 transition-all group"
            >
              <svg
                className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/mathan-kumaar-a-916aa42b7?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-pulse)] text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 transition-all group"
            >
              <svg
                className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Gmail Link */}
            <a
              href="mailto:mathankumaar05@gmail.com"
              className="glass-button flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-pulse)] text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 transition-all group"
            >
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>mathankumaar05@gmail.com</span>
            </a>

            {/* Console Navigation Link */}
            {isDashboard ? (
              <Link
                href="/"
                className="glass-button-primary flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-pulse)] text-xs text-white"
              >
                <span>← Overview</span>
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="glass-button-primary flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-pulse)] text-xs text-white"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>War Room</span>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-[11px] text-zinc-400 font-mono">
          <div>
            Razorpay AI Buildathon — Track 03: AI Revenue Recovery • Built by Mathan Kumaar A
          </div>
          <div>
            Glassmorphic Monochrome Edition • Next.js 15 • Tailwind v4 • OKLCH
          </div>
        </div>
      </div>
    </footer>
  );
}
