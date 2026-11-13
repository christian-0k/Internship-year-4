import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Download, 
  ExternalLink, 
  Sliders, 
  Smartphone, 
  Mail, 
  Send,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GuardianDashboard: React.FC = () => {
  const { navigateTo } = useAuth();

  // Alert Rules State (matching screenshot screen_78704a61.png)
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [webhookAlerts, setWebhookAlerts] = useState(true);

  const [ruleAtt01Active, setRuleAtt01Active] = useState(true);
  const [attFloor, setAttFloor] = useState(70);

  const [ruleAssess02Active, setRuleAssess02Active] = useState(true);
  const [failThreshold, setFailThreshold] = useState(2);

  const [ruleLab03Active, setRuleLab03Active] = useState(true);
  const [inactivityDays, setInactivityDays] = useState(5);

  const [ruleMile04Active, setRuleMile04Active] = useState(true);

  const [notificationDispatched, setNotificationDispatched] = useState(false);

  // Sponsored Students Dossier
  const sponsoredLearners = [
    {
      id: 'usr-student-01',
      name: 'Alexandre Mercer',
      track: 'Cisco CCNA & Hardware Dual Track',
      attendance: '96.4%',
      grade: '3.88 GPA',
      status: 'EXCELLING',
      labsCleared: '14 / 28',
      certReadiness: '88% (High)',
    },
    {
      id: 'usr-student-02',
      name: 'Maya Lin',
      track: 'IT Hardware Maintenance & Diagnostic',
      attendance: '92.0%',
      grade: '3.75 GPA',
      status: 'ON TRACK',
      labsCleared: '12 / 24',
      certReadiness: '82% (Nominal)',
    },
  ];

  const handleTestDispatch = () => {
    setNotificationDispatched(true);
    setTimeout(() => setNotificationDispatched(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Sponsor Context Header (from screenshot screen_78704a61.png) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Lockheed Martin Workforce Initiative // #SPON-4410</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              2 Sponsored Learners • Live Telemetry Active
            </span>
          </div>

          <div className="text-right">
            <span className="text-white font-bold block">Arthur Vance</span>
            <span className="text-slate-500 text-[10px]">Workforce Development Sponsor Lead</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-950/60 border border-blue-500/40 text-blue-400 mb-2">
              SPONSOR PORTAL // SETTINGS & COMPLIANCE // SEC-POLICY-REV=2.4
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Sponsor Alert & Proactive Notification Rules
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Configure automated early-warning thresholds, attendance drop alarms, and lab latency triggers across active apprentice pathways for Lockheed Martin workforce cohorts.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Immediate Push & Digest Enabled
            </span>
          </div>
        </div>

        {/* Sponsor Contact & Transport Sockets (from screenshot screen_78704a61.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          
          {/* Primary Contact Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Primary Sponsor Contact</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                VERIFIED NODE
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold text-base">Arthur Vance</div>
              <div className="text-slate-400 text-xs">Lead Workforce Development Director • ID: SPON-AV-99120</div>
              <div className="pt-2 text-slate-300 space-y-1">
                <div>Direct Email: <span className="text-cyan-400">a.vance@workforce-initiative.org</span></div>
                <div>Secure Mobile: <span className="text-white">+1 (555) 234-8901</span></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-500">
              <span>Routing PGP Signature: <span className="text-emerald-400 font-bold">Enabled</span></span>
              <span className="text-cyan-400">Manage Endpoint ↗</span>
            </div>
          </div>

          {/* Transport Protocols & Sockets */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Transport Protocols & Sockets</span>
              <span className="text-cyan-400 text-[10px]">3 Active Routes</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-white font-bold">Email Notifications</div>
                    <div className="text-[10px] text-slate-500">Urgent immediate dispatches + 08:00 UTC daily briefing rolls</div>
                  </div>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-10 h-6 rounded-full transition relative ${emailAlerts ? 'bg-cyan-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${emailAlerts ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-white font-bold">SMS Priority Alerts</div>
                    <div className="text-[10px] text-slate-500">Bypasses digests. Instant automated ping on severe risk breaches</div>
                  </div>
                </div>
                <button
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`w-10 h-6 rounded-full transition relative ${smsAlerts ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${smsAlerts ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-white font-bold">Enterprise Webhook Relay</div>
                    <div className="text-[10px] text-slate-500">Payload target: #workforce-apprentices-ops</div>
                  </div>
                </div>
                <button
                  onClick={() => setWebhookAlerts(!webhookAlerts)}
                  className={`w-10 h-6 rounded-full transition relative ${webhookAlerts ? 'bg-purple-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${webhookAlerts ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Proactive Alert Policies Grid (Matches screen_78704a61.png) */}
        <div className="space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Proactive Alert Policies
            </h2>
            <span className="text-emerald-400">4 Rules Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Rule ATT-01 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                    CRITICAL
                  </span>
                  <span className="text-white font-bold">RULE_ID: ATT-01 Attendance Early-Warning</span>
                </div>
                <button
                  onClick={() => setRuleAtt01Active(!ruleAtt01Active)}
                  className={`w-10 h-6 rounded-full transition relative ${ruleAtt01Active ? 'bg-cyan-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${ruleAtt01Active ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Attendance Floor Trigger:</span>
                  <span className="text-cyan-400 font-bold text-sm">{attFloor}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={90}
                  step={5}
                  value={attFloor}
                  onChange={(e) => setAttFloor(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-sans">
                  [EXECUTION_PREVIEW]: If apprentice drops below {attFloor}% or misses 2 consecutive live sessions, send immediate SMS & Email to Arthur Vance.
                </div>
              </div>
            </div>

            {/* Rule ASSESS-02 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                    AUTO-REMEDIATE
                  </span>
                  <span className="text-white font-bold">RULE_ID: ASSESS-02 Consecutive Failed Quizzes</span>
                </div>
                <button
                  onClick={() => setRuleAssess02Active(!ruleAssess02Active)}
                  className={`w-10 h-6 rounded-full transition relative ${ruleAssess02Active ? 'bg-cyan-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${ruleAssess02Active ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Consecutive Failure Threshold:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(n => (
                      <button
                        key={n}
                        onClick={() => setFailThreshold(n)}
                        className={`px-2.5 py-1 rounded text-xs transition ${
                          failThreshold === n
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'bg-slate-950 border border-slate-800 text-slate-400'
                        }`}
                      >
                        {n} Quizzes
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-sans">
                  [AI_DIAGNOSTIC_REMEDIATION]: Alert sponsor and synthesize an adaptive NetMentor Socratic Subnetting drill for learner.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sponsored Student Dossier Matrix */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono text-xs">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Sponsored Apprentices Academic Dossier
              </h2>
              <span className="text-slate-400">Lockheed Martin Cohort US-EAST-SPON-4410</span>
            </div>

            <button
              onClick={handleTestDispatch}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold transition flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{notificationDispatched ? 'Dispatched Test Alert!' : 'Test Notification Dispatch'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {sponsoredLearners.map((lr) => (
              <div
                key={lr.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-bold text-base">{lr.name}</h3>
                    <div className="text-slate-400 text-xs">{lr.track}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                    {lr.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Attendance</span>
                    <span className="text-emerald-400 font-bold">{lr.attendance}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GPA Standing</span>
                    <span className="text-cyan-400 font-bold">{lr.grade}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Labs Cleared</span>
                    <span className="text-white font-bold">{lr.labsCleared}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">CCNA Readiness: <span className="text-white font-bold">{lr.certReadiness}</span></span>
                  <button
                    onClick={() => alert(`Downloading signed academic transcript for ${lr.name}...`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] border border-slate-800 flex items-center gap-1.5"
                  >
                    <Download className="w-3 h-3 text-emerald-400" />
                    <span>Download Transcript</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
