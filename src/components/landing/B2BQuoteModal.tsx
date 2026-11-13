import React, { useState } from 'react';
import { X, Building2, Users, Send, CheckCircle2, Shield, Mail, Phone } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BQuoteModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    teamSize: '10-25',
    trackFocus: 'dual',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-white/15 p-6 shadow-2xl bg-slate-900/90 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold">
                <Building2 className="w-3.5 h-3.5" />
                ENTERPRISE WORKFORCE TRAINING
              </div>
              <h3 className="text-xl font-bold text-white mt-2">Request B2B Cohort Training Proposal</h3>
              <p className="text-xs text-slate-300 mt-1">
                Train your IT helpdesk, desktop maintenance, and network engineering teams with automated labs & SMS gradebook oversight.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Organization / Company</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Health IT Systems"
                    className="w-full glass-input rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Marcus Bradley, VP of IT"
                    className="w-full glass-input rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@company.com"
                    className="w-full glass-input rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Expected Team Size</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full glass-input rounded-lg px-3 py-2 text-xs"
                  >
                    <option value="5-10">5–10 Technicians</option>
                    <option value="10-25">10–25 Technicians</option>
                    <option value="25-100">25–100 Technicians</option>
                    <option value="100+">100+ Enterprise Tier</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Training Focus Area</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'maintenance', label: 'CompTIA A+ Hardware' },
                    { id: 'networking', label: 'Cisco CCNA 200-301' },
                    { id: 'dual', label: 'Full Dual Track' },
                  ].map((track) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, trackFocus: track.id })}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        formData.trackFocus === track.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                          : 'bg-white/5 border-white/10 text-slate-300'
                      }`}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Special Requirements / Timeline</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Need custom fault injection, physical bench QR tracking, or Stripe invoicing..."
                  className="w-full glass-input rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enterprise Proposal Request</span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Proposal Request Received</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Thank you, {formData.contactName}. Our enterprise solutions engineer will email a tailored syllabus and seat pricing quote to <span className="text-cyan-300 font-mono">{formData.email}</span> within 2 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
