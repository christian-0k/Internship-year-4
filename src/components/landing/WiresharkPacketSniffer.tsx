import React, { useState } from 'react';
import {
  Activity,
  Play,
  Pause,
  Trash2,
  Filter,
  Layers,
  ChevronDown,
  ChevronRight,
  Radio,
  FileCode,
  Download,
} from 'lucide-react';

export interface PacketRecord {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: 'ICMP' | 'ARP' | 'OSPF' | 'TCP' | 'DNS' | '802.1Q';
  length: number;
  info: string;
  details: {
    ethernet: { srcMac: string; dstMac: string; ethType: string; vlanId?: number };
    ip?: { srcIp: string; dstIp: string; ttl: number; protoNum: number };
    payload: string;
    hex: string;
  };
}

const INITIAL_PACKETS: PacketRecord[] = [
  {
    id: 1,
    time: '0.000000',
    source: '00:1a:2b:3c:4d:5e',
    destination: 'ff:ff:ff:ff:ff:ff',
    protocol: 'ARP',
    length: 64,
    info: 'Who has 192.168.10.1? Tell 192.168.10.25',
    details: {
      ethernet: { srcMac: '00:1a:2b:3c:4d:5e', dstMac: 'ff:ff:ff:ff:ff:ff', ethType: '0x0806 (ARP)' },
      payload: 'ARP Request: Opcode 1, Sender MAC 00:1a:2b:3c:4d:5e, Target IP 192.168.10.1',
      hex: 'ff ff ff ff ff ff 00 1a 2b 3c 4d 5e 08 06 00 01 08 00 06 04 00 01 00 1a 2b 3c 4d 5e c0 a8 0a 19 00 00 00 00 00 00 c0 a8 0a 01',
    },
  },
  {
    id: 2,
    time: '0.001420',
    source: '52:54:00:12:34:56',
    destination: '00:1a:2b:3c:4d:5e',
    protocol: 'ARP',
    length: 64,
    info: '192.168.10.1 is at 52:54:00:12:34:56',
    details: {
      ethernet: { srcMac: '52:54:00:12:34:56', dstMac: '00:1a:2b:3c:4d:5e', ethType: '0x0806 (ARP)' },
      payload: 'ARP Reply: Opcode 2, Sender MAC 52:54:00:12:34:56, Target IP 192.168.10.25',
      hex: '00 1a 2b 3c 4d 5e 52 54 00 12 34 56 08 06 00 01 08 00 06 04 00 02 52 54 00 12 34 56 c0 a8 0a 01 00 1a 2b 3c 4d 5e c0 a8 0a 19',
    },
  },
  {
    id: 3,
    time: '0.003180',
    source: '192.168.10.25',
    destination: '192.168.10.1',
    protocol: 'ICMP',
    length: 98,
    info: 'Echo (ping) request  id=0x0042, seq=1/256, ttl=64',
    details: {
      ethernet: { srcMac: '00:1a:2b:3c:4d:5e', dstMac: '52:54:00:12:34:56', ethType: '0x0800 (IPv4)' },
      ip: { srcIp: '192.168.10.25', dstIp: '192.168.10.1', ttl: 64, protoNum: 1 },
      payload: 'ICMP Type: 8 (Echo Request), Code: 0, Checksum: 0x4f12, Identifier: 66, Sequence: 1',
      hex: '45 00 00 54 3a 1b 40 00 40 01 e7 c2 c0 a8 0a 19 c0 a8 0a 01 08 00 4f 12 00 42 00 01 64 61 74 61 20 70 61 63 6b 65 74 20 6e 65 74 70 75 6c 73 65',
    },
  },
  {
    id: 4,
    time: '0.004890',
    source: '192.168.10.1',
    destination: '192.168.10.25',
    protocol: 'ICMP',
    length: 98,
    info: 'Echo (ping) reply    id=0x0042, seq=1/256, ttl=255 (reply in 1.71ms)',
    details: {
      ethernet: { srcMac: '52:54:00:12:34:56', dstMac: '00:1a:2b:3c:4d:5e', ethType: '0x0800 (IPv4)' },
      ip: { srcIp: '192.168.10.1', dstIp: '192.168.10.25', ttl: 255, protoNum: 1 },
      payload: 'ICMP Type: 0 (Echo Reply), Code: 0, Checksum: 0x5712, Identifier: 66, Sequence: 1',
      hex: '45 00 00 54 fa 21 00 00 ff 01 27 bc c0 a8 0a 01 c0 a8 0a 19 00 00 57 12 00 42 00 01 64 61 74 61 20 70 61 63 6b 65 74 20 6e 65 74 70 75 6c 73 65',
    },
  },
  {
    id: 5,
    time: '1.201410',
    source: '192.168.10.1',
    destination: '224.0.0.5',
    protocol: 'OSPF',
    length: 82,
    info: 'Hello Packet, Area 0.0.0.0, Router ID 192.168.10.1, Dead 40',
    details: {
      ethernet: { srcMac: '52:54:00:12:34:56', dstMac: '01:00:5e:00:00:05', ethType: '0x0800 (IPv4)' },
      ip: { srcIp: '192.168.10.1', dstIp: '224.0.0.5', ttl: 1, protoNum: 89 },
      payload: 'OSPFv2: Type 1 (Hello), Router Priority 1, Hello Interval 10s, Active Neighbors: 0',
      hex: '45 c0 00 44 00 00 00 00 01 59 1d a1 c0 a8 0a 01 e0 00 00 05 02 01 00 2c c0 a8 0a 01 00 00 00 00 00 00 00 00 00 00 00 00 ff ff ff 00 00 0a 02 01',
    },
  },
];

export const WiresharkPacketSniffer: React.FC = () => {
  const [packets, setPackets] = useState<PacketRecord[]>(INITIAL_PACKETS);
  const [selectedPacket, setSelectedPacket] = useState<PacketRecord | null>(INITIAL_PACKETS[2]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isCapturing, setIsCapturing] = useState<boolean>(true);
  const [expandedLayer, setExpandedLayer] = useState<'eth' | 'ip' | 'payload' | 'hex' | null>('ip');

  const filteredPackets =
    activeFilter === 'All' ? packets : packets.filter((p) => p.protocol === activeFilter);

  const handleInjectPing = () => {
    const nextId = packets.length + 1;
    const baseTime = (packets.length * 0.45).toFixed(6);
    const newReq: PacketRecord = {
      id: nextId,
      time: baseTime,
      source: '192.168.10.25',
      destination: '192.168.10.1',
      protocol: 'ICMP',
      length: 98,
      info: `Echo (ping) request  id=0x0042, seq=${nextId}/256, ttl=64`,
      details: {
        ethernet: { srcMac: '00:1a:2b:3c:4d:5e', dstMac: '52:54:00:12:34:56', ethType: '0x0800 (IPv4)' },
        ip: { srcIp: '192.168.10.25', dstIp: '192.168.10.1', ttl: 64, protoNum: 1 },
        payload: `ICMP Type: 8 (Echo Request), Code: 0, Seq: ${nextId}, Payload Data: NetPulse Probe`,
        hex: '45 00 00 54 11 aa 40 00 40 01 00 00 c0 a8 0a 19 c0 a8 0a 01 08 00 12 34 00 42 00 05',
      },
    };
    const newReply: PacketRecord = {
      id: nextId + 1,
      time: (Number(baseTime) + 0.0018).toFixed(6),
      source: '192.168.10.1',
      destination: '192.168.10.25',
      protocol: 'ICMP',
      length: 98,
      info: `Echo (ping) reply    id=0x0042, seq=${nextId}/256, ttl=255`,
      details: {
        ethernet: { srcMac: '52:54:00:12:34:56', dstMac: '00:1a:2b:3c:4d:5e', ethType: '0x0800 (IPv4)' },
        ip: { srcIp: '192.168.10.1', dstIp: '192.168.10.25', ttl: 255, protoNum: 1 },
        payload: `ICMP Type: 0 (Echo Reply), Code: 0, Seq: ${nextId}, Round-Trip 1.8ms`,
        hex: '45 00 00 54 22 bb 00 00 ff 01 00 00 c0 a8 0a 01 c0 a8 0a 19 00 00 56 78 00 42 00 05',
      },
    };
    setPackets((prev) => [...prev, newReq, newReply]);
    setSelectedPacket(newReq);
  };

  const handleInjectVlanMismatch = () => {
    const nextId = packets.length + 1;
    const vlanFaultPacket: PacketRecord = {
      id: nextId,
      time: (packets.length * 0.52).toFixed(6),
      source: '52:54:00:12:34:56',
      destination: '01:80:c2:00:00:00',
      protocol: '802.1Q',
      length: 104,
      info: 'IEEE 802.1Q STP Bpdu [TAGGED VLAN 99]: Mismatch with local Native VLAN 1',
      details: {
        ethernet: {
          srcMac: '52:54:00:12:34:56',
          dstMac: '01:80:c2:00:00:00',
          ethType: '0x8100 (802.1Q Tagged)',
          vlanId: 99,
        },
        payload: 'PVST+ BPDU: Port GigabitEthernet0/1 blocked by Spanning-Tree (PVID_Inconsistency)',
        hex: '01 80 c2 00 00 00 52 54 00 12 34 56 81 00 00 63 00 26 42 42 03 00 00 00 00 00 80 00 52 54 00 12 34 56',
      },
    };
    setPackets((prev) => [...prev, vlanFaultPacket]);
    setSelectedPacket(vlanFaultPacket);
  };

  const getProtocolBadge = (protocol: PacketRecord['protocol']) => {
    switch (protocol) {
      case 'ICMP':
        return 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30';
      case 'ARP':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'OSPF':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case '802.1Q':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
      default:
        return 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
      {/* Top Header & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <span>Wireshark Live Packet Capture &amp; Protocol Dissector</span>
              {isCapturing && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  PROMISCUOUS: eth0
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inspect Layer 2 (Ethernet), Layer 3 (IPv4/ARP), and Layer 4 payload frames in real time.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setIsCapturing(!isCapturing)}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
              isCapturing
                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
            }`}
          >
            {isCapturing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isCapturing ? 'Pause Capture' : 'Resume'}</span>
          </button>

          <button
            onClick={handleInjectPing}
            className="px-2.5 py-1.5 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Inject Ping</span>
          </button>

          <button
            onClick={handleInjectVlanMismatch}
            className="px-2.5 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-700 dark:text-rose-300 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span>Inject 802.1Q Leak</span>
          </button>

          <button
            onClick={() => {
              setPackets([]);
              setSelectedPacket(null);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            title="Clear Buffer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-500 dark:text-slate-400">Filter:</span>
        {['All', 'ICMP', 'ARP', 'OSPF', '802.1Q'].map((proto) => (
          <button
            key={proto}
            onClick={() => setActiveFilter(proto)}
            className={`px-2 py-0.5 rounded-lg border transition-all text-[11px] ${
              activeFilter === proto
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40 font-bold'
                : 'bg-slate-100/70 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
            }`}
          >
            {proto}
          </button>
        ))}
      </div>

      {/* Packet Table View */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-slate-950/70">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] uppercase bg-slate-200/50 dark:bg-slate-900/60">
              <th className="py-2 px-2.5 w-12">No.</th>
              <th className="py-2 px-2.5 w-20">Time</th>
              <th className="py-2 px-2.5">Source</th>
              <th className="py-2 px-2.5">Destination</th>
              <th className="py-2 px-2.5 w-20">Protocol</th>
              <th className="py-2 px-2.5 w-16">Length</th>
              <th className="py-2 px-2.5">Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/5">
            {filteredPackets.map((pkt) => {
              const isSelected = selectedPacket?.id === pkt.id;
              return (
                <tr
                  key={pkt.id}
                  onClick={() => setSelectedPacket(pkt)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/20 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-100 font-semibold'
                      : 'hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-300'
                  }`}
                >
                  <td className="py-1.5 px-2.5 text-slate-500 dark:text-slate-400">{pkt.id}</td>
                  <td className="py-1.5 px-2.5 text-[11px] text-slate-500 dark:text-slate-400">{pkt.time}</td>
                  <td className="py-1.5 px-2.5 truncate max-w-[140px]">{pkt.source}</td>
                  <td className="py-1.5 px-2.5 truncate max-w-[140px]">{pkt.destination}</td>
                  <td className="py-1.5 px-2.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] border ${getProtocolBadge(pkt.protocol)}`}>
                      {pkt.protocol}
                    </span>
                  </td>
                  <td className="py-1.5 px-2.5 text-slate-500 dark:text-slate-400">{pkt.length}</td>
                  <td className="py-1.5 px-2.5 truncate max-w-xs">{pkt.info}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Packet Dissector Tree & Hex Inspection */}
      {selectedPacket && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-white/10">
          {/* Protocol Dissection Tree */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Frame Dissector (Frame #{selectedPacket.id})</span>
            </div>

            {/* Ethernet II */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-1">
              <div
                onClick={() => setExpandedLayer(expandedLayer === 'eth' ? null : 'eth')}
                className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-300"
              >
                {expandedLayer === 'eth' ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span>Layer 2: Ethernet II (Src: {selectedPacket.details.ethernet.srcMac}, Dst: {selectedPacket.details.ethernet.dstMac})</span>
              </div>
              {expandedLayer === 'eth' && (
                <div className="pl-5 text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 pt-1 border-t border-slate-200 dark:border-white/5">
                  <div>Destination: {selectedPacket.details.ethernet.dstMac}</div>
                  <div>Source: {selectedPacket.details.ethernet.srcMac}</div>
                  <div>Type: {selectedPacket.details.ethernet.ethType}</div>
                  {selectedPacket.details.ethernet.vlanId && (
                    <div className="text-rose-600 dark:text-rose-400 font-bold">
                      802.1Q Tag: VLAN ID {selectedPacket.details.ethernet.vlanId}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* IPv4 */}
            {selectedPacket.details.ip && (
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-1">
                <div
                  onClick={() => setExpandedLayer(expandedLayer === 'ip' ? null : 'ip')}
                  className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-300"
                >
                  {expandedLayer === 'ip' ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>Layer 3: Internet Protocol Version 4 (Src: {selectedPacket.details.ip.srcIp}, Dst: {selectedPacket.details.ip.dstIp})</span>
                </div>
                {expandedLayer === 'ip' && (
                  <div className="pl-5 text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 pt-1 border-t border-slate-200 dark:border-white/5">
                    <div>Header Length: 20 bytes</div>
                    <div>Time to Live: {selectedPacket.details.ip.ttl} hops</div>
                    <div>Protocol: {selectedPacket.details.ip.protoNum === 1 ? 'ICMP (1)' : `Protocol (${selectedPacket.details.ip.protoNum})`}</div>
                  </div>
                )}
              </div>
            )}

            {/* Payload */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-1">
              <div
                onClick={() => setExpandedLayer(expandedLayer === 'payload' ? null : 'payload')}
                className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-300"
              >
                {expandedLayer === 'payload' ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                <span>Layer 4/Application Payload ({selectedPacket.protocol})</span>
              </div>
              {expandedLayer === 'payload' && (
                <div className="pl-5 text-[11px] text-cyan-800 dark:text-cyan-200 space-y-0.5 pt-1 border-t border-slate-200 dark:border-white/5">
                  <p>{selectedPacket.details.payload}</p>
                </div>
              )}
            </div>
          </div>

          {/* Hex & ASCII View */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Raw Frame Hex Dump</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 font-mono text-[11px] leading-relaxed break-all select-all max-h-[160px] overflow-y-auto">
              {selectedPacket.details.hex}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Corresponds to raw wire octets captured at the virtual NIC tap interface.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
