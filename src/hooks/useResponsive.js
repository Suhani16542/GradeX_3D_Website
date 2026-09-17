import { useState, useEffect } from 'react';

/**
 * useResponsive Hook
 * Provides reactive viewport information:
 * - isSmallMobile: <= 479px (iPhone SE, small Androids)
 * - isMobile: <= 767px
 * - isTablet: 768px - 1023px
 * - isDesktop: >= 1024px
 * - isWideDesktop: >= 1440px
 * - width, height, aspectRatio
 */
export function useResponsive() {
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 1200, height: 800, isSmallMobile: false, isMobile: false, isTablet: false, isDesktop: true, isWideDesktop: false, aspectRatio: 1.5 };
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
      isSmallMobile: width < 480,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      isWideDesktop: width >= 1440,
      aspectRatio: width / (height || 1),
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setDimensions({
          width,
          height,
          isSmallMobile: width < 480,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024,
          isWideDesktop: width >= 1440,
          aspectRatio: width / (height || 1),
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return dimensions;
}

export default useResponsive;
