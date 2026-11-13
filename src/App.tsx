import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { RoleOnboardingModal } from './components/auth/RoleOnboardingModal';
import { LiveChatbot } from './components/common/LiveChatbot';

// Landing
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { InteractiveSandboxDemo } from './components/landing/InteractiveSandboxDemo';
import { CurriculumSection } from './components/landing/CurriculumSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { FaqSection } from './components/landing/FaqSection';
import { CallToActionBanner } from './components/landing/CallToActionBanner';
import { EnrollmentModal } from './components/landing/EnrollmentModal';

// Public Pages
import { CourseCatalogPage } from './components/public/CourseCatalogPage';
import { CourseDetailPage } from './components/public/CourseDetailPage';
import { PublicCertificateVerification } from './components/public/PublicCertificateVerification';
import { ForBusinessDemoPage } from './components/public/ForBusinessDemoPage';

// Auth Pages
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { VerifyEmailPage } from './components/auth/VerifyEmailPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';

// Learner Portal
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { CoursePlayerView } from './components/learner/CoursePlayerView';
import { InteractiveLabsView } from './components/learner/InteractiveLabsView';
import { QuizEngineView } from './components/learner/QuizEngineView';
import { SkillsProgressView } from './components/learner/SkillsProgressView';
import { StudentProfileView } from './components/learner/StudentProfileView';

// Instructor Portal
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { LabAuthoringView } from './components/instructor/LabAuthoringView';

// Lab Tech Portal
import { LabOpsDashboard } from './components/lab_tech/LabOpsDashboard';
import { ConsumablesSparesView } from './components/lab_tech/ConsumablesSparesView';

// Org Manager Portal
import { OrgDashboard } from './components/org/OrgDashboard';

// Guardian / Sponsor Portal
import { GuardianDashboard } from './components/guardian/GuardianDashboard';

// Admin Portal
import { AdminDashboard } from './components/admin/AdminDashboard';

function MainAppShell() {
  const { currentView, navigateTo, setSelectedLabId } = useAuth();
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollModalTrack, setEnrollModalTrack] = useState('networking');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Auth pages view wrapper
  const isAuthPage = [
    'login', 
    'signup', 
    'forgot_password', 
    'verify_email', 
    'reset_password'
  ].includes(currentView);

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <AuthLayout darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)}>
          {currentView === 'login' && <LoginPage />}
          {currentView === 'signup' && <SignupPage />}
          {currentView === 'forgot_password' && <ForgotPasswordPage />}
          {currentView === 'verify_email' && <VerifyEmailPage />}
          {currentView === 'reset_password' && <ResetPasswordPage />}
        </AuthLayout>
        <RoleOnboardingModal />
      </div>
    );
  }

  // Learner Dedicated Views with standalone layout
  if (currentView === 'learn') {
    return (
      <div className="min-h-screen bg-slate-950 font-sans">
        <CoursePlayerView />
        <RoleOnboardingModal />
      </div>
    );
  }

  if (currentView === 'labs') {
    return (
      <div className="min-h-screen bg-slate-950 font-sans">
        <InteractiveLabsView />
        <RoleOnboardingModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Unified Navbar */}
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />

      {/* Main View Router */}
      <main>
        {/* Public Views */}
        {currentView === 'landing' && (
          <>
            <HeroSection
              onOpenEnrollModal={(tr) => {
                if (tr) setEnrollModalTrack(tr);
                setIsEnrollModalOpen(true);
              }}
              onScrollToSandbox={() => {
                const el = document.getElementById('sandbox');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <FeaturesSection
              onOpenEnrollModal={() => setIsEnrollModalOpen(true)}
              onScrollToSandbox={() => {
                const el = document.getElementById('sandbox');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <InteractiveSandboxDemo
              onOpenEnrollModal={() => setIsEnrollModalOpen(true)}
            />
            <CurriculumSection
              onOpenEnrollModal={() => setIsEnrollModalOpen(true)}
            />
            <TestimonialsSection />
            <FaqSection />
            <CallToActionBanner
              onOpenEnrollModal={() => setIsEnrollModalOpen(true)}
            />
          </>
        )}

        {currentView === 'courses' && <CourseCatalogPage />}
        {currentView === 'course_detail' && <CourseDetailPage />}
        {currentView === 'verify_cert' && <PublicCertificateVerification />}
        {currentView === 'for_business' && <ForBusinessDemoPage />}

        {/* Learner Views */}
        {currentView === 'dashboard' && <StudentDashboard />}
        {currentView === 'tutor' && <StudentDashboard initialTab="tutor" />}
        {currentView === 'quiz' && <QuizEngineView />}
        {currentView === 'progress' && <SkillsProgressView />}
        {currentView === 'profile' && <StudentProfileView />}

        {/* Instructor Views */}
        {(currentView === 'teach' || currentView === 'teach_cohorts' || currentView === 'teach_gradebook' || currentView === 'teach_qa') && (
          <InstructorDashboard />
        )}
        {(currentView === 'teach_labs' || currentView === 'teach_courses') && (
          <LabAuthoringView />
        )}

        {/* Lab Tech Views */}
        {(currentView === 'lab_ops' || currentView === 'lab_ops_equipment' || currentView === 'lab_ops_maintenance' || currentView === 'lab_ops_faults') && (
          <LabOpsDashboard />
        )}
        {currentView === 'lab_ops_spares' && <ConsumablesSparesView />}

        {/* Org Manager Views */}
        {(currentView === 'org' || currentView === 'org_seats' || currentView === 'org_reports' || currentView === 'org_billing') && (
          <OrgDashboard />
        )}

        {/* Guardian Views */}
        {(currentView === 'guardian' || currentView === 'guardian_attendance' || currentView === 'guardian_grades' || currentView === 'guardian_alerts') && (
          <GuardianDashboard />
        )}

        {/* Admin Views */}
        {(currentView.startsWith('admin')) && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Quiet Footer for Public/Portal pages */}
      <Footer />

      {/* Global Enrollment Modal */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        initialTrack={enrollModalTrack}
        onClose={() => setIsEnrollModalOpen(false)}
      />

      {/* Database Onboarding Role Modal (Pops up when new user registers) */}
      <RoleOnboardingModal />

      {/* 24/7 Intelligent Live AI Chatbot Widget */}
      <LiveChatbot />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppShell />
      </AuthProvider>
    </LanguageProvider>
  );
}
