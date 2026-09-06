import type { RiskDecision } from '../types';

export interface RiskCalculation {
  riskScore: number;
  confidence: 'High' | 'Medium' | 'Low';
  confidencePercentage: number;
  decision: RiskDecision;
  factors: {
    severity: string;
    exploitability: string;
    reachability: string;
    exposure: string;
    environment: string;
    assetCriticality: string;
  };
}

export class RiskService {
  public static calculateFindingRisk(resolved: boolean): RiskCalculation {
    if (resolved) {
      return {
        riskScore: 8,
        confidence: 'High',
        confidencePercentage: 98,
        decision: 'ALLOW',
        factors: {
          severity: 'Mitigated (Was Critical)',
          exploitability: 'Negligible (Parameterized)',
          reachability: 'Unreachable Syntax',
          exposure: 'Protected Boundary',
          environment: 'Production',
          assetCriticality: 'High',
        },
      };
    }

    return {
      riskScore: 92,
      confidence: 'High',
      confidencePercentage: 94,
      decision: 'BLOCK',
      factors: {
        severity: 'Critical (CVSS 9.1)',
        exploitability: 'High (Direct Injection)',
        reachability: 'Confirmed Public Path',
        exposure: 'Internet-facing',
        environment: 'Production',
        assetCriticality: 'High (Customer DB)',
      },
    };
  }
}
