"use client";

import { useSyncExternalStore } from "react";
import { Incident, AuditLog, NodeStateMap, IncidentState } from "./store";
import { calculateERR, calculateAutonomyScore } from "./err-engine";

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: "INC-9042",
    title: "Subscription Recurring Mandate Timeout",
    service: "Razorpay Subscriptions / HDFC Gateway",
    type: "gateway_degradation",
    depth: "deep",
    potentialLoss: 410000,
    err: 365000,
    confidence: 94,
    counterfactual: {
      observedSuccessRate: 72,
      estimatedRateWithoutAnomaly: 89,
      counterfactualGap: 17,
      telemetrySummary: "HTTP 504 gateway timeout spike detected on HDFC primary node"
    },
    candidateInterventions: [
      {
        id: "INT-1",
        name: "Reroute mandate submission via Axis fallback rail with 3-step exponential window",
        probabilityOfRecovery: 0.92,
        expectedSuccessRate: 0.98,
        interventionCost: 4000,
        riskPenalty: 0,
        errScore: calculateERR(410000, 0.92, 0.98, 4000, 0),
        description: "Switches traffic from degraded HDFC primary node to Axis direct pipe with backoff window.",
        isRecommended: true
      },
      {
        id: "INT-2",
        name: "Batch retry via primary HDFC node after 15m delay",
        probabilityOfRecovery: 0.60,
        expectedSuccessRate: 0.85,
        interventionCost: 0,
        riskPenalty: 15000,
        errScore: calculateERR(410000, 0.60, 0.85, 0, 15000),
        description: "Standard retry attempt without rerouting. High risk of secondary timeout.",
        isRecommended: false
      }
    ],
    autonomyFactors: calculateAutonomyScore(0.94, 0.95, 0.85, 1),
    evidence: [
      "HTTP 504 gateway timeout spike on /v1/subscriptions/retry",
      "Failed 2FA mandate auth tokens detected across HDFC BIN range",
      "3,410 failed recurring mandates in last 42 minutes"
    ],
    intervention: "Reroute mandate submission via Axis fallback rail with 3-step exponential window",
    autonomy: "AUTO",
    state: "at-risk",
    timestamp: "14:28:12 UTC",
    regionIndex: 0
  },
  {
    id: "INC-9043",
    title: "UPI Autopay Auth Rate-Limit Degradation",
    service: "NPCI UPI Mandate Engine / ICICI",
    type: "gateway_degradation",
    depth: "deep",
    potentialLoss: 680000,
    err: 490000,
    confidence: 88,
    counterfactual: {
      observedSuccessRate: 68,
      estimatedRateWithoutAnomaly: 91,
      counterfactualGap: 23,
      telemetrySummary: "NPCI throttle code 92 on primary ICICI pool"
    },
    candidateInterventions: [
      {
        id: "INT-3",
        name: "Dynamically throttle request burst rate & switch to direct server-to-server NPCI pipe",
        probabilityOfRecovery: 0.85,
        expectedSuccessRate: 0.88,
        interventionCost: 10000,
        riskPenalty: 9000,
        errScore: calculateERR(680000, 0.85, 0.88, 10000, 9000),
        description: "Direct server-to-server NPCI mandate route with burst-smoothing filter.",
        isRecommended: true
      },
      {
        id: "INT-4",
        name: "Pause high-value mandate debits until window reset",
        probabilityOfRecovery: 0.35,
        expectedSuccessRate: 0.80,
        interventionCost: 0,
        riskPenalty: 10000,
        errScore: calculateERR(680000, 0.35, 0.80, 0, 10000),
        description: "Conservative hold pattern. Prevents bank penalty fees but delays cashflow.",
        isRecommended: false
      }
    ],
    autonomyFactors: calculateAutonomyScore(0.88, 0.60, 0.80, 8), // High blast radius (8) requiring approval
    evidence: [
      "NPCI error code 92: Mandate throttle limit reached on primary ICICI pool",
      "Average response latency increased from 140ms to 4,800ms",
      "1,890 high-value auto-debit transactions affected"
    ],
    intervention: "Dynamically throttle request burst rate and switch to direct server-to-server NPCI pipe",
    autonomy: "NEEDS APPROVAL",
    state: "at-risk",
    timestamp: "14:26:05 UTC",
    regionIndex: 1
  },
  {
    id: "INC-9044",
    title: "Card Gateway Token Expiry Cascade",
    service: "Stripe India / Visa Token Service",
    type: "subscription_failure",
    depth: "shallow",
    potentialLoss: 290000,
    err: 220000,
    confidence: 82,
    counterfactual: {
      observedSuccessRate: 78,
      estimatedRateWithoutAnomaly: 93,
      counterfactualGap: 15,
      telemetrySummary: "Cryptogram invalidation spike during maintenance window"
    },
    candidateInterventions: [
      {
        id: "INT-5",
        name: "Batch request fresh cryptograms via Visa VTS API before secondary billing attempt",
        probabilityOfRecovery: 0.88,
        expectedSuccessRate: 0.90,
        interventionCost: 2000,
        riskPenalty: 0,
        errScore: calculateERR(290000, 0.88, 0.90, 2000, 0),
        description: "Proactively repairs expired Visa token cryptograms before retrying authorization.",
        isRecommended: true
      }
    ],
    autonomyFactors: calculateAutonomyScore(0.82, 0.90, 0.85, 2),
    evidence: [
      "Invalid cryptogram rejection rate peaked at 18.4% on recurring checkout",
      "Token refresh cache invalidated during system maintenance window"
    ],
    intervention: "Batch request fresh cryptograms via Visa VTS API before secondary billing attempt",
    autonomy: "AUTO",
    state: "at-risk",
    timestamp: "14:21:40 UTC",
    regionIndex: 2
  },
  {
    id: "INC-9045",
    title: "High-Value Cart Abandonment Surge",
    service: "Razorpay Checkout Engine",
    type: "checkout_abandonment",
    depth: "architecture_only",
    potentialLoss: 380000,
    err: 195000,
    confidence: 78,
    counterfactual: {
      observedSuccessRate: 45,
      estimatedRateWithoutAnomaly: 68,
      counterfactualGap: 23,
      telemetrySummary: "Drop-off during 3DS OTP step on cart values > ₹25,000"
    },
    candidateInterventions: [
      {
        id: "INT-6",
        name: "Trigger WhatsApp 1-Click Instant Checkout re-engagement agent",
        probabilityOfRecovery: 0.55,
        expectedSuccessRate: 0.95,
        interventionCost: 1500,
        riskPenalty: 0,
        errScore: calculateERR(380000, 0.55, 0.95, 1500, 0),
        description: "Dispatches pre-filled WhatsApp checkout link with saved payment preference.",
        isRecommended: true
      }
    ],
    autonomyFactors: calculateAutonomyScore(0.78, 1.0, 0.80, 1),
    evidence: [
      "3DS OTP drop-off rate rose by 34% on high-ticket consumer checkout",
      "Normalized architecture event stream item (§6 & §10)"
    ],
    intervention: "Trigger WhatsApp 1-Click Instant Checkout re-engagement agent",
    autonomy: "AUTO",
    state: "at-risk",
    timestamp: "14:18:30 UTC",
    regionIndex: 3
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "LOG-1049",
    timestamp: "14:28:15 UTC",
    incidentId: "INC-9042",
    incidentTitle: "Subscription Recurring Mandate Timeout",
    evidence: "HTTP 504 spike detected on HDFC primary node",
    counterfactualGap: "+17pp (72% -> 89%)",
    errScore: 365000,
    confidence: 94,
    autonomyScore: 0.76,
    policyCheck: "PASSED — Autonomy 0.76 >= 0.50 (Auto-Execute Permitted)",
    outcome: "at-risk",
    amount: 410000
  },
  {
    id: "LOG-1048",
    timestamp: "14:20:00 UTC",
    incidentId: "INC-9039",
    incidentTitle: "International AMEX Recurring Token Drop",
    evidence: "3D Secure fallback triggered for 820 cardholders",
    counterfactualGap: "+12pp (81% -> 93%)",
    errScore: 410000,
    confidence: 96,
    autonomyScore: 0.82,
    policyCheck: "PASSED — AMEX Smart Retry Rules Engaged",
    outcome: "recovered",
    amount: 410000
  },
  {
    id: "LOG-1047",
    timestamp: "14:02:11 UTC",
    incidentId: "INC-9038",
    incidentTitle: "Paytm Wallet Auto-Recharge Auth Fail",
    evidence: "OAuth token mismatch detected during off-session charge",
    counterfactualGap: "+9pp (86% -> 95%)",
    errScore: 195000,
    confidence: 91,
    autonomyScore: 0.74,
    policyCheck: "PASSED — Soft Retry Window Active",
    outcome: "recovered",
    amount: 195000
  }
];

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  timestamp: string;
}

interface PulseState {
  incidents: Incident[];
  auditLogs: AuditLog[];
  totalRecoverableToday: number;
  totalRecoveredToday: number;
  autoPilot: boolean;
  activeActionId: string | null;
  selectedIncidentId: string | null;
  demoStep: number; // 1 to 6 (Guided 5-minute PRD demo stepper)
  nodeStates: NodeStateMap;
  liveAiDiagnosis: Record<string, any>;
  diagnosingIncidentId: string | null;
  toast: ToastNotification | null;
}

let state: PulseState = {
  incidents: INITIAL_INCIDENTS,
  auditLogs: INITIAL_AUDIT_LOGS,
  totalRecoverableToday: 1760000,
  totalRecoveredToday: 605000,
  autoPilot: false,
  activeActionId: null,
  selectedIncidentId: null,
  demoStep: 1,
  nodeStates: { 0: "at-risk", 1: "at-risk", 2: "at-risk", 3: "at-risk" },
  liveAiDiagnosis: {},
  diagnosingIncidentId: null,
  toast: null
};

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

let autoPilotTimer: any = null;

function runAutoPilotCycle() {
  if (!state.autoPilot) return;

  // Find unrecovered incidents
  const atRiskIncidents = state.incidents.filter((i) => i.state === "at-risk");
  if (atRiskIncidents.length === 0) {
    pulseStore.injectFault("random");
    return;
  }

  // Take the top ERR ranked incident
  const topInc = atRiskIncidents[0];

  // 1. Run live Gemini diagnosis if not yet diagnosed
  if (!state.liveAiDiagnosis[topInc.id] && !state.diagnosingIncidentId) {
    pulseStore.runLiveGeminiDiagnosis(topInc.id);
  }

  // 2. Check autonomy safety bounds
  if (topInc.autonomy === "AUTO" || topInc.autonomyFactors.calculatedScore >= 0.50) {
    pulseStore.showToast(
      "⚡ Autonomous Intervention Fired",
      `Meridian Agent auto-executing recovery for ${topInc.title}`,
      "info"
    );

    setTimeout(() => {
      if (!state.autoPilot) return;
      pulseStore.executeRecovery(topInc.id);
      pulseStore.showToast(
        "✓ Autonomous Recovery Verified",
        `Protected ₹${(topInc.potentialLoss / 100000).toFixed(1)}L on ${topInc.service}. Audit hash sealed.`,
        "success"
      );
    }, 1200);
  } else {
    // High blast radius -> hold for human approval
    pulseStore.showToast(
      "⚠️ Human Authorization Gate",
      `${topInc.title} has blast radius Level ${topInc.autonomyFactors.blastRadius}/10. Escalated for operator sign-off.`,
      "warning"
    );
  }
}

export const pulseStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return state;
  },

  showToast(title: string, message: string, type: "success" | "warning" | "info" = "info") {
    state = {
      ...state,
      toast: {
        id: `toast-${Date.now()}`,
        title,
        message,
        type,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      }
    };
    emitChange();
  },

  dismissToast() {
    state = { ...state, toast: null };
    emitChange();
  },

  selectIncident(id: string | null) {
    state = { ...state, selectedIncidentId: id };
    emitChange();
  },

  setDemoStep(step: number) {
    state = { ...state, demoStep: Math.max(1, Math.min(6, step)) };
    emitChange();
  },

  executeRecovery(id: string) {
    const inc = state.incidents.find((i) => i.id === id);
    if (!inc || inc.state === "recovered") return;

    state = {
      ...state,
      activeActionId: id,
      incidents: state.incidents.map((i) =>
        i.id === id ? { ...i, state: "recovering" as IncidentState, lastActionAt: Date.now() } : i
      )
    };
    emitChange();

    setTimeout(() => {
      const updatedIncidents = state.incidents
        .map((i) =>
          i.id === id
            ? { ...i, state: "recovered" as IncidentState, err: 0, lastActionAt: Date.now() }
            : i
        )
        .sort((a, b) => {
          if (a.state === "recovered" && b.state !== "recovered") return 1;
          if (a.state !== "recovered" && b.state === "recovered") return -1;
          return b.err - a.err;
        });

      const recoveredInc = state.incidents.find((i) => i.id === id);
      const recoveredAmount = recoveredInc ? recoveredInc.potentialLoss : 0;

      const newLog: AuditLog = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        incidentId: id,
        incidentTitle: inc.title,
        evidence: inc.evidence[0],
        counterfactualGap: `+${inc.counterfactual.counterfactualGap}pp (${inc.counterfactual.observedSuccessRate}% -> ${inc.counterfactual.estimatedRateWithoutAnomaly}%)`,
        errScore: inc.err,
        confidence: inc.confidence,
        autonomyScore: inc.autonomyFactors.calculatedScore,
        policyCheck: `VERIFIED — Recovery execution validated & bank receipt confirmed. Autonomy ${inc.autonomyFactors.calculatedScore}`,
        outcome: "recovered",
        amount: recoveredAmount
      };

      const newNodeStates = { ...state.nodeStates, [inc.regionIndex]: "recovered" as const };

      state = {
        ...state,
        activeActionId: null,
        incidents: updatedIncidents,
        auditLogs: [newLog, ...state.auditLogs],
        totalRecoveredToday: state.totalRecoveredToday + recoveredAmount,
        totalRecoverableToday: Math.max(0, state.totalRecoverableToday - recoveredAmount),
        nodeStates: newNodeStates
      };
      emitChange();
    }, 600);
  },

  triggerFailure(id: string) {
    const inc = state.incidents.find((i) => i.id === id);
    if (!inc) return;

    state = {
      ...state,
      activeActionId: id,
      incidents: state.incidents.map((i) =>
        i.id === id
          ? {
              ...i,
              state: "failed" as IncidentState,
              failureReason: "Circuit breaker tripped: Policy rule violation during secondary route attempt",
              lastActionAt: Date.now()
            }
          : i
      )
    };
    emitChange();

    setTimeout(() => {
      const newLog: AuditLog = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        incidentId: id,
        incidentTitle: inc.title,
        evidence: "Intervention breached max bank retry threshold (Rule #4)",
        counterfactualGap: "+0pp (Rollback triggered)",
        errScore: 0,
        confidence: inc.confidence,
        autonomyScore: 0.12,
        policyCheck: "ROLLED BACK — Autonomous circuit breaker flinched and reverted route safely.",
        outcome: "failed",
        amount: 0
      };

      const newNodeStates: NodeStateMap = { ...state.nodeStates, [inc.regionIndex]: "critical" };

      state = {
        ...state,
        activeActionId: null,
        auditLogs: [newLog, ...state.auditLogs],
        nodeStates: newNodeStates
      };
      emitChange();
    }, 350);
  },

  injectFault(type: "hdfc" | "visa" | "npci" | "random" = "random") {
    const selectedType = type === "random"
      ? (["hdfc", "visa", "npci"][Math.floor(Math.random() * 3)] as "hdfc" | "visa" | "npci")
      : type;

    const randomId = `INC-${Math.floor(9100 + Math.random() * 899)}`;
    let newInc: Incident;

    if (selectedType === "hdfc") {
      newInc = {
        id: randomId,
        title: "HDFC NetBanking Core Switch 504 Gateway Timeout",
        service: "HDFC Payment Gateway / Corporate NetBanking",
        type: "gateway_degradation",
        depth: "deep",
        potentialLoss: 580000,
        err: 495000,
        confidence: 95,
        counterfactual: {
          observedSuccessRate: 66,
          estimatedRateWithoutAnomaly: 94,
          counterfactualGap: 28,
          telemetrySummary: "TCP window zero-advertisement and 504 gateway timeouts on primary HDFC netbanking pool"
        },
        candidateInterventions: [
          {
            id: "INT-HDFC-1",
            name: "Hot-swap routing to Axis NetBanking secondary direct pipe",
            probabilityOfRecovery: 0.94,
            expectedSuccessRate: 0.97,
            interventionCost: 4500,
            riskPenalty: 0,
            errScore: calculateERR(580000, 0.94, 0.97, 4500, 0),
            description: "Direct reroute of pending corporate checkouts via secondary bank switch with exponential backoff.",
            isRecommended: true
          }
        ],
        autonomyFactors: calculateAutonomyScore(0.95, 0.95, 0.90, 1),
        evidence: [
          "HTTP 504 gateway timeout on /v1/payments/netbanking",
          "Average gateway latency surged from 180ms to 6,200ms",
          "Merchant checkout drop-off rate +34% across high-AOV carts"
        ],
        intervention: "Hot-swap routing to Axis NetBanking secondary direct pipe",
        autonomy: "AUTO",
        state: "at-risk",
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        regionIndex: 0
      };
    } else if (selectedType === "visa") {
      newInc = {
        id: randomId,
        title: "Visa Token Service (VTS) Cryptogram Invalidation Surge",
        service: "Visa Direct / CyberSource Token Vault",
        type: "subscription_failure",
        depth: "deep",
        potentialLoss: 340000,
        err: 290000,
        confidence: 91,
        counterfactual: {
          observedSuccessRate: 75,
          estimatedRateWithoutAnomaly: 93,
          counterfactualGap: 18,
          telemetrySummary: "Cryptogram expiration rejection spike (VTS-400) during recurring card subscription cycle"
        },
        candidateInterventions: [
          {
            id: "INT-VISA-1",
            name: "Trigger bulk cryptogram re-synchronization via Visa VTS REST API",
            probabilityOfRecovery: 0.90,
            expectedSuccessRate: 0.95,
            interventionCost: 3000,
            riskPenalty: 0,
            errScore: calculateERR(340000, 0.90, 0.95, 3000, 0),
            description: "Proactively requests refreshed cryptograms before executing secondary recurring auth.",
            isRecommended: true
          }
        ],
        autonomyFactors: calculateAutonomyScore(0.91, 0.90, 0.88, 2),
        evidence: [
          "Visa token authorization error VTS-400 invalid cryptogram",
          "Recurring billing checkout failure rate peaked at 25%",
          "1,450 subscription accounts impacted"
        ],
        intervention: "Trigger bulk cryptogram re-synchronization via Visa VTS REST API",
        autonomy: "AUTO",
        state: "at-risk",
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        regionIndex: 2
      };
    } else {
      newInc = {
        id: randomId,
        title: "NPCI UPI Mandate Queue Throttle Spike",
        service: "NPCI Common Switch / ICICI UPI Pool",
        type: "gateway_degradation",
        depth: "deep",
        potentialLoss: 780000,
        err: 580000,
        confidence: 87,
        counterfactual: {
          observedSuccessRate: 61,
          estimatedRateWithoutAnomaly: 92,
          counterfactualGap: 31,
          telemetrySummary: "NPCI code 92 throttle limit breached on primary mandate auto-debit batch"
        },
        candidateInterventions: [
          {
            id: "INT-NPCI-1",
            name: "Switch to dedicated high-frequency server-to-server NPCI pipe with burst smoothing",
            probabilityOfRecovery: 0.86,
            expectedSuccessRate: 0.90,
            interventionCost: 12000,
            riskPenalty: 10000,
            errScore: calculateERR(780000, 0.86, 0.90, 12000, 10000),
            description: "Applies burst smoothing rate-limiter and splits load across secondary bank pools.",
            isRecommended: true
          }
        ],
        autonomyFactors: calculateAutonomyScore(0.87, 0.60, 0.80, 8),
        evidence: [
          "NPCI error code 92: Mandate throttle limit reached on primary pool",
          "Mandate queue backlog reached 4,200 pending transactions",
          "Blast radius covers multi-bank recurring debit stream"
        ],
        intervention: "Switch to dedicated high-frequency server-to-server NPCI pipe with burst smoothing",
        autonomy: "NEEDS APPROVAL",
        state: "at-risk",
        timestamp: new Date().toISOString().substring(11, 19) + " UTC",
        regionIndex: 1
      };
    }

    const newIncidents = [newInc, ...state.incidents].sort((a, b) => {
      if (a.state === "recovered" && b.state !== "recovered") return 1;
      if (a.state !== "recovered" && b.state === "recovered") return -1;
      return b.err - a.err;
    });

    const newLog: AuditLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: newInc.timestamp,
      incidentId: newInc.id,
      incidentTitle: newInc.title,
      evidence: newInc.evidence[0],
      counterfactualGap: `+${newInc.counterfactual.counterfactualGap}pp (${newInc.counterfactual.observedSuccessRate}% -> ${newInc.counterfactual.estimatedRateWithoutAnomaly}%)`,
      errScore: newInc.err,
      confidence: newInc.confidence,
      autonomyScore: newInc.autonomyFactors.calculatedScore,
      policyCheck: "DETECTED — Ingested into ERR Orchestrator Engine",
      outcome: "at-risk",
      amount: newInc.potentialLoss
    };

    state = {
      ...state,
      incidents: newIncidents,
      auditLogs: [newLog, ...state.auditLogs],
      totalRecoverableToday: state.totalRecoverableToday + newInc.potentialLoss,
      nodeStates: { ...state.nodeStates, [newInc.regionIndex]: "at-risk" }
    };
    emitChange();

    pulseStore.showToast(
      "🚨 Telemetry Fault Ingested",
      `${newInc.title} — ERR: ₹${(newInc.err / 100000).toFixed(1)}L (${newInc.autonomy})`,
      "warning"
    );
  },

  injectNewIncident() {
    pulseStore.injectFault("random");
  },

  toggleAutoPilot() {
    const nextState = !state.autoPilot;
    state = { ...state, autoPilot: nextState };
    emitChange();

    if (autoPilotTimer) {
      clearInterval(autoPilotTimer);
      autoPilotTimer = null;
    }

    if (nextState) {
      pulseStore.showToast(
        "🤖 Meridian Autopilot Active",
        "Autonomous agent is continuously scanning telemetry, querying Gemini, and executing bounded actions.",
        "success"
      );
      runAutoPilotCycle();
      autoPilotTimer = setInterval(runAutoPilotCycle, 7000);
    } else {
      pulseStore.showToast(
        "⏸️ Autopilot Paused",
        "Orchestrator returned to manual operator supervision mode.",
        "info"
      );
    }
  },

  resetDemoState() {
    if (autoPilotTimer) {
      clearInterval(autoPilotTimer);
      autoPilotTimer = null;
    }

    state = {
      incidents: INITIAL_INCIDENTS,
      auditLogs: INITIAL_AUDIT_LOGS,
      totalRecoverableToday: 1760000,
      totalRecoveredToday: 605000,
      autoPilot: false,
      activeActionId: null,
      selectedIncidentId: null,
      demoStep: 1,
      nodeStates: { 0: "at-risk", 1: "at-risk", 2: "at-risk", 3: "at-risk" },
      liveAiDiagnosis: {},
      diagnosingIncidentId: null,
      toast: null
    };
    emitChange();
    pulseStore.showToast("🔄 Demo State Reset", "All incidents and telemetry restored to baseline.", "info");
  },

  async runLiveGeminiDiagnosis(incidentId: string) {
    const incident = state.incidents.find((i) => i.id === incidentId);
    if (!incident) return;

    state = { ...state, diagnosingIncidentId: incidentId };
    emitChange();

    try {
      const res = await fetch("/api/agent/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentId: incident.id,
          title: incident.title,
          category: incident.type,
          service: incident.service,
          errorCodes: incident.evidence,
          failureRate: incident.counterfactual ? (100 - incident.counterfactual.observedSuccessRate) : 25,
          potentialLoss: incident.potentialLoss,
          candidateInterventions: incident.candidateInterventions,
          telemetry: {
            evidence: incident.evidence,
            counterfactual: incident.counterfactual,
            service: incident.service
          }
        })
      });

      const result = await res.json();
      if (result.success) {
        state = {
          ...state,
          diagnosingIncidentId: null,
          liveAiDiagnosis: {
            ...state.liveAiDiagnosis,
            [incidentId]: result.data
          }
        };
        emitChange();
      } else {
        state = { ...state, diagnosingIncidentId: null };
        emitChange();
      }
    } catch {
      state = { ...state, diagnosingIncidentId: null };
      emitChange();
    }
  }
};

export function usePulseStore() {
  const storeState = useSyncExternalStore(pulseStore.subscribe, pulseStore.getSnapshot, pulseStore.getSnapshot);
  return {
    ...storeState,
    selectIncident: pulseStore.selectIncident,
    setDemoStep: pulseStore.setDemoStep,
    executeRecovery: pulseStore.executeRecovery,
    triggerFailure: pulseStore.triggerFailure,
    injectNewIncident: pulseStore.injectNewIncident,
    injectFault: pulseStore.injectFault,
    toggleAutoPilot: pulseStore.toggleAutoPilot,
    resetDemoState: pulseStore.resetDemoState,
    runLiveGeminiDiagnosis: pulseStore.runLiveGeminiDiagnosis,
    showToast: pulseStore.showToast,
    dismissToast: pulseStore.dismissToast
  };
}

