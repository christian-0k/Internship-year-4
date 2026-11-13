import React, { useState } from 'react';
import { 
  Terminal, 
  Layers, 
  Code2, 
  Play, 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Plus, 
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_YAML = `lab_id: "LAB-NET-OSPF-09"
title: "Multi-Area OSPFv2 Route Summarization & Virtual Link"
target_certification: "Cisco CCNA 200-301"
duration_minutes: 45

topology:
  routers:
    - hostname: "R1-CORE"
      area: 0
      interfaces:
        - name: "Gi0/0"
          ip: "10.0.0.1/30"
          peer: "R2-ABR:Gi0/0"
    - hostname: "R2-ABR"
      areas: [0, 1]
      interfaces:
        - name: "Gi0/0"
          ip: "10.0.0.2/30"
        - name: "Gi0/1"
          ip: "192.168.10.1/24"
          peer: "R3-EDGE:Gi0/0"

injected_fault:
  type: "MTU_MISMATCH"
  target_interface: "R2-ABR:Gi0/0"
  set_mtu: 1400 # Causes OSPF to stall in EXSTART/EXCHANGE state

rubrics:
  - id: "r1"
    description: "Diagnose OSPF adjacency hang in EXSTART state"
    points: 25
  - id: "r2"
    description: "Align MTU to 1500 on R2-ABR GigabitEthernet0/0"
    points: 35
  - id: "r3"
    description: "Verify Full/BDR neighbor adjacency via 'show ip ospf neighbor'"
    points: 40
`;

export const LabAuthoringView: React.FC = () => {
  const { navigateTo } = useAuth();
  const [yamlContent, setYamlContent] = useState(DEFAULT_YAML);
  const [yamlValid, setYamlValid] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleYamlChange = (val: string) => {
    setYamlContent(val);
    // Simple verification check
    setYamlValid(val.includes('lab_id:') && val.includes('topology:') && val.includes('rubrics:'));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <button
            onClick={() => navigateTo('teach')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Instructor Overview</span>
          </button>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
              yamlValid
                ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-950 text-rose-400 border-rose-500/30'
            }`}>
              {yamlValid ? '✓ DSL Syntax Valid' : '⚠ Syntax Error'}
            </span>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? 'Topology Saved!' : 'Publish Lab Topology'}</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            YAML Lab Topology & Fault Authoring Studio
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Define declarative network topologies, inject deterministic hardware/routing faults, and configure automated grading rubrics.
          </p>
        </div>

        {/* 2-Column Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start font-mono text-xs">
          
          {/* Left Column: YAML Code Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">topology_spec.yaml</span>
              </div>
              <span className="text-[10px] text-slate-500">YAML DSL v2.4</span>
            </div>

            <textarea
              value={yamlContent}
              onChange={(e) => handleYamlChange(e.target.value)}
              rows={24}
              className="w-full bg-slate-950 text-slate-200 p-4 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-cyan-900 selection:text-white"
              spellCheck={false}
            />
          </div>

          {/* Right Column: Live Topology Visualizer & Fault Preview */}
          <div className="space-y-6">
            
            {/* Live Visualizer Node Canvas */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white text-sm">Live Topology Visualizer</span>
                </div>
                <span className="text-[10px] text-emerald-400">Area 0 Backbone Sync</span>
              </div>

              {/* Graphic Nodes */}
              <div className="h-64 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-around p-4 overflow-hidden">
                <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 text-center space-y-1 shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center mx-auto font-bold">
                    R1
                  </div>
                  <div className="text-white font-bold text-xs">R1-CORE</div>
                  <div className="text-[10px] text-slate-500">Area 0</div>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <div className="h-0.5 w-24 bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500 relative">
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-amber-400 whitespace-nowrap">
                      MTU Mismatch (1400 vs 1500)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">Gi0/0 - Gi0/0</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/40 text-center space-y-1 shadow-lg">
                  <div className="w-10 h-10 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center mx-auto font-bold">
                    R2
                  </div>
                  <div className="text-white font-bold text-xs">R2-ABR</div>
                  <div className="text-[10px] text-purple-400">ABR (Area 0/1)</div>
                </div>
              </div>
            </div>

            {/* Injected Fault Card */}
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Flame className="w-4 h-4" />
                <span>Deterministic Fault Injection Configuration</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                MTU mismatch is currently configured on R2-ABR Gi0/0. When students launch this scenario, OSPF packets larger than 1400 bytes (such as Database Description packets) will be silently dropped, forcing students to inspect interface MTU settings.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Socratic AI tutor has been provided with RFC 2328 reference prompts.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
