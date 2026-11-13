import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Lock, ExternalLink, Award, FileText, AlertCircle } from 'lucide-react';
import { VERIFIED_CERTIFICATES } from '../../data/mockData';
import { CertificateRecord } from '../../types';

interface Props {
  onSelectCert?: (hash: string) => void;
}

export const CredentialLookupWidget: React.FC<Props> = ({ onSelectCert }) => {
  const [searchHash, setSearchHash] = useState('c8f7a901-netpulse-ccna');
  const [certResult, setCertResult] = useState<CertificateRecord | null>(
    VERIFIED_CERTIFICATES['c8f7a901-netpulse-ccna']
  );
  const [hasSearched, setHasSearched] = useState(true);

  const handleLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchHash.trim();
    if (!clean) return;

    setHasSearched(true);
    if (VERIFIED_CERTIFICATES[clean]) {
      setCertResult(VERIFIED_CERTIFICATES[clean]);
    } else {
      setCertResult(null);
    }
  };

  const sampleHashes = [
    { label: 'Cisco CCNA (Devon Vance)', hash: 'c8f7a901-netpulse-ccna' },
    { label: 'CompTIA A+ (Elena Rostova)', hash: 'a1b2c3d4-netpulse-aplus' },
  ];

  return (
    <div className="glass-panel rounded-2xl overflow-hidden p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">Public Employer Certificate Verification</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cryptographically authenticated via SHA-256 HMAC digital signatures.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          <Lock className="w-3.5 h-3.5" />
          <span>Tamper-Proof Ledger</span>
        </div>
      </div>

      {/* Input Search Form */}
      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchHash}
            onChange={(e) => setSearchHash(e.target.value)}
            placeholder="Enter certificate hash (e.g. c8f7a901-netpulse-ccna)..."
            className="w-full glass-input rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-mono placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 border border-emerald-500/30 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verify Credential</span>
        </button>
      </form>

      {/* Quick Hash Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Quick Samples:</span>
        {sampleHashes.map((s) => (
          <button
            key={s.hash}
            onClick={() => {
              setSearchHash(s.hash);
              setCertResult(VERIFIED_CERTIFICATES[s.hash]);
              setHasSearched(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Verification Card Result */}
      {hasSearched && certResult ? (
        <div className="p-5 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-emerald-500/30 space-y-4 shadow-md dark:shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                OFFICIALLY AUTHENTICATED
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">{certResult.certTitle}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Awarded to <span className="font-semibold text-sky-700 dark:text-cyan-300">{certResult.recipientName}</span> (Student Code: {certResult.studentCode})
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 dark:sm:border-white/10 sm:pl-4 space-y-0.5">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Issued Date</div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{certResult.issueDate}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Labs Completed: {certResult.labsCompletedCount}</div>
            </div>
          </div>

          {/* Verified Competencies */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-white/10">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Verified Technical Competencies</div>
            <div className="flex flex-wrap gap-1.5">
              {certResult.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-200 shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Cryptographic Signature Footer */}
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 gap-2">
            <div className="truncate max-w-sm">
              <span className="text-slate-400 dark:text-slate-500 mr-1">HMAC-SHA256:</span>
              <span className="text-slate-700 dark:text-slate-300">{certResult.hmacSignature.slice(0, 28)}...</span>
            </div>
            <button
              onClick={() => onSelectCert?.(certResult.hash)}
              className="text-sky-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-sans text-xs font-medium"
            >
              <span>View Full Academic Transcript</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : hasSearched && !certResult ? (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Certificate hash was not found or has been revoked by institutional administrators.</span>
        </div>
      ) : null}
    </div>
  );
};
