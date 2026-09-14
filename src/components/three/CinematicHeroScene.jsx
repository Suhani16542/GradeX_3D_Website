import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Autonomous Commercial Kitchen Robotic Scrubber
 * Moves naturally along the exhaust canopy and duct run,
 * spinning dual high-speed brushes, misting cleaner, and laser scanning.
 */
function AutonomousRobot({ progress, isCleaning = true, isInspecting = true }) {
  const robotRef = useRef();
  const leftOrbitalBrush = useRef();
  const rightOrbitalBrush = useRef();
  const centerRollerBrush = useRef();
  const cameraDome = useRef();
  const laserScanner = useRef();

  // Natural linear traversal along the canopy and duct run (X = -4.8 to X = +3.8)
  const posX = -4.8 + progress * 8.6;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Continuous high-speed brush rotation (1,800 RPM)
    if (isCleaning) {
      if (leftOrbitalBrush.current) leftOrbitalBrush.current.rotation.z += delta * 28;
      if (rightOrbitalBrush.current) rightOrbitalBrush.current.rotation.z -= delta * 28;
      if (centerRollerBrush.current) centerRollerBrush.current.rotation.x += delta * 30;
    }

    // Optical inspection camera subtle scanning movements
    if (isInspecting && cameraDome.current) {
      cameraDome.current.rotation.y = Math.sin(progress * Math.PI * 6) * 0.4;
      cameraDome.current.rotation.x = 0.12 + Math.sin(progress * Math.PI * 4) * 0.12;
    }

    // Laser depth scanner oscillation
    if (isInspecting && laserScanner.current) {
      laserScanner.current.rotation.z = Math.sin(progress * Math.PI * 8) * 0.45;
    }
  });

  return (
    <group ref={robotRef} position={[posX, -0.42, 0.2]}>
      {/* Heavy-Duty Industrial Chassis (Grade X Deep Navy #0A192F) */}
      <mesh position={[0, 0.26, 0]} castShadow>
        <boxGeometry args={[1.5, 0.34, 1.2]} />
        <meshStandardMaterial color="#0A192F" metalness={0.92} roughness={0.16} />
      </mesh>

      {/* Gold Reinforced Armor Top Plate */}
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.95]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Grade X Identity Plate */}
      <mesh position={[0, 0.51, 0]}>
        <boxGeometry args={[0.42, 0.02, 0.22]} />
        <meshStandardMaterial color="#050D1A" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Left Heavy-Duty All-Terrain Caterpillar Track */}
      <group position={[0, 0.14, -0.65]}>
        <mesh castShadow>
          <boxGeometry args={[1.65, 0.34, 0.24]} />
          <meshStandardMaterial color="#060C14" roughness={0.9} metalness={0.1} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((wX, idx) => (
          <mesh key={idx} position={[wX, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.26, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
          </mesh>
        ))}
      </group>

      {/* Right Heavy-Duty All-Terrain Caterpillar Track */}
      <group position={[0, 0.14, 0.65]}>
        <mesh castShadow>
          <boxGeometry args={[1.65, 0.34, 0.24]} />
          <meshStandardMaterial color="#060C14" roughness={0.9} metalness={0.1} />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((wX, idx) => (
          <mesh key={idx} position={[wX, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.26, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
          </mesh>
        ))}
      </group>

      {/* Forward Articulated Robotic Scrubbing Boom */}
      <group position={[0.9, 0.26, 0]}>
        {/* Boom Shaft */}
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.5, 12]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Gold T-Bracket */}
        <mesh position={[0.46, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* 1. Main Roller Scrubber (Deep Floor Contact) */}
        <group position={[0.5, -0.2, 0]} ref={centerRollerBrush}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.75, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.25} wireframe={true} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.77, 12]} />
            <meshStandardMaterial color="#0A192F" metalness={0.95} />
          </mesh>
        </group>

        {/* 2. Left Orbital Disc Scrubber (Wall Contact) */}
        <group position={[0.5, 0.06, -0.52]} ref={leftOrbitalBrush}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.38, 20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} wireframe={true} />
          </mesh>
        </group>

        {/* 3. Right Orbital Disc Scrubber (Wall Contact) */}
        <group position={[0.5, 0.06, 0.52]} ref={rightOrbitalBrush}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.38, 20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} wireframe={true} />
          </mesh>
        </group>

        {/* Active Degreaser Foam / Steam Particles */}
        {isCleaning && (
          <group position={[0.56, -0.15, 0]}>
            <mesh position={[0, -0.08, 0]}>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent={true} opacity={0.65} />
            </mesh>
            <mesh position={[0.1, 0.12, 0.25]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshBasicMaterial color="#93C5FD" transparent={true} opacity={0.55} />
            </mesh>
            <mesh position={[0.1, 0.12, -0.25]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshBasicMaterial color="#93C5FD" transparent={true} opacity={0.55} />
            </mesh>
          </group>
        )}
      </group>

      {/* Optical 360 HD Inspection Camera Turret */}
      <group position={[0.35, 0.54, 0]} ref={cameraDome}>
        <mesh castShadow>
          <sphereGeometry args={[0.17, 20, 20]} />
          <meshStandardMaterial color="#0E2442" metalness={0.92} roughness={0.12} />
        </mesh>
        <mesh position={[0.13, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.09, 16]} />
          <meshStandardMaterial color="#050D1A" metalness={1.0} roughness={0.0} />
        </mesh>
        <mesh position={[0.17, 0.02, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* Forward Dual High-Intensity LED Worklights */}
      <group position={[0.68, 0.36, -0.32]}>
        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.12]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[5, -0.4, 0]}
          angle={0.65}
          penumbra={0.35}
          intensity={22}
          color="#FFF7ED"
          distance={10}
        />
      </group>

      <group position={[0.68, 0.36, 0.32]}>
        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.12]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[5, -0.4, 0]}
          angle={0.65}
          penumbra={0.35}
          intensity={22}
          color="#FFF7ED"
          distance={10}
        />
      </group>

      {/* Sweeping Gold Laser Depth Scanner Fan */}
      {isInspecting && (
        <group position={[0.76, 0.58, 0]} ref={laserScanner}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.2, 2.4, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color="#D4AF37" transparent={true} opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#D4AF37" intensity={3.5} distance={4.5} />
        </group>
      )}

      {/* Rear Heavy-Duty Umbilical Supply Cable */}
      <mesh position={[-1.0, 0.26, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Realistic Commercial Kitchen Environment & Extraction Duct
 * Stainless steel cooklines, overhead canopy hood, extraction duct run,
 * safety tile flooring, and dynamic grease-to-clean transformation.
 */
function KitchenDuctEnvironment({ progress }) {
  const splitX = -4.8 + progress * 8.6 + 0.8;
  const cleanWidth = Math.max(0.1, Math.min(10.5, splitX - (-5.8)));
  const dirtyWidth = Math.max(0.1, Math.min(10.5, 5.8 - splitX));

  return (
    <group position={[0.8, 0, 0]}>
      {/* 1. Commercial Kitchen Floor (Non-Slip Quarry Tiles) */}
      <mesh position={[0, -2.4, 0]} receiveShadow>
        <boxGeometry args={[16, 0.1, 10]} />
        <meshStandardMaterial color="#1E293B" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Grout Grid Lines */}
      {[-5, -2.5, 0, 2.5, 5].map((fX, idx) => (
        <mesh key={idx} position={[fX, -2.34, 0]}>
          <boxGeometry args={[0.04, 0.01, 10]} />
          <meshBasicMaterial color="#0F172A" />
        </mesh>
      ))}

      {/* 2. Stainless Steel Rear Splashback Wall */}
      <mesh position={[0, 0.8, -3.4]} receiveShadow>
        <boxGeometry args={[16, 6.5, 0.1]} />
        <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.22} />
      </mesh>

      {/* 3. Cookline Equipment Under the Canopy */}
      {/* Flat-Top Commercial Grill (Left) */}
      <group position={[-2.8, -1.4, -1.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.0, 1.7, 1.4]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[1.9, 0.06, 1.3]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>

      {/* Twin-Vat Deep Fryer Station (Center) */}
      <group position={[0, -1.4, -1.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 1.7, 1.4]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Wire Fryer Baskets */}
        <mesh position={[-0.32, 1.1, 0]}>
          <boxGeometry args={[0.36, 0.36, 0.75]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} wireframe={true} />
        </mesh>
        <mesh position={[0.32, 1.1, 0]}>
          <boxGeometry args={[0.36, 0.36, 0.75]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} wireframe={true} />
        </mesh>
      </group>

      {/* Commercial Stainless Prep Station (Right) */}
      <group position={[2.8, -1.4, -1.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.0, 1.7, 1.4]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[2.0, 0.04, 1.4]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.06} />
        </mesh>
      </group>

      {/* 4. Large Commercial Canopy Hood & Connected Exhaust Duct */}
      <group position={[0, 1.4, -0.6]}>
        {/* Sloped Stainless Hood Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[8.4, 1.2, 2.6]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.16} />
        </mesh>

        {/* Angled Baffle Grease Filters */}
        {[-3.0, -1.5, 0, 1.5, 3.0].map((fX, idx) => (
          <mesh key={idx} position={[fX, -0.22, 0.2]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[1.0, 0.65, 0.08]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.82} roughness={0.22} wireframe={true} />
          </mesh>
        ))}

        {/* Perimeter Grease Gutter with Gold Accent */}
        <mesh position={[0, -0.58, 1.25]}>
          <boxGeometry args={[8.4, 0.14, 0.1]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Canopy Halogen Downlights */}
        {[-2.6, 0, 2.6].map((lX, idx) => (
          <group key={idx} position={[lX, -0.55, 0]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
              <meshBasicMaterial color="#FEF08A" />
            </mesh>
            <pointLight position={[0, -0.3, 0]} intensity={3.5} distance={5} color="#FEF08A" />
          </group>
        ))}
      </group>

      {/* Connected Vertical Exhaust Duct Riser with Front Inspection Cutaway */}
      <group position={[0, 3.0, -0.6]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[3.2, 2.0, 2.0]} />
          <meshStandardMaterial color="#475569" metalness={0.94} roughness={0.18} />
        </mesh>
        {/* Transparent Cutaway Window */}
        <mesh position={[0, 0, 1.01]}>
          <planeGeometry args={[3.0, 1.8]} />
          <meshPhysicalMaterial
            color="#0A192F"
            transmission={0.95}
            opacity={0.12}
            transparent={true}
            roughness={0.04}
            metalness={0.1}
          />
        </mesh>
        {/* Heavy Flanges */}
        <mesh position={[0, 0.95, 0]}>
          <boxGeometry args={[3.4, 0.15, 2.2]} />
          <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.95, 0]}>
          <boxGeometry args={[3.4, 0.15, 2.2]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
        </mesh>
      </group>

      {/* 5. Dynamic Surface Transformation: Dirty Grease vs. Sparkling Bare Metal */}
      {/* Clean Stainless Steel Reveal (Behind Robot) */}
      <mesh
        position={[-5.8 + cleanWidth / 2, 0.42, 0.55]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[cleanWidth, 1.3]} />
        <meshStandardMaterial color="#F8FAFC" metalness={0.98} roughness={0.04} />
      </mesh>

      {/* Uncleaned Burnt Grease (Ahead of Robot) */}
      <mesh
        position={[splitX + dirtyWidth / 2, 0.42, 0.55]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[dirtyWidth, 1.3]} />
        <meshStandardMaterial color="#221105" roughness={0.95} metalness={0.06} />
      </mesh>
    </group>
  );
}

/**
 * Studio Commercial Kitchen Lighting
 */
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.95} color="#FFFFFF" />
      <directionalLight position={[7, 11, 8]} intensity={2.4} color="#BAE6FD" castShadow />
      <directionalLight position={[-7, -4, -5]} intensity={2.0} color="#FDE68A" />
      <pointLight position={[0, 2.8, 2]} intensity={4.0} distance={9} color="#FFFFFF" />
      <pointLight position={[-3.5, 1.2, 1.2]} intensity={3.0} distance={7} color="#FEF08A" />
      <pointLight position={[3.5, 1.2, 1.2]} intensity={3.0} distance={7} color="#93C5FD" />
    </>
  );
}

/**
 * Camera Controller with Damped Mouse Parallax & Mobile Automatic Motion
 */
function DampedParallaxCamera({ progress, mousePos }) {
  const targetX = useRef(0.8);
  const targetY = useRef(0.8);

  useFrame(({ camera }) => {
    // Automatic base cinematic progression
    const t = progress * Math.PI * 2;
    const autoX = 0.8 + Math.sin(t * 0.5) * 0.8;
    const autoY = 0.6 + Math.cos(t * 0.5) * 0.25;
    const autoZ = 5.8 - Math.sin(progress * Math.PI) * 0.5;

    // Subtle, damped cursor offset (lerp)
    targetX.current = THREE.MathUtils.lerp(targetX.current, autoX + mousePos.x * 0.6, 0.05);
    targetY.current = THREE.MathUtils.lerp(targetY.current, autoY + mousePos.y * 0.4, 0.05);

    camera.position.x = targetX.current;
    camera.position.y = targetY.current;
    camera.position.z = autoZ;
    camera.lookAt(0.8, 0.2, -0.4);
  });

  return null;
}

/**
 * Main Cinematic Hero 3D Scene Component
 * Autonomous cleaning loop: Dirty Canopy → Robot Scrubbing → Clean Bare Metal → Inspection Scan
 */
export function CinematicHeroScene() {
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 10-Second Continuous Autonomous Cleaning Loop
  useEffect(() => {
    let animationFrameId;
    let startTime = performance.now();
    const loopDuration = 10000;

    const animate = (time) => {
      const elapsed = (time - startTime) % loopDuration;
      setProgress(elapsed / loopDuration);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Subtle Mouse Parallax Handler
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = -(e.clientY / innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-[#050D1A]">
            <div className="w-10 h-10 border-3 border-slate-700 border-t-amber-400 rounded-full animate-spin" />
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0.8, 0.8, 5.8], fov: 42 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-default"
        >
          <color attach="background" args={['#050D1A']} />
          <StudioLighting />
          <DampedParallaxCamera progress={progress} mousePos={mousePos} />

          <group position={[0, 0, 0]}>
            <KitchenDuctEnvironment progress={progress} />
            <AutonomousRobot progress={progress} />
          </group>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default CinematicHeroScene;
