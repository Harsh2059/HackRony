import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { SQLI_ATTACK_PATH } from '../data/mock/attackPaths';
import type { AttackPathNode } from '../types';
import {
  ShieldAlert,
  ArrowRight,
  Zap,
  Filter,
  Layers,
  Database,
  Globe,
  Terminal,
  Server,
  User,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';

export const ContextRiskPage: React.FC = () => {
  const { state, navigate, setModal } = useDemo();
  const [selectedNode, setSelectedNode] = useState<AttackPathNode>(SQLI_ATTACK_PATH[3]); // Default to SQL Query node

  const isResolved = state.findingState === 'RESOLVED';

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'internet':
        return <Globe className="w-5 h-5 text-blue-500" />;
      case 'api':
        return <Server className="w-5 h-5 text-purple-500" />;
      case 'input':
        return <User className="w-5 h-5 text-amber-500" />;
      case 'query':
        return <Terminal className="w-5 h-5 text-rose-500" />;
      case 'database':
        return <Database className="w-5 h-5 text-emerald-500" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('ide')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              ← Back to IDE Assistant
            </button>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            SQL Injection in user lookup endpoint
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              CRITICAL
            </span>
          </h1>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
            payments-api / src/users.py / line 42
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal('whyOnly3', true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Filter className="w-3.5 h-3.5 text-blue-500" />
            <span>Why only 3 of 127?</span>
          </button>

          <button
            onClick={() => setModal('contextVsSeverity', true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 hover:bg-amber-100 rounded-lg text-xs font-semibold transition-colors border border-amber-200 dark:border-amber-800"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Context vs Severity</span>
          </button>

          <button
            onClick={() => navigate('remediation')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <span>Proceed to Remediation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid: Attack Path Topo + Context Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Attack Path Topology (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attack Path Visualizer */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  Contextual Attack & Data Flow Topology
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Visualizing how untrusted Internet traffic reaches sensitive production customer databases.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                Interactive Node Flow
              </span>
            </div>

            {/* Attack Flow Nodes Graph */}
            <div className="py-6 px-2 overflow-x-auto bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between min-w-[650px] gap-2">
                {SQLI_ATTACK_PATH.map((node, index) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <React.Fragment key={node.id}>
                      <div
                        onClick={() => setSelectedNode(node)}
                        className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-md ring-2 ring-blue-500/20 scale-105'
                            : node.isVulnerable && !isResolved
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 hover:border-rose-500'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                            {getNodeIcon(node.type)}
                          </div>
                          {node.isVulnerable && !isResolved && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          )}
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs truncate">
                          {node.label}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
                          {node.sublabel}
                        </div>
                      </div>

                      {index < SQLI_ATTACK_PATH.length - 1 && (
                        <div className="text-slate-300 dark:text-slate-700 font-bold">➔</div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Selected Node Details Card */}
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="flex items-center gap-2">
                  {getNodeIcon(selectedNode.type)}
                  Node Context Detail: {selectedNode.label}
                </span>
                <span className="font-mono text-[10px] text-slate-500">{selectedNode.sublabel}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 font-sans block text-[10px]">Asset Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedNode.details.assetName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans block text-[10px]">Environment</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedNode.details.environment}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans block text-[10px]">Criticality</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    {selectedNode.details.criticality}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 font-sans block text-[10px]">Data Classification</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedNode.details.dataClassification}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans block text-[10px]">Access Protocol</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedNode.details.accessLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Context vs Severity Summary Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                Why Context-Aware Risk Beats Standard Scanner Output
              </h3>
              <button
                onClick={() => setModal('contextVsSeverity', true)}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Expand Matrix →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  Standard Vulnerability Scanner
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                  Only sees static code AST patterns and raw CVSS score (9.1). Creates 127 unranked findings causing developer alert fatigue.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1.5">
                <div className="font-bold text-blue-900 dark:text-blue-300">
                  ShieldFlow Decision Engine
                </div>
                <p className="text-blue-700 dark:text-blue-300 text-[11px] leading-relaxed">
                  Evaluates public exposure + reachability + database sensitivity to output 1 true release blocker (Risk 92/100).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Assessment & Manual Review Path (1 col) */}
        <div className="space-y-6">
          {/* Main Risk Decision Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Risk Assessment Engine
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Context-Evaluated
              </span>
            </div>

            {!isResolved ? (
              <div className="space-y-4">
                {/* Risk Score Circle / Banner */}
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center space-y-1">
                  <div className="text-xs uppercase font-semibold text-rose-600 dark:text-rose-400 tracking-wider">
                    Calculated Context Risk
                  </div>
                  <div className="text-4xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">
                    92 <span className="text-base text-slate-400 font-sans">/ 100</span>
                  </div>
                  <div className="inline-block px-3 py-1 bg-rose-600 text-white font-extrabold text-xs rounded-full shadow-xs uppercase tracking-wider">
                    🔴 BLOCK RELEASE
                  </div>
                </div>

                {/* Factors Matrix */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Base CVSS Severity:</span>
                    <span className="font-bold text-rose-600">Critical (9.1)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Exploitability:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">High (Direct)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Reachability:</span>
                    <span className="font-semibold text-emerald-600">Confirmed Public</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Environment:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Production</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Asset Criticality:</span>
                    <span className="font-semibold text-rose-600">High (Customer DB)</span>
                  </div>
                  <div className="flex justify-between py-1 pt-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Decision Confidence:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">High (94%)</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-amber-800 dark:text-amber-300">Recommended Action</div>
                  <div className="text-amber-700 dark:text-amber-400">Fix before release (Parameterize SQL query)</div>
                </div>

                <button
                  onClick={() => navigate('remediation')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Proceed to Remediation</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
                <div className="text-xs uppercase font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Recalculated Context Risk
                </div>
                <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  8 <span className="text-base text-slate-400 font-sans">/ 100</span>
                </div>
                <div className="inline-block px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-full shadow-xs uppercase tracking-wider">
                  🟢 RELEASE ALLOWED
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  SQL Injection resolved & verified cleanly.
                </p>
              </div>
            )}
          </div>

          {/* Manual Review Path Example Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-purple-500" />
                Human Judgment Required Path
              </span>
              <span className="text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-1.5 py-0.2 rounded font-semibold">
                Secondary Finding
              </span>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                PyJWT &lt; 2.4.0 Vulnerable Dependency
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                PyJWT key confusion vulnerability in payment-service package.json.
              </p>
            </div>

            <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 font-sans">
              <strong>No Safe Auto-Fix:</strong> Automated patch breaks auth signature contract. Manual security review needed.
            </div>

            <button className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded text-xs font-medium transition-colors">
              Assign to Security Reviewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
