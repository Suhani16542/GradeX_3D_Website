import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { HeroSection } from '../components/home/HeroSection';
import { CompanyIntroSection } from '../components/home/CompanyIntroSection';
import { CoreServicesSection } from '../components/home/CoreServicesSection';
import { RoboticTechnologySection } from '../components/home/RoboticTechnologySection';
import { DigitalEvidenceSection } from '../components/home/DigitalEvidenceSection';
import { ComplianceWhsSection } from '../components/home/ComplianceWhsSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { CaseStudiesSection } from '../components/home/CaseStudiesSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

/**
 * Grade X Commercial Solutions Pty Ltd - Redesigned Homepage
 * Sequential 10-Section structure aligned with client requirements.
 */
export function HomePage() {
  return (
    <>
      <PageMeta
        title="Robotic Kitchen Exhaust Cleaning & Commercial Hygiene WA"
        description="Grade X Commercial Solutions Pty Ltd: Precision commercial cleaning, robotic kitchen exhaust duct cleaning, and verified AS 1851 digital reporting across Perth and Western Australia."
      />

      {/* 1. Premium Hero with 3D Robotic Kitchen Exhaust Visual */}
      <HeroSection />

      {/* 2. Company Introduction */}
      <CompanyIntroSection />

      {/* 3. Core Commercial Cleaning Services (12 Services Categorized with View All) */}
      <CoreServicesSection />

      {/* 4. Robotic Exhaust Cleaning Technology */}
      <RoboticTechnologySection />

      {/* 5. Digital Evidence & Reporting */}
      <DigitalEvidenceSection />

      {/* 6. Compliance & WHS */}
      <ComplianceWhsSection />

      {/* 7. Industries We Serve */}
      <IndustriesSection />

      {/* 8. 8-Step Cleaning Methodology */}
      <MethodologySection />

      {/* 9. Case Studies & Client Feedback Placeholders */}
      <CaseStudiesSection />

      {/* 10. Final Get a Quote CTA */}
      <FinalCtaSection />
    </>
  );
}

export default HomePage;
