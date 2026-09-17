import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { HeroSection } from '../components/home/HeroSection';
import { RoboticTechnologySection } from '../components/home/RoboticTechnologySection';
import { CoreServicesSection } from '../components/home/CoreServicesSection';
import { DigitalEvidenceSection } from '../components/home/DigitalEvidenceSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { CaseStudiesSection } from '../components/home/CaseStudiesSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

/**
 * Grade X Commercial Solutions Pty Ltd - Complete Animated 6-Section Homepage
 * 1. SECTION 1 — Full-Screen Immersive 3D Commercial Exhaust Duct Cleaning Hero
 * 2. SECTION 2 — Technology / Robotic Cleaning (3D Interactive Model + 3 Feature Cards)
 * 3. SECTION 3 — Services (6 Animated Service Cards with 3D Tilt & Micro-Interactions)
 * 4. SECTION 4 — Digital Evidence & Compliance (Interactive Before/After Wipe & 4 Evidence Cards)
 * 5. SECTION 5 — Methodology / How We Work (8-Step Sequential Process Timeline)
 * 6. SECTION 6 — Case Studies & Final Action CTA (Demonstrated Results + High-Impact Quote CTA)
 */
export function HomePage() {
  return (
    <>
      <PageMeta
        title="Precision. Technology. Compliance. | Robotic Kitchen Exhaust Cleaning WA"
        description="Grade X Commercial Solutions Pty Ltd: Precision commercial cleaning, robotic kitchen exhaust duct cleaning, and verified AS 1851 digital reporting across Perth and Western Australia."
      />

      {/* SECTION 1 — Full-Screen 3D Duct Cleaning Hero */}
      <HeroSection />

      {/* SECTION 2 — Technology / Robotic Cleaning */}
      <RoboticTechnologySection />

      {/* SECTION 3 — Services (6 Specialized Cards) */}
      <CoreServicesSection />

      {/* SECTION 4 — Digital Evidence & Compliance */}
      <DigitalEvidenceSection />

      {/* SECTION 5 — Methodology / How We Work (8-Step Timeline) */}
      <MethodologySection />

      {/* SECTION 6 — Case Studies & Final CTA */}
      <CaseStudiesSection />
      <FinalCtaSection />
    </>
  );
}

export default HomePage;
