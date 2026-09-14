import React from 'react';

/**
 * Reusable Loading Spinner component with Grade X gold/navy theme
 */
export function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4" role="status" aria-label="Loading">
      <div className={`relative ${sizeClasses[size]} rounded-full border-slate-700 border-t-amber-400 animate-spin`} />
      {text && <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">{text}</p>}
    </div>
  );
}
