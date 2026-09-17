import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Interactive Particle Cloud System
 * Inspired by official Three.js webgl_interactive_points:
 * - Single BufferGeometry with thousands of points
 * - Grade X color palette (cyan, gold, bright blue, white/silver, deep indigo)
 * - Slow continuous ambient drift/rotation
 * - Damped mouse interaction (particles smoothly shift/react to mouse without jerky motion)
 * - Ultra-optimized: single geometry, single material, no runtime allocations
 */
function ParticleCloud({ mouseRef, count = 2000 }) {
  const pointsRef = useRef();
  const originalPositions = useRef();
  const currentMouse = useRef({ x: 0, y: 0 });

  // 1. Generate Particle Positions, Colors, and Base Coordinates
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const orig = new Float32Array(count * 3);

    // Color palette: Cyan, Signature Gold, Deep Blue, Pristine White
    const palette = [
      new THREE.Color('#38BDF8'), // Cyan / Sky Blue
      new THREE.Color('#00F0FF'), // Bright Aqua
      new THREE.Color('#D4AF37'), // Signature Gold
      new THREE.Color('#F59E0B'), // Amber
      new THREE.Color('#60A5FA'), // Soft Blue
      new THREE.Color('#E2E8F0'), // Silver White
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread evenly across wide 3D volume
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 12;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      orig[i3] = x;
      orig[i3 + 1] = y;
      orig[i3 + 2] = z;

      // Color selection with higher weight on gold & cyan
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = chosenColor.r;
      col[i3 + 1] = chosenColor.g;
      col[i3 + 2] = chosenColor.b;

      // Varied particle sizes
      siz[i] = Math.random() * 2.5 + 1.2;
    }

    originalPositions.current = orig;
    return { positions: pos, colors: col, sizes: siz };
  }, [count]);

  // 2. High-Performance Frame Loop
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const posArr = posAttr.array;
    const orig = originalPositions.current;

    // Smooth mouse lerp (damping)
    const targetX = (mouseRef.current.x || 0) * 8;
    const targetY = (mouseRef.current.y || 0) * 5;
    currentMouse.current.x = THREE.MathUtils.damp(currentMouse.current.x, targetX, 2.5, delta);
    currentMouse.current.y = THREE.MathUtils.damp(currentMouse.current.y, targetY, 2.5, delta);

    const mx = currentMouse.current.x;
    const my = currentMouse.current.y;

    // Slow ambient rotation of whole particle cloud
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.05;

    // Subtle wave & interactive reaction across particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = orig[i3];
      const oy = orig[i3 + 1];
      const oz = orig[i3 + 2];

      // Distance to mouse pointer in 3D projection
      const dx = ox - mx;
      const dy = oy - my;
      const distSq = dx * dx + dy * dy;

      // Gentle interactive displacement near mouse
      let pushX = 0;
      let pushY = 0;
      let pushZ = 0;

      if (distSq < 16) {
        const force = (1 - Math.sqrt(distSq) / 4) * 0.6;
        pushX = dx * force;
        pushY = dy * force;
        pushZ = force * 1.5;
      }

      // Harmonic sine wave ambient shimmer
      const wave = Math.sin(t * 0.8 + ox * 0.4 + oy * 0.3) * 0.08;

      posArr[i3] = ox + pushX + wave;
      posArr[i3 + 1] = oy + pushY + Math.cos(t * 0.7 + oz * 0.5) * 0.08;
      posArr[i3 + 2] = oz + pushZ;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

import { useResponsive } from '../../hooks/useResponsive';

/**
 * InteractiveParticleBackground Component
 * Full-bleed WebGL particle background for Section 3
 */
export function InteractiveParticleBackground({ mouse }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const { isMobile } = useResponsive();

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#030712] via-[#050D1A] to-[#030712]">
      {/* Deep Atmospheric Glow Gradients */}
      <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-sky-500/10 blur-[120px] sm:blur-[160px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-amber-500/10 blur-[120px] sm:blur-[160px] rounded-full" />

      <Canvas
        camera={{ position: [0, 0, 10], fov: isMobile ? 65 : 60 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      >
        <ParticleCloud mouseRef={mouseRef} count={isMobile ? 1200 : 2200} />
      </Canvas>
    </div>
  );
}

export default InteractiveParticleBackground;
