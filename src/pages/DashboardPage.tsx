import React from 'react';
import { useDemo } from '../context/DemoContext';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { state, navigate, setModal } = useDemo();

  const isAllowed = state.releaseDecision === 'ALLOW';
  const isResolved = state.findingState === 'RESOLVED';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            Security Overview Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Understand what actually matters before you release. Context-aware prioritization eliminates noise.
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
            onClick={() => navigate('ide')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            <span>Open IDE Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top KPI Cards (4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Scanner Findings</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">127</div>
          <div className="text-[10px] text-slate-400">Raw SAST / SCA / Secret alerts</div>
        </div>

        {/* KPI 2 */}
        <div className="bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm space-y-1">
          <div className="text-xs text-blue-700 dark:text-blue-300 font-semibold flex items-center justify-between">
            <span>Release Relevant</span>
            <Filter className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">3</div>
          <div className="text-[10px] text-blue-600/80 dark:text-blue-400/80">
            Reachable in production context
          </div>
        </div>

        {/* KPI 3 */}
        <div
          className={`p-4 rounded-xl border shadow-sm space-y-1 transition-all ${
            isResolved
              ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-between">
            <span className={isResolved ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}>
              Release Blockers
            </span>
            {isResolved ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            )}
          </div>
          <div
            className={`text-3xl font-extrabold font-mono ${
              isResolved ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {isResolved ? '0' : '1'}
          </div>
          <div className="text-[10px] text-slate-500">
            {isResolved ? 'All blockers remediated' : '1 Critical SQL Injection active'}
          </div>
        </div>

        {/* KPI 4 */}
        <div
          className={`p-4 rounded-xl border shadow-sm space-y-1 transition-all ${
            isAllowed
              ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
          }`}
        >
          <div className="text-xs font-semibold flex items-center justify-between">
            <span>Context Risk Score</span>
            {isAllowed ? (
              <TrendingDown className="w-4 h-4 text-emerald-500" />
            ) : (
              <TrendingUp className="w-4 h-4 text-rose-500" />
            )}
          </div>
          <div
            className={`text-3xl font-extrabold font-mono ${
              isAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {state.riskScore} <span className="text-xs text-slate-400 font-sans">/ 100</span>
          </div>
          <div className="text-[10px] text-slate-500">
            {isAllowed ? 'Risk threshold clear (Target < 80)' : 'Exceeds blocking threshold (80)'}
          </div>
        </div>
      </div>

      {/* Main Release Status Card & What Matters Funnel (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Release Banner (5 cols) */}
        <div
          className={`lg:col-span-5 p-6 rounded-xl border flex flex-col justify-between space-y-4 shadow-sm transition-all ${
            isAllowed
              ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                CURRENT RELEASE STATUS
              </span>
              <span className="font-mono text-xs font-bold text-slate-500">payments-api:v2.4</span>
            </div>

            <div className="space-y-1">
              <div
                className={`text-3xl font-extrabold font-mono tracking-tight ${
                  isAllowed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isAllowed ? '🟢 RELEASE ALLOWED' : '🔴 RELEASE BLOCKED'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {isAllowed
                  ? 'All release-blocking findings verified resolved. Build ready to deploy to production.'
                  : '1 release blocker detected in production API layer. Resolution required before deployment.'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Context Risk</span>
              <span className="font-mono font-bold text-base">{state.riskScore} / 100</span>
            </div>
            <button
              onClick={() => navigate('cicd')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors shadow-xs ${
                isAllowed ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'
              }`}
            >
              View Release Gate Decision
            </button>
          </div>
        </div>

        {/* Funnel Progression Widget (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                What Actually Matters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Context-aware prioritization transforms 127 raw alerts into actionable release decisions.
              </p>
            </div>
            <button
              onClick={() => setModal('whyOnly3', true)}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              "Why only 3?" →
            </button>
          </div>

          {/* Funnel Visual Progression */}
          <div className="grid grid-cols-3 gap-3 text-center py-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-0.5">
              <div className="text-2xl font-extrabold text-slate-700 dark:text-slate-300 font-mono">127</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Findings</div>
              <div className="text-[9px] text-slate-400">Raw Scanner Alerts</div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 space-y-0.5">
              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">3</div>
              <div className="text-[10px] text-blue-600/80 dark:text-blue-400 uppercase tracking-wider font-semibold">Release Relevant</div>
              <div className="text-[9px] text-blue-500">Public & Reachable</div>
            </div>

            <div
              className={`p-3 rounded-xl border space-y-0.5 transition-all ${
                isResolved
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
              }`}
            >
              <div
                className={`text-2xl font-extrabold font-mono ${
                  isResolved ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isResolved ? '0' : '1'}
              </div>
              <div
                className={`text-[10px] uppercase tracking-wider font-semibold ${
                  isResolved ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                Release Blocker
              </div>
              <div className="text-[9px] text-slate-500">{isResolved ? '0 Blockers' : 'SQL Injection'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Release Relevant Finding Cards & Deployment Trend Chart (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Relevant Findings List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              3 Release-Relevant Findings
            </h3>
            <span className="text-xs text-slate-400 font-mono">payments-api</span>
          </div>

          <div className="space-y-3">
            {/* Finding Card 1: SQL Injection */}
            <div
              className={`p-4 rounded-xl border shadow-xs transition-all space-y-3 ${
                isResolved
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : 'bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-800 ring-1 ring-rose-500/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {isResolved ? 'RESOLVED ✓' : 'CRITICAL • BLOCK'}
                  </span>
                  <span className="font-mono text-xs text-slate-500">src/users.py:42</span>
                </div>
                <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
                  Risk: {isResolved ? '8' : '92'}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  SQL Injection in user lookup endpoint
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  Public API ➔ User Input ➔ Dynamic SQL ➔ Production DB
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-sans">
                  Action: <strong>{isResolved ? 'Verified safe' : 'Fix before release'}</strong>
                </span>

                <button
                  onClick={() => navigate('ide')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>{isResolved ? 'View Fix in IDE' : 'Remediate in IDE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Finding Card 2: Vulnerable Dependency */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    HIGH • REVIEW
                  </span>
                  <span className="font-mono text-xs text-slate-500">package.json:18</span>
                </div>
                <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
                  Risk: 78
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  PyJWT &lt; 2.4.0 Vulnerable Dependency (CVE-2022-29217)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Package reachable by production payment processing flow.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-amber-700 dark:text-amber-400 text-[11px]">
                  Manual Security Review Needed (No safe auto-patch)
                </span>
                <button
                  onClick={() => navigate('context')}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  View Detail →
                </button>
              </div>
            </div>

            {/* Finding Card 3: Exposed Secret */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    HIGH • REVIEW
                  </span>
                  <span className="font-mono text-xs text-slate-500">.env:9</span>
                </div>
                <span className="font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
                  Risk: 74
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Exposed Stripe API Key in environment configuration
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Credential accessible from production service vault.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Trend Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Deployment Risk Score Trend
            </h3>
            <span className="text-xs text-slate-400 font-mono">Recent Builds</span>
          </div>

          {/* Simple Visual SVG Chart */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="h-40 flex items-end justify-between gap-4 pt-6 px-2 border-b border-slate-200 dark:border-slate-800">
              {/* Build 1 */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">64</span>
                <div className="w-full bg-blue-400/50 rounded-t h-[60%]" />
                <span className="text-[10px] text-slate-400 font-mono">Dep 1</span>
              </div>

              {/* Build 2 */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">71</span>
                <div className="w-full bg-blue-400/70 rounded-t h-[70%]" />
                <span className="text-[10px] text-slate-400 font-mono">Dep 2</span>
              </div>

              {/* Build 3 */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-amber-500">89</span>
                <div className="w-full bg-amber-500/80 rounded-t h-[85%]" />
                <span className="text-[10px] text-slate-400 font-mono">Dep 3</span>
              </div>

              {/* Current Build */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isAllowed ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {state.riskScore}
                </span>
                <div
                  className={`w-full rounded-t transition-all duration-500 ${
                    isAllowed ? 'bg-emerald-500 h-[10%]' : 'bg-rose-600 h-[92%]'
                  }`}
                />
                <span className="text-[10px] text-slate-900 dark:text-white font-bold font-mono">
                  Current
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Release Policy Target:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">&lt; 80 Risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
