import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { HeroSection } from '../components/home/HeroSection';
import { RoboticTechnologySection } from '../components/home/RoboticTechnologySection';
import { CoreServicesSection } from '../components/home/CoreServicesSection';
import { DigitalEvidenceSection } from '../components/home/DigitalEvidenceSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

/**
 * Grade X Commercial Solutions Pty Ltd - Complete Animated Homepage Experience
 * 1. SECTION 1 — Full-Screen Immersive 3D Commercial Exhaust Duct Cleaning Hero
 * 2. SECTION 2 — Technology / Robotic Cleaning (3D Interactive Model + 3 Feature Cards)
 * 3. SECTION 3 — Services (Three.js Interactive Particle Field + 6 Service Cards)
 * 4. SECTION 4 — Digital Evidence & Proven Results (3D Duct Zoom Before/After Transition + 4 Evidence Cards)
 * 5. SECTION 5 — Our 8-Step Methodology & Compliance WHS (3D Process Path + Gold Triangle Scroll Indicator)
 * 6. SECTION 6 — Service Area & Final CTA (3D Western Australia / Perth Operations Map + Direct Contact)
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

      {/* SECTION 3 — Services (6 Specialized Cards with Particle Field) */}
      <CoreServicesSection />

      {/* SECTION 4 — Digital Evidence & Proven Results (3D Duct Zoom Transition) */}
      <DigitalEvidenceSection />

      {/* SECTION 5 — Our 8-Step Methodology & Compliance WHS */}
      <MethodologySection />

      {/* SECTION 6 — Service Area WA Map & Final Action CTA */}
      <FinalCtaSection />
    </>
  );
}

export default HomePage;
