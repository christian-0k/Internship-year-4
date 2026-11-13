import React, { useState } from 'react';
import { Building2, Users, CreditCard, TrendingUp, Mail, Plus, CheckCircle2, Download } from 'lucide-react';

export const OrgPortalPage: React.FC = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteTrack, setInviteTrack] = useState('dual');
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Marcus Bradley', email: 'mbradley@apexcorp.com', track: 'Dual Track', progress: '92%', certStatus: 'CCNA Certified' },
    { name: 'Diana Prince', email: 'dprince@apexcorp.com', track: 'Hardware (A+)', progress: '78%', certStatus: 'In Progress' },
    { name: 'Carlos Mendez', email: 'cmendez@apexcorp.com', track: 'Networking (CCNA)', progress: '85%', certStatus: 'Ready for Exam' },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setTeamMembers([
      ...teamMembers,
      {
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        track: inviteTrack === 'dual' ? 'Dual Track' : 'Hardware (A+)',
        progress: '0%',
        certStatus: 'Invited',
      },
    ]);
    setInviteEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Enterprise Workforce Portal</div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Apex IT Solutions Training ROI</h1>
        </div>
        <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
          <span className="text-cyan-700 dark:text-cyan-400 font-bold">14 / 20</span> Seats Allocated
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Team Certification Pass Rate', value: '94.2%', desc: '+28% above industry average', color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Hours of Hands-On Bench Practice', value: '380 hrs', desc: 'Across 14 active technicians', color: 'text-cyan-700 dark:text-cyan-400' },
          { label: 'Active Seat Licenses', value: '14 Active', desc: '6 seats available to assign', color: 'text-purple-700 dark:text-purple-400' },
        ].map((m, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">{m.label}</div>
            <div className={`text-2xl font-bold font-mono ${m.color}`}>{m.value}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Team Management & Invite Form */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Enrolled Team Members &amp; Credentials
          </h3>

          {/* Quick Invite Form */}
          <form onSubmit={handleInvite} className="flex items-center gap-2 text-xs">
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="technician@company.com"
              className="glass-input rounded-lg px-3 py-1.5 w-56 text-xs text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Assign Seat</span>
            </button>
          </form>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase text-[10px] bg-slate-100/60 dark:bg-slate-900/60">
                <th className="py-2.5 px-3">Technician</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Assigned Track</th>
                <th className="py-2.5 px-3">Curriculum Progress</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {teamMembers.map((tm, idx) => (
                <tr key={idx} className="hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-sans font-semibold text-slate-900 dark:text-white">{tm.name}</td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{tm.email}</td>
                  <td className="py-3 px-3 text-cyan-700 dark:text-cyan-300">{tm.track}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 h-full"
                          style={{ width: tm.progress }}
                        />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{tm.progress}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                      {tm.certStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stripe Invoicing Strip */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-300">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm">Automated Stripe Invoicing Active</div>
            <div className="text-slate-500 dark:text-slate-400 text-[11px]">
              Next billing date: November 15, 2026 · Invoice #INV-2026-9021 ($2,800.00 / mo)
            </div>
          </div>
        </div>

        <button
          onClick={() => alert('Downloaded PDF Receipt: INV-2026-9021.pdf')}
          className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 rounded-xl font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Official Invoice Receipt</span>
        </button>
      </div>
    </div>
  );
};
