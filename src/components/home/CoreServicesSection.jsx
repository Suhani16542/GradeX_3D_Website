import React, { useRef, useState, useEffect } from 'react';
import { InteractiveParticleBackground } from '../three/InteractiveParticleBackground';
import { Button } from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Bot,
  Flame,
  Building2,
  Layers,
  Waves,
  FileCheck2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

import { useResponsive } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 3: Core Services Section
 * Features:
 * 1. Full section Interactive WebGL Particle Background (Three.js Points, BufferGeometry, damped mouse interaction)
 * 2. Responsive Layout:
 *    - Desktop: Left 3 Cards + Center Focal Pillar + Right 3 Cards
 *    - Mobile: Clean 1-Column Sequential Card Stack with smooth vertical reveal
 * 3. Responsive GSAP ScrollTrigger via matchMedia (no horizontal overflow on mobile)
 */
export function CoreServicesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftCardsRef = useRef([]);
  const rightCardsRef = useRef([]);
  const centerPillarRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { isMobile } = useResponsive();

  // Normalized mouse coordinates for interactive particle field
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  // EXACTLY 6 Service Cards
  const leftServices = [
    {
      id: "service-01",
      number: "01",
      title: "Kitchen Exhaust & Hygiene",
      description: "Professional exhaust, canopy and duct cleaning.",
      badge: "AS 1851 COMPLIANT",
      icon: Bot,
      borderClass: "border-amber-400/30 hover:border-amber-400/80",
      bgClass: "bg-gradient-to-br from-[#0F1D33]/90 via-[#0A1628]/90 to-[#050D1A]/90",
      iconContainer: "bg-amber-400 text-slate-950 shadow-amber-500/20",
      tagClass: "bg-amber-400/15 text-amber-300 border-amber-400/30",
      accentColor: "text-amber-400",
      glowClass: "bg-amber-500/15",
      link: "/services#exhaust",
    },
    {
      id: "service-02",
      number: "02",
      title: "Kitchen Equipment Cleaning",
      description: "Deep cleaning for commercial kitchen equipment.",
      badge: "FOOD HYGIENE",
      icon: Sparkles,
      borderClass: "border-sky-400/30 hover:border-sky-400/80",
      bgClass: "bg-gradient-to-br from-[#0B213B]/90 via-[#07172B]/90 to-[#050D1A]/90",
      iconContainer: "bg-sky-400 text-slate-950 shadow-sky-500/20",
      tagClass: "bg-sky-400/15 text-sky-300 border-sky-400/30",
      accentColor: "text-sky-400",
      glowClass: "bg-sky-500/15",
      link: "/services#equipment",
    },
    {
      id: "service-03",
      number: "03",
      title: "Lobby & Front-of-House",
      description: "Professional cleaning for customer-facing areas.",
      badge: "PRISTINE FINISH",
      icon: Building2,
      borderClass: "border-emerald-400/30 hover:border-emerald-400/80",
      bgClass: "bg-gradient-to-br from-[#092620]/90 via-[#061C17]/90 to-[#050D1A]/90",
      iconContainer: "bg-emerald-400 text-slate-950 shadow-emerald-500/20",
      tagClass: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
      accentColor: "text-emerald-400",
      glowClass: "bg-emerald-500/15",
      link: "/services#hospitality",
    },
  ];

  const rightServices = [
    {
      id: "service-04",
      number: "04",
      title: "Exterior & General Commercial",
      description: "Reliable cleaning for commercial environments.",
      badge: "ALL-SURFACE",
      icon: Layers,
      borderClass: "border-indigo-400/30 hover:border-indigo-400/80",
      bgClass: "bg-gradient-to-br from-[#131B3B]/90 via-[#0E142B]/90 to-[#050D1A]/90",
      iconContainer: "bg-indigo-400 text-slate-950 shadow-indigo-500/20",
      tagClass: "bg-indigo-400/15 text-indigo-300 border-indigo-400/30",
      accentColor: "text-indigo-400",
      glowClass: "bg-indigo-500/15",
      link: "/services#commercial",
    },
    {
      id: "service-05",
      number: "05",
      title: "Steam Cleaning",
      description: "Professional steam-based deep cleaning.",
      badge: "160°C+ THERMAL KILL",
      icon: Waves,
      borderClass: "border-amber-400/30 hover:border-amber-400/80",
      bgClass: "bg-gradient-to-br from-[#1C283F]/90 via-[#121B2C]/90 to-[#050D1A]/90",
      iconContainer: "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-amber-500/20",
      tagClass: "bg-amber-400/15 text-amber-300 border-amber-400/30",
      accentColor: "text-amber-300",
      glowClass: "bg-amber-500/15",
      link: "/services#steam",
    },
    {
      id: "service-06",
      number: "06",
      title: "Inspection & Reporting",
      description: "Inspection, measurement and digital service reporting.",
      badge: "DIGITAL AUDIT",
      icon: FileCheck2,
      borderClass: "border-cyan-400/30 hover:border-cyan-400/80",
      bgClass: "bg-gradient-to-br from-[#0B2A38]/90 via-[#071D27]/90 to-[#050D1A]/90",
      iconContainer: "bg-cyan-400 text-slate-950 shadow-cyan-500/20",
      tagClass: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30",
      accentColor: "text-cyan-400",
      glowClass: "bg-cyan-500/15",
      link: "/services#reporting",
    },
  ];

  // GSAP: Responsive animation setup via matchMedia
  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // 1. Desktop Animation (> 1024px)
    mm.add("(min-width: 1024px)", () => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      const validLeftCards = leftCardsRef.current.filter(Boolean);
      if (validLeftCards.length > 0) {
        gsap.fromTo(
          validLeftCards,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      const validRightCards = rightCardsRef.current.filter(Boolean);
      if (validRightCards.length > 0) {
        gsap.fromTo(
          validRightCards,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      if (centerPillarRef.current) {
        gsap.fromTo(
          centerPillarRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              once: true,
            },
          }
        );
      }
    });

    // 2. Mobile/Tablet Animation (< 1024px) - Vertical only, no horizontal overflow
    mm.add("(max-width: 1023px)", () => {
      const allCards = [...leftCardsRef.current, ...rightCardsRef.current].filter(Boolean);
      if (allCards.length > 0) {
        gsap.fromTo(
          allCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
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
      id="services"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 w-full py-16 sm:py-24 lg:py-32 bg-[#030712] overflow-hidden flex flex-col justify-center border-b border-slate-800/80"
    >
      {/* ================= 1. FULL SECTION THREE.JS PARTICLE BACKGROUND ================= */}
      <InteractiveParticleBackground mouse={mouse} />

      {/* ================= 2. CONTENT CONTAINER (z-index: 10 above particles) ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col space-y-10 sm:space-y-14 lg:space-y-16">
        
        {/* Section Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-[10px] sm:text-[11px] font-semibold text-amber-300 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="tracking-wide uppercase">PRECISION CLEANING SOLUTIONS</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] font-sans">
              OUR <span className="gold-gradient-text">SERVICES</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto drop-shadow-md">
            Professional commercial kitchen hygiene and industrial cleaning, engineered for precision.
          </p>
        </div>

        {/* ================= 3. BALANCED 6-CARD COMPOSITION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT SIDE: Cards 1, 2, 3 */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col space-y-4 sm:space-y-5">
            {leftServices.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  ref={(el) => (leftCardsRef.current[idx] = el)}
                  className="group relative"
                >
                  <div
                    className={`relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl border select-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1 ${card.borderClass} ${card.bgClass} flex flex-col justify-between min-h-[140px] sm:min-h-[150px]`}
                  >
                    {/* Hover Glow */}
                    <div
                      className={`absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${card.glowClass}`}
                    />

                    <div className="relative z-10 space-y-2.5">
                      {/* Top Row: Index & Category Icon */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-black ${card.accentColor}`}>
                          CARD {card.number}
                        </span>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${card.iconContainer}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight uppercase leading-snug group-hover:text-amber-300 transition-colors">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Tag */}
                    <div className="relative z-10 pt-3 mt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-mono">
                      <span className={`px-2 py-0.5 rounded-full border ${card.tagClass} font-bold uppercase tracking-wider`}>
                        {card.badge}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1 font-medium group-hover:text-amber-300 transition-colors">
                        Learn More <ChevronRight className="w-3 h-3 text-amber-400" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER: Visual Breathing Space / Central Interactive Focal Pillar (Desktop only) */}
          <div
            ref={centerPillarRef}
            className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center py-6 px-4 rounded-3xl border border-slate-800/80 bg-slate-950/40 backdrop-blur-md text-center space-y-6 relative overflow-hidden"
          >
            {/* Subtle inner particle light ring */}
            <div className="w-20 h-20 rounded-full border border-amber-400/40 flex items-center justify-center relative shadow-lg shadow-amber-500/10">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 flex items-center justify-center animate-pulse">
                <ShieldCheck className="w-7 h-7 text-amber-400" />
              </div>
              <div className="absolute -inset-2 rounded-full border border-sky-400/20 animate-spin" style={{ animationDuration: '12s' }} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                STANDARDS
              </span>
              <p className="text-xs font-black text-white uppercase tracking-tight">
                AS 1851-2012
              </p>
              <p className="text-[11px] font-semibold text-emerald-400 font-mono">
                100% VERIFIED
              </p>
            </div>

            <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                COVERAGE
              </span>
              <p className="text-xs font-black text-white uppercase tracking-tight">
                PERTH & WA
              </p>
              <p className="text-[10px] text-amber-300 font-mono">
                24/7 RAPID DISPATCH
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                INTERACTIVE WEBGL
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Cards 4, 5, 6 */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col space-y-4 sm:space-y-5">
            {rightServices.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  ref={(el) => (rightCardsRef.current[idx] = el)}
                  className="group relative"
                >
                  <div
                    className={`relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl border select-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1 ${card.borderClass} ${card.bgClass} flex flex-col justify-between min-h-[140px] sm:min-h-[150px]`}
                  >
                    {/* Hover Glow */}
                    <div
                      className={`absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${card.glowClass}`}
                    />

                    <div className="relative z-10 space-y-2.5">
                      {/* Top Row: Index & Category Icon */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-black ${card.accentColor}`}>
                          CARD {card.number}
                        </span>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${card.iconContainer}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base lg:text-lg font-black text-white tracking-tight uppercase leading-snug group-hover:text-amber-300 transition-colors">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Tag */}
                    <div className="relative z-10 pt-3 mt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] font-mono">
                      <span className={`px-2 py-0.5 rounded-full border ${card.tagClass} font-bold uppercase tracking-wider`}>
                        {card.badge}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1 font-medium group-hover:text-amber-300 transition-colors">
                        Learn More <ChevronRight className="w-3 h-3 text-amber-400" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile/Tablet Central Standards Bar (Compact) */}
        <div className="flex lg:hidden flex-wrap items-center justify-around gap-4 p-4 rounded-2xl bg-[#061122]/90 border border-slate-800 backdrop-blur-md text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-white uppercase">AS 1851-2012 VERIFIED</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300">PERTH & WA COVERAGE</span>
          </div>
        </div>

        {/* ================= 4. BOTTOM ACTION CTA ================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
          <Button to="/services" variant="gold" size="md" icon={ArrowRight} className="shadow-lg shadow-amber-500/20 text-xs py-3 px-6 font-bold min-h-[44px] justify-center">
            VIEW ALL DETAILED SERVICES
          </Button>
          <Button to="/contact" variant="navy" size="md" icon={ChevronRight} className="text-xs py-3 px-6 font-semibold min-h-[44px] justify-center">
            REQUEST A CUSTOM QUOTE
          </Button>
        </div>

      </div>
    </section>
  );
}

export default CoreServicesSection;
