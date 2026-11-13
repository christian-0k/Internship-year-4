# NetPulse: IT Maintenance & Networking Training Platform

NetPulse is an intelligent, hands-on, enterprise-grade training platform bridging the gap between theoretical certification study and real-world IT job readiness. It unifies cert-aligned video courses, interactive transcripts, browser sandboxes (3D PC hardware disassembly, virtual RJ-45 cable crimper, Cisco-style CLI simulator, Wireshark packet capture), Socratic Gemini AI Tutor, and a complete Student Management System (SMS) with verifiable digital credentials.

---

## Feature Implementation Ledger & Live Status Board

| Module & Feature Component | Target Route | Persona / Domain | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Living README & Git Sync Guide** | `/README.md` | Dev / Antigravity | `[COMPLETED]` | Project tracking & Antigravity IDE guide |
| **Glassmorphic Design System & Tokens** | Global | UI / Theme | `[COMPLETED]` | Deep space `#070B14`, frosted glass, cyan/amber |
| **Global Theme Toggle (Indyli Light vs. Dark)** | Navbar / Global | UI / Accessibility | `[COMPLETED]` | Indyli clean light palette & Mission Control dark mode |
| **Public Landing Page Hero & Track Switcher** | `/` | Guest / Public | `[COMPLETED]` | A+ Hardware vs CCNA Networking split |
| **Landing Page Interactive Demos** | `/` | Guest / Public | `[COMPLETED]` | Cisco CLI micro-sandbox, 3D PC preview, AI Tutor demo |
| **Employer Credential Verification Widget** | `/` & `/verify/:hash` | Public / Employer | `[COMPLETED]` | Instant HMAC hash lookup & verification badge |
| **B2B Demo Request & B2C Onboarding Modal** | `/` & `/signup` | Guest / Learner | `[COMPLETED]` | Career goal selection & lead capture |
| **Public Course Catalog & Search** | `/courses` | Guest / Learner | `[COMPLETED]` | Domain filters (Hardware, OS, Networking) |
| **Course Detail & Cert Objective Syllabus** | `/courses/:slug` | Guest / Learner | `[COMPLETED]` | Cert mapping (A+ Core 1, CCNA 200-301) |
| **Authentication & RBAC Multi-Role Switcher** | Global / Header | All 7 Personas | `[COMPLETED]` | Learner, Instructor, Lab Tech, Org, Guardian, Admin |
| **Learner AI Dashboard & Next Best Action** | `/dashboard` | Learner | `[COMPLETED]` | Personalized study recommendation & SMS health |
| **Cert-Aligned Video Course Player** | `/learn/:c/:l` | Learner | `[COMPLETED]` | HLS simulation, synced transcript, speed control |
| **Context-Aware AI Tutor (Timestamp-Anchored)**| Side-Panel & `/tutor` | Learner | `[COMPLETED]` | Socratic guidance & CLI log error parser |
| **Interactive 3D Hardware Assembly Lab** | `/labs/:id` | Learner / Tech | `[COMPLETED]` | Three.js procedural motherboard & exploded view |
| **Virtual RJ-45 Cable Crimper & Wiremap Tester**| `/labs/:id` | Learner / Tech | `[COMPLETED]` | T568A vs T568B pinout sequencing & continuity tester |
| **Cisco IOS CLI Terminal & Auto-Grading** | `/labs/:id` | Learner | `[COMPLETED]` | Stateful IOS engine with VLAN & IP routing checks |
| **Wireshark Live Packet Sniffer & Dissector** | `/labs/:id` | Learner | `[COMPLETED]` | Real-time pcap table, Ethernet/IP/ICMP dissector |
| **Fault Injection Simulator** | `/labs/:id` | Learner / SME | `[COMPLETED]` | BSOD 0x7B, VLAN mismatch, bad patch cable |
| **CIDR Subnetting Speed Drill** | `/subnet-drill` | Learner | `[COMPLETED]` | Rapid-fire IP calculation challenge |
| **Skills Radar & Vendor Exam Readiness** | `/progress` | Learner | `[COMPLETED]` | Hexagonal readiness radar chart |
| **Student Profile & SMS Record Portal** | `/profile` | Learner | `[COMPLETED]` | Unique student code, attendance %, grade standing |
| **HMAC-Signed Certificate & Transcript Export**| `/certificates` | Learner / Admin | `[COMPLETED]` | Official printable transcript & public link |
| **Instructor Dashboard & Grading Queue** | `/teach` | Instructor | `[COMPLETED]` | Manual score override & audit log |
| **Course & Lab YAML DSL Authoring** | `/teach/courses` | Instructor | `[COMPLETED]` | Cert objective mapper & topology config |
| **Weighted SMS Gradebook & Attendance** | `/teach/gradebook` | Instructor | `[COMPLETED]` | Quizzes, labs, exams, attendance weights |
| **Physical Bench QR Check-In Scanner** | `/teach/cohorts` | Instructor / Tech | `[COMPLETED]` | Classroom bench attendance marking |
| **AI Escalation Inbox (Train AI)** | `/teach/q-and-a` | Instructor | `[COMPLETED]` | Review escalated queries & expand knowledge |
| **Lab Technician Inventory & Asset Tracking** | `/lab-ops/equipment`| Lab Technician | `[COMPLETED]` | Serialized router/PC status & QR tagging |
| **Lab Maintenance Log & Fault Triage** | `/lab-ops/faults` | Lab Technician | `[COMPLETED]` | Consumables tracker & repair logs |
| **B2B Org Dashboard & Seat Management** | `/org` | Org Manager | `[COMPLETED]` | Team pass rate analytics & Stripe billing |
| **Guardian Read-Only Progress Portal** | `/guardian` | Guardian | `[COMPLETED]` | Child attendance & gradebook view |
| **Admin System Health & AI Cost Monitor** | `/admin` | Platform Admin | `[COMPLETED]` | Token usage monitor & FERPA audit logs |

---

## Antigravity IDE & Git Synchronization Guide

If you clone or open this project in **Antigravity IDE** or an external Git workstation:

### 1. Git Repository Setup & Remote Sync
```bash
# Verify current git status
git status

# Add all tracked changes
git add .

# Commit with semantic message
git commit -m "feat: complete NetPulse IT training platform with Glassmorphic landing page and sandboxes"

# Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/your-username/netpulse-training-platform.git
git branch -M main
git push -u origin main
```

### 2. Local Workstation Setup (Inside Antigravity IDE)
```bash
# Clone the repository
git clone https://github.com/your-username/netpulse-training-platform.git
cd netpulse-training-platform

# Install dependencies
npm install

# Start development server (Port 3000)
npm run dev
```

### 3. Environment Variables
Ensure `.env` contains:
```env
# Required for Gemini AI API server proxy
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Application hosting URL (injected automatically in AI Studio / Cloud Run)
APP_URL="http://localhost:3000"
```

---

## Architecture Overview
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion
- **3D Graphics**: Three.js (Procedural motherboard models with PBR lighting & exploded view)
- **AI Core**: Google Gemini SDK (`gemini-3.8-flash` & `gemini-4-argon` with `ThinkingLevel.HIGH`)
- **Backend / API**: Node.js + Express with server-side proxy routes in `server.ts`
- **Security**: HTTPS / SSL, HMAC-SHA256 digital certificate signing, JWT session simulation, RBAC with 7 discrete personas.
