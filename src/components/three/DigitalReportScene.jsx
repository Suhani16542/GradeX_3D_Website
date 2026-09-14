import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { FileCheck, Camera, Video, ShieldCheck, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';

/**
 * 3D Floating Digital Evidence Tablet with Live Camera Feed & Grease Gauge
 */
function FloatingEvidenceDevice({ isSplitView }) {
  const deviceGroup = useRef();
  const scannerSweepRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (deviceGroup.current) {
      // Gentle floating inclination
      deviceGroup.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      deviceGroup.current.rotation.x = 0.15 + Math.cos(t * 0.4) * 0.08;
    }
    if (scannerSweepRef.current) {
      scannerSweepRef.current.position.x = Math.sin(t * 1.5) * 1.4;
    }
  });

  return (
    <group ref={deviceGroup} position={[0, 0, 0]}>
      {/* Heavy-Duty Tablet Bezel (Grade X Navy) */}
      <mesh castShadow>
        <boxGeometry args={[3.6, 2.4, 0.16]} />
        <meshStandardMaterial color="#0A192F" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Gold Outer Trim */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[3.66, 2.46, 0.14]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Screen Glass Surface */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[3.35, 2.15]} />
        <meshStandardMaterial color="#050D1A" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen Split: Left (Pre-Clean Grease) & Right (Post-Clean Bare Metal) */}
      {/* Left Screen Partition: Pre-Clean Flammable Grease */}
      <mesh position={[-0.8, 0.15, 0.1]}>
        <planeGeometry args={[1.5, 1.4]} />
        <meshStandardMaterial color="#1E1005" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Right Screen Partition: Post-Clean Mirror Stainless Steel */}
      <mesh position={[0.8, 0.15, 0.1]}>
        <planeGeometry args={[1.5, 1.4]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.06} metalness={0.98} />
      </mesh>

      {/* Screen Divider Gold Line */}
      <mesh position={[0, 0.15, 0.105]}>
        <planeGeometry args={[0.03, 1.4]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>

      {/* Optical Laser Scanner Sweep Bar across Screen */}
      <mesh ref={scannerSweepRef} position={[0, 0.15, 0.11]}>
        <planeGeometry args={[0.04, 1.4]} />
        <meshBasicMaterial color="#38BDF8" transparent={true} opacity={0.7} />
      </mesh>

      {/* 3D Gauge Dial Ring on Top Right */}
      <group position={[1.25, 0.65, 0.12]}>
        <mesh>
          <ringGeometry args={[0.22, 0.28, 24]} />
          <meshBasicMaterial color="#D4AF37" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.2, 24]} />
          <meshBasicMaterial color="#0A192F" />
        </mesh>
      </group>

      {/* Digital Shift Report Document Tab (Bottom Banner on Device) */}
      <mesh position={[0, -0.75, 0.1]}>
        <planeGeometry args={[3.2, 0.35]} />
        <meshStandardMaterial color="#0E2442" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[-1.2, -0.75, 0.105]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>

      {/* Target Laser Scan Anchor Pin Connecting to Inspection Point */}
      <group position={[-1.2, 0.5, 0.2]}>
        <mesh>
          <ringGeometry args={[0.08, 0.12, 16]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <pointLight color="#EF4444" intensity={1.5} distance={1.2} />
      </group>

      <group position={[1.2, -0.2, 0.2]}>
        <mesh>
          <ringGeometry args={[0.08, 0.12, 16]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        <pointLight color="#10B981" intensity={1.5} distance={1.2} />
      </group>
    </group>
  );
}

/**
 * Lighting for Digital Evidence Scene
 */
function DigitalReportLighting() {
  return (
    <>
      <ambientLight intensity={0.9} color="#FFFFFF" />
      <directionalLight position={[5, 7, 5]} intensity={2.2} color="#BAE6FD" />
      <directionalLight position={[-5, -4, -4]} intensity={1.8} color="#FDE68A" />
      <pointLight position={[0, 0, 2]} intensity={2.5} distance={5} color="#FFFFFF" />
    </>
  );
}

/**
 * 3D Scene for Section 5: Digital Evidence & Reporting
 */
export function DigitalReportScene() {
  return (
    <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl glass-panel overflow-hidden border border-amber-400/25 shadow-2xl bg-[#050D1A]">
      {/* Top HUD */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#050D1A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-400/30 text-xs">
          <FileCheck className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold text-white">Digital Evidence & Shift Audit Portal</span>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 bg-[#0A192F]/90 px-2.5 py-1 rounded-md border border-emerald-500/30">
          ● VERIFIED PROOF
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
          camera={{ position: [0, 0.4, 3.8], fov: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={['#050D1A']} />
          <DigitalReportLighting />

          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <FloatingEvidenceDevice />
          </Float>

          <OrbitControls
            enableZoom={true}
            minDistance={2.2}
            maxDistance={6.0}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={0.1}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Bottom Annotations */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-mono text-slate-300 pointer-events-none">
        <div className="flex items-center gap-3 bg-[#050D1A]/90 px-3 py-1 rounded-md border border-slate-800">
          <span className="text-rose-400">Pre-Clean Photo</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400">Post-Clean Verified</span>
        </div>
        <span className="text-slate-400 hidden sm:inline">Drag to inspect 3D device</span>
      </div>
    </div>
  );
}

export default DigitalReportScene;
