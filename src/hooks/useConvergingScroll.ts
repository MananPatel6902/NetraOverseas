import { useRef } from 'react';
import { useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ConvergingScrollOptions {
  threshold?: number;
  once?: boolean;
  slideDistance?: number;  // Viewport width percentage (default: 40)
  startOffset?: number;     // When to start animation (default: 0)
  endOffset?: number;       // When to complete animation (default: 0.6)
}

export function useConvergingScroll(options: ConvergingScrollOptions = {}) {
  const {
    threshold = 0.2,
    once = true,
    slideDistance = 40,  // 40vw by default
    startOffset = 0,
    endOffset = 0.6
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Convert viewport percentage to actual pixels based on window width
  const getSlideDistance = () => {
    if (typeof window === 'undefined') return slideDistance * 10; // Fallback for SSR
    return (window.innerWidth * slideDistance) / 100;
  };

  const distance = getSlideDistance();
  const midPoint = (startOffset + endOffset) / 2;

  // Left elements: slide from -40vw to 0
  const leftX = useTransform(
    scrollYProgress,
    [startOffset, midPoint, endOffset],
    [-distance, -distance / 2, 0]
  );

  // Right elements: slide from +40vw to 0
  const rightX = useTransform(
    scrollYProgress,
    [startOffset, midPoint, endOffset],
    [distance, distance / 2, 0]
  );

  // Opacity for both
  const opacity = useTransform(
    scrollYProgress,
    [startOffset, startOffset + 0.2, endOffset - 0.1],
    [0, 0.5, 1]
  );

  return {
    ref,
    isInView,
    leftX,
    rightX,
    opacity,
    scrollYProgress,
  };
}

// Simpler variant for just fade and slide
export function useScrollReveal(options: ConvergingScrollOptions = {}) {
  const { threshold = 0.2, once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return {
    ref,
    isInView,
    variants: {
      hidden: {
        opacity: 0,
        y: 60,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  };
}

// For staggered children
export function useStaggeredReveal(options: ConvergingScrollOptions = {}) {
  const { threshold = 0.2, once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants,
  };
}
