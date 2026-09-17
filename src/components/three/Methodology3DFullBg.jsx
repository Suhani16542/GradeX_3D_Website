import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Full-Bleed 3D Technical Pipeline & Flow Conduit Background for Section 5 (Methodology)
 * Inspired by Three.js WebGL procedural curves, spline pipelines, and particle waves:
 * - 3D Golden Spiraling Conduit Spline with glowing energy rings for each of the 8 steps
 * - Floating technical geometric nodes & inspection beacons
 * - Interactive wave displacement influenced by scroll progress & mouse movement
 * - Volumetric depth with ambient cyan & gold glow particles
 */
function PipelineConduitScene({ scrollProgress = 0, mouseRef, activeStep = 0 }) {
  const groupRef = useRef();
  const splineMeshRef = useRef();
  const ringsGroupRef = useRef();
  const particlesRef = useRef();
  const currentMouse = useRef({ x: 0, y: 0 });

  // 1. Generate 3D Serpentine Spline Path (Framing the upper 8-step methodology grid)
  const { curve, tubeGeom, stationNodes } = useMemo(() => {
    const points = [
      new THREE.Vector3(-6.2, 3.8, -2.5),   // Step 1
      new THREE.Vector3(-2.2, 3.2, -1.2),   // Step 2
      new THREE.Vector3(1.8, 2.6, -0.8),    // Step 3
      new THREE.Vector3(5.8, 1.8, -2.0),    // Step 4
      new THREE.Vector3(4.8, 0.4, -1.0),    // Step 5
      new THREE.Vector3(1.2, -0.2, -0.5),   // Step 6
      new THREE.Vector3(-2.4, -0.6, -1.2),  // Step 7
      new THREE.Vector3(-6.2, -1.2, -2.5),  // Step 8
    ];

    const spline = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);
    const geom = new THREE.TubeGeometry(spline, 160, 0.045, 12, false);

    return { curve: spline, tubeGeom: geom, stationNodes: points };
  }, []);

  // 2. Ambient Particles & Data Streams across entire section
  const { positions, colors, sizes } = useMemo(() => {
    const pCount = 800;
    const pos = new Float32Array(pCount * 3);
    const col = new Float32Array(pCount * 3);
    const siz = new Float32Array(pCount);

    const gold = new THREE.Color('#D4AF37');
    const amber = new THREE.Color('#F59E0B');
    const cyan = new THREE.Color('#38BDF8');
    const teal = new THREE.Color('#10B981');

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 32;
      pos[i3 + 1] = (Math.random() - 0.5) * 24;
      pos[i3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const r = Math.random();
      const c = r < 0.35 ? gold : r < 0.6 ? cyan : r < 0.8 ? teal : amber;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;

      siz[i] = Math.random() * 2.0 + 1.0;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  // Frame Loop: Smooth mouse parallax, traveling energy wave, and step node pulsing
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Damped mouse interpolation
    const targetX = (mouseRef.current.x || 0) * 2.5;
    const targetY = (mouseRef.current.y || 0) * 1.8;
    currentMouse.current.x = THREE.MathUtils.damp(currentMouse.current.x, targetX, 2.5, delta);
    currentMouse.current.y = THREE.MathUtils.damp(currentMouse.current.y, targetY, 2.5, delta);

    const mx = currentMouse.current.x;
    const my = currentMouse.current.y;

    if (groupRef.current) {
      // Perspective rotation linked to scroll & mouse
      const targetRotX = 0.18 - scrollProgress * 0.12 + my * 0.02;
      const targetRotY = -0.08 + scrollProgress * 0.15 + mx * 0.02;
      const targetZ = -0.4 + scrollProgress * 1.2;

      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 2.5, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 2.5, delta);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 2.5, delta);
    }

    // Rotating step station rings
    if (ringsGroupRef.current) {
      ringsGroupRef.current.children.forEach((child, idx) => {
        child.rotation.z = t * (0.6 + idx * 0.1);
        child.rotation.x = Math.sin(t * 1.2 + idx) * 0.2;
      });
    }

    // Ambient floating particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.015;
      particlesRef.current.rotation.x = Math.sin(t * 0.01) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.2, -1]}>
      {/* 1. Base Dark Titanium Conduit Tube */}
      <mesh geometry={tubeGeom}>
        <meshStandardMaterial
          color="#0A1628"
          metalness={0.92}
          roughness={0.25}
          emissive="#06101E"
        />
      </mesh>

      {/* 2. Illuminated Gold Energy Wireframe Spline */}
      <mesh ref={splineMeshRef} geometry={tubeGeom}>
        <meshBasicMaterial
          color="#D4AF37"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 3. 8 Illuminated Step Station Nodes & Concentric Data Rings */}
      <group ref={ringsGroupRef}>
        {stationNodes.map((nodePos, idx) => {
          const isActive = idx === activeStep;
          const isPassed = idx < activeStep;

          return (
            <group key={idx} position={nodePos}>
              {/* Outer Energy Ring */}
              <mesh scale={isActive ? [1.4, 1.4, 1.4] : [0.9, 0.9, 0.9]}>
                <torusGeometry args={[0.38, 0.018, 16, 32]} />
                <meshBasicMaterial
                  color={isActive ? '#F59E0B' : isPassed ? '#10B981' : '#38BDF8'}
                  transparent
                  opacity={isActive ? 0.9 : 0.35}
                />
              </mesh>

              {/* Inner Orbiting Ring */}
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.26, 0.012, 12, 24]} />
                <meshBasicMaterial
                  color={isActive ? '#FDE047' : '#D4AF37'}
                  transparent
                  opacity={isActive ? 0.8 : 0.25}
                />
              </mesh>

              {/* Central Glowing Energy Core */}
              <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial
                  color={isActive ? '#FDE047' : isPassed ? '#34D399' : '#00F0FF'}
                />
              </mesh>

              {/* Dynamic Point Light on Active Station */}
              {isActive && (
                <pointLight intensity={2.5} distance={3.0} color="#F59E0B" />
              )}
            </group>
          );
        })}
      </group>

      {/* 4. Ambient High-Tech Floating Particle Dust */}
      <points ref={particlesRef}>
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
          size={0.08}
          vertexColors
          transparent
          opacity={0.45}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

import { useResponsive } from '../../hooks/useResponsive';

/**
 * Methodology3DFullBg Component
 * Full-bleed WebGL 3D Background for Section 5
 */
export function Methodology3DFullBg({ scrollProgress = 0, mouse, activeStep = 0 }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const { isMobile } = useResponsive();

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#020610] via-[#040C18] to-[#02050B]">
      {/* Soft Regional Atmospheric Glows */}
      <div className="absolute top-1/6 left-1/4 w-[300px] sm:w-[600px] h-[250px] sm:h-[400px] bg-amber-500/10 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[300px] sm:w-[600px] h-[250px] sm:h-[400px] bg-emerald-500/10 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none" />

      {/* Subtle Coordinate Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '54px 54px',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 8.2], fov: isMobile ? 55 : 48 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      >
        <ambientLight intensity={0.65} color="#0B1C33" />
        <directionalLight position={[6, 8, 6]} intensity={1.7} color="#FFFFFF" />
        <directionalLight position={[-6, -4, 4]} intensity={1.2} color="#D4AF37" />

        <React.Suspense fallback={null}>
          <PipelineConduitScene
            scrollProgress={scrollProgress}
            mouseRef={mouseRef}
            activeStep={activeStep}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default Methodology3DFullBg;
