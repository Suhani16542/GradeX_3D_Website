import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { DigitalReportScene } from '../three/DigitalReportScene';
import { brandConfig } from '../../data/brandConfig';
import {
  FileCheck2,
  Camera,
  Video,
  Gauge,
  CheckCircle,
  FileSpreadsheet,
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

/**
 * 5. Digital Evidence & Reporting Section
 * Theme: "Cleaning You Can See. Compliance You Can Prove."
 * Features 3D Digital Evidence Tablet & Optical Inspection Viewer.
 */
export function DigitalEvidenceSection() {
  const [activeTab, setActiveTab] = useState('photo'); // 'photo' | 'grease' | 'report'

  return (
    <Section
      id="digital-evidence"
      badge="Verification & Transparency"
      title="Cleaning You Can See. Compliance You Can Prove."
      subtitle="Eliminate uncertainty with complete digital audit trails. Every service is backed by photographic evidence, camera inspection logs, and structured compliance reports."
      padding="lg"
      className="bg-[#0A192F]/50 border-b border-slate-800/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
        {/* Left: Narrative & Key Evidence Modules */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white leading-tight">
              Audit-Ready Documentation with <span className="text-amber-400">Every Single Shift</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When food safety auditors, council environmental health officers, or insurance underwriters request proof of maintenance, Grade X delivers comprehensive digital evidence directly to your inbox.
            </p>
          </div>

          {/* Feature Pillars */}
          <div className="space-y-3 pt-2">
            <div
              onClick={() => setActiveTab('photo')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'photo'
                  ? 'bg-[#0E2442] border-amber-400/40 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Timestamped Photo Records</h4>
                  <p className="text-xs text-slate-400">Clear before and after capture of hoods, filters, ductwork, and fans.</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('grease')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'grease'
                  ? 'bg-[#0E2442] border-amber-400/40 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Grease Thickness Measurement</h4>
                  <p className="text-xs text-slate-400">Tracking grease accumulation levels to prevent hazardous combustible fuel loads.</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('report')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-[#0E2442] border-amber-400/40 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Digital Compliance Certificate</h4>
                  <p className="text-xs text-slate-400">Formal shift completion summary detailing technician sign-off and findings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3D Digital Evidence Device & Inspection Screen */}
        <div className="lg:col-span-7">
          <DigitalReportScene />
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" /> 3D Digital Evidence & Inspection Viewer
            </span>
            <span>AS 1851 Shift Sign-Off Protocol</span>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-400/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Instant Digital Shift Delivery</h4>
          <p className="text-xs text-slate-300">All records securely archived and emailed immediately upon shift completion.</p>
        </div>
        <Button to="/digital-evidence-reporting" variant="gold" size="sm" icon={ArrowRight} className="shrink-0">
          Learn More About Digital Evidence
        </Button>
      </div>
    </Section>
  );
}

export default DigitalEvidenceSection;
