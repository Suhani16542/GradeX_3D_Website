import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Technical 3D Process Path & Ambient Duct Grid for Section 5
 * Features:
 * - 3D Serpentine technical process path line with glowing animated pulse
 * - Faint architectural ductwork wireframe & subtle depth grid
 * - Micro inspection indicators (measurement scan beam, thermal vapor nodes)
 * - Light gold & cyan ambient particle field
 * - High-performance: single Canvas, single animation loop, no React state in useFrame
 */
function ProcessPathScene({ scrollProgressRef }) {
  const pathMeshRef = useRef();
  const pulseNodeRef = useRef();
  const particlesRef = useRef();

  // 1. Serpentine 3D Path Curve (01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 07 -> 08)
  const { curve, tubeGeometry, pointsArray } = useMemo(() => {
    // 8 3D control points representing the U-curve layout in 3D space
    const pts = [
      new THREE.Vector3(-4.2, 1.4, 0),    // 01: Site Inspection
      new THREE.Vector3(-1.4, 1.4, 0),    // 02: Grease Thickness Measurement
      new THREE.Vector3(1.4, 1.4, 0),     // 03: Preparation & Protection
      new THREE.Vector3(4.2, 1.4, 0),     // 04: Interior Steam Washing
      new THREE.Vector3(4.2, -1.4, 0),    // 05: Canopy & Duct Cleaning
      new THREE.Vector3(1.4, -1.4, 0),    // 06: Final Inspection
      new THREE.Vector3(-1.4, -1.4, 0),   // 07: Post-Clean Measurement
      new THREE.Vector3(-4.2, -1.4, 0),   // 08: Detailed Reporting
    ];

    const spline = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.15);
    const geom = new THREE.TubeGeometry(spline, 120, 0.035, 8, false);
    return { curve: spline, tubeGeometry: geom, pointsArray: pts };
  }, []);

  // 2. Ambient Particles
  const { particlePositions, particleColors } = useMemo(() => {
    const pCount = 500;
    const pos = new Float32Array(pCount * 3);
    const col = new Float32Array(pCount * 3);

    const gold = new THREE.Color('#D4AF37');
    const cyan = new THREE.Color('#38BDF8');
    const silver = new THREE.Color('#64748B');

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 22;
      pos[i3 + 1] = (Math.random() - 0.5) * 14;
      pos[i3 + 2] = (Math.random() - 0.5) * 8 - 1;

      const r = Math.random();
      const c = r < 0.35 ? gold : r < 0.6 ? cyan : silver;
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { particlePositions: pos, particleColors: col };
  }, []);

  // Frame Loop for Process Pulse & Progress Synchronization
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const progress = scrollProgressRef.current || 0;

    // Pulse node follows scroll-linked path position
    if (pulseNodeRef.current && curve) {
      const clampedProg = Math.max(0.001, Math.min(0.999, progress));
      const pos = curve.getPointAt(clampedProg);
      pulseNodeRef.current.position.copy(pos);
      pulseNodeRef.current.scale.setScalar(1.0 + Math.sin(t * 6.0) * 0.25);
    }

    // Ambient floating particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Base Guide Technical Tube */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color="#1E293B" transparent opacity={0.4} />
      </mesh>

      {/* 2. Illuminated Gold Progress Path */}
      <mesh ref={pathMeshRef} geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#F59E0B"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 3. Traveling Gold Node Indicator */}
      <group ref={pulseNodeRef}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#FDE047" />
        </mesh>
        <pointLight intensity={1.8} distance={2.5} color="#F59E0B" />
      </group>

      {/* 4. 8 Discrete 3D Process Step Nodes */}
      {pointsArray.map((pt, idx) => (
        <group key={idx} position={pt}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color={idx <= (scrollProgressRef.current || 0) * 8 ? '#F59E0B' : '#38BDF8'} />
          </mesh>
        </group>
      ))}

      {/* 5. Ambient Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleColors.length / 3}
            array={particleColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * MethodologyProcessPath3D Component
 * Interactive WebGL Canvas for Section 5
 */
export function MethodologyProcessPath3D({ scrollProgress = 0 }) {
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#030812] via-[#050D1A] to-[#030812]">
      {/* Background Ambience & Soft Technical Grid */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-amber-500/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-sky-500/5 blur-[150px] rounded-full" />
      
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} color="#0B1C33" />
        <directionalLight position={[4, 5, 4]} intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[-4, -3, 2]} intensity={0.8} color="#D4AF37" />
        <ProcessPathScene scrollProgressRef={scrollProgressRef} />
      </Canvas>
    </div>
  );
}

export default MethodologyProcessPath3D;
