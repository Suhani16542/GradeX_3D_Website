import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { brandConfig } from '../../data/brandConfig';
import { ShieldCheck, Target, Award, CheckCircle, ArrowRight, Building, UtensilsCrossed } from 'lucide-react';

/**
 * 2. Company Introduction Section
 * Introduces Grade X Commercial Solutions Pty Ltd as a Western Australia commercial cleaning company.
 */
export function CompanyIntroSection() {
  const targetClients = [
    {
      title: "QSR Franchises & Fast Casual",
      desc: "High-volume fryers, grills, and continuous canopy extraction requiring rapid overnight turnaround."
    },
    {
      title: "Multi-Site Restaurant Groups",
      desc: "Standardized hygiene auditing, scheduled deep degreasing, and multi-location compliance visibility."
    },
    {
      title: "Hotels, Clubs & Taverns",
      desc: "Large-scale commercial banqueting kitchens, vertical duct risers, and rooftop extraction fan systems."
    },
    {
      title: "Facility & Property Managers",
      desc: "Audit-ready safety documentation, fire risk reduction under AS 1851, and verified contractor governance."
    },
    {
      title: "Shopping Centre Asset Managers",
      desc: "Shared commercial kitchen duct risers, food court canopy systems, and out-of-hours coordination."
    }
  ];

  return (
    <Section
      id="about-intro"
      badge="Western Australia Commercial Specialists"
      title="Engineering Higher Standards in Commercial Kitchen Hygiene"
      subtitle="Grade X Commercial Solutions Pty Ltd is a Western Australia commercial cleaning company dedicated to specialized kitchen hygiene, grease extraction fire safety, and advanced robotic duct cleaning technology."
      padding="lg"
      className="bg-[#050D1A] border-b border-slate-800/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        {/* Left Focus Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-5">
            <h3 className="text-xl font-bold text-white leading-snug">
              Why Commercial Kitchen Hygiene Demands a <span className="text-amber-400">Technology-Led Approach</span>
            </h3>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Traditional commercial cleaning methods frequently leave inaccessible horizontal and vertical ductwork untouched, creating hidden combustible grease fuel loads that jeopardize property safety and insurance compliance.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Headquartered in Balga, Western Australia, Grade X bridges this critical gap by combining trained commercial hygiene technicians with remote crawler robotic technology and structured digital shift reporting.
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>AS 1851 Standard Alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span>Zero Compromise WHS Governance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Client Sectors List */}
        <div className="lg:col-span-6 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-4">
            Specialized Servicing Across Western Australia:
          </h4>

          {targetClients.map((client, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0A192F]/60 hover:bg-[#0E2442] border border-slate-800 hover:border-amber-400/30 transition duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-0.5">{client.title}</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">{client.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button to="/about" variant="secondary" icon={ArrowRight}>
          Learn More About Our Company
        </Button>
        <Button to="/contact" variant="gold">
          Request a Site Consultation
        </Button>
      </div>
    </Section>
  );
}
