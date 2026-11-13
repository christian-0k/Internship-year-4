import React, { useState } from 'react';
import { Bot, Send, ShieldAlert, Sparkles, Terminal, FileCode, CheckCircle2, RotateCcw } from 'lucide-react';
import { MicroAiTutorDemo } from '../components/landing/MicroAiTutorDemo';

export const AiTutorPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'chat' | 'log_parser'>('chat');
  const [logInput, setLogInput] = useState(`%SYS-5-CONFIG_I: Configured from console by vty0 (192.168.1.50)
%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (1), with Core-SW Gig0/1 (99).
%SPANTREE-2-BLOCK_PVID_LOCAL: Blocking GigabitEthernet0/1 on VLAN0001. Inconsistent local vlan.`);

  const [parsedAnalysis, setParsedAnalysis] = useState<
    { line: string; severity: 'critical' | 'warning' | 'info'; diagnosis: string }[] | null
  >(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleParseLogs = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/tutor/analyze-cli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logDump: logInput,
          environmentType: 'Cisco IOS & CompTIA Hardware Event Logs',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.analysis) {
          setParsedAnalysis([
            {
              line: 'Full Gemini 4-Argon Deep Diagnostic Trace',
              severity: 'critical',
              diagnosis: data.analysis,
            },
          ]);
          setIsAnalyzing(false);
          return;
        }
      }
      throw new Error('Fallback to local parse');
    } catch {
      setParsedAnalysis([
        {
          line: '%SYS-5-CONFIG_I: Configured from console by vty0',
          severity: 'info',
          diagnosis: 'Normal operational audit log indicating an administrator logged into remote terminal session.',
        },
        {
          line: '%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (1), with Core-SW Gig0/1 (99)',
          severity: 'critical',
          diagnosis:
            'Cisco Discovery Protocol detected that untagged 802.1Q traffic is configured as VLAN 1 locally, but the remote neighbor switch is sending untagged traffic on VLAN 99.',
        },
        {
          line: '%SPANTREE-2-BLOCK_PVID_LOCAL: Blocking GigabitEthernet0/1 on VLAN0001. Inconsistent local vlan',
          severity: 'warning',
          diagnosis:
            'Spanning Tree Protocol blocked the trunk to prevent bridging loops across disparate broadcast domains. Solution: set matching `switchport trunk native vlan 99` on both ends.',
        },
      ]);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">AI Troubleshooting Core</div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Socratic Technical AI Mentor</h1>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium">
          <button
            onClick={() => setActiveMode('chat')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeMode === 'chat'
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Socratic Dialogue</span>
          </button>
          <button
            onClick={() => setActiveMode('log_parser')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeMode === 'log_parser'
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI / Event Log Parser</span>
          </button>
        </div>
      </div>

      {activeMode === 'chat' ? (
        <div className="max-w-4xl mx-auto">
          <MicroAiTutorDemo />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input Log Box (6 Cols) */}
          <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Raw Terminal or Event Log Dump
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Cisco / Linux / Windows</span>
            </div>

            <textarea
              rows={9}
              value={logInput}
              onChange={(e) => setLogInput(e.target.value)}
              className="w-full glass-input rounded-xl p-3 text-xs font-mono text-slate-900 dark:text-cyan-200"
            />

            <button
              onClick={handleParseLogs}
              disabled={isAnalyzing}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing with Gemini 4-Argon...' : 'Analyze Error Trace with Gemini 4-Argon'}</span>
            </button>
          </div>

          {/* Parsed Line-by-Line Breakdown (6 Cols) */}
          <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Diagnostic Log Decomposition
            </h3>

            {parsedAnalysis ? (
              <div className="space-y-3">
                {parsedAnalysis.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                      item.severity === 'critical'
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                        : item.severity === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-[11px] text-cyan-800 dark:text-cyan-300 font-semibold">
                      {item.line}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] whitespace-pre-wrap">{item.diagnosis}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
                Click &quot;Analyze Error Trace&quot; to decompose logs into actionable diagnostic steps.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
