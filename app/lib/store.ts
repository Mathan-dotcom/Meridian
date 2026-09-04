import { CandidateIntervention, AutonomyFactors, CounterfactualEstimate } from "./err-engine";

export type IncidentState = "at-risk" | "recovering" | "recovered" | "failed";
export type AutonomyLevel = "AUTO" | "NEEDS APPROVAL";
export type IncidentType = "gateway_degradation" | "subscription_failure" | "checkout_abandonment" | "overdue_receivables";
export type ImplementationDepth = "deep" | "shallow" | "architecture_only";

export interface PaymentEventRecord {
  event_id: string;
  timestamp: string;
  payment_method: "UPI" | "card" | "netbanking";
  bank: string;
  gateway: string;
  amount: number;
  status: "success" | "failed" | "timeout";
  error_code: string | null;
  merchant_id: string;
}

export interface Incident {
  id: string;
  title: string;
  service: string;
  type: IncidentType;
  depth: ImplementationDepth;
  potentialLoss: number; // in INR (₹)
  err: number; // Expected Recoverable Revenue (INR)
  confidence: number; // 0 - 100
  counterfactual: CounterfactualEstimate;
  candidateInterventions: CandidateIntervention[];
  autonomyFactors: AutonomyFactors;
  evidence: string[];
  intervention: string;
  autonomy: AutonomyLevel;
  state: IncidentState;
  timestamp: string;
  regionIndex: number;
  lastActionAt?: number;
  failureReason?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  incidentId: string;
  incidentTitle: string;
  evidence: string;
  counterfactualGap?: string;
  errScore: number;
  confidence: number;
  autonomyScore: number;
  policyCheck: string;
  outcome: "recovered" | "failed" | "executing" | "at-risk";
  amount: number;
}

export interface NodeStateMap {
  [regionIndex: number]: "signal" | "at-risk" | "recovered" | "critical";
}
