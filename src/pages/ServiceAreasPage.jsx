import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { brandConfig } from '../data/brandConfig';
import { MapPin, CheckCircle } from 'lucide-react';

export function ServiceAreasPage() {
  const regions = [
    {
      region: "Central Business District (CBD)",
      description: "Corporate office towers, commercial suites, executive offices, and retail flagships."
    },
    {
      region: "Metropolitan Business Parks",
      description: "Multi-tenant office parks, tech hubs, and corporate campus developments."
    },
    {
      region: "Industrial & Logistics Corridors",
      description: "Distribution centers, manufacturing plants, freight terminals, and warehouses."
    },
    {
      region: "Medical & Health Precincts",
      description: "Hospitals, specialist medical suites, dental clinics, and pathology labs."
    }
  ];

  return (
    <>
      <PageMeta
        title="Service Areas"
        description="Explore the commercial and industrial service coverage areas supported by Grade X Commercial Solutions."
      />
      <Section
        badge="Coverage & Locations"
        title="Commercial Facility Service Coverage"
        subtitle="Providing consistent commercial cleaning coverage across key business precincts and industrial zones."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {regions.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>{item.region}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-amber-400/20 text-center max-w-xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-2">Check Availability for Your Location</h3>
          <p className="text-xs text-slate-300 mb-6">
            Contact our operations team to confirm servicing capabilities for your specific facility address.
          </p>
          <Button to="/contact" variant="gold">
            Confirm Location Coverage
          </Button>
        </div>
      </Section>
    </>
  );
}
