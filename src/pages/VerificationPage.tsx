import React from 'react';
import { CredentialLookupWidget } from '../components/landing/CredentialLookupWidget';
import { ShieldCheck, Award, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  initialHash?: string;
}

export const VerificationPage: React.FC<Props> = ({ initialHash }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cryptographic Credential Verification Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Authentic Skill Verification</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Employers and institutions can immediately confirm the authenticity and laboratory transcripts of NetPulse graduates.
        </p>
      </div>

      {/* Main Lookup Component */}
      <CredentialLookupWidget />

      {/* Trust & Compliance Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
        <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>HMAC-SHA256 Signatures</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Every certificate is signed with institutional cryptographic keys, preventing grade or name tampering.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>FERPA &amp; GDPR Compliant</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Students control whether their academic transcript is publicly searchable or visible only via private hash link.
          </p>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Vendor Alignment</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Directly cross-referenced against CompTIA A+ Core 1/2 and Cisco CCNA 200-301 published exam blueprints.
          </p>
        </div>
      </div>
    </div>
  );
};
