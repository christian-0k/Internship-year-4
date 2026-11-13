import React from 'react';
import {
  Sparkles,
  Play,
  Terminal,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Cpu,
  Network,
  CalendarCheck,
  ShieldAlert,
} from 'lucide-react';
import { CURRENT_USER, COURSES, LAB_SCENARIOS, VERIFIED_CERTIFICATES } from '../data/mockData';

interface Props {
  onNavigate: (tab: string) => void;
  onLaunchLab: (labId: string) => void;
}

export const LearnerDashboardPage: React.FC<Props> = ({ onNavigate, onLaunchLab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Welcome Banner with Next Best Action */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-950/90 relative overflow-hidden space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>STUDENT CODE: {CURRENT_USER.studentCode}</span>
              <span>·</span>
              <span className="text-emerald-400">STATUS: ACTIVE &amp; ON TRACK</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white">Welcome back, {CURRENT_USER.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Enrolled in Dual-Track: CompTIA A+ Core 1/2 &amp; Cisco CCNA 200-301 Certification Apprenticeship.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('courses')}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Play className="w-4 h-4" />
              <span>Resume Last Lesson</span>
            </button>
          </div>
        </div>

        {/* AI Next Best Action Recommendation Banner */}
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="font-semibold text-white">AI Recommended Next Task:</div>
              <p className="text-slate-300 text-[11px]">
                Complete &quot;Field Lab: Cat6 RJ-45 Modular Plug Termination (T568B)&quot; to strengthen your physical layer competency.
              </p>
            </div>
          </div>
          <button
            onClick={() => onLaunchLab('lab-cable-01')}
            className="px-3.5 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-xs whitespace-nowrap self-start sm:self-auto"
          >
            Launch Lab (15m)
          </button>
        </div>
      </div>

      {/* KPI Cards: SMS Attendance, GPA, Bench Hours, Cert Readiness */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'SMS Bench Attendance', value: '96.5%', desc: 'Classroom & QR check-ins', color: 'text-emerald-400' },
          { label: 'Weighted Gradebook GPA', value: '91.8%', desc: 'Quizzes + Labs + Exams', color: 'text-cyan-400' },
          { label: 'Physical Lab Bench Hours', value: '42 hrs', desc: 'Rack & Motherboard practice', color: 'text-amber-400' },
          { label: 'Exam Readiness Index', value: '88%', desc: 'CompTIA A+ & CCNA ready', color: 'text-purple-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-xl border border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">{kpi.label}</div>
            <div className={`text-2xl font-bold font-mono ${kpi.color}`}>{kpi.value}</div>
            <div className="text-[11px] text-slate-400">{kpi.desc}</div>
          </div>
        ))}
      </div>

      {/* Active Courses & Interactive Labs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Enrolled Courses (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Current Enrolled Courses</h3>
            <button onClick={() => onNavigate('courses')} className="text-xs text-cyan-400 hover:underline font-mono">
              Catalog
            </button>
          </div>

          <div className="space-y-3">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="glass-panel p-4 rounded-xl border border-white/10 space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-cyan-400 font-semibold">{course.certBadge}</span>
                    <span className="text-slate-400">· {course.lessons.length} Modules</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{course.title}</h4>
                  <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[65%]" />
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('courses')}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
                >
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Practical Assessment Sandboxes (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-white text-base">Quick Access Sandboxes</h3>
          <div className="space-y-2.5">
            {[
              { id: 'lab-hw-3d-01', title: '3D Motherboard Workbench', tag: 'CompTIA A+', type: 'hardware' },
              { id: 'lab-net-cli-01', title: 'Cisco IOS Switching Terminal', tag: 'CCNA 2.1', type: 'network' },
              { id: 'lab-cable-01', title: 'Cat6 RJ-45 Crimper & Tester', tag: 'Network+', type: 'cable' },
            ].map((lab) => (
              <div
                key={lab.id}
                onClick={() => onLaunchLab(lab.id)}
                className="p-3 rounded-xl glass-card-interactive border border-white/10 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">{lab.title}</div>
                    <div className="text-[10px] font-mono text-amber-400">{lab.tag}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
