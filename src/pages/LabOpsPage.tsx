import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  QrCode,
  Layers,
  RotateCcw,
  Plus,
  Box,
  Cpu,
  Flame,
  Check,
} from 'lucide-react';
import { INITIAL_EQUIPMENT } from '../data/mockData';
import { EquipmentItem } from '../types';

export const LabOpsPage: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [selectedAsset, setSelectedAsset] = useState<EquipmentItem | null>(null);
  const [reportFaultText, setReportFaultText] = useState('');

  // Consumables state
  const [consumables, setConsumables] = useState([
    { name: 'Cat6 Snagless Patch Cables (3m)', stock: 4, reorderLevel: 10, status: 'Low Stock' },
    { name: 'Arctic MX-6 Thermal Compound (4g)', stock: 12, reorderLevel: 5, status: 'Adequate' },
    { name: 'Crucial DDR5-5600 16GB DIMMs', stock: 2, reorderLevel: 6, status: 'Critical' },
    { name: 'RJ-45 Cat6 Pass-Through Plugs', stock: 140, reorderLevel: 50, status: 'Adequate' },
  ]);

  const handleToggleStatus = (id: string, newStatus: EquipmentItem['status']) => {
    setEquipment((prev) =>
      prev.map((eq) =>
        eq.id === id ? { ...eq, status: newStatus, reportedIssue: newStatus === 'Operational' ? undefined : eq.reportedIssue } : eq
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Physical Lab Operations</div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Bench Status &amp; Hardware Inventory</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span>Physical Facility: Room 304 (Bench 01–12)</span>
        </div>
      </div>

      {/* Bench Grid Map (Benches 1 to 8) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          Physical Workstation Bench Status Map
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((benchNum) => {
            const hasFault = equipment.some((eq) => eq.benchNumber === benchNum && eq.status === 'Faulty');
            const inMaintenance = equipment.some((eq) => eq.benchNumber === benchNum && eq.status === 'Maintenance');
            return (
              <div
                key={benchNum}
                className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                  hasFault
                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-800 dark:text-rose-300'
                    : inMaintenance
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300'
                    : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                }`}
              >
                <div className="font-bold text-sm font-mono">Bench {benchNum}</div>
                <div className="text-[10px] font-mono uppercase">
                  {hasFault ? 'Fault Alert' : inMaintenance ? 'Servicing' : 'Ready'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Equipment Inventory Table & Consumables Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Serialized Inventory (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Serialized Asset Inventory &amp; Diagnostics
            </h3>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Total Assets: {equipment.length}</span>
          </div>

          <div className="space-y-3">
            {equipment.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-white/5 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{item.model}</span>
                      <span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                        {item.assetTag}
                      </span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] font-mono mt-0.5">
                      Serial: {item.serialNumber} · Bench #{item.benchNumber} · Serviced: {item.lastServicedDate}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      item.status === 'Operational'
                        ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                        : item.status === 'Faulty'
                        ? 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                {item.reportedIssue && (
                  <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-200 text-[11px] leading-relaxed">
                    <strong>Reported Issue:</strong> {item.reportedIssue}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    Next Audit: {item.nextAuditDate}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status !== 'Operational' ? (
                      <button
                        onClick={() => handleToggleStatus(item.id, 'Operational')}
                        className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3 h-3" />
                        <span>Mark Repaired</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleStatus(item.id, 'Faulty')}
                        className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-800 dark:text-rose-300 border border-rose-500/30 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>Report Fault</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consumables Tracker (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Consumables &amp; Supplies
            </h3>
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">Restock Alert</span>
          </div>

          <div className="space-y-3">
            {consumables.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 space-y-1.5 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-slate-900 dark:text-white">{item.name}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      item.status === 'Critical'
                        ? 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                        : item.status === 'Low Stock'
                        ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>In Stock: {item.stock}</span>
                  <span>Min Reorder: {item.reorderLevel}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert('Purchase order requisition submitted to procurement for DDR5 DIMMs and Cat6 patch cables!')}
            className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 rounded-xl text-xs font-semibold transition-colors"
          >
            Generate Consumables Purchase Requisition
          </button>
        </div>
      </div>
    </div>
  );
};
