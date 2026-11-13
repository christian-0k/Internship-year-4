import React from 'react';
import { ArrowRight, Terminal, Shield, CheckCircle } from 'lucide-react';

interface CallToActionBannerProps {
  onOpenEnrollModal: (track?: string) => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  onOpenEnrollModal,
}) => {
  return (
    <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-slate-900 dark:bg-slate-950 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Terminal className="w-3.5 h-3.5" />
          <span>Immediate Browser Access · Zero Setup</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ textWrap: 'balance' }}>
          Ready to Build Real Systems & Network Engineering Skills?
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
          Join over 4,200 technicians preparing for CompTIA A+, Network+, and Cisco CCNA certifications with live virtual hardware teardowns and packet topologies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenEnrollModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <span>Enroll in Training</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenEnrollModal('networking')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Request Enterprise Syllabus</span>
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>Instant sandbox activation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>No credit card required for preview labs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>Official CompTIA & Cisco Partner Vouchers</span>
          </div>
        </div>
      </div>
    </section>
  );
};
