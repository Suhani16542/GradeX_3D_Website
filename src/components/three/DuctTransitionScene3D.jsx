import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Custom WebGL Shader for Scene Transition with 3D Depth Zoom
const TransitionShader = {
  uniforms: {
    uTextureBefore: { value: null },
    uTextureAfter: { value: null },
    uProgress: { value: 0.0 },
    uTime: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTextureBefore;
    uniform sampler2D uTextureAfter;
    uniform float uProgress;
    uniform float uTime;
    varying vec2 vUv;

    // Simplex Noise Generator
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;

      // Noise pattern for organic grease dissolution
      float noise = snoise(uv * 7.5 + vec2(uTime * 0.12, uTime * 0.08)) * 0.5 + 0.5;
      
      // Wipe threshold with dynamic noise edge
      float transitionEdge = smoothstep(0.0, 0.14, uProgress - uv.x + (noise - 0.5) * 0.18);

      // Texture samples
      vec4 texBefore = texture2D(uTextureBefore, uv);
      vec4 texAfter = texture2D(uTextureAfter, uv);

      // Glowing ionization laser wavefront along the cleaning line
      float waveDist = abs(uv.x - uProgress + (noise - 0.5) * 0.1);
      float glow = smoothstep(0.07, 0.0, waveDist) * 0.85;
      vec3 glowColor = mix(vec3(0.0, 0.9, 1.0), vec3(0.96, 0.75, 0.22), noise);

      // Blend before and after
      vec3 finalColor = mix(texBefore.rgb, texAfter.rgb, transitionEdge);
      finalColor += glowColor * glow * (1.0 - abs(uProgress - 0.5) * 1.2);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function TransitionDuctTunnelMesh({ progress }) {
  const tunnelGroupRef = useRef();
  const materialRef = useRef();
  const scanLineRef = useRef();
  const markerGroupRef = useRef();

  // Load actual Before/After high-res commercial kitchen duct textures
  const [texBefore, texAfter] = useLoader(THREE.TextureLoader, [
    '/images/duct_before.jpg',
    '/images/duct_after.jpg',
  ]);

  useMemo(() => {
    texBefore.minFilter = THREE.LinearFilter;
    texBefore.magFilter = THREE.LinearFilter;
    texAfter.minFilter = THREE.LinearFilter;
    texAfter.magFilter = THREE.LinearFilter;
  }, [texBefore, texAfter]);

  const shaderUniforms = useMemo(
    () => ({
      uTextureBefore: { value: texBefore },
      uTextureAfter: { value: texAfter },
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
    }),
    [texBefore, texAfter]
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.damp(
        materialRef.current.uniforms.uProgress.value,
        progress,
        7.0,
        delta
      );
    }

    // 3D Camera / Duct Tunnel Travel & Zoom Effect
    if (tunnelGroupRef.current) {
      // Moves forward into the duct as progress cleans from dirty to clean
      tunnelGroupRef.current.position.z = THREE.MathUtils.damp(
        tunnelGroupRef.current.position.z,
        -0.8 + progress * 2.2,
        3.5,
        delta
      );
      tunnelGroupRef.current.rotation.z = Math.sin(t * 0.4) * 0.03;
    }

    // Laser scan probe line travels across
    if (scanLineRef.current) {
      const scanX = (progress - 0.5) * 4.4;
      scanLineRef.current.position.x = scanX;
      scanLineRef.current.scale.y = 1.0 + Math.sin(t * 7.0) * 0.04;
    }

    // Inspection markers rotation
    if (markerGroupRef.current) {
      markerGroupRef.current.children.forEach((marker, idx) => {
        marker.rotation.z = t * (0.8 + idx * 0.3);
      });
    }
  });

  return (
    <group ref={tunnelGroupRef} position={[0, 0, 0]}>
      {/* 1. 3D Cylindrical Stainless Steel Exhaust Duct Tunnel */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[2.7, 2.7, 8.0, 32, 1, true]} />
        <meshStandardMaterial
          color="#0B132B"
          metalness={0.92}
          roughness={0.25}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Gold Structural Duct Flanges */}
      {[-3.0, -1.0, 1.0, 3.0].map((zPos, idx) => (
        <mesh key={idx} position={[0, 0, zPos]}>
          <torusGeometry args={[2.68, 0.04, 16, 48]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}

      {/* 2. Before/After WebGL Shader Screen inside Duct */}
      <mesh position={[0, 0, 0.2]}>
        <planeGeometry args={[4.6, 2.6]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={shaderUniforms}
          vertexShader={TransitionShader.vertexShader}
          fragmentShader={TransitionShader.fragmentShader}
        />
      </mesh>

      {/* 3. Traveling Laser Scan Probe Line */}
      <group ref={scanLineRef} position={[0, 0, 0.25]}>
        <mesh>
          <cylinderGeometry args={[0.015, 0.015, 2.65, 12]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
        </mesh>
        <pointLight intensity={1.6} distance={2.0} color="#00F0FF" />
      </group>

      {/* 4. Inspection Markers */}
      <group ref={markerGroupRef} position={[0, 0, 0.26]}>
        {[
          { x: -1.5, y: 0.7 },
          { x: 0.0, y: -0.75 },
          { x: 1.5, y: 0.5 },
        ].map((mPos, idx) => (
          <group key={idx} position={[mPos.x, mPos.y, 0]}>
            <mesh>
              <ringGeometry args={[0.09, 0.11, 24]} />
              <meshBasicMaterial
                color={progress > 0.5 ? '#10B981' : '#F59E0B'}
                transparent
                opacity={0.85}
              />
            </mesh>
            <mesh>
              <circleGeometry args={[0.035, 16]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

import { useResponsive } from '../../hooks/useResponsive';

/**
 * DuctTransitionScene3D Component
 * Interactive WebGL Canvas with 3D Duct Tunnel & Camera Zoom Effect for Section 4
 */
export function DuctTransitionScene3D({ progress = 0.5 }) {
  const { isMobile } = useResponsive();

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: isMobile ? [0, 0, 4.2] : [0, 0, 3.6],
          fov: isMobile ? 54 : 46,
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      >
        <ambientLight intensity={0.65} color="#0B1C33" />
        <directionalLight position={[4, 6, 5]} intensity={1.6} color="#FFFFFF" />
        <directionalLight position={[-4, -3, 3]} intensity={1.1} color="#D4AF37" />
        <React.Suspense fallback={null}>
          <TransitionDuctTunnelMesh progress={progress} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default DuctTransitionScene3D;
