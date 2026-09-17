import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Grade X Gold Energy Core for Section 6 (Final CTA)
 */
function GoldCoreScene() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.5;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.7;
      ring2Ref.current.rotation.z = Math.cos(t * 0.6) * 0.5;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.6;
    }
  });

  return (
    <group position={[0, 0, 0]} scale={1.2}>
      {/* 1. Central Metallic Icosahedron Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.96}
          roughness={0.12}
          wireframe
        />
      </mesh>

      {/* Internal Glow Sphere */}
      <mesh>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshStandardMaterial
          color="#0A192F"
          emissive="#F59E0B"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* 2. Outer Orbital Gold Rings */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.0, 0.03, 16, 48]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.025, 16, 48]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.6, 0.02, 16, 48]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * FinalCtaGlobe3D Component
 * 3D Ambient Backdrop for Section 6
 */
export function FinalCtaGlobe3D() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} color="#0B1C33" />
        <directionalLight position={[4, 5, 3]} intensity={1.5} color="#F59E0B" />
        <directionalLight position={[-4, -3, 2]} intensity={1.0} color="#38BDF8" />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <GoldCoreScene />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default FinalCtaGlobe3D;
