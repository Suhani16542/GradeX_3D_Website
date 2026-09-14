import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { TechInternalDuctScene } from '../three/TechInternalDuctScene';
import {
  Cpu,
  Video,
  Sparkles,
  ShieldCheck,
  Flame,
  CheckCircle,
  ArrowRight,
  Maximize2,
  Layers,
  Search
} from 'lucide-react';

/**
 * 4. Robotic Technology Section
 * Explains Robotic Kitchen Exhaust Cleaning with Close-Up 3D Internal Duct Cleaning Scene.
 */
export function RoboticTechnologySection() {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const techPillars = [
    {
      icon: Video,
      title: "Remote Optical Crawling & HD Inspection",
      subtitle: "Navigating unreachable horizontal and vertical duct risers",
      description: "Our compact tracked crawler enters commercial kitchen exhaust ducts through standard access panels, utilizing 360-degree pan-tilt HD cameras and high-lumen LED illumination to record internal conditions before, during, and after cleaning.",
      specs: [
        "Full optical recording of internal duct condition",
        "Access to duct lengths exceeding 20+ meters from a single access point",
        "Real-time operator video feed monitoring",
        "Accurate identification of grease accumulation depth"
      ]
    },
    {
      icon: Sparkles,
      title: "Rotary Mechanical Agitation & Chemical Injection",
      subtitle: "Breaking down hard polymerized grease down to bare metal",
      description: "Equipped with bi-directional high-torque rotary brush heads and direct food-safe degreasing chemical misting jets, the crawler mechanically agitates and dissolves stubborn carbonized grease layers that cannot be reached manually.",
      specs: [
        "Dual counter-rotating scrubbing heads (1,500 RPM)",
        "Direct chemical delivery to duct sidewalls, ceiling, and base",
        "Uniform 360-degree cylindrical or rectangular duct coverage",
        "Safe operation inside stainless steel and galvanized ductwork"
      ]
    },
    {
      icon: ShieldCheck,
      title: "AS 1851 Fire Safety & Insurance Compliance",
      subtitle: "Eliminating combustible fuel loads in high-risk exhaust systems",
      description: "Commercial kitchen exhaust fires spread rapidly through uncleaned duct risers. Robotic extraction ensures the full duct run is cleared of combustible grease, protecting commercial kitchens against insurance invalidation and fire authority penalties.",
      specs: [
        "Targeted compliance with Australian Standard AS 1851 (Section 13)",
        "Dramatically reduced fire flashover risk in exhaust plenums",
        "Protection for landlords, building owners, and operating tenants",
        "Documented proof for insurers, certifiers, and local health officers"
      ]
    }
  ];

  const active = techPillars[selectedPillar];
  const ActiveIcon = active.icon;

  return (
    <Section
      id="robotic-technology"
      badge="Advanced Innovation"
      title="Next-Generation Robotic Exhaust Cleaning Technology"
      subtitle="Eliminating human limitations in confined space cleaning. Our specialized crawler robot delivers deep internal duct degreasing, continuous optical inspection, and indisputable compliance."
      padding="lg"
      className="bg-[#050D1A] border-b border-slate-800/80"
    >
      {/* Top 3D Close-Up Simulation */}
      <div className="mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
              Internal Duct Cleaning Process
            </span>
            <h3 className="text-2xl font-bold text-white leading-tight">
              Direct Mechanical Agitation Inside <span className="text-amber-400">Hard-To-Reach Risers</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Watch our robotic scrubber dissolve and extract thick polymerized grease deposits inside commercial kitchen extraction ductwork. Quad-directional rotary bristles contact every interior face.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300 font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">SCRUBBING POWER</span>
                <span className="text-amber-300 font-bold">1,500 RPM Dual Drive</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">ACCESS REACH</span>
                <span className="text-sky-300 font-bold">20+ Meters per Access</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 w-full">
            <TechInternalDuctScene />
          </div>
        </div>
      </div>

      {/* Engineering Pillars Interactive Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 px-1">
            Engineering Pillars:
          </p>

          {techPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPillar(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-start gap-3.5 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E2442] border-amber-400/50 shadow-lg shadow-amber-500/10'
                    : 'bg-[#0A192F]/50 hover:bg-[#0A192F] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{pillar.subtitle}</p>
                </div>
              </button>
            );
          })}

          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 space-y-1">
            <span className="font-bold block text-amber-300">Western Australia Deployment</span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Available for scheduled after-hours and emergency deployments across the Perth metropolitan area.
            </p>
          </div>
        </div>

        {/* Right Active Pillar Deep Dive */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-8 rounded-2xl border border-slate-700/80 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Pillar {selectedPillar + 1} of 3
                </span>
                <h3 className="text-2xl font-bold text-white">{active.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {active.description}
            </p>

            {/* Technical Specifications */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200">
                Operational Highlights & Capabilities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Want to see our robotic crawler in action at your venue?
              </span>
              <Button to="/contact" variant="gold" size="sm" icon={ArrowRight}>
                Book a Demonstration & Appraisal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default RoboticTechnologySection;
