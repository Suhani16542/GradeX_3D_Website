import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { 
  Compass, 
  Droplet, 
  RotateCw, 
  Camera, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Activity, 
  Flame, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

/**
 * Section 4: How The Robot Works
 * Step-by-step technological breakdown of robotic duct cleaning.
 */
export function HowRobotWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "step-1",
      number: "01",
      title: "Panel Entry & Autonomous Ingress",
      badge: "Stage 1: Deployment",
      icon: Compass,
      headline: "Non-Destructive Access via Standard 450x450mm Panels",
      description: "Our compact magnetic crawler chassis is deployed directly into horizontal or vertical exhaust ducting through existing cleanout ports, avoiding destructive cutting or roof disassemblies.",
      details: [
        "Low-profile 180mm clearance fits tight horizontal & vertical riser shafts",
        "High-torque continuous rubber tracks navigate internal grease dams and slope angles",
        "Tethered fiber-optic power & telemetry umbilicus supporting up to 30m reach",
        "Zero structural building alteration required"
      ],
      telemetry: {
        pressure: "1.2 bar track grip",
        reach: "30m continuous tether",
        clearance: "180mm minimum duct height",
        status: "Ingress Ready"
      }
    },
    {
      id: "step-2",
      number: "02",
      title: "Biodegradable Chemical Misting",
      badge: "Stage 2: Pre-Treatment",
      icon: Droplet,
      headline: "Targeted Dissolution of Heavy Carbonized Grease",
      description: "High-pressure micro-nozzles spray an engineered eco-friendly, food-grade degreasing emulsion directly onto all 4 interior duct walls, softening baked-on grease down to the molecular level.",
      details: [
        "High-temperature spray mist penetrates oxidized grease encrustations",
        "Food-safe, non-corrosive formulation safe on Grade 304/316 stainless steel",
        "360-degree perimeter atomization ensures 100% ceiling & wall coverage",
        "Reduces friction and prepares surface for instant mechanical removal"
      ],
      telemetry: {
        pressure: "45 PSI chemical mist",
        temp: "60°C injection",
        coverage: "360° perimeter",
        status: "Misting Active"
      }
    },
    {
      id: "step-3",
      number: "03",
      title: "1,800 RPM Bi-Directional Scrubbing",
      badge: "Stage 3: Mechanical Extraction",
      icon: RotateCw,
      headline: "Counter-Rotating Nylon & Brass Bristle Agitation",
      description: "Dual planetary rotary scrubbers spin at up to 1,800 RPM, stripping softened grease deposits directly down to bare stainless steel without scratching or compromising duct seams.",
      details: [
        "Bi-directional rotary scrubbing head dynamically matches duct profile",
        "Non-sparking nylon and soft brass bristle blends for maximum safety",
        "Simultaneous vacuum capture channels dislodged grease into sealed containment",
        "Eliminates 99%+ of combustible fuel load adhering to duct walls"
      ],
      telemetry: {
        speed: "1,800 RPM planetary",
        torque: "14.5 Nm direct drive",
        extraction: "99.4% fuel load removal",
        status: "Scrubbing Core"
      }
    },
    {
      id: "step-4",
      number: "04",
      title: "4K Optical LiDAR Verification",
      badge: "Stage 4: Quality & Compliance",
      icon: Camera,
      headline: "Indisputable Timestamped HD Video & Micron Depth Audit",
      description: "A 360-degree 4K pan-tilt camera with integrated laser distance sensors scans the entire duct run, measuring grease thickness to certify complete compliance with Australian Standard AS 1851.",
      details: [
        "Ultra-bright 2,000-lumen LED matrix lights up pitch-black duct runs",
        "Laser micron sensor measures grease depth (< 50 microns post-clean)",
        "Time-stamped GPS and metadata recorded directly into client compliance portal",
        "Instant generation of Certificate of Compliance for insurance underwriters"
      ],
      telemetry: {
        resolution: "4K 60FPS pan-tilt",
        lighting: "2,000 lm LED array",
        compliance: "AS 1851 Sec 13 certified",
        status: "Audit Verified"
      }
    }
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  return (
    <Section
      id="how-robot-works"
      badge="Engineering Workflow"
      title="How Our Robotic Cleaning System Operates"
      subtitle="A 4-stage systematic cleaning and digital verification process that cleans deep ductwork unreachable by manual operators."
      padding="lg"
      className="bg-[#0A192F] border-b border-slate-800/80 text-white relative overflow-hidden"
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      {/* 4 Step Progress Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              type="button"
              className={`text-left p-4 rounded-xl border transition-all duration-300 relative cursor-pointer ${
                isActive
                  ? 'bg-[#0E2442] border-amber-400 shadow-lg shadow-amber-400/10'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                  STEP {step.number}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {step.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                {step.badge}
              </p>
              {isActive && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Dynamic Stage Deep Dive Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left: Detailed Workflow Explanation */}
        <div className="lg:col-span-7 bg-[#050D1A]/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                {current.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">Step {activeStep + 1} of 4</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              {current.headline}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Key Mechanical & Operational Advantages:
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {current.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 text-xs text-slate-200 bg-slate-900/90 p-3 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action / Step Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeStep === i ? 'bg-amber-400 w-6' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              icon={ArrowRight}
            >
              {activeStep === steps.length - 1 ? 'Back to Step 1' : 'Next Stage'}
            </Button>
          </div>
        </div>

        {/* Right: Technical Telemetry & Diagnostic Visual Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#0E2442] to-[#050D1A] border border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">
                    TELEMETRY HUB
                  </span>
                  <span className="text-xs font-bold text-white">Live Rig Parameters</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            {/* Visual Step Illustration Card */}
            <div className="my-6 p-5 rounded-xl bg-slate-950/80 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <StepIcon className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase">{current.title}</span>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {current.telemetry.status}
                </span>
              </div>

              {/* Progress Gauges */}
              <div className="space-y-3 font-mono text-xs">
                {Object.entries(current.telemetry).map(([key, val], tIdx) => {
                  if (key === 'status') return null;
                  return (
                    <div key={tIdx} className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/60">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400 uppercase">{key}</span>
                        <span className="text-amber-300 font-bold">{val}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                          style={{ width: `${60 + (tIdx * 15)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                Engineered for strict conformity with Australian Standards (AS 1851:2012 & AS/NZS 3666).
              </span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Need a site inspection?</span>
            <Button to="/quote" variant="gold" size="sm">
              Request Fast Quote
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default HowRobotWorksSection;
