import React, { useState } from 'react';
import { 
  Terminal, 
  Building2, 
  ShieldCheck, 
  Activity, 
  Users, 
  Cpu, 
  Layers, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  FileText, 
  ExternalLink, 
  RotateCcw, 
  Lock,
  Zap,
  Server
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { navigateTo } = useAuth();
  const [activeTab, setActiveTab] = useState<'tenants' | 'rbac' | 'apm' | 'audit'>('tenants');
  const [filterTenant, setFilterTenant] = useState('ALL');
  const [simulatedRole, setSimulatedRole] = useState<'student' | 'instructor' | 'lab_tech' | 'org_manager' | 'guardian' | 'admin'>('student');
  const [probeResult, setProbeResult] = useState<string | null>(null);

  // Multi-Tenant Org Fixtures (matches screenshot screen_5194d71b.png)
  const tenants = [
    {
      id: 'ORG-8842',
      name: 'Nexus Global IT',
      slug: 'nexus-global-it',
      domain: 'nexusglobal.com',
      tier: 'ENTERPRISE PRO',
      region: 'US-East-01',
      seats: '142 / 160',
      wasmHours: '1,420 hrs',
      sso: 'Okta SCIM (142 sync\'d)',
      ssoStatus: 'healthy',
      sla: '99.99%',
      mrr: '$7,840/mo',
      leadContact: 'Sarah Vance • sarah.vance@nexusglobal.com'
    },
    {
      id: 'ORG-4410',
      name: 'Lockheed Martin Workforce Initiative',
      slug: 'lockheed-workforce',
      domain: 'lockheedmartin.com',
      tier: 'ENTERPRISE DEDICATED',
      region: 'US-East-GovCloud',
      seats: '480 / 500',
      wasmHours: '4,820 hrs',
      sso: 'Azure AD SCIM (480 sync\'d)',
      ssoStatus: 'healthy',
      sla: '100.0%',
      mrr: '$18,500/mo',
      leadContact: 'Arthur Vance • a.vance@lmco.com (GovCloud MFA)'
    },
    {
      id: 'ORG-9102',
      name: 'Raytheon Intelligence & Space',
      slug: 'raytheon-intel',
      domain: 'rtx.com',
      tier: 'ENTERPRISE DEDICATED',
      region: 'US-West-02',
      seats: '650 / 700',
      wasmHours: '6,100 hrs',
      sso: 'PingFederate Active',
      ssoStatus: 'healthy',
      sla: '99.98%',
      mrr: '$24,000/mo',
      leadContact: 'SecOps Director: Marcus Brody • m.brody@rtx.com'
    },
    {
      id: 'ORG-3104',
      name: 'Cisco Networking Academy — North America',
      slug: 'netacad-na',
      domain: 'netacad.com',
      tier: 'ACADEMIC TIER',
      region: 'US-East-01',
      seats: '2,400 / 3,000',
      wasmHours: '18,200 hrs',
      sso: 'SAML 2.0 / Canvas LTI v1.3',
      ssoStatus: 'healthy',
      sla: '99.95%',
      mrr: '$12,000/mo',
      leadContact: 'Curriculum Dean: Dr. Elena Rostova • e.rostova@netacad.cisco.com'
    },
    {
      id: 'ORG-7719',
      name: 'Boeing Defense & Space Systems',
      slug: 'boeing-space',
      domain: 'boeing.com',
      tier: 'ENTERPRISE PRO',
      region: 'US-East-02',
      seats: '195 / 200',
      wasmHours: '2,190 hrs',
      sso: 'Okta Sync Degraded (429 Rate Limit)',
      ssoStatus: 'degraded',
      sla: '99.82%',
      mrr: '$9,800/mo',
      leadContact: 'Lead Systems Architect: David Chen • d.chen@boeing.com'
    }
  ];

  // RBAC Matrix Map
  const rbacPermissions = [
    { module: 'Public Catalog & Cert Verification', student: true, instructor: true, lab_tech: true, org_manager: true, guardian: true, admin: true },
    { module: 'WASM Cisco CLI Terminal Sandboxes', student: true, instructor: true, lab_tech: true, org_manager: false, guardian: false, admin: true },
    { module: 'YAML Lab Authoring & Fault Injector', student: false, instructor: true, lab_tech: false, org_manager: false, guardian: false, admin: true },
    { module: 'Physical Bench Map & PDU Telemetry', student: false, instructor: false, lab_tech: true, org_manager: false, guardian: false, admin: true },
    { module: 'Consumables Spares & Auto-Generated PO', student: false, instructor: false, lab_tech: true, org_manager: false, guardian: false, admin: true },
    { module: 'Org Seat Licensing & Okta SCIM Sync', student: false, instructor: false, lab_tech: false, org_manager: true, guardian: false, admin: true },
    { module: 'Sponsor Alert Tripwire Policy Config', student: false, instructor: false, lab_tech: false, org_manager: false, guardian: true, admin: true },
    { module: 'Root APM, IAM & Merkle Audit Logs', student: false, instructor: false, lab_tech: false, org_manager: false, guardian: false, admin: true },
  ];

  const handleTestProbe = () => {
    if (simulatedRole === 'student') {
      setProbeResult('ALLOWED: /dashboard, /learn, /labs, /quiz, /progress • BLOCKED: /teach, /lab-ops, /org, /admin (Redirect Guard: 302)');
    } else if (simulatedRole === 'instructor') {
      setProbeResult('ALLOWED: /teach, /teach/courses, /teach/labs, /teach/gradebook • BLOCKED: /admin, /lab-ops, /org');
    } else if (simulatedRole === 'lab_tech') {
      setProbeResult('ALLOWED: /lab-ops, /lab-ops/spares, /lab-ops/equipment • BLOCKED: /teach, /org, /admin');
    } else if (simulatedRole === 'org_manager') {
      setProbeResult('ALLOWED: /org, /org/seats, /org/billing, /org/reports • BLOCKED: /teach, /admin, /lab-ops');
    } else if (simulatedRole === 'guardian') {
      setProbeResult('ALLOWED: /guardian, /guardian/alerts, /guardian/grades • BLOCKED: /teach, /admin, /org');
    } else {
      setProbeResult('ROOT CLEARANCE: Full bidirectional read/write access across all 7 portals without boundary restrictions.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Root Command APM Bar (matches screen_5194d71b.png) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white font-bold">CLUSTER: US-EAST-01</span>
            <span className="text-emerald-400 font-bold">● SYS (HEALTHY 99.99%)</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">API Latency: <span className="text-cyan-400">18ms</span></span>
            <span className="text-slate-400">CPU: <span className="text-white font-bold">34%</span> // RAM: <span className="text-white font-bold">58%</span></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
              ROOT COMMAND // LEVEL 4 ENCLAVE
            </span>
          </div>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-slate-500 font-mono text-xs uppercase mb-1">
              Root Command / Multi-Tenancy / Organization Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Enterprise Multi-Tenant Organizations
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Global tenant administration, SCIM integration health, and compute allocation across enterprise aerospace and networking partners.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('tenants')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'tenants'
                  ? 'bg-rose-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Tenants Directory
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'rbac'
                  ? 'bg-rose-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              RBAC Matrix & Probe
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-2 rounded-xl transition ${
                activeTab === 'audit'
                  ? 'bg-rose-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Merkle Audit Log
            </button>
          </div>
        </div>

        {/* Global APM Metrics Cards (from screenshot screen_5194d71b.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Total Enterprise Seats</span>
            <div className="text-3xl font-black text-white">
              18,450 <span className="text-xs font-normal text-slate-400">/ 22,000</span>
            </div>
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>Capacity: 83.8% Allocated</span>
              <span className="text-emerald-400">+450 this week</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">WASM Compute Active</span>
            <div className="text-3xl font-black text-cyan-400">42,910 <span className="text-xs font-normal text-slate-400">hrs MTD</span></div>
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>Peak Pods: 4,120</span>
              <span className="text-emerald-400">94.2% Efficiency</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Enterprise Gross MRR</span>
            <div className="text-3xl font-black text-white">$388,400 <span className="text-xs font-normal text-slate-500">/ mo</span></div>
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span>Renewal Rate: 99.1%</span>
              <span className="text-emerald-400">+14.2% MoM ARR</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Core Fleet SLA Uptime</span>
            <div className="text-3xl font-black text-emerald-400">99.98% <span className="text-xs font-normal text-slate-400">All Pods</span></div>
            <div className="text-[10px] text-slate-400 flex justify-between">
              <span className="text-amber-400">1 Pod Degraded (Boeing)</span>
              <span className="text-emerald-400">Zero MTTR incidents</span>
            </div>
          </div>
        </div>

        {/* Tab 1: Tenants Directory (Exact replica of screen_5194d71b.png) */}
        {activeTab === 'tenants' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-white font-bold text-sm">64 Active Enterprise Tenants</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Exporting SOC-2 compliant audit CSV...')}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export Audit CSV</span>
                </button>
                <button
                  onClick={() => alert('Opening enterprise tenant provisioning wizard...')}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Provision Enterprise Org</span>
                </button>
              </div>
            </div>

            {/* Tenant Cards List */}
            <div className="space-y-3">
              {tenants.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-white font-bold text-base">{t.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-bold">
                          #{t.id}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-400 border border-rose-500/30 font-bold">
                          {t.tier}
                        </span>
                        <span className="text-slate-500 text-[11px]">{t.region}</span>
                      </div>
                      <div className="text-slate-400 text-xs">
                        Slug: <span className="text-white">{t.slug}</span> • Domain: <span className="text-cyan-400">{t.domain}</span> • MRR: <span className="text-emerald-400 font-bold">{t.mrr}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] pt-1">
                        {t.leadContact}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-right">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Seats:</span>
                        <span className="text-white font-bold">{t.seats}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">WASM Time:</span>
                        <span className="text-cyan-400 font-bold">{t.wasmHours}</span>
                      </div>
                      <div>
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                          t.ssoStatus === 'healthy'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}>
                          {t.sso}
                        </span>
                      </div>
                      <div className="text-emerald-400 font-bold text-sm">
                        {t.sla}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-end gap-2">
                    {t.ssoStatus === 'degraded' && (
                      <button
                        onClick={() => alert(`Flushing SCIM queue for ${t.name}...`)}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Force SCIM Flush</span>
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Configuring quotas for ${t.name}...`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 text-[11px]"
                    >
                      Configure Quotas
                    </button>
                    <button
                      onClick={() => alert(`Inspecting SCIM credentials for ${t.name}...`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 text-[11px]"
                    >
                      Inspect SCIM
                    </button>
                    <button
                      onClick={() => alert(`Viewing invoices for ${t.name}...`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 text-[11px]"
                    >
                      View Invoices
                    </button>
                    <button
                      onClick={() => alert(`Managing tenant ${t.name}...`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Manage Tenant</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: RBAC Matrix & Policy Probe */}
        {activeTab === 'rbac' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 font-mono text-xs">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                7-Role Permission Matrix & Boundary Simulator
              </h2>
              <p className="text-slate-400 text-xs font-sans mt-1">
                Zero-trust policy definitions enforced at routing boundary and in Firestore security rules.
              </p>
            </div>

            {/* Live Policy Probe */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 uppercase text-[10px]">Select Role Probe:</span>
                  <select
                    value={simulatedRole}
                    onChange={(e) => {
                      setSimulatedRole(e.target.value as any);
                      setProbeResult(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-bold focus:outline-none"
                  >
                    <option value="student">student (Learner)</option>
                    <option value="instructor">instructor (SME)</option>
                    <option value="lab_tech">lab_tech (Lab Ops)</option>
                    <option value="org_manager">org_manager (B2B)</option>
                    <option value="guardian">guardian (Sponsor)</option>
                    <option value="admin">admin (Root)</option>
                  </select>
                </div>

                <button
                  onClick={handleTestProbe}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Execute RBAC Access Probe</span>
                </button>
              </div>

              {probeResult && (
                <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-[11px] leading-relaxed">
                  {probeResult}
                </div>
              )}
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-800 uppercase text-[10px]">
                    <th className="pb-3">Module / Feature</th>
                    <th className="pb-3 text-center">Student</th>
                    <th className="pb-3 text-center">Instructor</th>
                    <th className="pb-3 text-center">Lab Tech</th>
                    <th className="pb-3 text-center">Org Mgr</th>
                    <th className="pb-3 text-center">Guardian</th>
                    <th className="pb-3 text-center">Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {rbacPermissions.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-950/40 transition">
                      <td className="py-3 font-medium text-white">{row.module}</td>
                      <td className="py-3 text-center">{row.student ? '✅' : '⛔'}</td>
                      <td className="py-3 text-center">{row.instructor ? '✅' : '⛔'}</td>
                      <td className="py-3 text-center">{row.lab_tech ? '✅' : '⛔'}</td>
                      <td className="py-3 text-center">{row.org_manager ? '✅' : '⛔'}</td>
                      <td className="py-3 text-center">{row.guardian ? '✅' : '⛔'}</td>
                      <td className="py-3 text-center font-bold text-rose-400">{row.admin ? 'ROOT' : '⛔'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Immutable Merkle Audit Log */}
        {activeTab === 'audit' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Cryptographic Merkle Audit Log
                </h2>
                <p className="text-slate-400 text-xs font-sans mt-1">
                  Tamper-evident system activity and privilege escalation audit trail.
                </p>
              </div>
              <span className="text-emerald-400">MERKLE_ROOT: 0x8a994ef0012bca</span>
            </div>

            <div className="space-y-3">
              {[
                { time: '10:24:12 UTC', actor: 'sarah.vance@nexusglobal.com', action: 'SEAT_ALLOCATED', target: 'technician@nexusglobal.com', status: 'SUCCESS', hash: '0x3f99a...b02' },
                { time: '10:18:04 UTC', actor: 'christiansiabenankam@gmail.com', action: 'FIRESTORE_RULES_DEPLOYED', target: 'rules_version_2', status: 'SUCCESS', hash: '0x7b112...e81' },
                { time: '09:54:22 UTC', actor: 'm.vance@netmentor.io', action: 'YAML_TOPOLOGY_PUBLISHED', target: 'LAB-NET-OSPF-09', status: 'SUCCESS', hash: '0x9924a...d44' },
                { time: '09:12:08 UTC', actor: 'anonymous@guest', action: 'UNAUTHORIZED_PORTAL_ATTEMPT', target: '/admin', status: 'DENIED_302', hash: '0x221aa...f90' },
              ].map((log, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{log.time}</span>
                      <span className="text-white font-bold">{log.actor}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400">{log.action}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Target: {log.target}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold ${log.status === 'SUCCESS' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {log.status}
                    </span>
                    <div className="text-slate-500 text-[10px]">{log.hash}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
