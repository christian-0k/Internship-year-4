import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, AlertTriangle, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface CliHistoryItem {
  type: 'cmd' | 'output' | 'system';
  text: string;
}

export const MicroCiscoCli: React.FC = () => {
  const [history, setHistory] = useState<CliHistoryItem[]>([
    { type: 'system', text: 'Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4' },
    { type: 'system', text: 'Type "help" or "?" for available commands in this training sandbox.' },
    { type: 'output', text: '%LINK-3-UPDOWN: Interface GigabitEthernet0/1, changed state to up' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [prompt, setPrompt] = useState('Switch>');
  const [faultActive, setFaultActive] = useState(false);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    const newHistory: CliHistoryItem[] = [...history, { type: 'cmd', text: `${prompt} ${rawCmd}` }];
    const cmd = rawCmd.toLowerCase();

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'enable' || cmd === 'en') {
      setPrompt('Switch#');
      newHistory.push({ type: 'output', text: 'Entered privileged EXEC mode.' });
    } else if (cmd === 'disable') {
      setPrompt('Switch>');
      newHistory.push({ type: 'output', text: 'Returned to user EXEC mode.' });
    } else if (cmd === 'help' || cmd === '?') {
      newHistory.push({
        type: 'output',
        text: 'Available Commands:\n  enable                     Enter privileged EXEC mode\n  show ip interface brief    Display summary of IP interface status\n  show vlan brief            Display VLAN information\n  show running-config        Display active configuration\n  ping <ip>                  Send ICMP echo requests (e.g. ping 192.168.1.1)\n  configure terminal         Enter configuration mode\n  clear                      Clear terminal screen',
      });
    } else if (cmd.includes('show ip int') || cmd.includes('show ip interface brief')) {
      newHistory.push({
        type: 'output',
        text: `Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/1     unassigned      YES unset  up                    up\nGigabitEthernet0/2     unassigned      YES unset  ${faultActive ? 'down                  down' : 'up                    up'}\nGigabitEthernet0/3     unassigned      YES unset  up                    up\nVlan1                  192.168.1.10    YES manual up                    up`,
      });
    } else if (cmd.includes('show vlan') || cmd.includes('show vlan brief')) {
      newHistory.push({
        type: 'output',
        text: `VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Gig0/1, Gig0/4\n10   Engineering                      active    Gig0/2\n20   Finance                          active    Gig0/3`,
      });
    } else if (cmd.startsWith('ping')) {
      const target = rawCmd.split(' ')[1] || '192.168.1.1';
      newHistory.push({
        type: 'output',
        text: `Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`,
      });
    } else if (cmd === 'conf t' || cmd === 'configure terminal') {
      if (prompt === 'Switch#') {
        setPrompt('Switch(config)#');
        newHistory.push({ type: 'output', text: 'Enter configuration commands, one per line. End with CNTL/Z.' });
      } else {
        newHistory.push({ type: 'output', text: '% Command unrecognized or requires privileged EXEC mode ("enable").' });
      }
    } else if (cmd === 'exit' || cmd === 'end') {
      setPrompt('Switch#');
      newHistory.push({ type: 'output', text: 'Returned to privileged EXEC mode.' });
    } else if (cmd.includes('show run') || cmd.includes('show running-config')) {
      newHistory.push({
        type: 'output',
        text: `Building configuration...\n\nCurrent configuration : 1084 bytes\n!\nhostname Switch\n!\ninterface GigabitEthernet0/1\n switchport mode trunk\n switchport trunk native vlan ${faultActive ? '1' : '99'}\n!\ninterface GigabitEthernet0/2\n switchport access vlan 10\n switchport mode access\n!\nend`,
      });
    } else {
      newHistory.push({
        type: 'output',
        text: `% Invalid input detected at '^' marker. Type "help" for permitted commands.`,
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const triggerFault = () => {
    setFaultActive(true);
    setHistory((prev) => [
      ...prev,
      {
        type: 'system',
        text: '%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (1), with Core-SW Gig0/1 (99).',
      },
      {
        type: 'output',
        text: '%SPANTREE-2-BLOCK_PVID_LOCAL: Blocking GigabitEthernet0/1 on VLAN0001. Inconsistent local vlan.',
      },
    ]);
  };

  const resetSandbox = () => {
    setFaultActive(false);
    setPrompt('Switch>');
    setHistory([
      { type: 'system', text: 'Cisco IOS Software (C2960-LANBASEK9-M). Environment reset to baseline.' },
      { type: 'output', text: 'Type "enable" and "show ip interface brief" to begin.' },
    ]);
  };

  const quickCommands = ['enable', 'show ip int brief', 'show vlan brief', 'ping 192.168.1.1'];

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/50" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/50" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Catalyst-2960X // vty0 (Serial Console)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {faultActive ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              <AlertTriangle className="w-3 h-3 animate-pulse" />
              Fault Injected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3 h-3" />
              Operational
            </span>
          )}
          <button
            onClick={resetSandbox}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors"
            title="Reset Terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Window */}
      <div className="flex-1 p-4 bg-slate-950/90 font-mono text-xs sm:text-sm text-slate-200 overflow-y-auto space-y-2 select-text min-h-[260px] max-h-[380px]">
        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'cmd' && (
              <span className="text-cyan-400 font-semibold">{item.text}</span>
            )}
            {item.type === 'system' && (
              <span className="text-amber-400/90">{item.text}</span>
            )}
            {item.type === 'output' && (
              <pre className="text-slate-300 whitespace-pre-wrap font-mono mt-0.5">{item.text}</pre>
            )}
          </div>
        ))}
      </div>

      {/* Quick Action Chips & Input Form */}
      <div className="p-3 bg-slate-900/90 border-t border-white/10 space-y-2.5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider mr-1">Quick:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setInputVal(cmd);
              }}
              className="px-2 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 rounded text-xs font-mono transition-colors"
            >
              {cmd}
            </button>
          ))}
          <button
            onClick={triggerFault}
            disabled={faultActive}
            className="ml-auto px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 rounded text-xs font-mono transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Inject VLAN Fault
          </button>
        </div>

        <form onSubmit={handleCommand} className="flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-sm font-semibold select-none pl-1">
            {prompt}
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder='Type "help" or enter Cisco command...'
            className="flex-1 bg-slate-950/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-mono transition-colors flex items-center gap-1"
          >
            <Play className="w-3 h-3" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
