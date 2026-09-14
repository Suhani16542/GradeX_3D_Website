import React, { useState } from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does Grade X track and verify cleaning shifts?",
      a: "We utilize digital timestamping, GPS-verified attendance, and photographic shift reports that are made directly accessible to facility managers upon completion."
    },
    {
      q: "What Work Health and Safety (WHS) documentation is provided?",
      a: "Prior to commencement, we furnish full Safe Work Method Statements (SWMS), site-specific risk assessments, certificates of currency (public liability & workers compensation), and an active chemical SDS register."
    },
    {
      q: "Can cleaning schedules be tailored for after-hours or weekend operations?",
      a: "Yes. We offer fully flexible scheduling 24/7, including early morning, evening, overnight, and weekend maintenance to prevent disruption to your primary operations."
    },
    {
      q: "What types of commercial facilities do you service?",
      a: "Our core expertise encompasses corporate offices, commercial multi-tenant buildings, industrial warehouses, medical and clinical facilities, educational campuses, and construction handover sites."
    },
    {
      q: "How do I request a site inspection and quotation?",
      a: "You can submit an online request through our Contact / Quote form or speak with our commercial operations team directly. We will schedule a site walkthrough to assess your square footage and scope requirements."
    }
  ];

  return (
    <>
      <PageMeta
        title="Frequently Asked Questions"
        description="Find answers to common questions about Grade X Commercial Solutions, our service standards, and operational workflows."
      />
      <Section
        badge="Clarifications & Support"
        title="Frequently Asked Questions"
        subtitle="Clear answers regarding our commercial operations, verification protocols, and onboarding processes."
        padding="lg"
      >
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl border border-slate-800 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white text-sm sm:text-base hover:text-amber-300 transition cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 leading-relaxed pl-12">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400 mb-4">Have a specific question about your site?</p>
          <Button to="/contact" variant="gold">
            Ask Our Operations Team
          </Button>
        </div>
      </Section>
    </>
  );
}
