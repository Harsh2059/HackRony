import React from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Code,
  ShieldAlert,
  CheckSquare,
  Rocket,
  LayoutDashboard,
  ListFilter,
  Settings as SettingsIcon,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { state, navigate, setModal } = useDemo();

  const navItemClass = (active: boolean) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      active
        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold shadow-xs border border-blue-200/60 dark:border-blue-800/40'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60'
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)] transition-colors">
      <div className="p-3 space-y-5">
        {/* Section 1: Developer Workflow */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Developer Security
          </div>
          <nav className="space-y-0.5">
            <button
              onClick={() => navigate('ide')}
              className={navItemClass(state.currentScreen === 'ide')}
            >
              <Code className="w-4 h-4 text-blue-500" />
              <span>1. IDE Security Assistant</span>
              {state.problemsCount > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {state.problemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('context')}
              className={navItemClass(state.currentScreen === 'context')}
            >
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>2. Context & Risk Analysis</span>
            </button>

            <button
              onClick={() => navigate('remediation')}
              className={navItemClass(state.currentScreen === 'remediation')}
            >
              <CheckSquare className="w-4 h-4 text-purple-500" />
              <span>3. Fix & Verification</span>
              {state.findingState === 'RESOLVED' && (
                <ShieldCheck className="w-3.5 h-3.5 ml-auto text-emerald-500" />
              )}
            </button>
          </nav>
        </div>

        {/* Section 2: Release Gate */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Release Controls
          </div>
          <nav className="space-y-0.5">
            <button
              onClick={() => navigate('cicd')}
              className={navItemClass(state.currentScreen === 'cicd')}
            >
              <Rocket className="w-4 h-4 text-emerald-500" />
              <span>4. CI/CD Release Decision</span>
              {state.releaseDecision === 'BLOCK' ? (
                <span className="ml-auto w-2 h-2 rounded-full bg-rose-500" />
              ) : (
                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
          </nav>
        </div>

        {/* Section 3: Intelligence & Posture */}
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Security Intelligence
          </div>
          <nav className="space-y-0.5">
            <button
              onClick={() => navigate('dashboard')}
              className={navItemClass(state.currentScreen === 'dashboard')}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-500" />
              <span>5. Overview Dashboard</span>
            </button>

            <button
              onClick={() => navigate('findings')}
              className={navItemClass(state.currentScreen === 'findings')}
            >
              <ListFilter className="w-4 h-4 text-slate-400" />
              <span>Security Findings (127)</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Footer Settings Link */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setModal('settings', true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-400" />
            Security Policy & Rules
          </span>
          <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </aside>
  );
};
