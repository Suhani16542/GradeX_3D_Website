import React, { useRef, useState, useEffect } from 'react';
import { DigitalEvidenceParticleBg } from '../three/DigitalEvidenceParticleBg';
import { DuctTransitionScene3D } from '../three/DuctTransitionScene3D';
import { Button } from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Gauge,
  Camera,
  Video,
  FileCheck2,
  Sparkles,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

import { useResponsive } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 4: Digital Evidence & Proven Results
 * Integrated 3D Duct Zoom Before/After Transition + Measurement Telemetry HUD + 4 Evidence Cards
 */
export function DigitalEvidenceSection() {
  const sectionRef = useRef(null);
  const wordRefs = useRef([]);
  const visualContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { isMobile, isSmallMobile } = useResponsive();
  
  // Interactive transition slider (0 = Before, 1 = After)
  const [sliderProgress, setSliderProgress] = useState(0.45);
  const [isDragging, setIsDragging] = useState(false);

  // Normalized mouse coordinates for subtle WebGL particle parallax
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

  // 4 Evidence Information Cards
  const evidenceCards = [
    {
      id: "card-grease",
      number: "01",
      icon: Gauge,
      title: "GREASE MEASUREMENT",
      description: "Objective grease thickness measurement before and after cleaning.",
      badge: "SUB-20 µm AUDIT",
      metric: "1,850 µm → < 18 µm",
      status: "AS 1851 Pass",
      borderClass: "border-amber-400/30 hover:border-amber-400/80",
      bgClass: "bg-gradient-to-b from-[#132238]/90 via-[#0C1726]/90 to-[#060D17]/90",
      iconContainer: "bg-amber-400 text-slate-950 shadow-amber-500/20",
      tagClass: "bg-amber-400/15 text-amber-300 border-amber-400/30",
      accentColor: "text-amber-400",
      glowClass: "bg-amber-500/15",
    },
    {
      id: "card-photos",
      number: "02",
      icon: Camera,
      title: "BEFORE / AFTER PHOTOS",
      description: "Visual evidence showing the verified cleaning result.",
      badge: "HIGH-RES CAPTURE",
      metric: "100% Optical Verification",
      status: "Timestamped & Geotagged",
      borderClass: "border-sky-400/30 hover:border-sky-400/80",
      bgClass: "bg-gradient-to-b from-[#0E2642]/90 via-[#091B30]/90 to-[#060D17]/90",
      iconContainer: "bg-sky-400 text-slate-950 shadow-sky-500/20",
      tagClass: "bg-sky-400/15 text-sky-300 border-sky-400/30",
      accentColor: "text-sky-400",
      glowClass: "bg-sky-500/15",
    },
    {
      id: "card-video",
      number: "03",
      icon: Video,
      title: "LIVE VIDEO EVIDENCE",
      description: "Internal duct inspection and rotary cleaning video records.",
      badge: "1080P HD RECORDING",
      metric: "Internal Duct Survey",
      status: "Zero Blind-Spots",
      borderClass: "border-emerald-400/30 hover:border-emerald-400/80",
      bgClass: "bg-gradient-to-b from-[#0A2922]/90 via-[#071D18]/90 to-[#060D17]/90",
      iconContainer: "bg-emerald-400 text-slate-950 shadow-emerald-500/20",
      tagClass: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
      accentColor: "text-emerald-400",
      glowClass: "bg-emerald-500/15",
    },
    {
      id: "card-report",
      number: "04",
      icon: FileCheck2,
      title: "DIGITAL SERVICE REPORT",
      description: "Service areas, inspections, measurements and compliance recommendations.",
      badge: "AS 1851 CERTIFICATE",
      metric: "Instant Shift PDF Delivery",
      status: "Insurance Ready",
      borderClass: "border-indigo-400/30 hover:border-indigo-400/80",
      bgClass: "bg-gradient-to-b from-[#141C3D]/90 via-[#0E142C]/90 to-[#060D17]/90",
      iconContainer: "bg-indigo-400 text-slate-950 shadow-indigo-500/20",
      tagClass: "bg-indigo-400/15 text-indigo-300 border-indigo-400/30",
      accentColor: "text-indigo-400",
      glowClass: "bg-indigo-500/15",
    },
  ];

  // GSAP 3D Heading & Scroll Scrub Timeline with matchMedia
  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // 1. Desktop Animation
    mm.add("(min-width: 1024px)", () => {
      const validWords = wordRefs.current.filter(Boolean);
      if (validWords.length > 0) {
        gsap.set(validWords[0], { x: -60, y: -30, z: 80, rotateX: 20, rotateY: -20, opacity: 0 });
        gsap.set(validWords[1], { x: 60, y: -20, z: -60, rotateX: -15, rotateY: 25, opacity: 0 });
        gsap.set(validWords[2], { x: -50, y: 30, z: -50, rotateX: 20, rotateY: 15, opacity: 0 });
        gsap.set(validWords[3], { x: 50, y: 35, z: 70, rotateX: -20, rotateY: -20, opacity: 0 });

        gsap.to(validWords, {
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (visualContainerRef.current) {
        gsap.fromTo(
          visualContainerRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: visualContainerRef.current,
          start: "top 65%",
          end: "bottom 35%",
          scrub: 1.5,
          onUpdate: (self) => {
            if (!isDragging) {
              setSliderProgress(0.1 + self.progress * 0.85);
            }
          },
        });
      }

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              once: true,
            },
          }
        );
      }
    });

    // 2. Mobile/Tablet Animation
    mm.add("(max-width: 1023px)", () => {
      const validWords = wordRefs.current.filter(Boolean);
      if (validWords.length > 0) {
        gsap.fromTo(
          validWords,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, [isDragging]);

  const handleSliderChange = (e) => {
    setSliderProgress(parseFloat(e.target.value));
  };

  return (
    <section
      ref={sectionRef}
      id="digital-evidence"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#040A14] overflow-hidden border-b border-slate-800/80 flex flex-col justify-center"
    >
      {/* ================= LAYER 0: THREE.JS DYNAMIC WEBGL PARTICLE BACKGROUND ================= */}
      <DigitalEvidenceParticleBg mouse={mouse} />

      {/* ================= FOREGROUND LAYERS (z-10+ above particles) ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col space-y-10 sm:space-y-14 lg:space-y-16">
        
        {/* ================= LAYER 2: 3D HEADING ANIMATION ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4" style={{ perspective: '1200px' }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-[10px] sm:text-[11px] font-semibold text-amber-300 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="tracking-wide uppercase">MEASURABLE COMPLIANCE & EVIDENCE</span>
          </div>

          {/* Assembling Headline */}
          <div className="space-y-1 select-none">
            {/* Line 1 */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] font-sans">
              <span ref={(el) => (wordRefs.current[0] = el)} className="inline-block transform-gpu">
                DIGITAL
              </span>
              <span ref={(el) => (wordRefs.current[1] = el)} className="inline-block transform-gpu">
                EVIDENCE.
              </span>
            </div>

            {/* Line 2 */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 text-2xl sm:text-4xl lg:text-5xl font-black gold-gradient-text tracking-tight uppercase leading-[1.08] font-sans">
              <span ref={(el) => (wordRefs.current[2] = el)} className="inline-block transform-gpu">
                PROVEN
              </span>
              <span ref={(el) => (wordRefs.current[3] = el)} className="inline-block transform-gpu">
                RESULTS.
              </span>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto drop-shadow-md">
            Grade X provides measurable, photographic, and video-documented proof of every completed commercial kitchen exhaust restoration.
          </p>
        </div>

        {/* ================= LAYER 3 & 4: MAIN 3D DUCT ZOOM BEFORE/AFTER & MEASUREMENT HUD ================= */}
        <div
          ref={visualContainerRef}
          className="relative max-w-5xl mx-auto w-full rounded-3xl overflow-hidden border border-amber-400/35 shadow-2xl bg-gradient-to-b from-[#0A1628]/95 via-[#06101E]/95 to-[#030812]/95 p-3.5 sm:p-5 lg:p-6 space-y-3 sm:space-y-4"
        >
          {/* Top HUD Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono border-b border-slate-800 pb-3">
            {/* Left: Pre-Clean Status */}
            <div className="flex items-center gap-2">
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                BEFORE: PRE-CLEAN
              </span>
              <span className="text-slate-400 hidden xs:inline">
                <strong className="text-rose-300">1,850 µm</strong>
              </span>
            </div>

            {/* Center: Live Removal Meter */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/80 px-2.5 sm:px-3 py-1 rounded-xl border border-slate-800 text-[9px] sm:text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-slate-300 font-bold truncate">
                PROGRESS: {Math.round(sliderProgress * 100)}%
              </span>
            </div>

            {/* Right: Post-Clean Status */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 hidden xs:inline">
                <strong className="text-emerald-400">&lt; 18 µm</strong>
              </span>
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                AFTER: AS 1851 PASS
              </span>
            </div>
          </div>

          {/* WebGL 3D Shader Transition Viewport with 3D Duct Tunnel & Camera Zoom */}
          <div
            style={{
              height: 'clamp(280px, 70vw, 480px)',
            }}
            className="relative w-full rounded-2xl overflow-hidden border border-slate-700/60 bg-black group select-none shadow-inner"
          >
            <DuctTransitionScene3D progress={sliderProgress} />

            {/* Left Image Badge (Before) */}
            <div
              className="absolute top-3 left-3 sm:top-4 sm:left-4 pointer-events-none transition-opacity duration-300"
              style={{ opacity: Math.max(0.1, 1 - sliderProgress * 1.5) }}
            >
              <div className="bg-slate-950/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-rose-500/40 text-[10px] sm:text-[11px] font-mono text-rose-300 space-y-0.5 shadow-xl">
                <p className="font-bold flex items-center gap-1.5">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-rose-500" />
                  BEFORE EXTRACTION
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 hidden xs:block">Severe Grease Buildup</p>
              </div>
            </div>

            {/* Right Image Badge (After) */}
            <div
              className="absolute top-3 right-3 sm:top-4 sm:right-4 pointer-events-none transition-opacity duration-300 text-right"
              style={{ opacity: Math.max(0.1, (sliderProgress - 0.2) * 1.5) }}
            >
              <div className="bg-slate-950/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-emerald-500/40 text-[10px] sm:text-[11px] font-mono text-emerald-300 space-y-0.5 shadow-xl">
                <p className="font-bold flex items-center justify-end gap-1.5">
                  <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" />
                  AFTER RESTORATION
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 hidden xs:block">Spotless Stainless Steel</p>
              </div>
            </div>

            {/* Interactive Drag Handle Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-cyan-400 to-amber-400 pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.8)]"
              style={{ left: `${sliderProgress * 100}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white">
                <Sliders className="w-3.5 sm:w-4 h-3.5 sm:h-4 rotate-90" />
              </div>
            </div>

            {/* Invisible Range Slider Input for Drag Interaction */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={sliderProgress}
              onChange={handleSliderChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Drag Before/After transition slider"
            />
          </div>

          {/* Bottom Telemetry HUD Slider Bar (Layer 4) */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] sm:text-[11px]">SLIDER:</span>
              <span className="text-amber-400 font-bold text-[10px] sm:text-[11px]">
                {sliderProgress < 0.3 ? 'BEFORE: 1,850 µm' : sliderProgress > 0.7 ? 'AFTER: < 18 µm (PASSED)' : 'CLEANING IN PROGRESS...'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px] sm:text-[11px]">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> AS 1851 PASS
              </span>
            </div>
          </div>
        </div>

        {/* ================= LAYER 5: EXACTLY 4 EVIDENCE CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {evidenceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group relative"
              >
                <div
                  className={`relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl border select-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1 ${card.borderClass} ${card.bgClass} flex flex-col justify-between min-h-[180px] sm:min-h-[210px]`}
                >
                  {/* Subtle Hover Glow */}
                  <div
                    className={`absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${card.glowClass}`}
                  />

                  <div className="relative z-10 space-y-2.5 sm:space-y-3">
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-black ${card.accentColor}`}>
                        CARD {card.number}
                      </span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${card.iconContainer}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-sm sm:text-base font-black text-white tracking-tight uppercase leading-snug group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Bottom Badge & Status */}
                  <div className="relative z-10 pt-3 mt-3 border-t border-slate-700/50 flex items-center justify-between text-[10px] font-mono">
                    <span className={`px-2 py-0.5 rounded-full border ${card.tagClass} font-bold uppercase tracking-wider`}>
                      {card.badge}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {card.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM ACTION CTA ================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
          <Button to="/compliance" variant="gold" size="md" icon={ArrowRight} className="shadow-lg shadow-amber-500/20 text-xs py-3 px-6 font-bold min-h-[44px] justify-center">
            VIEW SAMPLE AUDIT REPORT
          </Button>
          <Button to="/contact" variant="navy" size="md" icon={ChevronRight} className="text-xs py-3 px-6 font-semibold min-h-[44px] justify-center">
            BOOK A COMPLIANCE INSPECTION
          </Button>
        </div>

      </div>
    </section>
  );
}

export default DigitalEvidenceSection;
