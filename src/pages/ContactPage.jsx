import React, { useState } from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { brandConfig } from '../data/brandConfig';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    facilityType: 'Commercial Office',
    frequency: 'Daily',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder submit behavior (ready for API integration)
    setSubmitted(true);
  };

  return (
    <>
      <PageMeta
        title="Contact Us & Get a Commercial Quote"
        description="Request an obligation-free commercial cleaning quote or reach the Grade X Commercial Solutions operations team."
      />
      <Section
        badge="Direct Consultation"
        title="Request a Commercial Cleaning Quote"
        subtitle="Provide your facility details below or contact our operations desk directly to arrange a site walk-through."
        padding="lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Commercial Operations Desk
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <span className="block text-slate-400 text-xs">Direct Line</span>
                    <a href={brandConfig.contact.phoneHref} className="text-white font-semibold hover:text-amber-300 transition">
                      {brandConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <span className="block text-slate-400 text-xs">Tenders & Quotations</span>
                    <a href={`mailto:${brandConfig.contact.quoteEmail}`} className="text-white font-semibold hover:text-amber-300 transition">
                      {brandConfig.contact.quoteEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <span className="block text-slate-400 text-xs">Head Office</span>
                    <span className="text-slate-200">{brandConfig.contact.address.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <span className="block text-slate-400 text-xs">Availability</span>
                    <span className="text-slate-200">{brandConfig.contact.operatingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-amber-400/20 text-xs text-slate-300 space-y-2">
              <span className="text-amber-400 font-bold block">Enterprise Guarantee</span>
              <p>All quotes include a complete scope breakdown, WHS plan, insurance certificates, and assigned account supervisor.</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Proposal Request Received</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for contacting Grade X. Our commercial operations manager will review your facility specifications and reach out within 1 business day.
                  </p>
                  <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-2">Commercial Site Appraisal Request</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none transition"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Facility Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none transition"
                        placeholder="e.g. Apex Corporate Tower"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none transition"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contact Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none transition"
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Facility Type</label>
                      <select
                        value={formData.facilityType}
                        onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none transition"
                      >
                        <option>Commercial Office</option>
                        <option>Industrial Warehouse / Logistics</option>
                        <option>Medical / Healthcare Facility</option>
                        <option>Retail & Hospitality Venue</option>
                        <option>Post-Construction Site</option>
                        <option>Other Speciality Facility</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Desired Cleaning Frequency</label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none transition"
                      >
                        <option>Daily / 5-7 Days per Week</option>
                        <option>2-3 Times per Week</option>
                        <option>Weekly Maintenance</option>
                        <option>Fortnightly</option>
                        <option>One-Off Deep Clean / Handover</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Scope Notes & Specific Requirements</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none transition"
                      placeholder="Approximate square meterage, number of levels, specific floor types, or key timing constraints..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" icon={Send} className="w-full">
                    Submit Request for Proposal
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
