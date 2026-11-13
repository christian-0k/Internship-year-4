import React from 'react';
import { TESTIMONIALS } from '../../data/platformData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="outcomes" className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wide uppercase text-cyan-600 dark:text-cyan-400 mb-2">
            Verified Career Outcomes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            From Virtual Sandboxes to Enterprise Infrastructure Roles
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Real feedback from graduates working in network operations centers, cloud data centers, and managed service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {t.role} · <span className="font-medium text-slate-700 dark:text-slate-300">{t.company}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                  Outcome: {t.impactMetric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
