import React, { useState, useEffect } from 'react';

/**
 * FloatingTechCard Component
 * Interactive 3D Depth Card:
 * - Depth layer scaling & mouse parallax
 * - 3D Hover tilt effect
 * - Animated number counter on entry
 * - Unique colorful micro-visuals for each card
 */
export function FloatingTechCard({
  card,
  mouse = { x: 0, y: 0 },
  className = "",
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  // Counter animation for number cards (e.g. 2,400 RPM)
  useEffect(() => {
    if (card.numericTarget) {
      let start = 0;
      const end = card.numericTarget;
      const duration = 1500;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeProgress);
        setDisplayValue(current);
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      requestAnimationFrame(updateCounter);
    }
  }, [card.numericTarget]);

  // Subtle mouse parallax offset based on card's depth multiplier
  const depthFactor = card.depth || 1.0;
  const parallaxX = mouse.x * depthFactor * 6;
  const parallaxY = mouse.y * depthFactor * 4;

  // Gentle 3D tilt on hover (controlled & subtle)
  const tiltX = isHovered ? mouse.y * 4 : 0;
  const tiltY = isHovered ? -mouse.x * 4 : 0;

  const Icon = card.icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...style,
      }}
      className={`relative p-3.5 sm:p-4 rounded-xl backdrop-blur-xl border select-none cursor-pointer group shadow-xl hover:shadow-2xl transition-shadow duration-300 ${card.borderClass} ${card.bgClass} ${className}`}
    >
      {/* Dynamic transform inner wrapper combining parallax & hover tilt */}
      <div
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, ${isHovered ? 16 : 0}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.04 : 1.0})`,
          transition: isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative z-10 space-y-1.5"
      >
        {/* Ambient Glow Halo */}
        <div
          className={`absolute -inset-2 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none ${card.glowClass}`}
        />

        {/* Top Tag & Visual Indicator */}
        <div className="flex items-center justify-between gap-2">
          <div className={`w-7 h-7 rounded-md flex items-center justify-center shadow transition-transform group-hover:scale-105 ${card.iconContainerClass}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${card.tagClass}`}>
            {card.tag}
          </span>
        </div>

        {/* Main Stat / Value */}
        <div className="space-y-0.5">
          <div className="text-base sm:text-lg font-black font-mono tracking-tight text-white flex items-baseline gap-1 group-hover:text-amber-300 transition-colors leading-tight">
            {card.numericTarget ? (
              <>
                <span>{displayValue.toLocaleString()}</span>
                {card.numericUnit && <span className="text-xs font-bold text-amber-400">{card.numericUnit}</span>}
              </>
            ) : (
              <span>{card.primaryText}</span>
            )}
          </div>
          <p className="text-[10px] font-medium text-slate-300 leading-tight">
            {card.secondaryText}
          </p>
        </div>

        {/* Micro Visual Decorators */}
        {card.microVisual === "gauge" && (
          <div className="pt-1.5 flex items-center gap-1.5">
            <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden border border-slate-700">
              <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[88%] animate-pulse" />
            </div>
            <span className="text-[8px] font-mono text-amber-400 font-bold">2.4k</span>
          </div>
        )}

        {card.microVisual === "live-pulse" && (
          <div className="pt-1 flex items-center justify-between text-[8px] font-mono text-slate-400 border-t border-slate-800/60">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
              1080p
            </span>
            <span className="text-slate-400 font-medium">CAM 01</span>
          </div>
        )}

        {card.microVisual === "micron" && (
          <div className="pt-1 flex items-center justify-between text-[8px] font-mono border-t border-slate-800/60">
            <span className="text-rose-400">185 µm</span>
            <span className="text-slate-500">→</span>
            <span className="text-emerald-400 font-bold">&lt; 15 µm</span>
          </div>
        )}

        {card.microVisual === "reach" && (
          <div className="pt-1 flex items-center justify-between text-[8px] font-mono text-sky-300 border-t border-slate-800/60">
            <span>SINGLE ACCESS</span>
            <span className="font-bold">20M+</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FloatingTechCard;
