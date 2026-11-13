import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  QrCode,
  GraduationCap,
  CheckCircle2,
  Edit3,
  Bot,
  Sparkles,
  Send,
  Save,
  Check,
} from 'lucide-react';
import { INITIAL_STUDENTS_SMS } from '../data/mockData';
import { StudentSMSProfile } from '../types';

export const InstructorPortalPage: React.FC = () => {
  const [students, setStudents] = useState<StudentSMSProfile[]>(INITIAL_STUDENTS_SMS);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [overrideScore, setOverrideScore] = useState<number>(0);
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [qrCheckedIn, setQrCheckedIn] = useState<string[]>(['NP-2026-7721']);

  // AI Escalation Inbox
  const [escalations, setEscalations] = useState([
    {
      id: 'esc-1',
      student: 'Jordan Kross',
      question: 'Why does my trunk port reject Native VLAN 1 when Core SW is on Native VLAN 99?',
      aiAttempt: 'Explained 802.1Q untagged frame forwarding.',
      status: 'pending',
    },
  ]);
  const [instructorAnswer, setInstructorAnswer] = useState('');

  const handleOverrideSave = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, gradeAverage: overrideScore } : s))
    );
    setEditingStudentId(null);
    setOverrideReason('');
  };

  const simulateQrScan = (code: string) => {
    if (!qrCheckedIn.includes(code)) {
      setQrCheckedIn([...qrCheckedIn, code]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Instructor SME Console</div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Cohort Management &amp; Gradebook</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Active Cohort: Fall 2026 Alpha (14 Seats)</span>
        </div>
      </div>

      {/* At-Risk Student Alert Strip */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />
          <div>
            <div className="font-semibold text-amber-900 dark:text-amber-200">1 Student Flagged At-Risk: Jordan Kross</div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px]">
              Attendance dropped to 72% (&lt;75% threshold) and Lab 3 failed twice. Early intervention recommended.
            </p>
          </div>
        </div>
        <button
          onClick={() => alert('Automated intervention notification sent to student & guardian email: patricia.kross@parentnet.org')}
          className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-800 dark:text-amber-300 rounded-lg font-semibold text-xs whitespace-nowrap self-start sm:self-auto"
        >
          Send Intervention Alert
        </button>
      </div>

      {/* Spreadsheet-Style Gradebook Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Weighted Institutional Gradebook (FERPA Synced)
          </h3>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Weights: Quiz (20%), Lab (40%), Exam (30%), Attendance (10%)</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase text-[10px] bg-slate-100/60 dark:bg-slate-900/60">
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Student Code</th>
                <th className="py-2.5 px-3">Attendance</th>
                <th className="py-2.5 px-3">Quizzes (20%)</th>
                <th className="py-2.5 px-3">Labs (40%)</th>
                <th className="py-2.5 px-3">Final (30%)</th>
                <th className="py-2.5 px-3">Weighted Total</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {students.map((st) => (
                <tr key={st.studentId} className="hover:bg-slate-100/80 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-sans font-semibold text-slate-900 dark:text-white">
                    {st.name}
                    {st.status === 'at_risk' && (
                      <span className="ml-2 text-[9px] text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20">
                        AT RISK
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-cyan-700 dark:text-cyan-400">{st.studentCode}</td>
                  <td className="py-3 px-3">
                    <span className={st.attendanceRate < 75 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-700 dark:text-slate-200'}>
                      {st.attendanceRate}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{st.quizzesAverage}%</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{st.labsAverage}%</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{st.finalExamGrade}%</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white text-sm">{st.gradeAverage}%</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setEditingStudentId(st.studentId);
                        setOverrideScore(st.gradeAverage);
                      }}
                      className="px-2 py-1 bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 rounded border border-slate-200 dark:border-white/10 text-[11px] transition-colors"
                    >
                      Override
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Audit-Logged Override Modal Form */}
        {editingStudentId && (
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-cyan-500/30 space-y-3">
            <div className="font-semibold text-xs text-cyan-800 dark:text-cyan-300">
              Manual Grade Override for {students.find((s) => s.studentId === editingStudentId)?.name}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-medium">New Weighted Total Score (%)</label>
                <input
                  type="number"
                  value={overrideScore}
                  onChange={(e) => setOverrideScore(Number(e.target.value))}
                  className="w-full glass-input rounded-lg px-3 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-medium">FERPA Audit Reason</label>
                <input
                  type="text"
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  placeholder="e.g. Granted partial credit on physical cable retake."
                  className="w-full glass-input rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setEditingStudentId(null)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleOverrideSave(editingStudentId)}
                className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save with Audit Log</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR Bench Attendance & AI Escalation Inbox Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* QR Physical Bench Check-in */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <QrCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Physical Bench Attendance Scanner
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Bench 01–12 Active</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Learners scan the QR tag affixed to their physical lab workstation bench to automatically record attendance into SMS.
          </p>

          <div className="space-y-2">
            {students.map((st) => {
              const isPresent = qrCheckedIn.includes(st.studentCode);
              return (
                <div
                  key={st.studentId}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">{st.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] ml-2">({st.studentCode})</span>
                  </div>
                  {isPresent ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                      <Check className="w-3.5 h-3.5" />
                      Bench #04 Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => simulateQrScan(st.studentCode)}
                      className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-700 dark:text-cyan-300 rounded font-mono text-[11px] transition-colors"
                    >
                      Simulate Scan
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Escalation Inbox: Train AI */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              AI Tutor Escalation Inbox
            </h3>
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">1 Escalation Pending</span>
          </div>

          {escalations.map((esc) => (
            <div key={esc.id} className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white">{esc.student}</span>
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  Needs Instructor Review
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic text-[11px]">&quot;{esc.question}&quot;</p>

              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Provide Instructor Explanation &amp; Train AI:
                </label>
                <textarea
                  rows={2}
                  value={instructorAnswer}
                  onChange={(e) => setInstructorAnswer(e.target.value)}
                  placeholder="Explain CDP native VLAN tagging rules..."
                  className="w-full glass-input rounded-lg p-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <button
                onClick={() => {
                  alert('Answer sent to student and added to NetPulse RAG knowledge base!');
                  setEscalations([]);
                }}
                className="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Send to Student &amp; Train AI Tutor</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
