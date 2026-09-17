import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Interactive Compliance, Safety & WHS Hologram Core
 * Features:
 * - Geometric 3D Holographic Safety Shield / Hexagonal Vault Core
 * - Rotating Technical Gyroscope Security Rings
 * - Animated Laser Scanner Beam measuring compliance in real-time
 * - Floating Safety Protocol Particles & Orbiting Verification Beacons
 * - Active State color transitions (Emerald Safe / Gold Certified / Cyan Protocol)
 */
function HolographicShieldScene({ activeCard = 0, hoveredCard = null, mouse }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const scannerRef = useRef();
  const particlesRef = useRef();
  const satellitesGroupRef = useRef();

  // Color scheme based on active compliance module
  const activeColor = useMemo(() => {
    const idx = hoveredCard !== null ? hoveredCard : activeCard;
    switch (idx) {
      case 0: // WHS Procedures
        return { primary: '#F59E0B', secondary: '#FCD34D', emissive: '#78350F' }; // Amber/Gold
      case 1: // SWMS Documentation
        return { primary: '#38BDF8', secondary: '#7DD3FC', emissive: '#075985' }; // Cyan/Sky
      case 2: // Risk Assessments
        return { primary: '#10B981', secondary: '#34D399', emissive: '#064E3B' }; // Emerald
      case 3: // Site-Specific Safety
        return { primary: '#F59E0B', secondary: '#FDE047', emissive: '#92400E' }; // Gold
      case 4: // Food-Safe Cleaning
        return { primary: '#10B981', secondary: '#6EE7B7', emissive: '#065F46' }; // Mint/Emerald
      case 5: // Compliance Documentation
        return { primary: '#D4AF37', secondary: '#FDE047', emissive: '#854D0E' }; // Gold
      default:
        return { primary: '#D4AF37', secondary: '#38BDF8', emissive: '#1E293B' };
    }
  }, [activeCard, hoveredCard]);

  // Orbiting Satellites for the 6 Compliance Pillars
  const satellitePositions = useMemo(() => {
    const positions = [];
    const radius = 2.4;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      positions.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * (radius * 0.7),
        Math.sin(angle * 2) * 0.4
      ));
    }
    return positions;
  }, []);

  // Ambient Safety Barrier Particles
  const { positions, colors } = useMemo(() => {
    const count = 450;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const gold = new THREE.Color('#D4AF37');
    const emerald = new THREE.Color('#10B981');
    const sky = new THREE.Color('#38BDF8');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 1.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const c = r < 0.4 ? gold : r < 0.7 ? emerald : sky;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Mouse Parallax & Gentle Idle Floating
    if (groupRef.current) {
      const targetRotY = (mouse?.x || 0) * 0.4 + t * 0.15;
      const targetRotX = -(mouse?.y || 0) * 0.3 + Math.sin(t * 0.6) * 0.08;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 2.5, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 2.5, delta);
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    }

    // Rotating Shield Core
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.35;
      coreRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
    }

    // Outer & Inner Gyro Rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.4;
      outerRingRef.current.rotation.y = t * 0.25;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.5;
      innerRingRef.current.rotation.z = t * 0.3;
    }

    // Scanning Laser Beam (Moves up and down through the shield)
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(t * 2.2) * 1.6;
      scannerRef.current.rotation.z = t * 0.5;
    }

    // Orbiting Satellites Rotation
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.z = -t * 0.15;
    }

    // Particles Ambient Swirl
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* ================= 1. CENTRAL HOLOGRAPHIC SAFETY SHIELD CORE ================= */}
      <group ref={coreRef}>
        {/* Inner Solid Core (Hexagonal / Icosahedron Prism) */}
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial
            color="#081A30"
            roughness={0.2}
            metalness={0.9}
            emissive={activeColor.emissive}
            emissiveIntensity={0.6}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Outer Glowing Wireframe Cage */}
        <mesh scale={[1.05, 1.05, 1.05]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial
            color={activeColor.primary}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Central Safety Nucleus Beacon */}
        <mesh>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshBasicMaterial color={activeColor.secondary} />
        </mesh>
      </group>

      {/* ================= 2. LASER SCANNER DISK (UP/DOWN SWEEP) ================= */}
      <group ref={scannerRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 1.45, 32]} />
          <meshBasicMaterial
            color={activeColor.secondary}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.015, 8, 32]} />
          <meshBasicMaterial color={activeColor.primary} />
        </mesh>
      </group>

      {/* ================= 3. ROTATING TECHNICAL GYROSCOPE RINGS ================= */}
      {/* Outer Hexagonal Shield Frame Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.9, 0.02, 16, 6]} />
        <meshStandardMaterial
          color={activeColor.primary}
          metalness={0.95}
          roughness={0.2}
          emissive={activeColor.primary}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Middle Precision Measurement Ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.018, 16, 32]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* ================= 4. 6 ORBITING SATELLITE COMPLIANCE NODES ================= */}
      <group ref={satellitesGroupRef}>
        {satellitePositions.map((pos, idx) => {
          const isSelected = (hoveredCard !== null ? hoveredCard : activeCard) === idx;
          return (
            <group key={idx} position={pos}>
              {/* Satellite Outer Halo */}
              <mesh scale={isSelected ? [1.8, 1.8, 1.8] : [1, 1, 1]}>
                <torusGeometry args={[0.16, 0.015, 8, 16]} />
                <meshBasicMaterial
                  color={isSelected ? '#F59E0B' : '#10B981'}
                  transparent
                  opacity={isSelected ? 0.95 : 0.5}
                />
              </mesh>
              {/* Satellite Core Dot */}
              <mesh>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshBasicMaterial color={isSelected ? '#FDE047' : '#38BDF8'} />
              </mesh>
              {/* Pulsing Light on Selected Node */}
              {isSelected && (
                <pointLight intensity={2.5} distance={2.5} color="#F59E0B" />
              )}
            </group>
          );
        })}
      </group>

      {/* ================= 5. SAFETY BARRIER PARTICLES ================= */}
      <points ref={particlesRef}>
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
          size={0.075}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Compliance3DShield Canvas Wrapper Component
 */
export function Compliance3DShield({ activeCard = 0, hoveredCard = null, mouse }) {
  return (
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center pointer-events-none select-none">
      {/* Ambient Multi-Layer Radial Glow Behind Shield */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-500/15 to-sky-500/15 blur-[80px] pointer-events-none animate-pulse" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} color="#0B1C33" />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-4, -3, 3]} intensity={1.5} color="#D4AF37" />
        <pointLight position={[0, 0, 1]} intensity={1.8} color="#10B981" />

        <React.Suspense fallback={null}>
          <HolographicShieldScene
            activeCard={activeCard}
            hoveredCard={hoveredCard}
            mouse={mouse}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default Compliance3DShield;
