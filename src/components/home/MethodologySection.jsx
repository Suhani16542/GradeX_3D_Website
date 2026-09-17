import React, { useRef, useState, useEffect } from 'react';
import { Methodology3DFullBg } from '../three/Methodology3DFullBg';
import { Compliance3DShield } from '../three/Compliance3DShield';
import { Button } from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Gauge,
  ShieldCheck,
  Waves,
  Sparkles,
  ClipboardCheck,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  ChevronRight,
  HardHat,
  FileText,
  BadgeCheck,
  Lock,
  Activity,
  Shield,
  FileBadge,
  Check
} from 'lucide-react';

import { useResponsive } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 5: Grade X 8-Step Kitchen Hygiene Methodology & Compliance WHS
 * Design Features:
 * - Edge-to-Edge Yellow Geometric Triangular Roof Canopy with smooth scroll retraction
 * - Full-bleed Three.js 3D Conduit & Step Station Background
 * - Dedicated Interactive 3D Holographic Safety Shield for COMPLIANCE & WHS
 * - Responsive 8-Step Grid (1 col mobile, 2 col tablet, 4 col desktop)
 * - Mobile-first Compliance Layout (Heading -> 3D Hologram Shield -> Cards -> Metrics)
 */
export function MethodologySection() {
  const sectionRef = useRef(null);
  const bigYellowTriangleRef = useRef(null);
  const apexGlowRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const { isMobile, isTablet } = useResponsive();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Compliance Section State
  const [activeComplianceCard, setActiveComplianceCard] = useState(0);
  const [hoveredComplianceCard, setHoveredComplianceCard] = useState(null);

  // EXACT 8 Methodology Steps from Client Brief
  const methodologySteps = [
    {
      num: "01",
      stepIdx: 0,
      title: "Site Inspection & Assessment",
      subtitle: "Optical Riser & Hood Survey",
      desc: "Inspect the kitchen exhaust system, canopies, ducts, and fans to map out required cleaning areas.",
      icon: Search,
      badge: "PHASE 01",
      accent: "text-amber-400",
      tagClass: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    },
    {
      num: "02",
      stepIdx: 1,
      title: "Grease Thickness Measurement",
      subtitle: "Pre-Clean Ultrasonic Depth Gauge",
      desc: "Record baseline grease thickness before extraction to document pre-service conditions.",
      icon: Gauge,
      badge: "PHASE 02",
      accent: "text-sky-400",
      tagClass: "bg-sky-400/15 text-sky-300 border-sky-400/30",
    },
    {
      num: "03",
      stepIdx: 2,
      title: "Preparation & Protection",
      subtitle: "Commercial Containment Shielding",
      desc: "Protect surrounding commercial kitchen equipment, cooking appliances, and prep surfaces.",
      icon: ShieldCheck,
      badge: "PHASE 03",
      accent: "text-emerald-400",
      tagClass: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
    },
    {
      num: "04",
      stepIdx: 3,
      title: "Interior Steam Washing",
      subtitle: "160°C Thermal Vapor Degreasing",
      desc: "Use high-temperature steam washing to emulsify and break down stubborn grease deposits.",
      icon: Waves,
      badge: "PHASE 04",
      accent: "text-indigo-400",
      tagClass: "bg-indigo-400/15 text-indigo-300 border-indigo-400/30",
    },
    {
      num: "05",
      stepIdx: 4,
      title: "Canopy & Duct Component Cleaning",
      subtitle: "2,400 RPM Rotary Scrubber",
      desc: "Thorough cleaning of exhaust hood, interior ducting, filters, and accessible exhaust components.",
      icon: Sparkles,
      badge: "PHASE 05",
      accent: "text-amber-400",
      tagClass: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    },
    {
      num: "06",
      stepIdx: 5,
      title: "Final Inspection & Quality Control",
      subtitle: "360° Quality Verification",
      desc: "Rigorous post-clean visual inspection across all treated exhaust runs.",
      icon: ClipboardCheck,
      badge: "PHASE 06",
      accent: "text-teal-400",
      tagClass: "bg-teal-400/15 text-teal-300 border-teal-400/30",
    },
    {
      num: "07",
      stepIdx: 6,
      title: "Post-Cleaning Grease Measurement",
      subtitle: "Sub-20 µm Micron Readout",
      desc: "Measure grease levels again after cleaning to verify the standard of clean.",
      icon: CheckCircle2,
      badge: "PHASE 07",
      accent: "text-emerald-400",
      tagClass: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
    },
    {
      num: "08",
      stepIdx: 7,
      title: "Detailed Reporting & Documentation",
      subtitle: "Official Shift PDF & Cert Package",
      desc: "Comprehensive service reporting, verification documentation, and maintenance recommendations.",
      icon: FileCheck2,
      badge: "PHASE 08",
      accent: "text-amber-300",
      tagClass: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    },
  ];

  // 6 Compliance & WHS Modules from Brief
  const complianceModules = [
    {
      id: 0,
      title: "WHS Procedures",
      subtitle: "Workplace Health & Safety",
      desc: "Standardized workplace health, safety, and operational safety protocols executed on every shift.",
      icon: HardHat,
      code: "WHS-ACT-2020",
      status: "COMPLIANT",
      tag: "SAFETY PROTOCOL",
      accent: "amber",
    },
    {
      id: 1,
      title: "SWMS Documentation",
      subtitle: "Safe Work Method Statements",
      desc: "Site-specific Safe Work Method Statements prepared, digitally signed, and validated prior to starting work.",
      icon: FileText,
      code: "SWMS-REV-04",
      status: "SIGNED & ACTIVE",
      tag: "RISK CONTROL",
      accent: "sky",
    },
    {
      id: 2,
      title: "Risk Assessments",
      subtitle: "Pre-Work Hazard Matrix",
      desc: "Structured hazard identification, thermal vapor safety controls, electrical isolations, and containment checks.",
      icon: ShieldCheck,
      code: "HAZ-LVL-0",
      status: "MITIGATED",
      tag: "HAZARD MATRIX",
      accent: "emerald",
    },
    {
      id: 3,
      title: "Site-Specific Safety",
      subtitle: "Custom Workflow Alignment",
      desc: "Tailored safety procedures accommodating specific commercial kitchen workflows, facility egress, and chef access.",
      icon: Activity,
      code: "FACILITY-SPEC",
      status: "VERIFIED",
      tag: "SITE INTEGRATION",
      accent: "amber",
    },
    {
      id: 4,
      title: "Food-Safe Cleaning",
      subtitle: "AS 4674 Food-Grade Standards",
      desc: "Food-grade, non-hazardous cleaning agents and thermal steam rinse safe for commercial culinary prep environments.",
      icon: BadgeCheck,
      code: "NON-TOXIC-R9",
      status: "FOOD-SAFE CERT",
      tag: "HYGIENE COMPLIANT",
      accent: "emerald",
    },
    {
      id: 5,
      title: "Compliance Documentation",
      subtitle: "Insurer-Ready AS 1851 Pack",
      desc: "Service verification records, maintenance certificates, photographic archives, and insurer-ready audit documentation.",
      icon: Lock,
      code: "AS-1851-2012",
      status: "INSURER AUDITED",
      tag: "CERTIFIED RECORD",
      accent: "gold",
    },
  ];

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  // Master GSAP ScrollTrigger Sequence with matchMedia
  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 0px)", () => {
      // Scroll-linked Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 30%",
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const step = Math.min(7, Math.floor(p * 8));
            setActiveStepIndex(step);
          },
        },
      });

      // Yellow Triangle Canopy
      if (bigYellowTriangleRef.current) {
        tl.fromTo(
          bigYellowTriangleRef.current,
          {
            yPercent: 0,
            scaleY: 1,
            opacity: 0.95,
            transformOrigin: "top center",
          },
          {
            yPercent: -45,
            scaleY: 0.15,
            opacity: 0.05,
            transformOrigin: "top center",
            ease: "none",
          },
          0
        );
      }

      if (apexGlowRef.current) {
        tl.fromTo(
          apexGlowRef.current,
          {
            scale: 1.2,
            opacity: 1,
          },
          {
            scale: 0.3,
            opacity: 0.1,
            ease: "none",
          },
          0
        );
      }
    });

    return () => mm.revert();
  }, []);

  const selectedCompliance = complianceModules[hoveredComplianceCard !== null ? hoveredComplianceCard : activeComplianceCard];

  return (
    <section
      ref={sectionRef}
      id="methodology"
      onMouseMove={handleMouseMove}
      className="relative z-20 w-full py-16 sm:py-24 lg:py-36 bg-[#020610] overflow-hidden border-b border-slate-800/80 flex flex-col justify-center"
    >
      {/* ================= FULL-BLEED 3D CONDUIT & STEP STATION BACKGROUND ================= */}
      <Methodology3DFullBg
        scrollProgress={scrollProgress}
        mouse={mouse}
        activeStep={activeStepIndex}
      />

      {/* ================= FULL-WIDTH EDGE-TO-EDGE YELLOW TRIANGULAR CANOPY ================= */}
      <div className="absolute inset-x-0 top-0 w-full h-[360px] sm:h-[520px] lg:h-[750px] pointer-events-none z-0 overflow-hidden">
        <div
          ref={bigYellowTriangleRef}
          className="w-full h-full relative"
        >
          {/* Full-width SVG with crisp angled roof/chevron cutout */}
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="yellowCanopyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#EAB308" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#CA8A04" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Solid Yellow Canopy Shape with Inverted Peak Notch */}
            <path
              d="M 0 0 L 1440 0 L 1440 540 L 720 180 L 0 540 Z"
              fill="url(#yellowCanopyGrad)"
            />

            {/* Glowing Golden Vector Outline */}
            <polyline
              points="0,540 720,180 1440,540"
              fill="none"
              stroke="#FDE047"
              strokeWidth="3.5"
              strokeOpacity="0.9"
            />

            {/* Secondary Technical Dashline */}
            <polyline
              points="0,520 720,165 1440,520"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeDasharray="12 8"
              strokeOpacity="0.45"
            />
          </svg>

          {/* Glowing Apex Beacon at the Center Peak Vertex */}
          <div
            ref={apexGlowRef}
            className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
          >
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-amber-300 blur-lg animate-ping" />
            <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-white shadow-[0_0_25px_#FDE047] -mt-6 sm:-mt-7.5" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col space-y-14 sm:space-y-20 lg:space-y-28">
        
        {/* ================= 1. HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 relative">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-[10px] sm:text-[11px] font-semibold text-amber-300 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="tracking-wide uppercase">METHODOLOGY & QUALITY ASSURANCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05] font-sans">
              OUR <span className="gold-gradient-text">8-STEP METHODOLOGY</span>
            </h2>
            
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto pt-1">
              A structured process built around inspection, measurement, professional cleaning, final verification and digital reporting.
            </p>
          </div>
        </div>

        {/* ================= 2. 8-STEP METHODOLOGY GLASSMORPHIC CARDS ================= */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {methodologySteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            const isPast = activeStepIndex > idx;

            return (
              <div
                key={step.num}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => setActiveStepIndex(idx)}
                className={`group relative p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between select-none backdrop-blur-xl min-h-[210px] sm:min-h-[230px] ${
                  isActive
                    ? 'bg-gradient-to-b from-[#142642]/95 via-[#0D1C33]/95 to-[#06101E]/95 border-amber-400 shadow-2xl shadow-amber-500/25 -translate-y-1.5 ring-2 ring-amber-400/50'
                    : isPast
                    ? 'bg-[#081528]/85 border-slate-700/70 hover:border-amber-400/40 hover:-translate-y-1 shadow-lg'
                    : 'bg-[#050E1C]/80 border-slate-800/80 hover:border-slate-700 hover:-translate-y-1 shadow-md'
                }`}
              >
                {/* Active Gold Glow Background Aura */}
                {isActive && (
                  <div className="absolute -inset-1 rounded-3xl blur-xl bg-amber-500/20 pointer-events-none" />
                )}

                <div className="relative z-10 space-y-2.5 sm:space-y-3">
                  {/* Top Row: Phase Badge & Step Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-lg sm:text-xl font-mono font-black tracking-tight ${
                        isActive ? 'text-amber-300' : isPast ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div
                      className={`w-9 sm:w-10 h-9 sm:h-10 rounded-2xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-105'
                          : isPast
                          ? 'bg-slate-800/90 text-amber-300 border border-amber-400/30'
                          : 'bg-slate-900/90 text-slate-400 border border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5">
                    <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider ${step.accent}`}>
                      {step.subtitle}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white tracking-tight uppercase leading-snug group-hover:text-amber-300 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Step Status Tag */}
                <div className="relative z-10 pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                  <span className={`px-2 py-0.5 rounded-full border ${step.tagClass} font-bold uppercase tracking-wider`}>
                    {step.badge}
                  </span>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      isActive
                        ? 'text-amber-400 font-bold'
                        : isPast
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {isActive ? '● ACTIVE' : isPast ? '✓ DONE' : '○ PENDING'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 3. DEDICATED 3D COMPLIANCE & WHS EXPERIENCE ================= */}
        <div className="pt-12 sm:pt-16 border-t border-slate-800/80 space-y-10 sm:space-y-12 relative">
          
          {/* Section Heading & Subtitle */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 text-[10px] sm:text-[11px] font-semibold text-emerald-300 shadow-lg">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="tracking-wide uppercase">SAFETY STANDARDS & COMPLIANCE ASSURANCE</span>
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
              COMPLIANCE & <span className="gold-gradient-text">WHS PROTOCOLS</span>
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Standardized safety management, structured hazard controls, food-safe operational practices, and complete insurer-ready audit documentation.
            </p>
          </div>

          {/* Interactive 3D Holographic Safety Shield + Dual 3-Card Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Mobile-First 3D Shield (Shows first on mobile < 1024px) */}
            <div className="block lg:hidden w-full order-1">
              <div className="w-full relative rounded-3xl bg-gradient-to-b from-[#081526]/60 via-[#040B14]/80 to-[#02060C]/90 border border-slate-800/80 p-2 overflow-hidden shadow-2xl backdrop-blur-2xl">
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                      SAFETY MATRIX ACTIVE
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-400">
                    {selectedCompliance.code}
                  </span>
                </div>

                <Compliance3DShield
                  activeCard={activeComplianceCard}
                  hoveredCard={hoveredComplianceCard}
                  mouse={mouse}
                />

                <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 rounded-2xl bg-[#071324]/90 border border-amber-400/40 backdrop-blur-md text-center space-y-0.5 shadow-lg">
                  <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" /> {selectedCompliance.tag}
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-tight">
                    {selectedCompliance.subtitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column: 3 Compliance Cards (01, 02, 03) */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4 order-2 lg:order-1">
              {complianceModules.slice(0, 3).map((item) => {
                const ItemIcon = item.icon;
                const isSelected = (hoveredComplianceCard !== null ? hoveredComplianceCard : activeComplianceCard) === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredComplianceCard(item.id)}
                    onMouseLeave={() => setHoveredComplianceCard(null)}
                    onClick={() => setActiveComplianceCard(item.id)}
                    className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-xl ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#10243E] to-[#0A1728] border-amber-400 shadow-xl shadow-amber-500/15 translate-x-1 ring-1 ring-amber-400/40'
                        : 'bg-[#060F1D]/85 border-slate-800/90 hover:border-slate-700 hover:bg-[#081528]/90'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-3.5">
                      <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-105'
                          : 'bg-slate-900/90 text-amber-400 border border-slate-800 group-hover:border-amber-400/40'
                      }`}>
                        <ItemIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors truncate">
                            {item.title}
                          </h4>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-300 font-bold tracking-wider">
                            {item.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> {item.status}
                      </span>
                      <span className="text-slate-400 group-hover:text-amber-400 transition-colors">
                        {isSelected ? '● ACTIVE' : 'TAP TO VIEW →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Column: Central 3D Interactive WebGL Safety Hologram (Desktop) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center relative order-2">
              <div className="w-full relative rounded-3xl bg-gradient-to-b from-[#081526]/60 via-[#040B14]/80 to-[#02060C]/90 border border-slate-800/80 p-2 overflow-hidden shadow-2xl backdrop-blur-2xl">
                
                {/* Top Telemetry Header */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                      SAFETY MATRIX ACTIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    {selectedCompliance.code}
                  </span>
                </div>

                {/* 3D Three.js Hologram */}
                <Compliance3DShield
                  activeCard={activeComplianceCard}
                  hoveredCard={hoveredComplianceCard}
                  mouse={mouse}
                />

                {/* Bottom Active Module Details Readout */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-2xl bg-[#071324]/90 border border-amber-400/40 backdrop-blur-md text-center space-y-1 shadow-lg">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> {selectedCompliance.tag}
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-tight">
                    {selectedCompliance.subtitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Compliance Cards (04, 05, 06) */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4 order-3">
              {complianceModules.slice(3, 6).map((item) => {
                const ItemIcon = item.icon;
                const isSelected = (hoveredComplianceCard !== null ? hoveredComplianceCard : activeComplianceCard) === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredComplianceCard(item.id)}
                    onMouseLeave={() => setHoveredComplianceCard(null)}
                    onClick={() => setActiveComplianceCard(item.id)}
                    className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between backdrop-blur-xl ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#10243E] to-[#0A1728] border-amber-400 shadow-xl shadow-amber-500/15 ring-1 ring-amber-400/40'
                        : 'bg-[#060F1D]/85 border-slate-800/90 hover:border-slate-700 hover:bg-[#081528]/90'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-3.5">
                      <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-105'
                          : 'bg-slate-900/90 text-amber-400 border border-slate-800 group-hover:border-amber-400/40'
                      }`}>
                        <ItemIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors truncate">
                            {item.title}
                          </h4>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-slate-300 font-bold tracking-wider">
                            {item.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> {item.status}
                      </span>
                      <span className="text-slate-400 group-hover:text-amber-400 transition-colors">
                        {isSelected ? '● ACTIVE' : 'TAP TO VIEW →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Live Safety Assurance Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 sm:pt-4">
            {[
              { label: "INSURER AUDITED", val: "100% ACCEPTED", desc: "Underwriter criteria", icon: FileBadge },
              { label: "AUSTRALIAN STANDARD", val: "AS 1851-2012", desc: "Routine maintenance", icon: ShieldCheck },
              { label: "CHEMICAL HAZARD", val: "ZERO RESIDUE", desc: "Food-grade non-toxic", icon: BadgeCheck },
              { label: "SAFETY COVERAGE", val: "SIGNED SWMS", desc: "Executed every shift", icon: HardHat },
            ].map((metric, idx) => {
              const MetricIcon = metric.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#081424]/80 to-[#040A12]/80 border border-slate-800/80 hover:border-amber-400/30 transition-all flex flex-col justify-between space-y-1.5 sm:space-y-2 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase">
                      {metric.label}
                    </span>
                    <MetricIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-black text-white font-mono tracking-tight text-amber-300">
                      {metric.val}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 font-normal truncate">
                      {metric.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= 4. ACTION CTA ================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
          <Button to="/contact" variant="gold" size="md" icon={ArrowRight} className="shadow-lg shadow-amber-500/20 text-xs py-3 px-7 font-bold min-h-[44px] justify-center">
            SCHEDULE A STEP 1 ASSESSMENT
          </Button>
          <Button to="/services" variant="navy" size="md" icon={ChevronRight} className="text-xs py-3 px-7 font-semibold min-h-[44px] justify-center">
            EXPLORE SERVICE PACKAGES
          </Button>
        </div>

      </div>
    </section>
  );
}

export default MethodologySection;
