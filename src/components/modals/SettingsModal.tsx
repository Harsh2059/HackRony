import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { X, Sliders, Sun, Moon, RotateCcw } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { state, setModal, setTheme, resetDemo } = useDemo();

  if (!state.showSettingsModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Platform Settings & Security Policy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure release thresholds, themes, and integrations.
              </p>
            </div>
          </div>
          <button
            onClick={() => setModal('settings', false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Appearance Theme Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Appearance & Theme
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`p-3 rounded-lg border flex items-center gap-3 transition-all ${
                  state.theme === 'light'
                    ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-semibold ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <div className="text-left text-xs">
                  <div className="font-bold">Light Theme</div>
                  <div className="text-[10px] opacity-75">White / clean enterprise</div>
                </div>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-lg border flex items-center gap-3 transition-all ${
                  state.theme === 'dark'
                    ? 'border-blue-500 bg-slate-800 text-white font-semibold ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Moon className="w-4 h-4 text-blue-400" />
                <div className="text-left text-xs">
                  <div className="font-bold">Dark Theme</div>
                  <div className="text-[10px] opacity-75">Dark mode / modern IDE</div>
                </div>
              </button>
            </div>
          </div>

          {/* Security Policy Settings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Security Release Policy
            </h4>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Release Blocking Threshold
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Context Risk score ≥ 80 automatically blocks release build
                  </div>
                </div>
                <span className="font-mono font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 px-2 py-0.5 rounded">
                  80 / 100
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Public API Exposure Multiplier
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Applies +20 risk weight to externally reachable endpoints
                  </div>
                </div>
                <span className="font-mono font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-0.5 rounded">
                  Enabled
                </span>
              </div>
            </div>
          </div>

          {/* Future Integrations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Integrations (Future Production Scope)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['GitHub Actions', 'GitLab CI', 'Snyk SCA', 'Semgrep SAST', 'SonarQube', 'Jira Cloud'].map(
                (name, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between opacity-70"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300">{name}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded">
                      Coming Soon
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Reset Demo State Section */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Reset Demo Presentation State
              </div>
              <div className="text-[11px] text-slate-500">
                Restores original blocked state (Risk 92, Release BLOCKED)
              </div>
            </div>
            <button
              onClick={() => {
                resetDemo();
                setModal('settings', false);
              }}
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold px-3 py-1.5 rounded-md text-xs shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset State
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => setModal('settings', false)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
