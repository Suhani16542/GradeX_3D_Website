import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';
import { CleaningRobot } from './CleaningRobot';

/**
 * Procedural Lensflare Texture Generator
 */
function createFlareTexture(type = 'main') {
  const size = type === 'main' ? 512 : 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;

  if (type === 'main') {
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.15, 'rgba(245, 158, 11, 0.9)');
    gradient.addColorStop(0.45, 'rgba(56, 189, 248, 0.4)');
    gradient.addColorStop(0.7, 'rgba(14, 165, 233, 0.1)');
    gradient.addColorStop(1, 'rgba(5, 13, 26, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Subtle optical star spike
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, size);
    ctx.moveTo(0, center);
    ctx.lineTo(size, center);
    ctx.stroke();
  } else if (type === 'ring') {
    const gradient = ctx.createRadialGradient(center, center, center * 0.4, center, center, center);
    gradient.addColorStop(0, 'rgba(5, 13, 26, 0)');
    gradient.addColorStop(0.65, 'rgba(56, 189, 248, 0.35)');
    gradient.addColorStop(0.85, 'rgba(245, 158, 11, 0.25)');
    gradient.addColorStop(1, 'rgba(5, 13, 26, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  } else {
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
    gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.3)');
    gradient.addColorStop(1, 'rgba(5, 13, 26, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Stainless Steel Exhaust Duct Tunnel with Grease-to-Clean Transition
 */
function Section2DuctEnvironment({ robotZ = 0 }) {
  // Flange frames along Z-axis
  const flangePositions = useMemo(() => [-6, -2, 2, 6, 10, 14], []);

  const steelFloor = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#94A3B8',
        metalness: 0.94,
        roughness: 0.2,
      }),
    []
  );

  const steelWalls = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#64748B',
        metalness: 0.9,
        roughness: 0.26,
      }),
    []
  );

  const flangeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#334155',
        metalness: 0.88,
        roughness: 0.35,
      }),
    []
  );

  const boltMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 0.95,
        roughness: 0.15,
      }),
    []
  );

  // Greasy floor patch ahead of robot
  const greaseFloorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#120904',
        metalness: 0.4,
        roughness: 0.7,
      }),
    []
  );

  return (
    <group name="section2-duct">
      {/* Polished Clean Stainless Steel Floor (Z < 1.0) */}
      <mesh position={[0, -0.98, -4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.2, 16]} />
        <primitive object={steelFloor} />
      </mesh>

      {/* Greasy Duct Floor Ahead of Brush (Z > 1.0) */}
      <mesh position={[0, -0.975, 8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.2, 12]} />
        <primitive object={greaseFloorMat} />
      </mesh>

      {/* Duct Ceiling */}
      <mesh position={[0, 2.2, 2]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.2, 28]} />
        <primitive object={steelWalls} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-2.1, 0.6, 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[28, 3.2]} />
        <primitive object={steelWalls} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[2.1, 0.6, 2]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[28, 3.2]} />
        <primitive object={steelWalls} />
      </mesh>

      {/* Flange Bars & Gold Hardware */}
      {flangePositions.map((zPos, idx) => (
        <group key={`flange-${idx}`} position={[0, 0.6, zPos]}>
          <mesh position={[0, 1.58, 0]}>
            <boxGeometry args={[4.28, 0.08, 0.12]} />
            <primitive object={flangeMat} />
          </mesh>
          <mesh position={[0, -1.58, 0]}>
            <boxGeometry args={[4.28, 0.08, 0.12]} />
            <primitive object={flangeMat} />
          </mesh>
          <mesh position={[-2.08, 0, 0]}>
            <boxGeometry args={[0.08, 3.2, 0.12]} />
            <primitive object={flangeMat} />
          </mesh>
          <mesh position={[2.08, 0, 0]}>
            <boxGeometry args={[0.08, 3.2, 0.12]} />
            <primitive object={flangeMat} />
          </mesh>

          {/* Bolts */}
          {[-1.6, -0.8, 0, 0.8, 1.6].map((bx, bIdx) => (
            <mesh key={`b-${bIdx}`} position={[bx, 1.58, 0.07]}>
              <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
              <primitive object={boltMat} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/**
 * Industrial Lighting & Three.js Lensflare Rig
 */
function Section2Lighting({ mouse = { x: 0, y: 0 } }) {
  const flareLightRef = useRef();

  const textures = useMemo(() => {
    return {
      main: createFlareTexture('main'),
      ring: createFlareTexture('ring'),
      disc: createFlareTexture('disc'),
    };
  }, []);

  useMemo(() => {
    if (!textures.main) return;
    const flare = new Lensflare();
    flare.addElement(new LensflareElement(textures.main, 420, 0, new THREE.Color('#F59E0B')));
    flare.addElement(new LensflareElement(textures.ring, 220, 0.35, new THREE.Color('#38BDF8')));
    flare.addElement(new LensflareElement(textures.disc, 100, 0.65, new THREE.Color('#FBBF24')));
    return flare;
  }, [textures]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (flareLightRef.current) {
      flareLightRef.current.position.x = 2.4 + Math.sin(t * 0.3) * 0.3 + mouse.x * 0.3;
      flareLightRef.current.position.y = 1.6 + Math.cos(t * 0.25) * 0.2 + mouse.y * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#0B132B" />

      {/* Main Key Light */}
      <directionalLight
        position={[3.5, 4.5, 2.0]}
        intensity={1.4}
        color="#F8FAFC"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Grade X Warm Gold Rim Light */}
      <directionalLight position={[-3.5, 2.5, 4.0]} intensity={1.0} color="#F59E0B" />

      {/* Cyan Silhouette Light */}
      <directionalLight position={[0, 1.8, 12.0]} intensity={0.8} color="#38BDF8" />

      {/* Background Lensflare Light */}
      <pointLight
        ref={flareLightRef}
        position={[2.4, 1.6, -1.5]}
        intensity={2.0}
        distance={20}
        color="#F59E0B"
      />

      {/* Twin Robot Searchlights casting along duct floor */}
      <pointLight position={[0, -0.4, 1.2]} intensity={2.2} distance={8} color="#E0F2FE" />
      <pointLight position={[0, 0.1, 1.6]} intensity={3.0} distance={4} color="#F59E0B" />
    </>
  );
}

/**
 * Main 3D Scene Controller for Section 2
 */
function Section2SceneInner({ mouse = { x: 0, y: 0 } }) {
  const cameraRef = useRef();
  const robotGroupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle continuous mechanical forward drift & suspension sway
    if (robotGroupRef.current) {
      robotGroupRef.current.position.y = -0.02 + Math.sin(t * 4.0) * 0.008;
      robotGroupRef.current.rotation.z = Math.sin(t * 2.5) * 0.006;
      robotGroupRef.current.rotation.y = 0.15 + mouse.x * 0.08;
    }

    // Subtle camera parallax damping
    if (state.camera) {
      const targetCamX = 0.55 + mouse.x * 0.25;
      const targetCamY = 0.35 + mouse.y * 0.18;
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 3.5, delta);
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 3.5, delta);
      state.camera.lookAt(0.2, 0.05, 0.4);
    }
  });

  return (
    <>
      <color attach="background" args={['#050D1A']} />
      <fogExp2 attach="fog" args={['#050D1A', 0.022]} />

      <Section2Lighting mouse={mouse} />
      <Section2DuctEnvironment robotZ={0} />

      {/* Main Industrial Cleaning Robot */}
      <group ref={robotGroupRef} position={[0.1, 0, 0]} rotation={[0, 0.15, 0]}>
        <CleaningRobot robotZ={0} isCleaning={true} isMoving={true} />
      </group>
    </>
  );
}

/**
 * Technology3DScene Component
 * Real 3D Industrial Robot operating inside commercial kitchen exhaust duct
 */
export function Technology3DScene({ mouse = { x: 0, y: 0 } }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0.55, 0.35, 3.8], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Section2SceneInner mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Technology3DScene;
