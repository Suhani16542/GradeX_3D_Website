import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Cpu, CheckSquare, Camera, Clock, ShieldCheck } from 'lucide-react';

export function TechnologyPage() {
  return (
    <>
      <PageMeta
        title="Technology & Innovation"
        description="Discover the technology stack and digital tracking systems powering Grade X Commercial Solutions."
      />
      <Section
        badge="Quality Assurance Tech"
        title="Technology-Driven Facility Oversight"
        subtitle="Transforming traditional cleaning management through verified digital systems, real-time logging, and accountability."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-xl border border-slate-800">
            <Clock className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Real-Time Attendance & GPS</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated check-in protocols ensuring assigned cleaning staff are on-site according to agreed contractual schedules.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-slate-800">
            <Camera className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Photographic Verification</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Timestamped photographic capture of key operational zones providing verifiable evidence of completion.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-slate-800">
            <CheckSquare className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Digital Quality Auditing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standardized digital inspection checklists conducted by operations supervisors with instant client reporting.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button to="/digital-evidence-reporting" variant="gold">
            Learn About Digital Evidence Reporting
          </Button>
        </div>
      </Section>
    </>
  );
}
