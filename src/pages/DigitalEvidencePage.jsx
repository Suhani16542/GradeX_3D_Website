import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { FileCheck, Shield, Award, BarChart3, Database } from 'lucide-react';

export function DigitalEvidencePage() {
  return (
    <>
      <PageMeta
        title="Digital Evidence & Reporting"
        description="Transparent digital reporting, verifiable before-and-after audit trails, and automated compliance reports."
      />
      <Section
        badge="Accountability Platform"
        title="Digital Evidence & Reporting"
        subtitle="Uncompromising transparency. Proof of work delivered directly to facility managers with every scheduled shift."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-400" /> Shift Verification Reports
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every completed commercial service generates a structured shift report detailing completed tasks, supervisor sign-offs, and any maintenance flags identified during the service.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" /> Audit Trail & Compliance Archive
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              All records, checklists, and chemical usage logs are securely archived, providing an immutable audit trail for external compliance or internal governance reviews.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button to="/contact" variant="gold">
            Request a System Demo & Quote
          </Button>
        </div>
      </Section>
    </>
  );
}
