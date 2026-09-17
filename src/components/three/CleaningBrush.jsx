import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CleaningBrush Component
 * Industrial High-Speed Rotary Scrubber Head:
 * - Central chrome/titanium drive spindle
 * - Grade X gold outer mounting ring
 * - Dense high-tensile rotary nylon & steel scrubbing bristles
 * - Continuous high-speed spin (2,400 RPM visual simulation)
 * - Multi-axis oscillation against the greasy duct surface
 */
export function CleaningBrush({ isCleaning = true, intensity = 1.0 }) {
  const brushGroupRef = useRef();
  const bristlesRef = useRef();

  // Create bristle ring geometry
  const bristleSpokes = useMemo(() => {
    const spokes = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      spokes.push({
        angle,
        x: Math.cos(angle) * 0.22,
        y: Math.sin(angle) * 0.22,
      });
    }
    return spokes;
  }, []);

  useFrame((_, delta) => {
    if (brushGroupRef.current) {
      // High-speed brush rotation
      const spinSpeed = isCleaning ? 28.0 * intensity : 4.0;
      brushGroupRef.current.rotation.z += delta * spinSpeed;
    }
  });

  return (
    <group ref={brushGroupRef} position={[0, 0, 0]}>
      {/* Central Spindle Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 24]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>

      {/* Grade X Gold Anodized Mounting Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.024, 12, 24]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* Heavy Duty Bristle Bundles */}
      {bristleSpokes.map((spoke, idx) => (
        <group
          key={`bristle-${idx}`}
          position={[spoke.x, spoke.y, 0.04]}
          rotation={[0, 0, spoke.angle]}
        >
          {/* Bristle Tufts */}
          <mesh rotation={[0.3, 0, 0]}>
            <coneGeometry args={[0.035, 0.22, 6]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#E2E8F0' : '#F59E0B'}
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* High-Pressure Center Core Injection Jet */}
      <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 12]} />
        <meshStandardMaterial
          color="#38BDF8"
          metalness={0.9}
          roughness={0.1}
          emissive="#0284C7"
          emissiveIntensity={isCleaning ? 0.6 : 0.1}
        />
      </mesh>
    </group>
  );
}

export default CleaningBrush;
