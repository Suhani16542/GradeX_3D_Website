import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Custom WebGL Shader for Scene Transition (Inspired by Three.js postprocessing transition)
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
      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                         -0.577350269189626,  // -1.0 + 2.0 * C.x
                          0.024390243902439); // 1.0 / 41.0
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
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
      float noise = snoise(uv * 8.0 + vec2(uTime * 0.15, uTime * 0.1)) * 0.5 + 0.5;
      
      // Wipe threshold with dynamic noise edge
      float transitionEdge = smoothstep(0.0, 0.15, uProgress - uv.x + (noise - 0.5) * 0.2);

      // Texture samples
      vec4 texBefore = texture2D(uTextureBefore, uv);
      vec4 texAfter = texture2D(uTextureAfter, uv);

      // Glowing ionization laser wavefront along the cleaning line
      float waveDist = abs(uv.x - uProgress + (noise - 0.5) * 0.12);
      float glow = smoothstep(0.08, 0.0, waveDist) * 0.85;
      vec3 glowColor = mix(vec3(0.0, 0.94, 1.0), vec3(1.0, 0.78, 0.22), noise);

      // Blend before and after
      vec3 finalColor = mix(texBefore.rgb, texAfter.rgb, transitionEdge);
      finalColor += glowColor * glow * (1.0 - abs(uProgress - 0.5) * 1.5);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function TransitionMesh({ progress }) {
  const meshRef = useRef();
  const materialRef = useRef();

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
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      // Smoothly interpolate progress toward target
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.damp(
        materialRef.current.uniforms.uProgress.value,
        progress,
        8.0,
        delta
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.55, 2.0]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={shaderUniforms}
        vertexShader={TransitionShader.vertexShader}
        fragmentShader={TransitionShader.fragmentShader}
      />
    </mesh>
  );
}

/**
 * DuctTransitionScene3D Component
 * Interactive WebGL Canvas for Section 4 Before/After Transition
 */
export function DuctTransitionScene3D({ progress = 0.5 }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.1], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <React.Suspense fallback={null}>
          <TransitionMesh progress={progress} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default DuctTransitionScene3D;
