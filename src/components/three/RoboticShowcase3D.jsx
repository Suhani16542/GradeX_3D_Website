import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Humanoid / Cybernetic Robotic Cleaning Specialist 3D Model
 * Combines an advanced robotic android form with industrial kitchen duct cleaning gear:
 * - Sleek cybernetic head with glowing dual optical eyes & sensor mast
 * - Titanium chestplate with Grade X gold trims and pulsing arc-reactor core
 * - Articulated mechanical arms: Laser grease measurement probe (left) & High-speed rotary hydro-brush (right)
 * - Heavy-duty tracked crawler / hover-stabilized base
 * - Holographic inspection wireframe cage & scanning laser
 */
function HumanoidCleaningRobot() {
  const robotGroup = useRef();
  const headGroup = useRef();
  const leftArmGroup = useRef();
  const rightArmGroup = useRef();
  const brushSpinRef = useRef();
  const corePulseRef = useRef();
  const laserRef = useRef();

  // Materials
  const navyTitanium = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A192F',
        metalness: 0.92,
        roughness: 0.2,
      }),
    []
  );

  const darkSlateArmor = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E293B',
        metalness: 0.88,
        roughness: 0.28,
      }),
    []
  );

  const signatureGold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 0.96,
        roughness: 0.12,
      }),
    []
  );

  const cyanGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#38BDF8',
      }),
    []
  );

  const eyeGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#00F0FF',
      }),
    []
  );

  const emeraldGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#10B981',
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Subtle humanoid breathing & floating motion
    if (robotGroup.current) {
      robotGroup.current.position.y = Math.sin(t * 1.6) * 0.05 - 0.1;
    }

    // 2. Head looking around / scanning
    if (headGroup.current) {
      headGroup.current.rotation.y = Math.sin(t * 0.9) * 0.25;
      headGroup.current.rotation.x = Math.sin(t * 1.3) * 0.08 + 0.05;
    }

    // 3. Right arm scrubbing action (rotary brush spinning fast)
    if (brushSpinRef.current) {
      brushSpinRef.current.rotation.z += delta * 18;
    }
    if (rightArmGroup.current) {
      rightArmGroup.current.rotation.x = Math.sin(t * 3.2) * 0.12 + 0.2;
      rightArmGroup.current.rotation.y = Math.sin(t * 2.1) * 0.08 - 0.2;
    }

    // 4. Left arm laser scanning motion
    if (leftArmGroup.current) {
      leftArmGroup.current.rotation.x = Math.sin(t * 1.2) * 0.15 + 0.15;
      leftArmGroup.current.rotation.z = Math.sin(t * 1.5) * 0.08 + 0.1;
    }

    // 5. Core energy pulse
    if (corePulseRef.current) {
      const pulseScale = 1.0 + Math.sin(t * 4.0) * 0.12;
      corePulseRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }

    // 6. Laser beam sweep
    if (laserRef.current) {
      laserRef.current.rotation.y = Math.sin(t * 2.5) * 0.3;
    }
  });

  return (
    <group ref={robotGroup} position={[0, -0.1, 0]} scale={1.1}>
      {/* ================= 1. HEAD & VISOR ================= */}
      <group ref={headGroup} position={[0, 0.92, 0]}>
        {/* Head Shell */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.42, 0.36, 0.38]} />
          <primitive object={navyTitanium} />
        </mesh>

        {/* Head Top Armor Plate */}
        <mesh position={[0, 0.19, 0]}>
          <boxGeometry args={[0.36, 0.05, 0.34]} />
          <primitive object={signatureGold} />
        </mesh>

        {/* Cyber Visor Screen */}
        <mesh position={[0, 0.02, 0.195]}>
          <boxGeometry args={[0.36, 0.2, 0.02]} />
          <meshStandardMaterial color="#050B14" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Dual Glowing Humanoid / Robotic Eyes */}
        <mesh position={[-0.09, 0.04, 0.208]}>
          <circleGeometry args={[0.042, 16]} />
          <primitive object={eyeGlowMat} />
        </mesh>
        <mesh position={[0.09, 0.04, 0.208]}>
          <circleGeometry args={[0.042, 16]} />
          <primitive object={eyeGlowMat} />
        </mesh>

        {/* Forehead Optical Sensor Pill */}
        <mesh position={[0, 0.13, 0.198]}>
          <boxGeometry args={[0.08, 0.03, 0.02]} />
          <primitive object={emeraldGlowMat} />
        </mesh>

        {/* Side Head Audio / LiDAR Sensors */}
        {[-0.22, 0.22].map((xSide, i) => (
          <group key={i} position={[xSide, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
              <primitive object={signatureGold} />
            </mesh>
            <mesh position={[0, 0.025, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
              <primitive object={cyanGlowMat} />
            </mesh>
          </group>
        ))}

        {/* Top Communication Antenna */}
        <mesh position={[0.14, 0.26, -0.08]}>
          <cylinderGeometry args={[0.008, 0.012, 0.16, 8]} />
          <primitive object={darkSlateArmor} />
        </mesh>
        <mesh position={[0.14, 0.35, -0.08]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <primitive object={signatureGold} />
        </mesh>
      </group>

      {/* ================= 2. NECK & UPPER TORSO ================= */}
      {/* Neck Joint */}
      <mesh position={[0, 0.69, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.12, 16]} />
        <primitive object={darkSlateArmor} />
      </mesh>

      {/* Main Chest / Torso Chassis */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.74, 0.46, 0.48]} />
        <primitive object={navyTitanium} />
      </mesh>

      {/* Chest Titanium Armor Bevels */}
      <mesh position={[0, 0.44, 0.25]}>
        <boxGeometry args={[0.62, 0.36, 0.04]} />
        <primitive object={darkSlateArmor} />
      </mesh>

      {/* Grade X Gold Chevron Trim */}
      <mesh position={[0, 0.54, 0.275]}>
        <boxGeometry args={[0.48, 0.04, 0.02]} />
        <primitive object={signatureGold} />
      </mesh>

      {/* Center Arc Reactor / Power Core */}
      <group position={[0, 0.4, 0.275]}>
        <mesh>
          <cylinderGeometry args={[0.085, 0.085, 0.02, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <primitive object={signatureGold} />
        </mesh>
        <mesh ref={corePulseRef} position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.065, 24]} />
          <primitive object={cyanGlowMat} />
        </mesh>
        <pointLight position={[0, 0, 0.1]} intensity={1.8} distance={1.8} color="#00F0FF" />
      </group>

      {/* Shoulder Pauldrons */}
      {[-0.46, 0.46].map((xSide, i) => (
        <group key={i} position={[xSide, 0.54, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <primitive object={navyTitanium} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.18, 0.04, 0.22]} />
            <primitive object={signatureGold} />
          </mesh>
        </group>
      ))}

      {/* ================= 3. RIGHT ARM: ROTARY CLEANING BRUSH ================= */}
      <group ref={rightArmGroup} position={[0.48, 0.48, 0]}>
        {/* Upper Arm Bone */}
        <mesh position={[0.06, -0.16, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.05, 0.06, 0.28, 12]} />
          <primitive object={darkSlateArmor} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0.09, -0.32, 0]}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <primitive object={signatureGold} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.09, -0.48, 0.12]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.28, 12]} />
          <primitive object={navyTitanium} />
        </mesh>

        {/* 2,400 RPM High-Speed Hydro Scrubber Assembly */}
        <group position={[0.09, -0.66, 0.24]}>
          {/* Tool Mount */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
            <primitive object={signatureGold} />
          </mesh>
          {/* Spinning Rotary Brush Head */}
          <group ref={brushSpinRef} position={[0, 0, 0.08]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.06, 16]} />
              <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Multi-spoke scrub bristles */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, bIdx) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <mesh
                  key={bIdx}
                  position={[Math.cos(rad) * 0.14, Math.sin(rad) * 0.14, 0.04]}
                  rotation={[0, 0, rad]}
                >
                  <boxGeometry args={[0.08, 0.02, 0.06]} />
                  <meshStandardMaterial color="#FDE68A" roughness={0.9} />
                </mesh>
              );
            })}
          </group>

          {/* Water / Cleaning Spray Droplets Effect */}
          <pointLight position={[0, 0, 0.16]} intensity={1.5} distance={1.2} color="#38BDF8" />
        </group>
      </group>

      {/* ================= 4. LEFT ARM: DIGITAL GREASE LASER SCANNER ================= */}
      <group ref={leftArmGroup} position={[-0.48, 0.48, 0]}>
        {/* Upper Arm Bone */}
        <mesh position={[-0.06, -0.16, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.05, 0.06, 0.28, 12]} />
          <primitive object={darkSlateArmor} />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[-0.09, -0.32, 0]}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <primitive object={signatureGold} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.09, -0.48, 0.12]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.28, 12]} />
          <primitive object={navyTitanium} />
        </mesh>

        {/* Digital Micron Thickness Gauge Probe */}
        <group ref={laserRef} position={[-0.09, -0.66, 0.22]}>
          <mesh>
            <boxGeometry args={[0.1, 0.12, 0.18]} />
            <primitive object={signatureGold} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.025, 0.035, 0.08, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <primitive object={darkSlateArmor} />
          </mesh>
          {/* Laser Scanning Beam */}
          <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.03, 0.44, 12]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.65} />
          </mesh>
          <pointLight position={[0, 0, 0.4]} intensity={2.0} distance={1.5} color="#00F0FF" />
        </group>
      </group>

      {/* ================= 5. LOWER CHASSIS & CATERPILLAR CRAWLER BASE ================= */}
      {/* Waist / Pelvis Joint */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.16, 16]} />
        <primitive object={darkSlateArmor} />
      </mesh>
      <mesh position={[0, 0.12, 0.14]}>
        <boxGeometry args={[0.24, 0.08, 0.04]} />
        <primitive object={signatureGold} />
      </mesh>

      {/* Crawler Track Platform */}
      <group position={[0, -0.16, 0]}>
        {/* Central Drive Gearbox */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.68, 0.16, 0.74]} />
          <primitive object={navyTitanium} />
        </mesh>

        {/* Left & Right All-Terrain Caterpillar Drive Tracks */}
        {[-0.44, 0.44].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0, 0]}>
            {/* Rubber Track Belt */}
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.24, 0.95]} />
              <meshStandardMaterial color="#080C12" roughness={0.9} metalness={0.1} />
            </mesh>
            {/* Gold Drive Sprockets */}
            {[-0.32, 0, 0.32].map((zOffset, sIdx) => (
              <mesh
                key={sIdx}
                position={[xPos > 0 ? 0.1 : -0.1, 0, zOffset]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <cylinderGeometry args={[0.09, 0.09, 0.04, 16]} />
                <primitive object={signatureGold} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Underbody Cyan Ground Glow */}
        <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.6, 24]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* ================= 6. HOLOGRAPHIC DUCT WIREFRAME CAGE ================= */}
      <group position={[0, 0.35, 0]}>
        {/* Wireframe Box */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.65, 1.85, 1.45)]} />
          <lineBasicMaterial color="#38BDF8" transparent opacity={0.25} />
        </lineSegments>

        {/* Floating Measurement Target Rings */}
        <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.7, 0.73, 32]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.82, 0.84, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * RoboticShowcase3D Component
 * Interactive WebGL Canvas for Section 2 (Right Column)
 */
export function RoboticShowcase3D() {
  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl bg-gradient-to-b from-[#0B1728]/95 via-[#07111E]/95 to-[#040A14]/95 flex flex-col justify-between group">
      {/* Ambient Lighting Gradients */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/15 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-sky-500/15 blur-[90px] rounded-full pointer-events-none" />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-amber-300 font-bold tracking-wider">GX-ANDROID 800</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-sky-300 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-500/30 backdrop-blur-md">
          <span>TORQUE: 2,400 RPM</span>
        </div>
      </div>

      {/* Interactive 3D Canvas with Orbit Controls */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [2.2, 1.4, 3.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25,
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.7} color="#0B1C33" />
          <hemisphereLight skyColor="#38BDF8" groundColor="#0A192F" intensity={0.9} />
          <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFFFFF" castShadow />
          <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#F59E0B" />
          <pointLight position={[0, 2, 1.5]} intensity={1.0} color="#38BDF8" />

          <Suspense fallback={null}>
            <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.25}>
              <HumanoidCleaningRobot />
            </Float>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Bottom Interactive HUD Indicator */}
      <div className="relative z-10 p-4 pt-0 flex items-center justify-between text-[11px] font-mono pointer-events-none">
        <div className="flex items-center gap-1.5 text-slate-400 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-amber-400 font-bold">AS 1851:</span>
          <span className="text-emerald-400 font-bold">100% COMPLIANT</span>
        </div>

        <div className="text-slate-400 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px]">
          <span>Drag to Rotate 360° ↺</span>
        </div>
      </div>
    </div>
  );
}

export default RoboticShowcase3D;
