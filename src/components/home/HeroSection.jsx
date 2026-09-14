import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { FullBleedHeroScene } from '../three/FullBleedHeroScene';
import { brandConfig } from '../../data/brandConfig';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2, ChevronRight, MapPin, Sparkles, Phone } from 'lucide-react';

/**
 * 1. Premium Hero Section (Container Layout with Compact Left Section)
 * Left Section: Compact high-impact copy (col-span-4 / col-span-5)
 * Right Section: Dominant 3D Cybernetic Robotic Exhaust Cleaning Scene (col-span-8 / col-span-7)
 */
export function HeroSection() {
  const scrollToTechnology = () => {
    const el = document.getElementById('robotic-technology');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full pt-8 pb-14 lg:pt-12 lg:pb-18 overflow-hidden bg-gradient-to-b from-[#050D1A] via-[#0A192F] to-[#050D1A] border-b border-slate-800/80">
      {/* Background Lighting & Depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[300px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        {/* Main 2-Column Grid: Compact Left Column & Dominant Right 3D Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (Compact col-span-4 / col-span-5) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E2442] border border-amber-400/30 text-[11px] font-semibold text-amber-300 shadow-md">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Western Australia • Commercial Cleaning Specialists</span>
            </div>

            {/* Main Headline (Compact & Bold) */}
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Precision. <span className="gold-gradient-text">Technology.</span> Compliance.
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
              Advanced commercial cleaning and robotic kitchen exhaust solutions for safer, cleaner and compliant workplaces.
            </p>

            {/* Compact Key Capability Badges */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#0A192F]/80 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Canopy Degreasing</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#0A192F]/80 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>2200 RPM Scrubber</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#0A192F]/80 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>AS 1851 Fire Safety</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#0A192F]/80 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>24/7 WA Response</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button to="/contact" size="md" variant="gold" icon={ArrowRight}>
                Get a Quote
              </Button>
              <Button
                onClick={scrollToTechnology}
                size="md"
                variant="navy"
                icon={ChevronRight}
              >
                Explore Technology
              </Button>
            </div>

            {/* Direct Contact Line */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
              <span>Balga WA 6061</span>
              <a href={brandConfig.contact.phoneHref} className="text-amber-400 hover:underline font-semibold flex items-center gap-1">
                <Phone className="w-3 h-3" /> {brandConfig.contact.phone}
              </a>
            </div>
          </div>

          {/* Right Column: Dominant 3D Animation Box (col-span-7) */}
          <div className="lg:col-span-7 w-full">
            <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] rounded-2xl glass-panel overflow-hidden border border-amber-400/30 shadow-2xl bg-[#050D1A]">
              <FullBleedHeroScene />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 px-2 font-mono">
              <span className="flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3 h-3" /> Cybernetic Robotic Kitchen Exhaust Scrubber (2200 RPM)
              </span>
              <span>Live Automatic 3D Simulation</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
