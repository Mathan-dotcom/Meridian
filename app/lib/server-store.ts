import fs from "fs";
import path from "path";
import { Incident, AuditLog, NodeStateMap } from "./store";
import { calculateERR, calculateAutonomyScore } from "./err-engine";

export interface ServerStoreState {
  incidents: Incident[];
  auditLogs: AuditLog[];
  totalRecoverableToday: number;
  totalRecoveredToday: number;
  autoPilot: boolean;
  nodeStates: NodeStateMap;
}

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
    title: "Visa Token Cryptogram Cache Invalidation Spike",
    service: "Razorpay Card Tokenization / Visa VTS",
    type: "subscription_failure",
    depth: "shallow",
    potentialLoss: 280000,
    err: 241000,
    confidence: 91,
    counterfactual: {
      observedSuccessRate: 64,
      estimatedRateWithoutAnomaly: 92,
      counterfactualGap: 28,
      telemetrySummary: "Recurring cryptogram token rejected with error 400 Bad Cryptogram"
    },
    candidateInterventions: [
      {
        id: "INT-VTS-1",
        name: "Evict degraded token cache and issue synchronous VTS cryptogram refresh",
        probabilityOfRecovery: 0.88,
        expectedSuccessRate: 0.98,
        interventionCost: 0,
        riskPenalty: 0,
        errScore: calculateERR(280000, 0.88, 0.98, 0, 0),
        description: "Synchronous cryptogram regeneration against Visa direct token server.",
        isRecommended: true
      }
    ],
    autonomyFactors: calculateAutonomyScore(0.91, 0.90, 0.80, 1),
    evidence: [
      "Error code: 400 Bad Cryptogram on tokenized card recurring charges",
      "1,840 card transactions failed in 25-minute window",
      "Affected BIN range: 4111xx, 4222xx (Visa Classic & Gold)"
    ],
    intervention: "Evict degraded token cache and issue synchronous VTS cryptogram refresh",
    autonomy: "AUTO",
    state: "at-risk",
    timestamp: "14:31:05 UTC",
    regionIndex: 1
  },
  {
    id: "INC-9044",
    title: "NPCI UPI Volume Degraded on Primary Switch",
    service: "Razorpay UPI Gateway / NPCI Core",
    type: "gateway_degradation",
    depth: "deep",
    potentialLoss: 620000,
    err: 512000,
    confidence: 88,
    counterfactual: {
      observedSuccessRate: 58,
      estimatedRateWithoutAnomaly: 95,
      counterfactualGap: 37,
      telemetrySummary: "P99 latency surged to 8,400ms on NPCI UPI switch"
    },
    candidateInterventions: [
      {
        id: "INT-UPI-1",
        name: "Dynamic load-balancing split across secondary PSP gateways with 60/40 ratio",
        probabilityOfRecovery: 0.85,
        expectedSuccessRate: 0.98,
        interventionCost: 5000,
        riskPenalty: 0,
        errScore: calculateERR(620000, 0.85, 0.98, 5000, 0),
        description: "Splits peak UPI volume across ICICI and SBI direct payment service pipes.",
        isRecommended: true
      }
    ],
    autonomyFactors: calculateAutonomyScore(0.88, 0.92, 0.82, 1),
    evidence: [
      "NPCI gateway response latency elevated > 8.4 seconds",
      "UPI collect intent callbacks timing out before user authorization",
      "Estimated ₹6.2 Lakh volume at risk across tier-1 e-commerce merchants"
    ],
    intervention: "Dynamic load-balancing split across secondary PSP gateways with 60/40 ratio",
    autonomy: "AUTO",
    state: "at-risk",
    timestamp: "14:34:40 UTC",
    regionIndex: 2
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "LOG-1049",
    timestamp: "14:28:12 UTC",
    incidentId: "INC-9042",
    incidentTitle: "Subscription Recurring Mandate Timeout",
    evidence: "HTTP 504 gateway timeout spike on /v1/subscriptions/retry",
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
  }
];

// Persistent File Path resolution (support Vercel /tmp or local project data folder)
function getStoreFilePath(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "meridian_store.json");
  }
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // Fallback
    }
  }
  return path.join(dataDir, "store.json");
}

// Global in-memory cache for ultra-low latency & read-only environment safety
let memoryState: ServerStoreState = {
  incidents: INITIAL_INCIDENTS,
  auditLogs: INITIAL_AUDIT_LOGS,
  totalRecoverableToday: 1310000,
  totalRecoveredToday: 410000,
  autoPilot: false,
  nodeStates: { 0: "at-risk", 1: "at-risk", 2: "at-risk", 3: "at-risk" }
};

let isInitialized = false;

function loadFromFile(): void {
  if (isInitialized) return;
  try {
    const filePath = getStoreFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (parsed && Array.isArray(parsed.incidents)) {
        memoryState = parsed;
      }
    }
  } catch {
    // If file read fails, memoryState remains valid
  }
  isInitialized = true;
}

function saveToFile(): void {
  try {
    const filePath = getStoreFilePath();
    fs.writeFileSync(filePath, JSON.stringify(memoryState, null, 2), "utf-8");
  } catch {
    // Graceful silent fallback if running in strictly read-only edge environment
  }
}

export const serverStore = {
  getState(): ServerStoreState {
    loadFromFile();
    return memoryState;
  },

  getIncidents(): Incident[] {
    loadFromFile();
    return memoryState.incidents;
  },

  getAuditLogs(): AuditLog[] {
    loadFromFile();
    return memoryState.auditLogs;
  },

  addOrUpdateIncident(incident: Incident): ServerStoreState {
    loadFromFile();
    const existingIdx = memoryState.incidents.findIndex((i) => i.id === incident.id);
    let updated = [...memoryState.incidents];

    if (existingIdx >= 0) {
      updated[existingIdx] = incident;
    } else {
      updated.unshift(incident);
    }

    // Sort by Expected Revenue Recovery (ERR) descending
    updated.sort((a, b) => {
      if (a.state === "at-risk" && b.state !== "at-risk") return -1;
      if (b.state === "at-risk" && a.state !== "at-risk") return 1;
      return b.err - a.err;
    });

    const totalRecoverable = updated
      .filter((i) => i.state !== "recovered")
      .reduce((sum, i) => sum + i.potentialLoss, 0);

    memoryState = {
      ...memoryState,
      incidents: updated,
      totalRecoverableToday: totalRecoverable
    };

    saveToFile();
    return memoryState;
  },

  updateIncidentState(
    incidentId: string,
    state: "at-risk" | "recovering" | "recovered" | "failed",
    details?: { recoveryAmount?: number; reason?: string }
  ): ServerStoreState {
    loadFromFile();
    const target = memoryState.incidents.find((i) => i.id === incidentId);
    if (!target) return memoryState;

    const updatedIncidents = memoryState.incidents.map((inc) => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          state,
          lastActionAt: Date.now(),
          failureReason: details?.reason
        };
      }
      return inc;
    });

    let newTotalRecovered = memoryState.totalRecoveredToday;
    if (state === "recovered" && target.state !== "recovered") {
      newTotalRecovered += (details?.recoveryAmount ?? target.potentialLoss);
    }

    const totalRecoverable = updatedIncidents
      .filter((i) => i.state !== "recovered")
      .reduce((sum, i) => sum + i.potentialLoss, 0);

    // Record audit log
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().substring(11, 19) + " UTC",
      incidentId: target.id,
      incidentTitle: target.title,
      evidence: state === "recovered" ? "Settlement confirmed by banking partner switch" : details?.reason || "State transition",
      counterfactualGap: `+${target.counterfactual.counterfactualGap}pp verified`,
      errScore: target.err,
      confidence: target.confidence,
      autonomyScore: target.autonomyFactors.calculatedScore,
      policyCheck: state === "recovered" ? "CLOSED — Verified Settlement Reconciled" : "ESCALATED — Rollback Executed",
      outcome: state === "recovered" ? "recovered" : state === "failed" ? "failed" : "executing",
      amount: details?.recoveryAmount ?? target.potentialLoss
    };

    memoryState = {
      ...memoryState,
      incidents: updatedIncidents,
      auditLogs: [newLog, ...memoryState.auditLogs],
      totalRecoverableToday: totalRecoverable,
      totalRecoveredToday: newTotalRecovered,
      nodeStates: {
        ...memoryState.nodeStates,
        [target.regionIndex]: state === "recovered" ? "recovered" : state === "failed" ? "critical" : "at-risk"
      }
    };

    saveToFile();
    return memoryState;
  },

  addAuditLog(log: AuditLog): void {
    loadFromFile();
    memoryState = {
      ...memoryState,
      auditLogs: [log, ...memoryState.auditLogs]
    };
    saveToFile();
  },

  reset(): ServerStoreState {
    memoryState = {
      incidents: INITIAL_INCIDENTS,
      auditLogs: INITIAL_AUDIT_LOGS,
      totalRecoverableToday: 1310000,
      totalRecoveredToday: 410000,
      autoPilot: false,
      nodeStates: { 0: "at-risk", 1: "at-risk", 2: "at-risk", 3: "at-risk" }
    };
    saveToFile();
    return memoryState;
  }
};
