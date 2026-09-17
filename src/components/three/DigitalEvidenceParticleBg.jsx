import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dynamic Technical Particle Field for Section 4
 * Reference: Three.js webgl_points_dynamic
 * Features:
 * - Dynamic harmonic wave displacement across points
 * - Faint geometric telemetry connection lines
 * - Grade X signature cyan (#38BDF8), gold (#D4AF37), and soft silver points
 * - Subtle mouse parallax with smooth damping
 * - Highly optimized: single geometry, single material, no runtime object allocations
 */
function DynamicPointTelemetry({ mouseRef, count = 1500 }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const originalPos = useRef();
  const currentMouse = useRef({ x: 0, y: 0 });

  // 1. Generate Points Coordinates & Colors
  const { positions, colors, origPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    const colorCyan = new THREE.Color('#38BDF8');
    const colorGold = new THREE.Color('#D4AF37');
    const colorTeal = new THREE.Color('#00F0FF');
    const colorSilver = new THREE.Color('#94A3B8');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Coordinate volume
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 10 - 2;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      orig[i3] = x;
      orig[i3 + 1] = y;
      orig[i3 + 2] = z;

      // Color distribution (mostly cyan and soft silver with golden spark accents)
      const rand = Math.random();
      let c = colorSilver;
      if (rand < 0.35) c = colorCyan;
      else if (rand < 0.55) c = colorTeal;
      else if (rand < 0.75) c = colorGold;

      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    originalPos.current = orig;
    return { positions: pos, colors: col, origPositions: orig };
  }, [count]);

  // 2. Telemetry Connector Line Geometry (Subtle constellation grid lines)
  const linePositions = useMemo(() => {
    const lineCount = 120;
    const lines = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      const x1 = (Math.random() - 0.5) * 20;
      const y1 = (Math.random() - 0.5) * 14;
      const z1 = (Math.random() - 0.5) * 8 - 2;

      lines[i6] = x1;
      lines[i6 + 1] = y1;
      lines[i6 + 2] = z1;
      lines[i6 + 3] = x1 + (Math.random() - 0.5) * 3;
      lines[i6 + 4] = y1 + (Math.random() - 0.5) * 3;
      lines[i6 + 5] = z1 + (Math.random() - 0.5) * 2;
    }
    return lines;
  }, []);

  // 3. Dynamic Wave & Mouse Interpolation
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArr = posAttr.array;
    const orig = originalPos.current;

    // Smooth mouse parallax damping
    const targetX = (mouseRef.current.x || 0) * 4;
    const targetY = (mouseRef.current.y || 0) * 3;
    currentMouse.current.x = THREE.MathUtils.damp(currentMouse.current.x, targetX, 2.0, delta);
    currentMouse.current.y = THREE.MathUtils.damp(currentMouse.current.y, targetY, 2.0, delta);

    const mx = currentMouse.current.x;
    const my = currentMouse.current.y;

    // Slow ambient rotation
    pointsRef.current.rotation.y = t * 0.02 + mx * 0.02;
    pointsRef.current.rotation.x = my * 0.02;

    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.02 + mx * 0.02;
      linesRef.current.rotation.x = my * 0.02;
    }

    // Dynamic wave formulation inspired by webgl_points_dynamic
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = orig[i3];
      const oy = orig[i3 + 1];
      const oz = orig[i3 + 2];

      const wave1 = Math.sin(t * 0.6 + ox * 0.3) * 0.12;
      const wave2 = Math.cos(t * 0.5 + oy * 0.3) * 0.12;

      posArr[i3] = ox + wave1;
      posArr[i3 + 1] = oy + wave2;
      posArr[i3 + 2] = oz + Math.sin(t * 0.4 + ox * 0.2 + oy * 0.2) * 0.1;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* 1. Dynamic Points Cloud */}
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
          size={0.11}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Subtle Faint Technical Telemetry Grid Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0284C7"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/**
 * DigitalEvidenceParticleBg Component
 * Full-bleed WebGL particle background for Section 4
 */
export function DigitalEvidenceParticleBg({ mouse }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#030812] via-[#050D1A] to-[#030812]">
      {/* Soft atmospheric fog glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#030812', 6, 16]} />
        <DynamicPointTelemetry mouseRef={mouseRef} count={1600} />
      </Canvas>
    </div>
  );
}

export default DigitalEvidenceParticleBg;
