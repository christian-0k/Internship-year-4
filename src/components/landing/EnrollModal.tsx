import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { CertTrack } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (name: string, track: CertTrack) => void;
}

export const EnrollModal: React.FC<Props> = ({ isOpen, onClose, onComplete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState<CertTrack>('dual');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate'>('beginner');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(name || 'Aspiring Specialist', track);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-2xl border border-white/15 p-6 shadow-2xl bg-slate-900/90 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            FREE STUDENT ENROLLMENT
          </div>
          <h3 className="text-xl font-bold text-white mt-2">Start Your Certification Journey</h3>
          <p className="text-xs text-slate-300 mt-1">
            Choose your target career path to configure your interactive 3D workbench and Cisco CLI training sandbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full glass-input rounded-lg px-3 py-2 text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.rivera@example.com"
              className="w-full glass-input rounded-lg px-3 py-2 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Select Career Track</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  id: 'dual' as CertTrack,
                  title: 'Dual-Track: IT Maintenance + CCNA (Recommended)',
                  desc: 'Full hands-on curriculum covering both physical PC repair and enterprise Cisco routing.',
                },
                {
                  id: 'maintenance' as CertTrack,
                  title: 'CompTIA A+ Hardware & OS Recovery',
                  desc: 'Focus on 3D motherboard assembly, component replacement, and Windows/Linux fault recovery.',
                },
                {
                  id: 'networking' as CertTrack,
                  title: 'Cisco CCNA (200-301) Enterprise Routing',
                  desc: 'Focus on IOS command line, VLANs, trunking, Wireshark packet capture, and subnetting.',
                },
              ].map((t) => (
                <div
                  key={t.id}
                  onClick={() => setTrack(t.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    track === t.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                      : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-cyan-300">{t.title}</span>
                    {track === t.id && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <span>Launch My Interactive Training Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
