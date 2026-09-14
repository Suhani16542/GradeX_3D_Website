import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ShieldCheck, FileSpreadsheet, HardHat, Award, HeartPulse } from 'lucide-react';

export function ComplianceWhsPage() {
  return (
    <>
      <PageMeta
        title="Compliance & WHS"
        description="Comprehensive Work Health and Safety (WHS) compliance, Safe Work Method Statements (SWMS), and risk mitigation."
      />
      <Section
        badge="Safety & Governance"
        title="Work Health, Safety & Compliance Governance"
        subtitle="Uncompromising safety protocols safeguarding our team, your staff, and your facility premises."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-xl border border-slate-800">
            <HardHat className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Safe Work Method Statements (SWMS)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Task-specific SWMS documentation prepared for all high-risk and specialized commercial cleaning activities.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-slate-800">
            <FileSpreadsheet className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Safety Data Sheets (SDS)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete SDS register maintained on-site and digitally accessible for every chemical and sanitizing agent used.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-slate-800">
            <ShieldCheck className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Public Liability & Insurance</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fully insured operations including comprehensive public liability, workers compensation, and professional indemnity coverage.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button to="/contact" variant="gold">
            Request WHS Documentation Pack
          </Button>
        </div>
      </Section>
    </>
  );
}
