import React, { useState } from 'react';
import { Bot, Send, Sparkles, AlertCircle, ShieldAlert, CheckCircle2, CornerDownRight } from 'lucide-react';

interface TutorMessage {
  sender: 'ai' | 'user';
  text: string;
  guardrailTag?: string;
}

const SAMPLE_PROMPTS = [
  {
    label: 'BSOD 0x0000007B',
    text: 'My Windows PC crashes during boot with Blue Screen 0x0000007B INACCESSIBLE_BOOT_DEVICE after changing motherboard settings.',
  },
  {
    label: 'Native VLAN Mismatch',
    text: 'Switch reports %CDP-4-NATIVE_VLAN_MISMATCH on Gig0/1 trunk and Spanning Tree is blocking the port. What is the cause?',
  },
  {
    label: 'Destructive Command',
    text: 'How do I run "erase startup-config" or "rm -rf /" to completely clean my production equipment?',
  },
];

export const MicroAiTutorDemo: React.FC = () => {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      sender: 'ai',
      text: "Hello! I am your NetPulse Socratic AI Tutor. Paste a CLI error, Windows Event code, or topology question. I won't give you cheat answers—I'll guide you through diagnostic deduction.",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal.trim();
    if (!query) return;

    const userMsg: TutorMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      let tag: string | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('erase startup-config') || lower.includes('rm -rf') || lower.includes('destructive')) {
        tag = 'SAFETY GUARDRAIL ENFORCED';
        response =
          'CRITICAL SAFETY REFUSAL: NetPulse AI Tutor refuses to assist with destructive erasure of production configs without verified change authorization.\n\nIn lab training, verify if you intended `reload` or inspecting `show running-config` instead. What specific state are you trying to test?';
      } else if (lower.includes('0x0000007b') || lower.includes('inaccessible_boot_device')) {
        tag = 'SOCRATIC DIAGNOSTIC HINT';
        response =
          'BSOD 0x7B occurs when the Windows bootloader cannot initialize storage drivers. Since this happened right after changing motherboard settings, ask yourself:\n\n1. Did the SATA Operation mode switch between AHCI, RAID/VMD, or IDE/Legacy?\n2. Did UEFI/CSM Boot order rearrange your NVMe drive priority?\n\nCheck your BIOS/UEFI Advanced Storage Configuration. What storage controller mode is currently selected?';
      } else if (lower.includes('vlan_mismatch') || lower.includes('native vlan') || lower.includes('cdp-4')) {
        tag = 'CCNA 802.1Q LOGIC';
        response =
          'Cisco 802.1Q trunks transmit Native VLAN traffic without an Ethernet tag (VID). If Switch-A expects untagged frames on VLAN 1, but Switch-B treats untagged frames as VLAN 99, frames will cross broadcast domains!\n\nTo diagnose this Socratically, what command would you run on both switches to inspect the active trunk parameters? Hint: starts with `show interface...`';
      } else {
        response = `Let's break down this symptom step-by-step. In IT troubleshooting (CompTIA 6-Step Method), before changing any cable or configuration, we always identify the symptom and question obvious causes.\n\nWhat did the system log or CLI show immediately before this occurred?`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: response, guardrailTag: tag }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
            <Bot className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
              <span>NetPulse AI Tutor Core</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                Gemini 3.8 / 4-Argon
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Socratic reasoning & guardrails enabled</div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 bg-slate-950/70 overflow-y-auto space-y-3 min-h-[260px] max-h-[360px] text-xs">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.guardrailTag && (
              <span className="text-[10px] font-mono text-amber-400 font-semibold mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                {msg.guardrailTag}
              </span>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 rounded-br-sm'
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-bl-sm whitespace-pre-wrap'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 italic">
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>AI Tutor analyzing diagnostic logs...</span>
          </div>
        )}
      </div>

      {/* Sample Scenario Buttons & Input */}
      <div className="p-3 bg-slate-900/90 border-t border-white/10 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[11px] text-slate-400 font-mono self-center mr-1">Try Error:</span>
          {SAMPLE_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.text)}
              className="px-2 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-[11px] text-slate-300 hover:text-cyan-300 rounded font-mono transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Paste CLI error, Event code, or ask diagnostic question..."
            className="flex-1 bg-slate-950/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs transition-colors disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
