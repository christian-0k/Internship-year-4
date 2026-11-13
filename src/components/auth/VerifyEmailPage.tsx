import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VerifyEmailPage: React.FC = () => {
  const { navigateTo, user, signInAsRole } = useAuth();
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(46);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleDigitChange = (idx: number, val: string) => {
    const char = val.slice(-1);
    const newDigits = [...digits];
    newDigits[idx] = char;
    setDigits(newDigits);

    if (char && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter the complete 6-digit code.');
      return;
    }
    // Launch lab dashboard directly
    signInAsRole('student');
  };

  const handleSimulateAutoFill = () => {
    setDigits(['9', '4', '0', '2', '8', '1']);
    setErrorMessage(null);
  };

  const handleSimulateError = () => {
    setDigits(['0', '0', '0', '0', '0', '0']);
    setErrorMessage('Invalid confirmation token. Code has expired or mismatched.');
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-2">
          TWO-FACTOR AUTHENTICATION // GATEWAY_04
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Verify Your Identity
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          We've sent a 6-digit confirmation code and magic link to <span className="text-cyan-400 font-bold">{user?.email || 'alexandre@netmentor.io'}</span>.
        </p>
      </div>

      {/* Magic Link Box (matches screen_2fb56d1c.png) */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs font-mono">
        <div className="flex items-center justify-between text-cyan-400 font-bold">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Magic Link Active</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">READY</span>
        </div>
        <p className="text-slate-400 text-[11px] font-sans">
          You can click the link in your email on any authorized device for instant passwordless sign-in.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 6 Digits Input */}
      <div className="space-y-3 font-mono">
        <div className="flex justify-between gap-2">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              className="w-12 h-14 text-center rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-lg focus:outline-none focus:border-cyan-500"
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-500">
          <span>Code expires in 04:{timer < 10 ? `0${timer}` : timer}</span>
          <button
            type="button"
            disabled={timer > 0}
            onClick={() => setTimer(45)}
            className="text-cyan-400 hover:underline disabled:opacity-40"
          >
            Resend Code
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleVerify}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold font-mono text-xs hover:from-emerald-400 hover:to-cyan-400 transition flex items-center justify-center gap-2"
      >
        <span>Verify & Launch Lab Dashboard</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Interactive Sandbox Triggers (matches screen_2fb56d1c.png) */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[11px] space-y-2">
        <div className="flex justify-between items-center text-slate-500 uppercase text-[9px]">
          <span>Interactive Sandbox Triggers</span>
          <span className="text-cyan-400">DEV DEMO</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSimulateAutoFill}
            className="flex-1 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-center"
          >
            ✓ Simulate Code Auto-Fill
          </button>
          <button
            type="button"
            onClick={handleSimulateError}
            className="flex-1 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-rose-400 text-center"
          >
            ⚠ Simulate Mismatch Error
          </button>
        </div>
      </div>
    </div>
  );
};
