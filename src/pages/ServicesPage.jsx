import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { commercialServices } from '../data/servicesData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Commercial Cleaning Services"
        description="Comprehensive commercial, industrial, healthcare, and post-construction cleaning services tailored to facility requirements."
      />
      <Section
        badge="Commercial Solutions"
        title="Tailored Facility Cleaning Services"
        subtitle="Explore our specialized commercial cleaning capabilities engineered for high-standard workplace environments."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {commercialServices.map((service) => (
            <div
              key={service.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-3 inline-block">
                  {service.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">{service.shortDescription}</p>
                <ul className="space-y-1.5 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button to="/contact" variant="outline" size="sm" icon={ArrowRight}>
                Request Quote for Service
              </Button>
            </div>
          ))}
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-amber-400/20 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Need a Custom Commercial Scope?</h3>
          <p className="text-sm text-slate-300 mb-6">
            We develop customized maintenance schedules and scope-of-work specifications tailored to your facility footprint.
          </p>
          <Button to="/contact" variant="gold">
            Discuss Your Facility Requirements
          </Button>
        </div>
      </Section>
    </>
  );
}
