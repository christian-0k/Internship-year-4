import React, { useState } from 'react';
import { Shield, Activity, Users, AlertTriangle, Lock, Cpu, Server, CheckCircle2 } from 'lucide-react';

export const AdminPortalPage: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState([
    { timestamp: '2026-10-31 02:40:12', user: 'sarah.jenkins@netpulse.org', action: 'GRADE_OVERRIDE', target: 'STU-2026-7722 (Jordan Kross)', details: 'Score modified to 68% for Cat6 cable retake' },
    { timestamp: '2026-10-31 01:15:30', user: 'system_cron', action: 'ATTENDANCE_SYNC', target: 'Cohort Fall 2026 Alpha', details: '14 QR bench scans matched to SMS database' },
    { timestamp: '2026-10-30 22:50:04', user: 'dave.miller@netpulse.org', action: 'EQUIPMENT_FAULT_REPORT', target: 'NP-SW-004 (Catalyst 2960X)', details: 'Bench 4 marked FAULTY - Native VLAN flapping' },
  ]);

  const [revokedHashes, setRevokedHashes] = useState<string[]>([]);

  const handleRevoke = (hash: string) => {
    setRevokedHashes([...revokedHashes, hash]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Super Administrator Console</div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Platform Governance &amp; AI Cost Oversight</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
          <Activity className="w-3.5 h-3.5" />
          <span>Cluster Status: 99.98% Uptime</span>
        </div>
      </div>

      {/* AI Token Cost & Sandbox Queue Monitoring Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Gemini AI Token Burn Rate', value: '142,800 tokens', desc: 'Socratic Tutor & CLI parsing', color: 'text-cyan-700 dark:text-cyan-400' },
          { label: 'Estimated AI Cost (MTD)', value: '$18.42', desc: 'Within monthly budget limit ($250)', color: 'text-emerald-700 dark:text-emerald-400' },
          { label: 'Active 3D & CLI Sandboxes', value: '38 Sessions', desc: 'Three.js & Cisco terminal instances', color: 'text-amber-700 dark:text-amber-400' },
          { label: 'FERPA Audit Invariants', value: 'Verified', desc: 'Immutable read/write records', color: 'text-purple-700 dark:text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">{stat.label}</div>
            <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* FERPA / GDPR Compliance Audit Log Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Institutional Audit Log (FERPA / GDPR Compliance)
          </h3>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Retention: 7 Years</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase text-[10px] bg-slate-100/60 dark:bg-slate-900/60">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Actor</th>
                <th className="py-2.5 px-3">Action Type</th>
                <th className="py-2.5 px-3">Target Subject</th>
                <th className="py-2.5 px-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {auditLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-3 text-cyan-700 dark:text-cyan-300">{log.user}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] text-slate-700 dark:text-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-medium">{log.target}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-sans">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Revocation & Fraud Control */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
        <h3 className="font-bold text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Fraud Control &amp; Certificate Revocation
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Revoking a certificate invalidates its cryptographic public verification hash immediately across all employer lookup endpoints.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Sample Credential: c8f7a901-netpulse-ccna</span>
          {revokedHashes.includes('c8f7a901-netpulse-ccna') ? (
            <span className="text-xs font-mono text-rose-600 dark:text-rose-400 font-bold">REVOKED IN AUDIT LEDGER</span>
          ) : (
            <button
              onClick={() => handleRevoke('c8f7a901-netpulse-ccna')}
              className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-800 dark:text-rose-300 border border-rose-500/40 rounded-lg text-xs font-semibold self-start sm:self-auto transition-colors"
            >
              Revoke for Academic Misconduct
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
