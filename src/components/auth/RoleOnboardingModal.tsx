import React, { useState } from 'react';
import { 
  GraduationCap, 
  Presentation, 
  Wrench, 
  Building2, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';

export const RoleOnboardingModal: React.FC = () => {
  const { showRoleOnboarding, registerWithRole, closeRoleOnboarding } = useAuth();
  const { t } = useLanguage();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [selectedTrack, setSelectedTrack] = useState<'maintenance' | 'networking' | 'dual'>('dual');
  const [fullName, setFullName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!showRoleOnboarding) return null;

  const roleCards: {
    role: UserRole;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      role: 'student',
      title: 'Learner / Student',
      subtitle: 'Self-paced certification prep, browser CLI sandboxes & Socratic AI co-pilot',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/20 text-emerald-400',
    },
    {
      role: 'instructor',
      title: 'Instructor / SME',
      subtitle: 'Course & YAML lab authoring, dynamic rubrics, cohort tracking & grading queue',
      icon: <Presentation className="w-5 h-5" />,
      color: 'border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/20 text-cyan-400',
    },
    {
      role: 'lab_tech',
      title: 'Lab Technician',
      subtitle: '24 physical bench map, hardware inventory, QR asset labels & fault diagnostics',
      icon: <Wrench className="w-5 h-5" />,
      color: 'border-amber-500/40 hover:border-amber-400 bg-amber-950/20 text-amber-400',
    },
    {
      role: 'org_manager',
      title: 'Org Manager (B2B)',
      subtitle: 'Team pass rate analytics, seat quotas, SCIM Okta directory sync & Stripe invoices',
      icon: <Building2 className="w-5 h-5" />,
      color: 'border-purple-500/40 hover:border-purple-400 bg-purple-950/20 text-purple-400',
    },
    {
      role: 'guardian',
      title: 'Guardian / Sponsor',
      subtitle: 'Apprentice dossier tracking, verified attendance, gradebooks & alert tripwires',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'border-blue-500/40 hover:border-blue-400 bg-blue-950/20 text-blue-400',
    },
    {
      role: 'admin',
      title: 'Platform Administrator',
      subtitle: 'Full command center APM, RBAC permission matrix, Merkle ledger & multi-tenant orgs',
      icon: <Terminal className="w-5 h-5" />,
      color: 'border-rose-500/40 hover:border-rose-400 bg-rose-950/20 text-rose-400',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await registerWithRole(selectedRole, selectedTrack, fullName.trim() || undefined);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeRoleOnboarding}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            DATABASE ONBOARDING GATEWAY
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {t('auth.selectRoleTitle')}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {t('auth.selectRoleDesc')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Full Legal / Professional Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Alexandre Mercer or Dr. Marcus Vance"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition font-sans text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Select Your Account Role (Registered in Firestore RBAC)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roleCards.map((item) => {
                const isSelected = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setSelectedRole(item.role)}
                    className={`text-left p-3.5 rounded-xl border transition relative flex items-start gap-3 ${
                      isSelected
                        ? `${item.color} ring-1 ring-emerald-500 shadow-lg`
                        : 'border-slate-800/80 bg-slate-950/50 hover:bg-slate-950 text-slate-300'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">
                          {item.title}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedRole === 'student' && (
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Primary Curriculum Track
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'maintenance', label: 'Hardware Maintenance', sub: 'CompTIA A+' },
                  { id: 'networking', label: 'Networking & Routing', sub: 'Cisco CCNA' },
                  { id: 'dual', label: 'Dual Specialization', sub: 'Full Stack IT' },
                ].map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setSelectedTrack(track.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      selectedTrack === track.id
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{track.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{track.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              Role: <span className="text-cyan-400 font-bold uppercase">{selectedRole}</span> // TLS 1.3
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-cyan-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Writing to Database...</span>
              ) : (
                <>
                  <span>Confirm Role & Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
