import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  ExternalLink, 
  Award, 
  FileCheck, 
  Calendar, 
  User, 
  Hash, 
  Download 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface VerifiedCert {
  hash: string;
  studentName: string;
  studentId: string;
  trackTitle: string;
  certAuthority: string;
  issuedDate: string;
  status: 'AUTHENTIC' | 'REVOKED';
  merkleRoot: string;
  passScore: string;
  skillsVerified: string[];
}

const VERIFIED_RECORDS: Record<string, VerifiedCert> = {
  '0x8f4d92a1c0e3b745fa9912cd34ef567890abcdef1234567890abcdef12345678': {
    hash: '0x8f4d92a1c0e3b745fa9912cd34ef567890abcdef1234567890abcdef12345678',
    studentName: 'Alexandre Mercer',
    studentId: 'STU-LM-8821',
    trackTitle: 'Enterprise Network Engineering & Cisco IOS-XE Routing (CCNA 200-301 Track)',
    certAuthority: 'NetMentor.AI Academic & Industrial Credentials Board',
    issuedDate: '2025-05-14',
    status: 'AUTHENTIC',
    merkleRoot: '0x99a4c8e711bf209a',
    passScore: '94.2% (Mastery)',
    skillsVerified: [
      'Multi-Area OSPFv2/v3 Configuration & Neighbor Adjacency',
      '802.1Q Trunking & Inter-VLAN Routing (SVI / ROAS)',
      'Standard & Extended IPv4 Access Control Lists',
      'Wireshark TCP 3-Way Handshake Packet Inspection'
    ]
  },
  '0x4b71e29c884501a2d67f9911e034acdb128945670123456789abcdefabcdef01': {
    hash: '0x4b71e29c884501a2d67f9911e034acdb128945670123456789abcdefabcdef01',
    studentName: 'Elena Rostova',
    studentId: 'TECH-BOE-4019',
    trackTitle: 'IT Hardware Maintenance & Diagnostic Engineering (CompTIA A+ Core 1 & 2)',
    certAuthority: 'NetMentor.AI Academic & Industrial Credentials Board',
    issuedDate: '2025-04-28',
    status: 'AUTHENTIC',
    merkleRoot: '0x12d88fa199320e4b',
    passScore: '97.0% (Honors)',
    skillsVerified: [
      'Component-Level Motherboard Diagnostic & Multimeter Rail Probing',
      'POST Code Hex Analysis & BIOS/UEFI Recovery',
      'Windows Registry & Crash Dump Forensics',
      'TIA-568B Cat6 Structured Cable Crimping & Continuity Verification'
    ]
  }
};

export const PublicCertificateVerification: React.FC = () => {
  const { navigateTo } = useAuth();
  const [inputHash, setInputHash] = useState<string>('0x8f4d92a1c0e3b745fa9912cd34ef567890abcdef1234567890abcdef12345678');
  const [searchedHash, setSearchedHash] = useState<string>('0x8f4d92a1c0e3b745fa9912cd34ef567890abcdef1234567890abcdef12345678');
  const [copied, setCopied] = useState<boolean>(false);

  const cert = VERIFIED_RECORDS[searchedHash];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedHash(inputHash.trim());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            PUBLIC CRYPTOGRAPHIC CREDENTIAL REGISTRY
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Employer Certificate Verification
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Instantly validate candidates' hands-on lab achievements, rubric performance grades, and SHA-256 digital certificate signatures.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter 64-char SHA-256 certificate hash..."
                value={inputHash}
                onChange={(e) => setInputHash(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition flex items-center justify-center gap-2 shrink-0"
            >
              <FileCheck className="w-4 h-4" />
              <span>Verify Signature</span>
            </button>
          </div>

          {/* Quick presets for demo */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
            <span className="text-slate-500">Sample Hashes:</span>
            <button
              type="button"
              onClick={() => {
                setInputHash('0x8f4d92a1c0e3b745fa9912cd34ef567890abcdef1234567890abcdef12345678');
                setSearchedHash('0x8f4d92a1c0e3b745fa9912cd34ef567890abcdef1234567890abcdef12345678');
              }}
              className="text-cyan-400 hover:underline"
            >
              [Alexandre Mercer — Cisco CCNA]
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => {
                setInputHash('0x4b71e29c884501a2d67f9911e034acdb128945670123456789abcdefabcdef01');
                setSearchedHash('0x4b71e29c884501a2d67f9911e034acdb128945670123456789abcdefabcdef01');
              }}
              className="text-emerald-400 hover:underline"
            >
              [Elena Rostova — CompTIA A+]
            </button>
          </div>
        </form>

        {/* Verification Result Card */}
        {cert ? (
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl shadow-emerald-500/5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      CRYPTOGRAPHICALLY AUTHENTIC
                    </span>
                    <span className="text-xs font-mono text-slate-500">Merkle ID: {cert.merkleRoot}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Verified Digital Certificate of Completion
                  </h2>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(window.location.href)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white text-xs font-mono transition"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copied ? 'Link Copied!' : 'Share Public Link'}</span>
              </button>
            </div>

            {/* Recipient Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 text-xs font-mono">
              <div className="space-y-3">
                <div>
                  <span className="text-slate-500 block uppercase">Recipient Name:</span>
                  <span className="text-white font-bold text-base">{cert.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase">Candidate ID:</span>
                  <span className="text-cyan-400">{cert.studentId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase">Credential Title:</span>
                  <span className="text-white font-medium">{cert.trackTitle}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-slate-500 block uppercase">Issuing Institution:</span>
                  <span className="text-slate-300">{cert.certAuthority}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase">Issued Date:</span>
                  <span className="text-slate-300">{cert.issuedDate} (Permanent Validity)</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase">Evaluation Standing:</span>
                  <span className="text-emerald-400 font-bold">{cert.passScore}</span>
                </div>
              </div>
            </div>

            {/* Practical Skills Verified */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Validated Performance Competencies:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cert.skillsVerified.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SHA Hash string */}
            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="truncate">Hash: <span className="text-slate-400">{cert.hash}</span></span>
              <span className="text-emerald-400 shrink-0">Audit Status: TAMPER-PROOF // VERIFIED</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-8 text-center space-y-3 animate-fadeIn">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Certificate Hash Not Found in Public Merkle Registry</h3>
            <p className="text-slate-400 text-xs font-mono max-w-md mx-auto">
              The provided hash string "{searchedHash}" does not correspond to an authentic credential issued by NetMentor.AI. Please inspect the hash string or contact academic verification.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
