import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../../data/brandConfig';
import { footerNavigation } from '../../data/navigationData';
import { Container } from '../ui/Container';
import { Footer3DScene } from '../three/Footer3DScene';
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowUp,
  FileCheck2,
  BadgeCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';

/**
 * Ultra-Luxury 3D-Enhanced Footer Component
 * Features:
 * - Interactive Three.js 3D Kinetic Wave Grid with mouse ripple displacement
 * - Spacious Pre-Footer Dispatch Hub
 * - 4-Column High-Contrast Glassmorphic Directory Architecture
 * - Accreditation & Compliance Verification Badges
 * - Oversized Editorial "GRADEX" Watermark Typography lifted comfortably from bottom
 * - Precision System Status Bar with Smooth Back-to-Top
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [perthTime, setPerthTime] = useState('');
  const footerRef = useRef(null);

  // Live Perth AWST (UTC+8) Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const perthString = now.toLocaleTimeString('en-AU', {
        timeZone: 'Australia/Perth',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setPerthTime(perthString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(brandConfig.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#020610] border-t border-slate-800/80 text-slate-300 overflow-hidden"
    >
      {/* ================= 1. THREE.JS 3D KINETIC WAVE BACKGROUND ================= */}
      <Footer3DScene mouse={mouse} />

      <div className="relative z-10 flex flex-col justify-between">
        
        {/* ================= 2. PRE-FOOTER INTERACTIVE DISPATCH HUB ================= */}
        <div className="border-b border-slate-800/80 bg-gradient-to-b from-[#081528]/85 via-[#040C18]/90 to-[#020710]/95 backdrop-blur-2xl py-10 lg:py-12">
          <Container>
            <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-gradient-to-r from-[#0C1E36]/90 via-[#071324]/90 to-[#0C1E36]/90 border border-amber-400/30 shadow-xl shadow-amber-500/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden backdrop-blur-xl">
              
              {/* Ambient Gold Flare */}
              <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

              <div className="space-y-2.5 text-center lg:text-left max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-mono font-bold text-amber-300 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-wide uppercase">PERTH & WA DISPATCH ACTIVE 24/7</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase font-sans leading-tight">
                  Ready to elevate your <span className="gold-gradient-text">kitchen compliance?</span>
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-xl">
                  Connect directly with our Perth commercial kitchen hygiene and robotic exhaust specialists for certified AS 1851 audit compliance.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 shrink-0 relative z-10">
                <a
                  href={brandConfig.contact.phoneHref}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#091626] hover:bg-[#10243E] text-white font-mono font-bold text-xs border border-slate-700/80 hover:border-amber-400/50 transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-mono text-slate-400 uppercase leading-none">DIRECT LINE</div>
                    <div className="text-amber-300 font-bold text-sm leading-tight">{brandConfig.contact.phone}</div>
                  </div>
                </a>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
                >
                  <span>GET A COMMERCIAL QUOTE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>

            </div>
          </Container>
        </div>

        {/* ================= 3. ACCREDITATIONS & STANDARDS STRIP ================= */}
        <div className="border-b border-slate-800/80 bg-[#030914]/80 py-4.5 backdrop-blur-md">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              {[
                { label: "AS 1851-2012", desc: "Australian Standards Certified", icon: ShieldCheck, color: "text-emerald-400" },
                { label: "WHS ACT 2020", desc: "Standardized Safety Protocols", icon: Shield, color: "text-amber-400" },
                { label: "FOOD-SAFE AS 4674", desc: "Commercial Kitchen Hygiene", icon: BadgeCheck, color: "text-teal-400" },
                { label: "100% INSURER READY", desc: "Underwriter Accepted Proof", icon: FileCheck2, color: "text-amber-300" },
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#071324]/50 border border-slate-800/80">
                    <ItemIcon className={`w-4.5 h-4.5 shrink-0 ${item.color}`} />
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono font-bold text-white uppercase tracking-tight truncate">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>

        {/* ================= 4. MAIN FOOTER DIRECTORY ================= */}
        <div className="py-14 sm:py-16 relative">
          
          {/* Giant Watermark Typography in Background - Lifted Comfortably from Bottom */}
          <div className="absolute bottom-8 sm:bottom-12 right-0 flex items-end justify-end pointer-events-none select-none opacity-[0.08] overflow-hidden pr-4 sm:pr-8 leading-none">
            <span className="text-[14vw] font-black uppercase tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] select-none pointer-events-none leading-none">
              GRADEX
            </span>
          </div>

          <Container className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
              
              {/* Brand & Corporate Credentials Column */}
              <div className="lg:col-span-2 space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/40">
                    GX
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-white tracking-tight uppercase font-sans">
                      {brandConfig.companyName}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                      WA Commercial Cleaning & Robotic Hygiene
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-sm">
                  Advanced commercial cleaning, robotic kitchen exhaust duct cleaning, and verified digital evidence reporting for commercial kitchens, hospitality venues, and facilities across Western Australia.
                </p>

                {/* Structured WA Contact Credential Card */}
                <div className="p-4.5 rounded-2xl bg-[#061122]/90 border border-slate-800/90 space-y-3 text-xs text-slate-300 backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{brandConfig.contact.address.fullAddress}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href={brandConfig.contact.phoneHref}
                      className="text-white hover:text-amber-300 font-mono font-bold transition-colors"
                    >
                      {brandConfig.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href={brandConfig.contact.emailHref}
                      className="font-mono text-slate-300 hover:text-amber-300 transition-colors"
                    >
                      {brandConfig.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{brandConfig.contact.operatingHours}</span>
                  </div>
                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>ABN: {brandConfig.abn}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  </div>
                </div>
              </div>

              {/* Hygiene Solutions Column */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Hygiene Solutions
                  </h4>
                  <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                </div>
                <ul className="space-y-2.5 text-xs">
                  {[
                    { label: "Robotic Exhaust Cleaning", path: "/services" },
                    { label: "Kitchen Exhaust Degreasing", path: "/services" },
                    { label: "Canopy & Filter Exchange", path: "/services" },
                    { label: "Equipment Deep Hygiene", path: "/services" },
                    { label: "Grill & Fryer Boil-Outs", path: "/services" },
                    { label: "Floor Scrubbing & Degreasing", path: "/services" },
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.path}
                        className="text-slate-300 hover:text-amber-300 transition-all duration-200 inline-flex items-center gap-1.5 hover:translate-x-1"
                      >
                        <ChevronRight className="w-3 h-3 text-amber-400/60" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology & WHS Column */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Technology & WHS
                  </h4>
                  <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                </div>
                <ul className="space-y-2.5 text-xs">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="text-slate-300 hover:text-amber-300 transition-all duration-200 inline-flex items-center gap-1.5 hover:translate-x-1"
                      >
                        <ChevronRight className="w-3 h-3 text-amber-400/60" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Inquiries & Quick Response Column */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Direct Contact
                  </h4>
                  <div className="w-8 h-0.5 bg-amber-400 rounded-full" />
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Direct commercial enquiries across Perth metropolitan & regional WA:
                </p>

                <div className="p-3.5 rounded-2xl bg-[#061122]/90 border border-slate-800/80 space-y-2">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">OFFICIAL EMAIL</div>
                  <button
                    onClick={handleCopyEmail}
                    className="w-full text-left font-mono text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors flex items-center justify-between bg-amber-400/10 px-2.5 py-2 rounded-lg border border-amber-400/20"
                  >
                    <span className="truncate">{brandConfig.contact.email}</span>
                    <span className="text-[9px] text-amber-400 shrink-0 ml-2">
                      {copiedEmail ? 'COPIED!' : 'COPY'}
                    </span>
                  </button>
                </div>

                <div className="pt-1.5">
                  <div className="text-[9px] font-mono uppercase text-slate-400 mb-2">LEGAL COMPLIANCE</div>
                  <ul className="space-y-1.5 text-xs">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.path}
                          className="text-slate-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                        >
                          <ChevronRight className="w-3 h-3 text-slate-600" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </Container>
        </div>

        {/* ================= 5. PRECISION SYSTEM STATUS BAR ================= */}
        <div className="border-t border-slate-800/80 py-5 bg-[#01040A]/95 backdrop-blur-md text-xs text-slate-400">
          <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Operations & Perth Time */}
            <div className="flex flex-wrap items-center gap-3.5 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-semibold">WA OPERATIONS: ACTIVE</span>
              </div>
              <span className="text-slate-700">|</span>
              <div className="text-slate-400">
                PERTH TIME: <span className="text-amber-400 font-bold">{perthTime || 'AWST (UTC+8)'}</span>
              </div>
            </div>

            {/* Right: Copyright & Smooth Back-to-Top Button */}
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-slate-500">
                © {currentYear} {brandConfig.companyName}. All rights reserved.
              </span>
              <button
                onClick={scrollToTop}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-all text-[11px] font-mono shadow-sm"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </Container>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
