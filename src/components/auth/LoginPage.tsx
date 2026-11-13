import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  GraduationCap, 
  Presentation, 
  Wrench, 
  Building2, 
  ShieldCheck, 
  Terminal,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';

export const LoginPage: React.FC = () => {
  const { navigateTo, signInWithGoogle, signInWithGithub, signInAsRole } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both your registered email and password.');
      return;
    }
    // Automatically match role if email contains hint, otherwise default to student
    let role: UserRole = 'student';
    if (email.includes('instructor')) role = 'instructor';
    else if (email.includes('tech')) role = 'lab_tech';
    else if (email.includes('org') || email.includes('manager')) role = 'org_manager';
    else if (email.includes('guardian') || email.includes('sponsor')) role = 'guardian';
    else if (email.includes('admin') || email.includes('christian')) role = 'admin';

    signInAsRole(role);
  };

  const personaList: { role: UserRole; title: string; icon: React.ReactNode; color: string }[] = [
    { role: 'student', title: 'Learner (Alexandre)', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'hover:border-emerald-500 hover:text-emerald-400' },
    { role: 'instructor', title: 'Instructor (Dr. Vance)', icon: <Presentation className="w-3.5 h-3.5" />, color: 'hover:border-cyan-500 hover:text-cyan-400' },
    { role: 'lab_tech', title: 'Lab Tech (Elena)', icon: <Wrench className="w-3.5 h-3.5" />, color: 'hover:border-amber-500 hover:text-amber-400' },
    { role: 'org_manager', title: 'Org Manager (Sarah)', icon: <Building2 className="w-3.5 h-3.5" />, color: 'hover:border-purple-500 hover:text-purple-400' },
    { role: 'guardian', title: 'Sponsor (Arthur)', icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'hover:border-blue-500 hover:text-blue-400' },
    { role: 'admin', title: 'Admin Root (Christian)', icon: <Terminal className="w-3.5 h-3.5" />, color: 'hover:border-rose-500 hover:text-rose-400' },
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Sign In to NetMentor.AI
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Access your assigned engineering sandboxes, hardware diagnostic maps, and RBAC portals.
        </p>
      </div>

      {/* OAuth Buttons: Google & GitHub */}
      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={signInWithGithub}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium transition"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-[10px] font-mono uppercase">
          <span className="bg-slate-950 px-2 text-slate-500">{t('auth.testPersonas')}</span>
        </div>
      </div>

      {/* 1-Click Role Persona Quick Switcher (Supports testing all 7 roles easily) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
        {personaList.map((p) => (
          <button
            key={p.role}
            type="button"
            onClick={() => signInAsRole(p.role)}
            className={`p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 transition flex items-center gap-2 ${p.color}`}
          >
            <span className="shrink-0">{p.icon}</span>
            <span className="truncate text-[11px]">{p.title}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-[10px] font-mono uppercase">
          <span className="bg-slate-950 px-2 text-slate-500">{t('auth.orEmail')}</span>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="text-slate-400 block mb-1 uppercase">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alexandre.m@netmentor.io"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-400 block mb-1 uppercase">Master Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans text-xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <button
            type="button"
            onClick={() => navigateTo('forgot_password')}
            className="text-cyan-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:from-emerald-400 hover:to-cyan-400 transition flex items-center justify-center gap-2"
        >
          <span>Sign In to Assigned Portal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
        Don't have an engineering account?{' '}
        <button
          onClick={() => navigateTo('signup')}
          className="text-emerald-400 font-bold hover:underline"
        >
          Register & Choose Role
        </button>
      </div>
    </div>
  );
};
