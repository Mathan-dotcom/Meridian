import { NextResponse } from "next/server";
import { serverStore } from "@/app/lib/server-store";
import { calculateERR, calculateAutonomyScore } from "@/app/lib/err-engine";
import { Incident } from "@/app/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      service = "Payment Gateway Rail",
      eventType = "gateway_error",
      failureRate = 25,
      lossAmount = 350000,
      latencyMs = 4500,
      errorCode = "HTTP_504_TIMEOUT",
      evidence = [],
      metadata = {}
    } = body;

    const id = `INC-${Math.floor(9200 + Math.random() * 799)}`;
    const baselineRate = 94; // Baseline expected success rate
    const observedSuccessRate = Math.max(10, Math.min(95, 100 - Number(failureRate)));
    const counterfactualGap = Math.max(1, baselineRate - observedSuccessRate);

    // Formulate 2 realistic candidate interventions
    const probRecovery1 = 0.92;
    const expectedSuccess1 = 0.98;
    const cost1 = 4000;
    const errScore1 = calculateERR(Number(lossAmount), probRecovery1, expectedSuccess1, cost1, 0);

    const probRecovery2 = 0.60;
    const expectedSuccess2 = 0.85;
    const cost2 = 0;
    const riskPenalty2 = 12000;
    const errScore2 = calculateERR(Number(lossAmount), probRecovery2, expectedSuccess2, cost2, riskPenalty2);

    const autonomyFactors = calculateAutonomyScore(0.92, 0.95, 0.85, 1);

    const incident: Incident = {
      id,
      title: `${service} Telemetry Anomaly [${errorCode}]`,
      service,
      type: eventType === "token_invalidation" ? "subscription_failure" : "gateway_degradation",
      depth: "deep",
      potentialLoss: Number(lossAmount),
      err: errScore1,
      confidence: 92,
      counterfactual: {
        observedSuccessRate,
        estimatedRateWithoutAnomaly: baselineRate,
        counterfactualGap,
        telemetrySummary: `${errorCode} detected on ${service} with latency ${latencyMs}ms`
      },
      candidateInterventions: [
        {
          id: `INT-${id}-1`,
          name: `Reroute ${service} traffic via secondary direct rail with exponential backoff`,
          probabilityOfRecovery: probRecovery1,
          expectedSuccessRate: expectedSuccess1,
          interventionCost: cost1,
          riskPenalty: 0,
          errScore: errScore1,
          description: `Switches incoming checkout traffic to secondary high-availability pipe.`,
          isRecommended: true
        },
        {
          id: `INT-${id}-2`,
          name: `In-place retry on ${service} after 15m delay window`,
          probabilityOfRecovery: probRecovery2,
          expectedSuccessRate: expectedSuccess2,
          interventionCost: cost2,
          riskPenalty: riskPenalty2,
          errScore: errScore2,
          description: `Standard in-place retry. High risk of secondary timeout cascades.`,
          isRecommended: false
        }
      ],
      autonomyFactors,
      evidence: [
        `${errorCode} latency elevated to ${latencyMs}ms on ${service}`,
        `Observed success rate dropped to ${observedSuccessRate}% (down ${counterfactualGap}pp from baseline)`,
        ...(Array.isArray(evidence) && evidence.length > 0 ? evidence : [`Telemetry payload ingested at ${new Date().toISOString()}`])
      ],
      intervention: `Reroute ${service} traffic via secondary direct rail with exponential backoff`,
      autonomy: autonomyFactors.decision,
      state: "at-risk",
      timestamp: new Date().toISOString().substring(11, 19) + " UTC",
      regionIndex: Math.floor(Math.random() * 4)
    };

    const updatedState = serverStore.addOrUpdateIncident(incident);
    const rankedPosition = updatedState.incidents.findIndex((i) => i.id === incident.id) + 1;

    return NextResponse.json({
      success: true,
      message: "Telemetry event ingested into Meridian real-time decision stream",
      data: {
        incidentId: incident.id,
        rankedPosition,
        errScore: incident.err,
        counterfactualGap: `+${incident.counterfactual.counterfactualGap}pp`,
        autonomyDecision: incident.autonomy,
        incident
      }
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
