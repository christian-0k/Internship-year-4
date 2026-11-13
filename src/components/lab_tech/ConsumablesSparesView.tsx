import React, { useState } from 'react';
import { 
  Wrench, 
  Package, 
  Barcode, 
  FileText, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Download,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ConsumablesSparesView: React.FC = () => {
  const { navigateTo } = useAuth();
  const [poApproved, setPoApproved] = useState(false);

  const [items, setItems] = useState([
    {
      id: 'item-1',
      name: 'Cat6 Snagless UTP Patch Cables',
      sku: 'AMP-C6-BL03',
      unitPrice: '$2.40',
      status: 'CRITICAL LOW',
      storage: '14 / 100 Cables',
      percent: 14,
      lowStockTrigger: 25,
      autoReorder: true,
      category: 'Patch',
    },
    {
      id: 'item-2',
      name: 'RJ45 Cat6 8P8C Modular Pass-Through Plugs',
      sku: 'EZ-PT-100010C',
      unitPrice: '$18.00 / jar',
      status: 'LOW STOCK',
      storage: '48 Plugs (0.48 Jars)',
      percent: 32,
      lowStockTrigger: 60,
      autoReorder: true,
      category: 'Copper',
    },
    {
      id: 'item-3',
      name: 'Arctic Silver 5 Polysynthetic Thermal Compound',
      sku: 'AS5-3.5G',
      unitPrice: '$8.50 / tube',
      status: 'CRITICAL',
      storage: '3 Tubes Remaining',
      percent: 15,
      lowStockTrigger: 5,
      autoReorder: true,
      category: 'Bulk',
    },
    {
      id: 'item-4',
      name: 'Cisco SFP-10G-SR Optical Transceiver',
      sku: 'SFP-10G-SR-V02',
      unitPrice: '$28.00 / ea',
      status: 'HEALTHY',
      storage: '18 units',
      percent: 85,
      lowStockTrigger: 8,
      autoReorder: false,
      category: 'Optics',
    },
    {
      id: 'item-5',
      name: 'Velcro Cable Tie Spools (75ft)',
      sku: 'VEL-75-BLK',
      unitPrice: '$11.20 / roll',
      status: 'HEALTHY',
      storage: '6 rolls',
      percent: 75,
      lowStockTrigger: 3,
      autoReorder: false,
      category: 'Bulk',
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Telemetry Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <button onClick={() => navigateTo('lab_ops')} className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>facility_ops</span>
            </button>
            <span>/</span>
            <span className="text-white">hardware_matrix</span>
            <span>/</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              ● HVAC & PDU NORMAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">Active Bays: 12 Racks (A-D)</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">NODE-02 ONLINE // 21.4°C</span>
          </div>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-rose-950/50 border border-rose-500/30 text-rose-400 mb-2">
              SUPPLY_CELL_09 // HARDWARE FABRIC & CONSUMABLES
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Consumables & Passive Spares Management
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Inventory telemetry for structured cabling, modular terminating ends, thermal interfaces, rack labeling media, and rapid field-replacements across physical CCNA/CCNP active test benches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <button className="px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white flex items-center gap-1.5 transition">
              <Barcode className="w-4 h-4 text-cyan-400" />
              <span>Barcode Quick Intake</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white flex items-center gap-1.5 transition">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Generate Supplier PO</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5 transition">
              <Plus className="w-4 h-4" />
              <span>Add Consumable SKU</span>
            </button>
          </div>
        </div>

        {/* Metric Cards (from screenshot screen_15ba8d2a.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">SKUs Monitored</span>
            <div className="text-3xl font-black text-white">48 <span className="text-xs font-normal text-slate-400">Active Items</span></div>
            <span className="text-[10px] text-slate-400">7 Categories (Patch, Copper, Optics, Bulk)</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Stock Health</span>
            <div className="text-3xl font-black text-emerald-400">88% <span className="text-xs font-normal text-slate-400">Adequate</span></div>
            <div className="flex gap-2 text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400">2 CRITICAL</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400">4 THRESHOLD</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Monthly Consumption</span>
            <div className="text-3xl font-black text-white">$1,240 <span className="text-xs font-normal text-rose-400">+8.4%</span></div>
            <span className="text-[10px] text-slate-400">High boot-camp churn on RJ45 & Blue Patch</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
            <span className="text-slate-500 uppercase block">Pending Auto-Orders</span>
            <div className="text-3xl font-black text-amber-400">2 <span className="text-xs font-normal text-slate-400">POs Drafted</span></div>
            <span className="text-[10px] text-slate-400">Awaiting NOC shift-lead sign-off</span>
          </div>
        </div>

        {/* Consumable Spares List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              {['ALL ITEMS (48)', 'CRITICAL (2)', 'WARNING (4)', 'OPTICAL & FIBER (11)'].map((tab, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1.5 rounded-lg border transition ${
                    idx === 0
                      ? 'bg-slate-800 text-white border-slate-700 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-emerald-400">Dynamic Threshold Autopilot: ENGAGED</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-white text-sm">{item.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status.includes('CRITICAL') ? 'bg-rose-950 text-rose-400 border border-rose-500/40' :
                      item.status.includes('LOW') ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs">
                    SKU: <span className="text-slate-300">{item.sku}</span> • Unit: {item.unitPrice}
                  </div>
                  <div className="w-full max-w-md h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mt-2">
                    <div
                      className={`h-full rounded-full ${
                        item.percent < 25 ? 'bg-rose-500' : item.percent < 50 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px] uppercase">Available Storage:</span>
                    <span className="text-white font-bold">{item.storage}</span>
                  </div>
                  <button
                    onClick={() => alert(`Triggered quick restock for ${item.name}`)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white font-bold transition border border-slate-700"
                  >
                    Quick Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Generated Purchase Order Card (matches screen_15ba8d2a.png) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-cyan-400 font-bold block">Auto-Generated Purchase Order</span>
              <span className="text-white text-base font-bold">#PO-2025-081</span>
            </div>
            <div className="text-slate-400 text-right">
              <span>Primary Logistics: <span className="text-white">CDW Logistics & Anixter</span></span>
              <div className="text-emerald-400 text-[11px]">Free 2-Day Priority Freight</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-slate-800/60 text-slate-300">
              <span>Cat6 UTP 3ft (Blue) — 50-Pack Bundle @ $2.40/ea</span>
              <span className="font-bold text-white">$120.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60 text-slate-300">
              <span>RJ45 Modular Plugs — 2x Jars of 100 @ $18.00/jar</span>
              <span className="font-bold text-white">$36.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800/60 text-slate-300">
              <span>Arctic Silver 5 Paste — 5x 3.5g Syringes @ $8.50/ea</span>
              <span className="font-bold text-white">$42.50</span>
            </div>
            <div className="flex justify-between py-3 font-bold text-sm text-white pt-3">
              <span>Total Draft Commitment:</span>
              <span className="text-emerald-400 text-base">$198.50</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setPoApproved(true)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-cyan-400 transition"
            >
              {poApproved ? '✓ Transmitted to Supplier!' : 'Approve & Transmit PO'}
            </button>
            <button
              onClick={() => alert('Exporting PO PDF document...')}
              className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
