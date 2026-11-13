import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Play, 
  CreditCard, 
  Lock, 
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { COURSES_DATA } from './CourseCatalogPage';

export const CourseDetailPage: React.FC = () => {
  const { navigateTo, selectedCourseSlug, user, setSelectedLabId } = useAuth();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const course = COURSES_DATA.find((c) => c.slug === selectedCourseSlug) || COURSES_DATA[0];

  const syllabusModules = [
    {
      number: 'Module 01',
      title: 'Foundational Architecture & Theory',
      duration: '1.5 Weeks',
      lessons: [
        'Hardware Form Factors, PCIe Lanes & ATX 24-Pin Pinouts',
        'OSI 7-Layer Deep-Dive & Encapsulation Headers',
        'IPv4 Binary Math, CIDR Notation & Subnetting Shortcuts',
      ],
      lab: 'Lab 01: Multimeter Voltage Probing on ATX Rails',
    },
    {
      number: 'Module 02',
      title: 'Virtual Switching & VLAN Trunking (802.1Q)',
      duration: '2 Weeks',
      lessons: [
        'Ethernet Frames & MAC Address Table Flooding',
        'Configuring Access Ports vs. 802.1Q Trunk Links',
        'Inter-VLAN Routing with Router-on-a-Stick (ROAS)',
      ],
      lab: 'Lab 02: Cisco IOS 2960 Trunking & Native VLAN Mismatch Fix',
    },
    {
      number: 'Module 03',
      title: 'Interior Gateway Protocols: Multi-Area OSPF',
      duration: '2.5 Weeks',
      lessons: [
        'Link-State Routing Algorithms & Dijkstra Shortest Path',
        'OSPF Area 0 Backbone & Non-Backbone Topologies',
        'LSA Types 1, 2, 3 and Route Summarization',
      ],
      lab: 'Lab 03: Multi-Area OSPFv2 Convergence & Neighbor Troubleshooting',
    },
    {
      number: 'Module 04',
      title: 'Security ACLs, Port Hardening & Capstone Exam',
      duration: '2 Weeks',
      lessons: [
        'Standard vs. Extended Numbered & Named ACLs',
        'DHCP Snooping & Dynamic ARP Inspection (DAI)',
        'Full Performance-Based Question (PBQ) Mock Exam Drill',
      ],
      lab: 'Lab 04: Capstone Comprehensive Enterprise Network Setup',
    },
  ];

  const handleEnroll = () => {
    if (!user) {
      navigateTo('signup');
    } else {
      setCheckoutModalOpen(true);
    }
  };

  const handleCompleteCheckout = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setCheckoutModalOpen(false);
      setPaymentSuccess(false);
      navigateTo('learn');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Back */}
        <button
          onClick={() => navigateTo('courses')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Directory</span>
        </button>

        {/* Hero Info Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                {course.cert}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300">
                {course.domain}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 100% Browser WASM Sandboxes
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {course.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Duration</span>
                <span className="text-white font-bold">{course.duration}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Virtual Labs</span>
                <span className="text-emerald-400 font-bold">{course.labsCount} Interactive</span>
              </div>
              <div>
                <span className="text-slate-500 block">Rating</span>
                <span className="text-amber-400 font-bold">★ {course.rating} / 5.0</span>
              </div>
              <div>
                <span className="text-slate-500 block">Level</span>
                <span className="text-white font-bold">{course.level}</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">
                Tuition & Sandbox Access
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{course.price}</span>
                <span className="text-xs text-slate-400 font-mono">billed monthly</span>
              </div>
              <ul className="space-y-2 pt-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Unlimited Cisco IOS-XE terminal sandbox time
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Context-aware Socratic AI tutor assistance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Verifiable digital certificate upon completion
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleEnroll}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold font-mono text-sm hover:from-emerald-400 hover:to-cyan-400 transition shadow-lg shadow-emerald-500/20"
              >
                Enroll in Track Now
              </button>
              <button
                onClick={() => {
                  setSelectedLabId('lab-vlan-trunking-01');
                  navigateTo('labs');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white transition flex items-center justify-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Test Live Lab Demo (Free)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Syllabus Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Syllabus & Certification Objectives Mapping
            </h2>
            <span className="text-xs font-mono text-slate-400">
              4 Modules • 12 Lessons • 4 Capstones
            </span>
          </div>

          <div className="space-y-4">
            {syllabusModules.map((mod, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                      {mod.number}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {mod.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {mod.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      Theoretical & Architecture Topics:
                    </div>
                    {mod.lessons.map((lesson, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-cyan-500 font-mono text-[10px] mt-0.5">[{lIdx + 1}]</span>
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <Terminal className="w-3.5 h-3.5" />
                        Practical Hands-On Assessment:
                      </div>
                      <div className="text-xs text-white font-medium">
                        {mod.lab}
                      </div>
                    </div>
                    <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-900 mt-2">
                      <span>Automated Rubric Graded</span>
                      <span className="text-cyan-400">Live IOS-XE CLI</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Stripe Checkout Simulation Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 font-mono text-xs space-y-4">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Stripe Secure Enrollment Gateway</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1">
              <div className="text-slate-400">Enrolling Track:</div>
              <div className="text-white font-bold">{course.title}</div>
              <div className="text-cyan-400 font-bold text-sm pt-1">{course.price}</div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Card Details (Simulated Sandboxed Checkout)</label>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>•••• •••• •••• 4242</span>
                  <span className="text-slate-500">12/28 • CVC 991</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>256-bit TLS encrypted transaction with instantaneous sandbox provisioning.</span>
              </div>
            </div>

            {paymentSuccess ? (
              <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-center font-bold">
                ✓ Enrollment Confirmed! Launching Course Player...
              </div>
            ) : (
              <button
                onClick={handleCompleteCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:from-emerald-400 hover:to-cyan-400 transition"
              >
                Confirm & Activate Sandbox
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
