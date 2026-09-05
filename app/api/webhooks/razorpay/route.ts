import { NextResponse } from "next/server";
import crypto from "crypto";
import { serverStore } from "@/app/lib/server-store";
import { calculateERR, calculateAutonomyScore } from "@/app/lib/err-engine";
import { Incident } from "@/app/lib/store";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 1. Cryptographic HMAC SHA-256 signature verification if secret is configured
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        return NextResponse.json(
          { success: false, error: "Invalid cryptographic signature" },
          { status: 401 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const subscriptionEntity = payload.payload?.subscription?.entity;

    // 2. Handle Payment Failure
    if (event === "payment.failed" && paymentEntity) {
      const paymentId = paymentEntity.id || `PAY-${Date.now()}`;
      const amountInRupees = (paymentEntity.amount || 500000) / 100; // Razorpay amounts are in paise
      const errorCode = paymentEntity.error_code || "BAD_REQUEST_ERROR";
      const errorDescription = paymentEntity.error_description || "Payment failed on acquiring switch";
      const method = (paymentEntity.method || "card").toUpperCase();
      const bank = paymentEntity.bank || "Partner Bank";

      const incidentId = `INC-${paymentId.slice(-4)}`;
      const potentialLoss = Math.max(100000, amountInRupees * 25); // Estimated cluster volume
      const probRecovery = 0.92;
      const expectedSuccess = 0.98;
      const cost = 3500;
      const errScore = calculateERR(potentialLoss, probRecovery, expectedSuccess, cost, 0);
      const autonomyFactors = calculateAutonomyScore(0.94, 0.95, 0.88, 1);

      const incident: Incident = {
        id: incidentId,
        title: `Live Razorpay ${method} Failure: ${bank} [${errorCode}]`,
        service: `Razorpay / ${bank} ${method} Rail`,
        type: method === "UPI" ? "gateway_degradation" : "gateway_degradation",
        depth: "deep",
        potentialLoss,
        err: errScore,
        confidence: 94,
        counterfactual: {
          observedSuccessRate: 68,
          estimatedRateWithoutAnomaly: 93,
          counterfactualGap: 25,
          telemetrySummary: `${errorDescription} on ${bank} rail`
        },
        candidateInterventions: [
          {
            id: `INT-${incidentId}-1`,
            name: `Autonomous fallback routing to Axis secondary acquiring rail`,
            probabilityOfRecovery: probRecovery,
            expectedSuccessRate: expectedSuccess,
            interventionCost: cost,
            riskPenalty: 0,
            errScore,
            description: `Reroutes failing ${method} volume via secondary direct bank pipe.`,
            isRecommended: true
          }
        ],
        autonomyFactors,
        evidence: [
          `Live Razorpay Webhook Event: payment.failed (${paymentId})`,
          `Error Code: ${errorCode} — ${errorDescription}`,
          `Acquirer Bank: ${bank} • Method: ${method} • Sample Amount: ₹${amountInRupees.toLocaleString("en-IN")}`
        ],
        intervention: `Autonomous fallback routing to Axis secondary acquiring rail`,
        autonomy: autonomyFactors.decision,
        state: "at-risk",
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        regionIndex: method === "UPI" ? 2 : 0
      };

      const updatedState = serverStore.addOrUpdateIncident(incident);
      return NextResponse.json({
        success: true,
        message: "Razorpay payment.failed webhook processed and ranked into Meridian ERR stream",
        incidentId: incident.id,
        errScore: incident.err,
        totalIncidents: updatedState.incidents.length
      });
    }

    // 3. Handle Subscription Halted
    if (event === "subscription.halted" && subscriptionEntity) {
      const subId = subscriptionEntity.id || `SUB-${Date.now()}`;
      const incidentId = `INC-${subId.slice(-4)}`;
      const potentialLoss = 280000;
      const probRecovery = 0.88;
      const expectedSuccess = 0.98;
      const errScore = calculateERR(potentialLoss, probRecovery, expectedSuccess, 0, 0);
      const autonomyFactors = calculateAutonomyScore(0.90, 0.90, 0.80, 1);

      const incident: Incident = {
        id: incidentId,
        title: `Razorpay Subscription Recurring Halted [${subId}]`,
        service: "Razorpay Subscriptions / Token Vault",
        type: "subscription_failure",
        depth: "shallow",
        potentialLoss,
        err: errScore,
        confidence: 90,
        counterfactual: {
          observedSuccessRate: 64,
          estimatedRateWithoutAnomaly: 92,
          counterfactualGap: 28,
          telemetrySummary: `Recurring charge halted for subscription ${subId}`
        },
        candidateInterventions: [
          {
            id: `INT-${incidentId}-1`,
            name: "Trigger synchronous Visa VTS cryptogram token cache refresh & automated retry",
            probabilityOfRecovery: probRecovery,
            expectedSuccessRate: expectedSuccess,
            interventionCost: 0,
            riskPenalty: 0,
            errScore,
            description: "Evicts expired card cryptograms and retries recurring charge.",
            isRecommended: true
          }
        ],
        autonomyFactors,
        evidence: [
          `Webhook event: subscription.halted for subscription ID: ${subId}`,
          `Plan: ${subscriptionEntity.plan_id || "Enterprise Recurring Plan"}`,
          `Token cryptogram expired before auth capture`
        ],
        intervention: "Trigger synchronous Visa VTS cryptogram token cache refresh & automated retry",
        autonomy: "AUTO",
        state: "at-risk",
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        regionIndex: 1
      };

      serverStore.addOrUpdateIncident(incident);
      return NextResponse.json({
        success: true,
        message: "Razorpay subscription.halted webhook processed into Meridian",
        incidentId: incident.id
      });
    }

    // 4. Fallback for other events
    return NextResponse.json({
      success: true,
      message: `Received webhook event: ${event || "ping"} (no incident triggered)`
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
