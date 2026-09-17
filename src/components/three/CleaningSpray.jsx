import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CleaningSpray Component
 * Dynamic high-pressure water jets, chemical degreaser mist, and steam particles:
 * - 6 conical high-velocity water jet streams spraying toward the duct wall/floor
 * - 300+ dynamic mist & water droplet particles blasting at high velocity
 * - Ambient steam cloud billowing in the robot's headlights
 */
export function CleaningSpray({ isCleaning = true, intensity = 1.0, position = [0, 0, 0] }) {
  const sprayGroupRef = useRef();
  const dropletsRef = useRef();
  const steamRef = useRef();
  const jetConesRef = useRef();

  // Water droplet particles
  const dropletCount = 240;
  const [dropletPositions, dropletVelocities, dropletLifetimes] = useMemo(() => {
    const pos = new Float32Array(dropletCount * 3);
    const vel = new Float32Array(dropletCount * 3);
    const life = new Float32Array(dropletCount);

    for (let i = 0; i < dropletCount; i++) {
      pos[i * 3 + 0] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;

      // Cone spray velocity towards the contact surface (+Z and radial outward)
      const angle = Math.random() * Math.PI * 2;
      const spread = 0.6 + Math.random() * 2.0;
      vel[i * 3 + 0] = Math.cos(angle) * spread;
      vel[i * 3 + 1] = Math.sin(angle) * spread;
      vel[i * 3 + 2] = 1.5 + Math.random() * 4.0;

      life[i] = Math.random();
    }
    return [pos, vel, life];
  }, []);

  // Steam cloud particles
  const steamCount = 60;
  const steamPositions = useMemo(() => {
    const pos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 1.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!isCleaning) return;

    // Rotate jet nozzles
    if (jetConesRef.current) {
      jetConesRef.current.rotation.z += delta * 24.0;
    }

    // Update droplet particles
    if (dropletsRef.current) {
      const posAttr = dropletsRef.current.geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < dropletCount; i++) {
        dropletLifetimes[i] += delta * 3.2;

        if (dropletLifetimes[i] > 1.0) {
          dropletLifetimes[i] = 0;
          array[i * 3 + 0] = (Math.random() - 0.5) * 0.05;
          array[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
          array[i * 3 + 2] = 0;
        } else {
          array[i * 3 + 0] += dropletVelocities[i * 3 + 0] * delta;
          array[i * 3 + 1] += dropletVelocities[i * 3 + 1] * delta;
          array[i * 3 + 2] += dropletVelocities[i * 3 + 2] * delta;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Billow steam cloud
    if (steamRef.current) {
      const posAttr = steamRef.current.geometry.attributes.position;
      const array = posAttr.array;
      const t = state.clock.getElapsedTime();

      for (let i = 0; i < steamCount; i++) {
        array[i * 3 + 1] += delta * 0.2;
        array[i * 3 + 0] += Math.sin(t * 2 + i) * delta * 0.15;
        if (array[i * 3 + 1] > 1.8) {
          array[i * 3 + 1] = -0.5;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  if (!isCleaning) return null;

  return (
    <group ref={sprayGroupRef} position={position}>
      {/* High-Velocity Conical Spray Jets */}
      <group ref={jetConesRef} position={[0, 0, 0.1]}>
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx * Math.PI) / 3;
          return (
            <mesh
              key={`jet-cone-${idx}`}
              position={[Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, 0.4]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <coneGeometry args={[0.06, 0.9, 8]} />
              <meshBasicMaterial
                color="#7DD3FC"
                transparent
                opacity={0.4 * intensity}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          );
        })}
      </group>

      {/* High-Speed Droplets Point Cloud */}
      <points ref={dropletsRef} position={[0, 0, 0.05]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dropletCount}
            array={dropletPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#BAE6FD"
          transparent
          opacity={0.8 * intensity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Billowing Steam & Chemical Foam Mist */}
      <points ref={steamRef} position={[0, 0.2, 0.6]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={steamCount}
            array={steamPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.28}
          color="#E0F2FE"
          transparent
          opacity={0.25 * intensity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default CleaningSpray;
