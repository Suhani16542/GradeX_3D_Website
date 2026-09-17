import React, { useState, useRef, useEffect } from 'react';
import { ServiceAreaWaMap3D } from '../three/ServiceAreaWaMap3D';
import { Button } from '../ui/Button';
import { brandConfig } from '../../data/brandConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  Building2
} from 'lucide-react';

import { useResponsive } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 7: Service Area & Final Editorial CTA
 * Features:
 * - Cropped "07" editorial numeral with overflow clipping
 * - Full-screen 3D Western Australia terrain & Perth operations visualization
 * - 5 Interactive 3D Service Nodes connected by animated gold laser paths
 * - Large editorial "READY TO DISCUSS YOUR SITE?" CTA
 * - Responsive touch layout for mobile and desktop
 */
export function FinalCtaSection() {
  const sectionRef = useRef(null);
  const bigNumberRef = useRef(null);
  const introBlockRef = useRef(null);
  const ctaBlockRef = useRef(null);
  const { isMobile } = useResponsive();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNode, setActiveNode] = useState('exhaust');

  const serviceCategories = [
    { id: 'exhaust', label: 'KITCHEN EXHAUST', desc: 'Commercial exhaust hood, canopy, and horizontal/vertical riser degreasing.' },
    { id: 'steam', label: 'STEAM CLEANING', desc: '160°C dry steam thermal degreasing and deep sanitation for culinary lines.' },
    { id: 'commercial', label: 'COMMERCIAL CLEANING', desc: 'Comprehensive commercial facility hygiene, floors, and prep zones.' },
    { id: 'robotic', label: 'ROBOTIC EXHAUST CLEANING', desc: 'Automated 2,400 RPM crawler scrubbing for inaccessible ductwork.' },
    { id: 'reporting', label: 'DIGITAL REPORTING', desc: 'AS 1851 Section 13 certified photo and video compliance packages.' },
  ];

  // GSAP ScrollTrigger Sequence for 3D Camera Travel & Typography Reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 0px)", () => {
      // 1. Huge '07' Parallax
      if (bigNumberRef.current) {
        gsap.fromTo(
          bigNumberRef.current,
          { y: -40, opacity: 0.12 },
          {
            y: 60,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Intro Block Entrance
      if (introBlockRef.current) {
        gsap.fromTo(
          introBlockRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introBlockRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 3. Scroll Linked Camera Progression over WA Map
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.6,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // 4. CTA Block Entrance
      if (ctaBlockRef.current) {
        gsap.fromTo(
          ctaBlockRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaBlockRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="service-area"
      className="relative z-20 w-full min-h-screen py-16 sm:py-24 lg:py-36 bg-[#02050B] overflow-hidden flex flex-col justify-between border-t border-slate-800/80"
    >
      {/* ================= FULLSCREEN 3D WA TERRAIN & PERTH OPERATIONS MAP ================= */}
      <ServiceAreaWaMap3D
        scrollProgress={scrollProgress}
        activeNode={activeNode}
        onNodeClick={(id) => setActiveNode(id)}
      />

      {/* ================= HUGE CROPPED '07' EDITORIAL NUMERAL (Contained) ================= */}
      <div
        ref={bigNumberRef}
        aria-hidden="true"
        className="absolute -top-6 -right-6 lg:-right-4 text-[130px] sm:text-[220px] lg:text-[380px] font-black font-mono text-slate-800/15 pointer-events-none select-none tracking-tighter leading-none z-0 overflow-hidden"
      >
        07
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col space-y-14 sm:space-y-20 lg:space-y-28">
        
        {/* ================= 1. OVERSIZED EDITORIAL INTRO ================= */}
        <div ref={introBlockRef} className="space-y-3 sm:space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-[10px] sm:text-[11px] font-semibold text-amber-300 shadow-lg">
            <span className="font-mono font-bold text-amber-400">07</span>
            <span>/</span>
            <span className="tracking-wide uppercase">SERVICE AREA & OPERATIONS BASE</span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.98] font-sans">
              PERTH METRO. <br />
              <span className="gold-gradient-text">WESTERN AUSTRALIA.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
            Specialist commercial cleaning and kitchen exhaust services across the Perth metropolitan area and Western Australia.
          </p>
        </div>

        {/* ================= 2. INTERACTIVE SERVICE NODES OVERLAY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-4 sm:pt-8">
          
          {/* Left: 5 Selectable 3D Service Node Pills */}
          <div className="lg:col-span-6 space-y-2.5 sm:space-y-3">
            <div className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Compass className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
              <span>ACTIVE DEPLOYMENT CAPABILITIES:</span>
            </div>

            {serviceCategories.map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start justify-between backdrop-blur-md ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#142338]/95 to-[#0D1929]/95 border-amber-400 shadow-xl shadow-amber-500/20 translate-x-1 sm:translate-x-2'
                      : 'bg-[#050C17]/80 border-slate-800/80 hover:border-slate-700 hover:translate-x-1'
                  }`}
                >
                  <div className="space-y-0.5 sm:space-y-1 min-w-0 pr-2">
                    <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {node.label}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {node.desc}
                    </p>
                  </div>
                  <span className={`text-[10px] sm:text-xs font-mono font-bold shrink-0 ml-2 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`}>
                    {isSelected ? '● ACTIVE' : '○'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Regional Coverage Status Pills */}
          <div className="lg:col-span-6 flex flex-col space-y-3.5 sm:space-y-4">
            {/* Perth Metro Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  PRIMARY SERVICE METRO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h4 className="text-base sm:text-xl font-black text-white uppercase">
                PERTH METROPOLITAN AREA
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Scheduled overnight, weekend, and flexible commercial kitchen hygiene operations across all Perth commercial precincts.
              </p>
            </div>

            {/* WA Regional Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                REGIONAL WA COVERAGE
              </span>
              <h4 className="text-base sm:text-xl font-black text-white uppercase">
                WESTERN AUSTRALIA STATEWIDE
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Service availability across Western Australia commercial facilities and regional hubs as confirmed by Grade X.
              </p>
            </div>

            {/* Emergency Response Card */}
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-rose-400">
                <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                  RAPID DISPATCH
                </span>
              </div>
              <h4 className="text-base sm:text-xl font-black text-white uppercase">
                24/7 EMERGENCY RESPONSE
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Emergency response availability for post-inspection urgent cleanouts, fan breakdowns, and high-risk grease fire mitigation.
              </p>
            </div>
          </div>

        </div>

        {/* ================= 3. LARGE CINEMATIC FINAL CTA ================= */}
        <div ref={ctaBlockRef} className="pt-10 sm:pt-16 border-t border-slate-800/80 text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          
          <div className="space-y-2 sm:space-y-4">
            <h3 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.98] font-sans">
              READY TO DISCUSS <br />
              <span className="gold-gradient-text">YOUR SITE?</span>
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
              Book an obligation-free commercial site appraisal or request a rapid, itemized quotation for your venue.
            </p>
          </div>

          {/* Big Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 pt-2">
            <Button to="/contact" variant="gold" size="lg" icon={ArrowRight} className="text-xs sm:text-sm py-3.5 px-8 font-black shadow-2xl shadow-amber-500/30 min-h-[44px] justify-center">
              REQUEST A QUOTE
            </Button>
            <Button to="/contact" variant="navy" size="lg" className="text-xs sm:text-sm py-3.5 px-8 font-semibold min-h-[44px] justify-center">
              CONTACT US
            </Button>
          </div>

          {/* Direct Editorial Contact Links */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 sm:pt-8 text-xs sm:text-sm font-mono border-t border-slate-800/80">
            <a
              href={brandConfig.contact.phoneHref}
              className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors font-bold min-h-[40px]"
            >
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{brandConfig.contact.phone}</span>
            </a>

            <a
              href={brandConfig.contact.emailHref}
              className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors font-bold min-h-[40px]"
            >
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{brandConfig.contact.email}</span>
            </a>

            <div className="flex items-center gap-2 text-slate-400 min-h-[40px]">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{brandConfig.contact.address.suburb}, {brandConfig.contact.address.state}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FinalCtaSection;
