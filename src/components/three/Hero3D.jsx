import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExhaustScene } from './ExhaustScene';
import { HeroOverlay } from './HeroOverlay';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero3D Component
 * Complete Full-Screen 100vw x 100vh Three.js Hero Section:
 * - Edge-to-edge Three.js viewport
 * - GSAP ScrollTrigger 5-stage cinematic sequence
 * - Smooth mouse camera damping
 * - Minimal transparent HTML overlay (Navigation, Typography, CTAs, Telemetry)
 */
export function Hero3D() {
  const containerRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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

  // GSAP ScrollTrigger for pinned 100vh hero viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1500', // Exact pinned distance for 5-stage story scrubbing
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    window.scrollTo({ top: 2200, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050D1A] z-10"
    >
      {/* Fullscreen Three.js Canvas */}
      <Canvas
        shadows
        camera={{ position: [0.2, 0.45, -5.2], fov: 50, near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ExhaustScene
            progress={scrollProgress}
            mouse={mouse}
            robotZ={robotZ}
            isCleaning={isCleaning}
            isMoving={isMoving}
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
