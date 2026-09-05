# Product Requirement Document (PRD)

## Project Meridian — Autonomous Revenue Recovery Orchestrator
**Track 03:** AI-Powered Revenue Recovery  
**Target Platform:** Razorpay Ecosystem & Modern Payment Infrastructure  
**Document Version:** 1.0.0  
**Status:** Production / Implemented & Validated  
**Author:** Meridian Engineering Team  
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
6. **Executes** bounded, reversible interventions.
7. **Verifies** closed-loop recovery via banking settlement metrics, with automatic rollback and human ops escalation if recovery fails.

---

## 2. Target Users & Operating Personas

| Persona | Role | Primary Objective in Meridian | Key Feature Utilized |
| :--- | :--- | :--- | :--- |
| **VP of Engineering / Head of Payments** | Strategic & Technical Owner | Reduce systemic transaction fallout and meet 99.99% gateway SLA uptime | Global Recoverable vs Recovered Financial Ticker, Architecture Pipeline |
| **Payment Ops / FinOps Lead** | Daily Operator & Incident Responder | Rapid root-cause triage, counterfactual inspection, and safe intervention execution | ERR Ranked Stream, Inspect Math Modal, Live Gemini Diagnostician |
| **Fraud & Risk Officer** | Compliance & Audit Authority | Ensure automated actions operate within strict safety boundaries without runaway blast radius | Autonomy Score Gate, Immutable Terminal Audit Ledger |
| **Autonomous Meridian Agent (AI)** | Machine Actor | Continuously monitor, diagnose, and auto-execute low-risk high-confidence recoveries | Autonomous Autopilot Loop, Chaos Fault Injector |

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
                    [05. POLICY / GATE] (Autonomy Score Threshold: >= 0.50 Auto)
                          │
                          ▼
                    [06. EXECUTOR]      (Bounded API Orchestration / Reroute)
                          │
                          ▼
                    [07. VERIFIER]      (Closed-Loop Settlement Check / Auto-Rollback)
```

### Layer Details
1. **Layer 01 — Detector (Deterministic):**
   - Monitors telemetry (success rates, latencies, HTTP error codes) over rolling 5-minute sliding windows.
   - Triggers an anomaly when observed failure rates exceed $+3\sigma$ against the time-of-day baseline.
2. **Layer 02 — Diagnostician (Hybrid Rules + Gemini LLM):**
   - Groups error bursts across bank BINs, gateway nodes, and payment methods.
   - Passes normalized telemetry to Google Gemini (`gemini-1.5-flash` / `gemini-2.0-flash`) to generate natural language explanations and multi-step reasoning chains.
3. **Layer 03 — Simulator (Counterfactual Engine):**
   - Evaluates 2 to 4 candidate interventions without altering live traffic.
   - Computes the non-causal counterfactual gap between observed metrics and simulated counterfactual baselines.
4. **Layer 04 — ERR Engine (Mathematical Ranker):**
   - Calculates the Expected Revenue Recovery for each candidate intervention.
   - Sorts all open incidents dynamically so Rank #1 is always the highest net recoverable ₹ value.
5. **Layer 05 — Policy / Gate (Safety Boundary):**
   - Computes the weighted Autonomy Score.
   - Score $\ge 0.50$: Permitted for autonomous hands-free execution.
   - Score $< 0.50$: Escalated to human operator with pre-populated action packet.
6. **Layer 06 — Executor (Bounded Action Layer):**
   - Executes safe, reversible actions: reroutes traffic to fallback rails (Axis bank pipe), initiates batch token cryptogram refresh, or enforces rate throttling.
7. **Layer 07 — Verifier & Rollback (Closed-Loop Settlement):**
   - Polls post-intervention banking telemetry for 30–60 seconds.
   - If success rate rebounds: marks incident as `recovered`, settles rupee ledger, and logs cryptographic confirmation.
   - If success rate deteriorates: triggers instantaneous rollback to original configuration, marks state as `failed`, and pages on-call ops.

---

## 5. Mathematical Formulations & Rigor

### 5.1 Expected Revenue Recovery (ERR) Formula

$$\mathbf{ERR}(i, a) = \text{Potential\_Loss}(i) \times P_{\text{Recovery}}(a) \times E_{\text{Success}}(a) - \text{Cost}(a) - \text{Risk}(a)$$

Where:
- $\text{Potential\_Loss}(i)$: Total gross transaction volume currently leaking under incident $i$ (in ₹).
- $P_{\text{Recovery}}(a)$: Empirical probability that intervention $a$ addresses the identified failure mode ($0.0 \le P \le 1.0$).
- $E_{\text{Success}}(a)$: Expected baseline success rate of the alternative rail or action ($0.0 \le E \le 1.0$).
- $\text{Cost}(a)$: Direct routing fees, switch surcharges, or API overhead incurred by taking action $a$ (in ₹).
- $\text{Risk}(a)$: Blast radius penalty quantifying secondary failure probability on destination rails (in ₹).

#### Worked Benchmark Example:
- Potential Loss: ₹4,10,000
- Intervention: *Reroute via Axis fallback rail*
- $P_{\text{Recovery}} = 0.92$, $E_{\text{Success}} = 0.98$
- Cost = ₹4,000, Risk = ₹0
$$\mathbf{ERR} = (4,10,000 \times 0.92 \times 0.98) - 4,000 - 0 = \mathbf{₹3,65,000}$$

---

### 5.2 Autonomy Gate Score Formula

$$\mathbf{Autonomy\_Score} = \text{Confidence} \times \text{Reversibility} \times \text{Historical\_Weight} \times \left( \frac{1}{\text{Blast\_Radius}} \right)$$

Where:
- $\text{Confidence} \in [0.0, 1.0]$: Confidence score of the diagnostic identification.
- $\text{Reversibility} \in [0.0, 1.0]$: Speed and fidelity of reversing the intervention (1.0 = instant soft route; 0.2 = irreversible batch write).
- $\text{Historical\_Weight} \in [0.0, 1.0]$: Historical empirical success rate of this intervention over the last 90 days.
- $\text{Blast\_Radius} \ge 1$: Scope of affected merchant traffic (1 = isolated BIN/gateway; 2 = regional; 5 = global switch).

#### Decision Rule:
- $\mathbf{Score \ge 0.50}$: **`AUTO`** — Autonomous machine execution enabled.
- $\mathbf{Score < 0.50}$: **`ESCALATE`** — Requires human operations sign-off.

---

### 5.3 Non-Causal Counterfactual Framing
Meridian strictly avoids unsupportable causal claims (*"Gateway B caused 100% of failures"*). Instead, it adopts **honest counterfactual estimation**:

$$\mathbf{\Delta_{\text{CF}}} = \text{Rate}_{\text{Estimated Without Anomaly}} - \text{Rate}_{\text{Observed}}$$

> *"Observed: 72%. Estimated rate without Gateway B: 89%. Counterfactual gap: +17pp. This increases confidence that Gateway B is a likely contributor."*

---

## 6. Functional Architecture & Components

### 6.1 Frontend & User Experience
- **Framework:** Next.js 15 (App Router), React 19, TypeScript.
- **Styling:** Vanilla Tailwind CSS with custom Design Tokens (`globals.css`).
- **Aesthetic:** Monochrome Dark Glassmorphism (`rgba(255,255,255,0.035)` frosted panels, `backdrop-filter: blur(16px)`).
- **Typography:** Fraunces (Editorial Display), Space Grotesk (Clean UI), IBM Plex Mono (Financial Data & Ledgers).
- **Text Formatting:** Clean universal justification (`text-align: justify; text-justify: inter-word; text-align-last: left;`).
- **Motion & Micro-interactions:** Framer Motion for scroll-fades, card hover pop-ups (`translateY(-8px) scale(1.015)`), and ticking financial numbers.
- **Signature Visual Canvas:** `PulseField` HTML5 2D Canvas rendering 70+ animated nodes simulating live payment transactions with white bloom ripples upon recovery.

### 6.2 Agent Services & APIs
- **`/api/agent/diagnose` (POST):**
  Accepts incident telemetry, error codes, and candidate interventions. Invokes Google Gemini API with system prompts enforcing JSON-structured diagnostics, counterfactual reasoning, and autonomy factor checks.
- **`/api/agent/chat` (POST):**
  Powering the global **Ask Meridian AI Copilot** slide-over drawer (`⌘K` / `Ctrl+K`), providing live contextual Q&A on active incidents, ERR math, and Razorpay integrations.
- **`/api/agent/execute` (POST):**
  Simulates execution against payment switch endpoints, handles simulated delays, updates state stores, and verifies settlement outcomes.

### 6.3 State Management & Autopilot Engine
- **Global Reactive Store:** `app/lib/use-pulse-store.ts` using `useSyncExternalStore` for flicker-free, SSR-safe hydration.
- **Autonomous Autopilot Loop:**
  Configurable timer polling open incidents, triggering live Gemini diagnostics, evaluating the autonomy gate, auto-executing eligible interventions, and logging recovery transactions.
- **Chaos Fault Injector:**
  Simulates real-world incidents on demand:
  1. *HDFC Netbanking 504 Gateway Timeout* (Deep)
  2. *Visa VTS Cryptogram Cache Invalidation* (Shallow)
  3. *NPCI UPI Volume Degraded* (Deep)

---

## 7. The 5-Minute Buildathon Presentation Flow

Built directly into the interactive War Room stepper (`DemoStepper`):

| Time | Step Name | Judge Talking Point | Live System Action |
| :--- | :--- | :--- | :--- |
| **0:00–0:30** | **1. One-Line Pitch & Problem** | "Revenue leaks are disconnected. Point agents exist, but nobody is deciding which problem gets attention first." | Overview of landing page & 7-layer pipeline banner. |
| **0:30–1:30** | **2. The Revenue Protection Center** | "Explain the ERR sorting: Rank #1 is determined mathematically by recoverable ₹, not time of arrival." | Navigate to `/dashboard`, point out the 3 queued incidents sorted by ERR. |
| **1:30–2:30** | **3. Counterfactual Inspection & Math** | "Open Inspect Math modal. Show the +17pp counterfactual gap and autonomy score factors." | Click **INSPECT MATH** on INC-9042; inspect candidate table and formula breakdown. |
| **2:30–3:15** | **4. Live Execution & Meridian Wave** | "Click EXECUTE RECOVERY. Point to the white exhale bloom, dynamic re-sorting, and ticking ledger." | Click **EXECUTE RECOVERY**; watch recovery state, canvas ripple, and ₹3.65L recovered. |
| **3:15–4:00** | **5. Graceful Failure & Rollback (Standout)** | "Trigger failure live! Say: 'This is graceful failure, not a fake demo where everything works.'" | Click **SIMULATE FAIL**; show red alert shake, auto-rollback, and ops escalation. |
| **4:00–5:00** | **6. Audit Trail & Positioning** | "Review terminal audit log. Close: 'Razorpay has specialized agents. Meridian is the layer that decides which one gets called, and proves it worked.'" | Review immutable audit ledger table; showcase live Ask Meridian AI Copilot. |

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
- [x] Google Gemini API integration operational for real-time live diagnosis.
- [x] Autonomous Autopilot mode validated with continuous background loop.
- [x] Chaos Fault Injector operational for HDFC 504, Visa VTS, and NPCI UPI.
- [x] Text justification and typographic alignment standard applied across all views.
- [x] Interactive 5-Minute Demo Script Stepper with keyboard and button navigation.
- [x] Next.js production build (`npx next build`) passing with 0 errors.
- [x] Version control synchronized with GitHub `origin/main`.
