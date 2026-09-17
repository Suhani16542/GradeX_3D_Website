import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { FinalCtaGlobe3D } from '../three/FinalCtaGlobe3D';
import { brandConfig } from '../../data/brandConfig';
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, Calendar, Sparkles, ChevronRight } from 'lucide-react';

/**
 * Final CTA Section
 * Headline: "READY FOR A CLEANER, COMPLIANT KITCHEN?"
 * Integrates 3D Grade X Gold Energy Core Backdrop
 */
export function FinalCtaSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-[#0A192F] via-[#0E2442] to-[#050D1A] overflow-hidden border-t border-amber-500/20">
      {/* 3D Ambient Core & Gold Rings */}
      <FinalCtaGlobe3D />

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Top Location / Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-8 shadow-xl">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>WESTERN AUSTRALIA • PRECISION KITCHEN HYGIENE & ROBOTICS</span>
        </div>

        {/* Big Bold Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6 drop-shadow-2xl uppercase">
          READY FOR A <span className="gold-gradient-text">CLEANER, COMPLIANT</span> KITCHEN?
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Book an obligation-free commercial site appraisal or request a rapid, itemized quotation for your venue anywhere in the Perth metropolitan area.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Button to="/contact" variant="gold" size="lg" icon={ArrowRight} className="shadow-2xl shadow-amber-500/30">
            REQUEST A QUOTE
          </Button>
          <Button to="/contact" variant="navy" size="lg" icon={Calendar}>
            CONTACT US
          </Button>
        </div>

        {/* Direct Contact Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-10 border-t border-slate-700/60 text-xs">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-1.5 shadow-lg">
            <Phone className="w-5 h-5 text-amber-400 mb-0.5" />
            <span className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">Direct Phone</span>
            <a href={brandConfig.contact.phoneHref} className="text-white font-bold hover:text-amber-300 transition text-sm">
              {brandConfig.contact.phone}
            </a>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-1.5 shadow-lg">
            <Mail className="w-5 h-5 text-amber-400 mb-0.5" />
            <span className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">Direct Email</span>
            <a href={brandConfig.contact.emailHref} className="text-white font-bold hover:text-amber-300 transition text-sm">
              {brandConfig.contact.email}
            </a>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-1.5 shadow-lg">
            <MapPin className="w-5 h-5 text-amber-400 mb-0.5" />
            <span className="text-slate-400 text-[11px] font-mono uppercase tracking-wider">Operations Base</span>
            <span className="text-white font-semibold text-sm">{brandConfig.contact.address.suburb}, {brandConfig.contact.address.state}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalCtaSection;
