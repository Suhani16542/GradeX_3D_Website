import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * HeroLighting Component
 * Balanced industrial duct lighting:
 * - Hemisphere light for subtle metallic reflection on top/bottom duct surfaces
 * - Soft key and rim directional lights
 * - Front twin robot searchlights casting forward along the duct floor
 * - Active nozzle worklight
 */
export function HeroLighting({ robotZ = 0, isCleaning = false }) {
  const headLightLeft = useRef();
  const headLightRight = useRef();
  const targetLeft = useRef();
  const targetRight = useRef();
  const nozzleLight = useRef();

  useFrame(() => {
    if (targetLeft.current) {
      targetLeft.current.position.set(-0.45, -0.6, robotZ + 10.0);
    }
    if (targetRight.current) {
      targetRight.current.position.set(0.45, -0.6, robotZ + 10.0);
    }
  });

  return (
    <>
      {/* Soft industrial ambient and metallic sky/ground bounce */}
      <hemisphereLight
        skyColor="#38BDF8"
        groundColor="#0B132B"
        intensity={0.65}
      />

      {/* Main directional key light (Upper Right) */}
      <directionalLight
        position={[4, 5, robotZ - 4]}
        intensity={1.2}
        color="#E2E8F0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Grade X Signature Warm Golden Rim Light (Upper Left) */}
      <directionalLight
        position={[-4, 3, robotZ + 2]}
        intensity={0.8}
        color="#F59E0B"
      />

      {/* Backlight / Tunnel depth silhouette light */}
      <directionalLight
        position={[0, 2, robotZ + 16]}
        intensity={0.6}
        color="#38BDF8"
      />

      {/* Robot Left Searchlight */}
      <spotLight
        ref={headLightLeft}
        position={[-0.45, 0.05, robotZ + 0.85]}
        target={targetLeft.current || undefined}
        intensity={2.8}
        distance={22}
        angle={Math.PI / 6}
        penumbra={0.7}
        color="#F0F9FF"
      />
      <object3D ref={targetLeft} position={[-0.45, -0.6, robotZ + 10]} />

      {/* Robot Right Searchlight */}
      <spotLight
        ref={headLightRight}
        position={[0.45, 0.05, robotZ + 0.85]}
        target={targetRight.current || undefined}
        intensity={2.8}
        distance={22}
        angle={Math.PI / 6}
        penumbra={0.7}
        color="#F0F9FF"
      />
      <object3D ref={targetRight} position={[0.45, -0.6, robotZ + 10]} />

      {/* Active Cleaning Nozzle Glow */}
      <pointLight
        ref={nozzleLight}
        position={[0, 0.25, robotZ + 1.2]}
        intensity={isCleaning ? 3.5 : 0.8}
        distance={4.0}
        color={isCleaning ? '#F59E0B' : '#38BDF8'}
      />

      {/* Ceiling Duct Marker Lights */}
      {[-8, -2, 4, 10, 16, 22].map((zPos, idx) => (
        <group key={idx} position={[0, 2.15, zPos]}>
          <pointLight
            intensity={0.3}
            distance={4.5}
            color={idx % 2 === 0 ? '#38BDF8' : '#F59E0B'}
          />
          {/* Light Housing */}
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.3, 0.04, 0.5]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.18, 0.015, 0.38]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#38BDF8' : '#FBBF24'} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default HeroLighting;
