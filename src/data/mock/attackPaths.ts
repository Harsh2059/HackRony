import type { AttackPathNode } from '../../types';

export const SQLI_ATTACK_PATH: AttackPathNode[] = [
  {
    id: 'node-1',
    label: 'Internet',
    sublabel: 'Public Traffic (0.0.0.0/0)',
    type: 'internet',
    details: {
      assetName: 'Public Web Network',
      environment: 'External',
      criticality: 'Unrestricted Access',
      dataClassification: 'Untrusted Ingress',
      accessLevel: 'Anonymous',
    },
  },
  {
    id: 'node-2',
    label: 'Public API',
    sublabel: 'GET /users endpoint',
    type: 'api',
    details: {
      assetName: 'API Gateway Ingress',
      environment: 'Production Gateway',
      criticality: 'High',
      dataClassification: 'Public Endpoint',
      accessLevel: 'TLS / HTTP',
    },
  },
  {
    id: 'node-3',
    label: 'User Input',
    sublabel: 'request.args["id"]',
    type: 'input',
    details: {
      assetName: 'HTTP Request Parameter',
      environment: 'Flask Web Framework',
      criticality: 'High (Untrusted Source)',
      dataClassification: 'Raw Query String',
      accessLevel: 'Application Context',
    },
  },
  {
    id: 'node-4',
    label: 'SQL Query',
    sublabel: 'users.py : line 42',
    type: 'query',
    isVulnerable: true,
    details: {
      assetName: 'Dynamic String Concatenation',
      environment: 'Python App Layer',
      criticality: 'CRITICAL VULNERABILITY',
      dataClassification: 'Unsanitized Command Input',
      accessLevel: 'DB Execution Handle',
    },
  },
  {
    id: 'node-5',
    label: 'Production DB',
    sublabel: 'Customer Store (PostgreSQL)',
    type: 'database',
    details: {
      assetName: 'Primary Customer PostgreSQL DB Cluster',
      environment: 'AWS RDS us-east-1 (Prod)',
      criticality: 'CRITICAL (Tier 1)',
      dataClassification: 'PII & Payment Methods (PCI-DSS Sensitive)',
      accessLevel: 'Full Read / Exfiltration Risk',
    },
  },
];
