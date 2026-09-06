import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { DEPRIORITIZED_SUMMARY } from '../../data/mock/findings';
import { X, Filter, CheckCircle2, ArrowRight } from 'lucide-react';

export const WhyOnly3Modal: React.FC = () => {
  const { state, setModal, navigate } = useDemo();

  if (!state.showWhyOnly3Modal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Why Only 3 of 127 Findings Matter for This Release?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Context-Aware Filtering eliminates alert fatigue by prioritizing true release risks.
              </p>
            </div>
          </div>
          <button
            onClick={() => setModal('whyOnly3', false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Funnel Visual */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-extrabold text-slate-700 dark:text-slate-300 font-mono">127</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5 font-semibold">Raw Findings</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">124</div>
              <div className="text-[11px] text-blue-600/80 dark:text-blue-400/80 uppercase tracking-wider mt-0.5 font-semibold">Deprioritized</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">3</div>
              <div className="text-[11px] text-amber-600/80 dark:text-amber-400/80 uppercase tracking-wider mt-0.5 font-semibold">Release Relevant</div>
            </div>
          </div>

          {/* Deprioritization Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              124 Deprioritized Findings Breakdown
            </h4>
            <div className="space-y-2.5">
              {DEPRIORITIZED_SUMMARY.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{item.reason}</span>
                  </div>
                  <span className="font-mono font-semibold px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded">
                    {item.count} findings
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaway Banner */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <p className="font-bold">Core ShieldFlow Value Proposition</p>
              <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                Developers don't waste time sorting through 127 scanner false alarms. ShieldFlow context analysis pinpoints the exact 1 SQL Injection finding that actually threatens the release build.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setModal('whyOnly3', false)}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setModal('whyOnly3', false);
              navigate('context');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium transition-colors shadow-sm"
          >
            <span>View Context & Attack Path</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
