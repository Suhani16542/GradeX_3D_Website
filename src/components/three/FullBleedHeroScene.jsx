import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Video, Sparkles, Eye, ShieldCheck, Play, Pause, ChevronRight, Zap } from 'lucide-react';

/**
 * NEW ADVANCED ROBOT DESIGN:
 * High-Tech Cybernetic Commercial Exhaust Cleaning Robot
 * Features:
 * - Dual articulated robotic manipulator arms
 * - High-speed dual orbital scrubbing disc heads with spinning gold bristles
 * - Heavy-duty modular multi-roller track treads with chrome drive hubs
 * - Glowing optical LiDAR dome with sweeping dual laser targeting beams
 * - Twin high-pressure chemical spray nozzles with active misting spray
 * - Grade X Navy & Polished Gold Cyber-Armor shell with illuminated status indicators
 * - Hydraulic pistons and braided umbilical supply conduits
 */
function AdvancedCyberneticRobot({ progress, isCleaning, isInspecting }) {
  const robotRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftOrbitalBrush = useRef();
  const rightOrbitalBrush = useRef();
  const centralRollerBrush = useRef();
  const lidarTurret = useRef();
  const laserScanner = useRef();
  const sprayEmitterRef = useRef();

  // Traverses across the duct from X = -4.5 to X = +4.0
  const posX = -4.5 + progress * 8.5;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // High-speed brush rotation (2,200 RPM)
    if (isCleaning) {
      if (leftOrbitalBrush.current) leftOrbitalBrush.current.rotation.z += delta * 30;
      if (rightOrbitalBrush.current) rightOrbitalBrush.current.rotation.z -= delta * 30;
      if (centralRollerBrush.current) centralRollerBrush.current.rotation.x += delta * 32;

      // Articulated robotic arms micro-adjusting and scrubbing the surface
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = Math.sin(t * 8) * 0.12;
        leftArmRef.current.rotation.y = -0.15 + Math.cos(t * 6) * 0.08;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -Math.sin(t * 8) * 0.12;
        rightArmRef.current.rotation.y = 0.15 - Math.cos(t * 6) * 0.08;
      }
    }

    // LiDAR 360-degree high-speed optical sweep
    if (isInspecting && lidarTurret.current) {
      lidarTurret.current.rotation.y += delta * 3.5;
    }

    // Laser depth scanner oscillation
    if (isInspecting && laserScanner.current) {
      laserScanner.current.rotation.z = Math.sin(progress * Math.PI * 8) * 0.5;
    }
  });

  return (
    <group ref={robotRef} position={[posX, -0.45, 0.2]}>
      {/* 1. Main Aerodynamic Cyber-Chassis (Grade X Navy Blue #0A192F) */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.6, 0.38, 1.25]} />
        <meshStandardMaterial color="#0A192F" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Futuristic Angular Armor Plating with Gold Chamfers */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.3, 0.1, 1.0]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Central Cybernetic Reactor / Power Core (Glowing Amber/Cyan) */}
      <group position={[0, 0.58, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.06, 24]} />
          <meshStandardMaterial color="#050D1A" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
        <pointLight position={[0, 0.1, 0]} intensity={2.0} color="#FBBF24" distance={2} />
      </group>

      {/* 2. Heavy-Duty Multi-Wheel Track Drive Assemblies */}
      {/* Left Track Module */}
      <group position={[0, 0.16, -0.72]}>
        <mesh castShadow>
          <boxGeometry args={[1.75, 0.38, 0.26]} />
          <meshStandardMaterial color="#050A10" roughness={0.9} metalness={0.1} />
        </mesh>
        {/* Drive Wheels with Gold Sprockets */}
        {[-0.65, -0.22, 0.22, 0.65].map((wX, idx) => (
          <mesh key={idx} position={[wX, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.29, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Right Track Module */}
      <group position={[0, 0.16, 0.72]}>
        <mesh castShadow>
          <boxGeometry args={[1.75, 0.38, 0.26]} />
          <meshStandardMaterial color="#050A10" roughness={0.9} metalness={0.1} />
        </mesh>
        {[-0.65, -0.22, 0.22, 0.65].map((wX, idx) => (
          <mesh key={idx} position={[wX, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.29, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 3. Dual Articulated Robotic Manipulator Arms */}
      {/* Left Robotic Arm with High-Speed Orbital Scrubber */}
      <group position={[0.85, 0.3, -0.45]} ref={leftArmRef}>
        {/* Arm Shoulder Joint */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.22, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} />
        </mesh>
        {/* Bicep Actuator Piston */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.5, 12]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.98} roughness={0.08} />
        </mesh>
        {/* Orbital Brush Head Assembly */}
        <group position={[0.6, -0.15, 0]} ref={leftOrbitalBrush}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.18, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} wireframe={true} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
            <meshStandardMaterial color="#0A192F" metalness={0.95} />
          </mesh>
        </group>
      </group>

      {/* Right Robotic Arm with High-Speed Orbital Scrubber */}
      <group position={[0.85, 0.3, 0.45]} ref={rightArmRef}>
        {/* Arm Shoulder Joint */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.22, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} />
        </mesh>
        {/* Bicep Actuator Piston */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.5, 12]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.98} roughness={0.08} />
        </mesh>
        {/* Orbital Brush Head Assembly */}
        <group position={[0.6, -0.15, 0]} ref={rightOrbitalBrush}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.18, 24]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} wireframe={true} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
            <meshStandardMaterial color="#0A192F" metalness={0.95} />
          </mesh>
        </group>
      </group>

      {/* Central Underbelly Roller Scrubber (Deep Floor Contact) */}
      <group position={[1.1, 0.08, 0]} ref={centralRollerBrush}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.7, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.25} wireframe={true} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.72, 12]} />
          <meshStandardMaterial color="#050D1A" metalness={0.95} />
        </mesh>
      </group>

      {/* 4. Active High-Pressure Chemical Injection Nozzles & Foam Mist */}
      {isCleaning && (
        <group position={[1.3, 0.08, 0]} ref={sprayEmitterRef}>
          {/* Left Spray Cone */}
          <mesh position={[0, -0.05, -0.3]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.25, 0.6, 12]} />
            <meshBasicMaterial color="#93C5FD" transparent={true} opacity={0.4} />
          </mesh>
          {/* Right Spray Cone */}
          <mesh position={[0, -0.05, 0.3]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.25, 0.6, 12]} />
            <meshBasicMaterial color="#93C5FD" transparent={true} opacity={0.4} />
          </mesh>
          {/* Foam Particles Bubble Cluster */}
          <mesh position={[0.2, -0.15, 0]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent={true} opacity={0.7} />
          </mesh>
          <mesh position={[0.3, 0.1, 0.3]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshBasicMaterial color="#BAE6FD" transparent={true} opacity={0.6} />
          </mesh>
          <mesh position={[0.3, 0.1, -0.3]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshBasicMaterial color="#BAE6FD" transparent={true} opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* 5. Optical 360-Degree LiDAR & Camera Turret */}
      <group position={[0.45, 0.62, 0]} ref={lidarTurret}>
        {/* Main Turret Dome */}
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.22, 24]} />
          <meshStandardMaterial color="#0E2442" metalness={0.92} roughness={0.12} />
        </mesh>
        {/* Optical Sensor Bezel */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 24]} />
          <meshStandardMaterial color="#050D1A" metalness={1.0} roughness={0.0} />
        </mesh>
        {/* Glowing Cyan LiDAR Optical Ring */}
        <mesh position={[0, 0.12, 0]}>
          <ringGeometry args={[0.08, 0.14, 24]} />
          <meshBasicMaterial color="#38BDF8" side={THREE.DoubleSide} />
        </mesh>
        {/* Dual Forward Laser Indicator Dots */}
        <mesh position={[0.18, 0.05, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* 6. Forward Dual High-Intensity LED Worklights */}
      <group position={[0.8, 0.44, -0.35]}>
        <mesh>
          <boxGeometry args={[0.12, 0.12, 0.14]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[5.5, -0.4, 0]}
          angle={0.65}
          penumbra={0.35}
          intensity={25}
          color="#FFF7ED"
          distance={12}
        />
      </group>

      <group position={[0.8, 0.44, 0.35]}>
        <mesh>
          <boxGeometry args={[0.12, 0.12, 0.14]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[5.5, -0.4, 0]}
          angle={0.65}
          penumbra={0.35}
          intensity={25}
          color="#FFF7ED"
          distance={12}
        />
      </group>

      {/* 7. Sweeping Gold Laser Depth Scanner Fan */}
      {isInspecting && (
        <group position={[0.9, 0.65, 0]} ref={laserScanner}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.2, 2.6, 32, 1, 0, Math.PI]} />
            <meshBasicMaterial color="#D4AF37" transparent={true} opacity={0.55} side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#D4AF37" intensity={4.0} distance={5} />
        </group>
      )}

      {/* 8. Rear Heavy-Duty Umbilical Supply Conduit */}
      <group position={[-1.1, 0.32, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, 0.8, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        {/* Connector Coupler */}
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.15, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Large Stainless Steel Commercial Canopy & Exhaust Duct Run
 * Transparent cutaway front window, dark grease buildup, and clean mirror stainless reveal.
 */
function FullBleedDuctSystem({ progress }) {
  const splitX = -4.5 + progress * 8.5 + 0.9;
  const cleanWidth = Math.max(0.1, Math.min(10.5, splitX - (-5.5)));
  const dirtyWidth = Math.max(0.1, Math.min(10.5, 5.5 - splitX));

  return (
    <group position={[1.2, 0, 0]}>
      {/* 1. Large Commercial Extraction Canopy (Left Intake) */}
      <group position={[-5.8, -1.2, 0.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.8, 1.4, 2.8]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.16} />
        </mesh>
        {/* Slanted Baffle Grease Filters */}
        <mesh position={[0.3, -0.18, 0]} rotation={[0, 0, -Math.PI / 5.5]}>
          <boxGeometry args={[0.12, 0.9, 2.4]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} wireframe={true} />
        </mesh>
        {/* Canopy Gutter with Gold Accent */}
        <mesh position={[0.85, -0.58, 0]}>
          <boxGeometry args={[0.15, 0.18, 2.8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.15} />
        </mesh>
      </group>

      {/* 2. Stainless Steel Exhaust Duct Run (Large Clear Cutaway View) */}
      {/* Interior Floor */}
      <mesh position={[0, -0.85, 0.2]} receiveShadow>
        <boxGeometry args={[10.5, 0.1, 2.2]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.94} roughness={0.14} />
      </mesh>

      {/* Interior Ceiling */}
      <mesh position={[0, 1.35, 0.2]} receiveShadow>
        <boxGeometry args={[10.5, 0.1, 2.2]} />
        <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Rear Stainless Steel Duct Wall */}
      <mesh position={[0, 0.25, -0.9]} receiveShadow>
        <boxGeometry args={[10.5, 2.3, 0.1]} />
        <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.2} />
      </mesh>

      {/* Front Cutaway Transparent Portal Window */}
      <mesh position={[0, 0.25, 1.3]}>
        <boxGeometry args={[10.5, 2.3, 0.04]} />
        <meshPhysicalMaterial
          color="#0A192F"
          transmission={0.95}
          opacity={0.12}
          transparent={true}
          roughness={0.03}
          metalness={0.1}
          reflectivity={0.99}
        />
      </mesh>

      {/* Heavy-Duty Structural Exterior Flanges */}
      {[-4.0, -1.5, 1.0, 3.5].map((fX, idx) => (
        <group key={idx} position={[fX, 0.25, 0.2]}>
          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[0.15, 0.15, 2.4]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, -1.15, 0]}>
            <boxGeometry args={[0.15, 0.15, 2.4]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, -1.15]}>
            <boxGeometry args={[0.15, 2.4, 0.1]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 1.15]}>
            <boxGeometry args={[0.15, 2.4, 0.1]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* 3. DYNAMIC SURFACE TRANSFORMATION: Dirty Grease vs. Sparkling Bare Metal */}
      {/* Clean Bare-Metal Stainless Steel (Behind the Robot) */}
      <mesh
        position={[-5.5 + cleanWidth / 2, -0.79, 0.2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[cleanWidth, 2.1]} />
        <meshStandardMaterial color="#F8FAFC" metalness={0.98} roughness={0.04} />
      </mesh>

      {/* Uncleaned Burnt Grease (Ahead of the Robot) */}
      <mesh
        position={[splitX + dirtyWidth / 2, -0.79, 0.2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[dirtyWidth, 2.1]} />
        <meshStandardMaterial color="#221105" roughness={0.95} metalness={0.07} />
      </mesh>

      {/* Grease on Rear Wall (Ahead of the Robot) */}
      <mesh position={[splitX + dirtyWidth / 2, 0.25, -0.84]}>
        <planeGeometry args={[dirtyWidth, 2.2]} />
        <meshStandardMaterial color="#1B0C03" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Clean Polished Stainless Steel on Rear Wall (Behind the Robot) */}
      <mesh position={[-5.5 + cleanWidth / 2, 0.25, -0.84]}>
        <planeGeometry args={[cleanWidth, 2.2]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.96} roughness={0.08} />
      </mesh>
    </group>
  );
}

/**
 * High-Visibility Studio Lighting
 */
function HeroStudioLighting() {
  return (
    <>
      <ambientLight intensity={0.95} color="#FFFFFF" />
      <directionalLight position={[8, 12, 9]} intensity={2.6} color="#BAE6FD" castShadow />
      <directionalLight position={[-8, -5, -6]} intensity={2.2} color="#FDE68A" />
      <pointLight position={[-2, 1.2, 1]} intensity={4.0} distance={9} color="#FFFFFF" />
      <pointLight position={[3, 1.2, 1]} intensity={4.0} distance={9} color="#FEF08A" />
    </>
  );
}

/**
 * Automatic Cinematic Camera Motion
 */
function AutomaticCinematicCamera({ progress }) {
  useFrame(({ camera }) => {
    const t = progress * Math.PI * 2;
    camera.position.x = 1.0 + Math.sin(t * 0.5) * 1.2;
    camera.position.y = 0.8 + Math.cos(t * 0.5) * 0.3;
    camera.position.z = 6.2 - Math.sin(progress * Math.PI) * 0.6;
    camera.lookAt(1.2, 0.2, 0);
  });

  return null;
}

/**
 * Main Full-Bleed 3D Hero Scene with New Cybernetic Scrubber Robot
 */
export function FullBleedHeroScene() {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCleaning, setIsCleaning] = useState(true);
  const [isInspecting, setIsInspecting] = useState(true);

  // 10-Second Continuous Automatic Cleaning Loop
  useEffect(() => {
    if (isPaused) return;
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
  }, [isPaused]);

  // Stage Indicator
  const stage = progress < 0.25
    ? "1. Cybernetic Robot Entering Commercial Kitchen Exhaust"
    : progress < 0.75
    ? "2. Multi-Arm High-Speed Scrubbing & Chemical Degreasing (2200 RPM)"
    : "3. 360° Optical LiDAR Inspection & AS 1851 Clean Sign-Off";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      {/* 3D Canvas across full viewport width and height */}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-[#050D1A]">
            <div className="w-12 h-12 border-3 border-slate-700 border-t-amber-400 rounded-full animate-spin" />
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [1.2, 0.8, 6.2], fov: 42 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-default"
        >
          <color attach="background" args={['#050D1A']} />
          <HeroStudioLighting />
          <AutomaticCinematicCamera progress={progress} />

          <group position={[0, 0, 0]}>
            <FullBleedDuctSystem progress={progress} />
            <AdvancedCyberneticRobot
              progress={progress}
              isCleaning={isCleaning}
              isInspecting={isInspecting}
            />
          </group>
        </Canvas>
      </Suspense>

      {/* Floating Bottom HUD Status */}
      <div className="absolute bottom-6 right-6 z-30 hidden lg:flex items-center gap-3 bg-[#050D1A]/90 backdrop-blur-md p-2 rounded-xl border border-slate-700/80 shadow-2xl">
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
          <span>{isCleaning ? 'Scrubber: 2200 RPM' : 'Scrubber: Off'}</span>
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
          <span>{isInspecting ? 'LiDAR: Active' : 'LiDAR: Off'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          title={isPaused ? 'Resume Automatic Motion' : 'Pause Automatic Motion'}
        >
          {isPaused ? <Play className="w-4 h-4 text-amber-400" /> : <Pause className="w-4 h-4" />}
        </button>

        <div className="text-[11px] font-mono text-amber-300 pl-2 border-l border-slate-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>{stage}</span>
        </div>
      </div>
    </div>
  );
}

export default FullBleedHeroScene;
