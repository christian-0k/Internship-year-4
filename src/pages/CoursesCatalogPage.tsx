import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Award, CheckCircle2, ChevronRight, Play, ExternalLink } from 'lucide-react';
import { COURSES } from '../data/mockData';
import { Course } from '../types';

interface Props {
  onSelectCourse: (course: Course) => void;
  onOpenEnroll: () => void;
}

export const CoursesCatalogPage: React.FC<Props> = ({ onSelectCourse, onOpenEnroll }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [inspectCourse, setInspectCourse] = useState<Course | null>(null);

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.certBadge.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain =
      selectedDomain === 'all' ||
      (selectedDomain === 'hardware' && course.track === 'maintenance') ||
      (selectedDomain === 'networking' && course.track === 'networking');

    const matchesCert =
      selectedCert === 'all' ||
      (selectedCert === 'aplus' && course.certBadge.includes('A+')) ||
      (selectedCert === 'ccna' && course.certBadge.includes('CCNA'));

    return matchesSearch && matchesDomain && matchesCert;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-sky-600 dark:text-cyan-400 uppercase tracking-wider">Course Catalog</div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Vendor-Aligned Certification Curricula</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Every lesson and interactive lab is mapped directly to official CompTIA and Cisco exam objectives.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-panel p-4 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, cert objective, or keyword (e.g. DDR5, VLAN, OSPF)..."
              className="w-full glass-input rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm"
            />
          </div>

          {/* Domain Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-white/10 text-xs">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedDomain === 'all'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-500/30 dark:border-cyan-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Tracks
            </button>
            <button
              onClick={() => setSelectedDomain('hardware')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedDomain === 'hardware'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-500/30 dark:border-cyan-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Hardware &amp; OS (A+)
            </button>
            <button
              onClick={() => setSelectedDomain('networking')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedDomain === 'networking'
                  ? 'bg-sky-500/15 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 border border-sky-500/30 dark:border-cyan-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Networking (CCNA)
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="glass-card-interactive p-6 rounded-2xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-sky-600 dark:text-cyan-400 font-semibold px-2 py-0.5 rounded bg-sky-500/10 dark:bg-cyan-500/10 border border-sky-500/20 dark:border-cyan-500/20">
                  {course.certBadge}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">
                  {course.durationHours} hrs · {course.totalLabs} Hands-On Labs
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{course.title}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{course.description}</p>

              {/* Module & Lesson Breakdown Preview */}
              <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/60 dark:border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Lessons in Course ({course.lessons.length} Modules):
                </div>
                <div className="space-y-1.5">
                  {course.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-200 py-1 border-b border-slate-200/50 dark:border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Play className="w-3 h-3 text-sky-600 dark:text-cyan-400 shrink-0" />
                        <span className="truncate max-w-xs">{lesson.title}</span>
                      </div>
                      <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        {lesson.certObjectiveCode}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => setInspectCourse(course)}
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white underline font-mono"
              >
                Inspect Full Syllabus
              </button>

              <button
                onClick={() => onSelectCourse(course)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <span>Launch Course Player</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabus Detail Modal */}
      {inspectCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-panel rounded-2xl p-6 shadow-2xl bg-white dark:bg-slate-900 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-sky-600 dark:text-cyan-400">{inspectCourse.certBadge}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{inspectCourse.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{inspectCourse.description}</p>
              </div>
              <button
                onClick={() => setInspectCourse(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Exam Objectives Mapped:</h4>
              <div className="space-y-1.5">
                {inspectCourse.certObjectivesSummary.map((obj, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Instructor: <span className="text-slate-900 dark:text-white font-medium">{inspectCourse.instructorName}</span>
              </div>
              <button
                onClick={() => {
                  onSelectCourse(inspectCourse);
                  setInspectCourse(null);
                }}
                className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xl text-xs hover:opacity-95"
              >
                Start Learning This Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
