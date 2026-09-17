import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * 3D Western Australia & Perth Operations Visualization for Section 7
 * Features:
 * - 3D Dark navy raised Western Australia terrain geometry
 * - Gold topographic contour rings & technical grid
 * - Perth metropolitan focal beacon with pulsing radar waves
 * - 5 Service Nodes connected by animated gold laser paths:
 *   1. KITCHEN EXHAUST
 *   2. STEAM CLEANING
 *   3. COMMERCIAL CLEANING
 *   4. ROBOTIC EXHAUST CLEANING
 *   5. DIGITAL REPORTING
 * - Camera travels from broad WA overview toward Perth focus on scroll
 */
function WaTerrainScene({ scrollProgress = 0, activeNode, onNodeClick, isMobile, isSmallMobile }) {
  const terrainGroupRef = useRef();
  const perthBeaconRef = useRef();
  const raysRef = useRef([]);

  // 1. Generate WA Outline Shape & Terrain Geometry
  const { terrainGeom, waGridLines } = useMemo(() => {
    // Stylized polygon representing the iconic Western Australia coastline & border
    const shape = new THREE.Shape();
    // Start at southern border (near Eucla)
    shape.moveTo(2.4, -2.8);
    // North along state border (129° E)
    shape.lineTo(2.4, 2.5);
    // Kimberley coastline (top north)
    shape.lineTo(1.8, 3.2);
    shape.lineTo(0.8, 3.5);
    shape.lineTo(-0.2, 3.1);
    shape.lineTo(-0.8, 2.4);
    // Pilbara & Northwest Cape
    shape.lineTo(-1.8, 1.8);
    shape.lineTo(-2.6, 1.1);
    shape.lineTo(-2.8, 0.4);
    // Gascoyne & Mid West (Carnarvon / Geraldton)
    shape.lineTo(-2.7, -0.6);
    shape.lineTo(-2.3, -1.6);
    // Perth & Southwest (Cape Leeuwin, Albany, Esperance)
    shape.lineTo(-2.2, -2.6);
    shape.lineTo(-1.6, -3.2);
    shape.lineTo(-0.4, -3.3);
    shape.lineTo(1.2, -3.0);
    shape.lineTo(2.4, -2.8);

    const extrudeSettings = {
      steps: 1,
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Generate gold contour grid lines over WA terrain
    const gridPts = [];
    for (let x = -2.5; x <= 2.2; x += 0.6) {
      gridPts.push(new THREE.Vector3(x, -3.2, 0.36));
      gridPts.push(new THREE.Vector3(x, 2.8, 0.36));
    }
    for (let y = -3.0; y <= 3.0; y += 0.6) {
      gridPts.push(new THREE.Vector3(-2.6, y, 0.36));
      gridPts.push(new THREE.Vector3(2.4, y, 0.36));
    }
    const gridGeom = new THREE.BufferGeometry().setFromPoints(gridPts);

    return { terrainGeom: geom, waGridLines: gridGeom };
  }, []);

  // 2. 5 Distinct Service Nodes around Perth focus (Perth coords roughly: [-2.1, -2.1, 0.4])
  const perthPos = useMemo(() => new THREE.Vector3(-2.0, -2.0, 0.45), []);

  const serviceNodes = useMemo(() => [
    { id: 'exhaust', label: 'KITCHEN EXHAUST', pos: new THREE.Vector3(-0.8, -1.0, 0.55), color: '#F59E0B' },
    { id: 'steam', label: 'STEAM CLEANING', pos: new THREE.Vector3(0.6, -1.6, 0.55), color: '#38BDF8' },
    { id: 'commercial', label: 'COMMERCIAL CLEANING', pos: new THREE.Vector3(1.2, -0.4, 0.55), color: '#10B981' },
    { id: 'robotic', label: 'ROBOTIC EXHAUST CLEANING', pos: new THREE.Vector3(-0.4, 0.6, 0.55), color: '#FBBF24' },
    { id: 'reporting', label: 'DIGITAL REPORTING', pos: new THREE.Vector3(1.0, 1.4, 0.55), color: '#818CF8' },
  ], []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Camera and terrain choreography linked to scroll
    if (terrainGroupRef.current) {
      // Rotate and tilt from broad angle to focused Perth perspective
      const targetRotX = 0.55 - scrollProgress * 0.2;
      const targetRotY = -0.15 + scrollProgress * 0.25;
      const targetZ = isMobile ? (-0.2 + scrollProgress * 1.2) : (-0.5 + scrollProgress * 1.8);
      const targetX = isMobile ? (0.1 + scrollProgress * 0.6) : (0.4 + scrollProgress * 1.2);
      const targetY = isMobile ? (0.2 + scrollProgress * 0.6) : (-0.2 + scrollProgress * 1.0);

      terrainGroupRef.current.rotation.x = THREE.MathUtils.damp(terrainGroupRef.current.rotation.x, targetRotX, 3.0, delta);
      terrainGroupRef.current.rotation.y = THREE.MathUtils.damp(terrainGroupRef.current.rotation.y, targetRotY, 3.0, delta);
      terrainGroupRef.current.position.z = THREE.MathUtils.damp(terrainGroupRef.current.position.z, targetZ, 3.0, delta);
      terrainGroupRef.current.position.x = THREE.MathUtils.damp(terrainGroupRef.current.position.x, targetX, 3.0, delta);
      terrainGroupRef.current.position.y = THREE.MathUtils.damp(terrainGroupRef.current.position.y, targetY, 3.0, delta);
    }

    // Pulsing Perth radar wave
    if (perthBeaconRef.current) {
      const scale = 1.0 + (t % 1.5) * 0.8;
      perthBeaconRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group ref={terrainGroupRef} position={isMobile ? [0.1, 0.2, -0.2] : [0.4, -0.2, -0.5]} rotation={[0.55, -0.15, 0]}>
      {/* 1. Raised Western Australia Titanium Terrain */}
      <mesh geometry={terrainGeom} castShadow receiveShadow>
        <meshStandardMaterial
          color="#0A1628"
          metalness={0.92}
          roughness={0.22}
          emissive="#06101E"
        />
      </mesh>

      {/* Gold Topographic Grid Overlay */}
      <lineSegments geometry={waGridLines}>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.12} />
      </lineSegments>

      {/* Gold Coastline Trim Accent */}
      <mesh geometry={terrainGeom} position={[0, 0, 0.02]} scale={[1.005, 1.005, 1]}>
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.18} />
      </mesh>

      {/* 2. Main Perth Metropolitan Focal Beacon */}
      <group position={perthPos}>
        {/* Core Beacon Sphere */}
        <mesh>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshBasicMaterial color="#FDE047" />
        </mesh>
        <pointLight intensity={2.2} distance={3.5} color="#F59E0B" />

        {/* Pulsing Radar Ring */}
        <mesh ref={perthBeaconRef}>
          <ringGeometry args={[0.18, 0.24, 32]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Static Anchor Ring */}
        <mesh>
          <ringGeometry args={[0.28, 0.32, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 3. Service Nodes & Laser Ray Connectors */}
      {serviceNodes.map((node, idx) => {
        // Line from Perth to this Node
        const rayPts = [perthPos, node.pos];
        const lineGeom = new THREE.BufferGeometry().setFromPoints(rayPts);
        const isSelected = activeNode === node.id;

        return (
          <group key={node.id}>
            {/* Animated Gold Ray Connection */}
            <line geometry={lineGeom}>
              <lineBasicMaterial
                color={isSelected ? '#FDE047' : '#D4AF37'}
                transparent
                opacity={isSelected ? 0.9 : 0.45}
                linewidth={2}
              />
            </line>

            {/* Service Node Anchor */}
            <group
              position={node.pos}
              onClick={() => onNodeClick && onNodeClick(node.id)}
              className="cursor-pointer"
            >
              {/* Outer Ring */}
              <mesh scale={isSelected ? [1.4, 1.4, 1.4] : [1, 1, 1]}>
                <ringGeometry args={[0.1, 0.14, 24]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.8} side={THREE.DoubleSide} />
              </mesh>
              {/* Center Dot */}
              <mesh>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}

/**
 * ServiceAreaWaMap3D Component
 * Fullscreen Interactive Three.js WA/Perth Operations Map for Section 7
 */
export function ServiceAreaWaMap3D({
  scrollProgress = 0,
  activeNode = 'exhaust',
  onNodeClick,
}) {
  const { isMobile, isSmallMobile } = useResponsive();

  const cameraPos = useMemo(() => {
    if (isSmallMobile) return [0, -0.3, 9.4];
    if (isMobile) return [0, -0.2, 8.6];
    return [0, 0, 7.2];
  }, [isMobile, isSmallMobile]);

  const fov = isSmallMobile ? 54 : isMobile ? 50 : 46;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#030712] via-[#050D1A] to-[#02050B]">
      {/* Soft Regional Glow Highlights */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[400px] bg-sky-500/10 blur-[180px] rounded-full pointer-events-none" />

      <Canvas
        camera={{ position: cameraPos, fov }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      >
        <ambientLight intensity={0.65} color="#0B1C33" />
        <directionalLight position={[5, 8, 6]} intensity={1.6} color="#FFFFFF" />
        <directionalLight position={[-6, -4, 4]} intensity={1.1} color="#D4AF37" />
        <React.Suspense fallback={null}>
          <WaTerrainScene
            scrollProgress={scrollProgress}
            activeNode={activeNode}
            onNodeClick={onNodeClick}
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default ServiceAreaWaMap3D;
