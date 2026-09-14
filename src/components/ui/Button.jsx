import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/**
 * Reusable polymorphic Button component
 */
export function Button({
  children,
  className = '',
  variant = 'gold', // 'gold' | 'navy' | 'outline' | 'ghost' | 'secondary'
  size = 'md',      // 'sm' | 'md' | 'lg'
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5 font-semibold"
  };

  const variantStyles = {
    gold: "bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5",
    navy: "bg-[#0E2442] hover:bg-[#15325B] text-slate-100 border border-amber-400/30 hover:border-amber-400/60 shadow-lg shadow-black/40",
    secondary: "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80",
    outline: "bg-transparent hover:bg-amber-400/10 text-amber-300 border border-amber-400/40 hover:border-amber-400",
    ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white"
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size] || sizeStyles.md,
    variantStyles[variant] || variantStyles.gold,
    className
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
