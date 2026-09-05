"use client";

import { useState, useEffect, useRef } from "react";
import { usePulseStore } from "@/app/lib/use-pulse-store";
import { Sparkles, X, Send, Bot, User, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Why is ICICI Mandate Throttle ranked #1 in ERR?",
  "Explain our counterfactual estimation model.",
  "What is our total blast radius across all active rails?",
  "Simulate what happens if Visa VTS drops another 20%."
];

export function AiCopilotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "👋 Welcome to **Meridian Copilot**. I am continuously monitoring your payment rails, evaluating Expected Revenue Recovery (ERR), and validating autonomy safety guardrails. What would you like to analyze?",
      timestamp: "Live"
    }
  ]);

  const { incidents, auditLogs } = usePulseStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const query = queryText || input.trim();
    if (!query || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          incidentsSnapshot: incidents,
          auditLogsSnapshot: auditLogs
        })
      });

      const data = await res.json();
      const aiReply = data.reply || "Unable to generate an AI response. Please verify telemetry.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "Encountered a network latency error while querying the Gemini reasoning engine. Please try again.",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel-raised card-hover border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.25)] font-ui text-sm text-white backdrop-blur-xl cursor-pointer"
        title="Open Meridian AI Copilot (Ctrl+K)"
      >
        <div className="relative">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
        </div>
        <span className="font-semibold tracking-wide">Ask Meridian AI</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded border border-white/20 text-zinc-300">
          ⌘K
        </kbd>
      </motion.button>

      {/* Slide-Over AI Copilot Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-lg h-full bg-black/95 backdrop-blur-2xl border-l border-white/20 shadow-2xl flex flex-col z-10 font-ui"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/10 border border-white/20 text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                      Meridian AI Copilot
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-mono border border-white/20">
                        Gemini Live
                      </span>
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      Telemetry Reasoner & Bounded Financial Decision Engine
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${
                      m.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded shrink-0 border ${
                        m.sender === "user"
                          ? "bg-white text-black border-white"
                          : "bg-white/10 text-white border-white/20"
                      }`}
                    >
                      {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                        m.sender === "user"
                          ? "bg-white/[0.12] border border-white/25 text-white"
                          : "bg-white/[0.04] border border-white/10 text-zinc-200"
                      }`}
                    >
                      <div className="whitespace-pre-line text-xs sm:text-sm font-ui text-justify">{m.text}</div>
                      <div className="text-[10px] font-mono text-zinc-500 mt-1 text-right">
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-white/10 border border-white/20 text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Gemini is analyzing payment telemetry & calculating counterfactuals...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                <div className="text-[11px] font-mono uppercase text-zinc-400 mb-2 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-white" /> Quick Inquiries
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      disabled={isSending}
                      className="text-left text-[11px] font-ui px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Bar */}
              <div className="p-4 border-t border-white/10 bg-black/80">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about ERR math, root cause, or rail health..."
                    disabled={isSending}
                    className="flex-1 bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 font-ui"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isSending}
                    className="glass-button-primary p-2.5 rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
