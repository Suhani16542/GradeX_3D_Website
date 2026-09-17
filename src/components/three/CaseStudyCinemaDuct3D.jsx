import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// WebGL Noise Transition Shader for 70-80% Viewport Before/After Visual
const CinematicDuctShader = {
  uniforms: {
    uTextureBefore: { value: null },
    uTextureAfter: { value: null },
    uProgress: { value: 0.0 },
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
      float noise = snoise(uv * 6.5 + vec2(uTime * 0.1, uTime * 0.06)) * 0.5 + 0.5;
      float edge = smoothstep(0.0, 0.14, uProgress - uv.x + (noise - 0.5) * 0.18);

      vec4 texB = texture2D(uTextureBefore, uv);
      vec4 texA = texture2D(uTextureAfter, uv);

      // Transition laser ionization wavefront
      float dist = abs(uv.x - uProgress + (noise - 0.5) * 0.12);
      float glow = smoothstep(0.07, 0.0, dist) * 0.9;
      vec3 glowCol = mix(vec3(0.0, 0.9, 1.0), vec3(0.96, 0.75, 0.22), noise);

      vec3 finalCol = mix(texB.rgb, texA.rgb, edge) + glowCol * glow;
      gl_FragColor = vec4(finalCol, 1.0);
    }
  `,
};

function CinematicDuct3DMesh({ progress, mouse, beforeUrl, afterUrl }) {
  const shaderRef = useRef();
  const ductTunnelRef = useRef();
  const scanLineRef = useRef();
  const markerGroupRef = useRef();

  const [texBefore, texAfter] = useLoader(THREE.TextureLoader, [beforeUrl, afterUrl]);

  useMemo(() => {
    texBefore.minFilter = THREE.LinearFilter;
    texBefore.magFilter = THREE.LinearFilter;
    texAfter.minFilter = THREE.LinearFilter;
    texAfter.magFilter = THREE.LinearFilter;
  }, [texBefore, texAfter]);

  const uniforms = useMemo(
    () => ({
      uTextureBefore: { value: texBefore },
      uTextureAfter: { value: texAfter },
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [texBefore, texAfter]
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = t;
      shaderRef.current.uniforms.uProgress.value = THREE.MathUtils.damp(
        shaderRef.current.uniforms.uProgress.value,
        progress,
        6.0,
        delta
      );
    }

    // Camera traveling through duct tunnel
    if (ductTunnelRef.current) {
      ductTunnelRef.current.position.z = THREE.MathUtils.damp(
        ductTunnelRef.current.position.z,
        -1.0 + progress * 2.5,
        3.0,
        delta
      );
      ductTunnelRef.current.rotation.z = Math.sin(t * 0.3) * 0.04;
    }

    // Traveling laser scan probe line
    if (scanLineRef.current) {
      const scanX = (progress - 0.5) * 4.6;
      scanLineRef.current.position.x = scanX;
      scanLineRef.current.scale.y = 1.0 + Math.sin(t * 8.0) * 0.05;
    }

    // Subtle inspection marker animation
    if (markerGroupRef.current) {
      markerGroupRef.current.children.forEach((marker, idx) => {
        marker.rotation.z = t * (0.8 + idx * 0.2);
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Large 3D Stainless Steel Exhaust Duct Tunnel Cross-Section */}
      <group ref={ductTunnelRef} position={[0, 0, 0]}>
        {/* Outer Cylinder Duct Shell */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[2.8, 2.8, 8.0, 32, 1, true]} />
          <meshStandardMaterial
            color="#0F172A"
            metalness={0.92}
            roughness={0.24}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Gold Structural Duct Flanges */}
        {[-3.0, -1.0, 1.0, 3.0].map((zPos, idx) => (
          <mesh key={idx} position={[0, 0, zPos]} rotation={[0, 0, 0]}>
            <torusGeometry args={[2.78, 0.04, 16, 48]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
          </mesh>
        ))}

        {/* 2. Main Full-Screen Before/After Visual Screen inside Duct */}
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[4.8, 2.7]} />
          <shaderMaterial
            ref={shaderRef}
            uniforms={uniforms}
            vertexShader={CinematicDuctShader.vertexShader}
            fragmentShader={CinematicDuctShader.fragmentShader}
          />
        </mesh>

        {/* 3. Measurement Laser Probe Line */}
        <group ref={scanLineRef} position={[0, 0, 0.25]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 2.75, 12]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.8} />
          </mesh>
          <pointLight intensity={1.5} distance={1.8} color="#00F0FF" />
        </group>

        {/* 4. Inspection Markers */}
        <group ref={markerGroupRef} position={[0, 0, 0.26]}>
          {[
            { x: -1.6, y: 0.7 },
            { x: 0.0, y: -0.8 },
            { x: 1.6, y: 0.5 },
          ].map((mPos, idx) => (
            <group key={idx} position={[mPos.x, mPos.y, 0]}>
              <mesh>
                <ringGeometry args={[0.1, 0.12, 24]} />
                <meshBasicMaterial
                  color={progress > 0.5 ? '#10B981' : '#F59E0B'}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              <mesh>
                <circleGeometry args={[0.04, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}

/**
 * CaseStudyCinemaDuct3D Component
 * Interactive Fullscreen WebGL Duct Cross-Section & Before/After Shader for Section 6
 */
export function CaseStudyCinemaDuct3D({
  beforeImage = '/images/duct_before.jpg',
  afterImage = '/images/duct_after.jpg',
  progress = 0.5,
  mouse = { x: 0, y: 0 },
}) {
  return (
    <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-amber-400/30 bg-[#030712] select-none">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} color="#0B1C33" />
        <directionalLight position={[4, 6, 5]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-4, -3, 3]} intensity={1.0} color="#D4AF37" />
        <React.Suspense fallback={null}>
          <CinematicDuct3DMesh
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

export default CaseStudyCinemaDuct3D;
