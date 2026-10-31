# NetPulse — IT Maintenance & Networking Training Platform

NetPulse is an intelligent, hands-on, enterprise-grade training platform that bridges the gap between theoretical certification study and real-world IT job readiness. It unifies cert-aligned video courses with interactive transcripts and chapter navigation, interactive browser sandboxes (3D PC hardware disassembly workbench, virtual RJ-45 cable crimper, Cisco-style CLI simulator, Wireshark packet capture inspector, instructor fault injection), a timestamp-aware Socratic Gemini AI Tutor, and a comprehensive Student Management System (SMS) for multi-role academic administration—all wrapped in a cohesive, modern **Glassmorphism** visual language.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design system, security, and feature specifications are confirmed:

- **Primary Visual Design: High-Tech Glassmorphism**:
  - *Frosted Translucent Surfaces*: Deep void canvas (`#070B14`) layered with frosted glass containers (`backdrop-blur-xl bg-slate-900/60` and `bg-slate-900/40`).
  - *Specular Edge Highlights*: Refined semi-transparent hairline borders (`border border-white/10` to `border-cyan-500/20`) with soft spatial shadows (`shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]`).
  - *Accent Telemetry Glows*: Electric Cyan (`#00E5FF`) for operational indicators and CTAs, Radiant Amber (`#F59E0B`) for fault alerts, and Matrix Emerald (`#10B981`) for verified credentials.
  - *WCAG AA Contrast Safeguards*: High-contrast crisp typography (`text-white` and `text-slate-200`) ensuring readability across all frosted glass panels.
- **Enhanced Practical Tool Suite**:
  - *Virtual RJ-45 Cable Crimper & Wiremap Tester*: Interactive color-pinout sequencing tool (T568A vs T568B) and digital cable tester for open pairs, shorts, and split pairs.
  - *Wireshark-Style Packet Inspector*: Live visual packet capture integrated with the Cisco CLI terminal, allowing students to observe ARP, ICMP, DHCP DORA, and TCP handshake frames.
  - *CIDR Subnetting Speed Drill*: Gamified rapid-fire subnet practice drill for CCNA students to master network, broadcast, and host range calculations under exam timing.
- **HTTPS & End-to-End Security**:
  - Secure HTTPS protocol enforced via Cloud Run SSL termination, HTTPS redirects, and security headers (HSTS `Strict-Transport-Security`, Content Security Policy, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`).
  - Cryptographic token authorization, session management, and HMAC-SHA256 signature generation and validation for tamper-proof digital certificates.
  - Role-Based Access Control (RBAC) covering all 7 roles with strictly scoped permissions and audit logging for sensitive student grade records (FERPA/GDPR compliance).
- **All 7 Sections & 26 Pages Fully Architected with Operational User Flows**:
  - **1. Public (Unauthenticated / Guests)**: Landing Page (`/`), Course Catalog (`/courses`), Course Detail (`/courses/:slug`), Public Verification (`/verify/:hash`), Auth & Track Onboarding (`/login`, `/signup`, `/forgot-password`).
  - **2. Learner (Student)**: AI Dashboard (`/dashboard`), Video Course Player (`/learn/:courseId/:lessonId`), Interactive Labs (`/labs/:labId`), Quiz Engine (`/quiz/:quizId`), Subnet Drill (`/subnet-drill`), AI Tutor Full Page (`/tutor`), Progress & Skills (`/progress`), Profile & SMS Portal (`/profile`), Certificates & Transcripts (`/certificates`).
  - **3. Instructor / SME**: Dashboard (`/teach`), Course Authoring (`/teach/courses/:id`), Lab Authoring (`/teach/labs/:id`), Gradebook (`/teach/gradebook`), Cohorts & Attendance (`/teach/cohorts`), AI Escalation Inbox (`/teach/q-and-a`).
  - **4. Lab Technician**: Lab Ops Dashboard (`/lab-ops`), Equipment Inventory (`/lab-ops/equipment`), Maintenance Log (`/lab-ops/maintenance`), Fault Reports (`/lab-ops/faults`).
  - **5. Org Manager (B2B)**: Org Dashboard (`/org`), Seat Management (`/org/seats`), Team Reports (`/org/reports`), Billing & Invoices (`/org/billing`).
  - **6. Guardian (Read-Only)**: Guardian Dashboard (`/guardian`).
  - **7. Platform Admin**: Admin Dashboard (`/admin`), User Management (`/admin/users`), Student Records (`/admin/students`), Transcripts & Certs (`/admin/transcripts`), Content Moderation (`/admin/moderation`), System Settings (`/admin/settings`).

---

## 1. Overview & Core Concept

### What It Does
NetPulse eliminates the divide between passive video courses and costly physical IT bootcamps:
1. **Interactive Video Courses**: Structured video lessons tagged to vendor certification objectives (e.g., CompTIA A+ Core 1.2: RAM Architecture; CCNA 1.3: Router Interfaces). Includes synchronized auto-scrolling transcripts, searchable keywords, playback speed controls (0.75x–2.0x), and timestamp bookmarking.
2. **Context-Aware Socratic AI Tutor**: Powered by Gemini (`gemini-3.8-flash` for low-latency queries and `gemini-4-argon` with `ThinkingLevel.HIGH` for complex CLI/BSOD error diagnosis), the AI Tutor understands the exact lesson timestamp, transcript context, and lab terminal state, guiding learners without spoiling quiz answers or permitting destructive commands.
3. **Interactive 3D & CLI Sandboxes**:
   - 3D virtual computer assembly/disassembly bench to inspect motherboard sockets, seat dual-channel DDR5 RAM, and apply thermal paste.
   - Cisco IOS terminal simulator with VLANs, trunking, routing, ping diagnostics, and fault injection.
   - Virtual RJ-45 cable crimper with T568A/B wire sequencing and digital pinout continuity tester.
   - Live packet inspector showing ARP, ICMP, and TCP frames in flight.
4. **Integrated SMS & Academic Gradebook**: Instructors and Admins manage cohorts, track physical lab attendance via QR check-ins, record weighted grades (quizzes, labs, exams, attendance), generate HMAC-signed PDF certificates, and issue academic transcripts.
5. **Operations & Public Verification**: Lab Technicians track physical bench equipment status and consumables (thermal paste, RAM sticks, patch cables), while employers verify candidate certificates on a public verification link.

---

## 2. Complete User Flows Across All 7 Sections & 26 Pages

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        NETPULSE GLASSMORPHISM ROUTING ARCHITECTURE                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. PUBLIC (Glass Hero)  │ 2. LEARNER (Mission Deck)│ 3. INSTRUCTOR (Ops Deck)           │
│  / (Landing Page)       │  /dashboard (AI Deck)    │  /teach (Grading Queue)            │
│  /courses (Catalog)     │  /learn/:c/:l (Video)    │  /teach/courses (Curriculum)       │
│  /courses/:slug (Detail)│  /labs/:id (3D + CLI)    │  /teach/labs (YAML DSL & Faults)   │
│  /verify/:hash (Verify) │  /quiz/:id (Quiz Engine) │  /teach/gradebook (Weighted SMS)   │
│  /login, /signup, etc.  │  /subnet-drill (CIDR)    │  /teach/cohorts (QR Attendance)    │
│                         │  /tutor (AI Console)     │  /teach/q-and-a (Escalations)      │
│ 4. LAB TECH             │  /progress (Radar Chart) │                                    │
│  /lab-ops (Bench Map)   │  /profile (SMS Profile)  │ 5. ORG MANAGER (B2B)               │
│  /lab-ops/equipment     │  /certificates (HMAC)    │  /org (Seat Utilization / ROI)     │
│  /lab-ops/maintenance   ├──────────────────────────┤  /org/billing (Stripe Invoices)    │
│  /lab-ops/faults        │ 6. GUARDIAN (Read-Only)  │                                    │
│                         │  /guardian (Attendance)  │ 7. PLATFORM ADMIN                  │
│                         │                          │  /admin (System / AI Cost Monitor) │
│                         │                          │  /admin/users & /admin/audit       │
└─────────────────────────┴──────────────────────────┴────────────────────────────────────┘
```

### Glassmorphism Visual Tokens
- **Background Canvas**: Deep void midnight `#070B14` with subtle radial mesh gradient glow (`radial-gradient(ellipse at 50% 0%, rgba(0, 229, 255, 0.08) 0%, transparent 70%)`).
- **Primary Glass Container**: `bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl`.
- **Secondary Glass Card**: `bg-slate-800/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 transition-all duration-200`.
- **Glass Top Navigation**: Single-row 3-zone bar pinned with `bg-slate-950/70 backdrop-blur-xl border-b border-white/10`.
- **Controls & Modals**: Frosted floating docks with specular top highlight (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]`).

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Glassmorphism Design System
- **Chosen Approach**: Built using Tailwind CSS utility composition (`backdrop-blur-xl`, `bg-slate-900/60`, `border-white/10`, `shadow-2xl`) combined with electric cyan and amber specular highlights.
- **Why**: Delivers an immersive, mission-control feel appropriate for next-generation IT infrastructure training while maintaining strict WCAG AA contrast standards.

### Decision 2: Hands-On Cable Crimping & Wiremap Simulator
- **Chosen Approach**: Built-in 8-pin RJ-45 wire sequencing sandbox with both T568A and T568B standards, animated crimping tool, and LED pinout continuity tester.
- **Why**: Directly addresses the problem statement ("learners unable to crimp a cable") which is a notoriously difficult hands-on skill to learn from video alone.

### Decision 3: Wireshark-Style Visual Packet Inspector
- **Chosen Approach**: Synchronized packet trace panel that visualizes frame headers, IP packet layers, and payload details when students run network commands like `ping`, `traceroute`, or configure DHCP/OSPF.
- **Why**: Helps students build intuitive mental models of encapsulation and Layer 2/3 protocols essential for passing CCNA.

### Decision 4: HTTPS & Cryptographic Security Architecture
- **Chosen Approach**: Enforce HTTPS-first headers (`Strict-Transport-Security`, CSP, secure cookie flags) and cryptographically sign every issued certificate with HMAC-SHA256 using an application secret.
- **Why**: Protects student records against tampering, secures authentication tokens, and allows employers to verify credentials without trusting client-side claims.

### Decision 5: Procedural 3D Hardware Workbench (Three.js) vs External Models
- **Chosen Approach**: Procedural, multi-part 3D hardware assembly in Three.js (ATX motherboard with CPU socket, heat sink, RAM slots, PCIe GPU, M.2 NVMe, PSU modular cables, and front panel headers).
- **Why**: Eliminates 404 risks and bandwidth lag from external model files while providing full programmatic control over exploded views, socket snapping, and diagnostic checks.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                   NetPulse Glassmorphic Client (React 19)              │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar (Brand · 5 Nav Links · Role Switcher · 1 Primary Action)       │
├──────────────────┬─────────────────────────────┬───────────────────────┤
│  Video Course    │ 3D Hardware Assembly Lab    │ Cisco CLI Terminal    │
│  Player (Synced  │ (Three.js + Exploded View   │ (Stateful Engine +    │
│  Transcripts)    │  + Socket Snapping)         │  Wireshark Sniffer)   │
├──────────────────┴─────────────────────────────┴───────────────────────┤
│  Virtual Cable Crimper (T568A/B) · Subnetting Speed Drill (CIDR)       │
├────────────────────────────────────────────────────────────────────────┤
│  Glass AI Tutor Dock (Video Timestamp Anchor + Socratic CLI Parser)    │
├────────────────────────────────────────────────────────────────────────┤
│  Role Portals: Learner · Instructor · Lab Tech · Org · Guardian · Admin│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS (Encrypted SSL) / API
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Node.js / Express Server (server.ts)               │
├────────────────────────────────────┬───────────────────────────────────┤
│  /api/tutor/chat (Gemini API)      │  /api/sms/gradebook & attendance  │
│  /api/tutor/analyze-cli (Argon)    │  /api/lab-ops/equipment (QR Sync) │
│  /api/verify/:hash (HMAC-SHA256)   │  /api/courses & fault injection   │
└────────────────────────────────────┴───────────────────────────────────┘
```

---

## 5. Verification Plan
- **Build & Compilation**: Run `compile_applet` and verify zero TypeScript or bundler errors.
- **Glassmorphic UI Quality**: Verify backdrop blurs, specular hairline borders, and WCAG AA contrast across all pages.
- **Route & Page Inspection**: Test transitions across all 7 role views and 26 modular pages.
- **Video Course Player Test**: Verify video playback, rate changes (0.75x–2.0x), transcript auto-scrolling, chapter jumping, and timestamp-aware AI Tutor questions.
- **Hands-on Lab Tests**:
  - 3D Motherboard Assembly & Exploded View.
  - Virtual RJ-45 Cable Crimper (T568A/B pinout check & continuity test).
  - Cisco IOS CLI Terminal & Wireshark-style packet sniffer.
  - Subnetting speed drill.
- **SMS & Operations Test**: Mark attendance, update gradebook weights, log faulty equipment via Lab Tech portal, and generate an HMAC-signed certificate.
- **Public Verification**: Verify a certificate hash on `/verify/:hash` and inspect cryptographic verification details.
