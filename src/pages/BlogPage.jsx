import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export function BlogPage() {
  const articles = [
    {
      title: "Commercial Facility Infection Control: Standards & Protocols",
      category: "Facility Hygiene",
      date: "September 2024",
      summary: "An overview of key hygiene touchpoint schedules and hospital-grade sanitization in modern commercial offices."
    },
    {
      title: "Understanding Digital Evidence in Commercial Contract Management",
      category: "Quality Assurance",
      date: "August 2024",
      summary: "How photographic shift reporting and timestamped audits reduce disputes and increase accountability."
    },
    {
      title: "Essential WHS & SWMS Requirements for Industrial Cleaning Scopes",
      category: "Compliance & Safety",
      date: "August 2024",
      summary: "A practical breakdown of hazard identification, chemical registers, and safe work methods in warehouse facilities."
    }
  ];

  return (
    <>
      <PageMeta
        title="Industry Insights & Facility Management Blog"
        description="Latest articles, compliance updates, and commercial cleaning best practices from Grade X Commercial Solutions."
      />
      <Section
        badge="Knowledge & Best Practices"
        title="Industry Insights & Articles"
        subtitle="Practical guides and operational standards for facility managers, operations directors, and commercial property owners."
        padding="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-amber-400/40 transition">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="text-amber-400 font-semibold">{article.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">{article.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{article.summary}</p>
              </div>
              <Button to="/contact" variant="ghost" size="sm" icon={ArrowRight} className="p-0 text-amber-400 hover:text-amber-300">
                Read Full Insight
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button to="/contact" variant="gold">
            Subscribe for Facility Updates
          </Button>
        </div>
      </Section>
    </>
  );
}
