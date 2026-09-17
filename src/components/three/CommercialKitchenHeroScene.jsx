import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Play, Pause, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Commercial Kitchen Equipment (Range, Deep Fryer, Griddle, Prep Table)
 */
function CommercialKitchenEquipment() {
  return (
    <group position={[0, -2.6, -0.2]}>
      {/* 1. Floor: Commercial Quarry / Epoxy Tile Floor */}
      <mesh position={[0, -0.05, 1.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* 2. Stainless Steel Splashback Wall */}
      <mesh position={[0, 2.2, -1.8]} receiveShadow>
        <planeGeometry args={[14, 4.8]} />
        <meshStandardMaterial color="#64748B" roughness={0.2} metalness={0.92} />
      </mesh>

      {/* Seam line trims on stainless wall */}
      {[-4.5, -1.5, 1.5, 4.5].map((x, i) => (
        <mesh key={i} position={[x, 2.2, -1.78]}>
          <boxGeometry args={[0.04, 4.8, 0.02]} />
          <meshStandardMaterial color="#334155" metalness={0.95} roughness={0.3} />
        </mesh>
      ))}

      {/* 3. Commercial 6-Burner Gas Range Unit (Left) */}
      <group position={[-3.2, 0.85, -0.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.7, 1.4]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.88, 0.72]}>
          <boxGeometry args={[2.22, 0.08, 0.12]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.62, 0.71]}>
          <boxGeometry args={[2.1, 0.35, 0.04]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.4} />
        </mesh>
        {[-0.8, -0.48, -0.16, 0.16, 0.48, 0.8].map((kx, idx) => (
          <mesh key={idx} position={[kx, 0.62, 0.74]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
        {[-0.6, 0, 0.6].map((tx, idx) => (
          <group key={idx} position={[tx, 0.88, 0]}>
            <mesh>
              <boxGeometry args={[0.5, 0.04, 1.1]} />
              <meshStandardMaterial color="#0F172A" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.03, -0.25]}>
              <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.03, 0.25]}>
              <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
        <mesh position={[-0.52, -0.18, 0.71]}>
          <boxGeometry args={[0.95, 0.95, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0.52, -0.18, 0.71]}>
          <boxGeometry args={[0.95, 0.95, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[-0.52, 0.18, 0.76]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 12]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.1} />
        </mesh>
        <mesh position={[0.52, 0.18, 0.76]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 12]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* 4. Commercial Deep Fryer (Center-Left) */}
      <group position={[-0.7, 0.85, -0.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.1, 1.7, 1.4]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[-0.22, 0.86, 0.1]}>
          <boxGeometry args={[0.38, 0.04, 0.8]} />
          <meshStandardMaterial color="#0A192F" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.22, 0.86, 0.1]}>
          <boxGeometry args={[0.38, 0.04, 0.8]} />
          <meshStandardMaterial color="#0A192F" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.22, 1.15, 0.35]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.9} />
        </mesh>
        <mesh position={[0.22, 1.15, 0.35]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.62, 0.71]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} />
        </mesh>
      </group>

      {/* 5. Commercial Flat Top Griddle (Center-Right) */}
      <group position={[1.4, 0.85, -0.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.7, 1.4]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[1.7, 0.1, 1.2]} />
          <meshStandardMaterial color="#64748B" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.98, -0.58]}>
          <boxGeometry args={[1.7, 0.15, 0.04]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.83, 0.98, 0]}>
          <boxGeometry args={[0.04, 0.15, 1.2]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.83, 0.98, 0]}>
          <boxGeometry args={[0.04, 0.15, 1.2]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
        </mesh>
        {[-0.45, 0, 0.45].map((gx, idx) => (
          <mesh key={idx} position={[gx, 0.62, 0.71]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} />
          </mesh>
        ))}
      </group>

      {/* 6. Stainless Steel Chef Prep Table (Right) */}
      <group position={[3.8, 0.85, -0.8]}>
        <mesh castShadow receiveShadow position={[0, 0.82, 0]}>
          <boxGeometry args={[1.8, 0.08, 1.4]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.96} roughness={0.1} />
        </mesh>
        {[
          [-0.8, -0.6],
          [0.8, -0.6],
          [-0.8, 0.6],
          [0.8, 0.6]
        ].map(([lx, lz], idx) => (
          <mesh key={idx} position={[lx, 0, lz]}>
            <cylinderGeometry args={[0.035, 0.035, 1.6, 12]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.2} />
          </mesh>
        ))}
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[1.7, 0.04, 1.3]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Stainless Steel Exhaust Canopy Hood & Inspection Duct
 */
function CommercialExhaustCanopy({ progress }) {
  const splitX = -3.8 + progress * 7.6;
  const cleanWidth = Math.max(0.05, Math.min(8.6, splitX - (-4.3)));
  const dirtyWidth = Math.max(0.05, Math.min(8.6, 4.3 - splitX));

  const glassRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (glassRef.current) {
      // Subtle ambient specular shimmer on the glass window
      glassRef.current.material.opacity = 0.15 + Math.sin(t * 1.5) * 0.03;
    }
  });

  return (
    <group position={[0, 0.7, -0.7]}>
      {/* 1. Overhead Extraction Canopy Hood */}
      <group position={[0, -0.6, 0]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[9.2, 0.8, 2.0]} />
          <meshStandardMaterial color="#64748B" metalness={0.94} roughness={0.16} />
        </mesh>

        <mesh position={[0, -0.45, 0.35]} rotation={[0.45, 0, 0]}>
          <boxGeometry args={[9.2, 0.5, 0.04]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.92} roughness={0.18} />
        </mesh>

        <mesh position={[0, -0.65, 0.95]}>
          <boxGeometry args={[9.25, 0.06, 0.08]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.96} roughness={0.12} />
        </mesh>

        {/* Stainless Steel Baffle Grease Filters */}
        {[-3.6, -2.4, -1.2, 0, 1.2, 2.4, 3.6].map((fx, idx) => (
          <group key={idx} position={[fx, -0.4, -0.1]} rotation={[-0.45, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.95, 0.7, 0.05]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.95} roughness={0.2} />
            </mesh>
            {[-0.2, 0, 0.2].map((ly, lIdx) => (
              <mesh key={lIdx} position={[0, ly, 0.03]}>
                <boxGeometry args={[0.88, 0.08, 0.02]} />
                <meshStandardMaterial color="#0A192F" metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Under-Hood Warm Worklights */}
        {[-2.8, -0.9, 0.9, 2.8].map((lx, idx) => (
          <group key={idx} position={[lx, -0.55, 0.4]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
              <meshBasicMaterial color="#FEF3C7" />
            </mesh>
            <pointLight position={[0, -0.15, 0]} intensity={1.8} color="#FEF08A" distance={3.5} />
          </group>
        ))}
      </group>

      {/* 2. Stainless Steel Duct Run with Cutaway Inspection Window */}
      <group position={[0, 0.85, 0]}>
        <mesh position={[0, -0.65, 0]} receiveShadow>
          <boxGeometry args={[8.8, 0.08, 1.6]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.94} roughness={0.14} />
        </mesh>

        <mesh position={[0, 0.85, 0]} receiveShadow>
          <boxGeometry args={[8.8, 0.08, 1.6]} />
          <meshStandardMaterial color="#64748B" metalness={0.92} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.1, -0.75]} receiveShadow>
          <boxGeometry args={[8.8, 1.45, 0.08]} />
          <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.22} />
        </mesh>

        {/* Front Cutaway Inspection Portal Window */}
        <mesh position={[0, 0.1, 0.75]} ref={glassRef}>
          <boxGeometry args={[8.8, 1.45, 0.03]} />
          <meshPhysicalMaterial
            color="#0A192F"
            transmission={0.95}
            opacity={0.15}
            transparent={true}
            roughness={0.04}
            metalness={0.1}
            reflectivity={0.99}
          />
        </mesh>

        {/* Structural Flange Rings with Gold Fasteners */}
        {[-3.2, -1.1, 1.1, 3.2].map((fx, idx) => (
          <group key={idx} position={[fx, 0.1, 0]}>
            <mesh position={[0, 0.75, 0]}>
              <boxGeometry args={[0.12, 0.12, 1.7]} />
              <meshStandardMaterial color="#0A192F" metalness={0.95} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.75, 0]}>
              <boxGeometry args={[0.12, 0.12, 1.7]} />
              <meshStandardMaterial color="#0A192F" metalness={0.95} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, -0.8]}>
              <boxGeometry args={[0.12, 1.55, 0.08]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
            </mesh>
            <mesh position={[0, 0, 0.8]}>
              <boxGeometry args={[0.12, 1.55, 0.08]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
            </mesh>
          </group>
        ))}

        {/* 3. Dynamic Grease-To-Clean Reveal */}
        {/* Clean Stainless Steel Floor */}
        <mesh
          position={[-4.3 + cleanWidth / 2, -0.6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[cleanWidth, 1.5]} />
          <meshStandardMaterial color="#F8FAFC" metalness={0.98} roughness={0.04} />
        </mesh>

        {/* Polymerized Grease Floor Layer */}
        <mesh
          position={[splitX + dirtyWidth / 2, -0.6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[dirtyWidth, 1.5]} />
          <meshStandardMaterial color="#1C0F05" roughness={0.96} metalness={0.05} />
        </mesh>

        {/* Clean Stainless Rear Wall */}
        <mesh position={[-4.3 + cleanWidth / 2, 0.1, -0.7]}>
          <planeGeometry args={[cleanWidth, 1.4]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.97} roughness={0.06} />
        </mesh>

        {/* Uncleaned Grease Rear Wall */}
        <mesh position={[splitX + dirtyWidth / 2, 0.1, -0.7]}>
          <planeGeometry args={[dirtyWidth, 1.4]} />
          <meshStandardMaterial color="#150B04" roughness={0.95} metalness={0.04} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Realistic Industrial Commercial Robotic Duct Scrubber
 */
function IndustrialCleaningRobot({ progress, isCleaning }) {
  const robotRef = useRef();
  const leftBrushRef = useRef();
  const rightBrushRef = useRef();
  const lowerRollerRef = useRef();
  const mistEmitterRef = useRef();

  const posX = -3.8 + progress * 7.6;

  useFrame((state, delta) => {
    if (isCleaning) {
      if (leftBrushRef.current) leftBrushRef.current.rotation.z += delta * 32;
      if (rightBrushRef.current) rightBrushRef.current.rotation.z -= delta * 32;
      if (lowerRollerRef.current) lowerRollerRef.current.rotation.x += delta * 28;
    }
  });

  return (
    <group ref={robotRef} position={[posX, 1.15, -0.7]}>
      {/* 1. Low-Profile Commercial Industrial Crawler Chassis */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[1.25, 0.28, 0.95]} />
        <meshStandardMaterial color="#0A192F" metalness={0.92} roughness={0.18} />
      </mesh>

      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[1.05, 0.08, 0.78]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.12} />
      </mesh>

      <group position={[0.25, 0.44, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.14, 0.12, 20]} />
          <meshStandardMaterial color="#0E2442" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.08, 0.02, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* 2. All-Terrain Crawler Track Modules */}
      <group position={[0, 0.06, -0.52]}>
        <mesh castShadow>
          <boxGeometry args={[1.35, 0.26, 0.18]} />
          <meshStandardMaterial color="#050A10" roughness={0.92} metalness={0.1} />
        </mesh>
        {[-0.48, -0.16, 0.16, 0.48].map((wx, idx) => (
          <mesh key={idx} position={[wx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.2, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      <group position={[0, 0.06, 0.52]}>
        <mesh castShadow>
          <boxGeometry args={[1.35, 0.26, 0.18]} />
          <meshStandardMaterial color="#050A10" roughness={0.92} metalness={0.1} />
        </mesh>
        {[-0.48, -0.16, 0.16, 0.48].map((wx, idx) => (
          <mesh key={idx} position={[wx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.2, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 3. Articulated Robotic Scrubbing Boom & Rotating Brush Heads */}
      <group position={[0.72, 0.12, -0.32]} ref={leftBrushRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.14, 20]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.2} wireframe={true} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.16, 12]} />
          <meshStandardMaterial color="#0F172A" metalness={0.95} />
        </mesh>
      </group>

      <group position={[0.72, 0.12, 0.32]} ref={rightBrushRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.14, 20]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.2} wireframe={true} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.16, 12]} />
          <meshStandardMaterial color="#0F172A" metalness={0.95} />
        </mesh>
      </group>

      <group position={[0.84, -0.04, 0]} ref={lowerRollerRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.52, 20]} />
          <meshStandardMaterial color="#DFC071" metalness={0.85} roughness={0.25} wireframe={true} />
        </mesh>
      </group>

      {/* 4. Forward LED Inspection Headlights */}
      <group position={[0.62, 0.28, -0.24]}>
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[4.5, 0.1, 0]}
          angle={0.65}
          penumbra={0.3}
          intensity={22}
          color="#FFFDF5"
          distance={10}
        />
      </group>

      <group position={[0.62, 0.28, 0.24]}>
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.1]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <spotLight
          position={[0.1, 0, 0]}
          target-position={[4.5, 0.1, 0]}
          angle={0.65}
          penumbra={0.3}
          intensity={22}
          color="#FFFDF5"
          distance={10}
        />
      </group>

      {/* 5. Chemical Mist & Foam Spray */}
      {isCleaning && (
        <group position={[0.9, 0.08, 0]} ref={mistEmitterRef}>
          <mesh position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.18, 0.45, 12]} />
            <meshBasicMaterial color="#93C5FD" transparent opacity={0.35} />
          </mesh>
          <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.18, 0.45, 12]} />
            <meshBasicMaterial color="#93C5FD" transparent opacity={0.35} />
          </mesh>
          <mesh position={[0.12, -0.06, 0]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* 6. Umbilical Cable */}
      <group position={[-0.8, 0.18, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.6, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, 0.1, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Subtle Rotating Mechanical Ring / Technical HUD in Background
 */
function SubtleTechnicalHudRing() {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group position={[0.2, 0.6, -1.5]} ref={ringRef}>
      {/* Outer Fine Reticle Ring */}
      <mesh>
        <ringGeometry args={[2.5, 2.52, 64]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner Dotted / Technical Ring */}
      <mesh>
        <ringGeometry args={[2.2, 2.21, 48]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* 8 Radial Tick Markers */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh
            key={i}
            position={[Math.cos(rad) * 2.36, Math.sin(rad) * 2.36, 0]}
            rotation={[0, 0, rad]}
          >
            <planeGeometry args={[0.12, 0.015]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.28} />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * Subtle Independent Floating Dust / Mist Particles (Non-Gaming, Elegant)
 */
function SubtleFloatingParticles({ count = 30 }) {
  const pointsRef = useRef();

  const [positions, offsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const offs = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 8.0;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4.0;

      offs[i * 3 + 0] = Math.random() * Math.PI * 2;
      offs[i * 3 + 1] = Math.random() * Math.PI * 2;
      offs[i * 3 + 2] = Math.random() * 0.5 + 0.5;
    }
    return [pos, offs];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const speed = offsets[idx + 2];
      array[idx + 1] += Math.sin(t * 0.4 * speed + offsets[idx + 1]) * 0.002;
      array[idx + 0] += Math.cos(t * 0.3 * speed + offsets[idx + 0]) * 0.0015;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#FDE68A"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Traveling Golden Light Beam & Commercial Studio Lighting Rig
 */
function TravelingLightRig({ scrollProgress }) {
  const lightTargetRef = useRef();

  // Traveling golden light beam coordinates based on scroll progress
  const lightX = THREE.MathUtils.lerp(-4.0, 4.0, scrollProgress);

  return (
    <>
      <ambientLight intensity={0.9} color="#F1F5F9" />

      {/* Main Overhead High-Bay Daylight */}
      <directionalLight
        position={[4, 8, 6]}
        intensity={2.4}
        color="#F8FAFC"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Soft Golden Traveling Light Beam (Moves Across Machine with Scroll) */}
      <mesh ref={lightTargetRef} position={[lightX, 0.4, -0.6]} visible={false}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
      </mesh>
      <spotLight
        position={[lightX, 3.2, 2.4]}
        target={lightTargetRef.current}
        angle={0.65}
        penumbra={0.5}
        intensity={18 + scrollProgress * 10}
        color="#F59E0B"
        distance={9}
      />

      {/* Ambient Metallic Blue & Gold Fills */}
      <directionalLight position={[-6, -2, -4]} intensity={1.4} color="#FEF3C7" />
      <directionalLight position={[0, 5, -5]} intensity={1.2} color="#93C5FD" />
    </>
  );
}

/**
 * Camera Controller: Smooth Initial Reveal + Scroll-Driven Y Rotation & Pullback Reveal
 */
function ScrollCinematicController({ scrollProgress, introProgress, isMobile }) {
  const { camera } = useThree();

  // Initial zoomed-in starting framing vs base framing
  const basePos = useMemo(() => new THREE.Vector3(0.3, 0.5, 5.4), []);
  const baseTarget = useMemo(() => new THREE.Vector3(0.2, 0.1, -0.6), []);

  useFrame(() => {
    // 1. Initial Page Load Zoomed-in to Settled Transition (introProgress 0 -> 1)
    const introZ = THREE.MathUtils.lerp(4.4, basePos.z, introProgress);
    const introScale = THREE.MathUtils.lerp(0.9, 1.0, introProgress);

    // 2. Scroll-Driven Backward Camera Pullback (scrollProgress 0 -> 1)
    const pullbackZ = introZ + scrollProgress * (isMobile ? 1.0 : 1.6);
    const elevationY = basePos.y + scrollProgress * 0.3;
    const panX = basePos.x - scrollProgress * 0.25;

    // Smooth lerp damping to prevent sudden motion
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, panX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, elevationY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, pullbackZ, 0.08);

    camera.lookAt(baseTarget.x, baseTarget.y, baseTarget.z);
  });

  return null;
}

/**
 * Main Realistic 3D Commercial Kitchen Scene with Scroll-Driven Animation
 */
export function CommercialKitchenHeroScene() {
  const containerRef = useRef(null);
  const sceneGroupRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCleaning, setIsCleaning] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll & Intro Progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);

  // Mobile viewport detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Initial Load Cinematic Scale & Fade Intro (1.4s smooth ease)
  useEffect(() => {
    const introObj = { val: 0 };
    const tween = gsap.to(introObj, {
      val: 1,
      duration: 1.4,
      ease: 'power3.out',
      onUpdate: () => {
        setIntroProgress(introObj.val);
      }
    });

    return () => tween.kill();
  }, []);

  // 2. GSAP ScrollTrigger Integration
  useEffect(() => {
    // Find closest section or container
    const heroSection = document.querySelector('section') || containerRef.current;
    if (!heroSection) return;

    const scrollProxy = { progress: 0 };

    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2, // Smooth interpolation / easing
      onUpdate: (self) => {
        scrollProxy.progress = self.progress;
        setScrollProgress(self.progress);
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // 3. Continuous 8.5s cleaning cycle loop
  useEffect(() => {
    if (isPaused) return;
    let animationFrameId;
    let startTime = performance.now();
    const loopDuration = 8500;

    const animate = (time) => {
      const elapsed = (time - startTime) % loopDuration;
      setProgress(elapsed / loopDuration);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Target Y rotation based on scroll (approx 25-35 degrees = 0.45-0.58 rad)
  const targetRotationY = scrollProgress * 0.52;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[480px] lg:min-h-[560px] overflow-hidden bg-[#050D1A] select-none"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-[#050D1A]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-slate-700 border-t-amber-400 rounded-full animate-spin" />
              <span className="text-xs font-mono text-amber-300">Loading Commercial Simulation...</span>
            </div>
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0.3, 0.5, 4.4], fov: 42 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-default"
        >
          <color attach="background" args={['#050D1A']} />

          <TravelingLightRig scrollProgress={scrollProgress} />

          <ScrollCinematicController
            scrollProgress={scrollProgress}
            introProgress={introProgress}
            isMobile={isMobile}
          />

          <SubtleTechnicalHudRing />

          <SubtleFloatingParticles count={isMobile ? 12 : 32} />

          {/* Main 3D Machine Assembly with Scroll-Driven Y Rotation */}
          <group
            ref={sceneGroupRef}
            position={[0, 0, 0]}
            rotation={[0, targetRotationY, 0]}
            scale={[
              THREE.MathUtils.lerp(0.92, 1.0, introProgress),
              THREE.MathUtils.lerp(0.92, 1.0, introProgress),
              THREE.MathUtils.lerp(0.92, 1.0, introProgress)
            ]}
          >
            <CommercialKitchenEquipment />
            <CommercialExhaustCanopy progress={progress} />
            <IndustrialCleaningRobot progress={progress} isCleaning={isCleaning} />
          </group>
        </Canvas>
      </Suspense>

      {/* Floating HUD Controls */}
      <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-[#050D1A]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-xl">
        <button
          type="button"
          onClick={() => setIsCleaning(!isCleaning)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
            isCleaning
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isCleaning ? '2,200 RPM Scrubber' : 'Scrubber Idle'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          title={isPaused ? 'Resume Motion' : 'Pause Motion'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        <div className="text-[10px] font-mono text-amber-300 pl-2 border-l border-slate-800 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Cinematic Scroll Mode</span>
        </div>
      </div>
    </div>
  );
}

export default CommercialKitchenHeroScene;
