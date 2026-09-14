import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Reusable Container component for layout max-width constraints
 */
export function Container({
  children,
  className = '',
  size = 'default', // 'default' | 'narrow' | 'wide' | 'full'
  as: Component = 'div',
  ...props
}) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-8xl',
    full: 'max-w-full'
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
