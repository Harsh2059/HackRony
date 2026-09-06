import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Shield, Sun, Moon, Bell, Settings, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react';

export const Header: React.FC = () => {
  const { state, setTheme, setModal } = useDemo();

  const isBlocked = state.releaseDecision === 'BLOCK';

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 transition-colors">
      {/* Brand & Repository Context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setModal('settings', true)}>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            <Shield className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              ShieldFlow
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded">
                Platform
              </span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

        {/* Repository & Environment Selector */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-sans">repo:</span>
            <span className="font-semibold">{state.repository}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold">{state.environment}</span>
          </div>
        </div>
      </div>

      {/* Security State & User Controls */}
      <div className="flex items-center gap-3">
        {/* Dynamic Security State Pill */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${
            isBlocked
              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
          }`}
        >
          {isBlocked ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Release State: <strong className="font-bold uppercase tracking-wider">🔴 BLOCKED</strong></span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Release State: <strong className="font-bold uppercase tracking-wider">🟢 ALLOWED</strong></span>
            </>
          )}
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(state.theme === 'light' ? 'dark' : 'light')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          title="Toggle Light / Dark Mode"
        >
          {state.theme === 'light' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>☀ Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-400" />
              <span>☾ Dark</span>
            </>
          )}
        </button>

        {/* Notifications */}
        <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 relative hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Settings Modal Trigger */}
        <button
          onClick={() => setModal('settings', true)}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Settings & Policies"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold ring-2 ring-blue-500/30 cursor-pointer">
          AD
        </div>
      </div>
    </header>
  );
};
