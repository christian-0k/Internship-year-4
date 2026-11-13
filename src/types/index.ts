export type LearningTrack = 'hardware' | 'networking' | 'security' | 'datacenter';
export type CertTrack = 'maintenance' | 'networking' | 'dual';

export interface CurriculumModule {
  id: string;
  track: LearningTrack;
  title: string;
  duration: string;
  labsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  certification: string;
  description: string;
  topics: string[];
}

export interface PlatformFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  image?: string;
  bullets: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  trackCompleted: string;
  impactMetric: string;
}

export interface TopologyNode {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'server' | 'firewall' | 'client';
  ip: string;
  status: 'healthy' | 'warning' | 'alert';
  traffic: string;
  vlan: number;
}

export interface WirePinout {
  pin: number;
  colorName: string;
  standard?: 'T568A' | 'T568B';
  hex?: string;
  hexColor?: string;
  stripeColor?: string;
}

export interface TranscriptLine {
  id: string;
  timestamp: number;
  speaker: string;
  text: string;
}

export interface LessonChapter {
  id: string;
  title: string;
  timestamp: number;
  duration: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  certObjectiveCode: string;
  duration: string;
  videoUrl: string;
  associatedLabId: string;
  chapters: LessonChapter[];
  transcript: TranscriptLine[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  track: 'maintenance' | 'networking' | 'dual';
  certBadge: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  totalLabs: number;
  rating: number;
  studentsEnrolled: number;
  instructorName: string;
  instructorTitle: string;
  modulesCount: number;
  prerequisites: string[];
  certObjectivesSummary: string[];
  lessons: Lesson[];
}

export interface CertificateRecord {
  hash: string;
  hmacSignature: string;
  recipientName: string;
  studentCode: string;
  certTitle: string;
  vendorAlignment: string;
  issueDate: string;
  expiryDate: string;
  gpa: number;
  labsCompletedCount: number;
  verifiedBy: string;
  status: 'valid' | 'revoked';
  skills: string[];
}

export interface EquipmentItem {
  id: string;
  assetTag: string;
  model: string;
  category: string;
  serialNumber: string;
  benchNumber: number;
  status: 'Operational' | 'Faulty' | 'Maintenance';
  reportedIssue?: string;
  lastServicedDate: string;
  nextAuditDate: string;
}

export interface RubricTask {
  id: string;
  task: string;
  points: number;
  completed: boolean;
}

export interface LabScenario {
  id: string;
  type: string;
  title: string;
  certTrack: string;
  certObjective: string;
  difficulty: string;
  estimatedMinutes: number;
  scenarioBrief: string;
  faultScenario: {
    isInjected: boolean;
    name: string;
    description: string;
    hint: string;
    solutionState: string;
  };
  rubric: RubricTask[];
}

export interface StudentSMSProfile {
  studentId: string;
  name: string;
  studentCode: string;
  email: string;
  cohort: string;
  track: string;
  attendanceRate: number;
  gradeAverage: number;
  completedLabsCount?: number;
  atRiskFlagsCount?: number;
  smsNotificationEnabled?: boolean;
  totalBenchHours?: number;
  status?: string;
  quizzesAverage?: number;
  labsAverage?: number;
  finalExamGrade?: number;
  riskReasons?: string[];
  guardianEmail?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  track: string;
  avatar?: string;
  studentCode?: string;
  organization?: string;
  cohortId?: string;
  bio?: string;
  joinedDate?: string;
  completedLabs?: number;
  totalLabs?: number;
}
