import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { HeroExhaustScene } from '../three/HeroExhaustScene';
import { brandConfig } from '../../data/brandConfig';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2, ChevronRight, Flame, MapPin, Sparkles } from 'lucide-react';

/**
 * 1. Premium Hero Section
 * Main Headline: Precision. Technology. Compliance.
 * Supporting Text: Advanced commercial cleaning and robotic kitchen exhaust solutions for safer, cleaner and compliant workplaces.
 * Action Buttons: Get a Quote | Explore Our Technology
 */
export function HeroSection() {
  const scrollToTechnology = () => {
    const el = document.getElementById('robotic-technology');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full pt-10 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#050D1A] via-[#0A192F] to-[#050D1A] border-b border-slate-800/80">
      {/* Background Lighting & Depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-[420px] h-[300px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Message & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Western Australia Regional Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2442] border border-amber-400/30 text-xs font-semibold text-amber-300 shadow-lg shadow-black/40">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Western Australia • Commercial Kitchen Hygiene & Robotic Exhaust Specialists</span>
            </div>

            {/* Exact Required Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Precision. <span className="gold-gradient-text">Technology.</span> Compliance.
            </h1>

            {/* Exact Required Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Advanced commercial cleaning and robotic kitchen exhaust solutions for safer, cleaner and compliant workplaces.
            </p>

            {/* Core Commercial Service Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>AS 1851 Fire Safety Alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Robotic Duct Scrubber & Camera</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified Digital Photo Evidence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>24/7 Operations & Emergency Support</span>
              </div>
            </div>

            {/* Required CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button to="/contact" size="lg" variant="gold" icon={ArrowRight}>
                Get a Quote
              </Button>
              <Button
                onClick={scrollToTechnology}
                size="lg"
                variant="navy"
                icon={ChevronRight}
              >
                Explore Our Technology
              </Button>
            </div>

            {/* Direct Contact Reassurance */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
              <span>Head Office: <strong className="text-white">5 Elward Way, Balga WA 6061</strong></span>
              <span className="text-slate-600">•</span>
              <a href={brandConfig.contact.phoneHref} className="text-amber-400 hover:underline font-semibold">
                Direct: {brandConfig.contact.phone}
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Kitchen Canopy & Exhaust Duct Simulation */}
          <div className="lg:col-span-6 w-full">
            <HeroExhaustScene />
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-2 font-mono">
              <span className="flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" /> Robotic Internal Kitchen Exhaust Cleaning
              </span>
              <span>Continuous 3D Simulation</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
