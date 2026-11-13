import React, { useState } from 'react';
import {
  ShieldCheck,
  Terminal,
  Cpu,
  Bot,
  Network,
  Award,
  Layers,
  ArrowRight,
  Play,
  Users,
  CheckCircle2,
  Lock,
  Building2,
  Sparkles,
  BookOpen,
  GraduationCap,
  ChevronRight,
  FileCode,
} from 'lucide-react';
import { MicroCiscoCli } from '../components/landing/MicroCiscoCli';
import { MicroHardwareViewer } from '../components/landing/MicroHardwareViewer';
import { MicroCableCrimper } from '../components/landing/MicroCableCrimper';
import { MicroAiTutorDemo } from '../components/landing/MicroAiTutorDemo';
import { CredentialLookupWidget } from '../components/landing/CredentialLookupWidget';
import { COURSES } from '../data/mockData';

interface Props {
  onOpenEnroll: () => void;
  onOpenB2B: () => void;
  onNavigate: (tab: string) => void;
  onSelectCert: (hash: string) => void;
}

export const LandingPage: React.FC<Props> = ({
  onOpenEnroll,
  onOpenB2B,
  onNavigate,
  onSelectCert,
}) => {
  const [activeTrack, setActiveTrack] = useState<'maintenance' | 'networking'>('maintenance');
  const [activeDemoTab, setActiveDemoTab] = useState<'hardware' | 'cisco' | 'cable' | 'ai'>('hardware');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section with Track Switcher */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 max-w-7xl mx-auto text-center space-y-6">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Quiet Meta Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 dark:bg-cyan-500/10 border border-sky-500/20 dark:border-cyan-500/20 text-xs font-mono text-sky-700 dark:text-cyan-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation IT Training &amp; Certification Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none text-balance">
          Stop watching videos. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-500 bg-clip-text text-transparent">
            Build, diagnose, and configure
          </span>{' '}
          like a real engineer.
        </h1>

        {/* Value Subheading */}
        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The unified training platform that combines 3D computer disassembly, stateful Cisco CLI sandboxes, Socratic Gemini AI troubleshooting, and academic gradebook management.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenEnroll}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Launch Free Interactive Sandbox</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenB2B}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm dark:shadow-none"
          >
            <Building2 className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
            <span>Request Corporate Cohort Demo</span>
          </button>
        </div>

        {/* Track Segmented Selector */}
        <div className="pt-6 max-w-md mx-auto">
          <div className="p-1 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 grid grid-cols-2 gap-1 text-xs font-semibold shadow-sm dark:shadow-none">
            <button
              onClick={() => setActiveTrack('maintenance')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTrack === 'maintenance'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-400/40 dark:border-cyan-400/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>IT Maintenance (CompTIA A+)</span>
            </button>
            <button
              onClick={() => setActiveTrack('networking')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTrack === 'networking'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-400/40 dark:border-cyan-400/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Networking (Cisco CCNA)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Showcase Area */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-sky-600 dark:text-cyan-400 uppercase tracking-wider">Live In-Browser Sandboxes</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Experience the NetPulse Hands-On Workbench
            </h2>
          </div>

          {/* Interactive Demo Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/90 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium shadow-sm dark:shadow-none">
            <button
              onClick={() => setActiveDemoTab('hardware')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeDemoTab === 'hardware'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-500/30 dark:border-cyan-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>3D Motherboard</span>
            </button>
            <button
              onClick={() => setActiveDemoTab('cisco')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeDemoTab === 'cisco'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-500/30 dark:border-cyan-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Cisco IOS Terminal</span>
            </button>
            <button
              onClick={() => setActiveDemoTab('cable')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeDemoTab === 'cable'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-500/30 dark:border-cyan-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>RJ-45 Crimper</span>
            </button>
            <button
              onClick={() => setActiveDemoTab('ai')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                activeDemoTab === 'ai'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-500/30 dark:border-cyan-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Socratic AI Tutor</span>
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Display */}
        <div className="min-h-[460px]">
          {activeDemoTab === 'hardware' && <MicroHardwareViewer />}
          {activeDemoTab === 'cisco' && <MicroCiscoCli />}
          {activeDemoTab === 'cable' && <MicroCableCrimper />}
          {activeDemoTab === 'ai' && <MicroAiTutorDemo />}
        </div>
      </section>

      {/* Course Catalog Spotlight & Cert Alignment */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-sky-600 dark:text-cyan-400 uppercase tracking-wider">Vendor Aligned Curriculum</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">Featured Certification Pathways</h2>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="glass-card-interactive p-6 rounded-2xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono text-sky-600 dark:text-cyan-400 font-semibold">{course.certBadge}</span>
                  <span>{course.durationHours} hrs · {course.totalLabs} Labs</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{course.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{course.description}</p>

                {/* Objectives */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-white/5">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Core Exam Objectives Covered:</div>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {course.certObjectivesSummary.slice(0, 3).map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="truncate">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">Taught by</div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">{course.instructorName}</div>
                </div>
                <button
                  onClick={() => onNavigate('courses')}
                  className="px-4 py-2 bg-sky-500/15 hover:bg-sky-500/25 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 border border-sky-500/30 dark:border-cyan-500/40 text-sky-700 dark:text-cyan-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Syllabus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Pillars: Why NetPulse Outperforms Traditional Bootcamps */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono text-sky-600 dark:text-cyan-400 uppercase tracking-wider">The Engineering Advantage</div>
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Designed for Practical Competence, Not Memorization
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: <Terminal className="w-5 h-5 text-sky-600 dark:text-cyan-400" />,
              title: 'Fault Injection Engine',
              desc: 'Instructors inject real VLAN mismatches, bad patch cables, and corrupted bootloaders so students learn how to diagnose failures, not just copy scripts.',
            },
            {
              icon: <Bot className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
              title: 'Socratic Gemini AI Tutor',
              desc: 'Built with strict pedagogical guardrails. It never gives away lab answers, but guides learners line-by-line through cryptic CLI syntax and Windows BSOD dump logs.',
            },
            {
              icon: <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
              title: 'Video + Synced Transcripts',
              desc: 'Every lecture includes an auto-scrolling, searchable interactive transcript. Clicking any line seeks the video immediately to that timestamp.',
            },
            {
              icon: <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
              title: 'Integrated Student SMS',
              desc: 'Replace 4 disconnected tools. Instructors track cohort progress, mark physical bench attendance with QR check-in, and manage weighted gradebooks in one place.',
            },
            {
              icon: <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
              title: 'Cryptographic Transcripts',
              desc: 'Graduates receive HMAC-SHA256 digital certificates with verifiable public links, giving employers instant cryptographic proof of real-world competencies.',
            },
            {
              icon: <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
              title: 'Corporate B2B Cohort Ops',
              desc: 'Enterprise training managers can invite employees, manage seat licensing, view team certification pass rate analytics, and pay via Stripe invoicing.',
            },
          ].map((pillar, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{pillar.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Public Employer Credential Verification Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-4">
        <CredentialLookupWidget onSelectCert={onSelectCert} />
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-sky-500/30 dark:border-cyan-500/30 text-center space-y-5 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to earn your CompTIA or Cisco credentials?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Join over 4,800 technicians and engineers mastering hands-on IT diagnostics today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenEnroll}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
            >
              Start Free Learning Account
            </button>
            <button
              onClick={onOpenB2B}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/15 transition-colors"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
