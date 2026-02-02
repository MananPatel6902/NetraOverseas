import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface ParallaxFlyOutOptions {
  direction: 'left' | 'right';
  maxDistance?: number;     // Maximum distance to fly (default: 100 = 100%)
  scaleRange?: [number, number]; // Scale transformation range (default: [1, 1.4])
}

/**
 * Hook for creating parallax fly-out effects on background elements
 * As user scrolls, elements fly outward toward screen edges
 *
 * @param options - Configuration for the parallax effect
 * @returns Object containing ref and motion values for x, scale, and opacity
 *
 * @example
 * const { ref, x, scale, opacity } = useParallaxFlyOut({ direction: 'left' });
 *
 * <motion.div ref={ref} style={{ x, scale, opacity }}>
 *   Background Shape
 * </motion.div>
 */
export function useParallaxFlyOut(options: ParallaxFlyOutOptions) {
  const {
    direction,
    maxDistance = 100,
    scaleRange = [1, 1.4],
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate x-axis movement based on direction
  // Left: 0 → -100% (fly left)
  // Right: 0 → +100% (fly right)
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [`0%`, `-${maxDistance}%`] : [`0%`, `${maxDistance}%`]
  );

  // Scale up as element flies away (creates depth effect)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleRange[0], (scaleRange[0] + scaleRange[1]) / 2, scaleRange[1]]
  );

  // Fade out as element flies away
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.8, 0.4, 0]
  );

  return {
    ref,
    x,
    scale,
    opacity,
    scrollYProgress,
  };
}

/**
 * Simplified version for diagonal fly-out effect
 *
 * @param options - Configuration with diagonal direction
 * @returns Object containing ref and motion values for x, y, scale, and opacity
 */
export function useParallaxFlyOutDiagonal(options: {
  direction: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  maxDistance?: number;
}) {
  const { direction, maxDistance = 100 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Determine x and y directions based on diagonal
  const xDirection = direction.includes('left') ? -1 : 1;
  const yDirection = direction.includes('top') ? -1 : 1;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `${xDirection * maxDistance}%`]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`0%`, `${yDirection * maxDistance}%`]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.4, 0]);

  return {
    ref,
    x,
    y,
    scale,
    opacity,
    scrollYProgress,
  };
}
