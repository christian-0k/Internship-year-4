import React, { useState } from 'react';
import {
  Terminal,
  Cpu,
  Network,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Play,
  Layers,
  Send,
  Zap,
  Shield,
  FileCheck,
  Activity,
} from 'lucide-react';
import { MicroHardwareViewer } from '../components/landing/MicroHardwareViewer';
import { MicroCiscoCli } from '../components/landing/MicroCiscoCli';
import { MicroCableCrimper } from '../components/landing/MicroCableCrimper';
import { WiresharkPacketSniffer } from '../components/landing/WiresharkPacketSniffer';
import { LAB_SCENARIOS } from '../data/mockData';

interface Props {
  initialLabId?: string;
  onGradeSubmitted: (score: number) => void;
}

export const InteractiveLabsPage: React.FC<Props> = ({ initialLabId, onGradeSubmitted }) => {
  const [activeTab, setActiveTab] = useState<'hardware' | 'network' | 'cable' | 'subnet'>(
    initialLabId === 'lab-hw-3d-01'
      ? 'hardware'
      : initialLabId === 'lab-cable-01'
      ? 'cable'
      : 'network'
  );

  const [activeLab, setActiveLab] = useState(
    LAB_SCENARIOS.find((l) => l.id === initialLabId) || LAB_SCENARIOS[0]
  );

  // Subnetting Drill State
  const [cidrPrefix, setCidrPrefix] = useState(26); // /26
  const [networkIp, setNetworkIp] = useState('192.168.10.0');
  const [userMask, setUserMask] = useState('');
  const [userHosts, setUserHosts] = useState('');
  const [drillScore, setDrillScore] = useState<{ evaluated: boolean; pass: boolean; feedback: string } | null>(null);

  // Auto-grading status
  const [submissionStatus, setSubmissionStatus] = useState<{
    submitted: boolean;
    score: number;
    feedback: string;
  } | null>(null);

  const handleEvaluateDrill = (e: React.FormEvent) => {
    e.preventDefault();
    // /26 has mask 255.255.255.192 and 62 usable hosts
    const correctMask = '255.255.255.192';
    const correctHosts = '62';

    const isMaskCorrect = userMask.trim() === correctMask;
    const isHostsCorrect = userHosts.trim() === correctHosts;

    if (isMaskCorrect && isHostsCorrect) {
      setDrillScore({
        evaluated: true,
        pass: true,
        feedback: 'Correct! /26 leaves 6 host bits (2^6 - 2 = 62 usable hosts). Subnet mask is 255.255.255.192.',
      });
    } else {
      setDrillScore({
        evaluated: true,
        pass: false,
        feedback: `Incorrect. For /26, 4th octet binary is 11000000 (128+64 = 192). Usable hosts = 2^(32-26) - 2 = 62.`,
      });
    }
  };

  const handleFinalSubmit = () => {
    const finalScore = 95;
    setSubmissionStatus({
      submitted: true,
      score: finalScore,
      feedback: 'Configuration parsed against Cisco IOS & CompTIA rubric. 4 of 4 objectives passed with 95/100.',
    });
    onGradeSubmitted(finalScore);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header & Lab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Hands-On Assessment Laboratory</div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Interactive Multi-Engine Sandbox</h1>
        </div>

        {/* Lab Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium">
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'hardware'
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3D Hardware Workbench</span>
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'network'
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Cisco CLI Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('cable')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'cable'
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>RJ-45 Crimper</span>
          </button>
          <button
            onClick={() => setActiveTab('subnet')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'subnet'
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>CIDR Subnet Drill</span>
          </button>
        </div>
      </div>

      {/* Main Lab Layout: Workbench + Live Rubric & Grading Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Workbench (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {activeTab === 'hardware' && <MicroHardwareViewer />}
          {activeTab === 'network' && (
            <div className="space-y-4">
              <MicroCiscoCli />
              {/* Wireshark Packet Sniffer Drawer */}
              <WiresharkPacketSniffer />
            </div>
          )}
          {activeTab === 'cable' && <MicroCableCrimper />}
          {activeTab === 'subnet' && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">CIDR IPv4 Subnetting Speed Drill</h3>
                </div>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  CCNA 3.0 IP Connectivity
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 space-y-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">Target Subnetting Challenge:</div>
                <div className="text-xl font-mono font-bold text-cyan-700 dark:text-cyan-300">
                  {networkIp} / {cidrPrefix}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Calculate the dotted-decimal subnet mask and maximum usable host addresses before the timer expires.
                </p>
              </div>

              <form onSubmit={handleEvaluateDrill} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-medium">Dotted-Decimal Subnet Mask</label>
                    <input
                      type="text"
                      required
                      value={userMask}
                      onChange={(e) => setUserMask(e.target.value)}
                      placeholder="e.g. 255.255.255.192"
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-medium">Usable Host Addresses</label>
                    <input
                      type="text"
                      required
                      value={userHosts}
                      onChange={(e) => setUserHosts(e.target.value)}
                      placeholder="e.g. 62"
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Evaluate Calculation</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCidrPrefix(27);
                      setNetworkIp('10.0.4.0');
                      setUserMask('');
                      setUserHosts('');
                      setDrillScore(null);
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline font-mono"
                  >
                    Generate Next Challenge
                  </button>
                </div>
              </form>

              {drillScore && (
                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                    drillScore.pass
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
                  }`}
                >
                  {drillScore.pass ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <p className="leading-relaxed">{drillScore.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Scenario Rubric & Auto-Grading (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                {activeLab.certObjective}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{activeLab.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{activeLab.scenarioBrief}</p>
            </div>

            {/* Rubric Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Auto-Grading Rubric
              </div>
              <div className="space-y-2">
                {activeLab.rubric.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-200 flex items-start justify-between gap-2"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item.task}</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold shrink-0">
                      +{item.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-Grade Submit Action */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
              <button
                onClick={handleFinalSubmit}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <FileCheck className="w-4 h-4" />
                <span>Submit Configuration for Auto-Grading</span>
              </button>
              <div className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                Submissions automatically update your SMS Gradebook standing.
              </div>
            </div>

            {/* Submission Status Toast */}
            {submissionStatus && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-200 space-y-1">
                <div className="flex items-center justify-between font-semibold">
                  <span>Graded &amp; Synchronized!</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">{submissionStatus.score}%</span>
                </div>
                <p className="text-[11px] opacity-90">{submissionStatus.feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
