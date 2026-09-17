import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brandConfig } from '../../data/brandConfig';
import { mainNavigation } from '../../data/navigationData';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Menu, X, Phone, ShieldCheck, ChevronRight, Cpu } from 'lucide-react';

/**
 * Header component with Western Australia contact indicators and navigation
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050D1A]/95 backdrop-blur-md border-b border-amber-500/20 transition-all">
      {/* Top utility bar */}
      <div className="bg-[#0A192F] border-b border-white/5 py-1.5 hidden md:block text-xs text-slate-300">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Western Australia • Commercial Kitchen Hygiene & Robotic Exhaust Cleaning
            </span>
            <span className="text-slate-400">Balga, WA</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={brandConfig.contact.phoneHref}
              className="flex items-center gap-1.5 text-white hover:text-amber-300 font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" /> {brandConfig.contact.phone}
            </a>
            <span className="text-slate-400 text-[11px]">{brandConfig.contact.operatingHours}</span>
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <Container className="flex items-center justify-between h-20">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            GX
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white group-hover:text-amber-300 transition-colors leading-tight">
              GRADE <span className="text-amber-400">X</span>
            </span>
            <span className="text-[9.5px] uppercase tracking-wider text-slate-300 font-semibold leading-tight">
              Commercial Solutions Pty Ltd
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {mainNavigation.filter(item => !item.isCta).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-amber-300 bg-amber-400/10 font-semibold border border-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={brandConfig.contact.phoneHref}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 font-semibold px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{brandConfig.contact.phone}</span>
          </a>
          <Button to="/contact" size="sm" variant="gold" icon={ChevronRight}>
            Get a Quote
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={brandConfig.contact.phoneHref}
            className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 border border-amber-400/30 flex items-center justify-center min-w-[40px] min-h-[40px] touch-target-safe"
            aria-label="Call Grade X"
          >
            <Phone className="w-4 h-4" />
          </a>
          <Button to="/contact" size="sm" variant="gold" className="px-3 py-2 text-xs min-h-[40px] flex items-center touch-target-safe">
            Quote
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700/60 flex items-center justify-center transition cursor-pointer min-w-[40px] min-h-[40px] touch-target-safe"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-1.5 max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="py-2.5 mb-2 border-b border-slate-800 text-xs text-slate-300 flex flex-col gap-1">
            <span className="text-amber-400 font-semibold">{brandConfig.companyName} (WA)</span>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{brandConfig.contact.address.suburb}, {brandConfig.contact.address.state}</span>
              <a href={brandConfig.contact.phoneHref} className="text-amber-300 font-bold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {brandConfig.contact.phone}
              </a>
            </div>
          </div>
          {mainNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-xs font-medium transition min-h-[44px] ${
                  isActive
                    ? 'bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/30'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
