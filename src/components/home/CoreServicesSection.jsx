import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { commercialServices, serviceCategories } from '../../data/servicesData';
import {
  Flame,
  Cpu,
  Layers,
  Sparkles,
  Utensils,
  FlameKindling,
  ShieldAlert,
  Snowflake,
  Activity,
  Waves,
  Maximize,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// Icon mapper helper
const iconMap = {
  Flame,
  Cpu,
  Layers,
  Sparkles,
  Utensils,
  FlameKindling,
  ShieldAlert,
  Snowflake,
  Activity,
  Waves,
  Maximize,
  Building2
};

/**
 * 3. Core Services Section
 * Categorized presentation of all 12 commercial kitchen hygiene & facility cleaning services.
 */
export function CoreServicesSection() {
  const [activeCategory, setActiveCategory] = useState("All Services");

  const filteredServices = activeCategory === "All Services"
    ? commercialServices
    : commercialServices.filter(s => s.category === activeCategory);

  return (
    <Section
      id="core-services"
      badge="Specialized Commercial Capabilities"
      title="Commercial Kitchen & Facility Cleaning Solutions"
      subtitle="From high-risk kitchen exhaust systems and robotic duct restoration to deep equipment sanitization and commercial facility maintenance."
      padding="lg"
      className="bg-[#0A192F]/40 border-b border-slate-800/80"
    >
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {serviceCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredServices.map((service) => {
          const IconComponent = iconMap[service.iconName] || Layers;
          return (
            <div
              key={service.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-400/20 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                    {service.category.split('&')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="space-y-1.5 mb-6 border-t border-slate-800/80 pt-4">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                to="/contact"
                variant="outline"
                size="sm"
                icon={ArrowRight}
                className="w-full justify-between group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-colors"
              >
                Request Scope / Quote
              </Button>
            </div>
          );
        })}
      </div>

      {/* Bottom Action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button to="/services" variant="gold" size="lg" icon={ArrowRight}>
          View All Services & Scopes
        </Button>
        <Button to="/contact" variant="navy" size="lg">
          Custom Multi-Site Tender
        </Button>
      </div>
    </Section>
  );
}
