import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CleaningEffect Component
 * High-pressure hydro-mist, chemical foam, and steam particle simulation
 * Emitted from the robot's rotary cleaning head against the duct walls.
 */
export function CleaningEffect({ robotZ = 0, isCleaning = true, intensity = 1.0 }) {
  const pointsRef = useRef();
  const steamRef = useRef();
  const jetGroupRef = useRef();

  // 1. High-speed hydro spray particles
  const particleCount = 280;
  const [positions, velocities, lifetimes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const life = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Origin at nozzle head
      pos[i * 3 + 0] = (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 1] = 0.35 + (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 2] = 1.1;

      // Cone spray velocity radiating outward
      const angle = Math.random() * Math.PI * 2;
      const spread = 0.8 + Math.random() * 2.2;
      vel[i * 3 + 0] = Math.cos(angle) * spread;
      vel[i * 3 + 1] = Math.sin(angle) * spread;
      vel[i * 3 + 2] = 0.5 + Math.random() * 3.5;

      life[i] = Math.random();
    }
    return [pos, vel, life];
  }, []);

  // 2. Ambient steam floating particles
  const steamCount = 80;
  const steamPositions = useMemo(() => {
    const pos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 2.4;
      pos[i * 3 + 1] = -0.6 + Math.random() * 2.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!isCleaning) return;

    // Rotate the jet emitter
    if (jetGroupRef.current) {
      jetGroupRef.current.rotation.z += delta * 24.0;
    }

    // Update spray particles
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        lifetimes[i] += delta * (2.0 + Math.random() * 1.5);

        if (lifetimes[i] > 1.0) {
          lifetimes[i] = 0;
          array[i * 3 + 0] = (Math.random() - 0.5) * 0.08;
          array[i * 3 + 1] = 0.35 + (Math.random() - 0.5) * 0.08;
          array[i * 3 + 2] = robotZ + 1.1;
        } else {
          array[i * 3 + 0] += velocities[i * 3 + 0] * delta;
          array[i * 3 + 1] += velocities[i * 3 + 1] * delta;
          array[i * 3 + 2] += velocities[i * 3 + 2] * delta;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Drift ambient steam
    if (steamRef.current) {
      const posAttr = steamRef.current.geometry.attributes.position;
      const array = posAttr.array;
      const t = state.clock.getElapsedTime();

      for (let i = 0; i < steamCount; i++) {
        array[i * 3 + 1] += delta * 0.15;
        array[i * 3 + 0] += Math.sin(t + i) * delta * 0.1;
        if (array[i * 3 + 1] > 2.0) {
          array[i * 3 + 1] = -0.8;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  if (!isCleaning) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* High-Pressure Jet Lines radiating from nozzle */}
      <group ref={jetGroupRef} position={[0, 0.35, robotZ + 1.15]}>
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx * Math.PI) / 3;
          return (
            <mesh
              key={`jet-${idx}`}
              position={[Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0.15]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <coneGeometry args={[0.04, 1.4, 6]} />
              <meshBasicMaterial
                color="#7DD3FC"
                transparent
                opacity={0.45 * intensity}
              />
            </mesh>
          );
        })}
      </group>

      {/* Spray droplets point cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#BAE6FD"
          transparent
          opacity={0.75 * intensity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Ambient Steam / Mist */}
      <points ref={steamRef} position={[0, 0, robotZ]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={steamCount}
            array={steamPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          color="#E0F2FE"
          transparent
          opacity={0.2 * intensity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default CleaningEffect;
