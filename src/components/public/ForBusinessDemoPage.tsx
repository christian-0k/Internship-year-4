import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Lock, 
  Server, 
  Terminal, 
  Layers 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForBusinessDemoPage: React.FC = () => {
  const { navigateTo } = useAuth();
  const [teamSize, setTeamSize] = useState<number>(25);
  const [selectedTrack, setSelectedTrack] = useState<'both' | 'networking' | 'maintenance'>('both');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Price estimate calculations
  const basePerSeat = selectedTrack === 'both' ? 120 : 85;
  const discountRate = teamSize >= 100 ? 0.3 : teamSize >= 50 ? 0.2 : teamSize >= 20 ? 0.1 : 0;
  const estimatedTotal = Math.round(teamSize * basePerSeat * (1 - discountRate));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-purple-950/60 border border-purple-500/40 text-purple-400">
            <Building2 className="w-4 h-4" />
            ENTERPRISE WORKFORCE UPSKILLING
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Train & Certify Your Systems Support & NOC Teams
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate costly physical lab hardware expenses. Provision zero-install, browser-isolated Linux and Cisco sandboxes for your IT helpdesk, field technicians, and network engineers.
          </p>
        </div>

        {/* Dynamic Calculator & Lead Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Interactive Pricing Estimator */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Step 1: Estimate Seat Footprint
              </span>
              <h2 className="text-xl font-bold text-white">
                Interactive Enterprise Seat Calculator
              </h2>
            </div>

            {/* Slider */}
            <div className="space-y-3 bg-slate-950 border border-slate-800 rounded-2xl p-5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Active Engineer Seats:</span>
                <span className="text-white font-bold text-base px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
                  {teamSize} Technicians
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={250}
                step={5}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>5 Seats (Min)</span>
                <span>50 Seats</span>
                <span>100 Seats (30% Tier)</span>
                <span>250+ Seats</span>
              </div>
            </div>

            {/* Track Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Target Curriculum Track:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'both', label: 'Dual Track (IT + Net)', price: '$120/seat' },
                  { id: 'networking', label: 'Cisco Routing Only', price: '$85/seat' },
                  { id: 'maintenance', label: 'Hardware & OS Only', price: '$85/seat' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTrack(t.id as any)}
                    className={`p-3 rounded-xl border text-center transition ${
                      selectedTrack === t.id
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{t.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{t.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total Estimate Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Enterprise Tier Volume Discount:</span>
                <span className="text-emerald-400 font-bold">
                  {discountRate > 0 ? `-${discountRate * 100}% Applied` : 'Standard Volume'}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
                <span className="text-sm font-bold text-white">Estimated Monthly Investment:</span>
                <span className="text-3xl font-black text-cyan-400">
                  ${estimatedTotal.toLocaleString()}
                  <span className="text-xs text-slate-500 font-mono font-normal"> / mo</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Okta, Microsoft Entra ID & Google Workspace SCIM Provisioning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated CCIE instructor office hours & custom rubric creation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Executive compliance dashboards and SOC-2 Type II audit logs</span>
              </div>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                Step 2: Request Pilot & Live Demo
              </span>
              <h2 className="text-xl font-bold text-white">
                Request a Custom Corporate Sandbox Pilot
              </h2>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Corporate Pilot Request Received!
                </h3>
                <p className="text-slate-300 text-xs font-mono leading-relaxed">
                  Thank you, <span className="text-white font-bold">{contactName}</span>. We've prepared a sandbox tenant for <span className="text-cyan-400 font-bold">{companyName}</span> ({teamSize} seats). A senior solutions architect will reach out to <span className="text-emerald-400">{contactEmail}</span> within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1.5 uppercase">
                    Your Full Name & Job Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Chen, VP of Infrastructure"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5 uppercase">
                    Corporate Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="s.chen@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5 uppercase">
                    Enterprise Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nexus Global IT, Lockheed Martin, etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-sans text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-cyan-400 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Generate Official Quote & Sandbox Tenant</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-2">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>No credit card required for 14-day 10-engineer enterprise pilot.</span>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
