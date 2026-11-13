import React from 'react';
import { Terminal, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-extrabold text-base tracking-tight">
              <div className="w-7 h-7 rounded-lg bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center text-white">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span>NetForge Academy</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Carrier-grade IT maintenance, hardware diagnosis, and network engineering training platform. Interactive simulated racks and live Linux/Cisco terminal environments.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>CompTIA Authorized Academy Partner · Cisco NetAcad Aligned</span>
            </div>
          </div>

          {/* Curriculum Links */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 dark:text-white text-xs tracking-wider uppercase">
              Curriculum Tracks
            </div>
            <ul className="space-y-2">
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">A+ Hardware Diagnostics</a></li>
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">CCNA Network Engineering</a></li>
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">Network Defense & ACLs</a></li>
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">Data Center Linux Admin</a></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 dark:text-white text-xs tracking-wider uppercase">
              Virtual Platform
            </div>
            <ul className="space-y-2">
              <li><a href="#sandbox" className="hover:text-slate-900 dark:hover:text-white transition-colors">Interactive Router CLI</a></li>
              <li><a href="#sandbox" className="hover:text-slate-900 dark:hover:text-white transition-colors">Spine-Leaf Visualizer</a></li>
              <li><a href="#sandbox" className="hover:text-slate-900 dark:hover:text-white transition-colors">Hardware Bench Multimeter</a></li>
              <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Automated Lab Grading</a></li>
            </ul>
          </div>

          {/* Certifications & Enterprise */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 dark:text-white text-xs tracking-wider uppercase">
              Certifications
            </div>
            <ul className="space-y-2">
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">CompTIA A+ (Core 1 & 2)</a></li>
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">CompTIA Network+ (N10-008)</a></li>
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cisco CCNA (200-301)</a></li>
              <li><a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">LPIC-1 Linux Administrator</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NetForge Academy Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Security Whitepaper</a>
            <a href="#" className="hover:underline">Status Page</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
