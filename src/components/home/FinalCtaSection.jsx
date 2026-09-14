import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { brandConfig } from '../../data/brandConfig';
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, Calendar, Sparkles } from 'lucide-react';

/**
 * 10. Final Quote & Action CTA Section
 * Headline: "Ready for a Cleaner, Safer, More Compliant Kitchen?"
 */
export function FinalCtaSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-[#0A192F] via-[#0E2442] to-[#050D1A] overflow-hidden border-t border-amber-500/20">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Western Australia Commercial Kitchen Cleaning & Robotic Exhaust Solutions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Ready for a <span className="gold-gradient-text">Cleaner, Safer, More Compliant</span> Kitchen?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Book an obligation-free commercial site assessment or request a fast quotation for your venue anywhere in the Perth metropolitan area.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button to="/contact" variant="gold" size="lg" icon={ArrowRight}>
            Request a Quote
          </Button>
          <Button to="/contact" variant="navy" size="lg" icon={Calendar}>
            Book a Site Assessment
          </Button>
        </div>

        {/* Direct Contact Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-700/60 text-xs">
          <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-1.5">
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-[11px]">Direct Phone</span>
            <a href={brandConfig.contact.phoneHref} className="text-white font-bold hover:text-amber-300 transition">
              {brandConfig.contact.phone}
            </a>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-1.5">
            <Mail className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-[11px]">Direct Email</span>
            <a href={brandConfig.contact.emailHref} className="text-white font-bold hover:text-amber-300 transition">
              {brandConfig.contact.email}
            </a>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-[11px]">Operations Base</span>
            <span className="text-white font-semibold">{brandConfig.contact.address.suburb}, {brandConfig.contact.address.state}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
