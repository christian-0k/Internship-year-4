export type UserRole =
  | 'student'
  | 'instructor'
  | 'lab_tech'
  | 'org_manager'
  | 'guardian'
  | 'admin';

export type AppView =
  // Public
  | 'landing'
  | 'courses'
  | 'course_detail'
  | 'verify_cert'
  | 'for_business'
  // Auth
  | 'login'
  | 'signup'
  | 'forgot_password'
  | 'verify_email'
  | 'reset_password'
  // Learner
  | 'dashboard'
  | 'learn'
  | 'labs'
  | 'quiz'
  | 'progress'
  | 'profile'
  | 'tutor'
  // Instructor
  | 'teach'
  | 'teach_courses'
  | 'teach_labs'
  | 'teach_gradebook'
  | 'teach_cohorts'
  | 'teach_qa'
  // Lab Tech
  | 'lab_ops'
  | 'lab_ops_equipment'
  | 'lab_ops_spares'
  | 'lab_ops_maintenance'
  | 'lab_ops_faults'
  // Org Manager
  | 'org'
  | 'org_seats'
  | 'org_reports'
  | 'org_billing'
  // Guardian
  | 'guardian'
  | 'guardian_attendance'
  | 'guardian_grades'
  | 'guardian_alerts'
  // Admin
  | 'admin'
  | 'admin_users'
  | 'admin_students'
  | 'admin_rbac'
  | 'admin_tenants'
  | 'admin_audit'
  | 'admin_settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  track: 'maintenance' | 'networking' | 'dual' | 'none';
  joinedDate: string;
  lastLoginAt?: string;
  orgName?: string;
  completedLabs?: number;
  totalLabs?: number;
  certReadiness?: number;
}
