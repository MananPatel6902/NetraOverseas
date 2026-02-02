import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrutalistCardProps {
  children: ReactNode;
  variant?: 'default' | 'inverted' | 'accent';
  shadow?: boolean;
  shadowColor?: 'charcoal' | 'amber';
  hover?: boolean;
  className?: string;
}

/**
 * Brutalist-styled card component
 * Features: Heavy borders, sharp corners, optional offset shadow
 *
 * @param children - Card content
 * @param variant - Color variant (default: 'default')
 *   - default: Cream background, charcoal border
 *   - inverted: Charcoal background, cream text
 *   - accent: Amber border highlight
 * @param shadow - Enable offset shadow effect (default: false)
 * @param shadowColor - Color of offset shadow (default: 'charcoal')
 * @param hover - Enable hover transform effect (default: true)
 * @param className - Additional CSS classes
 */
export function BrutalistCard({
  children,
  variant = 'default',
  shadow = false,
  shadowColor = 'charcoal',
  hover = true,
  className,
}: BrutalistCardProps) {
  const variants = {
    default: 'bg-cream text-charcoal border-charcoal',
    inverted: 'bg-charcoal text-cream border-cream',
    accent: 'bg-cream text-charcoal border-amber',
  };

  const shadowStyles = shadow
    ? shadowColor === 'amber'
      ? 'brutalist-shadow-amber'
      : 'brutalist-shadow'
    : '';

  const hoverVariants = hover
    ? {
        rest: { x: 0, y: 0 },
        hover: {
          x: -2,
          y: -2,
          transition: { duration: 0.2, ease: 'easeOut' },
        },
      }
    : undefined;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={hoverVariants}
      className={cn(
        'p-6 border-4',
        'relative',
        variants[variant],
        shadow && shadowStyles,
        hover && 'transition-shadow duration-200',
        className
      )}
      style={{ borderRadius: 0 }} // Enforce sharp corners
    >
      {children}
    </motion.div>
  );
}

/**
 * Brutalist stat card for displaying numbers
 */
export function BrutalistStatCard({
  value,
  label,
  icon,
  variant = 'default',
  className,
}: {
  value: string;
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'inverted' | 'accent';
  className?: string;
}) {
  return (
    <BrutalistCard variant={variant} hover={true} className={cn('text-center', className)}>
      {icon && <div className="flex justify-center mb-3">{icon}</div>}
      <p
        className="text-4xl sm:text-5xl font-black leading-none mb-2"
        style={{ fontFamily: 'monospace' }}
      >
        {value}
      </p>
      <p className="text-xs uppercase tracking-wider font-semibold opacity-70" style={{ fontFamily: 'monospace' }}>
        {label}
      </p>
    </BrutalistCard>
  );
}
