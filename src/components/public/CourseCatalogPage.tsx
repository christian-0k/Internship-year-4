import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Network, 
  Server, 
  SlidersHorizontal 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface Course {
  id: string;
  slug: string;
  title: string;
  domain: 'Hardware' | 'Operating Systems' | 'Networking' | 'Software';
  cert: 'CompTIA A+' | 'CompTIA Network+' | 'Cisco CCNA' | 'Linux LPIC-1';
  duration: string;
  labsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  objectives: string[];
  enrolledStudents: number;
  rating: number;
  price: string;
}

export const COURSES_DATA: Course[] = [
  {
    id: 'course-ccna',
    slug: 'cisco-ccna-200-301',
    title: 'Cisco CCNA 200-301 Enterprise Networking',
    domain: 'Networking',
    cert: 'Cisco CCNA',
    duration: '10 Weeks',
    labsCount: 42,
    level: 'Intermediate',
    description: 'Master routing, switching, VLAN trunking, multi-area OSPF, ACL security, and IP services using virtualized Cisco IOS-XE command-line sandboxes.',
    objectives: ['IPv4 & IPv6 Subnetting Mastery', 'VLANs, 802.1Q Trunks & Inter-VLAN Routing', 'Single & Multi-Area OSPFv2/v3', 'Standard & Extended Access Control Lists'],
    enrolledStudents: 1840,
    rating: 4.9,
    price: '$189 / mo',
  },
  {
    id: 'course-aplus-core1',
    slug: 'comptia-a-plus-core-1',
    title: 'CompTIA A+ Core 1: Hardware & Peripherals Architecture',
    domain: 'Hardware',
    cert: 'CompTIA A+',
    duration: '6 Weeks',
    labsCount: 28,
    level: 'Beginner',
    description: 'Hands-on component teardowns, power supply rail testing, RAM timing analysis, BIOS flashing, and thermal paste application in a 3D virtual workbench.',
    objectives: ['Motherboard Form Factors & Pinouts', 'Power Supply 12V/5V/3.3V Multimeter Probing', 'SATA, NVMe & PCIe Bus Architectures', 'Thermal Dissipation & Socket Mounting'],
    enrolledStudents: 2410,
    rating: 4.8,
    price: '$149 / mo',
  },
  {
    id: 'course-aplus-core2',
    slug: 'comptia-a-plus-core-2',
    title: 'CompTIA A+ Core 2: Operating Systems & Fault Recovery',
    domain: 'Operating Systems',
    cert: 'CompTIA A+',
    duration: '6 Weeks',
    labsCount: 26,
    level: 'Intermediate',
    description: 'Windows 11/10 and Linux LPIC system administration, registry forensics, crash dump analysis, malware removal, and automated PowerShell scripts.',
    objectives: ['CompTIA 6-Step Diagnostic Methodology', 'Windows Registry & Event Viewer Triage', 'Linux Terminal File Permissions & Grep', 'Automated Disk Recovery & Image Deployment'],
    enrolledStudents: 1980,
    rating: 4.9,
    price: '$149 / mo',
  },
  {
    id: 'course-netplus',
    slug: 'comptia-network-plus-n10-008',
    title: 'CompTIA Network+ N10-008: Infrastructure & Cables',
    domain: 'Networking',
    cert: 'CompTIA Network+',
    duration: '8 Weeks',
    labsCount: 34,
    level: 'Beginner',
    description: 'OSI 7-layer architecture, TIA/EIA-568B structured cabling, Wireshark packet sniffer analysis, DNS/DHCP server configuration, and wireless security.',
    objectives: ['T568A vs T568B RJ45 Cable Crimping', 'Wireshark TCP 3-Way Handshake Disassembly', 'Subnet Mask Calculation Under 30s', 'Wireless 802.11ax WPA3 Enterprise Setup'],
    enrolledStudents: 1650,
    rating: 4.7,
    price: '$169 / mo',
  },
  {
    id: 'course-linux',
    slug: 'linux-lpic-sysadmin',
    title: 'Enterprise Linux LPIC-1 Systems Administration',
    domain: 'Software',
    cert: 'Linux LPIC-1',
    duration: '8 Weeks',
    labsCount: 30,
    level: 'Intermediate',
    description: 'Command line fluency in Ubuntu and RHEL, systemd service management, bash automation scripts, and disk partitioning with LVM.',
    objectives: ['Bash Scripting & Cron Scheduling', 'Systemd Daemons & Journalctl Logs', 'LVM Storage Pool Provisioning', 'SSH Key Hardening & FirewallD'],
    enrolledStudents: 1120,
    rating: 4.9,
    price: '$159 / mo',
  },
];

export const CourseCatalogPage: React.FC = () => {
  const { navigateTo, setSelectedCourseSlug } = useAuth();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<string>('All');

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.cert.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || course.domain === selectedDomain;
    const matchesCert = selectedCert === 'All' || course.cert === selectedCert;
    return matchesSearch && matchesDomain && matchesCert;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              CERTIFICATION-ALIGNED SYLLABUS DIRECTORY
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Public Course & Lab Catalog
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Zero-install browser environments mapped to official CompTIA A+, CompTIA Network+, and Cisco CCNA industry standards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('verify_cert')}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-xs font-mono text-slate-300 hover:text-white transition"
            >
              Verify Credential Hash →
            </button>
            <button
              onClick={() => navigateTo('for_business')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs font-mono font-bold hover:from-emerald-400 hover:to-cyan-400 transition"
            >
              B2B Enterprise Team Quote
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by topic, e.g., 'OSPF', 'Motherboard', 'VLAN', 'Registry'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition font-mono"
              />
            </div>

            {/* Filter by Domain */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Domain:
              </span>
              {['All', 'Hardware', 'Operating Systems', 'Networking', 'Software'].map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition shrink-0 ${
                    selectedDomain === domain
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Cert */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/60">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Target Cert:
            </span>
            {['All', 'CompTIA A+', 'CompTIA Network+', 'Cisco CCNA', 'Linux LPIC-1'].map((cert) => (
              <button
                key={cert}
                onClick={() => setSelectedCert(cert)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition shrink-0 ${
                  selectedCert === cert
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900 transition-all hover:shadow-xl hover:shadow-cyan-500/5 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-800 text-cyan-400 border border-slate-700">
                    {course.cert}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {course.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Key Objectives */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Core Exam Objectives:
                  </div>
                  {course.objectives.slice(0, 3).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Specs and Actions */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    {course.labsCount} Sandbox Labs
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCourseSlug(course.slug);
                      navigateTo('course_detail');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition text-center"
                  >
                    View Syllabus
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCourseSlug(course.slug);
                      navigateTo('course_detail');
                    }}
                    className="py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>Enroll</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
            <Layers className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-white font-bold">No courses match your active criteria</div>
            <p className="text-slate-500 text-xs font-mono">Try adjusting your domain filter or search keywords.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('All');
                setSelectedCert('All');
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-cyan-400 hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
