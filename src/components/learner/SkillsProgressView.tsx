import React from 'react';
import { 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SkillsProgressView: React.FC = () => {
  const { navigateTo, user, setSelectedLabId } = useAuth();

  const skills = [
    { name: 'Hardware & Multimeter Diagnostics', level: 92, status: 'Mastered', color: 'from-emerald-500 to-emerald-400' },
    { name: 'OS Forensics & Registry Debugging', level: 78, status: 'Proficient', color: 'from-cyan-500 to-cyan-400' },
    { name: 'IPv4/IPv6 Binary Subnetting', level: 95, status: 'Mastered', color: 'from-emerald-500 to-emerald-400' },
    { name: 'Cisco IOS-XE 802.1Q VLAN Trunking', level: 86, status: 'Proficient', color: 'from-cyan-500 to-cyan-400' },
    { name: 'Multi-Area OSPF Routing Protocols', level: 72, status: 'Needs Review', color: 'from-amber-500 to-amber-400' },
    { name: 'Wireshark Packet Disassembly', level: 84, status: 'Proficient', color: 'from-cyan-500 to-cyan-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigateTo('dashboard')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              AI ADAPTIVE SKILL ENGINE
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Engineering Competency Radar & Cert Readiness
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Continuous diagnostic evaluation based on real CLI commands, terminal mistakes, and lab rubrics.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0 font-mono">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl font-black">
              {user?.certReadiness ?? 84}%
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">Overall Cert Score</span>
              <span className="text-xs font-bold text-white">CompTIA A+ / CCNA</span>
              <span className="text-[10px] text-emerald-400 block">
                {(user?.certReadiness ?? 84) >= 80 ? 'Exam Ready (98% Prob.)' : 'Review In Progress'}
              </span>
            </div>
          </div>
        </div>

        {/* Skills Competency Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs hover:border-slate-700 transition"
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">{skill.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  skill.status === 'Mastered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                  skill.status === 'Proficient' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' :
                  'bg-amber-950 text-amber-400 border border-amber-500/30'
                }`}>
                  {skill.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Proficiency:</span>
                  <span className="font-bold text-white">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Remediation Recommendation */}
        <div className="bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>Targeted AI Remediation Recommendation</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Reinforce OSPF Multi-Area Route Summarization & Virtual Links
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl font-sans">
              Our telemetry identified a 15% latency in your OSPF neighbor convergence drills. Completing this 12-minute troubleshooting scenario will boost your CCNA readiness past 90%.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedLabId('lab-ospf-multi-area');
              navigateTo('labs');
            }}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs transition flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/10"
          >
            <span>Launch Remediation Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
