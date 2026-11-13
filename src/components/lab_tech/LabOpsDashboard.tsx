import React, { useState } from 'react';
import { 
  Wrench, 
  Server, 
  QrCode, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Thermometer, 
  Zap, 
  Activity, 
  Plus, 
  Package, 
  ExternalLink,
  Flame,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Bench {
  id: string;
  name: string;
  bay: 'Alpha' | 'Beta';
  status: 'ONLINE' | 'FAULTY' | 'MAINTENANCE' | 'OFFLINE';
  assignedStudent?: string;
  pduLoadKw: number;
  tempC: number;
  equipment: string[];
}

export const LabOpsDashboard: React.FC = () => {
  const { navigateTo } = useAuth();
  const [selectedBay, setSelectedBay] = useState<'All' | 'Alpha' | 'Beta'>('All');
  const [qrModalAsset, setQrModalAsset] = useState<string | null>(null);

  const [benches, setBenches] = useState<Bench[]>([
    { id: 'BENCH-A01', name: 'Bench Alpha-01', bay: 'Alpha', status: 'ONLINE', assignedStudent: 'Alexandre Mercer', pduLoadKw: 0.62, tempC: 22.1, equipment: ['Cisco 2960X', 'Dell OptiPlex 7090', 'Fluke LinkIQ'] },
    { id: 'BENCH-A02', name: 'Bench Alpha-02', bay: 'Alpha', status: 'ONLINE', assignedStudent: 'Maya Lin', pduLoadKw: 0.58, tempC: 21.8, equipment: ['Cisco ISR 4331', 'HP ProDesk 600', 'Patch Panel T568B'] },
    { id: 'BENCH-A03', name: 'Bench Alpha-03', bay: 'Alpha', status: 'FAULTY', assignedStudent: 'Devon Vance', pduLoadKw: 0.74, tempC: 25.4, equipment: ['Cisco Catalyst 3850', 'Custom ATX Rig'] },
    { id: 'BENCH-A04', name: 'Bench Alpha-04', bay: 'Alpha', status: 'ONLINE', pduLoadKw: 0.44, tempC: 21.2, equipment: ['Juniper EX2300', 'Lenovo ThinkCentre'] },
    { id: 'BENCH-B01', name: 'Bench Beta-01', bay: 'Beta', status: 'ONLINE', assignedStudent: 'Elena Rostova', pduLoadKw: 0.61, tempC: 22.0, equipment: ['Cisco 2960X', 'Supermicro 1U Server'] },
    { id: 'BENCH-B02', name: 'Bench Beta-02', bay: 'Beta', status: 'MAINTENANCE', pduLoadKw: 0.12, tempC: 20.4, equipment: ['APC Smart-UPS 1500', 'Cisco ASA 5506-X'] },
    { id: 'BENCH-B03', name: 'Bench Beta-03', bay: 'Beta', status: 'ONLINE', assignedStudent: 'Jordan Hayes', pduLoadKw: 0.55, tempC: 21.9, equipment: ['Aruba 2930F', 'Dell PowerEdge R640'] },
    { id: 'BENCH-B04', name: 'Bench Beta-04', bay: 'Beta', status: 'ONLINE', pduLoadKw: 0.48, tempC: 21.5, equipment: ['Cisco Catalyst 9200', 'ThinkStation P340'] },
  ]);

  const filteredBenches = benches.filter(b => selectedBay === 'All' || b.bay === selectedBay);

  const handleToggleFault = (benchId: string) => {
    setBenches(prev => prev.map(b => {
      if (b.id === benchId) {
        const nextStatus = b.status === 'FAULTY' ? 'ONLINE' : 'FAULTY';
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-950/60 border border-amber-500/40 text-amber-400 mb-2">
              <Wrench className="w-3.5 h-3.5" />
              PHYSICAL LAB OPERATIONS & BENCH TELEMETRY
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Lab Operations & Bench Status Map
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Live status across 24 physical training benches, rack PDU energy draw, thermal sensors, and Zebra ZPL barcode generation.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => navigateTo('lab_ops_spares')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold hover:from-amber-400 hover:to-rose-400 transition flex items-center gap-2 shadow-lg shadow-amber-500/10"
            >
              <Package className="w-4 h-4" />
              <span>Consumables & Spares (48 SKUs)</span>
            </button>
            <button
              onClick={() => setQrModalAsset('NET-RTR-042')}
              className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white transition flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>Zebra QR Generator</span>
            </button>
          </div>
        </div>

        {/* Global Facility Telemetry Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Active Benches</span>
            <div className="text-2xl font-bold text-white">22 / 24 Online</div>
            <span className="text-[10px] text-emerald-400">91.6% Bench Utilization</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Smart PDU Load</span>
            <div className="text-2xl font-bold text-cyan-400">4.8 / 7.2 kW</div>
            <span className="text-[10px] text-slate-400">Phase balanced across 12 racks</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Average Lab Temp</span>
            <div className="text-2xl font-bold text-white">21.8°C</div>
            <span className="text-[10px] text-emerald-400">HVAC nominal // Delta +1.2°C</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Hardware Fault Tickets</span>
            <div className="text-2xl font-bold text-rose-400">1 Fault Active</div>
            <span className="text-[10px] text-rose-400/80">Bench A-03 PSU Alert</span>
          </div>
        </div>

        {/* Bench Grid Map */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">Physical Bench Matrix</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">Bay Alpha & Beta</span>
            </div>

            <div className="flex items-center gap-2">
              {(['All', 'Alpha', 'Beta'] as const).map(bay => (
                <button
                  key={bay}
                  onClick={() => setSelectedBay(bay)}
                  className={`px-3 py-1.5 rounded-lg border transition ${
                    selectedBay === bay
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Bay {bay}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            {filteredBenches.map((bench) => {
              const isFaulty = bench.status === 'FAULTY';
              const isMaintenance = bench.status === 'MAINTENANCE';

              return (
                <div
                  key={bench.id}
                  className={`p-5 rounded-2xl border transition relative flex flex-col justify-between space-y-4 ${
                    isFaulty
                      ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                      : isMaintenance
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">{bench.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isFaulty ? 'bg-rose-950 text-rose-400 border border-rose-500/40' :
                        isMaintenance ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                        'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {bench.status}
                      </span>
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      Student: <span className="text-white font-medium">{bench.assignedStudent || 'Unassigned (Standby)'}</span>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-900 text-[11px]">
                      <div className="text-slate-500 uppercase text-[9px]">Installed Hardware:</div>
                      {bench.equipment.map((eq, i) => (
                        <div key={i} className="text-slate-300 truncate">• {eq}</div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-900/80 space-y-3">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        {bench.pduLoadKw} kW
                      </span>
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-amber-400" />
                        {bench.tempC}°C
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleFault(bench.id)}
                        className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition ${
                          isFaulty
                            ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                            : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                        }`}
                      >
                        {isFaulty ? 'Mark Fixed ✓' : 'Report Fault'}
                      </button>
                      <button
                        onClick={() => setQrModalAsset(bench.id)}
                        className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                        title="Print QR Tag"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Zebra ZPL QR Asset Tag Modal */}
      {qrModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 font-mono text-xs space-y-4 shadow-2xl">
            <div className="text-center space-y-2">
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest block font-bold">
                ZEBRA ZPL INDUSTRIAL BARCODE GENERATOR
              </span>
              <h3 className="text-lg font-bold text-white">Physical Asset Tag</h3>
            </div>

            {/* Generated QR Code Simulation Card */}
            <div className="bg-white p-5 rounded-2xl text-slate-950 text-center space-y-2">
              <div className="w-32 h-32 mx-auto bg-slate-100 border-2 border-slate-950 p-2 flex items-center justify-center">
                <QrCode className="w-28 h-28 text-slate-950" />
              </div>
              <div className="font-mono font-bold text-xs tracking-wider">{qrModalAsset}</div>
              <div className="text-[10px] text-slate-600">NetMentor.AI // BAY-ALPHA // 2025</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setQrModalAsset(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Transmitted ZPL print command for ${qrModalAsset} to Zebra ZD421 network printer.`);
                  setQrModalAsset(null);
                }}
                className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
              >
                Print Label
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
