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
export function HeroCamera({ progress = 0, mouse = { x: 0, y: 0 }, robotZ = 0 }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0.2, 0.45, -5.2));
  const currentLookAt = useRef(new THREE.Vector3(0.35, 0.1, 1.0));

  // Compute keyframe camera positions and targets based on progress (0.0 to 1.0)
  const getCameraKeyframe = (p) => {
    const t = THREE.MathUtils.clamp(p, 0, 1);
    let targetCamPos = new THREE.Vector3();
    let targetLookPos = new THREE.Vector3();

    if (t <= 0.25) {
      // SCENE 01 — INSPECTION: Camera behind robot in dark greased duct
      const k = t / 0.25;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.2, 0.45, k),
        THREE.MathUtils.lerp(0.42, 0.35, k),
        robotZ + THREE.MathUtils.lerp(-4.2, -3.2, k)
      );
      targetLookPos.set(0.35, 0.15, robotZ + 1.2);
    } else if (t <= 0.55) {
      // SCENE 02/03 — APPROACH & ACTIVE ROTARY CLEANING: Camera glides alongside tracked chassis
      const k = (t - 0.25) / 0.3;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.45, 0.95, k),
        THREE.MathUtils.lerp(0.35, 0.25, k),
        robotZ + THREE.MathUtils.lerp(-3.2, -1.2, k)
      );
      targetLookPos.set(
        THREE.MathUtils.lerp(0.35, 0.45, k),
        0.18,
        robotZ + THREE.MathUtils.lerp(1.2, 1.6, k)
      );
    } else if (t <= 0.8) {
      // SCENE 04 — VERIFICATION: Clean stainless steel gleaming surface revealed
      const k = (t - 0.55) / 0.25;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.95, 0.75, k),
        THREE.MathUtils.lerp(0.25, 0.45, k),
        robotZ + THREE.MathUtils.lerp(-1.2, -2.2, k)
      );
      targetLookPos.set(
        0.4,
        0.2,
        robotZ + THREE.MathUtils.lerp(1.6, 2.0, k)
      );
    } else {
      // SCENE 05 — CLEAN RESULT: Stable wide cinematic framing of pristine clean duct & machine
      const k = (t - 0.8) / 0.2;
      targetCamPos.set(
        THREE.MathUtils.lerp(0.75, 0.55, k),
        THREE.MathUtils.lerp(0.45, 0.5, k),
        robotZ + THREE.MathUtils.lerp(-2.2, -3.0, k)
      );
      targetLookPos.set(
        0.35,
        0.2,
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
