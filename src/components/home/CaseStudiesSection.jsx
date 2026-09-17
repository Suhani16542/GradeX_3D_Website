import React, { useState, useRef, useEffect } from 'react';
import { CaseStudyCinemaDuct3D } from '../three/CaseStudyCinemaDuct3D';
import { CaseStudyAmbientBg3D } from '../three/CaseStudyAmbientBg3D';
import { Button } from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Camera,
  Gauge,
  Video,
  FileCheck2,
  Quote,
  Building2,
  MapPin,
  Sliders
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 6: Full-Screen Immersive WebGL Case Study Experience & Client Feedback
 * Interaction Philosophy:
 * - Huge cropped "06" editorial numeral
 * - Full-screen 3D Stainless Steel Exhaust Duct Tunnel & 75% Viewport WebGL Before/After Shader
 * - Pinned Scroll-Driven Storytelling: Dirty -> Inspection -> Measurement -> Clean Result
 * - CMS-Ready Case Study Data Architecture
 * - Large Cinematic Testimonial Section
 */
export function CaseStudiesSection() {
  const sectionRef = useRef(null);
  const bigNumberRef = useRef(null);
  const titleBlockRef = useRef(null);
  const cinemaSceneRef = useRef(null);
  const detailsRef = useRef(null);
  const testimonialRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderProgress, setSliderProgress] = useState(0.45);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // CMS-Ready Case Studies Data Structure
  const caseStudies = [
    {
      id: "case-01",
      number: "01",
      client: "Commercial Hospitality Facility",
      siteType: "High-Volume Commercial Kitchen",
      location: "Perth CBD Hospitality Precinct, WA",
      service: "Robotic Kitchen Exhaust & Duct Cleaning",
      description: "Complete extraction of heavy polymerized grease accumulation across 18 meters of vertical and horizontal exhaust ducting, hoods, and rooftop extraction fan impellers.",
      result: "100% bare stainless-steel restoration with ultrasonic grease reduction from 1,850 µm to < 18 µm, verified under AS 1851 Section 13 standards.",
      beforeImage: "/images/duct_before.jpg",
      afterImage: "/images/duct_after.jpg",
      badge: "VERTICAL RISER EXTRACTION",
    },
    {
      id: "case-02",
      number: "02",
      client: "Multi-Site QSR Hospitality Network",
      siteType: "Quick-Service Restaurant Line",
      location: "Western Australia Regional Network",
      service: "Canopy, Fryer Extraction & Honeycomb Filter Exchange",
      description: "Scheduled deep extraction across cooking lines, high-temperature fryer hoods, and inaccessible exhaust transition plenums without interrupting daily kitchen prep shifts.",
      result: "Eliminated combustible fire loads across all operating lines with full photographic verification and instant digital shift PDF log sign-off.",
      beforeImage: "/images/duct_before.jpg",
      afterImage: "/images/duct_after.jpg",
      badge: "SCHEDULED FACILITY HYGIENE",
    },
    {
      id: "case-03",
      number: "03",
      client: "Corporate Office Dining & Cafeteria Complex",
      siteType: "Corporate Food Service Centre",
      location: "West Perth, WA",
      service: "Thermal Steam Wash & Fresh Air Supply Sanitization",
      description: "High-temperature 160°C dry steam sanitization of commercial hoods, riser shafts, and makeup air diffusers to resolve extraction airflow resistance.",
      result: "Restored optimal exhaust airflow rates, eradicated grease odor transfer, and delivered complete insurer-ready compliance certificates.",
      beforeImage: "/images/duct_before.jpg",
      afterImage: "/images/duct_after.jpg",
      badge: "THERMAL AIRFLOW RESTORATION",
    },
  ];

  // CMS-Ready Testimonials
  const testimonials = [
    {
      id: "test-01",
      quote: "Grade X provided undeniable before-and-after photo logs and digital grease micrometer readings that immediately satisfied our building insurer and health audit requirements.",
      clientName: "Facility Operations Manager",
      company: "Commercial Hospitality Facility",
      role: "Operations & Compliance Lead",
      project: "18m Vertical Exhaust Shaft Restoration",
    },
    {
      id: "test-02",
      quote: "The robotic inspection footage gave us complete visibility into duct sections we previously could never inspect. Thorough, professional, and delivered with zero kitchen downtime.",
      clientName: "Executive Culinary Director",
      company: "Western Australia Food & Beverage Group",
      role: "General Manager",
      project: "Multi-Store Extraction Maintenance",
    },
  ];

  const currentStudy = caseStudies[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
    setSliderProgress(0.5);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
    setSliderProgress(0.5);
  };

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  // Pinned Scroll-Driven GSAP Choreography
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Huge '06' Parallax
      if (bigNumberRef.current) {
        gsap.fromTo(
          bigNumberRef.current,
          { y: -100, opacity: 0.15 },
          {
            y: 120,
            opacity: 0.35,
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

      // 2. Title Block Entrance
      if (titleBlockRef.current) {
        gsap.fromTo(
          titleBlockRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleBlockRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 3. Main 3D Before/After Scene Reveal & Scroll-linked transition
      if (cinemaSceneRef.current) {
        gsap.fromTo(
          cinemaSceneRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cinemaSceneRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );

        // Scroll scrub drives transition progress from 0.1 to 0.95
        ScrollTrigger.create({
          trigger: cinemaSceneRef.current,
          start: "top 60%",
          end: "bottom 30%",
          scrub: 1.5,
          onUpdate: (self) => {
            setSliderProgress(0.1 + self.progress * 0.85);
          },
        });
      }

      // 4. Testimonial Section Entrance
      if (testimonialRef.current) {
        gsap.fromTo(
          testimonialRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialRef.current,
              start: "top 80%",
              once: true,
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
      id="case-studies"
      onMouseMove={handleMouseMove}
      className="relative z-20 w-full py-24 lg:py-36 bg-[#030712] overflow-hidden border-b border-slate-800/80 flex flex-col justify-center"
    >
      {/* 3D Ambient Technical Particles */}
      <CaseStudyAmbientBg3D />

      {/* ================= HUGE CROPPED '06' EDITORIAL NUMERAL ================= */}
      <div
        ref={bigNumberRef}
        aria-hidden="true"
        className="absolute -top-12 -left-12 lg:-left-6 text-[180px] sm:text-[280px] lg:text-[420px] font-black font-mono text-slate-800/15 pointer-events-none select-none tracking-tighter leading-none z-0"
      >
        06
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col space-y-16 lg:space-y-24">
        
        {/* ================= 1. OVERSIZED EDITORIAL HEADING ================= */}
        <div ref={titleBlockRef} className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-[11px] font-semibold text-amber-300 shadow-lg">
            <span className="font-mono font-bold text-amber-400">06</span>
            <span>/</span>
            <span className="tracking-wide uppercase">CASE STUDIES & CLIENT OUTCOMES</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.98] font-sans">
              REAL WORK. <br />
              <span className="gold-gradient-text">REAL RESULTS.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Explore selected Grade X projects, cleaning outcomes and client feedback. Each case study communicates the scope of work, service delivered and evidence available.
          </p>
        </div>

        {/* ================= 2. FULLSCREEN 3D WEBGL BEFORE/AFTER CINEMATIC SCENE (~75% VIEWPORT) ================= */}
        <div ref={cinemaSceneRef} className="space-y-6">
          
          {/* Top Case Study Navigation Strip */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                CASE STUDY {currentStudy.number}
              </span>
              <span className="text-xs font-mono text-slate-400">
                0{currentIndex + 1} / 0{caseStudies.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Case Study"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:bg-amber-400/10 text-slate-300 hover:text-amber-300 transition-all flex items-center gap-1 text-xs font-mono"
              >
                <ChevronLeft className="w-4 h-4" /> PREV
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Case Study"
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 hover:bg-amber-400/10 text-slate-300 hover:text-amber-300 transition-all flex items-center gap-1 text-xs font-mono"
              >
                NEXT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Duct Cross-Section Viewport */}
          <div className="relative w-full">
            <CaseStudyCinemaDuct3D
              beforeImage={currentStudy.beforeImage}
              afterImage={currentStudy.afterImage}
              progress={sliderProgress}
              mouse={mouse}
            />

            {/* Live Interactive Scrub Handle Overlay */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-cyan-400 to-amber-400 pointer-events-none shadow-[0_0_16px_rgba(56,189,248,0.9)]"
              style={{ left: `${sliderProgress * 100}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white">
                <Sliders className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Range Slider for Manual Scrubbing */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={sliderProgress}
              onChange={(e) => setSliderProgress(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Scroll or drag before/after transition"
            />
          </div>

          {/* Telemetry Indicator */}
          <div className="flex items-center justify-between text-xs font-mono bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400">
              {sliderProgress < 0.35 ? '● INSPECTION: Heavy Polymerized Carbon Buildup' : sliderProgress > 0.65 ? '✓ RESULT: AS 1851 Section 13 Pass (< 18 µm)' : '⚡ TRANSFORMATION: Active Laser Scrubbing'}
            </span>
            <span className="text-amber-400 font-bold">
              {Math.round(sliderProgress * 100)}% Cleared
            </span>
          </div>

        </div>

        {/* ================= 3. LARGE EDITORIAL CASE STUDY METADATA ================= */}
        <div ref={detailsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6 border-t border-slate-800/80">
          
          {/* Left Metadata Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                {currentStudy.client}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {currentStudy.siteType}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentStudy.location}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                SERVICE DELIVERED:
              </span>
              <p className="text-sm font-bold text-amber-300">
                {currentStudy.service}
              </p>
            </div>
          </div>

          {/* Right Scope & Result Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                PROJECT SCOPE:
              </span>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {currentStudy.description}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent border-l-2 border-amber-400 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                DOCUMENTED OUTCOME:
              </span>
              <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
                {currentStudy.result}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button to="/case-studies" variant="gold" size="md" icon={ArrowRight} className="text-xs py-2.5 px-6 font-bold shadow-lg shadow-amber-500/20">
                VIEW FULL CASE STUDY
              </Button>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                ✓ 100% Digital Audit Certified
              </span>
            </div>
          </div>

        </div>

        {/* ================= 4. TECHNICAL EVIDENCE STRIP ================= */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center space-y-1">
            <Camera className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-[10px] font-mono font-bold uppercase text-slate-200">
              BEFORE / AFTER PHOTOS
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center space-y-1">
            <Gauge className="w-5 h-5 text-sky-400 mb-1" />
            <span className="text-[10px] font-mono font-bold uppercase text-slate-200">
              DIGITAL GREASE MEASUREMENT
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center space-y-1">
            <Video className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-[10px] font-mono font-bold uppercase text-slate-200">
              LIVE VIDEO EVIDENCE
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center space-y-1">
            <FileCheck2 className="w-5 h-5 text-indigo-400 mb-1" />
            <span className="text-[10px] font-mono font-bold uppercase text-slate-200">
              SERVICE REPORT
            </span>
          </div>
        </div>

        {/* ================= 5. CINEMATIC CLIENT FEEDBACK (FULL-WIDTH EDITORIAL) ================= */}
        <div ref={testimonialRef} className="pt-12 border-t border-slate-800/80 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold text-amber-300">
              <Quote className="w-3 h-3 text-amber-400" />
              <span>CLIENT FEEDBACK</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
              TRUST BUILT THROUGH <span className="gold-gradient-text">DELIVERY.</span>
            </h3>
          </div>

          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0A1628]/90 via-[#060E1A]/90 to-[#030712]/90 border border-amber-400/25 shadow-2xl relative overflow-hidden text-center space-y-6">
            <Quote className="w-12 h-12 text-amber-400/30 mx-auto" />
            <p className="text-base sm:text-xl lg:text-2xl text-slate-100 font-light leading-relaxed italic max-w-3xl mx-auto">
              "{testimonials[0].quote}"
            </p>
            <div className="pt-4 border-t border-slate-800/80 inline-block">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {testimonials[0].clientName}
              </h4>
              <p className="text-xs font-mono text-amber-300">
                {testimonials[0].role} — {testimonials[0].company}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CaseStudiesSection;
