import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { brandConfig } from '../data/brandConfig';

export function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description="Privacy policy and data protection framework for Grade X Commercial Solutions."
      />
      <Section
        badge="Legal & Governance"
        title="Privacy Policy"
        subtitle={`Last updated: September 2024 • ${brandConfig.companyName}`}
        containerSize="narrow"
        padding="lg"
      >
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-slate-300 text-sm space-y-6 leading-relaxed">
          <p>
            At {brandConfig.companyName} (ABN: {brandConfig.abn}), we respect the privacy of our clients, prospective partners, and website visitors. This Privacy Policy sets out how we collect, use, and protect your information.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">1. Information Collection</h3>
          <p>
            We collect personal information necessary to deliver commercial facility quotes, execute service agreements, and provide ongoing shift communication. This includes your name, business email, telephone number, business address, and site specifications.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">2. Use of Information</h3>
          <p>
            Collected details are used exclusively for conducting site walk-throughs, issuing commercial quotations, coordinating shift staff, issuing digital evidence reports, and complying with Australian legal and safety obligations.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">3. Data Security</h3>
          <p>
            We take reasonable technical and administrative precautions to safeguard commercial information and operational logs from unauthorized access, loss, or disclosure.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">4. Inquiries & Contact</h3>
          <p>
            For any questions regarding our privacy practices, contact our privacy officer at <a href={brandConfig.contact.emailHref} className="text-amber-400 underline">{brandConfig.contact.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
