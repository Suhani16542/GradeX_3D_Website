import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Step Tool Models for the 8-Step Kitchen Hygiene Methodology
 */
function Step3DModel({ activeStep = 0 }) {
  const groupRef = useRef();
  const rotatingPartRef = useRef();
  const laserRef = useRef();
  const particlesRef = useRef();

  // Color Palette
  const navyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0A192F', metalness: 0.92, roughness: 0.2 }), []);
  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.96, roughness: 0.14 }), []);
  const slateMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1E293B', metalness: 0.88, roughness: 0.3 }), []);
  const cyanLaserMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#00F0FF', transparent: true, opacity: 0.7 }), []);
  const emeraldMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#10B981' }), []);
  const amberGlowMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#F59E0B' }), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.04;
    }

    if (rotatingPartRef.current) {
      if (activeStep === 3 || activeStep === 4) {
        // High speed rotation for steam/scrubber (Steps 4 & 5)
        rotatingPartRef.current.rotation.z += delta * 15;
      } else {
        // Gentle scanning sweep (Steps 1, 2, 6, 7, 8)
        rotatingPartRef.current.rotation.y = Math.sin(t * 1.8) * 0.4;
      }
    }

    if (laserRef.current) {
      laserRef.current.rotation.y = Math.sin(t * 2.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      
      {/* 3D Duct Wall Segment Background */}
      <mesh position={[0, 0, -0.8]} receiveShadow>
        <boxGeometry args={[4.2, 2.8, 0.08]} />
        <meshStandardMaterial color="#0E1E38" metalness={0.94} roughness={0.22} />
      </mesh>

      {/* Gold Structural Flange Trim */}
      <mesh position={[0, 1.35, -0.75]}>
        <boxGeometry args={[4.2, 0.06, 0.04]} />
        <primitive object={goldMat} />
      </mesh>
      <mesh position={[0, -1.35, -0.75]}>
        <boxGeometry args={[4.2, 0.06, 0.04]} />
        <primitive object={goldMat} />
      </mesh>

      {/* ================= STEP 01: 3D OPTICAL INSPECTION TURRET ================= */}
      {activeStep === 0 && (
        <group ref={rotatingPartRef} position={[0, 0, 0]}>
          {/* Gimbal Mount */}
          <mesh>
            <cylinderGeometry args={[0.35, 0.45, 0.3, 24]} />
            <primitive object={navyMat} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.3, 24, 24]} />
            <primitive object={goldMat} />
          </mesh>
          {/* Dual Sapphire Lenses */}
          {[-0.1, 0.1].map((x, i) => (
            <mesh key={i} position={[x, 0.22, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
              <primitive object={cyanLaserMat} />
            </mesh>
          ))}
          {/* Conical Scanning Field */}
          <mesh position={[0, 0.22, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.7, 1.4, 24, 1, true]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
          <pointLight position={[0, 0.22, 0.8]} intensity={2.0} distance={2.5} color="#38BDF8" />
        </group>
      )}

      {/* ================= STEP 02: 3D GREASE DEPTH LASER PROBE ================= */}
      {activeStep === 1 && (
        <group position={[0, 0.1, 0]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.5, 0.7, 0.35]} />
            <primitive object={navyMat} />
          </mesh>
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[0.36, 0.08, 0.25]} />
            <primitive object={goldMat} />
          </mesh>
          {/* Digital Display Screen */}
          <mesh position={[0, 0.3, 0.18]}>
            <planeGeometry args={[0.38, 0.45]} />
            <meshBasicMaterial color="#030A14" />
          </mesh>
          {/* Laser Probe Needle */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.6, 16]} />
            <primitive object={slateMat} />
          </mesh>
          {/* Red/Cyan Laser Scan Crosshair */}
          <group ref={laserRef} position={[0, -0.65, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.24, 24]} />
              <meshBasicMaterial color="#F43F5E" side={THREE.DoubleSide} />
            </mesh>
            <pointLight intensity={2.5} distance={1.8} color="#F43F5E" />
          </group>
        </group>
      )}

      {/* ================= STEP 03: 3D PREPARATION & PROTECTION SHROUD ================= */}
      {activeStep === 2 && (
        <group position={[0, 0, 0]}>
          {/* Magnetic Containment Frame */}
          <mesh>
            <boxGeometry args={[1.8, 1.8, 0.1]} />
            <primitive object={goldMat} />
          </mesh>
          {/* Protective Industrial Shield */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[1.6, 1.6]} />
            <meshStandardMaterial color="#0A192F" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Amber Warning Indicator Beacons */}
          {[-0.7, 0.7].map((x, i) => (
            <mesh key={i} position={[x, 0.7, 0.12]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <primitive object={amberGlowMat} />
            </mesh>
          ))}
          <pointLight position={[0, 0, 0.5]} intensity={2.0} distance={2.5} color="#F59E0B" />
        </group>
      )}

      {/* ================= STEP 04: 3D DUAL-JET HIGH-TEMP STEAM EMITTER ================= */}
      {activeStep === 3 && (
        <group position={[0, 0, 0]}>
          {/* Steam Lance Body */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 1.4, 16]} />
            <primitive object={slateMat} />
          </mesh>
          {/* Dual Rotary Steam Nozzles */}
          <group ref={rotatingPartRef} position={[0, 0, 0.1]}>
            {[-0.5, 0.5].map((x, i) => (
              <group key={i} position={[x, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.1, 0.06, 0.2, 16]} />
                  <primitive object={goldMat} />
                </mesh>
                {/* Steam Vapor Plume */}
                <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
                  <coneGeometry args={[0.3, 0.7, 16, 1, true]} />
                  <meshBasicMaterial color="#38BDF8" transparent opacity={0.35} side={THREE.DoubleSide} />
                </mesh>
              </group>
            ))}
          </group>
          <pointLight position={[0, 0, 0.6]} intensity={2.5} distance={2.0} color="#38BDF8" />
        </group>
      )}

      {/* ================= STEP 05: 3D HIGH-SPEED ROTARY HYDRO SCRUBBER ================= */}
      {activeStep === 4 && (
        <group position={[0, 0, 0]}>
          {/* Scrubber Hydraulic Motor */}
          <mesh position={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.22, 0.26, 0.45, 20]} rotation={[Math.PI / 2, 0, 0]} />
            <primitive object={navyMat} />
          </mesh>
          {/* Spinning Brush Assembly */}
          <group ref={rotatingPartRef} position={[0, 0, 0.15]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.12, 24]} />
              <primitive object={goldMat} />
            </mesh>
            {/* Scrubber Bristles */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <mesh
                  key={i}
                  position={[Math.cos(rad) * 0.4, Math.sin(rad) * 0.4, 0.06]}
                  rotation={[0, 0, rad]}
                >
                  <boxGeometry args={[0.25, 0.04, 0.15]} />
                  <meshStandardMaterial color="#FDE68A" roughness={0.8} />
                </mesh>
              );
            })}
          </group>
          <pointLight position={[0, 0, 0.4]} intensity={2.0} distance={2.0} color="#F59E0B" />
        </group>
      )}

      {/* ================= STEP 06: 3D 360° FINAL INSPECTION QUALITY GIMBAL ================= */}
      {activeStep === 5 && (
        <group ref={rotatingPartRef} position={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.38, 24, 24]} />
            <primitive object={navyMat} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.42, 0.03, 16, 32]} />
            <primitive object={goldMat} />
          </mesh>
          {/* Panoramic Inspection Lens */}
          <mesh position={[0, 0, 0.35]}>
            <sphereGeometry args={[0.15, 20, 20]} />
            <primitive object={cyanLaserMat} />
          </mesh>
          {/* Sweeping Green Inspection Grid Line */}
          <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.54, 32]} />
            <meshBasicMaterial color="#10B981" side={THREE.DoubleSide} />
          </mesh>
          <pointLight position={[0, 0, 0.6]} intensity={2.2} distance={2.5} color="#10B981" />
        </group>
      )}

      {/* ================= STEP 07: 3D VERIFIED POST-CLEAN PROBE (<20µm PASS) ================= */}
      {activeStep === 6 && (
        <group position={[0, 0.1, 0]}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.5, 0.7, 0.35]} />
            <primitive object={navyMat} />
          </mesh>
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[0.36, 0.08, 0.25]} />
            <primitive object={goldMat} />
          </mesh>
          {/* Green Pass Screen */}
          <mesh position={[0, 0.3, 0.18]}>
            <planeGeometry args={[0.38, 0.45]} />
            <meshBasicMaterial color="#064E3B" />
          </mesh>
          {/* Probe Tip */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.6, 16]} />
            <primitive object={slateMat} />
          </mesh>
          {/* Emerald Verification Circle */}
          <group position={[0, -0.65, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.2, 0.25, 24]} />
              <primitive object={emeraldMat} />
            </mesh>
            <pointLight intensity={3.0} distance={2.0} color="#10B981" />
          </group>
        </group>
      )}

      {/* ================= STEP 08: 3D HOLOGRAPHIC DIGITAL COMPLIANCE CERTIFICATE ================= */}
      {activeStep === 7 && (
        <group ref={rotatingPartRef} position={[0, 0, 0]}>
          {/* Certificate Slab */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 1.6, 0.04]} />
            <meshStandardMaterial color="#091526" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Gold Certificate Border */}
          <mesh position={[0, 0, 0.025]}>
            <boxGeometry args={[1.12, 1.52, 0.01]} />
            <primitive object={goldMat} />
          </mesh>
          {/* Center Holographic Seal */}
          <mesh position={[0, 0.2, 0.04]}>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} rotation={[Math.PI / 2, 0, 0]} />
            <primitive object={goldMat} />
          </mesh>
          <mesh position={[0, 0.2, 0.055]}>
            <circleGeometry args={[0.16, 24]} />
            <primitive object={emeraldMat} />
          </mesh>
          {/* Laser Data Rings */}
          <mesh position={[0, -0.3, 0.04]}>
            <planeGeometry args={[0.8, 0.35]} />
            <primitive object={cyanLaserMat} />
          </mesh>
          <pointLight position={[0, 0, 0.5]} intensity={2.5} distance={2.2} color="#F59E0B" />
        </group>
      )}

    </group>
  );
}

/**
 * MethodologyStepShowcase3D Component
 * Interactive WebGL Canvas for Section 5 Active Step Visualization
 */
export function MethodologyStepShowcase3D({ activeStep = 0 }) {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden border border-amber-400/35 shadow-2xl bg-gradient-to-b from-[#091526]/95 via-[#060E1A]/95 to-[#030712]/95 flex flex-col justify-between group">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none border-b border-slate-800/80">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 font-bold tracking-wider">
            PHASE 0{activeStep + 1} SIMULATION
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
          <span>AS 1851 VERIFIED</span>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 0, 3.2], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.7} color="#0B1C33" />
          <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFFFFF" />
          <directionalLight position={[-4, -2, 2]} intensity={1.2} color="#D4AF37" />

          <Suspense fallback={null}>
            <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
              <Step3DModel activeStep={activeStep} />
            </Float>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Bottom Interactive HUD Indicator */}
      <div className="relative z-10 p-4 pt-0 flex items-center justify-between text-[11px] font-mono pointer-events-none border-t border-slate-800/80">
        <div className="text-slate-400 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px]">
          <span className="text-amber-400 font-bold">MODE:</span> 3D Interactive Tool
        </div>

        <div className="text-slate-400 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px]">
          <span>Drag to Orbit 360° ↺</span>
        </div>
      </div>
    </div>
  );
}

export default MethodologyStepShowcase3D;
