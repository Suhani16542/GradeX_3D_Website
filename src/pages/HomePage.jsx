import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { HeroSection } from '../components/home/HeroSection';
import { CompanyIntroSection } from '../components/home/CompanyIntroSection';
import { RoboticTechnologySection } from '../components/home/RoboticTechnologySection';
import { HowRobotWorksSection } from '../components/home/HowRobotWorksSection';
import { BeforeAfterEvidenceSection } from '../components/home/BeforeAfterEvidenceSection';
import { DigitalEvidenceSection } from '../components/home/DigitalEvidenceSection';
import { ComplianceWhsSection } from '../components/home/ComplianceWhsSection';
import { CoreServicesSection } from '../components/home/CoreServicesSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { CaseStudiesSection } from '../components/home/CaseStudiesSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

/**
 * Grade X Commercial Solutions Pty Ltd - Redesigned Homepage
 * High-end, interactive, cinematic commercial cleaning & robotic kitchen exhaust website.
 */
export function HomePage() {
  return (
    <>
      <PageMeta
        title="Precision. Technology. Compliance. | Robotic Kitchen Exhaust Cleaning WA"
        description="Grade X Commercial Solutions Pty Ltd: Precision commercial cleaning, robotic kitchen exhaust duct cleaning, and verified AS 1851 digital reporting across Perth and Western Australia."
      />

      {/* 1. Premium Hero with 3D Commercial Kitchen & Robotic Scrubber */}
      <HeroSection />

      {/* 2. Company Introduction */}
      <CompanyIntroSection />

      {/* 3. Robotic Exhaust Cleaning Technology (with 3D Internal Duct Scrubber) */}
      <RoboticTechnologySection />

      {/* 4. How The Robot Works (4-Stage Technological Mechanism) */}
      <HowRobotWorksSection />

      {/* 5. Before and After Cleaning Evidence (Interactive Split Slider) */}
      <BeforeAfterEvidenceSection />

      {/* 6. Digital Evidence & Reporting (with 3D Digital Compliance Tablet) */}
      <DigitalEvidenceSection />

      {/* 7. Compliance & WHS Standards */}
      <ComplianceWhsSection />

      {/* 8. Core Commercial Cleaning Services (12 Categorized Services) */}
      <CoreServicesSection />

      {/* 9. Industries We Serve */}
      <IndustriesSection />

      {/* 10. 8-Step Cleaning Methodology */}
      <MethodologySection />

      {/* 11. Case Studies & Client Feedback */}
      <CaseStudiesSection />

      {/* 12. Final Get a Quote CTA */}
      <FinalCtaSection />
    </>
  );
}

export default HomePage;
