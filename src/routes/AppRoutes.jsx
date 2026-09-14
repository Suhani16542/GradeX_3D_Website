import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Pages
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { TechnologyPage } from '../pages/TechnologyPage';
import { DigitalEvidencePage } from '../pages/DigitalEvidencePage';
import { ComplianceWhsPage } from '../pages/ComplianceWhsPage';
import { CaseStudiesPage } from '../pages/CaseStudiesPage';
import { ServiceAreasPage } from '../pages/ServiceAreasPage';
import { FaqPage } from '../pages/FaqPage';
import { ContactPage } from '../pages/ContactPage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { TermsConditionsPage } from '../pages/TermsConditionsPage';
import { BlogPage } from '../pages/BlogPage';
import { NotFoundPage } from '../pages/NotFoundPage';

/**
 * Main Application Routes Definition
 */
export function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#050D1A]"><LoadingSpinner size="lg" text="Loading Grade X..." /></div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="technology" element={<TechnologyPage />} />
          <Route path="digital-evidence-reporting" element={<DigitalEvidencePage />} />
          <Route path="compliance-whs" element={<ComplianceWhsPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="service-areas" element={<ServiceAreasPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-conditions" element={<TermsConditionsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
