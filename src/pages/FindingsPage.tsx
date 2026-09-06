import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { FindingService } from '../services/findingService';
import { Search, ArrowRight } from 'lucide-react';

export const FindingsPage: React.FC = () => {
  const { state, navigate } = useDemo();
  const allFindings = FindingService.getFindings();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const isResolved = state.findingState === 'RESOLVED';

  const filteredFindings = allFindings.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.filePath.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || f.severity.toUpperCase() === severityFilter;
    const matchesCategory = categoryFilter === 'ALL' || f.category === categoryFilter;

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Security Findings Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Displaying {allFindings.length} total findings across payments-api repository.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search findings or file paths..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Sources</option>
            <option value="SAST">SAST Code</option>
            <option value="SCA">SCA Package</option>
            <option value="Secret Scanner">Secret Scanner</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Finding & File</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Context Risk</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Environment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredFindings.map((finding) => {
                const status = finding.id === 'FINDING-101' && isResolved ? 'RESOLVED' : finding.status;
                const risk = finding.id === 'FINDING-101' && isResolved ? 8 : finding.riskScore;

                return (
                  <tr
                    key={finding.id}
                    onClick={() => {
                      if (finding.id === 'FINDING-101') navigate('context');
                    }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{finding.title}</div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {finding.filePath}:{finding.lineNumber}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-semibold">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                          finding.severity === 'Critical'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : finding.severity === 'High'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {finding.severity}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold">{risk} / 100</td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{finding.category}</td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{finding.environment}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          status === 'RESOLVED'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center justify-end gap-1 ml-auto">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
