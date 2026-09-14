import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Eye, Play, Pause, Video, Cpu, CheckCircle2, ChevronRight } from 'lucide-react';

/**
 * Close-Up Internal Duct Robotic Scrubber
 * Detailed dual rotary brushes, degreaser injection jets, and optical camera.
 */
function InternalDuctScrubber({ progress, isCleaning, isInspecting }) {
  const scrubberGroup = useRef();
  const brushTop = useRef();
  const brushBottom = useRef();
  const brushLeft = useRef();
  const brushRight = useRef();
  const cameraTurret = useRef();
  const laserScanner = useRef();

  // Moves forward through the internal duct section from Z = -2.5 to Z = +2.5
  const posZ = -2.5 + progress * 5.0;

  useFrame((_, delta) => {
    // High-speed brush rotation
    if (isCleaning) {
      if (brushTop.current) brushTop.current.rotation.x += delta * 26;
      if (brushBottom.current) brushBottom.current.rotation.x -= delta * 26;
      if (brushLeft.current) brushLeft.current.rotation.y += delta * 26;
      if (brushRight.current) brushRight.current.rotation.y -= delta * 26;
    }

    // Camera 360 sweep
    if (isInspecting && cameraTurret.current) {
      cameraTurret.current.rotation.y = Math.sin(progress * Math.PI * 6) * 0.5;
      cameraTurret.current.rotation.x = 0.1 + Math.sin(progress * Math.PI * 4) * 0.15;
    }

    // Laser scan sweep
    if (isInspecting && laserScanner.current) {
      laserScanner.current.rotation.z = Math.sin(progress * Math.PI * 8) * 0.5;
    }
  });

  return (
    <group ref={scrubberGroup} position={[0, -0.2, posZ]}>
      {/* Heavy-Duty Compact Robotic Core Chassis */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.1, 0.32, 1.4]} />
        <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Gold Reinforced Top Plate */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.9, 0.06, 1.1]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.94} roughness={0.12} />
      </mesh>

      {/* Heavy-Duty Drive Tracks */}
      <mesh position={[-0.6, -0.06, 0]} castShadow>
        <boxGeometry args={[0.2, 0.28, 1.55]} />
        <meshStandardMaterial color="#060C14" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0.6, -0.06, 0]} castShadow>
        <boxGeometry args={[0.2, 0.28, 1.55]} />
        <meshStandardMaterial color="#060C14" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Quad Rotary Brushing Assembly (Touching All 4 Duct Internal Walls) */}
      <group position={[0, 0, 0.9]}>
        {/* Central Drive Hub */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 1. Floor Scrubber (Touching Duct Floor) */}
        <group position={[0, -0.42, 0.1]} ref={brushBottom}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.7, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} wireframe={true} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.72, 12]} />
            <meshStandardMaterial color="#050D1A" metalness={0.95} />
          </mesh>
        </group>

        {/* 2. Ceiling Scrubber (Touching Duct Ceiling) */}
        <group position={[0, 0.42, 0.1]} ref={brushTop}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.7, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} wireframe={true} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.72, 12]} />
            <meshStandardMaterial color="#050D1A" metalness={0.95} />
          </mesh>
        </group>

        {/* 3. Left Wall Scrubber (Touching Left Duct Wall) */}
        <group position={[-0.52, 0, 0.1]} ref={brushLeft}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.4, 20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} wireframe={true} />
          </mesh>
        </group>

        {/* 4. Right Wall Scrubber (Touching Right Duct Wall) */}
        <group position={[0.52, 0, 0.1]} ref={brushRight}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.4, 20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} wireframe={true} />
          </mesh>
        </group>

        {/* Active Chemical Degreaser Foam Injection Mist */}
        {isCleaning && (
          <group position={[0, 0, 0.2]}>
            <mesh position={[0, -0.3, 0]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent={true} opacity={0.65} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshBasicMaterial color="#93C5FD" transparent={true} opacity={0.55} />
            </mesh>
          </group>
        )}
      </group>

      {/* HD Optical Inspection Camera */}
      <group position={[0, 0.28, 0.3]} ref={cameraTurret}>
        <mesh castShadow>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color="#0E2442" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
          <meshStandardMaterial color="#050D1A" metalness={1.0} roughness={0.0} />
        </mesh>
        <mesh position={[0, 0, 0.18]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* Dual Forward LED Spotlights */}
      <group position={[-0.32, 0.18, 0.65]}>
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0, 0, 0.1]}
          target-position={[0, -0.2, 5]}
          angle={0.65}
          penumbra={0.35}
          intensity={16}
          color="#FFF7ED"
          distance={8}
        />
      </group>

      <group position={[0.32, 0.18, 0.65]}>
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0, 0, 0.1]}
          target-position={[0, -0.2, 5]}
          angle={0.65}
          penumbra={0.35}
          intensity={16}
          color="#FFF7ED"
          distance={8}
        />
      </group>

      {/* Laser Grease Depth Scanner Fan */}
      {isInspecting && (
        <group position={[0, 0.32, 0.6]} ref={laserScanner}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.15, 2.0, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color="#D4AF37" transparent={true} opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#D4AF37" intensity={2.5} distance={3.5} />
        </group>
      )}

      {/* Rear Heavy-Duty Umbilical Supply Line */}
      <mesh position={[0, 0.08, -0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.6, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Close-Up Stainless Steel Duct Internal Structure
 * Cross-section with floor, ceiling, left wall, and cutaway right wall.
 */
function InternalDuctStructure({ progress }) {
  const splitZ = -2.5 + progress * 5.0 + 0.5;
  const cleanLength = Math.max(0.1, Math.min(6.5, splitZ - (-3.2)));
  const dirtyLength = Math.max(0.1, Math.min(6.5, 3.2 - splitZ));

  return (
    <group position={[0, 0, 0]}>
      {/* Duct Floor */}
      <mesh position={[0, -0.85, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.08, 6.5]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.92} roughness={0.16} />
      </mesh>

      {/* Duct Ceiling */}
      <mesh position={[0, 0.95, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.08, 6.5]} />
        <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-1.2, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.08, 1.8, 6.5]} />
        <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.22} />
      </mesh>

      {/* Right Wall: Transparent Cutaway Portal */}
      <mesh position={[1.2, 0.05, 0]}>
        <boxGeometry args={[0.04, 1.8, 6.5]} />
        <meshPhysicalMaterial
          color="#0A192F"
          transmission={0.92}
          opacity={0.15}
          transparent={true}
          roughness={0.05}
          metalness={0.1}
          reflectivity={0.95}
        />
      </mesh>

      {/* Heavy Structural Exterior Flanges */}
      {[-2.2, 0, 2.2].map((fZ, idx) => (
        <group key={idx} position={[0, 0.05, fZ]}>
          <mesh position={[0, 0.94, 0]}>
            <boxGeometry args={[2.55, 0.12, 0.08]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.94, 0]}>
            <boxGeometry args={[2.55, 0.12, 0.08]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[-1.25, 0, 0]}>
            <boxGeometry args={[0.1, 1.95, 0.08]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
          </mesh>
          <mesh position={[1.25, 0, 0]}>
            <boxGeometry args={[0.1, 1.95, 0.08]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      ))}

      {/* Clean Stainless Steel Floor (Behind Robot) */}
      <mesh
        position={[0, -0.80, -3.2 + cleanLength / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.3, cleanLength]} />
        <meshStandardMaterial color="#F1F5F9" metalness={0.98} roughness={0.05} />
      </mesh>

      {/* Dirty Burnt Grease Layer on Floor (Ahead of Robot) */}
      <mesh
        position={[0, -0.80, splitZ + dirtyLength / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.3, dirtyLength]} />
        <meshStandardMaterial color="#221105" roughness={0.94} metalness={0.08} />
      </mesh>

      {/* Dirty Grease on Left Wall (Ahead of Robot) */}
      <mesh
        position={[-1.15, 0.05, splitZ + dirtyLength / 2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[dirtyLength, 1.7]} />
        <meshStandardMaterial color="#1A0D03" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Clean Polished Left Wall (Behind Robot) */}
      <mesh
        position={[-1.15, 0.05, -3.2 + cleanLength / 2]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[cleanLength, 1.7]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.96} roughness={0.08} />
      </mesh>
    </group>
  );
}

/**
 * Studio Lighting Setup for Close-Up Tech Scene
 */
function TechStudioLighting() {
  return (
    <>
      <ambientLight intensity={0.9} color="#FFFFFF" />
      <directionalLight position={[6, 8, 6]} intensity={2.2} color="#BAE6FD" castShadow />
      <directionalLight position={[-6, -4, -6]} intensity={1.8} color="#FDE68A" />
      <pointLight position={[0, 0.6, -1.5]} intensity={3.0} distance={6} color="#FFFFFF" />
      <pointLight position={[0, 0.6, 1.5]} intensity={3.0} distance={6} color="#FEF08A" />
    </>
  );
}

/**
 * 3D Scene for Section 4: Robotic Exhaust Cleaning Technology
 */
export function TechInternalDuctScene() {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCleaning, setIsCleaning] = useState(true);
  const [isInspecting, setIsInspecting] = useState(true);

  // 8-Second Continuous Close-Up Cleaning Loop
  useEffect(() => {
    if (isPaused) return;
    let animationFrameId;
    let startTime = performance.now();
    const loopDuration = 8000;

    const animate = (time) => {
      const elapsed = (time - startTime) % loopDuration;
      setProgress(elapsed / loopDuration);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl glass-panel overflow-hidden border border-amber-400/25 shadow-2xl bg-[#050D1A]">
      {/* Top HUD */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#050D1A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-400/30 text-xs">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold text-white">Internal Duct Scrubber Close-Up</span>
        </div>
        <div className="text-[11px] font-mono text-amber-300 bg-[#0A192F]/90 px-3 py-1 rounded-md border border-slate-700">
          ROTARY BRUSHES: {isCleaning ? '1500 RPM ACTIVE' : 'PAUSED'}
        </div>
      </div>

      {/* 3D Canvas */}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-[#050D1A]">
            <div className="w-8 h-8 border-2 border-slate-700 border-t-amber-400 rounded-full animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [3.2, 1.8, 3.4], fov: 40 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={['#050D1A']} />
          <TechStudioLighting />

          <group position={[0, 0, 0]}>
            <InternalDuctStructure progress={progress} />
            <InternalDuctScrubber
              progress={progress}
              isCleaning={isCleaning}
              isInspecting={isInspecting}
            />
          </group>

          <OrbitControls
            enableZoom={true}
            minDistance={2.0}
            maxDistance={7.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={0.2}
            autoRotate={!isPaused}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Bottom Controls */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-[#050D1A]/95 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => setIsCleaning(!isCleaning)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
              isCleaning ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {isCleaning ? 'Scrubbing: ON' : 'Scrubbing: OFF'}
          </button>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>

        <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
          Close-Up 3D View • Drag to rotate
        </span>
      </div>
    </div>
  );
}

export default TechInternalDuctScene;
