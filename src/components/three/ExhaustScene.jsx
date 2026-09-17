import React from 'react';
import { HeroCamera } from './HeroCamera';
import { HeroLights } from './HeroLights';
import { ExhaustDuct } from './ExhaustDuct';
import { CleaningRobot } from './CleaningRobot';
import { GreaseLayer } from './GreaseLayer';
import { CleanSurface } from './CleanSurface';

/**
 * ExhaustScene Component
 * Encapsulates the complete 3D commercial kitchen exhaust duct cleaning simulation:
 * - Depth atmospheric fog
 * - Industrial duct lighting & robot searchlights
 * - Stainless steel duct geometry
 * - Viscous grease & dynamic cleaning transition
 * - Spotless stainless steel surface revealed behind the robot
 * - Industrial cleaning robot with rotating brush and high-pressure spray
 * - Cinematic damped camera controller
 */
export function ExhaustScene({ progress = 0, mouse = { x: 0, y: 0 }, robotZ = 0, isCleaning = true, isMoving = true, isMobile = false }) {
  return (
    <>
      {/* Deep industrial duct background & depth fog */}
      <color attach="background" args={['#050D1A']} />
      <fogExp2 attach="fog" args={['#050D1A', isMobile ? 0.02 : 0.016]} />

      {/* Cinematic Camera */}
      <HeroCamera progress={progress} mouse={mouse} robotZ={robotZ} isMobile={isMobile} />

      {/* Industrial Lighting */}
      <HeroLights robotZ={robotZ} isCleaning={isCleaning} />

      {/* Stainless Steel Exhaust Duct Tunnel */}
      <ExhaustDuct />

      {/* Spotless Clean Metallic Gleam behind robot */}
      <CleanSurface robotZ={robotZ} />

      {/* Dynamic Grease Buildup Layer ahead of robot */}
      <GreaseLayer robotZ={robotZ} progress={progress} />

      {/* Industrial Robotic Cleaning Machine */}
      <CleaningRobot
        robotZ={robotZ}
        isCleaning={isCleaning}
        isMoving={isMoving}
        progress={progress}
      />
    </>
  );
}

export default ExhaustScene;
