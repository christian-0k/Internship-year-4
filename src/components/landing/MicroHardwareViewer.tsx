import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Layers, Eye, Cpu, HardDrive, Zap, Info, RotateCw } from 'lucide-react';

interface ComponentHotspot {
  id: string;
  name: string;
  tag: string;
  description: string;
  position: [number, number, number];
}

const HOTSPOTS: ComponentHotspot[] = [
  {
    id: 'cpu',
    name: 'LGA1700 / AM5 Socket',
    tag: 'CompTIA A+ 1.3',
    description: 'Gold-plated spring contact pins. Requires zero-insertion-force lever locking and keyed triangle alignment.',
    position: [0, 0.25, 0],
  },
  {
    id: 'vrm',
    name: '16+1 Phase VRM Heatsinks',
    tag: 'CompTIA A+ 5.1',
    description: 'High-current MOSFET thermal dissipation chokes regulating 12V to 1.2V core voltage for CPU stability.',
    position: [-0.9, 0.4, -0.6],
  },
  {
    id: 'ram',
    name: 'Dual-Channel DDR5 Slots (A2/B2)',
    tag: 'CompTIA A+ 1.2',
    description: 'Populate slots 2 and 4 first for signal termination. Dual tactile latches lock DIMMs at 6000MT/s.',
    position: [1.1, 0.3, 0.2],
  },
  {
    id: 'pcie',
    name: 'PCIe 5.0 x16 Steel Armor Slot',
    tag: 'CompTIA A+ 1.3',
    description: 'Direct-connected to CPU bus for discrete graphics accelerators with 128 GB/s bidirectional throughput.',
    position: [0, 0.2, 1.2],
  },
];

export const MicroHardwareViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<ComponentHotspot>(HOTSPOTS[0]);
  const [explodedView, setExplodedView] = useState(false);
  const explodedRef = useRef(false);
  explodedRef.current = explodedView;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 350;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(2.8, 3.2, 4.0);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lights
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(4, 8, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x00e5ff, 0x070b14, 1.2);
    scene.add(fillLight);

    const cyanRim = new THREE.PointLight(0x00e5ff, 2.5, 8);
    cyanRim.position.set(-3, 2, -2);
    scene.add(cyanRim);

    // Assemble Procedural 3D Motherboard Group
    const mbGroup = new THREE.Group();

    // 1. Motherboard PCB (Dark Matte Soldermask)
    const pcbGeo = new THREE.BoxGeometry(3.2, 0.08, 3.2);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0c1524,
      roughness: 0.85,
      metalness: 0.1,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.receiveShadow = !isSoftwareGl;
    mbGroup.add(pcb);

    // Copper Traces Visual Layer
    const traceGeo = new THREE.PlaneGeometry(3.0, 3.0);
    const traceMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      roughness: 0.4,
      metalness: 0.8,
      transparent: true,
      opacity: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const traceMesh = new THREE.Mesh(traceGeo, traceMat);
    traceMesh.rotation.x = -Math.PI / 2;
    traceMesh.position.y = 0.045;
    mbGroup.add(traceMesh);

    // 2. CPU Socket & Retention Frame
    const cpuSocketGeo = new THREE.BoxGeometry(0.9, 0.06, 0.9);
    const cpuSocketMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const cpuSocket = new THREE.Mesh(cpuSocketGeo, cpuSocketMat);
    cpuSocket.position.set(0, 0.07, 0);
    mbGroup.add(cpuSocket);

    // CPU Heat Spreader (IHS)
    const ihsGeo = new THREE.BoxGeometry(0.72, 0.05, 0.72);
    const ihsMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      roughness: 0.2,
      metalness: 0.95,
    });
    const ihs = new THREE.Mesh(ihsGeo, ihsMat);
    ihs.position.set(0, 0.12, 0);
    mbGroup.add(ihs);

    // 3. VRM Aluminium Heatsinks
    const vrmMat = new THREE.MeshStandardMaterial({
      color: 0x1e2638,
      roughness: 0.25,
      metalness: 0.85,
    });
    const vrmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 1.4), vrmMat);
    vrmLeft.position.set(-0.9, 0.28, -0.2);
    mbGroup.add(vrmLeft);

    const vrmTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 0.35), vrmMat);
    vrmTop.position.set(0.1, 0.28, -0.9);
    mbGroup.add(vrmTop);

    // 4. DDR5 RAM Slots (4 Slots with Color Coding for Dual-Channel)
    const ramSlotsGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const isPriority = i === 1 || i === 3; // Slots A2, B2
      const slotGeo = new THREE.BoxGeometry(0.08, 0.12, 1.5);
      const slotMat = new THREE.MeshStandardMaterial({
        color: isPriority ? 0x0284c7 : 0x334155,
        roughness: 0.5,
      });
      const slot = new THREE.Mesh(slotGeo, slotMat);
      slot.position.set(0.85 + i * 0.16, 0.1, -0.1);
      ramSlotsGroup.add(slot);

      // RAM Stick
      const stickGeo = new THREE.BoxGeometry(0.04, 0.35, 1.46);
      const stickMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.3,
        metalness: 0.7,
      });
      const stick = new THREE.Mesh(stickGeo, stickMat);
      stick.position.set(0.85 + i * 0.16, 0.3, -0.1);
      ramSlotsGroup.add(stick);
    }
    mbGroup.add(ramSlotsGroup);

    // 5. PCIe 5.0 x16 Slots (Reinforced Metal Shield)
    const pcieMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const pcie1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.12), pcieMat);
    pcie1.position.set(0, 0.1, 0.8);
    mbGroup.add(pcie1);

    const pcie2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.12), pcieMat);
    pcie2.position.set(0, 0.1, 1.3);
    mbGroup.add(pcie2);

    // 6. M.2 NVMe Shield
    const m2Geo = new THREE.BoxGeometry(1.2, 0.08, 0.35);
    const m2Mat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.3,
      metalness: 0.8,
    });
    const m2 = new THREE.Mesh(m2Geo, m2Mat);
    m2.position.set(-0.2, 0.08, 0.4);
    mbGroup.add(m2);

    // 7. Rear I/O Shield Block
    const ioGeo = new THREE.BoxGeometry(0.45, 0.65, 1.4);
    const ioMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.3,
      metalness: 0.7,
    });
    const ioBlock = new THREE.Mesh(ioGeo, ioMat);
    ioBlock.position.set(-1.3, 0.36, -0.8);
    mbGroup.add(ioBlock);

    scene.add(mbGroup);

    // Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.4,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.05;
    scene.add(shadowMesh);

    // Render & Animation Loop
    let frameId = 0;
    let targetRotation = 0;
    let currentRotation = 0;
    let isDragging = false;
    let prevMouseX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      targetRotation += deltaX * 0.008;
      prevMouseX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();

      // Smooth damped rotation
      currentRotation += (targetRotation - currentRotation) * (1 - Math.exp(-12 * dt));
      mbGroup.rotation.y = currentRotation;

      // Handle Exploded View transition
      const targetExplodeY = explodedRef.current ? 0.6 : 0.12;
      ihs.position.y += (targetExplodeY - ihs.position.y) * 0.1;

      const targetVrmY = explodedRef.current ? 0.7 : 0.28;
      vrmLeft.position.y += (targetVrmY - vrmLeft.position.y) * 0.1;
      vrmTop.position.y += (targetVrmY - vrmTop.position.y) * 0.1;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 shadow-2xl relative">
      {/* 3D Canvas Mount Point */}
      <div className="relative w-full h-[320px] sm:h-[380px] cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Spec Bar */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center gap-2 pointer-events-none">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">ASUS ProArt Z790 Motherboard (3D Model)</span>
          <span className="text-[10px] text-cyan-400 font-mono">128GB DDR5</span>
        </div>

        {/* View Controls Dock */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            onClick={() => setExplodedView(!explodedView)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
              explodedView
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'bg-slate-900/80 hover:bg-slate-800 border-white/10 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{explodedView ? 'Collapse View' : 'Explode Layers'}</span>
          </button>
        </div>
      </div>

      {/* Component Hotspots Selector & Diagnostic Panel */}
      <div className="p-4 bg-slate-900/80 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Interactive Hardware Inspection
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Click to inspect subsystem</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                className={`p-2 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 shadow-sm'
                    : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-300 hover:text-white'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-mono">{hotspot.tag}</div>
                <div className="text-xs font-medium truncate mt-0.5">{hotspot.name}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Explanation */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-cyan-300">{selectedHotspot.name}</span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              {selectedHotspot.tag}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">{selectedHotspot.description}</p>
        </div>
      </div>
    </div>
  );
};
