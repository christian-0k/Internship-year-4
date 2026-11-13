import React, { useState } from 'react';
import { Network, CheckCircle2, AlertOctagon, RotateCcw, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { WirePinout } from '../../types';

const T568B_PINS: WirePinout[] = [
  { pin: 1, colorName: 'White / Orange', hexColor: '#f97316', stripeColor: '#ffffff' },
  { pin: 2, colorName: 'Orange', hexColor: '#ea580c' },
  { pin: 3, colorName: 'White / Green', hexColor: '#22c55e', stripeColor: '#ffffff' },
  { pin: 4, colorName: 'Blue', hexColor: '#2563eb' },
  { pin: 5, colorName: 'White / Blue', hexColor: '#3b82f6', stripeColor: '#ffffff' },
  { pin: 6, colorName: 'Green', hexColor: '#16a34a' },
  { pin: 7, colorName: 'White / Brown', hexColor: '#a16207', stripeColor: '#ffffff' },
  { pin: 8, colorName: 'Brown', hexColor: '#78350f' },
];

export const MicroCableCrimper: React.FC = () => {
  // Let user rearrange or test a scrambled order
  const [standard, setStandard] = useState<'T568B' | 'T568A'>('T568B');
  const [currentPins, setCurrentPins] = useState<WirePinout[]>([
    T568B_PINS[0],
    T568B_PINS[1],
    T568B_PINS[4], // intentionally swapped pin 3 & 5 for interactive troubleshooting
    T568B_PINS[3],
    T568B_PINS[2],
    T568B_PINS[5],
    T568B_PINS[6],
    T568B_PINS[7],
  ]);
  const [testResult, setTestResult] = useState<{
    tested: boolean;
    pass: boolean;
    activePins: boolean[];
    message: string;
  } | null>(null);

  const swapPins = (idx1: number, idx2: number) => {
    const updated = [...currentPins];
    const temp = updated[idx1];
    updated[idx1] = updated[idx2];
    updated[idx2] = temp;
    setCurrentPins(updated);
    setTestResult(null);
  };

  const setCorrectT568B = () => {
    setCurrentPins([...T568B_PINS]);
    setTestResult(null);
  };

  const runTester = () => {
    const isCorrect = currentPins.every((p, idx) => p.pin === idx + 1);
    setTestResult({
      tested: true,
      pass: isCorrect,
      activePins: currentPins.map((p, idx) => p.pin === idx + 1),
      message: isCorrect
        ? 'Pass! 1000BASE-T Gigabit continuity verified across all 4 twisted pairs. Low NEXT crosstalk.'
        : 'Fail! Split Pair detected on Pin 3 & Pin 5. Gigabit Ethernet will fail auto-negotiation or drop packets.',
    });
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 shadow-2xl p-5 space-y-4">
      {/* Title & Standard Selector */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-slate-100 text-sm sm:text-base">Cat6 RJ-45 Wiremap Sequencer</h3>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/60 rounded-lg border border-white/10 text-xs">
          <button
            onClick={() => setStandard('T568B')}
            className={`px-2.5 py-1 rounded font-mono font-medium transition-colors ${
              standard === 'T568B' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            TIA/EIA-568-B
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-300">
        Arrange the 8 twisted conductors into the modular plug before ratcheting the crimper. Click adjacent arrows to swap wires into order.
      </p>

      {/* 8-Pin Visual Wire Harness */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-3">
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
          {currentPins.map((wire, idx) => {
            const isMatch = wire.pin === idx + 1;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 group">
                <span className="text-[11px] font-mono text-slate-400 font-semibold">{idx + 1}</span>

                {/* Wire strand visualization */}
                <div
                  className="w-5 sm:w-6 h-24 rounded-full relative overflow-hidden border border-black/40 shadow-inner flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: wire.hexColor }}
                >
                  {wire.stripeColor && (
                    <div className="absolute inset-0 bg-white/40 skew-y-12 w-full h-full pointer-events-none" />
                  )}
                </div>

                {/* Swap controls */}
                <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                  {idx > 0 && (
                    <button
                      onClick={() => swapPins(idx, idx - 1)}
                      className="p-0.5 rounded text-[10px] bg-white/10 hover:bg-cyan-500/30 text-slate-300 hover:text-white"
                      title="Move left"
                    >
                      ←
                    </button>
                  )}
                  {idx < 7 && (
                    <button
                      onClick={() => swapPins(idx, idx + 1)}
                      className="p-0.5 rounded text-[10px] bg-white/10 hover:bg-cyan-500/30 text-slate-300 hover:text-white"
                      title="Move right"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Digital Cable Continuity Tester LED Array */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Tester LEDs:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((pinNum) => {
                const isActive = testResult?.activePins[pinNum - 1];
                return (
                  <div
                    key={pinNum}
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-mono font-bold transition-all ${
                      testResult?.tested
                        ? isActive
                          ? 'bg-emerald-500 text-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                          : 'bg-rose-500 text-white shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                        : 'bg-slate-800 text-slate-500 border border-white/10'
                    }`}
                  >
                    {pinNum}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={setCorrectT568B}
              className="text-xs text-slate-400 hover:text-cyan-300 underline font-mono"
            >
              Auto-Align (T568B)
            </button>
            <button
              onClick={runTester}
              className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Test Continuity</span>
            </button>
          </div>
        </div>
      </div>

      {/* Result Callout */}
      {testResult && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
            testResult.pass
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          }`}
        >
          {testResult.pass ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <div className="font-semibold">{testResult.pass ? 'Certification Passed' : 'Wiremap Error'}</div>
            <p className="text-[11px] leading-relaxed opacity-90">{testResult.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};
