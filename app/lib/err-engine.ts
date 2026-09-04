/**
 * ERR (Expected Revenue Recovery) Engine & Autonomy Score Calculator
 * According to §8 & §9 of PRD_Revenue_Recovery_Orchestrator.md
 */

export interface CandidateIntervention {
  id: string;
  name: string;
  probabilityOfRecovery: number; // 0 to 1 (e.g. 0.90)
  expectedSuccessRate: number; // 0 to 1 (e.g. 0.95)
  interventionCost: number; // in INR (₹)
  riskPenalty: number; // in INR (₹)
  errScore: number; // Calculated ERR value in INR (₹)
  description: string;
  isRecommended: boolean;
}

export interface AutonomyFactors {
  confidence: number; // 0 to 1 (e.g. 0.94)
  reversibility: number; // 0 to 1 (1 = fully reversible action)
  historicalSuccessWeight: number; // 0 to 1 (e.g. 0.85 synthetic historical weight)
  blastRadius: number; // 1 to 10 (1 = localized, 10 = global merchant blast)
  calculatedScore: number; // 0 to 1
  decision: "AUTO" | "NEEDS APPROVAL";
}

export interface CounterfactualEstimate {
  observedSuccessRate: number; // e.g. 72%
  estimatedRateWithoutAnomaly: number; // e.g. 89%
  counterfactualGap: number; // e.g. +17pp
  telemetrySummary: string;
}

/**
 * Calculates Expected Revenue Recovery (ERR) for a candidate intervention
 * Formula from PRD §8:
 * ERR(i, a) = Potential_Lost_Revenue(i) × Probability_of_Recovery(a) × Expected_Intervention_Success(a) − Intervention_Cost(a) − Risk_Penalty(a)
 */
export function calculateERR(
  potentialLoss: number,
  probRecovery: number,
  expectedSuccess: number,
  cost: number = 0,
  riskPenalty: number = 0
): number {
  const grossRecovery = potentialLoss * probRecovery * expectedSuccess;
  const netERR = grossRecovery - cost - riskPenalty;
  return Math.max(0, Math.round(netERR));
}

/**
 * Calculates Autonomy Score and determines gate decision (AUTO vs NEEDS APPROVAL)
 * Formula from PRD §8.1:
 * Autonomy_Score = Confidence × Reversibility × Historical_Success_Weight × (1 / Blast_Radius)
 */
export function calculateAutonomyScore(
  confidence: number, // 0 to 1
  reversibility: number, // 0 to 1
  historicalWeight: number = 0.85,
  blastRadius: number = 1 // 1 to 10 scale
): AutonomyFactors {
  const blastFactor = Math.max(0.1, 1 / blastRadius);
  const score = confidence * reversibility * historicalWeight * blastFactor;

  // Threshold score >= 0.50 triggers AUTO execution (§8.1)
  const decision: "AUTO" | "NEEDS APPROVAL" = score >= 0.50 ? "AUTO" : "NEEDS APPROVAL";

  return {
    confidence,
    reversibility,
    historicalSuccessWeight: historicalWeight,
    blastRadius,
    calculatedScore: Math.round(score * 100) / 100,
    decision
  };
}

/**
 * Formats counterfactual estimation text according to PRD §9 guidelines
 */
export function formatCounterfactualText(cf: CounterfactualEstimate, factorName: string): string {
  return `Observed success rate: ${cf.observedSuccessRate}%. Model-estimated success rate without ${factorName}: ${cf.estimatedRateWithoutAnomaly}%. Counterfactual gap: +${cf.counterfactualGap}pp. This increases confidence that ${factorName} is a likely contributor.`;
}
