import React, { useEffect, useState, useRef } from 'react';

/**
 * Premium Desktop Round Cursor
 * - Small circular cursor with gold/white aesthetic
 * - Smooth lerp tracking with requestAnimationFrame
 * - Expands on hover over interactive elements (buttons, links, inputs, clickables)
 * - Automatically hidden on mobile/touch devices
 * - Non-interfering (pointer-events-none)
 */
export function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position state (raw mouse vs smoothed ring position)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device is touch-primary
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Hover detection on interactive elements
    const handleElementHover = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor-hover="true"]'
      );

      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    // Smooth animation loop using lerp
    let animId;
    const lerpFactor = 0.18;

    const render = () => {
      // Lerp ring position towards mouse
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Small precision center dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-transform duration-75 ease-out ${
          isClicking
            ? 'w-1.5 h-1.5 bg-amber-400'
            : isHovered
            ? 'w-2 h-2 bg-amber-300'
            : 'w-1.5 h-1.5 bg-white'
        }`}
        style={{
          boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)',
          willChange: 'transform',
        }}
      />

      {/* Smooth outer follower ring */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-[width,height,border-color,background-color] duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-11 h-11 border-[1.5px] border-amber-400/80 bg-amber-400/10'
            : isClicking
            ? 'w-6 h-6 border border-amber-300/90 bg-amber-400/20'
            : 'w-7 h-7 border border-white/40 bg-transparent'
        }`}
        style={{
          willChange: 'transform',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
        }}
      />
    </>
  );
}

export default CustomCursor;
