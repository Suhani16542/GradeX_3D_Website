import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Technical Process Ambient Background for Section 5
 * Pure ambient particles and subtle grid only — NO lines behind cards!
 */
function ProcessAmbientParticles({ count = 500 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color('#D4AF37');
    const cyan = new THREE.Color('#38BDF8');
    const silver = new THREE.Color('#64748B');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 24;
      pos[i3 + 1] = (Math.random() - 0.5) * 18;
      pos[i3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const r = Math.random();
      const c = r < 0.35 ? gold : r < 0.6 ? cyan : silver;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = t * 0.012;
      pointsRef.current.rotation.x = Math.sin(t * 0.008) * 0.015;
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
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function MethodologyProcessBg() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030812]">
      {/* Ambient Depth Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[380px] bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[380px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle Technical Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
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
        <ProcessAmbientParticles count={500} />
      </Canvas>
    </div>
  );
}

export default MethodologyProcessBg;
