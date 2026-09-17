import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CleaningBrush } from './CleaningBrush';
import { CleaningSpray } from './CleaningSpray';

/**
 * CleaningRobot Component
 * Industrial Robotic Commercial Kitchen Exhaust Duct Cleaning Crawler:
 * - Low-profile tracked crawler chassis in Grade X navy titanium armor (#0A192F)
 * - Polished Grade X gold trim plates (#D4AF37) and roll cage
 * - Dual optical inspection camera turret with status LEDs
 * - Front bumper high-output twin LED searchlights
 * - Articulated hydraulic cleaning arm with high-speed rotating multi-jet hydro brush
 * - High-pressure water/steam spray emitting onto the greasy duct surfaces
 * - Trailing braided umbilical fluid/power tether hose
 */
export function CleaningRobot({ robotZ = 0, isCleaning = true, isMoving = true, progress = 0 }) {
  const robotGroup = useRef();
  const leftTrackRollers = useRef([]);
  const rightTrackRollers = useRef([]);
  const cameraTurretRef = useRef();
  const armJointRef = useRef();

  // Materials
  const armorNavy = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A192F',
        metalness: 0.9,
        roughness: 0.22,
      }),
    []
  );

  const armorDarkTitanium = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E293B',
        metalness: 0.88,
        roughness: 0.3,
      }),
    []
  );

  const goldAccent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4AF37', // Grade X Signature Gold
        metalness: 0.95,
        roughness: 0.14,
      }),
    []
  );

  const rubberTrackMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#090D12',
        metalness: 0.1,
        roughness: 0.85,
      }),
    []
  );

  const lensMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#0284C7',
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.75,
        ior: 1.5,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Camera turret inspection sweep
    if (cameraTurretRef.current) {
      cameraTurretRef.current.rotation.y = Math.sin(t * 1.1) * 0.22;
      cameraTurretRef.current.rotation.x = 0.08 + Math.sin(t * 0.7) * 0.06;
    }

    // 2. Articulated arm scanning and scrubbing micro-adjustments
    if (armJointRef.current) {
      if (isCleaning) {
        armJointRef.current.rotation.y = Math.sin(t * 3.5) * 0.14;
        armJointRef.current.rotation.x = Math.sin(t * 2.4) * 0.08;
      } else {
        armJointRef.current.rotation.y = Math.sin(t * 0.6) * 0.05;
      }
    }

    // 3. Track rollers spin in sync with movement
    const rollSpeed = isMoving ? delta * 11.0 : delta * 1.2;
    leftTrackRollers.current.forEach((roller) => {
      if (roller) roller.rotation.x += rollSpeed;
    });
    rightTrackRollers.current.forEach((roller) => {
      if (roller) roller.rotation.x += rollSpeed;
    });
  });

  return (
    <group ref={robotGroup} position={[0.4, -0.68, robotZ]}>
      {/* ================= 1. MAIN CHASSIS HULL ================= */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.28, 1.45]} />
        <primitive object={armorNavy} />
      </mesh>

      {/* Top Reinforced Titanium Plating */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[0.92, 0.06, 1.2]} />
        <primitive object={armorDarkTitanium} />
      </mesh>

      {/* Grade X Gold Accents & Branding Trim */}
      <mesh position={[0, 0.41, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.9]} />
        <primitive object={goldAccent} />
      </mesh>
      <mesh position={[-0.48, 0.36, 0]}>
        <boxGeometry args={[0.04, 0.04, 1.3]} />
        <primitive object={goldAccent} />
      </mesh>
      <mesh position={[0.48, 0.36, 0]}>
        <boxGeometry args={[0.04, 0.04, 1.3]} />
        <primitive object={goldAccent} />
      </mesh>

      {/* Roll Cage Bars */}
      <group position={[0, 0.48, 0.1]}>
        <mesh position={[-0.35, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.8, 8]} />
          <primitive object={armorDarkTitanium} />
        </mesh>
        <mesh position={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.8, 8]} />
          <primitive object={armorDarkTitanium} />
        </mesh>
        <mesh position={[0, 0.08, -0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.016, 0.016, 0.72, 8]} />
          <primitive object={goldAccent} />
        </mesh>
      </group>

      {/* ================= 2. DRIVE TRACKS & WHEEL HUBS ================= */}
      {/* Left Track System */}
      <group position={[-0.66, 0.12, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.34, 1.6]} />
          <primitive object={rubberTrackMat} />
        </mesh>
        <mesh position={[-0.11, 0, 0]}>
          <boxGeometry args={[0.03, 0.22, 1.45]} />
          <primitive object={armorNavy} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((zOffset, idx) => (
          <group
            key={`l-wheel-${idx}`}
            ref={(el) => (leftTrackRollers.current[idx] = el)}
            position={[-0.12, 0, zOffset]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh>
              <cylinderGeometry args={[0.13, 0.13, 0.06, 16]} />
              <primitive object={goldAccent} />
            </mesh>
            <mesh position={[0, 0.035, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 8]} />
              <primitive object={armorDarkTitanium} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Right Track System */}
      <group position={[0.66, 0.12, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.34, 1.6]} />
          <primitive object={rubberTrackMat} />
        </mesh>
        <mesh position={[0.11, 0, 0]}>
          <boxGeometry args={[0.03, 0.22, 1.45]} />
          <primitive object={armorNavy} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((zOffset, idx) => (
          <group
            key={`r-wheel-${idx}`}
            ref={(el) => (rightTrackRollers.current[idx] = el)}
            position={[0.12, 0, zOffset]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh>
              <cylinderGeometry args={[0.13, 0.13, 0.06, 16]} />
              <primitive object={goldAccent} />
            </mesh>
            <mesh position={[0, 0.035, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 8]} />
              <primitive object={armorDarkTitanium} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 3. FRONT HEADLIGHTS & BUMPER ================= */}
      <group position={[0, 0.16, 0.78]}>
        <mesh>
          <boxGeometry args={[1.1, 0.12, 0.1]} />
          <primitive object={armorDarkTitanium} />
        </mesh>
        {/* Left Searchlight Pod */}
        <group position={[-0.45, 0.05, 0.06]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.06, 0.12, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <primitive object={armorNavy} />
          </mesh>
          <mesh position={[0, 0, 0.065]}>
            <circleGeometry args={[0.06, 16]} />
            <meshBasicMaterial color="#E0F2FE" />
          </mesh>
        </group>
        {/* Right Searchlight Pod */}
        <group position={[0.45, 0.05, 0.06]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.06, 0.12, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <primitive object={armorNavy} />
          </mesh>
          <mesh position={[0, 0, 0.065]}>
            <circleGeometry args={[0.06, 16]} />
            <meshBasicMaterial color="#E0F2FE" />
          </mesh>
        </group>
      </group>

      {/* ================= 4. DUAL OPTICAL CAMERA TURRET ================= */}
      <group ref={cameraTurretRef} position={[0, 0.52, 0.35]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.1, 16]} />
          <primitive object={armorNavy} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.3, 0.16, 0.24]} />
          <primitive object={armorDarkTitanium} />
        </mesh>
        <mesh position={[-0.08, 0.12, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
          <primitive object={lensMaterial} />
        </mesh>
        <mesh position={[0.08, 0.12, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
          <primitive object={lensMaterial} />
        </mesh>
        <mesh position={[0, 0.18, 0.11]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color={isCleaning ? '#F59E0B' : '#10B981'} />
        </mesh>
      </group>

      {/* ================= 5. ARTICULATED CLEANING ARM WITH ROTARY BRUSH & SPRAY ================= */}
      <group ref={armJointRef} position={[0, 0.3, 0.72]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.26, 0.18, 0.22]} />
          <primitive object={armorNavy} />
        </mesh>
        <mesh position={[0, 0.06, 0.22]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.38, 12]} />
          <primitive object={armorDarkTitanium} />
        </mesh>
        <mesh position={[0, 0.12, 0.42]}>
          <boxGeometry args={[0.2, 0.14, 0.16]} />
          <primitive object={goldAccent} />
        </mesh>

        {/* Rotating Cleaning Brush */}
        <group position={[0, 0.14, 0.54]}>
          <CleaningBrush isCleaning={isCleaning} intensity={1.0} />
          {/* Active Water & Steam Spray Nozzle */}
          <CleaningSpray isCleaning={isCleaning} intensity={1.0} position={[0, 0, 0.1]} />
        </group>
      </group>

      {/* ================= 6. TRAILING UMBILICAL POWER/FLUID HOSE ================= */}
      <group position={[0, 0.15, -0.75]}>
        <mesh position={[0, -0.05, -0.6]} rotation={[-0.15, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 1.4, 12]} />
          <primitive object={rubberTrackMat} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 12]} />
          <primitive object={goldAccent} />
        </mesh>
      </group>
    </group>
  );
}

export default CleaningRobot;
