import React from 'react';
import { useDemo } from '../context/DemoContext';
import { ReleaseService } from '../services/releaseService';
import {
  Rocket,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CICDPage: React.FC = () => {
  const { state, navigate } = useDemo();
  const pipeline = ReleaseService.getPipelineStages(state.releaseDecision);

  const isAllowed = state.releaseDecision === 'ALLOW';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              CI/CD Release Decision — Prototype
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Simulated Pipeline
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Contextual release gate preventing vulnerable builds from deploying to production environments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('dashboard')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <span>View Security Overview Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Release Gate Status Banner */}
      <div
        className={`p-6 rounded-xl border transition-all duration-300 shadow-md ${
          isAllowed
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100 glow-safe'
            : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100 glow-danger'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${
                isAllowed ? 'bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'bg-rose-600 shadow-lg shadow-rose-500/30'
              }`}
            >
              {isAllowed ? <ShieldCheck className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
            </div>

            <div className="space-y-1">
              <div className="text-xs uppercase font-extrabold tracking-wider opacity-80">
                Final Release Decision Gate
              </div>
              <div className="text-2xl font-extrabold flex items-center gap-3">
                {isAllowed ? (
                  <>
                    <span className="text-emerald-600 dark:text-emerald-400">🟢 RELEASE ALLOWED</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                      Context Risk: 8/100
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-rose-600 dark:text-rose-400">🔴 RELEASE BLOCKED</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800">
                      Context Risk: 92/100
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs opacity-90 leading-relaxed max-w-2xl">
                {isAllowed
                  ? 'All release-blocking vulnerabilities have been verified and remediated. The payment-api main branch build passed all security gate policies.'
                  : 'Critical SQL injection in src/users.py:42 is externally reachable and targets production customer database. Build is blocked.'}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-end justify-between gap-2 border-t sm:border-t-0 sm:border-l border-slate-300 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-6">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Repository</span>
              <span className="font-mono font-bold text-xs">payments-api:main</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Release Target</span>
              <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">Production</span>
            </div>
          </div>
        </div>
      </div>

      {/* CI/CD Pipeline Visualizer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Rocket className="w-4 h-4 text-blue-500" />
            CI/CD Pipeline Security Stages
          </h3>
          <span className="text-xs text-slate-400 font-mono">Build #142-release</span>
        </div>

        {/* Pipeline Stage Flow */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
          {pipeline.map((stage, idx) => (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border text-xs space-y-2 flex flex-col justify-between ${
                stage.status === 'passed'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                  : stage.status === 'blocked' || stage.status === 'failed'
                  ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                  <span>Stage {idx + 1}</span>
                  <span>{stage.timestamp}</span>
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-xs leading-tight">
                  {stage.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {stage.tool}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-[11px]">
                <span className="font-semibold">
                  {stage.status === 'passed' ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Blocked
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Audit Log Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Pipeline Security Audit Trail
        </h3>
        <div className="space-y-2 text-xs font-mono">
          {pipeline.map((stage) => (
            <div
              key={stage.id}
              className="flex items-start justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800 dark:text-slate-200">{stage.name}</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  {stage.details}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  stage.status === 'passed'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {stage.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
