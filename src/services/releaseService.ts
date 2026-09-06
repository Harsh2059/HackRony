import type { RiskDecision } from '../types';

export interface PipelineStage {
  id: string;
  name: string;
  tool: string;
  status: 'passed' | 'failed' | 'blocked';
  timestamp: string;
  details: string;
}

export class ReleaseService {
  public static getPipelineStages(releaseDecision: RiskDecision): PipelineStage[] {
    const isAllowed = releaseDecision === 'ALLOW';

    return [
      {
        id: 'stage-1',
        name: 'Code Commit & Build',
        tool: 'GitHub Actions',
        status: 'passed',
        timestamp: 'Just now',
        details: 'Git commit hash verified. Workspace cleanly compiled.',
      },
      {
        id: 'stage-2',
        name: 'SAST Scanner',
        tool: 'Semgrep / ShieldFlow Engine',
        status: 'passed',
        timestamp: 'Just now',
        details: isAllowed ? '0 release-blocking vulnerabilities detected in AST.' : '1 Critical SQL Injection active in src/users.py:42.',
      },
      {
        id: 'stage-3',
        name: 'SCA Dependency Scan',
        tool: 'Snyk / ShieldFlow Engine',
        status: 'passed',
        timestamp: 'Just now',
        details: 'Dependencies scanned. 1 High finding flagged for security review.',
      },
      {
        id: 'stage-4',
        name: 'Secret Scanner',
        tool: 'Gitleaks',
        status: 'passed',
        timestamp: 'Just now',
        details: 'No new unencrypted high-entropy keys introduced in patch.',
      },
      {
        id: 'stage-5',
        name: 'Contextual Risk Analysis',
        tool: 'ShieldFlow Context Engine',
        status: isAllowed ? 'passed' : 'failed',
        timestamp: 'Just now',
        details: isAllowed ? 'Context risk score 8/100 (Below threshold 80).' : 'Context risk score 92/100 (Exceeds threshold 80).',
      },
      {
        id: 'stage-6',
        name: 'Release Decision Gate',
        tool: 'ShieldFlow Release Policy',
        status: isAllowed ? 'passed' : 'blocked',
        timestamp: 'Just now',
        details: isAllowed ? '🟢 RELEASE ALLOWED' : '🔴 RELEASE BLOCKED (1 Blocker active)',
      },
    ];
  }
}
