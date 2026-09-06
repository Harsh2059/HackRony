import type { VerificationCheckItem } from '../../types';

export const INITIAL_VERIFICATION_CHECKS: VerificationCheckItem[] = [
  {
    id: 'check-1',
    title: 'Static Security Analysis (SAST)',
    description: 'Analyzing AST tree for parameter untainting in src/users.py:42',
    status: 'pending',
  },
  {
    id: 'check-2',
    title: 'Vulnerability Reachability Scan',
    description: 'Verifying user input parameterization stops SQL syntax injection',
    status: 'pending',
  },
  {
    id: 'check-3',
    title: 'Code Syntactic & Unit Validation',
    description: 'Running pytest suite on user lookup handler responses',
    status: 'pending',
  },
  {
    id: 'check-4',
    title: 'Security Policy Regression Gate',
    description: 'Re-evaluating release risk model for payments-api repository',
    status: 'pending',
  },
];
