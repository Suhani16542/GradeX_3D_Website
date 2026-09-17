import React from 'react';
import { Hero3D } from '../three/Hero3D';

/**
 * Full-Viewport Immersive 3D Hero Section
 * Pinned Three.js commercial exhaust duct sequence with GSAP ScrollTrigger
 */
export function HeroSection() {
  return (
    <section id="hero-section" className="relative w-full overflow-hidden">
      <Hero3D />
    </section>
  );
}

export default HeroSection;
