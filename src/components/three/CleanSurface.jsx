import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CleanSurface Component
 * Spotless, highly-reflective brushed stainless steel surface revealed behind the robot:
 * - High specular gloss and subtle wet rinse sheen
 * - Dynamic boundary matching the robot's advance
 */
export function CleanSurface({ robotZ = 0 }) {
  const cleanMatRef = useRef();

  const cleanShader = useMemo(() => {
    return {
      uniforms: {
        uRobotZ: { value: 0 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uRobotZ;
        varying vec3 vWorldPosition;
        varying vec2 vUv;

        void main() {
          float zPos = vWorldPosition.z;
          float cleanCutoff = uRobotZ + 0.65;

          // Ahead of the robot, clean surface overlay does not show (grease layer covers it)
          if (zPos > cleanCutoff) {
            discard;
          }

          // Subtle glistening rinse sheen right behind the active cleaning brush
          float wetGleam = smoothstep(cleanCutoff - 3.5, cleanCutoff, zPos);
          vec3 cleanSteelTint = vec3(0.92, 0.96, 1.0);
          float alpha = 0.28 + wetGleam * 0.22;

          gl_FragColor = vec4(cleanSteelTint, alpha);
        }
      `,
    };
  }, []);

  useFrame(() => {
    if (cleanMatRef.current) {
      cleanMatRef.current.uniforms.uRobotZ.value = robotZ;
    }
  });

  return (
    <group name="clean-surface-gleam">
      {/* Floor Gleam */}
      <mesh position={[0, -0.994, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.18, 50]} />
        <shaderMaterial
          ref={cleanMatRef}
          args={[cleanShader]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default CleanSurface;
