import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { brandConfig } from '../data/brandConfig';
import { Shield, Target, Users, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us"
        description={`Learn about ${brandConfig.companyName}, our standard of excellence in commercial cleaning, and our commitment to operational integrity.`}
      />
      <Section
        badge="About Grade X"
        title="Setting the Commercial Benchmark"
        subtitle="Dedicated to delivering reliable, verified facility cleaning and maintenance across corporate and industrial sectors."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Target className="w-5 h-5 text-amber-400" /> Our Mission
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To provide facility managers and business operators with transparent, high-standard commercial cleaning supported by verified digital reporting and uncompromising compliance.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-amber-400" /> Operational Integrity
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every site managed by Grade X operates under structured quality checklists, trained personnel, and strict Work Health and Safety (WHS) governance.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button to="/contact" variant="gold">
            Contact Our Team
          </Button>
        </div>
      </Section>
    </>
  );
}
