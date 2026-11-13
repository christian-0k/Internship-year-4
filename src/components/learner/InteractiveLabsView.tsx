import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Bot, 
  Sparkles, 
  ArrowLeft, 
  FileCheck, 
  ChevronRight, 
  ShieldCheck, 
  Flame, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { firestoreService } from '../../services/firestoreService';

interface RubricItem {
  id: string;
  name: string;
  points: number;
  passed: boolean;
}

export const InteractiveLabsView: React.FC = () => {
  const { navigateTo, user, selectedLabId } = useAuth();

  // Terminal state machine
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'NetMentor.AI Virtualized WebAssembly Micro-Kernel // Cisco IOS-XE Software (X86_64_LINUX_IOSD-UNIVERSALK9-M)',
    'Compiled under IEEE 802.1Q / RFC 2328 specifications. Zero local hypervisors.',
    '',
    '*May 14 10:14:02.190: %SYS-5-RESTART: System restarted -- Cisco IOS-XE Software, Version 17.06.01',
    '*May 14 10:14:04.202: %CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (1), with Switch-02 GigabitEthernet0/1 (99).',
    '',
    'Switch-01> enable',
    'Switch-01#'
  ]);

  const [cliInput, setCliInput] = useState('');
  const [commandMode, setCommandMode] = useState<'exec' | 'priv' | 'config' | 'config-if'>('priv');
  const [currentInterface, setCurrentInterface] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Lab simulated configuration state
  const [configState, setConfigState] = useState({
    g0_1_mode: 'access',
    g0_1_native_vlan: '1',
    g0_1_status: 'up',
    vlan99_created: false,
  });

  // Active fault injected by instructor
  const [activeFault, setActiveFault] = useState<string>('Native VLAN Mismatch on G0/1 (VLAN 1 vs VLAN 99)');

  // Rubrics
  const [rubrics, setRubrics] = useState<RubricItem[]>([
    { id: 'r1', name: 'Enter Privileged EXEC & Global Config Mode', points: 20, passed: true },
    { id: 'r2', name: 'Configure 802.1Q Trunk Mode on GigabitEthernet0/1', points: 30, passed: false },
    { id: 'r3', name: 'Align Native VLAN to 99 on Trunk Interface', points: 30, passed: false },
    { id: 'r4', name: 'Verify CDP Neighbor Adjacency with Zero Packet Drop', points: 20, passed: false },
  ]);

  // Socratic Hint Progression
  const [hintLevel, setHintLevel] = useState<number>(0);
  const hints = [
    "Notice the recurring CDP warning: %CDP-4-NATIVE_VLAN_MISMATCH. Switch-02 expects Native VLAN 99, but Switch-01 is still using the default VLAN 1. Which interface needs configuration?",
    "Enter configuration mode for interface g0/1. First set it to trunk mode ('switchport mode trunk'), then assign the native VLAN.",
    "Exact syntax guide: 'interface GigabitEthernet0/1' -> 'switchport mode trunk' -> 'switchport trunk native vlan 99'."
  ];

  // Grading Modal / Result
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<{ score: number; passed: boolean } | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    const prompt = commandMode === 'exec' ? 'Switch-01>'
      : commandMode === 'priv' ? 'Switch-01#'
      : commandMode === 'config' ? 'Switch-01(config)#'
      : `Switch-01(config-if)#`;

    const newHistory = [...terminalHistory, `${prompt} ${cmd}`];
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setTerminalHistory([]);
      setCliInput('');
      return;
    }

    if (lower === 'help' || lower === '?') {
      newHistory.push(
        'Supported Cisco IOS-XE subset commands in this sandbox:',
        '  enable                       Enter Privileged EXEC mode',
        '  configure terminal (conf t)  Enter Global Configuration mode',
        '  interface <name>             Select interface (e.g. g0/1)',
        '  switchport mode <access|trunk>  Set 802.1Q mode',
        '  switchport trunk native vlan <id> Set native VLAN',
        '  show ip interface brief      Display interfaces status',
        '  show vlan brief              Display configured VLANs',
        '  show running-config          Display running configuration',
        '  ping <ip>                    Transmit ICMP echo requests',
        '  exit                         Return to prior command mode'
      );
    } else if (lower === 'enable') {
      setCommandMode('priv');
    } else if (lower === 'configure terminal' || lower === 'conf t') {
      setCommandMode('config');
    } else if (lower.startsWith('interface ') || lower.startsWith('int ')) {
      const parts = lower.split(' ');
      const iface = parts[1] || 'GigabitEthernet0/1';
      setCurrentInterface(iface);
      setCommandMode('config-if');
    } else if (commandMode === 'config-if' && lower === 'switchport mode trunk') {
      setConfigState(prev => ({ ...prev, g0_1_mode: 'trunk' }));
      setRubrics(prev => prev.map(r => r.id === 'r2' ? { ...r, passed: true } : r));
      newHistory.push('%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up');
    } else if (commandMode === 'config-if' && (lower === 'switchport trunk native vlan 99' || lower.includes('native vlan 99'))) {
      setConfigState(prev => ({ ...prev, g0_1_native_vlan: '99' }));
      setActiveFault('None (Fault resolved: Both switches matched on Native VLAN 99)');
      setRubrics(prev => prev.map(r => (r.id === 'r3' || r.id === 'r4') ? { ...r, passed: true } : r));
      newHistory.push('*May 14 10:18:22.012: %CDP-4-NATIVE_VLAN_RESTORED: Native VLAN mismatch resolved on GigabitEthernet0/1.');
    } else if (lower === 'exit') {
      if (commandMode === 'config-if') setCommandMode('config');
      else if (commandMode === 'config') setCommandMode('priv');
      else if (commandMode === 'priv') setCommandMode('exec');
    } else if (lower === 'show ip interface brief' || lower === 'sh ip int br') {
      newHistory.push(
        'Interface                  IP-Address      OK? Method Status                Protocol',
        'GigabitEthernet0/0         unassigned      YES unset  up                    up',
        `GigabitEthernet0/1         unassigned      YES unset  up                    ${configState.g0_1_status === 'up' ? 'up' : 'down'}`,
        'GigabitEthernet0/2         unassigned      YES unset  administratively down down',
        'Vlan1                      192.168.1.1     YES manual up                    up',
        'Vlan99                     192.168.99.1    YES manual up                    up'
      );
    } else if (lower === 'show vlan brief' || lower === 'sh vlan') {
      newHistory.push(
        'VLAN Name                             Status    Ports',
        '---- -------------------------------- --------- -------------------------------',
        '1    default                          active    Gi0/2, Gi0/3, Gi0/4',
        '10   MANAGEMENT                       active    ',
        '20   VOICE_DATA                       active    ',
        '99   NATIVE_MGMT                      active    '
      );
    } else if (lower === 'show running-config' || lower === 'sh run') {
      newHistory.push(
        'Building configuration...',
        'Current configuration : 1840 bytes',
        '!',
        'version 17.6',
        'hostname Switch-01',
        '!',
        'interface GigabitEthernet0/1',
        ` switchport mode ${configState.g0_1_mode}`,
        ` switchport trunk native vlan ${configState.g0_1_native_vlan}`,
        '!',
        'end'
      );
    } else if (lower.startsWith('ping')) {
      newHistory.push(
        'Type escape sequence to abort.',
        'Sending 5, 100-byte ICMP Echos to target, timeout is 2 seconds:',
        configState.g0_1_native_vlan === '99' ? '!!!!!' : '.!...',
        configState.g0_1_native_vlan === '99'
          ? 'Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms'
          : 'Success rate is 20 percent (1/5) due to Native VLAN frame drop'
      );
    } else {
      newHistory.push(`% Invalid command: "${cmd}". Type "help" or "?" for supported syntax.`);
    }

    setTerminalHistory(newHistory);
    setCliInput('');
  };

  const handleAutoGrade = async () => {
    setIsGrading(true);
    setTimeout(async () => {
      const totalPoints = rubrics.reduce((acc, curr) => acc + (curr.passed ? curr.points : 0), 0);
      const passed = totalPoints >= 70;
      setGradeResult({ score: totalPoints, passed });
      setIsGrading(false);

      // Persist to Firestore via centralized service
      if (user) {
        try {
          const submissionId = `sub-${Date.now()}`;
          await firestoreService.saveLabSubmission({
            id: submissionId,
            studentId: user.id,
            studentName: user.name,
            labId: selectedLabId || 'lab-vlan-trunking-01',
            labTitle: '802.1Q VLAN Trunking & Native VLAN Mismatch Fix',
            score: totalPoints,
            maxScore: 100,
            status: passed ? 'graded' : 'in_progress',
          });
          
          if (passed) {
            await firestoreService.updateUserProgress(user.id, {
              completedLabs: (user.completedLabs || 14) + 1,
              certReadiness: Math.min(100, (user.certReadiness || 78) + 2),
              lastActiveLabId: selectedLabId || 'lab-vlan-trunking-01',
            });
          }
        } catch (e) {
          console.warn('Firestore service lab write note:', e);
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between shrink-0 font-mono text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-500/30">
              LAB-NET-04
            </span>
            <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
              Cisco IOS-XE 802.1Q Trunking & Native VLAN Recovery
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoGrade}
            disabled={isGrading}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:from-emerald-400 hover:to-cyan-400 transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            <FileCheck className="w-4 h-4" />
            <span>{isGrading ? 'Verifying Config...' : 'Submit & Auto-Grade'}</span>
          </button>
        </div>
      </header>

      {/* Main Body: 3-column / 2-column layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Topology & Rubrics (w-80) */}
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/60 p-4 space-y-4 overflow-y-auto font-mono text-xs">
          
          {/* Active Incident Warning */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <Flame className="w-4 h-4" />
              <span>Fault Injected by Instructor</span>
            </div>
            <p className="text-amber-200 text-[11px] font-sans leading-relaxed">
              {activeFault}
            </p>
          </div>

          {/* Topology Node Map */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Active Topology Pod:
            </span>
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-cyan-400 font-bold">Switch-01 (Your Terminal)</span>
              <span className="text-emerald-400 text-[10px]">● Gi0/1</span>
            </div>
            <div className="flex justify-center text-slate-600">
              <span className="text-[10px]">802.1Q 1Gbps Fiber Link</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-purple-400 font-bold">Switch-02 (Partner Node)</span>
              <span className="text-slate-400 text-[10px]">Native 99</span>
            </div>
          </div>

          {/* Rubrics Checklist */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Automated Rubric Objectives:
            </span>
            <div className="space-y-1.5">
              {rubrics.map((r) => (
                <div
                  key={r.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition ${
                    r.passed
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${r.passed ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="text-[11px] font-sans leading-tight">{r.name}</span>
                  </div>
                  <span className="text-[10px] font-mono shrink-0 ml-1">+{r.points}pt</span>
                </div>
              ))}
            </div>
          </div>

          {/* Socratic Hint Drawer */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-cyan-400 font-bold text-xs">
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>Socratic AI Copilot</span>
              </div>
              <span className="text-[10px]">Hint {hintLevel + 1}/3</span>
            </div>
            <p className="text-slate-300 text-xs font-sans leading-relaxed">
              {hints[hintLevel]}
            </p>
            {hintLevel < 2 && (
              <button
                onClick={() => setHintLevel(prev => prev + 1)}
                className="w-full py-1 text-center rounded bg-cyan-900/40 hover:bg-cyan-900/60 text-cyan-300 text-[11px] transition"
              >
                Request Next Hint →
              </button>
            )}
          </div>
        </div>

        {/* Center: Live Terminal CLI (xterm.js style) */}
        <div className="flex-1 bg-black p-4 flex flex-col font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-500 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="ml-2 text-slate-400">ttyS0: Switch-01 (WASM Core)</span>
            </div>
            <span>Type <code className="text-cyan-400">help</code> or <code className="text-cyan-400">?</code> for commands</span>
          </div>

          {/* Terminal Console Stream */}
          <div className="flex-1 overflow-y-auto py-3 space-y-1 text-slate-300">
            {terminalHistory.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.includes('%CDP-4') || line.includes('mismatch')
                    ? 'text-amber-400'
                    : line.includes('Switch-01')
                    ? 'text-cyan-300 font-bold'
                    : line.includes('%SYS-5') || line.includes('%LINEPROTO')
                    ? 'text-emerald-400'
                    : 'text-slate-300'
                }
              >
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* CLI Input Prompt */}
          <form onSubmit={handleCommandSubmit} className="pt-2 border-t border-slate-800 flex items-center gap-2">
            <span className="text-emerald-400 font-bold shrink-0">
              {commandMode === 'exec' ? 'Switch-01>'
                : commandMode === 'priv' ? 'Switch-01#'
                : commandMode === 'config' ? 'Switch-01(config)#'
                : `Switch-01(config-if)#`}
            </span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="e.g. switchport mode trunk or show run..."
              className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs caret-cyan-400"
              autoFocus
            />
          </form>
        </div>

      </div>

      {/* Grade Result Modal */}
      {gradeResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 font-mono text-xs space-y-5 shadow-2xl">
            <div className="text-center space-y-2">
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl font-bold ${
                gradeResult.passed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {gradeResult.score}%
              </div>
              <h3 className="text-xl font-bold text-white">
                {gradeResult.passed ? 'Lab Benchmark Passed!' : 'Requires Additional Tuning'}
              </h3>
              <p className="text-slate-400 font-sans text-xs">
                {gradeResult.passed
                  ? 'Outstanding work! The 802.1Q trunk was negotiated and the Native VLAN mismatch was resolved without broadcast packet loss.'
                  : 'Review the remaining unpassed rubrics. Check that the native VLAN matches on both interfaces.'}
              </p>
            </div>

            <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              {rubrics.map(r => (
                <div key={r.id} className="flex justify-between items-center text-[11px]">
                  <span className={r.passed ? 'text-emerald-300' : 'text-slate-500'}>{r.name}</span>
                  <span className="font-bold">{r.passed ? `+${r.points}` : '0'}/{r.points}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setGradeResult(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition"
              >
                Continue Terminal
              </button>
              {gradeResult.passed && (
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                >
                  Return to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
