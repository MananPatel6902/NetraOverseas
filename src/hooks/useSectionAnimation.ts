import { useRef } from 'react';
import { useScroll, useTransform, useInView } from 'framer-motion';

interface SectionAnimationOptions {
  slideDistance?: number;
  threshold?: number;
}

/**
 * Hook for creating slide-in/slide-out animations based on scroll position
 * Elements slide in when entering the viewport and slide out when leaving
 */
export function useSectionAnimation(options: SectionAnimationOptions = {}) {
  const { slideDistance = 100, threshold = 0.1 } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: threshold });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Left element: slides in from left, slides out to left
  // When scrollYProgress is 0 (section entering from bottom), element is off-screen left
  // When scrollYProgress is 0.3-0.7, element is in view
  // When scrollYProgress is 1 (section leaving at top), element slides out left
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [-slideDistance, -slideDistance / 2, 0, -slideDistance / 2, -slideDistance]
  );

  // Right element: slides in from right, slides out to right
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [slideDistance, slideDistance / 2, 0, slideDistance / 2, slideDistance]
  );

  // Opacity fade in/out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  // Scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.95, 0.98, 1, 0.98, 0.95]
  );

  return {
    ref,
    isInView,
    leftX,
    rightX,
    opacity,
    scale,
    scrollYProgress,
  };
}

/**
 * Hook for hero section - slides in on load, slides out on scroll
 */
export function useHeroAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Hero left element starts at center, slides out left when scrolling
  const leftX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -50, -150]
  );

  // Hero right element starts at center, slides out right when scrolling
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 50, 150]
  );

  // Fade out as scrolling down
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [1, 0.8, 0]
  );

  // Scale down slightly when scrolling
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.98, 0.95]
  );

  return {
    ref,
    leftX,
    rightX,
    opacity,
    scale,
    scrollYProgress,
  };
}
