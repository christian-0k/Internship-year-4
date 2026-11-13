import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Terminal,
  Cpu,
  ChevronDown,
  Layers,
  ArrowRight,
  Wrench
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const LiveChatbot: React.FC = () => {
  const { user, currentView, navigateTo } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! I'm your NetOps AI Copilot. Whether you need assistance troubleshooting a Cisco IOS VLAN trunk, verifying motherboard power rails with a multimeter, or navigating your training tracks, I'm here 24/7 to help.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared. What IT maintenance or networking concept would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const handleSendMessage = async (textOverride?: string) => {
    const raw = textOverride || inputText;
    if (!raw.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: raw.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/live-chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: raw.trim(),
          history: messages.map(m => ({ sender: m.sender, text: m.text })),
          userRole: user?.role || 'Guest',
          currentView,
          userContext: {
            name: user?.name,
            email: user?.email,
            track: user?.track,
          }
        })
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I'm processing your inquiry. Could you provide a bit more detail on the specific switch command or hardware component?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ast-err-${Date.now()}`,
          sender: 'assistant',
          text: "I experienced a brief connection hiccup. For immediate hands-on practice, you can launch the interactive WebAssembly terminal in the Labs section!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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

  const quickMaintenanceScenarios = [
    { label: "Reset router configuration", prompt: "Scenario: Reset router configuration. How do I safely wipe untracked configs or perform a password recovery on a Cisco router while preserving running-config backups?" },
    { label: "Analyze port flap", prompt: "Scenario: Analyze port flap. Switchport Gi0/1 is experiencing intermittent carrier transitions. What Layer 1 and Layer 2 commands should I execute to isolate transceiver faults from duplex mismatches?" },
    { label: "Recover err-disabled port", prompt: "Scenario: Recover err-disabled port. An edge access port entered err-disabled state after a BPDU Guard violation. How do I clear the fault and set up auto-recovery?" },
    { label: "Diagnose MTU mismatch", prompt: "Scenario: Diagnose MTU mismatch. OSPF neighbor adjacency is stuck in EXSTART state between Area 0 routers. How do I verify interface MTU and resolve packet drops?" },
    { label: "Test ATX power rails", prompt: "Scenario: Test 24-Pin ATX power supply rails with a digital multimeter. A workstation fails to POST. How do I test +5VSB and bridge PS_ON# to verify DC voltages within ±5% tolerance?" }
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold rounded-full shadow-2xl shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 border border-white/20 group"
            aria-label="Open Live AI Chatbot"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950 animate-pulse"></span>
            </div>
            <span className="tracking-tight">Live AI Copilot</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-black font-sans">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Floating Live Chatbot Modal / Panel */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 md:inset-12 rounded-3xl'
              : 'bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] md:w-[440px] h-[600px] max-h-[85vh] rounded-2xl'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm tracking-tight truncate">
                    NetOps AI Copilot
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live 24/7
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate font-mono">
                  Context: <span className="text-cyan-400 capitalize">{user?.role || 'Guest'}</span> • {currentView}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-slate-400">
              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition hidden sm:inline-flex"
                title={isExpanded ? 'Restore window' : 'Maximize window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Jump Alert inside Chat */}
          <div className="px-4 py-2 bg-blue-950/40 border-b border-blue-500/20 flex items-center justify-between text-xs font-mono text-blue-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cisco CCNA & CompTIA A+ Grounded</span>
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                navigateTo(user?.role === 'student' ? 'tutor' : 'courses');
              }}
              className="text-[11px] text-cyan-400 hover:underline flex items-center gap-0.5 font-bold"
            >
              <span>{user?.role === 'student' ? 'Open Tutor Tab' : 'Browse Courses'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1 font-mono text-[10px] text-slate-500">
                    <span>{m.sender === 'user' ? (user?.name || 'You') : 'NetOps Copilot'}</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap break-words shadow-sm relative group ${
                      m.sender === 'user'
                        ? 'rounded-tr-none bg-blue-600 text-white'
                        : 'rounded-tl-none bg-slate-950 border border-slate-800 text-slate-200'
                    }`}
                  >
                    {m.text}

                    {m.sender === 'assistant' && (
                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition"
                        title="Copy message"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 font-mono text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl rounded-tl-none text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>NetOps Copilot is answering...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Action Maintenance Scenarios Bar */}
          <div className="px-3.5 py-2 bg-slate-950/80 border-t border-slate-800/90 flex items-center gap-1.5 overflow-x-auto no-scrollbar font-mono text-[11px]">
            <div className="flex items-center gap-1 text-cyan-400 shrink-0 font-bold uppercase text-[10px] mr-0.5">
              <Wrench className="w-3 h-3" />
              <span>Scenarios:</span>
            </div>
            {quickMaintenanceScenarios.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s.prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white whitespace-nowrap transition shrink-0 flex items-center gap-1 shadow-xs"
              >
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Input Box Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <div className="relative bg-slate-900 rounded-xl border border-slate-800 focus-within:border-blue-500 transition shadow-inner">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Cisco CLI commands, CompTIA A+ hardware, or portal navigation..."
                rows={2}
                className="w-full bg-transparent resize-none p-2.5 font-sans text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />

              <div className="flex items-center justify-between px-2.5 pb-2 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setInputText((prev) => `${prev}\n\`\`\`cisco\nshow ip interface brief\n\`\`\``);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition font-mono text-[10px] flex items-center gap-1"
                    title="Insert CLI snippet codeblock"
                  >
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">CLI Codeblock</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline font-mono text-[10px] text-slate-500">
                    Enter ↵
                  </span>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputText.trim()}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition flex items-center gap-1 shadow-md shadow-blue-600/30"
                  >
                    <span>Send</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
