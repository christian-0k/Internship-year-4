import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Subtitles, 
  Bot, 
  BookOpen, 
  Terminal, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Send, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CoursePlayerView: React.FC = () => {
  const { navigateTo, setSelectedLabId } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'ai_tutor'>('notes');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Hello! I am your Socratic AI Engineering Tutor. I'm actively monitoring this lesson on 802.1Q VLAN Trunking. If you're wondering how the 4-byte 802.1Q tag header is inserted into standard Ethernet frames, or why Native VLANs do not get tagged, ask me anytime!",
      time: '10:04 AM'
    }
  ]);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const userText = aiQuestion.trim();
    const newMsg = { sender: 'user' as const, text: userText, time: 'Now' };
    setAiMessages(prev => [...prev, newMsg]);
    setAiQuestion('');

    setTimeout(() => {
      let reply = "Great question! Remember: in 802.1Q trunking, the 4-byte tag includes a 12-bit VLAN Identifier (VID), allowing up to 4,094 distinct VLANs. When traffic belongs to the 'Native VLAN' (usually VLAN 1 by default), Cisco switches transmit it untagged. If Switch A has Native VLAN 1 and Switch B has Native VLAN 99, what do you predict happens to broadcast traffic?";
      if (userText.toLowerCase().includes('vlan')) {
        reply = "Consider how switches isolate broadcast domains. By default, all switchports belong to VLAN 1. When creating an 802.1Q trunk link between two switches, both switches must agree on the Native VLAN. What command in Cisco IOS verifies the native VLAN setting on an interface?";
      } else if (userText.toLowerCase().includes('tag') || userText.toLowerCase().includes('byte')) {
        reply = "The 802.1Q tag is inserted between the Source MAC address and the EtherType field. It contains a 16-bit TPID (0x8100) and a 16-bit TCI containing 3-bit Priority Code Point (PCP), 1-bit DEI, and the 12-bit VLAN ID.";
      }
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply, time: 'Now' }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between shrink-0 font-mono text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Dashboard</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
            Lesson 04: 802.1Q VLAN Tagging & Inter-Switch Trunk Links
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedLabId('lab-vlan-trunking-01');
              navigateTo('labs');
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition flex items-center gap-1.5 font-bold"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Launch Associated Lab</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Video Player (Left 65%) + Context Sidebar (Right 35%) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Video Player Section */}
        <div className="flex-1 bg-black flex flex-col justify-between p-4 sm:p-6 relative">
          
          {/* Simulated HLS Video Canvas */}
          <div className="flex-1 w-full bg-slate-950 rounded-2xl border border-slate-800/90 relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl">
            
            {/* Datacenter Switch Graphic & Waveform */}
            <div className="text-center space-y-4 max-w-lg">
              <div className="w-20 h-20 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/10">
                <Terminal className="w-10 h-10 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                  HLS STREAM 1080P // CCNA-OBJ-2.1
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  802.1Q Frame Encapsulation & Native VLAN Security
                </h2>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  Dr. Marcus Vance, CCIE #49120 • NetMentor Engineering Studio
                </p>
              </div>

              {/* Simulated Captions Box */}
              {showCaptions && (
                <div className="bg-black/90 border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-slate-200 font-mono inline-block">
                  [Instructor]: "Notice how omitting the 802.1Q tag on Native VLAN frames creates potential double-tagging security vulnerabilities if not guarded..."
                </div>
              )}
            </div>

            {/* Play/Pause Overlay indicator */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 w-full h-full flex items-center justify-center group bg-black/20 hover:bg-black/40 transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </div>
            </button>
          </div>

          {/* Video Controls Bar */}
          <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs font-mono text-slate-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 hover:text-white transition"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <span className="text-slate-400">08:42 / 16:30</span>
              <div className="w-32 sm:w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                <div className="w-1/2 h-full bg-cyan-500 rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`p-1.5 rounded transition ${showCaptions ? 'text-cyan-400 bg-cyan-950' : 'text-slate-400'}`}
                title="Captions CC"
              >
                <Subtitles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:text-white transition"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setLessonCompleted(true)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  lessonCompleted
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lessonCompleted ? 'Completed ✓' : 'Mark Completed'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel: Notes & Context-Aware Socratic AI Tutor */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/90 flex flex-col h-auto lg:h-[calc(100vh-3.5rem)]">
          
          {/* Tab Selector */}
          <div className="flex border-b border-slate-800 font-mono text-xs">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-3 text-center transition flex items-center justify-center gap-2 ${
                activeTab === 'notes'
                  ? 'border-b-2 border-cyan-400 text-white font-bold bg-slate-800/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lesson Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('ai_tutor')}
              className={`flex-1 py-3 text-center transition flex items-center justify-center gap-2 ${
                activeTab === 'ai_tutor'
                  ? 'border-b-2 border-cyan-400 text-white font-bold bg-slate-800/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Socratic AI Tutor</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'notes' ? (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-cyan-400 uppercase font-bold">Key CLI Syntax:</span>
                <div className="bg-slate-900 p-2 rounded text-slate-200">
                  Switch(config)# interface g0/1<br />
                  Switch(config-if)# switchport mode trunk<br />
                  Switch(config-if)# switchport trunk native vlan 99
                </div>
              </div>

              <div className="space-y-2 text-slate-300 leading-relaxed font-sans text-xs">
                <h4 className="font-bold text-white font-mono text-xs">802.1Q Header Breakdown:</h4>
                <p>• Tag Protocol Identifier (TPID): 2 bytes (0x8100)</p>
                <p>• Priority Code Point (PCP): 3 bits (QoS CoS)</p>
                <p>• Drop Eligible Indicator (DEI): 1 bit</p>
                <p>• VLAN Identifier (VID): 12 bits (Supports up to 4,094 VLANs)</p>
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-amber-200 text-xs">
                <span className="font-bold block mb-1">Warning (CDP Mismatch):</span>
                If adjacent switches configure mismatched Native VLANs, Cisco Discovery Protocol (CDP) throws continuous syslog warnings: <span className="font-mono text-[10px]">%CDP-4-NATIVE_VLAN_MISMATCH</span>.
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
              {/* Chat history */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {aiMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col space-y-1 ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-cyan-600 text-white rounded-br-none'
                          : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 px-1">
                      {msg.sender === 'user' ? 'You' : 'Socratic AI'} • {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleAskAi} className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question or request a hint..."
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
