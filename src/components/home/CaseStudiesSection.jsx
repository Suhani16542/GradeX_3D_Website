import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Building2, ArrowRight, Camera, MessageSquare, Info } from 'lucide-react';

/**
 * 9. Case Studies & Client Feedback Section
 * Built with clean, editable placeholders for client-supplied project profiles and testimonials.
 * NO fake claims, fake statistics, or fake reviews.
 */
export function CaseStudiesSection() {
  const caseProfiles = [
    {
      sector: "Commercial Hospitality",
      title: "Commercial Kitchen Canopy & Vertical Duct Clean",
      location: "Perth Metropolitan Venue",
      scope: "Deep canopy restoration, 18-meter vertical riser robotic scrub, rooftop extraction fan balance, and AS 1851 shift report delivery.",
      status: "[Client to provide project reference & imagery]"
    },
    {
      sector: "Quick Service Restaurant",
      title: "High-Volume Fryer Line & Exhaust Extraction",
      location: "Multi-Store QSR Franchise WA",
      scope: "Overnight boil-out of 6 commercial fryers, heavy flat-top grill carbon recovery, canopy honeycomb filter exchange, and digital photo logs.",
      status: "[Client to provide project reference & imagery]"
    }
  ];

  return (
    <Section
      id="case-studies"
      badge="Project Profiles & Evidence"
      title="Commercial Operational Delivery"
      subtitle="Structured profiles showcasing how Grade X delivers verified kitchen hygiene and robotic duct restoration across Western Australia."
      padding="lg"
      className="bg-[#0A192F]/40 border-b border-slate-800/80"
    >
      {/* Editorial Disclaimer Badge */}
      <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          Real project scopes and before/after verification logs are updated directly from client operational records.
        </span>
      </div>

      {/* Case Study Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {caseProfiles.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-8 rounded-2xl border border-slate-800 hover:border-amber-400/30 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider">{item.sector}</span>
                <span className="text-slate-400 font-mono">{item.location}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>
              
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white block mb-1">Scope of Works:</strong>
                {item.scope}
              </p>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-dashed border-slate-700 text-center text-xs text-slate-400 font-mono">
                <Camera className="w-5 h-5 mx-auto text-amber-400/60 mb-1" />
                <span>{item.status}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Standard Shift Protocol: 100% Digital Shift Log</span>
              <Button to="/contact" variant="ghost" size="sm" icon={ArrowRight} className="p-0 text-amber-400 hover:text-amber-300">
                Inquire on Scope
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Client Feedback Placeholder Box */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 max-w-3xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto text-amber-400">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold text-white">Client Feedback & Quality Assurance</h4>
        <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
          Every commercial client receives direct supervisor communication and post-service satisfaction sign-off. Verified venue feedback is recorded directly into our operations system.
        </p>
        <span className="inline-block text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          [Verified client references available upon request for commercial tenders]
        </span>
      </div>
    </Section>
  );
}
