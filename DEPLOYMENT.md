# Meridian — Production Deployment & Operations Guide

This guide covers deploying **Project Meridian** into production, connecting live Razorpay webhooks, sending external payment telemetry, and managing the autonomous revenue recovery engine.

---

## 1. Quick Start: Deploying on Vercel

1. Push your repository to GitHub: `git push origin main`.
2. Open your [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import the `Meridian` repository.
4. Framework Preset: **Next.js** (detected automatically).
5. Add the Environment Variables (see Section 2 below).
6. Click **Deploy**.

---

## 2. Environment Variables Configuration

Configure the following variables in your Vercel Project Settings or local `.env.local`:

| Variable | Required | Description | Example / Default |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | **Recommended** | Google AI Gemini API Key for autonomous diagnostics and copilot reasoning. | `AIzaSy...` |
| `GEMINI_MODEL` | Optional | Target Gemini model identifier. | `gemini-1.5-flash` or `gemini-2.0-flash` |
| `RAZORPAY_KEY_ID` | Optional | Razorpay Merchant Key ID for live REST API verification. | `rzp_live_...` or `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Optional | Razorpay Merchant Key Secret for authenticated REST queries. | `your_key_secret` |
| `RAZORPAY_WEBHOOK_SECRET` | Optional | Secret key for verifying cryptographic `X-Razorpay-Signature` HMAC SHA-256. | `webhook_secret_key` |

> [!NOTE]
> **Dual-Mode Operation**: If live Razorpay keys are omitted, Meridian seamlessly operates in **Enterprise Simulation Mode**, handling synthetic telemetry, chaos fault injection, and Gemini reasoning without crashing or failing API calls.

---

## 3. Configuring Live Razorpay Webhooks

To forward live payment failures and subscription events to Meridian:

1. Log into your [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Navigate to **Settings** $\rightarrow$ **Webhooks**.
3. Click **Add New Webhook**.
4. Set the **Webhook URL**:
   ```
   https://<your-vercel-domain>.vercel.app/api/webhooks/razorpay
   ```
5. Enter a **Secret** and copy it into your `RAZORPAY_WEBHOOK_SECRET` environment variable.
6. Check the following events to subscribe:
   - `payment.failed` *(Real-time payment gateway degradation)*
   - `subscription.halted` *(Recurring card cryptogram expiration)*
   - `payment.authorized` *(Verification & settlement)*
   - `order.paid` *(Closed-loop reconciliation)*
7. Click **Save**.

---

## 4. Ingesting Real-Time External Telemetry via REST API

Meridian exposes a public REST endpoint (`/api/telemetry/ingest`) for payment microservices, backend switches, and Kafka consumers to push live telemetry.

### Sample Ingestion Request (`curl`):

```bash
curl -X POST https://<your-domain>/api/telemetry/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "service": "HDFC Corporate NetBanking Switch",
    "eventType": "gateway_error",
    "failureRate": 38,
    "lossAmount": 520000,
    "latencyMs": 5800,
    "errorCode": "HTTP_504_GATEWAY_TIMEOUT",
    "evidence": [
      "P99 TCP latency exceeded 5,800ms on HDFC primary node",
      "TCP RST packets received on /v1/payments/netbanking",
      "Cart dropout spiked +34% across merchant checkouts"
    ]
  }'
```

### Sample Response:
```json
{
  "success": true,
  "message": "Telemetry event ingested into Meridian real-time decision stream",
  "data": {
    "incidentId": "INC-9521",
    "rankedPosition": 1,
    "errScore": 469760,
    "counterfactualGap": "+32pp",
    "autonomyDecision": "AUTO"
  }
}
```

---

## 5. System Health Check & Observability

You can monitor uptime, AI engine readiness, and active pipeline metrics by querying:

```bash
curl https://<your-domain>/api/health
```

### Response Schema:
```json
{
  "status": "healthy",
  "service": "Meridian Revenue Recovery Orchestrator",
  "version": "1.0.0",
  "uptimeSeconds": 1420,
  "environment": "production",
  "integrations": {
    "geminiAi": {
      "configured": true,
      "model": "gemini-1.5-flash",
      "status": "operational"
    },
    "razorpay": {
      "apiConfigured": true,
      "webhookConfigured": true,
      "mode": "live_gateway_integration"
    }
  },
  "pipelineMetrics": {
    "activeIncidentsQueued": 3,
    "totalRecoverableRupees": 1310000,
    "totalRecoveredRupees": 410000,
    "auditLogsRecorded": 8
  }
}
```

---

## 6. Security & Hardening Checklist

- [x] **HTTP Headers**: Enforced `nosniff`, `DENY` framing, and strict referrer policies in `next.config.mjs`.
- [x] **HMAC SHA-256 Webhook Verification**: Cryptographic validation on incoming Razorpay webhooks.
- [x] **Client-Safe Secrets**: Server secrets (`GEMINI_API_KEY`, `RAZORPAY_KEY_SECRET`) are never exposed to browser client bundles.
- [x] **Thread-Safe Persistence**: Server-side storage adapter with read-only edge environment safety.
- [x] **Bounded Interventions**: Safety autonomy score gate prevents unmonitored blast radius expansion.
