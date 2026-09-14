import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import {
  ClipboardCheck,
  ShieldAlert,
  Search,
  FileText,
  Sparkles,
  CheckSquare,
  Camera,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

/**
 * 8. Cleaning Methodology Section
 * Shows the 8-step systematic commercial cleaning and robotic inspection process.
 */
export function MethodologySection() {
  const steps = [
    {
      num: "01",
      icon: ClipboardCheck,
      title: "Site Assessment",
      desc: "Initial walkthrough to measure duct linear meters, canopy dimensions, equipment condition, and access openings."
    },
    {
      num: "02",
      icon: ShieldAlert,
      title: "Risk & Access Review",
      desc: "Reviewing electrical isolation points, rooftop access safety, confined spaces, and task-specific SWMS preparation."
    },
    {
      num: "03",
      icon: Search,
      title: "Pre-Clean Inspection",
      desc: "Robotic optical crawler deployment to capture initial video logs and document grease accumulation depth."
    },
    {
      num: "04",
      icon: FileText,
      title: "Cleaning Plan",
      desc: "Selecting targeted food-safe degreasers, mechanical rotary brush attachments, and scheduling staff shift timing."
    },
    {
      num: "05",
      icon: Sparkles,
      title: "Cleaning Execution",
      desc: "Deep scraping, robotic scrubbing, chemical washdown, high-temperature steam cleaning, and stainless polishing."
    },
    {
      num: "06",
      icon: CheckSquare,
      title: "Post-Clean Inspection",
      desc: "Supervisor quality audit examining all interior duct surfaces, fan impellers, and canopy filters down to bare metal."
    },
    {
      num: "07",
      icon: Camera,
      title: "Digital Evidence",
      desc: "Capturing timestamped post-clean photos and crawler camera recordings for complete transparency."
    },
    {
      num: "08",
      icon: FileCheck2,
      title: "Reporting & Recommendations",
      desc: "Issuing the formal Certificate of Service, shift report, and preventative maintenance recommendations."
    }
  ];

  return (
    <Section
      id="methodology"
      badge="Quality Assurance Framework"
      title="The Grade X 8-Step Cleaning Methodology"
      subtitle="A structured, repeatable engineering process that guarantees measurable cleanliness and compliance on every single shift."
      padding="lg"
      className="bg-[#050D1A] border-b border-slate-800/80"
    >
      {/* Connected 8-Step Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-400/40 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Step Number Top Pill */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black font-mono gold-gradient-text">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] uppercase font-mono tracking-widest text-slate-500">
                Step {step.num} of 08
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Button to="/contact" variant="gold" size="lg" icon={ArrowRight}>
          Book a Step 1 Site Assessment
        </Button>
      </div>
    </Section>
  );
}
