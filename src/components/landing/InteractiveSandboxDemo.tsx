import React, { useState } from 'react';
import { Terminal as TerminalIcon, Network, Cpu, Play, RefreshCw, Send, CheckCircle2, AlertTriangle, Shield, Server, Laptop, HardDrive } from 'lucide-react';
import { LAB_TOPOLOGY_NODES, TERMINAL_PRESETS } from '../../data/platformData';
import { TopologyNode } from '../../types';

interface InteractiveSandboxDemoProps {
  onOpenEnrollModal: (track?: string) => void;
}

export const InteractiveSandboxDemo: React.FC<InteractiveSandboxDemoProps> = ({
  onOpenEnrollModal,
}) => {
  const [activeMode, setActiveMode] = useState<'cli' | 'topology' | 'hardware'>('cli');
  
  // CLI Terminal State
  const [inputCommand, setInputCommand] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([
    {
      command: 'show ip interface brief',
      output: TERMINAL_PRESETS[1].response,
    },
  ]);

  // Topology State
  const [selectedNode, setSelectedNode] = useState<TopologyNode>(LAB_TOPOLOGY_NODES[1]);
  const [packetSimRunning, setPacketSimRunning] = useState(false);
  const [packetSimResult, setPacketSimResult] = useState<string | null>(null);

  // Hardware State
  const [hardwareTestRunning, setHardwareTestRunning] = useState(false);
  const [hardwareDiagnostics, setHardwareDiagnostics] = useState<{
    tested: boolean;
    psu12v: number;
    psu5v: number;
    psu33v: number;
    cpuTemp: number;
    ramChannels: string;
    postCode: string;
  }>({
    tested: false,
    psu12v: 12.04,
    psu5v: 5.02,
    psu33v: 3.31,
    cpuTemp: 41.5,
    ramChannels: 'Quad-Channel DDR5 @ 4800MHz (64GB Total) - OK',
    postCode: '0x00 - Normal Boot',
  });

  const handleRunCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    const matchedPreset = TERMINAL_PRESETS.find(
      (p) => p.command.toLowerCase() === trimmed.toLowerCase()
    );

    let output = '';
    if (matchedPreset) {
      output = matchedPreset.response;
    } else if (trimmed.toLowerCase() === 'help') {
      output = `NetForge Lab Shell v2.4 (Virtual IOS & Linux Subsystem)
Available commands:
  - ping <ip>                  : Send ICMP echo requests to destination
  - show ip interface brief    : List network interface IP and status
  - show vlan brief            : Display active 802.1Q VLAN assignments
  - diagnose hardware psu      : Inspect power rails and thermal telemetry
  - clear                      : Clear screen buffer
  - help                       : Show this manual`;
    } else if (trimmed.toLowerCase() === 'clear') {
      setTerminalHistory([]);
      setInputCommand('');
      return;
    } else if (trimmed.toLowerCase().startsWith('ping')) {
      const target = trimmed.split(' ')[1] || '10.0.1.1';
      output = `PING ${target} (${target}) 56(84) bytes of data.
64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.421 ms
64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.380 ms
64 bytes from ${target}: icmp_seq=3 ttl=64 time=0.404 ms
--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms`;
    } else {
      output = `% Unknown command or syntax error: "${trimmed}". Type "help" or select a preset below to test.`;
    }

    setTerminalHistory((prev) => [...prev, { command: trimmed, output }]);
    setInputCommand('');
  };

  const handleSimulatePacketFlow = () => {
    setPacketSimRunning(true);
    setPacketSimResult(null);
    setTimeout(() => {
      setPacketSimRunning(false);
      setPacketSimResult(
        `[TRAFFIC BURST] Routed 1,200 ICMP & TCP SYN packets from NOC Admin Workstation -> Core Switch -> Perimeter Firewall. Latency: 0.41ms avg. 0 dropped.`
      );
    }, 900);
  };

  const handleRunHardwareDiagnostic = () => {
    setHardwareTestRunning(true);
    setTimeout(() => {
      setHardwareTestRunning(false);
      setHardwareDiagnostics({
        tested: true,
        psu12v: 12.02 + Math.floor(Math.random() * 5) / 100,
        psu5v: 5.01 + Math.floor(Math.random() * 3) / 100,
        psu33v: 3.30 + Math.floor(Math.random() * 3) / 100,
        cpuTemp: 42.8,
        ramChannels: 'Quad-Channel DDR5 (64GB) - All 4 DIMMs Validated',
        postCode: '0x7F - Bus Enumeration Clear',
      });
    }, 800);
  };

  const getNodeIcon = (type: TopologyNode['type']) => {
    switch (type) {
      case 'router':
        return <Network className="w-5 h-5" />;
      case 'firewall':
        return <Shield className="w-5 h-5" />;
      case 'switch':
        return <Server className="w-5 h-5" />;
      case 'server':
        return <HardDrive className="w-5 h-5" />;
      case 'client':
        return <Laptop className="w-5 h-5" />;
    }
  };

  return (
    <section id="sandbox" className="py-16 md:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wide uppercase text-cyan-600 dark:text-cyan-400 mb-2">
              Interactive Live Sandbox Preview
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
              Test Real Commands & Inspect Topologies in Your Browser
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              No login required to try this preview. Toggle between our live CLI emulator, interactive spine-leaf node map, and hardware multimeter diagnostics.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveMode('cli')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeMode === 'cli'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Router CLI</span>
            </button>
            <button
              onClick={() => setActiveMode('topology')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeMode === 'topology'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Spine-Leaf Topology</span>
            </button>
            <button
              onClick={() => setActiveMode('hardware')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeMode === 'hardware'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Hardware Workbench</span>
            </button>
          </div>
        </div>

        {/* Sandbox Console Container */}
        <div className="rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-950 text-slate-200 shadow-2xl overflow-hidden">
          {/* Top Bar of Sandbox */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-slate-400 border-l border-slate-700 pl-3">
                sandbox@netforge-lab-node-01: ~
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-slate-400">
              <span>Environment: Ubuntu 24.04 LTS / Cisco IOS 15.6</span>
              <span className="text-emerald-400 font-semibold">Active Session</span>
            </div>
          </div>

          {/* Sandbox Body Content */}
          <div className="p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
            {/* MODE 1: ROUTER CLI TERMINAL */}
            {activeMode === 'cli' && (
              <div className="space-y-4 flex flex-col justify-between h-full">
                {/* Scrollable Output Terminal */}
                <div className="space-y-3 font-mono text-xs sm:text-sm overflow-y-auto max-h-[300px] pr-2">
                  <div className="text-slate-400">
                    NetForge Cisco IOS & Linux Sandbox Environment initialized.
                    <br />
                    Type commands or click quick-run presets below to inspect live routing tables and voltages.
                  </div>

                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                        <span className="text-slate-500">Router#</span>
                        <span>{item.command}</span>
                      </div>
                      <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs bg-slate-900/60 p-2.5 rounded border border-slate-800/80 font-mono">
                        {item.output}
                      </pre>
                    </div>
                  ))}
                </div>

                {/* Preset Clickable Commands */}
                <div className="pt-3 border-t border-slate-800">
                  <div className="text-xs text-slate-400 mb-2 font-sans font-medium flex items-center justify-between">
                    <span>Quick Interactive Presets (click to execute):</span>
                    <button
                      onClick={() => setTerminalHistory([])}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      Clear Terminal
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TERMINAL_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleRunCommand(preset.command)}
                        className="px-2.5 py-1 text-xs font-mono bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-slate-700 rounded transition-colors whitespace-nowrap"
                      >
                        {preset.command}
                      </button>
                    ))}
                  </div>

                  {/* Manual Command Input */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRunCommand(inputCommand);
                    }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-500">
                        Router#
                      </span>
                      <input
                        type="text"
                        value={inputCommand}
                        onChange={(e) => setInputCommand(e.target.value)}
                        placeholder="Type 'help', 'ping 10.0.1.1', or 'show vlan brief'..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-20 pr-4 py-2.5 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <span>Execute</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* MODE 2: TOPOLOGY VISUALIZER */}
            {activeMode === 'topology' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Click any network node to inspect live interfaces, IP allocation, and traffic saturation:
                  </div>
                  <button
                    onClick={handleSimulatePacketFlow}
                    disabled={packetSimRunning}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${packetSimRunning ? 'animate-spin' : ''}`} />
                    <span>{packetSimRunning ? 'Injecting Packets...' : 'Simulate Packet Flood'}</span>
                  </button>
                </div>

                {/* Nodes Grid Canvas */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {LAB_TOPOLOGY_NODES.map((node) => {
                    const isSelected = selectedNode.id === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-1.5 rounded ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                            {getNodeIcon(node.type)}
                          </div>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            node.status === 'healthy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {node.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="font-semibold text-xs text-white truncate">{node.name}</div>
                        <div className="text-[11px] font-mono text-cyan-400 mt-1">{node.ip}</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                          <span>VLAN {node.vlan}</span>
                          <span className="font-mono text-slate-300">{node.traffic}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Deep Inspection Panel */}
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Inspecting Node: {selectedNode.name}
                    </span>
                    <span className="font-mono text-cyan-400">{selectedNode.ip}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 text-[10px] block">DEVICE TYPE</span>
                      <span className="font-medium uppercase">{selectedNode.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">VLAN ALLOCATION</span>
                      <span className="font-mono text-white">VLAN {selectedNode.vlan} (Tagged)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">CURRENT BANDWIDTH</span>
                      <span className="font-mono text-cyan-300">{selectedNode.traffic}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">LINK STATUS</span>
                      <span className="font-semibold text-emerald-400">Negotiated 10G-LR</span>
                    </div>
                  </div>

                  {packetSimResult && (
                    <div className="mt-2 p-2 rounded bg-cyan-950/40 border border-cyan-800/60 text-xs font-mono text-cyan-300">
                      {packetSimResult}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 3: HARDWARE WORKBENCH */}
            {activeMode === 'hardware' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Virtual Multimeter & Motherboard POST Diagnostic Probe:
                  </div>
                  <button
                    onClick={handleRunHardwareDiagnostic}
                    disabled={hardwareTestRunning}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${hardwareTestRunning ? 'animate-spin' : ''}`} />
                    <span>{hardwareTestRunning ? 'Probing Rails...' : 'Execute Rail Voltage Probe'}</span>
                  </button>
                </div>

                {/* Digital Multimeter & POST Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Digital Multimeter Box */}
                  <div className="rounded-lg bg-amber-950/20 border border-amber-800/40 p-4 space-y-3">
                    <div className="text-xs font-semibold text-amber-400 flex items-center justify-between">
                      <span>VIRTUAL MULTIMETER PROBE</span>
                      <span className="text-[10px] text-amber-500 font-mono">CALIBRATED</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded border border-slate-800 text-center">
                      <span className="text-3xl font-mono font-bold text-amber-300 tabular-nums">
                        {hardwareDiagnostics.psu12v.toFixed(2)} V
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">+12.0V ATX Power Rail Check</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">+5.0V Rail:</span>
                        <span className="text-white">{hardwareDiagnostics.psu5v.toFixed(2)} V [NOMINAL]</span>
                      </div>
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">+3.3V Standby:</span>
                        <span className="text-white">{hardwareDiagnostics.psu33v.toFixed(2)} V [NOMINAL]</span>
                      </div>
                    </div>
                  </div>

                  {/* Motherboard POST Hex Engine */}
                  <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-3">
                    <div className="text-xs font-semibold text-cyan-400 flex items-center justify-between">
                      <span>2-DIGIT 7-SEGMENT POST CODE</span>
                      <span className="text-[10px] text-emerald-400 font-mono">OK</span>
                    </div>

                    <div className="p-3 bg-black rounded border border-slate-800 text-center flex items-center justify-center gap-3">
                      <span className="text-4xl font-mono font-extrabold text-red-500 tracking-wider">
                        {hardwareDiagnostics.postCode.slice(2, 4)}
                      </span>
                      <div className="text-left text-[11px] text-slate-300 font-mono">
                        <div>STATUS: NORMAL</div>
                        <div className="text-slate-500 text-[10px]">BIOS Handshake passed</div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div className="text-slate-400 text-[10px]">MEMORY BUS TEST</div>
                      <div className="font-mono text-cyan-300 text-[11px] truncate">
                        {hardwareDiagnostics.ramChannels}
                      </div>
                    </div>
                  </div>

                  {/* Thermals & Chassis Status */}
                  <div className="rounded-lg bg-slate-900 border border-slate-800 p-4 space-y-3">
                    <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                      <span>CHASSIS THERMAL MATRIX</span>
                      <span className="text-[10px] text-cyan-400 font-mono">TACHOMETER ACTIVE</span>
                    </div>

                    <div className="space-y-2 pt-1 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>CPU Socket Die Temp</span>
                        <span className="font-mono font-bold text-white tabular-nums">{hardwareDiagnostics.cpuTemp}°C</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[42%]"></div>
                      </div>

                      <div className="flex items-center justify-between text-slate-300 pt-1">
                        <span>Chassis Intake Fans</span>
                        <span className="font-mono text-white tabular-nums">2,840 RPM</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>PCIe Gen5 Slot Status</span>
                        <span className="font-mono text-emerald-400 text-[11px]">x16 Negotiated</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Simulated hardware fault injection available in full student account.</span>
                  <button
                    onClick={() => onOpenEnrollModal('hardware')}
                    className="text-cyan-400 hover:underline font-semibold"
                  >
                    Unlock Full Workbench →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sandbox Footer CTA Strip */}
          <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300 text-center sm:text-left">
              Want access to the complete library of 140+ hands-on hardware and networking labs?
            </div>
            <button
              onClick={() => onOpenEnrollModal()}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Start Free Full Lab Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
