export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type RiskDecision = 'BLOCK' | 'REVIEW' | 'ALLOW';
export type FindingStatus = 'OPEN' | 'REMEDIATING' | 'VERIFYING' | 'RESOLVED' | 'ACCEPTED';
export type ActiveScreen = 'ide' | 'context' | 'remediation' | 'cicd' | 'dashboard' | 'findings';

export interface Finding {
  id: string;
  title: string;
  category: 'SAST' | 'SCA' | 'Secret Scanner' | 'Container';
  severity: Severity;
  riskScore: number;
  confidence: 'High' | 'Medium' | 'Low';
  confidencePercentage: number;
  filePath: string;
  lineNumber: number;
  repository: string;
  environment: 'Production' | 'Staging' | 'Development';
  status: FindingStatus;
  isReleaseBlocker: boolean;
  isReleaseRelevant: boolean;
  summary: string;
  vulnerableCodeSnippet?: string;
  recommendedFixSnippet?: string;
  recommendedAction: string;
  manualReviewRequired: boolean;
  manualReviewReason?: string;
  deprioritizationReason?: string;
  contextFactors: {
    internetExposure: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    userReachability: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    productionEnvironment: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    assetCriticality: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    exploitability: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
    authenticationRequired: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  };
}

export interface AttackPathNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'internet' | 'api' | 'input' | 'query' | 'database';
  isVulnerable?: boolean;
  details: {
    assetName: string;
    environment: string;
    criticality: string;
    dataClassification: string;
    accessLevel: string;
  };
}

export interface VerificationCheckItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
}

export interface DemoState {
  currentScreen: ActiveScreen;
  theme: 'light' | 'dark';
  repository: string;
  environment: string;
  findingState: FindingStatus;
  remediationStatus: 'NOT_STARTED' | 'APPLYING' | 'APPLIED';
  verificationStatus: 'NOT_STARTED' | 'RUNNING' | 'PASSED';
  riskScore: number; // Starts at 92, drops to 8
  releaseDecision: RiskDecision; // Starts at 'BLOCK', becomes 'ALLOW'
  commitStatus: 'UNCOMMITTED' | 'COMMITTED';
  problemsCount: number; // Starts at 1, drops to 0
  activeFindingId: string;
  showWhyOnly3Modal: boolean;
  showContextVsSeverityModal: boolean;
  showSettingsModal: boolean;
  showCommitModal: boolean;
}
