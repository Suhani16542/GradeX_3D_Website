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
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-30">
      {/* ================= 1. MINIMAL TRANSPARENT NAVIGATION ================= */}
      <header className="w-full pointer-events-auto transition-colors duration-300">
        {/* Top utility contact ticker (Subtle & transparent) */}
        <div className="w-full bg-[#050D1A]/60 backdrop-blur-sm border-b border-white/5 py-1.5 px-6 sm:px-10 hidden md:flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Western Australia • Commercial Kitchen Hygiene & Robotic Exhaust Cleaning
            </span>
          </div>
          <div className="flex items-center gap-5">
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
        <div className="w-full px-6 sm:px-10 lg:px-14 py-4 flex items-center justify-between bg-gradient-to-b from-[#050D1A]/90 via-[#050D1A]/50 to-transparent">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              GX
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-amber-300 transition-colors leading-none">
                GRADE <span className="text-amber-400">X</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-300 font-semibold mt-0.5">
                Commercial Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10">
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

          {/* Action CTAs */}
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-200 bg-slate-900/70 border border-slate-700/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A192F]/95 backdrop-blur-xl border-b border-amber-500/20 px-6 py-4 space-y-2">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-slate-800">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ================= 2. HERO TYPOGRAPHY & CTA (LEFT 8-10%) ================= */}
      <div className="w-full px-6 sm:px-10 lg:px-16 my-auto">
        <div
          style={{
            opacity: heroTextOpacity,
            transform: heroTextTransform,
          }}
          className="max-w-xl space-y-6 text-left pointer-events-auto transition-opacity duration-200"
        >
          {/* Location / Tech Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-amber-400/30 text-[11px] font-semibold text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>COMMERCIAL SOLUTIONS • WESTERN AUSTRALIA</span>
          </div>

          {/* Big Hero Heading */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.92] drop-shadow-2xl">
              Precision.
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black gold-gradient-text tracking-tight uppercase leading-[0.92] drop-shadow-2xl">
              Technology.
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-200 tracking-tight uppercase leading-[0.92] drop-shadow-2xl">
              Compliance.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-lg drop-shadow-md">
            Advanced equipment and proven methodology for professional commercial kitchen exhaust cleaning.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase text-slate-200 bg-slate-950/60 hover:bg-slate-900/90 backdrop-blur-md border border-slate-700/70 hover:border-amber-400/50 transition-all duration-200 cursor-pointer"
            >
              <span>EXPLORE TECHNOLOGY</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3. BOTTOM TELEMETRY & SCROLL INDICATOR ================= */}
      <div className="w-full px-6 sm:px-10 lg:px-16 pb-8 flex items-end justify-between pointer-events-auto">
        {/* Scroll Indicator */}
        <button
          onClick={onExploreClick}
          className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-slate-300 hover:text-amber-300 transition-colors group cursor-pointer"
        >
          <div className="w-5 h-9 rounded-full border border-slate-600 group-hover:border-amber-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
          </div>
          <span className="font-semibold text-[11px]">SCROLL TO EXPLORE</span>
        </button>

        {/* Dynamic Story Stage Badge (Updates with scroll) */}
        <div
          style={{ opacity: telemetryOpacity }}
          className="flex items-center gap-3 transition-opacity duration-300 font-mono text-xs"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-2xl ${stage.badgeStyle}`}>
            <StageIcon className="w-3.5 h-3.5" />
            <span className="font-bold">{stage.stage}</span>
            <span className="hidden sm:inline opacity-70">| {stage.detail}</span>
          </div>

          {/* Progress Percent */}
          <span className="text-amber-400 font-bold hidden sm:inline">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeroOverlay;
