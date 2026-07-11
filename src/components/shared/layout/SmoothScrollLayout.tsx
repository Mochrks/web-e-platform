'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export default function SmoothScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only enable smooth scroll on desktop with fine pointer (mouse)
    // Disable on mobile/tablet touch devices to avoid overhead
    const isDesktopWithMouse = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktopWithMouse) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP
    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
