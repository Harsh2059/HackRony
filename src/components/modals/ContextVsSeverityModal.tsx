import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { X, Layers, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export const ContextVsSeverityModal: React.FC = () => {
  const { state, setModal, navigate } = useDemo();

  if (!state.showContextVsSeverityModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Context vs. CVSS Severity Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Why traditional static scanners fail and how ShieldFlow decision engine resolves alert fatigue.
              </p>
            </div>
          </div>
          <button
            onClick={() => setModal('contextVsSeverity', false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Traditional Scanner Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider">
                  Traditional Scanner
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  AST / CVSS Only
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500">CVSS Base Severity:</span>
                  <span className="font-bold text-rose-600">CRITICAL (9.1)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500">Internet Reachability:</span>
                  <span className="font-mono text-slate-400">Unknown / N/A</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500">Production DB Connection:</span>
                  <span className="font-mono text-slate-400">Unknown</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500">Asset Criticality:</span>
                  <span className="font-mono text-slate-400">Unevaluated</span>
                </div>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg text-xs space-y-1">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Scanner Outcome: Alert Fatigue
                </div>
                <p className="text-rose-600 dark:text-rose-300 text-[11px]">
                  Outputs 127 unranked findings. Developers ignore security reports because context is missing.
                </p>
              </div>
            </div>

            {/* ShieldFlow Decision Engine Card */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-800 dark:text-blue-300 text-xs uppercase tracking-wider">
                  ShieldFlow Decision Engine
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white shadow-xs">
                  Context-Aware
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-blue-100 dark:border-blue-900/50">
                  <span className="text-slate-600 dark:text-slate-400">Public Entry Point:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Confirmed (/users)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-100 dark:border-blue-900/50">
                  <span className="text-slate-600 dark:text-slate-400">User Input Parameter:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Unsanitized string</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-100 dark:border-blue-900/50">
                  <span className="text-slate-600 dark:text-slate-400">Target Asset:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Customer DB (PII)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-blue-100 dark:border-blue-900/50">
                  <span className="text-slate-600 dark:text-slate-400">Calculated Context Risk:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">92 / 100 (Critical)</span>
                </div>
              </div>

              <div className="p-3 bg-rose-600 text-white rounded-lg text-xs space-y-1 shadow-sm">
                <div className="font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    Actionable Decision:
                  </span>
                  <span className="bg-white/20 px-2 py-0.5 rounded uppercase font-extrabold text-[10px]">
                    🔴 BLOCK RELEASE
                  </span>
                </div>
                <p className="text-white/90 text-[11px]">
                  Pinpoints the single critical vulnerability that actually poses production risk for this build.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setModal('contextVsSeverity', false)}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setModal('contextVsSeverity', false);
              navigate('remediation');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
          >
            <span>Proceed to Remediation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
