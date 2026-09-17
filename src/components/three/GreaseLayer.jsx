import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * GreaseLayer Component
 * Heavy Commercial Kitchen Grease & Carbon Buildup:
 * - Viscous, textured dark brown/black grease coating on floor, walls & ceiling
 * - Shader dynamically cuts away grease at the active cleaning boundary (robotZ + 0.6)
 * - Emulsifying chemical foam and scrub streak marks at the transition edge
 */
export function GreaseLayer({ robotZ = 0, progress = 0 }) {
  const floorMatRef = useRef();
  const leftMatRef = useRef();
  const rightMatRef = useRef();
  const ceilingMatRef = useRef();

  const greaseShader = useMemo(() => {
    return {
      uniforms: {
        uRobotZ: { value: 0 },
        uTime: { value: 0 },
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
        uniform float uTime;
        varying vec3 vWorldPosition;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        void main() {
          float zPos = vWorldPosition.z;
          float cleanCutoff = uRobotZ + 0.65;

          // Behind the active brush: grease is completely stripped away!
          if (zPos < cleanCutoff - 0.45) {
            discard;
          }

          // Smooth transition at the cleaning brush contact zone
          float transition = smoothstep(cleanCutoff - 0.45, cleanCutoff + 1.2, zPos);

          // Procedural heavy grease texture: dark oil, charred carbon, thick streaks
          float n1 = noise(vUv * 32.0);
          float n2 = noise(vUv * 80.0 + vec2(uTime * 0.02, 0.0));
          float streaks = noise(vec2(vUv.x * 8.0, vUv.y * 50.0));
          float density = n1 * 0.55 + n2 * 0.3 + streaks * 0.15;

          // Colors: Thick dark charred oil (#140A04) to burnt brown grease (#3B1D08)
          vec3 darkOil = vec3(0.07, 0.04, 0.02);
          vec3 charredCarbon = vec3(0.03, 0.02, 0.01);
          vec3 degreaserFoam = vec3(0.95, 0.88, 0.6); // Active foaming boundary

          vec3 baseGrease = mix(darkOil, charredCarbon, density);

          // Foam highlight at the active scrub boundary
          float foamMask = smoothstep(0.05, 0.35, transition) * (1.0 - smoothstep(0.35, 0.75, transition));
          vec3 finalColor = mix(baseGrease, degreaserFoam, foamMask * 0.8);

          float alpha = transition * (0.9 + density * 0.1);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (floorMatRef.current) {
      floorMatRef.current.uniforms.uRobotZ.value = robotZ;
      floorMatRef.current.uniforms.uTime.value = t;
    }
    if (leftMatRef.current) {
      leftMatRef.current.uniforms.uRobotZ.value = robotZ;
      leftMatRef.current.uniforms.uTime.value = t;
    }
    if (rightMatRef.current) {
      rightMatRef.current.uniforms.uRobotZ.value = robotZ;
      rightMatRef.current.uniforms.uTime.value = t;
    }
    if (ceilingMatRef.current) {
      ceilingMatRef.current.uniforms.uRobotZ.value = robotZ;
      ceilingMatRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <group name="grease-layer">
      {/* Floor Grease */}
      <mesh position={[0, -0.992, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.16, 50, 32, 64]} />
        <shaderMaterial
          ref={floorMatRef}
          args={[greaseShader]}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left Wall Grease */}
      <mesh position={[-2.092, 0.7, 8]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[50, 3.36, 64, 32]} />
        <shaderMaterial
          ref={leftMatRef}
          args={[greaseShader]}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Wall Grease */}
      <mesh position={[2.092, 0.7, 8]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[50, 3.36, 64, 32]} />
        <shaderMaterial
          ref={rightMatRef}
          args={[greaseShader]}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ceiling Grease */}
      <mesh position={[0, 2.392, 8]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.16, 50, 32, 64]} />
        <shaderMaterial
          ref={ceilingMatRef}
          args={[greaseShader]}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default GreaseLayer;
