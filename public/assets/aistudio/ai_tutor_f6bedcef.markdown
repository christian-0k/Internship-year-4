---
name: NetOps Academy & SysTrain Precision Interface
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a high-density, mission-critical educational environment tailored for systems engineering, DevOps, and cloud architecture mastery. The aesthetic unifies technical utility with enterprise-grade refinement: clean, disciplined, highly legible, and free of gratuitous ornamentation.

### Target Audience & Psychological Response
- **Audience:** Network engineers, site reliability engineers (SREs), infrastructure administrators, lab instructors, and enterprise technical leads.
- **Cognitive Tone:** Rigorous, operational, confidence-inspiring, and precise. The interface should feel as dependable and structured as production cloud control planes, converting high cognitive load into clear tactical action.

### Design Movement: Modern Technical & Systemic Minimalism
Drawing inspiration from enterprise cloud consoles (AWS, Cloudflare, Grafana) and developer-first command line workflows:
- **Structural Integrity:** Crisp horizontal and vertical alignment lines, micro-borders, and strict semantic role hierarchies.
- **Dual Visual Modes:** A calm, clean daylight slate aesthetic for administrative workflows, course catalogues, and grading modules, paired seamlessly with deep telemetry-black surfaces for interactive CLI terminals, topology diagrams, and container runtime labs.

## Colors

The system uses a calibrated palette that balances high-contrast diagnostic indicators against neutral slate substrates. Primary actions and operational states have explicit semantic mappings to prevent ambiguity during high-pressure timed certification labs and complex topology configurations.

### Key Roles & Semantic Application
- **Primary Tech Blue (`#2563EB` | Shades: `#1E3A8A`, `#3B82F6`):** Drives focal navigation, active node selection, execution triggers, and interactive elements.
- **Deep Slate Ground (`#0F172A` | Secondary: `#1E293B`, `#334155`):** Serves as structural framing (sidebar navigation, top telemetry headers, lab control bars) and primary typography in light mode.
- **Operational / Pass Emerald (`#10B981` | Deep: `#059669`):** Health status, passed automated unit tests, active lab pods, completed syllabus milestones.
- **Alert / Fault Crimson (`#EF4444` | Deep: `#DC2626`):** Failed pipeline checks, offline network switches, lab timeout warnings, security access violations.
- **Diagnostic Amber (`#F59E0B`):** In-progress syncs, queued node deployments, pending peer reviews, staging test environments.
- **Surfaces & Borders:** Neutral light canvasing uses slate-tinted whites (`#F8FAFC`, `#F1F5F9`) structured by low-contrast micro-dividers (`#E2E8F0`).
- **Terminal & Console Shell:** Terminal black (`#030712`) with active phosphor accents (`#34D399`) and diagnostic cyan (`#38BDF8`) for parsing CLI output, routing tables, and live logs.

## Typography

The typography system pairs **Inter** for user interface layout and continuous documentation with **JetBrains Mono** for machine-to-human readouts, configuration snippets, and tabular operational matrices.

### Implementation Guidelines
- **Tabular Figures (`tnum`):** All performance metrics, packet counts, IP addresses, latency graphs, and scores must enforce `font-feature-settings: "tnum" 1` to guarantee vertical number alignment across tables and dashboards.
- **Visual Weight Distribution:** Headlines utilize reduced letter-spacing (`-0.01em` to `-0.025em`) to retain compactness in dashboard grid heads.
- **Code & Metric Labels:** JetBrains Mono is strictly applied to status pills, subnet masks, route paths, runtime counters, and inline code snippets.

## Layout & Spacing

The layout philosophy follows a high-efficiency fluid grid system structured for complex split-screen tasks (e.g., interactive terminal pane alongside step-by-step lab instructions).

### Grid & Density Hierarchy
- **Desktop (>= 1280px):** 12-column fluid grid, 24px (`1.5rem`) gutters, with persistent 260px collapsible operational navigation. Supports dual/tri-pane IDE-style split views for active lab exercises.
- **Tablet (768px - 1279px):** 8-column layout, 16px (`1rem`) gutters; sidebars collapse into persistent icon-rail format (64px width).
- **Mobile (< 768px):** 4-column layout, 16px (`1rem`) margins. Multi-pane lab environments shift into segmented tab controls (Terminal | Architecture Diagram | Objectives).

### Component Spacing Rhythms
- Compact baseline unit: 4px (`space-xs`).
- Form controls and badge insets: `space-xs` (vertical) by `space-sm` or `space-md` (horizontal).
- Card layouts, telemetry metric modules, and code inspector panels: 16px to 20px interior padding (`space-lg`).

## Elevation & Depth

To preserve sharp legibility across information-dense screens, depth is achieved primarily through **low-contrast outlines** and **tonal surface separation**, minimizing heavy drop shadows.

### Elevation Levels
- **Level 0 (Base Substrate):** Canvas background (`#F8FAFC` in light mode; `#030712` in lab console mode). Zero elevation.
- **Level 1 (Card & Module Layer):** `#FFFFFF` surface bounded by a crisp 1px neutral outline (`#E2E8F0`). Flat elevation with a subtle ambient tint: `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Level 2 (Interactive Floating & Flyouts):** Active dropdowns, lab configuration popovers, and filter menus use `#FFFFFF` with a reinforced perimeter border (`#CBD5E1`) and directional shadow: `box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.08)`.
- **Level 3 (Modal Dialogs & Topology Inspectors):** Positioned over a 40% opacity slate scrim (`#0F172A66`), backed by `box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.16)`.
- **Terminal Elevation:** Dark CLI panels rely on hard 1px borders (`#1E293B`) against adjacent canvas areas, providing distinct boundaries without fuzzy shadow bleed.

## Shapes

The design uses a clean, engineered corner geometry. An 8px (`0.5rem`, `rounded-lg`) standard applies across inputs, cards, and modal sheets to soften technical complexity while avoiding casual or playful roundedness.

### Corner Radius System
- **Core Standard (8px / `0.5rem`):** Applied uniformly to cards, configuration panels, form input fields, modal sheets, and terminal window frame containers.
- **Micro Elements (4px / `0.25rem`):** Applied to status badges, micro-tooltips, syntax code highlights, and tree-view item selectors.
- **Pill Elements (`9999px`):** Reserved exclusively for live status telemetry indicators, progress indicator dots, and interactive role switcher toggles.

## Components

### Buttons
- **Primary:** Background Tech Blue (`#2563EB`), text `#FFFFFF`, 8px radius. Hover: `#1D4ED8`. Active: `#1E40AF`.
- **Secondary / Outline:** Background transparent, 1px border `#CBD5E1`, text `#0F172A`. Hover: `#F1F5F9`.
- **Destructive:** Background `#EF4444`, text `#FFFFFF`. Hover: `#DC2626`.
- **Terminal Execution:** Background `#0F172A`, text `#38BDF8`, mono font, 1px border `#334155`.

### Status Badges
Constructed using 4px border-radius, `label-sm` monospace typography, 2px horizontal padding, and a 6px status dot:
- **Active / Online / Pass:** Background `#ECFDF5`, text `#065F46`, dot `#10B981`.
- **Draft / Inactive:** Background `#F1F5F9`, text `#475569`, dot `#94A3B8`.
- **Published / Ready:** Background `#EFF6FF`, text `#1E40AF`, dot `#3B82F6`.
- **Faulty / Failed / Offline:** Background `#FEF2F2`, text `#991B1B`, dot `#EF4444`.
- **In Progress / Provisioning:** Background `#FFFBEB`, text `#92400E`, dot `#F59E0B`.

### Form Inputs & Controls
- **Inputs:** Height 38px, 8px radius, border 1px `#CBD5E1`, background `#FFFFFF`, text `#0F172A`. Focused state: 1px border `#2563EB` with `0 0 0 3px rgba(37, 99, 235, 0.15)`.
- **Checkboxes & Radios:** 16px size, 4px radius (checkbox) or circular (radio), border `#94A3B8`. Checked state: background `#2563EB`, white check indicator.

### Data Cards & Progress Rings
- **Metric Cards:** Padding `1.25rem`, 8px radius, 1px border `#E2E8F0`. Features a metric header with monospace value readouts and dynamic color badges (+/- delta).
- **Progress Rings:** High-visibility SVG rings, stroke width 6px, track color `#E2E8F0`, progress bar `#2563EB` (or `#10B981` at 100% completion).

### Domain-Specific Components
- **CLI Preview Widget:** Header bar in `#1E293B` featuring terminal title and session status. Body in `#030712` with syntax-highlighted commands, prompt symbols (`#38BDF8`), and monospace output (`#E2E8F0`).
- **Telemetry Indicators:** Miniature health pulses displaying latency (ms), packet loss (%), and container health.
- **Role-Based Navigation:** Segmented context header allowing instant switching between **Learner** (Curriculum, Labs, Quizzes), **Instructor** (Cohort Analytics, Grading Queue, Lab Builder), **Admin** (Licensing, Role RBAC, Single Sign-On), and **Lab Tech** (Node Orchestration, VM Pools, Out-of-Band Consoles).