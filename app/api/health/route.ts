import { NextResponse } from "next/server";
import { serverStore } from "@/app/lib/server-store";

export async function GET() {
  try {
    const hasGemini = Boolean(process.env.GEMINI_API_KEY);
    const hasRazorpayKeys = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
    const hasWebhookSecret = Boolean(process.env.RAZORPAY_WEBHOOK_SECRET);

    const storeState = serverStore.getState();
    const activeIncidents = storeState.incidents.filter((i) => i.state !== "recovered").length;

    return NextResponse.json({
      status: "healthy",
      service: "Meridian Revenue Recovery Orchestrator",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || "development",
      integrations: {
        geminiAi: {
          configured: hasGemini,
          model: process.env.GEMINI_MODEL || "gemini-flash-latest",
          status: hasGemini ? "operational" : "unconfigured_using_synthetic_reasoning"
        },
        razorpay: {
          apiConfigured: hasRazorpayKeys,
          webhookConfigured: hasWebhookSecret,
          mode: hasRazorpayKeys ? "live_gateway_integration" : "simulation_fallback"
        }
      },
      pipelineMetrics: {
        activeIncidentsQueued: activeIncidents,
        totalRecoverableRupees: storeState.totalRecoverableToday,
        totalRecoveredRupees: storeState.totalRecoveredToday,
        auditLogsRecorded: storeState.auditLogs.length
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "unhealthy", error: err.message },
      { status: 500 }
    );
  }
}
