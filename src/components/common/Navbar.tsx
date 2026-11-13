import React, { useState } from 'react';
import { 
  Terminal, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  LogIn, 
  User, 
  ShieldAlert, 
  ChevronDown, 
  LogOut, 
  Languages, 
  Layers, 
  GraduationCap, 
  Presentation, 
  Wrench, 
  Building2, 
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types/auth';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleTheme }) => {
  const { user, currentView, navigateTo, signOut, signInAsRole, redirectWarning, clearRedirectWarning } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    student: {
      label: t('role.student'),
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    instructor: {
      label: t('role.instructor'),
      icon: <Presentation className="w-3.5 h-3.5" />,
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    },
    lab_tech: {
      label: t('role.lab_tech'),
      icon: <Wrench className="w-3.5 h-3.5" />,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    org_manager: {
      label: t('role.org_manager'),
      icon: <Building2 className="w-3.5 h-3.5" />,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
    guardian: {
      label: t('role.guardian'),
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    admin: {
      label: t('role.admin'),
      icon: <Terminal className="w-3.5 h-3.5" />,
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    },
  };

  return (
    <>
      {/* RBAC Redirect Notification Banner */}
      {redirectWarning && (
        <div className="bg-amber-950/90 border-b border-amber-500/40 px-4 py-2 text-xs text-amber-200 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-mono text-xs">{redirectWarning}</span>
          </div>
          <button
            onClick={clearRedirectWarning}
            className="p-1 hover:text-white rounded"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark */}
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2.5 text-left text-slate-900 dark:text-white font-black text-lg tracking-tight shrink-0 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 dark:bg-emerald-400 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform font-mono font-black text-xs">
              NM
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold tracking-tight">NetMentor</span>
                <span className="text-cyan-500 dark:text-cyan-400 font-mono text-xs font-bold">.AI</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                IT & NETWORKING
              </span>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => navigateTo('landing')}
              className={`hover:text-emerald-500 transition-colors ${currentView === 'landing' ? 'text-emerald-500 font-bold' : ''}`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => navigateTo('courses')}
              className={`hover:text-emerald-500 transition-colors ${currentView === 'courses' ? 'text-emerald-500 font-bold' : ''}`}
            >
              {t('nav.courses')}
            </button>
            <button
              onClick={() => navigateTo(user?.role === 'instructor' ? 'teach_labs' : 'labs')}
              className={`hover:text-emerald-500 transition-colors ${currentView === 'labs' ? 'text-emerald-500 font-bold' : ''}`}
            >
              {t('nav.labs')}
            </button>
            {user?.role === 'student' && (
              <button
                onClick={() => navigateTo('tutor')}
                className={`hover:text-cyan-400 transition-colors flex items-center gap-1.5 ${currentView === 'tutor' ? 'text-cyan-400 font-bold' : ''}`}
              >
                <span>AI Tutor</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            )}
            <button
              onClick={() => navigateTo('verify_cert')}
              className={`hover:text-emerald-500 transition-colors ${currentView === 'verify_cert' ? 'text-emerald-500 font-bold' : ''}`}
            >
              {t('nav.verify')}
            </button>
            <button
              onClick={() => navigateTo(user?.role === 'org_manager' ? 'org' : 'for_business')}
              className={`hover:text-emerald-500 transition-colors ${currentView === 'for_business' || currentView === 'org' ? 'text-emerald-500 font-bold' : ''}`}
            >
              {t('nav.business')}
            </button>
          </nav>

          {/* Controls: Language Switcher, Theme Toggle, Auth Persona */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Switcher (Compact EN / FR segmented pill) */}
            <div 
              className="flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-xs font-mono"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded font-bold transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded font-bold transition-all ${
                  language === 'fr'
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Français"
              >
                FR
              </button>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme mode"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User State & Role Persona Switcher */}
            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 dark:bg-emerald-400 dark:hover:bg-emerald-300 rounded-lg shadow-sm transition-colors font-mono"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('nav.login')}</span>
                </button>
                <button
                  onClick={() => navigateTo('signup')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-slate-800 rounded-lg transition-colors font-mono"
                >
                  <span>{t('nav.signup')}</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-1.5">
                  {/* Current Active Role Badge & Portal Jump */}
                  <button
                    onClick={() => {
                      if (user.role === 'student') navigateTo('dashboard');
                      else if (user.role === 'instructor') navigateTo('teach');
                      else if (user.role === 'lab_tech') navigateTo('lab_ops');
                      else if (user.role === 'org_manager') navigateTo('org');
                      else if (user.role === 'guardian') navigateTo('guardian');
                      else navigateTo('admin');
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-medium transition ${roleLabels[user.role]?.color}`}
                    title="Open your assigned portal"
                  >
                    {roleLabels[user.role]?.icon}
                    <span className="hidden sm:inline font-bold">
                      {roleLabels[user.role]?.label.split(' ')[0]}
                    </span>
                    <span className="hidden md:inline text-[10px] opacity-75">
                      ({user.name.split(' ')[0]})
                    </span>
                  </button>

                  {/* Switch Role Quick Dropdown */}
                  <button
                    onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                    aria-label="Switch persona"
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Logout */}
                  <button
                    onClick={signOut}
                    title={t('nav.logout')}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Role Switcher Menu */}
                {roleSwitcherOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn font-mono text-xs">
                    <div className="px-3 py-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                      Switch Role Persona (Preview Mode)
                    </div>
                    <div className="py-1 space-y-1">
                      {(['student', 'instructor', 'lab_tech', 'org_manager', 'guardian', 'admin'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            signInAsRole(r);
                            setRoleSwitcherOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition ${
                            user.role === r
                              ? 'bg-slate-800 text-white font-bold'
                              : 'text-slate-300 hover:bg-slate-950 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {roleLabels[r]?.icon}
                            <span>{roleLabels[r]?.label}</span>
                          </div>
                          {user.role === r && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="pt-1 border-t border-slate-800 flex justify-between">
                      <button
                        onClick={() => {
                          setRoleSwitcherOpen(false);
                          signOut();
                        }}
                        className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-rose-950/30 rounded-lg flex items-center gap-1.5"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3 font-mono text-xs">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('landing');
                }}
                className="text-left px-3 py-2 rounded-md hover:bg-slate-800"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('courses');
                }}
                className="text-left px-3 py-2 rounded-md hover:bg-slate-800"
              >
                {t('nav.courses')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(user?.role === 'instructor' ? 'teach_labs' : 'labs');
                }}
                className="text-left px-3 py-2 rounded-md hover:bg-slate-800"
              >
                {t('nav.labs')}
              </button>
              {user?.role === 'student' && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('tutor');
                  }}
                  className="text-left px-3 py-2 rounded-md hover:bg-slate-800 text-cyan-400 font-bold flex items-center gap-2"
                >
                  <span>AI Tutor</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('verify_cert');
                }}
                className="text-left px-3 py-2 rounded-md hover:bg-slate-800"
              >
                {t('nav.verify')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(user?.role === 'org_manager' ? 'org' : 'for_business');
                }}
                className="text-left px-3 py-2 rounded-md hover:bg-slate-800"
              >
                {t('nav.business')}
              </button>
            </div>
            
            <div className="pt-2 border-t border-slate-800 space-y-2">
              {!user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('login');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-400 text-slate-950 font-bold"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{t('nav.login')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('signup');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-slate-800 text-slate-300"
                  >
                    <span>{t('nav.signup')}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('nav.logout')}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
