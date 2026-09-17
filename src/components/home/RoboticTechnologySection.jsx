import React, { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { RoboticShowcase3D } from '../three/RoboticShowcase3D';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Gauge,
  Video,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 2: Robotic Technology Showcase
 * Clean, balanced 2-column layout:
 * - LEFT: Headline, description, 3 technology cards (Robotic Cleaning, Digital Grease Measurement, Live Video Evidence), action buttons
 * - RIGHT: Dedicated 3D Humanoid/Android Robot Showcase with 360° drag orbit and live HUD stats
 */
export function RoboticTechnologySection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // EXACTLY 3 Technology Cards
  const techCards = [
    {
      id: "tech-01",
      number: "01",
      category: "Mechanical Agitation",
      title: "ROBOTIC CLEANING",
      description: "Automated 2,400 RPM hydro-scrubbing reaches inaccessible vertical & horizontal ducts.",
      badge: "2,400 RPM SCRUBBER",
      icon: Bot,
      borderClass: "border-amber-400/35 hover:border-amber-400/80",
      bgClass: "bg-gradient-to-br from-[#14253F]/90 via-[#0C1A2E]/90 to-[#06101E]/90",
      iconContainer: "bg-amber-400 text-slate-950 shadow-amber-500/20",
      tagClass: "bg-amber-400/15 text-amber-300 border-amber-400/30",
      accentColor: "text-amber-400",
      glowClass: "bg-amber-500/15",
    },
    {
      id: "tech-02",
      number: "02",
      category: "Optical Precision",
      title: "DIGITAL GREASE MEASUREMENT",
      description: "Objective sub-20 micron magnetic and laser thickness sensors before and after cleaning.",
      badge: "< 20 µm TOLERANCE",
      icon: Gauge,
      borderClass: "border-sky-400/35 hover:border-sky-400/80",
      bgClass: "bg-gradient-to-br from-[#0E2847]/90 via-[#0A1C33]/90 to-[#06101E]/90",
      iconContainer: "bg-sky-400 text-slate-950 shadow-sky-500/20",
      tagClass: "bg-sky-400/15 text-sky-300 border-sky-400/30",
      accentColor: "text-sky-400",
      glowClass: "bg-sky-500/15",
    },
    {
      id: "tech-03",
      number: "03",
      category: "Digital Verification",
      title: "LIVE VIDEO EVIDENCE",
      description: "1080p HD visual survey recordings provide undeniable, timestamped compliance evidence.",
      badge: "1080P HD SURVEY",
      icon: Video,
      borderClass: "border-emerald-400/35 hover:border-emerald-400/80",
      bgClass: "bg-gradient-to-br from-[#0B2C24]/90 via-[#081E19]/90 to-[#06101E]/90",
      iconContainer: "bg-emerald-400 text-slate-950 shadow-emerald-500/20",
      tagClass: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
      accentColor: "text-emerald-400",
      glowClass: "bg-emerald-500/15",
    },
  ];

  // GSAP: Smooth subtle entrance reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 35%",
              scrub: 1.0,
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0.2, scale: 0.95 },
          {
            opacity: 1,
            scale: 1.0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 30%",
              scrub: 1.0,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full py-16 lg:py-24 bg-[#050D1A] overflow-hidden border-b border-slate-800/80"
    >
      {/* Ambient Depth Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: CONTENT, 3 CARDS, BUTTONS ================= */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* 1. Header & Badges */}
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-[11px] font-semibold text-amber-300 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="tracking-wide">TECHNOLOGY & PRECISION</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] drop-shadow-2xl font-sans">
                  ROBOTIC CLEANING.
                </h2>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black gold-gradient-text tracking-tight uppercase leading-[1.08] drop-shadow-2xl font-sans">
                  MEASURABLE RESULTS.
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl drop-shadow-md">
                Grade X eliminates blind spots in commercial exhaust ductwork with high-precision robotic crawlers, digital grease sensors, and HD video verification.
              </p>
            </div>

            {/* 2. EXACTLY 3 Technology Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {techCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className="group relative"
                  >
                    <div
                      className={`relative p-4 rounded-2xl backdrop-blur-xl border select-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 ${card.borderClass} ${card.bgClass} flex flex-col justify-between min-h-[190px]`}
                    >
                      {/* Hover Glow */}
                      <div
                        className={`absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${card.glowClass}`}
                      />

                      <div className="relative z-10 space-y-2">
                        {/* Top Row */}
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono font-black ${card.accentColor}`}>
                            {card.number}
                          </span>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-md ${card.iconContainer}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xs sm:text-sm font-black text-white tracking-tight uppercase leading-snug group-hover:text-amber-300 transition-colors">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-slate-300 leading-snug line-clamp-3">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom Badge */}
                      <div className="relative z-10 pt-2.5 mt-2 border-t border-slate-700/50 flex items-center justify-between text-[9px] font-mono">
                        <span className={`px-1.5 py-0.5 rounded-full border ${card.tagClass} font-bold uppercase tracking-wider`}>
                          {card.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3. Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button to="/technology" variant="gold" size="md" icon={ArrowRight} className="shadow-lg shadow-amber-500/20 text-xs py-2.5 px-5 font-bold">
                EXPLORE ROBOTIC TECH
              </Button>
              <Button to="/contact" variant="navy" size="md" icon={ChevronRight} className="text-xs py-2.5 px-5 font-semibold">
                BOOK A LIVE DEMO
              </Button>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: 3D HUMANOID / ROBOT SHOWCASE ================= */}
          <div ref={rightColRef} className="lg:col-span-5 w-full">
            <RoboticShowcase3D />
          </div>

        </div>
      </div>
    </section>
  );
}

export default RoboticTechnologySection;
