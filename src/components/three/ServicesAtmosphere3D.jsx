import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Industrial Turbine Impeller & Floating Duct Elements for Section 3
 */
function FloatingImpellerScene() {
  const fanRef = useRef();
  const ringRef = useRef();
  const particlesRef = useRef();

  // Create 12 curved turbine blades
  const blades = useMemo(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      list.push(angle);
    }
    return list;
  }, []);

  // Ambient metallic dust particles
  const particleCount = 120;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Fan rotation
    if (fanRef.current) {
      fanRef.current.rotation.z += delta * 1.8;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      ringRef.current.rotation.x = Math.cos(t * 0.4) * 0.15;
    }

    // Particle drift
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += delta * 0.1;
        if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* 1. Large High-Tech Extraction Fan Assembly */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={ringRef} position={[4.5, 0.5, -1]} rotation={[0.2, -0.4, 0]} scale={1.2}>
          {/* Fan Outer Steel Casing Ring */}
          <mesh>
            <torusGeometry args={[1.8, 0.12, 16, 48]} />
            <meshStandardMaterial
              color="#475569"
              metalness={0.92}
              roughness={0.2}
            />
          </mesh>

          {/* Gold Decorative Inner Flange */}
          <mesh position={[0, 0, 0.05]}>
            <torusGeometry args={[1.65, 0.04, 12, 36]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.95}
              roughness={0.12}
            />
          </mesh>

          {/* Central Hub & Spinning Blades */}
          <group ref={fanRef}>
            <mesh>
              <cylinderGeometry args={[0.45, 0.45, 0.2, 24]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial
                color="#0F172A"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.12]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.96}
                roughness={0.1}
              />
            </mesh>

            {/* 12 Aerodynamic Blades */}
            {blades.map((angle, idx) => (
              <group key={`blade-${idx}`} rotation={[0, 0, angle]}>
                <mesh position={[0, 0.95, 0]} rotation={[0.45, 0, 0]}>
                  <boxGeometry args={[0.24, 1.1, 0.04]} />
                  <meshStandardMaterial
                    color={idx % 2 === 0 ? '#94A3B8' : '#64748B'}
                    metalness={0.94}
                    roughness={0.18}
                  />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </Float>

      {/* 2. Floating Metallic Particles Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#F59E0B"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * ServicesAtmosphere3D Component
 * 3D Ambient Background Canvas for Section 3 (Services)
 */
export function ServicesAtmosphere3D() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} color="#0B1C33" />
        <directionalLight position={[5, 6, 4]} intensity={1.4} color="#38BDF8" />
        <directionalLight position={[-4, -2, 2]} intensity={1.0} color="#F59E0B" />
        <Suspense fallback={null}>
          <FloatingImpellerScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ServicesAtmosphere3D;
