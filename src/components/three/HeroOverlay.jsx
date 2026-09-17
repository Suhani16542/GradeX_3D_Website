import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brandConfig } from '../../data/brandConfig';
import { mainNavigation } from '../../data/navigationData';
import { ArrowRight, ChevronRight, Phone, ShieldCheck, Sparkles, Eye, Gauge, CheckCircle2, Menu, X } from 'lucide-react';

/**
 * HeroOverlay Component
 * Minimal transparent HTML overlay directly over the Three.js Canvas:
 * - Transparent top navigation bar
 * - Hero typography positioned around left 8-10%
 * - Primary & Secondary CTA buttons
 * - Dynamic scroll stage telemetry badge
 * - "SCROLL TO EXPLORE" bottom indicator
 */
export function HeroOverlay({ scrollProgress = 0, onExploreClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic 5-scene stage indicator based on scroll progress
  const getStageInfo = () => {
    if (scrollProgress < 0.2) {
      return {
        stage: 'SCENE 01 — INSPECTION',
        detail: 'Heavy Grease Buildup Identified',
        icon: Eye,
        badgeStyle: 'text-sky-400 border-sky-500/30 bg-sky-950/60',
      };
    } else if (scrollProgress < 0.45) {
      return {
        stage: 'SCENE 02 — APPROACH',
        detail: 'Robotic Crawler Infiltration',
        icon: Gauge,
        badgeStyle: 'text-amber-400 border-amber-500/30 bg-amber-950/60',
      };
    } else if (scrollProgress < 0.7) {
      return {
        stage: 'SCENE 03 — CLEANING',
        detail: 'Active Rotary Hydro-Jetting',
        icon: Sparkles,
        badgeStyle: 'text-amber-300 border-amber-400/60 bg-amber-900/60',
      };
    } else if (scrollProgress < 0.9) {
      return {
        stage: 'SCENE 04 — VERIFICATION',
        detail: 'Bare Metal Surface Revealed',
        icon: ShieldCheck,
        badgeStyle: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60',
      };
    } else {
      return {
        stage: 'SCENE 05 — CLEAN RESULT',
        detail: 'AS 1851 Compliant Clean Duct',
        icon: CheckCircle2,
        badgeStyle: 'text-emerald-300 border-emerald-400/60 bg-emerald-900/60',
      };
    }
  };

  const stage = getStageInfo();
  const StageIcon = stage.icon;

  // Text fades slightly as user dives into deep 3D sequence
  const heroTextOpacity = Math.max(0, 1 - scrollProgress * 2.6);
  const heroTextTransform = `translateY(-${scrollProgress * 50}px)`;
  const telemetryOpacity = scrollProgress > 0.05 ? Math.min(1, (scrollProgress - 0.05) * 4) : 0;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-30 overflow-hidden">
      {/* ================= 1. MINIMAL TRANSPARENT NAVIGATION ================= */}
      <header className="w-full pointer-events-auto transition-colors duration-300">
        {/* Top utility contact ticker (Subtle & transparent) */}
        <div className="w-full bg-[#050D1A]/70 backdrop-blur-sm border-b border-white/5 py-1.5 px-4 sm:px-8 lg:px-14 hidden md:flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Western Australia • Commercial Kitchen Hygiene & Robotic Exhaust Cleaning
            </span>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <a
              href={brandConfig.contact.phoneHref}
              className="flex items-center gap-1.5 text-white hover:text-amber-300 font-semibold transition"
            >
              <Phone className="w-3 h-3 text-amber-400" /> {brandConfig.contact.phone}
            </a>
            <span className="text-slate-400">{brandConfig.contact.operatingHours}</span>
          </div>
        </div>

        {/* Main Transparent Navbar */}
        <div className="w-full px-4 sm:px-8 lg:px-14 py-3 sm:py-4 flex items-center justify-between bg-gradient-to-b from-[#050D1A]/95 via-[#050D1A]/60 to-transparent">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base sm:text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              GX
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-300 transition-colors leading-none">
                GRADE <span className="text-amber-400">X</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-300 font-semibold mt-0.5">
                Commercial Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10">
            {mainNavigation.filter((item) => !item.isCta).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-amber-300 bg-amber-400/15 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs for Tablet/Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={brandConfig.contact.phoneHref}
              className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-amber-300 font-semibold px-3 py-2 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-700/60 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{brandConfig.contact.phone}</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
            >
              <span>Request a Quote</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Actions: Call, Quote button & Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={brandConfig.contact.phoneHref}
              className="w-10 h-10 rounded-xl bg-slate-900/80 text-amber-400 border border-amber-400/30 flex items-center justify-center active:scale-95 transition"
              aria-label="Call Grade X"
            >
              <Phone className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 active:scale-95 transition"
            >
              Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl text-slate-200 bg-slate-900/80 border border-slate-700/60 flex items-center justify-center cursor-pointer active:scale-95 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A192F]/98 backdrop-blur-2xl border-b border-amber-500/20 px-4 sm:px-6 py-4 space-y-2 shadow-2xl animate-in fade-in duration-200">
            <div className="py-2 border-b border-slate-800 text-xs text-slate-300 flex flex-col gap-1">
              <span className="text-amber-400 font-bold">{brandConfig.companyName}</span>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{brandConfig.contact.address.suburb}, {brandConfig.contact.address.state}</span>
                <a href={brandConfig.contact.phoneHref} className="text-amber-300 font-bold flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {brandConfig.contact.phone}
                </a>
              </div>
            </div>
            {mainNavigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-xs font-medium transition min-h-[42px] flex items-center ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30'
                      : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-slate-800">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/20 active:scale-98 transition"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ================= 2. HERO TYPOGRAPHY & CTA (LEFT 8-10%) ================= */}
      <div className="w-full px-4 sm:px-8 lg:px-16 my-auto">
        <div
          style={{
            opacity: heroTextOpacity,
            transform: heroTextTransform,
          }}
          className="max-w-xl space-y-4 sm:space-y-6 text-left pointer-events-auto transition-opacity duration-200"
        >
          {/* Location / Tech Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-amber-400/30 text-[10px] sm:text-[11px] font-semibold text-amber-300 max-w-full">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="truncate">COMMERCIAL SOLUTIONS • WESTERN AUSTRALIA</span>
          </div>

          {/* Big Hero Heading with Fluid clamp Typography */}
          <div className="space-y-0.5 sm:space-y-1">
            <h1
              style={{ fontSize: 'clamp(2.4rem, 8.5vw, 4.8rem)' }}
              className="font-black text-white tracking-tight uppercase leading-[0.92] drop-shadow-2xl"
            >
              Precision.
            </h1>
            <h1
              style={{ fontSize: 'clamp(2.4rem, 8.5vw, 4.8rem)' }}
              className="font-black gold-gradient-text tracking-tight uppercase leading-[0.92] drop-shadow-2xl"
            >
              Technology.
            </h1>
            <h1
              style={{ fontSize: 'clamp(2.4rem, 8.5vw, 4.8rem)' }}
              className="font-black text-slate-200 tracking-tight uppercase leading-[0.92] drop-shadow-2xl"
            >
              Compliance.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal max-w-lg drop-shadow-md">
            Advanced robotic crawlers, digital grease measurement, and certified AS 1851 reporting for commercial kitchen exhaust systems.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 min-h-[44px] rounded-xl font-bold text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 min-h-[44px] rounded-xl font-semibold text-xs tracking-wider uppercase text-slate-200 bg-slate-950/70 hover:bg-slate-900/90 backdrop-blur-md border border-slate-700/70 hover:border-amber-400/50 transition-all duration-200 cursor-pointer active:scale-[0.98] text-center"
            >
              <span>EXPLORE TECHNOLOGY</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3. BOTTOM TELEMETRY & SCROLL INDICATOR ================= */}
      <div className="w-full px-4 sm:px-8 lg:px-16 pb-6 sm:pb-8 flex items-end justify-between pointer-events-auto gap-3">
        {/* Scroll Indicator */}
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2.5 sm:gap-3 text-xs tracking-widest uppercase font-mono text-slate-300 hover:text-amber-300 transition-colors group cursor-pointer shrink-0"
        >
          <div className="w-4 h-8 sm:w-5 sm:h-9 rounded-full border border-slate-600 group-hover:border-amber-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
          </div>
          <span className="font-semibold text-[10px] sm:text-[11px] hidden xs:inline">SCROLL TO EXPLORE</span>
        </button>

        {/* Dynamic Story Stage Badge (Updates with scroll) */}
        <div
          style={{ opacity: telemetryOpacity }}
          className="flex items-center gap-2 sm:gap-3 transition-opacity duration-300 font-mono text-xs max-w-[75%]"
        >
          <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-2xl text-[10px] sm:text-xs truncate ${stage.badgeStyle}`}>
            <StageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="font-bold truncate">{stage.stage}</span>
            <span className="hidden md:inline opacity-70">| {stage.detail}</span>
          </div>

          {/* Progress Percent */}
          <span className="text-amber-400 font-bold text-[11px] sm:text-xs shrink-0">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeroOverlay;
