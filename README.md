# ⚡ Meridian — Autonomous Revenue Recovery Orchestrator

[![Live Production](https://img.shields.io/badge/Production-Live_on_Vercel-success?style=flat-square&logo=vercel)](https://meridianrazor.vercel.app)
[![Track 03](https://img.shields.io/badge/Razorpay_AI_Buildathon-Track_03:_Revenue_Recovery-blue?style=flat-square)](https://razorpay.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-Flash_AI_Engine-8E75B2?style=flat-square&logo=google)](https://ai.google.dev/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Live_Gateway_&_Webhooks-0C2340?style=flat-square&logo=razorpay)](https://razorpay.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> *"Razorpay has specialized point agents. Meridian is the autonomous orchestration layer that watches all payment rails in real time, decides which problem gets attention first using deterministic mathematics, executes bounded interventions, and proves the money actually settled."*

---

## 🌐 Quick Access & Live Links

- **🚀 Live Application (Landing & Architecture):** [https://meridianrazor.vercel.app](https://meridianrazor.vercel.app)
- **⚡ Live Mission Control War Room:** [https://meridianrazor.vercel.app/dashboard](https://meridianrazor.vercel.app/dashboard)
- **🔍 Observability Probe & Readiness Probe:** [https://meridianrazor.vercel.app/api/health](https://meridianrazor.vercel.app/api/health)
- **📑 Comprehensive Product Requirement Document:** [`PRD.md`](PRD.md)
- **🛠️ Production Deployment Guide:** [`DEPLOYMENT.md`](DEPLOYMENT.md)

---

## 🧠 The Problem & Meridian Thesis

Digital merchants lose between **1.8% and 4.2% of GMV** to payment friction and cascading failures:
1. **Gateway Latency & Switch 504 Timeouts:** Acquiring bank outages trigger massive payment drops.
2. **Expired Recurring Cryptograms:** Visa VTS / Mastercard MDES subscription tokens silently expire.
3. **Checkout Friction & Invoicing Gaps:** B2B payments and checkout abandonments stall unrecovered.

While point solutions exist for individual retry tasks, **no central brain ranks which crisis to tackle first based on financial impact**, simulates candidate interventions before altering traffic, or cryptographically verifies settlement in the banking ledger.

**Meridian** solves this with a real-time, closed-loop agentic heartbeat.

---

## 🏗️ The 7-Layer Agentic Decision Pipeline

Meridian maintains a strict separation of concerns: **LLMs (Google Gemini) are reserved for causal diagnosis and reasoning** — never for anomaly thresholding, policy gating, or financial calculations.

```
 telemetry stream ──► [01. DETECTOR]      (Deterministic Z-Score / Rolling Window)
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
                      [06. EXECUTOR]      (Bounded, Idempotent Action on Razorpay Rails)
                            │
                            ▼
                      [07. VERIFIER]      (Closed-Loop Settlement Verification / Rollback)
```

---

## 📐 Mathematical Formulations

### 1. Expected Revenue Recovery (ERR) Formula
$$\text{ERR} = \left( \text{Potential\_Loss} \times P(\text{recovery}) \times E(\text{success}) \right) - \text{Intervention\_Cost} - \text{Risk\_Penalty}$$

- **Potential Loss:** ₹ volume in the degraded transaction cluster.
- **$P(\text{recovery})$:** Statistical probability that the error code is recoverable.
- **$E(\text{success})$:** Historical recovery rate of the proposed intervention strategy.
- **Intervention Cost:** Direct operational/gateway cost of triggering retries.
- **Risk Penalty:** Quantified downside risk (merchant friction, double-billing risk, SLA penalty).

### 2. Bayesian Autonomy Score & Safety Gating
$$\text{Autonomy\_Score} = \text{Confidence} \times \text{Reversibility} \times \text{Historical\_Weight} \times \frac{1}{\text{Blast\_Radius}}$$

- **Auto-Execute Threshold ($\ge 0.70$):** Meridian executes the bounded recovery intervention autonomously.
- **Human Ops Escalation ($< 0.70$):** Meridian alerts Payment Ops with pre-computed simulations for 1-click confirmation.

---

## ✨ Key Features

- **⚡ Real-Time Razorpay Webhook Ingestion:** Listens to `payment.failed`, `order.paid`, and `subscription.halted` events with cryptographic **HMAC-SHA256** signature verification.
- **🎯 Dynamic ERR Ranking Stream:** Incidents dynamically re-order in real time so the highest recoverable ₹ value is always at Rank #1.
- **📊 Counterfactual Inspection Modal:** Side-by-side comparison of "Do Nothing" vs. candidate interventions with full mathematical breakdowns.
- **🤖 Ask Meridian AI Copilot (`⌘K` / `Ctrl+K`):** Global slide-over drawer powered by Google Gemini 1.5 Flash for live diagnostic queries.
- **🛡️ Tamper-Evident Terminal Audit Trail:** Immutable, cryptographically verifiable ledger logging every execution, timestamp, operator signature, and settlement delta.
- **🌌 Signature Transaction Pulse Field:** Interactive 60fps HTML5 2D canvas visualizing payment pulses with white bloom ripples upon recovery.
- **⚡ Sub-Second Performance:** Optimized font delivery and client hydration for instant paint on Vercel.

---

## 📂 Project Structure

```text
├── app/
│   ├── api/
│   │   ├── agent/
│   │   │   ├── chat/route.ts        # Gemini AI copilot conversation endpoint
│   │   │   ├── diagnose/route.ts    # Multivariate causal diagnostic engine
│   │   │   └── execute/route.ts     # Razorpay REST execution & settlement
│   │   ├── health/route.ts          # Liveness, readiness, & integration probe
│   │   ├── incidents/route.ts       # Server store incident queue API
│   │   ├── telemetry/ingest/route.ts# Switch & gateway telemetry ingestion
│   │   └── webhooks/razorpay/route.ts # HMAC-verified Razorpay webhook listener
│   ├── components/
│   │   ├── landing/                 # 7-Layer Architecture, Math, & Scope sections
│   │   ├── audit-trail.tsx          # Terminal ledger with verification hashes
│   │   ├── confidence-gauge.tsx     # Autonomy probability gauge
│   │   ├── demo-controls.tsx        # Chaos fault injection & simulation triggers
│   │   ├── footer.tsx               # Glassmorphic footer with author & social links
│   │   ├── header-hero.tsx          # War Room header & live revenue ticker
│   │   ├── incident-card.tsx        # ERR-ranked interactive incident card
│   │   ├── incident-detail-modal.tsx# Counterfactual math & policy modal
│   │   ├── navbar.tsx               # Sticky glassmorphic navigation
│   │   └── pulse-field.tsx          # Canvas payment stream animation
│   ├── dashboard/page.tsx           # Mission Control War Room
│   ├── layout.tsx                   # Global fonts & root metadata
│   ├── globals.css                  # Design tokens, OKLCH theme, glass styles
│   └── page.tsx                     # Enterprise Landing Page
├── DEPLOYMENT.md                    # Production deployment instructions
├── PRD.md                           # Complete Product Requirement Document
└── package.json                     # Dependencies & scripts
```

---

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Mathan-dotcom/Meridian.git
cd Meridian
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-flash-latest

# Razorpay Live Test Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Razorpay Webhook Secret (HMAC verification)
RAZORPAY_WEBHOOK_SECRET=meridian_secret_2026
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the landing page or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the War Room.

### 5. Verify Health & Integrations
```bash
curl http://localhost:3000/api/health
```

---

## 🔌 API Reference

| Endpoint | Method | Purpose | Auth / Verification |
| :--- | :---: | :--- | :--- |
| `/api/health` | `GET` | Observability probe & integration readiness | Public |
| `/api/webhooks/razorpay` | `POST` | Ingests real-time Razorpay payment events | HMAC-SHA256 (`x-razorpay-signature`) |
| `/api/telemetry/ingest` | `POST` | Payment switch telemetry stream ingestion | API Key / Token |
| `/api/incidents` | `GET` | Retrieve queued incidents & audit logs | Public / Internal |
| `/api/agent/diagnose` | `POST` | Generates causal diagnostics via Gemini AI | Internal Orchestrator |
| `/api/agent/execute` | `POST` | Triggers bounded intervention on Razorpay | Basic Auth (API Key & Secret) |
| `/api/agent/chat` | `POST` | Contextual AI copilot assistant | Gemini Session |

---

## 👨‍💻 Author & Attribution

**Mathan Kumaar A**  
- **GitHub:** [@Mathan-dotcom](https://github.com/Mathan-dotcom/Meridian)  
- **LinkedIn:** [Mathan Kumaar A](https://www.linkedin.com/in/mathan-kumaar-a-916aa42b7?utm_source=share_via&utm_content=profile&utm_medium=member_ios)  
- **Email:** [mathankumaar05@gmail.com](mailto:mathankumaar05@gmail.com)  

Built with passion for the **Razorpay AI Buildathon — Track 03: AI Revenue Recovery** (September 2026).

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
