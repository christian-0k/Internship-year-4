import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Key, 
  Copy,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentProfileView: React.FC = () => {
  const { navigateTo, user } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [copiedHash, setCopiedHash] = useState(false);

  const sampleCertHash = '0x8f4d92a1c0e3b745fa9912cd34ef567890abcdef1234567890abcdef12345678';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sampleCertHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigateTo('dashboard')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Profile Dossier Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-2xl font-mono shadow-lg">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AM'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  {user?.name || 'Alexandre Mercer'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                  VERIFIED APPRENTICE
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono mt-1">
                {user?.email || 'alexandre.m@netmentor.io'} • Cohort: <span className="text-cyan-400">US-EAST-SPON-4410</span>
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800 text-xs font-mono">
            <span className="text-slate-500">Student ID:</span>
            <span className="text-cyan-400 font-bold">{user?.id || 'STU-LM-8821'}</span>
            <span className="text-[10px] text-slate-500 mt-1">Joined Jan 2025</span>
          </div>
        </div>

        {/* SMS Standing & Academic Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 block uppercase">Cohort Attendance Standing:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400">96.4%</span>
              <span className="text-[10px] text-slate-400">24/25 Sessions</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 block">Meets Sponsor Policy Floor (&gt;70%)</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 block uppercase">Weighted Gradebook GPA:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-cyan-400">3.88 / 4.0</span>
              <span className="text-[10px] text-slate-400">Top 5% Cohort</span>
            </div>
            <span className="text-[10px] text-slate-400 block">14 Hands-On Labs Cleared</span>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 block uppercase">Sponsor Alert Tripwire:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">NOMINAL</span>
              <span className="text-[10px] text-emerald-400">● 0 Flags</span>
            </div>
            <span className="text-[10px] text-slate-400 block">Sponsor: Lockheed Martin</span>
          </div>
        </div>

        {/* Downloadable Certificate Dossier */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Earned Digital Credentials & Signed PDF Transcripts
                </h3>
                <p className="text-slate-400 text-xs font-mono">
                  Cryptographically anchored certificates verified against the public registry.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('verify_cert')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-cyan-400 text-xs font-mono hover:text-cyan-300 transition shrink-0"
            >
              <span>Public Verification Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">
                  Cisco CCNA 200-301 Enterprise Routing & Switching Specialist
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  PASSED (94%)
                </span>
              </div>
              <p className="text-slate-400 text-xs font-sans">
                Issued on May 14, 2025 by NetMentor Academic Board • Permanent SHA-256 validity
              </p>
              <div className="flex items-center gap-2 text-slate-500 text-[11px] pt-1">
                <span>Hash: {sampleCertHash.slice(0, 24)}...</span>
                <button
                  onClick={handleCopyHash}
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedHash ? 'Copied' : 'Copy Full Hash'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Downloading signed transcript PDF with cryptographic verification seal...');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-2 transition shrink-0"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Signed PDF</span>
            </button>
          </div>
        </div>

        {/* Security & SMS Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            Security & Notification Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-white font-bold">Two-Factor Authentication (2FA)</div>
                <div className="text-slate-500 text-[11px]">Hardware security key or TOTP authenticator app</div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  twoFactorEnabled
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {twoFactorEnabled ? 'Enabled (Enforced)' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-0.5">
                <div className="text-white font-bold">SMS Incident Alerts & Schedule Reminders</div>
                <div className="text-slate-500 text-[11px]">Priority dispatch to +1 (555) 234-8901</div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  smsNotifications
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {smsNotifications ? 'Active' : 'Muted'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
