import React from 'react';
import { Container } from './Container';
import { cn } from '../../lib/utils';

/**
 * Reusable Section component with semantic structure and optional title/subtitle header
 */
export function Section({
  children,
  id,
  className = '',
  containerClassName = '',
  containerSize = 'default',
  badge,
  title,
  subtitle,
  align = 'center', // 'left' | 'center' | 'right'
  padding = 'default', // 'none' | 'sm' | 'default' | 'lg'
  ...props
}) {
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-8 sm:py-12',
    default: 'py-16 sm:py-24',
    lg: 'py-20 sm:py-32'
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  const hasHeader = badge || title || subtitle;

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        paddingClasses[padding] || paddingClasses.default,
        className
      )}
      {...props}
    >
      <Container size={containerSize} className={containerClassName}>
        {hasHeader && (
          <div className={cn('max-w-3xl mb-12 flex flex-col', alignClasses[align])}>
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-3">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
