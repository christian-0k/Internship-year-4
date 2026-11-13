import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Bot,
  Send,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Layers,
  Terminal,
  Clock,
} from 'lucide-react';
import { Course, Lesson, TranscriptLine } from '../types';

interface Props {
  course: Course;
  initialLessonId?: string;
  onLaunchLab: (labId: string) => void;
  onNavigate: (tab: string) => void;
}

export const CoursePlayerPage: React.FC<Props> = ({
  course,
  initialLessonId,
  onLaunchLab,
  onNavigate,
}) => {
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    course.lessons.find((l) => l.id === initialLessonId) || course.lessons[0]
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [activeTranscriptId, setActiveTranscriptId] = useState<string>('');

  // Socratic AI Tutor Side Panel State
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorMessages, setTutorMessages] = useState<
    { sender: 'user' | 'tutor'; text: string; timestampMark?: string }[]
  >([
    {
      sender: 'tutor',
      text: `Hello! I am monitoring "${activeLesson.title}". Ask me any question about the instructor's demonstration, socket pins, or protocol standards at your current timestamp.`,
    },
  ]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);

  // Sync active transcript line based on video time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Find matching transcript
    const match = [...activeLesson.transcript]
      .reverse()
      .find((t) => cur >= t.timestamp);
    if (match) {
      setActiveTranscriptId(match.id);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAskTutor = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tutorQuery.trim()) return;

    const query = tutorQuery.trim();
    const tsLabel = formatSeconds(currentTime);
    setTutorMessages((prev) => [
      ...prev,
      { sender: 'user', text: query, timestampMark: `@${tsLabel}` },
    ]);
    setTutorQuery('');
    setIsTutorThinking(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          lessonContext: `${course.title} - ${activeLesson.title} (${activeLesson.certObjectiveCode})`,
          activeTimestamp: tsLabel,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setTutorMessages((prev) => [...prev, { sender: 'tutor', text: data.reply }]);
          setIsTutorThinking(false);
          return;
        }
      }
      throw new Error('Fallback to heuristic tutor');
    } catch {
      let fallback = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('ground') || qLower.includes('esd') || qLower.includes('wrist')) {
        fallback = `At timestamp ${tsLabel}, the instructor grounds themselves because humans accumulate static electricity up to 10,000V. While harmless to touch, as little as 100V can permanently rupture a microscopic MOSFET silicon junction inside the CPU or RAM chips. What should the alligator clip be clamped to?`;
      } else if (qLower.includes('vlan') || qLower.includes('trunk') || qLower.includes('802.1q')) {
        fallback = `Notice at ${tsLabel} how untagged frames are assigned to the Native VLAN. If two switches have mismatched Native VLANs, broadcast traffic from VLAN 1 on Switch-A will leak into VLAN 99 on Switch-B. How does Spanning Tree react to this mismatch?`;
      } else {
        fallback = `Great observation at timestamp ${tsLabel}. In cert exams (CompTIA/CCNA), understanding this principle is tested on practical scenarios. Notice what the instructor emphasizes: always verify physical socket orientation and pin alignment before applying mechanical force.`;
      }

      setTutorMessages((prev) => [...prev, { sender: 'tutor', text: fallback }]);
      setIsTutorThinking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Breadcrumb & Cert Objective Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <button onClick={() => onNavigate('courses')} className="hover:text-cyan-600 dark:hover:text-cyan-400 font-mono transition-colors">
            Courses
          </button>
          <span>/</span>
          <span className="text-slate-500 dark:text-slate-400 truncate max-w-xs">{course.title}</span>
          <span>/</span>
          <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{activeLesson.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {activeLesson.certObjectiveCode}
          </span>
          {activeLesson.associatedLabId && (
            <button
              onClick={() => onLaunchLab(activeLesson.associatedLabId!)}
              className="px-3 py-1 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Lab Hands-On</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Player Grid: 2-Zone Layout (Video + Synced Transcript & AI Tutor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Video Viewport & Chapters (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-black shadow-2xl relative group">
            <video
              ref={videoRef}
              src={activeLesson.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
              className="w-full aspect-video object-cover"
              onClick={togglePlay}
            />

            {/* Custom Overlay Controls */}
            <div className="p-3 bg-slate-900/95 dark:bg-slate-950/90 border-t border-white/10 flex flex-col gap-2">
              {/* Progress Slider */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 dark:text-slate-400">
                <span>{formatSeconds(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  className="flex-1 accent-cyan-400 h-1 bg-slate-700 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <span>{formatSeconds(duration)}</span>
              </div>

              {/* Playback Controls & Rate Selector */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => seekTo(0)}
                    className="p-1.5 text-slate-300 hover:text-white"
                    title="Restart Video"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Speed Rates */}
                <div className="flex items-center gap-1 bg-slate-800/90 dark:bg-slate-900/80 px-2 py-0.5 rounded-lg border border-white/10">
                  <span className="text-[10px] text-slate-300 dark:text-slate-400 font-mono mr-1">Speed:</span>
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => changeRate(rate)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        playbackRate === rate ? 'text-cyan-300 font-bold bg-cyan-500/20' : 'text-slate-300 dark:text-slate-400 hover:text-white'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapters & Lesson Outline */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Video Chapter Milestones</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeLesson.chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => seekTo(ch.timestamp)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    currentTime >= ch.timestamp
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-800 dark:text-cyan-200 font-medium'
                      : 'bg-slate-100/70 dark:bg-white/5 border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span className="text-xs truncate font-medium">{ch.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 ml-2">{ch.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Synced Interactive Transcript & Timestamp AI Tutor (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Synchronized Transcript */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
              <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Synchronized Transcript
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Click line to seek</span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 text-xs">
              {activeLesson.transcript.map((line) => {
                const isCurrent = activeTranscriptId === line.id;
                return (
                  <div
                    key={line.id}
                    onClick={() => seekTo(line.timestamp)}
                    className={`p-2 rounded-xl cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-cyan-500/15 border border-cyan-500/50 text-cyan-900 dark:text-cyan-100 font-medium'
                        : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">
                      <span>{line.speaker}</span>
                      <span>{formatSeconds(line.timestamp)}</span>
                    </div>
                    <p className="leading-relaxed">{line.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Context-Aware AI Tutor Side-Panel */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-semibold text-slate-900 dark:text-white">Timestamp-Aware AI Tutor</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                Grounded @ {formatSeconds(currentTime)}
              </span>
            </div>

            {/* Chat History */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 text-xs">
              {tutorMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-950 dark:text-cyan-100 ml-4'
                      : 'bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-white/5 text-slate-800 dark:text-slate-200 mr-4'
                  }`}
                >
                  {msg.timestampMark && (
                    <span className="text-[9px] font-mono text-cyan-700 dark:text-cyan-400 block mb-0.5">
                      {msg.timestampMark}
                    </span>
                  )}
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
              {isTutorThinking && (
                <div className="text-xs text-slate-500 dark:text-slate-400 italic flex items-center gap-1.5">
                  <Bot className="w-3 h-3 text-cyan-500 animate-spin" />
                  <span>Socratic tutor cross-referencing lesson objectives...</span>
                </div>
              )}
            </div>

            {/* Prompt Form */}
            <form onSubmit={handleAskTutor} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={tutorQuery}
                onChange={(e) => setTutorQuery(e.target.value)}
                placeholder={`Ask about timestamp ${formatSeconds(currentTime)}...`}
                className="flex-1 glass-input rounded-xl px-3 py-1.5 text-xs font-sans text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!tutorQuery.trim()}
                className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 rounded-xl transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
