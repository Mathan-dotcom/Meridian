# Product Requirement Document (PRD)

## Project Meridian — Autonomous Revenue Recovery Orchestrator
**Track 03:** AI-Powered Revenue Recovery  
**Target Platform:** Razorpay Ecosystem & Modern Payment Infrastructure  
**Document Version:** 1.1.0  
**Status:** Production / Implemented, Deployed & Validated  
**Author:** Mathan Kumaar A ([mathankumaar05@gmail.com](mailto:mathankumaar05@gmail.com))  
**GitHub Repository:** [https://github.com/Mathan-dotcom/Meridian](https://github.com/Mathan-dotcom/Meridian)  
**Live Production URL:** [https://meridianrazor.vercel.app](https://meridianrazor.vercel.app)  
**LinkedIn:** [Mathan Kumaar A](https://www.linkedin.com/in/mathan-kumaar-a-916aa42b7?utm_source=share_via&utm_content=profile&utm_medium=member_ios)  
**Date:** September 2026  

---

## 1. Executive Summary & Vision

### 1.1 The Core Problem
Modern fintech platforms and digital merchants suffer from **disconnected, compounding revenue leaks**:
- Payment gateway 504 timeouts and switch latencies.
- Expired subscription recurring token cryptograms (Visa VTS / Mastercard MDES).
- Checkout drop-offs and uncollected B2B invoices.

Specialized point agents and rules engines exist for individual tasks, but **nobody is deciding which problem gets attention first**, how candidate solutions trade off risk against revenue recovery, or whether an intervention actually brought the money back.

### 1.2 The Meridian Thesis
> *"Razorpay has specialized agents. Meridian is the autonomous orchestration layer that watches all payment rails in real time, decides which problem gets attention first using deterministic mathematics, executes bounded interventions, and proves the money actually settled."*

### 1.3 Vision: "A Heartbeat, Not a Homepage"
Meridian is not a static analytics dashboard. It is a live operational mission control (War Room) designed around a continuous agentic heartbeat:
1. **Detects** telemetry anomalies across payment streams in real time.
2. **Diagnoses** failure clusters with root-cause correlation and Google Gemini LLM reasoning.
3. **Simulates** counterfactual outcomes across multiple candidate interventions without touching live traffic.
4. **Ranks** incidents dynamically by **Expected Revenue Recovery (ERR)** so the highest recoverable ₹ value is always at Rank #1.
5. **Enforces** strict autonomy safety boundaries (Confidence × Reversibility × Historical Weight × 1/Blast Radius).
6. **Executes** bounded, reversible interventions against payment rails and Razorpay APIs.
7. **Verifies** closed-loop recovery via banking settlement metrics, with automatic rollback and human ops escalation if recovery fails.

---

## 2. Target Users & Operating Personas

| Persona | Role | Primary Objective in Meridian | Key Feature Utilized |
| :--- | :--- | :--- | :--- |
| **VP of Engineering / Head of Payments** | Strategic & Technical Owner | Reduce systemic transaction fallout and meet 99.99% gateway SLA uptime | Global Recoverable vs Recovered Financial Ticker, Architecture Pipeline |
| **Payment Ops / FinOps Lead** | Daily Operator & Incident Responder | Rapid root-cause triage, counterfactual inspection, and safe intervention execution | ERR Ranked Stream, Inspect Math Modal, Live Gemini Diagnostician |
| **Fraud & Risk Officer** | Compliance & Audit Authority | Ensure automated actions operate within strict safety boundaries without runaway blast radius | Autonomy Score Gate, Immutable Terminal Audit Ledger |
| **Autonomous Meridian Agent (AI)** | Machine Actor | Continuously monitor, diagnose, and auto-execute low-risk high-confidence recoveries | Autonomous Autopilot Loop, Chaos Fault Injector, Razorpay Webhooks |

---

## 3. Scope Split & Engineering Honesty

To deliver an authentic, scientifically grounded solution during the buildathon, Meridian adopts a transparent **Deep / Shallow / Architecture-Only** scope division:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             MERIDIAN ERR STREAM ENGINE                           │
│     (Uniform Mathematical Ranking Across All Ingested Incident Categories)       │
└────────────────────────┬─────────────────────────┬───────────────────────────────┘
                         │                         │
            ┌────────────┴────────────┐            │
            ▼                         ▼            ▼
     [ DEEP SCOPE ]          [ SHALLOW SCOPE ]  [ ARCHITECTURE ONLY ]
 Payment / Gateway Timeout    Subscription Token   Checkout Drop-Off &
  (Full 7-Layer Pipeline,     Cache Invalidation    Overdue Receivables
   Counterfactual Modeling,    (VTS Refresh,       (Normalized Event
   Fallback Rerouting,         Targeted Retry)      Stream Ingestion)
   Rollback & Settlement)
```

### 3.1 Deep Scope: Payment Gateway Degradation
- **Implementation:** Full 7-layer pipeline.
- **Features:** Real-time Z-score anomaly detection, multidimensional error clustering, statistical counterfactual estimation, Axis fallback rail rerouting, post-action settlement verification, and automatic rollback on failure.
- **Status:** **100% Implemented & Interactive.**

### 3.2 Shallow Scope: Subscription Recurring Payment Failures
- **Implementation:** Simplified detection & orchestration.
- **Features:** Visa VTS cryptogram token cache refresh, rate-throttled retry scheduling, and merchant notification dispatch.
- **Status:** **100% Implemented & Demoable.**

### 3.3 Architecture-Only Scope: Checkout Drop-Off & B2B Invoices
- **Implementation:** Normalized event schema ingestion.
- **Features:** Ingested into the normalized event stream to prove that the ERR ranking engine can evaluate cart abandonments and overdue receivables on the same mathematical scale as gateway leaks.
- **Status:** **Architecturally Modeled on Roadmap.**

---

## 4. The 7-Layer Agentic Decision Pipeline

A strict architectural separation of concerns: **LLMs are used exclusively for reasoning, explanation, and synthesis** — never for anomaly detection, policy gates, or financial math.

```
 telemetry data ──► [01. DETECTOR]      (Deterministic Z-Score / Rolling Window)
                          │
                          ▼
                    [02. DIAGNOSTICIAN] (Multivariate Correlation + Google Gemini LLM)
                          │
                          ▼
                    [03. SIMULATOR]     (What-If Matrix & Counterfactual Gap)
                          │
                          ▼
                    [04. ERR ENGINE]    (ERR Ranking Formula: ₹ Value at Rank #1)
                          │
                          ▼
                    [05. AUTONOMY GATE] (Policy Gate: Auto-Execute vs Human Escalation)
                          │
                          ▼
                    [06. EXECUTOR]      (Bounded, Idempotent Action on Payment Rail)
                          │
                          ▼
                    [07. VERIFIER]      (Closed-Loop Settlement Verification / Rollback)
```

---

## 5. Mathematical Formulations

### 5.1 Expected Revenue Recovery (ERR) Formula
$$\text{ERR} = \left( \text{Potential\_Loss} \times P(\text{recovery}) \times E(\text{success}) \right) - \text{Intervention\_Cost} - \text{Risk\_Penalty}$$

Where:
- $\text{Potential\_Loss}$: The ₹ value of transactions at risk in the affected cluster.
- $P(\text{recovery})$: Probability that this specific error type is recoverable.
- $E(\text{success})$: Historical success rate of the proposed intervention strategy.
- $\text{Intervention\_Cost}$: Direct operational and transaction cost of executing the intervention.
- $\text{Risk\_Penalty}$: Quantified downside risk (merchant friction, double-charge potential, SLA breach).

### 5.2 Autonomy Score & Safety Gating
$$\text{Autonomy\_Score} = \text{Confidence} \times \text{Reversibility} \times \text{Historical\_Weight} \times \frac{1}{\text{Blast\_Radius}}$$

- **Auto-Execute Threshold:** $\ge 0.70$
- **Human Approval Required:** $< 0.70$

---

## 6. Technical Stack & Production Architecture

### 6.1 Frontend & User Experience
- **Framework:** Next.js 15 (App Router, Server & Client Components), React 19.
- **Styling:** Tailwind CSS v4, OKLCH color spaces, Vanilla CSS design tokens.
- **Aesthetic:** Monochrome Dark Glassmorphism (`rgba(255,255,255,0.035)` frosted panels, `backdrop-filter: blur(16px)`).
- **Typography:** Fraunces (Editorial Display), Space Grotesk (Clean UI), IBM Plex Mono (Financial Data & Ledgers).
- **Motion & Micro-interactions:** Framer Motion for scroll-fades (`whileInView`), card hover animations (`translateY(-8px) scale(1.015)`), and ticking financial numbers.
- **Visual Canvas:** `PulseField` HTML5 2D Canvas rendering 70+ animated nodes simulating live payment transactions with white bloom ripples upon recovery.
- **Unified Footer:** Responsive glassmorphic footer featuring author attribution, project description, and direct links to GitHub repository, LinkedIn profile, and Gmail contact.

### 6.2 Agent Services, Webhooks & APIs
- **`/api/webhooks/razorpay` (POST):**
  Production webhook listener with HMAC-SHA256 signature verification (`x-razorpay-signature`). Ingests live Razorpay events (`payment.failed`, `order.paid`, `subscription.halted`), converts raw payloads into normalized incidents, calculates ERR, and dynamically ranks them into the active stream.
- **`/api/health` (GET):**
  Readiness and liveness observability probe. Returns live integration status for Google Gemini AI (`operational`), Razorpay gateway (`live_gateway_integration`), webhook secret configuration, and live pipeline metrics.
- **`/api/telemetry/ingest` (POST):**
  Enterprise payment telemetry ingestion endpoint for external payment switches and merchant backends.
- **`/api/incidents` (GET):**
  Persistent incident store API backed by an in-memory & file-persisted server store.
- **`/api/agent/diagnose` (POST):**
  Accepts incident telemetry, error codes, and candidate interventions. Invokes Google Gemini API (`gemini-flash-latest`) with system prompts enforcing JSON-structured diagnostics, counterfactual reasoning, and autonomy factor checks.
- **`/api/agent/chat` (POST):**
  Powers the global **Ask Meridian AI Copilot** slide-over drawer (`⌘K` / `Ctrl+K`), providing live contextual Q&A on active incidents, ERR math, and Razorpay integrations.
- **`/api/agent/execute` (POST):**
  Executes bounded interventions against Razorpay REST endpoints, updates persistent incident states, logs tamper-evident audit records, and verifies settlement outcomes.

### 6.3 State Management & Observability
- **Global Reactive Client Store:** `app/lib/use-pulse-store.ts` using `useSyncExternalStore` for flicker-free, SSR-safe hydration.
- **Server Persistence Store:** `app/lib/server-store.ts` providing synchronized server-side incident queues, audit ledgers, and recovery metrics across serverless invocations.
- **Chaos Fault Injector:**
  Simulates real-world incidents on demand:
  1. *HDFC Netbanking 504 Gateway Timeout* (Deep)
  2. *Visa VTS Cryptogram Cache Invalidation* (Shallow)
  3. *NPCI UPI Volume Degraded* (Deep)

---

## 7. Operational Live War Room Flow

Designed for real-time mission-control operation and executive demonstration:

1. **System Health & Observability Verification:**
   Inspect `/api/health` to confirm Gemini AI status (`operational`) and Razorpay gateway mode (`live_gateway_integration`).
2. **Deterministic ERR Sorting:**
   Incidents in the stream are dynamically ranked by recoverable ₹ value (Rank #1 is determined mathematically, not by time of arrival).
3. **Counterfactual & Autonomy Inspection:**
   Inspect any incident card to view the counterfactual gap between doing nothing versus executing candidate interventions, backed by Bayesian autonomy score factors.
4. **Autonomous Execution:**
   Execute autonomous recovery against live Razorpay APIs. Observe the white bloom exhale ripple on the canvas, incident status transition to `Recovered`, and the recovered amount ticking into the global revenue ticker.
5. **Tamper-Evident Audit Trail:**
   Every intervention, timestamp, operator signature, and post-action verification metric is logged to an immutable terminal ledger.

---

## 8. Post-Buildathon Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                        POST-BUILDATHON ROADMAP                         │
├─────────────────────────┬─────────────────────────┬────────────────────┤
│ Q4 2026                 │ Q1 2027                 │ Q2 2027            │
│ Incident Memory / RAG   │ Learned Autonomy        │ Multi-Agent        │
│ Vector retrieval over   │ ML model updating       │ Direct bilateral   │
│ historical incidents    │ historical weights      │ agent handshakes   │
└─────────────────────────┴─────────────────────────┴────────────────────┘
```

1. **Phase 1 — Incident Memory / RAG:**
   - Vector database (pgvector / Pinecone) indexing past incident postmortems, gateway SLA breaches, and merchant-specific retry profiles for zero-shot diagnosis.
2. **Phase 2 — Learned Autonomy Weights:**
   - Transitioning the static $\text{Historical\_Weight}$ factor into a continuous Bayesian probability distribution updated by closed-loop verifier settlement outcomes.
3. **Phase 3 — Bilateral Multi-Agent Protocol:**
   - Standardized bilateral Agent-to-Agent protocol interfacing directly with Razorpay Agent Studio point agents (Refund Agent, Risk Agent, Routing Agent).

---

## 9. Appendix & Verification Checklist

- [x] Responsive glassmorphic UI verified on desktop and mobile viewports.
- [x] Instant initial paint and optimized asset loading with sub-second performance.
- [x] Google Gemini API integration operational for real-time live diagnosis (`gemini-flash-latest`).
- [x] Razorpay REST API authenticated and operational with live test credentials.
- [x] Razorpay Webhook pipeline active at `/api/webhooks/razorpay` with HMAC-SHA256 verification.
- [x] Health check observability probe operational at `/api/health`.
- [x] Reusable glassmorphic footer with GitHub, LinkedIn, and Gmail links.
- [x] Next.js production build (`npm run build`) passing with 0 errors.
- [x] Production deployment verified live at [https://meridianrazor.vercel.app](https://meridianrazor.vercel.app).
- [x] Version control synchronized with GitHub `origin/main` at [Mathan-dotcom/Meridian](https://github.com/Mathan-dotcom/Meridian).
