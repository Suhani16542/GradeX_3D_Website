import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// WebGL Transition Shader for Case Study Before/After
const CaseStudyTransitionShader = {
  uniforms: {
    uTextureBefore: { value: null },
    uTextureAfter: { value: null },
    uProgress: { value: 0.5 },
    uTime: { value: 0.0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
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

    // Fast Simplex Noise
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
      float noise = snoise(uv * 7.0 + vec2(uTime * 0.12, uTime * 0.08)) * 0.5 + 0.5;
      float edge = smoothstep(0.0, 0.12, uProgress - uv.x + (noise - 0.5) * 0.16);

      vec4 texB = texture2D(uTextureBefore, uv);
      vec4 texA = texture2D(uTextureAfter, uv);

      // Transition laser ionization wavefront
      float dist = abs(uv.x - uProgress + (noise - 0.5) * 0.1);
      float glow = smoothstep(0.06, 0.0, dist) * 0.75;
      vec3 glowCol = mix(vec3(0.0, 0.88, 1.0), vec3(0.96, 0.75, 0.22), noise);

      vec3 finalCol = mix(texB.rgb, texA.rgb, edge) + glowCol * glow;
      gl_FragColor = vec4(finalCol, 1.0);
    }
  `,
};

function TransitionScreen({ beforeUrl, afterUrl, progress, mouse }) {
  const matRef = useRef();

  const [texBefore, texAfter] = useLoader(THREE.TextureLoader, [beforeUrl, afterUrl]);

  useMemo(() => {
    texBefore.minFilter = THREE.LinearFilter;
    texAfter.minFilter = THREE.LinearFilter;
  }, [texBefore, texAfter]);

  const uniforms = useMemo(
    () => ({
      uTextureBefore: { value: texBefore },
      uTextureAfter: { value: texAfter },
      uProgress: { value: 0.5 },
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [texBefore, texAfter]
  );

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      matRef.current.uniforms.uProgress.value = THREE.MathUtils.damp(
        matRef.current.uniforms.uProgress.value,
        progress,
        7.0,
        delta
      );
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[3.6, 2.1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={CaseStudyTransitionShader.vertexShader}
        fragmentShader={CaseStudyTransitionShader.fragmentShader}
      />
    </mesh>
  );
}

/**
 * CaseStudyDuctScene3D Component
 * Interactive WebGL Before/After Transition for Section 6
 */
export function CaseStudyDuctScene3D({
  beforeImage = '/images/duct_before.jpg',
  afterImage = '/images/duct_after.jpg',
  progress = 0.5,
  mouse = { x: 0, y: 0 },
}) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 2.15], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <React.Suspense fallback={null}>
          <TransitionScreen
            beforeUrl={beforeImage}
            afterUrl={afterImage}
            progress={progress}
            mouse={mouse}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default CaseStudyDuctScene3D;
