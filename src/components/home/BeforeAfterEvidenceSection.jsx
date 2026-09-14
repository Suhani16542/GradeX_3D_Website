import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { 
  Sliders, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  ZoomIn,
  FileCheck
} from 'lucide-react';

/**
 * Section 5: Before and After Cleaning Evidence
 * Interactive split comparison & inspection audits demonstrating real results.
 */
export function BeforeAfterEvidenceSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      title: "Commercial Canopy Exhaust Riser (Perth CBD)",
      system: "Vertical Riser Shaft (18m length)",
      industry: "Hospitality & Multi-Outlet Restaurant",
      beforeCondition: "Severe 3.8mm carbonized grease build-up; high ignition flashover hazard.",
      afterCondition: "Restored to bare Grade 304 stainless steel (<20 microns residual film).",
      complianceStatus: "AS 1851 Pass — Certificate Issued",
      reduction: "98.5%",
      fuelLoadBefore: "High (Non-Compliant)",
      fuelLoadAfter: "Negligible (Certified Safe)"
    },
    {
      title: "Deep Fryer & Wok Canopy Extraction Duct",
      system: "Horizontal Extraction Plenum & Fan Housing",
      industry: "Asian Commercial Kitchen & Wok Station",
      beforeCondition: "Heavy polymerized oils & sticky grease accumulation restricting airflow.",
      afterCondition: "Full rotary mechanical degrease with 100% perimeter bare-metal finish.",
      complianceStatus: "AS 1851 Pass — Certificate Issued",
      reduction: "99.1%",
      fuelLoadBefore: "Critical (Fire Hazard)",
      fuelLoadAfter: "Compliant & Clean"
    },
    {
      title: "Institutional Dining Hall Exhaust Run",
      system: "High-Volume Multi-Fan Kitchen System",
      industry: "Hospital & Aged Care Facility",
      beforeCondition: "Uncleaned interior ducts for 14+ months due to confined space entry hazards.",
      afterCondition: "100% robotic extraction without requiring hazardous human confined entry.",
      complianceStatus: "AS 1851 & WHS Certified",
      reduction: "99.4%",
      fuelLoadBefore: "Uninspected / High Risk",
      fuelLoadAfter: "100% Verified Safe"
    }
  ];

  const current = cases[activeCase];

  return (
    <Section
      id="cleaning-evidence"
      badge="Verified Results"
      title="Before & After Robotic Cleaning Evidence"
      subtitle="See the undeniable difference our robotic agitation technology makes inside commercial kitchen exhaust ducts."
      padding="lg"
      className="bg-[#050D1A] border-b border-slate-800/80 text-white"
    >
      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center">
        {cases.map((c, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCase(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              activeCase === idx
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-400/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Before/After Visual Simulation Slider */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl select-none group">
            {/* "AFTER" Stainless Steel Clean Layer (Background) */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 flex flex-col justify-between p-6">
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)]" />
              <div className="relative z-10 flex justify-end">
                <span className="bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AFTER: BARE METAL RESTORED
                </span>
              </div>
              <div className="relative z-10 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 max-w-xs text-xs text-white">
                <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> AS 1851 Certified Clean
                </p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Polymerized grease stripped down to bare stainless steel. Residual film &lt; 20μm.
                </p>
              </div>
            </div>

            {/* "BEFORE" Dirty Grease Layer (Clipped by slider position) */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-amber-950 via-stone-900 to-yellow-950 flex flex-col justify-between p-6 border-r-2 border-amber-400"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#291505_2px,transparent_2px)] [background-size:12px_12px] opacity-80" />
              <div className="relative z-10 flex justify-start">
                <span className="bg-rose-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  BEFORE: HIGH FIRE HAZARD
                </span>
              </div>
              <div className="relative z-10 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-rose-900/60 max-w-xs text-xs text-white">
                <p className="font-bold text-rose-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Severe Grease Accumulation
                </p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Combustible fuel load exceeding safe operational thresholds under AS 1851.
                </p>
              </div>
            </div>

            {/* Interactive Drag Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shadow-xl border-2 border-slate-950">
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Invisible Range Input for Full Cross-Device Interaction */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Before and after comparison slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2.5 px-1">
            <span>&larr; Drag slider left to reveal AFTER clean</span>
            <span>Drag slider right to reveal BEFORE state &rarr;</span>
          </div>
        </div>

        {/* Right: Technical Audit Metrics for Selected Case */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-700/80 space-y-5">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20 inline-block mb-2">
                {current.industry}
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">
                {current.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                System: <span className="text-slate-300 font-medium">{current.system}</span>
              </p>
            </div>

            {/* Quantitative Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">GREASE REDUCTION</span>
                <span className="text-2xl font-black text-amber-400">{current.reduction}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Calculated by Mass</span>
              </div>
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block font-mono">AS 1851 AUDIT</span>
                <span className="text-sm font-bold text-emerald-400 block mt-1">100% COMPLIANT</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Certificate Issued</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                <div>
                  <strong className="text-slate-200">Before: </strong>
                  <span className="text-slate-300">{current.beforeCondition}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <div>
                  <strong className="text-slate-200">After: </strong>
                  <span className="text-slate-300">{current.afterCondition}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Full Digital Evidence Supplied</span>
              </div>
              <Button to="/contact" variant="gold" size="sm" icon={ArrowRight}>
                Book Inspection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default BeforeAfterEvidenceSection;
