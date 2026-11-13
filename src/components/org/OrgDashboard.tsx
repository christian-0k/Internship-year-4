import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  CreditCard, 
  FileText, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  UserCheck, 
  UserX,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  enrolledTrack: string;
  progressPercent: number;
  certReadiness: string;
  status: 'ACTIVE' | 'AT_RISK' | 'INVITED';
}

export const OrgDashboard: React.FC = () => {
  const { navigateTo } = useAuth();
  const [searchMember, setSearchMember] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 'tm-1', name: 'Alexandre Mercer', email: 'alexandre.m@nexusglobal.com', role: 'NOC Tier 1', enrolledTrack: 'Cisco CCNA', progressPercent: 78, certReadiness: '88% (High)', status: 'ACTIVE' },
    { id: 'tm-2', name: 'Maya Lin', email: 'm.lin@nexusglobal.com', role: 'Desktop Support Tech', enrolledTrack: 'CompTIA A+', progressPercent: 84, certReadiness: '92% (Ready)', status: 'ACTIVE' },
    { id: 'tm-3', name: 'Devon Vance', email: 'd.vance@nexusglobal.com', role: 'Junior Sysadmin', enrolledTrack: 'Linux LPIC-1', progressPercent: 42, certReadiness: '54% (At-Risk)', status: 'AT_RISK' },
    { id: 'tm-4', name: 'Elena Rostova', email: 'e.rostova@nexusglobal.com', role: 'Field Technician', enrolledTrack: 'Dual Specialization', progressPercent: 94, certReadiness: '96% (Passed)', status: 'ACTIVE' },
    { id: 'tm-5', name: 'Jordan Hayes', email: 'j.hayes@nexusglobal.com', role: 'Support Analyst', enrolledTrack: 'CompTIA Network+', progressPercent: 12, certReadiness: '20% (Stalled)', status: 'AT_RISK' },
  ]);

  const filteredMembers = teamMembers.filter(m => 
    m.name.toLowerCase().includes(searchMember.toLowerCase()) || 
    m.email.toLowerCase().includes(searchMember.toLowerCase())
  );

  const handleRevoke = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      role: 'IT Support Engineer',
      enrolledTrack: 'Dual Specialization',
      progressPercent: 0,
      certReadiness: 'Pending',
      status: 'INVITED',
    };
    setTeamMembers(prev => [...prev, newMember]);
    setInviteEmail('');
    setInviteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-950/60 border border-purple-500/40 text-purple-400 mb-2">
              <Building2 className="w-3.5 h-3.5" />
              ENTERPRISE B2B WORKFORCE PORTAL // NEXUS GLOBAL IT
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Organization Training & Seat Management
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Monitor enterprise cohort pass rates, assign and revoke employee seats, and synchronize with Okta SCIM.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setInviteModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-slate-950 font-bold hover:from-purple-400 hover:to-cyan-400 transition flex items-center gap-2 shadow-lg shadow-purple-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Assign New Team Seat</span>
            </button>
            <button
              onClick={() => alert('Exporting team performance CSV audit report...')}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Executive Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Seat License Utilization</span>
            <div className="text-2xl font-bold text-white">42 / 50 <span className="text-xs font-normal text-slate-400">Seats</span></div>
            <span className="text-[10px] text-emerald-400">84% Capacity Allocated</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Team First-Attempt Pass Rate</span>
            <div className="text-2xl font-bold text-emerald-400">94.2%</div>
            <span className="text-[10px] text-slate-400">CompTIA A+ & CCNA Benchmark</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Okta SCIM Sync Status</span>
            <div className="text-2xl font-bold text-cyan-400">ACTIVE</div>
            <span className="text-[10px] text-slate-400">Last heartbeat: 4 mins ago</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Current Monthly Invoicing</span>
            <div className="text-2xl font-bold text-white">$4,250 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
            <span className="text-[10px] text-purple-400">Prorated billing active</span>
          </div>
        </div>

        {/* Team Members Seat Management Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white text-base">Enrolled Technicians Directory</span>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search team member..."
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800/80 uppercase text-[10px]">
                  <th className="pb-3">Engineer Name</th>
                  <th className="pb-3">Title / Job Role</th>
                  <th className="pb-3">Enrolled Track</th>
                  <th className="pb-3">Course Progress</th>
                  <th className="pb-3">Exam Readiness</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-950/40 transition">
                    <td className="py-3">
                      <div className="font-bold text-white">{member.name}</div>
                      <div className="text-[10px] text-slate-500">{member.email}</div>
                    </td>
                    <td className="py-3">{member.role}</td>
                    <td className="py-3 text-cyan-400">{member.enrolledTrack}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{ width: `${member.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px]">{member.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        member.status === 'AT_RISK'
                          ? 'bg-rose-950 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {member.certReadiness}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleRevoke(member.id)}
                        className="px-2.5 py-1 rounded text-rose-400 hover:bg-rose-950/40 border border-rose-500/20 text-[10px] transition"
                      >
                        Revoke Seat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Invite Member Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 font-mono text-xs space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Provision Team Member Seat</h3>
            <p className="text-slate-400 font-sans text-xs">
              Allocates one enterprise seat with full Cisco IOS-XE terminal sandbox and Socratic AI tutor access.
            </p>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="text-slate-400 block mb-1 uppercase">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="technician@nexusglobal.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 font-sans text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Confirm Seat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
