import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CaseStudyAmbientBg3D Component
 * Subtle technical inspection background for Section 6:
 * - Faint technical particles
 * - Inspection points
 * - Thin constellation lines
 * - Soft depth fog
 */
function InspectionParticles({ count = 450 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color('#D4AF37');
    const cyan = new THREE.Color('#38BDF8');
    const slate = new THREE.Color('#64748B');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 22;
      pos[i3 + 1] = (Math.random() - 0.5) * 16;
      pos[i3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const r = Math.random();
      const c = r < 0.3 ? gold : r < 0.6 ? cyan : slate;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = t * 0.01;
      pointsRef.current.rotation.x = Math.sin(t * 0.006) * 0.012;
    }
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
        size={0.065}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function CaseStudyAmbientBg3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Soft Ambient Fog Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[350px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle Technical Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <InspectionParticles count={450} />
      </Canvas>
    </div>
  );
}

export default CaseStudyAmbientBg3D;
