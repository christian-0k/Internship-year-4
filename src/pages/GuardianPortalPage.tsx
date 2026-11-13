import React from 'react';
import { ShieldCheck, User, CalendarCheck, Award, AlertCircle, FileText, Download } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

export const GuardianPortalPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          SECURE GUARDIAN READ-ONLY PORTAL
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Sponsored Student Academic Record
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Monitoring student: <span className="font-semibold text-slate-900 dark:text-white">{CURRENT_USER.name}</span> (Code: {CURRENT_USER.studentCode})
        </p>
      </div>

      {/* Progress & Standing Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Physical Bench Attendance</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">96.5%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Classroom benchmark met (min 75%)</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Cumulative Grade Average</div>
          <div className="text-2xl font-bold font-mono text-cyan-700 dark:text-cyan-400">91.8%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Grade A (Honors Standing)</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Interactive Labs Completed</div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">18 / 22</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Hardware &amp; Cisco CLI modules</div>
        </div>
      </div>

      {/* Course Breakdown */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Certification Progression Breakdown</h3>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">CompTIA A+ Core 1 (220-1101)</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">3D Hardware Assembly, Motherboard VRMs, and Cat6 Termination</div>
            </div>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">100% Passed</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Cisco CCNA (200-301) Switching &amp; Routing</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">VLANs, 802.1Q Trunking, Subnetting, and Packet Decoding</div>
            </div>
            <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">78% In Progress</span>
          </div>
        </div>
      </div>

      {/* Download Official Transcript */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">Official Signed Academic Progress Transcript</div>
          <div className="text-slate-500 dark:text-slate-400 text-[11px]">HMAC Cryptographically Verified Record</div>
        </div>
        <button
          onClick={() => alert('Official academic progress report downloaded: Alex_Rivera_Transcript_2026.pdf')}
          className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 rounded-xl font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF Report</span>
        </button>
      </div>
    </div>
  );
};
