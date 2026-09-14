import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { brandConfig } from '../data/brandConfig';

export function TermsConditionsPage() {
  return (
    <>
      <PageMeta
        title="Terms & Conditions"
        description="Terms and conditions for commercial services and website usage with Grade X Commercial Solutions."
      />
      <Section
        badge="Legal & Governance"
        title="Terms & Conditions"
        subtitle={`Last updated: September 2024 • ${brandConfig.companyName}`}
        containerSize="narrow"
        padding="lg"
      >
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-slate-300 text-sm space-y-6 leading-relaxed">
          <p>
            Welcome to the official website of {brandConfig.companyName}. By accessing this site or engaging our services, you agree to comply with and be bound by the following terms.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">1. Service Quotations & Agreements</h3>
          <p>
            All quotations provided through this website or directly by representatives are subject to formal site inspection and scope-of-work sign-off via a master commercial service agreement.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">2. Work Health & Safety (WHS)</h3>
          <p>
            Client premises must provide safe access, compliant utility connections (water, power), and disclosure of any hazardous substances prior to service commencement.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">3. Intellectual Property</h3>
          <p>
            All branding, digital designs, documentation frameworks, and reporting systems are the exclusive intellectual property of {brandConfig.companyName}.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">4. Governing Law</h3>
          <p>
            These terms are governed by and construed in accordance with the laws of Australia and the state in which operations are executed.
          </p>
        </div>
      </Section>
    </>
  );
}
