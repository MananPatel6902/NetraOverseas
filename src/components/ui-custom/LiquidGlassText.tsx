import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface LiquidGlassTextProps {
  text: string;
  subtitle?: string;
  className?: string;
}

export function LiquidGlassText({ text, subtitle, className = '' }: LiquidGlassTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setMousePosition({ x, y });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const mainFontSize = 'clamp(3.5rem, 13vw, 10rem)';
  const subtitleFontSize = 'clamp(2rem, 8vw, 6rem)';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <motion.h1
        className="relative flex flex-col items-center text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* NETRA */}
        <span className="relative">
          {/* Blur/Glow Layer */}
          <span
            className="absolute inset-0 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: mainFontSize,
              color: 'rgba(255, 255, 255, 0.4)',
              filter: 'blur(15px)',
              transform: 'translate(2px, 2px)',
            }}
            aria-hidden="true"
          >
            {text}
          </span>

          {/* Glass Refraction Layer */}
          <span
            className="absolute inset-0 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: mainFontSize,
              background: `
                radial-gradient(
                  ellipse 60% 40% at ${mousePosition.x}% ${mousePosition.y}%,
                  rgba(255, 255, 255, 0.9) 0%,
                  rgba(200, 220, 255, 0.6) 30%,
                  transparent 70%
                )
              `,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              mixBlendMode: 'overlay',
            }}
            aria-hidden="true"
          >
            {text}
          </span>

          {/* Main Text with Liquid Glass Gradient */}
          <span
            className="relative block font-black leading-none"
            style={{
              fontSize: mainFontSize,
              background: `
                linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 1) 0%,
                  rgba(255, 255, 255, 0.98) 15%,
                  rgba(230, 240, 250, 0.95) 30%,
                  rgba(200, 220, 240, 0.9) 50%,
                  rgba(170, 195, 225, 0.85) 70%,
                  rgba(140, 170, 210, 0.8) 85%,
                  rgba(120, 150, 195, 0.75) 100%
                )
              `,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: `
                0 2px 4px rgba(255, 255, 255, 0.3),
                0 4px 8px rgba(0, 0, 0, 0.2),
                0 8px 16px rgba(0, 0, 0, 0.15),
                0 16px 32px rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            {text}
          </span>

          {/* Top Highlight */}
          <span
            className="absolute inset-0 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: mainFontSize,
              background: `
                linear-gradient(
                  180deg,
                  rgba(255, 255, 255, 0.8) 0%,
                  rgba(255, 255, 255, 0.4) 20%,
                  transparent 40%
                )
              `,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              mixBlendMode: 'soft-light',
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        </span>

        {/* OVERSEAS */}
        {subtitle && (
          <span className="relative mt-[-0.1em]">
            {/* Blur/Glow Layer */}
            <span
              className="absolute inset-0 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: subtitleFontSize,
                letterSpacing: '0.3em',
                color: 'rgba(255, 200, 100, 0.4)',
                filter: 'blur(12px)',
                transform: 'translate(2px, 2px)',
              }}
              aria-hidden="true"
            >
              {subtitle}
            </span>

            {/* Glass Refraction */}
            <span
              className="absolute inset-0 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: subtitleFontSize,
                letterSpacing: '0.3em',
                background: `
                  radial-gradient(
                    ellipse 60% 40% at ${mousePosition.x}% ${mousePosition.y}%,
                    rgba(255, 230, 180, 0.8) 0%,
                    rgba(255, 200, 120, 0.5) 30%,
                    transparent 70%
                  )
                `,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                mixBlendMode: 'overlay',
              }}
              aria-hidden="true"
            >
              {subtitle}
            </span>

            {/* Main Subtitle with Amber Glass Gradient */}
            <span
              className="relative block font-black leading-none"
              style={{
                fontSize: subtitleFontSize,
                letterSpacing: '0.3em',
                background: `
                  linear-gradient(
                    180deg,
                    rgba(255, 215, 150, 1) 0%,
                    rgba(255, 200, 130, 0.98) 20%,
                    rgba(240, 180, 100, 0.95) 40%,
                    rgba(220, 160, 80, 0.9) 60%,
                    rgba(200, 140, 60, 0.85) 80%,
                    rgba(180, 120, 50, 0.8) 100%
                  )
                `,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: `
                  0 2px 4px rgba(255, 200, 100, 0.3),
                  0 4px 8px rgba(0, 0, 0, 0.2),
                  0 8px 16px rgba(0, 0, 0, 0.15)
                `,
              }}
            >
              {subtitle}
            </span>

            {/* Top Highlight */}
            <span
              className="absolute inset-0 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: subtitleFontSize,
                letterSpacing: '0.3em',
                background: `
                  linear-gradient(
                    180deg,
                    rgba(255, 255, 255, 0.7) 0%,
                    rgba(255, 255, 255, 0.3) 25%,
                    transparent 45%
                  )
                `,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                mixBlendMode: 'soft-light',
              }}
              aria-hidden="true"
            >
              {subtitle}
            </span>
          </span>
        )}
      </motion.h1>
    </div>
  );
}
