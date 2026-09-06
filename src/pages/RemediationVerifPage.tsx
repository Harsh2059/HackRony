import React from 'react';
import { useDemo } from '../context/DemoContext';
import { RemediationService } from '../services/remediationService';
import { INITIAL_VERIFICATION_CHECKS } from '../data/mock/verification';
import {
  Zap,
  CheckCircle2,
  ShieldCheck,
  FileCode,
  Loader2,
  GitCommit,
} from 'lucide-react';

export const RemediationVerifPage: React.FC = () => {
  const { state, navigate, applyFixAndVerify, setModal, isPatching, activeVerificationIndex } = useDemo();
  const remediation = RemediationService.getRemediationForFinding('FINDING-101');

  const isPassed = state.verificationStatus === 'PASSED';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('context')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              ← Back to Context & Risk Analysis
            </button>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            Remediation & Automated Verification
            {isPassed && (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                VERIFIED ✓
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Review proposed fix, apply patch, and run simulated automated security verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isPassed ? (
            <button
              onClick={applyFixAndVerify}
              disabled={isPatching}
              className={`inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all ${
                isPatching ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isPatching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Applying Fix & Verifying...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Apply Fix & Run Verification</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setModal('commit', true)}
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all"
            >
              <GitCommit className="w-4 h-4" />
              <span>Commit Changes & Review CI/CD</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Code Diff + Verification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recommended Fix & Code Diff (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Strategy Header Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recommended Remediation Strategy
              </span>
              <span className="text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded">
                AI-assisted
              </span>
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {remediation.fixStrategy}
            </p>
          </div>

          {/* Code Diff Viewer */}
          <div className="bg-[#1e1e1e] text-slate-200 rounded-xl overflow-hidden shadow-xl border border-slate-800 font-mono text-xs">
            <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#333333] flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2 font-sans font-semibold text-slate-200">
                <FileCode className="w-4 h-4 text-amber-400" />
                src/users.py (Diff View)
              </span>
              <span className="text-[10px]">1 file changed, 2 insertions(+), 2 deletions(-)</span>
            </div>

            <div className="p-4 space-y-3 overflow-x-auto text-xs leading-relaxed">
              {/* Context Code Lines */}
              <div className="text-slate-500">@@ -39,6 +39,6 @@ def get_user():</div>
              <div className="text-slate-400">     user_id = request.args["id"]</div>
              <div className="text-slate-400"> </div>

              {/* REMOVED LINE (RED) */}
              <div className="bg-rose-950/60 border-l-4 border-rose-500 text-rose-300 p-2 rounded-r font-mono">
                <span className="select-none font-bold text-rose-500 mr-2">-</span>
                query = "SELECT * FROM users WHERE id=" + user_id
                <br />
                <span className="select-none font-bold text-rose-500 mr-2">-</span>
                return db.execute(query)
              </div>

              {/* ADDED LINE (GREEN) */}
              <div className="bg-emerald-950/60 border-l-4 border-emerald-500 text-emerald-300 p-2 rounded-r font-mono">
                <span className="select-none font-bold text-emerald-500 mr-2">+</span>
                query = "SELECT * FROM users WHERE id=?"
                <br />
                <span className="select-none font-bold text-emerald-500 mr-2">+</span>
                return db.execute(query, (user_id,))
              </div>

              <div className="text-slate-400">     # Handler complete</div>
            </div>
          </div>

          {/* Safety & Impact Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              Remediation Impact Analysis
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center font-mono">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-sans">Confidence</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                  {remediation.confidenceScore}%
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-sans">Files Changed</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {remediation.filesAffected}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-sans">API Change</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">None</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-sans">Regression</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">0 Risks</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              {remediation.safetySummary}
            </p>
          </div>
        </div>

        {/* Right Column: Progressive Verification Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Verification Scanning Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Automated Verification Engine
              </span>
              <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                {isPassed ? 'PASSED ✓' : isPatching ? 'SCANNING...' : 'READY'}
              </span>
            </div>

            {/* Risk Recalculation Transformation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                Context Risk Score Transformation
              </div>
              <div className="flex items-center justify-center gap-4 font-mono font-extrabold text-2xl">
                <span className="text-rose-600">92 (BLOCK)</span>
                <span className="text-slate-400 font-sans text-sm">➔</span>
                <span className={isPassed ? 'text-emerald-500 text-3xl' : 'text-slate-400'}>
                  {isPassed ? '8 (ALLOW)' : '...'}
                </span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {INITIAL_VERIFICATION_CHECKS.map((check, idx) => {
                const isCheckPassed = activeVerificationIndex > idx;
                const isCheckRunning = activeVerificationIndex === idx;

                return (
                  <div
                    key={check.id}
                    className={`p-3 rounded-lg border text-xs transition-all ${
                      isCheckPassed
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                        : isCheckRunning
                        ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 animate-pulse'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span className="flex items-center gap-2">
                        {isCheckPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : isCheckRunning ? (
                          <Loader2 className="w-4 h-4 text-blue-500 animate-spin shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 inline-block shrink-0" />
                        )}
                        {check.title}
                      </span>
                      <span className="font-mono text-[10px]">
                        {isCheckPassed ? 'Passed ✓' : isCheckRunning ? 'Running...' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-6">
                      {check.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Final Action CTA */}
            {isPassed ? (
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setModal('commit', true)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <GitCommit className="w-4 h-4" />
                  <span>Commit Changes & Review CI/CD Gate</span>
                </button>
              </div>
            ) : (
              <button
                onClick={applyFixAndVerify}
                disabled={isPatching}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Apply Fix & Run Verification</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
