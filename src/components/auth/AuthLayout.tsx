import React from 'react';
import { Terminal, ArrowLeft, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface AuthLayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  darkMode,
  onToggleTheme,
}) => {
  const { navigateTo, currentView } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors font-sans">
      {/* Top Bar for Auth Pages */}
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2.5 text-slate-900 dark:text-white font-extrabold text-base tracking-tight hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 dark:bg-emerald-400 flex items-center justify-center text-slate-950 font-mono font-black text-xs shadow-xs">
                NM
              </div>
              <div className="flex items-center gap-1 font-mono">
                <span className="font-extrabold text-white">NetMentor</span>
                <span className="text-cyan-400 text-xs font-bold">.AI</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo('landing')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded font-bold transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded font-bold transition-all ${
                  language === 'fr'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                FR
              </button>
            </div>

            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme mode"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {currentView === 'login' ? (
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                New user?{' '}
                <button
                  onClick={() => navigateTo('signup')}
                  className="font-bold text-emerald-400 hover:underline"
                >
                  Create Account
                </button>
              </div>
            ) : currentView === 'signup' ? (
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                Have an account?{' '}
                <button
                  onClick={() => navigateTo('login')}
                  className="font-bold text-cyan-400 hover:underline"
                >
                  Sign In
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {children}
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-4 px-4 text-center text-xs font-mono text-slate-500">
        NetMentor.AI • Zero-Trust Firebase Identity & RBAC Gateway • 256-bit TLS
      </footer>
    </div>
  );
};
