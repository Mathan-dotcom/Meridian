"use client";

import { usePulseStore } from "@/app/lib/use-pulse-store";
import { Sparkles, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ToastNotification() {
  const { toast, dismissToast } = usePulseStore();

  return (
    <div className="fixed top-20 right-6 z-50 pointer-events-none max-w-md w-full">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`pointer-events-auto p-4 rounded-2xl glass-panel-raised card-hover border shadow-2xl backdrop-blur-2xl flex items-start gap-3 font-ui ${
              toast.type === "success"
                ? "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-black/90"
                : toast.type === "warning"
                ? "border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-black/90"
                : "border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-black/90"
            }`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                toast.type === "success"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : toast.type === "warning"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-white/10 text-white border border-white/20"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : toast.type === "warning" ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  {toast.title}
                </h4>
                <span className="text-[10px] font-mono text-zinc-500">{toast.timestamp}</span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={dismissToast}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
