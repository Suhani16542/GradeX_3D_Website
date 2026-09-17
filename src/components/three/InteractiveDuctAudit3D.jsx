import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Duct Audit Inspection Slice for Section 4
 * Features:
 * - Real 3D sliced rectangular exhaust duct section
 * - Laser depth scanner sweeping back and forth
 * - Transition from heavy grease coating on the left to mirror-clean stainless steel on the right
 * - Interactive 3D probe measuring micron depth
 */
function DuctAuditSlice() {
  const groupRef = useRef();
  const laserRef = useRef();
  const probeRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Laser scan sweep back and forth across duct
    if (laserRef.current) {
      laserRef.current.position.x = Math.sin(t * 1.8) * 1.6;
    }

    if (probeRef.current) {
      probeRef.current.position.y = 0.8 + Math.sin(t * 2.2) * 0.08;
      probeRef.current.rotation.z = Math.sin(t * 1.5) * 0.1;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} rotation={[0.2, 0.4, 0]}>
      {/* 1. Rectangular Duct Segment */}
      <group>
        {/* Floor Panel */}
        <mesh position={[0, -1.0, 0]} receiveShadow>
          <boxGeometry args={[3.8, 0.06, 3.2]} />
          <meshStandardMaterial color="#64748B" metalness={0.94} roughness={0.2} />
        </mesh>
        {/* Ceiling Panel */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[3.8, 0.06, 3.2]} />
          <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.25} />
        </mesh>
        {/* Back Wall */}
        <mesh position={[0, 0.2, -1.58]}>
          <boxGeometry args={[3.8, 2.4, 0.06]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.22} />
        </mesh>
      </group>

      {/* 2. Dirty Grease Coating (Left Half: X from -1.9 to 0.0) */}
      <mesh position={[-0.95, -0.96, 0]}>
        <boxGeometry args={[1.88, 0.03, 3.16]} />
        <meshStandardMaterial
          color="#1A0C04"
          roughness={0.92}
          metalness={0.15}
        />
      </mesh>
      <mesh position={[-0.95, 0.2, -1.54]}>
        <boxGeometry args={[1.88, 2.34, 0.03]} />
        <meshStandardMaterial
          color="#1A0C04"
          roughness={0.92}
          metalness={0.15}
        />
      </mesh>

      {/* 3. Spotless Clean Bare Stainless Steel (Right Half: X from 0.0 to 1.9) */}
      <mesh position={[0.95, -0.965, 0]}>
        <boxGeometry args={[1.88, 0.02, 3.16]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.98}
          roughness={0.08}
        />
      </mesh>
      <mesh position={[0.95, 0.2, -1.545]}>
        <boxGeometry args={[1.88, 2.34, 0.02]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.98}
          roughness={0.08}
        />
      </mesh>

      {/* 4. Active Laser Depth Scanning Line */}
      <group ref={laserRef} position={[0, 0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 2.38, 8]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <pointLight intensity={2.5} distance={2.5} color="#38BDF8" />
      </group>

      {/* 5. Ultrasonic Diagnostic Measurement Probe */}
      <group ref={probeRef} position={[0.6, 0.8, 0.4]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.03, 0.5, 12]} />
          <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.26, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.96} roughness={0.1} />
        </mesh>
        <pointLight position={[0, -0.28, 0]} intensity={1.8} distance={1.2} color="#10B981" />
      </group>
    </group>
  );
}

/**
 * InteractiveDuctAudit3D Component
 * 3D Audit Visual for Section 4
 */
export function InteractiveDuctAudit3D() {
  return (
    <div className="w-full h-[360px] sm:h-[440px] relative rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl bg-[#050D1A]">
      <Canvas
        shadows
        camera={{ position: [3.4, 2.2, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#050D1A']} />
        <ambientLight intensity={0.6} color="#0B1C33" />
        <hemisphereLight skyColor="#38BDF8" groundColor="#0A192F" intensity={0.7} />
        <directionalLight position={[5, 6, 4]} intensity={1.6} color="#FFFFFF" castShadow />
        <directionalLight position={[-4, 2, -2]} intensity={1.0} color="#F59E0B" />

        <Suspense fallback={null}>
          <DuctAuditSlice />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.9}
        />
      </Canvas>

      {/* Overlay Status Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono px-3.5 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 pointer-events-none">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          3D AS 1851 OPTICAL SCANNER ACTIVE
        </span>
        <span className="text-slate-400">Drag to Inspect 3D Duct Slice</span>
      </div>
    </div>
  );
}

export default InteractiveDuctAudit3D;
