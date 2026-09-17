import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * 3D Luxury Kinetic Horizon Wave & Constellation Lattice for Footer
 * Features:
 * - 3D Undulating Multi-Frequency Particle Wave Grid with dynamic height harmonics
 * - Connecting Technical Lattice Grid Lines
 * - Interactive Mouse Ripple Displacement & Parallax Tilt
 * - Golden, Amber & Cyan energy horizon glow
 */
function FooterWaveGrid({ mouse, isMobile }) {
  const pointsRef = useRef();
  const groupRef = useRef();
  const meshLatticeRef = useRef();

  // Grid dimensions (scaled for mobile performance)
  const rows = isMobile ? 28 : 40;
  const cols = isMobile ? 50 : 80;
  const count = rows * cols;

  const { positions, basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const basePos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color('#F59E0B');
    const amber = new THREE.Color('#D4AF37');
    const cyan = new THREE.Color('#38BDF8');
    const teal = new THREE.Color('#00F0FF');
    const darkNavy = new THREE.Color('#0E223D');

    let idx = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = (j - cols / 2) * (isMobile ? 0.6 : 0.44);
        const z = (i - rows / 2) * (isMobile ? 0.6 : 0.44);
        const y = 0;

        const i3 = idx * 3;
        pos[i3] = x;
        pos[i3 + 1] = y;
        pos[i3 + 2] = z;

        basePos[i3] = x;
        basePos[i3 + 1] = y;
        basePos[i3 + 2] = z;

        const distFromCenter = Math.sqrt(x * x + z * z);
        const r = Math.random();
        
        let c;
        if (distFromCenter < 8) {
          c = r < 0.6 ? gold : amber;
        } else if (distFromCenter < 16) {
          c = r < 0.5 ? amber : cyan;
        } else {
          c = r < 0.4 ? teal : darkNavy;
        }

        col[i3] = c.r;
        col[i3 + 1] = c.g;
        col[i3 + 2] = c.b;

        idx++;
      }
    }
    return { positions: pos, basePositions: basePos, colors: col };
  }, [count, rows, cols, isMobile]);

  // Floating Stardust Particles
  const stardust = useMemo(() => {
    const dustCount = isMobile ? 140 : 280;
    const pos = new Float32Array(dustCount * 3);
    const col = new Float32Array(dustCount * 3);

    const gold = new THREE.Color('#FDE047');
    const cyan = new THREE.Color('#38BDF8');

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 38;
      pos[i3 + 1] = Math.random() * 10 - 3;
      pos[i3 + 2] = (Math.random() - 0.5) * 22;

      const c = Math.random() < 0.5 ? gold : cyan;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, colors: col, count: dustCount };
  }, [isMobile]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth Mouse Parallax Tilt
    if (groupRef.current) {
      const targetRotX = -0.42 + (mouse?.y || 0) * 0.1;
      const targetRotY = (mouse?.x || 0) * 0.12;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 2.0, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 2.0, delta);
    }

    // Dynamic wave elevation on points with interactive mouse ripple
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      const mx = (mouse?.x || 0) * 12;
      const mz = -(mouse?.y || 0) * 8;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const bz = basePositions[i3 + 2];

        // Multi-harmonic kinetic wave
        const wave1 = Math.sin(bx * 0.32 + t * 1.5) * 0.55;
        const wave2 = Math.cos(bz * 0.38 + t * 1.2) * 0.45;
        const wave3 = Math.sin((bx + bz) * 0.22 + t * 0.9) * 0.35;

        // Interactive mouse proximity wave disturbance
        const dx = bx - mx;
        const dz = bz - mz;
        const distSq = dx * dx + dz * dz;
        const mouseRipple = Math.exp(-distSq / 16) * Math.sin(Math.sqrt(distSq) * 2 - t * 4) * 0.6;

        arr[i3 + 1] = wave1 + wave2 + wave3 + mouseRipple;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.2, -3.5]}>
      {/* 1. Main Kinetic Wave Point Grid */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.09 : 0.08}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Floating Ambient Stardust */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stardust.count}
            array={stardust.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={stardust.count}
            array={stardust.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Footer3DScene Canvas Wrapper
 */
export function Footer3DScene({ mouse = { x: 0, y: 0 } }) {
  const { isMobile, isSmallMobile } = useResponsive();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#020610] via-[#040D1C] to-[#010307]">
      {/* Multi-Layer Volumetric Glows */}
      <div className="absolute -top-1/4 left-1/4 w-[750px] h-[400px] bg-amber-500/15 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[400px] bg-sky-500/12 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-emerald-500/8 blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle Coordinate Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <Canvas
        camera={{ position: [0, 2.2, isSmallMobile ? 8.5 : isMobile ? 8.0 : 7.5], fov: isSmallMobile ? 54 : 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      >
        <ambientLight intensity={0.6} color="#0B1C33" />
        <directionalLight position={[6, 8, 5]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-6, -4, 3]} intensity={1.2} color="#F59E0B" />

        <React.Suspense fallback={null}>
          <FooterWaveGrid mouse={mouse} isMobile={isMobile} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default Footer3DScene;
