import React from 'react';
import { Cpu, Network, CheckCircle, Flame, Award, ArrowRight } from 'lucide-react';
import { PLATFORM_FEATURES } from '../../data/platformData';

interface FeaturesSectionProps {
  onOpenEnrollModal: (track?: string) => void;
  onScrollToSandbox: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenEnrollModal,
  onScrollToSandbox,
}) => {
  return (
    <section id="features" className="py-16 md:py-24 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-xs font-semibold tracking-wide uppercase text-cyan-600 dark:text-cyan-400 mb-2">
            Engineered For Physical Infrastructure & Packet Reality
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            Everything You Need to Diagnose Hardware and Configure Enterprise Networks
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Move beyond static slide decks. NetForge combines browser-virtualized hardware teardowns with carrier-grade Cisco and Linux command-line environments.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 (Large 2-column span): Hardware Diagnostic Workbench */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Hardware & Systems Support
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                01. Component-Level Hardware Diagnostic Workbench
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Inspect physical server motherboards, probe ATX power supply rails with virtual multimeters, decode 2-digit POST hex codes, and identify burned VRMs without frying physical equipment.
              </p>

              {/* Grid with photo & bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 aspect-4/3 relative bg-slate-950">
                  <img
                    src="/src/assets/images/hardware_diagnostics_bench_1793441725233.jpg"
                    alt="Hardware diagnostic workbench with multimeter and server motherboard"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-mono text-cyan-300">
                      POST Code: 0x7F · RAM Channel A OK
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {PLATFORM_FEATURES[0].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Mappable to CompTIA A+ Core 1 & 2</span>
              <button
                onClick={() => onOpenEnrollModal('hardware')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <span>View Hardware Labs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Automated Syntax & Routing Verification */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                Instant Automated Feedback
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                02. Real-Time Routing & Syntax Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Zero waiting for grading. Every command you enter is checked against strict RFC parameters and simulated packet ping sweeps.
              </p>

              {/* Interactive terminal code snippet preview */}
              <div className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
                <div className="text-slate-500"># Verification Engine Output</div>
                <div className="text-emerald-400">✓ VLAN 20 trunking: ACTIVE</div>
                <div className="text-emerald-400">✓ OSPF neighbor 10.0.1.2: FULL/BDR</div>
                <div className="text-amber-400">! Subnet mask alert on Gi0/2: /28 exceeds plan</div>
                <div className="text-cyan-400 font-semibold pt-1">Automated Score: 92/100</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={onScrollToSandbox}
                className="w-full py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Test in Live CLI Sandbox
              </button>
            </div>
          </div>

          {/* Card 3: Live Incident Response & Chaos Engineering */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5" />
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                Outage Drills
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                03. Chaos Outage Drills & MTTR Grading
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Test your composure under fire. Randomly dropped fiber links, spanning tree loops, and ARP poisoning incidents will test your systematic diagnostic speed.
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-800 dark:text-slate-200">Switch Broadcast Storm</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 text-[11px]">8 min MTTR Goal</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-800 dark:text-slate-200">Corrupted Routing Table</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 text-[11px]">12 min MTTR Goal</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">Trained on real NOC runbooks</span>
            </div>
          </div>

          {/* Card 4 (Large 2-column span): Enterprise Spine-Leaf Topology Simulator */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                  <Network className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Network Engineering & Datacenter
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                04. Enterprise Spine-Leaf & Data Center Topology Simulator
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Connect virtual routers, access layer switches, and stateful firewalls across redundant paths. Inspect packet headers at wire speed and debug real routing convergence protocols.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 aspect-4/3 relative bg-slate-950">
                  <img
                    src="/src/assets/images/network_topology_datacenter_1793441725094.jpg"
                    alt="Data center server aisle with network cabling and patch panels"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-mono text-cyan-300">
                      BGP ASN 65001 · 10GbE Redundant Fabric
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {PLATFORM_FEATURES[1].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Mappable to Cisco CCNA & CompTIA Network+</span>
              <button
                onClick={() => onOpenEnrollModal('networking')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <span>View Networking Labs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 5: Official Certification Readiness */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                Industry Accreditation
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                05. Exam Prep & Voucher Savings
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Take timed Performance-Based Question (PBQ) simulations identical to the actual Pearson VUE exam formats.
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-medium text-slate-900 dark:text-white">CompTIA Partner Savings</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Save up to 35%</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-medium text-slate-900 dark:text-white">Cisco CCNA PBQ Simulator</span>
                  <span className="text-cyan-600 dark:text-cyan-400">Included</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onOpenEnrollModal('security')}
                className="w-full py-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
              >
                View Certification Catalog →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
