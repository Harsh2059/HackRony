import type { Finding } from '../types';
import { ALL_MOCK_FINDINGS, PRIMARY_FINDING_SQLI } from '../data/mock/findings';

export class FindingService {
  public static getFindings(): Finding[] {
    return ALL_MOCK_FINDINGS;
  }

  public static getFindingById(id: string): Finding | undefined {
    return ALL_MOCK_FINDINGS.find((f) => f.id === id) || PRIMARY_FINDING_SQLI;
  }

  public static getReleaseRelevantFindings(): Finding[] {
    return ALL_MOCK_FINDINGS.filter((f) => f.isReleaseRelevant);
  }

  public static getCriticalFindings(): Finding[] {
    return ALL_MOCK_FINDINGS.filter((f) => f.severity === 'Critical');
  }
}
