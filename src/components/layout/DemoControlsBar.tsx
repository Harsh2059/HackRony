import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { RotateCcw } from 'lucide-react';

export const DemoControlsBar: React.FC = () => {
  const { state, resetDemo, navigate } = useDemo();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs px-4 py-2 flex flex-wrap items-center justify-between border-b border-slate-800 shadow-inner z-50">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          DEMO MODE
        </span>

        <span className="text-slate-400 hidden sm:inline">|</span>

        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="text-slate-400">Active Scenario:</span>
          <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-semibold text-amber-400">
            SQL Injection in users.py:42
          </span>
        </div>
      </div>

      {/* Screen Navigation Quick Jump */}
      <div className="flex items-center gap-1 overflow-x-auto py-1 sm:py-0">
        <button
          onClick={() => navigate('ide')}
          className={`px-2.5 py-1 rounded text-xs transition-colors ${
            state.currentScreen === 'ide'
              ? 'bg-blue-600 text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          1. IDE Security
        </button>
        <button
          onClick={() => navigate('context')}
          className={`px-2.5 py-1 rounded text-xs transition-colors ${
            state.currentScreen === 'context'
              ? 'bg-blue-600 text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          2. Context & Risk
        </button>
        <button
          onClick={() => navigate('remediation')}
          className={`px-2.5 py-1 rounded text-xs transition-colors ${
            state.currentScreen === 'remediation'
              ? 'bg-blue-600 text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          3. Fix & Verification
        </button>
        <button
          onClick={() => navigate('cicd')}
          className={`px-2.5 py-1 rounded text-xs transition-colors ${
            state.currentScreen === 'cicd'
              ? 'bg-blue-600 text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          4. CI/CD Gate
        </button>
        <button
          onClick={() => navigate('dashboard')}
          className={`px-2.5 py-1 rounded text-xs transition-colors ${
            state.currentScreen === 'dashboard'
              ? 'bg-blue-600 text-white font-medium shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          5. Dashboard
        </button>
      </div>

      {/* Demo Reset Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={resetDemo}
          className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-medium px-3 py-1 rounded text-xs transition-all shadow-sm hover:shadow"
          title="Reset all state back to initial blocked state (Risk 92, Release BLOCKED)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo State
        </button>
      </div>
    </div>
  );
};
