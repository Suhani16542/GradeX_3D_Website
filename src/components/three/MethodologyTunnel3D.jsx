import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Flow Conduit & Particle Nodes for Section 5 (Methodology)
 */
function PipelineNodesScene() {
  const pointsRef = useRef();
  const lineRef = useRef();

  const nodeCount = 180;
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const spd = new Float32Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      spd[i] = 0.4 + Math.random() * 0.8;
    }
    return [pos, spd];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < nodeCount; i++) {
        arr[i * 3 + 0] += speeds[i] * delta * 1.2;
        if (arr[i * 3 + 0] > 11) {
          arr[i * 3 + 0] = -11;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, -3]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#F59E0B"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * MethodologyTunnel3D Component
 * 3D Ambient Pipeline for Section 5
 */
export function MethodologyTunnel3D() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <PipelineNodesScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default MethodologyTunnel3D;
