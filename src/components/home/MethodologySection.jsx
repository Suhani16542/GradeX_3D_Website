import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { MethodologyTunnel3D } from '../three/MethodologyTunnel3D';
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
  ChevronRight
} from 'lucide-react';

/**
 * Section 5: Methodology / How We Work
 * 8-Step Sequential Process Timeline with 3D Flow Conduit Background
 */
export function MethodologySection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Inspection",
      badge: "Optical Survey",
      desc: "Comprehensive HD camera survey of hoods, horizontal ducts, vertical risers, and fan housings to map grease distribution."
    },
    {
      num: "02",
      icon: Gauge,
      title: "Grease Measurement",
      badge: "Pre-Clean Audit",
      desc: "Calibrated ultrasonic depth gauge sampling to record baseline grease thickness (µm) and fire hazard classification."
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Preparation & Protection",
      badge: "Kitchen Shielding",
      desc: "Complete heavy-duty plastic containment shrouding of cooktops, fryers, electrical outlets, and prep surfaces."
    },
    {
      num: "04",
      icon: Waves,
      title: "Steam Wash",
      badge: "Thermal Degrease",
      desc: "High-temperature 160°C dry steam application to soften polymerized carbon and emulsify stubborn baked grease."
    },
    {
      num: "05",
      icon: Sparkles,
      title: "Exhaust Cleaning",
      badge: "Robotic Extraction",
      desc: "Deployment of our 2,400 RPM robotic rotary scrubber with food-safe chemical misting to scour ductwork down to bare metal."
    },
    {
      num: "06",
      icon: ClipboardCheck,
      title: "Final Inspection",
      badge: "Quality Audit",
      desc: "Supervisor optical inspection across 100% of the duct run to verify complete elimination of combustible fuel loads."
    },
    {
      num: "07",
      icon: CheckCircle2,
      title: "Post-Clean Measurement",
      badge: "Micron Verification",
      desc: "Post-service ultrasonic readings confirming grease thickness has been reduced to under 20 µm (AS 1851 Pass)."
    },
    {
      num: "08",
      icon: FileCheck2,
      title: "Digital Reporting",
      badge: "Compliance Sign-Off",
      desc: "Immediate delivery of the official AS 1851 Certificate of Service, before/after photo logs, and insurance sign-off package."
    }
  ];

  return (
    <Section
      id="methodology"
      badge="Engineering Methodology"
      title="The Grade X 8-Step Kitchen Hygiene Process"
      subtitle="A structured, repeatable quality assurance framework ensuring total fire safety compliance and audit-ready proof on every shift."
      padding="lg"
      className="bg-[#0A192F]/60 border-b border-slate-800/80 relative overflow-hidden"
    >
      {/* 3D Flow Conduit Particle Background */}
      <MethodologyTunnel3D />

      {/* 8-Step Interactive Timeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <div
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden backdrop-blur-sm ${
                isActive
                  ? 'bg-gradient-to-b from-[#0E2442] to-[#0A192F] border-amber-400/60 shadow-xl shadow-amber-500/15 -translate-y-1.5'
                  : 'bg-[#050D1A]/80 hover:bg-[#0E2442]/60 border-slate-800 hover:border-amber-400/30'
              }`}
            >
              {/* Step Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono gold-gradient-text">
                    {step.num}
                  </span>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-105'
                        : 'bg-amber-400/10 text-amber-400 border border-amber-400/20 group-hover:scale-105'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-300 mb-1">
                  {step.badge}
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Progress Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Phase {idx + 1} of 8</span>
                <span className={isActive ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                  {isActive ? '● ACTIVE' : '○'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action CTA */}
      <div className="text-center relative z-10">
        <Button to="/contact" variant="gold" size="lg" icon={ArrowRight}>
          Schedule a Step 1 Site Assessment
        </Button>
      </div>
    </Section>
  );
}

export default MethodologySection;
