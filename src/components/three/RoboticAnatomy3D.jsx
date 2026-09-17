import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { CleaningBrush } from './CleaningBrush';
import { CleaningSpray } from './CleaningSpray';

/**
 * 3D Robot Anatomy for Section 2 (Borderless, Floating, Interactive)
 * Focuses camera and highlights specific subsystems based on active hotspot index.
 */
function FloatingRobotModel({ activeHotspot = 0 }) {
  const modelRef = useRef();
  const armRef = useRef();
  const turretRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (modelRef.current) {
      // Subtle organic float
      modelRef.current.position.y = Math.sin(t * 1.5) * 0.06;
      
      // Dynamic rotation based on active hotspot
      let targetRotY = 0.4;
      if (activeHotspot === 0) targetRotY = 0.1; // Camera front
      if (activeHotspot === 1) targetRotY = -0.6; // Brush side
      if (activeHotspot === 2) targetRotY = 0.85; // Tracks side
      if (activeHotspot === 3) targetRotY = -0.3; // Spray nozzles
      if (activeHotspot === 4) targetRotY = 1.4; // Umbilical rear

      modelRef.current.rotation.y = THREE.MathUtils.damp(
        modelRef.current.rotation.y,
        targetRotY + Math.sin(t * 0.5) * 0.08,
        3.0,
        delta
      );
    }

    if (turretRef.current) {
      turretRef.current.rotation.y = Math.sin(t * 1.4) * 0.3;
      turretRef.current.rotation.x = 0.1 + Math.sin(t * 0.9) * 0.08;
    }

    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(t * 2.8) * 0.12;
      armRef.current.rotation.x = Math.sin(t * 1.8) * 0.06;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.1, 0]} scale={1.15}>
      {/* 1. Main Chassis Hull */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.3, 0.34, 1.7]} />
        <meshStandardMaterial
          color="#0A192F"
          metalness={0.92}
          roughness={0.18}
        />
      </mesh>

      {/* Top Reinforced Armor */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.1, 0.08, 1.4]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.88}
          roughness={0.28}
        />
      </mesh>

      {/* Gold Trim Accents */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.7, 0.02, 1.0]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* 2. Caterpillar Drive Tracks (Highlighted on hotspot 2) */}
      {[-0.8, 0.8].map((xPos, idx) => (
        <group key={`track-${idx}`} position={[xPos, 0.1, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.38, 1.85]} />
            <meshStandardMaterial
              color="#090D12"
              metalness={0.1}
              roughness={0.85}
              emissive={activeHotspot === 2 ? '#F59E0B' : '#000000'}
              emissiveIntensity={activeHotspot === 2 ? 0.3 : 0}
            />
          </mesh>
          {[-0.7, -0.25, 0.25, 0.7].map((zOffset, sIdx) => (
            <mesh
              key={`sprocket-${sIdx}`}
              position={[xPos > 0 ? 0.14 : -0.14, 0, zOffset]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* 3. Front Searchlights */}
      {[-0.55, 0.55].map((xPos, idx) => (
        <group key={`light-${idx}`} position={[xPos, 0.25, 0.9]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.07, 0.14, 16]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <circleGeometry args={[0.07, 16]} />
            <meshBasicMaterial color="#E0F2FE" />
          </mesh>
          <spotLight
            position={[0, 0, 0.1]}
            intensity={3.0}
            distance={12}
            angle={Math.PI / 6}
            penumbra={0.6}
            color="#E0F2FE"
          />
        </group>
      ))}

      {/* 4. Optical Camera Turret (Highlighted on hotspot 0) */}
      <group ref={turretRef} position={[0, 0.56, 0.4]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.22, 0.12, 16]} />
          <meshStandardMaterial
            color="#0A192F"
            metalness={0.9}
            roughness={0.2}
            emissive={activeHotspot === 0 ? '#38BDF8' : '#000000'}
            emissiveIntensity={activeHotspot === 0 ? 0.4 : 0}
          />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <boxGeometry args={[0.34, 0.18, 0.26]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.09, 0.14, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshPhysicalMaterial color="#0284C7" transmission={0.8} roughness={0.05} />
        </mesh>
        <mesh position={[0.09, 0.14, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
          <meshPhysicalMaterial color="#0284C7" transmission={0.8} roughness={0.05} />
        </mesh>
      </group>

      {/* 5. Articulated Hydraulic Cleaning Arm (Highlighted on hotspot 1 / 3) */}
      <group ref={armRef} position={[0, 0.32, 0.85]}>
        <mesh>
          <boxGeometry args={[0.3, 0.2, 0.25]} />
          <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0.25]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.055, 0.42, 12]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Cleaning Head Assembly */}
        <group position={[0, 0.16, 0.6]}>
          <CleaningBrush isCleaning={true} intensity={activeHotspot === 1 ? 1.6 : 1.0} />
          <CleaningSpray isCleaning={true} intensity={activeHotspot === 3 ? 1.5 : 0.8} position={[0, 0, 0.1]} />
        </group>
      </group>

      {/* Trailing Umbilical Hose (Highlighted on hotspot 4) */}
      <group position={[0, 0.18, -0.9]}>
        <mesh rotation={[-0.2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.3, 12]} />
          <meshStandardMaterial
            color="#090D12"
            roughness={0.8}
            emissive={activeHotspot === 4 ? '#D4AF37' : '#000000'}
            emissiveIntensity={activeHotspot === 4 ? 0.4 : 0}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * RoboticAnatomy3D Component
 * Borderless, open Three.js canvas embedded directly into Section 2 background
 */
export function RoboticAnatomy3D({ activeHotspot = 0 }) {
  return (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[520px] relative pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [2.5, 1.6, 3.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} color="#0B1C33" />
        <hemisphereLight skyColor="#38BDF8" groundColor="#0A192F" intensity={0.7} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} color="#FFFFFF" castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={1.1} color="#F59E0B" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
            <FloatingRobotModel activeHotspot={activeHotspot} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RoboticAnatomy3D;
