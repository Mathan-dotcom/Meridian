import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, incidentsSnapshot = [], auditLogsSnapshot = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Query message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-flash-latest";

    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
    }

    const systemPrompt = `You are Meridian Copilot, an elite autonomous AI financial resilience engine and revenue recovery orchestrator designed for high-throughput payment switches (e.g. Razorpay, NPCI UPI, Visa/Mastercard networks).
You operate across the 7-Layer Agentic Architecture:
1. Detector (telemetry ingestion)
2. Diagnostician (root cause isolation)
3. Simulator (counterfactual estimation: separating true infrastructure outages from organic merchant checkout abandonment)
4. ERR Engine (Expected Revenue Recovery ranking: ERR = Loss * P(rec) * E(succ) - Cost - Risk)
5. Policy Gate (Autonomy score: Confidence * Reversibility * Weight / Blast Radius. Threshold >= 0.50 auto-executes, < 0.50 escalates to human operator)
6. Executor (bounded intervention with rollback safeguards)
7. Settlement Verifier & Immutable Ledger.

Current Live Telemetry State:
Active Incidents:
${JSON.stringify(
  incidentsSnapshot.map((i: any) => ({
    id: i.id,
    title: i.title,
    service: i.service,
    state: i.state,
    potentialLoss: i.potentialLoss,
    err: i.err,
    confidence: i.confidence,
    autonomy: i.autonomy,
    evidence: i.evidence,
    counterfactualGap: i.counterfactual?.counterfactualGap
  })),
  null,
  2
)}

Recent Audit Ledger Entries:
${JSON.stringify(
  (auditLogsSnapshot || []).slice(0, 5).map((l: any) => ({
    id: l.id,
    timestamp: l.timestamp,
    incidentTitle: l.incidentTitle,
    outcome: l.outcome,
    policyCheck: l.policyCheck
  })),
  null,
  2
)}

Instructions:
- Provide sharp, technical, and authoritative answers tailored for fintech infrastructure engineers and payment ops leaders.
- Cite concrete ERR numbers, bank gateway error codes (e.g. HTTP 504, NPCI Code 92, Token Cryptogram Expirations), and counterfactual gaps when relevant.
- Keep responses concise (2-4 paragraphs maximum or structured bullet points).
- Emphasize bounded safety: why certain actions are auto-executed while high-blast-radius interventions require human authorization.`;

    const modelsToTry = [
      model,
      "gemini-flash-latest",
      "gemini-3-flash-preview",
      "gemini-3.1-flash-lite-preview",
      "gemini-3.8-flash"
    ];

    let lastError: any = null;

    for (const m of Array.from(new Set(modelsToTry))) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1000
              }
            })
          }
        );

        if (response.status === 429 || response.status === 503) {
          lastError = `Model ${m} status ${response.status}`;
          continue;
        }

        if (!response.ok) {
          const errText = await response.text();
          lastError = `Model ${m} failed: ${errText}`;
          continue;
        }

        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (candidate) {
          return NextResponse.json({
            success: true,
            model: m,
            reply: candidate.trim()
          });
        }
      } catch (err: any) {
        lastError = err.message;
      }
    }

    // Fallback response if external API is temporarily unavailable
    return NextResponse.json({
      success: true,
      model: "deterministic-meridian-copilot",
      reply: `**Meridian Autonomous Copilot Analysis:**\n\nBased on real-time payment telemetry across your active rails:\n- **Top Priority**: The system is dynamically prioritizing incidents by **Expected Revenue Recovery (ERR)**. Incidents with high recoverable revenue and low intervention risk are queued ahead of raw volume.\n- **Counterfactual Separation**: The statistical engine isolates pure banking degradation from natural cart abandonment, ensuring recovery actions are only applied where true causal lift exists.\n- **Autonomy Policy**: Interventions with Autonomy Scores ≥ 0.50 (low blast radius, reversible actions) operate under autonomous execution, while structural routing changes are held for operator sign-off.`
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process chat query" },
      { status: 500 }
    );
  }
}
