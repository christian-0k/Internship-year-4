import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Cpu,
  RefreshCw,
  Send,
  Paperclip,
  Code2,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  HelpCircle,
  Zap,
  Headphones,
  FlaskConical,
  Copy,
  Check,
  Eye,
  X,
  History,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Network,
  Activity,
  RotateCcw,
  Wrench,
  ShieldAlert,
  Radio,
  Pause,
  Play,
  HardDrive,
  Gauge,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ChatEntry {
  id: string;
  sender: 'student' | 'tutor';
  timestamp: string;
  authorName: string;
  avatarUrl?: string;
  text: string;
  attachmentNote?: string;
  isInitialMock?: boolean;
}

interface MaintenanceScenario {
  id: string;
  title: string;
  category: 'network' | 'hardware' | 'security';
  description: string;
  prompt: string;
  iconName: 'rotate' | 'activity' | 'shield' | 'zap' | 'wrench' | 'cpu';
  severity: 'Critical' | 'Warning' | 'Routine';
}

const MAINTENANCE_SCENARIOS: MaintenanceScenario[] = [
  {
    id: 'reset-router',
    title: 'Reset router configuration',
    category: 'network',
    description: 'Safe NVRAM erase, config-register 0x2142 ROMmon password recovery, and running-config backup safeguards',
    prompt: 'Scenario: Reset router configuration. How do I safely wipe untracked configs or perform a password recovery on a Cisco router while preserving running-config backups?',
    iconName: 'rotate',
    severity: 'Warning'
  },
  {
    id: 'port-flap',
    title: 'Analyze port flap',
    category: 'network',
    description: 'Carrier transitions, optical transceiver dBm thresholds, and link debounce timers',
    prompt: 'Scenario: Analyze port flap. Switchport Gi0/1 is experiencing intermittent carrier transitions. What Layer 1 and Layer 2 commands should I execute to isolate transceiver faults from duplex mismatches?',
    iconName: 'activity',
    severity: 'Critical'
  },
  {
    id: 'errdisable-recovery',
    title: 'Recover err-disabled port',
    category: 'security',
    description: 'BPDU Guard violations, port security MAC locks, and auto-recovery timers',
    prompt: 'Scenario: Recover err-disabled port. An edge access port entered err-disabled state after a student connected an unmanaged switch with BPDU Guard enabled. How do I clear the fault and set up errdisable recovery?',
    iconName: 'shield',
    severity: 'Warning'
  },
  {
    id: 'mtu-mismatch',
    title: 'Diagnose MTU mismatch',
    category: 'network',
    description: 'OSPF adjacency stuck in EXSTART/EXCHANGE due to packet size disparity',
    prompt: 'Scenario: Diagnose MTU mismatch. OSPF neighbor adjacency is stuck in EXSTART state between R1 and R2. How do I verify interface MTU and resolve Database Description packet drops?',
    iconName: 'zap',
    severity: 'Warning'
  },
  {
    id: 'power-rail-test',
    title: 'Test ATX power supply rails',
    category: 'hardware',
    description: 'Multimeter DC voltage verification (+12V, +5V, +3.3V, +5VSB standby rail)',
    prompt: 'Scenario: Test 24-Pin ATX power supply rails with a multimeter. A workstation fails to POST and shows no fan spin. How do I test +5VSB and bridge PS_ON# to verify all DC voltage rails within ±5% tolerance?',
    iconName: 'wrench',
    severity: 'Routine'
  },
  {
    id: 'ram-beep-codes',
    title: 'Inspect RAM POST beep codes',
    category: 'hardware',
    description: 'BIOS 3-beep memory failure, DIMM channel isolation, and gold contact cleaning',
    prompt: 'Scenario: Inspect RAM POST beep codes. A lab PC produces 1 long and 2 short beeps on boot. What memory channel isolation steps should I follow to identify faulty DDR4 DIMM modules or socket corrosion?',
    iconName: 'cpu',
    severity: 'Routine'
  }
];

export const AITutorView: React.FC = () => {
  const { user, navigateTo, setSelectedLabId } = useAuth();
  
  // Chat state
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      id: 'init-student',
      sender: 'student',
      timestamp: '14:38:02',
      authorName: user?.name || 'Alex Mercer (Learner)',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6G5dsHAEgVnUh-rdMug3ocCajV_oWuFQAdA7LfsAgbez2OSl4nMu2wtVfVt_sRWPcKUvaMeIC4KZRlRIy8n7kyVSjVkb7-NSfpeho1C-WR3sUXPY-pPzKruZUt4paS9EK2Ihjvzx937TMWgVQzlWi8gNBJrjcWfqD3ul9Bf0cCaJXG3emQXWcroTCBF1bF0g9X9FXoDRLP-w2Y4CX_279ZcHODi3_0D3O39D7wRy0s0X_6C-surVt',
      text: "Why is my VLAN not pinging across switch trunk links? I set up VLAN 10 and VLAN 20 on SW-Trunk and Edge-SW1, but hosts on VLAN 20 can't reach the default gateway on the core router.",
      attachmentNote: 'Telemetry attached: Pod #04 Running-Config Snapshot',
      isInitialMock: true,
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoSanitize, setAutoSanitize] = useState(true);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isSyncingTelemetry, setIsSyncingTelemetry] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [isTopologyModalOpen, setIsTopologyModalOpen] = useState(false);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState('092');
  const [selectedScenarioCategory, setSelectedScenarioCategory] = useState<'all' | 'network' | 'hardware' | 'security'>('all');
  const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);

  const renderScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'rotate': return <RotateCcw className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'activity': return <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'shield': return <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'zap': return <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'wrench': return <Wrench className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'cpu': return <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated Live Pod Telemetry State
  const [isTelemetryStreaming, setIsTelemetryStreaming] = useState(true);
  const [isSpikeSimulated, setIsSpikeSimulated] = useState(false);
  const [telemetry, setTelemetry] = useState({
    cpu: 24.8,
    cpuCore0: 28.2,
    cpuCore1: 21.4,
    memoryUsedGB: 1.84,
    memoryTotalGB: 4.00,
    latencyMs: 1.4,
    jitterMs: 0.18,
    packetLossPct: 0.0,
    throughputTxKbps: 148,
    throughputRxKbps: 92,
    historyLatency: [1.2, 1.4, 1.3, 1.5, 1.2, 1.4, 1.6, 1.3, 1.4, 1.2, 1.5, 1.4, 1.3, 1.4, 1.2]
  });

  // Real-time simulated telemetry oscillation
  useEffect(() => {
    if (!isTelemetryStreaming) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        if (isSpikeSimulated) {
          const newLat = +(12.5 + Math.random() * 4.2).toFixed(1);
          return {
            ...prev,
            cpu: +(82.0 + Math.random() * 8.5).toFixed(1),
            cpuCore0: +(88.0 + Math.random() * 6.0).toFixed(1),
            cpuCore1: +(76.0 + Math.random() * 8.0).toFixed(1),
            memoryUsedGB: +(3.24 + Math.random() * 0.15).toFixed(2),
            latencyMs: newLat,
            jitterMs: +(1.4 + Math.random() * 0.8).toFixed(2),
            packetLossPct: +(1.8 + Math.random() * 1.5).toFixed(1),
            throughputTxKbps: Math.floor(820 + Math.random() * 210),
            throughputRxKbps: Math.floor(640 + Math.random() * 180),
            historyLatency: [...prev.historyLatency.slice(1), newLat]
          };
        } else {
          const latJitter = +(1.1 + Math.random() * 0.8).toFixed(1);
          const cpuFluct = +(21.0 + Math.random() * 6.5).toFixed(1);
          return {
            ...prev,
            cpu: cpuFluct,
            cpuCore0: +(cpuFluct * 1.15).toFixed(1),
            cpuCore1: +(cpuFluct * 0.85).toFixed(1),
            memoryUsedGB: +(1.80 + Math.random() * 0.08).toFixed(2),
            latencyMs: latJitter,
            jitterMs: +(0.12 + Math.random() * 0.09).toFixed(2),
            packetLossPct: 0.0,
            throughputTxKbps: Math.floor(130 + Math.random() * 35),
            throughputRxKbps: Math.floor(85 + Math.random() * 25),
            historyLatency: [...prev.historyLatency.slice(1), latJitter]
          };
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isTelemetryStreaming, isSpikeSimulated]);

  const handleSimulateLoadSpike = () => {
    setIsSpikeSimulated(true);
    setSyncFeedback('WARNING: Injected 85% synthetic load & link packet buffer saturation into Pod #04!');
    setTimeout(() => {
      setIsSpikeSimulated(false);
      setSyncFeedback('Pod #04 load stabilized to nominal baseline.');
      setTimeout(() => setSyncFeedback(null), 3000);
    }, 8000);
  };

  const handleSendTelemetryToAI = () => {
    const diagnosticReport = `[LIVE TELEMETRY SNAPSHOT - Pod #04]
• CPU Load: ${telemetry.cpu}% (Core 0: ${telemetry.cpuCore0}%, Core 1: ${telemetry.cpuCore1}%)
• Memory Usage: ${telemetry.memoryUsedGB} GB / ${telemetry.memoryTotalGB} GB (${Math.round((telemetry.memoryUsedGB/telemetry.memoryTotalGB)*100)}%)
• RTT Latency: ${telemetry.latencyMs} ms (Jitter: ${telemetry.jitterMs} ms, Packet Loss: ${telemetry.packetLossPct}%)
• Throughput: Tx ${telemetry.throughputTxKbps} Kbps / Rx ${telemetry.throughputRxKbps} Kbps
• Active Node: SW-Trunk (vIOS-L2)
Can you analyze this telemetry snapshot and tell me if the resource consumption indicates buffer congestion or control-plane packet storm?`;
    handleSendMessage(diagnosticReport);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Copy Config Snippet
  const handleCopySnippet = () => {
    const snippet = `! Cisco IOS VLAN 20 Remediation
enable
configure terminal
vlan 20
 name ENGINEERING_DATA
 state active
exit
interface GigabitEthernet0/1
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan add 20
 no shutdown
end
write memory`;
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  // Sync Telemetry Action
  const handleSyncTelemetry = () => {
    setIsSyncingTelemetry(true);
    setSyncFeedback('Querying Pod #04 telemetry daemon...');
    setTimeout(() => {
      setIsSyncingTelemetry(false);
      setSyncFeedback('Pod #04 Telemetry Synchronized • Latency 1.2ms');
      setTimeout(() => setSyncFeedback(null), 3000);
    }, 1200);
  };

  // Reset Thread Action
  const handleResetThread = () => {
    setMessages([
      {
        id: 'init-student',
        sender: 'student',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        authorName: user?.name || 'Alex Mercer (Learner)',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6G5dsHAEgVnUh-rdMug3ocCajV_oWuFQAdA7LfsAgbez2OSl4nMu2wtVfVt_sRWPcKUvaMeIC4KZRlRIy8n7kyVSjVkb7-NSfpeho1C-WR3sUXPY-pPzKruZUt4paS9EK2Ihjvzx937TMWgVQzlWi8gNBJrjcWfqD3ul9Bf0cCaJXG3emQXWcroTCBF1bF0g9X9FXoDRLP-w2Y4CX_279ZcHODi3_0D3O39D7wRy0s0X_6C-surVt',
        text: "Why is my VLAN not pinging across switch trunk links? I set up VLAN 10 and VLAN 20 on SW-Trunk and Edge-SW1, but hosts on VLAN 20 can't reach the default gateway on the core router.",
        attachmentNote: 'Telemetry attached: Pod #04 Running-Config Snapshot',
        isInitialMock: true,
      }
    ]);
  };

  // Sanitize input if toggle is enabled
  const sanitizeText = (raw: string) => {
    if (!autoSanitize) return raw;
    return raw
      .replace(/password\s+\S+/gi, 'password [SANITIZED_SECRET]')
      .replace(/secret\s+\S+/gi, 'secret [SANITIZED_HASH]')
      .replace(/enable\s+secret\s+\S+/gi, 'enable secret [SANITIZED_HASH]');
  };

  // Send message to server-side Gemini tutor
  const handleSendMessage = async (textToSend?: string) => {
    const raw = textToSend || inputText;
    if (!raw.trim() || isLoading) return;

    const cleaned = sanitizeText(raw.trim());
    const studentEntry: ChatEntry = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      authorName: user?.name || 'Alex Mercer (Learner)',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6G5dsHAEgVnUh-rdMug3ocCajV_oWuFQAdA7LfsAgbez2OSl4nMu2wtVfVt_sRWPcKUvaMeIC4KZRlRIy8n7kyVSjVkb7-NSfpeho1C-WR3sUXPY-pPzKruZUt4paS9EK2Ihjvzx937TMWgVQzlWi8gNBJrjcWfqD3ul9Bf0cCaJXG3emQXWcroTCBF1bF0g9X9FXoDRLP-w2Y4CX_279ZcHODi3_0D3O39D7wRy0s0X_6C-surVt',
      text: cleaned,
      attachmentNote: autoSanitize ? 'Auto-Sanitized: Secrets & Hashes Protected' : undefined
    };

    setMessages((prev) => [...prev, studentEntry]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleaned,
          podContext: 'Pod #04 (CCNA Lab Track)',
          activeNode: 'SW-Trunk (vIOS-L2)',
          lessonContext: 'VLAN Trunking & 802.1Q Encapsulation Diagnostics',
          topic: 'Cisco IOS & Hardware Maintenance',
          activeTimestamp: '14:32'
        })
      });

      const data = await response.json();
      const replyText = data.reply || "Let's isolate this issue methodically. Which interface status command can reveal the link state?";

      const tutorEntry: ChatEntry = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        authorName: 'NetOps AI Tutor',
        text: replyText
      };

      setMessages((prev) => [...prev, tutorEntry]);
    } catch (err) {
      console.error('Failed to contact AI tutor:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `tutor-err-${Date.now()}`,
          sender: 'tutor',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          authorName: 'NetOps AI Tutor',
          text: "Let's isolate this methodically. In an 802.1Q multi-switch fabric, if a VLAN is missing from the Spanning Tree forwarding list, inspect whether the VLAN database was created in global config mode using 'vlan <id>'."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Top Telemetry Header Bar */}
      <div className="px-6 py-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-lg font-bold text-white tracking-tight truncate">
                Socratic AI Engineering Mentor
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LLM Core v4.2 • Diagnostics Active
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate mt-0.5 font-sans">
              Telemetry-aware pedagogical feedback for Cisco IOS, Junos, and Arista topologies & hardware diagnostics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Context Tokens: <strong className="text-white">3,420 / 16k</strong></span>
          </div>

          <button
            onClick={handleResetThread}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700/60"
            title="Reset thread back to initial diagnostic checkpoint"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Thread</span>
          </button>

          <button
            onClick={handleSyncTelemetry}
            disabled={isSyncingTelemetry}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingTelemetry ? 'animate-spin' : ''}`} />
            <span>{isSyncingTelemetry ? 'Syncing...' : 'Sync Lab Telemetry'}</span>
          </button>
        </div>
      </div>

      {/* Sync Toast Feedback */}
      {syncFeedback && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono text-xs flex items-center gap-2 transition animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* Main Two-Pane Split Layout (8-col Left Chat + 4-col Right Rail) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Chat & Diagnostic Pane (xl:col-span-8) */}
        <section className="xl:col-span-8 flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden min-h-[720px] justify-between">
          
          {/* Thread Meta Bar */}
          <div className="px-6 py-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <span className="text-blue-400 font-bold">●</span>
              <span>Thread #092 • VLAN Trunking Isolation Troubleshooting</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                Pod #04 Attached
              </span>
              <span className="text-emerald-400 font-medium">Auto-Grade: Active</span>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* Student initial issue bubble */}
            <div className="flex justify-end gap-3.5">
              <div className="max-w-2xl flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                  <span className="text-slate-500">14:38:02</span>
                  <span className="font-semibold text-white">{user?.name || 'Alex Mercer'} (Learner)</span>
                </div>
                <div className="p-4 rounded-2xl rounded-tr-none bg-blue-600 text-white shadow-md font-sans text-sm leading-relaxed">
                  Why is my VLAN not pinging across switch trunk links? I set up VLAN 10 and VLAN 20 on SW-Trunk and Edge-SW1, but hosts on VLAN 20 can't reach the default gateway on the core router.
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Telemetry attached: Pod #04 Running-Config Snapshot</span>
                </div>
              </div>
              <img
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/40 shrink-0 mt-1 shadow"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6G5dsHAEgVnUh-rdMug3ocCajV_oWuFQAdA7LfsAgbez2OSl4nMu2wtVfVt_sRWPcKUvaMeIC4KZRlRIy8n7kyVSjVkb7-NSfpeho1C-WR3sUXPY-pPzKruZUt4paS9EK2Ihjvzx937TMWgVQzlWi8gNBJrjcWfqD3ul9Bf0cCaJXG3emQXWcroTCBF1bF0g9X9FXoDRLP-w2Y4CX_279ZcHODi3_0D3O39D7wRy0s0X_6C-surVt"
                alt="Alex Mercer learner avatar"
              />
            </div>

            {/* Socratic AI Mentor Curated Response Breakdown */}
            <div className="flex gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0 shadow mt-1">
                <Terminal className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 max-w-3xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">NetOps AI Tutor</span>
                    <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-blue-300 font-mono text-xs">
                      Socratic Diagnostic Mode
                    </span>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Inference 38ms
                  </span>
                </div>

                <div className="p-5 rounded-2xl rounded-tl-none bg-slate-950/80 border border-slate-800 text-slate-200 space-y-4 shadow-inner">
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    Let’s isolate this methodically before applying changes. In an 802.1Q multi-switch fabric, connectivity across a trunk link requires alignment along three critical control-plane checkpoints:
                  </p>

                  {/* 3 Checkpoint Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-mono text-xs text-blue-400 uppercase font-bold">1. Encapsulation</div>
                      <div className="text-xs text-slate-400 mt-1 font-sans">Tagging validation via standard 802.1Q framing on both ends.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-mono text-xs text-emerald-400 uppercase font-bold">2. Allowed Lists</div>
                      <div className="text-xs text-slate-400 mt-1 font-sans">Pruning filters excluding target broadcast domains across trunks.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="font-mono text-xs text-rose-400 uppercase font-bold">3. Native VLAN</div>
                      <div className="text-xs text-slate-400 mt-1 font-sans">CDP native VLAN mismatch warnings leaking untagged traffic.</div>
                    </div>
                  </div>

                  {/* Curriculum Jump Link */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <PlayCircle className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-xs text-slate-300 flex-1 font-sans">
                      <strong className="text-white">Curriculum Link:</strong> CCNA 200-301 • Mod 2.4 "VLAN Trunking & Native Mismatch"
                    </span>
                    <button
                      onClick={() => navigateTo('learn')}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow transition flex items-center gap-1"
                    >
                      <span>Jump to [14:32]</span>
                    </button>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    I pulled telemetry directly from your active <code className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-400">Pod #04 (SW-Trunk)</code>. Inspect the output below closely. What do you observe in the <span className="font-semibold text-white">Vlans in spanning tree forwarding state</span> list for GigabitEthernet0/1?
                  </p>

                  {/* Live IOS Terminal Output Window */}
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-xs">
                    <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                        <span className="ml-2 text-slate-300">SW-Trunk# show interfaces trunk</span>
                      </div>
                      <span className="text-emerald-400 font-semibold text-[11px]">Live IOS Output</span>
                    </div>
                    <div className="p-4 space-y-1.5 overflow-x-auto leading-relaxed text-slate-300">
                      <div className="text-slate-500">Port        Mode             Encapsulation  Status        Native vlan</div>
                      <div>Gi0/1       on               802.1q         trunking      <span className="text-amber-400 font-bold">1</span></div>
                      <div className="text-slate-500 pt-1.5">Port        Vlans allowed on trunk</div>
                      <div>Gi0/1       <span className="text-cyan-400 font-bold">1-10,20,99</span></div>
                      <div className="text-slate-500 pt-1.5">Port        Vlans allowed and active in management domain</div>
                      <div>Gi0/1       1,10,20,99</div>
                      <div className="text-slate-500 pt-1.5">Port        Vlans in spanning tree forwarding state and not pruned</div>
                      <div className="bg-rose-950/70 border border-rose-500/30 p-1.5 rounded text-rose-200">
                        Gi0/1       <span className="underline decoration-wavy decoration-rose-500 font-bold text-amber-300">1,10</span> 
                        <span className="text-rose-400 text-xs ml-3">// NOTE: Notice VLAN 20 is completely missing here!</span>
                      </div>
                    </div>
                  </div>

                  {/* Socratic Question Box */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 font-sans leading-relaxed">
                      <strong className="text-white">Socratic Question for you:</strong> If VLAN 20 is configured in the allowed list, but omitted from the Spanning Tree forwarding state on that switchport, has the VLAN database actually been created with the <code className="px-1 py-0.5 bg-slate-950 rounded font-mono text-cyan-300">vlan 20</code> command in global config mode?
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons Deck */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                  <button
                    onClick={() => handleSendMessage("Can you explain line-by-line why VLAN 20 is excluded from Spanning Tree forwarding state?")}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition flex items-center gap-1.5 border border-slate-700/60"
                  >
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                    <span>Explain CLI Output</span>
                  </button>

                  <button
                    onClick={() => setIsEscalateModalOpen(true)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition flex items-center gap-1.5 border border-slate-700/60"
                  >
                    <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Escalate to Marcus Vance</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedLabId('lab-vlan-trunking-01');
                      navigateTo('labs');
                    }}
                    className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Spin Up Diagnostic Sandbox Pod</span>
                  </button>

                  <button
                    onClick={handleCopySnippet}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition flex items-center gap-1.5 border border-slate-700/60"
                  >
                    {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet ? 'Copied to Clipboard!' : 'Copy Verified Config Snippet'}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Dynamic Conversation Items (beyond initial mock) */}
            {messages.slice(1).map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.sender === 'student' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'tutor' && (
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0 shadow mt-1">
                    <Terminal className="w-5 h-5 text-blue-400" />
                  </div>
                )}

                <div className={`max-w-2xl flex flex-col ${msg.sender === 'student' ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                    <span className="text-slate-500">{msg.timestamp}</span>
                    <span className="font-semibold text-white">{msg.authorName}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                      msg.sender === 'student'
                        ? 'rounded-tr-none bg-blue-600 text-white shadow-md'
                        : 'rounded-tl-none bg-slate-950/90 border border-slate-800 text-slate-200 shadow-inner'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.attachmentNote && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{msg.attachmentNote}</span>
                    </div>
                  )}
                </div>

                {msg.sender === 'student' && (
                  <img
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/40 shrink-0 mt-1 shadow"
                    src={msg.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6G5dsHAEgVnUh-rdMug3ocCajV_oWuFQAdA7LfsAgbez2OSl4nMu2wtVfVt_sRWPcKUvaMeIC4KZRlRIy8n7kyVSjVkb7-NSfpeho1C-WR3sUXPY-pPzKruZUt4paS9EK2Ihjvzx937TMWgVQzlWi8gNBJrjcWfqD3ul9Bf0cCaJXG3emQXWcroTCBF1bF0g9X9FXoDRLP-w2Y4CX_279ZcHODi3_0D3O39D7wRy0s0X_6C-surVt'}
                    alt="Learner"
                  />
                )}
              </div>
            ))}

            {/* Live Typing / Inference Pulse */}
            {isLoading && (
              <div className="flex gap-3.5 items-center text-slate-400 font-mono text-xs">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
                  <Terminal className="w-5 h-5 text-blue-400 animate-spin" />
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  <span>NetOps AI Mentor is analyzing telemetry with gemini-3.8-flash...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Prompt Deck & Quick-Action Suggestion Bar */}
          <div className="p-5 bg-slate-950/90 border-t border-slate-800 space-y-4">
            
            {/* Quick-Action Suggestion Bar Header */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Quick-Action Maintenance Scenarios
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                    (Powered by Gemini 3.8 Flash)
                  </span>
                </div>

                {/* Scenario Category Filters & Dynamic Generator */}
                <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
                  <div className="p-0.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
                    <button
                      onClick={() => setSelectedScenarioCategory('all')}
                      className={`px-2 py-0.5 rounded-md transition ${
                        selectedScenarioCategory === 'all'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setSelectedScenarioCategory('network')}
                      className={`px-2 py-0.5 rounded-md transition ${
                        selectedScenarioCategory === 'network'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Network
                    </button>
                    <button
                      onClick={() => setSelectedScenarioCategory('hardware')}
                      className={`px-2 py-0.5 rounded-md transition ${
                        selectedScenarioCategory === 'hardware'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Hardware
                    </button>
                  </div>

                  <button
                    onClick={async () => {
                      setIsGeneratingScenario(true);
                      await handleSendMessage("Generate a new unexpected dynamic IT maintenance scenario for Pod #04 (e.g. broadcast storm, BGP routing blackhole, or PSU ripple voltage). Give me the symptom, the CLI command to verify it, and ask a Socratic troubleshooting question.");
                      setIsGeneratingScenario(false);
                    }}
                    disabled={isGeneratingScenario || isLoading}
                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20 disabled:opacity-50"
                    title="Generate a brand new randomized maintenance scenario with Gemini"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isGeneratingScenario ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingScenario ? 'Generating...' : 'Dynamic Scenario'}</span>
                  </button>
                </div>
              </div>

              {/* Maintenance Scenarios Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 font-mono text-xs">
                {MAINTENANCE_SCENARIOS
                  .filter((s) => selectedScenarioCategory === 'all' || s.category === selectedScenarioCategory)
                  .map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => handleSendMessage(scenario.prompt)}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-850 text-left transition group space-y-1 relative shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {renderScenarioIcon(scenario.iconName)}
                          <span className="font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {scenario.title}
                          </span>
                        </div>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-black shrink-0 ${
                          scenario.severity === 'Critical' ? 'bg-rose-950 text-rose-400 border border-rose-500/30' :
                          scenario.severity === 'Warning' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                          'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {scenario.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
                        {scenario.description}
                      </p>
                    </button>
                  ))}
              </div>
            </div>

            {/* Input Box Container */}
            <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-2 focus-within:border-blue-500/70 transition shadow-inner">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a diagnostic question or paste CLI commands (e.g., 'show ip interface brief')..."
                rows={3}
                className="w-full bg-transparent resize-none p-2 font-sans text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1 px-1 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => {
                      setInputText((prev) => prev ? `${prev}\n[Snapshot Attached: Pod #04 GigabitEthernet0/1 Config]` : `[Snapshot Attached: Pod #04 GigabitEthernet0/1 Config]`);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Attach Packet Capture or Running Config"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setInputText((prev) => `${prev}\n\`\`\`cisco\nSW-Trunk# show vlan brief\n\`\`\``);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Terminal Snippet Mode"
                  >
                    <Code2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setAutoSanitize(!autoSanitize)}
                    className={`flex items-center gap-1 ml-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                      autoSanitize
                        ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                    title="Toggle auto-sanitization of secret passwords and cryptographic hashes"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Auto-Sanitize Passwords</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline font-mono text-[11px] text-slate-500">
                    Press Enter to send, Shift+Enter for newline
                  </span>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputText.trim()}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* Right Side Telemetry & Context Rail (xl:col-span-4) */}
        <aside className="xl:col-span-4 space-y-6">
          
          {/* Card 0: Live Pod Status Panel (Real-Time Telemetry Monitor) */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            {/* Top Bar with Live Indicator & Action Controls */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Radio className={`w-4 h-4 ${isTelemetryStreaming ? 'text-emerald-400' : 'text-slate-500'}`} />
                  {isTelemetryStreaming && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5 font-mono">
                    Live Pod Status
                    <span className="text-[10px] text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30">
                      Pod #04
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <button
                  onClick={() => setIsTelemetryStreaming(!isTelemetryStreaming)}
                  className={`px-2 py-1 rounded-lg border transition flex items-center gap-1 ${
                    isTelemetryStreaming
                      ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                      : 'bg-amber-950/80 border-amber-500/30 text-amber-400'
                  }`}
                  title={isTelemetryStreaming ? 'Pause live telemetry stream' : 'Resume live stream'}
                >
                  {isTelemetryStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isTelemetryStreaming ? 'Live' : 'Paused'}</span>
                </button>

                <button
                  onClick={handleSimulateLoadSpike}
                  disabled={isSpikeSimulated}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-300 font-bold border border-amber-500/30 transition flex items-center gap-1 disabled:opacity-50"
                  title="Simulate transient 85% CPU load spike & buffer congestion"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">Simulate Spike</span>
                </button>
              </div>
            </div>

            {/* Simulated Telemetry Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              
              {/* CPU Utilization Metric Card */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-blue-400" />
                    <span>CPU Load</span>
                  </span>
                  <span className={`font-bold text-[10px] ${telemetry.cpu > 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {telemetry.cpu > 75 ? 'ELEVATED' : 'NOMINAL'}
                  </span>
                </div>
                <div className="text-xl font-black text-white tracking-tight flex items-baseline justify-between">
                  <span>{telemetry.cpu}%</span>
                  <span className="text-[10px] text-slate-500 font-normal">vIOS Dual-Core</span>
                </div>
                {/* Visual CPU Fill Bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      telemetry.cpu > 75 ? 'bg-rose-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                    }`}
                    style={{ width: `${Math.min(telemetry.cpu, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 pt-0.5">
                  <span>Core 0: {telemetry.cpuCore0}%</span>
                  <span>Core 1: {telemetry.cpuCore1}%</span>
                </div>
              </div>

              {/* Memory (RAM) Metric Card */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-purple-400" />
                    <span>RAM Usage</span>
                  </span>
                  <span className="font-bold text-slate-400 text-[10px]">
                    {Math.round((telemetry.memoryUsedGB / telemetry.memoryTotalGB) * 100)}%
                  </span>
                </div>
                <div className="text-xl font-black text-white tracking-tight flex items-baseline justify-between">
                  <span>{telemetry.memoryUsedGB} <span className="text-xs font-normal text-slate-400">GB</span></span>
                  <span className="text-[10px] text-slate-500 font-normal">/ {telemetry.memoryTotalGB.toFixed(1)} GB</span>
                </div>
                {/* Visual Memory Fill Bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500"
                    style={{ width: `${(telemetry.memoryUsedGB / telemetry.memoryTotalGB) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 pt-0.5">
                  <span>Buffers: 412 MB</span>
                  <span>14 Daemons</span>
                </div>
              </div>

            </div>

            {/* Network Latency & Live Sparkline */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-white text-[11px]">RTT Latency & Jitter</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className={`font-bold ${telemetry.latencyMs > 8 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {telemetry.latencyMs} ms
                  </span>
                  <span className="text-slate-500">Jitter: {telemetry.jitterMs}ms</span>
                </div>
              </div>

              {/* Rolling SVG Sparkline */}
              <div className="h-8 w-full pt-1 flex items-end">
                <svg className="w-full h-7 overflow-visible" viewBox="0 0 140 28" preserveAspectRatio="none">
                  <line x1="0" y1="26" x2="140" y2="26" stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />
                  <polyline
                    fill="none"
                    stroke={telemetry.latencyMs > 8 ? '#f43f5e' : '#06b6d4'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={telemetry.historyLatency
                      .map((val, i) => {
                        const x = (i / (telemetry.historyLatency.length - 1)) * 140;
                        const y = Math.max(2, Math.min(26, 26 - ((val - 1.0) / 16.0) * 24));
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-900 pt-1.5">
                <span>Packet Loss: <strong className="text-white">{telemetry.packetLossPct}%</strong></span>
                <span>Throughput: <strong className="text-cyan-400">Tx {telemetry.throughputTxKbps} / Rx {telemetry.throughputRxKbps} Kbps</strong></span>
              </div>
            </div>

            {/* Quick Action Button: Dispatch Snapshot to AI Chat */}
            <button
              onClick={handleSendTelemetryToAI}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/80 text-cyan-300 hover:text-white font-mono text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm"
              title="Send this real-time CPU, RAM, and Latency snapshot directly into AI Chat for Socratic inspection"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Send Pod Telemetry to AI Mentor →</span>
            </button>
          </div>

          {/* Card 1: Active Lab Context */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white text-sm">Active Lab Context</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Synchronized
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase">Allocated Pod</span>
                <span className="text-blue-400 font-bold">Pod #04 (CCNA Lab Track)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase">Lab Topology</span>
                <span className="text-white font-medium">VLAN 10/20 Inter-VLAN Routing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase">Active Node</span>
                <span className="text-emerald-400 font-semibold">SW-Trunk (vIOS-L2)</span>
              </div>
            </div>

            {/* Link Telemetry Matrix */}
            <div className="rounded-xl overflow-hidden bg-slate-950/70 border border-slate-800 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white">Link Telemetry Matrix</span>
                <span className="text-slate-400">RTT: 1.2ms</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="text-slate-200 font-semibold truncate">R1-Core [Gi0/0.10] &lt;-&gt; SW-Trunk</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">UP / UP</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    <span className="text-slate-200 font-semibold truncate">R1-Core [Gi0/0.20] &lt;-&gt; SW-Trunk</span>
                  </div>
                  <span className="text-rose-400 font-semibold">ERR-DISABLED</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="text-slate-200 font-semibold truncate">SW-Trunk [Gi0/2] &lt;-&gt; Edge-SW1</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">TRUNKING</span>
                </div>
              </div>
            </div>

            {/* Topology Blueprint Image Card */}
            <div className="rounded-xl overflow-hidden relative group border border-slate-800 shadow-lg">
              <img
                className="w-full h-44 object-cover rounded-xl group-hover:scale-105 transition duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLfHzdTApuTxArMKry5pV1FNCDkKwDkoAnnehFULZdex6IYAhxsPs-bMmFI04_R3VznzzydfLVxZQ4uaQb-0TEDIlEEZIW49LtdijhsXUEyxUnUVDRETuBH_MYjd65nUr1FTQBfXOleQAbdAOw8BJiq-5JDMVvZntFEo2v0HtbF23bpQv4cYexOQlww3noLtcQyBh5RVItpAFC6Y4hP6Ip4y_hF5grCpdVvbqoHwMYjhsbqwpqh4f5"
                alt="Interactive network topology diagram"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
                <button
                  onClick={() => setIsTopologyModalOpen(true)}
                  className="w-full py-2 rounded-lg bg-slate-900/90 backdrop-blur border border-slate-700 text-blue-400 font-mono text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Expand Full Interactive Topology</span>
                </button>
              </div>
            </div>

          </div>

          {/* Card 2: Recent Diagnostic Threads */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-white text-sm">Recent Diagnostic Threads</span>
              </div>
              <button
                onClick={() => setSyncFeedback('Loaded 3 diagnostic threads.')}
                className="font-mono text-xs text-blue-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              
              <div
                onClick={() => {
                  setActiveThreadId('091');
                  handleSendMessage("Can you review my BGP Route Reflector Loop thread findings regarding ORIGINATOR_ID?");
                }}
                className={`p-3 rounded-xl border transition cursor-pointer space-y-1 ${
                  activeThreadId === '091' ? 'bg-slate-800 border-blue-500/50' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">BGP Route Reflector Loop</span>
                  <span className="text-slate-500">Yesterday</span>
                </div>
                <p className="text-slate-400 font-sans text-xs line-clamp-1">
                  Resolved: Missing ORIGINATOR_ID attribute on iBGP peer group
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-500/30 text-[10px]">CCNP Enterprise</span>
                  <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified Solved</span>
                  </span>
                </div>
              </div>

              <div
                onClick={() => {
                  setActiveThreadId('090');
                  handleSendMessage("Can you test me on CIDR /27 subnet calculations for 8 subnets?");
                }}
                className={`p-3 rounded-xl border transition cursor-pointer space-y-1 ${
                  activeThreadId === '090' ? 'bg-slate-800 border-blue-500/50' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Subnet Allocation for /27 CIDR</span>
                  <span className="text-slate-500">2 days ago</span>
                </div>
                <p className="text-slate-400 font-sans text-xs line-clamp-1">
                  Calculated 8 subnets with 30 usable host addresses per partition
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-500/30 text-[10px]">IPv4 Fundamentals</span>
                  <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Concept Mastered</span>
                  </span>
                </div>
              </div>

              <div
                onClick={() => {
                  setActiveThreadId('089');
                  handleSendMessage("How did BPDU Guard cause an errdisable on the STP root bridge port?");
                }}
                className={`p-3 rounded-xl border transition cursor-pointer space-y-1 ${
                  activeThreadId === '089' ? 'bg-slate-800 border-blue-500/50' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">STP Root Bridge Priority Conflict</span>
                  <span className="text-slate-500">Apr 12</span>
                </div>
                <p className="text-slate-400 font-sans text-xs line-clamp-1">
                  Learned: BPDU Guard triggered errdisable on access port
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Spanning Tree</span>
                  <span className="text-slate-400 text-[10px]">Archived</span>
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Assigned Instructor Office Hours */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-blue-400">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white text-sm">Assigned Instructor Office Hours</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Marcus Vance (Principal CCIE #49121) is live in the Academy lab channel right now.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50 shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1ki92zEjLBUT76pFX82iAIRXiqMYLXTTgTZDErDjHKyXplgBDu7PuBfEu4UzZavXiq28zmY2hpGqxlhvDhyF42sUjOK0i1iJNxh6OBGZTDNNJ8I81h3Gyj92ggBG8yHGtBXlJp90Ivxtkhoe-m7A1x-5YXAuEovB0Zw--v3DSl35Oumn9MY1aa-EljXBXi-b9Uo5xdne6tCdqdFxU43MBg7zy-lBHXxQ-lSbmKPUgwm7V1HXFdBGh"
                alt="Marcus Vance enterprise network instructor portrait"
              />
              <div className="flex-1 min-w-0 font-mono text-xs">
                <div className="font-semibold text-white truncate">Marcus Vance</div>
                <div className="text-emerald-400 truncate flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Available for 1:1 Pod Screen Share</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEscalateModalOpen(true)}
              className="w-full mt-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white font-mono text-xs font-semibold transition border border-slate-700/60"
            >
              Request 1:1 Lab Escalation →
            </button>
          </div>

        </aside>

      </div>

      {/* Interactive Topology Modal */}
      {isTopologyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white font-mono">
                  Pod #04 • Full Interactive Network Blueprint
                </h3>
              </div>
              <button
                onClick={() => setIsTopologyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2">
              <img
                className="w-full h-96 object-contain rounded-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLfHzdTApuTxArMKry5pV1FNCDkKwDkoAnnehFULZdex6IYAhxsPs-bMmFI04_R3VznzzydfLVxZQ4uaQb-0TEDIlEEZIW49LtdijhsXUEyxUnUVDRETuBH_MYjd65nUr1FTQBfXOleQAbdAOw8BJiq-5JDMVvZntFEo2v0HtbF23bpQv4cYexOQlww3noLtcQyBh5RVItpAFC6Y4hP6Ip4y_hF5grCpdVvbqoHwMYjhsbqwpqh4f5"
                alt="Full Network Topology Diagram"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 uppercase">Core Node</div>
                <div className="text-white font-bold">R1-Core (Cisco CSR1000v)</div>
                <div className="text-emerald-400 text-[10px]">Gi0/0.10, Gi0/0.20 Subinterfaces</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 uppercase">Trunk Distribution</div>
                <div className="text-blue-400 font-bold">SW-Trunk (vIOS-L2)</div>
                <div className="text-amber-400 text-[10px]">VLAN 20 Missing STP Forwarding</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 uppercase">Access Layer</div>
                <div className="text-white font-bold">Edge-SW1 (Catalyst 2960)</div>
                <div className="text-emerald-400 text-[10px]">FastEthernet0/1-24 Access Ports</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setIsTopologyModalOpen(false);
                  setSelectedLabId('lab-vlan-trunking-01');
                  navigateTo('labs');
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow transition"
              >
                Launch Active Lab Terminal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Escalate to Instructor Modal */}
      {isEscalateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-mono">
                  Escalate to Instructor (Marcus Vance)
                </h3>
              </div>
              <button
                onClick={() => setIsEscalateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {escalated ? (
              <div className="text-center py-6 space-y-3 font-mono">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-white font-bold text-base">Screen Share Request Dispatched</h4>
                <p className="text-slate-400 text-xs font-sans">
                  Marcus Vance has been notified. When he joins Pod #04, a terminal split-screen invitation will appear on your dashboard.
                </p>
                <button
                  onClick={() => {
                    setIsEscalateModalOpen(false);
                    setEscalated(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
                >
                  Return to AI Tutor
                </button>
              </div>
            ) : (
              <div className="space-y-4 font-sans text-xs">
                <p className="text-slate-300">
                  Marcus will receive a snapshot of your current Pod #04 terminal output, Spanning Tree states, and this Socratic AI conversation thread.
                </p>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                  <div className="text-slate-500">Target Session: <span className="text-white">Pod #04 • SW-Trunk</span></div>
                  <div className="text-slate-500">Student: <span className="text-white">{user?.name || 'Alex Mercer'}</span></div>
                  <div className="text-slate-500">Objective: <span className="text-amber-400">VLAN 20 Trunk Forwarding</span></div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsEscalateModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEscalated(true)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold transition shadow"
                  >
                    Send 1:1 Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
