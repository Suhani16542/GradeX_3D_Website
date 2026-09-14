import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Reusable Error Fallback UI
 */
export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6" role="alert">
      <div className="glass-panel max-w-lg w-full p-8 rounded-2xl text-center border border-rose-500/20 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-5 text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Something went wrong</h2>
        <p className="text-slate-400 text-sm mb-6">
          {error?.message || 'An unexpected error occurred. Please refresh or return to the homepage.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition border border-slate-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          )}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold transition cursor-pointer"
          >
            <Home className="w-4 h-4" /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
