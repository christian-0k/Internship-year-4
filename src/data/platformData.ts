import { CurriculumModule, PlatformFeature, Testimonial, TopologyNode } from '../types';

export const HERO_METRICS = [
  { value: '98.4%', label: 'First-Attempt Pass Rate', detail: 'CompTIA A+, Network+, & CCNA exams' },
  { value: '140+', label: 'Hands-On Simulated Labs', detail: 'Hardware bench & packet topologies' },
  { value: '4,200+', label: 'Placed Technicians', detail: 'In enterprise sysadmin & NOC roles' },
  { value: '< 25s', label: 'Sandbox Boot Latency', detail: 'Zero local hypervisor setup required' },
];

export const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: 'hardware-diagnostics',
    title: 'Component-Level Hardware Diagnostic Workbench',
    subtitle: 'Physical fault isolation without risking physical equipment',
    description: 'Practice modular server teardowns, POST code debugging, multimeter continuity probing, thermal dissipation analysis, and ECC memory fault isolation in a 3D-accurate virtual laboratory.',
    badge: 'Hardware & Maintenance',
    image: '/src/assets/images/hardware_diagnostics_bench_1793441725233.jpg',
    bullets: [
      'Multi-pin power rail voltage checks (12V, 5V, 3.3V)',
      'BIOS/UEFI firmware corruption flash & recovery drills',
      'PCIe lane negotiation and NVMe controller failure triage',
      'Dual-socket Xeon/EPYC thermal paste and heatsink mounting'
    ]
  },
  {
    id: 'packet-topology',
    title: 'Enterprise Spine-Leaf Topology Simulator',
    subtitle: 'Production routing, VLAN tagging, and failover orchestration',
    description: 'Configure real virtualized Cisco IOS switches, Juniper edge routers, and Linux server clusters. Test multi-area OSPF, BGP peering, STP loop prevention, and 802.1Q trunking with wire-speed packet tracers.',
    badge: 'Network Engineering',
    image: '/src/assets/images/network_topology_datacenter_1793441725094.jpg',
    bullets: [
      'Interactive Wireshark pcap packet disassembly and analysis',
      'DHCP snooping, ARP inspection, and 802.1X port security',
      'Dynamic BGP failover and route redistribution drills',
      'Stateful firewall rule synthesis with drop-packet logs'
    ]
  },
  {
    id: 'automated-grading',
    title: 'Real-Time Automated Syntax & Routing Verification',
    subtitle: 'Instant corrective feedback on every command and cable patch',
    description: 'Never wait days for instructor reviews. Our automated prober validates your running configurations, detects routing blackholes, identifies misconfigured subnet masks, and guides you to the solution.',
    badge: 'Instant Feedback',
    bullets: [
      'Diff comparisons between running-config and objective state',
      'Automated synthetic ping floods to test link redundancy',
      'Detailed mistake breakdowns with RFC references and guidance'
    ]
  },
  {
    id: 'chaos-scenarios',
    title: 'High-Stress Live Incident Response Drills',
    subtitle: 'Prepare for 3:00 AM outages before your first job shift',
    description: 'Face unannounced network degradation: cut fiber links, corrupted ARP tables, broadcast storms caused by bridge loops, and power supply unit dropouts under strict countdown timers.',
    badge: 'NOC Incident Response',
    bullets: [
      'MTTR (Mean Time to Resolution) benchmark grading',
      'Realistic enterprise ticketing system and user complaint simulations',
      'Post-mortem incident reporting templates and review rubrics'
    ]
  },
  {
    id: 'certification-ready',
    title: 'Accredited Certification Exam Preparation',
    subtitle: 'Direct alignment with major IT industry standards',
    description: 'Every lab maps 1:1 to exam objectives for CompTIA A+ (Core 1 & 2), CompTIA Network+ (N10-008/009), Cisco CCNA (200-301), and Linux Professional Institute LPIC-1.',
    badge: 'Official Objectives',
    bullets: [
      'Performance-Based Question (PBQ) replica simulators',
      'Curated 1,800+ question bank with technical rationales',
      'Official exam voucher discounts up to 35% for enrolled students'
    ]
  }
];

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'cur-1',
    track: 'hardware',
    title: 'PC & Server Architecture Teardown',
    duration: '4 Weeks',
    labsCount: 22,
    level: 'Beginner',
    certification: 'CompTIA A+ Core 1',
    description: 'Deep dive into motherboard form factors, chipset architecture, RAM timings, power budgets, and expansion buses.',
    topics: ['ATX & Server Form Factors', 'DDR4/DDR5 Architecture', 'Power Supply Rail Testing', 'Storage Protocols (SATA, NVMe, SAS)']
  },
  {
    id: 'cur-2',
    track: 'hardware',
    title: 'Diagnostic Methodology & Fault Recovery',
    duration: '3 Weeks',
    labsCount: 18,
    level: 'Intermediate',
    certification: 'CompTIA A+ Core 2',
    description: 'Systematic troubleshooting methodology: CompTIA 6-step model, CMOS diagnostic codes, OS blue-screen analysis, and disk recovery.',
    topics: ['POST Code Hex Analysis', 'Thermal Throttle Diagnostics', 'RAID Array Rebuilds', 'Memory Leak Triage']
  },
  {
    id: 'cur-3',
    track: 'networking',
    title: 'TCP/IP, Subnetting & OSI Layer Analysis',
    duration: '5 Weeks',
    labsCount: 28,
    level: 'Beginner',
    certification: 'CompTIA Network+',
    description: 'Binary subnetting math, VLSM allocation, transport layer mechanics, and packet header deep dives.',
    topics: ['VLSM & CIDR Calculations', 'Three-Way Handshake Analysis', 'DNS/DHCP Server Setup', 'Wireshark Protocol Tracing']
  },
  {
    id: 'cur-4',
    track: 'networking',
    title: 'Enterprise Routing & Switching Protocols',
    duration: '6 Weeks',
    labsCount: 34,
    level: 'Intermediate',
    certification: 'Cisco CCNA 200-301',
    description: 'VLAN segmentation, trunking protocols, Spanning Tree Protocol (STP), OSPF area design, and EtherChannel bonding.',
    topics: ['802.1Q VLANs & VTP', 'Rapid Spanning Tree (RSTP)', 'Single & Multi-Area OSPF', 'Static & Dynamic NAT/PAT']
  },
  {
    id: 'cur-5',
    track: 'security',
    title: 'Network Defense & Perimeter Hardening',
    duration: '4 Weeks',
    labsCount: 20,
    level: 'Advanced',
    certification: 'CompTIA Security+',
    description: 'Configuring access control lists (ACLs), stateful inspection firewalls, VPN tunnels, and 802.1X network access control.',
    topics: ['Standard & Extended ACLs', 'IPsec Site-to-Site Tunnels', 'IDS/IPS Rule Deployment', 'Port Security & MAC Limiting']
  },
  {
    id: 'cur-6',
    track: 'datacenter',
    title: 'Data Center Infrastructure & Linux Admin',
    duration: '5 Weeks',
    labsCount: 26,
    level: 'Advanced',
    certification: 'Linux+ / LPIC-1',
    description: 'High-availability server clustering, systemd service management, SSH key management, and bash automation.',
    topics: ['Linux CLI Sysadmin Essentials', 'Storage Management (LVM)', 'Redundant Power & PDU Balancing', 'Network Bonding & Bond Modes']
  }
];

export const LAB_TOPOLOGY_NODES: TopologyNode[] = [
  { id: 'gw-01', name: 'Edge Gateway (BGP)', type: 'router', ip: '198.51.100.1', status: 'healthy', traffic: '1.2 Gbps', vlan: 100 },
  { id: 'fw-01', name: 'Perimeter Firewall', type: 'firewall', ip: '10.0.1.1', status: 'healthy', traffic: '850 Mbps', vlan: 10 },
  { id: 'sw-core', name: 'Core Distribution Switch', type: 'switch', ip: '10.0.1.2', status: 'healthy', traffic: '3.4 Gbps', vlan: 1 },
  { id: 'srv-app', name: 'Primary Web/App Cluster', type: 'server', ip: '10.0.2.10', status: 'healthy', traffic: '410 Mbps', vlan: 20 },
  { id: 'srv-db', name: 'Database Blade #2', type: 'server', ip: '10.0.3.5', status: 'warning', traffic: '180 Mbps', vlan: 30 },
  { id: 'ws-admin', name: 'NOC Admin Workstation', type: 'client', ip: '10.0.10.42', status: 'healthy', traffic: '12 Mbps', vlan: 99 },
];

export const TERMINAL_PRESETS: { command: string; label: string; response: string }[] = [
  {
    command: 'ping 10.0.1.1',
    label: 'Ping Firewall Gateway',
    response: `PING 10.0.1.1 (10.0.1.1) 56(84) bytes of data.
64 bytes from 10.0.1.1: icmp_seq=1 ttl=64 time=0.482 ms
64 bytes from 10.0.1.1: icmp_seq=2 ttl=64 time=0.391 ms
64 bytes from 10.0.1.1: icmp_seq=3 ttl=64 time=0.415 ms
64 bytes from 10.0.1.1: icmp_seq=4 ttl=64 time=0.388 ms

--- 10.0.1.1 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3042ms
rtt min/avg/max/mdev = 0.388/0.419/0.482/0.038 ms`
  },
  {
    command: 'show ip interface brief',
    label: 'Show Router Interfaces',
    response: `Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0/0   198.51.100.1    YES NVRAM  up                    up      
GigabitEthernet0/0/1   10.0.1.1        YES NVRAM  up                    up      
GigabitEthernet0/0/2   10.0.2.1        YES NVRAM  up                    up      
Vlan10                 10.0.10.1       YES manual up                    up      
Vlan20                 10.0.20.1       YES manual up                    up      
Loopback0              1.1.1.1         YES manual up                    up      
Serial0/1/0            unassigned      YES unset  administratively down down`
  },
  {
    command: 'diagnose hardware psu',
    label: 'Diagnose Power Supply & Thermals',
    response: `[HARDWARE TELEMETRY PROBE v4.2]
Checking PSU 1 (Primary - 850W Platinum):
  +12.0V Rail: 12.04 V [NOMINAL - PASS]
  +5.0V Rail:  5.01 V  [NOMINAL - PASS]
  +3.3V Rail:  3.31 V  [NOMINAL - PASS]
Checking PSU 2 (Redundant - 850W Platinum):
  +12.0V Rail: 11.98 V [NOMINAL - PASS]
Thermal Sensors:
  CPU0 Package: 42.1°C (Fan speed: 3200 RPM)
  VRM Heatsink: 48.6°C
  DIMM Bay A:   34.2°C
POST Status: 0x00 (System Boot Clear)`
  },
  {
    command: 'show vlan brief',
    label: 'Show VLAN Configuration',
    response: `VLAN Name                             Status    Ports
---- -------------------------------- --------- -------------------------------
1    default                          active    Gi0/1, Gi0/2, Gi0/3, Gi0/4
10   MANAGEMENT_NET                   active    Gi0/5, Gi0/6
20   PRODUCTION_SERVERS               active    Gi0/7, Gi0/8, Gi0/9, Gi0/10
30   DATABASE_ISOLATION               active    Gi0/11, Gi0/12
99   SECURITY_DMZ                     active    Gi0/23, Gi0/24`
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Before NetForge, standard courses gave me multiple-choice questions that did nothing to prepare me for a real server rack. Their hardware teardown workbench and live router CLI let me pass the CCNA and CompTIA A+ on my first attempt, jumping my salary by 68%.',
    name: 'Marcus Sterling',
    role: 'Tier 2 Network Operations Engineer',
    company: 'Apex Data Infrastructure',
    trackCompleted: 'Enterprise Network Engineering',
    impactMetric: 'Hired in 45 days after completing CCNA track'
  },
  {
    id: 'test-2',
    quote: 'The chaos engineering failure drills are unprecedented. Being tested on finding an intentional broadcast storm or faulty power rail under time pressure built the exact mental muscle I use daily managing enterprise server clusters.',
    name: 'Elena Rostova',
    role: 'Lead Systems Administrator',
    company: 'Vanguard Health Systems',
    trackCompleted: 'Data Center & IT Maintenance',
    impactMetric: 'Reduced enterprise ticket resolution time by 38%'
  },
  {
    id: 'test-3',
    quote: 'We enrolled our entire junior field technician team of 14 people. NetForge cut our onboarding ramp from 6 months down to 7 weeks because technicians arrived already knowing how to cable patch panels and isolate VLAN faults.',
    name: 'David K. Mercer',
    role: 'Director of Infrastructure Operations',
    company: 'Global Transit Telecom',
    trackCompleted: 'Enterprise Partner Cohort',
    impactMetric: '14 technicians certified within 60 days'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Do I need any physical networking gear or high-end PC hardware to train?',
    answer: 'No. Everything runs inside high-performance, containerized cloud sandboxes accessible through any modern web browser. You interact with virtualized hardware workbenches, terminal emulators, and full packet sniffers with zero local installation.'
  },
  {
    question: 'Which certifications does the NetForge curriculum officially align with?',
    answer: 'Our tracks directly map to CompTIA A+ (Core 1 & 2), CompTIA Network+, CompTIA Security+, Cisco CCNA (200-301), and Linux Professional Institute LPIC-1. Each track includes performance-based question (PBQ) simulators identical to the real certification exams.'
  },
  {
    question: 'How does the automated lab grading engine work?',
    answer: 'When you submit or configure a lab topology, our headless prober inspects your running configuration, verifies route tables, sends synthetic packets to validate connectivity, and provides immediate syntax and architectural feedback within seconds.'
  },
  {
    question: 'Can teams and corporate enterprises license NetForge for staff onboarding?',
    answer: 'Yes. Enterprise accounts include manager analytics dashboards, custom topology builder tools, cohort progress tracking, and private enterprise incident drill environments.'
  }
];
