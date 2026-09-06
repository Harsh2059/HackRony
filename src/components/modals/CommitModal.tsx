import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { X, GitCommit, ShieldCheck, ArrowRight } from 'lucide-react';

export const CommitModal: React.FC = () => {
  const { state, setModal, commitChanges } = useDemo();
  const [commitMsg, setCommitMsg] = useState<string>(
    'fix(security): remediate SQL injection vulnerability in user lookup endpoint'
  );

  if (!state.showCommitModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <GitCommit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Ready to Commit Remediated Patch
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Security verification passed cleanly. Safe to merge into release branch.
              </p>
            </div>
          </div>
          <button
            onClick={() => setModal('commit', false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-lg font-bold text-slate-800 dark:text-slate-200">1</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">File Changed</div>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">1</div>
              <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider">Resolved</div>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">0</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Blockers Left</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Commit Message
            </label>
            <textarea
              value={commitMsg}
              onChange={(e) => setCommitMsg(e.target.value)}
              rows={2}
              className="w-full p-2.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>CI/CD Release Decision Gate will automatically change from <strong>🔴 BLOCKED</strong> to <strong>🟢 ALLOWED</strong>.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setModal('commit', false)}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={commitChanges}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all"
          >
            <span>Commit & View CI/CD Gate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
