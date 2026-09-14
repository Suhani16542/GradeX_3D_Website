import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Main Layout wrapper providing consistent Header, Outlet and Footer frame
 */
export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050D1A] text-slate-100 font-sans selection:bg-amber-400/30 selection:text-amber-200">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
