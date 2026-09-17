import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';

/**
 * Main Layout wrapper
 * On the homepage ('/'), the 3D HeroOverlay renders the edge-to-edge transparent navigation.
 * On all other subpages, the standard Header is displayed.
 */
export function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#050D1A] text-slate-100 font-sans selection:bg-amber-400/30 selection:text-amber-200">
      <CustomCursor />
      {!isHomePage && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
