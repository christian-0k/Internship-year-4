import React, { useState } from 'react';
import { 
  Presentation, 
  BookOpen, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Plus, 
  ArrowRight, 
  FileText, 
  QrCode, 
  Bot, 
  Flame,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const InstructorDashboard: React.FC = () => {
  const { navigateTo } = useAuth();
  const [selectedQueueTab, setSelectedQueueTab] = useState<'labs' | 'escalations'>('labs');

  const pendingSubmissions = [
    {
      id: 'sub-8812',
      studentName: 'Alexandre Mercer',
      studentId: 'STU-LM-8821',
      labTitle: 'Multi-Area OSPFv2 Convergence Drill',
      submittedAt: '12 mins ago',
      autoScore: 85,
      status: 'Awaiting SME Sign-off',
      faultInjected: 'OSPF MTU Mismatch',
    },
    {
      id: 'sub-8813',
      studentName: 'Maya Lin',
      studentId: 'STU-RC-3042',
      labTitle: 'Cisco 2960 Inter-VLAN Routing (ROAS)',
      submittedAt: '34 mins ago',
      autoScore: 95,
      status: 'Ready for Review',
      faultInjected: 'Sub-interface Encapsulation',
    },
    {
      id: 'sub-8814',
      studentName: 'Devon Vance',
      studentId: 'STU-LM-9904',
      labTitle: 'Hardware ATX Power Rail Testing',
      submittedAt: '1 hr ago',
      autoScore: 60,
      status: 'At-Risk (Low Score)',
      faultInjected: '5V Standby Short Circuit',
    },
  ];

  const atRiskStudents = [
    {
      id: 'ar-1',
      name: 'Devon Vance',
      issue: '2 consecutive failed lab rubrics & attendance dropped to 68%',
      severity: 'CRITICAL',
      recommendedAction: 'Trigger Socratic Remediation Drill',
    },
    {
      id: 'ar-2',
      name: 'Jordan Hayes',
      issue: 'Zero terminal CLI activity for 5 consecutive days',
      severity: 'WARNING',
      recommendedAction: 'Send Cohort SMS Check-in',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 mb-2">
              <Presentation className="w-3.5 h-3.5" />
              SME CURRICULUM & GRADING CONTROL
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Instructor Command Dashboard
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Author YAML labs, review auto-graded submissions, and intervene on at-risk learner alerts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('teach_labs')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold font-mono text-xs hover:from-cyan-400 hover:to-emerald-400 transition flex items-center gap-2 shadow-lg shadow-cyan-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Create New YAML Lab</span>
            </button>
            <button
              onClick={() => navigateTo('teach_cohorts')}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 font-mono text-xs hover:text-white transition flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>QR Attendance</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Pending Grading Queue</span>
            <div className="text-2xl font-bold text-cyan-400">7 Submissions</div>
            <span className="text-[10px] text-slate-400">Average review latency: 18m</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">At-Risk Learners</span>
            <div className="text-2xl font-bold text-rose-400">2 Flagged</div>
            <span className="text-[10px] text-rose-400/80">Requires mentor intervention</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Active YAML Labs</span>
            <div className="text-2xl font-bold text-emerald-400">42 Topologies</div>
            <span className="text-[10px] text-slate-400">All topologies healthy</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">AI Escalations</span>
            <div className="text-2xl font-bold text-amber-400">3 Tickets</div>
            <span className="text-[10px] text-amber-400/80">Learner questions needing SME</span>
          </div>
        </div>

        {/* At-Risk Learner Alerts Banner */}
        <div className="bg-rose-950/30 border border-rose-500/30 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>At-Risk Student Alerts (SMS & Rubric Tripwires)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">2 Actions Required</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {atRiskStudents.map((st) => (
              <div
                key={st.id}
                className="bg-slate-950/80 border border-rose-500/20 rounded-2xl p-4 flex flex-col justify-between space-y-3 font-mono text-xs"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">{st.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-400 border border-rose-500/40 font-bold">
                      {st.severity}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-sans mt-1">
                    {st.issue}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                  <span className="text-cyan-400 text-[11px]">{st.recommendedAction}</span>
                  <button
                    onClick={() => alert(`Triggered intervention for ${st.name}`)}
                    className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-[11px]"
                  >
                    Intervene
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grading Queue Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">Grading & Evaluation Queue</span>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                Live Submissions
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setSelectedQueueTab('labs')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedQueueTab === 'labs'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Lab Submissions (3)
              </button>
              <button
                onClick={() => setSelectedQueueTab('escalations')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedQueueTab === 'escalations'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                AI Socratic Escalations (2)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800/80 uppercase text-[10px]">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Lab Title</th>
                  <th className="pb-3">Injected Fault</th>
                  <th className="pb-3">Auto Score</th>
                  <th className="pb-3">Submitted</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {pendingSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-950/40 transition">
                    <td className="py-3">
                      <div className="font-bold text-white">{sub.studentName}</div>
                      <div className="text-[10px] text-slate-500">{sub.studentId}</div>
                    </td>
                    <td className="py-3">{sub.labTitle}</td>
                    <td className="py-3 text-amber-400">{sub.faultInjected}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        sub.autoScore >= 80 ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'
                      }`}>
                        {sub.autoScore}%
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{sub.submittedAt}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => alert(`Reviewing submission ${sub.id}`)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition text-xs"
                      >
                        Grade & Sign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
