import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  BookOpen, 
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Question {
  id: string;
  domain: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Hard';
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    domain: 'Cisco Routing & Switching',
    difficulty: 'Intermediate',
    text: 'What happens when two Cisco switches connected via an 802.1Q trunk have mismatched Native VLANs?',
    options: [
      'The trunk line protocol is immediately shut down administratively',
      'Cisco Discovery Protocol (CDP) detects the mismatch and logs %CDP-4-NATIVE_VLAN_MISMATCH, risking traffic leakage across broadcast domains',
      'The switches automatically renegotiate the native VLAN using VTP version 3',
      'All 802.1Q tags are stripped and the switches operate in unmanaged hub mode'
    ],
    correctIndex: 1,
    explanation: 'When native VLANs mismatch, untagged frames sent by one switch are received by the other switch and assumed to belong to its configured native VLAN, causing cross-VLAN traffic leaking. CDP periodically verifies and logs this warning.'
  },
  {
    id: 'q2',
    domain: 'Hardware Maintenance',
    difficulty: 'Beginner',
    text: 'When probing an ATX 24-pin motherboard power supply connector with a digital multimeter, which voltage rail corresponds to the yellow wires?',
    options: [
      '+3.3V DC',
      '+5V DC',
      '+12V DC',
      '-12V DC'
    ],
    correctIndex: 2,
    explanation: 'Under standard ATX12V specifications: Yellow wires carry +12V (used for CPU VRMs, PCIe slots, and motor drives), Red wires carry +5V, Orange wires carry +3.3V, and Black wires are ground/common.'
  },
  {
    id: 'q3',
    domain: 'OS & Diagnostic Forensics',
    difficulty: 'Intermediate',
    text: 'Which Windows utility command extracts hardware abstraction layer and thermal logs from system crash dump files (.DMP) without booting into the GUI?',
    options: [
      'dism.exe /Online /Cleanup-Image /RestoreHealth',
      'sfc /scannow',
      'WinDbg !analyze -v',
      'chkdsk /f /r C:'
    ],
    correctIndex: 2,
    explanation: 'WinDbg (Windows Debugger) executing the "!analyze -v" extension performs an automated deep crash triage, isolating the offending driver module, faulting memory address, and bugcheck stop code.'
  },
  {
    id: 'q4',
    domain: 'Network Engineering',
    difficulty: 'Hard',
    text: 'In OSPFv2, why must all non-backbone areas connect directly to Area 0, and what mechanism is required if a physical connection is impossible?',
    options: [
      'To prevent routing loops through split-horizon rules; an OSPF Virtual Link must be configured traversing a transit non-backbone area',
      'Because Area 0 contains the only DNS server in the autonomous system',
      'To allow BGP route reflection; a GRE tunnel must be provisioned',
      'OSPF allows arbitrary non-backbone connections without Area 0 transit'
    ],
    correctIndex: 0,
    explanation: 'OSPF uses a two-tier hierarchy to prevent inter-area routing loops by enforcing a hub-and-spoke model where Area 0 acts as the backbone. If an area cannot physically connect to Area 0, a Virtual Link must be established across a transit area.'
  }
];

export const QuizEngineView: React.FC = () => {
  const { navigateTo } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigateTo('dashboard')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Quiz Progress Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between font-mono text-xs">
          <div>
            <span className="text-cyan-400 font-bold">ADAPTIVE CERTIFICATION DRILL</span>
            <div className="text-slate-400 mt-0.5">Domain: {currentQ.domain}</div>
          </div>
          <div className="text-right">
            <span className="text-white font-bold text-sm">
              Question {currentIndex + 1} of {QUESTIONS.length}
            </span>
            <div className="text-emerald-400">Score: {score}/{QUESTIONS.length}</div>
          </div>
        </div>

        {/* Question Card */}
        {!isFinished ? (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                  {currentQ.difficulty}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Instant Feedback Enabled
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-950 hover:border-slate-700 text-slate-200';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                  } else {
                    btnStyle = 'border-slate-800 bg-slate-950/20 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3 ${btnStyle}`}
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Technical Rationale & RFC Reference:</span>
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold flex items-center gap-1.5 hover:from-emerald-400 hover:to-cyan-400 transition"
                  >
                    <span>{currentIndex + 1 === QUESTIONS.length ? 'View Final Results' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto text-3xl font-bold">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Quiz Diagnostic Completed!</h2>
              <p className="text-slate-400 text-xs font-mono mt-1">
                You scored {score} out of {QUESTIONS.length} ({Math.round((score / QUESTIONS.length) * 100)}%)
              </p>
            </div>
            <div className="flex justify-center gap-3 font-mono text-xs">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={() => navigateTo('progress')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2"
              >
                <span>View Skills Radar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
