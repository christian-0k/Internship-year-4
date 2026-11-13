import React, { useState } from 'react';
import { CURRICULUM_MODULES } from '../../data/platformData';
import { LearningTrack } from '../../types';
import { Clock, BookOpen, Award, ArrowRight, Check } from 'lucide-react';

interface CurriculumSectionProps {
  onOpenEnrollModal: (track?: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  onOpenEnrollModal,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack | 'all'>('all');

  const filteredModules = selectedTrack === 'all'
    ? CURRICULUM_MODULES
    : CURRICULUM_MODULES.filter((m) => m.track === selectedTrack);

  return (
    <section id="curriculum" className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wide uppercase text-cyan-600 dark:text-cyan-400 mb-2">
            Structured Pathways
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            Comprehensive Curriculum Built Around Industry Certification Objectives
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Each track includes guided virtual labs, unassisted fault isolation challenges, and performance-based exam simulations.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-1 bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg w-fit">
          <button
            onClick={() => setSelectedTrack('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTrack === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Tracks (6)
          </button>
          <button
            onClick={() => setSelectedTrack('hardware')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTrack === 'hardware'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Hardware & Maintenance
          </button>
          <button
            onClick={() => setSelectedTrack('networking')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTrack === 'networking'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Network Infrastructure (CCNA / Net+)
          </button>
          <button
            onClick={() => setSelectedTrack('security')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTrack === 'security'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Network Defense & ACLs
          </button>
          <button
            onClick={() => setSelectedTrack('datacenter')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTrack === 'datacenter'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Data Center Linux
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Metadata kicker without pill frames */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3 font-mono">
                  <span>{item.level}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
                    <Award className="w-3.5 h-3.5" />
                    {item.certification}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Topics list */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider mb-2">
                    Core Lab Exercises:
                  </div>
                  {item.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Footer Strip */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.duration}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {item.labsCount} Labs
                  </span>
                </div>
                <button
                  onClick={() => onOpenEnrollModal(item.track)}
                  className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Select Track</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
