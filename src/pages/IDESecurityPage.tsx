import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import {
  FileCode,
  FolderOpen,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Zap,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

export const IDESecurityPage: React.FC = () => {
  const { state, navigate, applyFixAndVerify } = useDemo();
  const [selectedFile, setSelectedFile] = useState<string>('users.py');
  const [showInlineDiag, setShowInlineDiag] = useState<boolean>(true);

  const isResolved = state.findingState === 'RESOLVED';

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Developer Security Assistant
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Prototype • VS Code Extension Experience
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time context-aware security feedback directly inside the developer's IDE workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('context')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors"
          >
            <span>Understand Context & Risk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VS Code Simulator Container */}
      <div className="bg-[#1e1e1e] text-slate-200 rounded-xl overflow-hidden shadow-2xl border border-slate-800 font-mono text-xs flex flex-col min-h-[580px]">
        {/* IDE Window Bar */}
        <div className="bg-[#323233] px-4 py-2 flex items-center justify-between border-b border-[#252526] text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-sans text-slate-300 text-[11px]">
              Visual Studio Code — payments-api [WSL: Ubuntu]
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-sans">
            <span className="text-blue-400 font-semibold">● ShieldFlow Active</span>
            <span className="text-slate-500">Python 3.11.4</span>
          </div>
        </div>

        {/* IDE Main Area: Sidebar + Editor + Security Panel */}
        <div className="grid grid-cols-12 flex-1 min-h-[480px]">
          {/* File Explorer (3 cols) */}
          <div className="col-span-12 md:col-span-2 bg-[#252526] border-r border-[#333333] p-2 font-sans select-none text-[11px]">
            <div className="uppercase tracking-wider font-semibold text-[10px] text-slate-400 mb-2 px-2">
              Explorer
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-slate-300 font-semibold px-1 py-1">
                <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>payments-api</span>
              </div>
              <div className="pl-4 space-y-0.5">
                <div
                  onClick={() => setSelectedFile('users.py')}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer ${
                    selectedFile === 'users.py' ? 'bg-[#37373d] text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-amber-400" />
                  <span>users.py</span>
                  {!isResolved && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 ml-auto" />
                  )}
                </div>
                <div
                  onClick={() => setSelectedFile('auth.py')}
                  className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200"
                >
                  <FileCode className="w-3.5 h-3.5 text-blue-400" />
                  <span>auth.py</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>package.json</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer text-slate-400 hover:text-slate-200">
                  <FileCode className="w-3.5 h-3.5 text-slate-400" />
                  <span>.env</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor Panel (6 cols) */}
          <div className="col-span-12 md:col-span-7 bg-[#1e1e1e] flex flex-col border-r border-[#333333]">
            {/* Tab Header */}
            <div className="bg-[#2d2d2d] flex items-center border-b border-[#252526]">
              <div className="bg-[#1e1e1e] text-slate-200 px-3 py-1.5 border-t-2 border-blue-500 flex items-center gap-2 text-xs font-sans">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span>users.py</span>
                {!isResolved && <span className="w-2 h-2 rounded-full bg-rose-500" />}
              </div>
            </div>

            {/* Code Line Area */}
            <div className="p-4 overflow-x-auto flex-1 font-mono text-xs leading-relaxed space-y-1">
              <div className="text-slate-500">1  from flask import Flask, request, jsonify</div>
              <div className="text-slate-500">2  import psycopg2</div>
              <div className="text-slate-500">3  from database import db_pool</div>
              <div className="text-slate-500">4  </div>
              <div className="text-slate-500">5  app = Flask(__name__)</div>
              <div className="text-slate-500">6  </div>
              <div className="text-slate-500">38  @app.route("/users", methods=["GET"])</div>
              <div className="text-slate-500">39  def get_user():</div>
              <div className="text-slate-500">40      user_id = request.args.get("id")</div>
              <div className="text-slate-500">41  </div>

              {/* Line 42 (Vulnerable Code Line) */}
              <div className="group relative flex items-start bg-[#2a1a1a]/40 py-0.5 rounded px-1 -mx-1">
                <span className="text-slate-500 w-8 inline-block select-none">42</span>
                <div className="flex-1">
                  {!isResolved ? (
                    <>
                      <span className="text-slate-300">    query = </span>
                      <span
                        onClick={() => setShowInlineDiag(!showInlineDiag)}
                        className="wavy-error font-semibold text-rose-300 cursor-pointer"
                        title="Click to view ShieldFlow inline diagnostic details"
                      >
                        "SELECT * FROM users WHERE id=" + user_id
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-300">    query = </span>
                      <span className="text-emerald-400 font-semibold">
                        "SELECT * FROM users WHERE id=?"
                      </span>
                      <span className="text-slate-400 ml-3 text-[11px] font-sans italic">
                        # REMEDIATED: Parameterized
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Line 43 */}
              <div className="flex items-start">
                <span className="text-slate-500 w-8 inline-block select-none">43</span>
                <span>
                  {!isResolved ? (
                    <span className="text-slate-300">    return db.execute(query)</span>
                  ) : (
                    <span className="text-emerald-300">    return db.execute(query, (user_id,))</span>
                  )}
                </span>
              </div>

              {/* Interactive Inline Diagnostic Popover on Line 42 */}
              {!isResolved && showInlineDiag && (
                <div className="ml-8 my-2 p-3 bg-[#2d1215] border border-rose-600/50 rounded-lg font-sans text-xs shadow-xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-rose-400 font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      ShieldFlow Security Assistant Diagnostic
                    </span>
                    <button onClick={() => setShowInlineDiag(false)} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    User-controlled input <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-amber-300">user_id</code> directly concatenates into dynamic SQL statement without string sanitization or parameterized bindings.
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      onClick={applyFixAndVerify}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <Zap className="w-3 h-3" />
                      Apply Quick Fix
                    </button>
                    <button
                      onClick={() => navigate('context')}
                      className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-[11px] font-medium"
                    >
                      View Attack Flow & Risk (92/100)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Security Assistant Side Panel (3 cols) */}
          <div className="col-span-12 md:col-span-3 bg-[#252526] p-4 font-sans space-y-4 border-l border-[#333333]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                SECURITY ASSISTANT
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded">
                AI-assisted
              </span>
            </div>

            {!isResolved ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-400">
                    <span className="flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4" />
                      Critical Finding
                    </span>
                    <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[10px]">
                      BLOCK
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-xs">
                    SQL Injection in users.py
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-rose-800/40">
                    <span>Calculated Context Risk:</span>
                    <span className="font-mono font-bold text-rose-400">92 / 100</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>Decision Confidence:</span>
                    <span className="font-semibold text-blue-300">High (94%)</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="font-semibold text-slate-200">Recommended Action:</div>
                  <div className="p-2 rounded bg-[#1e1e1e] border border-slate-700 text-[11px] text-amber-300">
                    Fix before release (Parameterize query)
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => navigate('context')}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Understand Context & Risk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate('remediation')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Review Fix & Verify</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-700/60 space-y-3 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-300">
                  Vulnerability Remediated & Verified
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  SQL Injection in <code className="text-emerald-400">users.py:42</code> has been parameterized and verified cleanly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('cicd')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <span>View CI/CD Release Decision</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* IDE Bottom Status Bar */}
        <div className="bg-[#007acc] text-white px-4 py-1 flex items-center justify-between text-[11px] font-sans">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-bold">
              {!isResolved ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                  Problems: 1 (1 Release Blocker)
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  Problems: 0 (All Blockers Clear)
                </>
              )}
            </span>
            <span className="text-white/80">Ln 42, Col 18</span>
            <span className="text-white/80">UTF-8</span>
          </div>
          <div className="flex items-center gap-3">
            <span>ShieldFlow Engine v2.4</span>
            <span className="bg-white/20 px-1.5 rounded font-mono text-[10px]">
              {state.releaseDecision === 'BLOCK' ? '🔴 BLOCKED' : '🟢 ALLOWED'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
