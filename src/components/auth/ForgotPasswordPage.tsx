import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, AlertCircle, KeyRound, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const { navigateTo } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigateTo('verify_email');
    }, 600);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <button
          onClick={() => navigateTo('login')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white mb-3 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Log In</span>
        </button>

        <h2 className="text-2xl font-bold tracking-tight text-white">
          Forgot your password?
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Enter your registered email address and we'll dispatch a 6-digit confirmation code.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div>
          <label className="text-slate-400 block mb-1 uppercase">Registered Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alexandre.m@netmentor.io"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 font-sans text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isLoading ? 'Transmitting Code...' : 'Dispatch Verification Code'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
