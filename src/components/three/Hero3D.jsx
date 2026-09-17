import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExhaustScene } from './ExhaustScene';
import { HeroOverlay } from './HeroOverlay';

import { useResponsive } from '../../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero3D Component
 * Complete Full-Screen Three.js Hero Section:
 * - Edge-to-edge Three.js viewport with 100dvh / 100svh safe height
 * - Responsive GSAP ScrollTrigger 5-stage cinematic sequence
 * - Adaptive DPR and mobile camera framing
 * - Minimal transparent HTML overlay (Navigation, Typography, CTAs, Telemetry)
 */
export function Hero3D() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { isMobile, isSmallMobile } = useResponsive();

  // Robot forward travel along Z-axis (from Z = -3.5 to Z = +12.0)
  const robotZ = useMemo(() => -3.5 + scrollProgress * 15.5, [scrollProgress]);
  const isCleaning = scrollProgress >= 0.45;
  const isMoving = scrollProgress > 0.04 && scrollProgress < 0.98;

  // Normalized mouse coordinates (-1 to 1) for camera parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP ScrollTrigger for pinned hero viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: isMobile ? '+=1200' : '+=1500',
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleExploreClick = () => {
    const techSection = document.getElementById('technology');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[100svh] min-h-[100dvh] overflow-hidden bg-[#050D1A] z-10"
    >
      {/* Fullscreen Three.js Canvas */}
      <Canvas
        shadows={!isMobile}
        camera={{
          position: isMobile ? [0.0, 0.45, -5.6] : [0.2, 0.45, -5.2],
          fov: isMobile ? 56 : 50,
          near: 0.1,
          far: 60,
        }}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={isMobile ? [1, 1.25] : [1, 2]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ExhaustScene
            progress={scrollProgress}
            mouse={mouse}
            robotZ={robotZ}
            isCleaning={isCleaning}
            isMoving={isMoving}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>

      {/* Floating Minimalist Transparent HTML Overlay */}
      <HeroOverlay
        scrollProgress={scrollProgress}
        onExploreClick={handleExploreClick}
      />
    </div>
  );
}

export default Hero3D;
