import Lenis from 'lenis';

let lenis: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll
 * @returns Lenis instance
 */
export function initLenis(): Lenis {
  if (lenis) {
    return lenis;
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Start RAF loop
  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}

/**
 * Get the current Lenis instance
 * @returns Lenis instance or null
 */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Scroll to a specific target
 * @param target - CSS selector, DOM element, or number (in pixels)
 * @param options - Scroll options
 */
export function scrollTo(
  target: string | HTMLElement | number,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
  }
) {
  if (lenis) {
    lenis.scrollTo(target, options);
  }
}

/**
 * Cleanup Lenis instance
 */
export function cleanupLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

/**
 * Stop smooth scrolling
 */
export function stopLenis() {
  lenis?.stop();
}

/**
 * Start smooth scrolling
 */
export function startLenis() {
  lenis?.start();
}
