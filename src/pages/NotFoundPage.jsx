import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="404 Page Not Found"
        description="The requested page could not be located on Grade X Commercial Solutions."
      />
      <Section padding="lg" className="min-h-[60vh] flex items-center">
        <div className="text-center max-w-lg mx-auto glass-panel p-10 rounded-2xl border border-slate-800 shadow-2xl">
          <span className="text-6xl font-extrabold gold-gradient-text block mb-4">404</span>
          <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
          <p className="text-sm text-slate-300 mb-8 leading-relaxed">
            The page you are seeking does not exist or has been relocated within the Grade X portal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button to="/" variant="gold" icon={Home}>
              Return to Home
            </Button>
            <Button to="/services" variant="secondary">
              Browse Services
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
