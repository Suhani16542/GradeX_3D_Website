import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * Concise Company Introduction Section
 * Clean 2-column split layout with minimal text and strong typography
 */
export function CompanyIntroSection() {
  const highlights = [
    {
      title: "Commercial Kitchen Specialists",
      desc: "Dedicated to exhaust canopy degreasing, fire risk reduction, and commercial hygiene across Western Australia."
    },
    {
      title: "Robotic Precision Access",
      desc: "Deploying high-torque crawler technology to clean horizontal and vertical duct risers beyond manual human reach."
    },
    {
      title: "AS 1851 Compliance & Auditing",
      desc: "Structured before-and-after photographic evidence with verified technician shift sign-offs for insurers."
    }
  ];

  return (
    <Section
      id="about-intro"
      badge="About Grade X Commercial"
      title="Setting Higher Benchmarks in Commercial Kitchen Hygiene"
      subtitle="Grade X Commercial Solutions Pty Ltd combines specialized commercial kitchen hygiene technicians with remote crawler robotic technology for safer, cleaner, and fully compliant workplaces."
      padding="lg"
      className="bg-[#050D1A] border-b border-slate-800/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
        {/* Left Focus Block */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white leading-snug">
              Why Commercial Exhausts Demand a <span className="text-amber-400">Technology-Led Approach</span>
            </h3>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Traditional manual cleaning cannot safely reach long horizontal ducts and multi-story vertical risers, leaving combustible grease fuel loads that jeopardize property safety and insurance coverage.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Headquartered in Balga, WA, Grade X bridges this gap through robotic mechanical scrubbing, food-safe chemistry, and structured digital shift reporting.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-amber-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Zero Compromise WHS
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                AS 1851 Section 13
              </span>
            </div>
          </div>
        </div>

        {/* Right Highlights Column */}
        <div className="lg:col-span-6 space-y-3">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0A192F]/60 border border-slate-800/90 hover:border-amber-400/30 transition duration-300"
            >
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button to="/about" variant="secondary" icon={ArrowRight}>
          Learn More About Our Company
        </Button>
        <Button to="/contact" variant="gold">
          Request a Consultation
        </Button>
      </div>
    </Section>
  );
}

export default CompanyIntroSection;
