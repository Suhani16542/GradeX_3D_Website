import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, Sparkles, Eye, Video, ChevronRight, ShieldCheck } from 'lucide-react';

/**
 * 1. Robotic Crawler Machine Inside Exhaust Duct
 * Features moving chassis, continuous counter-rotating scrubbing brushes,
 * pan-tilt camera, forward LED spotlights, and grease-thickness laser beam.
 */
function HeroRoboticCrawler({ progress, isCleaning, isInspecting }) {
  const robotGroup = useRef();
  const topBrush = useRef();
  const sideBrushLeft = useRef();
  const sideBrushRight = useRef();
  const cameraDome = useRef();
  const laserScanner = useRef();

  // Traversal: enters at X = -3.4, progresses through duct to X = +2.8
  const posX = -3.4 + progress * 6.2;

  useFrame((_, delta) => {
    // High-speed continuous brush rotation (1,500+ RPM)
    if (isCleaning) {
      if (topBrush.current) topBrush.current.rotation.x += delta * 25;
      if (sideBrushLeft.current) sideBrushLeft.current.rotation.y += delta * 25;
      if (sideBrushRight.current) sideBrushRight.current.rotation.y -= delta * 25;
    }

    // Inspection camera subtle scanning pan
    if (isInspecting && cameraDome.current) {
      cameraDome.current.rotation.y = Math.sin(progress * Math.PI * 6) * 0.45;
      cameraDome.current.rotation.x = 0.15 + Math.sin(progress * Math.PI * 4) * 0.15;
    }

    // Laser inspection fan oscillation
    if (isInspecting && laserScanner.current) {
      laserScanner.current.rotation.z = Math.sin(progress * Math.PI * 8) * 0.45;
    }
  });

  return (
    <group ref={robotGroup} position={[posX, -0.68, 0]}>
      {/* Heavy-Duty Industrial Chassis (Grade X Navy) */}
      <mesh position={[0, 0.24, 0]} castShadow>
        <boxGeometry args={[1.35, 0.3, 1.05]} />
        <meshStandardMaterial color="#0A192F" metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Gold Reinforced Armor Protection Plate */}
      <mesh position={[0, 0.41, 0]}>
        <boxGeometry args={[1.05, 0.08, 0.85]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Grade X Identity Plate */}
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[0.4, 0.02, 0.22]} />
        <meshStandardMaterial color="#050D1A" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Left Heavy-Duty All-Terrain Caterpillar Track */}
      <group position={[0, 0.13, -0.56]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.3, 0.22]} />
          <meshStandardMaterial color="#060C14" roughness={0.9} metalness={0.1} />
        </mesh>
        {[-0.55, 0, 0.55].map((wX, idx) => (
          <mesh key={idx} position={[wX, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.24, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.25} />
          </mesh>
        ))}
      </group>

      {/* Right Heavy-Duty All-Terrain Caterpillar Track */}
      <group position={[0, 0.13, 0.56]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.3, 0.22]} />
          <meshStandardMaterial color="#060C14" roughness={0.9} metalness={0.1} />
        </mesh>
        {[-0.55, 0, 0.55].map((wX, idx) => (
          <mesh key={idx} position={[wX, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.24, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.25} />
          </mesh>
        ))}
      </group>

      {/* Forward Scrubbing Boom with Multiple Wall-Contact Brushes */}
      <group position={[0.8, 0.24, 0]}>
        {/* Main Boom Arm */}
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.48, 12]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Gold T-Bar Bracket */}
        <mesh position={[0.44, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.35, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 1. Floor & Ceiling Scrubber (Horizontal Roller Brush) */}
        <group position={[0.48, -0.16, 0]} ref={topBrush}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.7, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} wireframe={true} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.72, 12]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} />
          </mesh>
        </group>

        {/* 2. Left Wall Scrubber (Vertical Disc Brush Touching Left Wall) */}
        <group position={[0.48, 0.15, -0.48]} ref={sideBrushLeft}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.38, 20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} wireframe={true} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 12]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} />
          </mesh>
        </group>

        {/* 3. Right Wall Scrubber (Vertical Disc Brush Touching Right Wall) */}
        <group position={[0.48, 0.15, 0.48]} ref={sideBrushRight}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.38, 20]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.75} roughness={0.25} wireframe={true} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 12]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} />
          </mesh>
        </group>

        {/* Active Scrubbing Mist / Foam Particles */}
        {isCleaning && (
          <group position={[0.55, -0.15, 0]}>
            <mesh>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent={true} opacity={0.65} />
            </mesh>
            <mesh position={[0.1, 0.12, 0.25]}>
              <sphereGeometry args={[0.14, 8, 8]} />
              <meshBasicMaterial color="#93C5FD" transparent={true} opacity={0.55} />
            </mesh>
          </group>
        )}
      </group>

      {/* Optical 360 HD Inspection Camera Turret */}
      <group position={[0.32, 0.48, 0]} ref={cameraDome}>
        <mesh castShadow>
          <sphereGeometry args={[0.17, 20, 20]} />
          <meshStandardMaterial color="#0E2442" metalness={0.92} roughness={0.12} />
        </mesh>
        {/* Optical Lens */}
        <mesh position={[0.13, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.09, 16]} />
          <meshStandardMaterial color="#050D1A" metalness={1.0} roughness={0.0} />
        </mesh>
        {/* Optical Glass Lens Element */}
        <mesh position={[0.17, 0.02, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* Ultra-Bright Dual Forward LED Worklights */}
      <group position={[0.62, 0.34, -0.3]}>
        <mesh>
          <boxGeometry args={[0.09, 0.09, 0.11]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[4.5, -0.4, 0]}
          angle={0.65}
          penumbra={0.35}
          intensity={18}
          color="#FFF7ED"
          distance={9}
        />
      </group>

      <group position={[0.62, 0.34, 0.3]}>
        <mesh>
          <boxGeometry args={[0.09, 0.09, 0.11]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[4.5, -0.4, 0]}
          angle={0.65}
          penumbra={0.35}
          intensity={18}
          color="#FFF7ED"
          distance={9}
        />
      </group>

      {/* Laser Inspection Scanner Fan Beam */}
      {isInspecting && (
        <group position={[0.7, 0.5, 0]} ref={laserScanner}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.18, 2.3, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color="#D4AF37" transparent={true} opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#D4AF37" intensity={3.0} distance={4} />
        </group>
      )}

      {/* Industrial Rear Power & Chemical Umbilical Cable */}
      <mesh position={[-0.9, 0.24, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.65, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
    </group>
  );
}

/**
 * 2. Commercial Kitchen Canopy & Stainless Exhaust Duct
 * Features sloped hood, baffle grease filters, cutaway front opening,
 * and dynamic grease-to-bare-metal surface transition.
 */
function HeroCanopyAndDuct({ progress }) {
  const splitX = -3.4 + progress * 6.2 + 0.65;
  const cleanWidth = Math.max(0.1, Math.min(8.2, splitX - (-4.2)));
  const dirtyWidth = Math.max(0.1, Math.min(8.2, 4.2 - splitX));

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Commercial Kitchen Canopy Hood (Left Intake Section) */}
      <group position={[-4.5, -1.2, 0]}>
        {/* Canopy Hood Main Sloped Stainless Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 1.2, 2.3]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.16} />
        </mesh>
        {/* Slanted Commercial Baffle Grease Filters */}
        <mesh position={[0.25, -0.15, 0]} rotation={[0, 0, -Math.PI / 5.5]}>
          <boxGeometry args={[0.1, 0.75, 1.9]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.82} roughness={0.22} wireframe={true} />
        </mesh>
        {/* Canopy Perimeter Grease Catch Gutter */}
        <mesh position={[0.7, -0.5, 0]}>
          <boxGeometry args={[0.12, 0.16, 2.3]} />
          <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Canopy Brand Badge */}
        <mesh position={[-0.76, 0.22, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.3, 0.28]} />
          <meshBasicMaterial color="#050D1A" />
        </mesh>
      </group>

      {/* 2. Stainless Steel Exhaust Duct Riser & Horizontal Run */}
      {/* Interior Floor */}
      <mesh position={[0, -0.96, 0]} receiveShadow>
        <boxGeometry args={[8.4, 0.08, 1.9]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.94} roughness={0.15} />
      </mesh>

      {/* Interior Ceiling */}
      <mesh position={[0, 1.18, 0]} receiveShadow>
        <boxGeometry args={[8.4, 0.08, 1.9]} />
        <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Rear Stainless Steel Duct Wall */}
      <mesh position={[0, 0.11, -0.95]} receiveShadow>
        <boxGeometry args={[8.4, 2.15, 0.08]} />
        <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.2} />
      </mesh>

      {/* Front Cutaway Inspection Window (Transparent for Clear Interior View) */}
      <mesh position={[0, 0.11, 0.95]}>
        <boxGeometry args={[8.4, 2.15, 0.04]} />
        <meshPhysicalMaterial
          color="#0A192F"
          transmission={0.94}
          opacity={0.15}
          transparent={true}
          roughness={0.04}
          metalness={0.1}
          reflectivity={0.98}
        />
      </mesh>

      {/* Heavy-Duty Structural Duct Flanges & Joining Brackets */}
      {[-3.2, -1.1, 1.1, 3.2].map((fX, idx) => (
        <group key={idx} position={[fX, 0.11, 0]}>
          {/* Top Flange Bar */}
          <mesh position={[0, 1.08, 0]}>
            <boxGeometry args={[0.13, 0.13, 2.1]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Bottom Flange Bar */}
          <mesh position={[0, -1.08, 0]}>
            <boxGeometry args={[0.13, 0.13, 2.1]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Rear Flange Bar */}
          <mesh position={[0, 0, -1.01]}>
            <boxGeometry args={[0.13, 2.25, 0.09]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Front Flange Bar */}
          <mesh position={[0, 0, 1.01]}>
            <boxGeometry args={[0.13, 2.25, 0.09]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      ))}

      {/* 3. DYNAMIC SURFACE REVEAL: Clean vs. Dirty */}
      {/* Clean Bare-Metal Stainless Steel (Behind the Robot) */}
      <mesh
        position={[-4.2 + cleanWidth / 2, -0.91, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[cleanWidth, 1.8]} />
        <meshStandardMaterial color="#F1F5F9" metalness={0.98} roughness={0.05} />
      </mesh>

      {/* Uncleaned Flammable Grease Buildup (Ahead of the Robot) */}
      <mesh
        position={[splitX + dirtyWidth / 2, -0.91, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[dirtyWidth, 1.8]} />
        <meshStandardMaterial color="#221105" roughness={0.94} metalness={0.08} />
      </mesh>

      {/* Grease on Rear Wall (Ahead of the Robot) */}
      <mesh position={[splitX + dirtyWidth / 2, 0.11, -0.9]}>
        <planeGeometry args={[dirtyWidth, 2.05]} />
        <meshStandardMaterial color="#1B0D03" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Clean Polished Stainless Steel on Rear Wall (Behind the Robot) */}
      <mesh position={[-4.2 + cleanWidth / 2, 0.11, -0.9]}>
        <planeGeometry args={[cleanWidth, 2.05]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.96} roughness={0.08} />
      </mesh>
    </group>
  );
}

/**
 * 3. Studio High-Visibility Lighting Setup
 * High brightness and contrast ensuring robot and duct interior are 100% visible.
 */
function HeroStudioLighting() {
  return (
    <>
      <ambientLight intensity={0.9} color="#FFFFFF" />
      {/* Key Directional Tech Blue Light */}
      <directionalLight position={[8, 10, 8]} intensity={2.4} color="#BAE6FD" castShadow />
      {/* Gold Rim Accent Light */}
      <directionalLight position={[-8, -5, -6]} intensity={2.0} color="#FDE68A" />
      {/* Overhead Duct Interior Spotlights */}
      <pointLight position={[-2, 0.9, 0]} intensity={3.5} distance={8} color="#FFFFFF" />
      <pointLight position={[2, 0.9, 0]} intensity={3.5} distance={8} color="#FEF08A" />
    </>
  );
}

/**
 * Animated Kitchen Exhaust Structure Wrapper
 * Applies gentle, controlled viewing angle oscillation (no fast dizzying spin).
 */
function AnimatedExhaustStructure({ progress, isCleaning, isInspecting, isPaused }) {
  const structureGroup = useRef();

  useFrame((state) => {
    if (structureGroup.current) {
      // Gentle, controlled sinusoidal angle shift between -6° and +6° (0.1 rad)
      const t = state.clock.getElapsedTime();
      structureGroup.current.rotation.y = Math.sin(t * 0.4) * 0.1;
      structureGroup.current.rotation.x = 0.04 + Math.cos(t * 0.3) * 0.03;
    }
  });

  return (
    <group ref={structureGroup} position={[0, 0, 0]}>
      <HeroCanopyAndDuct progress={progress} />
      <HeroRoboticCrawler
        progress={progress}
        isCleaning={isCleaning}
        isInspecting={isInspecting}
      />
    </group>
  );
}

/**
 * Main Hero Section 3D Scene Component
 * Clean continuous loop: Dirty Duct → Robot Enters → Brushes Scrub Walls → Inspection Scan → Clean Duct
 */
export function HeroExhaustScene() {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCleaning, setIsCleaning] = useState(true);
  const [isInspecting, setIsInspecting] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReducedMotion(true);
      setIsPaused(true);
    }
  }, []);

  // 10-Second Complete Continuous Cleaning Loop
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    let animationFrameId;
    let startTime = performance.now();
    const loopDuration = 10000; // 10 seconds per loop

    const animate = (time) => {
      const elapsed = (time - startTime) % loopDuration;
      setProgress(elapsed / loopDuration);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, reducedMotion]);

  // Stage Indicator
  const stage = progress < 0.2
    ? "1. Robot Entering Dirty Kitchen Exhaust Duct"
    : progress < 0.75
    ? "2. High-Speed Rotary Scrubbing & Grease Removal"
    : "3. Optical Inspection & Mirror-Clean AS 1851 Compliance";

  return (
    <div className="relative w-full h-[470px] sm:h-[530px] lg:h-[590px] rounded-2xl glass-panel overflow-hidden border border-amber-400/30 shadow-2xl bg-gradient-to-b from-[#050D1A] via-[#0A192F] to-[#050D1A]">
      {/* Top Status HUD */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-[#050D1A]/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-amber-400/30 text-xs shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span className="font-bold text-white tracking-wide">Robotic Kitchen Exhaust Cleaning</span>
          <span className="text-amber-400 font-mono text-[10px] hidden sm:inline">• LIVE WORKFLOW</span>
        </div>

        <div className="flex items-center gap-2 bg-[#0A192F]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-slate-200">
          <span className="text-sky-300 flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-sky-400" /> CRAWLER CAM: ACTIVE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-300 font-bold">BRUSHES: {isCleaning ? '1500 RPM' : 'OFF'}</span>
        </div>
      </div>

      {/* Cycle Progress Bar */}
      <div className="absolute top-14 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-[#050D1A]/90 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800 text-[11px] text-amber-300 font-medium">
          {stage}
        </div>
        <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700 hidden sm:block">
          <div
            className="bg-gradient-to-r from-amber-400 to-amber-300 h-full transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* 3D Canvas */}
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3 bg-[#050D1A]">
            <div className="w-10 h-10 border-3 border-slate-700 border-t-amber-400 rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Loading Robotic Kitchen Exhaust System...
            </p>
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0, 1.5, 5.5], fov: 42 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={['#050D1A']} />
          <HeroStudioLighting />

          <AnimatedExhaustStructure
            progress={progress}
            isCleaning={isCleaning}
            isInspecting={isInspecting}
            isPaused={isPaused}
          />

          <OrbitControls
            enableZoom={true}
            minDistance={2.5}
            maxDistance={8.5}
            maxPolarAngle={Math.PI / 2 + 0.15}
            minPolarAngle={0.2}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Bottom Interactive Controls */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-[#050D1A]/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-xl">
          <button
            type="button"
            onClick={() => setIsCleaning(!isCleaning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              isCleaning
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isCleaning ? 'Scrubber: Active' : 'Scrubber: Paused'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInspecting(!isInspecting)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              isInspecting
                ? 'bg-[#15325B] text-sky-200 border border-sky-400/40'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isInspecting ? 'Laser Scan: ON' : 'Scan: OFF'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title={isPaused ? 'Resume Cleaning Loop' : 'Pause Cleaning Loop'}
          >
            {isPaused ? <Play className="w-4 h-4 text-amber-400" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        {/* Visual Flow Tags */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-[#050D1A]/90 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-amber-400">Dirty Duct</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-sky-300">Robotic Scrub</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-emerald-400">Clean Metal</span>
        </div>

        <div className="hidden lg:block text-[11px] text-slate-400 font-mono bg-[#050D1A]/80 px-2.5 py-1 rounded-md border border-slate-800">
          Drag to rotate 360° • Scroll to zoom
        </div>
      </div>
    </div>
  );
}

export default HeroExhaustScene;
