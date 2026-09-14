import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Building2, ArrowRight } from 'lucide-react';

export function CaseStudiesPage() {
  return (
    <>
      <PageMeta
        title="Case Studies & Project Overviews"
        description="Explore commercial facility management scopes and operational delivery overviews."
      />
      <Section
        badge="Proven Outcomes"
        title="Commercial Project Profiles"
        subtitle="Operational overviews demonstrating our structured approach across commercial, industrial, and clinical sites."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Multi-Story Corporate Office Facility
            </div>
            <h3 className="text-xl font-bold text-white">Corporate Headquarters Daily Maintenance Scope</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Implementation of scheduled evening maintenance, day-porter services, high-touch sanitization, and digital shift reporting for a multi-level commercial office building.
            </p>
            <div className="pt-2">
              <span className="text-xs text-slate-400">Sector: Corporate & Commercial Real Estate</span>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Industrial Logistics & Warehouse Center
            </div>
            <h3 className="text-xl font-bold text-white">Logistics Hub Floor Scrubbing & High-Bay Maintenance</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Execution of heavy-duty industrial floor degreasing, high-reach dust extraction, and compliance-tracked sanitization across 24/7 active loading bays.
            </p>
            <div className="pt-2">
              <span className="text-xs text-slate-400">Sector: Logistics & Supply Chain</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button to="/contact" variant="gold">
            Discuss Your Facility Scope
          </Button>
        </div>
      </Section>
    </>
  );
}
