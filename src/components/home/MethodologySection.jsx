import React, { useRef, useState, useEffect } from 'react';
import { MethodologyProcessBg } from '../three/MethodologyProcessBg';
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
  ArrowDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 5: Grade X 8-Step Kitchen Hygiene Methodology & Compliance WHS
 * Clean Unobstructed Process Layout:
 * Row 1: [01 CARD] ─── [02 CARD] ─── [03 CARD] ─── [04 CARD]
 *                                                       │
 *                                                       ▼
 * Row 2: [08 CARD] ◄── [07 CARD] ◄── [06 CARD] ◄── [05 CARD]
 * 
 * The gold process line exists ONLY in the empty gaps between cards.
 * ZERO line pixels pass behind or through any card!
 */
export function MethodologySection() {
  const sectionRef = useRef(null);
  const activeTriangleRef = useRef(null);
  const trailRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // EXACT 8 Methodology Steps from Client Brief
  const row1Steps = [
    {
      num: "01",
      stepIdx: 0,
      title: "Site Inspection & Assessment",
      desc: "Inspect the kitchen exhaust system, canopies, ducts, and fans to map out required cleaning areas.",
      icon: Search,
      badge: "INITIAL AUDIT",
      microType: "inspection",
    },
    {
      num: "02",
      stepIdx: 1,
      title: "Grease Thickness Measurement & Documentation",
      desc: "Record baseline grease thickness before extraction to document pre-service conditions.",
      icon: Gauge,
      badge: "PRE-CLEAN µm",
      microType: "probe_pre",
    },
    {
      num: "03",
      stepIdx: 2,
      title: "Preparation & Protection of the Work Area",
      desc: "Protect surrounding commercial kitchen equipment, cooking appliances, and surfaces.",
      icon: ShieldCheck,
      badge: "CONTAINMENT",
      microType: "protection",
    },
    {
      num: "04",
      stepIdx: 3,
      title: "Interior Steam Washing & Deep Cleaning",
      desc: "Use high-temperature steam washing to emulsify and break down stubborn grease deposits.",
      icon: Waves,
      badge: "STEAM WASH",
      microType: "steam",
    },
  ];

  const row2Steps = [
    {
      num: "08",
      stepIdx: 7,
      title: "Detailed Reporting & Client Documentation",
      desc: "Comprehensive service reporting, verification documentation, and maintenance recommendations.",
      icon: FileCheck2,
      badge: "REPORT READY",
      microType: "report",
    },
    {
      num: "07",
      stepIdx: 6,
      title: "Post-Cleaning Grease Measurement",
      desc: "Measure grease levels again after cleaning to verify the standard of clean.",
      icon: CheckCircle2,
      badge: "POST-CLEAN µm",
      microType: "probe_post",
    },
    {
      num: "06",
      stepIdx: 5,
      title: "Final Inspection & Quality Control",
      desc: "Rigorous post-clean visual inspection across all treated exhaust runs.",
      icon: ClipboardCheck,
      badge: "QUALITY AUDIT",
      microType: "inspection_final",
    },
    {
      num: "05",
      stepIdx: 4,
      title: "Canopy, Ductwork & Accessible Exhaust Component Cleaning",
      desc: "Thorough cleaning of exhaust hood, interior ducting, filters, and accessible exhaust components.",
      icon: Sparkles,
      badge: "EXTRACTION",
      microType: "scrub",
    },
  ];

  // All 8 steps sequentially for mobile vertical flow
  const allStepsSequential = [
    row1Steps[0], // 01
    row1Steps[1], // 02
    row1Steps[2], // 03
    row1Steps[3], // 04
    row2Steps[3], // 05
    row2Steps[2], // 06
    row2Steps[1], // 07
    row2Steps[0], // 08
  ];

  // Compliance & WHS Modules
  const complianceModules = [
    {
      title: "WHS Procedures",
      desc: "Standardized workplace health, safety, and operational safety protocols.",
      icon: HardHat,
    },
    {
      title: "SWMS Documentation",
      desc: "Site-specific Safe Work Method Statements prepared and signed prior to work.",
      icon: FileText,
    },
    {
      title: "Risk Assessments",
      desc: "Structured hazard identification, thermal safety controls, and containment checks.",
      icon: ShieldCheck,
    },
    {
      title: "Site-Specific Safety",
      desc: "Tailored safety procedures accommodating specific kitchen workflows and facility access.",
      icon: Activity,
    },
    {
      title: "Food-Safe Cleaning",
      desc: "Food-grade, non-hazardous cleaning agents safe for commercial culinary prep environments.",
      icon: BadgeCheck,
    },
    {
      title: "Compliance Documentation",
      desc: "Service verification records, maintenance certificates, and insurer-ready documentation.",
      icon: Lock,
    },
  ];

  // Master GSAP ScrollTrigger Sequence
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: 1.6,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const step = Math.min(7, Math.floor(p * 8));
            setActiveStepIndex(step);
          },
        },
      });

      // Gold Triangle Indicator movement within the header indicator zone
      if (activeTriangleRef.current) {
        tl.to(
          activeTriangleRef.current,
          {
            y: 35,
            ease: "none",
          },
          0
        );
      }

      // Fading Trail Triangles
      trailRef.current.forEach((trailEl, idx) => {
        if (trailEl) {
          tl.to(
            trailEl,
            {
              y: 35 - (idx + 1) * 8,
              opacity: 0.6 - idx * 0.18,
              ease: "none",
            },
            (idx + 1) * 0.04
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Step-Specific Micro Visual Render Helper
  const renderStepMicroVisual = (microType, isActive) => {
    switch (microType) {
      case 'probe_pre':
        return (
          <div className="mt-2.5 py-1.5 px-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Pre-Clean Probe
            </span>
            <span className="text-rose-300 font-bold">Baseline Set</span>
          </div>
        );
      case 'steam':
        return (
          <div className="mt-2.5 py-1.5 px-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              Thermal Vapor
            </span>
            <span className="text-sky-300 font-bold">Steam Active</span>
          </div>
        );
      case 'probe_post':
        return (
          <div className="mt-2.5 py-1.5 px-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Post-Clean Probe
            </span>
            <span className="text-emerald-400 font-bold">Verified Pass</span>
          </div>
        );
      case 'report':
        return (
          <div className="mt-2.5 py-1.5 px-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Digital PDF Log
            </span>
            <span className="text-amber-300 font-bold">Report Ready</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Render Card Component
  const renderCard = (step) => {
    const Icon = step.icon;
    const isActive = activeStepIndex === step.stepIdx;
    const isPast = activeStepIndex > step.stepIdx;

    return (
      <div
        key={step.num}
        onClick={() => setActiveStepIndex(step.stepIdx)}
        className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between select-none backdrop-blur-md min-h-[225px] w-full ${
          isActive
            ? 'bg-gradient-to-b from-[#142338]/95 via-[#0D1929]/95 to-[#060E1A]/95 border-amber-400 shadow-xl shadow-amber-500/20 -translate-y-1 ring-1 ring-amber-400/50'
            : isPast
            ? 'bg-[#081324]/90 border-slate-700/80 hover:border-amber-400/40'
            : 'bg-[#050C17]/85 border-slate-800/80 hover:border-slate-700'
        }`}
      >
        {/* Subtle Glow on Active */}
        {isActive && (
          <div className="absolute -inset-1 rounded-2xl blur-lg bg-amber-500/15 pointer-events-none" />
        )}

        <div className="relative z-10 space-y-2">
          {/* Top Row: Number & Icon */}
          <div className="flex items-center justify-between">
            <span
              className={`text-lg font-black font-mono tracking-tight transition-colors ${
                isActive ? 'text-amber-300' : isPast ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              {step.num}
            </span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/30 scale-105'
                  : isPast
                  ? 'bg-slate-800 text-amber-300 border border-amber-400/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
          </div>

          {/* Title */}
          <h3
            className={`text-xs sm:text-sm font-black tracking-tight uppercase leading-snug transition-colors ${
              isActive ? 'text-white' : 'text-slate-200'
            }`}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
            {step.desc}
          </p>

          {/* Step-specific Micro Visual */}
          {renderStepMicroVisual(step.microType, isActive)}
        </div>

        {/* Bottom Status */}
        <div className="relative z-10 pt-2.5 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono">
          <span className="text-slate-400 font-bold">
            {step.badge}
          </span>
          <span
            className={`font-semibold flex items-center gap-1 ${
              isActive
                ? 'text-amber-400 font-bold'
                : isPast
                ? 'text-emerald-400'
                : 'text-slate-600'
            }`}
          >
            {isActive ? '● IN PROGRESS' : isPast ? '✓ COMPLETE' : '○ PENDING'}
          </span>
        </div>
      </div>
    );
  };

  // Inter-card Process Connector in Empty Gap
  const renderHorizontalConnector = (fromIdx, toIdx, direction = 'right') => {
    const isLit = activeStepIndex >= toIdx;
    return (
      <div className="hidden lg:flex items-center justify-center w-8 shrink-0 relative px-1">
        {/* Connector Line */}
        <div className="w-full h-0.5 relative bg-slate-800">
          <div
            className={`absolute inset-0 transition-all duration-500 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] ${
              isLit ? 'opacity-100' : 'opacity-20'
            }`}
          />
        </div>
        {/* Small Arrow indicator */}
        <div
          className={`absolute text-[10px] font-mono leading-none transition-colors ${
            isLit ? 'text-amber-400 font-bold drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]' : 'text-slate-600'
          }`}
        >
          {direction === 'right' ? '▶' : '◀'}
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="methodology"
      className="relative z-20 w-full py-20 lg:py-28 bg-[#030812] overflow-hidden border-b border-slate-800/80 flex flex-col justify-center"
    >
      {/* 3D Ambient Particle Background (Pure ambient only, NO lines behind cards!) */}
      <MethodologyProcessBg />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col space-y-16">
        
        {/* ================= 1. HEADING & GOLD TRIANGLE SCROLL INDICATOR ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 relative">
          
          {/* Signature Gold/Yellow Triangle & Multi-Tier Fading Trail in Header Zone */}
          <div className="flex justify-center items-center relative h-10 mb-2 pointer-events-none">
            {/* Leading Active Triangle */}
            <div
              ref={activeTriangleRef}
              className="absolute z-20 flex flex-col items-center drop-shadow-[0_0_10px_rgba(245,158,11,0.9)]"
            >
              <span className="text-amber-400 text-lg leading-none select-none font-bold">
                ▲
              </span>
            </div>

            {/* Fading Trail Triangles (3 subtle positions) */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                ref={(el) => (trailRef.current[i] = el)}
                style={{ opacity: 0.5 - i * 0.15 }}
                className="absolute z-10 flex flex-col items-center"
              >
                <span className="text-amber-300 text-sm leading-none select-none">
                  ▲
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] font-sans">
              OUR <span className="gold-gradient-text">8-STEP METHODOLOGY</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              A structured process built around inspection, measurement, professional cleaning, final verification and digital reporting.
            </p>
          </div>
        </div>

        {/* ================= 2. DESKTOP U-SHAPED METHODOLOGY FLOW (CLEAN EMPTY-GAP CONNECTORS) ================= */}
        <div className="hidden lg:flex flex-col space-y-6">
          
          {/* ROW 1: Steps 01 -> 02 -> 03 -> 04 */}
          <div className="flex items-center justify-between w-full">
            <div className="flex-1">{renderCard(row1Steps[0])}</div>
            {renderHorizontalConnector(0, 1, 'right')}
            <div className="flex-1">{renderCard(row1Steps[1])}</div>
            {renderHorizontalConnector(1, 2, 'right')}
            <div className="flex-1">{renderCard(row1Steps[2])}</div>
            {renderHorizontalConnector(2, 3, 'right')}
            <div className="flex-1">{renderCard(row1Steps[3])}</div>
          </div>

          {/* VERTICAL RIGHT-MARGIN CONNECTOR (Between 04 and 05 in the empty gap) */}
          <div className="flex justify-end pr-14 py-1">
            <div className="flex flex-col items-center justify-center h-10 relative">
              <div className="w-0.5 h-full bg-slate-800 relative">
                <div
                  className={`absolute inset-0 transition-all duration-500 bg-gradient-to-b from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] ${
                    activeStepIndex >= 4 ? 'opacity-100' : 'opacity-20'
                  }`}
                />
              </div>
              <div
                className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-mono transition-colors ${
                  activeStepIndex >= 4 ? 'text-amber-400 font-bold drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]' : 'text-slate-600'
                }`}
              >
                ▼
              </div>
            </div>
          </div>

          {/* ROW 2: Steps 08 <- 07 <- 06 <- 05 (Rendered on screen from left to right: 08, 07, 06, 05) */}
          <div className="flex items-center justify-between w-full">
            <div className="flex-1">{renderCard(row2Steps[0])}</div>
            {renderHorizontalConnector(7, 6, 'left')}
            <div className="flex-1">{renderCard(row2Steps[1])}</div>
            {renderHorizontalConnector(6, 5, 'left')}
            <div className="flex-1">{renderCard(row2Steps[2])}</div>
            {renderHorizontalConnector(5, 4, 'left')}
            <div className="flex-1">{renderCard(row2Steps[3])}</div>
          </div>

        </div>

        {/* ================= MOBILE / TABLET VERTICAL TIMELINE FLOW ================= */}
        <div className="flex lg:hidden flex-col space-y-4">
          {allStepsSequential.map((step, idx) => (
            <React.Fragment key={step.num}>
              {renderCard(step)}
              {idx < 7 && (
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center justify-center h-6 relative">
                    <div className="w-0.5 h-full bg-slate-800 relative">
                      <div
                        className={`absolute inset-0 transition-all duration-500 bg-amber-400 ${
                          activeStepIndex > idx ? 'opacity-100' : 'opacity-20'
                        }`}
                      />
                    </div>
                    <div
                      className={`text-[8px] font-mono ${
                        activeStepIndex > idx ? 'text-amber-400 font-bold' : 'text-slate-600'
                      }`}
                    >
                      ▼
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ================= 3. COMPLIANCE & WHS AREA ================= */}
        <div className="pt-8 border-t border-slate-800/80 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
              COMPLIANCE & <span className="gold-gradient-text">WHS</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Standardized safety management, structured hazard controls, and complete operational documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {complianceModules.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-b from-[#091526]/80 to-[#050C17]/80 border border-slate-800 hover:border-amber-400/40 transition-all duration-300 flex items-start gap-4 backdrop-blur-sm group hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 4. ACTION CTA ================= */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button to="/contact" variant="gold" size="md" icon={ArrowRight} className="shadow-lg shadow-amber-500/20 text-xs py-2.5 px-6 font-bold">
            SCHEDULE A STEP 1 ASSESSMENT
          </Button>
          <Button to="/services" variant="navy" size="md" icon={ChevronRight} className="text-xs py-2.5 px-6 font-semibold">
            EXPLORE SERVICE PACKAGES
          </Button>
        </div>

      </div>
    </section>
  );
}

export default MethodologySection;
