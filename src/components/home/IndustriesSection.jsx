import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import {
  UtensilsCrossed,
  Building,
  Store,
  Hotel,
  Shield,
  Layers,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

/**
 * 7. Industries We Serve Section
 * Dynamic multi-sector display tailored for QSRs, Restaurant Groups, Hotels, and Facility Managers.
 */
export function IndustriesSection() {
  const [activeSector, setActiveSector] = useState(0);

  const industries = [
    {
      id: "qsr",
      icon: UtensilsCrossed,
      title: "QSR & Quick-Service Franchises",
      badge: "High-Volume Turnaround",
      summary: "High-intensity continuous cooking environments require strict adherence to grease canopy cleaning cycles and fryer vat boil-outs without interrupting peak service hours.",
      keyNeeds: [
        "Rapid overnight turnaround before morning trade",
        "Fryer boil-out and flat-top grill restoration",
        "Consistent documentation across multiple franchise stores",
        "Grease filter exchange and soak tank programs"
      ]
    },
    {
      id: "restaurants",
      icon: Store,
      title: "Multi-Site Restaurant Groups",
      badge: "Group Compliance",
      summary: "Centralized cleaning management for hospitality groups operating multiple restaurant concepts across Western Australia with unified compliance reporting.",
      keyNeeds: [
        "Consolidated invoicing and single-point operations contact",
        "Standardized quality checklists across all venues",
        "Digital compliance records accessible to group directors",
        "Customized periodic deep kitchen sanitization"
      ]
    },
    {
      id: "hospitality",
      icon: Hotel,
      title: "Hotels, Resorts & Licensed Clubs",
      badge: "Heavy Commercial Capacity",
      summary: "Complex multi-kitchen setups, large banqueting extraction canopies, and tall vertical exhaust risers needing robotic duct crawler access.",
      keyNeeds: [
        "Robotic crawler cleaning for multi-story duct risers",
        "Cool room anti-fungal detailing and coil cleaning",
        "Strict food hygiene compliance for health inspections",
        "Discreet, secure after-hours scheduling"
      ]
    },
    {
      id: "facility-managers",
      icon: Shield,
      title: "Facility Managers & Asset Owners",
      badge: "Fire Risk Mitigation",
      summary: "Commercial kitchen exhaust fire risk management under AS 1851 with verified photographic proof for insurance underwriters and body corporates.",
      keyNeeds: [
        "AS 1851 aligned cleaning certification",
        "Confined space and working at heights compliance",
        "Full contractor induction and SWMS readiness",
        "Zero disruption to building tenants"
      ]
    },
    {
      id: "shopping-centres",
      icon: Building,
      title: "Shopping Centres & Food Courts",
      badge: "Multi-Tenant Coordination",
      summary: "Managing shared exhaust headers and individual food court tenancy connections with coordinated out-of-hours cleaning schedules.",
      keyNeeds: [
        "Shared duct riser and extraction fan maintenance",
        "Coordination across multiple food court tenancies",
        "Hot pressure washing for loading docks and grease trap bays",
        "Environmental wastewater management"
      ]
    }
  ];

  const current = industries[activeSector];
  const CurrentIcon = current.icon;

  return (
    <Section
      id="industries"
      badge="Client Sectors & Applications"
      title="Tailored Commercial Kitchen Solutions for Every Sector"
      subtitle="Whether managing a single high-volume QSR franchise or a portfolio of commercial hospitality assets across Western Australia."
      padding="lg"
      className="bg-[#0A192F]/40 border-b border-slate-800/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Left Vertical Selector */}
        <div className="lg:col-span-5 space-y-2">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isActive = activeSector === idx;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveSector(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                  isActive
                    ? 'bg-[#0E2442] border-amber-400/50 shadow-lg shadow-amber-500/10'
                    : 'bg-[#050D1A]/70 hover:bg-[#0A192F] border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {ind.title}
                    </h4>
                    <span className="text-[10px] text-amber-400/90 uppercase font-mono">{ind.badge}</span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-400 translate-x-1' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Active Sector Deep Dive Panel */}
        <div className="lg:col-span-7 flex">
          <div className="glass-panel p-8 rounded-2xl border border-slate-700/80 w-full flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <CurrentIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                      Sector Focus
                    </span>
                    <h3 className="text-xl font-bold text-white">{current.title}</h3>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 hidden sm:inline-block">
                  {current.badge}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {current.summary}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200">
                  Critical Scope Requirements:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keyNeeds.map((need, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Tailored service schedules for Western Australia venues
              </span>
              <Button to="/contact" variant="gold" size="sm" icon={ArrowRight}>
                Get Sector Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
