import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  getDocFromServer,
  Firestore 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with explicit database ID as mandated by Firebase architecture
export const firestore: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const db = firestore; // Alias for seamless compatibility across imports

// Initialize Firebase Authentication & Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure Google Auth Provider custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Error handling helper required by Firebase integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(firestore, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline fallback engaged.');
      return false;
    }
    return true;
  }
}

/**
 * User Profile & Role Data payload definition
 */
export interface UserProfileData {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string | null;
  role: 'student' | 'instructor' | 'lab_tech' | 'org_manager' | 'guardian' | 'admin';
  enrolledTrack?: 'maintenance' | 'networking' | 'dual' | 'none';
  completedLabs?: number;
  totalLabs?: number;
  certReadiness?: number;
  orgName?: string | null;
  createdAt?: string;
  lastLoginAt?: string;
}

/**
 * User Progress Metrics definition for persistent dashboard state
 */
export interface UserProgressData {
  userId: string;
  role: string;
  displayName: string;
  email: string;
  enrolledTrack: 'maintenance' | 'networking' | 'dual' | 'none';
  completedLabs: number;
  totalLabs: number;
  certReadiness: number;
  lastActiveLabId?: string;
  lastLoginAt: string;
}

/**
 * Saves or updates user profile data to Firestore upon signup or onboarding.
 * Ensures the chosen role and profile attributes persist across all sessions.
 * Includes local storage caching for maximum resilience in demo and offline modes.
 */
export async function saveUserRole(
  userId: string,
  data: Partial<UserProfileData> & { email: string; role: UserProfileData['role'] }
): Promise<void> {
  const path = `users/${userId}`;
  const nowIso = new Date().toISOString();

  const record: UserProfileData = {
    id: userId,
    email: data.email,
    displayName: data.displayName || (data.role === 'admin' ? 'Platform Root Admin' : 'Registered Engineer'),
    photoURL: data.photoURL || null,
    role: data.role,
    enrolledTrack: data.enrolledTrack || 'dual',
    completedLabs: data.completedLabs ?? 0,
    totalLabs: data.totalLabs ?? 28,
    certReadiness: data.certReadiness ?? (data.role === 'student' ? 75 : 100),
    orgName: data.orgName || null,
    createdAt: data.createdAt || nowIso.split('T')[0],
    lastLoginAt: nowIso,
  };

  // Always mirror in localStorage for instantaneous dashboard hydration and offline resilience
  try {
    localStorage.setItem(`netmentor_user_${userId}`, JSON.stringify(record));
    localStorage.setItem(`netmentor_progress_${userId}`, JSON.stringify({
      userId,
      role: record.role,
      displayName: record.displayName,
      email: record.email,
      enrolledTrack: record.enrolledTrack,
      completedLabs: record.completedLabs,
      totalLabs: record.totalLabs,
      certReadiness: record.certReadiness,
      lastLoginAt: record.lastLoginAt,
    }));
  } catch (e) {
    console.warn('Local storage mirror note:', e);
  }

  try {
    const userDocRef = doc(firestore, 'users', userId);
    await setDoc(userDocRef, record, { merge: true });
  } catch (error) {
    // If permission or network issue, log structured error but do not break client session
    console.warn(`Firestore saveUserRole warning at ${path}:`, error);
    try {
      handleFirestoreError(error, OperationType.WRITE, path);
    } catch {
      // Allow fallback if offline
    }
  }
}

/**
 * Fetches user-specific progress and profile data for persistent dashboard state.
 * Retrieves live data from Firestore and falls back to local cached state if offline.
 */
export async function getUserProgress(userId: string): Promise<UserProgressData | null> {
  const path = `users/${userId}`;

  try {
    const userDocRef = doc(firestore, 'users', userId);
    const snap = await getDoc(userDocRef);

    if (snap.exists()) {
      const data = snap.data() as UserProfileData;
      const progress: UserProgressData = {
        userId: data.id || userId,
        role: data.role || 'student',
        displayName: data.displayName || 'Apprentice Engineer',
        email: data.email,
        enrolledTrack: data.enrolledTrack || 'dual',
        completedLabs: data.completedLabs ?? 0,
        totalLabs: data.totalLabs ?? 28,
        certReadiness: data.certReadiness ?? 75,
        lastLoginAt: data.lastLoginAt || new Date().toISOString(),
      };

      // Keep cache updated
      try {
        localStorage.setItem(`netmentor_progress_${userId}`, JSON.stringify(progress));
      } catch (e) {
        console.warn('Cache update note:', e);
      }

      return progress;
    }
  } catch (error) {
    console.warn(`Firestore getUserProgress warning at ${path}:`, error);
  }

  // Graceful fallback to cached progress if Firestore is unreachable or offline
  try {
    const cached = localStorage.getItem(`netmentor_progress_${userId}`);
    if (cached) {
      return JSON.parse(cached) as UserProgressData;
    }
  } catch (e) {
    console.warn('Cache read note:', e);
  }

  return null;
}
