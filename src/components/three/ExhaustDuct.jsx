import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * ExhaustDuct Component
 * Commercial Kitchen Exhaust Duct Environment:
 * - Rectangular 4.2m x 3.4m industrial stainless steel tunnel
 * - Structural angle-iron flange joints with gold zinc-plated bolt hardware
 * - Access inspection hatch door with latch handles & AS 1851 compliance seal
 * - Airflow turning vanes at duct bends
 * - Brushed stainless steel PBR finish with industrial specular reflections
 */
export function ExhaustDuct() {
  // Flange joint positions along Z-axis
  const flangePositions = useMemo(() => {
    const pos = [];
    for (let z = -15; z <= 30; z += 3.5) {
      pos.push(z);
    }
    return pos;
  }, []);

  // Rivet / fastener points along seam lines
  const rivetPoints = useMemo(() => {
    const rivets = [];
    for (let z = -14; z <= 28; z += 0.75) {
      rivets.push(z);
    }
    return rivets;
  }, []);

  const steelFloorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#94A3B8',
        metalness: 0.94,
        roughness: 0.2,
      }),
    []
  );

  const steelWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#78889E',
        metalness: 0.92,
        roughness: 0.24,
      }),
    []
  );

  const steelCeilingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#64748B',
        metalness: 0.9,
        roughness: 0.28,
      }),
    []
  );

  const flangeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#334155',
        metalness: 0.88,
        roughness: 0.35,
      }),
    []
  );

  const boltMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4AF37', // Grade X gold zinc-plated hardware
        metalness: 0.95,
        roughness: 0.15,
      }),
    []
  );

  return (
    <group name="exhaust-duct-system">
      {/* Duct Floor (-1.0m) */}
      <mesh position={[0, -1.0, 8]} receiveShadow>
        <planeGeometry args={[4.2, 50]} />
        <primitive object={steelFloorMaterial} />
      </mesh>

      {/* Duct Ceiling (+2.4m) */}
      <mesh position={[0, 2.4, 8]} rotation={[Math.PI, 0, 0]} receiveShadow>
        <planeGeometry args={[4.2, 50]} />
        <primitive object={steelCeilingMaterial} />
      </mesh>

      {/* Duct Left Wall (-2.1m) */}
      <mesh position={[-2.1, 0.7, 8]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[50, 3.4]} />
        <primitive object={steelWallMaterial} />
      </mesh>

      {/* Duct Right Wall (+2.1m) */}
      <mesh position={[2.1, 0.7, 8]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[50, 3.4]} />
        <primitive object={steelWallMaterial} />
      </mesh>

      {/* Structural Flange Frames & Flange Bolts along the duct */}
      {flangePositions.map((zPos, idx) => (
        <group key={`flange-${idx}`} position={[0, 0.7, zPos]}>
          {/* Top Flange Bar */}
          <mesh position={[0, 1.68, 0]}>
            <boxGeometry args={[4.28, 0.08, 0.12]} />
            <primitive object={flangeMaterial} />
          </mesh>
          {/* Bottom Flange Bar */}
          <mesh position={[0, -1.68, 0]}>
            <boxGeometry args={[4.28, 0.08, 0.12]} />
            <primitive object={flangeMaterial} />
          </mesh>
          {/* Left Flange Bar */}
          <mesh position={[-2.08, 0, 0]}>
            <boxGeometry args={[0.08, 3.4, 0.12]} />
            <primitive object={flangeMaterial} />
          </mesh>
          {/* Right Flange Bar */}
          <mesh position={[2.08, 0, 0]}>
            <boxGeometry args={[0.08, 3.4, 0.12]} />
            <primitive object={flangeMaterial} />
          </mesh>

          {/* Hardware Bolts on Flanges */}
          {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((bX, bIdx) => (
            <React.Fragment key={`bolt-${idx}-${bIdx}`}>
              {/* Top Bolts */}
              <mesh position={[bX, 1.68, 0.07]}>
                <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
                <primitive object={boltMaterial} />
              </mesh>
              {/* Bottom Bolts */}
              <mesh position={[bX, -1.68, 0.07]}>
                <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
                <primitive object={boltMaterial} />
              </mesh>
            </React.Fragment>
          ))}
        </group>
      ))}

      {/* Longitudinal Seam Rivet Lines (Top & Bottom Corners) */}
      {rivetPoints.map((zPos, rIdx) => (
        <group key={`rivets-${rIdx}`}>
          {/* Bottom Left Corner Rivet */}
          <mesh position={[-2.04, -0.96, zPos]}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <primitive object={boltMaterial} />
          </mesh>
          {/* Bottom Right Corner Rivet */}
          <mesh position={[2.04, -0.96, zPos]}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <primitive object={boltMaterial} />
          </mesh>
          {/* Top Left Corner Rivet */}
          <mesh position={[-2.04, 2.34, zPos]}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <primitive object={boltMaterial} />
          </mesh>
          {/* Top Right Corner Rivet */}
          <mesh position={[2.04, 2.34, zPos]}>
            <sphereGeometry args={[0.018, 6, 6]} />
            <primitive object={boltMaterial} />
          </mesh>
        </group>
      ))}

      {/* Inspection Access Hatch on Right Duct Wall (Z = 5.0m) */}
      <group position={[2.07, 0.7, 5.0]}>
        {/* Hatch Frame */}
        <mesh>
          <boxGeometry args={[0.06, 1.5, 1.9]} />
          <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Hatch Door Panel */}
        <mesh position={[-0.01, 0, 0]}>
          <boxGeometry args={[0.04, 1.35, 1.75]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.18} />
        </mesh>
        {/* Quick Release Latches */}
        {[-0.6, 0.6].map((offsetZ, lIdx) => (
          <group key={`latch-${lIdx}`} position={[-0.03, 0.55, offsetZ]}>
            <mesh>
              <boxGeometry args={[0.04, 0.16, 0.06]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        ))}
        {/* AS 1851 Compliance Plate Badge */}
        <mesh position={[-0.032, 0, 0]}>
          <planeGeometry args={[0.5, 0.28]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>

      {/* Airflow Turning Vanes at distant duct junction (Z = 28m) */}
      <group position={[0, 0.7, 28]}>
        {[-1.3, -0.65, 0, 0.65, 1.3].map((vX, vIdx) => (
          <mesh key={`vane-${vIdx}`} position={[vX, 0, 0]} rotation={[0, 0.35, 0]}>
            <boxGeometry args={[0.02, 3.0, 0.6]} />
            <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default ExhaustDuct;
