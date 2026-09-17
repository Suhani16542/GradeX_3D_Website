import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * TechParticleField Component
 * Ambient 3D floating data nodes, cyan/gold energy motes and metallic dust
 */
export function TechParticleField() {
  const pointsGoldRef = useRef();
  const pointsCyanRef = useRef();

  const countGold = 80;
  const countCyan = 80;

  const [goldPositions, goldSpeeds] = useMemo(() => {
    const pos = new Float32Array(countGold * 3);
    const spd = new Float32Array(countGold);
    for (let i = 0; i < countGold; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      spd[i] = 0.2 + Math.random() * 0.4;
    }
    return [pos, spd];
  }, []);

  const [cyanPositions, cyanSpeeds] = useMemo(() => {
    const pos = new Float32Array(countCyan * 3);
    const spd = new Float32Array(countCyan);
    for (let i = 0; i < countCyan; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      spd[i] = 0.2 + Math.random() * 0.4;
    }
    return [pos, spd];
  }, []);

  useFrame((_, delta) => {
    if (pointsGoldRef.current) {
      const posAttr = pointsGoldRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < countGold; i++) {
        arr[i * 3 + 1] += goldSpeeds[i] * delta * 0.5;
        if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6;
      }
      posAttr.needsUpdate = true;
    }

    if (pointsCyanRef.current) {
      const posAttr = pointsCyanRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < countCyan; i++) {
        arr[i * 3 + 1] += cyanSpeeds[i] * delta * 0.5;
        if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Gold Particles */}
      <points ref={pointsGoldRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={countGold}
            array={goldPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#F59E0B"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Cyan Particles */}
      <points ref={pointsCyanRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={countCyan}
            array={cyanPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#38BDF8"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default TechParticleField;
