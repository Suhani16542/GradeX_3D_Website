import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * HeroCamera Component
 * Cinematic camera rigged to scroll timeline & mouse movement:
 * - Starts several meters behind the cleaning robot
 * - Frames robot at center-right so left 8-10% holds floating typography
 * - Smooth mouse X/Y damping (slow, subtle, no aggressive spinning)
 * - 5-Stage Story Sequence (Inspection -> Approach -> Cleaning -> Verification -> Clean Result)
 */
export function HeroCamera({ progress = 0, mouse = { x: 0, y: 0 }, robotZ = 0, isMobile = false }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(isMobile ? 0.0 : 0.2, 0.45, -5.2));
  const currentLookAt = useRef(new THREE.Vector3(isMobile ? 0.0 : 0.35, 0.1, 1.0));

  // Compute keyframe camera positions and targets based on progress (0.0 to 1.0)
  const getCameraKeyframe = (p) => {
    const t = THREE.MathUtils.clamp(p, 0, 1);
    let targetCamPos = new THREE.Vector3();
    let targetLookPos = new THREE.Vector3();

    // Mobile centering factor: slightly reduced X offset so robot stays centered
    const xMult = isMobile ? 0.45 : 1.0;
    const zOffset = isMobile ? -0.8 : 0.0;
    const yOffset = isMobile ? 0.12 : 0.0;

    if (t <= 0.25) {
      // SCENE 01 — INSPECTION: Camera behind robot in dark greased duct
      const k = t / 0.25;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.1 * xMult, 0.35 * xMult, k),
        THREE.MathUtils.lerp(0.42 + yOffset, 0.38 + yOffset, k),
        robotZ + THREE.MathUtils.lerp(-4.2 + zOffset, -3.2 + zOffset, k)
      );
      targetLookPos.set(0.15 * xMult, 0.18, robotZ + 1.2);
    } else if (t <= 0.55) {
      // SCENE 02/03 — APPROACH & ACTIVE ROTARY CLEANING: Camera glides alongside tracked chassis
      const k = (t - 0.25) / 0.3;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.35 * xMult, 0.65 * xMult, k),
        THREE.MathUtils.lerp(0.38 + yOffset, 0.28 + yOffset, k),
        robotZ + THREE.MathUtils.lerp(-3.2 + zOffset, -1.4 + zOffset, k)
      );
      targetLookPos.set(
        THREE.MathUtils.lerp(0.15 * xMult, 0.25 * xMult, k),
        0.2,
        robotZ + THREE.MathUtils.lerp(1.2, 1.6, k)
      );
    } else if (t <= 0.8) {
      // SCENE 04 — VERIFICATION: Clean stainless steel gleaming surface revealed
      const k = (t - 0.55) / 0.25;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.65 * xMult, 0.5 * xMult, k),
        THREE.MathUtils.lerp(0.28 + yOffset, 0.48 + yOffset, k),
        robotZ + THREE.MathUtils.lerp(-1.4 + zOffset, -2.2 + zOffset, k)
      );
      targetLookPos.set(
        0.2 * xMult,
        0.22,
        robotZ + THREE.MathUtils.lerp(1.6, 2.0, k)
      );
    } else {
      // SCENE 05 — CLEAN RESULT: Stable wide cinematic framing of pristine clean duct & machine
      const k = (t - 0.8) / 0.2;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.5 * xMult, 0.35 * xMult, k),
        THREE.MathUtils.lerp(0.48 + yOffset, 0.52 + yOffset, k),
        robotZ + THREE.MathUtils.lerp(-2.2 + zOffset, -3.0 + zOffset, k)
      );
      targetLookPos.set(
        0.15 * xMult,
        0.22,
        robotZ + THREE.MathUtils.lerp(2.0, 2.2, k)
      );
    }

    return { targetCamPos, targetLookPos };
  };

  useFrame((_, delta) => {
    const { targetCamPos, targetLookPos } = getCameraKeyframe(progress);

    // Subtle, smooth mouse parallax (no aggressive movement)
    const mouseOffsetX = mouse.x * 0.28;
    const mouseOffsetY = mouse.y * 0.18;

    const finalCamX = targetCamPos.x + mouseOffsetX;
    const finalCamY = targetCamPos.y + mouseOffsetY;
    const finalCamZ = targetCamPos.z;

    // Smooth position interpolation (damping factor)
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, finalCamX, 4.0, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, finalCamY, 4.0, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, finalCamZ, 4.0, delta);
    camera.position.copy(currentPos.current);

    // Smooth lookAt interpolation
    const lookAtX = targetLookPos.x + mouseOffsetX * 0.35;
    const lookAtY = targetLookPos.y + mouseOffsetY * 0.25;
    const lookAtZ = targetLookPos.z;

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, lookAtX, 4.5, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, lookAtY, 4.5, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, lookAtZ, 4.5, delta);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default HeroCamera;
