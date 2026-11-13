import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  auth, 
  db, 
  googleProvider, 
  githubProvider,
  saveUserRole,
  getUserProgress,
  UserProfileData,
  UserProgressData
} from '../lib/firebase';
import { UserProfile, UserRole, AppView } from '../types/auth';

import { firestoreService } from '../services/firestoreService';

// Standard mock test personas for quick 1-click previewing of each of the 6 roles
export const TEST_PERSONAS: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr-student-01',
    name: 'Alexandre Mercer',
    email: 'alexandre.m@netmentor.io',
    role: 'student',
    track: 'dual',
    joinedDate: '2025-01-15',
    completedLabs: 14,
    totalLabs: 28,
    certReadiness: 78,
  },
  instructor: {
    id: 'usr-inst-01',
    name: 'Dr. Marcus Vance (CCIE #49120)',
    email: 'm.vance@netmentor.io',
    role: 'instructor',
    track: 'networking',
    joinedDate: '2024-06-10',
    completedLabs: 28,
    totalLabs: 28,
  },
  lab_tech: {
    id: 'usr-tech-01',
    name: 'Elena Rostova',
    email: 'e.rostova@netmentor.io',
    role: 'lab_tech',
    track: 'maintenance',
    joinedDate: '2024-09-01',
    completedLabs: 0,
    totalLabs: 0,
  },
  org_manager: {
    id: 'usr-org-01',
    name: 'Sarah Chen (Director of IT Ops)',
    email: 's.chen@nexusglobal.com',
    role: 'org_manager',
    track: 'dual',
    orgName: 'Nexus Global IT',
    joinedDate: '2024-11-12',
  },
  guardian: {
    id: 'usr-guard-01',
    name: 'Arthur Vance (Workforce Sponsor)',
    email: 'a.vance@workforce-initiative.org',
    role: 'guardian',
    track: 'networking',
    joinedDate: '2025-01-20',
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Christian Siaben (Platform Root)',
    email: 'christiansiabenankam@gmail.com',
    role: 'admin',
    track: 'dual',
    joinedDate: '2024-01-01',
  },
};

// Role view accessibility map
const ROLE_DEFAULT_VIEW: Record<UserRole, AppView> = {
  student: 'dashboard',
  instructor: 'teach',
  lab_tech: 'lab_ops',
  org_manager: 'org',
  guardian: 'guardian',
  admin: 'admin',
};

const PUBLIC_VIEWS: AppView[] = [
  'landing',
  'courses',
  'course_detail',
  'verify_cert',
  'for_business',
  'login',
  'signup',
  'forgot_password',
  'verify_email',
  'reset_password',
];

const ROLE_PERMITTED_VIEWS: Record<UserRole, AppView[]> = {
  student: [
    ...PUBLIC_VIEWS,
    'dashboard',
    'learn',
    'labs',
    'quiz',
    'progress',
    'profile',
    'tutor',
  ],
  instructor: [
    ...PUBLIC_VIEWS,
    'teach',
    'teach_courses',
    'teach_labs',
    'teach_gradebook',
    'teach_cohorts',
    'teach_qa',
    'labs', // Can test labs
  ],
  lab_tech: [
    ...PUBLIC_VIEWS,
    'lab_ops',
    'lab_ops_equipment',
    'lab_ops_spares',
    'lab_ops_maintenance',
    'lab_ops_faults',
  ],
  org_manager: [
    ...PUBLIC_VIEWS,
    'org',
    'org_seats',
    'org_reports',
    'org_billing',
  ],
  guardian: [
    ...PUBLIC_VIEWS,
    'guardian',
    'guardian_attendance',
    'guardian_grades',
    'guardian_alerts',
  ],
  admin: [
    // Admin has root access to all views
    ...PUBLIC_VIEWS,
    'dashboard',
    'learn',
    'labs',
    'quiz',
    'progress',
    'profile',
    'tutor',
    'teach',
    'teach_courses',
    'teach_labs',
    'teach_gradebook',
    'teach_cohorts',
    'teach_qa',
    'lab_ops',
    'lab_ops_equipment',
    'lab_ops_spares',
    'lab_ops_maintenance',
    'lab_ops_faults',
    'org',
    'org_seats',
    'org_reports',
    'org_billing',
    'guardian',
    'guardian_attendance',
    'guardian_grades',
    'guardian_alerts',
    'admin',
    'admin_users',
    'admin_students',
    'admin_rbac',
    'admin_tenants',
    'admin_audit',
    'admin_settings',
  ],
};

interface AuthContextType {
  user: UserProfile | null;
  currentView: AppView;
  redirectWarning: string | null;
  showRoleOnboarding: boolean;
  selectedCourseSlug: string | null;
  selectedLabId: string | null;
  clearRedirectWarning: () => void;
  navigateTo: (view: AppView) => void;
  setSelectedCourseSlug: (slug: string | null) => void;
  setSelectedLabId: (labId: string | null) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInAsRole: (role: UserRole) => void;
  registerWithRole: (role: UserRole, track: 'maintenance' | 'networking' | 'dual', name?: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  closeRoleOnboarding: () => void;
  saveUserRole: typeof saveUserRole;
  getUserProgress: typeof getUserProgress;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('netmentor_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setCurrentViewState] = useState<AppView>(() => {
    return user ? ROLE_DEFAULT_VIEW[user.role] : 'landing';
  });

  const [redirectWarning, setRedirectWarning] = useState<string | null>(null);
  const [showRoleOnboarding, setShowRoleOnboarding] = useState<boolean>(false);
  const [pendingFirebaseUser, setPendingFirebaseUser] = useState<FirebaseUser | null>(null);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>('cisco-ccna-200-301');
  const [selectedLabId, setSelectedLabId] = useState<string | null>('lab-vlan-trunking-01');

  // Helper: Synchronize user session from Firebase Auth and Firestore with automatic role routing
  const syncUserSessionAndRedirect = async (fbUser: FirebaseUser, shouldRedirect: boolean = true) => {
    const ADMIN_EMAIL = 'christiansiabenankam@gmail.com';
    const isAdmin = fbUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    try {
      let profile = await firestoreService.getUserProfile(fbUser.uid);
      if (!profile) {
        const progress = await getUserProgress(fbUser.uid);
        if (progress) {
          profile = {
            id: progress.userId,
            name: progress.displayName,
            email: progress.email,
            photoURL: fbUser.photoURL || undefined,
            role: (progress.role as UserRole) || 'student',
            track: progress.enrolledTrack === 'none' ? 'dual' : progress.enrolledTrack,
            completedLabs: progress.completedLabs,
            totalLabs: progress.totalLabs,
            certReadiness: progress.certReadiness,
            joinedDate: new Date().toISOString().split('T')[0],
            lastLoginAt: progress.lastLoginAt,
          };
        }
      }

      // Root Admin email guarantee
      if (isAdmin) {
        if (!profile) {
          await saveUserRole(fbUser.uid, {
            id: fbUser.uid,
            email: fbUser.email!,
            displayName: fbUser.displayName || 'Christian Siaben (Platform Root)',
            photoURL: fbUser.photoURL || null,
            role: 'admin',
            enrolledTrack: 'dual',
            completedLabs: 0,
            totalLabs: 28,
            certReadiness: 100,
          });
          profile = {
            id: fbUser.uid,
            name: fbUser.displayName || 'Christian Siaben (Platform Root)',
            email: fbUser.email!,
            photoURL: fbUser.photoURL || undefined,
            role: 'admin',
            track: 'dual',
            joinedDate: new Date().toISOString().split('T')[0],
            lastLoginAt: new Date().toISOString(),
          };
        } else if (profile.role !== 'admin') {
          profile.role = 'admin';
          await saveUserRole(fbUser.uid, {
            id: fbUser.uid,
            email: profile.email,
            role: 'admin',
          });
        }
      }

      if (profile) {
        setUser(profile);
        localStorage.setItem('netmentor_active_user', JSON.stringify(profile));
        setPendingFirebaseUser(null);
        setShowRoleOnboarding(false);

        if (shouldRedirect) {
          const authEntryViews: AppView[] = ['login', 'signup', 'forgot_password', 'verify_email', 'reset_password'];
          if (authEntryViews.includes(currentView)) {
            navigateTo(ROLE_DEFAULT_VIEW[profile.role]);
          }
        }
        return profile;
      } else {
        // Unregistered user: prompt role selection onboarding modal
        setPendingFirebaseUser(fbUser);
        setShowRoleOnboarding(true);
        return null;
      }
    } catch (err) {
      console.warn('Session synchronization warning:', err);
      return null;
    }
  };

  // Firebase auth state listener: keeps session & Firestore profile reactive
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        await syncUserSessionAndRedirect(fbUser, true);
      }
    });

    return () => unsubscribe();
  }, [currentView]);

  // Strict Role-Based Access Control Navigation Guard
  const navigateTo = (targetView: AppView) => {
    // If user is guest/unauthenticated
    if (!user) {
      if (PUBLIC_VIEWS.includes(targetView)) {
        setCurrentViewState(targetView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Protected route attempted: redirect to login
        setRedirectWarning('Authentication required: Please sign in to access engineering sandboxes and portal views.');
        setCurrentViewState('login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Admin has access to all views
    if (user.role === 'admin') {
      setCurrentViewState(targetView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Role verification
    const permittedViews = ROLE_PERMITTED_VIEWS[user.role] || PUBLIC_VIEWS;
    if (permittedViews.includes(targetView)) {
      setCurrentViewState(targetView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // User is attempting to access a view outside their assigned portal role
      const fallback = ROLE_DEFAULT_VIEW[user.role];
      const roleNames: Record<UserRole, string> = {
        student: 'Learner / Student',
        instructor: 'Instructor / SME',
        lab_tech: 'Lab Technician',
        org_manager: 'Org Manager',
        guardian: 'Guardian / Sponsor',
        admin: 'Platform Admin',
      };
      setRedirectWarning(
        `Access Restricted: Your registered database role is "${roleNames[user.role]}". You have been redirected to your primary workspace.`
      );
      setCurrentViewState(fallback);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const clearRedirectWarning = () => setRedirectWarning(null);

  // Sign in with Google: syncs with Firestore and redirects automatically
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const profile = await syncUserSessionAndRedirect(fbUser, false);
      if (profile) {
        navigateTo(ROLE_DEFAULT_VIEW[profile.role]);
      }
    } catch (err: any) {
      console.warn('Google sign in note: fallback to role selection', err);
      setShowRoleOnboarding(true);
    }
  };

  // Sign in with GitHub: syncs with Firestore and redirects automatically
  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const fbUser = result.user;
      const profile = await syncUserSessionAndRedirect(fbUser, false);
      if (profile) {
        navigateTo(ROLE_DEFAULT_VIEW[profile.role]);
      }
    } catch (err: any) {
      console.warn('GitHub sign in note: fallback to role selection', err);
      setShowRoleOnboarding(true);
    }
  };

  // 1-Click Test Persona Login (Supports immediate testing of all 7 roles)
  const signInAsRole = (role: UserRole) => {
    const profile = TEST_PERSONAS[role];
    setUser(profile);
    localStorage.setItem('netmentor_active_user', JSON.stringify(profile));
    navigateTo(ROLE_DEFAULT_VIEW[role]);
  };

  // Complete Role Registration Onboarding & Store in Firestore Database
  const registerWithRole = async (
    role: UserRole, 
    track: 'maintenance' | 'networking' | 'dual',
    customName?: string
  ) => {
    const uid = pendingFirebaseUser?.uid || `usr-${Date.now().toString(36)}`;
    const email = pendingFirebaseUser?.email || `${(customName || 'user').toLowerCase().replace(/\s+/g, '.')}@netmentor.io`;
    const displayName = customName || pendingFirebaseUser?.displayName || (role === 'admin' ? 'Christian Siaben (Platform Root)' : 'Registered Engineer');

    const profile: UserProfile = {
      id: uid,
      name: displayName,
      email,
      photoURL: pendingFirebaseUser?.photoURL || undefined,
      role,
      track,
      joinedDate: new Date().toISOString().split('T')[0],
      lastLoginAt: new Date().toISOString(),
      completedLabs: 0,
      totalLabs: 28,
      certReadiness: role === 'student' ? 75 : 100,
    };

    // 1. Write user profile data to Firestore using saveUserRole
    await saveUserRole(uid, {
      id: uid,
      email,
      displayName,
      photoURL: pendingFirebaseUser?.photoURL || undefined,
      role,
      enrolledTrack: track,
      completedLabs: profile.completedLabs,
      totalLabs: profile.totalLabs,
      certReadiness: profile.certReadiness,
    });

    // 2. Persist comprehensive document through firestoreService
    await firestoreService.saveUserRoleAndProfile(uid, {
      id: uid,
      email,
      displayName,
      photoURL: pendingFirebaseUser?.photoURL || undefined,
      role,
      enrolledTrack: track,
      completedLabs: profile.completedLabs,
      totalLabs: profile.totalLabs,
      certReadiness: profile.certReadiness,
    });

    setUser(profile);
    localStorage.setItem('netmentor_active_user', JSON.stringify(profile));
    setShowRoleOnboarding(false);
    setPendingFirebaseUser(null);
    navigateTo(ROLE_DEFAULT_VIEW[role]);
  };

  // Refresh user state and fetch persistent progress from Firestore
  const refreshUserProfile = async () => {
    if (!user) return;
    try {
      const fresh = await firestoreService.getUserProfile(user.id);
      if (fresh) {
        setUser(fresh);
        localStorage.setItem('netmentor_active_user', JSON.stringify(fresh));
        return;
      }
      const progress = await getUserProgress(user.id);
      if (progress) {
        const updated: UserProfile = {
          ...user,
          completedLabs: progress.completedLabs,
          totalLabs: progress.totalLabs,
          certReadiness: progress.certReadiness,
          role: (progress.role as UserRole) || user.role,
        };
        setUser(updated);
        localStorage.setItem('netmentor_active_user', JSON.stringify(updated));
      }
    } catch (err) {
      console.warn('Profile refresh note:', err);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      // Ignore
    }
    setUser(null);
    localStorage.removeItem('netmentor_active_user');
    setCurrentViewState('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentView,
        redirectWarning,
        showRoleOnboarding,
        selectedCourseSlug,
        selectedLabId,
        clearRedirectWarning,
        navigateTo,
        setSelectedCourseSlug,
        setSelectedLabId,
        signInWithGoogle,
        signInWithGithub,
        signInAsRole,
        registerWithRole,
        refreshUserProfile,
        signOut,
        closeRoleOnboarding: () => setShowRoleOnboarding(false),
        saveUserRole,
        getUserProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
