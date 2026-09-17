import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

/**
 * Procedural Lensflare Flare Texture Generator
 * Creates glowing optical flares, diffraction streaks, and chromatic ghost rings in memory.
 */
function createFlareTexture(type = 'main') {
  const size = type === 'main' ? 512 : 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;

  if (type === 'main') {
    // Primary golden/cyan glowing light core
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.15, 'rgba(251, 191, 36, 0.9)');
    gradient.addColorStop(0.4, 'rgba(56, 189, 248, 0.4)');
    gradient.addColorStop(0.7, 'rgba(14, 165, 233, 0.1)');
    gradient.addColorStop(1, 'rgba(5, 13, 26, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Cross diffraction spikes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, size);
    ctx.moveTo(0, center);
    ctx.lineTo(size, center);
    ctx.stroke();
  } else if (type === 'ring') {
    // Optical ghost ring
    const gradient = ctx.createRadialGradient(center, center, center * 0.4, center, center, center);
    gradient.addColorStop(0, 'rgba(5, 13, 26, 0)');
    gradient.addColorStop(0.6, 'rgba(56, 189, 248, 0.35)');
    gradient.addColorStop(0.8, 'rgba(245, 158, 11, 0.25)');
    gradient.addColorStop(1, 'rgba(5, 13, 26, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  } else {
    // Small flare disc
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
 * Three.js Lensflare Light Rig
 */
function LensflareRig({ mouse = { x: 0, y: 0 } }) {
  const goldLightRef = useRef();
  const cyanLightRef = useRef();
  const particlesRef = useRef();

  // Procedural flare textures
  const textures = useMemo(() => {
    return {
      main: createFlareTexture('main'),
      ring: createFlareTexture('ring'),
      disc: createFlareTexture('disc'),
    };
  }, []);

  // Set up Three.js Lensflare objects on point lights
  useMemo(() => {
    const goldFlare = new Lensflare();
    goldFlare.addElement(new LensflareElement(textures.main, 450, 0, new THREE.Color('#F59E0B')));
    goldFlare.addElement(new LensflareElement(textures.ring, 260, 0.4, new THREE.Color('#38BDF8')));
    goldFlare.addElement(new LensflareElement(textures.disc, 120, 0.7, new THREE.Color('#FBBF24')));
    goldFlare.addElement(new LensflareElement(textures.ring, 180, 0.9, new THREE.Color('#0284C7')));

    const cyanFlare = new Lensflare();
    cyanFlare.addElement(new LensflareElement(textures.main, 380, 0, new THREE.Color('#38BDF8')));
    cyanFlare.addElement(new LensflareElement(textures.ring, 220, 0.35, new THREE.Color('#F59E0B')));
    cyanFlare.addElement(new LensflareElement(textures.disc, 90, 0.6, new THREE.Color('#0EA5E9')));

    return { goldFlare, cyanFlare };
  }, [textures]);

  // Ambient floating industrial particles
  const particleCount = 70;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = -2 - Math.random() * 6;
    }
    return pos;
  }, []);

  // Subtle, calm motion loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle floating light positions with subtle mouse reaction
    if (goldLightRef.current) {
      goldLightRef.current.position.x = 2.8 + Math.sin(t * 0.25) * 0.4 + mouse.x * 0.3;
      goldLightRef.current.position.y = 1.4 + Math.cos(t * 0.2) * 0.3 + mouse.y * 0.2;
    }

    if (cyanLightRef.current) {
      cyanLightRef.current.position.x = -2.8 + Math.cos(t * 0.22) * 0.4 + mouse.x * 0.25;
      cyanLightRef.current.position.y = -1.2 + Math.sin(t * 0.18) * 0.3 + mouse.y * 0.2;
    }

    // Slow ambient particle drift
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += delta * 0.06;
        if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} color="#0B132B" />

      {/* Gold Flare Light Source (Top-Right) */}
      <pointLight
        ref={goldLightRef}
        position={[2.8, 1.4, -2.5]}
        intensity={2.2}
        distance={25}
        color="#F59E0B"
      />

      {/* Cyan Flare Light Source (Bottom-Left) */}
      <pointLight
        ref={cyanLightRef}
        position={[-2.8, -1.2, -3.0]}
        intensity={1.8}
        distance={22}
        color="#38BDF8"
      />

      {/* Ambient Depth Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#94A3B8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

/**
 * LensflareScene3D Component
 * Cinematic Industrial Three.js Lensflare Background for Section 3
 */
export function LensflareScene3D({ mouse = { x: 0, y: 0 } }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <color attach="background" args={['#050D1A']} />
        <fogExp2 attach="fog" args={['#050D1A', 0.025]} />
        <LensflareRig mouse={mouse} />
      </Canvas>
    </div>
  );
}

export default LensflareScene3D;
