import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Network, 
  Server, 
  Terminal, 
  Bot, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { HERO_METRICS } from '../../data/platformData';

interface HeroSectionProps {
  onOpenEnrollModal: (track?: string) => void;
  onScrollToSandbox: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnrollModal,
  onScrollToSandbox,
}) => {
  const { t } = useLanguage();
  const { navigateTo, setSelectedLabId } = useAuth();
  const [activeTrack, setActiveTrack] = useState<'maintenance' | 'networking'>('networking');

  return (
    <section id="overview" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('hero.badge')}
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]" style={{ textWrap: 'balance' }}>
              {t('hero.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">{t('hero.title2')}</span>
            </h1>

            {/* Value Proposition Body */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>

            {/* Track Selector Tabs (IT Maintenance vs Networking) */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex max-w-md font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTrack('networking')}
                className={`flex-1 py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTrack === 'networking'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Enterprise Networking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTrack('maintenance')}
                className={`flex-1 py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTrack === 'maintenance'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>IT Maintenance</span>
              </button>
            </div>

            {/* Track Dynamic Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 max-w-xl text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {activeTrack === 'networking' ? <Network className="w-4 h-4 text-cyan-400" /> : <Cpu className="w-4 h-4 text-emerald-400" />}
                <span>{activeTrack === 'networking' ? t('track.netTitle') : t('track.itTitle')}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {activeTrack === 'networking' ? t('track.netDesc') : t('track.itDesc')}
              </p>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs">
              <button
                onClick={() => navigateTo('login')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-slate-950 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-xl shadow-lg shadow-emerald-500/10 transition-all whitespace-nowrap"
              >
                <span>{t('nav.login')} / Access Sandboxes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedLabId('lab-vlan-trunking-01');
                  navigateTo('labs');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors whitespace-nowrap"
              >
                <Terminal className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>{t('hero.trySandbox')}</span>
              </button>
            </div>

            {/* Trust bullet features */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero local hypervisors required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Live WASM Cisco IOS CLI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Socratic AI guided hint loops</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Sandbox Terminal Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl p-4 sm:p-5 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="ml-2 font-bold text-slate-800 dark:text-slate-200">Switch-01 // IOS-XE 17.6</span>
                </div>
                <span className="text-emerald-500 font-bold">● LIVE SANDBOX</span>
              </div>

              {/* Console preview output */}
              <div className="bg-slate-950 text-slate-300 p-4 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
                <div className="text-slate-500"># Initializing 802.1Q Native Trunking Pod...</div>
                <div className="text-emerald-400">Switch-01# show ip interface brief</div>
                <div className="text-slate-400 font-mono text-[10px]">
                  Gi0/1 &nbsp;unassigned &nbsp;YES unset &nbsp;up &nbsp;up<br />
                  Vlan99 192.168.99.1 YES manual up &nbsp;up
                </div>
                <div className="text-amber-400 font-mono text-[10px] pt-1">
                  *CDP: Native VLAN mismatch discovered (1 vs 99).
                </div>
                <div className="text-cyan-400 font-mono text-[10px] pt-1">
                  [Socratic AI]: "Notice the native VLAN mismatch. How should Gi0/1 be configured?"
                </div>
              </div>

              {/* Quick Action button */}
              <button
                onClick={() => {
                  setSelectedLabId('lab-vlan-trunking-01');
                  navigateTo('labs');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold transition flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800"
              >
                <span>Launch Interactive WASM Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Technical Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 font-mono">
          {HERO_METRICS.map((metric, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
