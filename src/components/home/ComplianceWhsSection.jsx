import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { brandConfig } from '../../data/brandConfig';
import {
  ShieldCheck,
  FileSpreadsheet,
  HardHat,
  HeartHandshake,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

/**
 * 6. Compliance & WHS Trust Section
 * Details Work Health & Safety, food-safe chemistry, and compliance governance.
 */
export function ComplianceWhsSection() {
  const compliancePillars = [
    {
      icon: Flame,
      title: "AS 1851 Maintenance Standards",
      desc: "Routine inspection and thorough removal of grease accumulations in exhaust systems to mitigate catastrophic commercial kitchen fire hazards."
    },
    {
      icon: HardHat,
      title: "Task-Specific SWMS & Risk Assessments",
      desc: "Safe Work Method Statements created for every site including confined space entry, working at heights (rooftop fans), and chemical handling."
    },
    {
      icon: FileSpreadsheet,
      title: "Active SDS Chemical Register",
      desc: "Safety Data Sheets digitally accessible for all food-grade degreasers, sanitizing agents, and non-corrosive stainless steel restoration solutions."
    },
    {
      icon: ShieldCheck,
      title: "Comprehensive Commercial Insurance",
      desc: "Fully insured commercial operations with public liability and workers compensation coverage tailored for high-risk hospitality and facility sites."
    }
  ];

  return (
    <Section
      id="compliance-whs"
      badge="Safety & Governance"
      title="Uncompromising Compliance & Workplace Health and Safety"
      subtitle="Safeguarding your staff, property assets, and brand reputation through rigorous safety governance and food-safe chemical protocols."
      padding="lg"
      className="bg-[#050D1A] border-b border-slate-800/80"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {compliancePillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{pillar.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold border-t border-slate-800/80 pt-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Standard Protocol</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compliance Documentation Box with Editable Placeholders */}
      <div className="glass-panel p-8 rounded-2xl border border-amber-400/20 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Contractor Governance Pack
            </span>
            <h4 className="text-lg font-bold text-white">
              Need Verification Before Issuing Site Induction?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              We provide facility managers and franchise owners with complete contractor onboarding packs including SWMS, SDS certificates, and insurance currency.
            </p>
          </div>

          <Button to="/contact" variant="gold" icon={ArrowRight} className="shrink-0">
            Request WHS Pack
          </Button>
        </div>
      </div>
    </Section>
  );
}
