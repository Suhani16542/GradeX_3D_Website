import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  TrendingDown,
  ChevronRight
} from 'lucide-react';

/**
 * Section 6: Case Studies
 * Visual Project Cards with Verified Results & Before/After Metrics:
 * - Industry & Location
 * - Verified Result Metrics
 * - Before / After indicator
 * - Hover zoom & elevation
 */
export function CaseStudiesSection() {
  const caseStudies = [
    {
      id: "hospitality-hub",
      sector: "Commercial Hospitality & Dining",
      title: "18-Meter Vertical Exhaust Riser Robotic Restoration",
      location: "Perth CBD Hospitality Precinct, WA",
      metrics: [
        { label: "Grease Reduction", val: "190 µm → 12 µm" },
        { label: "Compliance Pass", val: "100% AS 1851" },
        { label: "Downtime Impact", val: "Zero Kitchen Interruption" }
      ],
      scope: "Full canopy degreasing, robotic multi-axis scrubbing through inaccessible vertical duct shafts, and rooftop fan impeller balancing.",
      result: "Fire hazard eliminated; insurance certification issued within 2 hours of shift completion."
    },
    {
      id: "qsr-franchise",
      sector: "Quick Service Restaurant Franchise",
      title: "Multi-Store Fryer Line & Extraction Canopy Audit",
      location: "Western Australia Regional & Metro Network",
      metrics: [
        { label: "Sites Serviced", val: "14 Locations" },
        { label: "Audit Result", val: "Council EHO Grade A" },
        { label: "Evidence Logs", val: "100% Timestamped" }
      ],
      scope: "Overnight thermal boil-out of 6 commercial fryers, heavy flat-top carbon extraction, honeycomb filter exchange, and digital photo audit delivery.",
      result: "Standardized food safety audit compliance across all operating franchise stores."
    },
    {
      id: "corporate-facility",
      sector: "Corporate Headquarters & Catering",
      title: "Commercial Cafeteria Hood & Fresh Air Supply Wash",
      location: "West Perth Corporate Office Complex, WA",
      metrics: [
        { label: "Airflow Restored", val: "+28% Flow Rate" },
        { label: "Thermal Steam", val: "160°C Sanitization" },
        { label: "Certification", val: "Annual AS 1851 Sign-Off" }
      ],
      scope: "High-temperature dry steam sanitization of cool rooms, prep areas, kitchen canopies, and supply air diffusers.",
      result: "Significantly enhanced indoor air quality and reduced building extraction energy loads."
    }
  ];

  return (
    <Section
      id="case-studies"
      badge="Demonstrated Results"
      title="Verified Operational Delivery Across WA"
      subtitle="Real commercial results backed by objective digital data, certified AS 1851 reports, and supervisor quality sign-offs."
      padding="lg"
      className="bg-[#050D1A] border-b border-slate-800/80 relative overflow-hidden"
    >
      {/* 3 Large Visual Case Study Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
        {caseStudies.map((study) => (
          <div
            key={study.id}
            className="glass-panel p-7 rounded-3xl border border-slate-800 hover:border-amber-400/50 shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-amber-500/10"
          >
            <div className="space-y-4">
              {/* Header Badge & Location */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider font-mono">
                  {study.sector}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{study.location}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                {study.title}
              </h3>

              {/* Scope */}
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {study.scope}
              </p>

              {/* Metrics Box */}
              <div className="p-4 rounded-2xl bg-[#0A192F]/90 border border-slate-800 space-y-2 pt-3">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Verified Shift Outcomes:
                </div>
                {study.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">{m.label}:</span>
                    <span className="text-emerald-400 font-bold">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Result Summary */}
              <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{study.result}</span>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-5 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">100% Digital Shift Log</span>
              <Button to="/contact" variant="ghost" size="sm" icon={ArrowRight} className="p-0 text-amber-400 hover:text-amber-300 font-semibold">
                Inquire on Scope
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center relative z-10">
        <Button to="/case-studies" variant="navy" size="lg" icon={ChevronRight}>
          Explore All Commercial Case Studies
        </Button>
      </div>
    </Section>
  );
}

export default CaseStudiesSection;
