import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Network, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Bot, 
  TrendingUp, 
  FileText,
  LayoutDashboard,
  BrainCircuit
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { AITutorView } from '../learner/AITutorView';

interface StudentDashboardProps {
  initialTab?: 'overview' | 'tutor';
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ initialTab = 'overview' }) => {
  const { user, navigateTo, setSelectedLabId, currentView } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'tutor'>(
    currentView === 'tutor' ? 'tutor' : initialTab
  );

  useEffect(() => {
    if (currentView === 'tutor') {
      setActiveTab('tutor');
    }
  }, [currentView]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner & Next Best Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('portal.studentTitle')} // ACTIVE SESSION
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Welcome Back, {user?.name || 'Alexandre Mercer'}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-mono">
              Enrolled Track: <span className="text-cyan-400 font-bold uppercase">{user?.track || 'DUAL SPECIALIZATION'}</span> • Cohort US-EAST-SPON-4410
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setSelectedLabId('lab-vlan-trunking-01');
                navigateTo('labs');
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:from-emerald-400 hover:to-cyan-400 transition flex items-center gap-2 shadow-lg shadow-emerald-500/10"
            >
              <Terminal className="w-4 h-4" />
              <span>Resume Last Lab (Trunking 01)</span>
            </button>
            <button
              onClick={() => navigateTo('learn')}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white transition flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>Continue Video Player</span>
            </button>
          </div>
        </div>

        {/* Embedded Portal Tabs Switcher */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1 flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('tutor')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'tutor'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
              <span>Socratic AI Tutor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-slate-500">Active Lab Target:</span>
            <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              Pod #04 (SW-Trunk vIOS)
            </span>
          </div>
        </div>

        {/* Tab View Condition */}
        {activeTab === 'tutor' ? (
          <AITutorView />
        ) : (
          <div className="space-y-8">

        {/* AI "Next Best Action" Recommendation Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Socratic AI Copilot • Next Best Action</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Resolve Native VLAN Mismatch on Cisco Catalyst 2960
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
              Based on your last quiz assessment, you demonstrated 95% proficiency in IPv4 subnetting. Your next optimal growth milestone is troubleshooting 802.1Q Native VLAN encapsulation in our WebAssembly terminal.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => setActiveTab('tutor')}
              className="px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold font-mono text-xs transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
              <span>Ask AI Tutor</span>
            </button>
            <button
              onClick={() => {
                setSelectedLabId('lab-vlan-trunking-01');
                navigateTo('labs');
              }}
              className="px-5 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>Launch Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Portal Jump Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
          
          <button
            onClick={() => setActiveTab('tutor')}
            className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-500/40 hover:border-blue-400 text-left transition space-y-3 group shadow-lg shadow-blue-950/30"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-900/80 border border-blue-400/50 text-blue-300 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="text-white font-bold text-sm group-hover:text-blue-300 transition-colors flex items-center justify-between">
                <span>AI Tutor</span>
                <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
              </div>
              <div className="text-slate-400 text-[11px] font-sans mt-0.5">Socratic network & HW mentor</div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('learn')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-left transition space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm group-hover:text-cyan-300 transition-colors">Course Player</div>
              <div className="text-slate-400 text-[11px] font-sans mt-0.5">HLS video with Socratic AI side-panel</div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedLabId('lab-vlan-trunking-01');
              navigateTo('labs');
            }}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-left transition space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors">WASM CLI Labs</div>
              <div className="text-slate-400 text-[11px] font-sans mt-0.5">14 Cleared • 14 In Progress</div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('quiz')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-left transition space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors">Adaptive Quiz Engine</div>
              <div className="text-slate-400 text-[11px] font-sans mt-0.5">CompTIA A+ & CCNA drill bank</div>
            </div>
          </button>

          <button
            onClick={() => navigateTo('progress')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-left transition space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors">Skills Radar & Certs</div>
              <div className="text-slate-400 text-[11px] font-sans mt-0.5">84% Readiness Score</div>
            </div>
          </button>

        </div>

        {/* Academic Standing & SMS Alert Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-sm">Active Lab Progress by Objective</span>
              <span className="text-emerald-400">50% Curriculum Cleared</span>
            </div>

            <div className="space-y-3">
              {[
                { title: '802.1Q Trunking & Native VLAN Recovery', progress: 100, status: 'PASSED (95%)', date: 'Yesterday' },
                { title: 'Multi-Area OSPFv2 Neighbor Adjacency', progress: 75, status: 'IN PROGRESS', date: '2 days ago' },
                { title: 'Motherboard 24-Pin Multimeter Rail Check', progress: 100, status: 'PASSED (100%)', date: 'May 10' },
                { title: 'Windows Crash DMP Forensics with WinDbg', progress: 40, status: 'QUEUED', date: 'Next Up' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-white font-medium">{item.title}</div>
                    <div className="text-[10px] text-slate-500">{item.date}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status.includes('PASSED') ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                      item.status.includes('PROGRESS') ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SMS & Sponsor Standing Capsule */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-slate-400 uppercase text-[10px] block">
                SMS Attendance Standing
              </span>
              <div className="text-3xl font-black text-emerald-400">96.4%</div>
              <p className="text-slate-400 font-sans text-xs leading-relaxed">
                You have attended 24 of 25 live lab checkpoints. Your sponsor (Lockheed Martin) requires maintaining &gt;70%.
              </p>
            </div>

            <button
              onClick={() => navigateTo('profile')}
              className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-cyan-400 font-bold transition text-center"
            >
              View Full Apprentice Profile & Transcripts →
            </button>
          </div>

        </div>
        </div>
        )}

      </div>
    </div>
  );
};
